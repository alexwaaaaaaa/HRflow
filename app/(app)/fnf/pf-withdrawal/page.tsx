"use client";

import React from 'react';
import {
    FileText, User, ShieldCheck, Download, Calendar, ArrowLeft,
    Link as LinkIcon, Info, Landmark, CheckCircle, ChevronRight, HelpCircle
} from 'lucide-react';

export default function PFWithdrawal() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400 font-bold">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight italic">PF Withdrawal Support</h1>
                            <p className="text-slate-400 text-sm font-medium">Assist employees in initiating EPF withdrawal claims.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">

                    {/* Withdrawal Process */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-10 shadow-2xl relative overflow-hidden group">

                            <div className="flex items-center gap-6 border-b border-[#1A2A3A] pb-8">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-slate-800 flex items-center justify-center font-black text-emerald-500 text-2xl border border-emerald-500/20 shadow-xl">
                                    AD
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight italic">Arnab Das</h2>
                                    <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase mt-1">UAN: 100982121021 • MEMBER ID: DL/CPM/0029/982</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-lg">UAN Active & Aadhaar Seeded</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-blue-500 pl-3">Mandatory Forms (Digital Signature Ready)</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { form: 'Form 19', desc: 'Final Settlement of EPF Account', icon: FileText, color: 'text-blue-500' },
                                        { form: 'Form 10C', desc: 'Withdrawal Benefit (Pension Fund)', icon: FileText, color: 'text-emerald-500' },
                                        { form: 'Form 15G', desc: 'Declaration for No TDS Deduction', icon: FileText, color: 'text-amber-500' },
                                        { form: 'Composite Claim Form', desc: 'Aadhaar-based unified withdrawal', icon: ShieldCheck, color: 'text-indigo-500' },
                                    ].map((f, i) => (
                                        <div key={i} className="p-5 bg-[#060B14] border border-[#1A2A3A] rounded-2xl flex items-start gap-4 hover:border-blue-500/30 transition-all cursor-pointer group shadow-inner">
                                            <f.icon size={20} className={`${f.color} shrink-0 mt-1 group-hover:scale-110 transition-transform`} />
                                            <div>
                                                <div className="text-[11px] font-black text-white uppercase tracking-tighter mb-1">{f.form}</div>
                                                <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed">{f.desc}</p>
                                                <button className="mt-3 text-[9px] font-black text-blue-500 uppercase hover:underline flex items-center gap-1 tracking-widest">
                                                    <Download size={10} /> Pre-fill & Download
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-2xl border-l-4 border-l-blue-500 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.05)] transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500"><Landmark size={20} /></div>
                                        <div>
                                            <div className="text-xs font-black text-white uppercase tracking-tighter italic">Last Employer Contribution</div>
                                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">MTD: ₹18,402.00 • ECR Submitted (Mar 24)</div>
                                        </div>
                                    </div>
                                    <CheckCircle size={16} className="text-emerald-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ & Guidelines */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 py-8 space-y-8 shadow-2xl relative overflow-hidden group">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-b border-[#1A2A3A] pb-4">withdrawal Guidelines</h3>

                            <div className="space-y-6">
                                {[
                                    { q: 'Waiting Period', a: '60 days of unemployment is required for full withdrawal.' },
                                    { q: 'TDS on PF', a: 'TDS applies if service is < 5 yrs and amount > ₹50k.' },
                                    { q: 'Aadhaar Linking', a: 'Must be seeded for online claim (UMANG/Portal).' },
                                ].map((faq, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex items-start gap-2">
                                            <HelpCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                                            <span className="text-[11px] font-black text-white uppercase tracking-tighter leading-snug">{faq.q}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic border-l border-[#1A2A3A] pl-3 ml-1.5">{faq.a}</p>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 mt-4">
                                <LinkIcon size={14} /> Unified Portal (EPFO)
                            </button>

                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        </div>

                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-3 shadow-lg">
                            <Info size={18} className="text-blue-500 shrink-0" />
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic tracking-tighter uppercase">
                                Inform employee to check UAN portal 2 months after LWD to initiate online withdrawal. Claims submitted through HR portal are only for manual processing.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
