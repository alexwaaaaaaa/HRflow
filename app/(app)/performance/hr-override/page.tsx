"use client";
import React, { useState } from "react";
import { Shield, AlertTriangle, CheckCircle2, Loader2, Edit2 } from "lucide-react";

const EMPLOYEES = [
    { id: 1, name: "Rahul Sharma", dept: "Eng", managerRating: 3.8, finalRating: 3.8, overrideReason: "" },
    { id: 2, name: "Vikas Sharma", dept: "Sales", managerRating: 2.5, finalRating: 2.5, overrideReason: "" },
    { id: 3, name: "Anjali Singh", dept: "Sales", managerRating: 4.8, finalRating: 4.8, overrideReason: "" },
];

export default function HROverride() {
    const [emps, setEmps] = useState(EMPLOYEES.map(e => ({ ...e, overrideRating: e.finalRating, dirty: false })));
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    function updateOverride(id: number, val: number) {
        setEmps(prev => prev.map(e => e.id === id ? { ...e, overrideRating: val, dirty: val !== e.managerRating } : e));
        setSaved(false);
    }
    function updateReason(id: number, reason: string) {
        setEmps(prev => prev.map(e => e.id === id ? { ...e, overrideReason: reason } : e));
    }

    const overrides = emps.filter(e => e.dirty);

    function handleSave() {
        setSaving(true);
        setTimeout(() => { setSaving(false); setSaved(true); }, 1600);
    }

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#9B59B6]/10 border border-[#9B59B6]/30 flex items-center justify-center shrink-0">
                    <Shield size={22} className="text-[#9B59B6]" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">HR Override</h1>
                    <p className="text-sm text-[#8899AA]">HR can override manager ratings post-calibration with documented reason</p>
                </div>
            </div>

            <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl">
                <AlertTriangle size={15} className="text-[#FFB800] shrink-0" />
                <p className="text-sm text-[#FFB800]">Overrides are logged in the audit trail with timestamp and HR ID. All changes require a documented justification.</p>
            </div>

            <div className="space-y-4">
                {emps.map(emp => (
                    <div key={emp.id} className={`bg-[#0D1928] border rounded-2xl p-5 transition-all ${emp.dirty ? "border-[#9B59B6]/40" : "border-[#1A2A3A]"}`}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="font-semibold text-white">{emp.name}</p>
                                <p className="text-xs text-[#445566]">{emp.dept}</p>
                            </div>
                            {emp.dirty && <span className="text-[10px] px-2 py-1 rounded-full bg-[#9B59B6]/10 text-[#9B59B6] border border-[#9B59B6]/30 font-medium flex items-center gap-1"><Edit2 size={10} /> Overridden</span>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1">Manager Rating (Final)</p>
                                <div className="h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-3 flex items-center text-sm text-white">{emp.managerRating.toFixed(1)}</div>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1">HR Override Rating</p>
                                <input type="number" min={1} max={5} step={0.1} value={emp.overrideRating}
                                    onChange={e => updateOverride(emp.id, +e.target.value)}
                                    className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#9B59B6] transition-colors" />
                            </div>
                        </div>
                        {emp.dirty && (
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1.5">Override Justification (required) *</p>
                                <textarea rows={2} value={emp.overrideReason} onChange={e => updateReason(emp.id, e.target.value)}
                                    placeholder="Document the business reason for this override..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#9B59B6] resize-none" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {overrides.length > 0 && (
                <button onClick={handleSave} disabled={saving || (overrides.some(e => !e.overrideReason))}
                    className={`mt-6 w-full h-12 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${saved ? "bg-[#00E5A0]/15 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#9B59B6] text-white hover:bg-[#8e4da4] disabled:opacity-50"}`}>
                    {saving ? <><Loader2 size={16} className="animate-spin" /> Saving Overrides...</> : saved ? <><CheckCircle2 size={16} /> Overrides Saved</> : `Save ${overrides.length} Override${overrides.length > 1 ? "s" : ""}`}
                </button>
            )}
        </div>
    );
}
