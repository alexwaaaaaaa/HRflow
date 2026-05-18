"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { ArrowRightLeft, Briefcase, Search, Filter, TrendingUp } from 'lucide-react';

export default function InternalMobilityScreen() {
    const [activeTab, setActiveTab] = useState('openings');

    const OPPORTUNITIES = [
        { title: 'Director of Product, Growth', dept: 'Product', loc: 'San Francisco (Hybrid)', type: 'Promotion', matches: 12 },
        { title: 'Principal Data Engineer', dept: 'Data Platform', loc: 'Remote (US)', type: 'Lateral', matches: 8 },
        { title: 'VP, Enterprise Sales', dept: 'Revenue', loc: 'New York', type: 'Succession Track', matches: 3 },
    ];

    return (
        <Page
            title="Internal Talent Mobility"
            subtitle="Match high-potential employees with internal opportunities, lateral moves, and stretch assignments."
            breadcrumbs={[{ label: "Succession", href: "/succession" }, { label: "Mobility" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><ArrowRightLeft size={24} className="text-sky-400" /> Internal Talent Mobility</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Match high-potential employees with internal opportunities, lateral moves, and stretch assignments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                        <Briefcase size={16} /> Post Internal Role
                    </button>
                </div>
            </div>

            <div className="flex gap-2 p-1 bg-[#060D1A] border border-[#1A2A3A] rounded-xl w-fit mb-6">
                {[
                    { id: 'openings', label: 'Internal Postings' },
                    { id: 'matches', label: 'AI Talent Matching' },
                    { id: 'requests', label: 'Transfer Requests (4)' },
                ].map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === t.id ? 'bg-[#131B2B] text-white border border-[#2A3A4A] shadow-sm' : 'text-[#8899AA] hover:text-white'}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {activeTab === 'openings' && (
                <div className="grid lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-4 bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-3">
                            <Search size={16} className="text-[#556677] ml-2" />
                            <input type="text" placeholder="Search postings by title or skill..." className="bg-transparent border-none text-white text-sm outline-none w-full" />
                            <button className="p-2 text-[#8899AA] hover:text-white transition-colors"><Filter size={16} /></button>
                        </div>

                        {OPPORTUNITIES.map((opp, i) => (
                            <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] hover:border-sky-500/40 rounded-2xl p-6 transition-colors group cursor-pointer block">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-white font-bold text-lg group-hover:text-sky-400 transition-colors">{opp.title}</h3>
                                        <div className="text-[#8899AA] text-xs mt-1">{opp.dept} • {opp.loc}</div>
                                    </div>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border flex items-center gap-1 ${opp.type === 'Promotion' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'}`}>
                                        {opp.type === 'Promotion' && <TrendingUp size={12} />}
                                        {opp.type}
                                    </span>
                                </div>

                                <div className="pt-4 border-t border-[#1A2A3A] flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-[#131B2B] border border-[#2A3A4A] flex items-center justify-center text-sky-400 font-bold shrink-0">
                                            {opp.matches}
                                        </div>
                                        <span className="text-xs text-[#8899AA]"><strong className="text-white">AI skill matches</strong> found internally.</span>
                                    </div>
                                    <button className="text-sky-400 text-xs font-bold hover:text-white transition-colors">Review Matches &rarr;</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                            <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center gap-2">
                                <TrendingUp size={16} className="text-emerald-400" /> Mobility Metrics (YTD)
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#8899AA] text-sm">Internal Fill Rate</span>
                                    <span className="text-white font-bold">38%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#8899AA] text-sm">Cross-Functional Lateral Moves</span>
                                    <span className="text-white font-bold">14</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#8899AA] text-sm">Avg Time in Role before Move</span>
                                    <span className="text-white font-bold text-xs uppercase tracking-wider">28 Months</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Other tabs omitted for brevity */}
            {activeTab !== 'openings' && (
                <div className="p-12 text-center text-[#556677] bg-[#0A1420] border border-[#1A2A3A] rounded-2xl animate-in fade-in">
                    Selected view content
                </div>
            )}
        </div>
    
        </Page>
    );
}
