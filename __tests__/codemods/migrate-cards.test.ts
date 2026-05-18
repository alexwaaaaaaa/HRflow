/**
 * __tests__/codemods/migrate-cards.test.ts
 *
 * Vitest specs for the migrate-cards codemod.
 *
 * Covers:
 *   - Padding map: p-3 → padding="sm"
 *   - Padding map: p-5 → no padding prop (md is default)
 *   - Padding map: p-7 → padding="lg"
 *   - Elevated variant: chrome + heavy shadow → variant="elevated"
 *   - Empty card → // codemod-skip: empty-card prepended, <div> unchanged
 *   - Inline style overlap → // inline-style: codemod-cannot-merge prepended,
 *     <div> unchanged
 *   - Idempotency: a successful migration is a no-op on a second run
 *   - Idempotency: skip cases do not re-prepend the comment on a second run
 *   - Card primitive itself is silently skipped (file path inside ui/)
 *   - Preserves unrelated attributes (id, role, data-*, aria-*, onClick)
 *   - Drops className entirely when nothing remains after stripping
 */

import { describe, it, expect } from "vitest";
import { Project, type SourceFile } from "ts-morph";
import migrateCards from "../../scripts/codemods/migrate-cards";

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
  const changed = migrateCards.transform(sourceFile);
  return { changed, output: sourceFile.getFullText(), sourceFile };
}

// ---------------------------------------------------------------------------
// Padding map
// ---------------------------------------------------------------------------

describe("migrate-cards — padding map", () => {
  it("converts p-3 chrome to padding=\"sm\" and adds the Card import", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-3">',
      "      <span>Inside</span>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    // Tag renamed
    expect(output).toContain("<Card");
    expect(output).toContain("</Card>");
    expect(output).not.toMatch(/<div\b/);
    // Padding prop set
    expect(output).toContain('padding="sm"');
    // No variant prop (default chrome)
    expect(output).not.toContain('variant=');
    // className was stripped to empty and dropped entirely
    expect(output).not.toContain("className=");
    // Children preserved
    expect(output).toContain("<span>Inside</span>");
    // Import added
    expect(output).toContain('import Card from "@/components/ui/Card"');
  });

  it("omits padding prop for p-4 / p-5 chrome (md is the Card default)", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-xl p-5">',
      "      <h2>Hi</h2>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("<Card");
    expect(output).not.toContain('padding=');
    expect(output).not.toContain('variant=');
    expect(output).toContain("<h2>Hi</h2>");
    expect(output).toContain('import Card from "@/components/ui/Card"');
  });

  it('converts p-7 chrome to padding="lg"', () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-7">',
      "      <p>Roomy</p>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('padding="lg"');
    expect(output).not.toContain('variant=');
    expect(output).toContain("<p>Roomy</p>");
  });
});

// ---------------------------------------------------------------------------
// Elevated variant
// ---------------------------------------------------------------------------

describe("migrate-cards — elevated variant", () => {
  it('emits variant="elevated" when shadow chrome is present and strips the shadow class', () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">',
      "      <p>Elevated</p>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('variant="elevated"');
    expect(output).toContain('padding="lg"');
    // The shadow class should be stripped from any leftover className.
    expect(output).not.toContain("shadow-[0_4px_24px_rgba(0,0,0,0.5)]");
    // Leftover is empty so className should be gone entirely.
    expect(output).not.toContain("className=");
    expect(output).toContain("<p>Elevated</p>");
  });
});

// ---------------------------------------------------------------------------
// Skip: empty card
// ---------------------------------------------------------------------------

describe("migrate-cards — skip: empty card", () => {
  it("prepends // codemod-skip: empty-card and leaves an empty chrome <div> unchanged", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4"></div>',
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: empty-card");
    // Original <div> preserved verbatim
    expect(output).toMatch(/<div\b/);
    expect(output).toContain('bg-[#0D1928]');
    // No Card emitted, no import added
    expect(output).not.toContain("<Card");
    expect(output).not.toContain('import Card from "@/components/ui/Card"');
  });

  it("treats a self-closing chrome <div /> as empty too", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4" />',
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: empty-card");
    expect(output).not.toContain("<Card");
  });
});

// ---------------------------------------------------------------------------
// Skip: inline style overlap
// ---------------------------------------------------------------------------

describe("migrate-cards — skip: inline-style overlap", () => {
  it("prepends // inline-style: codemod-cannot-merge when the chrome <div> also has style={{...}}", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4" style={{ width: 100 }}>',
      "      <span>Inside</span>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// inline-style: codemod-cannot-merge");
    // Original <div> + style stay intact
    expect(output).toMatch(/<div\b/);
    expect(output).toContain("style={{ width: 100 }}");
    // No Card emitted
    expect(output).not.toContain("<Card");
    expect(output).not.toContain('import Card from "@/components/ui/Card"');
  });
});

// ---------------------------------------------------------------------------
// Attribute preservation + leftover className
// ---------------------------------------------------------------------------

describe("migrate-cards — attribute preservation", () => {
  it("preserves id, role, aria-*, data-*, and onClick attributes verbatim", () => {
    const input = [
      "export function Page() {",
      "  const handleClick = () => {};",
      "  return (",
      '    <div id="kpi" role="region" aria-label="KPI" data-test="card" onClick={handleClick} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4">',
      "      <span>x</span>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('id="kpi"');
    expect(output).toContain('role="region"');
    expect(output).toContain('aria-label="KPI"');
    expect(output).toContain('data-test="card"');
    expect(output).toContain("onClick={handleClick}");
    expect(output).toContain("<Card");
    // No padding/variant props for p-4 with no shadow
    expect(output).not.toContain('padding=');
    expect(output).not.toContain('variant=');
  });

  it("keeps non-chrome leftover classes on a Card className attribute", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="mt-6 flex flex-col gap-3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">',
      "      <span>x</span>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("<Card");
    // Leftover utilities preserved
    expect(output).toMatch(/className="mt-6 flex flex-col gap-3"/);
    // Chrome classes gone
    expect(output).not.toContain("bg-[#0D1928]");
    expect(output).not.toContain("border-[#1A2A3A]");
    expect(output).not.toMatch(/\brounded-2xl\b/);
    expect(output).not.toMatch(/\bp-5\b/);
  });
});

// ---------------------------------------------------------------------------
// Card primitive itself is skipped
// ---------------------------------------------------------------------------

describe("migrate-cards — file scope", () => {
  it("silently skips files inside components/ui/ and adds no comments", () => {
    const input = [
      "export function CardLike() {",
      "  return (",
      '    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4">',
      "      <span>x</span>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(
      input,
      "/repo/components/ui/SomethingCard.tsx"
    );

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });
});

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

describe("migrate-cards — idempotency", () => {
  it("returns false on the second run after a successful migration", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-3">',
      "      <span>x</span>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateCards.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateCards.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);
  });

  it("does not re-prepend the empty-card skip comment on a second run", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4"></div>',
      "  );",
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateCards.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateCards.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);

    // Comment present exactly once
    const matches = afterFirst.match(/\/\/ codemod-skip: empty-card/g) ?? [];
    expect(matches).toHaveLength(1);
  });

  it("does not re-prepend the inline-style skip comment on a second run", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4" style={{ width: 100 }}>',
      "      <span>x</span>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateCards.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateCards.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);

    const matches =
      afterFirst.match(/\/\/ inline-style: codemod-cannot-merge/g) ?? [];
    expect(matches).toHaveLength(1);
  });
});
