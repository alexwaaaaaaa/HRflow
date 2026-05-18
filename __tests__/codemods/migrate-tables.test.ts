/**
 * __tests__/codemods/migrate-tables.test.ts
 *
 * Vitest specs for the migrate-tables codemod.
 *
 * Covers:
 *   - Simple table (3 columns, no sortable headers)
 *   - Table with a sortable header (button + ChevronUp icon)
 *   - Skip case 1: >20 <th> cells               (complex-table-many-columns)
 *   - Skip case 2: <td rowSpan={2}>             (complex-table-spans)
 *   - Skip case 3: <tbody> with two .map() calls (complex-table-dynamic-rows)
 *   - Idempotency: a second run is a no-op
 */

import { describe, it, expect } from "vitest";
import { Project, type SourceFile } from "ts-morph";
import migrateTables from "../../scripts/codemods/migrate-tables";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface RunResult {
  changed: boolean;
  output: string;
  sourceFile: SourceFile;
}

function makeSourceFile(code: string, fileName = "test.tsx"): SourceFile {
  const project = new Project({
    compilerOptions: { jsx: 2 /* React */, allowJs: true },
    skipAddingFilesFromTsConfig: true,
    useInMemoryFileSystem: true,
  });
  return project.createSourceFile(fileName, code);
}

function run(code: string, fileName = "test.tsx"): RunResult {
  const sourceFile = makeSourceFile(code, fileName);
  const changed = migrateTables.transform(sourceFile);
  return { changed, output: sourceFile.getFullText(), sourceFile };
}

// ---------------------------------------------------------------------------
// Simple table (happy path)
// ---------------------------------------------------------------------------

