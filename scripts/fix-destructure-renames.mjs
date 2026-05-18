#!/usr/bin/env node
/**
 * Repair the over-eager underscore prefixing done in `prefix-unused-vars.mjs`
 * for destructured object patterns.
 *
 * The previous script naïvely turned `{ params }: …` into `{ _params }: …`
 * which renames the **property key** (TS error: property '_params' does not
 * exist). The correct transform when shorthand destructuring is unused is
 * to use a rename: `{ params: _params }`.
 *
 * Same applies to `{ data, onUpdate }` → `{ data: _data, onUpdate: _onUpdate }`.
 *
 * This script scans for the patterns we know we broke and fixes them.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const root = process.cwd();
const files = execSync(
    `git diff --name-only -- '*.tsx' '*.ts' | grep -v '^scripts/'`,
    { cwd: root, encoding: "utf8" }
).split("\n").filter(Boolean);

// Each entry: original key name → underscore replacement we incorrectly applied.
const KEYS = ["params", "data", "onUpdate", "onGoToStep"];

let touched = 0;
let edits = 0;

for (const rel of files) {
    const file = `${root}/${rel}`;
    let src;
    try { src = readFileSync(file, "utf8"); }
    catch { continue; }

    let next = src;

    for (const key of KEYS) {
        const broken = new RegExp(`\\{([^}]*?\\b)_${key}\\b`, "g");
        next = next.replace(broken, (match, before) => {
            // Only replace if the previous char is NOT a colon (already a rename).
            if (/:\s*$/.test(before)) return match;
            // Already-prefix safety: ensure we don't re-rename `__params`
            return `{${before}${key}: _${key}`;
        });
    }

    if (next !== src) {
        writeFileSync(file, next);
        touched++;
        edits += (src.match(/_params|_data|_onUpdate|_onGoToStep/g) || []).length;
    }
}

console.log(`Repaired ${touched} files (~${edits} bindings).`);
