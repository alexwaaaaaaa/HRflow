/**
 * __tests__/codemods/runner.test.ts
 *
 * Vitest specs for the codemod runner harness.
 * Uses mock/stub codemods — no real codemods are invoked.
 *
 * Covers:
 *   - dry-run: files are not written
 *   - module filter: only files in the specified module are processed
 *   - limit flag: stops after n files
 *   - error aggregation: errors from codemods are collected and reported
 *   - summary printer: output format
 *   - flag parsing
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { Project } from "ts-morph";
import {
  runCodemods,
  parseFlags,
  printSummary,
  type Codemod,
  type CodemodResult,
  type RunnerFlags,
} from "../../scripts/codemods/runner";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a temporary directory with some .tsx fixture files. */
function createTempProject(files: Record<string, string>): string {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "runner-test-"));
  for (const [relPath, content] of Object.entries(files)) {
    const fullPath = path.join(tmpDir, relPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, "utf-8");
  }
  return tmpDir;
}



/** A stub codemod that always marks files as changed. */
function makeChangingCodemod(name: string): Codemod {
  return {
    name,
    transform(_sf) {
      return true; // always "changed"
    },
  };
}

/** A stub codemod that always marks files as skipped. */
function makeSkippingCodemod(name: string): Codemod {
  return {
    name,
    transform(_sf) {
      return false; // always "skipped"
    },
  };
}

/** A stub codemod that always throws. */
function makeErroringCodemod(name: string): Codemod {
  return {
    name,
    transform(_sf) {
      throw new Error("intentional test error");
    },
  };
}

// ---------------------------------------------------------------------------
// parseFlags
// ---------------------------------------------------------------------------

describe("parseFlags", () => {
  it("defaults to no dry-run, no module, no limit, empty codemods", () => {
    const flags = parseFlags([]);
    expect(flags.dryRun).toBe(false);
    expect(flags.module).toBeUndefined();
    expect(flags.limit).toBeUndefined();
    expect(flags.codemods).toEqual([]);
  });

  it("parses --dry-run", () => {
    const flags = parseFlags(["--dry-run"]);
    expect(flags.dryRun).toBe(true);
  });

  it("parses --module=employees", () => {
    const flags = parseFlags(["--module=employees"]);
    expect(flags.module).toBe("employees");
  });

  it("parses --limit=5", () => {
    const flags = parseFlags(["--limit=5"]);
    expect(flags.limit).toBe(5);
  });

  it("ignores invalid --limit values", () => {
    const flags = parseFlags(["--limit=abc"]);
    expect(flags.limit).toBeUndefined();
  });

  it("parses --codemods=migrate-buttons,migrate-cards", () => {
    const flags = parseFlags(["--codemods=migrate-buttons,migrate-cards"]);
    expect(flags.codemods).toEqual(["migrate-buttons", "migrate-cards"]);
  });

  it("trims whitespace from codemod names", () => {
    const flags = parseFlags(["--codemods= foo , bar "]);
    expect(flags.codemods).toEqual(["foo", "bar"]);
  });

  it("parses all flags together", () => {
    const flags = parseFlags([
      "--dry-run",
      "--module=payroll",
      "--limit=10",
      "--codemods=migrate-buttons",
    ]);
    expect(flags.dryRun).toBe(true);
    expect(flags.module).toBe("payroll");
    expect(flags.limit).toBe(10);
    expect(flags.codemods).toEqual(["migrate-buttons"]);
  });
});

// ---------------------------------------------------------------------------
// runCodemods — dry-run
// ---------------------------------------------------------------------------

