"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Zap, ChevronRight, Plus, CheckCircle2, Clock, BookOpen } from "lucide-react";

const STRENGTHS = [
    { name: "Strategic Ownership", score: 4.5, mentions: 8 },
    { name: "Cross-functional Collaboration", score: 4.3, mentions: 7 },
    { name: "Problem Solving", score: 4.2, mentions: 6 },
];

const GROWTH = [
    { name: "Delegation", score: 3.2, mentions: 5 },
    { name: "Public Speaking", score: 3.0, mentions: 4 },
];

const DEV_PLANS = [
    {
        area: "Delegation",
        actions: [
            { text: "Complete 'Leading Without Micromanaging' course on LMS", done: true },
            { text: "Assign 2 full projects to team leads with minimal oversight", done: false },
            { text: "Weekly 1:1 with manager to review delegation effectiveness", done: false },
        ],
    },
    {
        area: "Public Speaking",
        actions: [
            { text: "Join Toastmasters or internal speaking club", done: false },
            { text: "Present at next company all-hands", done: false },
            { text: "Record and review 2 practice presentations", done: false },
        ],
    },
];

export default function StrengthsDevelopmentScreen() {
    const [plans, setPlans] = useState(DEV_PLANS);

    const toggle = (areaIdx: number, actionIdx: number) =>
        setPlans(prev => prev.map((p, ai) =>
            ai !== areaIdx ? p : {
                ...p,
                actions: p.actions.map((a, bi) => bi !== actionIdx ? a : { ...a, done: !a.done })
            }
        ));

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-5xl mx-auto space-y-6">

                <header>
                    <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                        <Link href="/feedback/dashboard" className="hover:text-white">Feedback</Link>
                        <ChevronRight size={12} aria-hidden="true" />
                        <span className="text-white">Strengths & Development</span>
                    </nav>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Zap className="text-[#FFB800]" size={24} aria-hidden="true" /> Strengths Development
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Based on your 360° feedback — Mid-Year 2025</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="strengths-heading">
                        <h2 id="strengths-heading" className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" /> Top Strengths
                        </h2>
                        <ul role="list" className="space-y-4">
                            {STRENGTHS.map(s => (
                                <li key={s.name} className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-white">{s.name}</span>
                                        <span className="text-xs font-bold text-[#00E5A0]">⭐ {s.score}</span>
                                    </div>
                                    <div
                                        className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={s.score * 20}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${s.name}: ${s.score} out of 5`}
                                    >
                                        <div className="h-full bg-[#00E5A0] rounded-full" style={{ width: `${s.score * 20}%` }} />
                                    </div>
                                    <p className="text-[11px] text-[#8899AA]">{s.mentions} reviewers mentioned this</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Growth Areas */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="growth-heading">
                        <h2 id="growth-heading" className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                            <BookOpen size={16} className="text-[#FFB800]" aria-hidden="true" /> Growth Areas
                        </h2>
                        <ul role="list" className="space-y-4">
                            {GROWTH.map(g => (
                                <li key={g.name} className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-white">{g.name}</span>
                                        <span className="text-xs font-bold text-[#FFB800]">⭐ {g.score}</span>
                                    </div>
                                    <div
                                        className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={g.score * 20}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${g.name}: ${g.score} out of 5`}
                                    >
                                        <div className="h-full bg-[#FFB800] rounded-full" style={{ width: `${g.score * 20}%` }} />
                                    </div>
                                    <p className="text-[11px] text-[#8899AA]">{g.mentions} reviewers flagged this</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Development Plans */}
                <section aria-labelledby="dev-plan-heading">
                    <div className="flex items-center justify-between mb-4">
                        <h2 id="dev-plan-heading" className="text-base font-semibold text-white">Development Action Plans</h2>
                        <button type="button" className="flex items-center gap-1.5 text-xs text-[#9D00FF] border border-[#9D00FF]/30 bg-[#9D00FF]/10 px-3 py-1.5 rounded-lg hover:bg-[#9D00FF]/20 font-medium">
                            <Plus size={12} aria-hidden="true" /> Add Goal
                        </button>
                    </div>
                    <ul role="list" className="space-y-4">
                        {plans.map((plan, ai) => {
                            const done = plan.actions.filter(a => a.done).length;
                            return (
                                <li key={plan.area} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-base font-semibold text-white">{plan.area} — Development Plan</h3>
                                        <span className="text-xs text-[#8899AA]">{done} / {plan.actions.length} complete</span>
                                    </div>
                                    <div
                                        className="h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden mb-4"
                                        role="progressbar"
                                        aria-valuenow={Math.round((done / plan.actions.length) * 100)}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${plan.area} plan: ${done} of ${plan.actions.length} actions complete`}
                                    >
                                        <div className="h-full bg-[#9D00FF] rounded-full" style={{ width: `${Math.round((done / plan.actions.length) * 100)}%` }} />
                                    </div>
                                    <ul role="list" className="space-y-2">
                                        {plan.actions.map((action, bi) => (
                                            <li key={bi}>
                                                <label className="flex items-start gap-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={action.done}
                                                        onChange={() => toggle(ai, bi)}
                                                        className="sr-only"
                                                    />
                                                    <span
                                                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${action.done ? "bg-[#00E5A0] border-[#00E5A0]" : "border-[#2A3A4A] group-hover:border-[#00E5A0]/50"}`}
                                                        aria-hidden="true"
                                                    >
                                                        {action.done && <CheckCircle2 size={12} className="text-[#060B14]" />}
                                                    </span>
                                                    <span className={`text-sm ${action.done ? "line-through text-[#445566]" : "text-white"}`}>{action.text}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </section>

            </div>
        </main>
    );
}
