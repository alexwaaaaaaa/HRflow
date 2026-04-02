"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Leaf, ChevronRight, Download, Eye, FileText, UploadCloud
} from "lucide-react";

export default function BRSRReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">BRSR Reporting</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Leaf className="w-8 h-8 text-emerald-400" />
                        Business Responsibility & Sustainability Report
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">SEBI prescribed format mapping ESG data points across HR modules.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <UploadCloud className="w-4 h-4" /> Import External Data
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <Download className="w-4 h-4" /> Generate SEBI XBRL
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Data Readiness Score</h3>
                    <div className="text-4xl font-black mb-1 text-emerald-400">92%</div>
                    <p className="text-xs text-[#8899AA] mt-1">Ready for FY25-26 Disclosure</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 font-medium">
                    <h3 className="text-[#8899AA] text-sm mb-2">Gender Diversity (Board)</h3>
                    <div className="text-3xl font-bold mb-1 text-white">33%</div>
                    <p className="text-xs text-emerald-400 mt-1">Above mandated 20%</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 font-medium">
                    <h3 className="text-[#8899AA] text-sm mb-2">POSH Complaints</h3>
                    <div className="text-3xl font-bold mb-1 text-amber-500">2</div>
                    <p className="text-xs text-[#8899AA] mt-1">1 resolved, 1 under investigation</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 font-medium">
                    <h3 className="text-[#8899AA] text-sm mb-2">Training (Safety/Skill)</h3>
                    <div className="text-3xl font-bold mb-1 text-indigo-400">98%</div>
                    <p className="text-xs text-[#8899AA] mt-1">Coverage of permanent workforce</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center">
                    <h2 className="text-sm font-bold text-white">BRSR Principle-wise Data Mapping</h2>
                    <span className="text-xs text-[#8899AA] px-2 py-1 bg-[#1A2A3A] rounded border border-[#2A3A4A]">FY 2025-26</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-medium">Principle</th>
                                <th className="p-4 font-medium">Data Points Auto-Mapped</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A] text-sm">
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4">
                                    <div className="font-bold text-white">Principle 3: Employee Well-being</div>
                                </td>
                                <td className="p-4 text-[#8899AA]">
                                    <ul className="list-disc list-inside space-y-1 text-xs">
                                        <li>Gender & Differently Abled Breakdown</li>
                                        <li>Minimum Wage & Median Remuneration</li>
                                        <li>Leave & Maternity/Paternity Benefits</li>
                                    </ul>
                                </td>
                                <td className="p-4">
                                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                        100% Ready
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold px-3 py-1 bg-indigo-500/10 rounded transition-colors">Review Data</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4">
                                    <div className="font-bold text-white">Principle 5: Human Rights</div>
                                </td>
                                <td className="p-4 text-[#8899AA]">
                                    <ul className="list-disc list-inside space-y-1 text-xs">
                                        <li>POSH Complaints & Resolutions</li>
                                        <li>Employees paid min. wage</li>
                                        <li>Human Rights Training Coverage</li>
                                    </ul>
                                </td>
                                <td className="p-4">
                                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-md text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
                                        Data Missing (Trg)
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-amber-500 hover:text-amber-400 text-xs font-semibold px-3 py-1 bg-amber-500/10 rounded transition-colors">Add Data</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4">
                                    <div className="font-bold text-white">Principle 8: Inclusive Growth</div>
                                </td>
                                <td className="p-4 text-[#8899AA]">
                                    <ul className="list-disc list-inside space-y-1 text-xs">
                                        <li>CSR Job Creation Initiatives</li>
                                        <li>Vulnerable/Marginalized Hires</li>
                                    </ul>
                                </td>
                                <td className="p-4">
                                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                        100% Ready
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold px-3 py-1 bg-indigo-500/10 rounded transition-colors">Review Data</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex items-start gap-4">
                <FileText className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                <div>
                    <h3 className="text-white font-bold mb-1">About BRSR Mapping</h3>
                    <p className="text-sm text-[#8899AA]">Kaarya automatically aggregates data points required for the National Guidelines on Responsible Business Conduct (NGRBC) directly from your live payroll, recruitment, and attendance data, minimizing manual data entry errors for the Top 1000 listed entities.</p>
                </div>
            </div>

        </div>
    );
}
