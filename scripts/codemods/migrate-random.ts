/**
 * scripts/codemods/migrate-random.ts
 *
 * Codemod: migrate render-time `Math.random()` and `Date.now()` calls to
 * deterministic seeded equivalents from `@/lib/random`.
 *
 * Detection:
 *   - `CallExpression` whose expression is `Math.random` or `Date.now` with
 *     zero arguments.
 *   - File path ends in `.tsx` and is NOT under `components/ui/`.
 *
 * Skip rules (silent — no comment emitted):
 *   - Call is inside an event-handler JSX attribute callback
 *     (onClick / onChange / onSubmit / onBlur / onFocus / onKeyDown / onKeyUp /
 *      onKeyPress / onMouseEnter / onMouseLeave / onMouseDown / onMouseUp /
 *      onMouseMove / onInput / onTouchStart / onTouchEnd / onTouchMove /
 *      onDragStart / onDragEnd / onDrop / onDragOver / onScroll).
 *   - Call is inside a function (declaration / expression / arrow / method)
 *     whose name starts with `handle` or `on` (camelCase, e.g. `handleClick`,
 *     `onSubmit`).
 *   - Call is inside a `useEffect` / `useLayoutEffect` / `useCallback` /
 *     `useMemo` / `useImperativeHandle` callback (those don't run during pure
 *     render).
 *
 * Migration:
 *   - Walk up enclosing functions to find a stable seed candidate from
 *     parameters (in priority order): `index` → `i` → `key` → `id`.
 *     Destructured object/array bindings are searched as well.
 *   - `Math.random()` → `seededFloats(<seed>, 1)[0]`.
 *   - `Date.now()`    → `seededFloats(<seed>, 1)[0] * 1e12`.
 *   - Add `import { seededFloats } from "@/lib/random"` (named import; merged
 *     into an existing `@/lib/random` import declaration if present).
 *
 * Manual-review skip:
 *   - When no seed candidate is in scope, prepend
 *     `// codemod-skip: random-needs-manual-seed` immediately above the call
 *     line and leave the call unchanged.
 *
 * Idempotency:
 *   - After a successful migration the call is `seededFloats(...)`, which the
 *     detector ignores → second pass returns false.
 *   - When a skip marker already sits on the line above a `Math.random()` /
 *     `Date.now()` call, the codemod no-ops on it.
 *
 * Requirements: 8.1, 8.2, 8.3
 */

import {
  type SourceFile,
  type CallExpression,
  type Node,
  type ParameterDeclaration,
  SyntaxKind,
} from "ts-morph";
import type { Codemod } from "./runner";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SKIP_MANUAL_SEED = "// codemod-skip: random-needs-manual-seed";

const EVENT_HANDLER_ATTRS = new Set<string>([
  "onClick",
  "onChange",
  "onSubmit",
  "onBlur",
  "onFocus",
  "onKeyDown",
  "onKeyUp",
  "onKeyPress",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseDown",
  "onMouseUp",
  "onMouseMove",
  "onInput",
  "onTouchStart",
  "onTouchEnd",
  "onTouchMove",
  "onDragStart",
  "onDragEnd",
  "onDrop",
  "onDragOver",
  "onScroll",
]);

const HOOK_CALLBACK_NAMES = new Set<string>([
  "useEffect",
  "useLayoutEffect",
  "useCallback",
  "useMemo",
  "useImperativeHandle",
]);

/** Seed candidate names in priority order (lower index = higher priority). */
const SEED_CANDIDATES_ORDERED: ReadonlyArray<string> = [
  "index",
  "i",
  "key",
  "id",
];

// ---------------------------------------------------------------------------
// Call classification
// ---------------------------------------------------------------------------

type CallKind = "math-random" | "date-now";

function classifyCall(call: CallExpression): CallKind | null {
  if (call.getArguments().length !== 0) return null;
  const expr = call.getExpression();
  if (expr.getKind() !== SyntaxKind.PropertyAccessExpression) return null;
  const pa = expr.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
  const obj = pa.getExpression().getText();
  const name = pa.getName();
  if (obj === "Math" && name === "random") return "math-random";
  if (obj === "Date" && name === "now") return "date-now";
  return null;
}

// ---------------------------------------------------------------------------
// Function navigation helpers
// ---------------------------------------------------------------------------

function getEnclosingFunction(node: Node): Node | undefined {
  return node.getFirstAncestor((a) => {
    const k = a.getKind();
    return (
      k === SyntaxKind.ArrowFunction ||
      k === SyntaxKind.FunctionDeclaration ||
      k === SyntaxKind.FunctionExpression ||
      k === SyntaxKind.MethodDeclaration
    );
  });
}

