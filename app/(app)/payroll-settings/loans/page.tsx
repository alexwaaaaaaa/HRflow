"use client";

import { useState } from "react";
import {
    CreditCard, CheckCircle2, AlertCircle, IndianRupee,
    TrendingDown, Plus, Download, ChevronRight,
    FileText, Wallet, Building2, X, Loader2
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type LoanStatus = "active" | "overdue" | "closed" | "pending";

interface Loan {
    id: string;
    empName: string;
    empId: string;
    avatar: string;
    dept: string;
    type: string;
    principal: number;
    outstanding: number;
    emi: number;
    tenure: number;
    remaining: number;
    status: LoanStatus;
    nextDue: string;
}

const LOANS: Loan[] = [
    { id: "LN-001", empName: "Rahul Sharma", empId: "EMP001", avatar: "RS", dept: "Engineering", type: "Personal Loan", principal: 200000, outstanding: 120000, emi: 8500, tenure: 24, remaining: 14, status: "active", nextDue: "01 Apr 2025" },
    { id: "LN-002", empName: "Priya Singh", empId: "EMP002", avatar: "PS", dept: "Product", type: "Medical Advance", principal: 50000, outstanding: 50000, emi: 5000, tenure: 10, remaining: 10, status: "pending", nextDue: "01 Apr 2025" },
    { id: "LN-003", empName: "Karan Mehta", empId: "EMP003", avatar: "KM", dept: "Sales", type: "Festival Advance", principal: 30000, outstanding: 10000, emi: 5000, tenure: 6, remaining: 2, status: "active", nextDue: "01 Apr 2025" },
    { id: "LN-004", empName: "Anita Kumar", empId: "EMP089", avatar: "AK", dept: "HR", type: "Education Loan", principal: 100000, outstanding: 100000, emi: 4500, tenure: 24, remaining: 22, status: "overdue", nextDue: "15 Mar 2025 (overdue)" },
    { id: "LN-005", empName: "Suresh Iyer", empId: "EMP124", avatar: "SI", dept: "Finance", type: "Vehicle Advance", principal: 75000, outstanding: 0, emi: 7500, tenure: 10, remaining: 0, status: "closed", nextDue: "—" },
];

const STATUS_CONFIG: Record<LoanStatus, { label: string; variant: "success" | "warning" | "danger" | "neutral" }> = {
    active: { label: "Active", variant: "success" },
    pending: { label: "Pending Approval", variant: "warning" },
    overdue: { label: "Overdue", variant: "danger" },
    closed: { label: "Closed", variant: "neutral" },
};

const LOAN_TYPES = ["Personal Loan", "Medical Advance", "Festival Advance", "Education Loan", "Vehicle Advance", "Housing Advance"] as const;

function formatINR(n: number): string {
    return "₹" + n.toLocaleString("en-IN");
}

const COLUMNS: Column<Loan>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (l) => (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA] shrink-0" aria-hidden="true">{l.avatar}</div>
                <div>
                    <p className="font-medium text-white text-xs">{l.empName}</p>
                    <p className="text-[10px] text-[#445566]">{l.empId} · {l.dept}</p>
                </div>
            </div>
        ),
        sortable: true,
        sortValue: (l) => l.empName,
    },
    { key: "type", label: "Loan Type", render: (l) => <span className="text-[#8899AA] text-xs">{l.type}</span> },
    { key: "principal", label: "Principal", align: "right", render: (l) => <span className="text-white font-medium text-xs">{formatINR(l.principal)}</span>, sortable: true, sortValue: (l) => l.principal },
    {
        key: "outstanding",
        label: "Outstanding",
        align: "right",
        render: (l) => (
            <div>
                <p className={`font-medium text-xs ${l.outstanding === 0 ? "text-[#8899AA] line-through" : "text-white"}`}>{formatINR(l.outstanding)}</p>
                {l.outstanding > 0 && (
                    <div
                        className="w-full bg-[#1A2A3A] rounded-full h-1 mt-1 max-w-[80px] ml-auto"
                        role="progressbar"
                        aria-valuenow={Math.round(((l.principal - l.outstanding) / l.principal) * 100)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${l.empName} repayment progress`}
                    >
                        <div className="bg-[#00E5A0] h-1 rounded-full" style={{ width: `${((l.principal - l.outstanding) / l.principal) * 100}%` }} />
                    </div>
                )}
            </div>
        ),
    },
    { key: "emi", label: "EMI / Month", align: "right", render: (l) => <span className="text-[#8899AA] text-xs">{formatINR(l.emi)}</span>, hideOnMobile: true },
    { key: "tenure", label: "Tenure Left", align: "right", render: (l) => <span className="text-[#8899AA] text-xs">{l.remaining} / {l.tenure} mo</span>, hideOnMobile: true },
    { key: "status", label: "Status", render: (l) => <Badge variant={STATUS_CONFIG[l.status].variant}>{STATUS_CONFIG[l.status].label}</Badge> },
    { key: "nextDue", label: "Next Due", render: (l) => <span className="text-[#8899AA] text-xs">{l.nextDue}</span>, hideOnMobile: true },
    {
        key: "actions",
        label: "Actions",
        align: "center",
        render: (l) => (
            <button
                type="button"
                className="flex items-center gap-1 text-xs text-[#0066FF] hover:underline"
                aria-label={`View details for ${l.empName}'s loan`}
            >
                <FileText size={11} aria-hidden="true" /> Details <ChevronRight size={11} aria-hidden="true" />
            </button>
        ),
    },
];

export default function LoansAdvancesPage() {
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [showNewModal, setShowNewModal] = useState(false);
    const [modalStep, setModalStep] = useState<"form" | "approving" | "done">("form");

    const filtered = LOANS.filter((l) => filterStatus === "all" || l.status === filterStatus);

    const totalOutstanding = LOANS.filter((l) => l.status !== "closed").reduce((s, l) => s + l.outstanding, 0);
    const overdueLoans = LOANS.filter((l) => l.status === "overdue").length;
    const activeLoans = LOANS.filter((l) => l.status === "active").length;
    const monthlyRecovery = LOANS.filter((l) => l.status === "active").reduce((s, l) => s + l.emi, 0);

    function submitLoan() {
        setModalStep("approving");
        setTimeout(() => setModalStep("done"), 2000);
    }

    const KPI_CARDS = [
        { label: "Total Outstanding", value: formatINR(totalOutstanding), sub: "Across all active loans", icon: IndianRupee, color: "#FFB800" },
        { label: "Active Loans", value: String(activeLoans), sub: "Currently being repaid", icon: CreditCard, color: "#0066FF" },
        { label: "Overdue Accounts", value: String(overdueLoans), sub: "Missed EMI this month", icon: AlertCircle, color: "#FF4444" },
        { label: "Monthly Recovery", value: formatINR(monthlyRecovery), sub: "Auto-deducted from payroll", icon: TrendingDown, color: "#00E5A0" },
    ] as const;

    return (
        <Page
            title="Loans & Advances"
            subtitle="Manage employee salary loans and advance disbursements"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Loans & Advances" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>Export</Button>
                    <Button
                        icon={<Plus size={14} aria-hidden="true" />}
                        onClick={() => { setShowNewModal(true); setModalStep("form"); }}
                    >
                        New Loan / Advance
                    </Button>
                </>
            }
        >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPI_CARDS.map((card) => (
                    <Card key={card.label} padding="md">
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-xs text-[#8899AA]">{card.label}</p>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${card.color}18` }} aria-hidden="true">
                                <card.icon size={14} style={{ color: card.color }} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                        <p className="text-[11px] text-[#8899AA]">{card.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="Filter loans by status">
                {["all", "active", "overdue", "pending", "closed"].map((s) => (
                    <button
                        key={s}
                        role="tab"
                        aria-selected={filterStatus === s}
                        onClick={() => setFilterStatus(s)}
                        className={`h-8 px-3 text-xs rounded-lg capitalize transition-all ${filterStatus === s ? "bg-[#0066FF] text-white" : "bg-[#1A2A3A] text-[#8899AA] hover:text-white"}`}
                    >
                        {s === "all" ? "All" : STATUS_CONFIG[s as LoanStatus]?.label ?? s}
                    </button>
                ))}
            </div>

            {/* Table */}
            <Card padding="none">
                <DataTable<Loan>
                    data={filtered}
                    columns={COLUMNS}
                    rowKey={(l) => l.id}
                    searchable
                    searchPlaceholder="Search employee name or EMP ID..."
                    aria-label="Employee loans and advances"
                    emptyTitle="No loans match your filters"
                />
            </Card>

            {/* Info Banner */}
            <div className="flex items-start gap-3 p-4 bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-xl">
                <Wallet size={16} className="text-[#0066FF] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                    <p className="text-sm font-medium text-white">EMI Auto-Deduction via Payroll</p>
                    <p className="text-xs text-[#8899AA] mt-0.5">All active loan EMIs are automatically deducted from monthly net salary during payroll processing. No manual action needed.</p>
                </div>
            </div>

            {/* New Loan Modal */}
            {showNewModal && (
                <div
                    className="fixed inset-0 bg-[#060B14]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="New loan or advance"
                >
                    <Card padding="none" className="w-full max-w-lg shadow-2xl">
                        {modalStep === "form" && (
                            <>
                                <div className="flex items-center justify-between p-6 border-b border-[#1A2A3A]">
                                    <h2 className="text-lg font-semibold text-white">New Loan / Advance</h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowNewModal(false)}
                                        aria-label="Close dialog"
                                    >
                                        <X size={16} aria-hidden="true" />
                                    </Button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label htmlFor="loan-employee" className="block text-xs text-[#8899AA] mb-2">Employee <span className="text-[#FF4444]">*</span></label>
                                        <input
                                            id="loan-employee"
                                            defaultValue="EMP001 — Rahul Sharma"
                                            className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00E5A0]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="loan-type" className="block text-xs text-[#8899AA] mb-2">Loan Type <span className="text-[#FF4444]">*</span></label>
                                        <select
                                            id="loan-type"
                                            className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00E5A0]"
                                        >
                                            {LOAN_TYPES.map((t) => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="loan-principal" className="block text-xs text-[#8899AA] mb-2">Principal Amount (₹) <span className="text-[#FF4444]">*</span></label>
                                            <input
                                                id="loan-principal"
                                                defaultValue="50000"
                                                className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00E5A0]"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="loan-tenure" className="block text-xs text-[#8899AA] mb-2">Repayment Tenure (months)</label>
                                            <input
                                                id="loan-tenure"
                                                defaultValue="10"
                                                className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00E5A0]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="loan-reason" className="block text-xs text-[#8899AA] mb-2">Reason / Justification</label>
                                        <textarea
                                            id="loan-reason"
                                            rows={3}
                                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00E5A0] resize-none"
                                            placeholder="Medical emergency, festival advance, etc."
                                        />
                                    </div>
                                    <div className="p-3 bg-[#0A1420] rounded-xl text-xs text-[#8899AA] flex items-center gap-2">
                                        <Building2 size={13} className="text-[#0066FF] shrink-0" aria-hidden="true" />
                                        EMI of approx. <strong className="text-white mx-1">₹5,000/month</strong> will be auto-deducted from payroll
                                    </div>
                                </div>
                                <div className="flex gap-3 p-6 border-t border-[#1A2A3A]">
                                    <Button variant="secondary" className="flex-1" onClick={() => setShowNewModal(false)}>Cancel</Button>
                                    <Button className="flex-1" onClick={submitLoan}>Submit for Approval</Button>
                                </div>
                            </>
                        )}
                        {modalStep === "approving" && (
                            <div className="p-12 text-center">
                                <Loader2 size={40} className="text-[#0066FF] animate-spin mx-auto mb-4" aria-hidden="true" />
                                <p className="text-white font-semibold">Processing...</p>
                                <p className="text-sm text-[#8899AA] mt-1">Submitting to Finance Head for approval</p>
                            </div>
                        )}
                        {modalStep === "done" && (
                            <div className="p-12 text-center">
                                <CheckCircle2 size={48} className="text-[#00E5A0] mx-auto mb-4" aria-hidden="true" />
                                <p className="text-white font-bold text-lg mb-1">Loan Request Submitted!</p>
                                <p className="text-sm text-[#8899AA] mb-6">Finance Head will review and approve. Employee will be notified by email.</p>
                                <Button onClick={() => setShowNewModal(false)}>Done</Button>
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </Page>
    );
}
