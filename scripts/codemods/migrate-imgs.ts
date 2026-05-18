/**
 * scripts/codemods/migrate-imgs.ts
 *
 * Codemod: migrate raw <img> elements to <Image> from next/image.
 *
 * Detection:
 *   - JsxOpeningElement / JsxSelfClosingElement with tag "img"
 *   - File path NOT under components/ui/
 *   - The line immediately above does NOT already contain one of the codemod
 *     markers we emit (idempotency).
 *
 * Decision tree per <img>:
 *   1. Data-URL skip: if `src` is a string literal whose value starts with
 *      "data:", prepend `// codemod-skip: data-url-img` and leave the <img>
 *      unchanged.
 *   2. Missing-dimensions skip: if either `width` or `height` is missing OR
 *      not an explicit numeric literal (e.g. width="100%", width={dynVar}),
 *      prepend `// codemod-skip: img-needs-dimensions` and leave the <img>
 *      unchanged.
 *   3. Missing-alt review: if `alt` is absent, add `alt=""` to the migrated
 *      element AND prepend `// codemod-review: confirm-decorative` above the
 *      new <Image> element line. Continue to migration.
 *   4. Migrate: rename the tag to `Image`, preserve every existing attribute
 *      verbatim (`src` / `alt` / `width` / `height` / `className` / `id` /
 *      `data-*` / spread / etc.), and add `import Image from "next/image"` at
 *      the top of the file (no duplicate).
 *
 * Width / height numeric handling:
 *   - `width={100}`           → numeric (NumericLiteral expression)
 *   - `width="100"`           → numeric (string literal that parses as int)
 *   - `width="100%"`          → non-numeric → skip
 *   - `width={dynVar}` / etc. → non-numeric → skip
 *
 * Idempotency:
 *   - After a successful migration the element is `<Image>` (capital I), so a
 *     subsequent pass finds no `<img>` to process and returns false.
 *   - For skipped elements we read the line above the element. If it already
 *     starts with any of `// codemod-skip: data-url-img`,
 *     `// codemod-skip: img-needs-dimensions`, or
 *     `// codemod-review: confirm-decorative`, the element is treated as
 *     already-handled and we no-op.
 *
 * Requirements: 10.1, 10.2, 10.3
 */

import {
  type SourceFile,
  type Node,
  type JsxOpeningElement,
  type JsxSelfClosingElement,
  type JsxElement,
  SyntaxKind,
} from "ts-morph";
import type { Codemod } from "./runner";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SKIP_DATA_URL = "// codemod-skip: data-url-img";
const SKIP_NEEDS_DIMS = "// codemod-skip: img-needs-dimensions";
const REVIEW_DECORATIVE = "// codemod-review: confirm-decorative";

const MARKER_PREFIXES: ReadonlyArray<string> = [
  SKIP_DATA_URL,
  SKIP_NEEDS_DIMS,
  REVIEW_DECORATIVE,
];

// ---------------------------------------------------------------------------
// Import handling — Image is the DEFAULT export from "next/image"
// ---------------------------------------------------------------------------

function hasImageImport(sourceFile: SourceFile): boolean {
  return sourceFile.getImportDeclarations().some((decl) => {
    if (decl.getModuleSpecifierValue() !== "next/image") return false;
    const def = decl.getDefaultImport();
    return !!def && def.getText() === "Image";
  });
}

function ensureImageImport(sourceFile: SourceFile): void {
  if (hasImageImport(sourceFile)) return;

  const imports = sourceFile.getImportDeclarations();
  const insertPos =
    imports.length > 0
      ? imports[imports.length - 1]!.getChildIndex() + 1
      : 0;

  sourceFile.insertImportDeclaration(insertPos, {
    defaultImport: "Image",
    moduleSpecifier: "next/image",
  });
}

// ---------------------------------------------------------------------------
// Skip-comment helpers
// ---------------------------------------------------------------------------

function lineAbove(node: Node, sourceFile: SourceFile): string {
  const elementLine = node.getStartLineNumber();
  if (elementLine < 2) return "";
  const lines = sourceFile.getFullText().split("\n");
  return (lines[elementLine - 2] ?? "").trimStart();
}

function hasMarkerAbove(node: Node, sourceFile: SourceFile): boolean {
  const prev = lineAbove(node, sourceFile);
  return MARKER_PREFIXES.some((p) => prev.startsWith(p));
}

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

// ---------------------------------------------------------------------------
// Attribute extraction
// ---------------------------------------------------------------------------

interface AttrIndex {
  src: { kind: "literal"; value: string } | { kind: "non-literal" } | null;
  width: NumCheck;
  height: NumCheck;
  hasAlt: boolean;
}

type NumCheck =
  | { kind: "missing" }
  | { kind: "numeric" }
  | { kind: "non-numeric" };

