"use client";

import React from 'react';
import {
    Calculator, Calendar, Info, AlertTriangle, ArrowLeft,
    ChevronRight, RefreshCcw, Save, ShieldCheck
} from 'lucide-react';

export default function NoticePeriodCalculator() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">Notice Period Calculator</h1>
                            <p className="text-slate-400 text-sm font-medium">Verify LWD based on employee tenure and policy rules.</p>
                        </div>
                    </div>
                    <button className="px-5 py-2.5 bg-[#1A2A3A] border border-blue-500/20 rounded-xl text-sm font-bold text-blue-400 hover:bg-blue-500/10 transition-all flex items-center shadow-lg">
                        <RefreshCcw size={16} className="mr-2" /> Reset Values
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Configuration */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-8 shadow-2xl relative overflow-hidden group">

                            <div className="grid grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Employee Group</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3.5 text-white outline-none focus:border-blue-500/50 appearance-none font-bold">
                                        <option>Full-Time Regular</option>
                                        <option>Probationary</option>
                                        <option>Senior Management</option>
                                        <option>Contractual</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Notice Policy</label>
                                    <div className="p-3.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-300 flex items-center justify-between">
                                        Standard (90 Days) <ShieldCheck size={16} className="text-emerald-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Resignation Date</label>
                                    <div className="relative">
                                        <Calendar size={18} className="absolute left-4 top-3.5 text-blue-500" />
                                        <input type="date" value="2024-03-12" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3.5 text-white font-bold outline-none focus:border-blue-500/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Shortfall Period (Days)</label>
                                    <div className="relative">
                                        <Calculator size={18} className="absolute left-4 top-3.5 text-amber-500" />
                                        <input type="number" defaultValue="0" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3.5 text-white font-bold outline-none focus:border-blue-500/50" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex gap-4 relative z-10">
                                <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                                <div className="text-xs text-slate-500 font-medium leading-relaxed">
                                    Calculator automatically accounts for the notice period starting the day after resignation submission. Any shortfall will require either a waiver or a buyout adjustment in the final settlement.
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 border-l-4 border-amber-500 pl-3">Adjustments & Leaves</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Leave Balance Credit', desc: 'Add encashable leaves to shorten LWD', type: 'Credit' },
                                    { label: 'Unpaid Leave Penalty', desc: 'Extend LWD for unapproved absences', type: 'Deduction' },
                                    { label: 'Management Discretion', desc: 'Manual override for strategic handovers', type: 'Manual' },
                                ].map((adj, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-blue-500/30 transition-all cursor-pointer group">
                                        <div className="flex-1">
                                            <div className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{adj.label}</div>
                                            <div className="text-[11px] text-slate-500 font-medium">{adj.desc}</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input type="number" placeholder="Days" className="w-20 bg-[#0D1928] border border-[#1A2A3A] rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500" />
                                            <ChevronRight size={14} className="text-slate-700" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Results Card */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-[#0066FF] to-[#0044CC] rounded-3xl p-8 relative overflow-hidden shadow-2xl text-white text-center group">
                            <div className="relative z-10">
                                <h3 className="text-sm font-black uppercase tracking-widest text-white/70 mb-8">Calculated LWD</h3>
                                <div className="text-6xl font-black mb-2 tabular-nums drop-shadow-lg group-hover:scale-105 transition-transform">10</div>
                                <div className="text-2xl font-black mb-8 opacity-80 italic uppercase">June 2024</div>

                                <div className="bg-white/10 rounded-2xl p-4 space-y-2 mb-8 backdrop-blur-sm border border-white/10">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span>Base Period</span>
                                        <span>90 Days</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold">
                                        <span>Adjustments</span>
                                        <span>-02 Days</span>
                                    </div>
                                    <div className="h-px bg-white/20 my-2" />
                                    <div className="flex justify-between text-sm font-black uppercase">
                                        <span>Total Duration</span>
                                        <span className="text-yellow-300">88 Days</span>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-white rounded-2xl text-[#0066FF] font-black text-sm hover:translate-y-[-2px] transition-all shadow-xl active:translate-y-0">
                                    Save & Update Case
                                </button>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
                        </div>

                        <div className="bg-[#0D1928] border border-rose-500/20 rounded-2xl p-6 space-y-4 shadow-xl">
                            <h3 className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle size={14} /> Potential Conflicts
                            </h3>
                            <div className="p-3 bg-rose-500/5 rounded-xl border border-rose-500/10">
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
                                    "Proposed LWD falls on a company holiday (Dragon Boat Festival). Consider shifting to the previous working day."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