function getFunctionName(fn: Node): string | null {
  if (fn.getKind() === SyntaxKind.FunctionDeclaration) {
    return fn.asKindOrThrow(SyntaxKind.FunctionDeclaration).getName() ?? null;
  }
  if (fn.getKind() === SyntaxKind.MethodDeclaration) {
    return fn.asKindOrThrow(SyntaxKind.MethodDeclaration).getName();
  }
  // ArrowFunction or FunctionExpression — see if it's assigned to a name.
  const parent = fn.getParent();
  if (!parent) return null;
  if (parent.getKind() === SyntaxKind.VariableDeclaration) {
    const vd = parent.asKindOrThrow(SyntaxKind.VariableDeclaration);
    const nameNode = vd.getNameNode();
    if (nameNode.getKind() === SyntaxKind.Identifier) {
      return nameNode.getText();
    }
  }
  if (parent.getKind() === SyntaxKind.PropertyAssignment) {
    return parent.asKindOrThrow(SyntaxKind.PropertyAssignment).getName();
  }
  return null;
}

function isHandlerName(name: string): boolean {
  return /^handle[A-Z]/.test(name) || /^on[A-Z]/.test(name);
}

function isInsideEventHandlerOrHookCallback(call: CallExpression): boolean {
  let cur: Node | undefined = getEnclosingFunction(call);
  while (cur) {
    const parent = cur.getParent();

    // Pattern: <element onClick={() => Math.random()} />
    //   ArrowFunction → JsxExpression → JsxAttribute
    if (parent && parent.getKind() === SyntaxKind.JsxExpression) {
      const grand = parent.getParent();
      if (grand && grand.getKind() === SyntaxKind.JsxAttribute) {
        const attrName = grand
          .asKindOrThrow(SyntaxKind.JsxAttribute)
          .getNameNode()
          .getText();
        if (EVENT_HANDLER_ATTRS.has(attrName)) return true;
      }
    }

    // Pattern: useEffect(() => { Math.random(); }, [])
    //   ArrowFunction → CallExpression (where callee is a hook name)
    if (parent && parent.getKind() === SyntaxKind.CallExpression) {
      const callParent = parent.asKindOrThrow(SyntaxKind.CallExpression);
      // Only count it as a hook callback if this fn is one of the call's
      // arguments (not the callee).
      const isArg = callParent.getArguments().some((a) => a === cur);
      if (isArg) {
        const callee = callParent.getExpression();
        const calleeName =
          callee.getKind() === SyntaxKind.Identifier
            ? callee.getText()
            : callee.getKind() === SyntaxKind.PropertyAccessExpression
              ? callee.asKindOrThrow(SyntaxKind.PropertyAccessExpression).getName()
              : "";
        if (HOOK_CALLBACK_NAMES.has(calleeName)) return true;
      }
    }

    // Function name matches handle*/on* pattern
    const name = getFunctionName(cur);
    if (name && isHandlerName(name)) return true;

    cur = getEnclosingFunction(cur);
  }
  return false;
}

// ---------------------------------------------------------------------------
// Parameter name extraction (incl. destructured bindings)
// ---------------------------------------------------------------------------

function collectBindingNames(nameNode: Node, into: string[]): void {
  const k = nameNode.getKind();
  if (k === SyntaxKind.Identifier) {
    into.push(nameNode.getText());
    return;
  }
  if (k === SyntaxKind.ObjectBindingPattern) {
    const obp = nameNode.asKindOrThrow(SyntaxKind.ObjectBindingPattern);
    for (const elem of obp.getElements()) {
      // For `{ id }`, `propertyName` is undefined and `name` is "id".
      // For `{ id: x }`, propertyName="id" and name="x" — the bound name
      // is `x`, but the property name is `id`. We track the BOUND name (x)
      // because that's what's in scope for the callsite.
      collectBindingNames(elem.getNameNode(), into);
    }
    return;
  }
  if (k === SyntaxKind.ArrayBindingPattern) {
    const abp = nameNode.asKindOrThrow(SyntaxKind.ArrayBindingPattern);
    for (const elem of abp.getElements()) {
      if (elem.getKind() === SyntaxKind.BindingElement) {
        collectBindingNames(
          elem.asKindOrThrow(SyntaxKind.BindingElement).getNameNode(),
          into
        );
      }
    }
  }
}

function getParamNames(fn: Node): string[] {
  let params: ParameterDeclaration[] = [];
  switch (fn.getKind()) {
    case SyntaxKind.ArrowFunction:
      params = fn.asKindOrThrow(SyntaxKind.ArrowFunction).getParameters();
      break;
    case SyntaxKind.FunctionDeclaration:
      params = fn
        .asKindOrThrow(SyntaxKind.FunctionDeclaration)
        .getParameters();
      break;
    case SyntaxKind.FunctionExpression:
      params = fn
        .asKindOrThrow(SyntaxKind.FunctionExpression)
        .getParameters();
      break;
    case SyntaxKind.MethodDeclaration:
      params = fn.asKindOrThrow(SyntaxKind.MethodDeclaration).getParameters();
      break;
    default:
      params = [];
  }

  const names: string[] = [];
  for (const param of params) {
    collectBindingNames(param.getNameNode(), names);
  }
  return names;
}

function findSeedCandidate(call: CallExpression): string | null {
  // Walk up the enclosing function chain. At each level, consider the
  // parameter binding names of that function. Return the first match in
  // priority order.
  let fn: Node | undefined = getEnclosingFunction(call);
  while (fn) {
    const paramNames = new Set(getParamNames(fn));
    for (const candidate of SEED_CANDIDATES_ORDERED) {
      if (paramNames.has(candidate)) return candidate;
    }
    fn = getEnclosingFunction(fn);
  }
  return null;
}

