"use client";

import React, { useState } from 'react';
import { Sparkles, Calendar, TrendingUp, TrendingDown, Users, ArrowLeft, Target, Activity, Clock, FileText, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

const velocityTrend = [
    { week: 'W40', val: 88, target: 90 }, { week: 'W41', val: 92, target: 90 },
    { week: 'W42', val: 85, target: 90 }, { week: 'W43', val: 90, target: 92 },
    { week: 'W44', val: 95, target: 92 }, { week: 'W45', val: 82, target: 92 },
];

const impactData = [
    { subject: 'Code Output', A: 85, fullMark: 100 },
    { subject: 'Code Review', A: 92, fullMark: 100 },
    { subject: 'Documentation', A: 70, fullMark: 100 },
    { subject: 'Incident Response', A: 95, fullMark: 100 },
    { subject: 'Mentorship', A: 60, fullMark: 100 },
    { subject: 'Meeting Load', A: 120, fullMark: 100 }, // Over index = bad
];

export default function TeamProductivityDetail() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Navigation */}
            <div className="mb-8 border-b border-[#1A2A3A] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Link href="/ai/team-productivity" className="flex items-center gap-2 text-[#8899AA] hover:text-white transition-colors w-fit mb-4">
                        <ArrowLeft size={18} />
                        <span className="text-sm font-medium">Back to Team Productivity</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-4">
                        Engineering Department
                        <span className="px-3 py-1 bg-[#1A2A3A] text-[#8899AA] text-sm rounded-lg border border-[#2A3A4A] font-medium">145 Members</span>
                    </h1>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-[#8899AA]">
                        <Calendar size={16} className="mr-2" /> W45 (Current)
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                        Generate Action Plan
                    </Button>
                </div>
            </div>

            {/* Smart Synopsis */}
            <div className="bg-[#0D1928] border border-indigo-500/30 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            <Sparkles size={20} className="text-indigo-400" /> AI Diagnostic: Engineering Velocity Drop
                        </h3>
                        <p className="text-[#8899AA] text-sm leading-relaxed mb-6">
                            Engineering velocity dropped to <strong className="text-white">82 NVI</strong> (-13% WoW). While code output (commits/PRs) remained stable, the bottleneck occurred in the Review & Merge phase. Analysis of calendar/slack data shows a <strong className="text-amber-400">4-hour per capita increase</strong> in cross-functional sync meetings this week related to the Q4 launch, directly cannibalizing deep-work blocks.
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                                <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">NVI Score</div>
                                <div className="text-2xl font-bold text-red-400 flex items-center gap-2">82 <TrendingDown size={18} /></div>
                            </div>
                            <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                                <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">Meeting Load</div>
                                <div className="text-2xl font-bold text-amber-500 flex items-center gap-2">18h <TrendingUp size={18} /></div>
                            </div>
                            <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                                <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">Focus Time</div>
                                <div className="text-2xl font-bold text-red-400">12h <span className="text-sm font-normal text-[#8899AA]">/wk</span></div>
                            </div>
                            <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                                <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">Burnout Risk</div>
                                <div className="text-2xl font-bold text-amber-500">High</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-72 shrink-0 bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 flex flex-col justify-center relative">
                        <div className="text-center mb-2">
                            <h4 className="text-white font-medium text-sm">Impact Distribution</h4>
                            <p className="text-xs text-[#8899AA]">Relative to Historical Benchmarks</p>
                        </div>
                        <div className="h-48 w-full -ml-4">
                            <ClientOnly>
                                <ChartWrapper height="h-full">
                                    <RadarChart cx="50%" cy="50%" outerRadius="60%" data={impactData}>
                                        <PolarGrid stroke="#2A3A4A" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#8899AA', fontSize: 10 }} />
                                        <Radar name="Engineering" dataKey="A" stroke="#818cf8" fill="#818cf8" fillOpacity={0.4} />
                                    </RadarChart>
                                </ChartWrapper>
                            </ClientOnly>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Velocity Trend vs Targets */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white font-semibold">Velocity vs Targets</h3>
                            <p className="text-[#8899AA] text-xs mt-1">NVI trajectory mapping</p>
                        </div>
                    </div>
                    <div className="h-[280px] w-full mt-4">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <AreaChart data={velocityTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                    <XAxis dataKey="week" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Area type="step" dataKey="target" stroke="#445566" strokeWidth={2} fillOpacity={0} strokeDasharray="5 5" name="Target Baseline" />
                                    <Area type="monotone" dataKey="val" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" name="Actual Velocity" />
                                </AreaChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>

                {/* Sub-Team Breakdown */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                    <div className="px-6 py-5 border-b border-[#1A2A3A] shrink-0">
                        <h3 className="text-white font-semibold">Squad Performance Matrix</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0A1420] border-b border-[#1A2A3A] sticky top-0 z-10">
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Squad</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Velocity</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Blocker</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { name: 'Core Platform', vol: 78, change: -15, block: 'Architectural Reviews' },
                                    { name: 'Payment Gateway', vol: 94, change: +2, block: 'None' },
                                    { name: 'Mobile App', vol: 82, change: -10, block: 'QA Bottleneck' },
                                    { name: 'Data Pipeline', vol: 88, change: -5, block: 'Dependency Wait' },
                                ].map((squad, i) => (
                                    <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-white">{squad.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-sm font-bold ${squad.change < 0 ? 'text-red-400' : 'text-emerald-400'}`}>{squad.vol}</span>
                                                <span className="text-xs text-[#8899AA]">({squad.change}%)</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-xs text-[#8899AA] bg-[#1A2A3A] px-2.5 py-1 rounded-md">{squad.block}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Prescriptive Interventions */}
            <h3 className="text-lg font-semibold text-white mb-4">AI Recommended Playbook</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0D1928] border border-indigo-500/30 p-5 rounded-2xl hover:bg-[#131B2B] transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-indigo-500/20 p-2.5 rounded-xl text-indigo-400 shrink-0">
                            <Clock size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-medium text-sm mb-1">Implement "No Meeting Thursdays"</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                                Based on current workloads, reserving Thursdays strictly for deep work will reclaim 280 hours of focus time across the department weekly.
                            </p>
                            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none text-xs py-1.5 px-4 h-auto">
                                Draft Policy Update
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl hover:bg-[#131B2B] transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="bg-[#1A2A3A] p-2.5 rounded-xl text-[#8899AA] shrink-0 border border-[#2A3A4A]">
                            <Target size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-medium text-sm mb-1">Re-balance PR Queues</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                                40% of open Pull Requests are assigned to just 3 Senior Engineers. AI suggests redistributing less critical reviews to mid-level peers to clear the bottleneck.
                            </p>
                            <Button variant="secondary" className="border-[#2A3A4A] text-white text-xs py-1.5 px-4 h-auto">
                                Review Routing Rules
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
