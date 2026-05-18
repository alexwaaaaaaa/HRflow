/**
 * Bulk migration script for attendance pages.
 * Strategy: Find the component's main return JSX and wrap it in <Page>.
 * Preserves all existing structure - just adds the Page wrapper.
 * 
 * Run: node scripts/migrate-attendance-bulk.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, relative, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const ATTENDANCE_DIR = join(ROOT, "app/(app)/attendance");

function findPages(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findPages(full));
    else if (entry.name === "page.tsx") results.push(full);
  }
  return results;
}

function getTitle(content) {
  const m = content.match(/<h[12][^>]*>\s*([^<{]+)/);
  return m ? m[1].trim().replace(/"/g, '\\"') : "";
}

function getSubtitle(content) {
  const patterns = [
    /<h[12][^>]*>[^<]*<\/h[12]>\s*\n?\s*<p[^>]*(?:8899AA)[^>]*>\s*([^<{]+)/,
  ];
  for (const p of patterns) {
    const m = content.match(p);
    if (m) return m[1].trim().replace(/"/g, '\\"');
  }
  return "";
}

function getBreadcrumbs(filePath) {
  const rel = relative(ATTENDANCE_DIR, filePath).replace(/[/\\]page\.tsx$/, "");
  if (!rel || rel === "." || rel === "page.tsx") {
    return [{ label: "Attendance" }];
  }
  
  const parts = rel.split("/").filter(Boolean);
  const bcs = [{ label: "Attendance", href: "/attendance/dashboard" }];
  let p = "/attendance";
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("[")) continue;
    p += `/${part}`;
    const label = part.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
    if (i < parts.length - 1) bcs.push({ label, href: p });
    else bcs.push({ label });
  }
  return bcs;
}

function getMaxWidth(filePath, content) {
  const rel = relative(ATTENDANCE_DIR, filePath);
  if (rel.includes("settings/")) return "900px";
  if (content.includes("max-w-[1400px]") || content.includes("max-w-6xl") || content.includes("max-w-5xl")) return "1400px";
  if (content.includes("max-w-4xl") || content.includes("max-w-[720px]")) return "900px";
  return "1200px";
}

/**
 * Find the LAST "return (" in the default export function.
 * This is the component's render return, not useEffect cleanup returns.
 */
