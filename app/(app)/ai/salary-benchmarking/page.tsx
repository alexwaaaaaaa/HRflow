"use client";

import React, { useState } from 'react';
import { Sparkles, TrendingUp, IndianRupee, Target, Activity, Search, Filter, LineChart as LineChartIcon, ArrowRight, TrendingDown, BarChart3 } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell, LineChart, Line } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

const bandData = [
    { percentile: '10th', val: 18 }, { percentile: '25th', val: 24 },
    { percentile: '50th (Median)', val: 32 }, { percentile: '75th', val: 45 },
    { percentile: '90th', val: 56 },
];

export default function SalaryBenchmarkingPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <IndianRupee size={28} className="text-green-400" /> AI Salary Benchmarking
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Real-time market compensation analysis powered by external APIs and Kaarya's proprietary offer-acceptance data model.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-green-500/50 transition-colors w-64">
                        <Search size={16} className="text-[#8899AA]" />
                        <input type="text" placeholder="Search titles (e.g. SDE II)..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" defaultValue="Senior Product Manager" />
                    </div>
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Filter size={16} className="mr-2" /> Tier-1 Cities
                    </Button>
                </div>
            </div>

            {/* Smart Summary */}
            <div className="bg-gradient-to-r from-[#0D1928] to-[#131B2B] border border-green-500/20 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg shadow-green-900/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-green-500/20 p-3 rounded-xl border border-green-500/30 shrink-0">
                        <Sparkles size={24} className="text-green-400" />
                    </div>
                    <div className="flex-1 w-full flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">Compensation Insight: Senior Product Manager</h3>
                            <p className="text-[#8899AA] text-sm leading-relaxed mb-4">
                                The current market median (50th percentile) for <strong className="text-white">Senior Product Managers</strong> in Tier-1 Indian tech hubs has shifted to <strong className="text-green-400">₹32L</strong> base salary (+12% YoY). Your company average for this role is currently <strong className="text-red-400">₹27.5L</strong>, placing you in the 35th percentile and creating significant attrition risk.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                                    <TrendingUp size={14} /> Market +12% YoY
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                                    <TrendingDown size={14} /> Internal Gap -14%
                                </span>
                            </div>
                        </div>
                        {/* Internal vs Market dial */}
                        <div className="md:w-64 bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4 flex flex-col justify-center shrink-0">
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-2 font-semibold text-center">Your Comp-Ratio</div>
                            <div className="text-4xl font-black text-center text-red-400 mb-1">0.86</div>
                            <div className="text-xs text-[#445566] text-center mb-3">Target: 1.0 (Median)</div>
                            <div className="w-full h-2 bg-[#1A2A3A] rounded-full relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 bg-red-500 w-[43%] rounded-full"></div>
                                <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-[#445566]"></div> {/* Median Marker */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Distribution Chart */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white font-semibold">Compensation Distribution Bands</h3>
                            <p className="text-[#8899AA] text-xs mt-1">Base Salary in ₹ Lakhs (excluding ESOP/Bonus)</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span> Market Data
                            </span>
                        </div>
                    </div>
                    <div className="h-[280px] w-full mt-4 relative">
                        {/* Overlay marking internal average */}
                        <div className="absolute left-[35%] top-0 bottom-6 w-0.5 bg-red-500/50 border-r border-dashed border-red-500 z-10 flex flex-col items-center">
                            <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow mt-2 whitespace-nowrap">Your Avg: ₹27.5L</div>
                        </div>

                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <AreaChart data={bandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                    <XAxis dataKey="percentile" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}L`} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px', color: '#fff' }}
                                        formatter={(val: any) => [`₹${val}L`, 'Base Salary']}
                                    />
                                    <Area type="monotone" dataKey="val" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorGreen)" />
                                </AreaChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>

                {/* Risk Identification */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">Flight Risk Detection</h3>
                    <p className="text-[#8899AA] text-xs">Employees in this role whose compensation falls below the 25th percentile market threshold.</p>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 mt-2 border-t border-[#1A2A3A] pt-4">
                        {[
                            { name: 'Kavya Singh', current: '₹22L', diff: '-31%' },
                            { name: 'Rohan Mehta', current: '₹23.5L', diff: '-26%' },
                            { name: 'Aditi Sharma', current: '₹24L', diff: '-25%' },
                        ].map((emp, i) => (
                            <div key={i} className="bg-[#131B2B] p-3 rounded-xl border border-red-500/20 flex justify-between items-center group cursor-pointer hover:border-red-500/50 transition-colors">
                                <div>
                                    <span className="text-white text-sm font-medium group-hover:text-red-400 transition-colors block">{emp.name}</span>
                                    <span className="text-[#8899AA] text-xs font-mono">{emp.current}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-red-400 text-xs font-bold bg-red-500/10 px-2 py-0.5 rounded">{emp.diff}</span>
                                    <span className="text-[10px] text-[#445566] block mt-1">vs Median</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button className="w-full bg-[#1A2A3A] border-[#2A3A4A] text-white py-2 h-auto mt-2">
                        View All 8 At-Risk Employees
                    </Button>
                </div>
            </div>

            {/* Prescriptive Models */}
            <h3 className="text-lg font-semibold text-white mb-4">Correction Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-[#0D1928] border border-green-500/30 p-5 rounded-2xl hover:bg-[#131B2B] transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-green-500/20 p-2.5 rounded-xl text-green-400 shrink-0">
                            <Target size={20} />
                        </div>
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-medium text-sm">Targeted Mid-Cycle Correction</h4>
                                <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Optimal ROI</span>
                            </div>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                                Allocate a budget of <strong className="text-white">₹38L</strong> to correct the poorest 8 salaries up to the 25th percentile. Kaarya predicts this will reduce turnover risk in this cohort by 64% with minimal overall budget impact.
                            </p>
                            <Button className="bg-green-600 hover:bg-green-500 text-white border-none text-xs py-1.5 px-4 h-auto">
                                Generate Payroll Draft
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl hover:bg-[#131B2B] transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-[#1A2A3A] p-2.5 rounded-xl text-[#8899AA] shrink-0 border border-[#2A3A4A]">
                            <BarChart3 size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-medium text-sm mb-2">Adjust Offer Bands</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                                For the 3 open requisitions for Senior PM, Kaarya recommends adjusting the approval band from [₹25L-₹32L] to <strong className="text-white">[₹28L-₹35L]</strong> to improve offer acceptance rate to ~80%.
                            </p>
                            <Button variant="secondary" className="border-[#2A3A4A] text-white text-xs py-1.5 px-4 h-auto">
                                Update ATS Settings
                            </Button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
