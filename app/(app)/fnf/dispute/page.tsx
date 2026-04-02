"use client";

import React from 'react';
import {
    ShieldAlert, MessageSquare, History, ArrowLeft,
    Send, CheckCircle, XCircle, MoreVertical, Paperclip, User, Scale, Clock
} from 'lucide-react';

export default function FnFDispute() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400 font-bold">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                                Dispute Resolution <Scale size={24} className="text-rose-500" />
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">Manage and resolve financial or document-based disagreements.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Active Dispute Chat/Console */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl relative flex flex-col min-h-[600px]">

                            <div className="p-6 border-b border-[#1A2A3A] bg-[#0D1928]/50 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20 shadow-lg">
                                        <ShieldAlert size={18} />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-black text-white uppercase tracking-tight italic">Claim #DISP-99212</h2>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic">Raised by Arnab Das (Ex-Emp) • 2 hrs ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="bg-rose-500/10 text-rose-500 text-[9px] font-black px-3 py-1 rounded-full border border-rose-500/20 italic tracking-widest uppercase">High Priority</span>
                                    <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-slate-500"><MoreVertical size={16} /></button>
                                </div>
                            </div>

                            <div className="flex-1 p-8 space-y-8 overflow-y-auto">
                                <div className="flex gap-4 max-w-[80%] opacity-80">
                                    <div className="w-8 h-8 rounded-full bg-[#060B14] flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0">AD</div>
                                    <div className="space-y-2">
                                        <div className="bg-[#1A2A3A] p-4 rounded-2xl rounded-tl-none text-xs font-medium text-slate-300 leading-relaxed italic border border-[#1A2A3A]">
                                            "I noticed that my leave encashment was calculated for 15 days instead of 18 days. My dashboard shows 18 approved leaves as of my LWD."
                                        </div>
                                        <div className="text-[9px] text-slate-600 font-bold uppercase ml-1 italic tracking-widest">Sent 10:42 AM</div>
                                    </div>
                                </div>

                                <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-lg">HR</div>
                                    <div className="space-y-2 text-right">
                                        <div className="bg-blue-600/10 p-4 rounded-2xl rounded-tr-none text-xs font-medium text-blue-100 leading-relaxed italic border border-blue-600/20 shadow-xl">
                                            "We've received your query. Our finance auditor is cross-verifying the LWP (Leave Without Pay) deductions which might have impacted the balance. Please hold."
                                        </div>
                                        <div className="text-[9px] text-blue-500/50 font-bold uppercase mr-1 italic tracking-widest">Seen • 11:15 AM</div>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <div className="px-4 py-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-full text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] italic">Internal Activity: Payroll Ledger Accessed</div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-[#1A2A3A] bg-[#060B14]/50">
                                <div className="flex gap-3">
                                    <button className="p-3 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-slate-500 hover:text-white transition-all"><Paperclip size={18} /></button>
                                    <input
                                        type="text"
                                        placeholder="Type response to colleague or system log..."
                                        className="flex-1 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-xs font-medium text-white outline-none focus:border-blue-500/50 italic placeholder:text-slate-700"
                                    />
                                    <button className="px-6 py-3 bg-blue-600 rounded-xl text-white font-black text-xs hover:bg-blue-700 transition-all shadow-lg italic flex items-center gap-2">
                                        <Send size={16} /> Send Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case Metadata */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-8 shadow-2xl relative overflow-hidden group">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-[#1A2A3A] pb-4">Dispute Intelligence</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Clock size={16} className="text-blue-500" />
                                        <span className="text-[11px] font-black text-white uppercase italic tracking-tighter">Resolution SLA</span>
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">22h Remaining</span>
                                </div>

                                <div className="space-y-2 pt-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none block italic">Categorization</label>
                                    <div className="p-4 bg-[#060B14] border border-rose-500/20 rounded-xl flex items-center justify-between group/inner">
                                        <span className="text-xs font-black text-rose-500 italic uppercase">Leave Discrepancy</span>
                                        <button className="text-[9px] font-black text-slate-600 uppercase hover:text-white transition-colors">Change</button>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-[#1A2A3A]">
                                    <button className="w-full py-4 bg-[#060B14] border border-emerald-500/30 rounded-xl text-emerald-500 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2">
                                        <CheckCircle size={16} /> Resolve Case
                                    </button>
                                    <button className="w-full py-4 bg-[#060B14] border border-rose-500/30 rounded-xl text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-500/10 transition-all flex items-center justify-center gap-2">
                                        <XCircle size={16} /> Escalate to Finance
                                    </button>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        </div>

                        <div className="bg-[#0D1928] border border-blue-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Quick Audit Context</h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Settlement Status', val: 'Disbursed', color: 'text-emerald-500' },
                                    { label: 'Recovery Pendign', val: 'No', color: 'text-slate-500' },
                                    { label: 'LWD Verification', val: 'Manual Match', color: 'text-blue-500' },
                                ].map((audit, i) => (
                                    <div key={i} className="flex justify-between text-[10px] border-b border-[#1A2A3A]/50 pb-2">
                                        <span className="text-slate-500 font-black uppercase tracking-tighter italic">{audit.label}</span>
                                        <span className={`font-black uppercase tracking-widest ${audit.color}`}>{audit.val}</span>
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
