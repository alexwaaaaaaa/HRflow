"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Target, BookOpen, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function DevelopmentPlanScreen() {
    return (
        <Page
            title="Individual Development Plan (IDP)"
            subtitle="Structured learning and experience tracking for high-potential succession candidates."
            breadcrumbs={[{ label: "Succession", href: "/succession" }, { label: "Dev Plan" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><BookOpen size={24} className="text-indigo-400" /> Individual Development Plan (IDP)</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Structured learning and experience tracking for high-potential succession candidates.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/50 flex items-center justify-center text-indigo-300 font-bold text-xl shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        ER
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">Elena Rodriguez</h2>
                        <span className="text-sm text-[#8899AA]">Sr. Director, Platform Eng</span>
                    </div>
                </div>

                <div className="bg-[#131B2B] rounded-xl border border-[#2A3A4A] p-4 flex gap-8">
                    <div>
                        <div className="text-[#556677] text-[10px] font-bold uppercase tracking-wider mb-1">Target Role</div>
                        <div className="text-white font-bold text-sm">Chief Technology Officer</div>
                    </div>
                    <div className="border-l border-[#2A3A4A] pl-8">
                        <div className="text-[#556677] text-[10px] font-bold uppercase tracking-wider mb-1">Current Readiness</div>
                        <div className="text-amber-400 font-bold text-sm flex items-center gap-2">1-2 Years <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span></div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Experience & Exposure Plan (70/20/10)</h3>

                        <div className="space-y-6">
                            {/* 70% Experience */}
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold text-[#8899AA] mb-3">
                                    <div className="w-2 h-2 rounded bg-indigo-500"></div> On-the-Job Experience (70%)
                                </h4>
                                <div className="space-y-3">
                                    <div className="bg-[#131B2B] border border-indigo-500/30 rounded-xl p-4 flex gap-4">
                                        <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-white font-bold text-sm mb-1">Lead M&A Technical Due Diligence</div>
                                            <p className="text-[#8899AA] text-xs">Expose to inorganic growth strategy and financial evaluations.</p>
                                            <div className="mt-2 text-[10px] text-[#556677] font-bold uppercase">Completed Q2 FY25</div>
                                        </div>
                                    </div>
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex gap-4">
                                        <Clock size={20} className="text-amber-400 shrink-0 mt-0.5" />
                                        <div className="w-full">
                                            <div className="text-white font-bold text-sm mb-1">Acting GM (Sabbatical Coverage)</div>
                                            <p className="text-[#8899AA] text-xs">P&L ownership for the Enterprise SaaS division for 6 months.</p>
                                            <div className="mt-3 flex justify-between items-center w-full">
                                                <div className="text-[10px] text-amber-500 font-bold uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">In Progress (Month 2/6)</div>
                                                <button className="text-xs text-indigo-400 font-bold hover:text-white transition-colors">Add Milestone Note</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 20% Exposure */}
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold text-[#8899AA] mb-3">
                                    <div className="w-2 h-2 rounded bg-purple-500"></div> Exposure & Mentoring (20%)
                                </h4>
                                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex gap-4">
                                    <div className="w-5 h-5 rounded-full border border-[#556677] shrink-0 mt-0.5"></div>
                                    <div>
                                        <div className="text-white font-bold text-sm mb-1">Board Meeting Presentations</div>
                                        <p className="text-[#8899AA] text-xs">Present technology strategy updates to the Board of Directors bi-annually.</p>
                                        <div className="mt-2 text-[10px] text-[#556677] font-bold uppercase">Target: Q4 FY26</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Formal Education (10%)</h3>
                        <div className="space-y-4">
                            <div className="p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl hover:border-indigo-500/50 transition-colors cursor-pointer group">
                                <div className="text-white font-bold text-sm group-hover:text-indigo-400 transition-colors">Stanford Executive Program</div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-[#556677] text-xs">Budgeted ($75k)</span>
                                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1"><AlertCircle size={12} /> Needs scheduling</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-4 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2 rounded-xl text-sm transition-colors text-center border-dashed">
                            + Add Formal T&D
                        </button>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mb-3 border border-emerald-500/20">
                            <Target size={20} />
                        </div>
                        <h3 className="text-white font-bold mb-2">Readiness Update</h3>
                        <p className="text-[#8899AA] text-xs mb-4">Change succession readiness status based on recent IDP progress.</p>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                            Promote to "Ready Now"
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
