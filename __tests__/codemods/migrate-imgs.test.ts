/**
 * __tests__/codemods/migrate-imgs.test.ts
 *
 * Vitest specs for the migrate-imgs codemod.
 *
 * Covers:
 *   - Happy path with explicit numeric expression dimensions + alt.
 *   - Happy path with numeric *string* dimensions (width="100").
 *   - Missing alt → adds alt="" + // codemod-review: confirm-decorative.
 *   - Missing dimensions (no width/height) → skip with
 *     // codemod-skip: img-needs-dimensions, no Image import.
 *   - Percentage width ("100%") → skip with img-needs-dimensions.
 *   - Variable / dynamic width → skip with img-needs-dimensions.
 *   - Data URL src → skip with // codemod-skip: data-url-img.
 *   - Idempotency: running twice on a happy case returns false on the second
 *     run and produces identical output. Skip markers are not re-prepended.
 *   - Files inside components/ui/ are silently skipped.
 *   - Existing `import Image from "next/image"` is not duplicated.
 */

import { describe, it, expect } from "vitest";
import { Project, type SourceFile } from "ts-morph";
import migrateImgs from "../../scripts/codemods/migrate-imgs";

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
  const changed = migrateImgs.transform(sourceFile);
  return { changed, output: sourceFile.getFullText(), sourceFile };
}

// ---------------------------------------------------------------------------
// Happy paths
// ---------------------------------------------------------------------------

