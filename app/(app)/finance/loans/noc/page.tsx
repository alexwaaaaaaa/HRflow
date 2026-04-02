"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FileSignature, ChevronRight, Search, Download, CheckCircle2, Copy
} from "lucide-react";

export default function LoanNOCScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/loans" className="hover:text-white transition-colors">Loans</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">NOC Ledger</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <FileSignature className="w-8 h-8 text-[#00E5FF]" />
                        Loan NOC Ledger
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Repository of No Objection Certificates issued for closed loan accounts.</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by Employee, NOC Ref, or Loan ID..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#00E5FF] transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">NOC Reference</th>
                                <th className="p-4 font-medium">Employee</th>
                                <th className="p-4 font-medium">Loan Account</th>
                                <th className="p-4 font-medium">Closure Date</th>
                                <th className="p-4 font-medium text-center">Status</th>
                                <th className="p-4 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                                <td className="p-4">
                                    <div className="font-mono text-[#00E5FF] font-medium flex items-center gap-2">
                                        NOC/LN-6523/2025
                                        <Copy className="w-3 h-3 text-[#8899AA] cursor-pointer hover:text-white" />
                                    </div>
                                    <div className="text-xs text-[#8899AA] mt-1">Issued by System</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-white font-medium">Ananya Sharma</div>
                                    <div className="text-[#8899AA] text-xs mt-0.5">EMP-042</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-white">LN-6523</div>
                                    <div className="text-[#8899AA] text-xs mt-0.5">₹1.5L Medical</div>
                                </td>
                                <td className="p-4 text-white">16 Oct 2025</td>
                                <td className="p-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium">
                                        <CheckCircle2 className="w-3 h-3" /> Emailed to Emp
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#8899AA] hover:text-[#00E5FF] transition-colors" title="Download PDF">
                                        <Download className="w-5 h-5 mx-auto" />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                                <td className="p-4">
                                    <div className="font-mono text-[#00E5FF] font-medium flex items-center gap-2">
                                        NOC/LN-5192/2025
                                        <Copy className="w-3 h-3 text-[#8899AA] cursor-pointer hover:text-white" />
                                    </div>
                                    <div className="text-xs text-[#8899AA] mt-1">Issued by System</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-white font-medium">Rahul Kumar</div>
                                    <div className="text-[#8899AA] text-xs mt-0.5">EMP-091</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-white">LN-5192</div>
                                    <div className="text-[#8899AA] text-xs mt-0.5">₹50k Education</div>
                                </td>
                                <td className="p-4 text-white">10 Sep 2025</td>
                                <td className="p-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium">
                                        <CheckCircle2 className="w-3 h-3" /> Emailed to Emp
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-[#8899AA] hover:text-[#00E5FF] transition-colors" title="Download PDF">
                                        <Download className="w-5 h-5 mx-auto" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
