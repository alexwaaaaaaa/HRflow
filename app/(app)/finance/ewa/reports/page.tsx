"use client";

import React from "react";
import Link from "next/link";
import {
    LineChart, PieChart as PieChartIcon, Download, Filter, ChevronRight, BarChart3, TrendingUp
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const MONTHLY_USAGE = [
    { month: "May", amount: 1200000, unique_users: 145 },
    { month: "Jun", amount: 1550000, unique_users: 180 },
    { month: "Jul", amount: 1450000, unique_users: 165 },
    { month: "Aug", amount: 1800000, unique_users: 210 },
    { month: "Sep", amount: 2100000, unique_users: 245 },
    { month: "Oct", amount: 2450000, unique_users: 280 },
];

const USAGE_BY_DEPARTMENT = [
    { name: "Sales", value: 35, color: "#00E5FF" },
    { name: "Support", value: 40, color: "#7C3AED" },
    { name: "Engineering", value: 15, color: "#10B981" },
    { name: "Operations", value: 10, color: "#F59E0B" },
];

export default function EWAReportsScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/ewa" className="hover:text-white transition-colors">EWA</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Reports & Analytics</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <LineChart className="w-8 h-8 text-[#00E5FF]" />
                        EWA Usage Analytics
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Deep dive into adoption rates, withdrawal patterns, and financial impact.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                        H2 2025
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                        <Download className="w-4 h-4" />
                        Download Report
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total Active Users</p>
                    <h3 className="text-2xl font-bold text-white mb-1">280</h3>
                    <p className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                        <TrendingUp className="w-3 h-3" /> 14% vs last month
                    </p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Avg. Withdrawal Amount</p>
                    <h3 className="text-2xl font-bold text-white mb-1">₹8,750</h3>
                    <p className="text-xs text-[#8899AA]">Per transaction</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Avg. Transactions / User</p>
                    <h3 className="text-2xl font-bold text-white mb-1">2.1</h3>
                    <p className="text-xs text-[#8899AA]">Per month</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Fee Revenue Generated</p>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-1">₹1,05,500</h3>
                    <p className="text-xs text-[#8899AA]">YTD via 1% fee model</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Volume Trend */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#8899AA]" />
                        Monthly Disbursement Volume
                    </h2>
                    <div className="h-72">
                        <ChartWrapper height="h-full">
                            <AreaChart data={MONTHLY_USAGE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} tickFormatter={(val) => `₹${val / 100000}L`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`₹${value.toLocaleString()}`, "Amount"]}
                                />
                                <Area type="monotone" dataKey="amount" name="Disbursement" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Usage by Department */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-[#8899AA]" />
                        Adoption by Department
                    </h2>
                    <div className="h-64 relative">
                        <ChartWrapper height="h-full">
                            <PieChart>
                                <Pie
                                    data={USAGE_BY_DEPARTMENT}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {USAGE_BY_DEPARTMENT.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`${value}%`, "Share of Users"]}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#8899AA' }} />
                            </PieChart>
                        </ChartWrapper>
                    </div>
                </div>
            </div>

            {/* Insights Panel */}
            <div className="bg-gradient-to-r from-[#1A2A3A]/40 to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Behavioral Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <div className="text-[#00E5FF] font-medium text-sm mb-1">Peak Withdrawal Days</div>
                        <p className="text-[#8899AA] text-sm">65% of all EWA transactions occur between the 20th and 25th of the month, indicating mid-month liquidity crunches.</p>
                    </div>
                    <div className="border-t md:border-t-0 md:border-l border-[#2A3A4A] pt-4 md:pt-0 md:pl-6">
                        <div className="text-purple-400 font-medium text-sm mb-1">Average Wait Time</div>
                        <p className="text-[#8899AA] text-sm">On average, funds are deposited into employee accounts within 12 seconds of successful IMPS API trigger.</p>
                    </div>
                    <div className="border-t md:border-t-0 md:border-l border-[#2A3A4A] pt-4 md:pt-0 md:pl-6">
                        <div className="text-emerald-400 font-medium text-sm mb-1">Retention Correlation</div>
                        <p className="text-[#8899AA] text-sm">Employees using EWA at least once a quarter have a 22% lower attrition rate compared to non-users in similar roles.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
