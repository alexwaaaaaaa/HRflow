"use client";
import React from 'react';
import { Layers, TrendingUp, Users, IndianRupee, BarChart2, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const STATS = [
    { label: 'Total FBP Pool', value: '₹2.8 Cr', color: 'text-purple-400', icon: IndianRupee, sub: 'Across 248 eligible employees' },
    { label: 'Declarations Submitted', value: '187 / 248', color: 'text-emerald-400', icon: CheckCircle2, sub: '75.4% completion rate' },
    { label: 'Deadline', value: '15 Apr 2026', color: 'text-amber-400', icon: BarChart2, sub: 'Annual declaration window' },
    { label: 'Avg Utilization', value: '89.2%', color: 'text-indigo-400', icon: TrendingUp, sub: 'Of available FBP pool' },
];

const COMPONENTS = [
    { name: 'House Rent Allowance (HRA)', declared: 2200000, total: 2800000, employees: 198 },
    { name: 'LTA (Leave Travel Allowance)', declared: 850000, total: 1240000, employees: 142 },
    { name: 'Medical Reimbursement', declared: 720000, total: 744000, employees: 187 },
    { name: 'Books & Periodicals', declared: 180000, total: 310000, employees: 72 },
    { name: 'Vehicle Maintenance', declared: 420000, total: 620000, employees: 84 },
    { name: 'NPS (80CCD1B)', declared: 660000, total: 1240000, employees: 66 },
];

const NAV = [
    { label: 'My FBP Declaration', href: '/fbp/declare', desc: 'Submit or edit your component selection' },
    { label: 'Manage Declarations', href: '/fbp/manage', desc: 'View all employee submissions' },
    { label: 'Component Setup', href: '/fbp/setup', desc: 'Configure available FBP components' },
    { label: 'Mid-year Revision', href: '/fbp/mid-year', desc: 'Oct 1 revision window' },
    { label: 'Annual Report', href: '/fbp/annual-report', desc: 'FY 2025-26 FBP summary' },
];

export default function FBPDashboard() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Layers size={24} className="text-purple-400" /> Flexible Benefit Plan (FBP)</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Employee-driven salary structuring to maximize take-home and minimize tax liability</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS.map(s => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-1">
                                <Icon size={16} className={s.color} />
                                <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                            </div>
                            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">{s.label}</div>
                            <div className="text-[10px] text-[#445566] mt-1">{s.sub}</div>
                        </div>
                    );
                })}
            </div>

            {/* Declaration progress */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold">Declaration Progress — FY 2026-27</h3>
                    <span className="text-[#556677] text-xs">187 / 248 employees</span>
                </div>
                <div className="h-3 bg-[#1A2A3A] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" style={{ width: '75.4%' }} />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-emerald-400 text-xs font-bold">75.4% submitted</span>
                    <span className="text-amber-400 text-xs font-bold">61 pending — 36 days remaining</span>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Component Utilization */}
                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] text-white font-bold text-sm">Component-wise Declaration</div>
                    <div className="divide-y divide-[#1A2A3A]">
                        {COMPONENTS.map((c, i) => {
                            const pct = Math.round(c.declared / c.total * 100);
                            return (
                                <div key={i} className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-white text-sm font-medium">{c.name}</span>
                                        <div className="text-right">
                                            <span className="text-purple-400 font-bold text-sm">₹{(c.declared / 100000).toFixed(1)}L</span>
                                            <span className="text-[#556677] text-xs"> / ₹{(c.total / 100000).toFixed(1)}L</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="text-xs text-[#556677] w-12 text-right">{pct}%</span>
                                        <span className="text-xs text-[#556677] w-16 text-right">{c.employees} emp</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Nav */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] text-white font-bold text-sm">FBP Modules</div>
                    <div className="divide-y divide-[#1A2A3A]">
                        {NAV.map(n => (
                            <Link key={n.href} href={n.href} className="flex items-center gap-3 p-4 hover:bg-[#131B2B] transition-colors group">
                                <div className="flex-1">
                                    <div className="text-white text-sm font-semibold group-hover:text-purple-300 transition-colors">{n.label}</div>
                                    <div className="text-[#556677] text-xs">{n.desc}</div>
                                </div>
                                <ArrowRight size={14} className="text-[#445566] group-hover:text-purple-400 shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
