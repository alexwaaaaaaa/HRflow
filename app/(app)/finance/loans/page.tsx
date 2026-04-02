"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Briefcase, Plus, ChevronRight, Download, Filter, Search, CheckCircle2, AlertCircle, Clock
} from "lucide-react";

const ACTIVE_LOANS = [
    { id: "LN-8812", emp: "Ananya S", type: "Medical Emergency", principal: 250000, tenure: 24, emi: 11500, paid: 8, balance: 166666, status: "Active", risk: "Low" },
    { id: "LN-8809", emp: "Rahul K", type: "Marriage", principal: 500000, tenure: 36, emi: 16000, paid: 12, balance: 333333, status: "Active", risk: "Low" },
    { id: "LN-8790", emp: "Sneha R", type: "Home Renovation", principal: 300000, tenure: 24, emi: 14000, paid: 4, balance: 250000, status: "Active", risk: "Medium" },
    { id: "LN-8750", emp: "Vikram R", type: "Vehicle Loan", principal: 800000, tenure: 60, emi: 16500, paid: 18, balance: 560000, status: "Active", risk: "Low" },
];

export default function LoanManagementScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Loan Management</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-indigo-400" />
                        Employee Loan Portfolio
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Manage active company loans, track repayments, and identify risks.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/finance/loans/queue" className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Clock className="w-4 h-4" />
                        Approval Queue (3)
                    </Link>
                    <Link href="/finance/loans/apply" className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Plus className="w-4 h-4" />
                        New Loan Request
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total Portfolio Size</p>
                    <h3 className="text-2xl font-bold text-white mb-1">₹4.2 Cr</h3>
                    <p className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                        Across 142 Active Loans
                    </p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Monthly EMI Inflow</p>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-1">₹18.5 L</h3>
                    <p className="text-xs text-[#8899AA]">Auto-deducted via Payroll</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Avg. Loan Ticket Size</p>
                    <h3 className="text-2xl font-bold text-white mb-1">₹3.1 L</h3>
                    <p className="text-xs text-[#8899AA]">Mostly Medical/Marriage</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 bg-amber-500/5">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">NPA / At Risk</p>
                    <h3 className="text-2xl font-bold text-amber-500 mb-1">₹4.2 L</h3>
                    <p className="text-xs text-amber-500/80">3 Employees on Notice / PIP</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by Employee or Loan ID..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                            <Filter className="w-4 h-4" />
                            Status: Active
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Loan ID / Employee</th>
                                <th className="p-4 font-medium">Purpose</th>
                                <th className="p-4 font-medium text-right">Principal</th>
                                <th className="p-4 font-medium text-center">Tenure/Paid</th>
                                <th className="p-4 font-medium text-right">Monthly EMI</th>
                                <th className="p-4 font-medium text-right">Outstanding</th>
                                <th className="p-4 font-medium text-center">Status</th>
                                <th className="p-4 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {ACTIVE_LOANS.map((loan) => (
                                <tr key={loan.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4">
                                        <div className="text-white font-medium">{loan.emp}</div>
                                        <div className="font-mono text-indigo-400 text-xs mt-1">{loan.id}</div>
                                    </td>
                                    <td className="p-4 text-[#8899AA]">{loan.type}</td>
                                    <td className="p-4 text-right text-white font-medium">₹{loan.principal.toLocaleString()}</td>
                                    <td className="p-4 text-center">
                                        <div className="text-white">{loan.paid} / {loan.tenure}</div>
                                        <div className="text-xs text-[#8899AA] mt-1">months</div>
                                    </td>
                                    <td className="p-4 text-right text-white">₹{loan.emi.toLocaleString()}</td>
                                    <td className="p-4 text-right text-amber-400 font-bold">₹{loan.balance.toLocaleString()}</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium">
                                            {loan.status}
                                        </span>
                                        {loan.risk !== 'Low' && (
                                            <div className="mt-1 flex items-center justify-center gap-1 text-xs text-amber-500">
                                                <AlertCircle className="w-3 h-3" /> {loan.risk} Risk
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 text-center space-x-2">
                                        <Link href={`/finance/loans/repay`} className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Repay</Link>
                                        <span className="text-[#2A3A4A]">|</span>
                                        <Link href={`/finance/loans/foreclosure`} className="text-xs text-[#8899AA] hover:text-white font-medium">Closure</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
