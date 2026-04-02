"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ShieldCheck, ChevronRight, Download, Search, CheckCircle2, AlertTriangle, AlertCircle
} from "lucide-react";

export default function ComplianceStatusReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Compliance Status</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                        Compliance Status Report
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Real-time tracker for statutory filings, challans, and labor law health.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <Download className="w-4 h-4" /> Download Certificate
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-[#0B1221] text-[10px] font-bold px-3 py-1 rounded-bl-lg">Excellent</div>
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Organization Risk Score</h3>
                    <div className="text-4xl font-black mb-1 text-emerald-400">96<span className="text-lg text-[#8899AA] font-medium">/100</span></div>
                    <p className="text-xs text-[#8899AA] mt-2">All major central filings are up to date.</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Pending Due Dates (Next 7 Days)</h3>
                    <div className="text-4xl font-black mb-1 text-amber-500">2</div>
                    <p className="text-xs text-[#8899AA] mt-2">TDS Payment, PT (Maharashtra)</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Overdue Notices</h3>
                    <div className="text-4xl font-black mb-1 text-white">0</div>
                    <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> No pending department notices</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center">
                    <h2 className="text-sm font-bold text-white">Statutory Filings Ledger (March 2026)</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search acts, regions..."
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-9 pr-4 py-1.5 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-medium">Act / Compliance</th>
                                <th className="p-4 font-medium">Applicability</th>
                                <th className="p-4 font-medium">Due Date</th>
                                <th className="p-4 font-medium">Filing Status</th>
                                <th className="p-4 font-medium">Challan / Ref No.</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A] text-sm">
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4">
                                    <div className="font-bold text-white">EPF (Provident Fund)</div>
                                    <div className="text-xs text-[#8899AA]">Monthly ECR & Payment</div>
                                </td>
                                <td className="p-4 text-[#8899AA]">Pan India</td>
                                <td className="p-4 text-white">15 Apr 2026</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs font-medium border border-emerald-500/20">
                                        <CheckCircle2 className="w-3 h-3" /> Completed On Time
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-xs text-[#8899AA]">TRRN-99827110</td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4">
                                    <div className="font-bold text-white">ESIC</div>
                                    <div className="text-xs text-[#8899AA]">Monthly Contribution</div>
                                </td>
                                <td className="p-4 text-[#8899AA]">Pan India</td>
                                <td className="p-4 text-white">15 Apr 2026</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs font-medium border border-emerald-500/20">
                                        <CheckCircle2 className="w-3 h-3" /> Completed On Time
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-xs text-[#8899AA]">ESI-CH-122904</td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4">
                                    <div className="font-bold text-white">TDS (Tax Deducted at Source)</div>
                                    <div className="text-xs text-[#8899AA]">Section 192 (Salary)</div>
                                </td>
                                <td className="p-4 text-[#8899AA]">Pan India</td>
                                <td className="p-4 text-white">07 Apr 2026</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-md text-xs font-medium border border-amber-500/20">
                                        <AlertTriangle className="w-3 h-3" /> Due Soon
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-xs text-[#8899AA]">-</td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4">
                                    <div className="font-bold text-white">Professional Tax (PT)</div>
                                    <div className="text-xs text-[#8899AA]">Monthly Return & Payment</div>
                                </td>
                                <td className="p-4 text-[#8899AA]">Maharashtra, Karnataka</td>
                                <td className="p-4 text-white">Various (Apr 2026)</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-md text-xs font-medium border border-amber-500/20">
                                        <AlertTriangle className="w-3 h-3" /> Partially Paid (KA Pending)
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-xs text-[#8899AA]">MH-PT-8812A</td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4">
                                    <div className="font-bold text-white">Labour Welfare Fund (LWF)</div>
                                    <div className="text-xs text-[#8899AA]">Half-yearly Contribution</div>
                                </td>
                                <td className="p-4 text-[#8899AA]">Maharashtra (June/Dec)</td>
                                <td className="p-4 text-[#8899AA]">N/A for March</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1A2A3A] text-[#8899AA] rounded-md text-xs font-medium">
                                        Not Applicable this month
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-xs text-[#8899AA]">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
