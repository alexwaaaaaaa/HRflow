"use client";

import React, { useState } from 'react';
import { HeartPulse, TrendingDown, Users, Target, Activity, Search, Filter, AlertCircle, Phone, ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

const burnoutData = [
    { month: 'Jun', score: 82 }, { month: 'Jul', score: 78 },
    { month: 'Aug', score: 75 }, { month: 'Sep', score: 68 },
    { month: 'Oct', score: 62 }, { month: 'Nov', score: 58 },
];

const teamData = [
    { subject: 'Workload', A: 45, fullMark: 100 },
    { subject: 'Autonomy', A: 85, fullMark: 100 },
    { subject: 'Recognition', A: 70, fullMark: 100 },
    { subject: 'Peer Support', A: 90, fullMark: 100 },
    { subject: 'Clarity', A: 65, fullMark: 100 },
];

export default function WellnessScoreAIPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <HeartPulse size={28} className="text-rose-400" /> Wellness & Burnout AI
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Privacy-first sentiment analysis derived from Slack/Teams metadata, overtime hours, and PTO utilization to predict systemic burnout risk.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Filter size={16} className="mr-2" /> Global Organization
                    </Button>
                    <Button className="bg-rose-600 hover:bg-rose-500 text-white border-none py-2 px-6">
                        <Mail size={16} className="mr-2" /> Trigger Pulse Survey
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">

                {/* Global Score Card */}
                <div className="bg-gradient-to-b from-[#0D1928] to-[#131B2B] border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center shadow-[0_0_30px_rgba(244,63,94,0.05)]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="text-[#8899AA] text-sm font-semibold uppercase tracking-widest mb-4 relative z-10">Org Wellness Index</div>

                    <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="72" stroke="#1A2A3A" strokeWidth="10" fill="none" />
                            <circle cx="80" cy="80" r="72" stroke="#f43f5e" strokeWidth="10" fill="none" strokeDasharray="452" strokeDashoffset="190" className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-rose-400">58</span>
                            <span className="text-[#8899AA] text-xs font-bold mt-1">/ 100</span>
                        </div>
                    </div>

                    <span className="inline-flex mx-auto items-center gap-1.5 px-3 py-1 rounded bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-wider border border-red-500/20 relative z-10">
                        <TrendingDown size={14} /> Critical Drop Detected
                    </span>
                </div>

                {/* Trend Chart */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white font-semibold">6-Month Trajectory</h3>
                            <p className="text-[#8899AA] text-xs mt-1">Sustained decline correlated with Q3 product launch goals</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-xs text-rose-400 font-medium">
                                <span className="w-3 h-3 rounded-full bg-rose-500" /> Organizational Average
                            </span>
                        </div>
                    </div>
                    <div className="h-[220px] w-full mt-4">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <AreaChart data={burnoutData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRose" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                    <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis domain={[40, 100]} stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="score" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorRose)" />
                                </AreaChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>

                {/* Risk Factors Radar */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col justify-center">
                    <h3 className="text-white font-semibold mb-2 text-center">Deficit Analysis: Engineering</h3>

                    <div className="h-[220px] w-full mx-auto relative -left-4">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={teamData}>
                                    <PolarGrid stroke="#2A3A4A" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#8899AA', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="Engineering" dataKey="A" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} />
                                    <RechartsTooltip contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px' }} />
                                </RadarChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>

            </div>

            {/* Smart Summary / Insights */}
            <div className="bg-gradient-to-r from-[#1A0B12] to-[#131B2B] border border-rose-500/30 rounded-2xl p-6 mb-8 relative md:col-span-2">
                <div className="flex items-start gap-4">
                    <div className="bg-rose-500/20 p-2.5 rounded-xl border border-rose-500/30 shrink-0 text-rose-400 mt-1">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-2">Critical Cohort Alert: Cloud Infrastructure Team</h3>
                        <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-4xl">
                            Continuous weekend commits + lack of PTO consumption over the last 90 days has driven the burnout probability for this 14-person team to <strong className="text-rose-400">88%</strong>. NLP sentiment on their Slack channel (#eng-cloud-infra) indicates severe workflow friction regarding CI/CD bottlenecks.
                        </p>
                        <div className="flex gap-3">
                            <Button className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/50 text-xs py-1.5 h-auto">
                                View Team Drilldown
                            </Button>
                            <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-none text-xs py-1.5 h-auto">
                                Schedule Mandatory Time-off Intervention
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prescriptive Interventions */}
            <h3 className="text-lg font-semibold text-white mb-4">Recommended Policy Adjustments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex flex-col justify-between hover:bg-[#131B2B] transition-colors">
                    <div>
                        <div className="bg-blue-500/10 w-fit p-2 rounded-lg text-blue-400 mb-3 border border-blue-500/20">
                            <Users size={18} />
                        </div>
                        <h4 className="text-white font-medium text-sm mb-2">"Meeting-Free" Thursdays</h4>
                        <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                            Data indicates the average IC spends 22 hours/week on Zoom. Implementing a global block on Thursdays is modeled to increase deep-work capacity by 14% and directly offset workload stress.
                        </p>
                    </div>
                    <Button variant="secondary" className="border-[#2A3A4A] text-white text-xs w-full py-2">
                        Draft Policy Rule
                    </Button>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex flex-col justify-between hover:bg-[#131B2B] transition-colors">
                    <div>
                        <div className="bg-emerald-500/10 w-fit p-2 rounded-lg text-emerald-400 mb-3 border border-emerald-500/20">
                            <Activity size={18} />
                        </div>
                        <h4 className="text-white font-medium text-sm mb-2">Automated PTO Nudges</h4>
                        <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                            452 employees have accrued maximum leave balances. The AI suggests pushing highly targeted Slack notifications suggesting long weekends to managers of these reports.
                        </p>
                    </div>
                    <Button className="bg-[#1A2A3A] text-white border-none text-xs w-full py-2 hover:bg-[#2A3A4A]">
                        Activate Copilot Workflow
                    </Button>
                </div>

                <div className="bg-[#0D1928] border border-rose-500/20 p-5 rounded-2xl flex flex-col justify-between hover:bg-[#131B2B] hover:border-rose-500/40 transition-colors">
                    <div>
                        <div className="bg-rose-500/10 w-fit p-2 rounded-lg text-rose-400 mb-3 border border-rose-500/20">
                            <ShieldCheck size={18} />
                        </div>
                        <h4 className="text-white font-medium text-sm mb-2">Review On-Call Rotation</h4>
                        <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                            PagerDuty integration highlights 3 individuals bearing 60% of SEV-1 incident load over the last quarter. Re-distribute load to prevent imminent attrition of key technical staff.
                        </p>
                    </div>
                    <Button className="bg-rose-500/20 text-rose-400 border-none text-xs w-full py-2 hover:bg-rose-500/30">
                        View On-Call Analytics
                    </Button>
                </div>

            </div>

        </div>
    );
}
