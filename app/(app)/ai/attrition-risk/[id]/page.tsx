"use client";

import React, { useState } from 'react';
import { Sparkles, ArrowLeft, AlertTriangle, TrendingDown, Users, Calendar, Activity, MessageSquare, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function AttritionDetailScreen() {
    const employee = {
        name: 'Neha Reddy',
        role: 'SDE II',
        dept: 'Engineering',
        manager: 'Rahul Sharma',
        tenure: '2 yrs 8 mos',
        riskScore: 95,
        riskLevel: 'Critical'
    };

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Navigation */}
            <div className="mb-8">
                <Link href="/ai/attrition-risk" className="flex items-center gap-2 text-[#8899AA] hover:text-white transition-colors w-fit">
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back to Attrition Dashboard</span>
                </Link>
            </div>

            {/* Profile Header */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                        NR
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            {employee.name}
                            <span className="px-2.5 py-1 bg-red-500/10 text-red-400 text-xs rounded-md border border-red-500/20 font-semibold flex items-center gap-1.5">
                                <AlertTriangle size={14} /> critical risk
                            </span>
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#8899AA]">
                            <span>{employee.role}</span>
                            <span className="w-1 h-1 rounded-full bg-[#445566]" />
                            <span>{employee.dept}</span>
                            <span className="w-1 h-1 rounded-full bg-[#445566]" />
                            <span>Tenure: <span className="text-white">{employee.tenure}</span></span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end relative z-10">
                    <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">Flight Risk Score</div>
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600 mb-2">
                        {employee.riskScore}<span className="text-2xl">%</span>
                    </div>
                    <div className="text-xs font-semibold text-red-500/80 tracking-widest uppercase animate-pulse">
                        Immediate Action Required
                    </div>
                </div>
            </div>

            {/* AI Diagnosis */}
            <div className="bg-gradient-to-r from-[#131B2B] to-[#0D1928] border border-red-500/20 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles size={20} className="text-red-400" /> AI Diagnosis Summary
                </h3>
                <p className="text-[#8899AA] text-sm leading-relaxed mb-6">
                    Kaarya AI has flagged <strong className="text-white">Neha Reddy</strong> with a 95% probability of attrition within the next 30 days. The primary drivers are compounding factors of below-market compensation and apparent stagnation in role progression compared to peer cohorts.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Factor 1 */}
                    <div className="bg-[#0A1420] border border-red-500/30 p-5 rounded-xl text-center">
                        <div className="bg-red-500/10 text-red-400 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <TrendingDown size={18} />
                        </div>
                        <h4 className="text-white font-medium text-sm mb-1">Compensation Gap</h4>
                        <p className="text-xs text-[#8899AA] px-2">Currently at ₹20L, which is 31st percentile. Market median is ₹26L.</p>
                        <div className="mt-3 inline-block bg-red-500/10 px-2 py-1 rounded text-red-400 text-xs font-bold font-mono">+45% Impact</div>
                    </div>

                    {/* Factor 2 */}
                    <div className="bg-[#0A1420] border border-amber-500/30 p-5 rounded-xl text-center">
                        <div className="bg-amber-500/10 text-amber-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Activity size={18} />
                        </div>
                        <h4 className="text-white font-medium text-sm mb-1">Stagnation (2.8 Yrs)</h4>
                        <p className="text-xs text-[#8899AA] px-2">No promotion or significant role change since joining 32 months ago.</p>
                        <div className="mt-3 inline-block bg-amber-500/10 px-2 py-1 rounded text-amber-500 text-xs font-bold font-mono">+30% Impact</div>
                    </div>

                    {/* Factor 3 */}
                    <div className="bg-[#0A1420] border border-yellow-500/30 p-5 rounded-xl text-center">
                        <div className="bg-yellow-500/10 text-yellow-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Calendar size={18} />
                        </div>
                        <h4 className="text-white font-medium text-sm mb-1">Leave Pattern Anomaly</h4>
                        <p className="text-xs text-[#8899AA] px-2">Took 4 half-days last month, historically non-typical. (Possible interviews)</p>
                        <div className="mt-3 inline-block bg-yellow-500/10 px-2 py-1 rounded text-yellow-500 text-xs font-bold font-mono">+20% Impact</div>
                    </div>
                </div>
            </div>

            {/* Prescriptive Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Actions Panel */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Recommended Interventions</h3>
                    <div className="space-y-4">

                        <div className="bg-[#0D1928] border border-indigo-500/40 p-5 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[100px] -translate-y-8 translate-x-8 transition-transform group-hover:scale-150" />
                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <h4 className="text-white font-medium text-sm">Deploy Retention Bonus / Correction</h4>
                                <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-0.5 rounded font-medium">Highest Success Rate</span>
                            </div>
                            <p className="text-[#8899AA] text-xs leading-relaxed mb-4 relative z-10">
                                Propose an immediate mid-cycle salary correction of ₹4.5L to bring compensation to the 48th percentile. Kaarya estimates a <span className="text-emerald-400 font-medium">78% probability</span> of retention if activated within 48 hrs.
                            </p>
                            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-1.5 px-4 h-auto text-sm">
                                Generate Approval Workflow
                            </Button>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl hover:border-[#2A3A4A] transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-medium text-sm">Schedule Stay Interview</h4>
                            </div>
                            <p className="text-[#8899AA] text-xs leading-relaxed mb-4">
                                Draft an empathetic meeting invite for Neha's manager, Rahul Sharma, prioritizing career growth discussions.
                            </p>
                            <Button variant="secondary" className="border-[#2A3A4A] text-white py-1.5 px-4 h-auto text-sm">
                                Draft Manager Email
                            </Button>
                        </div>

                    </div>
                </div>

                {/* Timeline Context */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
                        Historical Context
                        <button className="text-xs text-[#8899AA] flex items-center gap-1 hover:text-white transition-colors">
                            Last 12 Months <ChevronDown size={14} />
                        </button>
                    </h3>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="relative pl-6 border-l-2 border-[#1A2A3A] space-y-6">

                            <div className="relative">
                                <span className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full" />
                                <div className="text-xs text-[#8899AA] mb-1">Last Month (Oct 2023)</div>
                                <h5 className="text-sm font-medium text-white">Unusual Leave Pattern</h5>
                                <p className="text-xs text-[#445566] mt-1">4 intermittent half-days requested within 2 weeks.</p>
                            </div>

                            <div className="relative">
                                <span className="absolute -left-[31px] bg-red-500/20 border border-red-500/50 w-4 h-4 rounded-full flex items-center justify-center">
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                </span>
                                <div className="text-xs text-[#8899AA] mb-1">Q3 Review (Sep 2023)</div>
                                <h5 className="text-sm font-medium text-white">Sentiment Drop</h5>
                                <p className="text-xs text-[#445566] mt-1">Self-review sentiment scored 3.8/10 (down from 7.2 in Q2). Mentioned "limited scope for technical leadership."</p>
                            </div>

                            <div className="relative opacity-60">
                                <span className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full" />
                                <div className="text-xs text-[#8899AA] mb-1">Annual Cycle (Jan 2023)</div>
                                <h5 className="text-sm font-medium text-white">Missed Promotion Window</h5>
                                <p className="text-xs text-[#445566] mt-1">Passed over for SDE III due to budget constraints, despite "Exceeds Expectations" rating.</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
