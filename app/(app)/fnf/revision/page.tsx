"use client";

import React from 'react';
import {
    History, Edit3, ArrowLeft, RefreshCcw,
    AlertTriangle, MessageSquare, Save, ChevronRight, FileText, Download, Briefcase, ShieldCheck
} from 'lucide-react';

export default function FnFRevision() {
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
                            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                                Case Revision <RefreshCcw size={20} className="text-amber-500" />
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">Revisit and modify finalized settlement for Correction.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center shadow-lg">
                            <History size={16} className="mr-2" /> Revision History
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Left: Revision Details */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-8 shadow-2xl relative overflow-hidden group">

                            <div className="flex items-center gap-6 mb-4 pb-6 border-b border-[#1A2A3A]">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-slate-800 flex items-center justify-center font-black text-blue-500 text-2xl border border-blue-500/20">
                                    AD
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-black text-white tracking-tight">Arnab Das</h2>
                                    <p className="text-xs text-slate-500 font-black tracking-widest uppercase italic">Original settlement: ₹3,25,202.00 • 24 Mar 24</p>
                                </div>
                                <div className="text-right">
                                    <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">Post-Audit Revision</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Primary Revision Reason</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-4 text-sm font-bold text-white outline-none focus:border-amber-500/50 appearance-none shadow-inner">
                                        <option>Discrepancy in Leave Balance</option>
                                        <option>Incorrect TDS Calculation</option>
                                        <option>Missed Expense Reimbursement</option>
                                        <option>Late Asset Recovery Adjustment</option>
                                        <option>Legal / Dispute Order</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Revision Priority</label>
                                    <div className="flex gap-3">
                                        {['Routine', 'Urgent', 'Immediate'].map((p) => (
                                            <button key={p} className={`flex-1 py-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${p === 'Urgent' ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 'bg-[#060B14] border-[#1A2A3A] text-slate-600'
                                                }`}>
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 italic">
                                    <MessageSquare size={14} className="text-blue-500" /> Executive summary of the Correction
                                </label>
                                <textarea
                                    placeholder="Explain exactly what is being revised and the justification for this outlier change..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-2xl p-5 text-slate-300 outline-none focus:border-amber-500/50 min-h-[160px] resize-none font-medium leading-relaxed italic shadow-inner"
                                />
                            </div>

                            <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl flex gap-4">
                                <AlertTriangle size={20} className="text-rose-500 shrink-0 mt-0.5" />
                                <div className="text-xs text-slate-500 font-medium leading-relaxed italic">
                                    Warning: Revision case will trigger a notification to the employee and internal audit team. This will create a secondary settlement statement (v2.0).
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Revision Scope */}
                    <div className="space-y-6 animate-in slide-in-from-right duration-1000">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-[#1A2A3A] pb-4 text-center">Locked Fields Adjustment</h3>

                            <div className="space-y-4">
                                {[
                                    { label: 'Leave Encashment', original: '82,500', icon: FileText },
                                    { label: 'Notice Recovery', original: '48,000', icon: Briefcase },
                                    { label: 'Statutory Dues', original: '2,15,400', icon: ShieldCheck },
                                ].map((field, i) => (
                                    <div key={i} className="space-y-2 group cursor-pointer">
                                        <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                                            <span>{field.label}</span>
                                            <span className="group-hover:text-blue-500 transition-colors">Edit</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl group-hover:border-amber-500/30 transition-all">
                                            <field.icon size={14} className="text-slate-600" />
                                            <input type="text" defaultValue={field.original} className="bg-transparent text-sm font-black text-white w-full outline-none" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <button className="w-full py-4 bg-amber-600 rounded-2xl text-white font-black text-sm hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 italic">
                                    <RefreshCcw size={18} /> Initiate Revision
                                </button>
                            </div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
