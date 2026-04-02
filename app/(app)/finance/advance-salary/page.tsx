"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Banknote, CalendarDays, CheckCircle2, ChevronRight, AlertTriangle, Clock
} from "lucide-react";

const PENDING_ADVANCES = [
    { id: "ADV-001", emp: "Ravi Kumar", dept: "Engineering", amount: 150000, reason: "Medical Emergency", date: "Oct 12, 2025" },
    { id: "ADV-002", emp: "Sneha Rao", dept: "Marketing", amount: 50000, reason: "Security Deposit", date: "Oct 14, 2025" },
];

export default function AdvanceSalaryScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Advance Salary</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Banknote className="w-8 h-8 text-emerald-400" />
                        Advance Salary Manager
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Process and track zero-interest salary advances to employees</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-bold text-white mb-6">Pending Requests</h2>

                        {PENDING_ADVANCES.length > 0 ? (
                            <div className="space-y-4">
                                {PENDING_ADVANCES.map((req) => (
                                    <div key={req.id} className="p-5 border border-[#1A2A3A] rounded-xl bg-[#1A2A3A]/20 hover:bg-[#1A2A3A]/40 transition-colors">
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                                                    {req.emp.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-semibold text-white">{req.emp}</h3>
                                                    <p className="text-xs text-[#8899AA]">{req.dept} • {req.id}</p>
                                                    <div className="mt-2 text-sm text-white">
                                                        <span className="text-[#8899AA]">Reason:</span> {req.reason}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end justify-between">
                                                <div className="text-right">
                                                    <p className="text-sm text-[#8899AA] mb-1">Requested Amount</p>
                                                    <h4 className="text-xl font-bold text-emerald-400">₹{req.amount.toLocaleString()}</h4>
                                                </div>
                                                <div className="flex gap-2 mt-4">
                                                    <button className="px-4 py-1.5 rounded bg-pink-500/10 text-pink-400 text-sm font-medium hover:bg-pink-500/20 transition-colors">Reject</button>
                                                    <button className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)]">Approve & Disburse</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-12 text-[#8899AA] bg-[#1A2A3A]/20 rounded-xl border border-dashed border-[#2A3A4A]">
                                <CheckCircle2 className="w-12 h-12 mb-3 text-[#2A3A4A]" />
                                <p>No pending advance salary requests.</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6">Recent Disbursements</h2>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                    <th className="p-3 font-medium">Employee</th>
                                    <th className="p-3 font-medium">Date</th>
                                    <th className="p-3 font-medium">Amount</th>
                                    <th className="p-3 font-medium">Recovery Plan</th>
                                    <th className="p-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-[#1A2A3A]">
                                <tr className="hover:bg-[#1A2A3A]/20">
                                    <td className="p-3 text-white">Aisha Gupta</td>
                                    <td className="p-3 text-[#8899AA]">Oct 01, 2025</td>
                                    <td className="p-3 text-white font-medium">₹25,000</td>
                                    <td className="p-3 text-[#8899AA]">1 installment</td>
                                    <td className="p-3"><span className="text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-400">Recovering Next Payroll</span></td>
                                </tr>
                                <tr className="hover:bg-[#1A2A3A]/20">
                                    <td className="p-3 text-white">Raj Singh</td>
                                    <td className="p-3 text-[#8899AA]">Sep 15, 2025</td>
                                    <td className="p-3 text-white font-medium">₹100,000</td>
                                    <td className="p-3 text-[#8899AA]">4 installments</td>
                                    <td className="p-3"><span className="text-xs px-2 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF]">Active (₹25k left)</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/5 border border-indigo-500/20 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-lg font-bold text-white">Policy Summary</h2>
                        </div>
                        <ul className="text-sm text-[#8899AA] space-y-3">
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                Max allowable advance is <strong>1.5x of monthly Net Salary</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                Maximum repayment tenure is <strong>6 months</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                Employee must complete probation (6mo) to be eligible.
                            </li>
                        </ul>
                        <button className="mt-6 w-full py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white rounded-lg transition-colors text-sm">
                            Edit Policy Guidelines
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
