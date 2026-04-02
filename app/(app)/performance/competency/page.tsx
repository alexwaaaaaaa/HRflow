"use client";
import React, { useState } from "react";
import { Plus, Edit2, ChevronDown, ChevronUp, Star } from "lucide-react";

const COMPETENCIES = [
    {
        id: 1, name: "Communication", description: "Clearly articulates ideas verbally and in writing",
        levels: [
            { rating: 1, label: "Basic", desc: "Struggles to articulate ideas clearly" },
            { rating: 2, label: "Developing", desc: "Communicates adequately in familiar situations" },
            { rating: 3, label: "Proficient", desc: "Communicates effectively in most situations" },
            { rating: 4, label: "Advanced", desc: "Adapts communication style to audience and context" },
            { rating: 5, label: "Expert", desc: "Inspires through communication; influences at org level" },
        ]
    },
    {
        id: 2, name: "Problem Solving", description: "Analyzes complex issues and develops innovative solutions",
        levels: [
            { rating: 1, label: "Basic", desc: "Struggles with ambiguous problems" },
            { rating: 2, label: "Developing", desc: "Resolves standard problems with guidance" },
            { rating: 3, label: "Proficient", desc: "Independently solves most problems" },
            { rating: 4, label: "Advanced", desc: "Solves complex multi-stakeholder problems" },
            { rating: 5, label: "Expert", desc: "Creates frameworks that prevent systemic problems" },
        ]
    },
    {
        id: 3, name: "Leadership", description: "Inspires and guides individuals toward goals",
        levels: [
            { rating: 1, label: "Basic", desc: "Follows directions without leading others" },
            { rating: 2, label: "Developing", desc: "Occasionally takes initiative" },
            { rating: 3, label: "Proficient", desc: "Leads small teams effectively" },
            { rating: 4, label: "Advanced", desc: "Drives org-wide change and develops others" },
            { rating: 5, label: "Expert", desc: "Shapes organizational culture and strategy" },
        ]
    },
];

export default function CompetencyFramework() {
    const [expandedId, setExpandedId] = useState<number | null>(1);

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Competency Framework</h1>
                    <p className="text-sm text-[#8899AA]">Define behavioural competencies and proficiency levels</p>
                </div>
                <button className="h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl hover:bg-[#243040] flex items-center gap-2 transition-colors">
                    <Plus size={14} /> Add Competency
                </button>
            </div>

            <div className="space-y-4">
                {COMPETENCIES.map(comp => {
                    const expanded = expandedId === comp.id;
                    return (
                        <div key={comp.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                            <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-[#1A2A3A]/30 transition-colors" onClick={() => setExpandedId(expanded ? null : comp.id)}>
                                <div className="flex-1">
                                    <p className="font-semibold text-white">{comp.name}</p>
                                    <p className="text-xs text-[#8899AA] mt-0.5">{comp.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 hover:bg-[#1A2A3A] rounded-lg text-[#445566] hover:text-white transition-colors"><Edit2 size={13} /></button>
                                    {expanded ? <ChevronUp size={15} className="text-[#445566]" /> : <ChevronDown size={15} className="text-[#445566]" />}
                                </div>
                            </div>
                            {expanded && (
                                <div className="px-5 pb-5 border-t border-[#1A2A3A]">
                                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-4">
                                        {comp.levels.map(lv => (
                                            <div key={lv.rating} className="bg-[#0A1420] rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 mb-1.5">
                                                    {Array.from({ length: lv.rating }).map((_, i) => (
                                                        <Star key={i} size={10} style={{ color: "#FFB800", fill: "#FFB800" }} />
                                                    ))}
                                                </div>
                                                <p className="text-xs font-semibold text-white mb-1">{lv.label}</p>
                                                <p className="text-[10px] text-[#8899AA] leading-relaxed">{lv.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