const NUMERIC_STRING_RE = /^-?\d+(?:\.\d+)?$/;

function classifyDimension(
  attr: ReturnType<JsxOpeningElement["getAttributes"]>[number] | undefined
): NumCheck {
  if (!attr) return { kind: "missing" };
  if (attr.getKind() !== SyntaxKind.JsxAttribute) {
    // JsxSpreadAttribute — we cannot statically inspect spread sources.
    return { kind: "non-numeric" };
  }
  const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
  const init = jsxAttr.getInitializer();
  if (!init) {
    // Boolean shorthand like `width` — definitely not a number.
    return { kind: "non-numeric" };
  }

  if (init.getKind() === SyntaxKind.StringLiteral) {
    const v = init.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue();
    return NUMERIC_STRING_RE.test(v.trim())
      ? { kind: "numeric" }
      : { kind: "non-numeric" };
  }

  if (init.getKind() === SyntaxKind.JsxExpression) {
    const expr = init.asKindOrThrow(SyntaxKind.JsxExpression).getExpression();
    if (!expr) return { kind: "non-numeric" };

    if (expr.getKind() === SyntaxKind.NumericLiteral) {
      return { kind: "numeric" };
    }
    // -123 shows up as a PrefixUnaryExpression wrapping a NumericLiteral.
    if (expr.getKind() === SyntaxKind.PrefixUnaryExpression) {
      const operand = expr
        .asKindOrThrow(SyntaxKind.PrefixUnaryExpression)
        .getOperand();
      if (operand.getKind() === SyntaxKind.NumericLiteral) {
        return { kind: "numeric" };
      }
    }
    if (expr.getKind() === SyntaxKind.StringLiteral) {
      const v = expr
        .asKindOrThrow(SyntaxKind.StringLiteral)
        .getLiteralValue();
      return NUMERIC_STRING_RE.test(v.trim())
        ? { kind: "numeric" }
        : { kind: "non-numeric" };
    }
    return { kind: "non-numeric" };
  }

  return { kind: "non-numeric" };
}

function extractSrc(
  attr: ReturnType<JsxOpeningElement["getAttributes"]>[number] | undefined
): AttrIndex["src"] {
  if (!attr) return null;
  if (attr.getKind() !== SyntaxKind.JsxAttribute) {
    // Spread — can't inspect.
    return { kind: "non-literal" };
  }
  const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
  const init = jsxAttr.getInitializer();
  if (!init) return { kind: "non-literal" };

  if (init.getKind() === SyntaxKind.StringLiteral) {
    return {
      kind: "literal",
      value: init.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue(),
    };
  }
  if (init.getKind() === SyntaxKind.JsxExpression) {
    const expr = init.asKindOrThrow(SyntaxKind.JsxExpression).getExpression();
    if (expr && expr.getKind() === SyntaxKind.StringLiteral) {
      return {
        kind: "literal",
        value: expr
          .asKindOrThrow(SyntaxKind.StringLiteral)
          .getLiteralValue(),
      };
    }
    return { kind: "non-literal" };
  }
  return { kind: "non-literal" };
}

function indexAttributes(
  element: JsxOpeningElement | JsxSelfClosingElement
): AttrIndex {
  const attrs = element.getAttributes();
  const byName: Record<
    string,
    ReturnType<JsxOpeningElement["getAttributes"]>[number]
  > = {};
  for (const attr of attrs) {
    if (attr.getKind() === SyntaxKind.JsxAttribute) {
      const name = attr
        .asKindOrThrow(SyntaxKind.JsxAttribute)
        .getNameNode()
        .getText();
      byName[name] = attr;
    }
  }

  return {
    src: extractSrc(byName["src"]),
    width: classifyDimension(byName["width"]),
    height: classifyDimension(byName["height"]),
    hasAlt: "alt" in byName,
  };
}

// ---------------------------------------------------------------------------
// Tag rebuilding
// ---------------------------------------------------------------------------

/**
 * Build the replacement <Image> opening tag text.
 *
 * Layout: <Image <every-existing-attribute-verbatim> [alt=""]?>
 *   - All original attributes are copied in their original order.
 *   - When `addEmptyAlt` is true, append `alt=""` at the end (the original
 *     element didn't have an alt attribute).
 */
function buildImageOpenText(
  element: JsxOpeningElement | JsxSelfClosingElement,
  addEmptyAlt: boolean,
  selfClosing: boolean
): string {
  const parts: string[] = [];

  for (const attr of element.getAttributes()) {
    parts.push(attr.getText());
  }
  if (addEmptyAlt) parts.push('alt=""');

  const propsStr = parts.length > 0 ? " " + parts.join(" ") : "";
  return selfClosing ? `<Image${propsStr} />` : `<Image${propsStr}>`;
}

// ---------------------------------------------------------------------------
// Per-element processing
// ---------------------------------------------------------------------------

