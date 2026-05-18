"use client";

import Link from "next/link";
import { ChevronRight, AlertTriangle, TrendingUp, Download, Eye, History } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import Stepper, { type StepItem } from "@/components/ui/Stepper";

// ─── Static config ────────────────────────────────────────────────────────────

const STEPS: readonly StepItem[] = [
    { id: "select-month", label: "Select Month" },
    { id: "attendance-lock", label: "Attendance Lock" },
    { id: "employee-summary", label: "Employee Summary" },
    { id: "review-gross", label: "Review Gross" },
    { id: "review-deductions", label: "Review Deductions" },
    { id: "review-net", label: "Review Net" },
    { id: "approve", label: "Approve" },
    { id: "disburse", label: "Disburse" },
] as const;

interface GrossRow {
    id: string;
    name: string;
    dept: string;
    basic: number;
    hra: number;
    lta: number;
    spl: number;
    ot: number;
    bonus: number;
    gross: number;
    status: "Normal" | "Spike" | "Pro-rata" | "Arrears";
    trend: number;
}

const GROSS_DATA: GrossRow[] = [
    { id: "EMP-042", name: "Ravi Shankar", dept: "Engineering", basic: 65000, hra: 32500, lta: 8333, spl: 22167, ot: 0, bonus: 0, gross: 128000, status: "Normal", trend: 0 },
    { id: "EMP-045", name: "Sneha Patil", dept: "Sales", basic: 45000, hra: 22500, lta: 0, spl: 18000, ot: 0, bonus: 25000, gross: 110500, status: "Spike", trend: 29 },
    { id: "EMP-821", name: "Anil Desai", dept: "Operations", basic: 24000, hra: 12000, lta: 0, spl: 8000, ot: 4500, bonus: 0, gross: 48500, status: "Pro-rata", trend: -36 },
    { id: "EMP-112", name: "Rajesh Kumar", dept: "Engineering", basic: 85000, hra: 42500, lta: 10000, spl: 35000, ot: 0, bonus: 0, gross: 172500, status: "Normal", trend: 0 },
    { id: "EMP-134", name: "Priya Nair", dept: "HR", basic: 55000, hra: 27500, lta: 5000, spl: 15000, ot: 0, bonus: 0, gross: 102500, status: "Arrears", trend: 15 },
];

const STATUS_VARIANT = {
    Normal: "neutral",
    Spike: "warning",
    "Pro-rata": "danger",
    Arrears: "info",
} as const;

const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

// ─── Module-scope subcomponents ───────────────────────────────────────────────

function EmployeeCell({ row }: { row: GrossRow }) {
    return (
        <div>
            <p className="text-sm font-medium text-white">{row.name}</p>
            <p className="text-xs text-[#8899AA]">{row.id}</p>
        </div>
    );
}

function OtBonusCell({ row }: { row: GrossRow }) {
    const total = row.ot + row.bonus;
    return total > 0 ? (
        <span className="text-sm text-[#00E5A0]">+{inr(total)}</span>
    ) : (
        <span className="text-sm text-[#8899AA]">-</span>
    );
}

function StatusCell({ row }: { row: GrossRow }) {
    if (row.status === "Normal") return <span className="text-xs text-[#8899AA]">Normal</span>;
    return <Badge variant={STATUS_VARIANT[row.status]}>{row.status}</Badge>;
}

function ActionsCell() {
    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" size="sm" aria-label="View calculation" icon={<Eye size={13} aria-hidden="true" />} />
            <Button variant="secondary" size="sm" aria-label="Compare with last month" icon={<History size={13} aria-hidden="true" />} />
        </div>
    );
}

const COLUMNS: Column<GrossRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => <EmployeeCell row={r} />,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "basic",
        label: "Basic",
        render: (r) => <span className="text-sm text-[#8899AA]">{inr(r.basic)}</span>,
    },
    {
        key: "hra",
        label: "HRA",
        render: (r) => <span className="text-sm text-[#8899AA]">{inr(r.hra)}</span>,
        hideOnMobile: true,
    },
    {
        key: "spl",
        label: "Spl Allowance",
        render: (r) => <span className="text-sm text-[#8899AA]">{inr(r.spl)}</span>,
        hideOnMobile: true,
    },
    {
        key: "otBonus",
        label: "OT + Bonus",
        render: (r) => <OtBonusCell row={r} />,
    },
    {
        key: "gross",
        label: "Total Gross",
        render: (r) => <span className="text-sm font-bold text-white">{inr(r.gross)}</span>,
        sortable: true,
        sortValue: (r) => r.gross,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <StatusCell row={r} />,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: () => <ActionsCell />,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReviewGross() {
    return (
        <Page
            title="Run payroll"
            subtitle="Step 4 of 8 — review gross salaries"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Payroll", href: "/payroll" },
                { label: "Review Gross" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                    Export Register
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Wizard stepper */}
                <Card padding="md">
                    <Stepper steps={STEPS} current={3} ariaLabel="Payroll run progress" />
                </Card>

                <h2 className="text-xl font-semibold text-white">Step 4: Review Gross Salaries</h2>
                <p className="text-sm text-[#8899AA]">
                    Verify total earnings before deductions (Basic, HRA, Allowances, OT, Bonus, Arrears).
                </p>

                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total Gross Earnings</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹4.24 Cr</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#00E5A0]">
                            <TrendingUp size={12} aria-hidden="true" /> +₹12L vs Oct
                        </p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Fixed Components</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹3.98 Cr</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Basic, HRA, Allowances</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Variable & OT</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹18.5 L</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Sales Incentive + OT</p>
                    </Card>
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-[rgba(255,184,0,0.3)] bg-[rgba(255,184,0,0.05)] p-5"
                    >
                        <p className="text-sm text-[#FFB800]">Spikes / Anomalies</p>
                        <p className="mt-2 text-2xl font-bold text-[#FFB800]">18</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#FFB800]">
                            <AlertTriangle size={12} aria-hidden="true" /> &gt; 15% variance vs Oct
                        </p>
                    </Card>
                </div>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter employees">
                    <button role="tab" aria-selected className="rounded-lg border border-[#1A2A3A] bg-[#1A2A3A] px-4 py-2 text-xs font-semibold text-white">
                        All (844)
                    </button>
                    <button role="tab" aria-selected={false} className="rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-4 py-2 text-xs font-semibold text-[#FFB800] hover:border-[#2A3A4A]">
                        Anomalies (18)
                    </button>
                    <button role="tab" aria-selected={false} className="rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-4 py-2 text-xs font-semibold text-[#8899AA] hover:border-[#2A3A4A]">
                        With Arrears (24)
                    </button>
                    <button role="tab" aria-selected={false} className="rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-4 py-2 text-xs font-semibold text-[#8899AA] hover:border-[#2A3A4A]">
                        Pro-rata (56)
                    </button>
                </div>

                {/* Gross Table */}
                <Card padding="none">
                    <DataTable<GrossRow>
                        data={GROSS_DATA}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employee…"
                        aria-label="Gross salary review"
                        emptyTitle="No employees found"
                        emptyDescription="No employees match your search."
                    />
                </Card>

                {/* Bottom nav */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#1A2A3A] pt-6 sm:flex-row sm:justify-between">
                    <Button variant="outline" size="lg" href="/payroll/run/employee-summary">Back</Button>
                    <Link href="/payroll/run/review-deductions">
                        <Button size="lg" iconRight={<ChevronRight size={16} aria-hidden="true" />}>
                            Next: Review Deductions
                        </Button>
                    </Link>
                </div>
            </div>
        </Page>
    );
}
