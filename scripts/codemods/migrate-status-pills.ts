/**
 * scripts/codemods/migrate-status-pills.ts
 *
 * Codemod: migrate <span> status-pill chrome to <Badge> from
 * @/components/ui/Badge.
 *
 * Detection (named-color pills):
 *   - JsxOpeningElement / JsxSelfClosingElement with tag "span"
 *   - File path NOT under components/ui/
 *   - className attribute is a string literal (or { "..." } expression) that
 *     contains ALL of:
 *       1. bg-{color}-500/10
 *       2. text-{color}-{400|500}
 *       3. standalone "border" token
 *       4. border-{color}-500/{20|25}
 *     where {color} is the SAME single color across all three positions, drawn
 *     from the bidirectional table:
 *       emerald|green   → success
 *       amber|yellow    → warning
 *       red|rose        → danger
 *       blue|indigo     → info
 *       purple|violet   → purple
 *       slate|gray      → neutral
 *
 * Detection (gradient / ai pill):
 *   - className contains bg-gradient-to-* AND a standalone "border" token
 *     (the gradient pill chrome — the text/border colors are arbitrary brand
 *     hexes, not standard Tailwind colors).
 *   - Variant: ai
 *
 * Transform:
 *   - Replace <span> with <Badge>.
 *   - Strip the matched chrome classes from className. For named colors:
 *       bg-{color}-500/10, text-{color}-{400|500}, border, border-{color}-500/{20|25}.
 *     For gradient: bg-gradient-to-*, from-[...], to-[...], via-[...],
 *     text-[...], border-[...], border.
 *   - Drop className entirely if the leftover is empty; otherwise keep
 *     className="<leftover>".
 *   - Add variant="..." prop. Omit the prop when variant === "neutral"
 *     (Badge's default).
 *   - Preserve all other attributes verbatim.
 *   - Ensure the named import `import { Badge } from "@/components/ui/Badge"`
 *     is present at the top of the file. If a named import from
 *     @/components/ui/Badge already exists, add Badge to it rather than
 *     duplicate the import declaration.
 *
 * Skip rules:
 *   - File inside components/ui/                      → silently skipped
 *   - <span> whose className is dynamic / non-literal → silently skipped
 *   - <span> whose className doesn't match the chrome → silently skipped
 *
 * Idempotency: after one pass every matching <span> has been renamed to
 * <Badge>, so a second invocation finds no matching <span> elements and
 * returns false. No skip comments are needed because the detection itself is
 * restrictive enough.
 *
 * Requirements: 4.1, 4.2, 4.3
 */

import {
  type SourceFile,
  type JsxOpeningElement,
  type JsxSelfClosingElement,
  type JsxElement,
  SyntaxKind,
} from "ts-morph";
import type { Codemod } from "./runner";

// ---------------------------------------------------------------------------
// Color → variant table (R4.3 — bidirectional)
// ---------------------------------------------------------------------------

type Variant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple"
  | "neutral"
  | "ai";

/**
 * Color tokens (Tailwind palette names) mapped to Badge variants. The order
 * is checked one at a time — the first match wins.
 */
const COLOR_TO_VARIANT: ReadonlyArray<readonly [string, Variant]> = [
  ["emerald", "success"],
  ["green", "success"],
  ["amber", "warning"],
  ["yellow", "warning"],
  ["red", "danger"],
  ["rose", "danger"],
  ["blue", "info"],
  ["indigo", "info"],
  ["purple", "purple"],
  ["violet", "purple"],
  ["slate", "neutral"],
  ["gray", "neutral"],
];

// ---------------------------------------------------------------------------
// Detection
// ---------------------------------------------------------------------------

interface Detection {
  variant: Variant;
  /** className with the chrome stripped, whitespace collapsed and trimmed. */
  newClassName: string;
}

/**
 * Strip every regex pattern in `patterns` from `padded` (a className that has
 * a leading and trailing space added so each pattern can use the
 * `(\s)…(?=\s)` boundary even at string ends). Returns the collapsed and
 * trimmed result.
 */
function stripPatterns(padded: string, patterns: RegExp[]): string {
  let result = padded;
  for (const re of patterns) {
    result = result.replace(re, "$1");
  }
  return result.replace(/\s+/g, " ").trim();
}

