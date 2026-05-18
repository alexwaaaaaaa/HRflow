/**
 * scripts/codemods/migrate-tables.ts
 *
 * Codemod: migrate raw <table> elements to <DataTable> from
 * @/components/ui/DataTable.
 *
 * Detection:
 *   - JsxElement whose tag is the lowercase "table"
 *   - File path NOT under components/ui/
 *   - The line immediately above does NOT already start with one of the
 *     codemod-skip comments produced by this transform (idempotency)
 *
 * Skip rules:
 *   - File inside components/ui/   → silently skipped (no comment)
 *   - >20 <th> cells               → // codemod-skip: complex-table-many-columns
 *   - rowSpan/colSpan on th/td/tr  → // codemod-skip: complex-table-spans
 *   - <tbody> with multiple .map() → // codemod-skip: complex-table-dynamic-rows
 *
 * Transform:
 *   1. Collect <thead><tr><th>…</th></tr></thead> labels.
 *      key  = kebab-case(label)
 *      label = trimmed text content of the <th>
 *   2. Collect <tbody>{rows.map((row) => <tr>…</tr>)}</tbody>:
 *        - dataExpr = the value the .map is invoked on
 *        - rowVar   = arrow-function param name
 *        - tds      = <td> children of <tr>, one per column
 *   3. Detect sortable: <th> contains a <button onClick=...>, a
 *      ChevronUp/ChevronDown component, or has cursor-pointer + hover: classes.
 *   4. Detect aria-label: nearest preceding <h1> or <h2> in source order.
 *   5. Replace the entire <table>…</table> JsxElement with
 *      <DataTable data={...} columns={[...]} rowKey={...} aria-label="..." />.
 *   6. Add `import DataTable, { type Column } from "@/components/ui/DataTable"`.
 *
 * Requirements: 5.1, 5.2
 */

import {
  type SourceFile,
  type Node,
  type JsxElement,
  type ArrowFunction,
  type FunctionExpression,
  SyntaxKind,
} from "ts-morph";
import type { Codemod } from "./runner";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SKIP_COMMENT_PREFIX = "// codemod-skip: complex-table-";

const SKIP_COMMENTS = {
  manyCols: "// codemod-skip: complex-table-many-columns",
  spans: "// codemod-skip: complex-table-spans",
  dynamicRows: "// codemod-skip: complex-table-dynamic-rows",
} as const;

// ---------------------------------------------------------------------------
// Import handling
// ---------------------------------------------------------------------------

function hasDataTableImport(sourceFile: SourceFile): boolean {
  return sourceFile.getImportDeclarations().some((decl) => {
    const moduleSpec = decl.getModuleSpecifierValue();
    return (
      moduleSpec === "@/components/ui/DataTable" ||
      moduleSpec === "../ui/DataTable" ||
      moduleSpec === "./DataTable" ||
      moduleSpec.endsWith("/components/ui/DataTable")
    );
  });
}

function ensureDataTableImport(sourceFile: SourceFile): void {
  if (hasDataTableImport(sourceFile)) return;

  const imports = sourceFile.getImportDeclarations();
  const insertPos =
    imports.length > 0
      ? imports[imports.length - 1]!.getChildIndex() + 1
      : 0;

  sourceFile.insertImportDeclaration(insertPos, {
    defaultImport: "DataTable",
    namedImports: [{ name: "Column", isTypeOnly: true }],
    moduleSpecifier: "@/components/ui/DataTable",
  });
}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function toKebabCase(text: string, fallback: string): string {
  const out = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return out || fallback;
}

/**
 * Extract the visible text content of a JsxElement by concatenating all
 * descendant JsxText nodes (whitespace-collapsed, trimmed).
 */
function getTextContent(node: Node): string {
  const parts: string[] = [];
  node.forEachDescendant((child) => {
    if (child.getKind() === SyntaxKind.JsxText) {
      const t = child.getText().replace(/\s+/g, " ").trim();
      if (t) parts.push(t);
    }
  });
  return parts.join(" ").trim();
}

/**
 * Find every JsxElement descendant whose opening tag matches `tag`.
 */
function findDescendantsByTag(node: Node, tag: string): JsxElement[] {
  const out: JsxElement[] = [];
  node.forEachDescendant((child) => {
    if (child.getKind() === SyntaxKind.JsxElement) {
      const el = child.asKindOrThrow(SyntaxKind.JsxElement);
      if (el.getOpeningElement().getTagNameNode().getText() === tag) {
        out.push(el);
      }
    }
  });
  return out;
}

