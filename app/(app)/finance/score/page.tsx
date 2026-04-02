"use client";

import React from "react";
import Link from "next/link";
import {
    Activity, TrendingUp, TrendingDown,
    AlertTriangle, CheckCircle2, ShieldAlert, FileText, ChevronRight
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const SCORE_HISTORY = [
    { month: "Jan", score: 710 },
    { month: "Feb", score: 715 },
    { month: "Mar", score: 725 },
    { month: "Apr", score: 732 },
    { month: "May", score: 740 },
    { month: "Jun", score: 745 },
];

export default function CreditScoreScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Credit Score</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Company Credit Score</h1>
                    <p className="text-sm text-[#8899AA] mt-1">Monitor organizational financial health and creditworthiness</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                    <FileText className="w-4 h-4" />
                    Download Report
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Main Score Card */}
                <div className="lg:col-span-1 bg-gradient-to-br from-[#0D1928] to-[#122235] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF] opacity-5 rounded-full blur-3xl -mr-20 -mt-20" />
                    <p className="text-[#8899AA] text-sm font-medium mb-4">Experian Business Credit Score</p>
                    <div className="relative mb-4">
                        <svg className="w-40 h-40 transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="#1A2A3A" strokeWidth="12" fill="none" />
                            <circle cx="80" cy="80" r="70" stroke="#00E5FF" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset="110" className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-white tracking-tight">745</span>
                            <span className="text-xs font-semibold text-[#00E5FF] uppercase tracking-wider mt-1">Excellent</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1.5 rounded-full">
                        <TrendingUp className="w-4 h-4" />
                        +12 pts from last month
                    </div>
                </div>

                {/* Score History Chart */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Score History (6 Months)</h2>
                    <div className="h-64">
                        <ChartWrapper height="h-full">
                            <AreaChart data={SCORE_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis domain={[650, 800]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    itemStyle={{ color: "#00E5FF" }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-bold text-white mb-4">Key Factors Affecting Your Score</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-semibold text-white">Payment History</h3>
                    </div>
                    <p className="text-sm text-[#8899AA] mb-4">You have a 100% on-time payment record for the last 24 months. This is the strongest factor boosting your score.</p>
                    <div className="w-full bg-[#1A2A3A] rounded-full h-1.5">
                        <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-[#8899AA] mt-2">
                        <span>Impact: High</span>
                        <span className="text-emerald-400">Positive</span>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-semibold text-white">Credit Utilization</h3>
                    </div>
                    <p className="text-sm text-[#8899AA] mb-4">Currently utilizing 42% of available corporate credit limits. Keeping this below 30% can improve your score.</p>
                    <div className="w-full bg-[#1A2A3A] rounded-full h-1.5">
                        <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-[#8899AA] mt-2">
                        <span>Impact: Medium</span>
                        <span className="text-amber-400">Moderate</span>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-semibold text-white">Company Age</h3>
                    </div>
                    <p className="text-sm text-[#8899AA] mb-4">Your corporate identity has been established for 4.5 years. Scores generally favor businesses older than 5 years.</p>
                    <div className="w-full bg-[#1A2A3A] rounded-full h-1.5">
                        <div className="bg-pink-400 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-[#8899AA] mt-2">
                        <span>Impact: Low</span>
                        <span className="text-pink-400">Needs Time</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
