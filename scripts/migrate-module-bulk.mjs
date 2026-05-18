/**
 * Generalized bulk migration script that wraps unmigrated pages in <Page> shell.
 * Handles a wide variety of legacy page structures.
 *
 * Usage:
 *   node scripts/migrate-module-bulk.mjs <module-name>            (writes)
 *   node scripts/migrate-module-bulk.mjs <module-name> --dry-run  (preview only)
 *
 * Examples:
 *   node scripts/migrate-module-bulk.mjs employees
 *   node scripts/migrate-module-bulk.mjs leave
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, relative, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");

const MODULE = process.argv[2];
const DRY_RUN = process.argv.includes("--dry-run");
if (!MODULE) {
  console.error("Usage: node scripts/migrate-module-bulk.mjs <module-name> [--dry-run]");
  process.exit(1);
}

const MODULE_DIR = join(ROOT, "app/(app)", MODULE);

// ─────────────────────────────────────────────────────────────────────────────
// File discovery
// ─────────────────────────────────────────────────────────────────────────────

function findPages(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findPages(full));
    else if (entry.name === "page.tsx") results.push(full);
  }
  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// Heuristic extraction: title, subtitle, breadcrumbs, max-width
// ─────────────────────────────────────────────────────────────────────────────

function escapeTitle(s) {
  return s
    .replace(/\s+/g, " ")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&rsaquo;/g, "›")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/[{}]/g, "")
    .replace(/`/g, "")
    .replace(/"/g, '\\"')
    .trim();
}

function getTitle(content) {
  // Try h1 first, then h2 — text content before any nested tag
  const patterns = [
    /<h1[^>]*>\s*([^<{]+?)\s*<\/h1>/,
    /<h1[^>]*>\s*([^<{]+)/,
    /<h2[^>]*>\s*([^<{]+?)\s*<\/h2>/,
    /<h2[^>]*>\s*([^<{]+)/,
  ];
  for (const p of patterns) {
    const m = content.match(p);
    if (m && m[1] && m[1].trim()) return escapeTitle(m[1]);
  }
  return "";
}

function getSubtitle(content) {
  // Look for a paragraph immediately following h1/h2 whose className includes
  // the muted-text colour (#8899AA / #7a8fa6) or "text-sm"/"text-slate"
  const patterns = [
    /<h[12][^>]*>[^]*?<\/h[12]>\s*<p[^>]*?(?:8899AA|7a8fa6|text-sm|text-slate|text-\[#)[^>]*>\s*([^<{]+?)\s*<\/p>/,
    /<h[12][^>]*>[^]*?<\/h[12]>\s*<div[^>]*?(?:8899AA|7a8fa6|text-sm)[^>]*>\s*([^<{]+?)\s*<\/div>/,
  ];
  for (const p of patterns) {
    const m = content.match(p);
    if (m && m[1] && m[1].trim()) return escapeTitle(m[1]);
  }
  return "";
}

function getBreadcrumbs(filePath) {
  const rel = relative(MODULE_DIR, filePath).replace(/[/\\]page\.tsx$/, "");
  const moduleLabel = MODULE.charAt(0).toUpperCase() + MODULE.slice(1);

  if (!rel || rel === "." || rel === "page.tsx") {
    return [{ label: moduleLabel }];
  }

  const parts = rel.split("/").filter(Boolean);
  const bcs = [{ label: moduleLabel, href: `/${MODULE}` }];
  let p = `/${MODULE}`;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("[")) {
      // dynamic segment — keep as a labelled crumb without an href
      const segLabel = part.replace(/\[|\]/g, "").replace(/^\.\.\./, "");
      bcs.push({
        label: segLabel.charAt(0).toUpperCase() + segLabel.slice(1),
      });
      continue;
    }
    p += `/${part}`;
    const label = part
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    if (i < parts.length - 1) bcs.push({ label, href: p });
    else bcs.push({ label });
  }
  return bcs;
}

function getMaxWidth(filePath, content) {
  const rel = relative(MODULE_DIR, filePath);
  if (rel.includes("settings/")) return "1100px";
  if (
    content.includes("max-w-[1400px]") ||
    content.includes("max-w-7xl") ||
    content.includes("max-w-6xl")
  )
    return "1400px";
  if (content.includes("max-w-5xl") || content.includes("max-w-[1100px]")) return "1100px";
  if (
    content.includes("max-w-4xl") ||
    content.includes("max-w-[900px]") ||
    content.includes("max-w-[800px]") ||
    content.includes("max-w-[720px]")
  )
    return "900px";
  return "1200px";
}

// ─────────────────────────────────────────────────────────────────────────────
// JSX scope traversal — find the component's last top-level `return (`
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Find the component's last top-level `return (` statement.
 *
 * Approach: locate the default-export function body, then scan for lines that
 * start with `<indent>return (` where `<indent>` matches the function body's
 * standard indent (4 spaces). The last such match is taken.
 *
 * This works for Next.js page conventions where every page is a single
 * default-exported function with a JSX return.
 */
