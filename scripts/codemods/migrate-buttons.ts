/**
 * scripts/codemods/migrate-buttons.ts
 *
 * Codemod: migrate raw <button> elements to <Button> from @/components/ui/Button.
 *
 * Detection:
 *   - JsxOpeningElement whose tagName is "button" (lowercase)
 *   - File path NOT under components/ui/
 *   - Element does NOT have dangerouslySetInnerHTML
 *   - The line immediately above does NOT already start with "// raw-button:"
 *
 * Classification bands (className analysis):
 *   primary   : bg-[#00e5a0] | bg-green- | bg-emerald- | (text-[#04080f] with bg)
 *   secondary : bg-[#0f1c2e] | bg-[#162030] | bg-slate- with border
 *   ghost     : bg-transparent + text-[#00e5a0] | border-[rgba(0,229,160
 *   danger    : text-red- | text-[#ef4444] | bg-red- | bg-[rgba(239,68,68
 *   outline   : border + bg-transparent + neutral text (not green/red)
 *   uncertain : anything else → prepend // raw-button: codemod-uncertain — review manually
 *
 * Size detection:
 *   sm : h-8 | (px-3 text-xs)
 *   lg : h-11 | px-5 text-sm
 *   md : default (omit size prop)
 *
 * Preserved attributes: onClick, disabled, type, aria-label, key handlers
 *   (onKeyDown, onKeyUp, onKeyPress)
 *
 * Requirements: 3.1, 3.2, 3.3
 */

import {
  type SourceFile,
  SyntaxKind,
  type JsxOpeningElement,
  type JsxSelfClosingElement,
} from "ts-morph";
import type { Codemod } from "./runner";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Attributes we always copy verbatim from <button> to <Button>. */
const PRESERVED_ATTRS = new Set([
  "onClick",
  "disabled",
  "type",
  "aria-label",
  "onKeyDown",
  "onKeyUp",
  "onKeyPress",
  "id",
  "tabIndex",
  "form",
  "name",
  "value",
  "autoFocus",
]);

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "lg" | null; // null = md (default, omit prop)

/**
 * Classify a className string into a Button variant.
 * Returns null when the className is unclassifiable.
 */
