"use client";

import React from 'react';
import {
    BarChart3, PieChart, TrendingDown, TrendingUp, Download,
    Calendar, Filter, ArrowLeft, RefreshCw, FileText, Briefcase, UserX
} from 'lucide-react';

export default function FnFReports() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3 italic">
                            Attrition & Settlement Analytics <BarChart3 size={28} className="text-blue-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Strategic insights into employee exit patterns and financial impact.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center shadow-lg italic">
                            <Calendar size={16} className="mr-2 text-blue-500" /> FY 2023-24
                        </button>
                        <button className="px-6 py-2.5 bg-[#0066FF] rounded-xl text-sm font-black text-white hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] italic">
                            Download Annual Audit
                        </button>
                    </div>
                </div>

                {/* Dashboard Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Annual Attrition %', val: '14.2%', trend: '-2.1%', icon: UserX, color: 'text-emerald-500' },
                        { label: 'Avg Settlement Vol', val: '₹4.8L', trend: '+12%', icon: BarChart3, color: 'text-blue-500' },
                        { label: 'Cycle Time (Avg)', val: '8.5d', trend: '-1.2d', icon: RefreshCw, color: 'text-violet-500' },
                        { label: 'Outstanding Claims', val: '₹12.4L', trend: 'High', icon: TrendingDown, color: 'text-rose-500' },
                    ].map((m, i) => (
                        <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-xl">
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-2 bg-[#060B14] rounded-xl border border-[#1A2A3A] ${m.color}`}>
                                    <m.icon size={22} />
                                </div>
                                <div className={`text-[10px] font-black uppercase tracking-widest ${m.trend.includes('-') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {m.trend}
                                </div>
                            </div>
                            <div className="relative z-10">
                                <div className="text-3xl font-black text-white tracking-tighter italic">{m.val}</div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{m.label}</div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Primary Chart */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 shadow-2xl relative overflow-hidden group h-[450px]">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] italic">Exit Volume by Department</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Cross-departmental resignation distribution</p>
                                </div>
                                <button className="p-2 border border-[#1A2A3A] rounded-lg text-slate-500 hover:text-white"><Filter size={16} /></button>
                            </div>

                            {/* Mock Bar Chart */}
                            <div className="flex items-end justify-between h-[250px] gap-4">
                                {[
                                    { label: 'ENG', val: 80, color: 'bg-blue-500' },
                                    { label: 'SAL', val: 55, color: 'bg-indigo-500' },
                                    { label: 'OPS', val: 40, color: 'bg-violet-500' },
                                    { label: 'HR', val: 20, color: 'bg-emerald-500' },
                                    { label: 'FIN', val: 35, color: 'bg-amber-500' },
                                    { label: 'MKG', val: 65, color: 'bg-rose-500' },
                                ].map((bar, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                                        <div className="w-full relative">
                                            <div
                                                className={`w-full ${bar.color} rounded-t-lg transition-all duration-1000 group-hover/bar:brightness-125 shadow-lg shadow-black/20`}
                                                style={{ height: `${bar.val * 2.5}px` }}
                                            >
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-white/50 opacity-0 group-hover/bar:opacity-100">
                                                    {bar.val}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{bar.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Reasons Distribution */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 shadow-2xl relative overflow-hidden group h-[450px]">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] italic mb-8 border-b border-[#1A2A3A] pb-4">Top Exit Drivers</h3>

                            <div className="space-y-6">
                                {[
                                    { reason: 'Better Opportunities', pct: 42, color: 'bg-blue-500' },
                                    { reason: 'Personal Reasons', pct: 28, color: 'bg-indigo-500' },
                                    { reason: 'Relocation', pct: 15, color: 'bg-rose-500' },
                                    { reason: 'Higher Education', pct: 10, color: 'bg-emerald-500' },
                                    { reason: 'Other', pct: 5, color: 'bg-slate-600' },
                                ].map((row, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                                            <span className="text-slate-200">{row.reason}</span>
                                            <span className="text-slate-500">{row.pct}%</span>
                                        </div>
                                        <div className="h-1.5 bg-[#060B14] rounded-full overflow-hidden border border-[#1A2A3A]">
                                            <div
                                                className={`h-full ${row.color} rounded-full transition-all duration-1000`}
                                                style={{ width: `${row.pct}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 pt-6 border-t border-[#1A2A3A]">
                                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 tracking-widest italic">
                                    <Download size={14} /> Full Demographic Data
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
