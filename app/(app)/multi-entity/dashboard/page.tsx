"use client";
import React from 'react';
import { LayoutDashboard, Users, UserPlus, FileSignature, ArrowUpRight, ArrowDownRight, IndianRupee, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function GroupDashboardScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><LayoutDashboard size={24} className="text-indigo-400" /> Group Executive Dashboard</h1>
                    <p className="text-[#8899AA] text-sm mt-1">High-level view of 4 active entities and 567 total employees.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: Users, label: 'Total Readcount', value: '567', sub: '+15 vs last month', up: true },
                    { icon: UserPlus, label: 'Monthly Attrition', value: '1.2%', sub: '-0.3% vs last month', up: false },
                    { icon: IndianRupee, label: 'Total Payroll Cost', value: '₹3.29 Cr', sub: '+2.1% vs last month', up: true },
                    { icon: FileSignature, label: 'Pending Approvals', value: '24', sub: 'Across 3 entities', up: true, warn: true },
                ].map((kpi, i) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                            <div className="absolute -right-6 -top-6 text-[#131B2B] transition-transform group-hover:scale-110">
                                <Icon size={120} strokeWidth={1} />
                            </div>
                            <div className="relative z-10">
                                <div className="text-[#8899AA] text-sm font-bold mb-2 flex items-center justify-between">
                                    {kpi.label}
                                    <div className={`p-1.5 rounded-lg ${kpi.warn ? 'bg-amber-500/10 text-amber-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                        <Icon size={16} />
                                    </div>
                                </div>
                                <div className="text-3xl font-black text-white mb-2">{kpi.value}</div>
                                <div className={`text-xs font-bold flex items-center gap-1 ${kpi.warn ? 'text-amber-400' : kpi.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {!kpi.warn && (kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />)}
                                    {kpi.sub}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 flex items-center justify-between">
                        Group Payroll Trend
                        <select className="bg-[#131B2B] border border-[#2A3A4A] text-xs px-2 py-1 rounded text-[#AABBCC] outline-none">
                            <option>Last 6 Months</option>
                            <option>YTD</option>
                        </select>
                    </h3>

                    <div className="h-64 flex items-end justify-between gap-2 pt-4">
                        {[
                            { m: 'May', h: 60, val: '₹3.01' },
                            { m: 'Jun', h: 65, val: '₹3.10' },
                            { m: 'Jul', h: 62, val: '₹3.08' },
                            { m: 'Aug', h: 70, val: '₹3.18' },
                            { m: 'Sep', h: 72, val: '₹3.22' },
                            { m: 'Oct', h: 85, val: '₹3.29', active: true },
                        ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative cursor-pointer">
                                <div className="absolute -top-8 bg-[#1A2A3A] text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {bar.val} Cr
                                </div>
                                <div className="w-full bg-[#131B2B] rounded-t-lg relative flex items-end justify-center overflow-hidden" style={{ height: '200px' }}>
                                    <div className={`w-full rounded-t-lg transition-all duration-500 ease-out group-hover:opacity-80 ${bar.active ? 'bg-indigo-500' : 'bg-indigo-500/30'}`} style={{ height: `${bar.h}%` }}></div>
                                </div>
                                <div className={`text-xs font-bold ${bar.active ? 'text-white' : 'text-[#556677]'}`}>{bar.m}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 flex items-center justify-between">
                        Entity Distribution
                    </h3>
                    <div className="space-y-4 pt-2">
                        {[
                            { e: 'Acme Tech (Parent)', v: 342, p: 60, c: 'bg-indigo-500' },
                            { e: 'Acme Retail', v: 128, p: 23, c: 'bg-blue-500' },
                            { e: 'Acme Logistics', v: 85, p: 15, c: 'bg-emerald-500' },
                            { e: 'Acme Global US', v: 12, p: 2, c: 'bg-purple-500' },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                    <span className="text-[#AABBCC]">{item.e}</span>
                                    <span className="text-white">{item.v}</span>
                                </div>
                                <div className="w-full h-2 bg-[#131B2B] rounded-full overflow-hidden">
                                    <div className={`h-full ${item.c}`} style={{ width: `${item.p}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#1A2A3A]">
                        <Link href="/multi-entity/list" className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2.5 rounded-xl transition-colors text-center text-sm flex items-center justify-center gap-2">
                            <Building2 size={16} /> Manage Entities
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