describe("runCodemods — dry-run", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTempProject({
      "file-a.tsx": "export default function A() { return <div>A</div>; }",
      "file-b.tsx": "export default function B() { return <div>B</div>; }",
    });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("does not write files when --dry-run is set", async () => {
    const originalContentA = fs.readFileSync(
      path.join(tmpDir, "file-a.tsx"),
      "utf-8"
    );

    // Spy on Project.save to ensure it is NOT called
    const saveSpy = vi.spyOn(Project.prototype, "save").mockResolvedValue();

    const flags: RunnerFlags = {
      dryRun: true,
      codemods: ["stub-changer"],
    };

    await runCodemods({
      flags,
      codemods: [makeChangingCodemod("stub-changer")],
      projectRoot: tmpDir,
      fileGlob: path.join(tmpDir, "*.tsx"),
    });

    // save() must NOT have been called
    expect(saveSpy).not.toHaveBeenCalled();

    // File content must be unchanged on disk
    const contentAfter = fs.readFileSync(
      path.join(tmpDir, "file-a.tsx"),
      "utf-8"
    );
    expect(contentAfter).toBe(originalContentA);

    saveSpy.mockRestore();
  });

  it("reports filesChanged correctly in dry-run mode", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      codemods: ["stub-changer"],
    };

    const results = await runCodemods({
      flags,
      codemods: [makeChangingCodemod("stub-changer")],
      projectRoot: tmpDir,
      fileGlob: path.join(tmpDir, "*.tsx"),
    });

    expect(results).toHaveLength(1);
    expect(results[0]!.filesChanged).toBe(2);
    expect(results[0]!.filesScanned).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// runCodemods — module filter
// ---------------------------------------------------------------------------

describe("runCodemods — module filter", () => {
  let tmpDir: string;

  beforeEach(() => {
    // Use a flat structure without route-group parens — the fileGlob override
    // bypasses the runner's own path-building, so we just need two sibling
    // module folders to verify scoping works correctly.
    tmpDir = createTempProject({
      "employees/page.tsx":
        "export default function Page() { return <div>employees</div>; }",
      "employees/add/page.tsx":
        "export default function Page() { return <div>add</div>; }",
      "payroll/page.tsx":
        "export default function Page() { return <div>payroll</div>; }",
    });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("only processes files under the specified module folder", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      module: "employees",
      codemods: ["stub-changer"],
    };

    const results = await runCodemods({
      flags,
      codemods: [makeChangingCodemod("stub-changer")],
      projectRoot: tmpDir,
      // Scope glob to employees/ only — no parens in path so ts-morph resolves correctly
      fileGlob: `${path.join(tmpDir, "employees")}/**/*.tsx`,
    });

    expect(results[0]!.filesScanned).toBe(2); // employees/page.tsx + employees/add/page.tsx
    expect(results[0]!.filesChanged).toBe(2);
  });

  it("does not process files outside the specified module", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      module: "employees",
      codemods: ["stub-changer"],
    };

    const results = await runCodemods({
      flags,
      codemods: [makeChangingCodemod("stub-changer")],
      projectRoot: tmpDir,
      fileGlob: `${path.join(tmpDir, "employees")}/**/*.tsx`,
    });

    // payroll/page.tsx must NOT be scanned — only 2 employees files
    expect(results[0]!.filesScanned).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// runCodemods — limit flag
// ---------------------------------------------------------------------------

describe("runCodemods — limit flag", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTempProject({
      "file-1.tsx": "export default function F1() { return <div>1</div>; }",
      "file-2.tsx": "export default function F2() { return <div>2</div>; }",
      "file-3.tsx": "export default function F3() { return <div>3</div>; }",
      "file-4.tsx": "export default function F4() { return <div>4</div>; }",
      "file-5.tsx": "export default function F5() { return <div>5</div>; }",
    });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("stops after processing n files when --limit is set", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      limit: 3,
      codemods: ["stub-changer"],
    };

    const results = await runCodemods({
      flags,
      codemods: [makeChangingCodemod("stub-changer")],
      projectRoot: tmpDir,
      fileGlob: path.join(tmpDir, "*.tsx"),
    });

    expect(results[0]!.filesScanned).toBe(3);
  });

  it("processes all files when limit exceeds file count", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      limit: 100,
      codemods: ["stub-changer"],
    };

    const results = await runCodemods({
      flags,
      codemods: [makeChangingCodemod("stub-changer")],
      projectRoot: tmpDir,
      fileGlob: path.join(tmpDir, "*.tsx"),
    });

    expect(results[0]!.filesScanned).toBe(5);
  });

  it("processes all files when no limit is set", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      codemods: ["stub-changer"],
    };

    const results = await runCodemods({
      flags,
      codemods: [makeChangingCodemod("stub-changer")],
      projectRoot: tmpDir,
      fileGlob: path.join(tmpDir, "*.tsx"),
    });

    expect(results[0]!.filesScanned).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// runCodemods — error aggregation
// ---------------------------------------------------------------------------

