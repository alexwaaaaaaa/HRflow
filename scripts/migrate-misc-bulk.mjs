/**
 * Bulk migration script for misc modules (task 50).
 * Wraps unmigrated pages in <Page> shell.
 *
 * Usage:
 *   node scripts/migrate-misc-bulk.mjs <module-name>
 *   node scripts/migrate-misc-bulk.mjs <module-name> --dry-run
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, relative, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");

const MODULE = process.argv[2];
const DRY_RUN = process.argv.includes("--dry-run");
if (!MODULE) {
  console.error("Usage: node scripts/migrate-misc-bulk.mjs <module-name> [--dry-run]");
  process.exit(1);
}

const MODULE_DIR = join(ROOT, "app/(app)", MODULE);

function findPages(dir) {
  const results = [];
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) results.push(...findPages(full));
      else if (entry.name === "page.tsx") results.push(full);
    }
  } catch {}
  return results;
}

function escapeStr(s) {
  return s
    .replace(/\s+/g, " ")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/[{}]/g, "")
    .replace(/`/g, "")
    .replace(/"/g, '\\"')
    .trim();
}

function getTitle(content, filePath) {
  // Try h1/h2 text content
  const patterns = [
    /<h1[^>]*>\s*(?:<[^>]+>\s*)*([A-Za-z][^<{}\n]+?)\s*(?:<\/[^>]+>\s*)*<\/h1>/,
    /<h1[^>]*>\s*([A-Za-z][^<{}\n]+)/,
    /<h2[^>]*>\s*(?:<[^>]+>\s*)*([A-Za-z][^<{}\n]+?)\s*(?:<\/[^>]+>\s*)*<\/h2>/,
    /<h2[^>]*>\s*([A-Za-z][^<{}\n]+)/,
  ];
  for (const p of patterns) {
    const m = content.match(p);
    if (m && m[1] && m[1].trim().length > 2) {
      const t = escapeStr(m[1]);
      if (t.length > 2 && t.length < 80) return t;
    }
  }
  // Fallback: derive from path
  const rel = relative(MODULE_DIR, filePath).replace(/[/\\]page\.tsx$/, "");
  const parts = rel.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || MODULE;
  return last
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getSubtitle(content) {
  const patterns = [
    /<h[12][^>]*>[^]*?<\/h[12]>\s*<p[^>]*?(?:8899AA|7a8fa6|text-sm|text-slate|muted)[^>]*>\s*([A-Za-z][^<{}\n]+?)\s*<\/p>/,
    /<p[^>]*?(?:8899AA|7a8fa6)[^>]*>\s*([A-Za-z][^<{}\n]{10,}?)\s*<\/p>/,
  ];
  for (const p of patterns) {
    const m = content.match(p);
    if (m && m[1] && m[1].trim().length > 5) {
      const s = escapeStr(m[1]);
      if (s.length > 5 && s.length < 160) return s;
    }
  }
  return "";
}

function getBreadcrumbs(filePath) {
  const rel = relative(MODULE_DIR, filePath).replace(/[/\\]page\.tsx$/, "");
  const moduleLabel = MODULE
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  if (!rel || rel === "." || rel === "page.tsx") {
    return [{ label: moduleLabel }];
  }

  const parts = rel.split("/").filter(Boolean);
  const bcs = [{ label: moduleLabel, href: `/${MODULE}` }];
  let p = `/${MODULE}`;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("[")) {
      const segLabel = part.replace(/\[|\]/g, "").replace(/^\.\.\./, "");
      bcs.push({ label: segLabel.charAt(0).toUpperCase() + segLabel.slice(1) });
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

function getMaxWidth(content) {
  if (content.includes("max-w-[1400px]") || content.includes("max-w-7xl")) return "1400px";
  if (content.includes("max-w-6xl") || content.includes("max-w-[1300px]")) return "1300px";
  if (content.includes("max-w-5xl") || content.includes("max-w-[1100px]")) return "1100px";
  if (content.includes("max-w-4xl") || content.includes("max-w-[900px]")) return "900px";
  if (content.includes("max-w-3xl") || content.includes("max-w-[800px]")) return "800px";
  return "1200px";
}

/**
 * Find the last top-level return statement in the default export function.
 * Returns { returnStart, jsxStart, jsxEnd } or null.
 *
 * Strategy: find the last `return (` in the file, then balance parens to find
 * the matching close paren.
 */
function findReturnBounds(content) {
  // Find all `return (` occurrences
  const returnRegex = /\breturn\s*\(/g;
  let lastMatch = null;
  let m;
  while ((m = returnRegex.exec(content)) !== null) {
    lastMatch = m;
  }
  if (!lastMatch) return null;

  const openParenIdx = lastMatch.index + lastMatch[0].length - 1; // index of `(`
  // Balance parens from openParenIdx
  let depth = 0;
  let i = openParenIdx;
  while (i < content.length) {
    if (content[i] === "(") depth++;
    else if (content[i] === ")") {
      depth--;
      if (depth === 0) {
        return {
          returnStart: lastMatch.index,
          jsxStart: openParenIdx + 1,
          jsxEnd: i,
        };
      }
    }
    i++;
  }
  return null;
}

function migratePage(filePath) {
  let content = readFileSync(filePath, "utf-8");

  if (content.includes("@/components/ui/Page")) {
    return { skipped: true, reason: "already migrated" };
  }

  const title = getTitle(content, filePath);
  const subtitle = getSubtitle(content);
  const breadcrumbs = getBreadcrumbs(filePath);
  const maxWidth = getMaxWidth(content);

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
  ]
    .filter(Boolean)
    .join("\n            ");

  // Add Page import
  const importLine = 'import Page from "@/components/ui/Page";';
  if (!content.includes(importLine)) {
    if (content.includes('"use client"')) {
      content = content.replace('"use client";', `"use client";\n\n${importLine}`);
    } else if (content.includes("'use client'")) {
      content = content.replace("'use client';", `"use client";\n\n${importLine}`);
    } else {
      // Find first import line
      const firstImport = content.indexOf("\nimport ");
      if (firstImport !== -1) {
        content = content.slice(0, firstImport + 1) + importLine + "\n" + content.slice(firstImport + 1);
      } else {
        content = `"use client";\n\n${importLine}\n\n${content}`;
      }
    }
  }

  const bounds = findReturnBounds(content);
  if (!bounds) {
    return { skipped: true, reason: "no return statement found" };
  }

  const { jsxStart, jsxEnd } = bounds;
  const innerJsx = content.substring(jsxStart, jsxEnd);

  // Wrap the inner JSX in <Page>
  const wrappedJsx = `\n        <Page\n            ${pageProps}\n        >\n${innerJsx}\n        </Page>\n    `;

  content = content.substring(0, jsxStart) + wrappedJsx + content.substring(jsxEnd);

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
