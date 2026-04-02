"use client";

import React from 'react';
import {
    CalendarDays, Bell, CheckSquare, Search,
    ArrowRight, MapPin, Briefcase
} from 'lucide-react';

export default function LabourLawCalendar() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            Labour Law Master Calendar <CalendarDays size={24} className="text-emerald-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Holistic view of all periodic returns, registers, and renewals.</p>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-[#1A2A3A]/50">
                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Next 30 Days</h2>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded text-[9px] font-black uppercase tracking-widest">
                                2 Critical
                            </span>
                            <span className="px-3 py-1 bg-[#1A2A3A] text-slate-400 border border-slate-700 rounded text-[9px] font-black uppercase tracking-widest">
                                4 Routine
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">

                        {/* Event Item */}
                        <div className="bg-[#060B14] border-l-4 border-l-rose-500 border-y border-r border-[#1A2A3A] p-5 rounded-r-2xl hover:bg-[#1A2A3A]/30 transition-all flex flex-col md:flex-row gap-6 md:items-center">
                            <div className="min-w-[120px]">
                                <div className="text-xl font-black text-white">15 May</div>
                                <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">In 3 Days</div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    PF & ESIC Remittance <span className="bg-[#1A2A3A] text-[8px] px-2 py-0.5 rounded text-slate-400 border border-[#1A2A3A]">Monthly</span>
                                </h3>
                                <p className="text-[11px] text-slate-400 font-medium italic mb-2">EPFO & ESIC Portal | Pan-India</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-black text-white border-2 border-[#060B14]">HR</div>
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] font-black text-white border-2 border-[#060B14]">FIN</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:border-slate-500 transition-colors">
                                    Action Required
                                </button>
                            </div>
                        </div>

                        {/* Event Item */}
                        <div className="bg-[#060B14] border-l-4 border-l-blue-500 border-y border-r border-[#1A2A3A] p-5 rounded-r-2xl hover:bg-[#1A2A3A]/30 transition-all flex flex-col md:flex-row gap-6 md:items-center">
                            <div className="min-w-[120px]">
                                <div className="text-xl font-black text-white">20 May</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">In 8 Days</div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    PT Return Filing <span className="bg-[#1A2A3A] text-[8px] px-2 py-0.5 rounded text-slate-400 border border-[#1A2A3A]">Monthly</span>
                                </h3>
                                <p className="text-[11px] text-slate-400 font-medium italic mb-2 flex items-center gap-1"><MapPin size={12} /> Karnataka State (e-Prerana)</p>
                            </div>
                            <div className="text-right">
                                <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
                                    View Task
                                </button>
                            </div>
                        </div>

                        {/* Event Item */}
                        <div className="bg-[#060B14] border-l-4 border-l-amber-500 border-y border-r border-[#1A2A3A] p-5 rounded-r-2xl hover:bg-[#1A2A3A]/30 transition-all flex flex-col md:flex-row gap-6 md:items-center">
                            <div className="min-w-[120px]">
                                <div className="text-xl font-black text-white">31 May</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">In 19 Days</div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    Quarterly TDS Return (24Q/26Q) <span className="bg-[#1A2A3A] text-[8px] px-2 py-0.5 rounded text-slate-400 border border-[#1A2A3A]">Quarterly</span>
                                </h3>
                                <p className="text-[11px] text-slate-400 font-medium italic mb-2">Income Tax Dept | Q4 Period</p>
                            </div>
                            <div className="text-right">
                                <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
                                    View Task
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
