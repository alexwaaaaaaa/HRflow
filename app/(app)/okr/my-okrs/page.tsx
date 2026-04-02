"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Target, Plus, ChevronRight, RefreshCw, Trophy, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const MY_OKRS = [
    {
        id: "o1",
        objective: "Drive 40% growth in my product segment",
        aligned: "Company OKR: ₹100 Cr ARR",
        quarter: "Q1 2025",
        progress: 60,
        status: "on-track",
        lastCheckin: "3 days ago",
        keyResults: [
            { title: "Onboard 15 new accounts", current: 9, target: 15, progress: 60 },
            { title: "Reduce deal cycle to <30 days", current: 34, target: 30, progress: 55 },
            { title: "ARPU increase by ₹5000", current: 3200, target: 5000, progress: 64 },
        ],
    },
    {
        id: "o2",
        objective: "Complete leadership training & certifications",
        aligned: "Dept OKR: L&D Completions",
        quarter: "Q1 2025",
        progress: 85,
        status: "on-track",
        lastCheckin: "1 day ago",
        keyResults: [
            { title: "Finish 3 online courses", current: 3, target: 3, progress: 100 },
            { title: "Mentor 2 junior team members", current: 1, target: 2, progress: 50 },
            { title: "Get PMP certification", current: 75, target: 100, progress: 75 },
        ],
    },
    {
        id: "o3",
        objective: "Improve feature delivery speed",
        aligned: "Dept OKR: Engineering Velocity",
        quarter: "Q1 2025",
        progress: 30,
        status: "behind",
        lastCheckin: "8 days ago",
        keyResults: [
            { title: "Deploy 5 features to prod", current: 1, target: 5, progress: 20 },
            { title: "P1 bug resolution < 2 hrs", current: 5.4, target: 2, progress: 37 },
            { title: "Code review turnaround < 24h", current: 36, target: 24, progress: 33 },
        ],
    },
];

const STATUS_MAP = {
    "on-track": { label: "On Track", color: "#00E5A0", icon: CheckCircle2 },
    "at-risk": { label: "At Risk", color: "#FFB800", icon: AlertTriangle },
    "behind": { label: "Behind", color: "#FF4444", icon: Clock },
};

export default function MyOKRsScreen() {
    const [expanded, setExpanded] = useState<string | null>("o1");

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                            <Link href="/okr/dashboard" className="hover:text-white transition-colors">OKRs</Link>
                            <ChevronRight size={12} aria-hidden="true" />
                            <span className="text-white">My OKRs</span>
                        </nav>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Trophy className="text-[#FFB800]" size={24} aria-hidden="true" /> My OKRs
                        </h1>
                        <p className="text-sm text-[#8899AA] mt-1">Your personal objectives and key results · Q1 2025</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/okr/check-in" className="flex items-center gap-2 bg-[#0D1928] border border-[#1A2A3A] text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#1A2A3A] transition-colors">
                            <RefreshCw size={14} aria-hidden="true" /> Check-in
                        </Link>
                        <Link href="/okr/create" className="flex items-center gap-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#00c98d] transition-colors">
                            <Plus size={16} aria-hidden="true" /> Add OKR
                        </Link>
                    </div>
                </header>

                {/* OKR Summary */}
                <dl className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Total Objectives", val: MY_OKRS.length, color: "#0066FF" },
                        { label: "Avg Progress", val: `${Math.round(MY_OKRS.reduce((s, o) => s + o.progress, 0) / MY_OKRS.length)}%`, color: "#00E5A0" },
                        { label: "Behind Schedule", val: MY_OKRS.filter(o => o.status === "behind").length, color: "#FF4444" },
                    ].map(s => (
                        <div key={s.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <dt className="text-xs text-[#8899AA] mb-1">{s.label}</dt>
                            <dd className="text-3xl font-bold" style={{ color: s.color }}>{s.val}</dd>
                        </div>
                    ))}
                </dl>

                {/* My OKR List */}
                <ul role="list" className="space-y-4">
                    {MY_OKRS.map(obj => {
                        const cfg = STATUS_MAP[obj.status as keyof typeof STATUS_MAP];
                        const StatusIcon = cfg.icon;
                        const isOpen = expanded === obj.id;
                        return (
                            <li key={obj.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => setExpanded(isOpen ? null : obj.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`my-kr-${obj.id}`}
                                    className="w-full text-left px-6 py-5 hover:bg-[#152336] transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-3 mb-1">
                                        <h2 className="text-base font-semibold text-white">{obj.objective}</h2>
                                        <span
                                            className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold border"
                                            style={{ color: cfg.color, borderColor: cfg.color + "40", background: cfg.color + "15" }}
                                        >
                                            <StatusIcon size={10} aria-hidden="true" /> {cfg.label}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#8899AA] mb-3">↳ Aligned to: {obj.aligned} · Last check-in: {obj.lastCheckin}</p>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                                            role="progressbar"
                                            aria-valuenow={obj.progress}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${obj.objective}: ${obj.progress}% complete`}
                                        >
                                            <div className="h-full rounded-full" style={{ width: `${obj.progress}%`, background: cfg.color }} />
                                        </div>
                                        <span className="text-sm font-bold text-white shrink-0">{obj.progress}%</span>
                                    </div>
                                </button>

                                {isOpen && (
                                    <ul id={`my-kr-${obj.id}`} role="list" className="border-t border-[#1A2A3A] divide-y divide-[#1A2A3A]">
                                        {obj.keyResults.map((kr, i) => (
                                            <li key={i} className="px-6 py-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-[#445566] uppercase">KR {i + 1}</span>
                                                        <p className="text-sm text-white">{kr.title}</p>
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
                                                            style={{ width: `${kr.progress}%`, background: kr.progress >= 70 ? "#00E5A0" : kr.progress >= 40 ? "#FFB800" : "#FF4444" }}
                                                        />
                                                    </div>
                                                    <span className="text-[11px] text-[#8899AA] shrink-0">{kr.current} / {kr.target}</span>
                                                </div>
                                            </li>
                                        ))}
                                        <li className="px-6 py-3 flex items-center justify-between bg-[#0A1420]">
                                            <Link href={`/okr/progress?id=${obj.id}`} className="text-xs text-[#00E5A0] hover:underline font-medium flex items-center gap-1">
                                                <Target size={11} aria-hidden="true" /> Update Progress
                                            </Link>
                                            <Link href={`/okr/check-in?id=${obj.id}`} className="text-xs text-[#0066FF] hover:underline font-medium flex items-center gap-1">
                                                <RefreshCw size={11} aria-hidden="true" /> Add Check-in
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
