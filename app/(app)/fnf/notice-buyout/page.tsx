"use client";

import React from 'react';
import {
    CreditCard, DollarSign, Calendar, User,
    ArrowRight, Info, AlertCircle, Save, ArrowLeft, ShieldCheck
} from 'lucide-react';

export default function NoticeBuyout() {
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
                            <h1 className="text-2xl font-black text-white tracking-tight">Notice Buyout Management</h1>
                            <p className="text-slate-400 text-sm font-medium">Handle financial buyouts for shortened notice periods.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Buyout Configuration */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-8 shadow-2xl relative overflow-hidden group">

                            <div className="flex items-center gap-4 mb-4 pb-6 border-b border-[#1A2A3A]">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center font-black text-blue-500 border border-blue-500/30">
                                    VM
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-black text-white uppercase tracking-tight">Vikram Mehta</h2>
                                    <p className="text-xs text-slate-500 font-bold tracking-widest uppercase italic">Senior Analyst • Finance</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Buyout Duration</label>
                                    <div className="relative">
                                        <Calendar size={18} className="absolute left-4 top-3.5 text-blue-500" />
                                        <input type="number" defaultValue="30" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3.5 text-white font-black text-xl outline-none focus:border-blue-500/50 tabular-nums shadow-inner" />
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-bold px-1 italic">* Maximum 90 days allowed</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Payer Responsibility</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-4 text-white font-bold outline-none focus:border-blue-500/50 appearance-none shadow-inner">
                                        <option>New Employer Pays</option>
                                        <option>Employee Pays</option>
                                        <option>Company Sponsoring</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Recovery Mechanism</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="p-4 border border-blue-500/30 bg-blue-500/5 rounded-xl text-left group">
                                        <div className="text-sm font-black text-white flex items-center justify-between">
                                            FnF Deduction <ShieldCheck size={14} className="text-blue-500" />
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Deduct from final payout</div>
                                    </button>
                                    <button className="p-4 border border-[#1A2A3A] bg-[#060B14] rounded-xl text-left hover:border-slate-500 transition-all">
                                        <div className="text-sm font-black text-slate-400 group-hover:text-white">External Payment</div>
                                        <div className="text-[10px] text-slate-600 font-bold mt-1 uppercase italic">Cheque / Bank Transfer</div>
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-4">
                                <Info size={20} className="text-amber-500 shrink-0 mt-0.5" />
                                <div className="text-xs text-slate-500 font-medium leading-relaxed italic">
                                    Notice buyout is calculated on Gross Salary excluding non-cash variables. This adjustment will be reflected in the FnF balance sheet.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Calculation & Action */}
                    <div className="space-y-6 animate-in slide-in-from-right duration-1000">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden group border-t-4 border-t-emerald-500">
                            <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest text-center border-b border-[#1A2A3A] pb-6">Recovery Details</h2>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end border-b border-[#1A2A3A] pb-4 group/item">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-tighter">Daily Rate (Gross)</div>
                                    <div className="text-lg font-black text-white tabular-nums group-hover/item:text-blue-400 transition-colors">₹4,833.00</div>
                                </div>
                                <div className="flex justify-between items-end border-b border-[#1A2A3A] pb-4 group/item">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-tighter">Buyout Multiplication</div>
                                    <div className="text-lg font-black text-white tabular-nums group-hover/item:text-blue-400 transition-colors">30 Days</div>
                                </div>
                                <div className="flex justify-between items-end group/item">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-tighter">GST (18% If Appl.)</div>
                                    <div className="text-lg font-black text-rose-500 tabular-nums">₹26,100.00</div>
                                </div>

                                <div className="p-6 bg-[#060B14] rounded-2xl border-2 border-[#1A2A3A] text-center shadow-inner group-hover:border-emerald-500/20 transition-all">
                                    <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-2 drop-shadow-sm">Total Recovery Amount</h3>
                                    <div className="text-4xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg">₹1,71,100.00</div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-[#0066FF] rounded-2xl text-white font-black text-sm hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(0,102,255,0.4)] flex items-center justify-center gap-2 active:scale-100">
                                <Save size={18} /> Confirm Recovery Agreement
                            </button>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/5 rounded-full group-hover:scale-125 transition-transform duration-700" />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