/**
 * Detect rowSpan / colSpan attributes anywhere inside the table.
 */
function hasSpanAttribute(jsxElement: JsxElement): boolean {
  let found = false;
  jsxElement.forEachDescendant((node) => {
    if (found) return;
    if (node.getKind() === SyntaxKind.JsxAttribute) {
      const name = node
        .asKindOrThrow(SyntaxKind.JsxAttribute)
        .getNameNode()
        .getText()
        .toLowerCase();
      if (name === "rowspan" || name === "colspan") found = true;
    }
  });
  return found;
}

/**
 * Count `.map(…)` call expressions in the given subtree.
 */
function countMapCalls(node: Node): number {
  let n = 0;
  node.forEachDescendant((child) => {
    if (child.getKind() === SyntaxKind.CallExpression) {
      const ce = child.asKindOrThrow(SyntaxKind.CallExpression);
      const expr = ce.getExpression();
      if (expr.getKind() === SyntaxKind.PropertyAccessExpression) {
        const pe = expr.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
        if (pe.getName() === "map") n++;
      }
    }
  });
  return n;
}

/**
 * Find the first `<X>.map((row) => <tr>…</tr>)` call inside the tbody.
 * Returns the data expression text, the row variable name, and the tr element.
 */
interface MapInfo {
  dataExpr: string;
  rowVar: string;
  trElement: JsxElement;
}

function extractMapInfo(tbodyElement: JsxElement): MapInfo | null {
  let mapCall: import("ts-morph").CallExpression | null = null;

  tbodyElement.forEachDescendant((child) => {
    if (mapCall) return;
    if (child.getKind() === SyntaxKind.CallExpression) {
      const ce = child.asKindOrThrow(SyntaxKind.CallExpression);
      const expr = ce.getExpression();
      if (expr.getKind() === SyntaxKind.PropertyAccessExpression) {
        const pe = expr.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
        if (pe.getName() === "map") {
          mapCall = ce;
        }
      }
    }
  });

  if (!mapCall) return null;

  const propAccess = (mapCall as import("ts-morph").CallExpression)
    .getExpression()
    .asKindOrThrow(SyntaxKind.PropertyAccessExpression);
  const dataExpr = propAccess.getExpression().getText();

  const args = (mapCall as import("ts-morph").CallExpression).getArguments();
  if (args.length === 0) return null;

  const fn = args[0]!;
  if (
    fn.getKind() !== SyntaxKind.ArrowFunction &&
    fn.getKind() !== SyntaxKind.FunctionExpression
  ) {
    return null;
  }

  const arrow = fn as ArrowFunction | FunctionExpression;
  const params = arrow.getParameters();
  if (params.length === 0) return null;

  const rowVar = params[0]!.getName();

  // Find the <tr> in the body
  let trEl: JsxElement | null = null;
  arrow.forEachDescendant((child) => {
    if (trEl) return;
    if (child.getKind() === SyntaxKind.JsxElement) {
      const el = child.asKindOrThrow(SyntaxKind.JsxElement);
      if (el.getOpeningElement().getTagNameNode().getText() === "tr") {
        trEl = el;
      }
    }
  });
  if (!trEl) return null;

  return { dataExpr, rowVar, trElement: trEl };
}

/**
 * Decide whether a <th> looks sortable.
 * Heuristics (any one is enough):
 *   - contains a <button> with an onClick attribute
 *   - contains a ChevronUp or ChevronDown component
 *   - has className with both "cursor-pointer" and "hover:"
 */
function isSortableHeader(thElement: JsxElement): boolean {
  // 1. <button onClick=...>
  const buttons = findDescendantsByTag(thElement, "button");
  for (const btn of buttons) {
    const attrs = btn.getOpeningElement().getAttributes();
    for (const attr of attrs) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) continue;
      const name = attr
        .asKindOrThrow(SyntaxKind.JsxAttribute)
        .getNameNode()
        .getText();
      if (name === "onClick") return true;
    }
  }

  // 2. ChevronUp / ChevronDown
  let chevron = false;
  thElement.forEachDescendant((node) => {
    if (chevron) return;
    if (node.getKind() === SyntaxKind.JsxOpeningElement) {
      const tag = node
        .asKindOrThrow(SyntaxKind.JsxOpeningElement)
        .getTagNameNode()
        .getText();
      if (tag === "ChevronUp" || tag === "ChevronDown") chevron = true;
    } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
      const tag = node
        .asKindOrThrow(SyntaxKind.JsxSelfClosingElement)
        .getTagNameNode()
        .getText();
      if (tag === "ChevronUp" || tag === "ChevronDown") chevron = true;
    }
  });
  if (chevron) return true;

  // 3. className signal
  const classNameAttr = thElement
    .getOpeningElement()
    .getAttributes()
    .find(
      (attr) =>
        attr.getKind() === SyntaxKind.JsxAttribute &&
        attr
          .asKindOrThrow(SyntaxKind.JsxAttribute)
          .getNameNode()
          .getText() === "className"
    );

  if (classNameAttr && classNameAttr.getKind() === SyntaxKind.JsxAttribute) {
    const init = classNameAttr
      .asKindOrThrow(SyntaxKind.JsxAttribute)
      .getInitializer();
    if (init && init.getKind() === SyntaxKind.StringLiteral) {
      const cls = init
        .asKindOrThrow(SyntaxKind.StringLiteral)
        .getLiteralValue();
      if (/cursor-pointer/.test(cls) && /hover:/.test(cls)) return true;
    }
  }

  return false;
}

