/**
 * __tests__/codemods/migrate-random.test.ts
 *
 * Vitest specs for the migrate-random codemod.
 *
 * Covers:
 *   1. Render-time `Math.random()` with `index` in scope → migrates to
 *      `seededFloats(index, 1)[0]`, import added.
 *   2. Render-time `Date.now()` with `id` destructured from a prop in scope
 *      → migrates with `id` as seed.
 *   3. `Math.random()` inside `<button onClick={() => Math.random()}>` →
 *      skipped silently (no comment, no import).
 *   4. `Math.random()` inside a function named `handleSubmit` → skipped
 *      silently.
 *   5. Render-time `Math.random()` with no seed candidate → skipped with
 *      `// codemod-skip: random-needs-manual-seed`.
 *   6. Idempotency: second run on a migrated file returns false and produces
 *      identical output.
 *   7. Idempotency: skip-comment is not re-prepended on a second run.
 *   8. Files inside components/ui/ are silently skipped.
 *   9. Existing `import { seededPick } from "@/lib/random"` is augmented with
 *      `seededFloats`, not duplicated.
 *  10. `Math.random()` inside `useEffect` callback is skipped silently.
 */

import { describe, it, expect } from "vitest";
import { Project, type SourceFile } from "ts-morph";
import migrateRandom from "../../scripts/codemods/migrate-random";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface RunResult {
  changed: boolean;
  output: string;
  sourceFile: SourceFile;
}

function makeSourceFile(code: string, fileName = "test.tsx"): SourceFile {
  const project = new Project({
    compilerOptions: { jsx: 2 /* React */, allowJs: true },
    skipAddingFilesFromTsConfig: true,
    useInMemoryFileSystem: true,
  });
  return project.createSourceFile(fileName, code);
}

function run(code: string, fileName = "test.tsx"): RunResult {
  const sourceFile = makeSourceFile(code, fileName);
  const changed = migrateRandom.transform(sourceFile);
  return { changed, output: sourceFile.getFullText(), sourceFile };
}

// ---------------------------------------------------------------------------
// Happy paths
// ---------------------------------------------------------------------------

