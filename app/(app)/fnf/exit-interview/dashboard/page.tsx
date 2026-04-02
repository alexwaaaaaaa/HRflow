"use client";

import React from 'react';
import {
    BarChart3, PieChart, Users, TrendingUp, AlertTriangle,
    MessageSquare, Search, Filter, Download, Zap, ArrowUpRight
} from 'lucide-react';

export default function ExitInterviewDashboardHR() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2 italic">Attrition Insights</h1>
                        <p className="text-slate-400 max-w-2xl font-medium">Real-time analysis of employee exit feedback and organizational health metrics.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-white hover:bg-[#1A2A3A] transition-all flex items-center shadow-lg">
                        <Download size={16} className="mr-2 text-blue-400" /> Export Sentiment Report
                    </button>
                </div>

                {/* Sentiment & Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Overall Exit Score', value: '4.2/5', icon: BarChart3, trend: '+0.3', color: 'text-emerald-500' },
                        { label: 'Primary Reason', value: 'Career Growth', icon: TrendingUp, detail: '45% of exits', color: 'text-blue-500' },
                        { label: 'Participation Rate', value: '88%', icon: MessageSquare, trend: '-2%', color: 'text-rose-500' },
                        { label: 'High Potential Attrition', value: '04', icon: AlertTriangle, detail: 'Critical Risk', color: 'text-amber-500' },
                    ].map((m, i) => (
                        <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl relative overflow-hidden group">
                            <m.icon size={20} className={`${m.color} mb-4`} />
                            <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{m.label}</h3>
                            <div className="text-3xl font-black text-white">{m.value}</div>
                            <div className="mt-2 flex items-center gap-2">
                                <span className={`text-[10px] font-black ${m.trend?.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {m.trend} {m.detail}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Reason Analysis Chart Placeholder */}
                    <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative group overflow-hidden">
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-lg font-black text-white flex items-center">
                                <PieChart size={20} className="mr-3 text-blue-500" /> exit Reason Distribution
                            </h2>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-[#060B14] rounded-lg text-[10px] font-black text-blue-400 border border-blue-500/20">Monthly</button>
                                <button className="px-3 py-1 text-[10px] font-black text-slate-500">Quarterly</button>
                            </div>
                        </div>

                        <div className="space-y-6 relative z-10">
                            {[
                                { reason: 'Career Growth / Better Pay', perc: 45, color: 'bg-blue-500' },
                                { reason: 'Work-Life Balance', perc: 25, color: 'bg-emerald-500' },
                                { reason: 'Management / Leadership', perc: 15, color: 'bg-amber-500' },
                                { reason: 'Personal / Health', perc: 10, color: 'bg-indigo-500' },
                                { reason: 'Others', perc: 5, color: 'bg-slate-700' },
                            ].map((r, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                        <span className="text-slate-400">{r.reason}</span>
                                        <span className="text-white">{r.perc}%</span>
                                    </div>
                                    <div className="w-full bg-[#060B14] h-2.5 rounded-full overflow-hidden border border-[#1A2A3A]">
                                        <div className={`${r.color} h-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,102,255,0.2)]`} style={{ width: `${r.perc}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full group-hover:scale-125 transition-transform duration-700" />
                    </div>

                    {/* Critical Alerts / Feed */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-6">
                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Zap size={16} className="text-amber-500 animate-pulse" /> Critical Sentiment Alerts
                        </h2>
                        <div className="space-y-4">
                            {[
                                { name: 'Arnab D.', dept: 'Eng', rating: 2, snippet: 'Burnout is a major concern...' },
                                { name: 'Sanya G.', dept: 'Mkt', rating: 5, snippet: 'Highly professional culture!' },
                                { name: 'Rahul V.', dept: 'Prod', rating: 1, snippet: 'Toxic manager in the...' },
                            ].map((alert, i) => (
                                <div key={i} className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-blue-500/30 transition-all cursor-pointer group">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-xs font-black text-white">{alert.name} <span className="text-slate-600 ml-1">• {alert.dept}</span></span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <div key={s} className={`w-1 h-1 rounded-full ${s <= alert.rating ? (alert.rating <= 2 ? 'bg-rose-500' : 'bg-emerald-500') : 'bg-slate-800'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-500 italic leading-snug">"{alert.snippet}"</p>
                                    <div className="mt-3 flex justify-end">
                                        <ArrowUpRight size={10} className="text-slate-700 group-hover:text-blue-500 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 bg-[#0D1928] border border-blue-500/20 rounded-xl text-blue-500 font-bold text-xs hover:bg-blue-500/5 transition-all">
                            View Historical Analytics
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
