"use client";

import React from "react";
import Link from "next/link";
import {
    HeartPulse, BookOpen, Target, TrendingUp, ChevronRight, PlayCircle
} from "lucide-react";

export default function FinancialWellnessScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Financial Wellness Hub</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <HeartPulse className="w-8 h-8 text-pink-400" />
                        Financial Wellness Hub
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Tools, courses, and resources to help you achieve your financial goals</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-gradient-to-br from-[#0D1928] to-[#122235] border border-[#1A2A3A] rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 opacity-5 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-2">Your Financial Health Score</h2>
                        <p className="text-[#8899AA] mb-6">Based on your savings rate, EWA usage, and active learning modules.</p>

                        <div className="flex items-end gap-4 mb-8">
                            <span className="text-6xl font-black text-emerald-400">85</span>
                            <span className="text-xl text-[#8899AA] mb-2">/ 100</span>
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full mb-3 ml-2">
                                <TrendingUp className="w-3 h-3" /> Top 15% in company
                            </span>
                        </div>

                        <div className="w-full bg-[#1A2A3A] rounded-full h-2 mb-2">
                            <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-[#8899AA]">
                            <span>Needs Attention</span>
                            <span>Excellent</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Recommended Actions</h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors cursor-pointer group">
                            <div className="flex items-start gap-3">
                                <Target className="w-5 h-5 text-indigo-400 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">Start an Emergency Fund</h4>
                                    <p className="text-xs text-[#8899AA] mt-1">Set up automated Rs 5,000/mo deduction into an FD.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 hover:bg-pink-500/10 transition-colors cursor-pointer group">
                            <div className="flex items-start gap-3">
                                <HeartPulse className="w-5 h-5 text-pink-400 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors">Review Health Cover</h4>
                                    <p className="text-xs text-[#8899AA] mt-1">Your coverage is Rs 3L. Consider top-up as you recently added a dependent.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6">Learning Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden group cursor-pointer hover:border-[#00E5FF]/50 transition-colors">
                    <div className="h-32 bg-[#1A2A3A] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-transparent" />
                        <PlayCircle className="w-12 h-12 text-[#00E5FF] opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all z-10" />
                    </div>
                    <div className="p-5">
                        <div className="text-xs text-[#00E5FF] font-medium mb-2">Video Course • 45 mins</div>
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00E5FF] transition-colors">Mastering Tax Deductions (80C, 80D)</h3>
                        <p className="text-sm text-[#8899AA]">Learn how to maximize your take-home pay legally under the new regime.</p>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden group cursor-pointer hover:border-purple-500/50 transition-colors">
                    <div className="h-32 bg-[#1A2A3A] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent" />
                        <BookOpen className="w-12 h-12 text-purple-400 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all z-10" />
                    </div>
                    <div className="p-5">
                        <div className="text-xs text-purple-400 font-medium mb-2">Article Read • 10 mins</div>
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Investing 101 for Beginners</h3>
                        <p className="text-sm text-[#8899AA]">Understanding Mutual Funds, SIPs, and Compounding interest basics.</p>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden group cursor-pointer hover:border-emerald-500/50 transition-colors">
                    <div className="h-32 bg-[#1A2A3A] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                        <Target className="w-12 h-12 text-emerald-400 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all z-10" />
                    </div>
                    <div className="p-5">
                        <div className="text-xs text-emerald-400 font-medium mb-2">Interactive Tool</div>
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Retirement Calculator</h3>
                        <p className="text-sm text-[#8899AA]">Project your EPF and NPS corpus at age 60 based on current contributions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
