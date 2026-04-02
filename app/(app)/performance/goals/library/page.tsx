"use client";
import React, { useState } from "react";
import { BookOpen, Plus, Search, Tag, Star, ChevronRight } from "lucide-react";

const GOALS = [
    { id: 1, title: "Increase quarterly revenue by X%", category: "Sales", dept: "Sales", metric: "Revenue ₹", difficulty: "medium", usageCount: 124 },
    { id: 2, title: "Achieve CSAT score above X%", category: "Customer", dept: "Support", metric: "CSAT %", difficulty: "medium", usageCount: 98 },
    { id: 3, title: "Complete specified certification", category: "Learning", dept: "All", metric: "Cert. Count", difficulty: "easy", usageCount: 215 },
    { id: 4, title: "Reduce ticket resolution time", category: "Ops", dept: "Engineering", metric: "Avg Hours", difficulty: "medium", usageCount: 67 },
    { id: 5, title: "Onboard X new clients per quarter", category: "Sales", dept: "Sales", metric: "Count", difficulty: "hard", usageCount: 45 },
    { id: 6, title: "Launch X marketing campaigns", category: "Mktg", dept: "Marketing", metric: "Count", difficulty: "medium", usageCount: 38 },
    { id: 7, title: "Reduce cost per acquisition by X%", category: "Finance", dept: "Finance", metric: "₹ CPA", difficulty: "hard", usageCount: 22 },
    { id: 8, title: "Mentor X junior team members", category: "Learning", dept: "All", metric: "Count", difficulty: "easy", usageCount: 189 },
];

const DIFF_MAP = { easy: { color: "#00E5A0", bg: "rgba(0,229,160,0.1)" }, medium: { color: "#FFB800", bg: "rgba(255,184,0,0.1)" }, hard: { color: "#FF4444", bg: "rgba(255,68,68,0.1)" } };

export default function GoalLibrary() {
    const [search, setSearch] = useState("");
    const [filterCat, setFilterCat] = useState("All");
    const [added, setAdded] = useState<number[]>([]);

    const categories = ["All", ...Array.from(new Set(GOALS.map(g => g.category)))];
    const filtered = GOALS.filter(g =>
        (filterCat === "All" || g.category === filterCat) &&
        g.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Goal Library</h1>
                    <p className="text-sm text-[#8899AA]">Pre-defined goal templates for reuse across teams and cycles</p>
                </div>
                <button className="h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl hover:bg-[#243040] flex items-center gap-2 transition-colors">
                    <Plus size={14} /> Create Template
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Total Templates", value: GOALS.length, color: "#0066FF" },
                    { label: "Most Used", value: "Certification", color: "#00E5A0" },
                    { label: "Categories", value: categories.length - 1, color: "#9B59B6" },
                ].map(s => (
                    <div key={s.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 text-center">
                        <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-xs text-[#8899AA]">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="flex gap-3 mb-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search goal templates..."
                        className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {categories.map(c => (
                        <button key={c} onClick={() => setFilterCat(c)}
                            className={`h-10 px-3 text-xs rounded-xl transition-all ${filterCat === c ? "bg-[#0066FF] text-white" : "bg-[#1A2A3A] text-[#8899AA]"}`}>{c}</button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                {filtered.map(goal => {
                    const diff = DIFF_MAP[goal.difficulty as keyof typeof DIFF_MAP];
                    const isAdded = added.includes(goal.id);
                    return (
                        <div key={goal.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-4 hover:border-[#2A3A4A] transition-all">
                            <div className="w-9 h-9 rounded-xl bg-[#1A2A3A] flex items-center justify-center shrink-0">
                                <BookOpen size={15} className="text-[#8899AA]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <p className="text-sm font-medium text-white">{goal.title}</p>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: diff.bg, color: diff.color }}>{goal.difficulty}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-[#445566]">
                                    <span><Tag size={10} className="inline mr-0.5" />{goal.category}</span>
                                    <span>·</span>
                                    <span>{goal.dept}</span>
                                    <span>·</span>
                                    <span>Metric: {goal.metric}</span>
                                    <span>·</span>
                                    <span>Used {goal.usageCount}×</span>
                                </div>
                            </div>
                            <button onClick={() => setAdded(prev => isAdded ? prev.filter(i => i !== goal.id) : [...prev, goal.id])}
                                className={`h-8 px-3 text-xs rounded-lg font-medium flex items-center gap-1 transition-all shrink-0 ${isAdded ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#0066FF] text-white hover:bg-[#0052cc]"}`}>
                                {isAdded ? "✓ Added" : <><Plus size={11} /> Add to Cycle</>}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
