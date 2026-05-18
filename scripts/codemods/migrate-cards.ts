/**
 * scripts/codemods/migrate-cards.ts
 *
 * Codemod: migrate <div> blocks matching the legacy card chrome to <Card>
 * from @/components/ui/Card.
 *
 * Detection:
 *   - JsxOpeningElement / JsxSelfClosingElement with tag "div"
 *   - File path NOT under components/ui/
 *   - className attribute is a string literal (or { "..." } expression)
 *   - The className string contains ALL of:
 *       1. bg-[#0D1928] OR bg-[#0F1C2E]                         (case-insensitive)
 *       2. standalone "border" token AND border-[#1A2A3A]       (case-insensitive)
 *       3. one of rounded-xl / rounded-2xl / rounded-3xl
 *       4. one of p-3 / p-4 / p-5 / p-6 / p-7
 *
 * Transform:
 *   - Strip the matched chrome classes from className.
 *   - Padding mapping:
 *       p-3       → padding="sm"
 *       p-4 / p-5 → omit (md is the Card default)
 *       p-6 / p-7 → padding="lg"
 *   - Variant mapping:
 *       shadow-[0_4px_24px_rgba(0,0,0,0.5)] present → variant="elevated"
 *       otherwise                                   → omit (default)
 *   - Drop className entirely if the leftover is empty; otherwise keep
 *     className="<leftover>".
 *   - Preserve all other attributes verbatim (id / role / aria-* / data-* /
 *     onClick / event handlers / etc.).
 *   - Replace the tag name with `Card` and add
 *     `import Card from "@/components/ui/Card"` if missing.
 *
 * Skip rules (idempotent):
 *   - File inside components/ui/                → silently skipped
 *   - <div> with chrome but no children at all  → // codemod-skip: empty-card
 *   - <div> with chrome AND a style={{...}}     → // inline-style: codemod-cannot-merge
 *
 * Requirements: 2.1, 2.2
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

const SKIP_COMMENT_EMPTY = "// codemod-skip: empty-card";
const SKIP_COMMENT_INLINE = "// inline-style: codemod-cannot-merge";

// Detection regexes — each matches the chrome class as a whole token.
const BG_RE = /(?:^|\s)bg-\[#(?:0D1928|0F1C2E)\](?=\s|$)/i;
const BORDER_TOKEN_RE = /(?:^|\s)border(?=\s|$)/;
const BORDER_COLOR_RE = /(?:^|\s)border-\[#1A2A3A\](?=\s|$)/i;
const ROUNDED_RE = /(?:^|\s)rounded-(?:xl|2xl|3xl)(?=\s|$)/;
const PADDING_RE = /(?:^|\s)p-([3-7])(?=\s|$)/;
const SHADOW_RE = /(?:^|\s)shadow-\[0_4px_24px_rgba\(0,0,0,0\.5\)\](?=\s|$)/;

// ---------------------------------------------------------------------------
// Import handling
// ---------------------------------------------------------------------------

function hasCardImport(sourceFile: SourceFile): boolean {
  return sourceFile.getImportDeclarations().some((decl) => {
    const moduleSpec = decl.getModuleSpecifierValue();
    return (
      moduleSpec === "@/components/ui/Card" ||
      moduleSpec === "../ui/Card" ||
      moduleSpec === "./Card" ||
      moduleSpec.endsWith("/components/ui/Card")
    );
  });
}

function ensureCardImport(sourceFile: SourceFile): void {
  if (hasCardImport(sourceFile)) return;

  const imports = sourceFile.getImportDeclarations();
  const insertPos =
    imports.length > 0
      ? imports[imports.length - 1]!.getChildIndex() + 1
      : 0;

  sourceFile.insertImportDeclaration(insertPos, {
    defaultImport: "Card",
    moduleSpecifier: "@/components/ui/Card",
  });
}

// ---------------------------------------------------------------------------
// ClassName extraction
// ---------------------------------------------------------------------------

/**
 * Extract the className value as a string literal. Returns null if the
 * className is missing, dynamic (template / call expression / variable), or
 * otherwise non-static.
 */
function extractClassName(
  element: JsxOpeningElement | JsxSelfClosingElement
): string | null {
  const attrs = element.getAttributes();
  for (const attr of attrs) {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) continue;
    const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
    if (jsxAttr.getNameNode().getText() !== "className") continue;

    const init = jsxAttr.getInitializer();
    if (!init) return null;

    if (init.getKind() === SyntaxKind.StringLiteral) {
      return init.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue();
    }
    if (init.getKind() === SyntaxKind.JsxExpression) {
      const expr = init
        .asKindOrThrow(SyntaxKind.JsxExpression)
        .getExpression();
      if (expr && expr.getKind() === SyntaxKind.StringLiteral) {
        return expr
          .asKindOrThrow(SyntaxKind.StringLiteral)
          .getLiteralValue();
      }
    }
    return null; // dynamic className — opt out of transformation
  }
  return null;
}