function detectChrome(className: string): Detection | null {
  // Normalise so each regex can use `(\s)…(?=\s)`.
  const padded = ` ${className} `;

  const hasBorderToken = /(\s)border(?=\s)/.test(padded);
  if (!hasBorderToken) return null;

  // Gradient (ai) detection — must check before named-color so that gradient
  // pills which happen to mention a Tailwind color name in passing aren't
  // misclassified.
  const hasGradient = /(\s)bg-gradient-to-[a-z]+(?=\s)/.test(padded);
  if (hasGradient) {
    const stripped = stripPatterns(padded, [
      /(\s)bg-gradient-to-[a-z]+(?=\s)/g,
      /(\s)from-\[[^\]]+\](?=\s)/g,
      /(\s)to-\[[^\]]+\](?=\s)/g,
      /(\s)via-\[[^\]]+\](?=\s)/g,
      /(\s)text-\[[^\]]+\](?=\s)/g,
      /(\s)border-\[[^\]]+\](?=\s)/g,
      /(\s)border(?=\s)/g,
    ]);
    return { variant: "ai", newClassName: stripped };
  }

  // Named-color detection — try each color in order and return on the first
  // complete match.
  for (const [color, variant] of COLOR_TO_VARIANT) {
    const bgRe = new RegExp(`(\\s)bg-${color}-500/10(?=\\s)`);
    const textRe = new RegExp(`(\\s)text-${color}-(?:400|500)(?=\\s)`);
    const borderColorRe = new RegExp(
      `(\\s)border-${color}-500/(?:20|25)(?=\\s)`
    );

    if (
      bgRe.test(padded) &&
      textRe.test(padded) &&
      borderColorRe.test(padded)
    ) {
      const stripped = stripPatterns(padded, [
        bgRe,
        textRe,
        borderColorRe,
        // Strip the standalone `border` token last so it isn't shadowed by
        // border-{color}-500/{20|25} matching first.
        /(\s)border(?=\s)/,
      ]);
      return { variant, newClassName: stripped };
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// className extraction
// ---------------------------------------------------------------------------

/**
 * Read the className attribute as a string literal. Returns null when the
 * className is missing, dynamic (template literal, call expression, variable
 * reference, etc.), or otherwise non-static.
 */
function extractClassName(
  element: JsxOpeningElement | JsxSelfClosingElement
): string | null {
  for (const attr of element.getAttributes()) {
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
    return null; // dynamic className — opt out
  }
  return null;
}

// ---------------------------------------------------------------------------
// Import handling — Badge is a NAMED export
// ---------------------------------------------------------------------------

function isBadgeModuleSpecifier(spec: string): boolean {
  return (
    spec === "@/components/ui/Badge" ||
    spec === "../ui/Badge" ||
    spec === "./Badge" ||
    spec.endsWith("/components/ui/Badge")
  );
}

function hasBadgeNamedImport(sourceFile: SourceFile): boolean {
  return sourceFile.getImportDeclarations().some((decl) => {
    if (!isBadgeModuleSpecifier(decl.getModuleSpecifierValue())) return false;
    return decl.getNamedImports().some((ni) => ni.getName() === "Badge");
  });
}

function ensureBadgeImport(sourceFile: SourceFile): void {
  if (hasBadgeNamedImport(sourceFile)) return;

  // If an import declaration already targets the Badge module (e.g. for the
  // BadgeVariant type), append Badge to its named import list rather than
  // creating a duplicate declaration.
  const existing = sourceFile.getImportDeclarations().find((decl) =>
    isBadgeModuleSpecifier(decl.getModuleSpecifierValue())
  );
  if (existing) {
    existing.addNamedImport("Badge");
    return;
  }

  const imports = sourceFile.getImportDeclarations();
  const insertPos =
    imports.length > 0
      ? imports[imports.length - 1]!.getChildIndex() + 1
      : 0;

  sourceFile.insertImportDeclaration(insertPos, {
    namedImports: ["Badge"],
    moduleSpecifier: "@/components/ui/Badge",
  });
}

// ---------------------------------------------------------------------------
// Tag rebuilding
// ---------------------------------------------------------------------------

/**
 * Build the replacement Badge opening tag text.
 *
 * Layout: <Badge variant? <preserved-attrs> className?>
 *   - variant prop comes first when set (omitted when neutral, the default)
 *   - other attrs are copied verbatim in their original order
 *   - className is added last (only if leftover is non-empty)
 */
function buildBadgeOpenText(
  element: JsxOpeningElement | JsxSelfClosingElement,
  variant: Variant,
  newClassName: string,
  selfClosing: boolean
): string {
  const parts: string[] = [];
  if (variant !== "neutral") parts.push(`variant="${variant}"`);

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
  return selfClosing ? `<Badge${propsStr} />` : `<Badge${propsStr}>`;
}

// ---------------------------------------------------------------------------
// Per-element processing
// ---------------------------------------------------------------------------

type ProcessResult = "transformed" | "no-op";

function processSpanElement(
  element: JsxOpeningElement | JsxSelfClosingElement,
  sourceFile: SourceFile
): ProcessResult {
  const className = extractClassName(element);
  if (className === null) return "no-op";

  const detection = detectChrome(className);
  if (!detection) return "no-op";

  if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
    const newText = buildBadgeOpenText(
      element,
      detection.variant,
      detection.newClassName,
      true
    );
    element.replaceWithText(newText);
  } else {
    const opening = element as JsxOpeningElement;
    const jsxElement = opening.getParentIfKind(SyntaxKind.JsxElement);
    if (!jsxElement) return "no-op";

    const closing = (jsxElement as JsxElement).getClosingElement();
    // Replace the closing tag first so the opening element's positions stay
    // valid while we read its attributes for the new opening text.
    closing.replaceWithText("</Badge>");

    const newOpenText = buildBadgeOpenText(
      opening,
      detection.variant,
      detection.newClassName,
      false
    );
    opening.replaceWithText(newOpenText);
  }

  ensureBadgeImport(sourceFile);
  return "transformed";
}

// ---------------------------------------------------------------------------
// Exported codemod
// ---------------------------------------------------------------------------

const migrateStatusPills: Codemod = {
  name: "migrate-status-pills",

  transform(sourceFile: SourceFile): boolean {
    // Don't touch the Badge primitive itself or anything else under ui/.
    if (sourceFile.getFilePath().includes("/components/ui/")) return false;

    let changed = false;
    let iterations = 0;
    const MAX_ITERATIONS = 500; // safety guard against runaway loops

    while (iterations < MAX_ITERATIONS) {
      iterations++;

      // Re-collect <span> elements after every mutation since text replacement
      // invalidates AST positions.
      const elements: Array<JsxOpeningElement | JsxSelfClosingElement> = [];
      sourceFile.forEachDescendant((node) => {
        if (node.getKind() === SyntaxKind.JsxOpeningElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxOpeningElement);
          if (el.getTagNameNode().getText() === "span") elements.push(el);
        } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxSelfClosingElement);
          if (el.getTagNameNode().getText() === "span") elements.push(el);
        }
      });

      if (elements.length === 0) break;

      let processed = false;
      for (const el of elements) {
        const result = processSpanElement(el, sourceFile);
        if (result === "transformed") {
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

export default migrateStatusPills;
