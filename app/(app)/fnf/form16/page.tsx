"use client";

import React from 'react';
import {
    FileText, ShieldCheck, Download, Calendar, ArrowLeft,
    Link as LinkIcon, Info, AlertTriangle, Printer, History
} from 'lucide-react';

export default function FnFForm16() {
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
                            <h1 className="text-2xl font-black text-white tracking-tight">Tax Certificate (Form 16)</h1>
                            <p className="text-slate-400 text-sm font-medium">Generate statutory Part A & B for the exit financial year.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center shadow-lg">
                            <Download size={16} className="mr-2" /> Download Combined
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Part A/B Selection */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl relative">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#0D1928]/50 flex justify-between items-center">
                                <h2 className="text-lg font-black text-white flex items-center">
                                    <FileText size={20} className="mr-3 text-blue-500" /> Statutory Components
                                </h2>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">FY 2023-24</span>
                            </div>

                            <div className="p-0">
                                {[
                                    { title: 'Part A (TRACES Generated)', desc: 'Quarterly TDS details and summary authenticated by TRACES.', status: 'Ready', date: 'Generated 12 Mar 24' },
                                    { title: 'Part B (Annexure to Form 16)', desc: 'Detailed breakdown of salary, deductions, and tax calculation.', status: 'Final Review', date: 'Last Updated 24 Mar 24' },
                                ].map((part, i) => (
                                    <div key={i} className="p-6 border-b border-[#1A2A3A] last:border-0 hover:bg-[#1A2A3A]/20 transition-all group flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center text-blue-500 shadow-inner group-hover:scale-110 transition-transform">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="text-sm font-black text-white uppercase tracking-tight">{part.title}</h3>
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${part.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                    {part.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-4 font-medium leading-relaxed italic">{part.desc}</p>
                                            <div className="flex items-center gap-6">
                                                <div className="text-[10px] text-slate-600 font-bold uppercase flex items-center gap-1">
                                                    <Calendar size={12} /> {part.date}
                                                </div>
                                                <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline flex items-center gap-1">
                                                    <Download size={12} /> Individual Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0D1928] border border-blue-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-6 relative z-10">
                                <h3 className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-widest">
                                    <History size={16} className="text-blue-500" /> TDS Filing History
                                </h3>
                                <LinkIcon size={14} className="text-slate-500" />
                            </div>
                            <div className="space-y-4 relative z-10">
                                {[
                                    { q: 'Quarter 3', period: 'Oct - Dec 23', status: 'Filed', amount: '₹1,42,881' },
                                    { q: 'Quarter 2', period: 'Jul - Sep 23', status: 'Filed', amount: '₹1,38,202' },
                                ].map((q, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-blue-500/30 transition-all cursor-pointer">
                                        <div>
                                            <div className="font-black text-white uppercase tracking-tighter leading-none mb-1">{q.q}</div>
                                            <div className="text-[9px] text-slate-600 font-bold uppercase">{q.period}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-black">{q.amount}</div>
                                            <div className="text-[9px] text-emerald-500 font-black uppercase">{q.status}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* Tax Summary Details */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-gradient-to-br from-[#0D1928] to-[#1A2A3A] border border-[#1A2A3A] rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden group border-t-4 border-t-amber-500">
                            <h2 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] text-center border-b border-white/5 pb-6 italic">Tax Computation Balance</h2>

                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="text-4xl font-black text-white tabular-nums drop-shadow-xl group-hover:scale-105 transition-transform tracking-tighter italic">₹5,12,201.00</div>
                                    <div className="text-[9px] font-black text-amber-500 uppercase tracking-[0.1em] mt-2">Total Tax Deduction (MTD)</div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    <div className="flex justify-between text-[11px] font-bold italic">
                                        <span className="text-white/40 uppercase tracking-tighter">Taxable Income</span>
                                        <span className="text-white tabular-nums tracking-tighter">₹24,82,000.00</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-bold italic">
                                        <span className="text-white/40 uppercase tracking-tighter">Exemptions</span>
                                        <span className="text-emerald-400 tabular-nums tracking-tighter">(-₹6,44,000)</span>
                                    </div>
                                    <div className="h-px bg-white/5" />
                                    <button className="w-full py-4 bg-white rounded-2xl text-[#0D1928] font-black text-sm hover:translate-y-[-2px] transition-all shadow-xl active:translate-y-0 flex items-center justify-center gap-2">
                                        <Printer size={18} /> Print Form 16
                                    </button>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                        </div>

                        <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex gap-3 shadow-lg">
                            <AlertTriangle size={18} className="text-rose-500 shrink-0" />
                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic tracking-tighter uppercase">
                                Form 16 is issued post Quarter 4 filing (May/June). For mid-year exits, TDS certificates may only include details up to the exit month. Provide Part B manually if required for new employer.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
