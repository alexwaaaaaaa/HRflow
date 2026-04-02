"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    UserMinus, ChevronRight, Download, Filter, TrendingDown, AlertTriangle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

const ATTRITION_TREND = [
    { month: 'Oct', rate: 2.1, voluntary: 1.8, involuntary: 0.3 },
    { month: 'Nov', rate: 1.9, voluntary: 1.5, involuntary: 0.4 },
    { month: 'Dec', rate: 2.5, voluntary: 2.1, involuntary: 0.4 },
    { month: 'Jan', rate: 3.2, voluntary: 2.8, involuntary: 0.4 },
    { month: 'Feb', rate: 1.5, voluntary: 1.2, involuntary: 0.3 },
    { month: 'Mar', rate: 1.8, voluntary: 1.6, involuntary: 0.2 },
];

const REASONS = [
    { reason: 'Better Compensation', count: 42 },
    { reason: 'Career Growth', count: 28 },
    { reason: 'Relocation/Personal', count: 15 },
    { reason: 'Work-Life Balance', count: 12 },
    { reason: 'Involuntary', count: 14 },
];

export default function AttritionReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Attrition Report</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <UserMinus className="w-8 h-8 text-pink-500" />
                        Attrition Analysis
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Track turnover rates, identify flight risks, and analyze exit reasons.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <Filter className="w-4 h-4" /> LTM (Last 12 Months)
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Annualized Attrition", value: "18.4%", info: "+2.1% v/s benchmark", color: "text-pink-400" },
                    { label: "Voluntary Turnovers", value: "97", info: "LTM Period", color: "text-white" },
                    { label: "Regretted Attrition", value: "34", info: "Top performers lost", color: "text-amber-500" },
                    { label: "Early Attrition (<6mo)", value: "12%", info: "Of total exits", color: "text-pink-400" }
                ].map((kpi, idx) => (
                    <div key={idx} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-[#8899AA] text-sm font-medium mb-2">{kpi.label}</h3>
                        <div className={`text-3xl font-bold mb-1 ${kpi.color}`}>{kpi.value}</div>
                        <p className="text-xs text-[#8899AA]">{kpi.info}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Attrition Trend */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-pink-500" /> Monthly Attrition Rate (%)
                    </h2>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <AreaChart data={ATTRITION_TREND} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" stroke="#8899AA" fontSize={12} />
                                <YAxis stroke="#8899AA" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="rate" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Exit Reasons */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Top Exit Reasons (Voluntary)</h2>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <BarChart data={REASONS} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                <XAxis type="number" stroke="#8899AA" fontSize={12} />
                                <YAxis dataKey="reason" type="category" stroke="#8899AA" fontSize={12} width={120} />
                                <Tooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Risk Insights */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                    <h2 className="text-sm font-bold text-amber-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
                        <AlertTriangle className="w-5 h-5" /> High Risk Segments
                    </h2>
                    <div className="space-y-4 text-sm text-[#8899AA]">
                        <p>Our predictive model indicates elevated flight risk in the following groups:</p>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center bg-[#1A2A3A]/40 p-3 rounded-lg border border-[#2A3A4A]">
                                <span className="text-white">Engineering • Mid-level</span>
                                <span className="text-pink-400 font-bold">22% Risk</span>
                            </li>
                            <li className="flex justify-between items-center bg-[#1A2A3A]/40 p-3 rounded-lg border border-[#2A3A4A]">
                                <span className="text-white">Sales • Tenured &gt; 3yrs</span>
                                <span className="text-pink-400 font-bold">18% Risk</span>
                            </li>
                        </ul>
                        <button className="text-amber-500 text-xs font-bold hover:underline mt-2">Run Cohort Retention Strategy &rarr;</button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center">
                        <h2 className="text-sm font-bold text-white">Recent Exits</h2>
                        <a href="/employees?status=exit" className="text-pink-400 text-xs hover:underline">View All Exits</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs">
                                <tr>
                                    <th className="p-4 font-medium">Employee</th>
                                    <th className="p-4 font-medium">Department</th>
                                    <th className="p-4 font-medium">Last Working Day</th>
                                    <th className="p-4 font-medium">Type</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A] text-sm">
                                <tr className="hover:bg-[#1A2A3A]/30">
                                    <td className="p-4 text-white font-medium">Ankit Patel</td>
                                    <td className="p-4 text-[#8899AA]">Engineering</td>
                                    <td className="p-4 text-[#8899AA]">15 Mar 2026</td>
                                    <td className="p-4"><span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[10px] uppercase rounded border border-amber-500/20">Voluntary</span></td>
                                </tr>
                                <tr className="hover:bg-[#1A2A3A]/30">
                                    <td className="p-4 text-white font-medium">Simran Kaur</td>
                                    <td className="p-4 text-[#8899AA]">Marketing</td>
                                    <td className="p-4 text-[#8899AA]">01 Mar 2026</td>
                                    <td className="p-4"><span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[10px] uppercase rounded border border-amber-500/20">Voluntary</span></td>
                                </tr>
                                <tr className="hover:bg-[#1A2A3A]/30">
                                    <td className="p-4 text-white font-medium">David Lee</td>
                                    <td className="p-4 text-[#8899AA]">Sales</td>
                                    <td className="p-4 text-[#8899AA]">28 Feb 2026</td>
                                    <td className="p-4"><span className="px-2 py-1 bg-pink-500/10 text-pink-400 text-[10px] uppercase rounded border border-pink-500/20">Involuntary</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
