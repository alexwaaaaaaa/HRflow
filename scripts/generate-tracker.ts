/**
 * scripts/generate-tracker.ts
 *
 * Scans app/(app)/ and computes ModuleStats per direct child folder.
 * Sorts ascending by migratedPages / totalPages (least migrated first).
 * Writes docs/frontend-10x-tracker.md.
 *
 * Requirements: 15.1, 15.2, 15.4
 */

import * as fs from "fs";
import * as path from "path";

interface ModuleStats {
  module: string;
  totalPages: number;
  migratedPages: number;
  labeledInputs: number;
  formsWithRHF: number;
  axeClean: number;
}

const APP_DIR = path.join(process.cwd(), "app", "(app)");
const OUTPUT_FILE = path.join(process.cwd(), "docs", "frontend-10x-tracker.md");

/** Folders to skip — showcase routes and dev playground */
const SKIP_FOLDERS = new Set([
  "_dev",
  "empty-states",
  "error-states",
  "loading-states",
  "success-states",
]);

/** Recursively collect all page.tsx files under a directory */
function collectPageFiles(dir: string): string[] {
  const results: string[] = [];
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectPageFiles(fullPath));
    } else if (entry.isFile() && entry.name === "page.tsx") {
      results.push(fullPath);
    }
  }
  return results;
}

/** Read file content safely */
function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

/**
 * A page is "migrated" if it:
 * 1. Imports from "@/components/ui/Page", OR
 * 2. Is a redirect-only page (only calls redirect()), OR
 * 3. Has the "// migrated: immersive-ui" marker (intentional full-screen UIs), OR
 * 4. Is covered by an ancestor layout.tsx that imports Page.
 */
function isMigrated(content: string): boolean {
  // Direct Page import
  if (
    content.includes('from "@/components/ui/Page"') ||
    content.includes("from '@/components/ui/Page'")
  ) {
    return true;
  }
  // Immersive UI marker — intentional full-screen pages that don't use the Page shell
  if (content.includes("// migrated: immersive-ui")) {
    return true;
  }
  // Redirect-only pages — strip comments/whitespace and check if the only logic is a redirect call
  const stripped = content
    .replace(/\/\/[^\n]*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (
    stripped.includes("redirect(") &&
    !stripped.includes("useState") &&
    !stripped.includes("useEffect") &&
    !stripped.includes("return (") &&
    !stripped.includes("return(<")
  ) {
    return true;
  }
  return false;
}

/**
 * Walk up from a page file towards the module root, returning true if any
 * `layout.tsx` along the way imports from `@/components/ui/Page`.
 */
function isCoveredByLayout(pageFile: string, moduleDir: string): boolean {
  let dir = path.dirname(pageFile);
  while (dir.startsWith(moduleDir)) {
    const layoutFile = path.join(dir, "layout.tsx");
    if (fs.existsSync(layoutFile)) {
      const content = readFile(layoutFile);
      if (isMigrated(content)) return true;
    }
    if (dir === moduleDir) break;
    dir = path.dirname(dir);
  }
  return false;
}

/**
 * A page has labeled inputs if it contains htmlFor, aria-label, or aria-labelledby.
 */
function hasLabeledInputs(content: string): boolean {
  return (
    content.includes("htmlFor") ||
    content.includes("aria-label") ||
    content.includes("aria-labelledby")
  );
}

/**
 * A page uses react-hook-form if it imports from "react-hook-form".
 */
function usesRHF(content: string): boolean {
  return (
    content.includes('from "react-hook-form"') ||
    content.includes("from 'react-hook-form'")
  );
}

/** Compute stats for a single module (direct child folder of app/(app)/) */
function computeModuleStats(moduleName: string, moduleDir: string): ModuleStats {
  const pageFiles = collectPageFiles(moduleDir);
  const totalPages = pageFiles.length;

  let migratedPages = 0;
  let labeledInputs = 0;
  let formsWithRHF = 0;

  for (const pageFile of pageFiles) {
    const content = readFile(pageFile);
    if (isMigrated(content) || isCoveredByLayout(pageFile, moduleDir))
      migratedPages++;
    if (hasLabeledInputs(content)) labeledInputs++;
    if (usesRHF(content)) formsWithRHF++;
  }

  return {
    module: moduleName,
    totalPages,
    migratedPages,
    labeledInputs,
    formsWithRHF,
    // axeClean starts at 0 — updated as axe runs complete
    axeClean: 0,
  };
}

/** Format a cell as current/target */
function cell(current: number, target: number): string {
  return `${current}/${target}`;
}

/** Compute migration percentage for sorting (0 if totalPages is 0) */
function migrationPct(stats: ModuleStats): number {
  if (stats.totalPages === 0) return 1; // empty modules sort last
  return stats.migratedPages / stats.totalPages;
}

function generateMarkdown(rows: ModuleStats[]): string {
  const header = [
    "# Frontend 10x Migration Tracker",
    "",
    "> Authoritative source. Auto-generated by `scripts/generate-tracker.ts` on every commit.",
    "",
    "| Module | Pages | Migrated | Labels | RHF Forms | Axe Clean |",
    "|--------|-------|----------|--------|-----------|-----------|",
  ];

  const tableRows = rows.map((s) => {
    const t = s.totalPages;
    return `| ${s.module} | ${cell(s.totalPages, t)} | ${cell(s.migratedPages, t)} | ${cell(s.labeledInputs, t)} | ${cell(s.formsWithRHF, t)} | ${cell(s.axeClean, t)} |`;
  });

  return [...header, ...tableRows, ""].join("\n");
}

function main(): void {
  // Read direct child folders of app/(app)/
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(APP_DIR, { withFileTypes: true });
  } catch (err) {
    console.error(`Failed to read ${APP_DIR}:`, err);
    process.exit(1);
  }

  const moduleDirs = entries.filter(
    (e) => e.isDirectory() && !SKIP_FOLDERS.has(e.name)
  );

  const stats: ModuleStats[] = moduleDirs.map((e) =>
    computeModuleStats(e.name, path.join(APP_DIR, e.name))
  );

  // Sort ascending by migration percentage (least migrated first)
  stats.sort((a, b) => migrationPct(a) - migrationPct(b));

  const markdown = generateMarkdown(stats);

  // Ensure docs/ directory exists
  const docsDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, markdown, "utf-8");

  const totalModules = stats.length;
  const totalPages = stats.reduce((sum, s) => sum + s.totalPages, 0);
  const totalMigrated = stats.reduce((sum, s) => sum + s.migratedPages, 0);

  console.log(`✅ Tracker written to ${OUTPUT_FILE}`);
  console.log(
    `   ${totalModules} modules | ${totalMigrated}/${totalPages} pages migrated`
  );
}

main();
