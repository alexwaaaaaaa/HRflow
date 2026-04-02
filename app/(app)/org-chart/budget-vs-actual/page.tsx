"use client";

import React from "react";
import Link from "next/link";
import {
    Calculator, ChevronRight, Download, Filter, TrendingDown, TrendingUp
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const BUDGET_DATA = [
    { name: 'Engineering', budget: 45.5, actual: 42.1, variance: 3.4 },
    { name: 'Sales & Rev', budget: 28.2, actual: 30.5, variance: -2.3 },
    { name: 'Marketing', budget: 18.0, actual: 17.5, variance: 0.5 },
    { name: 'Ops & Admin', budget: 12.0, actual: 11.2, variance: 0.8 },
    { name: 'HR & Legal', budget: 15.5, actual: 16.2, variance: -0.7 },
];

export default function BudgetVsActualScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col h-screen overflow-hidden">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Finance</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
                            <Calculator className="w-6 h-6 text-pink-500" />
                        </div>
                        Budget vs Actual
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <select className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2 outline-none focus:border-pink-500">
                        <option>FY 2025-26</option>
                        <option>FY 2024-25</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white rounded-lg transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(236,72,153,0.3)]">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 flex-shrink-0">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Total Org Budget</h3>
                    <div className="text-3xl font-bold text-white mb-2">₹119.2 C</div>
                    <p className="text-xs text-[#8899AA]">Allocated for FY25-26</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Total Actual Spend</h3>
                    <div className="text-3xl font-bold text-white mb-2">₹117.5 C</div>
                    <p className="text-xs text-[#8899AA]">Total YTD payroll cost</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-emerald-400 bg-emerald-500/10 p-2 rounded-xl">
                        <TrendingDown className="w-6 h-6" />
                    </div>
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Net Variance</h3>
                    <div className="text-3xl font-bold text-emerald-400 mb-2">+₹1.7 C</div>
                    <p className="text-xs text-[#8899AA]">Under budget overall</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-pink-500 bg-pink-500/10 p-2 rounded-xl">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Highest Overspend</h3>
                    <div className="text-2xl font-bold text-pink-500 mb-2">Sales</div>
                    <p className="text-xs text-[#8899AA]">Over budget by ₹2.3 Cr</p>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col min-h-0">
                    <h3 className="text-sm font-bold text-white mb-6">Variance by Department</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ChartWrapper height="h-full">
                            <BarChart data={BUDGET_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="name" stroke="#8899AA" fontSize={11} tick={{ fill: '#8899AA' }} />
                                <YAxis stroke="#8899AA" fontSize={11} tickFormatter={(val) => `₹${val}c`} />
                                <Tooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="budget" name="Allocated Budget" fill="#1e293b" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="actual" name="Actual Spend" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col min-h-0 overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                        <h3 className="text-sm font-bold text-white">Department Drill-down</h3>
                    </div>
                    <div className="flex-1 overflow-auto custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-[#1A2A3A]/40 text-[#8899AA] text-xs sticky top-0 z-10">
                                <tr>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A]">Department</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-right">Budget</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-right">Actual</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-right">Variance</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {BUDGET_DATA.map((row, idx) => {
                                    const percent = ((row.actual / row.budget) * 100);
                                    const isOver = row.variance < 0;
                                    return (
                                        <tr key={idx} className="hover:bg-[#1A2A3A]/20 transition-colors">
                                            <td className="p-4 text-sm font-bold text-white">{row.name}</td>
                                            <td className="p-4 text-sm text-[#8899AA] text-right font-mono">₹{row.budget.toFixed(2)}</td>
                                            <td className="p-4 text-sm text-white text-right font-mono">₹{row.actual.toFixed(2)}</td>
                                            <td className={`p-4 text-sm text-right font-mono font-bold ${isOver ? 'text-pink-500' : 'text-emerald-400'}`}>
                                                {isOver ? '-' : '+'}₹{Math.abs(row.variance).toFixed(2)}
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className={`text-[10px] font-bold ${percent > 100 ? 'text-pink-500' : percent > 95 ? 'text-amber-500' : 'text-emerald-400'}`}>
                                                        {percent.toFixed(1)}%
                                                    </span>
                                                    <div className="w-16 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden shrink-0">
                                                        <div
                                                            className={`h-full rounded-full ${percent > 100 ? 'bg-pink-500' : percent > 95 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                                            style={{ width: `${Math.min(percent, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
