"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    Calculator, ChevronRight, Download, RefreshCw, Layers
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const VARIANCE_DATA = [
    { component: 'Basic Pay', prev: 2800000, current: 3100000 },
    { component: 'HRA', prev: 1400000, current: 1550000 },
    { component: 'Variable Bonus', prev: 0, current: 850000 },
    { component: 'Leave Encashment', prev: 45000, current: 0 },
    { component: 'EPF Employer', prev: 312000, current: 345000 },
];

export default function PayrollMISDeepDiveScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/reports/payroll-mis" className="hover:text-white transition-colors">Payroll MIS</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Deep Dive</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Calculator className="w-8 h-8 text-indigo-400" />
                        Payroll Variance & Deep Dive
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Component-level month-on-month variance analysis.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] border border-[#2A3A4A] hover:bg-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <RefreshCw className="w-4 h-4" /> Recalculate
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Download className="w-4 h-4" /> Export Variance
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#1A2A3A] text-[#8899AA] text-[10px] px-3 py-1 rounded-bl-lg">Prev vs Curr</div>
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Total Net Variance</h3>
                    <div className="text-3xl font-bold mb-1 text-pink-400">+₹11.2 L</div>
                    <p className="text-xs text-[#8899AA] mt-1">Primarily driven by Variable Bonus payouts</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">New Joinee Impact</h3>
                    <div className="text-3xl font-bold mb-1 text-emerald-400">+₹2.8 L</div>
                    <p className="text-xs text-[#8899AA] mt-1">7 new additions to payroll</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Exit Impact</h3>
                    <div className="text-3xl font-bold mb-1 text-indigo-400">-₹1.4 L</div>
                    <p className="text-xs text-[#8899AA] mt-1">3 FnF settlements processed</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Variance Chart */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Component Level MoM Change</h2>
                    <div className="h-[350px] w-full">
                        <ChartWrapper height="h-full">
                            <BarChart data={VARIANCE_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="component" stroke="#8899AA" fontSize={11} angle={-30} textAnchor="end" />
                                <YAxis stroke="#8899AA" fontSize={12} tickFormatter={(value) => `₹${value / 100000}L`} />
                                <Tooltip formatter={(value: any) => `₹${(value / 100000).toFixed(2)} Lakhs`} cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="prev" name="Feb 2026" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="current" name="Mar 2026" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A] flex items-center gap-2">
                        <Layers className="w-5 h-5 text-indigo-400" />
                        <h2 className="text-base font-bold text-white">Variance Explanation Log</h2>
                    </div>
                    <div className="overflow-y-auto flex-1 p-4 space-y-4">

                        <div className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl relative">
                            <div className="absolute top-4 right-4 text-emerald-400 font-bold">+₹8.5L</div>
                            <h3 className="text-white font-bold mb-1">Variable Bonus Distribution</h3>
                            <p className="text-sm text-[#8899AA] mb-3">Annual performance bonus credited to eligible employees in Sales & Marketing.</p>
                            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded uppercase tracking-wider">Earnings Component</span>
                        </div>

                        <div className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl relative">
                            <div className="absolute top-4 right-4 text-emerald-400 font-bold">+₹3.0L</div>
                            <h3 className="text-white font-bold mb-1">New Joinee Basic & HRA</h3>
                            <p className="text-sm text-[#8899AA] mb-3">Impact of 7 new mid-to-senior level joiners across Engineering.</p>
                            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded uppercase tracking-wider">Earnings Component</span>
                        </div>

                        <div className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl relative">
                            <div className="absolute top-4 right-4 text-pink-400 font-bold">-₹0.45L</div>
                            <h3 className="text-white font-bold mb-1">Leave Encashment (Zeroed)</h3>
                            <p className="text-sm text-[#8899AA] mb-3">One-time leave encashment was processed in Feb, not applicable in March.</p>
                            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded uppercase tracking-wider">Earnings Component</span>
                        </div>

                        <div className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl relative">
                            <div className="absolute top-4 right-4 text-amber-500 font-bold">+₹0.33L</div>
                            <h3 className="text-white font-bold mb-1">EPF Increase</h3>
                            <p className="text-sm text-[#8899AA] mb-3">Directly correlates with the increase in Basic Pay due to new joiners.</p>
                            <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded uppercase tracking-wider">Deduction Component</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
