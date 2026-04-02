"use client";

import React, { useState } from 'react';
import { Sparkles, TrendingUp, Users, Target, Activity, Search, Filter, Briefcase, PlusCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

const timelineData = [
    { month: 'Jul', actual: 45, predicted: 42 }, { month: 'Aug', actual: 52, predicted: 48 },
    { month: 'Sep', actual: 48, predicted: 50 }, { month: 'Oct', actual: 0, predicted: 55 },
    { month: 'Nov', actual: 0, predicted: 62 }, { month: 'Dec', actual: 0, predicted: 45 },
];

export default function HiringPredictionPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Briefcase size={28} className="text-blue-400" /> Hiring Velocity Prediction
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        AI-driven forecasting for time-to-fill, candidate drop-off probabilities, and optimal sourcing channels based on historical ATS data.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Filter size={16} className="mr-2" /> Adjust Model Parameters
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white border-none">
                        <PlusCircle size={16} className="mr-2" /> New Req Forecast
                    </Button>
                </div>
            </div>

            {/* Smart Summary */}
            <div className="bg-gradient-to-r from-[#0D1928] to-[#131B2B] border border-blue-500/20 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30 shrink-0">
                        <Sparkles size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Kaarya Talent Synthesis</h3>
                        <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-3xl">
                            Predicted Time-to-Fill for <strong className="text-white">Senior Engineering roles</strong> has increased by 14 days over the next quarter due to market supply constraints. However, shifting sourcing budget (+20%) to GitHub/StackOverflow outreach is forecasted to offset this delay.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-medium border border-amber-500/20">
                                <TrendingUp size={14} /> Eng TTF +14 Days
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                <Target size={14} /> Optimal: Tech Communities
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Main Trend Chart */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white font-semibold">Requirement Fulfillment Forecast</h3>
                            <p className="text-[#8899AA] text-xs mt-1">Expected vs Actual hiring volume</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span> Predicted
                            </span>
                            <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                                <span className="w-3 h-3 rounded-full bg-[#1A2A3A] border border-[#2A3A4A]"></span> Actual
                            </span>
                        </div>
                    </div>
                    <div className="h-[280px] w-full mt-4">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                    <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPred)" name="AI Forecast" />
                                    <Area type="monotone" dataKey="actual" stroke="#445566" strokeWidth={2} fillOpacity={0} name="Actual Hires" />
                                </AreaChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>

                {/* KPI Breakdown */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="text-white font-semibold mb-2">Quarterly Outlook Metrics</h3>

                    <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                        <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">Avg Time-to-Fill</div>
                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-bold text-white">42 <span className="text-sm font-normal text-[#8899AA]">Days</span></span>
                            <span className="text-red-400 text-xs font-semibold mb-1.5 flex items-center">+4 Days</span>
                        </div>
                    </div>

                    <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                        <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">Offer Acceptance Rate</div>
                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-bold text-emerald-400">78%</span>
                            <span className="text-emerald-400 text-xs font-semibold mb-1.5 flex items-center">+2%</span>
                        </div>
                        <p className="text-[10px] text-[#445566] mt-2">Predicted for Q4 based on compensation bands</p>
                    </div>

                    <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                        <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">Pipeline Health</div>
                        <span className="inline-block mt-2 px-3 py-1 bg-amber-500/10 text-amber-500 text-sm font-bold rounded">
                            Strained (Eng / Product)
                        </span>
                    </div>

                </div>
            </div>

            {/* Open Requisitions Table */}
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target size={18} className="text-blue-400" /> Active Requisitions Model
            </h3>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Role / Req ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Predicted TTF</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Bottleneck Risk</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Best Sourcing Channel</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {[
                            { id: 'REQ-102', role: 'Staff Backend Engineer', ttf: 58, risk: 'High', ch: 'Referrals (65%)' },
                            { id: 'REQ-105', role: 'Product Marketing Manager', ttf: 32, risk: 'Low', ch: 'LinkedIn (82%)' },
                            { id: 'REQ-108', role: 'Enterprise Account Exec', ttf: 45, risk: 'Medium', ch: 'Agency / Headhunter (55%)' },
                        ].map((req, i) => (
                            <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{req.role}</div>
                                    <div className="text-xs text-[#8899AA]">{req.id}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-white font-medium">{req.ttf} <span className="text-[#8899AA] font-normal">days</span></td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${req.risk === 'High' ? 'bg-red-500/10 text-red-400' :
                                            req.risk === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-emerald-500/10 text-emerald-400'
                                        }`}>
                                        {req.risk}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{req.ch}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/ai/hiring-prediction/${req.id}`}>
                                        <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-none text-xs py-1.5 px-3 h-auto">
                                            Forecast Details
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
