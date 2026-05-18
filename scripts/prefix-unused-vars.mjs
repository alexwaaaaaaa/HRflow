#!/usr/bin/env node
/**
 * Prefix all `unused-imports/no-unused-vars` warnings with `_`.
 *
 * Strategy:
 *   1. Run ESLint with --format json to get exact locations.
 *   2. For each warning, parse "'foo' is …" out of the message.
 *   3. Open the file, locate the column on the reported line, and replace
 *      the **first** occurrence of `\bfoo\b` at-or-after that column with
 *      `_foo` if it isn't already prefixed.
 *   4. Group edits per-file so we apply them right-to-left within a line
 *      (avoids column drift after earlier edits).
 *
 * The script never deletes code — only prefixes — so it is safe to re-run
 * and is a no-op once everything is renamed.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const RULE_ID = "unused-imports/no-unused-vars";

const _root = process.cwd();
const json = execFileSync("npx", ["eslint", ".", "-f", "json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    maxBuffer: 32 * 1024 * 1024,
});
const report = JSON.parse(json);

// Group warnings by file → line → list of { col, name }
/** @type {Map<string, Map<number, Array<{col:number, name:string}>>>} */
const byFile = new Map();
let total = 0;

for (const file of report) {
    for (const msg of file.messages || []) {
        if (msg.ruleId !== RULE_ID) continue;
        const m = msg.message.match(/'([^']+)'/);
        if (!m) continue;
        const name = m[1];
        if (name.startsWith("_")) continue;
        if (!byFile.has(file.filePath)) byFile.set(file.filePath, new Map());
        const lineMap = byFile.get(file.filePath);
        if (!lineMap.has(msg.line)) lineMap.set(msg.line, []);
        lineMap.get(msg.line).push({ col: msg.column, name });
        total++;
    }
}

console.log(`Found ${total} unused-vars across ${byFile.size} files`);

let touched = 0;
let edits = 0;

for (const [filePath, lineMap] of byFile) {
    const original = readFileSync(filePath, "utf8");
    const lines = original.split("\n");

    for (const [line, occurrences] of lineMap) {
        const idx = line - 1;
        if (!lines[idx]) continue;
        // Sort right-to-left so earlier columns aren't shifted by later edits.
        const sorted = [...occurrences].sort((a, b) => b.col - a.col);
        for (const { col, name } of sorted) {
            const original = lines[idx];
            // Build a regex with word boundaries; match starting at-or-after col.
            const re = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`, "g");
            const segment = original.slice(col - 1);
            const match = re.exec(segment);
            if (!match) continue;
            const absoluteIdx = col - 1 + match.index;
            // Skip if already underscore-prefixed.
            if (absoluteIdx > 0 && original[absoluteIdx - 1] === "_") continue;
            const before = original.slice(0, absoluteIdx);
            const after = original.slice(absoluteIdx);
            lines[idx] = before + "_" + after;
            edits++;
        }
    }

    const next = lines.join("\n");
    if (next !== original) {
        writeFileSync(filePath, next);
        touched++;
    }
}

console.log(`Touched ${touched} files; performed ${edits} prefix edits.`);
