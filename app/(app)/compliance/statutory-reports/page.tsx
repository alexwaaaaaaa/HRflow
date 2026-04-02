"use client";

import React, { useState } from 'react';
import {
    FileBarChart, Download, FileSpreadsheet,
    Filter, Calendar, ChevronDown, CheckCircle
} from 'lucide-react';

export default function StatutoryReports() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Statutory Reports <FileBarChart size={28} className="text-indigo-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Generate and export consolidated compliance reports for PF, ESIC, Tax and Labour limits.</p>
                    </div>

                    <button className="px-6 py-2.5 bg-indigo-600 rounded-xl text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2">
                        <Download size={14} /> Download Bulk Archive
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Filter Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl space-y-6">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 border-b border-[#1A2A3A] pb-4">
                                <Filter size={14} className="text-indigo-500" /> Report Filters
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Financial Year</label>
                                    <div className="relative">
                                        <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-xs font-bold text-white outline-none appearance-none focus:border-indigo-500">
                                            <option>FY 2023-24</option>
                                            <option>FY 2022-23</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Month</label>
                                    <div className="relative">
                                        <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-xs font-bold text-white outline-none appearance-none focus:border-indigo-500">
                                            <option>All Months</option>
                                            <option>March 2024</option>
                                            <option>February 2024</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Establishment State</label>
                                    <div className="relative">
                                        <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-xs font-bold text-white outline-none appearance-none focus:border-indigo-500">
                                            <option>Pan India (All)</option>
                                            <option>Karnataka</option>
                                            <option>Maharashtra</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-[#1A2A3A] rounded-xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all border border-slate-700">
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Report Types List */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Report Card */}
                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-3xl hover:border-indigo-500/50 transition-all group overflow-hidden relative shadow-lg">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <FileSpreadsheet size={80} className="text-indigo-500" />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">PF & ESIC Consolidated Statement</h3>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">Combined view of employee and employer EPF, EPS, EDLI, and ESIC contributions across all branches.</p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <button className="flex-1 py-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-white transition-all flex justify-center items-center gap-2">
                                            <FileSpreadsheet size={14} /> CSV
                                        </button>
                                        <button className="flex-1 py-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-all flex justify-center items-center gap-2 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30">
                                            <Download size={14} /> PDF
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Report Card */}
                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-3xl hover:border-indigo-500/50 transition-all group overflow-hidden relative shadow-lg">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <FileBarChart size={80} className="text-indigo-500" />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">PT & LWF State-wise Liability</h3>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">Detailed breakdown of Professional Tax and Labour Welfare Fund deductions categorized by state.</p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <button className="flex-1 py-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-white transition-all flex justify-center items-center gap-2">
                                            <FileSpreadsheet size={14} /> CSV
                                        </button>
                                        <button className="flex-1 py-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-all flex justify-center items-center gap-2 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30">
                                            <Download size={14} /> PDF
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Report Card */}
                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-3xl hover:border-indigo-500/50 transition-all group overflow-hidden relative shadow-lg">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Calendar size={80} className="text-indigo-500" />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Notice Period & Settlement Report</h3>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">FnF settlement statuses, pending gratuity payments, and recovery of notice period buyouts.</p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <button className="flex-1 py-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-white transition-all flex justify-center items-center gap-2">
                                            <FileSpreadsheet size={14} /> CSV
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Report Card */}
                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-3xl hover:border-indigo-500/50 transition-all group overflow-hidden relative shadow-lg">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <FileBarChart size={80} className="text-indigo-500" />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">TDS Deduction & Remittance Summary</h3>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">Monthly tax deducted at source versus TRACES challan remittance verification logs.</p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <button className="flex-1 py-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-white transition-all flex justify-center items-center gap-2">
                                            <FileSpreadsheet size={14} /> CSV
                                        </button>
                                        <button className="flex-1 py-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-all flex justify-center items-center gap-2 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30">
                                            <Download size={14} /> PDF
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
