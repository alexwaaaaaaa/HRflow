"use client";

import React from 'react';
import { Target, ArrowLeft, Briefcase, Activity, Calendar, Users, TrendingUp, Filter, BarChart3, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

const funnelForecast = [
    { stage: 'Sourced', vol: 450, conv: 100 },
    { stage: 'Screened', vol: 180, conv: 40 },
    { stage: 'Interview', vol: 45, conv: 25 },
    { stage: 'Offer', vol: 8, conv: 18 },
    { stage: 'Hired', vol: 2, conv: 25 },
];

export default function HiringPredictionDetailPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header / Nav */}
            <div className="mb-6 shrink-0 flex flex-col">
                <Link href="/ai/hiring-prediction" className="flex items-center gap-2 text-[#8899AA] hover:text-white transition-colors w-fit mb-4">
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back to Active Requisitions</span>
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] mt-1">
                            <Briefcase size={28} className="text-blue-400" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold text-white tracking-tight">Staff Backend Engineer</h1>
                                <span className="px-2.5 py-1 bg-[#1A2A3A] text-[#8899AA] text-xs rounded border border-[#2A3A4A] font-bold">
                                    REQ-102
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-[#8899AA] text-sm">
                                <span>Department: Engineering</span>
                                <span className="w-1 h-1 rounded-full bg-[#445566]" />
                                <span>Target Hires: 2</span>
                                <span className="w-1 h-1 rounded-full bg-[#445566]" />
                                <span className="text-red-400 font-medium flex items-center gap-1.5"><AlertCircle size={14} /> High Risk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">

                {/* AI Model Summary */}
                <div className="lg:col-span-2 flex flex-col gap-6 h-full overflow-y-auto pr-2">

                    <div className="bg-[#0D1928] border border-blue-500/30 p-6 md:p-8 rounded-2xl relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 relative z-10">
                            <Activity size={20} className="text-blue-400" /> TTF Forecast & Bottlenecks
                        </h3>

                        <div className="relative z-10">
                            <p className="text-[#8899AA] text-sm leading-relaxed mb-6">
                                Kaarya's predictive model estimates a <strong className="text-white">Time-to-Fill (TTF) of 58 days</strong>, exceeding the SLAs by 13 days. The primary bottleneck is detected at the <strong className="text-amber-500">Technical Interview</strong> stage, where historical pass rates for this hiring manager are 12% below the department average resulting in top-of-funnel decay.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl">
                                    <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">Predicted TTF</div>
                                    <div className="text-2xl font-bold text-red-400">58 <span className="text-sm font-normal text-[#8899AA]">Days</span></div>
                                </div>
                                <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl">
                                    <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">Offer Acceptance</div>
                                    <div className="text-2xl font-bold text-amber-500">62%</div>
                                    <div className="text-[10px] text-amber-500/80 mt-1 uppercase tracking-wider">-8% vs baseline</div>
                                </div>
                                <div className="bg-[#131B2B] border border-[#1A2A3A] p-4 rounded-xl col-span-2 flex items-center justify-between">
                                    <div>
                                        <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">Optimal Sourcing channel</div>
                                        <div className="text-lg font-bold text-emerald-400">Employee Referrals</div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border-4 border-[#1A2A3A] border-t-emerald-400 flex items-center justify-center">
                                        <span className="text-xs font-bold text-emerald-400">65%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl flex-1 flex flex-col">
                        <h3 className="text-white font-semibold mb-6">Predicted Funnel Conversion</h3>
                        <div className="flex-1 w-full min-h-[250px]">
                            <ClientOnly>
                                <ChartWrapper height="h-full">
                                    <BarChart data={funnelForecast} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1A2A3A" />
                                        <XAxis type="number" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis dataKey="stage" type="category" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} width={80} />
                                        <RechartsTooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px' }} />
                                        <Bar dataKey="vol" fill="#3b82f6" barSize={24} radius={[0, 4, 4, 0]} name="Expected Candidates" />
                                    </BarChart>
                                </ChartWrapper>
                            </ClientOnly>
                        </div>
                    </div>

                </div>

                {/* Prescriptive Panel */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden h-full">
                    <div className="px-6 py-5 border-b border-[#1A2A3A] shrink-0">
                        <h3 className="text-lg font-semibold text-white">Prescriptive Interventions</h3>
                        <p className="text-xs text-[#8899AA] mt-1">AI verified actions to optimize this req</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">

                        <div className="bg-[#131B2B] border border-blue-500/30 p-5 rounded-xl hover:border-blue-500/50 transition-colors">
                            <h4 className="text-white font-medium text-sm mb-2">Adjust Interview Panel</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                                The current technical panel has a 12% lower pass rate than required to hit hiring targets based on top-of-funnel volume. Recommend substituting 1 reviewer.
                            </p>
                            <Button className="w-full bg-[#1A2A3A] hover:bg-[#2A3A4A] text-blue-400 border-none text-xs py-2 h-auto">
                                View Alternate Panelists
                            </Button>
                        </div>

                        <div className="bg-[#131B2B] border border-amber-500/30 p-5 rounded-xl hover:border-amber-500/50 transition-colors">
                            <h4 className="text-white font-medium text-sm mb-2">Compensation Realignment</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                                Offer acceptance confidence is low (62%) due to recent market shifts. The current max budget of ₹45L is at the 40th percentile.
                            </p>
                            <Button className="w-full bg-[#1A2A3A] hover:bg-[#2A3A4A] text-amber-500 border-none text-xs py-2 h-auto">
                                Run Salary Benchmark
                            </Button>
                        </div>

                        <div className="bg-[#131B2B] border border-emerald-500/30 p-5 rounded-xl hover:border-emerald-500/50 transition-colors">
                            <h4 className="text-white font-medium text-sm mb-2">Boost Referral Bounty</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                                Referrals are predicted to be the most viable channel (65% probability of success). Temporarily increasing the bounty by ₹50k can increase lead gen by 3x.
                            </p>
                            <Button className="w-full bg-[#1A2A3A] hover:bg-[#2A3A4A] text-emerald-400 border-none text-xs py-2 h-auto">
                                Approve Budget Increase
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
