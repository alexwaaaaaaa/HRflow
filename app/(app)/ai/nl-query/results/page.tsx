"use client";

import React from 'react';
import { Sparkles, ArrowLeft, Download, Share2, AlertTriangle, ChevronRight, TrendingDown, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function NLQueryResultsPage() {
    const queryTerm = "Show me all L4 Engineers with salaries below the 50th percentile who have a high flight risk.";

    const results = [
        { id: 'EMP-1204', name: 'Rahul Sharma', role: 'SDE II (L4)', dept: 'Engineering', salary: '₹ 22L', percentile: '42nd', risk: 'High (88%)', riskReason: 'Compensation vs. Peers' },
        { id: 'EMP-1822', name: 'Aisha Gupta', role: 'SDE II (L4)', dept: 'Engineering', salary: '₹ 21.5L', percentile: '38th', risk: 'High (92%)', riskReason: 'No promo in 2.5 yrs' },
        { id: 'EMP-0931', name: 'Vikram Singh', role: 'SDE II (L4)', dept: 'Engineering', salary: '₹ 23L', percentile: '48th', risk: 'Medium (65%)', riskReason: 'Manager Change' },
        { id: 'EMP-2144', name: 'Neha Reddy', role: 'SDE II (L4)', dept: 'Engineering', salary: '₹ 20L', percentile: '31st', risk: 'Critical (95%)', riskReason: 'Offer from Competitor' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in relative max-w-7xl mx-auto">

            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/ai/nl-query" className="flex items-center gap-2 text-[#8899AA] hover:text-white transition-colors">
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">New Query</span>
                </Link>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-[#8899AA]">
                        <Share2 size={16} className="mr-2" /> Share
                    </Button>
                    <Button variant="secondary" className="border-[#2A3A4A] text-[#8899AA]">
                        <Download size={16} className="mr-2" /> Export
                    </Button>
                </div>
            </div>

            {/* Query Summary & AI Analysis */}
            <div className="bg-[#0D1928] border border-indigo-500/30 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg shadow-indigo-900/10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="relative z-10 flex gap-4">
                    <div className="mt-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-2 rounded-xl border border-indigo-500/30 shrink-0">
                        <Sparkles size={24} className="text-indigo-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col mb-4">
                            <span className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-1">Your Query</span>
                            <h2 className="text-xl font-medium text-white">"{queryTerm}"</h2>
                        </div>

                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 mb-6">
                            <h3 className="text-sm font-semibold text-indigo-400 mb-2">Kaarya AI Synthesis</h3>
                            <p className="text-[#8899AA] text-sm leading-relaxed mb-4">
                                I found <strong className="text-white">4 employees</strong> matching your criteria. The primary driver for their flight risk is the internal salary band disparity compared to the current market median (₹26L for L4 SDEs). Immediate intervention is recommended for <strong className="text-red-400">Neha Reddy</strong> and <strong className="text-red-400">Aisha Gupta</strong>.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                    <TrendingDown size={14} /> ₹3.5L Avg below market
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                                    <AlertTriangle size={14} /> 85% Avg Flight Risk
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-4 h-auto text-sm">
                                Generate Compensation Plan
                            </Button>
                            <Button variant="secondary" className="border-[#2A3A4A] text-white py-2 px-4 h-auto text-sm">
                                Refine Results
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-[#1A2A3A] flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Users size={18} className="text-[#8899AA]" /> Data Results
                    </h3>
                    <span className="text-xs font-medium text-[#8899AA] bg-[#1A2A3A] px-2.5 py-1 rounded-full">{results.length} Matches</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Employee</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Role / Dept</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Current CTC</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Band Percentile</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Flight Risk</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Primary Driver</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {results.map((r, i) => {
                                const isCritical = r.risk.includes('Critical');
                                const isHigh = r.risk.includes('High');

                                return (
                                    <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-white">{r.name}</span>
                                                <span className="text-xs text-[#8899AA]">{r.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-[#8899AA]">{r.role}</span>
                                                <span className="text-xs text-[#445566]">{r.dept}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-white">{r.salary}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-[#FFB800] bg-[#FFB800]/10 px-2 py-1 rounded">{r.percentile}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${isCritical ? 'bg-red-500/20 text-red-400' :
                                                    isHigh ? 'bg-orange-500/20 text-orange-400' :
                                                        'bg-yellow-500/20 text-yellow-500'
                                                }`}>
                                                {isCritical || isHigh ? <AlertTriangle size={12} /> : null}
                                                {r.risk}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#8899AA]">{r.riskReason}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[#8899AA] group-hover:text-indigo-400 transition-colors p-2 hover:bg-indigo-500/10 rounded-lg">
                                                <ChevronRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Contextual Prompts */}
            <div className="mt-8">
                <span className="text-sm font-medium text-[#445566] mb-3 block">Follow-up Queries</span>
                <div className="flex flex-wrap gap-2">
                    {[
                        "How does this compare to Product Managers?",
                        "What is the financial impact of replacing these 4 engineers?",
                        "Draft a retention email for managers to send to these employees."
                    ].map((prompt, i) => (
                        <button key={i} className="text-xs text-[#8899AA] bg-[#0D1928] border border-[#1A2A3A] px-3 py-1.5 rounded-full hover:border-[#2A3A4A] hover:text-white transition-colors">
                            "{prompt}"
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}
