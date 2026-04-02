"use client";
import React, { useState } from "react";
import { Star, ChevronDown, ChevronUp, Save, CheckCircle2, Loader2 } from "lucide-react";

const GOALS = [
    { title: "Achieve ₹1.2 Cr quarterly revenue", weight: 30, target: "₹1.2 Cr", actual: "₹0.96 Cr" },
    { title: "Maintain CSAT > 95%", weight: 25, target: "95%", actual: "89%" },
    { title: "Complete AWS Certification", weight: 20, target: "1 cert", actual: "In progress" },
    { title: "Mentor 2 junior team members", weight: 15, target: "2 members", actual: "2 members" },
    { title: "Reduce ticket response to < 4 hours", weight: 10, target: "4 hrs", actual: "6.2 hrs" },
];

const COMPETENCIES = [
    { name: "Communication", description: "Clear and effective verbal/written communication" },
    { name: "Problem Solving", description: "Ability to analyze issues and develop solutions" },
    { name: "Collaboration", description: "Working effectively with team members and stakeholders" },
    { name: "Innovation", description: "Bringing new ideas and approaches to work" },
    { name: "Customer Focus", description: "Delivering exceptional customer value" },
];

const STAR_LABELS = ["", "Unsatisfactory", "Needs Improvement", "Meets Expectations", "Exceeds Expectations", "Exceptional"];

export default function SelfAppraisal() {
    const [goalRatings, setGoalRatings] = useState<Record<number, number>>({});
    const [goalComments, setGoalComments] = useState<Record<number, string>>({});
    const [compRatings, setCompRatings] = useState<Record<string, number>>({});
    const [strengths, setStrengths] = useState("");
    const [improvements, setImprovements] = useState("");
    const [careerGoals, setCareerGoals] = useState("");
    const [expandedGoal, setExpandedGoal] = useState<number | null>(0);
    const [saving, setSaving] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function StarRater({ value, onChange }: { value: number; onChange: (v: number) => void }) {
        const [hover, setHover] = useState(0);
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => onChange(s)}
                        className="transition-transform hover:scale-110">
                        <Star size={20} style={{ color: s <= (hover || value) ? "#FFB800" : "#1A2A3A", fill: s <= (hover || value) ? "#FFB800" : "#1A2A3A" }} />
                    </button>
                ))}
                {(hover || value) > 0 && <span className="text-xs text-[#8899AA] ml-1">{STAR_LABELS[hover || value]}</span>}
            </div>
        );
    }

    const totalRated = Object.keys(goalRatings).length + Object.keys(compRatings).length;
    const totalFields = GOALS.length + COMPETENCIES.length;
    const pct = Math.round((totalRated / totalFields) * 100);

    function handleSubmit() {
        setSaving(true);
        setTimeout(() => { setSaving(false); setSubmitted(true); }, 2000);
    }

    if (submitted) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <CheckCircle2 size={64} className="text-[#00E5A0] mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Self Appraisal Submitted!</h2>
                <p className="text-[#8899AA]">Your manager will review and submit their assessment.</p>
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Self Appraisal</h1>
                    <p className="text-sm text-[#8899AA]">FY 2024–25 · Annual Review · Due: 15 Jan 2026</p>
                </div>
                <button onClick={handleSubmit} disabled={saving}
                    className="h-10 px-5 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-all">
                    {saving ? <><Loader2 size={14} className="animate-spin" /> Submitting...</> : <><CheckCircle2 size={14} /> Submit Appraisal</>}
                </button>
            </div>

            {/* Completion meter */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 mb-6 flex items-center gap-4">
                <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-[#8899AA]">Appraisal Completion</span>
                        <span className="text-xs font-bold" style={{ color: pct >= 80 ? "#00E5A0" : "#FFB800" }}>{pct}%</span>
                    </div>
                    <div className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: pct >= 80 ? "#00E5A0" : "#FFB800" }} />
                    </div>
                </div>
                <span className="text-xs text-[#445566]">{totalRated}/{totalFields} rated</span>
            </div>

            {/* Goals Section */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-5">
                <h2 className="text-base font-semibold mb-4">Performance Goals (KRA)</h2>
                <div className="space-y-4">
                    {GOALS.map((goal, i) => {
                        const expanded = expandedGoal === i;
                        return (
                            <div key={i} className="border border-[#1A2A3A] rounded-xl overflow-hidden">
                                <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-[#1A2A3A]/30 transition-colors" onClick={() => setExpandedGoal(expanded ? null : i)}>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white">{goal.title}</p>
                                        <p className="text-[11px] text-[#8899AA]">Target: {goal.target} · Actual: {goal.actual} · W: {goal.weight}%</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {goalRatings[i] ? (
                                            <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} style={{ color: s <= goalRatings[i] ? "#FFB800" : "#1A2A3A", fill: s <= goalRatings[i] ? "#FFB800" : "#1A2A3A" }} />)}</div>
                                        ) : <span className="text-xs text-[#445566]">Not rated</span>}
                                        {expanded ? <ChevronUp size={14} className="text-[#445566]" /> : <ChevronDown size={14} className="text-[#445566]" />}
                                    </div>
                                </div>
                                {expanded && (
                                    <div className="px-4 pb-4 border-t border-[#1A2A3A]">
                                        <div className="pt-3 mb-3">
                                            <p className="text-xs text-[#8899AA] mb-2">Your Self Rating</p>
                                            <StarRater value={goalRatings[i] || 0} onChange={v => setGoalRatings(p => ({ ...p, [i]: v }))} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#8899AA] mb-1.5">Achievement Comments</p>
                                            <textarea rows={2} value={goalComments[i] || ""} onChange={e => setGoalComments(p => ({ ...p, [i]: e.target.value }))}
                                                placeholder="Describe what you achieved and how..."
                                                className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Competencies Section */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-5">
                <h2 className="text-base font-semibold mb-4">Behavioural Competencies</h2>
                <div className="space-y-4">
                    {COMPETENCIES.map((comp) => (
                        <div key={comp.name} className="flex items-start gap-4 p-4 bg-[#0A1420] rounded-xl">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white mb-0.5">{comp.name}</p>
                                <p className="text-[11px] text-[#8899AA]">{comp.description}</p>
                            </div>
                            <StarRater value={compRatings[comp.name] || 0} onChange={v => setCompRatings(p => ({ ...p, [comp.name]: v }))} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Narrative */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                <h2 className="text-base font-semibold mb-4">Your Story</h2>
                <div className="space-y-4">
                    {[
                        { label: "Key Strengths & Achievements", val: strengths, set: setStrengths, placeholder: "Describe your top highlights this year..." },
                        { label: "Areas for Improvement", val: improvements, set: setImprovements, placeholder: "What skills or areas do you want to develop?" },
                        { label: "Career Aspirations & Goals", val: careerGoals, set: setCareerGoals, placeholder: "Where do you see yourself in the next 1–2 years?" },
                    ].map(f => (
                        <div key={f.label}>
                            <label className="block text-xs text-[#8899AA] mb-1.5">{f.label}</label>
                            <textarea rows={3} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                                className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
