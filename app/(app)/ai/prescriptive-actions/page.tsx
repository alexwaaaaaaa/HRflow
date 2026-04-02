"use client";

import React, { useState } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, PlayCircle, Clock, Zap, Target, Activity } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function PrescriptiveActionsPage() {
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'High Impact', 'Urgent Risks', 'Automation Ready'];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Zap size={28} className="text-amber-400" /> Prescriptive AI Actions
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        A prioritized queue of AI-generated strategic interventions across your organization, ranked by estimated business ROI and urgency.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        Action History
                    </Button>
                    <Button className="bg-amber-600 hover:bg-amber-500 text-white border-none py-2 px-6">
                        <PlayCircle size={16} className="mr-2" /> Auto-Execute Batch (3)
                    </Button>
                </div>
            </div>

            {/* Smart Summary Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 shrink-0">
                <div className="bg-[#0D1928] border border-amber-500/20 p-5 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2 relative z-10">Potential Value Unlock</div>
                    <div className="text-2xl font-bold text-amber-400 relative z-10">₹3.2 Cr</div>
                    <div className="text-[10px] text-[#8899AA] mt-1 relative z-10">Estimated ROI if top 5 actions taken</div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl">
                    <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2">Pending Interventions</div>
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-[10px] text-red-400 mt-1 flex items-center gap-1"><AlertTriangle size={12} /> 2 Critical Risks Mitigations</div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl">
                    <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2">Auto-Executed (MTD)</div>
                    <div className="text-2xl font-bold text-white">45</div>
                    <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1"><CheckCircle2 size={12} /> Workflows finalized autonomously</div>
                </div>
            </div>

            {/* Action Queue */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 shrink-0">
                <div className="flex space-x-1 bg-[#1A2A3A] p-1 rounded-xl w-full max-w-md overflow-x-auto hide-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${activeTab === tab
                                    ? 'bg-[#0D1928] text-white shadow shadow-black/20'
                                    : 'text-[#8899AA] hover:text-white hover:bg-[#2A3A4A]'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4">

                {/* High Priority Action: Compensation */}
                <div className="bg-[#0D1928] border border-amber-500/30 rounded-2xl p-6 transition-all hover:border-amber-500/50 hover:shadow-[0_4px_30px_rgba(245,158,11,0.05)] cursor-pointer group">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider rounded border border-amber-500/20 flex items-center gap-1">
                                    <TrendingUp size={12} /> High ROI
                                </span>
                                <span className="text-xs text-[#8899AA] font-mono flex items-center gap-1">
                                    <Clock size={12} /> Gen: 2 hrs ago
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Launch Mid-Cycle Retention Adjustments (Engineering)</h3>
                            <p className="text-sm text-[#8899AA] leading-relaxed max-w-3xl mb-4">
                                Kaarya models indicate a 35% probability of losing 5 key Senior Engineers to competitors within 60 days due to market comp drift. AI has drafted a targeted ₹12L RSU grant strategy.
                            </p>
                            <div className="flex flex-wrap gap-4 text-xs">
                                <span className="text-emerald-400 font-medium">ROI: Prevents ~₹1.5Cr in replacement costs</span>
                                <span className="hidden md:inline-block w-px h-4 bg-[#2A3A4A]" />
                                <span className="text-white">Affected: 5 Employees</span>
                                <span className="hidden md:inline-block w-px h-4 bg-[#2A3A4A]" />
                                <span className="text-white">Budget Required: Zero (Equity Pool)</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 justify-center md:items-end w-full md:w-56 shrink-0 border-t border-[#1A2A3A] pt-4 md:border-t-0 md:pt-0">
                            <Button className="w-full bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-[#2A3A4A] py-2">
                                Review Grant Details
                            </Button>
                            <Button className="w-full bg-amber-600 hover:bg-amber-500 text-white border-none py-2 font-semibold">
                                Approve Execution <ChevronRight size={16} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Automation Action: Sourcing */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 transition-all hover:border-blue-500/40 hover:bg-[#131B2B] cursor-pointer group">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-500/20 flex items-center gap-1">
                                    <Zap size={12} /> Auto-Executable
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Shift Recruitment Budget for "Staff Product Manager"</h3>
                            <p className="text-sm text-[#8899AA] leading-relaxed max-w-3xl mb-4">
                                The current sourcing channel (LinkedIn Ads) is yielding poor conversion (1.2%). The model recommends rebudgeting ₹50k to targeted Employee Referral Bounties to hit TTF goals.
                            </p>
                            <div className="flex flex-wrap gap-4 text-xs">
                                <span className="text-emerald-400 font-medium">+15% TTF Confidence Boost</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 justify-center md:items-end w-full md:w-56 shrink-0 border-t border-[#1A2A3A] pt-4 md:border-t-0 md:pt-0">
                            <Button className="w-full bg-[#1A2A3A] hover:bg-blue-500/20 text-blue-400 border border-[#2A3A4A] hover:border-blue-500/50 py-2">
                                Accept AI Automation
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Compliance Action */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 transition-all hover:border-rose-500/40 hover:bg-[#131B2B] cursor-pointer group opacity-90">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2.5 py-1 bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider rounded border border-rose-500/20 flex items-center gap-1">
                                    <AlertTriangle size={12} /> Compliance Risk
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">Update Leave Policy: Karnataka Gazette Compliance</h3>
                            <p className="text-sm text-[#8899AA] leading-relaxed max-w-3xl mb-4">
                                Recent state gazette mandates an additional 2 days of casual leave. Your current engine configuration is out of date. AI has pre-staged the policy patch for review.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 justify-center md:items-end w-full md:w-56 shrink-0 border-t border-[#1A2A3A] pt-4 md:border-t-0 md:pt-0">
                            <Button className="w-full bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border border-[#2A3A4A] py-2">
                                Review Policy Diff
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
