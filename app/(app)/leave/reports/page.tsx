"use client";

import { Calendar, Download, FileText, Filter, PieChart } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface ReportRow {
    id: string;
    type: string;
    allocated: string;
    consumed: string;
    utilization: string;
}

const REPORT_DATA: ReportRow[] = [
    { id: "EL", type: "Privilege Leave (EL)", allocated: "1200 Days", consumed: "340 Days", utilization: "28%" },
    { id: "SL", type: "Sick Leave (SL)", allocated: "600 Days", consumed: "415 Days", utilization: "69%" },
];

const REPORT_TYPES = [
    { icon: PieChart, label: "Consumption Summary", active: true },
    { icon: FileText, label: "Detailed Ledgers", active: false },
    { icon: Filter, label: "LWP & Deductions", active: false },
    { icon: Calendar, label: "Encashment History", active: false },
] as const;

const COLUMNS: Column<ReportRow>[] = [
    {
        key: "type",
        label: "Leave Type",
        render: (r) => <span className="font-bold text-white">{r.type}</span>,
    },
    {
        key: "allocated",
        label: "Total Allocated",
        align: "right",
        render: (r) => <span className="text-white">{r.allocated}</span>,
    },
    {
        key: "consumed",
        label: "Consumed (Q4)",
        align: "right",
        render: (r) => <span className="font-black text-[#FFB800]">{r.consumed}</span>,
    },
    {
        key: "utilization",
        label: "Utilization %",
        align: "right",
        render: (r) => <span className="text-[#8899AA]">{r.utilization}</span>,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveReportsPage() {
    return (
        <Page
            title="Leave Reports & Analytics"
            subtitle="Generate and export detailed data on leave consumption, trends, and balances"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Reports" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid gap-6 lg:grid-cols-4">
                {/* Report type nav */}
                <nav aria-label="Report types" className="space-y-1 lg:col-span-1">
                    {REPORT_TYPES.map((rt) => (
                        <button
                            key={rt.label}
                            type="button"
                            className={`flex w-full items-center gap-3 rounded px-4 py-3 text-left text-sm font-bold transition-colors ${
                                rt.active
                                    ? "border-l-2 border-[#0066FF] bg-[#0066FF]/10 text-white shadow-[inset_0_0_10px_rgba(0,102,255,0.1)]"
                                    : "text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white"
                            }`}
                            aria-current={rt.active ? "page" : undefined}
                        >
                            <rt.icon size={16} className={rt.active ? "text-[#0066FF]" : ""} aria-hidden="true" />
                            {rt.label}
                        </button>
                    ))}
                </nav>

                {/* Report content */}
                <div className="space-y-6 lg:col-span-3">
                    {/* Config panel */}
                    <Card padding="md">
                        <div className="flex flex-wrap items-end gap-4">
                            <div className="min-w-[200px] flex-1">
                                <label htmlFor="date-range" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                    Date Range
                                </label>
                                <select
                                    id="date-range"
                                    className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-2.5 text-sm text-white outline-none focus:border-[#0066FF]"
                                >
                                    <option>This Quarter (Oct - Dec 2024)</option>
                                    <option>Last Quarter</option>
                                    <option>Year to Date (YTD)</option>
                                    <option>Custom Range…</option>
                                </select>
                            </div>
                            <div className="min-w-[200px] flex-1">
                                <label htmlFor="dept-filter" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                    Department
                                </label>
                                <select
                                    id="dept-filter"
                                    className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-2.5 text-sm text-white outline-none focus:border-[#0066FF]"
                                >
                                    <option>All Departments</option>
                                    <option>Engineering</option>
                                    <option>Sales</option>
                                </select>
                            </div>
                            <Button icon={<Download size={14} aria-hidden="true" />}>
                                Export CSV
                            </Button>
                        </div>
                    </Card>

                    {/* Preview */}
                    <Card padding="none">
                        <CardHeader className="border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                            <CardTitle>Leave Consumption Summary</CardTitle>
                            <span className="text-xs text-[#8899AA]">Showing data for Q4 2024</span>
                        </CardHeader>
                        <div className="p-6">
                            {/* Chart placeholder */}
                            <div
                                className="mb-6 flex h-64 flex-col items-center justify-center rounded border-2 border-dashed border-[#1A2A3A] text-[#556677]"
                                role="img"
                                aria-label="Leave consumption chart placeholder"
                            >
                                <PieChart size={48} className="mb-4 opacity-50" aria-hidden="true" />
                                <p className="font-bold">Chart visualization renders here</p>
                                <p className="mt-2 w-1/2 text-center text-xs text-[#8899AA]">
                                    Includes breakdowns of SL, CL, and EL usage across selected departments vs total quotas.
                                </p>
                            </div>

                            {/* Summary table */}
                            <DataTable<ReportRow>
                                data={REPORT_DATA}
                                columns={COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="Leave consumption summary"
                                emptyTitle="No data"
                                emptyDescription="Select a date range to view report data."
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