type ProcessResult = "transformed" | "skipped-with-comment" | "no-op";

function processImgElement(
  element: JsxOpeningElement | JsxSelfClosingElement,
  sourceFile: SourceFile
): ProcessResult {
  // Idempotency: a marker we (or a prior pass) emitted lives on the line
  // above. Treat as already-handled.
  if (hasMarkerAbove(element, sourceFile)) return "no-op";

  const idx = indexAttributes(element);

  // 1. Data-URL skip — only applies when src is a literal we can read.
  if (idx.src && idx.src.kind === "literal" && idx.src.value.startsWith("data:")) {
    prependComment(element, sourceFile, SKIP_DATA_URL);
    return "skipped-with-comment";
  }

  // 2. Missing-dimensions skip — either side missing or non-numeric.
  if (idx.width.kind !== "numeric" || idx.height.kind !== "numeric") {
    prependComment(element, sourceFile, SKIP_NEEDS_DIMS);
    return "skipped-with-comment";
  }

  // 3. Missing-alt: add `alt=""` to the migrated element AND prepend a review
  //    comment above the new <Image>.
  const needsAltReview = !idx.hasAlt;

  // 4. Migrate.
  if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
    const newText = buildImageOpenText(element, needsAltReview, true);
    element.replaceWithText(newText);
  } else {
    const opening = element as JsxOpeningElement;
    const jsxElement = opening.getParentIfKind(SyntaxKind.JsxElement);
    if (!jsxElement) return "no-op";

    const closing = (jsxElement as JsxElement).getClosingElement();
    // Replace the closing tag first to avoid invalidating the opening
    // element's positions.
    closing.replaceWithText("</Image>");

    const newOpenText = buildImageOpenText(opening, needsAltReview, false);
    opening.replaceWithText(newOpenText);
  }

  // Prepend the review comment AFTER replacement so it lands on the line
  // immediately above the new <Image> tag. We re-find the new tag by scanning
  // for the first JsxElement / JsxSelfClosingElement whose tag is "Image"
  // that doesn't yet have the marker above it.
  if (needsAltReview) {
    const newImgEl = findFirstImageWithoutMarker(sourceFile);
    if (newImgEl) {
      prependComment(newImgEl, sourceFile, REVIEW_DECORATIVE);
    }
  }

  ensureImageImport(sourceFile);
  return "transformed";
}

/**
 * Find the first `<Image>` JSX element in the file that does not yet have a
 * `// codemod-review: confirm-decorative` comment on the line above it.
 * Used to attach the review comment after the tag has been rewritten.
 */
function findFirstImageWithoutMarker(
  sourceFile: SourceFile
): JsxOpeningElement | JsxSelfClosingElement | null {
  let found: JsxOpeningElement | JsxSelfClosingElement | null = null;
  sourceFile.forEachDescendant((node) => {
    if (found) return;
    if (node.getKind() === SyntaxKind.JsxOpeningElement) {
      const el = node.asKindOrThrow(SyntaxKind.JsxOpeningElement);
      if (
        el.getTagNameNode().getText() === "Image" &&
        !hasMarkerAbove(el, sourceFile)
      ) {
        found = el;
      }
    } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
      const el = node.asKindOrThrow(SyntaxKind.JsxSelfClosingElement);
      if (
        el.getTagNameNode().getText() === "Image" &&
        !hasMarkerAbove(el, sourceFile)
      ) {
        found = el;
      }
    }
  });
  return found;
}

// ---------------------------------------------------------------------------
// Exported codemod
// ---------------------------------------------------------------------------

const migrateImgs: Codemod = {
  name: "migrate-imgs",

  transform(sourceFile: SourceFile): boolean {
    if (sourceFile.getFilePath().includes("/components/ui/")) return false;

    let changed = false;
    let iterations = 0;
    const MAX_ITERATIONS = 500; // safety guard

    while (iterations < MAX_ITERATIONS) {
      iterations++;

      // Re-collect <img> elements after every mutation since text replacement
      // and comment insertion invalidate AST positions.
      const elements: Array<JsxOpeningElement | JsxSelfClosingElement> = [];
      sourceFile.forEachDescendant((node) => {
        if (node.getKind() === SyntaxKind.JsxOpeningElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxOpeningElement);
          if (el.getTagNameNode().getText() === "img") elements.push(el);
        } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxSelfClosingElement);
          if (el.getTagNameNode().getText() === "img") elements.push(el);
        }
      });

      if (elements.length === 0) break;

      let processed = false;
      for (const el of elements) {
        const result = processImgElement(el, sourceFile);
        if (result === "transformed" || result === "skipped-with-comment") {
          changed = true;
          processed = true;
          break; // re-collect after every mutation
        }
      }

      if (!processed) break;
    }

    return changed;
  },
};

export default migrateImgs;
