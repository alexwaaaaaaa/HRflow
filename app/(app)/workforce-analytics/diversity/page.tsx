"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { HeartHandshake, Users } from 'lucide-react';
import Link from 'next/link';

export default function DiversityInclusionScreen() {
    return (
        <Page
            title="Diversity & Inclusion (D&I) Metrics"
            subtitle="Track gender representation, generational diversity, and leadership composition."
            breadcrumbs={[{ label: "Workforce Analytics", href: "/workforce-analytics" }, { label: "Diversity" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><HeartHandshake size={24} className="text-rose-400" /> Diversity & Inclusion (D&I) Metrics</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track gender representation, generational diversity, and leadership composition.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/workforce-analytics/diversity-reports" className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        View ESG Reports
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Gender Representation</h3>

                    <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                        <div className="w-64 h-8 bg-[#131B2B] rounded-full overflow-hidden flex relative group cursor-crosshair">
                            <div className="h-full bg-rose-500 flex items-center justify-center text-[10px] font-bold text-white uppercase" style={{ width: '42%' }}>42%</div>
                            <div className="h-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white uppercase" style={{ width: '56%' }}>56%</div>
                            <div className="h-full bg-purple-500" style={{ width: '2%' }}></div>
                        </div>

                        <div className="flex gap-4 text-xs font-bold text-[#AABBCC]">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Female (42%)</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Male (56%)</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Non-binary / Other (2%)</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-[#8899AA] uppercase tracking-wider">Female Representation by Level</h4>
                        {[
                            { level: 'Executive / CXO', pct: 25, target: 30 },
                            { level: 'Director / VP', pct: 33, target: 40 },
                            { level: 'Manager', pct: 45, target: 50 },
                            { level: 'Individual Contributor', pct: 48, target: 50 },
                        ].map((lvl, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-40 shrink-0 text-white text-sm font-bold">{lvl.level}</div>
                                <div className="flex-1 h-3 bg-[#131B2B] rounded-full overflow-hidden relative group">
                                    <div className={`absolute top-0 bottom-0 left-0 bg-rose-500 z-10`} style={{ width: `${lvl.pct}%` }}></div>
                                    <div className="absolute top-0 bottom-0 bg-rose-500/20 border-r border-rose-400 z-0" style={{ left: 0, width: `${lvl.target}%` }}></div>
                                </div>
                                <div className="w-16 shrink-0 text-right text-xs">
                                    <span className="text-white font-bold">{lvl.pct}%</span>
                                    <span className="text-[#556677]"> / {lvl.target}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Generational Mix</h3>
                    <div className="space-y-4">
                        {[
                            { gen: 'Gen Z', yrs: '1997-2012', pct: 28, count: 158, color: 'bg-emerald-500' },
                            { gen: 'Millennials', yrs: '1981-1996', pct: 54, count: 302, color: 'bg-indigo-500' },
                            { gen: 'Gen X', yrs: '1965-1980', pct: 15, count: 85, color: 'bg-amber-500' },
                            { gen: 'Boomers', yrs: '1946-1964', pct: 3, count: 22, color: 'bg-slate-500' },
                        ].map((g, i) => (
                            <div key={i} className="flex justify-between items-center group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${g.color}`}></div>
                                    <div>
                                        <div className="text-white font-bold text-sm tracking-wide">{g.gen}</div>
                                        <div className="text-[#556677] text-[10px]">{g.yrs}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-white font-mono font-bold">{g.pct}%</div>
                                    <div className="text-[#8899AA] text-[10px]">{g.count} HC</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Hiring Pipeline Representation (L30D)</h3>
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl mb-4">
                        <div className="text-rose-400 font-bold mb-1 text-sm">Focus Area: Engineering</div>
                        <p className="text-rose-300 text-xs">Only 18% of interviewed candidates for Technical roles were from underrepresented groups. Sourcing strategy adjustment recommended.</p>
                    </div>
                    {/* Simple static representations */}
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#8899AA]">Total App Sourcing: Diverse</span>
                            <span className="text-white font-bold">34%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#8899AA]">Interview Stage: Diverse</span>
                            <span className="text-white font-bold">22%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#8899AA]">Offers Extended: Diverse</span>
                            <span className="text-white font-bold">25%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <Users size={48} className="text-[#556677] mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Employee Resource Groups (ERGs)</h3>
                    <p className="text-[#8899AA] text-sm mb-6 max-w-sm">HRFlow supports community building. Track ERG participation and allocate budgets to diverse communities within your organization.</p>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2 rounded-xl text-sm transition-colors border border-white/20">
                        Manage Communities
                    </button>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
