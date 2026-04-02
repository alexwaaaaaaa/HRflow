"use client";

import React, { useState } from 'react';
import {
    Calculator, AlertTriangle, IndianRupee, RotateCcw,
    ChevronDown, Info
} from 'lucide-react';

export default function PenaltyCalculator() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Penalty Calculator <Calculator size={28} className="text-rose-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Estimate damages and interest under Section 14B & 7Q (EPFO) and ESIC late fees.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Calculator Form */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-8 shadow-2xl relative">
                        <div className="space-y-6">

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Compliance Type</label>
                                <div className="relative">
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-white outline-none appearance-none focus:border-rose-500 transition-colors">
                                        <option>EPFO (PF) Damages & Interest</option>
                                        <option>ESIC Late Payment</option>
                                        <option>TDS Late Filing Fee (234E)</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Principal Amount (₹)</label>
                                    <input type="number" defaultValue="50000" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-rose-500 transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Due Date</label>
                                    <input type="date" defaultValue="2024-03-15" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-rose-500 transition-colors [color-scheme:dark]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Actual Payment Date</label>
                                    <input type="date" defaultValue="2024-06-20" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-rose-500 transition-colors [color-scheme:dark]" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <button className="flex-1 py-4 bg-rose-600 rounded-xl text-white font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg flex items-center justify-center gap-2">
                                    <Calculator size={16} /> Calculate Penalty
                                </button>
                                <button className="px-6 py-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-slate-400 font-black hover:text-white transition-all">
                                    <RotateCcw size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="bg-gradient-to-br from-[#0D1928] to-[#060B14] border border-rose-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <IndianRupee size={120} className="text-rose-500" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col">
                            <h2 className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center gap-2 mb-8">
                                <AlertTriangle size={14} /> Estimated Liability Report
                            </h2>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b border-[#1A2A3A] pb-4">
                                    <span className="text-sm font-bold text-slate-400">Delay Period</span>
                                    <span className="text-xl font-black text-white">97 Days</span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-[#060B14] rounded-xl border border-[#1A2A3A]">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-300">Interest (Sec 7Q)</span>
                                            <span className="text-[9px] text-slate-500 uppercase tracking-widest">@ 12% p.a.</span>
                                        </div>
                                        <span className="text-sm font-black text-amber-500">₹ 1,594</span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-[#060B14] rounded-xl border border-[#1A2A3A]">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-300">Damages (Sec 14B)</span>
                                            <span className="text-[9px] text-slate-500 uppercase tracking-widest">@ 10% p.a. (2-4 months)</span>
                                        </div>
                                        <span className="text-sm font-black text-rose-500">₹ 1,328</span>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t border-[#1A2A3A]">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Estimated Liability</span>
                                        <span className="text-3xl font-black text-rose-500 tracking-tight">₹ 52,922</span>
                                    </div>
                                    <p className="text-[9px] font-medium text-slate-500 mt-2 flex items-start gap-1 italic">
                                        <Info size={12} className="shrink-0 mt-0.5" />
                                        Note: Final demand is subject to notice by the Regional PF Commissioner. This is an estimate based on statutory rates.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
