"use client";

import React from 'react';
import {
    CheckCircle, AlertTriangle, ArrowRight,
    RefreshCw, Filter, FileSpreadsheet, Search, RotateCcw
} from 'lucide-react';

export default function ESIReconciliation() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            ESIC Reconciliation <RefreshCw size={24} className="text-emerald-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Reconcile ESIC gross wages vs payroll earned wages to prevent Inspector notices.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all shadow-lg flex items-center gap-2 italic">
                            FY 2023-24 <ArrowRight size={14} />
                        </button>
                        <button className="px-6 py-2.5 bg-emerald-600 rounded-xl text-sm font-black text-white hover:bg-emerald-700 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2">
                            <RotateCcw size={16} /> Run Auto-Match
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Summary Metrics */}
                    <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#0D1928] border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden group">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Perfect Matches</h3>
                            <div className="text-3xl font-black text-emerald-500 tabular-nums">1,620</div>
                            <div className="text-[10px] font-bold text-slate-400 mt-2 italic">Wage components match between systems</div>
                        </div>
                        <div className="bg-[#0D1928] border border-rose-500/30 p-6 rounded-2xl relative overflow-hidden group shadow-lg shadow-rose-500/5">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Wage Variances</h3>
                            <div className="text-3xl font-black text-rose-500 tabular-nums">14</div>
                            <div className="text-[10px] font-bold text-rose-400 mt-2 italic">ESIC gross differs from Payroll gross</div>
                        </div>
                        <div className="bg-[#0D1928] border border-amber-500/20 p-6 rounded-2xl relative overflow-hidden group">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Mid-Cycle Exemptions</h3>
                            <div className="text-3xl font-black text-amber-500 tabular-nums">08</div>
                            <div className="text-[10px] font-bold text-slate-400 mt-2 italic">Crossed ₹21k limit mid-contribution period</div>
                        </div>
                    </div>

                    {/* Data Grid */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-4 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <button className="text-[10px] font-black uppercase text-white bg-[#1A2A3A] px-3 py-1.5 rounded-lg">Show Variances Only (22)</button>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input type="text" placeholder="Search IP Number..." className="bg-[#060B14] border border-[#1A2A3A] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-emerald-500" />
                                    </div>
                                    <button className="p-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-emerald-500 hover:bg-emerald-500/10"><FileSpreadsheet size={14} /></button>
                                </div>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/80 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Employee / IP No</th>
                                        <th className="px-6 py-4">Month</th>
                                        <th className="px-6 py-4 text-right">Payroll Gross (₹)</th>
                                        <th className="px-6 py-4 text-right">ESIC Reported (₹)</th>
                                        <th className="px-6 py-4 text-right">Variance (₹)</th>
                                        <th className="px-6 py-4">Issue Type</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { ip: '6700142388', name: 'Alok Nath', month: 'Mar 2024', hr: '18500', esi: '16000', diff: '+2500', status: 'Wage Mismatch', color: 'text-rose-500' },
                                        { ip: '6700142389', name: 'Reena Roy', month: 'Mar 2024', hr: '22000', esi: '0', diff: '+22000', status: 'Mid-Cycle Exemption', color: 'text-amber-500' },
                                        { ip: '6700142390', name: 'Jatin Das', month: 'Feb 2024', hr: '15000', esi: '17000', diff: '-2000', status: 'Wage Mismatch', color: 'text-rose-500' },
                                        { ip: '6700142391', name: 'Priya Sen', month: 'Jan 2024', hr: '16500', esi: '16500', diff: '0', status: 'Matched', color: 'text-emerald-500' },
                                    ].map((row, i) => (
                                        <tr key={i} className={`group transition-all ${row.status !== 'Matched' ? 'bg-rose-500/5 hover:bg-rose-500/10' : 'hover:bg-[#1A2A3A]/30'}`}>
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-black text-white">{row.name}</div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">IP: {row.ip}</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-400">{row.month}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-300 text-right tabular-nums">{row.hr}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-300 text-right tabular-nums">{row.esi}</td>
                                            <td className={`px-6 py-4 text-xs font-black text-right tabular-nums ${row.diff === '0' ? 'text-slate-600' : 'text-rose-500'}`}>
                                                {row.diff}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${row.color}`}>
                                                    {row.status === 'Matched' ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
