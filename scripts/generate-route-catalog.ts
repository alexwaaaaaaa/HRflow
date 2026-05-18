/**
 * scripts/generate-route-catalog.ts
 *
 * Walks app/ to find all page.tsx files and emits e2e/route-catalog.json
 * typed as RouteEntry[].
 *
 * Exclusions:
 *   - app/(app)/{empty,error,loading,success}-states/*
 *   - app/(app)/_dev/*
 *   - route.{ts,tsx}, loading.tsx, error.tsx, not-found.tsx, layout.tsx
 *
 * For dynamic routes ([param]), sample params are read from e2e/sample-routes.json.
 *
 * Run via: tsx scripts/generate-route-catalog.ts
 * Wired as: "prebuild" in package.json
 */

import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RouteEntry {
  /** e.g. "/employees/add" */
  path: string;
  /** e.g. "(app)", "(auth)", "(setup)", "(dashboard)" */
  group: string;
  /** e.g. "employees" — first non-group path segment */
  module: string;
  /** true if path contains [param] */
  isDynamic: boolean;
  /** resolved path with sample params substituted, or same as path if not dynamic */
  sample: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const APP_DIR = path.resolve(process.cwd(), "app");
const OUTPUT_FILE = path.resolve(process.cwd(), "e2e/route-catalog.json");
const SAMPLE_ROUTES_FILE = path.resolve(process.cwd(), "e2e/sample-routes.json");

/** File names that are not page routes */
const EXCLUDED_FILENAMES = new Set([
  "route.ts",
  "route.tsx",
  "loading.tsx",
  "error.tsx",
  "not-found.tsx",
  "layout.tsx",
  "global-error.tsx",
  "template.tsx",
]);

/** Showcase / dev directories to exclude (relative to app/(app)/) */
const EXCLUDED_APP_DIRS = new Set([
  "empty-states",
  "error-states",
  "loading-states",
  "success-states",
  "_dev",
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Recursively collect all page.tsx files under a directory.
 * Returns absolute file paths.
 */
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
    } else if (entry.isFile()) {
      const filename = entry.name;
      // Only include page.tsx; skip all other special Next.js files
      if (filename === "page.tsx" && !EXCLUDED_FILENAMES.has(filename)) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

/**
 * Extract the route group from a file path.
 * e.g. "app/(app)/employees/add/page.tsx" → "(app)"
 */
function extractGroup(relativePath: string): string {
  // relativePath is relative to APP_DIR, e.g. "(app)/employees/add/page.tsx"
  const parts = relativePath.split(path.sep);
  const first = parts[0] ?? "";
  // Route groups are wrapped in parentheses
  if (first.startsWith("(") && first.endsWith(")")) {
    return first;
  }
  return "";
}

/**
 * Convert a file path (relative to APP_DIR) to a URL path.
 * Strips route groups (parenthesised segments) and the trailing /page.tsx.
 *
 * e.g. "(app)/employees/add/page.tsx" → "/employees/add"
 * e.g. "(auth)/login/page.tsx"        → "/login"
 */
function filePathToUrlPath(relativePath: string): string {
  const parts = relativePath.split(path.sep);
  // Remove "page.tsx" at the end
  parts.pop();
  // Filter out route group segments like "(app)", "(auth)", etc.
  const urlParts = parts.filter(
    (segment) => !(segment.startsWith("(") && segment.endsWith(")"))
  );
  if (urlParts.length === 0) {
    return "/";
  }
  return "/" + urlParts.join("/");
}

/**
 * Extract the module name — the first non-group segment after the group.
 * e.g. "(app)/employees/add" → "employees"
 * e.g. "(auth)/login"        → "login"
 */
function extractModule(relativePath: string): string {
  const parts = relativePath.split(path.sep);
  // Skip the group segment
  const nonGroup = parts.filter(
    (segment) => !(segment.startsWith("(") && segment.endsWith(")"))
  );
  // Remove "page.tsx"
  nonGroup.pop();
  return nonGroup[0] ?? "";
}

/**
 * Resolve dynamic segments in a URL path using sample-routes.json.
 *
 * Strategy (most-specific first):
 *   1. Try the full module-relative path (e.g. "employees/[id]")
 *   2. Try the bare segment name (e.g. "[id]", "[empId]")
 *   3. Fall back to "1"
 */
function resolveSamplePath(
  urlPath: string,
  sampleRoutes: Record<string, string>
): string {
  if (!urlPath.includes("[")) {
    return urlPath;
  }

  // Split path into segments and resolve each dynamic one
  const segments = urlPath.split("/").filter(Boolean);
  const resolved: string[] = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!segment.startsWith("[")) {
      resolved.push(segment);
      continue;
    }

    // Build progressively longer keys to try (most specific first)
    // e.g. for path "/employees/[id]/edit" at index 1:
    //   try "employees/[id]", then "[id]"
    let found = false;

    // Try keys that end with this dynamic segment, checking from longest match
    for (const key of Object.keys(sampleRoutes)) {
      const keyParts = key.split("/");
      const keyDynIdx = keyParts.indexOf(segment);
      if (keyDynIdx === -1) continue;

      // Check if the preceding segments in the key match the resolved path so far
      const keyPrefix = keyParts.slice(0, keyDynIdx);
      const resolvedPrefix = resolved.slice(resolved.length - keyPrefix.length);

      if (
        keyPrefix.length > 0 &&
        keyPrefix.every((kp, idx) => kp === resolvedPrefix[idx])
      ) {
        resolved.push(sampleRoutes[key] as string);
        found = true;
        break;
      }
    }

    if (!found) {
      // Try bare segment key (e.g. "[id]", "[empId]", "[quarter]")
      const bareValue = sampleRoutes[segment];
      if (bareValue !== undefined) {
        resolved.push(bareValue);
      } else {
        resolved.push("1");
      }
    }
  }

  return "/" + resolved.join("/");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  // Load sample routes
  let sampleRoutes: Record<string, string> = {};
  if (fs.existsSync(SAMPLE_ROUTES_FILE)) {
    const raw = fs.readFileSync(SAMPLE_ROUTES_FILE, "utf-8");
    sampleRoutes = JSON.parse(raw) as Record<string, string>;
  }

  // Collect all page.tsx files
  const allPageFiles = collectPageFiles(APP_DIR);

  const entries: RouteEntry[] = [];

  for (const absPath of allPageFiles) {
    // Make path relative to APP_DIR for processing
    const relativePath = path.relative(APP_DIR, absPath);

    // Determine the group
    const group = extractGroup(relativePath);

    // Apply exclusions for (app) group
    if (group === "(app)") {
      const parts = relativePath.split(path.sep);
      // parts[0] = "(app)", parts[1] = first module dir
      const firstDir = parts[1] ?? "";
      if (EXCLUDED_APP_DIRS.has(firstDir)) {
        continue;
      }
    }

    // Convert to URL path
    const urlPath = filePathToUrlPath(relativePath);

    // Extract module
    const routeModule = extractModule(relativePath);

    // Determine if dynamic
    const isDynamic = urlPath.includes("[");

    // Resolve sample path
    const sample = isDynamic
      ? resolveSamplePath(urlPath, sampleRoutes)
      : urlPath;

    entries.push({
      path: urlPath,
      group,
      module: routeModule,
      isDynamic,
      sample,
    });
  }

  // Sort for deterministic output: by group, then by path
  entries.sort((a, b) => {
    if (a.group !== b.group) return a.group.localeCompare(b.group);
    return a.path.localeCompare(b.path);
  });

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(entries, null, 2) + "\n", "utf-8");

  const dynamicCount = entries.filter((e) => e.isDynamic).length;
  const staticCount = entries.length - dynamicCount;

  console.log(
    `✓ route-catalog.json written — ${entries.length} routes ` +
      `(${staticCount} static, ${dynamicCount} dynamic)`
  );
}

main();
