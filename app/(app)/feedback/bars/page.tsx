"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LayoutList, ChevronRight, Save, Star } from "lucide-react";

const BARS_DIMENSIONS = [
    {
        id: "d1",
        name: "Execution Speed",
        anchors: [
            { score: 1, text: "Frequently misses deadlines; requires constant follow-up and escalations." },
            { score: 2, text: "Sometimes misses deadlines; delivers with reminders and minimal oversight." },
            { score: 3, text: "Consistently meets deadlines with appropriate quality and no escalations needed." },
            { score: 4, text: "Consistently delivers ahead of schedule; proactively flags blockers early." },
            { score: 5, text: "Delivers complex work significantly faster than expected; sets the standard for the team." },
        ],
    },
    {
        id: "d2",
        name: "Stakeholder Management",
        anchors: [
            { score: 1, text: "Rarely communicates updates; stakeholders frequently unaware of status." },
            { score: 2, text: "Communicates reactively; updates shared only when requested." },
            { score: 3, text: "Maintains regular communication; stakeholders feel informed and aligned." },
            { score: 4, text: "Proactively aligns stakeholders; anticipates concerns and resolves them early." },
            { score: 5, text: "Masterfully manages complex stakeholder landscapes; builds lasting trust." },
        ],
    },
    {
        id: "d3",
        name: "Problem Solving",
        anchors: [
            { score: 1, text: "Struggles with ambiguous problems; frequently escalates without attempting solutions." },
            { score: 2, text: "Can solve structured problems; needs guidance in ambiguous situations." },
            { score: 3, text: "Independently identifies and solves problems with clear impact." },
            { score: 4, text: "Solves complex, cross-functional problems with creative and systematic approaches." },
            { score: 5, text: "Defines new frameworks for solving problems; builds team capability in the process." },
        ],
    },
];

export default function BARSFeedbackScreen() {
    const [selected, setSelected] = useState<Record<string, number>>({});

    const allRated = Object.keys(selected).length === BARS_DIMENSIONS.length;

    return (
        <main className="min-h-screen bg-[#060B14] text-white pb-16 font-sans">
            <div className="sticky top-0 z-30 bg-[#060B14]/90 backdrop-blur border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/feedback/dashboard" className="text-[#8899AA] hover:text-white" aria-label="Back">
                        <ChevronRight size={18} className="rotate-180" aria-hidden="true" />
                    </Link>
                    <span className="text-base font-semibold">BARS Feedback</span>
                </div>
                <button type="button" disabled={!allRated} className="flex items-center gap-2 bg-[#9D00FF] text-white font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#8300d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    <Save size={14} aria-hidden="true" /> Submit
                </button>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

                <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                        <LayoutList className="text-[#9D00FF]" size={22} aria-hidden="true" /> Behaviorally Anchored Rating Scale
                    </h1>
                    <p className="text-sm text-[#8899AA]">Select the behavior description that best matches the employee. BARS ensures objective, evidence-based ratings.</p>
                </div>

                <ul role="list" className="space-y-6">
                    {BARS_DIMENSIONS.map(dim => (
                        <li key={dim.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#1A2A3A] flex items-center justify-between">
                                <h2 className="text-base font-semibold text-white">{dim.name}</h2>
                                {selected[dim.id] && (
                                    <div className="flex items-center gap-1" aria-label={`Selected rating: ${selected[dim.id]} out of 5`}>
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <Star key={n} size={13} className={n <= selected[dim.id] ? "text-[#FFB800] fill-[#FFB800]" : "text-[#2A3A4A]"} aria-hidden="true" />
                                        ))}
                                        <span className="text-xs font-bold text-[#FFB800] ml-1">{selected[dim.id]}/5</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4" role="radiogroup" aria-label={`${dim.name} behavioral anchors`}>
                                {dim.anchors.map(anchor => {
                                    const isSelected = selected[dim.id] === anchor.score;
                                    const colors = ["#FF4444", "#FF4444", "#FFB800", "#00E5A0", "#00E5A0"];
                                    const color = colors[anchor.score - 1];
                                    return (
                                        <label
                                            key={anchor.score}
                                            className={`flex items-start gap-4 p-4 rounded-xl mb-2 last:mb-0 cursor-pointer border transition-all ${isSelected ? "border-current bg-opacity-10" : "border-transparent hover:bg-[#152336]"}`}
                                            style={isSelected ? { borderColor: color, background: color + "15" } : {}}
                                        >
                                            <input
                                                type="radio"
                                                name={dim.id}
                                                value={anchor.score}
                                                checked={isSelected}
                                                onChange={() => setSelected(s => ({ ...s, [dim.id]: anchor.score }))}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border-2 transition-all`}
                                                style={isSelected ? { background: color, borderColor: color, color: "#060B14" } : { borderColor: "#2A3A4A", color: "#445566" }}
                                                aria-hidden="true"
                                            >
                                                {anchor.score}
                                            </div>
                                            <p className={`text-sm leading-relaxed pt-0.5 ${isSelected ? "text-white font-medium" : "text-[#8899AA]"}`}>{anchor.text}</p>
                                        </label>
                                    );
                                })}
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </main>
    );
}
