"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
    Target, TrendingUp, CheckCircle2, AlertTriangle, Plus, ChevronRight,
    BarChart2, Calendar, Users, ArrowUpRight, RefreshCw, Filter
} from "lucide-react";
import { RadialBarChart, RadialBar, Tooltip } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const CYCLES = ["Q1 2025 (Jan–Mar)", "Q4 2024 (Oct–Dec)", "Q3 2024 (Jul–Sep)"];

const KPI = [
    { label: "Company OKRs", value: "8", sub: "3 on track · 2 at risk", icon: Target, color: "#00E5A0", bg: "#00E5A0" },
    { label: "Dept OKRs", value: "24", sub: "18 on track · 4 at risk", icon: Users, color: "#0066FF", bg: "#0066FF" },
    { label: "Team OKRs", value: "62", sub: "Across 9 departments", icon: BarChart2, color: "#FFB800", bg: "#FFB800" },
    { label: "Avg Progress", value: "68%", sub: "+4% vs last cycle", icon: TrendingUp, color: "#9D00FF", bg: "#9D00FF" },
];

const COMPANY_OKRS = [
    { title: "Achieve ₹100 Cr ARR", owner: "CEO", progress: 72, status: "on-track", due: "Mar 31" },
    { title: "Expand to 3 new cities", owner: "Expansion", progress: 45, status: "at-risk", due: "Mar 31" },
    { title: "Maintain NPS > 60", owner: "CX Team", progress: 88, status: "on-track", due: "Mar 31" },
    { title: "Reduce churn < 5%", owner: "Product", progress: 34, status: "behind", due: "Mar 31" },
];

const RADIAL_DATA = [
    { name: "On Track", value: 68, fill: "#00E5A0" },
    { name: "At Risk", value: 20, fill: "#FFB800" },
    { name: "Behind", value: 12, fill: "#FF4444" },
];

const STATUS_CONFIG = {
    "on-track": { label: "On Track", color: "#00E5A0", bg: "#00E5A0/10" },
    "at-risk": { label: "At Risk", color: "#FFB800", bg: "#FFB800/10" },
    "behind": { label: "Behind", color: "#FF4444", bg: "#FF4444/10" },
} as const;

