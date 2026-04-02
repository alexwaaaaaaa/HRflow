"use client";

import React from 'react';
import {
    Coins, FileText, Calendar, CheckCircle, ArrowLeft,
    Calculator, Info, AlertTriangle, ShieldCheck, Landmark, Download, FileCheck
} from 'lucide-react';

export default function GratuityPayment() {
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
                                Gratuity Settlement <Coins size={24} className="text-emerald-500" />
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">Verify eligibility and finalize statutory gratuity disbursement (Form L).</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">

                    {/* Gratuity Details */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-10 shadow-2xl relative overflow-hidden group">

                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-blue-500 pl-3">Eligibility Audit</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Continuous Service', value: '4 Years, 8 Months', check: true },
                                            { label: 'Met 5yr Threshold?', value: 'No (Pro-rata applied)', check: false, warning: true },
                                            { label: 'Basic + DA (Last Drawn)', value: '₹95,000.00', check: true },
                                            { label: 'Resignation Type', value: 'Voluntary', check: true },
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-start text-xs border-b border-[#1A2A3A]/50 pb-3">
                                                <div className="space-y-1">
                                                    <span className="text-slate-500 font-bold uppercase tracking-tighter">{item.label}</span>
                                                    <div className={`font-black uppercase tracking-tight ${item.warning ? 'text-amber-500' : 'text-white'}`}>{item.value}</div>
                                                </div>
                                                {item.check ? <CheckCircle size={14} className="text-emerald-500" /> : <AlertTriangle size={14} className="text-amber-500" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">Statutory Formula</h3>
                                    <div className="p-6 bg-[#060B14] rounded-2xl border border-[#1A2A3A] space-y-6 shadow-inner">
                                        <div className="flex justify-between text-[11px] font-black text-slate-400">
                                            <span>(15 / 26) X SL X YRS</span>
                                            <span className="text-emerald-500 hover:underline cursor-pointer">Formula Ref</span>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-xs font-bold italic">
                                                <span className="text-slate-500">Service Years</span>
                                                <span className="text-white">4.7 (Rounded to 5)</span>
                                            </div>
                                            <div className="flex justify-between text-xs font-bold italic">
                                                <span className="text-slate-500">Service Limit Salary</span>
                                                <span className="text-white">₹21,00,000 (Max Cap)</span>
                                            </div>
                                            <div className="h-px bg-[#1A2A3A]" />
                                            <div className="text-center">
                                                <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 leading-none">Calculated Gratuity Due</div>
                                                <div className="text-3xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg">₹2,15,400.00</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-4">
                                <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                                <div className="text-xs text-slate-500 font-medium leading-relaxed italic tracking-tight">
                                    Statutory Gratuity is payable within 30 days from the last working day. Any delay attracts interest as per the Payment of Gratuity Act, 1972.
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <FileText size={14} className="text-blue-500" /> Mandatory Compliance Docs
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex items-center justify-between group cursor-pointer hover:border-emerald-500/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <FileCheck size={18} className="text-emerald-500" />
                                        <span className="text-xs font-bold text-slate-300">Form L Generation</span>
                                    </div>
                                    <Download size={16} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                                </div>
                                <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex items-center justify-between group cursor-pointer hover:border-blue-500/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck size={18} className="text-blue-500" />
                                        <span className="text-xs font-bold text-slate-300">Nominee Verification</span>
                                    </div>
                                    <CheckCircle size={16} className="text-emerald-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disbursement Card */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gradient-to-br from-[#0D1928] to-[#1A2A3A] border border-[#1A2A3A] rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden group border-t-4 border-t-emerald-500">
                            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest text-center border-b border-[#1A2A3A] pb-6">Disbursement Total</h2>

                            <div className="text-center space-y-6">
                                <div className="space-y-1">
                                    <div className="text-5xl font-black text-white tabular-nums drop-shadow-xl group-hover:scale-105 transition-transform">₹2,15,400</div>
                                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">Tax Exempt Amount</div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-[#1A2A3A]">
                                    <button className="w-full py-4 bg-[#0066FF] rounded-2xl text-white font-black text-sm hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(0,102,255,0.4)] flex items-center justify-center gap-2">
                                        <Calculator size={18} /> Finalize Payment
                                    </button>
                                    <button className="w-full py-4 bg-[#060B14] border border-[#1A2A3A] rounded-2xl text-slate-400 font-bold text-sm hover:bg-[#1A2A3A] transition-all flex items-center justify-center gap-2">
                                        <Landmark size={16} /> Update Bank Detail
                                    </button>
                                </div>
                            </div>

                            <p className="text-[9px] text-slate-600 font-bold text-center uppercase tracking-tighter mt-4 italic">
                                * Payout will be processed separately from monthly payroll.
                            </p>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />
                        </div>

                        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-3 shadow-lg">
                            <AlertTriangle size={18} className="text-amber-500 shrink-0" />
                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic tracking-tight uppercase">
                                Service duration is 4yr 8mo. Pro-rata gratuity is only applicable in case of death or disablement. Please verify company policy for voluntary exits before proceeding.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
