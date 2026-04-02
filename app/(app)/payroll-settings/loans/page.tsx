"use client";

import React, { useState } from "react";
import {
    CreditCard, Clock, CheckCircle2, AlertCircle, IndianRupee,
    TrendingDown, Plus, Download, ChevronRight, Search, Filter,
    FileText, Wallet, Building2, X, Loader2
} from "lucide-react";

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

const STATUS_CONFIG: Record<LoanStatus, { label: string; bg: string; color: string }> = {
    active: { label: "Active", bg: "rgba(0,229,160,0.1)", color: "#00E5A0" },
    pending: { label: "Pending Approval", bg: "rgba(255,184,0,0.1)", color: "#FFB800" },
    overdue: { label: "Overdue", bg: "rgba(255,68,68,0.1)", color: "#FF4444" },
    closed: { label: "Closed", bg: "rgba(68,85,102,0.1)", color: "#8899AA" },
};

const LOAN_TYPES = ["Personal Loan", "Medical Advance", "Festival Advance", "Education Loan", "Vehicle Advance", "Housing Advance"];

export default function LoansAdvancesPage() {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [showNewModal, setShowNewModal] = useState(false);
    const [modalStep, setModalStep] = useState<"form" | "approving" | "done">("form");

    const filtered = LOANS.filter(l =>
        (filterStatus === "all" || l.status === filterStatus) &&
        (l.empName.toLowerCase().includes(search.toLowerCase()) || l.empId.toLowerCase().includes(search.toLowerCase()))
    );

    const totalOutstanding = LOANS.filter(l => l.status !== "closed").reduce((s, l) => s + l.outstanding, 0);
    const overdueLoans = LOANS.filter(l => l.status === "overdue").length;
    const activeLoans = LOANS.filter(l => l.status === "active").length;
    const monthlyRecovery = LOANS.filter(l => l.status === "active").reduce((s, l) => s + l.emi, 0);

    function formatINR(n: number) {
        return "₹" + n.toLocaleString("en-IN");
    }

    function submitLoan() {
        setModalStep("approving");
        setTimeout(() => setModalStep("done"), 2000);
    }

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Loans & Advances</h1>
                    <p className="text-sm text-[#8899AA]">Manage employee salary loans and advance disbursements</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 h-10 px-4 bg-[#1A2A3A] text-sm rounded-lg hover:bg-[#243040] transition-colors">
                        <Download size={16} /> Export
                    </button>
                    <button
                        onClick={() => { setShowNewModal(true); setModalStep("form"); }}
                        className="flex items-center gap-2 h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-lg hover:bg-[#00c98d] transition-colors"
                    >
                        <Plus size={16} /> New Loan / Advance
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Outstanding", value: formatINR(totalOutstanding), sub: "Across all active loans", icon: IndianRupee, color: "#FFB800" },
                    { label: "Active Loans", value: String(activeLoans), sub: "Currently being repaid", icon: CreditCard, color: "#0066FF" },
                    { label: "Overdue Accounts", value: String(overdueLoans), sub: "Missed EMI this month", icon: AlertCircle, color: "#FF4444" },
                    { label: "Monthly Recovery", value: formatINR(monthlyRecovery), sub: "Auto-deducted from payroll", icon: TrendingDown, color: "#00E5A0" },
                ].map(card => (
                    <div key={card.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-xs text-[#8899AA]">{card.label}</p>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: card.color + "18" }}>
                                <card.icon size={16} style={{ color: card.color }} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                        <p className="text-[11px] text-[#8899AA]">{card.sub}</p>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                <div className="relative flex-1 min-w-0">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search employee name or EMP ID..."
                        className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-lg pl-9 pr-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter size={14} className="text-[#445566]" />
                    {["all", "active", "overdue", "pending", "closed"].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`h-8 px-3 text-xs rounded-lg capitalize transition-all ${filterStatus === s ? "bg-[#0066FF] text-white" : "bg-[#1A2A3A] text-[#8899AA] hover:text-white"}`}
                        >
                            {s === "all" ? "All" : STATUS_CONFIG[s as LoanStatus]?.label ?? s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden mb-6">
                <table className="w-full text-sm">
                    <thead className="bg-[#0A1420]">
                        <tr className="text-[#8899AA] text-xs">
                            <th className="px-5 py-3.5 text-left font-medium">Employee</th>
                            <th className="px-5 py-3.5 text-left font-medium">Loan Type</th>
                            <th className="px-5 py-3.5 text-right font-medium">Principal</th>
                            <th className="px-5 py-3.5 text-right font-medium">Outstanding</th>
                            <th className="px-5 py-3.5 text-right font-medium">EMI / Month</th>
                            <th className="px-5 py-3.5 text-right font-medium">Tenure Left</th>
                            <th className="px-5 py-3.5 text-left font-medium">Status</th>
                            <th className="px-5 py-3.5 text-left font-medium">Next Due</th>
                            <th className="px-5 py-3.5 text-center font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A1420]">
                        {filtered.map(loan => {
                            const cfg = STATUS_CONFIG[loan.status];
                            const progress = Math.round(((loan.principal - loan.outstanding) / loan.principal) * 100);
                            return (
                                <tr key={loan.id} className="hover:bg-[#1A2A3A]/40 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA] shrink-0">{loan.avatar}</div>
                                            <div>
                                                <p className="font-medium text-white text-[13px]">{loan.empName}</p>
                                                <p className="text-[11px] text-[#445566]">{loan.empId} · {loan.dept}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[#8899AA]">{loan.type}</td>
                                    <td className="px-5 py-4 text-right text-white font-medium">{formatINR(loan.principal)}</td>
                                    <td className="px-5 py-4 text-right">
                                        <p className={`font-medium ${loan.outstanding === 0 ? "text-[#8899AA] line-through" : "text-white"}`}>{formatINR(loan.outstanding)}</p>
                                        {loan.outstanding > 0 && (
                                            <div className="w-full bg-[#1A2A3A] rounded-full h-1 mt-1.5 max-w-[80px] ml-auto">
                                                <div className="bg-[#00E5A0] h-1 rounded-full" style={{ width: `${progress}%` }} />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-right text-[#8899AA]">{formatINR(loan.emi)}</td>
                                    <td className="px-5 py-4 text-right text-[#8899AA]">{loan.remaining} / {loan.tenure} mo</td>
                                    <td className="px-5 py-4">
                                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                                    </td>
                                    <td className="px-5 py-4 text-[12px] text-[#8899AA]">{loan.nextDue}</td>
                                    <td className="px-5 py-4 text-center">
                                        <button className="flex items-center gap-1 text-xs text-[#0066FF] mx-auto hover:underline">
                                            <FileText size={12} /> Details <ChevronRight size={12} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {filtered.length === 0 && (
                            <tr><td colSpan={9} className="px-5 py-12 text-center text-[#445566]">No loans match your filters</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Info banner */}
            <div className="bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-xl p-4 flex items-start gap-3">
                <Wallet size={18} className="text-[#0066FF] shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-white">EMI Auto-Deduction via Payroll</p>
                    <p className="text-[12px] text-[#8899AA] mt-0.5">All active loan EMIs are automatically deducted from monthly net salary during payroll processing. No manual action needed.</p>
                </div>
            </div>

            {/* New Loan Modal */}
            {showNewModal && (
                <div className="fixed inset-0 bg-[#060B14]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl w-full max-w-lg shadow-2xl">
                        {modalStep === "form" && (
                            <>
                                <div className="flex items-center justify-between p-6 border-b border-[#1A2A3A]">
                                    <h2 className="text-lg font-semibold text-white">New Loan / Advance</h2>
                                    <button onClick={() => setShowNewModal(false)} className="text-[#8899AA] hover:text-white"><X size={18} /></button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-xs text-[#8899AA] mb-2">Employee <span className="text-[#FF4444]">*</span></label>
                                        <input defaultValue="EMP001 — Rahul Sharma" className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00E5A0]" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#8899AA] mb-2">Loan Type <span className="text-[#FF4444]">*</span></label>
                                        <select className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00E5A0]">
                                            {LOAN_TYPES.map(t => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-[#8899AA] mb-2">Principal Amount (₹) <span className="text-[#FF4444]">*</span></label>
                                            <input defaultValue="50000" className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00E5A0]" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-[#8899AA] mb-2">Repayment Tenure (months)</label>
                                            <input defaultValue="10" className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00E5A0]" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#8899AA] mb-2">Reason / Justification</label>
                                        <textarea rows={3} className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00E5A0] resize-none" placeholder="Medical emergency, festival advance, etc." />
                                    </div>
                                    <div className="p-3 bg-[#0A1420] rounded-xl text-xs text-[#8899AA] flex items-center gap-2">
                                        <Building2 size={14} className="text-[#0066FF] shrink-0" />
                                        EMI of approx. <strong className="text-white ml-1 mr-1">₹5,000/month</strong> will be auto-deducted from payroll
                                    </div>
                                </div>
                                <div className="flex gap-3 p-6 border-t border-[#1A2A3A]">
                                    <button onClick={() => setShowNewModal(false)} className="flex-1 h-10 bg-transparent border border-[#1A2A3A] text-sm text-white rounded-lg hover:bg-[#1A2A3A] transition-colors">
                                        Cancel
                                    </button>
                                    <button onClick={submitLoan} className="flex-1 h-10 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-lg hover:bg-[#00c98d] transition-colors">
                                        Submit for Approval
                                    </button>
                                </div>
                            </>
                        )}
                        {modalStep === "approving" && (
                            <div className="p-12 text-center">
                                <Loader2 size={40} className="text-[#0066FF] animate-spin mx-auto mb-4" />
                                <p className="text-white font-semibold">Processing...</p>
                                <p className="text-sm text-[#8899AA] mt-1">Submitting to Finance Head for approval</p>
                            </div>
                        )}
                        {modalStep === "done" && (
                            <div className="p-12 text-center">
                                <CheckCircle2 size={48} className="text-[#00E5A0] mx-auto mb-4" />
                                <p className="text-white font-bold text-lg mb-1">Loan Request Submitted!</p>
                                <p className="text-sm text-[#8899AA] mb-6">Finance Head will review and approve. Employee will be notified by email.</p>
                                <button onClick={() => setShowNewModal(false)} className="h-10 px-8 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-lg hover:bg-[#00c98d] transition-colors">
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