// ---------------------------------------------------------------------------
// Comment marker helpers
// ---------------------------------------------------------------------------

function lineAbove(node: Node, sf: SourceFile): string {
  const lineNum = node.getStartLineNumber();
  if (lineNum < 2) return "";
  const lines = sf.getFullText().split("\n");
  return (lines[lineNum - 2] ?? "").trimStart();
}

function hasMarkerAbove(node: Node, sf: SourceFile): boolean {
  return lineAbove(node, sf).startsWith(SKIP_MANUAL_SEED);
}

function prependComment(node: Node, sf: SourceFile, comment: string): void {
  // Insert the comment on its own line above the line containing the call,
  // matching the indentation of that line. Calls are often mid-line (e.g.
  // `const x = Math.random();`), so we anchor at the start of the line, not
  // the call's text position.
  const pos = node.getStart();
  const fullText = sf.getFullText();
  const lineStart = fullText.lastIndexOf("\n", pos - 1) + 1;
  const indent = fullText.slice(lineStart, pos).match(/^(\s*)/)?.[1] ?? "";
  sf.insertText(lineStart, `${indent}${comment}\n`);
}

// ---------------------------------------------------------------------------
// Import handling — seededFloats is a NAMED export from "@/lib/random"
// ---------------------------------------------------------------------------

function hasSeededFloatsImport(sf: SourceFile): boolean {
  return sf.getImportDeclarations().some((decl) => {
    if (decl.getModuleSpecifierValue() !== "@/lib/random") return false;
    return decl
      .getNamedImports()
      .some((ni) => ni.getName() === "seededFloats");
  });
}

function ensureSeededFloatsImport(sf: SourceFile): void {
  if (hasSeededFloatsImport(sf)) return;

  // If an import declaration already targets @/lib/random (e.g. for
  // seededPick), add seededFloats to its named import list.
  const existing = sf
    .getImportDeclarations()
    .find((decl) => decl.getModuleSpecifierValue() === "@/lib/random");
  if (existing) {
    existing.addNamedImport("seededFloats");
    return;
  }

  const imports = sf.getImportDeclarations();
  const insertPos =
    imports.length > 0
      ? imports[imports.length - 1]!.getChildIndex() + 1
      : 0;

  sf.insertImportDeclaration(insertPos, {
    namedImports: ["seededFloats"],
    moduleSpecifier: "@/lib/random",
  });
}

// ---------------------------------------------------------------------------
// Per-call processing
// ---------------------------------------------------------------------------

type ProcessResult = "transformed" | "skipped-with-comment" | "no-op";

function processCall(
  call: CallExpression,
  sf: SourceFile
): ProcessResult {
  const kind = classifyCall(call);
  if (kind === null) return "no-op";

  // Idempotency: a marker we (or a prior run) emitted lives on the line
  // above. Treat as already-handled.
  if (hasMarkerAbove(call, sf)) return "no-op";

  // Silent skip: event-handler / hook callback / handler-named function.
  if (isInsideEventHandlerOrHookCallback(call)) return "no-op";

  const seed = findSeedCandidate(call);
  if (seed === null) {
    prependComment(call, sf, SKIP_MANUAL_SEED);
    return "skipped-with-comment";
  }

  const replacement =
    kind === "math-random"
      ? `seededFloats(${seed}, 1)[0]`
      : `seededFloats(${seed}, 1)[0] * 1e12`;
  call.replaceWithText(replacement);

  ensureSeededFloatsImport(sf);
  return "transformed";
}

// ---------------------------------------------------------------------------
// Exported codemod
// ---------------------------------------------------------------------------

const migrateRandom: Codemod = {
  name: "migrate-random",

  transform(sourceFile: SourceFile): boolean {
    const filePath = sourceFile.getFilePath();
    if (filePath.includes("/components/ui/")) return false;
    // The detection target is *.tsx (render-time random in JSX components).
    if (!filePath.endsWith(".tsx")) return false;

    let changed = false;
    let iterations = 0;
    const MAX_ITERATIONS = 500; // safety guard

    while (iterations < MAX_ITERATIONS) {
      iterations++;

      // Re-collect candidate calls after every mutation since text replacement
      // and comment insertion invalidate AST positions.
      const calls: CallExpression[] = [];
      sourceFile.forEachDescendant((node) => {
        if (node.getKind() === SyntaxKind.CallExpression) {
          const call = node.asKindOrThrow(SyntaxKind.CallExpression);
          if (classifyCall(call) !== null) calls.push(call);
        }
      });

      if (calls.length === 0) break;

      let processed = false;
      for (const call of calls) {
        const result = processCall(call, sourceFile);
        if (result === "transformed" || result === "skipped-with-comment") {
          changed = true;
          processed = true;
          break; // re-collect after every mutation
        }
        // result === "no-op" → silent skip; try the next call without
        // re-collecting.
      }

      if (!processed) break;
    }

    return changed;
  },
};

export default migrateRandom;
