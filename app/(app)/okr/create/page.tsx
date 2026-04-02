"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Target, Plus, ChevronRight, Trash2, ChevronDown, Save } from "lucide-react";

const TYPES = ["Objective", "Key Result"];
const QUARTERS = ["Q1 2025 (Jan–Mar)", "Q2 2025 (Apr–Jun)", "Q3 2025 (Jul–Sep)", "Q4 2025 (Oct–Dec)"];
const ALIGN_OPTIONS = ["Company: Achieve ₹100 Cr ARR", "Company: 95% Retention", "Dept: Engineering Velocity", "Dept: Sales Growth", "None (Independent)"];
const OWNERS = ["Myself", "Priya Mehta", "Ravi Kumar", "Arjun Singh", "Sneha Rao"];

interface KeyResult {
    id: number;
    title: string;
    metric: string;
    target: string;
    unit: string;
}

export default function CreateOKRScreen() {
    const [objective, setObjective] = useState("");
    const [quarter, setQuarter] = useState(QUARTERS[0]);
    const [align, setAlign] = useState(ALIGN_OPTIONS[0]);
    const [owner, setOwner] = useState(OWNERS[0]);
    const [krs, setKrs] = useState<KeyResult[]>([
        { id: 1, title: "", metric: "Numeric", target: "", unit: "" },
    ]);

    const addKR = () => setKrs(prev => [...prev, { id: Date.now(), title: "", metric: "Numeric", target: "", unit: "" }]);
    const removeKR = (id: number) => setKrs(prev => prev.filter(k => k.id !== id));
    const updateKR = (id: number, field: keyof KeyResult, value: string) =>
        setKrs(prev => prev.map(k => k.id === id ? { ...k, [field]: value } : k));

    return (
        <main className="min-h-screen bg-[#060B14] text-white pb-16 font-sans">
            {/* Top bar */}
            <div className="sticky top-0 z-30 bg-[#060B14]/90 backdrop-blur border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/okr/my-okrs" className="text-[#8899AA] hover:text-white transition-colors" aria-label="Back to My OKRs">
                        <ChevronRight size={18} className="rotate-180" aria-hidden="true" />
                    </Link>
                    <span className="text-base font-semibold text-white">Create OKR</span>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/okr/my-okrs" className="px-4 py-2 text-sm text-[#8899AA] border border-[#1A2A3A] rounded-lg hover:bg-[#1A2A3A] transition-colors">Cancel</Link>
                    <button type="submit" form="create-okr-form" className="flex items-center gap-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#00c98d] transition-colors">
                        <Save size={14} aria-hidden="true" /> Save OKR
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

                <form id="create-okr-form" onSubmit={e => e.preventDefault()} noValidate>

                    {/* Objective Details */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-5" aria-labelledby="objective-heading">
                        <h2 id="objective-heading" className="text-base font-semibold text-white flex items-center gap-2">
                            <Target size={16} className="text-[#00E5A0]" aria-hidden="true" /> Objective Details
                        </h2>

                        <div>
                            <label htmlFor="obj-title" className="block text-xs font-semibold text-[#8899AA] mb-1.5">
                                Objective Title <span className="text-[#FF4444]" aria-label="required">*</span>
                            </label>
                            <textarea
                                id="obj-title"
                                value={objective}
                                onChange={e => setObjective(e.target.value)}
                                placeholder="e.g. Drive 40% growth in cloud business…"
                                rows={2}
                                required
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                            />
                            <p className="text-[11px] text-[#445566] mt-1">Write a clear, aspirational outcome (not a task).</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { id: "quarter-select", label: "Quarter", value: quarter, setter: setQuarter, options: QUARTERS },
                                { id: "align-select", label: "Align To", value: align, setter: setAlign, options: ALIGN_OPTIONS },
                                { id: "owner-select", label: "Owner", value: owner, setter: setOwner, options: OWNERS },
                            ].map(f => (
                                <div key={f.id}>
                                    <label htmlFor={f.id} className="block text-xs font-semibold text-[#8899AA] mb-1.5">{f.label}</label>
                                    <div className="relative">
                                        <select
                                            id={f.id}
                                            value={f.value}
                                            onChange={e => f.setter(e.target.value)}
                                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0] appearance-none cursor-pointer"
                                        >
                                            {f.options.map(o => <option key={o}>{o}</option>)}
                                        </select>
                                        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#445566] pointer-events-none" aria-hidden="true" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Key Results */}
                    <section className="space-y-4" aria-labelledby="kr-heading">
                        <div className="flex items-center justify-between">
                            <h2 id="kr-heading" className="text-base font-semibold text-white">Key Results</h2>
                            <button
                                type="button"
                                onClick={addKR}
                                className="flex items-center gap-1.5 text-xs text-[#00E5A0] border border-[#00E5A0]/30 bg-[#00E5A0]/10 px-3 py-1.5 rounded-lg hover:bg-[#00E5A0]/20 transition-colors font-medium"
                            >
                                <Plus size={12} aria-hidden="true" /> Add Key Result
                            </button>
                        </div>

                        <ol role="list" className="space-y-4">
                            {krs.map((kr, i) => (
                                <li key={kr.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-[#445566] uppercase tracking-wider">Key Result {i + 1}</span>
                                        {krs.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeKR(kr.id)}
                                                aria-label={`Remove key result ${i + 1}`}
                                                className="p-1 text-[#445566] hover:text-[#FF4444] transition-colors"
                                            >
                                                <Trash2 size={14} aria-hidden="true" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor={`kr-title-${kr.id}`} className="block text-xs font-semibold text-[#8899AA] mb-1.5">Key Result Title</label>
                                            <input
                                                id={`kr-title-${kr.id}`}
                                                type="text"
                                                value={kr.title}
                                                onChange={e => updateKR(kr.id, "title", e.target.value)}
                                                placeholder="e.g. Increase MRR to ₹30 Lakhs…"
                                                className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { id: `metric-${kr.id}`, label: "Metric Type", field: "metric" as keyof KeyResult, options: ["Numeric", "Percentage", "Boolean", "Currency"] },
                                            ].map(f => (
                                                <div key={f.id}>
                                                    <label htmlFor={f.id} className="block text-xs font-semibold text-[#8899AA] mb-1.5">{f.label}</label>
                                                    <select
                                                        id={f.id}
                                                        value={kr[f.field] as string}
                                                        onChange={e => updateKR(kr.id, f.field, e.target.value)}
                                                        className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0] appearance-none"
                                                    >
                                                        {f.options.map(o => <option key={o}>{o}</option>)}
                                                    </select>
                                                </div>
                                            ))}
                                            <div>
                                                <label htmlFor={`target-${kr.id}`} className="block text-xs font-semibold text-[#8899AA] mb-1.5">Target Value</label>
                                                <input
                                                    id={`target-${kr.id}`}
                                                    type="number"
                                                    value={kr.target}
                                                    onChange={e => updateKR(kr.id, "target", e.target.value)}
                                                    placeholder="100"
                                                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`unit-${kr.id}`} className="block text-xs font-semibold text-[#8899AA] mb-1.5">Unit</label>
                                                <input
                                                    id={`unit-${kr.id}`}
                                                    type="text"
                                                    value={kr.unit}
                                                    onChange={e => updateKR(kr.id, "unit", e.target.value)}
                                                    placeholder="%, ₹, deals…"
                                                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                </form>
            </div>
        </main>
    );
}