/**
 * Find the nearest <h1> or <h2> in source order BEFORE the given position.
 * Returns the heading text or null if none found.
 */
function findNearestHeading(
  sourceFile: SourceFile,
  beforePos: number
): string | null {
  let bestPos = -1;
  let bestText: string | null = null;

  sourceFile.forEachDescendant((node) => {
    if (node.getKind() !== SyntaxKind.JsxElement) return;
    const el = node.asKindOrThrow(SyntaxKind.JsxElement);
    const tag = el.getOpeningElement().getTagNameNode().getText();
    if (tag !== "h1" && tag !== "h2") return;

    const pos = el.getStart();
    if (pos >= beforePos) return;

    const text = getTextContent(el);
    if (!text) return;

    if (pos > bestPos) {
      bestPos = pos;
      bestText = text;
    }
  });

  return bestText;
}

/**
 * True if the line above the node already starts with one of the codemod-skip
 * comments produced by this transform.
 */
function hasSkipCommentAbove(node: Node, sourceFile: SourceFile): boolean {
  const elementLine = node.getStartLineNumber();
  const fullText = sourceFile.getFullText();
  const lines = fullText.split("\n");
  const prevLine =
    elementLine >= 2 ? (lines[elementLine - 2] ?? "").trimStart() : "";
  return prevLine.startsWith(SKIP_COMMENT_PREFIX);
}

/**
 * Insert a single-line comment immediately above the node, preserving the
 * node's original indentation.
 */
function prependComment(
  node: Node,
  sourceFile: SourceFile,
  comment: string
): void {
  const pos = node.getStart();
  const fullText = sourceFile.getFullText();
  const lineStart = fullText.lastIndexOf("\n", pos - 1) + 1;
  const indent = fullText.slice(lineStart, pos).match(/^(\s*)/)?.[1] ?? "";
  sourceFile.insertText(pos, `${comment}\n${indent}`);
}

/**
 * Build the render arrow body for one cell.
 *  - <td>{expr}</td>            → expr
 *  - <td><Comp/></td>           → <Comp/>
 *  - <td>plain text</td>        → "plain text"
 *  - <td>multiple children</td> → <>{children}</>
 */
function buildRenderBody(rowVar: string, td: JsxElement | undefined): string {
  if (!td) return `String(${rowVar})`;

  const children = td.getJsxChildren().filter((c) => {
    if (c.getKind() === SyntaxKind.JsxText) {
      return c.getText().trim().length > 0;
    }
    return true;
  });

  if (children.length === 0) return `null`;

  if (children.length === 1) {
    const c = children[0]!;
    if (c.getKind() === SyntaxKind.JsxExpression) {
      const expr = c
        .asKindOrThrow(SyntaxKind.JsxExpression)
        .getExpression();
      return expr ? expr.getText() : "null";
    }
    if (
      c.getKind() === SyntaxKind.JsxElement ||
      c.getKind() === SyntaxKind.JsxSelfClosingElement ||
      c.getKind() === SyntaxKind.JsxFragment
    ) {
      return c.getText();
    }
    if (c.getKind() === SyntaxKind.JsxText) {
      return JSON.stringify(c.getText().replace(/\s+/g, " ").trim());
    }
  }

  // Multiple children — wrap in a fragment so the arrow returns valid JSX
  const inner = children.map((c) => c.getText()).join("");
  return `<>${inner}</>`;
}

// ---------------------------------------------------------------------------
// Per-table processing
// ---------------------------------------------------------------------------

type ProcessResult =
  | "transformed"
  | "skipped-with-comment"
  | "no-op";

