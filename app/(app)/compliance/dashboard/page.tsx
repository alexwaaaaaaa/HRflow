"use client";

import React from 'react';
import {
    ShieldCheck, AlertTriangle, Scale, CalendarDays,
    FileCheck, ExternalLink, Download, Search, Briefcase,
    TrendingDown, FileSignature, ArrowRight, ShieldAlert, BookOpen
} from 'lucide-react';

export default function ComplianceDashboard() {
    return (
        <main className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <header className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Statutory &amp; Compliance Control <ShieldCheck size={28} className="text-emerald-500" aria-hidden="true" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Unified command center for Indian labour laws and tax filings.</p>
                    </div>
                    <div className="flex gap-3">
                        <button type="button" className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all shadow-lg flex items-center gap-2">
                            <BookOpen size={16} aria-hidden="true" /> Latest Gazette
                        </button>
                        <button type="button" className="px-6 py-2.5 bg-blue-600 rounded-xl text-sm font-black text-white hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2">
                            <Scale size={16} aria-hidden="true" /> Inspector Ready Mode
                        </button>
                    </div>
                </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Overall Health Score', val: '94/100', text: 'Low Risk', color: 'emerald', icon: ShieldCheck },
                        { label: 'Upcoming Deadlines', val: '03', text: 'Within 7 Days', color: 'amber', icon: CalendarDays },
                        { label: 'Pending Challans', val: '₹14.2L', text: 'PF & ESIC', color: 'blue', icon: FileSignature },
                        { label: 'Regulatory Alerts', val: '01', text: 'New Labour Code', color: 'rose', icon: AlertTriangle },
                    ].map((kpi, i) => (
                        <div key={i} className={`bg-[#0D1928] border border-${kpi.color}-500/20 p-6 rounded-2xl relative overflow-hidden group hover:border-${kpi.color}-500/50 transition-all shadow-xl`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2.5 bg-[#060B14] rounded-xl border border-${kpi.color}-500/20 text-${kpi.color}-500 shadow-inner`}>
                                    <kpi.icon size={22} aria-hidden="true" />
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white tracking-tighter shadow-black/50 drop-shadow-md">{kpi.val}</div>
                                <div className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">{kpi.label}</div>
                                <div className={`text-[10px] font-bold mt-2 text-${kpi.color}-500/80 uppercase tracking-widest`}>{kpi.text}</div>
                            </div>
                            <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-${kpi.color}-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} aria-hidden="true" />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Compliance Calendar */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-2xl relative overflow-hidden h-[480px] flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Filing Calendar (April '24)</h2>
                                </div>
                                <button type="button" className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1">View Full <ArrowRight size={14} aria-hidden="true" /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                {[
                                    { date: '15 Apr', act: 'EPF & MP Act, 1952', desc: 'PF Remittance & Return (ECR)', status: 'Pending', color: 'amber' },
                                    { date: '15 Apr', act: 'ESI Act, 1948', desc: 'ESIC Contribution Filing', status: 'Pending', color: 'amber' },
                                    { date: '25 Apr', act: 'Professional Tax', desc: 'PT Return Filing (Maharashtra)', status: 'Upcoming', color: 'blue' },
                                    { date: '30 Apr', act: 'Income Tax Act', desc: 'TDS Challan (224 / 281)', status: 'Upcoming', color: 'blue' },
                                    { date: '05 Apr', act: 'Labour Welfare', desc: 'LWF Contribution (Bi-annual)', status: 'Filed', color: 'emerald' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-slate-700 transition-colors group">
                                        <div className="flex flex-col items-center justify-center min-w-[50px] border-r border-[#1A2A3A] pr-4">
                                            <span className="text-lg font-black text-white leading-none">{item.date.split(' ')[0]}</span>
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.date.split(' ')[1]}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xs font-black text-slate-300 uppercase tracking-tighter">{item.desc}</h3>
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border bg-${item.color}-500/10 text-${item.color}-500 border-${item.color}-500/20`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-slate-500 font-bold tracking-wide mt-1 italic">{item.act}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Access & Status */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col h-[480px]">
                            <h2 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-[#1A2A3A] pb-4">Act-wise Status</h2>

                            <div className="flex-1 space-y-5">
                                {[
                                    { act: 'EPFO (Provident Fund)', pct: 85, status: 'Action Needed' },
                                    { act: 'ESIC (State Insurance)', pct: 100, status: 'Fully Compliant' },
                                    { act: 'Income Tax (TDS/Form 16)', pct: 90, status: 'On Track' },
                                    { act: 'PT & LWF', pct: 100, status: 'Fully Compliant' },
                                    { act: 'Shop & Establishment Act', pct: 60, status: 'Renewal Due' },
                                ].map((row, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                                            <span className="text-slate-300">{row.act}</span>
                                            <span className={row.pct === 100 ? 'text-emerald-500' : row.pct > 70 ? 'text-amber-500' : 'text-rose-500'}>{row.pct}%</span>
                                        </div>
                                        <div className="h-1.5 bg-[#060B14] rounded-full overflow-hidden border border-[#1A2A3A] shadow-inner" role="progressbar" aria-valuenow={row.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${row.act} compliance: ${row.pct}%`}>
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${row.pct === 100 ? 'bg-emerald-500' : row.pct > 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                                style={{ width: `${row.pct}%` }}
                                            />
                                        </div>
                                        <div className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">{row.status}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
