import { readFileSync } from "fs";
const path = process.argv[2];
let c = readFileSync(path, "utf-8");

// Simulate import insertion
const imports = 'import Page from "@/components/ui/Page";';
if (c.includes('"use client"')) {
  c = c.replace('"use client";', `"use client";\n\n${imports}`);
}

const exportMatch = c.match(/export\s+default\s+function\s+\w+\s*(?:<[^>]+>\s*)?\([^)]*\)\s*\{/);
if (!exportMatch) {
  console.log("No export match");
  process.exit(0);
}
console.log("exportMatch length:", exportMatch[0].length);
console.log("matched:", JSON.stringify(exportMatch[0]));
const start = c.indexOf(exportMatch[0]) + exportMatch[0].length;

let depth = 1, lastReturn = -1, i = start;

while (i < c.length && depth > 0) {
  const ch = c[i];
  if (ch === '"' || ch === "'" || ch === "`") {
    const q = ch;
    i++;
    while (i < c.length) {
      if (c[i] === "\\") { i += 2; continue; }
      if (c[i] === q) break;
      if (q === "`" && c[i] === "$" && c[i+1] === "{") {
        i += 2;
        let td = 1;
        while (i < c.length && td > 0) {
          if (c[i] === "{") td++; else if (c[i] === "}") td--;
          i++;
        }
        continue;
      }
      i++;
    }
    i++;
    continue;
  }
  if (ch === "/" && c[i+1] === "/") {
    while (i < c.length && c[i] !== "\n") i++;
    continue;
  }
  if (ch === "/" && c[i+1] === "*") {
    i += 2;
    while (i < c.length && !(c[i] === "*" && c[i+1] === "/")) i++;
    i += 2;
    continue;
  }
  if (ch === "{") depth++;
  else if (ch === "}") {
    depth--;
    if (depth === 0) {
      console.log("depth 0 at i:", i);
      let j = i - 1;
      while (j >= 0 && /\s/.test(c[j])) j--;
      console.log("char before whitespace:", JSON.stringify(c[j]));
      if (c[j] === ";") {
        j--;
        while (j >= 0 && /\s/.test(c[j])) j--;
        console.log("after skip semicolon:", JSON.stringify(c[j]));
      }
      console.log("expected ): ", c[j] === ")");
      break;
    }
  }
  if (depth === 1 && ch === "r" && /^return\s*\(/.test(c.substring(i, i+20))) {
    lastReturn = i;
  }
  i++;
}
console.log("final depth:", depth, "i:", i, "fileLen:", c.length);
console.log("lastReturn:", lastReturn);
