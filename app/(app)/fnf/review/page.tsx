"use client";

import React from 'react';
import {
    ShieldCheck, Eye, MessageSquare, CheckCircle,
    ArrowLeft, Send, Printer, ExternalLink, Download,
    History, AlertCircle, FileText
} from 'lucide-react';

export default function FnFReview() {
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
                            <h1 className="text-2xl font-black text-white tracking-tight">Final Settlement Review</h1>
                            <p className="text-slate-400 text-sm font-medium italic">Internal Audit & Verification Mode</p>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center gap-4 bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-2xl shadow-xl">
                    <div className="bg-amber-500/10 text-amber-500 p-2 rounded-xl">
                        <Eye size={20} />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-black text-amber-500 uppercase tracking-widest italic">Awaiting Final HR Approval</div>
                        <div className="text-sm font-bold text-slate-400 mt-1">Last edited by <span className="text-blue-500">Finance Team</span> today at 11:42 AM</div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 border border-[#1A2A3A] rounded-xl text-slate-500 hover:text-white transition-all"><Printer size={18} /></button>
                        <button className="p-2 border border-[#1A2A3A] rounded-xl text-slate-500 hover:text-white transition-all"><History size={18} /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Settlement Slip Preview */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#111827] border-2 border-slate-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden group">

                            {/* Watermark */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-[-25deg] pointer-events-none select-none">
                                <FileText size={400} />
                            </div>

                            <div className="relative z-10 space-y-12">
                                <div className="flex justify-between items-start border-b border-slate-800 pb-8">
                                    <div className="space-y-4">
                                        <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-xl">HF</div>
                                        <div>
                                            <h2 className="text-xl font-black text-white">Full & Final settlement Statement</h2>
                                            <p className="text-sm text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Draft Version 1.0.2</p>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <div className="text-xs font-black text-slate-600 uppercase">Statement Date</div>
                                        <div className="text-sm font-bold text-white">24 Mar 2024</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest border-l-2 border-blue-500 pl-3">Employee Details</h3>
                                        <div className="space-y-3">
                                            {[
                                                { k: 'Name', v: 'Arnab Das' },
                                                { k: 'Emp ID', v: 'EMP-771' },
                                                { k: 'Department', v: 'Engineering' },
                                                { k: 'LWD', v: '24 Apr 2024' },
                                            ].map((row, i) => (
                                                <div key={i} className="flex justify-between text-xs border-b border-slate-800/50 pb-2">
                                                    <span className="text-slate-500 font-bold">{row.k}</span>
                                                    <span className="text-white font-black">{row.v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest border-l-2 border-emerald-500 pl-3">Payment Summary</h3>
                                        <div className="space-y-3">
                                            {[
                                                { k: 'Gross Earnings', v: '₹4,75,102.00' },
                                                { k: 'Total Recoveries', v: '₹1,49,900.00' },
                                                { k: 'Payment Mode', v: 'Bank Transfer' },
                                                { k: 'Account No', v: 'XXXX-9821' },
                                            ].map((row, i) => (
                                                <div key={i} className="flex justify-between text-xs border-b border-slate-800/50 pb-2">
                                                    <span className="text-slate-500 font-bold">{row.k}</span>
                                                    <span className="text-white font-black">{row.v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6 text-center">
                                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 leading-none">Net Payable (INR)</div>
                                    <div className="text-5xl font-black text-white tracking-tighter drop-shadow-lg tabular-nums">THREE LAKH TWENTY FIVE THOUSAND TWO HUNDRED TWO</div>
                                </div>

                                <div className="flex justify-between pt-8 border-t border-slate-800 italic">
                                    <div className="text-[10px] text-slate-500 font-bold">* Computer generated statement. No physical signature required.</div>
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><ShieldCheck size={16} /></div>
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Printer size={16} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Actions & Verification */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-8 shadow-xl">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-[#1A2A3A] pb-4 italic">Verification checklist</h3>

                            <div className="space-y-4">
                                {[
                                    { label: 'Bank details verified', checked: true },
                                    { label: 'Asset clearance confirmed', checked: true },
                                    { label: 'IT credentials revoked', checked: false },
                                    { label: 'Gratuity calculation audit', checked: true },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 group cursor-pointer">
                                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${item.checked ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'border-2 border-[#1A2A3A] group-hover:border-blue-500'}`}>
                                            {item.checked && <CheckCircle size={12} className="text-white" />}
                                        </div>
                                        <span className={`text-xs font-bold transition-all ${item.checked ? 'text-slate-200' : 'text-slate-500'}`}>{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 pt-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Feedback / Observations</label>
                                <textarea
                                    placeholder="Add any internal comments for audit trail..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 text-xs text-white outline-none focus:border-blue-500/50 resize-none min-h-[100px] leading-relaxed italic"
                                />
                            </div>

                            <div className="space-y-3 pt-4 border-t border-[#1A2A3A]">
                                <button className="w-full py-4 bg-emerald-600 rounded-xl text-white font-black text-sm hover:translate-y-[-2px] transition-all shadow-xl flex items-center justify-center gap-2">
                                    <CheckCircle size={18} /> Approve & Finalize
                                </button>
                                <button className="w-full py-4 bg-[#060B14] border border-rose-500/30 rounded-xl text-rose-500 font-bold text-sm hover:bg-rose-500/5 transition-all flex items-center justify-center gap-2">
                                    <History size={16} /> Revert to Finance
                                </button>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-3 shadow-lg">
                            <AlertCircle size={18} className="text-blue-500 shrink-0" />
                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic tracking-tight">
                                Approving this statement will lock the financial records for the current auditing period. Any subsequent changes will require a revision case.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
