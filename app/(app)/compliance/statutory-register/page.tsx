"use client";

import React from 'react';
import {
    Book, FileOutput, Printer, ChevronDown, CheckCircle
} from 'lucide-react';

export default function StatutoryRegisters() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Statutory Registers <Book size={28} className="text-blue-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Generate and maintain mandatory central and state-level labour law registers.</p>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                        <h2 className="text-sm font-black text-white uppercase tracking-widest">Master Register Directory</h2>
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-48">
                                <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-xs font-bold text-white outline-none appearance-none focus:border-blue-500">
                                    <option>Maharashtra</option>
                                    <option>Karnataka</option>
                                    <option>Central Act</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                            <div className="relative flex-1 md:w-48">
                                <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-xs font-bold text-white outline-none appearance-none focus:border-blue-500">
                                    <option>March 2024</option>
                                    <option>Q4 2023-24</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Form Card */}
                        <div className="bg-[#060B14] border border-[#1A2A3A] p-5 rounded-2xl hover:border-blue-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-black text-white">Form I</h3>
                                <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest flex gap-1 items-center">
                                    <CheckCircle size={10} /> Data Ready
                                </span>
                            </div>
                            <div className="text-xs font-bold text-slate-300 mb-1 uppercase tracking-widest">Register of Fines</div>
                            <p className="text-[10px] text-slate-500 font-medium italic mb-6">Payment of Wages Act, 1936</p>

                            <div className="grid grid-cols-2 gap-2 mt-auto">
                                <button className="py-2 bg-[#1A2A3A] text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                    <FileOutput size={14} /> PDF
                                </button>
                                <button className="py-2 bg-[#1A2A3A] text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-2">
                                    <Printer size={14} /> Print
                                </button>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="bg-[#060B14] border border-[#1A2A3A] p-5 rounded-2xl hover:border-blue-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-black text-white">Form II</h3>
                                <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest flex gap-1 items-center">
                                    <CheckCircle size={10} /> Data Ready
                                </span>
                            </div>
                            <div className="text-xs font-bold text-slate-300 mb-1 uppercase tracking-widest">Register of Deductions</div>
                            <p className="text-[10px] text-slate-500 font-medium italic mb-6">Payment of Wages Act, 1936</p>

                            <div className="grid grid-cols-2 gap-2 mt-auto">
                                <button className="py-2 bg-[#1A2A3A] text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                    <FileOutput size={14} /> PDF
                                </button>
                                <button className="py-2 bg-[#1A2A3A] text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-2">
                                    <Printer size={14} /> Print
                                </button>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="bg-[#060B14] border border-[#1A2A3A] p-5 rounded-2xl hover:border-blue-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-black text-white">Form IV</h3>
                                <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest flex gap-1 items-center">
                                    <CheckCircle size={10} /> Data Ready
                                </span>
                            </div>
                            <div className="text-xs font-bold text-slate-300 mb-1 uppercase tracking-widest">Muster Roll / Attendance</div>
                            <p className="text-[10px] text-slate-500 font-medium italic mb-6">Minimum Wages Act, 1948</p>

                            <div className="grid grid-cols-2 gap-2 mt-auto">
                                <button className="py-2 bg-[#1A2A3A] text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                    <FileOutput size={14} /> PDF
                                </button>
                                <button className="py-2 bg-[#1A2A3A] text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-2">
                                    <Printer size={14} /> Print
                                </button>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="bg-[#060B14] border border-rose-500/20 p-5 rounded-2xl group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-black text-white">Form XI</h3>
                                <span className="bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">
                                    Pending Data
                                </span>
                            </div>
                            <div className="text-xs font-bold text-slate-300 mb-1 uppercase tracking-widest">Register of Loans</div>
                            <p className="text-[10px] text-slate-500 font-medium italic mb-6">Maharashtra S&E Rules</p>

                            <div className="grid grid-cols-1 gap-2 mt-auto">
                                <button className="py-2 bg-[#060B14] border border-[#1A2A3A] text-rose-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-rose-500/10 transition-all flex items-center justify-center gap-2">
                                    Sync Missing Data
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
