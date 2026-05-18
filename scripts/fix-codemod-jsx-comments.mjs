#!/usr/bin/env node
/**
 * scripts/fix-codemod-jsx-comments.mjs
 *
 * The migrate-buttons codemod inserts `// raw-button: codemod-uncertain — review manually`
 * line comments inside JSX, which are invalid (treated as text by JSX). This script
 * converts them to proper `{/* … *\/}` JSX comments.
 *
 * Usage:
 *   node scripts/fix-codemod-jsx-comments.mjs <glob-or-dir>
 */

import { readFileSync, writeFileSync, statSync, readdirSync } from "fs";
import { join, extname } from "path";

const target = process.argv[2];
if (!target) {
  console.error("Usage: node scripts/fix-codemod-jsx-comments.mjs <dir>");
  process.exit(1);
}

const TSX_RE = /\.(t|j)sx$/;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (s.isFile() && TSX_RE.test(extname(p))) out.push(p);
  }
  return out;
}

const files = statSync(target).isDirectory() ? walk(target) : [target];
let totalChanged = 0;
let filesChanged = 0;

for (const file of files) {
  let src = readFileSync(file, "utf8");
  // Match line comments that are clearly JSX-text (preceded by whitespace at start of line,
  // and the comment text starts with "raw-button:" — the codemod's signature).
  const before = src;
  src = src.replace(
    /^(\s*)\/\/ (raw-button: codemod-uncertain — review manually)\s*$/gm,
    "$1{/* $2 */}",
  );
  if (src !== before) {
    writeFileSync(file, src, "utf8");
    const occurrences = (before.match(/\/\/ raw-button: codemod-uncertain/g) || []).length;
    totalChanged += occurrences;
    filesChanged++;
  }
}

console.log(`Fixed ${totalChanged} JSX comments across ${filesChanged} files.`);
