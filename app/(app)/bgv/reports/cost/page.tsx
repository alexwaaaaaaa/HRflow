"use client";

import React from 'react';
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    FileBarChart, Download, Building, DollarSign, PieChart as PieChartIcon, ArrowUpRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const MONTHLY_COST = [
    { name: 'Jan', FirstAdvantage: 45000, Checkr: 20000 },
    { name: 'Feb', FirstAdvantage: 52000, Checkr: 25000 },
    { name: 'Mar', FirstAdvantage: 68000, Checkr: 30000 },
    { name: 'Apr', FirstAdvantage: 74000, Checkr: 35000 },
    { name: 'May', FirstAdvantage: 85000, Checkr: 45000 },
    { name: 'Jun', FirstAdvantage: 92000, Checkr: 42000 },
];

const PACKAGES_COST = [
    { name: 'Standard', value: 340000, color: '#0066FF' },
    { name: 'Comprehensive', value: 210000, color: '#00E5A0' },
    { name: 'Executive', value: 65000, color: '#8899AA' },
];

export default function BGVCostReportScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <DollarSign className="text-emerald-500" size={28} />
                            BGV Cost Analysis
                        </h1>
                        <p className="text-sm text-[#8899AA]">Track background verification spending across vendors and packages.</p>
                    </div>
                    <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white shadow-sm">
                        <Download size={16} className="mr-2" /> Export Financial Report
                    </button>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 shadow-lg">
                        <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-2">Total Spend (YTD)</div>
                        <div className="text-3xl font-black text-white mb-2">₹6,15,000</div>
                        <div className="text-sm text-rose-500 flex items-center gap-1">
                            <ArrowUpRight size={16} /> 15% higher than last year
                        </div>
                    </div>
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 shadow-lg">
                        <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-2">Avg Cost / Hire</div>
                        <div className="text-3xl font-black text-white mb-2">₹2,840</div>
                        <div className="text-sm text-[#00E5A0] flex items-center gap-1">
                            Optimized within budget
                        </div>
                    </div>
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 shadow-lg">
                        <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-2">Primary Vendor Share</div>
                        <div className="text-3xl font-black text-white mb-2">68%</div>
                        <div className="text-sm text-[#556677] flex items-center gap-1">
                            FirstAdvantage
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cost by Vendor Bar Chart */}
                    <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                                <Building size={16} className="text-[#0066FF]" /> Monthly Spend by Vendor
                            </h3>
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-xs text-white px-3 py-1.5 rounded-lg outline-none focus:border-[#0066FF]">
                                <option>2024</option>
                                <option>2023</option>
                            </select>
                        </div>
                        <div className="h-64">
                            <ChartWrapper height="h-full">
                                <BarChart data={MONTHLY_COST} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="name" stroke="#556677" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#556677" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ fill: '#1A2A3A', opacity: 0.4 }}
                                        formatter={(value: any) => `₹${value.toLocaleString()}`}
                                    />
                                    <Legend wrapperStyle={{ fontSize: 12, color: '#8899AA' }} />
                                    <Bar dataKey="FirstAdvantage" stackId="a" fill="#0066FF" radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="Checkr" stackId="a" fill="#00E5A0" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </div>

                    {/* Spend by Package */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 shadow-lg flex flex-col">
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                            <PieChartIcon size={16} className="text-[#00E5A0]" /> Spend by Package Type
                        </h3>
                        <div className="flex-1 min-h-[200px] relative mt-2">
                            <ChartWrapper height="h-full">
                                <PieChart>
                                    <Pie
                                        data={PACKAGES_COST}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {PACKAGES_COST.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                        formatter={(value: any) => `₹${value.toLocaleString()}`}
                                    />
                                </PieChart>
                            </ChartWrapper>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                <span className="text-2xl font-black text-white">YTD</span>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {PACKAGES_COST.map((pkg, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pkg.color }}></div>
                                        <span className="text-[#8899AA]">{pkg.name}</span>
                                    </div>
                                    <span className="font-bold text-white">₹{pkg.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