function classifyVariant(className: string): Variant | null {
  // primary: brand-green background
  // bg-[#00e5a0] OR bg-green-* OR (bg-emerald-* AND text-[#...])
  if (
    /bg-\[#00e5a0\]/i.test(className) ||
    /bg-green-/i.test(className) ||
    (/bg-emerald-/i.test(className) && /text-\[#/i.test(className))
  ) {
    return "primary";
  }

  // danger: red text or red background (check before secondary/outline)
  if (
    /text-red-/i.test(className) ||
    /text-\[#ef4444\]/i.test(className) ||
    /bg-red-/i.test(className) ||
    /bg-\[rgba\(239,68,68/i.test(className)
  ) {
    return "danger";
  }

  // ghost: bg-transparent + green text/border
  if (
    /bg-transparent/i.test(className) &&
    (/text-\[#00e5a0\]/i.test(className) ||
      /border-\[rgba\(0,229,160/i.test(className))
  ) {
    return "ghost";
  }

  // secondary: dark fill backgrounds
  if (
    /bg-\[#0f1c2e\]/i.test(className) ||
    /bg-\[#162030\]/i.test(className) ||
    (/bg-slate-/i.test(className) && /border/i.test(className))
  ) {
    return "secondary";
  }

  // outline: border + bg-transparent + neutral text (no green, no red)
  if (
    /\bborder\b/i.test(className) &&
    /bg-transparent/i.test(className) &&
    !/text-\[#00e5a0\]/i.test(className) &&
    !/text-red-/i.test(className) &&
    !/text-\[#ef4444\]/i.test(className)
  ) {
    return "outline";
  }

  return null;
}

/**
 * Detect size from className tokens.
 * Returns null for md (the default — no size prop needed).
 */
function detectSize(className: string): Size {
  if (
    /\bh-8\b/.test(className) ||
    (/\bpx-3\b/.test(className) && /\btext-xs\b/.test(className))
  ) {
    return "sm";
  }
  if (
    /\bh-11\b/.test(className) ||
    (/\bpx-5\b/.test(className) && /\btext-sm\b/.test(className))
  ) {
    return "lg";
  }
  return null;
}

/**
 * Check whether a Button import already exists in the file.
 */
function hasButtonImport(sourceFile: SourceFile): boolean {
  return sourceFile.getImportDeclarations().some((decl) => {
    const moduleSpec = decl.getModuleSpecifierValue();
    return (
      moduleSpec === "@/components/ui/Button" ||
      moduleSpec === "../ui/Button" ||
      moduleSpec === "./Button" ||
      moduleSpec.endsWith("/components/ui/Button")
    );
  });
}

/**
 * Add `import Button from "@/components/ui/Button";` if not already present.
 */
function ensureButtonImport(sourceFile: SourceFile): void {
  if (hasButtonImport(sourceFile)) return;

  // Insert after the last existing import, or at the top of the file
  const imports = sourceFile.getImportDeclarations();
  const insertPos = imports.length > 0
    ? imports[imports.length - 1]!.getChildIndex() + 1
    : 0;

  sourceFile.insertImportDeclaration(insertPos, {
    defaultImport: "Button",
    moduleSpecifier: "@/components/ui/Button",
  });
}

// ---------------------------------------------------------------------------
// Core transform
// ---------------------------------------------------------------------------

/**
 * Process a single JsxOpeningElement (or self-closing) that is a raw <button>.
 * Returns true if the element was transformed or annotated.
 */
function processButtonElement(
  element: JsxOpeningElement | JsxSelfClosingElement,
  sourceFile: SourceFile
): boolean {
  // Skip if inside components/ui/
  const filePath = sourceFile.getFilePath();
  if (filePath.includes("/components/ui/")) return false;

  // Collect attributes
  const attrs = element.getAttributes();

  // Skip if dangerouslySetInnerHTML is present
  const hasDangerous = attrs.some((attr) => {
    if (attr.getKind() === SyntaxKind.JsxAttribute) {
      const name = attr.asKindOrThrow(SyntaxKind.JsxAttribute).getNameNode().getText();
      return name === "dangerouslySetInnerHTML";
    }
    return false;
  });
  if (hasDangerous) return false;

  // Extract className value (string literal only — we don't evaluate expressions)
  let className = "";
  const classNameAttr = attrs.find((attr) => {
    if (attr.getKind() === SyntaxKind.JsxAttribute) {
      return attr.asKindOrThrow(SyntaxKind.JsxAttribute).getNameNode().getText() === "className";
    }
    return false;
  });

  if (classNameAttr && classNameAttr.getKind() === SyntaxKind.JsxAttribute) {
    const initializer = classNameAttr.asKindOrThrow(SyntaxKind.JsxAttribute).getInitializer();
    if (initializer) {
      if (initializer.getKind() === SyntaxKind.StringLiteral) {
        className = initializer.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue();
      } else if (initializer.getKind() === SyntaxKind.JsxExpression) {
        // Expression className — extract inner string literal if simple
        const expr = initializer.asKindOrThrow(SyntaxKind.JsxExpression).getExpression();
        if (expr && expr.getKind() === SyntaxKind.StringLiteral) {
          className = expr.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue();
        }
        // Otherwise leave className empty → will be unclassifiable
      }
    }
  }

  // Check if the line immediately above already has a raw-button comment
  const elementLine = element.getStartLineNumber();
  const fullText = sourceFile.getFullText();
  const lines = fullText.split("\n");
  const prevLine = elementLine >= 2 ? (lines[elementLine - 2] ?? "").trimStart() : "";
  if (prevLine.startsWith("// raw-button:")) return false;

  // Classify
  const variant = classifyVariant(className);

  if (variant === null) {
    // Unclassifiable — prepend comment
    const pos = element.getStart();
    const lineStart = fullText.lastIndexOf("\n", pos - 1) + 1;
    const indent = fullText.slice(lineStart, pos).match(/^(\s*)/)?.[1] ?? "";
    sourceFile.insertText(pos, `// raw-button: codemod-uncertain — review manually\n${indent}`);
    return true;
  }

  // Build the replacement JSX opening tag
  const size = detectSize(className);

  // Collect preserved attributes text (verbatim)
  const preservedAttrTexts: string[] = [];
  for (const attr of attrs) {
    if (attr.getKind() === SyntaxKind.JsxAttribute) {
      const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
      const attrName = jsxAttr.getNameNode().getText();
      if (PRESERVED_ATTRS.has(attrName)) {
        preservedAttrTexts.push(jsxAttr.getText());
      }
    } else if (attr.getKind() === SyntaxKind.JsxSpreadAttribute) {
      // Preserve spread attributes verbatim
      preservedAttrTexts.push(attr.getText());
    }
  }

  // Build new opening tag
  const variantProp = `variant="${variant}"`;
  const sizeProp = size ? ` size="${size}"` : "";
  const extraAttrs = preservedAttrTexts.length > 0 ? " " + preservedAttrTexts.join(" ") : "";
  const newOpenTag = `<Button ${variantProp}${sizeProp}${extraAttrs}>`;

  if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
    // Self-closing <button /> → <Button variant size />
    const newSelfClose = `<Button ${variantProp}${sizeProp}${extraAttrs} />`;
    element.replaceWithText(newSelfClose);
  } else {
    // Replace opening tag; find and replace matching closing tag
    const openingEl = element as JsxOpeningElement;
    const jsxElement = openingEl.getParentIfKind(SyntaxKind.JsxElement);
    if (!jsxElement) return false;

    const closingEl = jsxElement.getClosingElement();
    // Replace closing tag first (higher position) to avoid offset issues
    closingEl.replaceWithText("</Button>");
    openingEl.replaceWithText(newOpenTag);
  }

  ensureButtonImport(sourceFile);
  return true;
}

// ---------------------------------------------------------------------------
// Exported codemod
// ---------------------------------------------------------------------------

const migrateButtons: Codemod = {
  name: "migrate-buttons",

  transform(sourceFile: SourceFile): boolean {
    // Skip files inside components/ui/
    if (sourceFile.getFilePath().includes("/components/ui/")) return false;

    let changed = false;

    // We need to collect elements first, then process in reverse order
    // (bottom-up) to avoid position invalidation after text replacement.
    const collectElements = (): Array<JsxOpeningElement | JsxSelfClosingElement> => {
      const elements: Array<JsxOpeningElement | JsxSelfClosingElement> = [];

      sourceFile.forEachDescendant((node) => {
        if (node.getKind() === SyntaxKind.JsxOpeningElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxOpeningElement);
          if (el.getTagNameNode().getText() === "button") {
            elements.push(el);
          }
        } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxSelfClosingElement);
          if (el.getTagNameNode().getText() === "button") {
            elements.push(el);
          }
        }
      });

      return elements;
    };

    // Process one element at a time (re-collect after each change to get fresh AST positions)
    let iterations = 0;
    const MAX_ITERATIONS = 500; // safety guard

    while (iterations < MAX_ITERATIONS) {
      iterations++;
      const elements = collectElements();
      if (elements.length === 0) break;

      // Find the first processable element
      let processed = false;
      for (const el of elements) {
        const result = processButtonElement(el, sourceFile);
        if (result) {
          changed = true;
          processed = true;
          break; // Re-collect after each mutation
        }
      }

      if (!processed) break; // No more processable elements
    }

    return changed;
  },
};

export default migrateButtons;