export default function OKRDashboard() {
    const [cycle, setCycle] = useState(CYCLES[0]);

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Target className="text-[#00E5A0]" size={26} aria-hidden="true" />
                            OKR Dashboard
                        </h1>
                        <p className="text-sm text-[#8899AA] mt-1">Objectives & Key Results — company-wide progress at a glance.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <label htmlFor="cycle-select" className="sr-only">Select OKR Cycle</label>
                            <select
                                id="cycle-select"
                                value={cycle}
                                onChange={e => setCycle(e.target.value)}
                                className="bg-[#0D1928] border border-[#1A2A3A] text-white text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-[#00E5A0] appearance-none cursor-pointer"
                            >
                                {CYCLES.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8899AA] pointer-events-none" aria-hidden="true" />
                        </div>
                        <button type="button" className="p-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg hover:bg-[#1A2A3A] transition-colors" aria-label="Filter OKRs">
                            <Filter size={16} aria-hidden="true" />
                        </button>
                        <Link href="/okr/create" className="flex items-center gap-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#00c98d] transition-colors">
                            <Plus size={16} aria-hidden="true" /> New OKR
                        </Link>
                    </div>
                </header>

                {/* KPI Cards */}
                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {KPI.map(k => (
                        <div key={k.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <dt className="text-xs text-[#8899AA] font-medium">{k.label}</dt>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: k.bg + "20" }} aria-hidden="true">
                                    <k.icon size={15} style={{ color: k.color }} />
                                </div>
                            </div>
                            <dd className="text-3xl font-bold text-white mb-1">{k.value}</dd>
                            <p className="text-[11px] text-[#8899AA]">{k.sub}</p>
                        </div>
                    ))}
                </dl>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Company OKRs */}
                    <section className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden" aria-labelledby="company-okrs-heading">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2A3A]">
                            <h2 id="company-okrs-heading" className="text-base font-semibold text-white">Company Objectives</h2>
                            <Link href="/okr/company" className="text-xs text-[#00E5A0] hover:underline flex items-center gap-1">
                                View All <ChevronRight size={12} aria-hidden="true" />
                            </Link>
                        </div>
                        <ul role="list" className="divide-y divide-[#1A2A3A]">
                            {COMPANY_OKRS.map(okr => {
                                const cfg = STATUS_CONFIG[okr.status as keyof typeof STATUS_CONFIG];
                                return (
                                    <li key={okr.title} className="px-6 py-4 hover:bg-[#152336] transition-colors">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div>
                                                <p className="text-sm font-semibold text-white mb-0.5">{okr.title}</p>
                                                <p className="text-xs text-[#8899AA]">Owner: {okr.owner} · Due {okr.due}</p>
                                            </div>
                                            <span
                                                className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold border"
                                                style={{ color: cfg.color, borderColor: cfg.color + "40", background: cfg.color + "15" }}
                                            >
                                                {cfg.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                                                role="progressbar"
                                                aria-valuenow={okr.progress}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-label={`${okr.title}: ${okr.progress}% complete`}
                                            >
                                                <div
                                                    className="h-full rounded-full transition-all duration-700"
                                                    style={{ width: `${okr.progress}%`, background: cfg.color }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-white shrink-0">{okr.progress}%</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    {/* Progress Donut + Actions */}
                    <div className="flex flex-col gap-6">
                        {/* Radial Progress */}
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="progress-dist-heading">
                            <h2 id="progress-dist-heading" className="text-sm font-semibold text-white mb-4">Progress Distribution</h2>
                            <div className="h-40">
                                <ChartWrapper height="h-full">
                                    <RadialBarChart cx="50%" cy="50%" innerRadius="50%" outerRadius="90%" data={RADIAL_DATA} startAngle={90} endAngle={-270}>
                                        <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "#1A2A3A" }} />
                                        <Tooltip
                                            contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 12 }}
                                            formatter={(v: any) => [`${v}%`, ""]}
                                        />
                                    </RadialBarChart>
                                </ChartWrapper>
                            </div>
                            <ul role="list" className="mt-3 space-y-2">
                                {RADIAL_DATA.map(d => (
                                    <li key={d.name} className="flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-2 text-[#8899AA]">
                                            <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} aria-hidden="true" />
                                            {d.name}
                                        </span>
                                        <span className="font-bold text-white">{d.value}%</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Quick Actions */}
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="quick-actions-heading">
                            <h2 id="quick-actions-heading" className="text-sm font-semibold text-white mb-3">Quick Actions</h2>
                            <nav aria-label="OKR quick actions">
                                <ul role="list" className="space-y-2">
                                    {[
                                        { label: "Do Check-in", href: "/okr/check-in", icon: RefreshCw, color: "#00E5A0" },
                                        { label: "View Alignment", href: "/okr/alignment", icon: ArrowUpRight, color: "#0066FF" },
                                        { label: "OKR Reports", href: "/okr/reports", icon: BarChart2, color: "#FFB800" },
                                    ].map(a => (
                                        <li key={a.href}>
                                            <Link
                                                href={a.href}
                                                className="flex items-center gap-3 p-3 bg-[#0A1420] border border-[#1A2A3A] rounded-xl hover:border-opacity-60 transition-all group"
                                                style={{ borderColor: a.color + "30" } as React.CSSProperties}
                                            >
                                                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: a.color + "20" }} aria-hidden="true">
                                                    <a.icon size={13} style={{ color: a.color }} />
                                                </div>
                                                <span className="text-sm text-white font-medium">{a.label}</span>
                                                <ChevronRight size={13} className="ml-auto text-[#445566] group-hover:text-white transition-colors" aria-hidden="true" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </section>
                    </div>
                </div>

            </div>
        </main>
    );
}
