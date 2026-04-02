"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Target, Plus, ChevronRight, Users, TrendingUp, BarChart2, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const DEPARTMENTS = [
    { name: "Engineering", head: "Ravi Kumar", okrs: 6, progress: 74, status: "on-track" },
    { name: "Sales", head: "Priya Mehta", okrs: 5, progress: 58, status: "at-risk" },
    { name: "Marketing", head: "Arjun Singh", okrs: 4, progress: 82, status: "on-track" },
    { name: "Product", head: "Sneha Rao", okrs: 3, progress: 40, status: "behind" },
    { name: "HR & Admin", head: "Kavita Joshi", okrs: 4, progress: 91, status: "on-track" },
    { name: "Operations", head: "Rahul Gupta", okrs: 5, progress: 67, status: "on-track" },
];

const CHART_DATA = DEPARTMENTS.map(d => ({ dept: d.name.split(" ")[0], progress: d.progress }));
const STATUS_MAP = {
    "on-track": { label: "On Track", color: "#00E5A0" },
    "at-risk": { label: "At Risk", color: "#FFB800" },
    "behind": { label: "Behind", color: "#FF4444" },
};

export default function DepartmentOKRScreen() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string | null>(null);

    const filtered = DEPARTMENTS.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                            <Link href="/okr/dashboard" className="hover:text-white transition-colors">OKRs</Link>
                            <ChevronRight size={12} aria-hidden="true" />
                            <span className="text-white">Department OKRs</span>
                        </nav>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Users className="text-[#0066FF]" size={24} aria-hidden="true" /> Department OKRs
                        </h1>
                        <p className="text-sm text-[#8899AA] mt-1">OKR progress by department · Q1 2025</p>
                    </div>
                    <Link href="/okr/create" className="flex items-center gap-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#00c98d] transition-colors">
                        <Plus size={16} aria-hidden="true" /> Add OKR
                    </Link>
                </header>

                {/* Department Progress Chart */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="dept-chart-heading">
                    <h2 id="dept-chart-heading" className="text-sm font-semibold text-white mb-4">Department Progress Overview</h2>
                    <div className="h-48">
                        <ChartWrapper height="h-full">
                            <BarChart data={CHART_DATA} barSize={32}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                <Tooltip
                                    contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}
                                    itemStyle={{ color: "#fff", fontSize: 12 }}
                                    formatter={(v: any) => [`${v}%`, "Progress"]}
                                />
                                <Bar dataKey="progress" radius={[6, 6, 0, 0]}>
                                    {CHART_DATA.map((d, i) => (
                                        <Cell key={i} fill={d.progress >= 70 ? "#00E5A0" : d.progress >= 50 ? "#FFB800" : "#FF4444"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </section>

                {/* Search */}
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                    <label htmlFor="dept-search" className="sr-only">Search departments</label>
                    <input
                        id="dept-search"
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search department…"
                        className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                    />
                </div>

                {/* Department Cards */}
                <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(dept => {
                        const cfg = STATUS_MAP[dept.status as keyof typeof STATUS_MAP];
                        return (
                            <li key={dept.name}>
                                <button
                                    type="button"
                                    onClick={() => setSelected(dept.name === selected ? null : dept.name)}
                                    aria-expanded={selected === dept.name}
                                    className="w-full text-left bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h2 className="text-base font-semibold text-white">{dept.name}</h2>
                                            <p className="text-xs text-[#8899AA]">Head: {dept.head}</p>
                                        </div>
                                        <span
                                            className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                                            style={{ color: cfg.color, borderColor: cfg.color + "40", background: cfg.color + "15" }}
                                        >
                                            {cfg.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <BarChart2 size={12} className="text-[#445566]" aria-hidden="true" />
                                        <span className="text-xs text-[#8899AA]">{dept.okrs} OKRs</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                                            role="progressbar"
                                            aria-valuenow={dept.progress}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${dept.name} progress: ${dept.progress}%`}
                                        >
                                            <div className="h-full rounded-full" style={{ width: `${dept.progress}%`, background: cfg.color }} />
                                        </div>
                                        <span className="text-xs font-bold text-white">{dept.progress}%</span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-end gap-1 text-xs text-[#00E5A0]">
                                        <TrendingUp size={11} aria-hidden="true" /> View OKRs
                                        <ChevronRight size={11} aria-hidden="true" />
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>

            </div>
        </main>
    );
}
