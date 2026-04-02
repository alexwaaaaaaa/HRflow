"use client";
import React, { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";

const OUTCOMES = [
    { id: "pip-closed-success", label: "PIP Closed — Improved", desc: "Employee has met all PIP criteria. Plan closed successfully.", color: "#00E5A0", icon: CheckCircle2 },
    { id: "pip-extended", label: "PIP Extended", desc: "Partial improvement. Extend PIP by 30 days.", color: "#FFB800", icon: AlertTriangle },
    { id: "termination", label: "PIP Failed — Termination", desc: "Employee failed to meet objectives. Initiate exit process.", color: "#FF4444", icon: XCircle },
];

export default function PIPOutcome() {
    const [selected, setSelected] = useState("");
    const [hrComment, setHrComment] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    function submit() {
        setSubmitting(true);
        setTimeout(() => { setSubmitting(false); setDone(true); }, 2000);
    }

    if (done) {
        const outcome = OUTCOMES.find(o => o.id === selected)!;
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: outcome.color + "15", border: `1px solid ${outcome.color}40` }}>
                        <outcome.icon size={36} style={{ color: outcome.color }} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">PIP Outcome Recorded</h2>
                    <p className="text-[#8899AA] text-sm">{outcome.label} — Vikas Sharma · {new Date().toLocaleDateString("en-IN")}</p>
                    {selected === "termination" && (
                        <div className="mt-4 p-3 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl text-xs text-[#FF4444]">
                            ⚠ Legal team and Finance notified. Exit checklist initiated.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-[700px] mx-auto text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-1">PIP Outcome</h1>
                <p className="text-sm text-[#8899AA]">Vikas Sharma · Sales · 90-day PIP ending 06 Apr 2025</p>
            </div>

            {/* PIP Summary */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 mb-6">
                <h3 className="font-semibold mb-3 text-sm">PIP Summary</h3>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: "Duration", value: "90 days" },
                        { label: "Check-ins", value: "12/12" },
                        { label: "Avg Weekly Rtg", value: "3.2/5" },
                    ].map(s => (
                        <div key={s.label} className="bg-[#0A1420] rounded-xl p-3 text-center">
                            <p className="text-base font-bold text-white">{s.value}</p>
                            <p className="text-[10px] text-[#8899AA]">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Outcome selection */}
            <div className="space-y-3 mb-6">
                {OUTCOMES.map(o => (
                    <button key={o.id} onClick={() => setSelected(o.id)}
                        className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${selected === o.id ? `border-[${o.color}/50]` : "border-[#1A2A3A]"}`}
                        style={{ borderColor: selected === o.id ? o.color + "50" : "", background: selected === o.id ? o.color + "08" : "" }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: o.color + "15" }}>
                            <o.icon size={18} style={{ color: o.color }} />
                        </div>
                        <div>
                            <p className="font-semibold text-white text-sm">{o.label}</p>
                            <p className="text-[11px] text-[#8899AA] mt-0.5">{o.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border ml-auto shrink-0 mt-0.5 flex items-center justify-center ${selected === o.id ? "border-0" : "border-[#445566]"}`} style={{ background: selected === o.id ? o.color : "" }}>
                            {selected === o.id && <CheckCircle2 size={12} className="text-[#060B14]" />}
                        </div>
                    </button>
                ))}
            </div>

            {selected && (
                <>
                    <div className="mb-4">
                        <label className="block text-xs text-[#8899AA] mb-1.5">HR Comments</label>
                        <textarea rows={3} value={hrComment} onChange={e => setHrComment(e.target.value)} placeholder="Final HR determination and notes..."
                            className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none" />
                    </div>
                    {selected === "termination" && (
                        <div className="flex items-center gap-3 mb-4 p-3 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl">
                            <input type="checkbox" id="confirm" checked={confirm} onChange={e => setConfirm(e.target.checked)} className="accent-[#FF4444] w-4 h-4" />
                            <label htmlFor="confirm" className="text-xs text-[#FF4444]">I confirm this decision has been reviewed by legal counsel and senior HR leadership</label>
                        </div>
                    )}
                    <button onClick={submit} disabled={submitting || (selected === "termination" && !confirm)}
                        className="w-full h-11 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        style={{ background: OUTCOMES.find(o => o.id === selected)?.color, color: selected === "termination" ? "#fff" : "#060B14" }}>
                        {submitting ? <><Loader2 size={15} className="animate-spin" /> Processing...</> : <><ArrowRight size={15} /> Record PIP Outcome</>}
                    </button>
                </>
            )}
        </div>
    );
}
