"use client";

import React, { useState } from "react";
import { Calendar, ChevronRight, Plus, Edit2, Trash2, CheckCircle2, Clock } from "lucide-react";

const PHASES = [
    { name: "Goal Setting", start: "01 Apr 2025", end: "15 Apr 2025", duration: 14 },
    { name: "Mid-Year Review", start: "01 Oct 2025", end: "15 Oct 2025", duration: 14 },
    { name: "Self Appraisal", start: "01 Jan 2026", end: "15 Jan 2026", duration: 14 },
    { name: "Manager Review", start: "16 Jan 2026", end: "31 Jan 2026", duration: 15 },
    { name: "Calibration", start: "01 Feb 2026", end: "10 Feb 2026", duration: 9 },
    { name: "Final Rating", start: "11 Feb 2026", end: "20 Feb 2026", duration: 9 },
];

export default function CycleSetup() {
    const [cycleName, setCycleName] = useState("FY 2025–26 Annual Appraisal");
    const [cycleType, setCycleType] = useState("annual");
    const [ratingScale, setRatingScale] = useState("5");
    const [wfWeightage, setWfWeightage] = useState(60);
    const [compWeightage, setCompWeightage] = useState(40);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    function handleSave() {
        setSaving(true);
        setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, 1500);
    }

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Performance Cycle Setup</h1>
                    <p className="text-sm text-[#8899AA]">Configure the appraisal cycle for your organization</p>
                </div>
                <button onClick={handleSave}
                    className={`h-10 px-5 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                    {saved ? <><CheckCircle2 size={15} /> Saved!</> : saving ? "Saving..." : "Save Cycle"}
                </button>
            </div>

            <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="font-semibold mb-4 text-sm text-[#8899AA] uppercase tracking-wider">Basic Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1.5">Cycle Name *</label>
                            <input value={cycleName} onChange={e => setCycleName(e.target.value)}
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0] transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1.5">Cycle Type</label>
                            <select value={cycleType} onChange={e => setCycleType(e.target.value)}
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                <option value="annual">Annual (Full Year)</option>
                                <option value="half-year">Half-Year (6 months)</option>
                                <option value="quarterly">Quarterly</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1.5">Rating Scale</label>
                            <select value={ratingScale} onChange={e => setRatingScale(e.target.value)}
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                <option value="5">1–5 Scale</option>
                                <option value="10">1–10 Scale</option>
                                <option value="4">1–4 Scale</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1.5">Review Type</label>
                            <select className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                <option>360° Review (Self + Manager + Peer)</option>
                                <option>180° Review (Self + Manager)</option>
                                <option>Manager-only</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Weightage */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="font-semibold mb-4 text-sm text-[#8899AA] uppercase tracking-wider">Rating Weightage</h2>
                    <div className="space-y-5">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm text-white">Work Performance / KRA</label>
                                <span className="text-sm font-bold text-[#00E5A0]">{wfWeightage}%</span>
                            </div>
                            <input type="range" min={20} max={80} step={5} value={wfWeightage}
                                onChange={e => { setWfWeightage(+e.target.value); setCompWeightage(100 - +e.target.value); }}
                                className="w-full accent-[#00E5A0]" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm text-white">Behavioural Competencies</label>
                                <span className="text-sm font-bold text-[#0066FF]">{compWeightage}%</span>
                            </div>
                            <input type="range" min={20} max={80} step={5} value={compWeightage}
                                onChange={e => { setCompWeightage(+e.target.value); setWfWeightage(100 - +e.target.value); }}
                                className="w-full accent-[#0066FF]" />
                        </div>
                        {/* Stacked bar */}
                        <div className="h-3 rounded-full overflow-hidden flex">
                            <div className="bg-[#00E5A0] transition-all" style={{ width: `${wfWeightage}%` }} />
                            <div className="bg-[#0066FF] transition-all" style={{ width: `${compWeightage}%` }} />
                        </div>
                    </div>
                </div>

                {/* Phase Timeline */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-sm text-[#8899AA] uppercase tracking-wider">Phase Timeline</h2>
                        <button className="flex items-center gap-1 text-xs text-[#00E5A0] hover:underline"><Plus size={12} /> Add Phase</button>
                    </div>
                    <div className="space-y-3">
                        {PHASES.map((ph, i) => (
                            <div key={ph.name} className="flex items-center gap-4 p-3 bg-[#0A1420] rounded-xl">
                                <div className="w-7 h-7 rounded-full bg-[#0066FF]/15 text-[#0066FF] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">{ph.name}</p>
                                    <p className="text-[11px] text-[#8899AA]">{ph.start} → {ph.end} · {ph.duration} days</p>
                                </div>
                                <div className="flex items-center gap-1 text-[#445566]">
                                    <button className="p-1 hover:text-white transition-colors hover:bg-[#1A2A3A] rounded"><Edit2 size={13} /></button>
                                    <button className="p-1 hover:text-[#FF4444] transition-colors hover:bg-[#FF4444]/10 rounded"><Trash2 size={13} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Toggle options */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="font-semibold mb-4 text-sm text-[#8899AA] uppercase tracking-wider">Options</h2>
                    <div className="space-y-4">
                        {[
                            { label: "Enable Mid-Year Review", defaultOn: true },
                            { label: "Allow Peer Feedback", defaultOn: true },
                            { label: "Enable Skip-level Review", defaultOn: false },
                            { label: "Require Goal Pre-approval", defaultOn: true },
                            { label: "Enable Bell Curve Forcing", defaultOn: false },
                        ].map(opt => (
                            <ToggleOption key={opt.label} label={opt.label} defaultOn={opt.defaultOn} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToggleOption({ label, defaultOn }: { label: string, defaultOn: boolean }) {
    const [on, setOn] = useState(defaultOn);
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-white">{label}</span>
            <button onClick={() => setOn(v => !v)}
                className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
        </div>
    );
}
