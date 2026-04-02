"use client";

import React from 'react';
import {
    Trees, ShieldAlert, Calendar, User,
    ArrowRight, Info, AlertTriangle, Save, ArrowLeft, Lock, Smartphone, DatabaseZap
} from 'lucide-react';

export default function GardenLeave() {
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
                            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                Garden Leave Protocol <Trees size={24} className="text-emerald-500" />
                            </h1>
                            <p className="text-slate-400 text-sm font-medium italic">Enforce non-compete periods with restricted access.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">

                    {/* Left: Configuration & Access */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-8 shadow-2xl relative overflow-hidden group">

                            <div className="flex items-center gap-4 mb-4 pb-6 border-b border-[#1A2A3A]">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-slate-800 flex items-center justify-center font-black text-emerald-500 text-2xl border border-emerald-500/20">
                                    BR
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-black text-white tracking-tight">Bharat Ramaswami</h2>
                                    <p className="text-xs text-slate-500 font-black tracking-widest uppercase italic">Director • High Frequency Trading</p>
                                </div>
                                <div className="text-right">
                                    <span className="bg-rose-500/10 text-rose-500 border border-rose-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">High Sensitivity Case</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">Temporal Bound</h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase">Commencement Date</label>
                                            <div className="relative">
                                                <Calendar size={18} className="absolute left-4 top-3.5 text-blue-500" />
                                                <input type="date" value="2024-03-20" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3.5 text-white font-bold outline-none focus:border-emerald-500/50" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase">Termination (LWD)</label>
                                            <div className="relative">
                                                <Calendar size={18} className="absolute left-4 top-3.5 text-emerald-500" />
                                                <input type="date" value="2024-09-20" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3.5 text-white font-bold outline-none focus:border-emerald-500/50" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-rose-500 pl-3">Access Restrictions</h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'VPN & Remote Access', icon: Lock, status: 'Revoked' },
                                            { label: 'Official Mobile Number', icon: Smartphone, status: 'Active (Monitor)' },
                                            { label: 'Cloud Repositories', icon: DatabaseZap, status: 'Revoked' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl group/item cursor-pointer hover:border-blue-500/20 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <item.icon size={16} className="text-slate-500 group-hover/item:text-blue-500" />
                                                    <span className="text-xs font-bold text-slate-300">{item.label}</span>
                                                </div>
                                                <span className={`text-[10px] font-black uppercase ${item.status === 'Revoked' ? 'text-rose-500' : 'text-amber-500'}`}>{item.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex gap-4">
                                <Info size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                                <div className="text-xs text-slate-500 font-medium leading-relaxed italic">
                                    Garden Leave implies the employee remains on payroll but must not perform work duties or access company facilities. Full salary benefits apply unless otherwise specified in the separation agreement.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary & Action */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-blue-500/20 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden group">
                            <h2 className="text-sm font-black text-white uppercase tracking-widest text-center italic mb-4">Payout Projection</h2>

                            <div className="space-y-4 pt-4 border-t border-[#1A2A3A]">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-slate-500">Fixed Monthly Gross</span>
                                    <span className="text-white tabular-nums">₹8,50,000.00</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-slate-500">Duration (Months)</span>
                                    <span className="text-white tabular-nums">06</span>
                                </div>
                                <div className="h-px bg-[#1A2A3A] my-4" />
                                <div className="text-center space-y-2">
                                    <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Est. Garden Period Payout</div>
                                    <div className="text-3xl font-black text-white tabular-nums tracking-tighter shadow-blue-500/20 drop-shadow-lg">₹51,00,000.00</div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-[#05111E] border border-emerald-500/30 rounded-2xl text-emerald-500 font-black text-sm hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-3">
                                <Save size={18} /> Initialize Protocol
                            </button>

                            <p className="text-[9px] text-slate-600 font-bold text-center uppercase tracking-tighter mt-4 italic">
                                * Payout subject to strict non-compete compliance
                            </p>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                        </div>

                        <div className="bg-[#0D1928] border border-amber-500/20 rounded-2xl p-6 space-y-4 shadow-xl border-l-4 border-l-amber-500">
                            <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle size={14} /> Legal Compliance
                            </h3>
                            <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed tracking-tight italic">
                                    "Ensure Garden Leave clause is explicitly signed in the annexure. Access revocation must be logged with timestamp for audit trails."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
