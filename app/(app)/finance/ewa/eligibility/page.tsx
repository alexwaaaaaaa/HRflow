"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    UserCheck, ChevronRight, Search, Filter, CheckCircle2, XCircle, AlertCircle
} from "lucide-react";

const EMPLOYEES = [
    { id: "EMP-042", name: "Ananya Sharma", dept: "Engineering", tenure: "2.5 yrs", status: "Eligible", limit: "₹45,000", policy: "Standard FTE" },
    { id: "EMP-091", name: "Rahul Kumar", dept: "Design", tenure: "3 mos", status: "Not Eligible", reason: "Probation", limit: "N/A", policy: "Probationers / Interns" },
    { id: "EMP-112", name: "Sneha Rao", dept: "HR", tenure: "4 yrs", status: "Eligible", limit: "₹85,000", policy: "Tenured Leaders" },
    { id: "EMP-210", name: "Amit Verma", dept: "Sales", tenure: "1.2 yrs", status: "Blocked", reason: "Notice Period", limit: "₹0", policy: "Standard FTE" },
    { id: "EMP-305", name: "Priya Menon", dept: "Engineering", tenure: "11 mos", status: "Eligible", limit: "₹35,000", policy: "Standard FTE" },
];

export default function EWAEligibilityScreen() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/ewa" className="hover:text-white transition-colors">EWA</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Eligibility Register</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <UserCheck className="w-8 h-8 text-emerald-400" />
                        Eligibility Register
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Review system-calculated eligibility and dynamic withdrawal limits per employee</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total Eligible Workforce</p>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-1">85%</h3>
                    <p className="text-xs text-[#8899AA]">1,024 of 1,200 employees</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">In Probation</p>
                    <h3 className="text-2xl font-bold text-white mb-1">10%</h3>
                    <p className="text-xs text-[#8899AA]">120 employees blocked</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 bg-pink-500/5">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Notice / Absconding Blocked</p>
                    <h3 className="text-2xl font-bold text-pink-400 mb-1">56</h3>
                    <p className="text-xs text-pink-400/80">Auto-blocked from App</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total Potential Exposure</p>
                    <h3 className="text-2xl font-bold text-[#00E5FF] mb-1">₹4.5 Cr</h3>
                    <p className="text-xs text-[#8899AA]">If everyone withdraws max</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name, ID, or department..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                        Status Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Employee</th>
                                <th className="p-4 font-medium">Tenure</th>
                                <th className="p-4 font-medium">Policy Tier</th>
                                <th className="p-4 font-medium text-right">Max Limit (Base)</th>
                                <th className="p-4 font-medium text-center">Eligibility / Status</th>
                                <th className="p-4 font-medium text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {EMPLOYEES.map((emp) => (
                                <tr key={emp.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4">
                                        <div className="text-white font-medium">{emp.name}</div>
                                        <div className="text-[#8899AA] text-xs mt-0.5">{emp.id} • {emp.dept}</div>
                                    </td>
                                    <td className="p-4 text-[#8899AA]">{emp.tenure}</td>
                                    <td className="p-4 text-white text-xs">
                                        <span className="bg-[#1A2A3A] border border-[#2A3A4A] px-2 py-1 rounded">
                                            {emp.policy}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-mono font-bold text-[#00E5FF]">{emp.limit}</td>
                                    <td className="p-4 text-center">
                                        {emp.status === 'Eligible' && (
                                            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs font-medium">
                                                <CheckCircle2 className="w-3 h-3" /> Eligible
                                            </span>
                                        )}
                                        {emp.status === 'Not Eligible' && (
                                            <span className="inline-flex flex-col items-center gap-1 text-[#8899AA] bg-[#1A2A3A] px-2 py-1 rounded text-xs font-medium">
                                                <span>Not Eligible</span>
                                                <span className="text-[10px] uppercase tracking-wider">{emp.reason}</span>
                                            </span>
                                        )}
                                        {emp.status === 'Blocked' && (
                                            <span className="inline-flex flex-col items-center gap-1 text-pink-400 bg-pink-500/10 px-2 py-1 rounded text-xs font-medium">
                                                <span className="flex items-center gap-1"><XCircle className="w-3 h-3" /> Auto-Blocked</span>
                                                <span className="text-[10px] uppercase tracking-wider">{emp.reason}</span>
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-center">
                                        <button className="text-xs text-[#8899AA] hover:text-white underline">Override</button>
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
