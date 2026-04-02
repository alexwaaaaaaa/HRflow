"use client";

import React from 'react';
import {
    CreditCard, DollarSign, Calendar, User,
    ArrowRight, Info, AlertCircle, Save, ArrowLeft, ShieldCheck, Landmark, Receipt, Send
} from 'lucide-react';

export default function FnFPayment() {
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
                            <h1 className="text-2xl font-black text-white tracking-tight">Financial Disbursement</h1>
                            <p className="text-slate-400 text-sm font-medium">Finalize and trigger the payment for Arnab Das.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">

                    {/* Payment Setup */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-10 shadow-2xl relative overflow-hidden group">

                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-blue-500 pl-3">Payment Modal Selection</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Bank Transfer (NEFT/IMPS)', icon: Landmark, active: true },
                                        { label: 'Cloud Payroll Payout', icon: Send, active: false },
                                        { label: 'Corporate Cheque', icon: Receipt, active: false },
                                        { label: 'Third-Party Processor', icon: CreditCard, active: false },
                                    ].map((mode, i) => (
                                        <button key={i} className={`p-5 rounded-2xl border-2 transition-all flex flex-col gap-4 text-left ${mode.active ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(0,102,255,0.15)]' : 'bg-[#060B14] border-[#1A2A3A] hover:border-slate-500'
                                            }`}>
                                            <mode.icon size={24} className={mode.active ? 'text-blue-500' : 'text-slate-500'} />
                                            <span className={`text-xs font-black uppercase tracking-tight ${mode.active ? 'text-white' : 'text-slate-500'}`}>{mode.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">Disbursement Schedule</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase">Execution Date</label>
                                        <div className="relative">
                                            <Calendar size={18} className="absolute left-4 top-3.5 text-blue-500" />
                                            <input type="date" value="2024-04-30" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3.5 text-white font-bold outline-none focus:border-blue-500/50" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase">Priority Level</label>
                                        <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3.5 text-white font-bold outline-none focus:border-blue-500/50 appearance-none">
                                            <option>Standard (Target 3 Days)</option>
                                            <option>High Priority (Same Day)</option>
                                            <option>Holding (Review Mandatory)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-2xl flex items-center justify-between border-l-4 border-l-emerald-500 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500"><ShieldCheck size={20} /></div>
                                    <div>
                                        <div className="text-xs font-black text-white uppercase tracking-tighter">Bank Details Verified</div>
                                        <div className="text-[10px] text-slate-500 font-bold italic uppercase tracking-widest">HDFC BANK • AC: 9812XXXXXX • IFSC: HDFC0001</div>
                                    </div>
                                </div>
                                <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline px-4">Change Detail</button>
                            </div>

                        </div>
                    </div>

                    {/* Final Pay Summary */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0066FF] rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10 text-center space-y-6">
                                <h2 className="text-xs font-black text-white/70 uppercase tracking-[0.2em] italic">Disbursement Total</h2>
                                <div className="text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-xl group-hover:scale-105 transition-transform">₹3,25,202.00</div>

                                <div className="space-y-3 pt-6 border-t border-white/20">
                                    <div className="flex justify-between items-center text-xs font-bold text-white/80 italic">
                                        <span>Salary Portion</span>
                                        <span>₹1,20,000</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-white/80 italic">
                                        <span>Statutory Dues</span>
                                        <span>₹2,15,400</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-rose-300 italic">
                                        <span>Manual Deductions</span>
                                        <span>-₹10,198</span>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-white rounded-2xl text-blue-600 font-black text-sm hover:translate-y-[-2px] transition-all shadow-xl active:translate-y-0 flex items-center justify-center gap-2">
                                    <Send size={18} /> Process Payment
                                </button>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-4">Transaction logs will be generated automatically.</p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                        </div>

                        <div className="bg-[#0D1928] border border-amber-500/20 rounded-2xl p-6 space-y-4 shadow-xl border-l-4 border-l-amber-500">
                            <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                                <AlertCircle size={14} /> Hold Warnings
                            </h3>
                            <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                                <p className="text-[10px] text-slate-500 font-medium leading-relaxed tracking-tight italic">
                                    "Pending clear tax declaration for current year. Payment may be withheld if mandatory PAN details are not updated."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
