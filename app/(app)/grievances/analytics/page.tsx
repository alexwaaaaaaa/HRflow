"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { PieChart, TrendingUp, AlertCircle } from 'lucide-react';

export default function GrievanceAnalyticsScreen() {
    return (
        <Page
            title="Grievance Analytics Insights"
            subtitle="Discover trends, track SLA compliance, and monitor organizational health."
            breadcrumbs={[{ label: "Grievances", href: "/grievances" }, { label: "Analytics" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-1">Grievance Analytics Insights</h1>
                <p className="text-[#8899AA] text-sm">Discover trends, track SLA compliance, and monitor organizational health.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Chart 1: Volume over time */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative group">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2"><TrendingUp size={16} className="text-indigo-400" /> Case Volume (YTD)</h3>
                        <select className="bg-[#131B2B] border border-[#2A3A4A] text-xs text-white rounded outline-none p-1">
                            <option>Monthly</option>
                            <option>Quarterly</option>
                        </select>
                    </div>

                    {/* Mock Bar Chart */}
                    <div className="h-48 flex items-end justify-between gap-2 px-2">
                        {[4, 12, 8, 15, 6, 9, 22, 14, 5, 11, 16, 8].map((val, i) => (
                            <div key={i} className="w-full flex flex-col items-center gap-2 group/bar">
                                <span className="text-[10px] text-white opacity-0 group-hover/bar:opacity-100 transition-opacity font-bold">{val}</span>
                                <div
                                    className="w-full bg-indigo-500/20 hover:bg-indigo-500/80 rounded-t-sm transition-all"
                                    style={{ height: `${(val / 25) * 100}%` }}
                                />
                                <span className="text-[10px] text-[#556677] uppercase font-bold">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart 2: SLA Status */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2"><AlertCircle size={16} className="text-rose-400" /> SLA Resolution Tracking</h3>
                    </div>

                    <div className="flex items-center justify-center h-48 gap-12">
                        {/* Mock Simple Donut representation */}
                        <div className="relative w-36 h-36 rounded-full border-[16px] border-[#131B2B] flex items-center justify-center">
                            {/* Segment 1: Within SLA (Green) */}
                            <div className="absolute inset-[-16px] rounded-full border-[16px] border-emerald-500/80" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 20%)' }} />
                            {/* Segment 2: Breached (Red) */}
                            <div className="absolute inset-[-16px] rounded-full border-[16px] border-rose-500/80" style={{ clipPath: 'polygon(50% 50%, 0 20%, 0 0, 50% 0)' }} />

                            <div className="text-center">
                                <div className="text-2xl font-black text-white">82%</div>
                                <div className="text-[10px] text-[#8899AA] font-bold uppercase tracking-wider">Met SLA</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded bg-emerald-500" />
                                <div>
                                    <div className="text-sm font-bold text-white">Within 30 Days</div>
                                    <div className="text-xs text-[#8899AA]">116 Cases</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded bg-rose-500" />
                                <div>
                                    <div className="text-sm font-bold text-white">Breached (&gt;90 Days)</div>
                                    <div className="text-xs text-[#8899AA]">26 Cases</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown list */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 lg:col-span-2">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-6"><PieChart size={16} className="text-sky-400" /> Case Distribution by Category</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'POSH / Harassment', pct: 45, color: 'text-rose-400', bg: 'bg-rose-500' },
                            { name: 'Policy Violation', pct: 25, color: 'text-indigo-400', bg: 'bg-indigo-500' },
                            { name: 'Manager Dispute', pct: 20, color: 'text-amber-400', bg: 'bg-amber-500' },
                            { name: 'Health & Safety', pct: 10, color: 'text-sky-400', bg: 'bg-sky-500' },
                        ].map((cat, i) => (
                            <div key={i} className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-[#8899AA] font-medium">{cat.name}</span>
                                    <span className={`text-lg font-black ${cat.color}`}>{cat.pct}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#060D1A] rounded-full overflow-hidden">
                                    <div className={`h-full ${cat.bg}`} style={{ width: `${cat.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
