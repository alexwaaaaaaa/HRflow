"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, ChevronRight, Save, Minus, Plus } from "lucide-react";

const KRS = [
    { id: "kr1", title: "Onboard 15 new accounts", current: 9, target: 15, unit: "accounts", progress: 60 },
    { id: "kr2", title: "Reduce deal cycle to <30 days", current: 34, target: 30, unit: "days", progress: 55 },
    { id: "kr3", title: "ARPU increase by ₹5000", current: 3200, target: 5000, unit: "₹", progress: 64 },
];

export default function OKRProgressUpdate() {
    const [values, setValues] = useState<Record<string, number>>(
        Object.fromEntries(KRS.map(k => [k.id, k.current]))
    );
    const [note, setNote] = useState("");
    const [confidence, setConfidence] = useState(3);

    const updateVal = (id: string, delta: number, max: number) =>
        setValues(prev => ({ ...prev, [id]: Math.max(0, Math.min(max, (prev[id] || 0) + delta)) }));

    return (
        <main className="min-h-screen bg-[#060B14] text-white pb-16 font-sans">
            <div className="sticky top-0 z-30 bg-[#060B14]/90 backdrop-blur border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/okr/my-okrs" className="text-[#8899AA] hover:text-white transition-colors" aria-label="Back">
                        <ChevronRight size={18} className="rotate-180" aria-hidden="true" />
                    </Link>
                    <span className="text-base font-semibold">Update OKR Progress</span>
                </div>
                <button type="submit" form="progress-form" className="flex items-center gap-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#00c98d] transition-colors">
                    <Save size={14} aria-hidden="true" /> Save Update
                </button>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-xs text-[#8899AA] mb-1">Updating progress for</p>
                    <h1 className="text-base font-bold text-white">Drive 40% growth in my product segment</h1>
                    <p className="text-xs text-[#8899AA] mt-1">Q1 2025 · Owner: Priya Mehta</p>
                </div>

                <form id="progress-form" onSubmit={e => e.preventDefault()} noValidate className="space-y-4">

                    {/* Key Results */}
                    <section aria-labelledby="kr-update-heading">
                        <h2 id="kr-update-heading" className="text-sm font-semibold text-white mb-3">Update Key Results</h2>
                        <ul role="list" className="space-y-4">
                            {KRS.map(kr => {
                                const current = values[kr.id] ?? kr.current;
                                const progress = Math.min(100, Math.round((current / kr.target) * 100));
                                const color = progress >= 70 ? "#00E5A0" : progress >= 40 ? "#FFB800" : "#FF4444";
                                return (
                                    <li key={kr.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <p className="text-sm font-semibold text-white">{kr.title}</p>
                                            <span className="text-xs font-bold" style={{ color }}>{progress}%</span>
                                        </div>
                                        {/* Progress Bar */}
                                        <div
                                            className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden mb-4"
                                            role="progressbar"
                                            aria-valuenow={progress}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${kr.title}: ${progress}%`}
                                        >
                                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: color }} />
                                        </div>
                                        {/* Value stepper */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-[#8899AA]">Current Value ({kr.unit})</span>
                                            <div className="flex items-center gap-2 ml-auto">
                                                <button
                                                    type="button"
                                                    onClick={() => updateVal(kr.id, -1, kr.target * 2)}
                                                    aria-label={`Decrease ${kr.title} value`}
                                                    className="w-7 h-7 rounded-lg bg-[#0A1420] border border-[#1A2A3A] flex items-center justify-center hover:bg-[#1A2A3A] transition-colors"
                                                >
                                                    <Minus size={12} aria-hidden="true" />
                                                </button>
                                                <label htmlFor={`val-${kr.id}`} className="sr-only">{kr.title} current value</label>
                                                <input
                                                    id={`val-${kr.id}`}
                                                    type="number"
                                                    value={current}
                                                    onChange={e => setValues(prev => ({ ...prev, [kr.id]: Number(e.target.value) }))}
                                                    className="w-20 text-center bg-[#0A1420] border border-[#00E5A0]/40 rounded-lg py-1.5 text-sm font-bold text-white focus:outline-none focus:border-[#00E5A0]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => updateVal(kr.id, 1, kr.target * 2)}
                                                    aria-label={`Increase ${kr.title} value`}
                                                    className="w-7 h-7 rounded-lg bg-[#0A1420] border border-[#1A2A3A] flex items-center justify-center hover:bg-[#1A2A3A] transition-colors"
                                                >
                                                    <Plus size={12} aria-hidden="true" />
                                                </button>
                                                <span className="text-xs text-[#8899AA]">/ {kr.target} {kr.unit}</span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    {/* Confidence Level */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5" aria-labelledby="confidence-heading">
                        <h2 id="confidence-heading" className="text-sm font-semibold text-white mb-3">Confidence Level</h2>
                        <fieldset>
                            <legend className="sr-only">Select your confidence level</legend>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <label key={n} className="flex-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="confidence"
                                            value={n}
                                            checked={confidence === n}
                                            onChange={() => setConfidence(n)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-xs font-bold ${confidence === n ? "border-[#00E5A0] bg-[#00E5A0]/10 text-[#00E5A0]" : "border-[#1A2A3A] text-[#445566] hover:border-[#2A3A4A]"}`}
                                            aria-hidden="true"
                                        >
                                            <span className="text-base">{n}</span>
                                            <span>{["Low", "Fair", "Mid", "Good", "High"][n - 1]}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </section>

                    {/* Check-in Note */}
                    <div>
                        <label htmlFor="checkin-note" className="block text-xs font-semibold text-[#8899AA] mb-1.5">Check-in Note (Optional)</label>
                        <textarea
                            id="checkin-note"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            placeholder="What went well? Any blockers? Plans for next week?"
                            rows={3}
                            className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                        />
                    </div>

                </form>
            </div>
        </main>
    );
}
