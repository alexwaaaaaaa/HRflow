"use client";

import React from 'react';
import {
    AlertCircle, FileText, User, Calendar, CheckCircle,
    XCircle, ArrowLeft, Send, MessageSquare, Info, ShieldAlert
} from 'lucide-react';

export default function NoticePeriodWaiver() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-700">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">Notice Period Waiver</h1>
                            <p className="text-slate-400 text-sm font-medium italic">Request ID: <span className="text-blue-500">WVR-44102</span></p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">

                    {/* Main Request Form */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-8 shadow-2xl relative overflow-hidden group">

                            <div className="flex items-center gap-4 border-b border-[#1A2A3A] pb-6">
                                <div className="w-14 h-14 rounded-2xl bg-[#1A2A3A] flex items-center justify-center font-black text-rose-500 text-xl border border-rose-500/30">
                                    SG
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-black text-white uppercase tracking-tight">Sanya Gupta</h2>
                                    <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">EMP-892 • Product Manager</p>
                                </div>
                                <div className="text-right">
                                    <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Pending HOD Review</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Shortfall Days</label>
                                    <div className="text-4xl font-black text-white tabular-nums">45 <span className="text-sm font-bold text-slate-500 tracking-normal opacity-50 ml-1">Days</span></div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Proposed LWD</label>
                                    <div className="text-4xl font-black text-white italic truncate tracking-tighter">15 Mar 24</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare size={14} className="text-blue-500" /> Justification for Waiver
                                </label>
                                <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-slate-300 text-sm leading-relaxed border-l-4 border-l-amber-500/50 italic bg-gradient-to-r from-amber-500/5 to-transparent">
                                    "The employee is relocating overseas for higher studies. Team legacy handover completed successfully. No critical pending deployments. HOD has cleared the backfill strategy."
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-[#1A2A3A]">
                                <button className="flex-1 py-4 bg-[#00E5A0] rounded-xl text-[#060B14] font-black text-sm hover:bg-[#00cc8e] transition-all shadow-[0_0_25px_rgba(0,229,160,0.25)] flex items-center justify-center gap-2">
                                    <CheckCircle size={18} /> Approve Waiver
                                </button>
                                <button className="px-8 py-4 border border-[#1A2A3A] text-slate-400 font-black text-sm rounded-xl hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30 transition-all flex items-center gap-2">
                                    <XCircle size={18} /> Reject
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <FileText size={14} className="text-blue-500" /> Attached Evidence
                            </h3>
                            <div className="flex gap-4">
                                <div className="p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-bold text-slate-400 hover:border-blue-500/30 transition-all cursor-pointer flex items-center gap-2 group">
                                    <FileText size={16} className="text-slate-600 group-hover:text-blue-500" /> Relocation_Offer.pdf
                                </div>
                                <div className="p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-bold text-slate-400 hover:border-blue-500/30 transition-all cursor-pointer flex items-center gap-2 group">
                                    <FileText size={16} className="text-slate-600 group-hover:text-blue-500" /> KT_Report_V1.pdf
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Policy & Risk */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-rose-500/30 rounded-2xl p-6 shadow-xl border-l-4 border-l-rose-500">
                            <h3 className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                                <ShieldAlert size={14} /> Recovery Risk Analysis
                            </h3>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase text-slate-500">Notice Pay Recovery</div>
                                    <div className="text-xl font-black text-rose-500">₹1,45,000</div>
                                    <div className="text-[9px] font-bold text-slate-600 uppercase">Applicable if waiver is rejected</div>
                                </div>
                                <div className="h-px bg-rose-500/10" />
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase text-slate-500">Financial Impact</div>
                                    <div className="text-lg font-black text-white">Full Waiver</div>
                                    <div className="text-[9px] font-bold text-slate-600 uppercase">Cost to company: ₹1.45L</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Approval Chain</h3>
                            <div className="space-y-6 relative ml-2">
                                {[
                                    { role: 'Reporting Manager', name: 'Kabir Bakshi', status: 'Approved', active: true },
                                    { role: 'Department Head', name: 'Neha Sharma', status: 'Pending', active: true },
                                    { role: 'HR Director', name: 'Rohit Verma', status: 'Awaiting', active: false },
                                ].map((step, i) => (
                                    <div key={i} className={`relative pl-8 pb-6 last:pb-0 ${step.active ? 'opacity-100' : 'opacity-30'}`}>
                                        <div className={`absolute left-0 top-1 w-3 h-3 rounded-full border-2 ${step.status === 'Approved' ? 'bg-emerald-500 border-emerald-500' :
                                                step.status === 'Pending' ? 'bg-[#060B14] border-amber-504' : 'bg-[#060B14] border-[#1A2A3A]'
                                            }`} />
                                        {i < 2 && <div className="absolute left-1.5 top-4 w-px h-[calc(100%-12px)] bg-[#1A2A3A]" />}
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{step.role}</div>
                                        <div className="text-xs font-bold text-white">{step.name}</div>
                                        <div className={`text-[9px] font-black uppercase mt-1 ${step.status === 'Approved' ? 'text-emerald-500' : 'text-slate-600'
                                            }`}>{step.status}</div>
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
