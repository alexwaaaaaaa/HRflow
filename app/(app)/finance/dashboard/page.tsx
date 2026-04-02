"use client";

import React from "react";
import Link from "next/link";
import {
    Wallet, CreditCard, Banknote, ShieldCheck,
    ArrowUpRight, ArrowDownRight, Activity, TrendingUp,
    Download, Calendar, Users, Briefcase
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const MONTHLY_TREND = [
    { month: "Jan", ewa: 120000, loans: 450000 },
    { month: "Feb", ewa: 150000, loans: 520000 },
    { month: "Mar", ewa: 180000, loans: 480000 },
    { month: "Apr", ewa: 210000, loans: 610000 },
    { month: "May", ewa: 260000, loans: 590000 },
    { month: "Jun", ewa: 310000, loans: 750000 },
];

const CATEGORY_DISTRIBUTION = [
    { name: "Earned Wage Access", value: 310000, color: "#3B82F6" },
    { name: "Personal Loans", value: 550000, color: "#10B981" },
    { name: "Salary Advances", value: 200000, color: "#F59E0B" },
];

export default function FinanceDashboard() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Finance Dashboard</h1>
                    <p className="text-sm text-[#8899AA] mt-1">Overview of embedded finance operations across the organization</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Calendar className="w-4 h-4" />
                        This Month
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF] opacity-5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-10" />
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                            <ArrowUpRight className="w-3 h-3" /> 12.5%
                        </span>
                    </div>
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total EWA Disbursed</p>
                    <h3 className="text-2xl font-bold text-white">₹3,10,000</h3>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-10" />
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Banknote className="w-5 h-5" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                            <ArrowUpRight className="w-3 h-3" /> 8.2%
                        </span>
                    </div>
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Active Loans Volume</p>
                    <h3 className="text-2xl font-bold text-white">₹7,50,000</h3>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 opacity-5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-10" />
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                            <ArrowUpRight className="w-3 h-3" /> 4.1%
                        </span>
                    </div>
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Insured Employees</p>
                    <h3 className="text-2xl font-bold text-white">458</h3>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-10" />
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <Activity className="w-5 h-5" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-[#8899AA] bg-[#1A2A3A] px-2 py-1 rounded-full">
                            Fair
                        </span>
                    </div>
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Company Credit Score</p>
                    <h3 className="text-2xl font-bold text-white">745</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Trend Chart */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white">Disbursement Trends</h2>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#00E5FF]"></div>
                                <span className="text-[#8899AA]">EWA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#7C3AED]"></div>
                                <span className="text-[#8899AA]">Loans</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-72">
                        <ChartWrapper height="h-full">
                            <AreaChart data={MONTHLY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorEwa" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    itemStyle={{ color: "#fff" }}
                                    formatter={(value: any) => [`₹${value.toLocaleString()}`, ""]}
                                />
                                <Area type="monotone" dataKey="ewa" stroke="#00E5FF" strokeWidth={2} fillOpacity={1} fill="url(#colorEwa)" />
                                <Area type="monotone" dataKey="loans" stroke="#7C3AED" strokeWidth={2} fillOpacity={1} fill="url(#colorLoans)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Financial Products</h2>
                    <div className="h-60 mb-4">
                        <ChartWrapper height="h-full">
                            <BarChart data={CATEGORY_DISTRIBUTION} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} width={110} />
                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`₹${value.toLocaleString()}`, "Amount"]}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                    {CATEGORY_DISTRIBUTION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4">Quick Links & Hubs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/finance/ewa" className="flex items-center gap-4 bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-xl hover:border-[#00E5FF]/50 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] group-hover:scale-110 transition-transform">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">EWA Hub</h3>
                            <p className="text-xs text-[#8899AA]">Manage earned wage limits</p>
                        </div>
                    </Link>
                    <Link href="/finance/loans" className="flex items-center gap-4 bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-xl hover:border-purple-500/50 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                            <Banknote className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Loan Management</h3>
                            <p className="text-xs text-[#8899AA]">Approve and track loans</p>
                        </div>
                    </Link>
                    <Link href="/finance/insurance/marketplace" className="flex items-center gap-4 bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-xl hover:border-pink-500/50 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Insurance Portal</h3>
                            <p className="text-xs text-[#8899AA]">Manage group insurance</p>
                        </div>
                    </Link>
                    <Link href="/finance/score" className="flex items-center gap-4 bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-xl hover:border-emerald-500/50 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Credit Score</h3>
                            <p className="text-xs text-[#8899AA]">View company wellness</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
