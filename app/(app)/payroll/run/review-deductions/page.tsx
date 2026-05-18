"use client";

import Link from "next/link";
import { ChevronRight, AlertTriangle, Download, Settings, Edit2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
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

interface DeductionRow {
    id: string;
    name: string;
    gross: number;
    epf: number;
    eps: number;
    pt: number;
    tds: number;
    lwf: number;
    advance: number;
    totalDed: number;
    status: "Normal" | "High TDS" | "No TDS";
}

const DEDUCTION_DATA: DeductionRow[] = [
    { id: "EMP-042", name: "Ravi Shankar", gross: 128000, epf: 1800, eps: 0, pt: 200, tds: 14500, lwf: 25, advance: 0, totalDed: 16525, status: "Normal" },
    { id: "EMP-045", name: "Sneha Patil", gross: 110500, epf: 1800, eps: 0, pt: 200, tds: 18200, lwf: 25, advance: 5000, totalDed: 25225, status: "High TDS" },
    { id: "EMP-821", name: "Anil Desai", gross: 48500, epf: 1800, eps: 0, pt: 200, tds: 0, lwf: 25, advance: 0, totalDed: 2025, status: "No TDS" },
    { id: "EMP-112", name: "Rajesh Kumar", gross: 172500, epf: 1800, eps: 0, pt: 200, tds: 28500, lwf: 25, advance: 0, totalDed: 30525, status: "Normal" },
    { id: "EMP-134", name: "Priya Nair", gross: 102500, epf: 1800, eps: 0, pt: 200, tds: 9500, lwf: 25, advance: 0, totalDed: 11525, status: "Normal" },
];

const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

// ─── Module-scope subcomponents ───────────────────────────────────────────────

function EmployeeCell({ row }: { row: DeductionRow }) {
    return (
        <div>
            <p className="text-sm font-medium text-white">{row.name}</p>
            <p className="text-xs text-[#8899AA]">{row.id}</p>
        </div>
    );
}

function TdsCell({ row }: { row: DeductionRow }) {
    if (row.tds === 0) return <span className="text-sm text-[#8899AA]">No TDS</span>;
    return (
        <div className="flex items-center gap-1.5">
            <span className={`text-sm ${row.status === "High TDS" ? "font-semibold text-[#FFB800]" : "text-[#8899AA]"}`}>
                {inr(row.tds)}
            </span>
            {row.status === "High TDS" && (
                <AlertTriangle size={13} className="text-[#FFB800]" aria-label="High TDS percentage" />
            )}
        </div>
    );
}

function RecoveriesCell({ row }: { row: DeductionRow }) {
    return row.advance > 0 ? (
        <span className="text-sm font-medium text-red-400">{inr(row.advance)}</span>
    ) : (
        <span className="text-sm text-[#8899AA]">-</span>
    );
}

function ActionsCell() {
    return (
        <Button
            variant="secondary"
            size="sm"
            aria-label="Edit deductions"
            icon={<Edit2 size={13} aria-hidden="true" />}
        />
    );
}

const COLUMNS: Column<DeductionRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => <EmployeeCell row={r} />,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "gross",
        label: "Total Gross",
        render: (r) => <span className="text-sm text-white">{inr(r.gross)}</span>,
    },
    {
        key: "epf",
        label: "EPF",
        render: (r) => <span className="text-sm text-[#8899AA]">{inr(r.epf)}</span>,
        hideOnMobile: true,
    },
    {
        key: "pt",
        label: "Prof. Tax",
        render: (r) => <span className="text-sm text-[#8899AA]">{inr(r.pt)}</span>,
        hideOnMobile: true,
    },
    {
        key: "tds",
        label: "Income Tax (TDS)",
        render: (r) => <TdsCell row={r} />,
    },
    {
        key: "advance",
        label: "Recoveries",
        render: (r) => <RecoveriesCell row={r} />,
        hideOnMobile: true,
    },
    {
        key: "totalDed",
        label: "Total Deductions",
        render: (r) => <span className="text-sm font-bold text-red-400">{inr(r.totalDed)}</span>,
        sortable: true,
        sortValue: (r) => r.totalDed,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: () => <ActionsCell />,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReviewDeductions() {
    return (
        <Page
            title="Run payroll"
            subtitle="Step 5 of 8 — review deductions"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Payroll", href: "/payroll" },
                { label: "Review Deductions" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Settings size={14} aria-hidden="true" />}>
                        Override Deductions
                    </Button>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Export Register
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Wizard stepper */}
                <Card padding="md">
                    <Stepper steps={STEPS} current={4} ariaLabel="Payroll run progress" />
                </Card>

                <h2 className="text-xl font-semibold text-white">Step 5: Review Deductions</h2>
                <p className="text-sm text-[#8899AA]">
                    Verify statutory deductions (PF, PT, TDS, LWF) and loan/advance recoveries.
                </p>

                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total Deductions</p>
                        <p className="mt-2 text-2xl font-bold text-red-400">₹42.45 L</p>
                        <p className="mt-1 text-xs text-[#8899AA]">10% of Gross</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total TDS</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹24.05 L</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Across 612 employees</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Employee PF</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹14.88 L</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Capped at ₹1800 for 812</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Prof. Tax & LWF</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹1.72 L</p>
                        <p className="mt-1 text-xs text-[#8899AA]">State-wise deduction</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Loan/Advance</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹1.80 L</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Recoveries from 18 emp</p>
                    </Card>
                </div>

                {/* Compliance Warning */}
                <Card
                    variant="bare"
                    className="rounded-2xl border border-[rgba(255,184,0,0.3)] bg-[rgba(255,184,0,0.05)] p-4"
                >
                    <div className="flex flex-wrap items-center gap-3">
                        <AlertTriangle size={18} className="shrink-0 text-[#FFB800]" aria-hidden="true" />
                        <p className="flex-1 text-sm text-white">
                            <span className="font-semibold text-[#FFB800]">TDS Anomaly Detected:</span>{" "}
                            12 employees have TDS &gt; 35% of their gross pay due to missing investment declarations.
                        </p>
                        <Button variant="outline" size="sm">View Employees</Button>
                    </div>
                </Card>

                {/* Deductions Table */}
                <Card padding="none">
                    <DataTable<DeductionRow>
                        data={DEDUCTION_DATA}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employee…"
                        aria-label="Deductions review"
                        emptyTitle="No employees found"
                        emptyDescription="No employees match your search."
                    />
                </Card>

                {/* Bottom nav */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#1A2A3A] pt-6 sm:flex-row sm:justify-between">
                    <Button variant="outline" size="lg" href="/payroll/run/review-gross">Back</Button>
                    <Link href="/payroll/run/review-net">
                        <Button size="lg" iconRight={<ChevronRight size={16} aria-hidden="true" />}>
                            Next: Review Net Pay
                        </Button>
                    </Link>
                </div>
            </div>
        </Page>
    );
}
