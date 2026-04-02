"use client";

import React from "react";
import Link from "next/link";
import {
    Briefcase, ChevronRight, Edit, Users, Clock, Target, CreditCard, ChevronDown, CheckCircle2
} from "lucide-react";

export default function OpenPositionsDetailScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                            <Link href="/org-chart/positions/open" className="hover:text-white transition-colors">Open Positions</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">REQ-2051</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            Senior AI Engineer
                            <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded text-xs font-semibold tracking-wider uppercase">Sourcing</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 border border-[#2A3A4A] hover:bg-[#1A2A3A] text-white text-sm font-medium rounded-lg transition-colors">
                            Hold Requisition
                        </button>
                        <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(236,72,153,0.3)]">
                            <Edit className="w-4 h-4" /> Edit Req
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column (Details) */}
                    <div className="col-span-2 space-y-6">

                        {/* Key Info Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-4">
                                <div className="p-3 bg-[#1A2A3A] rounded-lg">
                                    <Clock className="w-5 h-5 text-pink-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#8899AA] uppercase tracking-wider mb-0.5">Aging</p>
                                    <p className="text-lg font-bold text-white">65 Days</p>
                                </div>
                            </div>
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-4">
                                <div className="p-3 bg-[#1A2A3A] rounded-lg">
                                    <Target className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#8899AA] uppercase tracking-wider mb-0.5">Target Hire Date</p>
                                    <p className="text-sm font-bold text-white">Nov 15, 2025</p>
                                </div>
                            </div>
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-4">
                                <div className="p-3 bg-[#1A2A3A] rounded-lg">
                                    <CreditCard className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#8899AA] uppercase tracking-wider mb-0.5">Budget Alloc.</p>
                                    <p className="text-sm font-bold text-white">₹35L - ₹45L</p>
                                </div>
                            </div>
                        </div>

                        {/* Profile & Description */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                            <div className="p-5 border-b border-[#1A2A3A]">
                                <h3 className="text-sm font-bold text-white">Job Profile & Organizational Placement</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-8">
                                    <div>
                                        <p className="text-[11px] text-[#8899AA] mb-1">Department</p>
                                        <p className="text-sm text-white font-medium">Engineering (DEPT-001)</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-[#8899AA] mb-1">Hiring Manager</p>
                                        <div className="flex items-center gap-2">
                                            <img src="https://i.pravatar.cc/150?u=a" className="w-5 h-5 rounded-full" alt="HM" />
                                            <p className="text-sm text-white font-medium">Amit Kumar</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-[#8899AA] mb-1">Designation & Grade</p>
                                        <p className="text-sm text-white font-medium">Senior Software Engineer (L4)</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-[#8899AA] mb-1">Location / Type</p>
                                        <p className="text-sm text-white font-medium">Bangalore HQ · On-site · Full Time</p>
                                    </div>
                                </div>

                                <h4 className="text-sm font-bold text-white mb-2">Job Description Summary</h4>
                                <p className="text-sm text-[#8899AA] leading-relaxed">
                                    We are looking for a Senior AI Engineer to join our core R&D team. You will be responsible for designing, developing, and deploying scalable machine learning models that power the HRflow intelligence engine. The ideal candidate will have deep expertise in PyTorch/TensorFlow and a track record of deploying models into production environments.
                                </p>
                                <button className="mt-3 text-sm text-pink-400 font-medium hover:underline">View Full Job Description</button>
                            </div>
                        </div>

                        {/* Pipeline Stats */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-white mb-6">Recruitment Funnel</h3>
                            <div className="flex justify-between items-center relative">
                                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#1A2A3A] -translate-y-1/2 z-0"></div>

                                {[
                                    { step: "Sourced", count: 125, active: false, done: true },
                                    { step: "Screening", count: 42, active: false, done: true },
                                    { step: "Assessment", count: 18, active: true, done: false },
                                    { step: "Interviews", count: 5, active: false, done: false },
                                    { step: "Offer", count: 0, active: false, done: false },
                                ].map((stage, idx) => (
                                    <div key={idx} className="relative z-10 flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 bg-[#0D1928] ${stage.done ? 'border-emerald-500 text-emerald-500' :
                                                stage.active ? 'border-pink-500 text-pink-500' : 'border-[#2A3A4A] text-[#4A5A6A]'
                                            }`}>
                                            {stage.done ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{stage.count}</span>}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${stage.active ? 'text-white' : 'text-[#8899AA]'}`}>{stage.step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Sidebar setup) */}
                    <div className="col-span-1 space-y-6">

                        {/* Cost Center / Finance */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <h3 className="text-sm font-bold text-white mb-4">Financial Linking</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg">
                                    <p className="text-[10px] text-[#8899AA] uppercase mb-1">Cost Center</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-bold text-white">CC-1021 (R&D BLR)</p>
                                        <Link href="#" className="text-indigo-400 text-xs hover:underline">View</Link>
                                    </div>
                                </div>
                                <div className="p-3 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg">
                                    <p className="text-[10px] text-[#8899AA] uppercase mb-1">Req Type</p>
                                    <p className="text-sm font-medium text-white">Replacement hire for EMP-0092</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <h3 className="text-sm font-bold text-white mb-4">Requisition Log</h3>
                            <div className="space-y-5 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#2A3A4A] before:to-transparent">
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow"></div>
                                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.25rem)] p-3 rounded border border-[#2A3A4A] bg-[#1A2A3A]/40">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="font-bold text-white text-xs">Candidates moved</div>
                                            <time className="font-mono text-[10px] text-[#8899AA]">Yesterday</time>
                                        </div>
                                        <div className="text-xs text-[#8899AA]">3 candidates moved to Assessment phase from Screening.</div>
                                    </div>
                                </div>
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-pink-500/30 bg-pink-500/10 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow"></div>
                                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.25rem)] p-3 rounded border border-[#2A3A4A] bg-[#1A2A3A]/40">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="font-bold text-white text-xs">Req Approved</div>
                                            <time className="font-mono text-[10px] text-[#8899AA]">Oct 12</time>
                                        </div>
                                        <div className="text-xs text-[#8899AA]">Approved by VP Engineering and CFO.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