function findComponentReturn(content) {
  // Find the default export function
  const exportMatch = content.match(/export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{/);
  if (!exportMatch) return -1;
  
  const funcStart = content.indexOf(exportMatch[0]) + exportMatch[0].length;
  
  // Find all "return (" within this function, take the last one at depth 0
  // We need to track brace depth to know we're at the top level of the function
  let braceDepth = 1; // we're inside the function body
  let lastReturnIdx = -1;
  let i = funcStart;
  
  while (i < content.length && braceDepth > 0) {
    const ch = content[i];
    
    // Skip strings
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      i++;
      while (i < content.length) {
        if (content[i] === '\\') { i += 2; continue; }
        if (content[i] === quote) break;
        if (quote === '`' && content[i] === '$' && content[i+1] === '{') {
          // template literal expression - skip it
          i += 2;
          let tDepth = 1;
          while (i < content.length && tDepth > 0) {
            if (content[i] === '{') tDepth++;
            else if (content[i] === '}') tDepth--;
            i++;
          }
          continue;
        }
        i++;
      }
      i++;
      continue;
    }
    
    // Skip line comments
    if (ch === '/' && content[i+1] === '/') {
      while (i < content.length && content[i] !== '\n') i++;
      continue;
    }
    
    // Skip block comments
    if (ch === '/' && content[i+1] === '*') {
      i += 2;
      while (i < content.length && !(content[i] === '*' && content[i+1] === '/')) i++;
      i += 2;
      continue;
    }
    
    if (ch === '{') braceDepth++;
    else if (ch === '}') braceDepth--;
    
    // Check for "return (" at brace depth 1 (top level of function)
    if (braceDepth === 1 && ch === 'r') {
      const slice = content.substring(i, i + 20);
      const retMatch = slice.match(/^return\s*\(/);
      if (retMatch) {
        lastReturnIdx = i;
      }
    }
    
    i++;
  }
  
  return lastReturnIdx;
}

function migratePage(filePath) {
  let content = readFileSync(filePath, "utf-8");
  if (content.includes("@/components/ui/Page")) return false;

  const rel = relative(ATTENDANCE_DIR, filePath).replace(/[/\\]page\.tsx$/, "");
  const parts = rel.split("/").filter(Boolean);
  const title = getTitle(content) || (parts[parts.length - 1] || "attendance").split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
  const subtitle = getSubtitle(content);
  const breadcrumbs = getBreadcrumbs(filePath);
  const maxWidth = getMaxWidth(filePath, content);

  const bcStr = breadcrumbs.map(b => b.href ? `{ label: "${b.label}", href: "${b.href}" }` : `{ label: "${b.label}" }`).join(", ");

  const pageProps = [
    `title="${title}"`,
    subtitle ? `subtitle="${subtitle}"` : null,
    `breadcrumbs={[${bcStr}]}`,
    `maxWidth="${maxWidth}"`,
  ].filter(Boolean);

  // Step 1: Add imports
  const imports = 'import Page from "@/components/ui/Page";\nimport Button from "@/components/ui/Button";\nimport Card from "@/components/ui/Card";';
  
  if (content.includes('"use client"')) {
    content = content.replace('"use client";', `"use client";\n\n${imports}`);
  } else if (content.includes("'use client'")) {
    content = content.replace("'use client';", `"use client";\n\n${imports}`);
  }

  // Step 2: Find the component's return statement
  const returnIdx = findComponentReturn(content);
  if (returnIdx === -1) {
    console.log(`  ⚠️  No component return found: ${relative(ROOT, filePath)}`);
    writeFileSync(filePath, content, "utf-8");
    return true;
  }

  // Find "return (" and the opening paren
  const returnSlice = content.substring(returnIdx);
  const parenIdx = returnSlice.indexOf("(");
  const afterParen = returnIdx + parenIdx + 1;

  // Find the matching closing paren
  let depth = 1;
  let closeParenIdx = -1;
  let j = afterParen;
  
  while (j < content.length && depth > 0) {
    const ch = content[j];
    
    // Skip strings
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      j++;
      while (j < content.length) {
        if (content[j] === '\\') { j += 2; continue; }
        if (content[j] === quote) break;
        if (quote === '`' && content[j] === '$' && content[j+1] === '{') {
          j += 2;
          let tDepth = 1;
          while (j < content.length && tDepth > 0) {
            if (content[j] === '{') tDepth++;
            else if (content[j] === '}') tDepth--;
            j++;
          }
          continue;
        }
        j++;
      }
      j++;
      continue;
    }
    
    // Skip JSX string attributes like className="..."
    // Already handled by the string skip above
    
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth === 0) {
        closeParenIdx = j;
        break;
      }
    }
    j++;
  }

  if (closeParenIdx === -1) {
    console.log(`  ⚠️  Could not find closing paren: ${relative(ROOT, filePath)}`);
    writeFileSync(filePath, content, "utf-8");
    return true;
  }

  // Extract the JSX content between the parens
  const jsxContent = content.substring(afterParen, closeParenIdx);
  
  // Wrap in <Page>
  const indent = "        ";
  const pageOpen = `\n${indent}<Page\n${indent}    ${pageProps.join(`\n${indent}    `)}\n${indent}>\n`;
  const pageClose = `\n${indent}</Page>\n${indent}`;
  
  const newJsx = pageOpen + jsxContent + pageClose;
  
  // Replace
  content = content.substring(0, afterParen) + newJsx + content.substring(closeParenIdx);

  writeFileSync(filePath, content, "utf-8");
  return true;
}

// Main
const pages = findPages(ATTENDANCE_DIR);
const unmigrated = pages.filter(p => !readFileSync(p, "utf-8").includes("@/components/ui/Page"));

console.log(`Total: ${pages.length} | Already migrated: ${pages.length - unmigrated.length} | Need migration: ${unmigrated.length}\n`);

let migrated = 0;
for (const p of unmigrated) {
  try {
    if (migratePage(p)) {
      migrated++;
      console.log(`  ✅ ${relative(ROOT, p)}`);
    }
  } catch (e) {
    console.log(`  ❌ ${relative(ROOT, p)}: ${e.message}`);
  }
}

console.log(`\nDone. Migrated: ${migrated}`);
