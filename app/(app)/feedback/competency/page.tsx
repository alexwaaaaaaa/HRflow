"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Star, Save, AlertTriangle } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const COMPETENCIES = [
    { id: "leadership", name: "Leadership & Ownership", desc: "Takes initiative, drives results, demonstrates accountability" },
    { id: "collaboration", name: "Collaboration", desc: "Works effectively with others, fosters team success" },
    { id: "communication", name: "Communication", desc: "Clear, concise, and effective in all communication forms" },
    { id: "execution", name: "Execution & Delivery", desc: "Consistently delivers high-quality results on time" },
    { id: "innovation", name: "Innovation & Learning", desc: "Drives new ideas, embraces learning, adapts to change" },
    { id: "customer", name: "Customer Centricity", desc: "Focuses on end-user or stakeholder value" },
];

type Ratings = Record<string, number>;

export default function CompetencyAssessmentScreen() {
    const [ratings, setRatings] = useState<Ratings>({});
    const [evidence, setEvidence] = useState<Record<string, string>>({});

    const rated = Object.keys(ratings).length;
    const radarData = COMPETENCIES.map(c => ({ subject: c.name.split(" ")[0], score: ratings[c.id] || 0 }));

    function StarRow({ comp }: { comp: typeof COMPETENCIES[0] }) {
        const val = ratings[comp.id] || 0;
        const [hover, setHover] = useState(0);
        return (
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-colors">
                <div className="flex items-start gap-3 mb-4">
                    <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${val >= 4 ? "bg-[#00E5A0]/20" : val >= 3 ? "bg-[#FFB800]/20" : val > 0 ? "bg-[#FF4444]/20" : "bg-[#1A2A3A]"}`}
                        aria-hidden="true"
                    >
                        <CheckCircle2 size={14} className={val >= 4 ? "text-[#00E5A0]" : val >= 3 ? "text-[#FFB800]" : val > 0 ? "text-[#FF4444]" : "text-[#445566]"} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">{comp.name}</h3>
                        <p className="text-xs text-[#8899AA]">{comp.desc}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5" role="radiogroup" aria-label={`Rating for ${comp.name}`}>
                        {[1, 2, 3, 4, 5].map(n => (
                            <label key={n}>
                                <input type="radio" name={comp.id} value={n} className="sr-only" onChange={() => setRatings(r => ({ ...r, [comp.id]: n }))} checked={val === n} />
                                <Star
                                    size={24}
                                    onMouseEnter={() => setHover(n)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRatings(r => ({ ...r, [comp.id]: n }))}
                                    className={`cursor-pointer transition-colors ${n <= (hover || val) ? "text-[#FFB800] fill-[#FFB800]" : "text-[#2A3A4A]"}`}
                                    aria-hidden="true"
                                />
                            </label>
                        ))}
                    </div>
                    {val > 0 && (
                        <span className="text-xs font-bold ml-2" style={{ color: val >= 4 ? "#00E5A0" : val >= 3 ? "#FFB800" : "#FF4444" }}>
                            {["", "Below Expectations", "Needs Improvement", "Meets Expectations", "Exceeds Expectations", "Outstanding"][val]}
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor={`ev-${comp.id}`} className="sr-only">Evidence for {comp.name}</label>
                    <input
                        id={`ev-${comp.id}`}
                        type="text"
                        value={evidence[comp.id] || ""}
                        onChange={e => setEvidence(ev => ({ ...ev, [comp.id]: e.target.value }))}
                        placeholder="Specific example or evidence…"
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
                    <Link href="/feedback/dashboard" className="text-[#8899AA] hover:text-white" aria-label="Back">
                        <ChevronRight size={18} className="rotate-180" aria-hidden="true" />
                    </Link>
                    <span className="text-base font-semibold">Competency Assessment</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-[#8899AA]">{rated}/{COMPETENCIES.length} rated</span>
                    <button type="button" disabled={rated < COMPETENCIES.length} className="flex items-center gap-2 bg-[#9D00FF] text-white font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#8300d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        <Save size={14} aria-hidden="true" /> Submit
                    </button>
                </div>
            </div>
            {/* Progress bar */}
            <div
                className="h-1 bg-[#9D00FF] transition-all duration-500"
                role="progressbar"
                aria-valuenow={Math.round((rated / COMPETENCIES.length) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Assessment completion: ${rated} of ${COMPETENCIES.length} competencies rated`}
                style={{ width: `${Math.round((rated / COMPETENCIES.length) * 100)}%` }}
            />

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                    <div className="space-y-4">
                        <div className="bg-[#0D1928] border border-[#FFB800]/30 rounded-2xl p-4 flex items-center gap-2" role="note">
                            <AlertTriangle size={14} className="text-[#FFB800] shrink-0" aria-hidden="true" />
                            <p className="text-xs text-[#CCDDEE]">For self-assessment. Rate each competency honestly — your manager and HR will review this alongside peer feedback.</p>
                        </div>
                        {COMPETENCIES.map(c => <StarRow key={c.id} comp={c} />)}
                    </div>

                    {/* Radar preview */}
                    <div className="sticky top-20 self-start bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5" aria-label="Live radar preview of competency ratings">
                        <h2 className="text-sm font-semibold text-white mb-1">Live Preview</h2>
                        <p className="text-xs text-[#8899AA] mb-3">Your competency profile (updates as you rate)</p>
                        <div className="h-52">
                            <ChartWrapper height="h-full">
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke="#1A2A3A" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#8899AA", fontSize: 10 }} />
                                    <Radar dataKey="score" stroke="#9D00FF" fill="#9D00FF" fillOpacity={0.25} strokeWidth={2} />
                                </RadarChart>
                            </ChartWrapper>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
