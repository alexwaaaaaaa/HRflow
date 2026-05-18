/**
 * Fix script: moves <Page> from inside .map() callbacks to the top-level return.
 *
 * The migrate-misc-bulk.mjs script sometimes inserts <Page> inside a .map()
 * callback's return() instead of the component's top-level return(). This
 * script detects and fixes that pattern.
 *
 * Usage:
 *   node scripts/fix-page-placement.mjs <file-path>
 *   node scripts/fix-page-placement.mjs --all   (fixes all recently migrated files)
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");

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

/**
 * Check if a file has the "Page inside map" problem.
 * Heuristic: the file has <Page> but the <Page> tag appears AFTER a .map(
 * or .map((  line without a closing </Page> before the next .map(
 */
function hasPageInMapProblem(content) {
  if (!content.includes("@/components/ui/Page")) return false;
  
  // Find the position of <Page in the file
  const pageIdx = content.indexOf("<Page");
  if (pageIdx === -1) return false;
  
  // Check if there's a .map( before the <Page that doesn't have a closing paren
  // before the <Page
  const beforePage = content.substring(0, pageIdx);
  
  // Look for the last 'return (' before <Page
  const lastReturnBeforePage = beforePage.lastIndexOf("return (");
  if (lastReturnBeforePage === -1) return false;
  
  // Check if this return is inside a .map() callback
  // by looking for .map( before this return
  const beforeReturn = beforePage.substring(0, lastReturnBeforePage);
  const lastMapBeforeReturn = Math.max(
    beforeReturn.lastIndexOf(".map(("),
    beforeReturn.lastIndexOf(".map(d =>"),
    beforeReturn.lastIndexOf(".map((d,"),
    beforeReturn.lastIndexOf(".map((kpi"),
    beforeReturn.lastIndexOf(".map((item"),
    beforeReturn.lastIndexOf(".map((row"),
    beforeReturn.lastIndexOf(".map((plan"),
    beforeReturn.lastIndexOf(".map((step"),
    beforeReturn.lastIndexOf(".map((q,"),
    beforeReturn.lastIndexOf(".map((opt"),
    beforeReturn.lastIndexOf(".map((tab"),
    beforeReturn.lastIndexOf(".map((s,"),
    beforeReturn.lastIndexOf(".map((t,"),
    beforeReturn.lastIndexOf(".map((c,"),
    beforeReturn.lastIndexOf(".map((e,"),
    beforeReturn.lastIndexOf(".map((n,"),
    beforeReturn.lastIndexOf(".map((f,"),
    beforeReturn.lastIndexOf(".map((m,"),
    beforeReturn.lastIndexOf(".map((p,"),
    beforeReturn.lastIndexOf(".map((r,"),
    beforeReturn.lastIndexOf(".map((v,"),
    beforeReturn.lastIndexOf(".map((w,"),
    beforeReturn.lastIndexOf(".map((x,"),
    beforeReturn.lastIndexOf(".map((y,"),
    beforeReturn.lastIndexOf(".map((z,"),
    beforeReturn.lastIndexOf(".map((i,"),
    beforeReturn.lastIndexOf(".map((j,"),
    beforeReturn.lastIndexOf(".map((k,"),
    beforeReturn.lastIndexOf(".map((l,"),
    beforeReturn.lastIndexOf(".map((a,"),
    beforeReturn.lastIndexOf(".map((b,"),
    beforeReturn.lastIndexOf(".map((g,"),
    beforeReturn.lastIndexOf(".map((h,"),
    beforeReturn.lastIndexOf(".map((u,"),
    beforeReturn.lastIndexOf(".map((val"),
    beforeReturn.lastIndexOf(".map((dept"),
    beforeReturn.lastIndexOf(".map((emp"),
    beforeReturn.lastIndexOf(".map((user"),
    beforeReturn.lastIndexOf(".map((ticket"),
    beforeReturn.lastIndexOf(".map((award"),
    beforeReturn.lastIndexOf(".map((survey"),
    beforeReturn.lastIndexOf(".map((event"),
    beforeReturn.lastIndexOf(".map((benefit"),
    beforeReturn.lastIndexOf(".map((card"),
    beforeReturn.lastIndexOf(".map((link"),
    beforeReturn.lastIndexOf(".map((metric"),
    beforeReturn.lastIndexOf(".map((stat"),
    beforeReturn.lastIndexOf(".map((doc"),
    beforeReturn.lastIndexOf(".map((file"),
    beforeReturn.lastIndexOf(".map((role"),
    beforeReturn.lastIndexOf(".map((team"),
    beforeReturn.lastIndexOf(".map((goal"),
    beforeReturn.lastIndexOf(".map((task"),
    beforeReturn.lastIndexOf(".map((action"),
    beforeReturn.lastIndexOf(".map((phase"),
    beforeReturn.lastIndexOf(".map((stage"),
    beforeReturn.lastIndexOf(".map((level"),
    beforeReturn.lastIndexOf(".map((type"),
    beforeReturn.lastIndexOf(".map((cat"),
    beforeReturn.lastIndexOf(".map((tag"),
    beforeReturn.lastIndexOf(".map((badge"),
    beforeReturn.lastIndexOf(".map((chip"),
    beforeReturn.lastIndexOf(".map((filter"),
    beforeReturn.lastIndexOf(".map((col"),
    beforeReturn.lastIndexOf(".map((row"),
    beforeReturn.lastIndexOf(".map((cell"),
    beforeReturn.lastIndexOf(".map((node"),
    beforeReturn.lastIndexOf(".map((edge"),
    beforeReturn.lastIndexOf(".map((point"),
    beforeReturn.lastIndexOf(".map((bar"),
    beforeReturn.lastIndexOf(".map((line"),
    beforeReturn.lastIndexOf(".map((area"),
    beforeReturn.lastIndexOf(".map((pie"),
    beforeReturn.lastIndexOf(".map((slice"),
    beforeReturn.lastIndexOf(".map((segment"),
    beforeReturn.lastIndexOf(".map((section"),
    beforeReturn.lastIndexOf(".map((group"),
    beforeReturn.lastIndexOf(".map((cluster"),
    beforeReturn.lastIndexOf(".map((bucket"),
    beforeReturn.lastIndexOf(".map((bin"),
    beforeReturn.lastIndexOf(".map((range"),
    beforeReturn.lastIndexOf(".map((period"),
    beforeReturn.lastIndexOf(".map((month"),
    beforeReturn.lastIndexOf(".map((week"),
    beforeReturn.lastIndexOf(".map((day"),
    beforeReturn.lastIndexOf(".map((hour"),
    beforeReturn.lastIndexOf(".map((minute"),
    beforeReturn.lastIndexOf(".map((second"),
    beforeReturn.lastIndexOf(".map((year"),
    beforeReturn.lastIndexOf(".map((quarter"),
    beforeReturn.lastIndexOf(".map((semester"),
    beforeReturn.lastIndexOf(".map((season"),
    beforeReturn.lastIndexOf(".map((cycle"),
    beforeReturn.lastIndexOf(".map((sprint"),
    beforeReturn.lastIndexOf(".map((milestone"),
    beforeReturn.lastIndexOf(".map((checkpoint"),
    beforeReturn.lastIndexOf(".map((waypoint"),
    beforeReturn.lastIndexOf(".map((stop"),
    beforeReturn.lastIndexOf(".map((station"),
    beforeReturn.lastIndexOf(".map((location"),
    beforeReturn.lastIndexOf(".map((place"),
    beforeReturn.lastIndexOf(".map((site"),
    beforeReturn.lastIndexOf(".map((venue"),
    beforeReturn.lastIndexOf(".map((address"),
    beforeReturn.lastIndexOf(".map((city"),
    beforeReturn.lastIndexOf(".map((country"),
    beforeReturn.lastIndexOf(".map((region"),
    beforeReturn.lastIndexOf(".map((zone"),
    beforeReturn.lastIndexOf(".map((area"),
    beforeReturn.lastIndexOf(".map((territory"),
    beforeReturn.lastIndexOf(".map((district"),
    beforeReturn.lastIndexOf(".map((province"),
    beforeReturn.lastIndexOf(".map((state"),
    beforeReturn.lastIndexOf(".map((county"),
    beforeReturn.lastIndexOf(".map((municipality"),
    beforeReturn.lastIndexOf(".map((ward"),
    beforeReturn.lastIndexOf(".map((block"),
    beforeReturn.lastIndexOf(".map((lot"),
    beforeReturn.lastIndexOf(".map((plot"),
    beforeReturn.lastIndexOf(".map((parcel"),
    beforeReturn.lastIndexOf(".map((unit"),
    beforeReturn.lastIndexOf(".map((floor"),
    beforeReturn.lastIndexOf(".map((room"),
    beforeReturn.lastIndexOf(".map((desk"),
    beforeReturn.lastIndexOf(".map((seat"),
    beforeReturn.lastIndexOf(".map((position"),
    beforeReturn.lastIndexOf(".map((slot"),
    beforeReturn.lastIndexOf(".map((spot"),
    beforeReturn.lastIndexOf(".map((space"),
    beforeReturn.lastIndexOf(".map((place"),
    beforeReturn.lastIndexOf(".map((area"),
    beforeReturn.lastIndexOf(".map((zone"),
    beforeReturn.lastIndexOf(".map((region"),
    beforeReturn.lastIndexOf(".map((territory"),
    beforeReturn.lastIndexOf(".map((district"),
    beforeReturn.lastIndexOf(".map((province"),
    beforeReturn.lastIndexOf(".map((state"),
    beforeReturn.lastIndexOf(".map((county"),
    beforeReturn.lastIndexOf(".map((municipality"),
    beforeReturn.lastIndexOf(".map((ward"),
    beforeReturn.lastIndexOf(".map((block"),
    beforeReturn.lastIndexOf(".map((lot"),
    beforeReturn.lastIndexOf(".map((plot"),
    beforeReturn.lastIndexOf(".map((parcel"),
    beforeReturn.lastIndexOf(".map((unit"),
    beforeReturn.lastIndexOf(".map((floor"),
    beforeReturn.lastIndexOf(".map((room"),
    beforeReturn.lastIndexOf(".map((desk"),
    beforeReturn.lastIndexOf(".map((seat"),
    beforeReturn.lastIndexOf(".map((position"),
    beforeReturn.lastIndexOf(".map((slot"),
    beforeReturn.lastIndexOf(".map((spot"),
    beforeReturn.lastIndexOf(".map((space"),
  );
  
  return lastMapBeforeReturn > 0;
}

