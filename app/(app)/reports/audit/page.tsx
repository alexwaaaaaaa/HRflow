"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FileKey, ChevronRight, Download, Filter, Lock, CheckCircle2, History
} from "lucide-react";

export default function AuditReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Audit Trail</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <FileKey className="w-8 h-8 text-pink-500" />
                        System Audit Logs
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Immutable record of all critical system events, access, and configuration changes.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <Filter className="w-4 h-4" /> Filter Logs
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                        <Download className="w-4 h-4" /> Export CSV (Secure)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Events Last 24h</h3>
                    <div className="text-3xl font-bold mb-1 text-white">4,281</div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Failed Logins</h3>
                    <div className="text-3xl font-bold mb-1 text-pink-400">12</div>
                    <p className="text-[10px] text-[#8899AA] mt-1">Blocked IPs: 2</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Critical Config Changes</h3>
                    <div className="text-3xl font-bold mb-1 text-amber-500">3</div>
                    <p className="text-[10px] text-[#8899AA] mt-1">Payroll locks bypassed</p>
                </div>
                <div className="bg-[#0D1928] border border-emerald-500/30 rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Data Integrity</h3>
                    <div className="text-3xl font-bold mb-1 text-emerald-400 flex items-center gap-2">
                        100% <CheckCircle2 className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                        <History className="w-4 h-4 text-pink-500" /> Event Chronology
                    </h2>
                    <div className="flex gap-2">
                        <select className="bg-[#0B1221] border border-[#2A3A4A] text-[#8899AA] text-xs rounded px-2 py-1">
                            <option>Module: All</option>
                            <option>Module: Payroll</option>
                            <option>Module: Authentication</option>
                        </select>
                        <select className="bg-[#0B1221] border border-[#2A3A4A] text-[#8899AA] text-xs rounded px-2 py-1">
                            <option>Severity: All</option>
                            <option>Severity: Critical</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-sm">
                        <thead className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-medium w-48">Timestamp (UTC)</th>
                                <th className="p-4 font-medium">Actor</th>
                                <th className="p-4 font-medium">IP Address</th>
                                <th className="p-4 font-medium">Action</th>
                                <th className="p-4 font-medium">Resource/Module</th>
                                <th className="p-4 font-medium">Severity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                                <td className="p-4 text-[#8899AA]">2026-03-08 14:22:01</td>
                                <td className="p-4 text-indigo-400">admin@company.com</td>
                                <td className="p-4 text-[#8899AA]">192.168.1.45</td>
                                <td className="p-4 text-white">Unlock Payroll Month (Feb 2026)</td>
                                <td className="p-4 text-[#8899AA]">Payroll Engine</td>
                                <td className="p-4">
                                    <span className="px-2.5 py-1 bg-pink-500/10 text-pink-500 rounded text-[10px] font-bold uppercase tracking-wider border border-pink-500/20">
                                        Critical
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                                <td className="p-4 text-[#8899AA]">2026-03-08 13:15:44</td>
                                <td className="p-4 text-indigo-400">j.doe@company.com</td>
                                <td className="p-4 text-[#8899AA]">10.0.0.12</td>
                                <td className="p-4 text-white">Generate Custom Report (Headcount)</td>
                                <td className="p-4 text-[#8899AA]">Reports & Analytics</td>
                                <td className="p-4">
                                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                        Info
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                                <td className="p-4 text-[#8899AA]">2026-03-08 09:44:12</td>
                                <td className="p-4 text-indigo-400">System (Automated)</td>
                                <td className="p-4 text-[#8899AA]">Internal</td>
                                <td className="p-4 text-white">Failed SSO Login (Invalid Assert)</td>
                                <td className="p-4 text-[#8899AA]">Authentication</td>
                                <td className="p-4">
                                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
                                        Warning
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                                <td className="p-4 text-[#8899AA]">2026-03-07 18:30:00</td>
                                <td className="p-4 text-indigo-400">hr.head@company.com</td>
                                <td className="p-4 text-[#8899AA]">192.168.1.100</td>
                                <td className="p-4 text-white">Modified Leave Policy (Sick Leave Quota)</td>
                                <td className="p-4 text-[#8899AA]">Core HR Settings</td>
                                <td className="p-4">
                                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
                                        High
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
