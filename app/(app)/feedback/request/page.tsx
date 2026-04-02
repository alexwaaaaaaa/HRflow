"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, ChevronRight, Plus, Search, Trash2, Send } from "lucide-react";

const EMPLOYEES = [
    { name: "Ravi Kumar", role: "Eng Lead", dept: "Engineering", avatar: "RK" },
    { name: "Sneha Rao", role: "PM", dept: "Product", avatar: "SR" },
    { name: "Arjun Singh", role: "Marketing Head", dept: "Marketing", avatar: "AS" },
    { name: "Kavita Joshi", role: "HR Manager", dept: "HR", avatar: "KJ" },
    { name: "Rahul Gupta", role: "Ops Lead", dept: "Operations", avatar: "RG" },
    { name: "Nidhi Sharma", role: "Finance Lead", dept: "Finance", avatar: "NS" },
];

const TEMPLATES = ["360 Mid-Year Review", "Leadership Assessment", "Peer Review", "Manager Review", "Custom"];

interface Reviewer {
    name: string;
    role: string;
    dept: string;
    avatar: string;
    type: "peer" | "manager" | "reportee" | "self";
}

export default function RequestFeedbackScreen() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Reviewer[]>([]);
    const [template, setTemplate] = useState(TEMPLATES[0]);
    const [dueDate, setDueDate] = useState("2025-03-20");

    const filtered = EMPLOYEES.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) &&
        !selected.find(s => s.name === e.name)
    );

    const addReviewer = (emp: typeof EMPLOYEES[0], type: Reviewer["type"]) => {
        setSelected(prev => [...prev, { ...emp, type }]);
        setSearch("");
    };
    const removeReviewer = (name: string) => setSelected(prev => prev.filter(s => s.name !== name));

    const TYPE_COLORS: Record<string, string> = { peer: "#0066FF", manager: "#00E5A0", reportee: "#FFB800", self: "#9D00FF" };

    return (
        <main className="min-h-screen bg-[#060B14] text-white pb-16 font-sans">
            <div className="sticky top-0 z-30 bg-[#060B14]/90 backdrop-blur border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/feedback/dashboard" className="text-[#8899AA] hover:text-white" aria-label="Back">
                        <ChevronRight size={18} className="rotate-180" aria-hidden="true" />
                    </Link>
                    <span className="text-base font-semibold">Request 360° Feedback</span>
                </div>
                <button
                    type="button"
                    disabled={selected.length === 0}
                    className="flex items-center gap-2 bg-[#9D00FF] text-white font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#8300d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <Send size={14} aria-hidden="true" /> Send Requests ({selected.length})
                </button>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

                {/* Template + Due Date */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="feedback-template" className="block text-xs font-semibold text-[#8899AA] mb-1.5">Feedback Template</label>
                        <select
                            id="feedback-template"
                            value={template}
                            onChange={e => setTemplate(e.target.value)}
                            className="w-full bg-[#0D1928] border border-[#1A2A3A] text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#9D00FF] appearance-none cursor-pointer"
                        >
                            {TEMPLATES.map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="due-date" className="block text-xs font-semibold text-[#8899AA] mb-1.5">Due Date</label>
                        <input
                            id="due-date"
                            type="date"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                            className="w-full bg-[#0D1928] border border-[#1A2A3A] text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#9D00FF] [color-scheme:dark]"
                        />
                    </div>
                </div>

                {/* Selected Reviewers */}
                {selected.length > 0 && (
                    <section aria-labelledby="selected-heading">
                        <h2 id="selected-heading" className="text-sm font-semibold text-white mb-3">Selected Reviewers ({selected.length})</h2>
                        <ul role="list" className="space-y-2">
                            {selected.map(r => (
                                <li key={r.name} className="flex items-center gap-3 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 py-3">
                                    <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA]" aria-hidden="true">{r.avatar}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white">{r.name}</p>
                                        <p className="text-[11px] text-[#8899AA]">{r.role} · {r.dept}</p>
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize border" style={{ color: TYPE_COLORS[r.type], borderColor: TYPE_COLORS[r.type] + "40", background: TYPE_COLORS[r.type] + "15" }}>
                                        {r.type}
                                    </span>
                                    <button type="button" onClick={() => removeReviewer(r.name)} aria-label={`Remove ${r.name}`} className="p-1 text-[#445566] hover:text-[#FF4444] transition-colors">
                                        <Trash2 size={14} aria-hidden="true" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Add Reviewers */}
                <section aria-labelledby="add-reviewer-heading">
                    <h2 id="add-reviewer-heading" className="text-sm font-semibold text-white mb-3">Add Reviewers</h2>
                    <div className="relative mb-3">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                        <label htmlFor="reviewer-search" className="sr-only">Search employees</label>
                        <input
                            id="reviewer-search"
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search employees to add…"
                            className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF]"
                        />
                    </div>
                    <ul role="list" className="space-y-2">
                        {filtered.map(emp => (
                            <li key={emp.name} className="flex items-center gap-3 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 py-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA]" aria-hidden="true">{emp.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white">{emp.name}</p>
                                    <p className="text-[11px] text-[#8899AA]">{emp.role} · {emp.dept}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    {(["peer", "manager", "reportee"] as const).map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => addReviewer(emp, t)}
                                            className="text-[10px] font-bold px-2.5 py-1 rounded-lg border capitalize transition-colors hover:opacity-80"
                                            style={{ color: TYPE_COLORS[t], borderColor: TYPE_COLORS[t] + "40", background: TYPE_COLORS[t] + "15" }}
                                            aria-label={`Add ${emp.name} as ${t}`}
                                        >
                                            + {t}
                                        </button>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

            </div>
        </main>
    );
}
