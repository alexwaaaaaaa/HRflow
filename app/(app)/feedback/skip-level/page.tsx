"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Users, ChevronRight, Save, Star, MessageSquare } from "lucide-react";

const REPORTEE = { name: "Ravi Kumar", role: "Engineering Lead", avatar: "RK", dept: "Engineering", reportingTo: "Priya Mehta (Mgr)" };

const SKIP_SECTIONS = [
    {
        title: "Visibility & Impact",
        questions: [
            "How aware are you of this employee's work and contributions?",
            "Does this employee's work align with team/company goals?",
            "Has this employee's work had meaningful business impact?",
        ],
    },
    {
        title: "Leadership & Culture",
        questions: [
            "Does this employee exhibit leadership qualities outside their direct scope?",
            "Do they contribute positively to team culture and morale?",
            "Would you trust this employee with greater responsibility?",
        ],
    },
];

type Ratings = Record<string, number>;

export default function SkipLevelReviewScreen() {
    const [ratings, setRatings] = useState<Ratings>({});
    const [comments, setComments] = useState<Record<string, string>>({});
    const [overallNote, setOverallNote] = useState("");
    const total = SKIP_SECTIONS.reduce((s, sec) => s + sec.questions.length, 0);
    const answered = Object.keys(ratings).length;

    function StarRow({ q, sid }: { q: string; sid: string }) {
        const key = `${sid}::${q}`;
        const val = ratings[key] || 0;
        const [hover, setHover] = useState(0);
        return (
            <div className="py-4 border-b border-[#1A2A3A] last:border-0">
                <p className="text-sm text-white mb-3">{q}</p>
                <div className="flex items-center gap-2 mb-3" role="radiogroup" aria-label={`Rate: ${q}`}>
                    {[1, 2, 3, 4, 5].map(n => (
                        <label key={n}>
                            <input type="radio" name={key} value={n} className="sr-only" onChange={() => setRatings(r => ({ ...r, [key]: n }))} checked={val === n} />
                            <Star
                                size={22}
                                onMouseEnter={() => setHover(n)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => setRatings(r => ({ ...r, [key]: n }))}
                                className={`cursor-pointer transition-colors ${n <= (hover || val) ? "text-[#FFB800] fill-[#FFB800]" : "text-[#2A3A4A]"}`}
                                aria-hidden="true"
                            />
                        </label>
                    ))}
                    {val > 0 && <span className="text-xs font-bold ml-1" style={{ color: val >= 4 ? "#00E5A0" : "#FFB800" }}>{["", "Disagree", "Partially", "Neutral", "Agree", "Strongly Agree"][val]}</span>}
                </div>
                <label htmlFor={`sk-${key}`} className="sr-only">Comment</label>
                <input
                    id={`sk-${key}`}
                    type="text"
                    value={comments[key] || ""}
                    onChange={e => setComments(c => ({ ...c, [key]: e.target.value }))}
                    placeholder="Additional context…"
                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 py-2 text-xs text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF]"
                />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#060B14] text-white pb-16 font-sans">
            <div className="sticky top-0 z-30 bg-[#060B14]/90 backdrop-blur border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/feedback/dashboard" className="text-[#8899AA] hover:text-white" aria-label="Back">
                        <ChevronRight size={18} className="rotate-180" aria-hidden="true" />
                    </Link>
                    <span className="text-base font-semibold">Skip-level Review</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-[#8899AA]">{answered}/{total} answered</span>
                    <button type="submit" form="skip-form" className="flex items-center gap-2 bg-[#0066FF] text-white font-bold text-sm px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        <Save size={14} aria-hidden="true" /> Submit Review
                    </button>
                </div>
            </div>
            <div
                className="h-1 bg-[#0066FF] transition-all duration-500"
                role="progressbar"
                aria-valuenow={Math.round((answered / total) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Completion: ${answered} of ${total}`}
                style={{ width: `${Math.round((answered / total) * 100)}%` }}
            />

            <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
                {/* Subject card */}
                <div className="bg-[#0D1928] border border-[#0066FF]/30 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0066FF]/20 flex items-center justify-center text-lg font-bold text-[#0066FF]" aria-hidden="true">{REPORTEE.avatar}</div>
                    <div>
                        <p className="text-xs text-[#8899AA] mb-0.5">Skip-level review for</p>
                        <h1 className="text-base font-bold text-white">{REPORTEE.name}</h1>
                        <p className="text-xs text-[#8899AA]">{REPORTEE.role} · {REPORTEE.dept} · Reports to {REPORTEE.reportingTo}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 text-[#0066FF] text-xs">
                        <Users size={13} aria-hidden="true" /> Skip-level
                    </div>
                </div>

                <form id="skip-form" onSubmit={e => e.preventDefault()} noValidate className="space-y-5">
                    {SKIP_SECTIONS.map(sec => (
                        <section key={sec.title} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby={`sk-sec-${sec.title}`}>
                            <h2 id={`sk-sec-${sec.title}`} className="text-base font-semibold text-white mb-1">{sec.title}</h2>
                            <p className="text-xs text-[#8899AA] mb-4">Rate 1 (Disagree) to 5 (Strongly Agree)</p>
                            {sec.questions.map(q => <StarRow key={q} q={q} sid={sec.title} />)}
                        </section>
                    ))}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <label htmlFor="skip-overall" className="block text-base font-semibold text-white mb-2 flex items-center gap-2">
                            <MessageSquare size={15} className="text-[#0066FF]" aria-hidden="true" /> Overall Observations
                        </label>
                        <textarea
                            id="skip-overall"
                            value={overallNote}
                            onChange={e => setOverallNote(e.target.value)}
                            rows={4}
                            placeholder="What patterns have you observed? Potential for growth? Any concerns?"
                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF] resize-none"
                        />
                    </div>
                </form>
            </div>
        </main>
    );
}