interface ColumnSpec {
  key: string;
  label: string;
  sortable: boolean;
  renderBody: string;
}

function processTable(
  tableEl: JsxElement,
  sourceFile: SourceFile
): ProcessResult {
  // Idempotency — already annotated as a skip
  if (hasSkipCommentAbove(tableEl, sourceFile)) return "no-op";

  const theads = findDescendantsByTag(tableEl, "thead");
  const tbodies = findDescendantsByTag(tableEl, "tbody");

  // Without thead+tbody we don't know how to extract — leave alone (no comment)
  if (theads.length === 0 || tbodies.length === 0) return "no-op";

  const thead = theads[0]!;
  const tbody = tbodies[0]!;
  const ths = findDescendantsByTag(thead, "th");

  // 1. Many columns
  if (ths.length > 20) {
    prependComment(tableEl, sourceFile, SKIP_COMMENTS.manyCols);
    return "skipped-with-comment";
  }

  // 2. Spans
  if (hasSpanAttribute(tableEl)) {
    prependComment(tableEl, sourceFile, SKIP_COMMENTS.spans);
    return "skipped-with-comment";
  }

  // 3. Multiple .map()
  if (countMapCalls(tbody) > 1) {
    prependComment(tableEl, sourceFile, SKIP_COMMENTS.dynamicRows);
    return "skipped-with-comment";
  }

  // Extract map info
  const mapInfo = extractMapInfo(tbody);
  if (!mapInfo) return "no-op"; // can't determine data source, leave it

  const { dataExpr, rowVar, trElement } = mapInfo;
  const tds = findDescendantsByTag(trElement, "td");

  // Build columns
  const columns: ColumnSpec[] = [];
  for (let i = 0; i < ths.length; i++) {
    const th = ths[i]!;
    const labelRaw = getTextContent(th);
    const label = labelRaw.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const key = toKebabCase(label, `col-${i}`);
    const sortable = isSortableHeader(th);
    const renderBody = buildRenderBody(rowVar, tds[i]);
    columns.push({ key, label, sortable, renderBody });
  }

  // aria-label from nearest <h1>/<h2>
  const ariaLabelRaw = findNearestHeading(sourceFile, tableEl.getStart());
  const ariaLabelProp = ariaLabelRaw
    ? ` aria-label="${ariaLabelRaw
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')}"`
    : "";

  // Build the columns array literal
  const columnEntries = columns
    .map((col) => {
      const lines: string[] = [];
      lines.push(`        {`);
      lines.push(`          key: "${col.key}",`);
      lines.push(`          label: "${col.label}",`);
      lines.push(`          render: (${rowVar}) => ${col.renderBody},`);
      if (col.sortable) lines.push(`          sortable: true,`);
      lines.push(`        },`);
      return lines.join("\n");
    })
    .join("\n");

  const dataTableTxt =
    `<DataTable\n` +
    `      data={${dataExpr}}\n` +
    `      columns={[\n${columnEntries}\n      ]}\n` +
    `      rowKey={(${rowVar}) => String(${rowVar}.id ?? "")}` +
    `${ariaLabelProp}\n` +
    `    />`;

  tableEl.replaceWithText(dataTableTxt);
  ensureDataTableImport(sourceFile);

  return "transformed";
}

// ---------------------------------------------------------------------------
// Exported codemod
// ---------------------------------------------------------------------------

const migrateTables: Codemod = {
  name: "migrate-tables",

  transform(sourceFile: SourceFile): boolean {
    // Don't migrate the DataTable primitive itself, or anything else under ui/
    if (sourceFile.getFilePath().includes("/components/ui/")) return false;

    let changed = false;
    let iterations = 0;
    const MAX_ITERATIONS = 200; // safety guard against runaway loops

    while (iterations < MAX_ITERATIONS) {
      iterations++;

      // Re-collect <table> elements after each mutation since text replacement
      // and comment insertion invalidate AST positions.
      const tables: JsxElement[] = [];
      sourceFile.forEachDescendant((node) => {
        if (node.getKind() === SyntaxKind.JsxElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxElement);
          if (
            el.getOpeningElement().getTagNameNode().getText() === "table"
          ) {
            tables.push(el);
          }
        }
      });

      if (tables.length === 0) break;

      let processed = false;
      for (const tableEl of tables) {
        const result = processTable(tableEl, sourceFile);
        if (result === "transformed" || result === "skipped-with-comment") {
          changed = true;
          processed = true;
          break; // re-collect after each mutation
        }
      }

      if (!processed) break;
    }

    return changed;
  },
};

export default migrateTables;
