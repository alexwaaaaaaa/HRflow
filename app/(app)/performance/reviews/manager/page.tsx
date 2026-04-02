"use client";
import React, { useState } from "react";
import { Star, Users, ChevronRight, CheckCircle2, Loader2, Lock, Unlock } from "lucide-react";

const TEAM = [
    { id: 1, name: "Anjali Singh", avatar: "AS", role: "Sales Executive", dept: "Sales", selfRating: 4.2, status: "submitted" },
    { id: 2, name: "Rahul Sharma", avatar: "RS", role: "Software Engineer", dept: "Eng", selfRating: 3.8, status: "submitted" },
    { id: 3, name: "Priya Kapoor", avatar: "PK", role: "Marketing Lead", dept: "Mktg", selfRating: 4.5, status: "submitted" },
    { id: 4, name: "Vikas Sharma", avatar: "VS", role: "Account Manager", dept: "Sales", selfRating: 3.1, status: "pending" },
    { id: 5, name: "Meena Reddy", avatar: "MR", role: "HR Generalist", dept: "HR", selfRating: 4.0, status: "submitted" },
];

const GOAL_LABELS = ["Revenue Target", "CSAT Score", "Certifications", "Mentoring", "Response Time"];

export default function ManagerAppraisal() {
    const [selected, setSelected] = useState<typeof TEAM[0] | null>(TEAM[0]);
    const [goalRatings, setGoalRatings] = useState<Record<string, number>>({});
    const [compRatings, setCompRatings] = useState<Record<string, number>>({});
    const [overallRating, setOverallRating] = useState(0);
    const [comment, setComment] = useState("");
    const [saving, setSaving] = useState(false);
    const [doneIds, setDoneIds] = useState<number[]>([]);

    function StarRater({ value, onChange, size = 18 }: { value: number; onChange: (v: number) => void; size?: number }) {
        const [hover, setHover] = useState(0);
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => onChange(s)} className="transition-transform hover:scale-110">
                        <Star size={size} style={{ color: s <= (hover || value) ? "#FFB800" : "#1A2A3A", fill: s <= (hover || value) ? "#FFB800" : "#1A2A3A" }} />
                    </button>
                ))}
            </div>
        );
    }

    function submit() {
        if (!selected) return;
        setSaving(true);
        setTimeout(() => { setSaving(false); setDoneIds(p => [...p, selected.id]); }, 1800);
    }

    const isDone = selected ? doneIds.includes(selected.id) : false;

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-1">Manager Appraisal</h1>
                <p className="text-sm text-[#8899AA]">Review your team's performance — FY 2024–25</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* LEFT — team list */}
                <div className="w-full lg:w-[280px] shrink-0 space-y-2">
                    <p className="text-xs text-[#8899AA] font-medium uppercase tracking-wider mb-3">Team ({TEAM.length})</p>
                    {TEAM.map(emp => {
                        const done = doneIds.includes(emp.id);
                        return (
                            <button key={emp.id} onClick={() => setSelected(emp)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${selected?.id === emp.id ? "bg-[#1A2A3A] border border-[#2A3A4A]" : "hover:bg-[#0D1928]"}`}>
                                <div className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA] shrink-0">{emp.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{emp.name}</p>
                                    <p className="text-[11px] text-[#445566]">{emp.role}</p>
                                </div>
                                {done ? <CheckCircle2 size={15} className="text-[#00E5A0] shrink-0" />
                                    : emp.status === "pending" ? <span className="text-[9px] text-[#FFB800] bg-[#FFB800]/10 px-1.5 py-0.5 rounded shrink-0">Pending Self</span>
                                        : <ChevronRight size={14} className="text-[#445566] shrink-0" />}
                            </button>
                        );
                    })}
                    {/* Summary */}
                    <div className="mt-4 p-3 bg-[#0D1928] border border-[#1A2A3A] rounded-xl">
                        <p className="text-xs text-[#8899AA] mb-1">Completion</p>
                        <p className="text-lg font-bold text-white">{doneIds.length}/{TEAM.length}</p>
                        <div className="h-1.5 bg-[#1A2A3A] rounded-full mt-2">
                            <div className="h-full bg-[#00E5A0] rounded-full transition-all" style={{ width: `${(doneIds.length / TEAM.length) * 100}%` }} />
                        </div>
                    </div>
                </div>

                {/* RIGHT — appraisal form */}
                {selected && (
                    <div className="flex-1 space-y-5">
                        {/* Employee header */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#1A2A3A] flex items-center justify-center text-lg font-bold text-[#8899AA]">{selected.avatar}</div>
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-white">{selected.name}</h2>
                                <p className="text-sm text-[#8899AA]">{selected.role} · {selected.dept}</p>
                                <p className="text-xs text-[#445566] mt-0.5">Self-Rating: ⭐ {selected.selfRating}/5.0</p>
                            </div>
                            {isDone && <div className="flex items-center gap-2 px-3 py-2 bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded-xl">
                                <Lock size={14} className="text-[#00E5A0]" />
                                <span className="text-xs text-[#00E5A0] font-medium">Review Submitted</span>
                            </div>}
                        </div>

                        {/* Goal ratings */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <h3 className="font-semibold mb-4">Rate Goals (KRA)</h3>
                            <div className="space-y-4">
                                {GOAL_LABELS.map(gl => (
                                    <div key={gl} className="flex items-center justify-between py-3 border-b border-[#1A2A3A] last:border-0">
                                        <span className="text-sm text-white">{gl}</span>
                                        <StarRater value={goalRatings[gl] || 0} onChange={v => setGoalRatings(p => ({ ...p, [gl]: v }))} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Competency ratings */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <h3 className="font-semibold mb-4">Competency Ratings</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {["Communication", "Problem Solving", "Collaboration", "Leadership"].map(c => (
                                    <div key={c} className="p-3 bg-[#0A1420] rounded-xl">
                                        <p className="text-xs text-[#8899AA] mb-2">{c}</p>
                                        <StarRater value={compRatings[c] || 0} onChange={v => setCompRatings(p => ({ ...p, [c]: v }))} size={16} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Overall + comments */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <h3 className="font-semibold mb-4">Final Assessment</h3>
                            <div className="mb-4">
                                <p className="text-xs text-[#8899AA] mb-2">Overall Rating</p>
                                <StarRater value={overallRating} onChange={setOverallRating} size={24} />
                                {overallRating > 0 && <p className="text-sm text-[#FFB800] mt-1">⭐ {["", "Unsatisfactory", "Needs Improvement", "Meets Expectations", "Exceeds Expectations", "Exceptional"][overallRating]}</p>}
                            </div>
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1.5">Manager Feedback</label>
                                <textarea rows={3} value={comment} onChange={e => setComment(e.target.value)} placeholder="Provide constructive feedback..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none" />
                            </div>
                        </div>

                        <button onClick={submit} disabled={saving || isDone}
                            className={`w-full h-12 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${isDone ? "bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                            {saving ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : isDone ? <><CheckCircle2 size={16} /> Review Submitted</> : "Submit Manager Review"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
