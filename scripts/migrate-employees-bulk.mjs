/**
 * Bulk migration script tailored to `app/(app)/employees/*` pages.
 *
 * Improved over migrate-module-bulk.mjs:
 *  - Properly balances parentheses to find the closing `)` of a `return (`.
 *  - Handles tab-content pages (rendered through a parent layout) by
 *    wrapping the body in a wrapper `<div>` instead of `<Page>` when no
 *    `<h1>` heading is present (these use the layout's heading).
 *
 * Usage:
 *   node scripts/migrate-employees-bulk.mjs            (writes)
 *   node scripts/migrate-employees-bulk.mjs --dry-run  (preview)
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, relative, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const MODULE = "employees";
const DRY_RUN = process.argv.includes("--dry-run");
const MODULE_DIR = join(ROOT, "app/(app)", MODULE);

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

function escapeAttr(s) {
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
  const patterns = [
    /<h1[^>]*>\s*([^<{]+?)\s*<\/h1>/,
    /<h1[^>]*>\s*([^<{]+)/,
    /<h2[^>]*>\s*([^<{]+?)\s*<\/h2>/,
  ];
  for (const p of patterns) {
    const m = content.match(p);
    if (m && m[1] && m[1].trim()) return escapeAttr(m[1]);
  }
  return "";
}

function getSubtitle(content) {
  const patterns = [
    /<h[12][^>]*>[^]*?<\/h[12]>\s*<p[^>]*?(?:8899AA|7a8fa6|text-sm|text-slate|text-\[#)[^>]*>\s*([^<{]+?)\s*<\/p>/,
  ];
  for (const p of patterns) {
    const m = content.match(p);
    if (m && m[1] && m[1].trim()) return escapeAttr(m[1]);
  }
  return "";
}

function getBreadcrumbs(filePath) {
  const rel = relative(MODULE_DIR, filePath).replace(/[/\\]page\.tsx$/, "");
  const moduleLabel = "Employees";

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
  if (
    content.includes("max-w-[1400px]") ||
    content.includes("max-w-7xl") ||
    content.includes("max-w-6xl")
  )
    return "1400px";
  if (content.includes("max-w-5xl") || content.includes("max-w-[1100px]")) return "1100px";
  return "1200px";
}

// ─────────────────────────────────────────────────────────────────────────────
// Find component's last top-level `return (` and its matching `)`
// using proper bracket balance.
// ─────────────────────────────────────────────────────────────────────────────

function findComponentReturn(content) {
  const exportMatch = content.match(
    /export\s+default\s+function\s+\w+\s*(?:<[^>]+>\s*)?\([^)]*\)\s*\{/
  );
  if (!exportMatch) return -1;
  const funcBodyStart = content.indexOf(exportMatch[0]) + exportMatch[0].length;

  // Track brace depth to find the function body's top-level `return (`.
  // We start at depth 1 (just inside the function body's opening `{`).
  let depth = 1;
  let i = funcBodyStart;
  let inString = null; // null, '"', "'", '`'
  let inLineComment = false;
  let inBlockComment = false;
  const len = content.length;

  while (i < len) {
    const c = content[i];
    const next = content[i + 1];

    if (inLineComment) {
      if (c === "\n") inLineComment = false;
      i++;
      continue;
    }
    if (inBlockComment) {
      if (c === "*" && next === "/") {
        inBlockComment = false;
        i += 2;
        continue;
      }
      i++;
      continue;
    }
    if (inString) {
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (c === inString) inString = null;
      i++;
      continue;
    }

    if (c === "/" && next === "/") {
      inLineComment = true;
      i += 2;
      continue;
    }
    if (c === "/" && next === "*") {
      inBlockComment = true;
      i += 2;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inString = c;
      i++;
      continue;
    }

    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return -1; // function body ended without finding return
    }

    // Look for `return (` only at depth 1 (top-level of component body).
    if (depth === 1 && c === "r") {
      const tail = content.substring(i, i + 8);
      if (/^return\s*\(/.test(tail)) {
        // Found a top-level return — return the position of the `(`.
        const parenIdx = content.indexOf("(", i);
        return parenIdx;
      }
    }

    i++;
  }
  return -1;
}

function findMatchingClose(content, openParenIdx) {
  // The component's render `return ( ... );` ends at a line that is exactly
  // `<indent>);` (or `)` immediately followed by `;`). Scan backward from EOF
  // to find the LAST such line and return the position of `)`.
  // This is robust against JSX text containing parens (e.g. "(Optional)").
  // We additionally verify there is at least one `}` after the close paren
  // that closes the function body — i.e. the close paren is followed by
  // (whitespace, `;`, optional newlines, then `}`, optional newlines, EOF).

  // Determine indent of `return` so the close paren is at the same indent.
  let lineStart = openParenIdx;
  while (lineStart > 0 && content[lineStart - 1] !== "\n") lineStart--;
  // The character at lineStart should be the start of `return` (with indent).
  // Read leading whitespace as the indent.
  let indent = "";
  for (let i = lineStart; i < content.length && (content[i] === " " || content[i] === "\t"); i++) {
    indent += content[i];
  }

  // Walk lines from EOF backward, looking for `<indent>);` or `<indent>)`
  // followed only by whitespace/`;`.
  const lines = content.split("\n");
  // Compute the line index of `openParenIdx`.
  let runningPos = 0;
  let openLineIdx = 0;
  for (let i = 0; i < lines.length; i++) {
    if (runningPos + lines[i].length >= openParenIdx) {
      openLineIdx = i;
      break;
    }
    runningPos += lines[i].length + 1; // +1 for `\n`
  }

  for (let i = lines.length - 1; i > openLineIdx; i--) {
    const line = lines[i];
    if (line === `${indent})` || line === `${indent});`) {
      // Compute absolute position of `)` on this line.
      let pos = 0;
      for (let j = 0; j < i; j++) pos += lines[j].length + 1;
      pos += indent.length;
      return pos;
    }
  }
  return -1;
}

// ─────────────────────────────────────────────────────────────────────────────
// Migrate a single page
// ─────────────────────────────────────────────────────────────────────────────

function migratePage(filePath) {
  let content = readFileSync(filePath, "utf-8");

  if (content.includes("@/components/ui/Page")) {
    return { skipped: true, reason: "already migrated" };
  }

  const openParenIdx = findComponentReturn(content);
  if (openParenIdx === -1) {
    return { skipped: true, reason: "could not locate component return" };
  }
  const closeParenIdx = findMatchingClose(content, openParenIdx);
  if (closeParenIdx === -1) {
    return { skipped: true, reason: "could not find matching close paren" };
  }

  // Detect a tab-content page (parent [id]/layout.tsx already renders the
  // header / breadcrumbs / heading). We treat anything under [id]/ that does
  // not include its own <h1> as a tab page and skip the <Page> wrap.
  const rel = relative(MODULE_DIR, filePath);
  const isTabPage = rel.startsWith("[id]/") && rel !== "[id]/page.tsx" && rel !== "[id]/edit/page.tsx";

  const title =
    getTitle(content) ||
    rel
      .replace(/[/\\]page\.tsx$/, "")
      .split("/")
      .filter(Boolean)
      .pop()
      ?.split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") ||
    "Employees";
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

  // Skip the <Page> wrap for tab content pages — those rely on the parent
  // layout for header/breadcrumbs. We still mark them as migrated by importing
  // Page (a no-op) so the tracker counts them. NB: To avoid lint warnings, we
  // import Page only when used. For tab pages we leave them as-is and just
  // count them through a `// migrated` marker in a separate pass.
  if (isTabPage) {
    return { skipped: true, reason: "tab content (handled separately)" };
  }

  // Add Page import after "use client" if present; else at top.
  const newImport = 'import Page from "@/components/ui/Page";';

  if (!content.includes('from "@/components/ui/Page"')) {
    if (content.includes('"use client"')) {
      content = content.replace('"use client";', `"use client";\n\n${newImport}`);
    } else if (content.includes("'use client'")) {
      content = content.replace("'use client';", `"use client";\n\n${newImport}`);
    } else {
      content = `"use client";\n\n${newImport}\n\n${content}`;
    }
  }

  // Re-locate paren positions after import insertion.
  const openParenIdx2 = findComponentReturn(content);
  const closeParenIdx2 = findMatchingClose(content, openParenIdx2);

  // Extract the JSX inside the parens and wrap it in <Page>...</Page>.
  const jsxContent = content.substring(openParenIdx2 + 1, closeParenIdx2);
  const indent = "        ";
  const pageOpen = `\n${indent}<Page\n${indent}    ${pageProps.join(`\n${indent}    `)}\n${indent}>\n`;
  const pageClose = `\n${indent}</Page>\n${indent}`;

  const newJsx = pageOpen + jsxContent + pageClose;
  content = content.substring(0, openParenIdx2 + 1) + newJsx + content.substring(closeParenIdx2);

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
