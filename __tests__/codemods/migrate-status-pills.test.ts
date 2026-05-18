/**
 * __tests__/codemods/migrate-status-pills.test.ts
 *
 * Vitest specs for the migrate-status-pills codemod.
 *
 * Covers:
 *   - All 7 variants:
 *       emerald → variant="success"
 *       amber   → variant="warning"
 *       red     → variant="danger"
 *       blue    → variant="info"
 *       purple  → variant="purple"
 *       slate   → no variant prop (neutral is the default)
 *       gradient → variant="ai"
 *   - Aliases (green/yellow/rose/indigo/violet/gray) hit the same variants.
 *   - Skip cases:
 *       - File inside components/ui/                → no-op
 *       - <span> with non-pill className            → left alone
 *   - Attribute preservation (id, role, aria-*, data-*).
 *   - className stripping leaves leftover utility classes intact, drops the
 *     attribute when leftover is empty.
 *   - Named-import handling: doesn't duplicate when Badge already imported.
 *   - Idempotency: a successful migration is a no-op on a second run, and the
 *     resulting source file is identical.
 */

import { describe, it, expect } from "vitest";
import { Project, type SourceFile } from "ts-morph";
import migrateStatusPills from "../../scripts/codemods/migrate-status-pills";

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
  const changed = migrateStatusPills.transform(sourceFile);
  return { changed, output: sourceFile.getFullText(), sourceFile };
}

// ---------------------------------------------------------------------------
// Variant mapping — one test per documented variant
// ---------------------------------------------------------------------------

