"use client";
import React from "react";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    DollarSign, PieChart as PieChartIcon, TrendingUp, Download, ArrowUpRight, ArrowDownRight, CreditCard
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from 'recharts';

const BUDGET_USAGE = [
    { dept: 'Engineering', budget: 150000, used: 125000 },
    { dept: 'Sales', budget: 80000, used: 75000 },
    { dept: 'Marketing', budget: 60000, used: 30000 },
    { dept: 'Product', budget: 75000, used: 45000 },
    { dept: 'HR & Ops', budget: 40000, used: 35000 },
];

const SPEND_BREAKDOWN = [
    { name: 'External Courses (Udemy, Coursera)', value: 45 },
    { name: 'Certifications (AWS, GCP)', value: 25 },
    { name: 'Conferences & Events', value: 20 },
    { name: 'Internal Tools & Content', value: 10 },
];

const COLORS = ['#33E6FF', '#00E5A0', '#FFB020', '#9D00FF'];

export default function TrainingBudgetScreen() {
    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <DollarSign size={28} className="text-[#00E5A0]" /> Training Budget & Spend
                    </h1>
                    <p className="text-[#8899AA]">Track L&D budget allocation, utilization by department, and cost per employee.</p>
                </div>
                <button className="px-5 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                    <Download size={18} className="text-[#33E6FF]" /> Export CSV
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-[#33E6FF]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <p className="text-sm font-semibold text-[#8899AA] mb-2">Total L&D Budget (FY25)</p>
                    <h3 className="text-3xl font-extrabold text-white mb-4">$405,000</h3>
                    <div className="w-full bg-[#1A2A3A] rounded-full h-1.5 mb-2">
                        <div className="bg-[#33E6FF] h-1.5 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <p className="text-xs text-[#8899AA]">76% allocated across departments</p>
                </div>

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-[#FF4444]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <p className="text-sm font-semibold text-[#8899AA] mb-2">Total Spend YTD</p>
                    <h3 className="text-3xl font-extrabold text-white mb-4">$310,000</h3>
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/20">
                        <ArrowUpRight size={14} /> +14% vs Last YTD
                    </span>
                </div>

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-[#00E5A0]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <p className="text-sm font-semibold text-[#8899AA] mb-2">Avg Cost per Learner</p>
                    <h3 className="text-3xl font-extrabold text-white mb-4">$645</h3>
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20">
                        <ArrowDownRight size={14} /> -5% vs Last Year
                    </span>
                </div>

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-center">
                    <button className="flex items-center justify-between w-full p-4 bg-[#152336] hover:bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl transition-colors group">
                        <div className="flex flex-col text-left">
                            <span className="text-white font-bold mb-1">Manage Budget Allocation</span>
                            <span className="text-xs text-[#8899AA]">Adjust limits & approvals</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#33E6FF]/10 text-[#33E6FF] flex items-center justify-center group-hover:bg-[#33E6FF] group-hover:text-[#0A1420] transition-colors">
                            <CreditCard size={18} />
                        </div>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Usage by Department */}
                <div className="lg:col-span-2 bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Budget vs Used by Department</h2>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#33E6FF]"></span> Used</div>
                            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#1A2A3A] border border-[#2A3A4A]"></span> Remaining Budget</div>
                        </div>
                    </div>

                    <div className="h-80 w-full">
                        <ChartWrapper height="h-full">
                            <BarChart data={BUDGET_USAGE} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                <XAxis dataKey="dept" stroke="#8899AA" axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#8899AA" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#0A1420', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                    cursor={{ fill: '#1A2A3A', opacity: 0.4 }}
                                    formatter={(value: any) => value ? `$${value.toLocaleString()}` : ''}
                                />
                                <Bar dataKey="used" name="Used" stackId="a" fill="#33E6FF" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="budget" name="Total Budget" stackId="a" fill="#1A2A3A" stroke="#2A3A4A" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Spend Categories */}
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl flex flex-col">
                    <h2 className="text-xl font-bold text-white mb-2">Spend Distribution</h2>
                    <p className="text-sm text-[#8899AA] mb-6">Breakdown of YTD expenses by category.</p>

                    <div className="h-64 relative mb-6">
                        <ChartWrapper height="h-full">
                            <PieChart>
                                <Pie data={SPEND_BREAKDOWN} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                                    {SPEND_BREAKDOWN.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#0A1420', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                    formatter={(value) => `${value}%`}
                                />
                            </PieChart>
                        </ChartWrapper>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                            <PieChartIcon size={24} className="text-[#8899AA] mb-1" />
                            <span className="text-xl font-bold text-white">YTD</span>
                        </div>
                    </div>

                    <div className="space-y-3 mt-auto">
                        {SPEND_BREAKDOWN.map((cat, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                                    <span className="text-white font-medium">{cat.name}</span>
                                </div>
                                <span className="text-[#8899AA] font-bold">{cat.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