describe("migrate-tables — simple table", () => {
  it("converts a 3-column table to <DataTable>, adds the import, and removes the raw <table>", () => {
    const input = [
      "interface Row { id: string; name: string; role: string; status: string; }",
      "export function Page() {",
      '  const rows: Row[] = [{ id: "1", name: "A", role: "Eng", status: "Active" }];',
      "  return (",
      "    <div>",
      '      <h1>Employees</h1>',
      "      <table>",
      "        <thead>",
      "          <tr>",
      "            <th>Name</th>",
      "            <th>Role</th>",
      "            <th>Status</th>",
      "          </tr>",
      "        </thead>",
      "        <tbody>",
      "          {rows.map((row) => (",
      "            <tr key={row.id}>",
      "              <td>{row.name}</td>",
      "              <td>{row.role}</td>",
      "              <td>{row.status}</td>",
      "            </tr>",
      "          ))}",
      "        </tbody>",
      "      </table>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);

    // Original raw <table> must be gone
    expect(output).not.toMatch(/<table\b/);
    expect(output).not.toMatch(/<thead\b/);
    expect(output).not.toMatch(/<tbody\b/);

    // DataTable JSX present
    expect(output).toContain("<DataTable");
    expect(output).toContain("data={rows}");

    // Each column entry generated
    expect(output).toContain('key: "name"');
    expect(output).toContain('label: "Name"');
    expect(output).toContain("render: (row) => row.name");
    expect(output).toContain('key: "role"');
    expect(output).toContain("render: (row) => row.role");
    expect(output).toContain('key: "status"');
    expect(output).toContain("render: (row) => row.status");

    // No header was sortable
    expect(output).not.toContain("sortable: true");

    // aria-label sourced from the nearest <h1>
    expect(output).toContain('aria-label="Employees"');

    // rowKey arrow uses the same row variable
    expect(output).toContain("rowKey={(row) =>");

    // Import was added
    expect(output).toContain(
      'import DataTable, { type Column } from "@/components/ui/DataTable"'
    );
  });
});

// ---------------------------------------------------------------------------
// Sortable header detection
// ---------------------------------------------------------------------------

describe("migrate-tables — sortable headers", () => {
  it("marks a column sortable when its <th> contains a button + ChevronUp icon", () => {
    const input = [
      'import { ChevronUp } from "lucide-react";',
      "interface Row { id: string; name: string; salary: number; }",
      "export function Page() {",
      "  const rows: Row[] = [];",
      "  const toggleSort = () => {};",
      "  return (",
      "    <div>",
      "      <h2>Salaries</h2>",
      "      <table>",
      "        <thead>",
      "          <tr>",
      "            <th>Name</th>",
      "            <th>",
      "              <button onClick={toggleSort}>",
      "                Salary",
      "                <ChevronUp />",
      "              </button>",
      "            </th>",
      "          </tr>",
      "        </thead>",
      "        <tbody>",
      "          {rows.map((row) => (",
      "            <tr key={row.id}>",
      "              <td>{row.name}</td>",
      "              <td>{row.salary}</td>",
      "            </tr>",
      "          ))}",
      "        </tbody>",
      "      </table>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);

    // The Salary column should have sortable: true
    // (locate the column block and confirm it ends with sortable: true)
    const salaryBlockMatch = output.match(
      /\{\s*key:\s*"salary",[\s\S]*?\}/
    );
    expect(salaryBlockMatch).toBeTruthy();
    expect(salaryBlockMatch![0]).toContain("sortable: true");

    // The Name column must NOT have sortable: true
    const nameBlockMatch = output.match(/\{\s*key:\s*"name",[\s\S]*?\}/);
    expect(nameBlockMatch).toBeTruthy();
    expect(nameBlockMatch![0]).not.toContain("sortable: true");

    // aria-label from the nearest <h2>
    expect(output).toContain('aria-label="Salaries"');
  });
});

// ---------------------------------------------------------------------------
// Skip case 1: too many columns
// ---------------------------------------------------------------------------

describe("migrate-tables — skip: many columns", () => {
  it("prepends complex-table-many-columns when >20 <th> cells are present", () => {
    const headers = Array.from({ length: 21 }, (_, i) => `<th>Col${i}</th>`).join(
      "\n            "
    );
    const cells = Array.from(
      { length: 21 },
      (_, i) => `<td>{row.c${i}}</td>`
    ).join("\n              ");

    const input = [
      "export function Page() {",
      "  const rows: any[] = [];",
      "  return (",
      "    <table>",
      "      <thead>",
      "        <tr>",
      `            ${headers}`,
      "        </tr>",
      "      </thead>",
      "      <tbody>",
      "        {rows.map((row) => (",
      "          <tr>",
      `              ${cells}`,
      "          </tr>",
      "        ))}",
      "      </tbody>",
      "    </table>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: complex-table-many-columns");
    // Original <table> is preserved
    expect(output).toMatch(/<table\b/);
    // No DataTable was emitted
    expect(output).not.toContain("<DataTable");
    expect(output).not.toContain(
      'import DataTable, { type Column } from "@/components/ui/DataTable"'
    );
  });
});

// ---------------------------------------------------------------------------
// Skip case 2: rowspan / colspan
// ---------------------------------------------------------------------------

describe("migrate-tables — skip: spans", () => {
  it("prepends complex-table-spans when a <td> uses rowSpan", () => {
    const input = [
      "export function Page() {",
      "  const rows: any[] = [];",
      "  return (",
      "    <table>",
      "      <thead>",
      "        <tr>",
      "          <th>Name</th>",
      "          <th>Role</th>",
      "        </tr>",
      "      </thead>",
      "      <tbody>",
      "        {rows.map((row) => (",
      "          <tr>",
      "            <td rowSpan={2}>{row.name}</td>",
      "            <td>{row.role}</td>",
      "          </tr>",
      "        ))}",
      "      </tbody>",
      "    </table>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: complex-table-spans");
    expect(output).toMatch(/<table\b/);
    expect(output).not.toContain("<DataTable");
  });
});

// ---------------------------------------------------------------------------
// Skip case 3: multiple .map() calls
// ---------------------------------------------------------------------------

describe("migrate-tables — skip: dynamic rows", () => {
  it("prepends complex-table-dynamic-rows when <tbody> contains two .map() calls", () => {
    const input = [
      "export function Page() {",
      "  const groupA: any[] = [];",
      "  const groupB: any[] = [];",
      "  return (",
      "    <table>",
      "      <thead>",
      "        <tr>",
      "          <th>Name</th>",
      "          <th>Group</th>",
      "        </tr>",
      "      </thead>",
      "      <tbody>",
      "        {groupA.map((row) => (",
      "          <tr key={row.id}><td>{row.name}</td><td>A</td></tr>",
      "        ))}",
      "        {groupB.map((row) => (",
      "          <tr key={row.id}><td>{row.name}</td><td>B</td></tr>",
      "        ))}",
      "      </tbody>",
      "    </table>",
      "  );",
      "}",
    ].join("\n");

    const { changed, output } = run(input);

    expect(changed).toBe(true);
    expect(output).toContain("// codemod-skip: complex-table-dynamic-rows");
    expect(output).toMatch(/<table\b/);
    expect(output).not.toContain("<DataTable");
  });
});

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

describe("migrate-tables — idempotency", () => {
  it("returns false on the second run after a successful migration", () => {
    const input = [
      "interface Row { id: string; name: string; role: string; }",
      "export function Page() {",
      '  const rows: Row[] = [{ id: "1", name: "A", role: "Eng" }];',
      "  return (",
      "    <div>",
      "      <h1>Team</h1>",
      "      <table>",
      "        <thead>",
      "          <tr>",
      "            <th>Name</th>",
      "            <th>Role</th>",
      "          </tr>",
      "        </thead>",
      "        <tbody>",
      "          {rows.map((row) => (",
      "            <tr key={row.id}>",
      "              <td>{row.name}</td>",
      "              <td>{row.role}</td>",
      "            </tr>",
      "          ))}",
      "        </tbody>",
      "      </table>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateTables.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateTables.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);
  });

  it("returns false on the second run for skip cases (no further comments added)", () => {
    const input = [
      "export function Page() {",
      "  const rows: any[] = [];",
      "  return (",
      "    <table>",
      "      <thead>",
      "        <tr><th>Name</th><th>Role</th></tr>",
      "      </thead>",
      "      <tbody>",
      "        {rows.map((row) => (",
      "          <tr>",
      "            <td rowSpan={2}>{row.name}</td>",
      "            <td>{row.role}</td>",
      "          </tr>",
      "        ))}",
      "      </tbody>",
      "    </table>",
      "  );",
      "}",
    ].join("\n");

    const sourceFile = makeSourceFile(input);
    const firstChanged = migrateTables.transform(sourceFile);
    expect(firstChanged).toBe(true);
    const afterFirst = sourceFile.getFullText();

    const secondChanged = migrateTables.transform(sourceFile);
    expect(secondChanged).toBe(false);
    expect(sourceFile.getFullText()).toBe(afterFirst);
  });
});
