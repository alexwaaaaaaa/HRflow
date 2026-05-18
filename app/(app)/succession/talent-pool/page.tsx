"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Users, Search, Star, Briefcase, ChevronRight } from 'lucide-react';

export default function TalentPoolScreen() {
    const [_view, _setView] = useState('grid');

    const TALENT = [
        { name: 'Elena Rodriguez', role: 'Sr. Director, Platform', perf: 'Exceeds', pot: 'High', ready: 'Now', pools: ['VP Eng Suite', 'CTO Track'], pic: 'ER' },
        { name: 'James Wilson', role: 'Director, Enterprise Sales', perf: 'Meets', pot: 'Medium', ready: '1-2 Years', pools: ['VP Sales'], pic: 'JW' },
        { name: 'Aisha Patel', role: 'Head of Data Science', perf: 'Exceeds', pot: 'High', ready: 'Now', pools: ['CDO Track', 'VP Product'], pic: 'AP' },
        { name: 'Marcus Johnson', role: 'Director, Finance', perf: 'Exceeds', pot: 'High', ready: '1-2 Years', pools: ['CFO Track'], pic: 'MJ' },
        { name: 'Rachel Kim', role: 'Principal Engineer', perf: 'Outstanding', pot: 'High', ready: 'Now', pools: ['Distinguished Eng'], pic: 'RK' },
        { name: 'Tom Baker', role: 'Sr Manager, Operations', perf: 'Meets', pot: 'Medium', ready: '3-5 Years', pools: ['Dir Ops'], pic: 'TB' },
    ];

    return (
        <Page
            title="High-Potential Talent Pool"
            subtitle="Manage hi-po employees, track their development, and align them to critical roles."
            breadcrumbs={[{ label: "Succession", href: "/succession" }, { label: "Talent Pool" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Users size={24} className="text-indigo-400" /> High-Potential Talent Pool</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage hi-po employees, track their development, and align them to critical roles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                        + Nominate Talent
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] rounded-xl text-sm font-bold shadow-sm whitespace-nowrap">All Hi-Po (156)</button>
                    <button className="px-4 py-2 text-[#8899AA] hover:text-white transition-colors bg-[#0A1420] border border-[#1A2A3A] rounded-xl text-sm font-bold whitespace-nowrap">C-Suite Track (28)</button>
                    <button className="px-4 py-2 text-[#8899AA] hover:text-white transition-colors bg-[#0A1420] border border-[#1A2A3A] rounded-xl text-sm font-bold whitespace-nowrap">VP/Dir Track (85)</button>
                    <button className="px-4 py-2 text-[#8899AA] hover:text-white transition-colors bg-[#0A1420] border border-[#1A2A3A] rounded-xl text-sm font-bold whitespace-nowrap">Technical Experts (43)</button>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search Talent..."
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-indigo-500 outline-none" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TALENT.map((t, i) => (
                    <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] hover:border-indigo-500/40 rounded-2xl p-6 transition-all group flex flex-col h-full cursor-pointer relative overflow-hidden">

                        {t.pot === 'High' && t.perf !== 'Meets' && (
                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                <div className="absolute top-2 -right-6 bg-indigo-500 text-white text-[8px] font-bold uppercase tracking-wider py-1 w-24 text-center rotate-45 transform origin-center shadow-lg">Top Tier</div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1A2A3A] to-[#131B2B] border border-[#2A3A4A] flex items-center justify-center text-white font-black text-lg shadow-inner">
                                {t.pic}
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-400 transition-colors">{t.name}</h3>
                                <div className="text-[#8899AA] text-xs mt-0.5">{t.role}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-5 flex-1">
                            <div className="bg-[#131B2B] rounded-xl p-3 border border-[#1A2A3A]">
                                <div className="text-[#556677] text-[10px] font-bold uppercase mb-1">Perf / Potential</div>
                                <div className="text-white text-xs font-bold leading-tight flex items-center gap-1">
                                    <Star size={12} className={t.perf === 'Outstanding' ? 'text-amber-400 fill-amber-400' : 'text-amber-400'} /> {t.perf}
                                </div>
                                <div className="text-indigo-300 text-xs font-bold leading-tight mt-0.5">{t.pot} Potential</div>
                            </div>

                            <div className="bg-[#131B2B] rounded-xl p-3 border border-[#1A2A3A]">
                                <div className="text-[#556677] text-[10px] font-bold uppercase mb-1">Max Readiness</div>
                                <div className={`text-xs font-bold ${t.ready === 'Now' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    {t.ready}
                                </div>
                            </div>
                        </div>

                        <div className="mb-5 border-t border-[#1A2A3A] pt-4">
                            <div className="text-[#556677] text-xs font-bold mb-2 flex items-center gap-1"><Briefcase size={12} /> Nominated Pools</div>
                            <div className="flex flex-wrap gap-2">
                                {t.pools.map((p, j) => (
                                    <span key={j} className="bg-[#1A2A3A] text-[#AABBCC] text-[10px] font-bold px-2 py-1 rounded border border-[#2A3A4A]">{p}</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">
                            View Full Profile <ChevronRight size={14} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
        </Page>
    );
}
