"use client";

import React, { useState } from 'react';
import {
    ReceiptText, Search, Download, Filter,
    FileCheck, ExternalLink, Calendar
} from 'lucide-react';

export default function FilingAcknowledgement() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Filing Acknowledgements <ReceiptText size={28} className="text-emerald-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Central repository for all statutory return receipts, TRRNs, and challans.</p>
                    </div>

                    <div className="flex bg-[#0D1928] border border-[#1A2A3A] p-1 rounded-xl w-max">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search TRRN or Ack No..."
                                className="bg-transparent border-none pl-8 pr-4 py-2 text-xs text-white outline-none w-64 placeholder:text-slate-600 focus:ring-0"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center gap-4">
                        <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <button className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg transition-colors">All Forms</button>
                            <button className="px-4 py-2 hover:text-white transition-colors">EPFO (PF)</button>
                            <button className="px-4 py-2 hover:text-white transition-colors">ESIC</button>
                            <button className="px-4 py-2 hover:text-white transition-colors">Tax (TDS/PT)</button>
                        </div>
                        <button className="px-4 py-2 border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                            <Filter size={14} /> Filter
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                <tr>
                                    <th className="px-6 py-4">Filing Type / Category</th>
                                    <th className="px-6 py-4">Period</th>
                                    <th className="px-6 py-4">TRRN / Ack Number</th>
                                    <th className="px-6 py-4">Filing Date</th>
                                    <th className="px-6 py-4 text-right">Receipt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A] text-xs font-bold text-slate-300">
                                <tr className="hover:bg-[#1A2A3A]/30 transition-all group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                                <FileCheck size={16} />
                                            </div>
                                            <div>
                                                <div className="text-white">EPF Monthly Return (ECR)</div>
                                                <div className="text-[10px] text-slate-500 mt-0.5">EPFO Portal</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400"><Calendar size={12} className="inline mr-1 mb-0.5 text-slate-500" />Feb 2024</td>
                                    <td className="px-6 py-4 font-mono text-white">1052403014992</td>
                                    <td className="px-6 py-4">12 Mar 2024</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all" title="Download Challan Receipt">
                                            <Download size={16} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#1A2A3A]/30 transition-all group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                                                <FileCheck size={16} />
                                            </div>
                                            <div>
                                                <div className="text-white">ESIC Contribution</div>
                                                <div className="text-[10px] text-slate-500 mt-0.5">ESIC Portal</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400"><Calendar size={12} className="inline mr-1 mb-0.5 text-slate-500" />Feb 2024</td>
                                    <td className="px-6 py-4 font-mono text-white">20001882910001001</td>
                                    <td className="px-6 py-4">15 Mar 2024</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all" title="Download Challan Receipt">
                                            <Download size={16} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#1A2A3A]/30 transition-all group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-rose-500/10 text-rose-500 rounded-lg">
                                                <FileCheck size={16} />
                                            </div>
                                            <div>
                                                <div className="text-white">TDS Details (Form 24Q)</div>
                                                <div className="text-[10px] text-slate-500 mt-0.5">Income Tax Dept</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400"><Calendar size={12} className="inline mr-1 mb-0.5 text-slate-500" />Q3 FY 23-24</td>
                                    <td className="px-6 py-4 font-mono text-white">AA12993881Z</td>
                                    <td className="px-6 py-4">31 Jan 2024</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button className="p-2 text-slate-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all" title="View on TRACES">
                                            <ExternalLink size={16} />
                                        </button>
                                        <button className="p-2 text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all" title="Download Receipt">
                                            <Download size={16} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
