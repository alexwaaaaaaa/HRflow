"use client";

import React from "react";
import Link from "next/link";
import {
    Activity, ChevronRight, CheckCircle2, AlertTriangle, TrendingUp, HelpCircle
} from "lucide-react";

export default function EWACreditScoreScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col items-center">

            <div className="w-full max-w-4xl text-left mb-6">
                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                    <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/finance/ewa" className="hover:text-white transition-colors">EWA</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Internal Credit Health</span>
                </div>

                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Activity className="w-8 h-8 text-emerald-400" />
                    Health & Trust Score
                </h1>
                <p className="text-sm text-[#8899AA] mt-1">HRFlow creates an internal trust score to evaluate your financial wellness and unlock perks.</p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-1 border border-[#1A2A3A] bg-[#0D1928] rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-5 rounded-full blur-2xl" />
                    <p className="text-[#8899AA] text-sm font-medium mb-6">Current Trust Score</p>

                    <div className="relative mb-6">
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle cx="96" cy="96" r="84" stroke="#1A2A3A" strokeWidth="16" fill="none" />
                            <circle cx="96" cy="96" r="84" stroke="#10B981" strokeWidth="16" fill="none" strokeDasharray="528" strokeDashoffset="105" className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black text-white tracking-tight mb-1">850</span>
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Excellent</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1.5 rounded-full">
                        <TrendingUp className="w-4 h-4" />
                        Top 10% in company
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6">Unlocked Perks</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#1A2A3A]/40 rounded-xl border border-[#2A3A4A]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">Higher EWA Limit</h3>
                                        <p className="text-xs text-[#8899AA]">You can withdraw up to 70% of earned wages (Base is 50%)</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-emerald-400">Active</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#1A2A3A]/40 rounded-xl border border-[#2A3A4A]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">Zero-Fee Disbursal</h3>
                                        <p className="text-xs text-[#8899AA]">Your first 2 EWA transactions per month have 0% fee.</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-emerald-400">Active</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#0B1221] rounded-xl border border-[#1A2A3A] opacity-60">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center">
                                        <AlertTriangle className="w-4 h-4 text-[#8899AA]" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">Personal Loan Pre-approval</h3>
                                        <p className="text-xs text-[#8899AA]">Unlock at Score 900+ (Requires 12mo tenure)</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-[#8899AA]">Locked</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-white">Score Factors</h2>
                            <HelpCircle className="w-4 h-4 text-[#8899AA]" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white">Tenure (3.5 yrs)</span>
                                    <span className="text-emerald-400">+ High Impact</span>
                                </div>
                                <div className="w-full bg-[#1A2A3A] rounded-full h-1.5">
                                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white">Utilization Limit</span>
                                    <span className="text-emerald-400">+ Positive</span>
                                </div>
                                <p className="text-xs text-[#8899AA] mb-2">You regularly withdraw &lt; 20% of your max limit, showing strong financial control.</p>
                                <div className="w-full bg-[#1A2A3A] rounded-full h-1.5">
                                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white">Recovery History</span>
                                    <span className="text-emerald-400">+ Perfect History</span>
                                </div>
                                <div className="w-full bg-[#1A2A3A] rounded-full h-1.5">
                                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
