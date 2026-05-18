/**
 * scripts/codemods/runner.ts
 *
 * Codemod runner harness. Uses ts-morph's Project to load TypeScript/TSX files,
 * applies the requested codemods, aggregates results, and prints a summary.
 *
 * Flags:
 *   --dry-run              Process files but do not write changes.
 *   --module=<folder>      Only process files under app/(app)/<folder>/.
 *   --limit=<n>            Stop after processing n files total.
 *   --codemods=<list>      Comma-separated list of codemod names to run.
 *
 * Requirements: 14.1, 14.2
 */

import * as path from "path";
import * as fs from "fs";
import { execSync } from "child_process";
import { Project, type SourceFile } from "ts-morph";
import { escapePath as fgEscapePath } from "fast-glob";
import { globSync as tinyGlobSync } from "tinyglobby";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface CodemodResult {
  codemodName: string;
  filesScanned: number;
  filesChanged: number;
  filesSkipped: number;
  filesErrored: number;
  errors: Array<{ file: string; error: string }>;
}

export interface Codemod {
  name: string;
  /** Returns true if the file was changed, false if skipped. */
  transform(sourceFile: SourceFile): boolean;
}

export interface RunnerFlags {
  dryRun: boolean;
  module?: string;
  limit?: number;
  codemods: string[];
}

export interface RunnerOptions {
  flags: RunnerFlags;
  /** Codemods to run (resolved by the caller). */
  codemods: Codemod[];
  /** Root of the project (defaults to process.cwd()). */
  projectRoot?: string;
  /** Override the glob pattern for source files (used in tests). */
  fileGlob?: string;
}

// ---------------------------------------------------------------------------
// Flag parsing
// ---------------------------------------------------------------------------

/**
 * Parse CLI argv into RunnerFlags.
 * Exported so tests can call it directly.
 */
