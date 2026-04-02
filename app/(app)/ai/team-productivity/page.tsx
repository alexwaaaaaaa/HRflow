"use client";

import React, { useState } from 'react';
import { Sparkles, TrendingUp, TrendingDown, Users, Target, Activity, Search, Filter, Cpu, BarChart2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell, LineChart, Line } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

const productivityTrend = [
    { week: 'W40', eng: 88, sales: 92, ops: 78 }, { week: 'W41', eng: 92, sales: 88, ops: 82 },
    { week: 'W42', eng: 85, sales: 95, ops: 85 }, { week: 'W43', eng: 90, sales: 91, ops: 88 },
    { week: 'W44', eng: 95, sales: 87, ops: 86 }, { week: 'W45', eng: 82, sales: 85, ops: 80 },
];

export default function TeamProductivityPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Cpu size={28} className="text-emerald-400" /> AI Productivity Analytics
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Correlates OKR completion, collaboration metadata, and commit frequency to provide non-invasive team velocity insights.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Filter size={16} className="mr-2" /> Adjust AI Weights
                    </Button>
                </div>
            </div>

            {/* Smart Summary */}
            <div className="bg-gradient-to-r from-[#0D1928] to-[#131B2B] border border-emerald-500/20 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30 shrink-0">
                        <Sparkles size={24} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Kaarya Velocity Synthesis</h3>
                        <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-3xl">
                            Overall company velocity dropped by <strong className="text-red-400">8%</strong> in W45. This correlates strongly with a <strong className="text-amber-400">42% increase in cross-departmental meetings</strong> involving Engineering and Product. Reducing sync meetings by 2 hrs/week could restore velocity targets.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                                <TrendingDown size={14} /> Eng Velocity -14%
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                <TrendingUp size={14} /> Ops Efficiency +5%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Trend */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-white font-semibold">Normalized Velocity Index (NVI)</h3>
                        <p className="text-[#8899AA] text-xs mt-1">Multi-variate index tracking output vs historical baselines</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span> Eng
                        </span>
                        <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                            <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Sales
                        </span>
                        <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                            <span className="w-3 h-3 rounded-full bg-amber-500"></span> Ops
                        </span>
                    </div>
                </div>
                <div className="h-[300px] w-full mt-4">
                    <ClientOnly>
                        <ChartWrapper height="h-full">
                            <LineChart data={productivityTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                <XAxis dataKey="week" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px', color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="eng" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#0D1928', strokeWidth: 2 }} name="Engineering" />
                                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#0D1928', strokeWidth: 2 }} name="Sales" />
                                <Line type="monotone" dataKey="ops" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#0D1928', strokeWidth: 2 }} name="Operations" />
                            </LineChart>
                        </ChartWrapper>
                    </ClientOnly>
                </div>
            </div>

            {/* Team Breakdown Table */}
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users size={18} className="text-[#8899AA]" /> Department Deep Dive
            </h3>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Department</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Current NVI</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">WoW Change</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Friction Point identified by AI</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {[
                            { id: 'eng', dept: 'Engineering', nvi: 82, trend: -13, friction: 'High meeting load (18hrs/wk)' },
                            { id: 'sales', dept: 'Sales', nvi: 85, trend: -2, friction: 'CRM update lag' },
                            { id: 'ops', dept: 'Operations', nvi: 80, trend: -6, friction: 'Cross-timezone blocker' },
                        ].map((team, i) => (
                            <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{team.dept}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 bg-[#1A2A3A] h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-emerald-500 h-full" style={{ width: `${team.nvi}%` }} />
                                        </div>
                                        <span className="text-sm text-white font-medium">{team.nvi}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center gap-1.5 text-xs font-medium ${team.trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {team.trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {Math.abs(team.trend)}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{team.friction}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/ai/team-productivity/${team.id}`}>
                                        <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-none text-xs py-1.5 px-3 h-auto">
                                            Analyze
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
