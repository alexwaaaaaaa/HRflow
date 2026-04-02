"use client";

import React from "react";
import Link from "next/link";
import {
    AlertTriangle, ChevronRight, Download, Filter, Search, RotateCcw
} from "lucide-react";

const RECOVERY_TRACKING = [
    { emp: "Ananya S", id: "EMP-042", month: "Sep 2025", expected: 15150, status: "Recovered", mode: "Auto Deduction" },
    { emp: "Vikram R", id: "EMP-011", month: "Sep 2025", expected: 8080, status: "Failed", mode: "Auto Deduction", note: "LOP exceeded net pay" },
    { emp: "Sneha R", id: "EMP-112", month: "Sep 2025", expected: 25250, status: "Recovered", mode: "Auto Deduction" },
    { emp: "Rahul K", id: "EMP-091", month: "Aug 2025", expected: 5050, status: "Partially Recovered", mode: "Manual Adjustment", note: "Recovered 3000. Bal 2050 carry fwd" },
    { emp: "Amit V", id: "EMP-210", month: "Jul 2025", expected: 12000, status: "Absconding - Loss", mode: "FnF", note: "Legal notice sent" },
];

export default function EWARecoveryTrackingScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/ewa" className="hover:text-white transition-colors">EWA</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Recovery Exceptions</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-amber-500" />
                        Recovery Exceptions Tracking
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Track and manage shortfalls, partial recoveries, and absconding debts.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    Export Defaults List
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total Outstanding Exceptions</p>
                    <h3 className="text-2xl font-bold text-amber-400 mb-1">₹35,130</h3>
                    <p className="text-xs text-[#8899AA]">Across 8 active cases</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Written Off (YTD)</p>
                    <h3 className="text-2xl font-bold text-pink-400 mb-1">₹55,000</h3>
                    <p className="text-xs text-[#8899AA]">Absconding / NPA</p>
                </div>
                <div className="bg-[#0D1928] border border-emerald-500/20 rounded-2xl p-6 bg-emerald-500/5">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Overall Collection Efficiency</p>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-1">99.1%</h3>
                    <p className="text-xs text-emerald-400/80">YTD healthy</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search exceptions..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                            <Filter className="w-4 h-4" />
                            Exceptions Only
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Employee</th>
                                <th className="p-4 font-medium">Target Month</th>
                                <th className="p-4 font-medium text-right">Expected Payload</th>
                                <th className="p-4 font-medium">Status / Note</th>
                                <th className="p-4 font-medium text-center">Intervention</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {RECOVERY_TRACKING.map((rec, idx) => (
                                <tr key={idx} className={`hover:bg-[#1A2A3A]/30 transition-colors ${rec.status.includes('Failed') || rec.status.includes('Partially') ? 'bg-amber-500/5' : ''}`}>
                                    <td className="p-4">
                                        <div className="text-white font-medium">{rec.emp}</div>
                                        <div className="text-[#8899AA] text-xs mt-0.5">{rec.id}</div>
                                    </td>
                                    <td className="p-4 text-[#8899AA]">{rec.month}</td>
                                    <td className="p-4 text-right">
                                        <div className="text-white font-bold">₹{rec.expected.toLocaleString()}</div>
                                        <div className="text-[#8899AA] text-xs">{rec.mode}</div>
                                    </td>
                                    <td className="p-4">
                                        {rec.status === 'Recovered' && <span className="text-emerald-400 font-medium text-xs">Recovered</span>}
                                        {rec.status === 'Failed' && (
                                            <div>
                                                <span className="text-pink-400 font-medium text-xs bg-pink-500/10 px-2 py-1 rounded">Failed (Zero Pay)</span>
                                                <p className="text-[#8899AA] text-xs mt-1">{rec.note}</p>
                                            </div>
                                        )}
                                        {rec.status === 'Partially Recovered' && (
                                            <div>
                                                <span className="text-amber-500 font-medium text-xs bg-amber-500/10 px-2 py-1 rounded">Partial Shortfall</span>
                                                <p className="text-[#8899AA] text-xs mt-1">{rec.note}</p>
                                            </div>
                                        )}
                                        {rec.status === 'Absconding - Loss' && (
                                            <div>
                                                <span className="text-[#8899AA] font-medium text-xs bg-[#1A2A3A] px-2 py-1 rounded border border-[#2A3A4A]">NPA / Written Off</span>
                                                <p className="text-pink-400/80 text-xs mt-1">{rec.note}</p>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 text-center">
                                        {!rec.status.includes('Recovered') && !rec.status.includes('Loss') && (
                                            <button className="flex items-center justify-center gap-1 mx-auto px-3 py-1 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-xs font-medium rounded transition-colors">
                                                <RotateCcw className="w-3 h-3" /> Roll to Next Month
                                            </button>
                                        )}
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
