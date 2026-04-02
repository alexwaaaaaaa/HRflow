"use client";

import React from 'react';
import {
    RefreshCcw, ArrowRight, User, ShieldCheck, Download, Calendar, ArrowLeft,
    Landmark, CheckCircle, Info, Landmark as Bank, FileText, Send
} from 'lucide-react';

export default function PFTransfer() {
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
                            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                                EPF Transfer Support (Form 13) <RefreshCcw size={22} className="text-blue-500" />
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">Coordinate transfer of PF balance from previous account to current member ID.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">

                    {/* Transfer Details */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-10 shadow-2xl relative overflow-hidden group">

                            {/* Comparison View */}
                            <div className="grid grid-cols-2 gap-0 relative">
                                <div className="p-6 bg-[#060B14] border border-[#1A2A3A] rounded-l-2xl border-r-0 space-y-6 shadow-inner z-10">
                                    <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest italic flex items-center gap-2">
                                        <Bank size={14} /> Previous Establishment
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="text-[10px] text-slate-500 font-black uppercase">Member ID: MH/BAN/001928/88</div>
                                        <div className="text-sm font-black text-white uppercase italic tracking-tighter">Google India Pvt. Ltd.</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase italic">DL/CPM/0029/982</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-[#0D1928] shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                                <div className="p-6 bg-[#060B14] border border-[#1A2A3A] rounded-r-2xl border-l-0 space-y-6 shadow-inner text-right z-10">
                                    <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic flex items-center gap-2 justify-end">
                                        Present Establishment <Bank size={14} />
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="text-[10px] text-slate-500 font-black uppercase">Member ID: DL/CPM/0029/982</div>
                                        <div className="text-sm font-black text-white uppercase italic tracking-tighter">HRFlow Solutions Pvt. Ltd.</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase italic">MH/BAN/001928/88</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-blue-500 pl-3">Transfer Application (Form 13)</h3>
                                <div className="bg-[#060B14] border border-[#1A2A3A] rounded-2xl p-6 space-y-6 group-hover:border-blue-500/20 transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><FileText size={20} /></div>
                                            <div>
                                                <div className="text-xs font-black text-white uppercase tracking-tighter italic">Form 13 - Revised (EPFO)</div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase italic tracking-widest">Digital transfer claim authorization letter</div>
                                            </div>
                                        </div>
                                        <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-[10px] font-black uppercase text-white transition-all shadow-lg flex items-center gap-2">
                                            <Download size={14} /> Pre-fill Form
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-[#060B14] border border-amber-500/20 rounded-2xl flex items-start gap-4 shadow-inner relative overflow-hidden group/alert">
                                <Info size={20} className="text-amber-500 shrink-0 mt-0.5" />
                                <div className="space-y-2">
                                    <h4 className="text-[11px] font-black text-white uppercase italic">Attestation Requirement</h4>
                                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic tracking-tighter uppercase">
                                        The transfer claim must be attested by either the previous or the present employer. Online attestation through DSC (Digital Signature) is the preferred method for faster processing.
                                    </p>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-amber-500/5 rounded-full group-hover/alert:scale-150 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* Transfer Status & Actions */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gradient-to-br from-[#0D1928] to-[#1A2A3A] border border-[#1A2A3A] rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden group border-t-4 border-t-blue-500">
                            <h2 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] text-center mb-6 italic">Action Hub</h2>

                            <div className="space-y-6 relative z-10">
                                <button className="w-full py-5 bg-[#0066FF] rounded-2xl text-white font-black text-xs hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(0,102,255,0.4)] flex flex-col items-center gap-2">
                                    <Send size={20} />
                                    <span>Initiate OTCP Transfer</span>
                                    <span className="text-[8px] opacity-60 font-bold italic normal-case">Online Transfer Claim Portal</span>
                                </button>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500"><CheckCircle size={16} /></div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">UAN Verified (100XXX)</div>
                                    </div>
                                    <div className="flex items-center gap-3 opacity-30">
                                        <div className="w-8 h-8 rounded-full bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center text-slate-600"><CheckCircle size={16} /></div>
                                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-tighter italic">Claim Apprv. (Pending)</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />
                        </div>

                        <div className="bg-[#0D1928] border border-emerald-500/20 rounded-2xl p-6 space-y-4 shadow-xl border-l-4 border-l-emerald-500 relative group overflow-hidden">
                            <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest italic flex items-center gap-2 relative z-10">
                                <ShieldCheck size={14} /> Trust Compliance
                            </h3>
                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic relative z-10">
                                HRFlow Solutions is an Exempted PF Trust. Transfers to/from non-exempted establishments may take 15-20 additional days for ledger synchronization.
                            </p>
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:scale-125 transition-transform" />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
