"use client";

import React, { useState } from "react";
import { Save, Clock, AlertTriangle } from "lucide-react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
    );
}

export default function LatePolicy() {
    const [saved, setSaved] = useState(false);
    const [cfg, setCfg] = useState({
        lateGraceMins: "15",
        lateAfterTime: "09:15",
        halfDayIfLateByHrs: "4",
        latesForHalfDay: "3",
        latesForFullDay: "6",
        notifyManagerAfter: "3",
        warningEmailEnabled: true,
        deductHalfDay: true,
        allowSelfCorrect: true,
        selfCorrectWindow: "7",
        habitualThreshold: "5",
        escalateToHR: true,
    });

    type K = keyof typeof cfg;
    const set = (k: K) => (v: string | boolean) => setCfg(p => ({ ...p, [k]: v }));
    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    const Row = ({ label, desc, field, type = "text" }: { label: string; desc?: string; field: K; type?: string }) => (
        <div className="flex justify-between items-center py-4 border-b border-[#1A2A3A] last:border-0">
            <div>
                <p className="text-sm font-medium">{label}</p>
                {desc && <p className="text-xs text-[#445566] mt-0.5">{desc}</p>}
            </div>
            {type === "toggle"
                ? <Toggle on={!!cfg[field]} onChange={() => set(field)(!cfg[field])} />
                : <input value={String(cfg[field])} onChange={e => set(field)(e.target.value)} type={type === "time" ? "time" : "text"}
                    className="w-28 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 py-1.5 text-sm text-white text-right focus:outline-none focus:border-[#00E5A0]" />
            }
        </div>
    );

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Clock className="w-6 h-6 text-[#FFB800]" /> Late Coming Policy</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Rules governing what counts as late, deductions, and warnings</p>
                </div>
                <button onClick={save}
                    className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                    <Save className="w-4 h-4" /> {saved ? "Saved ✅" : "Save Policy"}
                </button>
            </div>

            {/* Preview */}
            <div className="bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-[#FFB800] shrink-0" />
                <p className="text-xs text-[#8899AA]">Current: Grace period is <span className="text-white font-medium">{cfg.lateGraceMins} min</span>. Employees arriving after <span className="text-white font-medium">{cfg.lateAfterTime}</span> are considered late. After <span className="text-white font-medium">{cfg.latesForHalfDay} lates</span> → half day deducted.</p>
            </div>

            <div className="space-y-4">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-2">Late Definition</h3>
                    <Row label="Grace period (minutes)" desc="Allowed buffer after shift start before marking late" field="lateGraceMins" />
                    <Row label="Late after (time)" desc="Fixed time threshold for late detection" field="lateAfterTime" type="time" />
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-2">Deduction Rules</h3>
                    <Row label="Half-day if late by (hours)" desc="Late by this many hours = half-day deduction" field="halfDayIfLateByHrs" />
                    <Row label="N lates = 1 half-day deduction" desc="Accumulated lates that count as a half-day" field="latesForHalfDay" />
                    <Row label="N lates = 1 full-day deduction" desc="Accumulated lates that count as a full-day LOP" field="latesForFullDay" />
                    <Row label="Enable half-day deduction rule" field="deductHalfDay" type="toggle" />
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-2">Warnings & Escalation</h3>
                    <Row label="Notify manager after N lates" field="notifyManagerAfter" />
                    <Row label="Habitual threshold (lates/month)" desc="Flagged as habitual late comer" field="habitualThreshold" />
                    <Row label="Send warning email to employee" field="warningEmailEnabled" type="toggle" />
                    <Row label="Escalate habitual cases to HR" field="escalateToHR" type="toggle" />
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-2">Self-Correction</h3>
                    <Row label="Allow employee to regularize late" field="allowSelfCorrect" type="toggle" />
                    <Row label="Regularization window (days)" desc="Number of days employee can submit a regularization" field="selfCorrectWindow" />
                </div>
            </div>
        </div>
    );
}