describe("migrate-random — happy paths", () => {
  it("migrates render-time Math.random() with `index` parameter to seededFloats(index, 1)[0]", () => {
    const input = [
      "export function Row({ index }: { index: number }) {",
      "  const opacity = Math.random();",
      "  return <div style={{ opacity }} />;",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("const opacity = seededFloats(index, 1)[0];");
    expect(output).not.toMatch(/Math\.random\(\)/);
    expect(output).toContain('import { seededFloats } from "@/lib/random"');
    expect(output).not.toContain("// codemod-skip:");
  });

  it("migrates render-time Date.now() with destructured `id` to seededFloats(id, 1)[0] * 1e12", () => {
    const input = [
      "export function Card({ id }: { id: number }) {",
      "  const nonce = Date.now();",
      "  return <div data-nonce={nonce} />;",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("const nonce = seededFloats(id, 1)[0] * 1e12;");
    expect(output).not.toMatch(/Date\.now\(\)/);
    expect(output).toContain('import { seededFloats } from "@/lib/random"');
  });

  it("prefers `index` over `id` when both are in scope", () => {
    const input = [
      "export function Row({ index, id }: { index: number; id: number }) {",
      "  return <div data-x={Math.random()} />;",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("seededFloats(index, 1)[0]");
    expect(output).not.toContain("seededFloats(id");
  });
});

// ---------------------------------------------------------------------------
// Event-handler skips (silent — no comment)
// ---------------------------------------------------------------------------

describe("migrate-random — event-handler skips", () => {
  it("silently skips Math.random() inside <button onClick={() => ...}>", () => {
    const input = [
      "export function Page({ index }: { index: number }) {",
      "  return <button onClick={() => Math.random()}>Reroll</button>;",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    expect(output).toBe(input);
    expect(output).toContain("Math.random()");
    expect(output).not.toContain("// codemod-skip:");
    expect(output).not.toContain('import { seededFloats } from "@/lib/random"');
  });

  it("silently skips Math.random() inside a function named handleSubmit", () => {
    const input = [
      "export function Page({ index }: { index: number }) {",
      "  function handleSubmit() {",
      "    return Math.random();",
      "  }",
      "  return <form onSubmit={handleSubmit} />;",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    expect(output).toBe(input);
    expect(output).toContain("Math.random()");
    expect(output).not.toContain("// codemod-skip:");
    expect(output).not.toContain('import { seededFloats } from "@/lib/random"');
  });

  it("silently skips Math.random() inside a useEffect callback", () => {
    const input = [
      'import { useEffect } from "react";',
      "",
      "export function Page({ index }: { index: number }) {",
      "  useEffect(() => {",
      "    console.log(Math.random());",
      "  }, []);",
      "  return null;",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    expect(output).toBe(input);
    expect(output).toContain("Math.random()");
    expect(output).not.toContain("// codemod-skip:");
  });
});

// ---------------------------------------------------------------------------
// Missing-seed skip (manual marker)
// ---------------------------------------------------------------------------

describe("migrate-random — missing seed", () => {
  it("prepends // codemod-skip: random-needs-manual-seed when no seed candidate is in scope", () => {
    const input = [
      "export function Page() {",
      "  const x = Math.random();",
      "  return <div data-x={x} />;",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: random-needs-manual-seed");
    // Original call is unchanged
    expect(output).toContain("const x = Math.random();");
    // No import was added
    expect(output).not.toContain('import { seededFloats } from "@/lib/random"');

    // The skip comment should sit on the line immediately above the call.
    const lines = output.split("\n");
    const callLineIdx = lines.findIndex((l) => l.includes("Math.random()"));
    expect(callLineIdx).toBeGreaterThan(0);
    const prev = (lines[callLineIdx - 1] ?? "").trimStart();
    expect(prev).toBe("// codemod-skip: random-needs-manual-seed");
  });
});

// ---------------------------------------------------------------------------
// File-scope skip
// ---------------------------------------------------------------------------

describe("migrate-random — file scope", () => {
  it("silently skips files inside components/ui/", () => {
    const input = [
      "export function UiThing({ index }: { index: number }) {",
      "  const x = Math.random();",
      "  return <div data-x={x} />;",
      "}",
    ].join("\n");

    const { changed, output } = run(input, "/repo/components/ui/Thing.tsx");

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });

  it("silently skips non-tsx files", () => {
    const input = [
      "export function get(index: number) {",
      "  return Math.random() + index;",
      "}",
    ].join("\n");

    const { changed, output } = run(input, "/repo/lib/util.ts");

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });
});

// ---------------------------------------------------------------------------
// Import handling
// ---------------------------------------------------------------------------

describe("migrate-random — import handling", () => {
  it("does not duplicate the seededFloats import when it already exists", () => {
    const input = [
      'import { seededFloats } from "@/lib/random";',
      "",
      "export function Row({ index }: { index: number }) {",
      "  const x = Math.random();",
      "  return <div data-x={x} />;",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("seededFloats(index, 1)[0]");
    const matches = output.match(/import \{ seededFloats \} from "@\/lib\/random"/g) ?? [];
    expect(matches).toHaveLength(1);
  });

  it("adds seededFloats to an existing @/lib/random named import (e.g. seededPick)", () => {
    const input = [
      'import { seededPick } from "@/lib/random";',
      "",
      "export function Row({ index }: { index: number }) {",
      "  const x = Math.random();",
      "  return <div data-x={x} />;",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("seededFloats(index, 1)[0]");
    // Single import declaration with both named imports
    const importDecls =
      output.match(/import \{[^}]*\} from "@\/lib\/random"/g) ?? [];
    expect(importDecls).toHaveLength(1);
    expect(importDecls[0]).toContain("seededFloats");
    expect(importDecls[0]).toContain("seededPick");
  });
});

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

describe("migrate-random — idempotency", () => {
  it("returns false on a second run after a successful migration", () => {
    const input = [
      "export function Row({ index }: { index: number }) {",
      "  const x = Math.random();",
      "  return <div data-x={x} />;",
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateRandom.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateRandom.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);
  });

  it("does not re-prepend the missing-seed skip comment on a second run", () => {
    const input = [
      "export function Page() {",
      "  const x = Math.random();",
      "  return <div data-x={x} />;",
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateRandom.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateRandom.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);

    const matches =
      afterFirst.match(/\/\/ codemod-skip: random-needs-manual-seed/g) ?? [];
    expect(matches).toHaveLength(1);
  });
});
