"use client";
import React from 'react';
import { Layers, Play, CheckCircle2, ChevronRight, Calculator, PieChart, Info, Download } from 'lucide-react';
import Link from 'next/link';

export default function ConsolidatedPayrollScreen() {
    const ENTITIES = [
        { name: 'Acme Technologies Pvt Ltd', eid: 'ENT-001', state: 'Ready', pct: 100, emp: 342, amt: 24500000, color: 'text-emerald-400' },
        { name: 'Acme Retail Solutions', eid: 'ENT-002', state: 'Processing', pct: 45, emp: 128, amt: 8400000, color: 'text-blue-400' },
        { name: 'Acme Logistics India', eid: 'ENT-003', state: 'Pending Input', pct: 0, emp: 85, amt: 0, color: 'text-slate-400' },
    ];

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Layers size={24} className="text-purple-400" /> Consolidated Payroll Run</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Execute payroll simultaneously across all group entities for the month.</p>
                </div>
                <div className="flex items-center gap-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-2 px-4 shadow-sm">
                    <span className="text-[#8899AA] text-sm font-bold uppercase tracking-wider">Target Cycle</span>
                    <div className="text-white font-bold bg-[#1A2A3A] px-3 py-1 rounded border border-[#2A3A4A]">March 2026</div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <h3 className="text-white font-bold text-lg mb-6 relative z-10 flex items-center justify-between">
                            Global Run Status
                            <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                <Play fill="currentColor" size={12} /> Run All Pending
                            </button>
                        </h3>

                        <div className="space-y-4 relative z-10">
                            {ENTITIES.map((e, i) => (
                                <div key={i} className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <div>
                                            <div className="text-white font-bold flex items-center gap-3">
                                                {e.state === 'Ready' && <CheckCircle2 size={18} className="text-emerald-500" />}
                                                {e.state === 'Processing' && <Calculator size={18} className="text-blue-500 animate-pulse" />}
                                                {e.state === 'Pending Input' && <Info size={18} className="text-slate-500" />}
                                                {e.name}
                                            </div>
                                            <div className="text-[#556677] text-xs mt-1 ml-7 font-mono">{e.eid} • {e.emp} Employees</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#556677] text-[10px] font-bold uppercase tracking-wider mb-0.5">Est. Payout</div>
                                            <div className="font-bold text-white">₹{e.amt > 0 ? (e.amt / 100000).toFixed(2) + 'L' : '--- '}</div>
                                        </div>
                                    </div>
                                    <div className="ml-7 flex items-center gap-4">
                                        <div className="flex-1 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                            <div className={`h-full bg-current ${e.color}`} style={{ width: `${e.pct}%` }} />
                                        </div>
                                        <span className={`text-[10px] uppercase font-bold ${e.color}`}>{e.state}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 flex items-center gap-2"><PieChart size={16} className="text-[#556677]" /> Liability Overview</h3>
                        <div className="space-y-6 text-center pt-2">
                            <div>
                                <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Total Processed Gross</div>
                                <div className="text-3xl font-black text-white">₹3.29 Cr</div>
                                <div className="text-[#556677] text-[10px] mt-1">From 2 of 3 entities</div>
                            </div>
                            <div className="flex gap-4 p-4 bg-[#131B2B] rounded-xl border border-[#2A3A4A]">
                                <div className="flex-1 border-r border-[#2A3A4A]">
                                    <div className="text-[#8899AA] text-[10px] uppercase mb-1">Net Pay</div>
                                    <div className="text-emerald-400 font-bold">₹2.81 Cr</div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-[#8899AA] text-[10px] uppercase mb-1">Taxes (TDS)</div>
                                    <div className="text-rose-400 font-bold">₹0.48 Cr</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <Download size={18} className="text-purple-400" /> Download Consolidated Bank File
                    </button>
                </div>
            </div>
        </div>
    );
}
