"use client";
import React from 'react';
import { Target, Users, AlertTriangle, TrendingUp, Presentation, Crown } from 'lucide-react';
import Link from 'next/link';

export default function SuccessionDashboardScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Crown size={24} className="text-amber-400" /> Executive Succession Dashboard</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Monitor bench strength, critical role coverage, and leadership continuity planning.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/succession/board-report" className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Presentation size={16} /> Generate Board Pack
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Target size={14} /> Critical Roles Identified</div>
                    <div className="text-3xl font-black text-white mb-2">42</div>
                    <div className="text-indigo-400 text-xs font-bold">L1 (C-Suite) & L2 (SVP/VP)</div>
                </div>

                <div className="bg-gradient-to-r from-[#1A2A3A] to-[#0A1420] border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden cursor-pointer hover:border-rose-500/50 transition-colors">
                    <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><AlertTriangle size={14} /> Roles with No Successor</div>
                    <div className="text-3xl font-black text-rose-400 mb-2">8</div>
                    <div className="text-[#8899AA] text-xs font-bold underline decoration-dashed hover:text-white transition-colors">High Risk Continuity</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Users size={14} /> Talent Pool Size</div>
                    <div className="text-3xl font-black text-white mb-2">156</div>
                    <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">+12 Added this quarter</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><TrendingUp size={14} /> "Ready Now" Candidates</div>
                    <div className="text-3xl font-black text-white mb-2">24%</div>
                    <div className="text-[#8899AA] text-xs font-bold">Target bench strength &gt; 35%</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-6">
                            <h3 className="text-white font-bold">Key Bench Strength Index</h3>
                            <span className="text-xs text-[#8899AA] font-bold">By Function</span>
                        </div>

                        <div className="space-y-5">
                            {[
                                { label: 'Engineering Leaders', val: 65, color: 'bg-emerald-500', ready: 12, total: 18 },
                                { label: 'Sales & Revenue', val: 40, color: 'bg-amber-500', ready: 4, total: 10 },
                                { label: 'Product VP/Dir', val: 25, color: 'bg-rose-500', ready: 2, total: 8 },
                                { label: 'Finance & Ops', val: 80, color: 'bg-indigo-500', ready: 4, total: 5 },
                            ].map((d, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1.5 font-bold">
                                        <span className="text-white">{d.label}</span>
                                        <span className="text-[#8899AA]">{d.ready} of {d.total} roles covered</span>
                                    </div>
                                    <div className="group relative w-full h-2 bg-[#131B2B] rounded-full overflow-hidden">
                                        <div className={`h-full ${d.color} opacity-80 group-hover:opacity-100 transition-opacity`} style={{ width: `${d.val}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 flex items-center justify-between">
                            Critical Flight Risks (L1/L2)
                            <Link href="/succession/flight-risk" className="text-indigo-400 hover:text-white text-xs font-bold transition-colors">View Map &rarr;</Link>
                        </h3>

                        <div className="space-y-3">
                            {[
                                { name: 'Sarah Jenkins', role: 'VP, Engineering Core', risk: 'High', imp: 'Critical', color: 'text-rose-400', bg: 'bg-rose-500/10' },
                                { name: 'Michael Chen', role: 'Chief Financial Officer', risk: 'Medium', imp: 'Critical', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                                { name: 'Priya Sharma', role: 'VP, Data Science', risk: 'High', imp: 'High', color: 'text-rose-400', bg: 'bg-rose-500/10' },
                            ].map((r, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#131B2B] transition-colors border border-transparent hover:border-[#1A2A3A] cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-white font-bold">
                                            {r.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">{r.name}</div>
                                            <div className="text-[#8899AA] text-xs">{r.role}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${r.bg} ${r.color} border-current opacity-70`}>{r.risk} Risk</span>
                                        <span className="text-[#556677] text-[10px] font-bold uppercase tracking-wider">{r.imp} Impact</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
