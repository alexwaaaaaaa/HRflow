"use client";
import React, { useState } from "react";
import { Star, MessageSquare, TrendingUp, Save, CheckCircle2 } from "lucide-react";

const MID_YEAR_GOALS = [
    { title: "Revenue Target", target: "₹1.2 Cr", current: "₹0.6 Cr", progress: 50, onTrack: true },
    { title: "CSAT Score", target: "95%", current: "89%", progress: 62, onTrack: false },
    { title: "AWS Certification", target: "Completed", current: "In Progress", progress: 75, onTrack: true },
    { title: "Mentor 2 juniors", target: "2", current: "1", progress: 50, onTrack: true },
];

export default function MidYearReview() {
    const [goalUpdates, setGoalUpdates] = useState<Record<number, string>>({});
    const [overallComment, setOverallComment] = useState("");
    const [managerRating, setManagerRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [saved, setSaved] = useState(false);

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Mid-Year Review</h1>
                    <p className="text-sm text-[#8899AA]">Oct 2025 · Rahul Sharma · Engineering</p>
                </div>
                <button onClick={() => setSaved(true)}
                    className={`h-10 px-5 text-sm font-bold rounded-xl flex items-center gap-2 transition-all ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                    {saved ? <><CheckCircle2 size={14} /> Saved</> : <><Save size={14} /> Save Review</>}
                </button>
            </div>

            {/* Goal progress review */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-5">
                <h2 className="text-base font-semibold mb-4">Goal Progress Review (H1)</h2>
                <div className="space-y-4">
                    {MID_YEAR_GOALS.map((g, i) => (
                        <div key={i} className="p-4 bg-[#0A1420] rounded-xl">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="text-sm font-medium text-white">{g.title}</p>
                                    <p className="text-[11px] text-[#8899AA]">Target: {g.target} · Current: {g.current}</p>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${g.onTrack ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "bg-[#FFB800]/10 text-[#FFB800]"}`}>
                                    {g.onTrack ? "On Track" : "At Risk"}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex-1 h-2 bg-[#1A2A3A] rounded-full">
                                    <div className="h-full rounded-full" style={{ width: `${g.progress}%`, background: g.onTrack ? "#00E5A0" : "#FFB800" }} />
                                </div>
                                <span className="text-xs font-bold text-white">{g.progress}%</span>
                            </div>
                            <textarea rows={2} value={goalUpdates[i] || ""} onChange={e => setGoalUpdates(p => ({ ...p, [i]: e.target.value }))}
                                placeholder="Manager notes for H2 course correction..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2 text-xs text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Qualitative */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-5">
                <h2 className="text-base font-semibold mb-4">Manager Assessment</h2>
                <div className="mb-4">
                    <p className="text-xs text-[#8899AA] mb-2">Mid-Year Rating</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(s => (
                            <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => setManagerRating(s)} className="transition-transform hover:scale-110">
                                <Star size={24} style={{ color: s <= (hover || managerRating) ? "#FFB800" : "#1A2A3A", fill: s <= (hover || managerRating) ? "#FFB800" : "#1A2A3A" }} />
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-xs text-[#8899AA] mb-1.5">Overall H1 Feedback & H2 Guidance</label>
                    <textarea rows={4} value={overallComment} onChange={e => setOverallComment(e.target.value)}
                        placeholder="Share your assessment of H1 performance and key focus areas for H2..."
                        className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none" />
                </div>
            </div>
        </div>
    );
}
