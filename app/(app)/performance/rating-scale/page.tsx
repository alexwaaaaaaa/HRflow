"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Star, CheckCircle2, GripVertical } from "lucide-react";

interface RatingLevel {
    id: number;
    label: string;
    score: number;
    description: string;
    color: string;
    percentage: string;
}

const DEFAULT_SCALE: RatingLevel[] = [
    { id: 1, label: "Exceptional", score: 5, description: "Consistently exceeds all expectations. Role model performance.", color: "#00E5A0", percentage: "10%" },
    { id: 2, label: "Exceeds Expectations", score: 4, description: "Regularly surpasses goals. High impact contributor.", color: "#0066FF", percentage: "20%" },
    { id: 3, label: "Meets Expectations", score: 3, description: "Achieves most goals. Solid, reliable performance.", color: "#FFB800", percentage: "40%" },
    { id: 4, label: "Needs Improvement", score: 2, description: "Some gaps. Requires focused development.", color: "#FF8C00", percentage: "20%" },
    { id: 5, label: "Unsatisfactory", score: 1, description: "Consistently falls short. PIP may be initiated.", color: "#FF4444", percentage: "10%" },
];

export default function RatingScaleConfig() {
    const [scale, setScale] = useState<RatingLevel[]>(DEFAULT_SCALE);
    const [editId, setEditId] = useState<number | null>(null);
    const [saved, setSaved] = useState(false);

    function updateLevel(id: number, field: keyof RatingLevel, value: string | number) {
        setScale(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l));
    }

    function deleteLevel(id: number) {
        setScale(prev => prev.filter(l => l.id !== id));
    }

    function save() {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    const totalPct = scale.reduce((s, l) => s + parseInt(l.percentage), 0);

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Rating Scale Configuration</h1>
                    <p className="text-sm text-[#8899AA]">Define performance rating levels and bell curve distribution</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setScale(prev => [...prev, { id: Date.now(), label: "New Level", score: 0, description: "", color: "#8899AA", percentage: "0%" }])}
                        className="h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl hover:bg-[#243040] flex items-center gap-2 transition-colors">
                        <Plus size={14} /> Add Level
                    </button>
                    <button onClick={save}
                        className={`h-10 px-5 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                        {saved ? <><CheckCircle2 size={14} /> Saved</> : "Save Scale"}
                    </button>
                </div>
            </div>

            {/* Visual bar */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">Bell Curve Distribution Preview</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${totalPct === 100 ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "bg-[#FFB800]/10 text-[#FFB800]"}`}>
                        Total: {totalPct}% {totalPct !== 100 ? "(should be 100%)" : "✓"}
                    </span>
                </div>
                <div className="h-10 flex rounded-xl overflow-hidden gap-0.5">
                    {scale.map(l => (
                        <div key={l.id} className="flex items-center justify-center text-[10px] font-bold transition-all"
                            style={{ width: l.percentage, background: l.color + "80", color: "#fff" }}>
                            {parseInt(l.percentage) >= 15 ? l.percentage : ""}
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 mt-3 flex-wrap">
                    {scale.map(l => (
                        <span key={l.id} className="flex items-center gap-1.5 text-[11px] text-[#8899AA]">
                            <span className="w-2.5 h-2.5 rounded" style={{ background: l.color }} />
                            {l.label} · {l.percentage}
                        </span>
                    ))}
                </div>
            </div>

            {/* Scale levels */}
            <div className="space-y-3">
                {scale.map((level, i) => (
                    <div key={level.id} className={`bg-[#0D1928] border rounded-2xl overflow-hidden transition-all ${editId === level.id ? "border-[#00E5A0]/40" : "border-[#1A2A3A]"}`}>
                        <div className="flex items-center gap-3 p-4">
                            <GripVertical size={16} className="text-[#445566] cursor-grab shrink-0" />
                            {/* Star display */}
                            <div className="flex gap-0.5 shrink-0">
                                {Array.from({ length: 5 }).map((_, si) => (
                                    <Star key={si} size={14} style={{ color: si < level.score ? level.color : "#1A2A3A", fill: si < level.score ? level.color : "#1A2A3A" }} />
                                ))}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm" style={{ color: level.color }}>{level.label}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded text-[#8899AA] bg-[#1A2A3A]">{level.score}.0</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0A1420] text-[#445566]">{level.percentage} of workforce</span>
                                </div>
                                <p className="text-[11px] text-[#8899AA] mt-0.5 truncate">{level.description}</p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <button onClick={() => setEditId(editId === level.id ? null : level.id)}
                                    className="p-1.5 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors">
                                    <Edit2 size={13} />
                                </button>
                                <button onClick={() => deleteLevel(level.id)}
                                    className="p-1.5 hover:bg-[#FF4444]/10 rounded-lg text-[#8899AA] hover:text-[#FF4444] transition-colors">
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        </div>

                        {/* Inline edit */}
                        {editId === level.id && (
                            <div className="px-4 pb-4 pt-1 border-t border-[#1A2A3A] bg-[#0A1420]">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <label className="block text-xs text-[#8899AA] mb-1">Label</label>
                                        <input value={level.label} onChange={e => updateLevel(level.id, "label", e.target.value)}
                                            className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#8899AA] mb-1">Score (1–5)</label>
                                        <input type="number" min={1} max={5} value={level.score}
                                            onChange={e => updateLevel(level.id, "score", +e.target.value)}
                                            className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#8899AA] mb-1">% Workforce</label>
                                        <input value={level.percentage} onChange={e => updateLevel(level.id, "percentage", e.target.value)}
                                            className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-[#8899AA] mb-1">Color</label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" value={level.color} onChange={e => updateLevel(level.id, "color", e.target.value)} className="h-9 w-12 rounded bg-transparent border-0 cursor-pointer" />
                                            <input value={level.color} onChange={e => updateLevel(level.id, "color", e.target.value)} className="flex-1 h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#8899AA] mb-1">Description</label>
                                        <input value={level.description} onChange={e => updateLevel(level.id, "description", e.target.value)}
                                            className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