/**
 * Returns true if any attribute named "style" is present (regardless of
 * value form: object literal, variable reference, etc.).
 */
function hasStyleAttribute(
  element: JsxOpeningElement | JsxSelfClosingElement
): boolean {
  return element.getAttributes().some((attr) => {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) return false;
    return (
      attr.asKindOrThrow(SyntaxKind.JsxAttribute).getNameNode().getText() ===
      "style"
    );
  });
}

// ---------------------------------------------------------------------------
// Empty-children detection
// ---------------------------------------------------------------------------

/**
 * True if the element has no real children:
 *   - JsxSelfClosingElement is always empty.
 *   - JsxOpeningElement with a parent JsxElement is empty when its body
 *     contains nothing besides whitespace JsxText.
 */
function isEmptyContainer(
  element: JsxOpeningElement | JsxSelfClosingElement
): boolean {
  if (element.getKind() === SyntaxKind.JsxSelfClosingElement) return true;

  const opening = element as JsxOpeningElement;
  const jsxElement = opening.getParentIfKind(SyntaxKind.JsxElement);
  if (!jsxElement) return true; // parent missing — treat conservatively as empty

  const children = jsxElement.getJsxChildren();
  for (const child of children) {
    if (child.getKind() === SyntaxKind.JsxText) {
      const t = child.getText();
      if (t.trim().length > 0) return false;
      continue;
    }
    // Any non-text child (element, expression, fragment, etc.) → non-empty.
    return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Skip-comment helpers
// ---------------------------------------------------------------------------

function hasCardSkipCommentAbove(node: Node, sourceFile: SourceFile): boolean {
  const elementLine = node.getStartLineNumber();
  const fullText = sourceFile.getFullText();
  const lines = fullText.split("\n");
  const prevLine =
    elementLine >= 2 ? (lines[elementLine - 2] ?? "").trimStart() : "";
  return (
    prevLine.startsWith(SKIP_COMMENT_EMPTY) ||
    prevLine.startsWith(SKIP_COMMENT_INLINE)
  );
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
// Class stripping
// ---------------------------------------------------------------------------

type Padding = "sm" | "lg" | null;

interface ChromeMatch {
  padding: Padding;
  hasShadow: boolean;
}

/**
 * Inspect a className string for the chrome pattern. Returns null when not
 * a complete card-chrome match.
 */
function detectChrome(className: string): ChromeMatch | null {
  if (!BG_RE.test(className)) return null;
  if (!BORDER_TOKEN_RE.test(className)) return null;
  if (!BORDER_COLOR_RE.test(className)) return null;
  if (!ROUNDED_RE.test(className)) return null;

  const pMatch = PADDING_RE.exec(className);
  if (!pMatch) return null;

  const pNum = pMatch[1]!;
  let padding: Padding;
  if (pNum === "3") padding = "sm";
  else if (pNum === "6" || pNum === "7") padding = "lg";
  else padding = null; // p-4 / p-5 → md (default)

  return {
    padding,
    hasShadow: SHADOW_RE.test(className),
  };
}

/**
 * Strip every chrome class from the className string and collapse whitespace.
 * The non-global regexes match a single occurrence; that is sufficient because
 * the legacy chrome only ever uses each token once. The shadow strip uses the
 * `g` flag because rebuilding the className when shadow is present should
 * remove every copy.
 */
function stripChromeClasses(className: string, hasShadow: boolean): string {
  // Pad with leading/trailing spaces so each pattern can use the
  // (?:^|\s) ... (?=\s|$) boundary even at string ends.
  let result = ` ${className} `;

  result = result.replace(/(\s)bg-\[#(?:0D1928|0F1C2E)\](?=\s)/gi, "$1");
  result = result.replace(/(\s)border-\[#1A2A3A\](?=\s)/gi, "$1");
  result = result.replace(/(\s)border(?=\s)/g, "$1");
  result = result.replace(/(\s)rounded-(?:xl|2xl|3xl)(?=\s)/g, "$1");
  result = result.replace(/(\s)p-[3-7](?=\s)/g, "$1");

  if (hasShadow) {
    result = result.replace(
      /(\s)shadow-\[0_4px_24px_rgba\(0,0,0,0\.5\)\](?=\s)/g,
      "$1"
    );
  }

  return result.replace(/\s+/g, " ").trim();
}

// ---------------------------------------------------------------------------
// Tag rebuilding
// ---------------------------------------------------------------------------

/**
 * Build the replacement Card opening tag text.
 *
 * Layout: <Card variant? padding? <preserved-attrs> className?>(...)
 *   - variant / padding props come first when set
 *   - other attrs are copied verbatim in their original order
 *   - className is added last (only if leftover is non-empty)
 */
function buildCardOpenText(
  element: JsxOpeningElement | JsxSelfClosingElement,
  newClassName: string,
  variant: "elevated" | null,
  padding: Padding,
  selfClosing: boolean
): string {
  const parts: string[] = [];
  if (variant) parts.push(`variant="${variant}"`);
  if (padding) parts.push(`padding="${padding}"`);

  for (const attr of element.getAttributes()) {
    if (attr.getKind() === SyntaxKind.JsxAttribute) {
      const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
      const name = jsxAttr.getNameNode().getText();
      if (name === "className") continue; // rebuilt below
      parts.push(jsxAttr.getText());
    } else if (attr.getKind() === SyntaxKind.JsxSpreadAttribute) {
      parts.push(attr.getText());
    }
  }

  if (newClassName.length > 0) {
    parts.push(`className="${newClassName}"`);
  }

  const propsStr = parts.length > 0 ? " " + parts.join(" ") : "";
  return selfClosing ? `<Card${propsStr} />` : `<Card${propsStr}>`;
}

// ---------------------------------------------------------------------------
// Per-element processing
// ---------------------------------------------------------------------------

type ProcessResult = "transformed" | "skipped-with-comment" | "no-op";

function processDivElement(
  element: JsxOpeningElement | JsxSelfClosingElement,
  sourceFile: SourceFile
): ProcessResult {
  // Idempotency: the line above is already a card skip comment.
  if (hasCardSkipCommentAbove(element, sourceFile)) return "no-op";

  const className = extractClassName(element);
  if (className === null) return "no-op"; // missing or dynamic className

  const match = detectChrome(className);
  if (!match) return "no-op"; // not a card-chrome <div>

  // Skip 1 — chrome + style={{...}} cannot be merged.
  if (hasStyleAttribute(element)) {
    prependComment(element, sourceFile, SKIP_COMMENT_INLINE);
    return "skipped-with-comment";
  }

  // Skip 2 — empty card has no children to wrap.
  if (isEmptyContainer(element)) {
    prependComment(element, sourceFile, SKIP_COMMENT_EMPTY);
    return "skipped-with-comment";
  }

  // Build new className from leftover tokens.
  const newClassName = stripChromeClasses(className, match.hasShadow);
  const variant: "elevated" | null = match.hasShadow ? "elevated" : null;

  if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
    // Self-closing form (rare for divs, but supported).
    const newText = buildCardOpenText(
      element,
      newClassName,
      variant,
      match.padding,
      true
    );
    element.replaceWithText(newText);
  } else {
    const opening = element as JsxOpeningElement;
    const jsxElement = opening.getParentIfKind(SyntaxKind.JsxElement);
    if (!jsxElement) return "no-op";

    const closing = (jsxElement as JsxElement).getClosingElement();
    // Replace the closing tag first to avoid invalidating the opening
    // element's positions when the opening text length changes.
    closing.replaceWithText("</Card>");

    const newOpenText = buildCardOpenText(
      opening,
      newClassName,
      variant,
      match.padding,
      false
    );
    opening.replaceWithText(newOpenText);
  }

  ensureCardImport(sourceFile);
  return "transformed";
}

// ---------------------------------------------------------------------------
// Exported codemod
// ---------------------------------------------------------------------------

const migrateCards: Codemod = {
  name: "migrate-cards",

  transform(sourceFile: SourceFile): boolean {
    // Don't touch the Card primitive itself or anything else under ui/.
    if (sourceFile.getFilePath().includes("/components/ui/")) return false;

    let changed = false;
    let iterations = 0;
    const MAX_ITERATIONS = 500; // safety guard against runaway loops

    while (iterations < MAX_ITERATIONS) {
      iterations++;

      // Re-collect <div> elements after every mutation since text replacement
      // and comment insertion invalidate AST positions.
      const elements: Array<JsxOpeningElement | JsxSelfClosingElement> = [];
      sourceFile.forEachDescendant((node) => {
        if (node.getKind() === SyntaxKind.JsxOpeningElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxOpeningElement);
          if (el.getTagNameNode().getText() === "div") elements.push(el);
        } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxSelfClosingElement);
          if (el.getTagNameNode().getText() === "div") elements.push(el);
        }
      });

      if (elements.length === 0) break;

      let processed = false;
      for (const el of elements) {
        const result = processDivElement(el, sourceFile);
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

export default migrateCards;
