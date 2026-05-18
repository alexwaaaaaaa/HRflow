"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Target, Search, Filter, ShieldAlert, CheckCircle2, Users } from 'lucide-react';
import Link from 'next/link';

type CoverageColor = "emerald" | "rose" | "amber";

const COVERAGE_TEXT_CLASSES: Record<CoverageColor, string> = {
    emerald: "font-bold text-emerald-400",
    rose: "font-bold text-rose-400",
    amber: "font-bold text-amber-400",
} as const;

const COVERAGE_ICON_CLASSES: Record<CoverageColor, string> = {
    emerald: "text-emerald-400",
    rose: "text-rose-400",
    amber: "text-amber-400",
} as const;

export default function CriticalRolesScreen() {
    const ROLES = [
        { title: 'Chief Executive Officer', dept: 'Executive', incumbent: 'Arjun Mehta', impact: 'Extreme', coverage: 'Adequate', readiness: '1 Ready Now', color: 'emerald' as CoverageColor },
        { title: 'Chief Technology Officer', dept: 'Engineering', incumbent: 'Sarah Jenkins', impact: 'Extreme', coverage: 'Risk', readiness: '0 Ready Now (2 in 1-2 yrs)', color: 'rose' as CoverageColor },
        { title: 'VP, Global Sales', dept: 'Revenue', incumbent: 'David Torres', impact: 'High', coverage: 'Adequate', readiness: '2 Ready Now', color: 'emerald' as CoverageColor },
        { title: 'VP, Product Strategy', dept: 'Product', incumbent: 'Priya Sharma', impact: 'High', coverage: 'Vulnerable', readiness: '1 (Flight Risk)', color: 'amber' as CoverageColor },
        { title: 'Director, Cybersecurity', dept: 'Engineering', incumbent: 'Vacant', impact: 'High', coverage: 'Critical Risk', readiness: 'No Internal Successors', color: 'rose' as CoverageColor },
    ];

    return (
        <Page
            title="Critical Roles Registry"
            subtitle="Identify positions essential to business continuity and evaluate current succession coverage."
            breadcrumbs={[{ label: "Succession", href: "/succession" }, { label: "Critical Roles" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Target size={24} className="text-amber-400" /> Critical Roles Registry</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Identify positions essential to business continuity and evaluate current succession coverage.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                        + Identify Critical Role
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-4 items-center justify-between bg-[#060D1A]">
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-[#131B2B] text-white border border-[#2A3A4A] rounded-lg text-xs font-bold shadow-sm">All Levels</button>
                        <button className="px-3 py-1.5 text-[#8899AA] hover:text-white transition-colors rounded-lg text-xs font-bold">C-Suite (L1)</button>
                        <button className="px-3 py-1.5 text-[#8899AA] hover:text-white transition-colors rounded-lg text-xs font-bold">VP/Director (L2/L3)</button>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="text-[#8899AA] hover:text-white transition-colors bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg"><Filter size={16} /></button>
                        <div className="relative flex-1 md:w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search Rolls..."
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-amber-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Role Details</th>
                                <th className="p-4 py-3">Current Incumbent</th>
                                <th className="p-4 py-3">Business Impact</th>
                                <th className="p-4 py-3">Bench Readiness</th>
                                <th className="p-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm border-b border-[#1A2A3A]">
                            {ROLES.map((role, i) => (
                                <tr key={i} className="hover:bg-[#131B2B]/50 transition-colors cursor-pointer group">
                                    <td className="p-4">
                                        <div className="font-bold text-white mb-0.5 group-hover:text-amber-400 transition-colors">{role.title}</div>
                                        <div className="text-[#556677] text-xs">{role.dept}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-6 h-6 rounded-full border border-[#2A3A4A] flex items-center justify-center text-[10px] font-bold ${role.incumbent === 'Vacant' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-[#1A2A3A] text-[#AABBCC]'}`}>
                                                {role.incumbent === 'Vacant' ? '!' : role.incumbent.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className={`font-bold ${role.incumbent === 'Vacant' ? 'text-rose-400' : 'text-white'}`}>{role.incumbent}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-[#1A2A3A] text-[#AABBCC] text-[10px] uppercase font-bold px-2 py-1 rounded border border-[#2A3A4A]">{role.impact}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            {role.color === 'emerald' ? <CheckCircle2 size={14} className="text-emerald-400" /> : <ShieldAlert size={14} className={COVERAGE_ICON_CLASSES[role.color]} />}
                                            <span className={COVERAGE_TEXT_CLASSES[role.color]}>{role.coverage}</span>
                                        </div>
                                        <div className="text-[#8899AA] text-xs">{role.readiness}</div>
                                    </td>
                                    <td className="p-4 text-right align-middle">
                                        <Link href="/succession/plan" className="inline-flex items-center justify-center p-2 rounded-lg bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white transition-colors">
                                            <Users size={16} className="text-[#AABBCC]" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