function findComponentReturn(content) {
  const exportMatch = content.match(
    /export\s+default\s+function\s+\w+\s*(?:<[^>]+>\s*)?\([^)]*\)\s*\{/
  );
  if (!exportMatch) return -1;
  const funcBodyStart = content.indexOf(exportMatch[0]) + exportMatch[0].length;

  // Find all `return (` occurrences after funcBodyStart whose preceding line-start
  // contains only whitespace. The last one at the smallest indent is the
  // component's render return.
  const returnRegex = /\n([ \t]*)return\s*\(/g;
  returnRegex.lastIndex = funcBodyStart;
  let m;
  let bestIdx = -1;
  let bestIndent = Infinity;
  while ((m = returnRegex.exec(content)) !== null) {
    const indentLen = m[1].length;
    const returnPos = m.index + 1; // position of `return`
    if (indentLen <= bestIndent) {
      bestIndent = indentLen;
      bestIdx = returnPos;
    }
  }
  return bestIdx;
}

/**
 * Find the closing `)` of the `return (` statement at index returnIdx.
 *
 * Approach: derive the indent of `return`, then walk forward looking for
 * the first line that starts with `<that-indent>);` or `<that-indent>)`.
 *
 * This is brittle but works for the standard formatting used in this codebase
 * where every page has its return statement formatted as:
 *
 *     return (
 *         <div ...>
 *             ...
 *         </div>
 *     );
 *
 * The tail of the JSX is matched at column = indent + 0.
 */
function findReturnCloseParen(content, returnIdx) {
  // Determine the indent of `return`
  let lineStart = returnIdx;
  while (lineStart > 0 && content[lineStart - 1] !== "\n") lineStart--;
  const indent = content.substring(lineStart, returnIdx);

  // Walk forward line by line, looking for `<indent>);` or `<indent>)`
  let pos = content.indexOf("\n", returnIdx);
  while (pos !== -1) {
    const nextNl = content.indexOf("\n", pos + 1);
    const line = content.substring(pos + 1, nextNl === -1 ? content.length : nextNl);
    if (line.startsWith(indent)) {
      const after = line.slice(indent.length);
      if (after === ");" || after === ")" || after.startsWith(");")) {
        const parenIdxOnLine = line.indexOf(")");
        return pos + 1 + parenIdxOnLine;
      }
    }
    if (nextNl === -1) break;
    pos = nextNl;
  }
  return -1;
}

// ─────────────────────────────────────────────────────────────────────────────
// Migrate a single file
// ─────────────────────────────────────────────────────────────────────────────

function migratePage(filePath) {
  let content = readFileSync(filePath, "utf-8");

  if (content.includes("@/components/ui/Page")) {
    return { skipped: true, reason: "already migrated" };
  }

  const title =
    getTitle(content) ||
    relative(MODULE_DIR, filePath)
      .replace(/[/\\]page\.tsx$/, "")
      .split("/")
      .filter(Boolean)
      .pop()
      ?.split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") ||
    MODULE.charAt(0).toUpperCase() + MODULE.slice(1);

  const subtitle = getSubtitle(content);
  const breadcrumbs = getBreadcrumbs(filePath);
  const maxWidth = getMaxWidth(filePath, content);

  const bcStr = breadcrumbs
    .map((b) =>
      b.href ? `{ label: "${b.label}", href: "${b.href}" }` : `{ label: "${b.label}" }`
    )
    .join(", ");

  const pageProps = [
    `title="${title}"`,
    subtitle ? `subtitle="${subtitle}"` : null,
    `breadcrumbs={[${bcStr}]}`,
    `maxWidth="${maxWidth}"`,
  ].filter(Boolean);

  // Add imports after "use client"
  const newImports = ['import Page from "@/components/ui/Page";'];
  const importsBlock = newImports.join("\n");

  if (content.includes('"use client"')) {
    content = content.replace('"use client";', `"use client";\n\n${importsBlock}`);
  } else if (content.includes("'use client'")) {
    content = content.replace("'use client';", `"use client";\n\n${importsBlock}`);
  } else {
    // Add use client and imports at the top
    content = `"use client";\n\n${importsBlock}\n\n${content}`;
  }

  // Find the component's last top-level return
  const returnIdx = findComponentReturn(content);
  if (returnIdx === -1) {
    return { skipped: true, reason: "no component return found" };
  }

  const returnSlice = content.substring(returnIdx);
  const parenOffset = returnSlice.indexOf("(");
  const afterParen = returnIdx + parenOffset + 1;
  const closeParenIdx = findReturnCloseParen(content, returnIdx);
  if (closeParenIdx === -1 || closeParenIdx <= afterParen) {
    return { skipped: true, reason: "could not find closing paren" };
  }

  // Extract the JSX between the parens
  const jsxContent = content.substring(afterParen, closeParenIdx);

  const indent = "        ";
  const pageOpen = `\n${indent}<Page\n${indent}    ${pageProps.join(`\n${indent}    `)}\n${indent}>\n`;
  const pageClose = `\n${indent}</Page>\n${indent}`;

  const newJsx = pageOpen + jsxContent + pageClose;
  content = content.substring(0, afterParen) + newJsx + content.substring(closeParenIdx);

  if (DRY_RUN) {
    return { migrated: true, dryRun: true };
  }

  writeFileSync(filePath, content, "utf-8");
  return { migrated: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

const pages = findPages(MODULE_DIR);
const unmigrated = pages.filter(
  (p) => !readFileSync(p, "utf-8").includes("@/components/ui/Page")
);

console.log(
  `Module ${MODULE}: total ${pages.length} | already migrated ${pages.length - unmigrated.length} | unmigrated ${unmigrated.length}\n`
);

let migrated = 0;
let skipped = 0;
let errors = 0;

for (const p of unmigrated) {
  const rel = relative(ROOT, p);
  try {
    const result = migratePage(p);
    if (result.migrated) {
      migrated++;
      console.log(`  ✅ ${rel}`);
    } else if (result.skipped) {
      skipped++;
      console.log(`  ⏭️  ${rel} — ${result.reason}`);
    }
  } catch (e) {
    errors++;
    console.log(`  ❌ ${rel}: ${e.message}`);
  }
}

console.log(
  `\nDone. Migrated: ${migrated} | Skipped: ${skipped} | Errors: ${errors}${DRY_RUN ? " (DRY RUN — no files changed)" : ""}`
);
