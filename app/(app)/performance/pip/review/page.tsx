"use client";
import React, { useState } from "react";
import { CheckCircle2, MessageSquare, AlertTriangle, Loader2, ChevronRight, Calendar, Star } from "lucide-react";

const WEEKS = [
    { week: 1, date: "06 Jan 2025", status: "completed", managerRating: 3, notes: "Showed improvement in meeting delivery timelines. CSAT still below target.", attended: true },
    { week: 2, date: "13 Jan 2025", status: "completed", managerRating: 3, notes: "Good collaboration observed. 2 deliveries on time.", attended: true },
    { week: 3, date: "20 Jan 2025", status: "completed", managerRating: 4, notes: "Strong week. CSAT improved to 82%. Keep it up.", attended: true },
    { week: 4, date: "27 Jan 2025", status: "active", managerRating: 0, notes: "", attended: false },
    { week: 5, date: "03 Feb 2025", status: "upcoming", managerRating: 0, notes: "", attended: false },
    { week: 6, date: "10 Feb 2025", status: "upcoming", managerRating: 0, notes: "", attended: false },
];

const GOALS = [
    { goal: "Maintain CSAT > 90%", progress: 82, target: 90, unit: "%" },
    { goal: "On-time delivery rate > 85%", progress: 75, target: 85, unit: "%" },
    { goal: "Zero escalations", progress: 2, target: 0, unit: " escalations" },
];

export default function PIPReview() {
    const [weeks, setWeeks] = useState(WEEKS);
    const [activeWeek] = useState(4);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [notes, setNotes] = useState("");
    const [saving, setSaving] = useState(false);

    function submitWeek() {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setWeeks(prev => prev.map(w => w.week === activeWeek ? { ...w, status: "completed", managerRating: rating, notes, attended: true } : w));
            setRating(0); setNotes("");
        }, 1500);
    }

    const completed = weeks.filter(w => w.status === "completed").length;
    const pct = (completed / weeks.length) * 100;

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="mb-8">
                <div className="flex items-start gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center shrink-0">
                        <AlertTriangle size={16} className="text-[#FFB800]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">PIP Weekly Reviews</h1>
                        <p className="text-sm text-[#8899AA]">Vikas Sharma · Sales · PIP Started: 06 Jan 2025 · Ends: 06 Apr 2025</p>
                    </div>
                </div>
            </div>

            {/* Goal progress */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 mb-6">
                <h3 className="font-semibold mb-4 text-sm">PIP Goals Progress</h3>
                <div className="space-y-4">
                    {GOALS.map(g => {
                        const ratio = g.unit === " escalations" ? (1 - g.progress / 10) * 100 : (g.progress / g.target) * 100;
                        const onTrack = g.unit === " escalations" ? g.progress <= g.target : g.progress >= g.target * 0.9;
                        return (
                            <div key={g.goal}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-white">{g.goal}</span>
                                    <span className="text-xs" style={{ color: onTrack ? "#00E5A0" : "#FFB800" }}>
                                        Current: {g.progress}{g.unit} {onTrack ? "✓" : "⚠"}
                                    </span>
                                </div>
                                <div className="h-2 bg-[#1A2A3A] rounded-full">
                                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(Math.abs(ratio), 100)}%`, background: onTrack ? "#00E5A0" : "#FFB800" }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Overall progress */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">PIP Timeline ({completed}/{weeks.length} weeks)</h3>
                    <span className="text-xs text-[#00E5A0]">{pct.toFixed(0)}% complete</span>
                </div>
                <div className="flex gap-2">
                    {weeks.map(w => (
                        <div key={w.week} className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${w.status === "completed" ? "bg-[#00E5A0] text-[#060B14]" : w.status === "active" ? "bg-[#0066FF] text-white" : "bg-[#1A2A3A] text-[#445566]"}`}>
                            W{w.week}
                        </div>
                    ))}
                </div>
            </div>

            {/* Weekly log */}
            <div className="space-y-4 mb-6">
                <h3 className="font-semibold">Weekly Check-in Log</h3>
                {weeks.filter(w => w.status === "completed").map(w => (
                    <div key={w.week} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#00E5A0]/10 flex items-center justify-center text-[10px] font-bold text-[#00E5A0]">W{w.week}</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-xs text-[#445566]">{w.date}</p>
                                <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(s => <Star key={s} size={11} style={{ color: s <= w.managerRating ? "#FFB800" : "#1A2A3A", fill: s <= w.managerRating ? "#FFB800" : "#1A2A3A" }} />)}</div>
                            </div>
                            <p className="text-sm text-[#8899AA]">{w.notes}</p>
                        </div>
                        <CheckCircle2 size={15} className="text-[#00E5A0] shrink-0" />
                    </div>
                ))}
            </div>

            {/* Current week review */}
            <div className="bg-[#0D1928] border border-[#0066FF]/40 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                    <h3 className="font-semibold text-base">Week {activeWeek} Review — {weeks[activeWeek - 1].date}</h3>
                </div>
                <div className="mb-4">
                    <p className="text-xs text-[#8899AA] mb-2">Week Rating</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(s => (
                            <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => setRating(s)} className="transition-transform hover:scale-110">
                                <Star size={22} style={{ color: s <= (hover || rating) ? "#FFB800" : "#1A2A3A", fill: s <= (hover || rating) ? "#FFB800" : "#1A2A3A" }} />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-xs text-[#8899AA] mb-1.5">Manager Notes</label>
                    <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Observations, progress, challenges..."
                        className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF] resize-none" />
                </div>
                <button onClick={submitWeek} disabled={saving || rating === 0}
                    className="w-full h-10 bg-[#0066FF] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#0052cc] disabled:opacity-50 transition-all">
                    {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : "Save Week 4 Review"}
                </button>
            </div>
        </div>
    );
}
