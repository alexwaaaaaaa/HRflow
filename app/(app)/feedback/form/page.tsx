"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Star, Send, Save } from "lucide-react";

const SECTIONS = [
    {
        id: "leadership",
        title: "Leadership & Ownership",
        questions: [
            "Takes initiative and drives outcomes without being asked",
            "Ownership — sees problems through to resolution",
            "Handles ambiguity and uncertainty effectively",
        ],
    },
    {
        id: "collaboration",
        title: "Collaboration & Communication",
        questions: [
            "Communicates clearly and concisely (written & verbal)",
            "Works effectively with cross-functional teams",
            "Actively listens and considers others' perspectives",
        ],
    },
    {
        id: "execution",
        title: "Execution & Results",
        questions: [
            "Consistently delivers high-quality work on time",
            "Sets and achieves measurable goals",
            "Prioritizes effectively and adapts to change",
        ],
    },
    {
        id: "growth",
        title: "Growth & Learning",
        questions: [
            "Proactively seeks feedback and acts on it",
            "Continuously upgrades skills and knowledge",
            "Encourages growth in teammates",
        ],
    },
];

type Ratings = Record<string, number>;
type Comments = Record<string, string>;

export default function FeedbackFormScreen() {
    const [ratings, setRatings] = useState<Ratings>({});
    const [comments, setComments] = useState<Comments>({});
    const [overallNote, setOverallNote] = useState("");

    const setRating = (key: string, val: number) => setRatings(prev => ({ ...prev, [key]: val }));
    const setComment = (key: string, val: string) => setComments(prev => ({ ...prev, [key]: val }));

    const answeredCount = Object.keys(ratings).length;
    const totalQuestions = SECTIONS.reduce((s, sec) => s + sec.questions.length, 0);

    function StarRow({ q, sId }: { q: string; sId: string }) {
        const key = `${sId}::${q}`;
        const val = ratings[key] || 0;
        const [hover, setHover] = useState(0);
        return (
            <div className="py-4 border-b border-[#1A2A3A] last:border-0">
                <p className="text-sm text-white mb-3">{q}</p>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5" role="radiogroup" aria-label={`Rating for: ${q}`}>
                        {[1, 2, 3, 4, 5].map(n => (
                            <label key={n}>
                                <input type="radio" name={key} value={n} className="sr-only" onChange={() => setRating(key, n)} checked={val === n} />
                                <Star
                                    size={22}
                                    onMouseEnter={() => setHover(n)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(key, n)}
                                    className={`cursor-pointer transition-colors ${n <= (hover || val) ? "text-[#FFB800] fill-[#FFB800]" : "text-[#2A3A4A]"}`}
                                    aria-hidden="true"
                                />
                            </label>
                        ))}
                    </div>
                    {val > 0 && (
                        <span className="text-xs font-bold text-[#FFB800]">
                            {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][val]}
                        </span>
                    )}
                </div>
                <div className="mt-3">
                    <label htmlFor={`comment-${key}`} className="sr-only">Comment for: {q}</label>
                    <input
                        id={`comment-${key}`}
                        type="text"
                        value={comments[key] || ""}
                        onChange={e => setComment(key, e.target.value)}
                        placeholder="Add specific evidence or example…"
                        className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 py-2 text-xs text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF]"
                    />
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#060B14] text-white pb-16 font-sans">
            <div className="sticky top-0 z-30 bg-[#060B14]/90 backdrop-blur border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/feedback/give" className="text-[#8899AA] hover:text-white" aria-label="Back">
                        <ChevronRight size={18} className="rotate-180" aria-hidden="true" />
                    </Link>
                    <span className="text-base font-semibold">Feedback Form</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-[#8899AA]">{answeredCount} / {totalQuestions} answered</span>
                    <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white border border-[#1A2A3A] rounded-lg hover:bg-[#1A2A3A]">
                        <Save size={12} aria-hidden="true" /> Save Draft
                    </button>
                    <button type="submit" form="feedback-form" className="flex items-center gap-2 bg-[#9D00FF] text-white font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#8300d4] transition-colors">
                        <Send size={14} aria-hidden="true" /> Submit
                    </button>
                </div>
            </div>

            {/* Progress */}
            <div
                className="h-1 bg-[#00E5A0] transition-all duration-500"
                role="progressbar"
                aria-valuenow={Math.round((answeredCount / totalQuestions) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Form completion: ${Math.round((answeredCount / totalQuestions) * 100)}%`}
                style={{ width: `${Math.round((answeredCount / totalQuestions) * 100)}%` }}
            />

            <div className="max-w-3xl mx-auto px-6 py-8 space-y-2">
                {/* Subject card */}
                <div className="bg-[#0D1928] border border-[#9D00FF]/30 rounded-2xl p-5 flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#9D00FF]/20 flex items-center justify-center text-lg font-bold text-[#9D00FF]" aria-hidden="true">PM</div>
                    <div>
                        <p className="text-xs text-[#8899AA] mb-0.5">Giving feedback to</p>
                        <h1 className="text-base font-bold text-white">Priya Mehta</h1>
                        <p className="text-xs text-[#8899AA]">HR Admin · Peer Review · Mid-Year 2025</p>
                    </div>
                </div>

                <form id="feedback-form" onSubmit={e => e.preventDefault()} noValidate className="space-y-6">
                    {SECTIONS.map(sec => (
                        <section key={sec.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby={`section-${sec.id}`}>
                            <h2 id={`section-${sec.id}`} className="text-base font-semibold text-white mb-1">{sec.title}</h2>
                            <p className="text-xs text-[#8899AA] mb-4">Rate 1–5 and provide specific examples where possible.</p>
                            {sec.questions.map(q => <StarRow key={q} q={q} sId={sec.id} />)}
                        </section>
                    ))}

                    {/* Overall note */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <label htmlFor="overall-note" className="block text-base font-semibold text-white mb-2">Overall Comments</label>
                        <p className="text-xs text-[#8899AA] mb-3">What are this person's biggest strengths? Any areas for development?</p>
                        <textarea
                            id="overall-note"
                            value={overallNote}
                            onChange={e => setOverallNote(e.target.value)}
                            rows={5}
                            placeholder="Share your overall impression, strengths, and growth areas…"
                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF] resize-none"
                        />
                    </div>

                </form>
            </div>
        </main>
    );
}
