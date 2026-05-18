"use client";

import { Download, Filter, Info, CornerDownRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface LopRow {
    emp: string;
    id: string;
    totalDays: number;
    lopDays: number;
    basicDed: number;
    hraDed: number;
    totalDed: number;
    reason: string;
}

const LOP_DATA: LopRow[] = [
    { emp: "Rahul Sharma", id: "EMP-001", totalDays: 30, lopDays: 2.5, basicDed: 4166.67, hraDed: 2083.33, totalDed: 7500.00, reason: "Unapproved Sick Leave + Half Day Shortfall" },
    { emp: "Sneha Patil", id: "EMP-045", totalDays: 30, lopDays: 1.0, basicDed: 2000.00, hraDed: 1000.00, totalDed: 3500.00, reason: "Absent without notice (12 Nov)" },
    { emp: "Vikram Reddy", id: "EMP-204", totalDays: 30, lopDays: 4.0, basicDed: 6000.00, hraDed: 3000.00, totalDed: 11000.00, reason: "Leave balance exhausted" },
];

const COLUMNS: Column<LopRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => (
            <div>
                <p className="text-sm font-semibold text-white">{r.emp}</p>
                <p className="text-xs text-[#8899AA]">{r.id}</p>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.emp,
    },
    {
        key: "lopDays",
        label: "LOP Days",
        align: "center",
        render: (r) => (
            <Badge variant="warning">{r.lopDays} Days</Badge>
        ),
        sortable: true,
        sortValue: (r) => r.lopDays,
    },
    {
        key: "basicDed",
        label: "Basic Ded.",
        align: "right",
        render: (r) => <span className="text-sm text-red-400">-₹{r.basicDed.toFixed(2)}</span>,
    },
    {
        key: "hraDed",
        label: "HRA / Other Ded.",
        align: "right",
        render: (r) => <span className="text-sm text-red-400">-₹{r.hraDed.toFixed(2)}</span>,
        hideOnMobile: true,
    },
    {
        key: "totalDed",
        label: "Total Impact",
        align: "right",
        render: (r) => <span className="text-sm font-bold text-white">₹{r.totalDed.toFixed(2)}</span>,
        sortable: true,
        sortValue: (r) => r.totalDed,
    },
    {
        key: "reason",
        label: "Reason",
        render: (r) => <span className="text-sm text-[#8899AA]">{r.reason}</span>,
        hideOnMobile: true,
    },
];



export default function LopCalculationDetail() {
    return (
        <Page
            title="Loss of Pay (LOP) Detail Report"
            subtitle="Component-wise breakdown of deductions for Nov 2024."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Reports" },
                { label: "LOP" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>
                        Filters
                    </Button>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Export CSV
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Affected Employees</p>
                        <p className="mt-2 text-2xl font-bold text-[#FFB800]">42</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total LOP Days</p>
                        <p className="mt-2 text-2xl font-bold text-white">68.5</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total Value Deducted</p>
                        <p className="mt-2 text-2xl font-bold text-red-400">₹1,45,200</p>
                    </Card>
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-dashed border-[rgba(0,102,255,0.3)] bg-[rgba(0,102,255,0.05)] p-5"
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <Info size={14} className="text-[#0066FF]" aria-hidden="true" />
                            <p className="text-sm font-semibold text-white">Calculation Logic</p>
                        </div>
                        <p className="text-xs leading-relaxed text-[#8899AA]">
                            Deduction is performed component-wise proportionally (Basic, HRA) over 30 base days.
                        </p>
                    </Card>
                </div>

                {/* LOP Table */}
                <Card padding="none">
                    <DataTable<LopRow>
                        data={LOP_DATA}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employee…"
                        aria-label="Loss of pay detail report"
                        emptyTitle="No LOP records"
                        emptyDescription="No loss of pay deductions for this cycle."
                    />
                    <div className="flex items-start gap-3 border-t border-[#1A2A3A] bg-[rgba(0,102,255,0.05)] px-6 py-4">
                        <CornerDownRight size={16} className="mt-0.5 shrink-0 text-[#0066FF]" aria-hidden="true" />
                        <span className="text-sm leading-relaxed text-white">
                            Taxes (Income Tax) and statutory components (PF, PT) have been automatically recalculated
                            based on the reduced Gross Salary.
                        </span>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
