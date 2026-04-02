"use client";

import React from 'react';
import {
    Activity, ShieldCheck, AlertTriangle, ArrowLeft,
    TrendingUp, ShieldAlert, CheckCircle, Info, Download, Target
} from 'lucide-react';

export default function ComplianceHealthScore() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                Compliance Health Score <Activity size={24} className="text-emerald-500" />
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">Algorithmic risk assessment across all labour and tax laws.</p>
                        </div>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-white hover:bg-[#1A2A3A] transition-all flex items-center gap-2 shadow-lg">
                        <Download size={16} /> Export Detailed Audit
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Score Visual */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden min-h-[400px]">

                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

                            <div className="relative z-10 space-y-6">
                                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Overall Score</h2>

                                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1A2A3A" strokeWidth="6" />
                                        <circle
                                            cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="6"
                                            strokeDasharray="283" strokeDashoffset="17"
                                            className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-6xl font-black text-white tracking-tighter drop-shadow-lg">94</span>
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">Excellent</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4 bg-[#060B14] py-3 px-6 rounded-2xl border border-[#1A2A3A] inline-flex mx-auto">
                                    <TrendingUp size={16} className="text-emerald-500" />
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">+2 Points since last month</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Breakdown */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-8 shadow-2xl">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8 border-b border-[#1A2A3A] pb-4">Category-wise Analysis</h3>

                            <div className="space-y-6">
                                {[
                                    { label: 'PF & ESIC Compliance', score: 98, status: 'Optimal', color: 'emerald', detail: '0 discrepancies in current FY.' },
                                    { label: 'Tax Deductions (TDS/PT)', score: 92, status: 'Good', color: 'emerald', detail: 'Minor delay in Q2 TDS filing.' },
                                    { label: 'State Labour Laws (S&E, LWF)', score: 75, status: 'Action Needed', color: 'amber', detail: 'Maharashtra Shop Act renewal pending.' },
                                    { label: 'Workplace Safety & POSH', score: 100, status: 'Optimal', color: 'emerald', detail: 'Annual returns filed successfully.' },
                                ].map((cat, i) => (
                                    <div key={i} className="flex flex-col gap-2 p-4 bg-[#060B14] border border-[#1A2A3A] rounded-2xl hover:border-slate-700 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <Target size={16} className={`text-${cat.color}-500`} />
                                                <span className="text-xs font-bold text-white uppercase tracking-tight">{cat.label}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-[10px] font-black text-${cat.color}-500 uppercase tracking-widest`}>{cat.score}/100</span>
                                            </div>
                                        </div>
                                        <div className="pl-7 flex justify-between items-end">
                                            <p className="text-[10px] text-slate-500 font-medium italic">{cat.detail}</p>
                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-widest bg-${cat.color}-500/10 text-${cat.color}-500 border border-${cat.color}-500/20`}>
                                                {cat.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
