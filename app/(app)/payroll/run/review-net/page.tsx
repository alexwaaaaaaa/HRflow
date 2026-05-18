"use client";

import { ChevronRight, AlertTriangle, IndianRupee, PieChart, ShieldAlert } from "lucide-react";
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

interface NetRow {
    id: string;
    name: string;
    paymentMode: string;
    bank: string;
    gross: number;
    ded: number;
    net: number;
    status: "Ready" | "Hold" | "Manual";
}

const NET_DATA: NetRow[] = [
    { id: "EMP-042", name: "Ravi Shankar", paymentMode: "Bank Transfer", bank: "HDFC ••• 4201", gross: 128000, ded: 16525, net: 111475, status: "Ready" },
    { id: "EMP-045", name: "Sneha Patil", paymentMode: "Bank Transfer", bank: "ICICI ••• 8820", gross: 110500, ded: 25225, net: 85275, status: "Ready" },
    { id: "EMP-821", name: "Anil Desai", paymentMode: "Pending Bank", bank: "Verification pending", gross: 48500, ded: 2025, net: 46475, status: "Hold" },
    { id: "EMP-112", name: "Rajesh Kumar", paymentMode: "Bank Transfer", bank: "SBI ••• 9912", gross: 172500, ded: 30525, net: 141975, status: "Ready" },
    { id: "EMP-155", name: "Kiran Sharma", paymentMode: "Cheque", bank: "Offline Mode", gross: 55000, ded: 6000, net: 49000, status: "Manual" },
];

const STATUS_VARIANT = {
    Ready: "success",
    Hold: "danger",
    Manual: "warning",
} as const;

const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

// ─── Module-scope subcomponents ───────────────────────────────────────────────

function EmployeeCell({ row }: { row: NetRow }) {
    return (
        <div>
            <p className="text-sm font-medium text-white">{row.name}</p>
            <p className="text-xs text-[#8899AA]">{row.id}</p>
        </div>
    );
}

function PaymentModeCell({ row }: { row: NetRow }) {
    return (
        <div className="flex items-center gap-1.5">
            {row.paymentMode === "Bank Transfer" ? (
                <IndianRupee size={13} className="text-[#00E5A0]" aria-hidden="true" />
            ) : (
                <AlertTriangle size={13} className={row.status === "Hold" ? "text-red-400" : "text-[#8899AA]"} aria-hidden="true" />
            )}
            <span className={`text-sm ${row.status === "Hold" ? "text-red-400" : "text-white"}`}>
                {row.paymentMode}
            </span>
        </div>
    );
}

const COLUMNS: Column<NetRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => <EmployeeCell row={r} />,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "gross",
        label: "Gross Pay",
        render: (r) => <span className="text-sm text-[#8899AA]">{inr(r.gross)}</span>,
    },
    {
        key: "ded",
        label: "Total Deductions",
        render: (r) => <span className="text-sm text-[#8899AA]">{inr(r.ded)}</span>,
    },
    {
        key: "net",
        label: "Net Payable",
        render: (r) => <span className="text-base font-bold text-[#00E5A0]">{inr(r.net)}</span>,
        sortable: true,
        sortValue: (r) => r.net,
    },
    {
        key: "paymentMode",
        label: "Payment Mode",
        render: (r) => <PaymentModeCell row={r} />,
    },
    {
        key: "bank",
        label: "Bank Account",
        render: (r) => (
            <span className={`text-sm ${r.status === "Hold" ? "text-red-400" : "text-[#8899AA]"}`}>
                {r.bank}
            </span>
        ),
        hideOnMobile: true,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReviewNet() {
    return (
        <Page
            title="Run payroll"
            subtitle="Step 6 of 8 — review net payout"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Payroll", href: "/payroll" },
                { label: "Review Net" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<IndianRupee size={14} aria-hidden="true" />}>
                        Download Bank Format
                    </Button>
                    <Button variant="secondary" icon={<PieChart size={14} aria-hidden="true" />}>
                        Variance Report
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Wizard stepper */}
                <Card padding="md">
                    <Stepper steps={STEPS} current={5} ariaLabel="Payroll run progress" />
                </Card>

                <h2 className="text-xl font-semibold text-white">Step 6: Review Net Payout</h2>
                <p className="text-sm text-[#8899AA]">
                    Final transfer amounts and payment modes. This is the exact amount that will hit the bank account.
                </p>

                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total Net Payout</p>
                        <p className="mt-2 text-2xl font-bold text-[#00E5A0]">₹3.82 Cr</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Across 844 employees</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Bank Transfers</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹3.81 Cr</p>
                        <p className="mt-1 text-xs text-[#8899AA]">841 employees</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Cheque/Cash</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹1.1 L</p>
                        <p className="mt-1 text-xs text-[#8899AA]">3 employees</p>
                    </Card>
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5"
                    >
                        <p className="text-sm text-red-400">Payouts on Hold</p>
                        <p className="mt-2 flex items-end justify-between">
                            <div>
                                <span className="text-2xl font-bold text-red-400">16</span>
                                <p className="mt-1 text-xs text-red-400">Missing bank details</p>
                            </div>
                            <Button variant="danger" size="sm">Resolve</Button>
                        </p>
                    </Card>
                </div>

                {/* Hold Banner */}
                <Card
                    variant="bare"
                    className="rounded-2xl border border-[rgba(255,184,0,0.3)] bg-[rgba(255,184,0,0.05)] p-4"
                >
                    <div className="flex items-start gap-3">
                        <ShieldAlert size={18} className="mt-0.5 shrink-0 text-[#FFB800]" aria-hidden="true" />
                        <p className="text-sm text-white">
                            <span className="font-semibold text-[#FFB800]">Note:</span> Payouts on Hold will not be
                            included in the final bank transfer file. You can process them later via Off-cycle once
                            details are resolved.
                        </p>
                    </div>
                </Card>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter employees">
                    <button role="tab" aria-selected className="rounded-lg border border-[#1A2A3A] bg-[#1A2A3A] px-4 py-2 text-xs font-semibold text-white">
                        All (844)
                    </button>
                    <button role="tab" aria-selected={false} className="rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-4 py-2 text-xs font-semibold text-red-400 hover:border-[#2A3A4A]">
                        On Hold (16)
                    </button>
                    <button role="tab" aria-selected={false} className="rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-4 py-2 text-xs font-semibold text-[#8899AA] hover:border-[#2A3A4A]">
                        Manual Mode (3)
                    </button>
                </div>

                {/* Net Table */}
                <Card padding="none">
                    <DataTable<NetRow>
                        data={NET_DATA}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employee…"
                        aria-label="Net payout review"
                        emptyTitle="No employees found"
                        emptyDescription="No employees match your search."
                    />
                </Card>

                {/* Bottom nav */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#1A2A3A] pt-6 sm:flex-row sm:justify-between">
                    <Button variant="outline" size="lg" href="/payroll/run/review-deductions">Back</Button>
                    <div className="flex gap-3">
                        <Button variant="secondary" size="lg" icon={<AlertTriangle size={16} aria-hidden="true" />} href="/payroll/anomaly-alerts">
                            View Anomaly Report
                        </Button>
                        <Button size="lg" iconRight={<ChevronRight size={16} aria-hidden="true" />} href="/payroll/run/approve">
                            Proceed to Approval
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}
