import { readFileSync } from "fs";
const path = process.argv[2];
let c = readFileSync(path, "utf-8");

// Simulate import insertion
const imports = 'import Page from "@/components/ui/Page";';
if (c.includes('"use client"')) {
  c = c.replace('"use client";', `"use client";\n\n${imports}`);
}

const exportMatch = c.match(/export\s+default\s+function\s+\w+\s*(?:<[^>]+>\s*)?\([^)]*\)\s*\{/);
const funcBodyStart = c.indexOf(exportMatch[0]) + exportMatch[0].length;
console.log("funcBodyStart:", funcBodyStart);

const returnRegex = /\n([ \t]*)return\s*\(/g;
returnRegex.lastIndex = funcBodyStart;
let m;
while ((m = returnRegex.exec(c)) !== null) {
  console.log("found return at:", m.index + 1, "indent:", JSON.stringify(m[1]));
}

// pick last
returnRegex.lastIndex = funcBodyStart;
let lastReturnIdx = -1;
let lastIndent = "";
while ((m = returnRegex.exec(c)) !== null) {
  lastReturnIdx = m.index + 1;
  lastIndent = m[1];
}
console.log("last return idx:", lastReturnIdx, "indent:", JSON.stringify(lastIndent));

// now find close
let pos = c.indexOf("\n", lastReturnIdx);
let count = 0;
while (pos !== -1 && count < 200) {
  const nextNl = c.indexOf("\n", pos + 1);
  const line = c.substring(pos + 1, nextNl === -1 ? c.length : nextNl);
  if (line.startsWith(lastIndent)) {
    const after = line.slice(lastIndent.length);
    if (after === ");" || after === ")" || after.startsWith(");")) {
      console.log("FOUND close at line:", JSON.stringify(line), "pos:", pos + 1 + line.indexOf(")"));
      process.exit(0);
    }
  }
  if (nextNl === -1) break;
  pos = nextNl;
  count++;
}
console.log("no close found");
