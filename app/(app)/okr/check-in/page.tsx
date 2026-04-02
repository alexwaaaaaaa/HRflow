"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RefreshCw, ChevronRight, Save, CheckCircle2, Clock, Target } from "lucide-react";
import { format } from "date-fns";

const CHECKINS = [
    { date: "Feb 24, 2025", note: "Closed 3 new enterprise accounts. Sales cycle still long at >35 days.", confidence: 3, progress: 55 },
    { date: "Feb 17, 2025", note: "Good week, completed NPS survey campaign. Score jumped to 51.", confidence: 4, progress: 48 },
    { date: "Feb 10, 2025", note: "Blocked on IT for CRM access. Escalated. Expect resolution next week.", confidence: 2, progress: 42 },
];

const CONF_LABELS = ["", "Low", "Fair", "Mid", "Good", "High"];
const CONF_COLORS = ["", "#FF4444", "#FF4444", "#FFB800", "#00E5A0", "#00E5A0"];

export default function OKRCheckinScreen() {
    const [note, setNote] = useState("");
    const [conf, setConf] = useState(3);

    return (
        <main className="min-h-screen bg-[#060B14] text-white pb-16 font-sans">

            <div className="sticky top-0 z-30 bg-[#060B14]/90 backdrop-blur border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/okr/my-okrs" className="text-[#8899AA] hover:text-white" aria-label="Back">
                        <ChevronRight size={18} className="rotate-180" aria-hidden="true" />
                    </Link>
                    <span className="text-base font-semibold">OKR Check-in</span>
                </div>
                <button type="submit" form="checkin-form" className="flex items-center gap-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#00c98d] transition-colors">
                    <Save size={14} aria-hidden="true" /> Submit Check-in
                </button>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

                {/* Objective Context */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#00E5A0]/10 flex items-center justify-center shrink-0" aria-hidden="true">
                            <Target size={16} className="text-[#00E5A0]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#8899AA] mb-0.5">Objective</p>
                            <h1 className="text-base font-bold text-white">Drive 40% growth in my product segment</h1>
                            <p className="text-xs text-[#8899AA] mt-1">Q1 2025 · Current Progress: <strong className="text-white">60%</strong></p>
                        </div>
                    </div>
                </div>

                {/* Check-in Form */}
                <form id="checkin-form" onSubmit={e => e.preventDefault()} noValidate className="space-y-5">

                    {/* Note */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <label htmlFor="checkin-note" className="block text-sm font-semibold text-white mb-3">
                            Check-in Note <span className="text-[#FF4444]" aria-label="required">*</span>
                        </label>
                        <textarea
                            id="checkin-note"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            placeholder="What did you accomplish this week? Any blockers? What's your plan ahead?"
                            rows={4}
                            required
                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                        />
                    </div>

                    {/* Confidence */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5" aria-labelledby="conf-heading">
                        <h2 id="conf-heading" className="text-sm font-semibold text-white mb-4">How confident are you of achieving this OKR?</h2>
                        <fieldset>
                            <legend className="sr-only">Confidence level (1–5)</legend>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <label key={n} className="flex-1 cursor-pointer">
                                        <input type="radio" name="conf" value={n} checked={conf === n} onChange={() => setConf(n)} className="sr-only" />
                                        <div
                                            className={`flex flex-col items-center p-3 rounded-xl border transition-all text-xs font-bold ${conf === n ? "border-current" : "border-[#1A2A3A] text-[#445566] hover:border-[#2A3A4A]"}`}
                                            style={conf === n ? { color: CONF_COLORS[n], borderColor: CONF_COLORS[n], background: CONF_COLORS[n] + "15" } : {}}
                                            aria-hidden="true"
                                        >
                                            <span className="text-lg leading-none mb-0.5">{n}</span>
                                            <span className="text-[10px]">{CONF_LABELS[n]}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </section>

                    {/* Date & Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 flex items-center gap-3">
                            <Clock size={16} className="text-[#8899AA]" aria-hidden="true" />
                            <div>
                                <p className="text-[10px] text-[#8899AA] uppercase tracking-wider mb-0.5">Check-in Date</p>
                                <p className="text-sm font-bold text-white">{format(new Date(), "MMM dd, yyyy")}</p>
                            </div>
                        </div>
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 flex items-center gap-3">
                            <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                            <div>
                                <p className="text-[10px] text-[#8899AA] uppercase tracking-wider mb-0.5">Cycle Progress</p>
                                <p className="text-sm font-bold text-white">Week 8 / 12</p>
                            </div>
                        </div>
                    </div>

                </form>

                {/* Past Check-ins */}
                <section aria-labelledby="past-checkins-heading">
                    <h2 id="past-checkins-heading" className="text-sm font-semibold text-white mb-3">Previous Check-ins</h2>
                    <ol role="list" className="space-y-3">
                        {CHECKINS.map((c, i) => (
                            <li key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-[#8899AA]">{c.date}</span>
                                    <span className="text-xs font-bold" style={{ color: CONF_COLORS[c.confidence] }}>
                                        Confidence: {CONF_LABELS[c.confidence]}
                                    </span>
                                </div>
                                <p className="text-sm text-white">{c.note}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <div
                                        className="flex-1 h-1 bg-[#1A2A3A] rounded-full overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={c.progress}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`Progress at check-in: ${c.progress}%`}
                                    >
                                        <div className="h-full rounded-full bg-[#00E5A0]" style={{ width: `${c.progress}%` }} />
                                    </div>
                                    <span className="text-[11px] text-[#8899AA] shrink-0">{c.progress}%</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

            </div>
        </main>
    );
}
