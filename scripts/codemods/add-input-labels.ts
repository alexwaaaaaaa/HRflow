/**
 * scripts/codemods/add-input-labels.ts
 *
 * Codemod: ensure every <input> / <select> / <textarea> outside
 * components/ui/ is associated with an accessible label.
 *
 * Detection:
 *   - JsxOpeningElement / JsxSelfClosingElement with tag "input", "select",
 *     or "textarea".
 *   - File path NOT under components/ui/.
 *
 * Skip rules (silent — no comment emitted):
 *   - Element already has any of: `id`, `aria-label`, `aria-labelledby`.
 *   - Element is wrapped by an ancestor <label> element (implicit labelling).
 *   - The line immediately above already starts with the manual-label marker
 *     (defensive idempotency check).
 *
 * Transformation:
 *   1. Generate a stable, valid HTML `id`:
 *      - If the element has a string-literal `name` attribute → kebab-case of
 *        the name (e.g. `name="firstName"` → `first-name`).
 *      - Else if the element is inside a <form> with `id` or `name` → use
 *        `<form-id>-<file-stem>-<line>`.
 *      - Else → `<file-stem>-<line>` as a deterministic fallback.
 *   2. Search for a nearby visible label:
 *      - Scan up to 3 preceding siblings of the input within its parent
 *        (skipping JsxText whitespace). For each <span>, <p>, <label>, or
 *        <div> with simple text content (≤80 chars, no nested elements,
 *        no dynamic expressions), treat it as the field's label.
 *   3. Apply:
 *      - Case A (visible label found):
 *          - Add `id="<generated>"` to the input.
 *          - Replace the label-candidate element with
 *            `<label htmlFor="<generated>" {...preservedAttrs}>{labelText}</label>`.
 *            The tag is renamed to `<label>`; any other attributes (e.g.
 *            className) on the original element are preserved verbatim.
 *      - Case B (no visible label):
 *          - Add `id="<generated>"` AND `aria-label="<best-guess>"` to the
 *            input. Best-guess comes from `name` → `placeholder` → the id
 *            itself (so the attribute is never empty).
 *          - Prepend `// codemod-skip: needs-manual-label` on its own line
 *            immediately above the input.
 *
 * Idempotency:
 *   - Case A: the input now has `id`; subsequent runs hit the
 *     "has-id-attribute" silent skip.
 *   - Case B: the input now has `aria-label`; subsequent runs hit the
 *     "has-aria-label" silent skip.
 *
 * Requirements: 6.1, 6.2
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

const SKIP_MANUAL_LABEL = "// codemod-skip: needs-manual-label";

const LABELABLE_TAGS = new Set<string>(["input", "select", "textarea"]);
const LABEL_TEXT_TAGS = new Set<string>(["span", "p", "label", "div"]);

const MAX_LABEL_LENGTH = 80;
const MAX_PRECEDING_LOOKBACK = 3;

// ---------------------------------------------------------------------------
// String / id helpers
// ---------------------------------------------------------------------------

function kebabCase(s: string): string {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getFileStem(filePath: string): string {
  const base = filePath.split("/").pop() ?? "file";
  return base.replace(/\.[tj]sx?$/, "");
}

// ---------------------------------------------------------------------------
// Attribute helpers
// ---------------------------------------------------------------------------

function getStringAttr(
  element: JsxOpeningElement | JsxSelfClosingElement,
  name: string
): string | null {
  for (const attr of element.getAttributes()) {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) continue;
    const ja = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
    if (ja.getNameNode().getText() !== name) continue;
    const init = ja.getInitializer();
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
    return null;
  }
  return null;
}

function hasAttribute(
  element: JsxOpeningElement | JsxSelfClosingElement,
  name: string
): boolean {
  return element.getAttributes().some((attr) => {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) return false;
    return (
      attr.asKindOrThrow(SyntaxKind.JsxAttribute).getNameNode().getText() ===
      name
    );
  });
}

// ---------------------------------------------------------------------------
// Element navigation
// ---------------------------------------------------------------------------

/**
 * Return the source-level node representing the input — either the
 * JsxSelfClosingElement itself, or the wrapping JsxElement when the input is
 * written with explicit open/close tags.
 */
function getInputElementNode(
  opening: JsxOpeningElement | JsxSelfClosingElement
): Node {
  if (opening.getKind() === SyntaxKind.JsxSelfClosingElement) {
    return opening;
  }
  const je = (opening as JsxOpeningElement).getParentIfKind(
    SyntaxKind.JsxElement
  );
  return je ?? opening;
}

function isWrappedByLabel(node: Node): boolean {
  let cur: Node | undefined = node.getParent();
  while (cur) {
    if (cur.getKind() === SyntaxKind.JsxElement) {
      const opening = (cur as JsxElement).getOpeningElement();
      if (opening.getTagNameNode().getText() === "label") return true;
    }
    cur = cur.getParent();
  }
  return false;
}

