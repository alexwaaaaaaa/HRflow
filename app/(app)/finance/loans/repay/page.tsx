"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    CalendarCheck, ChevronRight, Search, Download, CheckCircle2, AlertTriangle, FileText
} from "lucide-react";

export default function LoanRepaymentScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/loans" className="hover:text-white transition-colors">Loans</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Repayment Master</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <CalendarCheck className="w-8 h-8 text-emerald-400" />
                        Repayment Tracking
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Monitor expected payroll recoveries vs actual collections for loan EMIs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        Sync with Payroll
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Current Payroll Cycle (Oct 2025)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="border border-[#1A2A3A] rounded-xl p-4 bg-[#1A2A3A]/30">
                            <p className="text-[#8899AA] text-xs font-medium mb-1">Expected Recovery</p>
                            <h3 className="text-xl font-bold text-white">₹18,54,320</h3>
                            <p className="text-xs text-[#8899AA] mt-1">Across 142 EMIs</p>
                        </div>
                        <div className="border border-[#1A2A3A] rounded-xl p-4 bg-emerald-500/5">
                            <p className="text-[#8899AA] text-xs font-medium mb-1">Queued successfully</p>
                            <h3 className="text-xl font-bold text-emerald-400">₹18,10,000</h3>
                            <p className="text-[10px] text-emerald-400/80 mt-1 uppercase tracking-widest">Matched w/ Payslips</p>
                        </div>
                        <div className="border border-[#1A2A3A] rounded-xl p-4 bg-pink-500/5">
                            <p className="text-[#8899AA] text-xs font-medium mb-1">Shortfalls / Blocked</p>
                            <h3 className="text-xl font-bold text-pink-400">₹44,320</h3>
                            <p className="text-[10px] text-pink-400/80 mt-1 uppercase tracking-widest">3 Exceptions Found</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col justify-center">
                    <div className="text-center mb-4">
                        <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <h3 className="text-lg font-bold text-white">Manual Intervention Required</h3>
                        <p className="text-sm text-[#8899AA] mt-1">3 employees have shortfalls delaying closure.</p>
                    </div>
                    <button className="w-full px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-amber-500 text-sm font-medium rounded-lg transition-colors">
                        Review Exceptions
                    </button>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#8899AA]" />
                        EMI Schedule Line Items
                    </h2>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search employee..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Loan ID / Employee</th>
                                <th className="p-4 font-medium text-center">Instalment</th>
                                <th className="p-4 font-medium text-right">Principal Bal</th>
                                <th className="p-4 font-medium text-right">Interest EMI</th>
                                <th className="p-4 font-medium text-right">Total EMI</th>
                                <th className="p-4 font-medium text-center">Payroll Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                                <td className="p-4">
                                    <div className="text-white font-medium">Ananya S</div>
                                    <div className="text-xs text-[#8899AA] font-mono mt-0.5">LN-8812</div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="text-white">9 of 24</span>
                                </td>
                                <td className="p-4 text-right text-[#8899AA]">₹9,500</td>
                                <td className="p-4 text-right text-[#8899AA]">₹2,000</td>
                                <td className="p-4 text-right text-white font-bold">₹11,500</td>
                                <td className="p-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium">
                                        <CheckCircle2 className="w-3 h-3" /> Queued
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                                <td className="p-4">
                                    <div className="text-white font-medium">Rahul K</div>
                                    <div className="text-xs text-[#8899AA] font-mono mt-0.5">LN-8809</div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="text-white">13 of 36</span>
                                </td>
                                <td className="p-4 text-right text-[#8899AA]">₹12,000</td>
                                <td className="p-4 text-right text-[#8899AA]">₹4,000</td>
                                <td className="p-4 text-right text-white font-bold">₹16,000</td>
                                <td className="p-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium">
                                        <CheckCircle2 className="w-3 h-3" /> Queued
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30 transition-colors bg-amber-500/5">
                                <td className="p-4">
                                    <div className="text-white font-medium">Vikram R</div>
                                    <div className="text-xs text-[#8899AA] font-mono mt-0.5">LN-8750</div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="text-white">19 of 60</span>
                                </td>
                                <td className="p-4 text-right text-[#8899AA]">₹12,500</td>
                                <td className="p-4 text-right text-[#8899AA]">₹4,000</td>
                                <td className="p-4 text-right text-amber-500 font-bold">₹16,500</td>
                                <td className="p-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-500 rounded text-xs font-medium">
                                        Shortfall (LOP)
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
