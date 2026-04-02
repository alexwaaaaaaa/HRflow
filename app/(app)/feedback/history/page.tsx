"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Clock, ChevronRight, Search, Filter, Star, MessageCircle } from "lucide-react";

const HISTORY = [
    { cycle: "Mid-Year 2025", type: "360 Review", direction: "received", from: "Ravi Kumar", rating: 4.3, date: "Mar 5, 2025", summary: "Strong ownership, excellent cross-team collaboration." },
    { cycle: "Mid-Year 2025", type: "360 Review", direction: "given", from: "Me → Sneha Rao", rating: 4.0, date: "Mar 4, 2025", summary: "Great product instincts, needs stronger stakeholder management." },
    { cycle: "Q4 2024", type: "Peer Review", direction: "received", from: "Arjun Singh", rating: 3.8, date: "Dec 10, 2024", summary: "Good delivery but communication could be more proactive." },
    { cycle: "Q4 2024", type: "Peer Review", direction: "given", from: "Me → Rahul Gupta", rating: 4.5, date: "Dec 8, 2024", summary: "Exceptional ops management, highly reliable." },
    { cycle: "Q3 2024", type: "Self Assessment", direction: "self", from: "Myself", rating: 3.9, date: "Sep 15, 2024", summary: "Need to improve delegation and escalation judgment." },
];

const DIR_CONFIG = {
    received: { label: "Received", color: "#00E5A0" },
    given: { label: "Given", color: "#0066FF" },
    self: { label: "Self", color: "#9D00FF" },
};

export default function FeedbackHistoryScreen() {
    const [search, setSearch] = useState("");
    const [dir, setDir] = useState("all");

    const filtered = HISTORY.filter(h =>
        (dir === "all" || h.direction === dir) &&
        (h.from.toLowerCase().includes(search.toLowerCase()) ||
            h.cycle.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                <header>
                    <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                        <Link href="/feedback/dashboard" className="hover:text-white">Feedback</Link>
                        <ChevronRight size={12} aria-hidden="true" />
                        <span className="text-white">History</span>
                    </nav>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Clock className="text-[#0066FF]" size={24} aria-hidden="true" /> Feedback History
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">All feedback received and given across cycles.</p>
                </header>

                {/* Filters */}
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                        <label htmlFor="history-search" className="sr-only">Search feedback history</label>
                        <input
                            id="history-search"
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by person or cycle…"
                            className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF]"
                        />
                    </div>
                    {/* Direction filter */}
                    <div className="flex items-center gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1" role="group" aria-label="Filter by direction">
                        {["all", "received", "given", "self"].map(d => (
                            <button
                                key={d}
                                type="button"
                                onClick={() => setDir(d)}
                                aria-pressed={dir === d}
                                className={`px-3 py-1.5 capitalize text-xs font-semibold rounded-lg transition-colors ${dir === d ? "bg-[#0066FF] text-white" : "text-[#8899AA] hover:text-white"}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* History list */}
                <ul role="list" className="space-y-3">
                    {filtered.map((h, i) => {
                        const cfg = DIR_CONFIG[h.direction as keyof typeof DIR_CONFIG];
                        return (
                            <li key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-colors">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{ color: cfg.color, borderColor: cfg.color + "40", background: cfg.color + "15" }}>
                                                {cfg.label}
                                            </span>
                                            <span className="text-xs text-[#445566]">·</span>
                                            <span className="text-xs text-[#8899AA]">{h.type}</span>
                                            <span className="text-xs text-[#445566]">·</span>
                                            <span className="text-xs text-[#8899AA]">{h.cycle}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-white">{h.from}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="flex items-center gap-1 justify-end mb-1" aria-label={`Rating: ${h.rating} out of 5`}>
                                            <Star size={13} className="text-[#FFB800] fill-[#FFB800]" aria-hidden="true" />
                                            <span className="text-sm font-bold text-white">{h.rating}</span>
                                        </div>
                                        <span className="text-[11px] text-[#445566]">{h.date}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[#8899AA] leading-relaxed">{h.summary}</p>
                            </li>
                        );
                    })}
                    {filtered.length === 0 && (
                        <li className="text-center py-12 text-[#445566]">
                            <MessageCircle size={32} className="mx-auto mb-2 opacity-30" aria-hidden="true" />
                            <p className="text-sm">No feedback found for this filter.</p>
                        </li>
                    )}
                </ul>

            </div>
        </main>
    );
}
