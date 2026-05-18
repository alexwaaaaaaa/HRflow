/**
 * __tests__/codemods/add-input-labels.test.ts
 *
 * Vitest specs for the add-input-labels codemod.
 *
 * Covers:
 *   1. Adjacent <span> label → input gets `id`, span renamed to
 *      <label htmlFor>.
 *   2. Placeholder-only input → aria-label="<placeholder>" + skip comment.
 *   3. Empty input (no name, no placeholder) → aria-label="<file-stem-line>"
 *      + skip comment.
 *   4. Existing id attribute → silent no-op.
 *   5. Existing aria-label attribute → silent no-op.
 *   6. Input wrapped in an ancestor <label> → silent no-op.
 *   7. Idempotency — second run is a no-op for both Case A and Case B.
 *   8. Files inside components/ui/ are silently skipped.
 *   9. <select> and <textarea> are processed too.
 *  10. name="firstName" → id="first-name" (kebab-case).
 *  11. <p> as label sibling is also detected.
 *  12. Existing aria-labelledby is treated as labelled.
 */

import { describe, it, expect } from "vitest";
import { Project, type SourceFile } from "ts-morph";
import addInputLabels from "../../scripts/codemods/add-input-labels";

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
  const changed = addInputLabels.transform(sourceFile);
  return { changed, output: sourceFile.getFullText(), sourceFile };
}

// ---------------------------------------------------------------------------
// Case A — visible label found
// ---------------------------------------------------------------------------

