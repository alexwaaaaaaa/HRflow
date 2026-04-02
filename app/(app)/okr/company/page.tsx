"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Target, ChevronRight, Plus, TrendingUp, BarChart2, Search, Filter, ChevronDown } from "lucide-react";

const OBJECTIVES = [
    {
        id: "obj-1",
        title: "Achieve ₹100 Cr ARR",
        owner: "CEO Office",
        quarter: "Q1 2025",
        progress: 72,
        status: "on-track",
        keyResults: [
            { title: "Close 50 enterprise deals", progress: 78, unit: "deals", current: 39, target: 50 },
            { title: "Expand SMB base by 30%", progress: 68, unit: "%", current: 20, target: 30 },
            { title: "Upsell revenue ₹20 Cr", progress: 65, unit: "₹Cr", current: 13, target: 20 },
        ],
    },
    {
        id: "obj-2",
        title: "Achieve 95% Customer Retention",
        owner: "CX Team",
        quarter: "Q1 2025",
        progress: 88,
        status: "on-track",
        keyResults: [
            { title: "Reduce churn to <5%", progress: 90, unit: "%", current: 4.5, target: 5 },
            { title: "NPS > 60", progress: 88, unit: "score", current: 53, target: 60 },
            { title: "SLA breach rate: 0%", progress: 85, unit: "%", current: 0.3, target: 0 },
        ],
    },
    {
        id: "obj-3",
        title: "Expand to 3 New Cities",
        owner: "Expansion",
        quarter: "Q1 2025",
        progress: 33,
        status: "at-risk",
        keyResults: [
            { title: "Open Hyderabad office", progress: 80, unit: "complete", current: 80, target: 100 },
            { title: "Open Pune office", progress: 20, unit: "complete", current: 20, target: 100 },
            { title: "Open Ahmedabad office", progress: 0, unit: "complete", current: 0, target: 100 },
        ],
    },
];

const STATUS_MAP = {
    "on-track": { label: "On Track", color: "#00E5A0" },
    "at-risk": { label: "At Risk", color: "#FFB800" },
    "behind": { label: "Behind", color: "#FF4444" },
};

export default function CompanyOKRScreen() {
    const [expanded, setExpanded] = useState<string | null>("obj-1");
    const [search, setSearch] = useState("");

    const filtered = OBJECTIVES.filter(o =>
        o.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                            <Link href="/okr/dashboard" className="hover:text-white transition-colors">OKRs</Link>
                            <ChevronRight size={12} aria-hidden="true" />
                            <span className="text-white">Company OKRs</span>
                        </nav>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Target className="text-[#00E5A0]" size={24} aria-hidden="true" /> Company OKRs
                        </h1>
                        <p className="text-sm text-[#8899AA] mt-1">Top-level objectives driving company strategy · Q1 2025</p>
                    </div>
                    <Link href="/okr/create" className="flex items-center gap-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#00c98d] transition-colors">
                        <Plus size={16} aria-hidden="true" /> Add Objective
                    </Link>
                </header>

                {/* Search + Filter */}
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                        <label htmlFor="obj-search" className="sr-only">Search objectives</label>
                        <input
                            id="obj-search"
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search objectives…"
                            className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                        />
                    </div>
                    <button type="button" className="p-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg hover:bg-[#1A2A3A] transition-colors" aria-label="Filter objectives">
                        <Filter size={16} aria-hidden="true" />
                    </button>
                </div>

                {/* Objectives Accordion */}
                <ul role="list" className="space-y-4">
                    {filtered.map(obj => {
                        const cfg = STATUS_MAP[obj.status as keyof typeof STATUS_MAP];
                        const isOpen = expanded === obj.id;
                        return (
                            <li key={obj.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                                {/* Objective Header */}
                                <button
                                    type="button"
                                    onClick={() => setExpanded(isOpen ? null : obj.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`kr-${obj.id}`}
                                    className="w-full text-left px-6 py-5 hover:bg-[#152336] transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h2 className="text-base font-semibold text-white truncate">{obj.title}</h2>
                                                <span
                                                    className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold border"
                                                    style={{ color: cfg.color, borderColor: cfg.color + "40", background: cfg.color + "15" }}
                                                >
                                                    {cfg.label}
                                                </span>
                                            </div>
                                            <p className="text-xs text-[#8899AA]">Owner: {obj.owner} · {obj.quarter}</p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-lg font-bold text-white">{obj.progress}%</span>
                                            <ChevronDown
                                                size={16}
                                                className={`text-[#445566] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div
                                        className="mt-3 h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={obj.progress}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${obj.title}: ${obj.progress}% complete`}
                                    >
                                        <div className="h-full rounded-full" style={{ width: `${obj.progress}%`, background: cfg.color }} />
                                    </div>
                                </button>

                                {/* Key Results */}
                                {isOpen && (
                                    <ul id={`kr-${obj.id}`} role="list" className="border-t border-[#1A2A3A] divide-y divide-[#1A2A3A]">
                                        {obj.keyResults.map((kr, i) => (
                                            <li key={i} className="px-6 py-4 hover:bg-[#0A1420] transition-colors">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-[#445566] uppercase tracking-wider">KR {i + 1}</span>
                                                        <p className="text-sm text-white font-medium">{kr.title}</p>
                                                    </div>
                                                    <span className="text-xs font-bold" style={{ color: kr.progress >= 70 ? "#00E5A0" : kr.progress >= 40 ? "#FFB800" : "#FF4444" }}>
                                                        {kr.progress}%
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="flex-1 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden"
                                                        role="progressbar"
                                                        aria-valuenow={kr.progress}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        aria-label={`${kr.title}: ${kr.progress}%`}
                                                    >
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${kr.progress}%`,
                                                                background: kr.progress >= 70 ? "#00E5A0" : kr.progress >= 40 ? "#FFB800" : "#FF4444"
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-[11px] text-[#8899AA] shrink-0">
                                                        {kr.current} / {kr.target} {kr.unit}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                        <li className="px-6 py-3 flex justify-end">
                                            <Link href={`/okr/progress?id=${obj.id}`} className="flex items-center gap-1 text-xs text-[#00E5A0] hover:underline font-medium">
                                                <TrendingUp size={12} aria-hidden="true" /> Update Progress
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>

            </div>
        </main>
    );
}