describe("migrate-status-pills — variant mapping", () => {
  it('emerald chrome → variant="success"', () => {
    const input = [
      "export function Page() {",
      "  return (",
      '    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">',
      "      Active",
      "    </span>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<Badge variant="success"');
    expect(output).toContain("</Badge>");
    expect(output).not.toMatch(/<span\b/);
    // chrome stripped → className attribute dropped entirely
    expect(output).not.toContain("className=");
    // Children preserved
    expect(output).toContain("Active");
    // Named import added
    expect(output).toContain('import { Badge } from "@/components/ui/Badge"');
  });

  it('amber chrome → variant="warning"', () => {
    const input = [
      "export function Page() {",
      '  return <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20">Pending</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<Badge variant="warning">Pending</Badge>');
    expect(output).toContain('import { Badge } from "@/components/ui/Badge"');
  });

  it('red chrome → variant="danger"', () => {
    const input = [
      "export function Page() {",
      '  return <span className="bg-red-500/10 text-red-400 border border-red-500/20">Failed</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<Badge variant="danger">Failed</Badge>');
  });

  it('blue chrome → variant="info"', () => {
    const input = [
      "export function Page() {",
      '  return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20">In Progress</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<Badge variant="info">In Progress</Badge>');
  });

  it('purple chrome → variant="purple"', () => {
    const input = [
      "export function Page() {",
      '  return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/25">Beta</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<Badge variant="purple">Beta</Badge>');
  });

  it("slate chrome → no variant prop (neutral is the default)", () => {
    const input = [
      "export function Page() {",
      '  return <span className="bg-slate-500/10 text-slate-400 border border-slate-500/20">Draft</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    // <Badge> with NO variant prop, since neutral is the default
    expect(output).toContain("<Badge>Draft</Badge>");
    expect(output).not.toContain('variant="neutral"');
    expect(output).not.toMatch(/<span\b/);
    expect(output).toContain('import { Badge } from "@/components/ui/Badge"');
  });

  it('gradient chrome → variant="ai"', () => {
    const input = [
      "export function Page() {",
      '  return <span className="bg-gradient-to-r from-[rgba(139,92,246,0.2)] to-[rgba(59,130,246,0.2)] text-[#a78bfa] border border-[rgba(139,92,246,0.25)]">AI</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<Badge variant="ai">AI</Badge>');
    expect(output).not.toContain("bg-gradient-to-r");
    expect(output).not.toContain("from-[rgba");
    expect(output).not.toContain("border-[rgba");
    expect(output).toContain('import { Badge } from "@/components/ui/Badge"');
  });
});

// ---------------------------------------------------------------------------
// Aliases (R4.3 bidirectional mapping)
// ---------------------------------------------------------------------------

describe("migrate-status-pills — color aliases", () => {
  it.each([
    ["green", "success"],
    ["yellow", "warning"],
    ["rose", "danger"],
    ["indigo", "info"],
    ["violet", "purple"],
  ] as const)("%s alias maps to variant=%s", (color, variant) => {
    const input = `export const X = <span className="bg-${color}-500/10 text-${color}-400 border border-${color}-500/20">x</span>;`;
    const { changed, output } = run(input);
    expect(changed).toBe(true);
    expect(output).toContain(`<Badge variant="${variant}">x</Badge>`);
  });

  it("gray alias maps to neutral (no variant prop)", () => {
    const input = `export const X = <span className="bg-gray-500/10 text-gray-400 border border-gray-500/20">x</span>;`;
    const { changed, output } = run(input);
    expect(changed).toBe(true);
    expect(output).toContain("<Badge>x</Badge>");
  });
});

// ---------------------------------------------------------------------------
// className leftover handling
// ---------------------------------------------------------------------------

describe("migrate-status-pills — className handling", () => {
  it("preserves non-chrome utility classes on the new Badge", () => {
    const input = [
      "export function Page() {",
      '  return <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('variant="success"');
    expect(output).toContain('className="inline-flex items-center gap-1"');
    // Chrome classes gone
    expect(output).not.toContain("bg-emerald-500/10");
    expect(output).not.toContain("text-emerald-400");
    expect(output).not.toContain("border-emerald-500/20");
  });

  it("drops className entirely when nothing remains after stripping", () => {
    const input = [
      "export function Page() {",
      '  return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20">Info</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).not.toContain("className=");
    expect(output).toContain('<Badge variant="info">Info</Badge>');
  });
});

// ---------------------------------------------------------------------------
// Attribute preservation
// ---------------------------------------------------------------------------

describe("migrate-status-pills — attribute preservation", () => {
  it("preserves id, role, aria-*, data-* verbatim", () => {
    const input = [
      "export function Page() {",
      '  return <span id="status-pill" role="status" aria-live="polite" data-test="pill" className="bg-amber-500/10 text-amber-500 border border-amber-500/20">Pending</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('id="status-pill"');
    expect(output).toContain('role="status"');
    expect(output).toContain('aria-live="polite"');
    expect(output).toContain('data-test="pill"');
    expect(output).toContain('variant="warning"');
  });
});

// ---------------------------------------------------------------------------
// Skip cases
// ---------------------------------------------------------------------------

describe("migrate-status-pills — skip cases", () => {
  it("silently skips files inside components/ui/", () => {
    const input = [
      "export function PillLike() {",
      '  return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">x</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input, "/repo/components/ui/Badge.tsx");

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });

  it("leaves <span> alone when className doesn't match the pill chrome", () => {
    const input = [
      "export function Page() {",
      '  return <span className="text-white font-bold">Title</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    expect(output).toBe(input);
    expect(output).not.toContain("Badge");
  });

  it("leaves <span> alone when className mixes colors (no consistent token)", () => {
    // bg is emerald but text is amber — no single color is consistent across
    // all three positions, so detection must fail.
    const input = [
      "export function Page() {",
      '  return <span className="bg-emerald-500/10 text-amber-400 border border-blue-500/20">x</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });

  it("leaves <span> alone when the standalone `border` token is missing", () => {
    const input = [
      "export function Page() {",
      '  return <span className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">x</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(false);
    expect(output).toBe(input);
  });
});

// ---------------------------------------------------------------------------
// Import handling
// ---------------------------------------------------------------------------

describe("migrate-status-pills — Badge import", () => {
  it("does not duplicate the Badge import when it already exists", () => {
    const input = [
      'import { Badge } from "@/components/ui/Badge";',
      "",
      "export function Page() {",
      '  return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">x</span>;',
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain('<Badge variant="success">x</Badge>');
    // The import should appear exactly once.
    const matches =
      output.match(/import \{ Badge \} from "@\/components\/ui\/Badge"/g) ?? [];
    expect(matches).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

describe("migrate-status-pills — idempotency", () => {
  it("returns false on the second run and produces identical output", () => {
    const input = [
      "export function Page() {",
      '  return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>;',
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateStatusPills.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateStatusPills.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);
  });

  it("is idempotent for the gradient (ai) variant too", () => {
    const input = [
      "export function Page() {",
      '  return <span className="bg-gradient-to-r from-[rgba(139,92,246,0.2)] to-[rgba(59,130,246,0.2)] text-[#a78bfa] border border-[rgba(139,92,246,0.25)]">AI</span>;',
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateStatusPills.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateStatusPills.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);
  });
});