function findEnclosingForm(node: Node): JsxOpeningElement | null {
  let cur: Node | undefined = node.getParent();
  while (cur) {
    if (cur.getKind() === SyntaxKind.JsxElement) {
      const opening = (cur as JsxElement).getOpeningElement();
      if (opening.getTagNameNode().getText() === "form") return opening;
    }
    cur = cur.getParent();
  }
  return null;
}

// ---------------------------------------------------------------------------
// Sibling label search
// ---------------------------------------------------------------------------

interface LabelCandidate {
  element: JsxElement;
  text: string;
}

/**
 * Extract the simple text content of a JsxElement. Returns "" when the
 * element has any nested non-text children or non-trivial JsxExpressions, so
 * the caller falls back to the no-label code path.
 */
function extractSimpleText(je: JsxElement): string {
  let text = "";
  for (const child of je.getJsxChildren()) {
    const k = child.getKind();
    if (k === SyntaxKind.JsxText) {
      text += child.getText();
    } else if (k === SyntaxKind.JsxExpression) {
      const expr = child
        .asKindOrThrow(SyntaxKind.JsxExpression)
        .getExpression();
      if (!expr) continue; // {/* comment */} or empty expression
      if (expr.getKind() === SyntaxKind.StringLiteral) {
        text += expr.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue();
      } else {
        return ""; // dynamic content — treat as "no simple text"
      }
    } else {
      return ""; // nested elements — too complex
    }
  }
  return text.trim();
}

function getJsxChildrenSafe(parent: Node): Node[] {
  if (parent.getKind() === SyntaxKind.JsxElement) {
    return (parent as JsxElement).getJsxChildren();
  }
  if (parent.getKind() === SyntaxKind.JsxFragment) {
    // ts-morph exposes getJsxChildren on JsxFragment too.
    const anyParent = parent as unknown as { getJsxChildren?: () => Node[] };
    if (typeof anyParent.getJsxChildren === "function") {
      return anyParent.getJsxChildren();
    }
  }
  return [];
}