describe("runCodemods — error aggregation", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTempProject({
      "file-a.tsx": "export default function A() { return <div>A</div>; }",
      "file-b.tsx": "export default function B() { return <div>B</div>; }",
      "file-c.tsx": "export default function C() { return <div>C</div>; }",
    });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("collects errors from codemods without aborting other files", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      codemods: ["stub-errorer"],
    };

    const results = await runCodemods({
      flags,
      codemods: [makeErroringCodemod("stub-errorer")],
      projectRoot: tmpDir,
      fileGlob: path.join(tmpDir, "*.tsx"),
    });

    expect(results[0]!.filesScanned).toBe(3);
    expect(results[0]!.filesErrored).toBe(3);
    expect(results[0]!.errors).toHaveLength(3);
    expect(results[0]!.errors[0]!.error).toBe("intentional test error");
  });

  it("includes the file path in each error entry", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      codemods: ["stub-errorer"],
    };

    const results = await runCodemods({
      flags,
      codemods: [makeErroringCodemod("stub-errorer")],
      projectRoot: tmpDir,
      fileGlob: path.join(tmpDir, "*.tsx"),
    });

    for (const err of results[0]!.errors) {
      expect(err.file).toMatch(/\.tsx$/);
      expect(err.error).toBeTruthy();
    }
  });

  it("does not count errored files as changed or skipped", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      codemods: ["stub-errorer"],
    };

    const results = await runCodemods({
      flags,
      codemods: [makeErroringCodemod("stub-errorer")],
      projectRoot: tmpDir,
      fileGlob: path.join(tmpDir, "*.tsx"),
    });

    expect(results[0]!.filesChanged).toBe(0);
    expect(results[0]!.filesSkipped).toBe(0);
    expect(results[0]!.filesErrored).toBe(3);
  });

  it("aggregates results per codemod when multiple codemods run", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      codemods: ["stub-changer", "stub-errorer"],
    };

    const results = await runCodemods({
      flags,
      codemods: [
        makeChangingCodemod("stub-changer"),
        makeErroringCodemod("stub-errorer"),
      ],
      projectRoot: tmpDir,
      fileGlob: path.join(tmpDir, "*.tsx"),
    });

    expect(results).toHaveLength(2);

    const changerResult = results.find((r) => r.codemodName === "stub-changer")!;
    const errorerResult = results.find((r) => r.codemodName === "stub-errorer")!;

    expect(changerResult.filesChanged).toBe(3);
    expect(changerResult.filesErrored).toBe(0);

    expect(errorerResult.filesErrored).toBe(3);
    expect(errorerResult.filesChanged).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// runCodemods — skipped files
// ---------------------------------------------------------------------------

describe("runCodemods — skipped files", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTempProject({
      "file-a.tsx": "export default function A() { return <div>A</div>; }",
      "file-b.tsx": "export default function B() { return <div>B</div>; }",
    });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("counts skipped files correctly", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      codemods: ["stub-skipper"],
    };

    const results = await runCodemods({
      flags,
      codemods: [makeSkippingCodemod("stub-skipper")],
      projectRoot: tmpDir,
      fileGlob: path.join(tmpDir, "*.tsx"),
    });

    expect(results[0]!.filesScanned).toBe(2);
    expect(results[0]!.filesSkipped).toBe(2);
    expect(results[0]!.filesChanged).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// runCodemods — empty codemods list
// ---------------------------------------------------------------------------

describe("runCodemods — empty codemods list", () => {
  it("returns empty results when no codemods are provided", async () => {
    const flags: RunnerFlags = {
      dryRun: true,
      codemods: [],
    };

    const results = await runCodemods({
      flags,
      codemods: [],
      projectRoot: process.cwd(),
    });

    expect(results).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// printSummary
// ---------------------------------------------------------------------------

describe("printSummary", () => {
  it("prints a formatted table with correct column headers", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const results: CodemodResult[] = [
      {
        codemodName: "migrate-buttons",
        filesScanned: 10,
        filesChanged: 7,
        filesSkipped: 2,
        filesErrored: 1,
        errors: [{ file: "foo.tsx", error: "oops" }],
      },
    ];

    printSummary(results);

    const output = consoleSpy.mock.calls.map((c) => c.join(" ")).join("\n");
    expect(output).toContain("migrate-buttons");
    expect(output).toContain("10");
    expect(output).toContain("7");
    expect(output).toContain("2");
    expect(output).toContain("1");

    consoleSpy.mockRestore();
  });

  it("prints 'No codemods were run.' when results are empty", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    printSummary([]);

    const output = consoleSpy.mock.calls.map((c) => c.join(" ")).join("\n");
    expect(output).toContain("No codemods were run.");

    consoleSpy.mockRestore();
  });

  it("prints error details for errored files", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const results: CodemodResult[] = [
      {
        codemodName: "migrate-cards",
        filesScanned: 3,
        filesChanged: 1,
        filesSkipped: 1,
        filesErrored: 1,
        errors: [{ file: "broken.tsx", error: "parse error" }],
      },
    ];

    printSummary(results);

    const output = consoleSpy.mock.calls.map((c) => c.join(" ")).join("\n");
    expect(output).toContain("broken.tsx");
    expect(output).toContain("parse error");

    consoleSpy.mockRestore();
  });
});
