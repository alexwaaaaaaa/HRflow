/**
 * __tests__/codemods/migrate-buttons.test.ts
 *
 * Vitest specs for the migrate-buttons codemod.
 *
 * Covers:
 *   - 5 happy paths (primary / secondary / outline / ghost / danger)
 *   - 2 skip cases (unclassifiable, dangerouslySetInnerHTML)
 *   - 1 idempotency check
 *
 * Strategy: build a ts-morph Project, create an in-memory test.tsx, run
 * the codemod, assert on sourceFile.getFullText().
 */

import { describe, it, expect } from "vitest";
import { Project, type SourceFile } from "ts-morph";
import migrateButtons from "../../scripts/codemods/migrate-buttons";

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
  const changed = migrateButtons.transform(sourceFile);
  return { changed, output: sourceFile.getFullText(), sourceFile };
}

// ---------------------------------------------------------------------------
// 5 happy paths — one per variant
// ---------------------------------------------------------------------------

describe("migrate-buttons — happy paths", () => {
  it("classifies brand-green button as variant=primary", () => {
    const input = [
      "export function Page() {",
      '  return <button className="bg-[#00e5a0] text-[#04080f] h-[38px] px-4" onClick={save}>Save</button>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<Button variant="primary" onClick={save}>Save</Button>');
    // No size prop because md is the default
    expect(output).not.toContain('size="md"');
    // Original className must be dropped
    expect(output).not.toContain('className="bg-[#00e5a0]');
    // Import must be added
    expect(output).toContain('import Button from "@/components/ui/Button"');
    // Raw <button> must be gone
    expect(output).not.toMatch(/<button\b/);
  });

  it("classifies dark-fill button as variant=secondary", () => {
    const input = [
      "export function Page() {",
      '  return <button className="bg-[#0f1c2e] text-[#c8d8e8] border border-[#162030]" type="button">Cancel</button>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain(
      '<Button variant="secondary" type="button">Cancel</Button>'
    );
    expect(output).toContain('import Button from "@/components/ui/Button"');
  });

  it("classifies bordered transparent button with neutral text as variant=outline", () => {
    const input = [
      "export function Page() {",
      '  return <button className="bg-transparent text-[#7a8fa6] border border-[#162030]" disabled>Back</button>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<Button variant="outline" disabled>Back</Button>');
    expect(output).toContain('import Button from "@/components/ui/Button"');
  });

  it("classifies transparent + green-tinted button as variant=ghost", () => {
    const input = [
      "export function Page() {",
      '  return <button className="bg-transparent text-[#00e5a0] border border-[rgba(0,229,160,0.3)]" aria-label="Add">+</button>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain(
      '<Button variant="ghost" aria-label="Add">+</Button>'
    );
    expect(output).toContain('import Button from "@/components/ui/Button"');
  });

  it("classifies red-tinted button as variant=danger and detects size=sm", () => {
    const input = [
      "export function Page() {",
      '  return <button className="bg-[rgba(239,68,68,0.1)] text-[#ef4444] h-8 px-3" onClick={remove}>Delete</button>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain(
      '<Button variant="danger" size="sm" onClick={remove}>Delete</Button>'
    );
    expect(output).toContain('import Button from "@/components/ui/Button"');
  });
});

// ---------------------------------------------------------------------------
// 2 skip cases
// ---------------------------------------------------------------------------

describe("migrate-buttons — skip cases", () => {
  it("prepends an uncertain comment for unclassifiable className and leaves the <button> intact", () => {
    const input = [
      "export function Page() {",
      '  return <button className="some-totally-random-class">X</button>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    // We DID change the file — by adding the comment — so changed is true,
    // but the underlying <button> tag must remain unchanged.
    expect(changed).toBe(true);
    expect(output).toContain("// raw-button: codemod-uncertain — review manually");
    expect(output).toContain(
      '<button className="some-totally-random-class">X</button>'
    );
    // No Button import should be added because no transformation happened
    expect(output).not.toContain('import Button from "@/components/ui/Button"');
  });

  it("skips <button> with dangerouslySetInnerHTML and makes no changes", () => {
    const input = [
      "export function Page() {",
      '  const html = { __html: "<i>x</i>" };',
      '  return <button className="bg-[#00e5a0]" dangerouslySetInnerHTML={html} />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    // Original button is preserved verbatim
    expect(output).toContain(
      '<button className="bg-[#00e5a0]" dangerouslySetInnerHTML={html} />'
    );
    // No Button import
    expect(output).not.toContain('import Button from "@/components/ui/Button"');
    // No uncertain comment either — dangerouslySetInnerHTML is a hard skip
    expect(output).not.toContain("// raw-button:");
  });
});

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

describe("migrate-buttons — idempotency", () => {
  it("returns false on a second run after a successful migration (no further changes)", () => {
    const input = [
      "export function Page() {",
      '  return <button className="bg-[#00e5a0] text-[#04080f]" onClick={save}>Save</button>;',
      "}",
    ].join("\n");

    // First run mutates and returns true
    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateButtons.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    // Second run on the same SourceFile must be a no-op
    const secondChanged = migrateButtons.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);
  });
});
