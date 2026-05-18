"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Target, Search, Eye, AlertTriangle, CheckCircle2, QrCode } from 'lucide-react';

export default function AssetAuditScreen() {
    const SESSIONS = [
        { id: 'AUD-2025-Q4', name: 'Q4 2025 Annual Physical Audit', loc: 'Bengaluru HQs', status: 'In Progress', prog: 68 },
        { id: 'AUD-2025-Q1', name: 'Q1 2025 Spot Check', loc: 'Mumbai Branch', status: 'Completed', prog: 100 },
    ];

    return (
        <Page
            title="Physical Asset Audit"
            subtitle="Conduct and manage comprehensive physical verification of IT hardware."
            breadcrumbs={[{ label: "Assets", href: "/assets" }, { label: "Audit" }]}
            maxWidth="1300px"
        >

        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Target size={24} className="text-amber-400" /> Physical Asset Audit</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Conduct and manage comprehensive physical verification of IT hardware.</p>
                </div>
                <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                    Start New Audit Session
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 relative z-10 flex items-center justify-between">
                            Active Audit Session
                            <span className="bg-[#1A2A3A] text-[#8899AA] text-xs px-2 py-1 rounded font-mono">AUD-2025-Q4</span>
                        </h3>

                        <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
                            <div className="p-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl text-center">
                                <div className="text-3xl font-black text-white mb-1">850</div>
                                <div className="text-[#8899AA] text-[10px] uppercase font-bold tracking-wider">Target Assets</div>
                            </div>
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                                <div className="text-3xl font-black text-emerald-400 mb-1">578</div>
                                <div className="text-emerald-400/80 text-[10px] uppercase font-bold tracking-wider">Verified</div>
                            </div>
                            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center">
                                <div className="text-3xl font-black text-rose-400 mb-1">12</div>
                                <div className="text-rose-400/80 text-[10px] uppercase font-bold tracking-wider">Discrepancy Missed</div>
                            </div>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <h4 className="text-sm font-bold text-white">Quick Verify (Scanner Mode)</h4>
                            <div className="flex gap-3">
                                <div className="relative w-full">
                                    <QrCode size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
                                    <input type="text" placeholder="Focus here and scan barcode or enter S/N..." autoFocus
                                        className="w-full bg-[#131B2B] border-2 border-amber-500/50 rounded-xl pl-12 pr-4 py-4 text-white text-lg focus:border-amber-400 outline-none transition-colors shadow-[0_0_15px_rgba(251,191,36,0.1)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                            <h3 className="text-white font-bold">Recent Scans (Log)</h3>
                            <div className="relative w-64">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                                <input type="text" placeholder="Search log..."
                                    className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs outline-none" />
                            </div>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {[
                                { id: 'MBP-2023-892', loc: 'Desk 4B', time: 'Just now', status: 'Match', type: 'success' },
                                { id: 'MON-LG-001', loc: 'Desk 4A', time: '2 mins ago', status: 'Match', type: 'success' },
                                { id: 'MBP-2021-112', loc: 'IT Room', time: '10 mins ago', status: 'Location Mismatch', type: 'warning' },
                            ].map((scan, i) => (
                                <div key={i} className="p-4 flex items-center justify-between text-sm hover:bg-[#131B2B]/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        {scan.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <AlertTriangle size={18} className="text-amber-500" />}
                                        <div>
                                            <div className="text-white font-mono font-bold">{scan.id}</div>
                                            <div className="text-[#556677] text-xs">Scanned at: {scan.loc}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-bold text-xs ${scan.type === 'success' ? 'text-emerald-400' : 'text-amber-400'}`}>{scan.status}</div>
                                        <div className="text-[#556677] text-[10px] mt-0.5">{scan.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Audit History</h3>
                        <div className="space-y-3">
                            {SESSIONS.map((s, i) => (
                                <div key={i} className="p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl hover:border-amber-500/50 transition-colors cursor-pointer group">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white font-bold text-sm truncate pr-2 group-hover:text-amber-400">{s.name}</span>
                                        <Eye size={16} className="text-[#556677] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="text-[#8899AA] text-xs font-mono mb-3">{s.id}</div>

                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className={s.prog === 100 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>{s.status}</span>
                                        <span className="text-[#AABBCC]">{s.prog}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-[#1A2A3A] rounded-full overflow-hidden">
                                        <div className={`h-full ${s.prog === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${s.prog}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
