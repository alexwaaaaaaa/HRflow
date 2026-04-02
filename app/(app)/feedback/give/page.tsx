"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, ChevronRight, Star, Send, ChevronDown } from "lucide-react";

const PENDING_LIST = [
    { name: "Priya Mehta", role: "HR Admin", avatar: "PM", due: "Mar 15", type: "peer" },
    { name: "Sneha Rao", role: "Product Manager", avatar: "SR", due: "Mar 16", type: "manager" },
    { name: "Rahul Gupta", role: "Ops Lead", avatar: "RG", due: "Mar 18", type: "peer" },
];

const TYPE_COLORS: Record<string, string> = { peer: "#0066FF", manager: "#00E5A0", reportee: "#FFB800" };

export default function GiveFeedbackScreen() {
    const [selected, setSelected] = useState<typeof PENDING_LIST[0] | null>(PENDING_LIST[0]);

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-5xl mx-auto space-y-6">

                <header>
                    <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                        <Link href="/feedback/dashboard" className="hover:text-white">Feedback</Link>
                        <ChevronRight size={12} aria-hidden="true" />
                        <span className="text-white">Give Feedback</span>
                    </nav>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Star className="text-[#FFB800]" size={24} aria-hidden="true" /> Give 360° Feedback
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">You have {PENDING_LIST.length} pending feedback requests.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
                    {/* Left: Pending list */}
                    <section aria-labelledby="pending-list-heading">
                        <h2 id="pending-list-heading" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-3 px-1">Pending</h2>
                        <ul role="list" className="space-y-2">
                            {PENDING_LIST.map(p => (
                                <li key={p.name}>
                                    <button
                                        type="button"
                                        onClick={() => setSelected(p)}
                                        aria-pressed={selected?.name === p.name}
                                        className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border transition-all ${selected?.name === p.name ? "border-[#9D00FF] bg-[#9D00FF]/10" : "border-[#1A2A3A] bg-[#0D1928] hover:border-[#2A3A4A]"}`}
                                    >
                                        <div className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA] shrink-0" aria-hidden="true">{p.avatar}</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                                            <p className="text-[11px] text-[#8899AA]">{p.role}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="block text-[10px] font-bold capitalize mb-1" style={{ color: TYPE_COLORS[p.type] }}>{p.type}</span>
                                            <span className="text-[10px] text-[#FF4444]">Due {p.due}</span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Right: Quick submit */}
                    <section aria-labelledby="give-form-heading">
                        {selected ? (
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-[#9D00FF]/20 border border-[#9D00FF]/30 flex items-center justify-center text-lg font-bold text-[#9D00FF]" aria-hidden="true">
                                        {selected.avatar}
                                    </div>
                                    <div>
                                        <h2 id="give-form-heading" className="text-base font-bold text-white">{selected.name}</h2>
                                        <p className="text-xs text-[#8899AA]">{selected.role} · {selected.type} review</p>
                                    </div>
                                    <Link href={`/feedback/form?for=${selected.name}`} className="ml-auto text-xs text-[#9D00FF] border border-[#9D00FF]/30 bg-[#9D00FF]/10 px-3 py-1.5 rounded-lg hover:bg-[#9D00FF]/20 font-medium">
                                        Full Form <ChevronRight size={11} className="inline" aria-hidden="true" />
                                    </Link>
                                </div>

                                <p className="text-sm text-[#8899AA] bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4">Give quick structured feedback or click "Full Form" for detailed competency ratings.</p>

                                {/* Star rating rows */}
                                {["Overall Performance", "Communication", "Collaboration", "Execution"].map(cat => (
                                    <StarRatingRow key={cat} label={cat} />
                                ))}

                                <div>
                                    <label htmlFor="quick-note" className="block text-xs font-semibold text-[#8899AA] mb-1.5">Brief Note</label>
                                    <textarea id="quick-note" rows={3} placeholder="Add a comment about their performance…" className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF] resize-none" />
                                </div>

                                <button type="button" className="w-full flex items-center justify-center gap-2 bg-[#9D00FF] text-white font-bold py-3 rounded-xl hover:bg-[#8300d4] transition-colors">
                                    <Send size={14} aria-hidden="true" /> Submit Feedback
                                </button>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-[#445566]">
                                <p className="text-sm">Select a person to give feedback</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}

function StarRatingRow({ label }: { label: string }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-white">{label}</span>
            <div className="flex items-center gap-1" role="radiogroup" aria-label={`Rate ${label}`}>
                {[1, 2, 3, 4, 5].map(n => (
                    <label key={n}>
                        <input type="radio" name={label} value={n} className="sr-only" onChange={() => setRating(n)} checked={rating === n} />
                        <Star
                            size={20}
                            onMouseEnter={() => setHover(n)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(n)}
                            className={`cursor-pointer transition-colors ${n <= (hover || rating) ? "text-[#FFB800] fill-[#FFB800]" : "text-[#2A3A4A]"}`}
                            aria-hidden="true"
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}
