"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, FileText, FileUp, XCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type ImportStatus = "Completed" | "Failed";

interface ImportRecord {
    id: string;
    file: string;
    entity: string;
    records: number;
    status: ImportStatus;
    errors: number;
    date: string;
}

const RECENT_IMPORTS: ImportRecord[] = [
    { id: "IMP-042", file: "employees_batch_q4.csv", entity: "Employees", records: 54, status: "Completed", errors: 0, date: "2 days ago" },
    { id: "IMP-041", file: "leave_balances_2024.xlsx", entity: "Leave Balances", records: 256, status: "Completed", errors: 3, date: "1 week ago" },
    { id: "IMP-040", file: "salary_revisions.csv", entity: "Payroll", records: 120, status: "Failed", errors: 120, date: "2 weeks ago" },
];

const ENTITY_TYPES = ["Employees", "Leave Balances", "Payroll", "Attendance"];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function FileCell({ record }: { record: ImportRecord }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <FileText size={14} className="text-[#8899AA]" aria-hidden="true" />
            <span className="text-white font-medium">{record.file}</span>
        </div>
    );
}

function StatusCell({ record }: { record: ImportRecord }) {
    if (record.status === "Failed") {
        return (
            <Badge variant="danger">
                <XCircle size={12} aria-hidden="true" /> Failed ({record.errors} errors)
            </Badge>
        );
    }
    if (record.errors > 0) {
        return (
            <Badge variant="warning">
                <AlertTriangle size={12} aria-hidden="true" /> Completed ({record.errors} errors)
            </Badge>
        );
    }
    return (
        <Badge variant="success">
            <CheckCircle2 size={12} aria-hidden="true" /> Completed
        </Badge>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<ImportRecord>[] = [
    {
        key: "file",
        label: "File",
        render: (r) => <FileCell record={r} />,
    },
    {
        key: "entity",
        label: "Entity",
        render: (r) => <span className="text-sm text-[#8899AA]">{r.entity}</span>,
        sortable: true,
        sortValue: (r) => r.entity,
    },
    {
        key: "records",
        label: "Records",
        render: (r) => <span className="text-sm text-white">{r.records}</span>,
        sortable: true,
        sortValue: (r) => r.records,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <StatusCell record={r} />,
    },
    {
        key: "date",
        label: "When",
        render: (r) => <span className="text-sm text-[#8899AA]">{r.date}</span>,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function DataImportPage() {
    const [dragActive, setDragActive] = useState(false);

    return (
        <Page
            title="Data Import"
            subtitle="Bulk import employee records, leave balances, and payroll data from CSV or XLSX files."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Data" },
                { label: "Import" },
            ]}
            maxWidth="1000px"
        >
            <div className="space-y-8">
                {/* Upload Zone */}
                <div
                    role="region"
                    aria-label="File upload area"
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${
                        dragActive
                            ? "border-indigo-500 bg-indigo-500/5"
                            : "border-[#2A3A4A] hover:border-[#445566] bg-[#0D1928]"
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={() => setDragActive(false)}
                >
                    <FileUp size={48} className="text-[#2A3A4A] mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-white font-semibold text-lg mb-2">
                        Drop your file here, or{" "}
                        <label htmlFor="file-upload" className="text-indigo-400 underline cursor-pointer">browse</label>
                    </h3>
                    <input id="file-upload" type="file" accept=".csv,.xlsx,.xls" className="sr-only" aria-label="Upload import file" />
                    <p className="text-xs text-[#8899AA] max-w-sm mx-auto">
                        Supports .csv, .xlsx, .xls. Maximum 10,000 rows per import. Headers must match the selected entity template.
                    </p>
                    <div className="flex justify-center flex-wrap gap-3 mt-6">
                        {ENTITY_TYPES.map((e) => (
                            <span key={e} className="bg-[#1A2A3A] text-[#8899AA] border border-[#2A3A4A] px-3 py-1 rounded-lg text-xs cursor-pointer hover:text-white hover:border-indigo-500/30 transition-colors">
                                {e}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Recent Imports */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Imports</h3>
                    <Card padding="none">
                        <DataTable<ImportRecord>
                            data={RECENT_IMPORTS}
                            columns={COLUMNS}
                            rowKey={(r) => r.id}
                            aria-label="Recent imports"
                            emptyTitle="No imports yet"
                            emptyDescription="Upload a file to get started."
                        />
                    </Card>
                </div>
            </div>
        </Page>
    );
}