describe("add-input-labels — adjacent label", () => {
  it('wires input with name="email" to a preceding <span> label', () => {
    const input = [
      "export function Page() {",
      "  return (",
      "    <div>",
      "      <span>Email</span>",
      '      <input name="email" />',
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    // Input got id="email" (kebab of name)
    expect(output).toContain('id="email"');
    // Span was rewritten as <label htmlFor="email">
    expect(output).toContain('<label htmlFor="email">Email</label>');
    // Original loose <span> is gone
    expect(output).not.toMatch(/<span>Email<\/span>/);
    // No skip comment for the happy path
    expect(output).not.toContain("// codemod-skip:");
    // No aria-label fallback
    expect(output).not.toContain("aria-label=");
  });

  it("kebab-cases camelCase name into id", () => {
    const input = [
      "export function Page() {",
      "  return (",
      "    <div>",
      "      <span>First name</span>",
      '      <input name="firstName" />',
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('id="first-name"');
    expect(output).toContain('<label htmlFor="first-name">First name</label>');
  });

  it("recognises a preceding <p> as the label", () => {
    const input = [
      "export function Page() {",
      "  return (",
      "    <div>",
      "      <p>Phone</p>",
      '      <input name="phone" />',
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<label htmlFor="phone">Phone</label>');
    expect(output).toContain('id="phone"');
  });

  it("preserves other attributes on the rewritten label element", () => {
    const input = [
      "export function Page() {",
      "  return (",
      "    <div>",
      '      <span className="text-sm">Email</span>',
      '      <input name="email" />',
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain(
      '<label htmlFor="email" className="text-sm">Email</label>'
    );
  });
});

// ---------------------------------------------------------------------------
// Case B — no visible label
// ---------------------------------------------------------------------------

describe("add-input-labels — placeholder only (manual review)", () => {
  it('adds aria-label from name and prepends skip comment', () => {
    const input = [
      "export function Page() {",
      '  return <input name="phone" placeholder="Phone number" />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: needs-manual-label");
    // id added from kebab of name
    expect(output).toContain('id="phone"');
    // aria-label is one of the two acceptable fallbacks (name or placeholder)
    expect(output).toMatch(/aria-label="(phone|Phone number)"/);

    // Skip comment immediately above the <input>
    const lines = output.split("\n");
    const inputLineIdx = lines.findIndex((l) => l.includes("<input"));
    expect(inputLineIdx).toBeGreaterThan(0);
    expect((lines[inputLineIdx - 1] ?? "").trimStart()).toBe(
      "// codemod-skip: needs-manual-label"
    );
  });

  it("uses placeholder for aria-label when name is missing", () => {
    const input = [
      "export function Page() {",
      '  return <input placeholder="Search jobs" />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: needs-manual-label");
    expect(output).toContain('aria-label="Search jobs"');
    expect(output).toContain('id="');
  });
});

describe("add-input-labels — bare input (manual review)", () => {
  it("adds aria-label using file-stem + line as fallback", () => {
    const input = [
      "export function Page() {",
      '  return <input type="text" />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input, "/repo/app/(app)/page.tsx");

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: needs-manual-label");
    // id and aria-label both fall back to file-stem-line ("page-2")
    expect(output).toMatch(/id="page-\d+"/);
    expect(output).toMatch(/aria-label="page-\d+"/);
  });
});

// ---------------------------------------------------------------------------
// Skip cases
// ---------------------------------------------------------------------------

describe("add-input-labels — already labelled (silent no-op)", () => {
  it("silently skips inputs with an existing id attribute", () => {
    const input = [
      "export function Page() {",
      '  return <input id="custom-id" name="email" />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });

  it("silently skips inputs with an existing aria-label attribute", () => {
    const input = [
      "export function Page() {",
      '  return <input aria-label="Email address" name="email" />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });

  it("silently skips inputs with an existing aria-labelledby attribute", () => {
    const input = [
      "export function Page() {",
      "  return (",
      "    <div>",
      '      <span id="lbl">Email</span>',
      '      <input aria-labelledby="lbl" name="email" />',
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });

  it("silently skips inputs wrapped in an ancestor <label>", () => {
    const input = [
      "export function Page() {",
      "  return (",
      "    <label>",
      "      Email",
      '      <input name="email" />',
      "    </label>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });

  it("silently skips files inside components/ui/", () => {
    const input = [
      "export function Field() {",
      '  return <input name="email" placeholder="Email" />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input, "/repo/components/ui/Input.tsx");

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });
});

// ---------------------------------------------------------------------------
// <select> and <textarea>
// ---------------------------------------------------------------------------

describe("add-input-labels — select and textarea", () => {
  it("labels a <select> with adjacent text", () => {
    const input = [
      "export function Page() {",
      "  return (",
      "    <div>",
      "      <span>Country</span>",
      '      <select name="country"><option>India</option></select>',
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<label htmlFor="country">Country</label>');
    expect(output).toContain('id="country"');
  });

  it("labels a placeholder-only <textarea> with skip comment", () => {
    const input = [
      "export function Page() {",
      '  return <textarea name="comments" placeholder="Add a comment" />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: needs-manual-label");
    expect(output).toContain('id="comments"');
    expect(output).toMatch(/aria-label="(comments|Add a comment)"/);
  });
});

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

describe("add-input-labels — idempotency", () => {
  it("returns false on a second run after a Case A migration", () => {
    const input = [
      "export function Page() {",
      "  return (",
      "    <div>",
      "      <span>Email</span>",
      '      <input name="email" />',
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const sf = makeSourceFile(input);
    const first = addInputLabels.transform(sf);
    expect(first).toBe(true);
    const afterFirst = sf.getFullText();

    const second = addInputLabels.transform(sf);
    expect(second).toBe(false);
    expect(sf.getFullText()).toBe(afterFirst);
  });

  it("returns false on a second run after a Case B migration", () => {
    const input = [
      "export function Page() {",
      '  return <input name="phone" placeholder="Phone number" />;',
      "}",
    ].join("\n");

    const sf = makeSourceFile(input);
    const first = addInputLabels.transform(sf);
    expect(first).toBe(true);
    const afterFirst = sf.getFullText();

    const second = addInputLabels.transform(sf);
    expect(second).toBe(false);
    expect(sf.getFullText()).toBe(afterFirst);

    // The skip comment appears exactly once.
    const matches =
      afterFirst.match(/\/\/ codemod-skip: needs-manual-label/g) ?? [];
    expect(matches).toHaveLength(1);
  });
});
