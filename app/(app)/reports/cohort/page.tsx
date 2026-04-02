"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Layers, ChevronRight, Download, Filter
} from "lucide-react";

const COHORT_DATA = [
    { cohort: "2025-Q1", m0: 100, m1: 98, m2: 95, m3: 92, m4: 89, m5: 88, m6: 85 },
    { cohort: "2025-Q2", m0: 100, m1: 99, m2: 97, m3: 94, m4: 88, m5: 86, m6: null },
    { cohort: "2025-Q3", m0: 100, m1: 95, m2: 90, m3: 85, m4: 84, m5: null, m6: null },
    { cohort: "2025-Q4", m0: 100, m1: 98, m2: 96, m3: 95, m4: null, m5: null, m6: null },
    { cohort: "2026-Q1", m0: 100, m1: 99, m2: 98, m3: null, m4: null, m5: null, m6: null },
];

export default function CohortAnalysisScreen() {

    // Helper to determine cell color based on retention rate
    const getColorClass = (val: number | null) => {
        if (val === null) return "bg-[#0B1221]";
        if (val >= 95) return "bg-indigo-500/80 text-white font-bold";
        if (val >= 90) return "bg-indigo-500/50 text-white font-medium";
        if (val >= 85) return "bg-indigo-500/30 text-white";
        if (val >= 80) return "bg-amber-500/40 text-white";
        return "bg-pink-500/40 text-white";
    };

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Cohort Analysis</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <Layers className="w-6 h-6 text-indigo-400" />
                        </div>
                        Employee Retention Cohorts
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Track long-term retention trends by grouping employees based on their joining date.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <Filter className="w-4 h-4" /> Filter by Dept
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Download className="w-4 h-4" /> Export Grid
                    </button>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                    <h2 className="text-sm font-bold text-white">Retention by Joining Quarter (Months Elapsed)</h2>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1 text-xs text-[#8899AA]"><div className="w-3 h-3 rounded bg-indigo-500/80"></div> &gt;95%</span>
                        <span className="flex items-center gap-1 text-xs text-[#8899AA]"><div className="w-3 h-3 rounded bg-indigo-500/40"></div> 85-94%</span>
                        <span className="flex items-center gap-1 text-xs text-[#8899AA]"><div className="w-3 h-3 rounded bg-amber-500/40"></div> 80-84%</span>
                        <span className="flex items-center gap-1 text-xs text-[#8899AA]"><div className="w-3 h-3 rounded bg-pink-500/40"></div> &lt;80%</span>
                    </div>
                </div>

                <div className="overflow-x-auto p-6">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr>
                                <th className="p-3 text-left font-semibold text-[#8899AA] text-sm border-b border-[#2A3A4A] w-32">Cohort</th>
                                <th className="p-3 font-semibold text-[#8899AA] text-xs border-b border-[#2A3A4A] w-16">Size</th>
                                <th className="p-3 font-semibold text-[#8899AA] text-sm border-b border-[#2A3A4A] w-20">M0</th>
                                <th className="p-3 font-semibold text-[#8899AA] text-sm border-b border-[#2A3A4A] w-20">M1</th>
                                <th className="p-3 font-semibold text-[#8899AA] text-sm border-b border-[#2A3A4A] w-20">M2</th>
                                <th className="p-3 font-semibold text-[#8899AA] text-sm border-b border-[#2A3A4A] w-20">M3</th>
                                <th className="p-3 font-semibold text-[#8899AA] text-sm border-b border-[#2A3A4A] w-20">M4</th>
                                <th className="p-3 font-semibold text-[#8899AA] text-sm border-b border-[#2A3A4A] w-20">M5</th>
                                <th className="p-3 font-semibold text-[#8899AA] text-sm border-b border-[#2A3A4A] w-20">M6</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COHORT_DATA.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="p-3 text-left font-bold text-white border-b border-[#1A2A3A] bg-[#0D1928]">{row.cohort}</td>
                                    <td className="p-3 text-sm text-[#8899AA] border-b border-[#1A2A3A] bg-[#0D1928]">45</td>
                                    <td className={`p-3 m-1 border-b-4 border-white border-opacity-10 text-sm ${getColorClass(row.m0)}`}>{row.m0 ? `${row.m0}%` : ''}</td>
                                    <td className={`p-3 m-1 border-b-4 border-white border-opacity-10 text-sm ${getColorClass(row.m1)}`}>{row.m1 ? `${row.m1}%` : ''}</td>
                                    <td className={`p-3 m-1 border-b-4 border-white border-opacity-10 text-sm ${getColorClass(row.m2)}`}>{row.m2 ? `${row.m2}%` : ''}</td>
                                    <td className={`p-3 m-1 border-b-4 border-white border-opacity-10 text-sm ${getColorClass(row.m3)}`}>{row.m3 ? `${row.m3}%` : ''}</td>
                                    <td className={`p-3 m-1 border-b-4 border-white border-opacity-10 text-sm ${getColorClass(row.m4)}`}>{row.m4 ? `${row.m4}%` : ''}</td>
                                    <td className={`p-3 m-1 border-b-4 border-white border-opacity-10 text-sm ${getColorClass(row.m5)}`}>{row.m5 ? `${row.m5}%` : ''}</td>
                                    <td className={`p-3 m-1 border-b-4 border-white border-opacity-10 text-sm ${getColorClass(row.m6)}`}>{row.m6 ? `${row.m6}%` : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 p-6 bg-[#1A2A3A]/20 border border-[#1A2A3A] rounded-2xl">
                <h3 className="text-white font-bold mb-2">Insight: Q3-2025 Anomaly</h3>
                <p className="text-sm text-[#8899AA]">The cohort joining in Q3-2025 experienced a sharper drop-off by Month 3 (85% retention) compared to historical averages. Investigating exit interviews from this cohort indicates dissatisfaction with the restructured onboarding program rolled out during that period.</p>
            </div>

        </div>
    );
}
