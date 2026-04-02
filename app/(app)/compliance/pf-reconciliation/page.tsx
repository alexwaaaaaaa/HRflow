"use client";

import React from 'react';
import {
    CheckCircle, AlertTriangle, ArrowRight, ArrowLeft,
    RefreshCw, Filter, FileSpreadsheet, Search, SearchSlash, RotateCcw
} from 'lucide-react';

export default function PFReconciliation() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            PF Reconciliation <RefreshCw size={24} className="text-blue-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Match HRFlow payroll data against EPFO portal records.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all shadow-lg flex items-center gap-2 italic">
                            FY 2023-24 <ArrowRight size={14} />
                        </button>
                        <button className="px-6 py-2.5 bg-blue-600 rounded-xl text-sm font-black text-white hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2">
                            <RotateCcw size={16} /> Run Auto-Match
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Summary Metrics */}
                    <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#0D1928] border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden group">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Perfect Matches</h3>
                            <div className="text-3xl font-black text-emerald-500 tabular-nums">2,410</div>
                            <div className="text-[10px] font-bold text-slate-400 mt-2 italic">Records exactly matched by UAN & Amount</div>
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                        </div>
                        <div className="bg-[#0D1928] border border-rose-500/30 p-6 rounded-2xl relative overflow-hidden group shadow-lg shadow-rose-500/5">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Variances Detected</h3>
                            <div className="text-3xl font-black text-rose-500 tabular-nums">18</div>
                            <div className="text-[10px] font-bold text-rose-400 mt-2 italic">Requires manual investigation</div>
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-rose-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                        </div>
                        <div className="bg-[#0D1928] border border-amber-500/20 p-6 rounded-2xl relative overflow-hidden group">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Missing from Portal</h3>
                            <div className="text-3xl font-black text-amber-500 tabular-nums">05</div>
                            <div className="text-[10px] font-bold text-slate-400 mt-2 italic">Present in Payroll, missing in EPFO TRRN</div>
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                        </div>
                    </div>

                    {/* Data Grid */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-4 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <button className="text-[10px] font-black uppercase text-white bg-[#1A2A3A] px-3 py-1.5 rounded-lg">Show Variances Only (18)</button>
                                    <button className="text-[10px] font-black uppercase text-slate-500 hover:text-white px-3 py-1.5 rounded-lg transition-colors">Show All Records</button>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input type="text" placeholder="Search UAN..." className="bg-[#060B14] border border-[#1A2A3A] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-blue-500" />
                                    </div>
                                    <button className="p-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-slate-400 hover:text-white"><Filter size={14} /></button>
                                    <button className="p-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-emerald-500 hover:bg-emerald-500/10"><FileSpreadsheet size={14} /></button>
                                </div>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/80 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">UAN / Employee</th>
                                        <th className="px-6 py-4">Month</th>
                                        <th className="px-6 py-4 text-right">HRFlow Payroll (₹)</th>
                                        <th className="px-6 py-4 text-right">EPFO Portal (₹)</th>
                                        <th className="px-6 py-4 text-right">Variance (₹)</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { uan: '100456789012', name: 'Arnab Das', month: 'Mar 2024', hr: '3600', epf: '1800', diff: '+1800', status: 'Mismatch', color: 'text-rose-500' },
                                        { uan: '100456789013', name: 'Rahul Nair', month: 'Mar 2024', hr: '1800', epf: '1800', diff: '0', status: 'Matched', color: 'text-emerald-500' },
                                        { uan: '100456789014', name: 'Sonia Gill', month: 'Feb 2024', hr: '3600', epf: '0', diff: '+3600', status: 'Missing in EPFO', color: 'text-amber-500' },
                                        { uan: '100456789015', name: 'Priya Iyer', month: 'Feb 2024', hr: '1800', epf: '2400', diff: '-600', status: 'Mismatch', color: 'text-rose-500' },
                                        { uan: '100456789016', name: 'Anil Gupta', month: 'Jan 2024', hr: '1800', epf: '1800', diff: '0', status: 'Matched', color: 'text-emerald-500' },
                                    ].map((row, i) => (
                                        <tr key={i} className={`group transition-all ${row.status.includes('Mismatch') || row.status.includes('Missing') ? 'bg-rose-500/5 hover:bg-rose-500/10' : 'hover:bg-[#1A2A3A]/30'}`}>
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-black text-white">{row.name}</div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">{row.uan}</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-400">{row.month}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-300 text-right tabular-nums">{row.hr}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-300 text-right tabular-nums">{row.epf}</td>
                                            <td className={`px-6 py-4 text-xs font-black text-right tabular-nums ${row.diff === '0' ? 'text-slate-600' : 'text-rose-500'}`}>
                                                {row.diff}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${row.color}`}>
                                                    {row.status === 'Matched' ? <CheckCircle size={12} /> : row.status === 'Missing in EPFO' ? <SearchSlash size={12} /> : <AlertTriangle size={12} />}
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {row.diff !== '0' ? (
                                                    <button className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 border border-blue-500/20 px-3 py-1 rounded bg-blue-500/10 transition-colors">Resolve</button>
                                                ) : (
                                                    <span className="text-slate-600">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-[#060B14]/50 border-t border-[#1A2A3A] text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">
                                Showing 1-5 of 23 records flagged for review
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