/**
 * Fix the "Page inside map" problem.
 * 
 * Strategy:
 * 1. Find the <Page ... > block
 * 2. Find the matching </Page>
 * 3. Extract the Page props
 * 4. Remove the <Page> and </Page> from their current location
 * 5. Find the component's top-level return (
 * 6. Wrap the entire JSX in <Page>
 */
function fixPagePlacement(content) {
  // Find <Page block
  const pageOpenMatch = content.match(/<Page\s[\s\S]*?>/);
  if (!pageOpenMatch) return null;
  
  const pageOpenStr = pageOpenMatch[0];
  const pageOpenIdx = content.indexOf(pageOpenStr);
  
  // Find the matching </Page>
  const pageCloseStr = "</Page>";
  // Find the </Page> that matches this <Page>
  // Walk forward from pageOpenIdx, counting <Page> and </Page>
  let depth = 0;
  let i = pageOpenIdx;
  let pageCloseIdx = -1;
  
  while (i < content.length) {
    if (content.startsWith("<Page", i) && (content[i + 5] === " " || content[i + 5] === "\n" || content[i + 5] === ">")) {
      depth++;
      i += 5;
    } else if (content.startsWith("</Page>", i)) {
      depth--;
      if (depth === 0) {
        pageCloseIdx = i;
        break;
      }
      i += 7;
    } else {
      i++;
    }
  }
  
  if (pageCloseIdx === -1) return null;
  
  // Extract the inner content between <Page> and </Page>
  const innerContent = content.substring(pageOpenIdx + pageOpenStr.length, pageCloseIdx);
  
  // Remove the <Page> and </Page> from their current location
  // Also remove any surrounding whitespace/newlines
  let before = content.substring(0, pageOpenIdx);
  let after = content.substring(pageCloseIdx + pageCloseStr.length);
  
  // Clean up the surrounding whitespace
  before = before.replace(/\s+$/, "\n");
  after = after.replace(/^\s+/, "\n");
  
  const withoutPage = before + innerContent + after;
  
  // Now find the component's top-level return (
  // Find the last 'return (' that is at the function body level (not inside a map)
  // Strategy: find the export default function, then find its return
  const exportMatch = withoutPage.match(/export\s+default\s+function\s+\w+[^{]*\{/);
  if (!exportMatch) return null;
  
  const funcBodyStart = withoutPage.indexOf(exportMatch[0]) + exportMatch[0].length;
  
  // Find the first 'return (' after funcBodyStart at the right indent level
  const returnRegex = /\n([ \t]*)return\s*\(/g;
  returnRegex.lastIndex = funcBodyStart;
  let m;
  let bestIdx = -1;
  let bestIndent = Infinity;
  while ((m = returnRegex.exec(withoutPage)) !== null) {
    const indentLen = m[1].length;
    if (indentLen <= bestIndent) {
      bestIndent = indentLen;
      bestIdx = m.index + 1; // position of 'return'
    }
  }
  
  if (bestIdx === -1) return null;
  
  // Find the opening paren of this return
  const returnSlice = withoutPage.substring(bestIdx);
  const parenOffset = returnSlice.indexOf("(");
  const jsxStart = bestIdx + parenOffset + 1;
  
  // Balance parens to find the closing paren
  let depth2 = 0;
  let j = bestIdx + parenOffset;
  let jsxEnd = -1;
  while (j < withoutPage.length) {
    if (withoutPage[j] === "(") depth2++;
    else if (withoutPage[j] === ")") {
      depth2--;
      if (depth2 === 0) {
        jsxEnd = j;
        break;
      }
    }
    j++;
  }
  
  if (jsxEnd === -1) return null;
  
  const innerJsx = withoutPage.substring(jsxStart, jsxEnd);
  
  // Wrap with <Page>
  const wrappedJsx = `\n        ${pageOpenStr}\n${innerJsx}\n        </Page>\n    `;
  
  return withoutPage.substring(0, jsxStart) + wrappedJsx + withoutPage.substring(jsxEnd);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

let filesToProcess = [];

if (args[0] === "--all") {
  // Find all recently migrated files
  const appDir = join(ROOT, "app/(app)");
  const allPages = findPages(appDir);
  filesToProcess = allPages.filter(f => {
    const content = readFileSync(f, "utf-8");
    return content.includes("@/components/ui/Page") && hasPageInMapProblem(content);
  });
} else if (args[0]) {
  filesToProcess = [args[0]];
} else {
  console.error("Usage: node scripts/fix-page-placement.mjs <file-path> | --all");
  process.exit(1);
}

let fixed = 0;
let skipped = 0;
let errors = 0;

for (const filePath of filesToProcess) {
  try {
    const content = readFileSync(filePath, "utf-8");
    
    if (!hasPageInMapProblem(content)) {
      skipped++;
      continue;
    }
    
    const fixed_content = fixPagePlacement(content);
    if (!fixed_content) {
      console.log(`  ⏭️  ${filePath} — could not fix`);
      skipped++;
      continue;
    }
    
    writeFileSync(filePath, fixed_content, "utf-8");
    console.log(`  ✅ Fixed: ${filePath}`);
    fixed++;
  } catch (e) {
    console.log(`  ❌ Error: ${filePath}: ${e.message}`);
    errors++;
  }
}

console.log(`\nDone. Fixed: ${fixed} | Skipped: ${skipped} | Errors: ${errors}`);
