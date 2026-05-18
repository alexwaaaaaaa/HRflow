"use client";

import { Download, TrendingUp, TrendingDown, HelpCircle, AlertTriangle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface VarianceRow {
    component: string;
    oct: number;
    nov: number;
    diff: number;
    perc: number;
    reason: string;
}

const VARIANCES: VarianceRow[] = [
    { component: "Basic Salary", oct: 12500000, nov: 12750000, diff: 250000, perc: 2.0, reason: "3 New Joiners, 1 Increment" },
    { component: "HRA", oct: 5000000, nov: 5100000, diff: 100000, perc: 2.0, reason: "Proportionate to Basic change" },
    { component: "Variable Pay", oct: 0, nov: 2415500, diff: 2415500, perc: 100, reason: "Q3 Payout Cycle" },
    { component: "Overtime (OT)", oct: 125000, nov: 45000, diff: -80000, perc: -64.0, reason: "Lower shift extensions" },
    { component: "LOP Deduction", oct: 45000, nov: 85000, diff: 40000, perc: 88.8, reason: "High unpaid leaves" },
];

function DiffCell({ row }: { row: VarianceRow }) {
    const isDeduction = row.component.includes("Deduction");
    const positive = row.diff > 0;
    const isGood = isDeduction ? !positive : positive;
    return (
        <div className="text-right">
            <div className={`flex items-center justify-end gap-1.5 text-sm font-semibold ${isGood ? "text-[#00E5A0]" : "text-red-400"}`}>
                {positive ? "+" : ""}{row.diff.toLocaleString()}
                {positive ? <TrendingUp size={14} aria-hidden="true" /> : <TrendingDown size={14} aria-hidden="true" />}
            </div>
            <div className="text-xs text-[#8899AA]">{row.perc > 0 ? "+" : ""}{row.perc}%</div>
        </div>
    );
}

const COLUMNS: Column<VarianceRow>[] = [
    {
        key: "component",
        label: "Salary Component",
        render: (v) => <span className="text-sm font-medium text-white">{v.component}</span>,
        sortable: true,
        sortValue: (v) => v.component,
    },
    {
        key: "oct",
        label: "Oct 2024 (₹)",
        align: "right",
        render: (v) => <span className="text-sm text-[#8899AA]">{v.oct.toLocaleString()}</span>,
    },
    {
        key: "nov",
        label: "Nov 2024 (₹)",
        align: "right",
        render: (v) => <span className="text-sm text-white">{v.nov.toLocaleString()}</span>,
    },
    {
        key: "diff",
        label: "Difference",
        align: "right",
        render: (v) => <DiffCell row={v} />,
        sortable: true,
        sortValue: (v) => v.diff,
    },
    {
        key: "reason",
        label: "Primary Driver / Reason",
        render: (v) => <span className="text-sm text-[#8899AA]">{v.reason}</span>,
        hideOnMobile: true,
    },
];

export default function MonthVarianceReport() {
    return (
        <Page
            title="Month-on-Month Variance Report"
            subtitle="Compare current payroll run (Nov 2024) against previous month (Oct 2024)."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Reports" },
                { label: "Variance" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Download size={14} aria-hidden="true" />}>
                    Export Detailed CSV
                </Button>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Previous Net (Oct 2024)</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹3,75,00,000</p>
                        <p className="mt-1 text-xs text-[#8899AA]">840 Employees Paid</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Current Net (Nov 2024)</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹3,98,54,500</p>
                        <p className="mt-1 text-xs text-[#8899AA]">842 Employees Eligible</p>
                    </Card>
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.05)] p-5"
                    >
                        <p className="text-sm text-[#8899AA]">Net Payroll Variance</p>
                        <p className="mt-2 flex items-center gap-3 text-2xl font-bold text-[#00E5A0]">
                            + ₹23,54,500 <TrendingUp size={24} aria-hidden="true" />
                        </p>
                        <p className="mt-1 text-xs text-[#00E5A0]">+6.27% increase overall</p>
                    </Card>
                </div>

                {/* Variance Table */}
                <Card padding="none" aria-labelledby="variance-table-heading">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A2A3A] px-6 py-4">
                        <h2 id="variance-table-heading" className="text-base font-semibold text-white">
                            Component-wise Variance
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-[#8899AA]">
                            <HelpCircle size={14} aria-hidden="true" /> AI identified primary drivers for variance limit breaches.
                        </div>
                    </div>
                    <DataTable<VarianceRow>
                        data={VARIANCES}
                        columns={COLUMNS}
                        rowKey={(v) => v.component}
                        aria-label="Month-on-month payroll variance"
                        emptyTitle="No variance data"
                        emptyDescription="No component variance data available."
                    />
                    <div className="flex items-center gap-3 border-t border-[#1A2A3A] bg-[rgba(255,184,0,0.05)] px-6 py-4">
                        <AlertTriangle size={16} className="shrink-0 text-[#FFB800]" aria-hidden="true" />
                        <span className="text-sm text-white">
                            Variance in <strong className="text-[#FFB800]">Variable Pay</strong> and{" "}
                            <strong className="text-[#FFB800]">Overtime</strong> exceeds the standard 10% threshold.
                            Requires managerial acknowledgment.
                        </span>
                    </div>
                </Card>

                <div className="flex justify-end">
                    <Button variant="outline">Acknowledge Variances</Button>
                </div>
            </div>
        </Page>
    );
}
