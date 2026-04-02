"use client";
import React, { useState } from "react";
import { Star, ChevronDown, CheckCircle2, Loader2 } from "lucide-react";

const EMPLOYEES = [
    { id: 1, name: "Anjali Singh", avatar: "AS", role: "Sales Executive", dept: "Sales", manager: "Rajesh Kumar" },
    { id: 2, name: "Rahul Sharma", avatar: "RS", role: "SWE", dept: "Eng", manager: "Priya Nair" },
    { id: 3, name: "Deepak Mehta", avatar: "DM", role: "Finance Analyst", dept: "Finance", manager: "Suresh Rao" },
];

const DIMENSIONS = ["Strategic Thinking", "Leadership Potential", "Cross-functional Impact", "Innovation", "Culture Building"];

export default function SkipLevelReview() {
    const [selected, setSelected] = useState(EMPLOYEES[0]);
    const [ratings, setRatings] = useState<Record<string, number>>({});
    const [comments, setComments] = useState<Record<string, string>>({});
    const [overall, setOverall] = useState("");
    const [saving, setSaving] = useState(false);
    const [done, setDone] = useState<string[]>([]);

    function StarRater({ val, onChange }: { val: number; onChange: (v: number) => void }) {
        const [hover, setHover] = useState(0);
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => onChange(s)} className="hover:scale-110 transition-transform">
                        <Star size={18} style={{ color: s <= (hover || val) ? "#FFB800" : "#1A2A3A", fill: s <= (hover || val) ? "#FFB800" : "#1A2A3A" }} />
                    </button>
                ))}
            </div>
        );
    }

    function submit() {
        setSaving(true);
        setTimeout(() => { setSaving(false); setDone(p => [...p, selected.id.toString()]); }, 1600);
    }

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-1">Skip-Level Review</h1>
                <p className="text-sm text-[#8899AA]">Your VP-level perspective on direct reports of your managers</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="lg:w-64 shrink-0 space-y-2">
                    <p className="text-xs text-[#8899AA] uppercase tracking-wider mb-3">Reviewees</p>
                    {EMPLOYEES.map(e => {
                        const isDone = done.includes(e.id.toString());
                        return (
                            <button key={e.id} onClick={() => setSelected(e)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${selected.id === e.id ? "bg-[#1A2A3A] border border-[#2A3A4A]" : "hover:bg-[#0D1928]"}`}>
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{e.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{e.name}</p>
                                    <p className="text-[10px] text-[#445566]">Mgr: {e.manager}</p>
                                </div>
                                {isDone && <CheckCircle2 size={14} className="text-[#00E5A0]" />}
                            </button>
                        );
                    })}
                </div>

                {/* Form */}
                <div className="flex-1 space-y-5">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#1A2A3A] flex items-center justify-center text-base font-bold text-[#8899AA]">{selected.avatar}</div>
                        <div>
                            <h2 className="font-bold text-white">{selected.name}</h2>
                            <p className="text-xs text-[#8899AA]">{selected.role} · Reports to {selected.manager}</p>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="font-semibold mb-4 text-sm">Skip-Level Dimensions</h3>
                        <div className="space-y-4">
                            {DIMENSIONS.map(d => (
                                <div key={d} className="flex items-center justify-between py-3 border-b border-[#1A2A3A] last:border-0">
                                    <span className="text-sm text-white">{d}</span>
                                    <StarRater val={ratings[d] || 0} onChange={v => setRatings(p => ({ ...p, [d]: v }))} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="font-semibold mb-3 text-sm">Overall Skip-Level Feedback</h3>
                        <textarea rows={4} value={overall} onChange={e => setOverall(e.target.value)} placeholder="Share your skip-level perspective on performance and potential..."
                            className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none" />
                    </div>

                    <button onClick={submit} disabled={saving || done.includes(selected.id.toString())}
                        className={`w-full h-12 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${done.includes(selected.id.toString()) ? "bg-[#00E5A0]/15 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                        {saving ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : done.includes(selected.id.toString()) ? <><CheckCircle2 size={16} /> Submitted</> : "Submit Skip-Level Review"}
                    </button>
                </div>
            </div>
        </div>
    );
}
