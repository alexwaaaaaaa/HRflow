"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Target, ArrowLeft, MoveUpRight, Trophy, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CareerPathScreen() {
    return (
        <Page
            title="My Career Path"
            subtitle="Visualize your growth trajectory, skill gaps, and next promotion readiness."
            breadcrumbs={[{ label: "Self Service", href: "/self-service" }, { label: "Career" }]}
            maxWidth="1300px"
        >

        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Back to Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Target size={22} className="text-blue-400" /> My Career Path</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Visualize your growth trajectory, skill gaps, and next promotion readiness.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 relative overflow-hidden">
                        <h3 className="text-white font-bold mb-8">Career Trajectory (Engineering)</h3>

                        <div className="relative">
                            <div className="absolute left-[27px] top-4 bottom-12 w-1 bg-[#1A2A3A]"></div>

                            <div className="relative pl-16 pb-8">
                                <div className="absolute left-0 top-0 w-14 h-14 rounded-full bg-[#131B2B] border border-[#2A3A4A] flex items-center justify-center text-[#556677]"><Trophy size={20} /></div>
                                <div className="text-[#8899AA] font-bold text-lg mb-1">Staff Engineer (L6)</div>
                                <div className="text-[#556677] text-sm mb-3">Target: 2-3 Years</div>
                                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 text-sm text-[#8899AA]">
                                    Requires proven architectural leadership, cross-team impact, and mentoring of junior engineers.
                                </div>
                            </div>

                            <div className="relative pl-16 pb-8">
                                <div className="absolute left-[-2px] top-1 w-14 h-14 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10"><Star size={24} fill="currentColor" /></div>
                                <div className="text-blue-400 font-bold text-2xl mb-1">Senior Engineer (L5)</div>
                                <div className="text-white text-sm font-semibold mb-3 flex items-center gap-2"><MoveUpRight size={14} className="text-emerald-400" /> Current Role (Since Jan 2024)</div>
                                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-sm text-[#AABBCC]">
                                    Leading the frontend architecture for HRFlow core modules. High performance rating in the last 2 review cycles.
                                </div>
                            </div>

                            <div className="relative pl-16 opacity-60">
                                <div className="absolute left-[3px] top-1 w-12 h-12 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-emerald-400"><ShieldCheck size={20} /></div>
                                <div className="text-emerald-400 font-bold text-lg mb-1">SDE II (L4)</div>
                                <div className="text-[#8899AA] text-sm mb-3">Completed: Jan 2022 - Dec 2023</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-4">Promotion Readiness (L6)</h3>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-black text-amber-400">65%</span>
                            <span className="text-[#8899AA] text-sm pb-1 font-bold">Ready</span>
                        </div>
                        <div className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden mb-6">
                            <div className="h-full bg-amber-400 rounded-full w-[65%]" />
                        </div>

                        <h4 className="text-white text-sm font-bold mb-3">Skill Gaps (To bridge)</h4>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#AABBCC]">System Design (Distributed)</span>
                                    <span className="text-amber-400">Needs Work</span>
                                </div>
                                <div className="h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden"><div className="h-full bg-amber-400 w-[40%]" /></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#AABBCC]">Mentorship / People Skills</span>
                                    <span className="text-emerald-400">On Track</span>
                                </div>
                                <div className="h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[80%]" /></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#AABBCC]">Cross-functional Comm.</span>
                                    <span className="text-emerald-400">Mastered</span>
                                </div>
                                <div className="h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[100%]" /></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-2">Suggested Learning</h3>
                        <p className="text-[#AABBCC] text-xs mb-4">Curated courses to hit your L6 readiness sooner.</p>
                        <button className="w-full bg-[#0A1420] hover:bg-[#131B2B] border border-[#2A3A4A] text-indigo-400 font-bold py-2.5 rounded-xl text-sm transition-colors">
                            View Recommended Paths
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
