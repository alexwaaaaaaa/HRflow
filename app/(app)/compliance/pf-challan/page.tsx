"use client";

import React from 'react';
import {
    FileText, Download, CheckCircle, Clock,
    ArrowRight, ArrowLeft, UploadCloud, FileCheck, Info, MapPin, Search
} from 'lucide-react';

export default function PFChallan() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            PF Challan Management <FileText size={24} className="text-amber-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Generate, verify, and remit EPF contributions (TRRN).</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all shadow-lg flex items-center gap-2 italic">
                            March 2024
                        </button>
                        <button className="px-6 py-2.5 bg-amber-600 rounded-xl text-sm font-black text-white hover:bg-amber-700 transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] flex items-center gap-2 italic">
                            <UploadCloud size={16} /> Generate New Challan
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Challan Summary */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-8 shadow-2xl relative overflow-hidden group">

                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Active Challan Status</h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Generated: 12 Apr 2024</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-amber-500 tracking-tighter">TRRN: 1052204000185</div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Awaiting Payment</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {[
                                    { label: 'Total Employees', val: '245' },
                                    { label: 'Excluded Employees', val: '12' },
                                    { label: 'Gross Wages', val: '₹1,24,50,000' },
                                    { label: 'EPF Wages', val: '₹84,20,500' },
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                                        <div className="text-lg font-black text-white tracking-tighter tabular-nums">{stat.val}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-2xl p-6">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 border-b border-[#1A2A3A] pb-2">Contribution Breakdown</h3>
                                <div className="space-y-4">
                                    {[
                                        { acc: 'A/C 1 (EPF)', emp: '₹10,10,460', er: '₹3,09,874', adm: '-', total: '₹13,20,334' },
                                        { acc: 'A/C 2 (EPF Admin)', emp: '-', er: '-', adm: '₹42,103', total: '₹42,103' },
                                        { acc: 'A/C 10 (EPS)', emp: '-', er: '₹7,00,586', adm: '-', total: '₹7,00,586' },
                                        { acc: 'A/C 21 (EDLI)', emp: '-', er: '₹42,103', adm: '-', total: '₹42,103' },
                                        { acc: 'A/C 22 (EDLI Admin)', emp: '-', er: '-', adm: '₹0', total: '₹0' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex justify-between items-center text-xs border-b border-[#1A2A3A]/50 pb-2 last:border-0 last:pb-0">
                                            <span className="w-32 font-black text-slate-300 uppercase tracking-tighter">{row.acc}</span>
                                            <span className="w-24 text-right font-bold text-slate-500 tabular-nums">{row.emp}</span>
                                            <span className="w-24 text-right font-bold text-slate-500 tabular-nums">{row.er}</span>
                                            <span className="w-24 text-right font-bold text-slate-500 tabular-nums">{row.adm}</span>
                                            <span className="w-28 text-right font-black text-white tabular-nums">{row.total}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center text-sm pt-4 border-t-2 border-[#1A2A3A]">
                                        <span className="font-black text-amber-500 uppercase tracking-widest">Total Remittance</span>
                                        <span className="font-black text-amber-500 tracking-tighter text-xl tabular-nums drop-shadow-lg">₹21,05,126</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button className="flex-1 py-3 bg-amber-600 rounded-xl text-white font-black text-xs uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg flex items-center justify-center gap-2">
                                    <FileCheck size={16} /> Pay via EPFO Portal
                                </button>
                                <button className="px-6 py-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-slate-400 font-black text-xs uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2">
                                    <Download size={16} /> Export Draft
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Challan History & Alerts */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl relative overflow-hidden h-[400px] flex flex-col">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-4 border-b border-[#1A2A3A] pb-4 flex justify-between items-center">
                                Challan Archive <span className="p-1 bg-[#060B14] rounded text-slate-500"><Search size={12} /></span>
                            </h3>

                            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                                {[
                                    { month: 'Feb 2024', trrn: '1052203011452', amount: '₹20,85,410', status: 'Paid', date: '14 Mar 24' },
                                    { month: 'Jan 2024', trrn: '1052202088710', amount: '₹20,42,100', status: 'Paid', date: '12 Feb 24' },
                                    { month: 'Dec 2023', trrn: '1052201044321', amount: '₹19,95,000', status: 'Paid', date: '14 Jan 24' },
                                    { month: 'Nov 2023', trrn: '1052112099881', amount: '₹19,50,200', status: 'Paid', date: '15 Dec 23' },
                                ].map((item, i) => (
                                    <div key={i} className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-slate-700 transition-colors group cursor-pointer">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{item.month}</span>
                                            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-500">
                                                <CheckCircle size={10} /> {item.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">TRRN: {item.trrn}</div>
                                                <div className="text-[9px] text-slate-600 font-medium italic">Paid on {item.date}</div>
                                            </div>
                                            <span className="text-xs font-black text-slate-400 tabular-nums">{item.amount}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex gap-3 shadow-lg">
                            <Info size={18} className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic tracking-tight">
                                Statutory deadline for PF remittance is the 15th of the following month. Late payments attract penal damages under section 14B up to 25% p.a.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