export function parseFlags(argv: string[]): RunnerFlags {
  const flags: RunnerFlags = {
    dryRun: false,
    codemods: [],
  };

  for (const arg of argv) {
    if (arg === "--dry-run") {
      flags.dryRun = true;
    } else if (arg.startsWith("--module=")) {
      flags.module = arg.slice("--module=".length);
    } else if (arg.startsWith("--limit=")) {
      const n = parseInt(arg.slice("--limit=".length), 10);
      if (!isNaN(n) && n > 0) flags.limit = n;
    } else if (arg.startsWith("--codemods=")) {
      flags.codemods = arg
        .slice("--codemods=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  return flags;
}

/**
 * Escape glob special characters in a literal path segment.
 * Uses fast-glob's canonical escapePath so parentheses in Next.js route
 * groups like `(app)` are not treated as glob alternation groups.
 */
function escapeGlobPath(p: string): string {
  return fgEscapePath(p);
}

// ---------------------------------------------------------------------------
// Core runner
// ---------------------------------------------------------------------------

/**
 * Run the codemod harness.
 * Returns one CodemodResult per codemod.
 */
export async function runCodemods(options: RunnerOptions): Promise<CodemodResult[]> {
  const { flags, codemods, projectRoot = process.cwd() } = options;

  if (codemods.length === 0) {
    return [];
  }

  // Determine the glob pattern for source files
  let globPattern: string;
  if (options.fileGlob !== undefined) {
    globPattern = options.fileGlob;
  } else if (flags.module) {
    // Escape the path up to the wildcard portion so parentheses in Next.js
    // route groups like `(app)` are not treated as glob alternation groups.
    const basePath = escapeGlobPath(
      path.join(projectRoot, "app", "(app)", flags.module)
    );
    globPattern = `${basePath}/**/*.{ts,tsx}`;
  } else {
    const basePath = escapeGlobPath(path.join(projectRoot, "app", "(app)"));
    globPattern = `${basePath}/**/*.{ts,tsx}`;
  }

  // Initialise ts-morph Project.
  // When a fileGlob override is provided (e.g. in tests), skip tsconfig loading
  // so the runner works against arbitrary temp directories.
  const tsconfigPath = path.join(projectRoot, "tsconfig.json");
  const hasTsConfig =
    options.fileGlob === undefined && fs.existsSync(tsconfigPath);

  const project = hasTsConfig
    ? new Project({
        tsConfigFilePath: tsconfigPath,
        skipAddingFilesFromTsConfig: true,
      })
    : new Project({
        compilerOptions: {
          allowJs: true,
          jsx: 2 /* React */,
        },
        skipAddingFilesFromTsConfig: true,
      });

  // Add only the files matching our glob.
  // NOTE: ts-morph's `addSourceFilesAtPaths` internally calls `backSlashesToForward`
  // on the pattern, which strips the `\` escapes that fast-glob/tinyglobby need
  // to match literal parentheses in Next.js route groups like `(app)`. To work
  // around this, we resolve the file list ourselves with tinyglobby (the same
  // engine ts-morph uses) and add files one-by-one.
  const matchedPaths = tinyGlobSync({
    patterns: globPattern,
    expandDirectories: false,
    cwd: projectRoot,
    absolute: true,
  });
  const addedFiles: SourceFile[] = [];
  for (const filePath of matchedPaths) {
    try {
      addedFiles.push(project.addSourceFileAtPath(filePath));
    } catch {
      // ignore unreadable file
    }
  }

  // Apply limit
  const filesToProcess =
    flags.limit !== undefined ? addedFiles.slice(0, flags.limit) : addedFiles;

  // Initialise result accumulators
  const results: Map<string, CodemodResult> = new Map();
  for (const codemod of codemods) {
    results.set(codemod.name, {
      codemodName: codemod.name,
      filesScanned: 0,
      filesChanged: 0,
      filesSkipped: 0,
      filesErrored: 0,
      errors: [],
    });
  }

  const changedFilePaths: Set<string> = new Set();

  // Process each file through each codemod
  for (const sourceFile of filesToProcess) {
    for (const codemod of codemods) {
      const result = results.get(codemod.name)!;
      result.filesScanned++;

      try {
        const changed = codemod.transform(sourceFile);
        if (changed) {
          result.filesChanged++;
          changedFilePaths.add(sourceFile.getFilePath());
        } else {
          result.filesSkipped++;
        }
      } catch (err) {
        result.filesErrored++;
        result.errors.push({
          file: sourceFile.getFilePath(),
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }
  }

  // Write changes (unless dry-run)
  if (!flags.dryRun && changedFilePaths.size > 0) {
    await project.save();

    // Run prettier on changed files
    const changedList = Array.from(changedFilePaths)
      .map((p) => JSON.stringify(p))
      .join(" ");
    try {
      execSync(`npx prettier --write ${changedList}`, {
        cwd: projectRoot,
        stdio: "pipe",
      });
    } catch (err) {
      // Prettier failure is non-fatal — log and continue
      console.warn(
        "⚠️  prettier --write failed:",
        err instanceof Error ? err.message : String(err)
      );
    }
  } else if (flags.dryRun && changedFilePaths.size > 0) {
    console.log("\n[dry-run] Files that would be changed:");
    for (const p of changedFilePaths) {
      console.log(`  ${p}`);
    }
  }

  return Array.from(results.values());
}

// ---------------------------------------------------------------------------
// Summary printer
// ---------------------------------------------------------------------------

/**
 * Print a formatted summary table to stdout.
 * Exported so tests can verify the output format.
 */
export function printSummary(results: CodemodResult[]): void {
  if (results.length === 0) {
    console.log("No codemods were run.");
    return;
  }

  const COL_NAME = 28;
  const COL_NUM = 10;

  const pad = (s: string, n: number) => s.padEnd(n);
  const padN = (n: number, w: number) => String(n).padStart(w);

  const divider = "-".repeat(COL_NAME + COL_NUM * 4 + 3);

  console.log("\n" + divider);
  console.log(
    pad("Codemod", COL_NAME) +
      padN(0, COL_NUM).replace("0", "Scanned").padStart(COL_NUM) +
      padN(0, COL_NUM).replace("0", "Changed").padStart(COL_NUM) +
      padN(0, COL_NUM).replace("0", "Skipped").padStart(COL_NUM) +
      padN(0, COL_NUM).replace("0", "Errored").padStart(COL_NUM)
  );
  console.log(divider);

  for (const r of results) {
    console.log(
      pad(r.codemodName, COL_NAME) +
        padN(r.filesScanned, COL_NUM) +
        padN(r.filesChanged, COL_NUM) +
        padN(r.filesSkipped, COL_NUM) +
        padN(r.filesErrored, COL_NUM)
    );

    if (r.errors.length > 0) {
      for (const e of r.errors) {
        console.log(`  ⚠  ${e.file}: ${e.error}`);
      }
    }
  }

  console.log(divider + "\n");
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const flags = parseFlags(argv);

  if (flags.codemods.length === 0) {
    console.error(
      "Usage: tsx scripts/codemods/runner.ts --codemods=<list> [--dry-run] [--module=<folder>] [--limit=<n>]"
    );
    process.exit(1);
  }

  // Dynamically load the requested codemods from the same directory
  const codemods: Codemod[] = [];
  const codemodDir = path.join(process.cwd(), "scripts", "codemods");

  for (const name of flags.codemods) {
    const candidates = [
      path.join(codemodDir, `${name}.ts`),
      path.join(codemodDir, `migrate-${name}.ts`),
    ];

    let loaded = false;
    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const mod = require(candidate) as { default?: Codemod } & Codemod;
        const codemod: Codemod = mod.default ?? (mod as unknown as Codemod);
        codemods.push(codemod);
        loaded = true;
        break;
      }
    }

    if (!loaded) {
      console.error(`❌ Codemod not found: "${name}" (looked in ${codemodDir})`);
      process.exit(1);
    }
  }

  const results = await runCodemods({ flags, codemods });
  printSummary(results);

  const totalErrors = results.reduce((sum, r) => sum + r.filesErrored, 0);
  if (totalErrors > 0) {
    process.exit(1);
  }
}

// Only run main when executed directly (not when imported by tests)
if (
  typeof require !== "undefined" &&
  require.main === module
) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
