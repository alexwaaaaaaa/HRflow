"use client";

import React from 'react';
import {
    Coins, Building, CheckCircle, Clock,
    Download, AlertCircle, FileSpreadsheet, MapPin
} from 'lucide-react';

export default function LWFScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Labour Welfare Fund (LWF) <Coins size={28} className="text-pink-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Manage semi-annual / annual LWF deductions and remittances.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all shadow-lg flex items-center gap-2 italic">
                            FY 2023-24
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Active Remittances Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex gap-4 items-center">
                            <h2 className="text-sm font-black text-white uppercase tracking-widest">Upcoming Deadlines</h2>
                            <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded text-[9px] font-black uppercase tracking-widest animate-pulse">
                                Action Required
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Maharashtra LWF */}
                            <div className="bg-[#0D1928] border border-pink-500/30 p-6 rounded-3xl relative overflow-hidden shadow-2xl shadow-pink-500/5">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-pink-500" />
                                        <h3 className="text-lg font-black text-white uppercase tracking-widest">Maharashtra</h3>
                                    </div>
                                    <div className="text-[10px] font-black text-pink-500 uppercase tracking-widest text-right">
                                        <div>Jun Period</div>
                                        <div className="text-slate-400">Due: 15 Jul</div>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl">
                                        <div className="flex justify-between items-center text-xs pb-3 border-b border-[#1A2A3A]">
                                            <span className="font-bold text-slate-400">Employee Shr (₹12 x 35)</span>
                                            <span className="font-bold text-slate-300 tabular-nums">₹420</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs pt-3">
                                            <span className="font-bold text-slate-400">Employer Shr (₹36 x 35)</span>
                                            <span className="font-bold text-slate-300 tabular-nums">₹1,260</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-[#1A2A3A]">
                                            <span className="font-black text-pink-500 uppercase tracking-widest">Total Liability</span>
                                            <span className="font-black text-pink-500 text-xl tracking-tighter tabular-nums">₹1,680</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 py-2.5 bg-pink-600 rounded-xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg">
                                        Pay via MahaLWF
                                    </button>
                                    <button className="px-4 py-2.5 bg-[#060B14] border border-[#1A2A3A] hover:border-slate-600 rounded-xl text-slate-400 hover:text-white transition-all">
                                        <Download size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Telangana LWF */}
                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-3xl relative overflow-hidden shadow-xl">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-emerald-500" />
                                        <h3 className="text-lg font-black text-slate-200 uppercase tracking-widest">Telangana</h3>
                                    </div>
                                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest text-right">
                                        <div>Annual Filer</div>
                                        <div className="text-slate-500">Dec Period</div>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-center items-center h-[160px] border border-dashed border-[#1A2A3A] rounded-xl bg-[#060B14]/50 mb-6">
                                    <CheckCircle size={24} className="text-[#1A2A3A] mb-2" />
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center px-4">Paid on 10 Jan 2024</p>
                                    <button className="mt-3 text-[9px] font-black text-emerald-500 uppercase tracking-widest hover:underline flex items-center gap-1">
                                        <Download size={10} /> View Receipt
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Policy Brief sidebar */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl relative mt-[2.5rem]">
                            <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#060B14] border border-[#1A2A3A] p-3 rounded-full shadow-lg">
                                <AlertCircle size={20} className="text-pink-500" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-[#1A2A3A] pb-4">LWF Complexity</h3>
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic mb-4">
                                Labour Welfare Fund varies significantly by state. Some states deduct in June/Dec, others only in Dec. Contribution ratios (Employer:Employee) also differ widely.
                            </p>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] bg-[#060B14] p-2 rounded-lg border border-[#1A2A3A]">
                                    <span className="font-bold text-slate-500">Karnataka</span>
                                    <span className="font-black text-slate-300">₹20 : ₹40 (Dec)</span>
                                </div>
                                <div className="flex justify-between text-[10px] bg-[#060B14] p-2 rounded-lg border border-[#1A2A3A]">
                                    <span className="font-bold text-slate-500">Maharashtra</span>
                                    <span className="font-black text-slate-300">₹12 : ₹36 (Jun, Dec)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
