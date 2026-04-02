"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    Briefcase, ChevronRight, Download, PieChart
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const MANPOWER_DATA = [
    { grade: 'L1 (Entry)', budgeted: 150, actual: 140 },
    { grade: 'L2 (Mid)', budgeted: 100, actual: 105 },
    { grade: 'L3 (Senior)', budgeted: 40, actual: 38 },
    { grade: 'L4 (Lead)', budgeted: 15, actual: 15 },
    { grade: 'L5 (Exec)', budgeted: 5, actual: 5 },
];

export default function ManpowerReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Manpower Planning</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-amber-500" />
                        Manpower vs Budget
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Compare actual headcount against approved Annual Operating Plan (AOP).</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* AOP Summary */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-8">
                    <div>
                        <p className="text-[#8899AA] text-sm mb-1">AOP Budget (FY26)</p>
                        <p className="text-3xl font-bold text-white">310</p>
                    </div>
                    <div className="w-px h-12 bg-[#2A3A4A]"></div>
                    <div>
                        <p className="text-[#8899AA] text-sm mb-1">Actual Headcount</p>
                        <p className="text-3xl font-bold text-indigo-400">303</p>
                    </div>
                    <div className="w-px h-12 bg-[#2A3A4A]"></div>
                    <div>
                        <p className="text-[#8899AA] text-sm mb-1">Variance</p>
                        <p className="text-3xl font-bold text-emerald-400">-7 (Under)</p>
                    </div>
                </div>
                <div className="text-right mt-4 md:mt-0">
                    <p className="text-sm text-[#8899AA] mb-1">Remaining Budget Utilisation</p>
                    <div className="text-xl font-bold text-amber-500">97.7%</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Grade wise variance */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Budget vs Actual by Level</h2>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <BarChart data={MANPOWER_DATA} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="grade" stroke="#8899AA" fontSize={12} />
                                <YAxis stroke="#8899AA" fontSize={12} />
                                <Tooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Bar dataKey="budgeted" name="Budgeted AOP" fill="#1A2A3A" stroke="#8899AA" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="actual" name="Actual Filled" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A]">
                        <h2 className="text-sm font-bold text-white">Department Variance Grid</h2>
                    </div>
                    <div className="overflow-y-auto flex-1">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs sticky top-0">
                                <tr>
                                    <th className="p-4 font-medium">Department</th>
                                    <th className="p-4 font-medium text-center">Budget</th>
                                    <th className="p-4 font-medium text-center">Actual</th>
                                    <th className="p-4 font-medium text-center">Variance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                <tr className="hover:bg-[#1A2A3A]/30">
                                    <td className="p-4 text-white">Engineering</td>
                                    <td className="p-4 text-center text-[#8899AA]">150</td>
                                    <td className="p-4 text-center text-white font-medium">145</td>
                                    <td className="p-4 text-center text-emerald-400">-5</td>
                                </tr>
                                <tr className="hover:bg-[#1A2A3A]/30">
                                    <td className="p-4 text-white">Sales</td>
                                    <td className="p-4 text-center text-[#8899AA]">80</td>
                                    <td className="p-4 text-center text-white font-medium">85</td>
                                    <td className="p-4 text-center text-pink-400">+5 (Over)</td>
                                </tr>
                                <tr className="hover:bg-[#1A2A3A]/30">
                                    <td className="p-4 text-white">HR & Admin</td>
                                    <td className="p-4 text-center text-[#8899AA]">15</td>
                                    <td className="p-4 text-center text-white font-medium">15</td>
                                    <td className="p-4 text-center text-[#8899AA]">0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
