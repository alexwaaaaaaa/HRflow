"use client";
import React from 'react';
import { BarChart3, Eye, MousePointerClick, Clock, ArrowUpRight } from 'lucide-react';

export default function NoticeAnalyticsScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Engagement Metrics</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><BarChart3 size={24} className="text-emerald-400" /> Communications Analytics</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Measure the reach and impact of internal communications, read-receipts, and engagement.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex justify-center items-center gap-2"><Eye size={16} /> Avg Open Rate</div>
                    <div className="text-4xl font-black text-white mb-2">78<span className="text-[#556677] text-2xl">%</span></div>
                    <div className="text-emerald-400 text-xs font-bold flex justify-center gap-1"><ArrowUpRight size={14} /> +4% vs last mo</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex justify-center items-center gap-2"><MousePointerClick size={16} /> Avg CTR</div>
                    <div className="text-4xl font-black text-white mb-2">24<span className="text-[#556677] text-2xl">%</span></div>
                    <div className="text-[#556677] text-xs font-bold">Clicks on internal links</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex justify-center items-center gap-2"><Clock size={16} /> Time to Reply</div>
                    <div className="text-4xl font-black text-amber-500 mb-2">22<span className="text-[#556677] text-2xl">m</span></div>
                    <div className="text-[#556677] text-xs font-bold">On marked-action posts</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <h3 className="text-white text-sm font-bold mb-4">Export Reports</h3>
                    <div className="space-y-2 text-xs">
                        <button className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-[#AABBCC] px-3 py-2 rounded-lg font-bold transition-colors text-left flex justify-between">
                            Export Compliance Log (PDF) <span>&darr;</span>
                        </button>
                        <button className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-[#AABBCC] px-3 py-2 rounded-lg font-bold transition-colors text-left flex justify-between">
                            Raw Interaction Data (CSV) <span>&darr;</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Performing Comms */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 h-[400px] flex flex-col">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Top Performing Notices (Last 30 Days)</h3>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 text-sm">
                        {[
                            { t: 'Q3 Townhall Recording & Deck', views: '1,492', pct: 92 },
                            { t: 'Open Enrollment Guide 2026', views: '1,200', pct: 85 },
                            { t: 'Performance Review Kickoff', views: '1,150', pct: 80 },
                            { t: 'New Expense Policy Guidelines', views: '980', pct: 60 }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center group cursor-pointer">
                                <div className="flex1 mr-4">
                                    <div className="text-white font-bold group-hover:text-emerald-400 transition-colors truncate">{item.t}</div>
                                    <div className="w-full h-1.5 rounded-full bg-[#131B2B] overflow-hidden mt-1.5 w-48">
                                        <div className="bg-emerald-500 h-full" style={{ width: `${item.pct}%` }}></div>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-emerald-400 font-mono font-bold">{item.views}</div>
                                    <div className="text-[#556677] text-[10px] uppercase font-bold">Unique Views</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Channel Distribution */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 h-[400px] flex flex-col">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Engagement by Channel</h3>
                    <div className="flex-1 flex flex-col justify-center space-y-6">
                        <div>
                            <div className="flex justify-between items-center text-sm font-bold mb-2">
                                <span className="text-white">Web Platform / Portal</span>
                                <span className="text-white">55%</span>
                            </div>
                            <div className="w-full h-3 rounded-full bg-[#131B2B] overflow-hidden shadow-inner">
                                <div className="bg-sky-500 h-full w-[55%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center text-sm font-bold mb-2">
                                <span className="text-white">Mobile App (Push)</span>
                                <span className="text-white">32%</span>
                            </div>
                            <div className="w-full h-3 rounded-full bg-[#131B2B] overflow-hidden shadow-inner">
                                <div className="bg-purple-500 h-full w-[32%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center text-sm font-bold mb-2">
                                <span className="text-white">Email Integration</span>
                                <span className="text-white">13%</span>
                            </div>
                            <div className="w-full h-3 rounded-full bg-[#131B2B] overflow-hidden shadow-inner">
                                <div className="bg-[#556677] h-full w-[13%]"></div>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-[#1A2A3A] text-[#8899AA] text-xs text-center leading-relaxed">
                            Web platform remains the primary driver for sustained engagement, primarily due to the integrated task-linking features inherent in departmental notices.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
