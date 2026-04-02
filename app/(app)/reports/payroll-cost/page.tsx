"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    IndianRupee, ChevronRight, Download, Filter, TrendingUp, TrendingDown, Layers
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Legend } from 'recharts';

const COST_TREND = [
    { month: 'Oct', fixed: 85, variable: 12, compliance: 8 },
    { month: 'Nov', fixed: 86, variable: 14, compliance: 8 },
    { month: 'Dec', fixed: 86, variable: 22, compliance: 9 }, // Bonus month
    { month: 'Jan', fixed: 88, variable: 15, compliance: 8.5 },
    { month: 'Feb', fixed: 88, variable: 13, compliance: 8.5 },
    { month: 'Mar', fixed: 92, variable: 14, compliance: 9 }, // Hires + Appraisals
];

const DEPT_COST = [
    { name: 'Engineering', cost: 45 },
    { name: 'Sales', cost: 25 },
    { name: 'Marketing', cost: 12 },
    { name: 'Ops & Support', cost: 18 },
    { name: 'HR & Finance', cost: 10 },
];

export default function PayrollCostReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Payroll Cost</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <IndianRupee className="w-8 h-8 text-emerald-400" />
                        Payroll Cost Analytics
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Analyze fixed vs variable compensation, departmental burn, and statutory costs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <Filter className="w-4 h-4" /> Last 6 Months
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Total Payroll Cost (Mar)</h3>
                    <div className="text-3xl font-bold mb-1 text-white flex items-baseline gap-2">
                        ₹1.15 Cr
                        <span className="text-xs text-pink-400 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 4.2%</span>
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Fixed vs Variable</h3>
                    <div className="text-3xl font-bold mb-1 text-emerald-400">80 : 20</div>
                    <p className="text-xs text-[#8899AA] mt-1">Healthy mix target</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Statutory Contributions</h3>
                    <div className="text-3xl font-bold mb-1 text-amber-500">₹9.0 L</div>
                    <p className="text-xs text-[#8899AA] mt-1">PF, ESI, Gratuity Accruals</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Cost Per Employee (Avg)</h3>
                    <div className="text-3xl font-bold mb-1 text-indigo-400">₹3.8 L</div>
                    <div className="text-xs text-emerald-400 flex items-center mt-1"><TrendingDown className="w-3 h-3 mr-0.5" /> -1.1% from prev qtr</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Cost Trend Analysis */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-indigo-400" /> Cost Composition Trend (in Lakhs)
                    </h2>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <AreaChart data={COST_TREND} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" stroke="#8899AA" fontSize={12} />
                                <YAxis stroke="#8899AA" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                                <Area type="monotone" dataKey="fixed" name="Fixed Pay" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="variable" name="Variable Pay" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="compliance" name="Statutory & Benefits" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Dept Cost */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Departmental Burn (in Lakhs)</h2>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <BarChart data={DEPT_COST} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                <XAxis type="number" stroke="#8899AA" fontSize={12} />
                                <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={12} width={100} />
                                <Tooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Bar dataKey="cost" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={25} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center">
                    <h2 className="text-sm font-bold text-white">Cost Center Breakdown Grid</h2>
                    <select className="bg-[#0B1221] border border-[#2A3A4A] text-[#8899AA] text-xs rounded px-2 py-1">
                        <option>March 2026</option>
                        <option>February 2026</option>
                    </select>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs">
                            <tr>
                                <th className="p-4 font-medium text-left">Cost Center / Sub-Dept</th>
                                <th className="p-4 font-medium">Basic & HRA</th>
                                <th className="p-4 font-medium">Allowances</th>
                                <th className="p-4 font-medium">Variable/Bonus</th>
                                <th className="p-4 font-medium">Employer EPF/ESI</th>
                                <th className="p-4 font-medium text-white font-bold bg-[#1A2A3A]">Total Cost (CTC)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A] text-sm font-mono">
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4 text-left font-sans font-medium text-white">Engineering - Frontend</td>
                                <td className="p-4">₹1,240,000</td>
                                <td className="p-4">₹650,000</td>
                                <td className="p-4">₹120,000</td>
                                <td className="p-4">₹85,000</td>
                                <td className="p-4 text-emerald-400 font-bold bg-[#1A2A3A]/10">₹2,095,000</td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4 text-left font-sans font-medium text-white">Engineering - Backend</td>
                                <td className="p-4">₹1,450,000</td>
                                <td className="p-4">₹720,000</td>
                                <td className="p-4">₹150,000</td>
                                <td className="p-4">₹98,000</td>
                                <td className="p-4 text-emerald-400 font-bold bg-[#1A2A3A]/10">₹2,418,000</td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4 text-left font-sans font-medium text-white">Sales - Enterprise</td>
                                <td className="p-4">₹850,000</td>
                                <td className="p-4">₹320,000</td>
                                <td className="p-4 text-indigo-400 font-bold">₹850,000</td>
                                <td className="p-4">₹65,000</td>
                                <td className="p-4 text-emerald-400 font-bold bg-[#1A2A3A]/10">₹2,085,000</td>
                            </tr>
                        </tbody>
                        <tfoot className="bg-[#1A2A3A]/50 text-white font-bold text-sm font-mono border-t-2 border-[#2A3A4A]">
                            <tr>
                                <td className="p-4 text-left font-sans">Grand Total</td>
                                <td className="p-4">₹3,540,000</td>
                                <td className="p-4">₹1,690,000</td>
                                <td className="p-4">₹1,120,000</td>
                                <td className="p-4">₹248,000</td>
                                <td className="p-4 text-emerald-400 bg-[#1A2A3A]/20">₹6,598,000</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

        </div>
    );
}