function findLabelCandidate(inputNode: Node): LabelCandidate | null {
  const parent = inputNode.getParent();
  if (!parent) return null;

  const children = getJsxChildrenSafe(parent);
  if (children.length === 0) return null;

  const idx = children.indexOf(inputNode);
  if (idx < 0) return null;

  let lookback = 0;
  for (let i = idx - 1; i >= 0 && lookback < MAX_PRECEDING_LOOKBACK; i--) {
    const child = children[i];
    if (!child) break;
    const k = child.getKind();

    if (k === SyntaxKind.JsxText) {
      // Whitespace-only JSX text between siblings — skip without counting.
      continue;
    }

    lookback++;

    if (k === SyntaxKind.JsxElement) {
      const je = child as JsxElement;
      const tag = je.getOpeningElement().getTagNameNode().getText();
      if (LABEL_TEXT_TAGS.has(tag)) {
        const text = extractSimpleText(je);
        if (text.length >= 1 && text.length <= MAX_LABEL_LENGTH) {
          return { element: je, text };
        }
      }
      // First non-matching JSX element → stop searching upward.
      break;
    }

    // Anything else (JsxSelfClosingElement, JsxExpression, JsxFragment, …)
    // counts as the boundary of the labelable region.
    break;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Id generation
// ---------------------------------------------------------------------------

function generateStableId(
  element: JsxOpeningElement | JsxSelfClosingElement,
  inputNode: Node,
  sourceFile: SourceFile
): string {
  // Priority 1: kebab-case of the `name` prop.
  const nameAttr = getStringAttr(element, "name");
  if (nameAttr) {
    const k = kebabCase(nameAttr);
    if (k) return k;
  }

  const stem = kebabCase(getFileStem(sourceFile.getFilePath())) || "field";
  const line = element.getStartLineNumber();

  // Priority 2: enclosing <form> id/name + file-stem + line.
  const formOpening = findEnclosingForm(inputNode);
  if (formOpening) {
    const formIdent =
      getStringAttr(formOpening, "id") ?? getStringAttr(formOpening, "name");
    if (formIdent) {
      const formK = kebabCase(formIdent);
      if (formK) return `${formK}-${stem}-${line}`;
    }
  }

  // Priority 3: file-stem + line.
  return `${stem}-${line}`;
}

// ---------------------------------------------------------------------------
// Aria-label fallback
// ---------------------------------------------------------------------------

function makeAriaLabelGuess(
  element: JsxOpeningElement | JsxSelfClosingElement,
  id: string
): string {
  const name = getStringAttr(element, "name");
  if (name && name.length > 0) return name;
  const placeholder = getStringAttr(element, "placeholder");
  if (placeholder && placeholder.length > 0) return placeholder;
  return id;
}

// ---------------------------------------------------------------------------
// Comment helpers (idempotency + Case B)
// ---------------------------------------------------------------------------

function lineAbove(node: Node, sourceFile: SourceFile): string {
  const lineNum = node.getStartLineNumber();
  if (lineNum < 2) return "";
  const lines = sourceFile.getFullText().split("\n");
  return (lines[lineNum - 2] ?? "").trimStart();
}

function hasMarkerAbove(node: Node, sourceFile: SourceFile): boolean {
  return lineAbove(node, sourceFile).startsWith(SKIP_MANUAL_LABEL);
}

function prependComment(
  node: Node,
  sourceFile: SourceFile,
  comment: string
): void {
  // Always place the comment on its own line *above* the line containing the
  // element. The element itself can sit mid-line (e.g. after `return`), so we
  // anchor at the start of the line, not the element's text position.
  const pos = node.getStart();
  const fullText = sourceFile.getFullText();
  const lineStart = fullText.lastIndexOf("\n", pos - 1) + 1;
  const indent = fullText.slice(lineStart, pos).match(/^(\s*)/)?.[1] ?? "";
  sourceFile.insertText(lineStart, `${indent}${comment}\n`);
}

// ---------------------------------------------------------------------------
// Label-element rebuild
// ---------------------------------------------------------------------------

function buildLabelText(
  original: JsxElement,
  id: string,
  text: string
): string {
  const opening = original.getOpeningElement();
  const otherAttrs: string[] = [];

  for (const attr of opening.getAttributes()) {
    if (attr.getKind() === SyntaxKind.JsxAttribute) {
      const ja = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
      const name = ja.getNameNode().getText();
      // We add our own htmlFor; drop any existing one.
      if (name === "htmlFor") continue;
      otherAttrs.push(ja.getText());
    } else if (attr.getKind() === SyntaxKind.JsxSpreadAttribute) {
      otherAttrs.push(attr.getText());
    }
  }

  const attrStr = otherAttrs.length > 0 ? " " + otherAttrs.join(" ") : "";
  return `<label htmlFor="${id}"${attrStr}>${text}</label>`;
}

// ---------------------------------------------------------------------------
// Per-element processing
// ---------------------------------------------------------------------------

type ProcessResult = "transformed" | "skipped-with-comment" | "no-op";

function processElement(
  element: JsxOpeningElement | JsxSelfClosingElement,
  sourceFile: SourceFile
): ProcessResult {
  // Skip 1: already labelled via id / aria-label / aria-labelledby.
  if (
    hasAttribute(element, "id") ||
    hasAttribute(element, "aria-label") ||
    hasAttribute(element, "aria-labelledby")
  ) {
    return "no-op";
  }

  const inputNode = getInputElementNode(element);

  // Skip 2: an ancestor <label> wraps the input (implicit labelling).
  if (isWrappedByLabel(inputNode)) {
    return "no-op";
  }

  // Skip 3: defensive idempotency — a marker we emitted in a prior run sits
  // on the line above (in practice the aria-label check above also covers
  // this, but the marker is the more semantic signal).
  if (hasMarkerAbove(element, sourceFile)) {
    return "no-op";
  }

  const labelCand = findLabelCandidate(inputNode);
  const id = generateStableId(element, inputNode, sourceFile);

  if (labelCand) {
    // Case A — wire the input to the existing visible label.
    element.addAttribute({ name: "id", initializer: `"${id}"` });
    const newLabelText = buildLabelText(labelCand.element, id, labelCand.text);
    labelCand.element.replaceWithText(newLabelText);
    return "transformed";
  }

  // Case B — emit aria-label + manual-review marker.
  const guess = makeAriaLabelGuess(element, id);
  element.addAttribute({ name: "id", initializer: `"${id}"` });
  element.addAttribute({ name: "aria-label", initializer: `"${guess}"` });
  prependComment(element, sourceFile, SKIP_MANUAL_LABEL);
  return "skipped-with-comment";
}

// ---------------------------------------------------------------------------
// Exported codemod
// ---------------------------------------------------------------------------

const addInputLabels: Codemod = {
  name: "add-input-labels",

  transform(sourceFile: SourceFile): boolean {
    if (sourceFile.getFilePath().includes("/components/ui/")) return false;

    let changed = false;
    let iterations = 0;
    const MAX_ITERATIONS = 500; // safety guard

    while (iterations < MAX_ITERATIONS) {
      iterations++;

      // Re-collect candidates after every mutation since text replacement
      // and comment insertion invalidate AST positions.
      const elements: Array<JsxOpeningElement | JsxSelfClosingElement> = [];
      sourceFile.forEachDescendant((node) => {
        const k = node.getKind();
        if (k === SyntaxKind.JsxOpeningElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxOpeningElement);
          if (LABELABLE_TAGS.has(el.getTagNameNode().getText())) {
            elements.push(el);
          }
        } else if (k === SyntaxKind.JsxSelfClosingElement) {
          const el = node.asKindOrThrow(SyntaxKind.JsxSelfClosingElement);
          if (LABELABLE_TAGS.has(el.getTagNameNode().getText())) {
            elements.push(el);
          }
        }
      });

      if (elements.length === 0) break;

      let processed = false;
      for (const el of elements) {
        const result = processElement(el, sourceFile);
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

export default addInputLabels;