describe("migrate-imgs — happy paths", () => {
  it("migrates <img> with explicit numeric dimensions and alt to <Image>", () => {
    const input = [
      "export function Page() {",
      '  return <img src="/logo.png" alt="Logo" width={120} height={40} />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain(
      '<Image src="/logo.png" alt="Logo" width={120} height={40} />'
    );
    // Raw <img> is gone
    expect(output).not.toMatch(/<img\b/);
    // Image import added
    expect(output).toContain('import Image from "next/image"');
    // No review comment because alt was present
    expect(output).not.toContain("// codemod-review: confirm-decorative");
    // No skip comments
    expect(output).not.toContain("// codemod-skip:");
  });

  it("migrates <img> with numeric *string* dimensions to <Image>", () => {
    const input = [
      "export function Page() {",
      '  return <img src="/x.png" alt="X" width="100" height="50" />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    // Attributes preserved verbatim — string form stays "100"/"50"
    expect(output).toContain(
      '<Image src="/x.png" alt="X" width="100" height="50" />'
    );
    expect(output).not.toMatch(/<img\b/);
    expect(output).toContain('import Image from "next/image"');
    expect(output).not.toContain("// codemod-skip:");
  });

  it("preserves additional attributes (className, id, data-*) verbatim", () => {
    const input = [
      "export function Page() {",
      '  return <img src="/avatar.png" alt="Me" width={48} height={48} className="rounded-full" id="me" data-test="avatar" />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('src="/avatar.png"');
    expect(output).toContain('alt="Me"');
    expect(output).toContain("width={48}");
    expect(output).toContain("height={48}");
    expect(output).toContain('className="rounded-full"');
    expect(output).toContain('id="me"');
    expect(output).toContain('data-test="avatar"');
    expect(output).toContain("<Image");
    expect(output).not.toMatch(/<img\b/);
  });
});

// ---------------------------------------------------------------------------
// Missing alt → review comment
// ---------------------------------------------------------------------------

describe("migrate-imgs — missing alt", () => {
  it('adds alt="" and prepends // codemod-review: confirm-decorative above the new <Image>', () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <img src="/dec.png" width={10} height={10} />',
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    // alt="" added
    expect(output).toContain('alt=""');
    // The migrated element exists
    expect(output).toContain("<Image");
    expect(output).not.toMatch(/<img\b/);
    // Review comment present
    expect(output).toContain("// codemod-review: confirm-decorative");
    // Image import added
    expect(output).toContain('import Image from "next/image"');

    // The review comment should sit on the line immediately above the
    // <Image> tag in the output.
    const lines = output.split("\n");
    const imageLineIdx = lines.findIndex((l) => l.includes("<Image"));
    expect(imageLineIdx).toBeGreaterThan(0);
    const prev = (lines[imageLineIdx - 1] ?? "").trimStart();
    expect(prev).toBe("// codemod-review: confirm-decorative");
  });
});

// ---------------------------------------------------------------------------
// Skip cases
// ---------------------------------------------------------------------------

describe("migrate-imgs — missing dimensions", () => {
  it("skips with // codemod-skip: img-needs-dimensions when both width and height are missing", () => {
    const input = [
      "export function Page() {",
      '  return <img src="/x.png" alt="X" />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: img-needs-dimensions");
    // <img> unchanged
    expect(output).toContain('<img src="/x.png" alt="X" />');
    // No Image import
    expect(output).not.toContain('import Image from "next/image"');
    // No <Image> tag emitted
    expect(output).not.toMatch(/<Image\b/);
  });

  it("skips when width is a percentage string", () => {
    const input = [
      "export function Page() {",
      '  return <img src="/x.png" alt="X" width="100%" height={50} />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: img-needs-dimensions");
    expect(output).toContain(
      '<img src="/x.png" alt="X" width="100%" height={50} />'
    );
    expect(output).not.toContain('import Image from "next/image"');
    expect(output).not.toMatch(/<Image\b/);
  });

  it("skips when width is a dynamic variable expression", () => {
    const input = [
      "export function Page({ w }: { w: number }) {",
      '  return <img src="/x.png" alt="X" width={w} height={50} />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: img-needs-dimensions");
    expect(output).toContain(
      '<img src="/x.png" alt="X" width={w} height={50} />'
    );
    expect(output).not.toContain('import Image from "next/image"');
  });
});

describe("migrate-imgs — data URL src", () => {
  it("skips with // codemod-skip: data-url-img when src is a data URL", () => {
    const input = [
      "export function Page() {",
      '  return <img src="data:image/png;base64,iVBORw0KGgo=" alt="dot" width={4} height={4} />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: data-url-img");
    expect(output).toContain(
      '<img src="data:image/png;base64,iVBORw0KGgo=" alt="dot" width={4} height={4} />'
    );
    expect(output).not.toContain('import Image from "next/image"');
    expect(output).not.toMatch(/<Image\b/);
  });
});

// ---------------------------------------------------------------------------
// File-scope skip
// ---------------------------------------------------------------------------

describe("migrate-imgs — file scope", () => {
  it("silently skips files inside components/ui/", () => {
    const input = [
      "export function ImageLike() {",
      '  return <img src="/logo.png" alt="Logo" width={120} height={40} />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input, "/repo/components/ui/SomeImg.tsx");

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });
});

// ---------------------------------------------------------------------------
// Import handling
// ---------------------------------------------------------------------------

describe("migrate-imgs — Image import", () => {
  it("does not duplicate the Image import when it already exists", () => {
    const input = [
      'import Image from "next/image";',
      "",
      "export function Page() {",
      '  return <img src="/logo.png" alt="Logo" width={120} height={40} />;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain(
      '<Image src="/logo.png" alt="Logo" width={120} height={40} />'
    );
    const matches =
      output.match(/import Image from "next\/image"/g) ?? [];
    expect(matches).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

describe("migrate-imgs — idempotency", () => {
  it("returns false on the second run after a successful migration", () => {
    const input = [
      "export function Page() {",
      '  return <img src="/logo.png" alt="Logo" width={120} height={40} />;',
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateImgs.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateImgs.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);
  });

  it("does not re-prepend the missing-dimensions skip comment on a second run", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <img src="/x.png" alt="X" />',
      "  );",
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateImgs.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateImgs.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);

    const matches =
      afterFirst.match(/\/\/ codemod-skip: img-needs-dimensions/g) ?? [];
    expect(matches).toHaveLength(1);
  });

  it("does not re-prepend the data-url skip comment on a second run", () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <img src="data:image/png;base64,AAA=" alt="dot" width={4} height={4} />',
      "  );",
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateImgs.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateImgs.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);

    const matches =
      afterFirst.match(/\/\/ codemod-skip: data-url-img/g) ?? [];
    expect(matches).toHaveLength(1);
  });

  it("does not re-prepend the confirm-decorative review comment on a second run", () => {
    const input = [
      "export function Page() {",
      '  return <img src="/dec.png" width={10} height={10} />;',
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateImgs.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateImgs.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);

    const matches =
      afterFirst.match(/\/\/ codemod-review: confirm-decorative/g) ?? [];
    expect(matches).toHaveLength(1);
  });
});
