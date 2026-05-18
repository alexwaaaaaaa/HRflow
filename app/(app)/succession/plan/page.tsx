"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Target, AlertTriangle, Users, ChevronRight } from 'lucide-react';

export default function SuccessionPlanScreen() {
    return (
        <Page
            title="Chief Technology Officer (CTO)"
            subtitle="Current Incumbent: Sarah Jenkins • Level: L1 Executive"
            breadcrumbs={[{ label: "Succession", href: "/succession" }, { label: "Plan" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><Target size={12} /> Succession Architecture</div>
                    <h1 className="text-2xl font-bold text-white">Chief Technology Officer (CTO)</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Current Incumbent: Sarah Jenkins • Level: L1 Executive</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors">
                        Edit Role Meta
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                    <div className="text-[#556677] text-xs font-bold uppercase mb-1">Incumbent Risk</div>
                    <div className="text-lg font-bold text-rose-400 flex items-center gap-2"><AlertTriangle size={16} /> High Flight Risk</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                    <div className="text-[#556677] text-xs font-bold uppercase mb-1">Bench Status</div>
                    <div className="text-lg font-bold text-amber-400">0 Ready Now</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                    <div className="text-[#556677] text-xs font-bold uppercase mb-1">Last Review</div>
                    <div className="text-lg font-bold text-white">Oct 12, 2025</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                    <h3 className="text-white font-bold flex items-center gap-2"><Users size={18} className="text-indigo-400" /> Nominated Successors</h3>
                    <button className="text-indigo-400 hover:text-white text-xs font-bold transition-colors">+ Add Candidate</button>
                </div>

                <div className="divide-y divide-[#1A2A3A]">

                    {/* Candidate 1 */}
                    <div className="p-6 relative group hover:bg-[#131B2B]/30 transition-colors">
                        <div className="flex gap-6">
                            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xl shrink-0">
                                ER
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="text-white font-bold text-lg leading-none mb-1">Elena Rodriguez</h4>
                                        <p className="text-[#8899AA] text-sm">Sr. Director, Platform Engineering</p>
                                    </div>
                                    <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded border border-amber-500/20">Ready in 1-2 Yrs</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="bg-[#060D1A] rounded-lg p-3 border border-[#1A2A3A]">
                                        <div className="text-[#556677] text-[10px] uppercase font-bold mb-1">Development Gaps</div>
                                        <ul className="text-xs text-[#AABBCC] space-y-1 list-disc list-inside">
                                            <li>Cross-functional business strategy</li>
                                            <li>Executive board communication</li>
                                        </ul>
                                    </div>
                                    <div className="bg-[#060D1A] rounded-lg p-3 border border-[#1A2A3A]">
                                        <div className="text-[#556677] text-[10px] uppercase font-bold mb-1">Action Plan</div>
                                        <div className="text-xs text-indigo-300 font-bold flex flex-col gap-1">
                                            <span className="flex items-center gap-1"><ChevronRight size={12} /> Complete Stanford Exec Program</span>
                                            <span className="flex items-center gap-1"><ChevronRight size={12} /> Rotation: 6mo acting GM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Candidate 2 */}
                    <div className="p-6 relative group hover:bg-[#131B2B]/30 transition-colors">
                        <div className="flex gap-6">
                            <div className="w-16 h-16 rounded-full bg-[#1A2A3A] border-2 border-[#2A3A4A] flex items-center justify-center text-white font-bold text-xl shrink-0 opacity-80">
                                AP
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="text-white font-bold text-lg leading-none mb-1">Aisha Patel</h4>
                                        <p className="text-[#8899AA] text-sm">Head of Data Science & AI</p>
                                    </div>
                                    <span className="bg-[#1A2A3A] text-[#8899AA] text-xs font-bold px-3 py-1 rounded border border-[#2A3A4A]">Ready in 3-5 Yrs</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="bg-[#060D1A] rounded-lg p-3 border border-[#1A2A3A]">
                                        <div className="text-[#556677] text-[10px] uppercase font-bold mb-1">Development Gaps</div>
                                        <ul className="text-xs text-[#AABBCC] space-y-1 list-disc list-inside">
                                            <li>Managing non-technical orgs</li>
                                            <li>P&L ownership experience</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-[#1A2A3A] bg-[#060D1A] flex justify-center">
                    <button className="text-[#556677] hover:text-white text-xs font-bold transition-colors">View External Talent Pipeline Mapping</button>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
