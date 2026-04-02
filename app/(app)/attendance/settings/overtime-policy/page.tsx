"use client";

import React, { useState } from "react";
import { Save, BarChart3 } from "lucide-react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
    );
}

export default function OvertimePolicy() {
    const [saved, setSaved] = useState(false);
    const [cfg, setCfg] = useState({
        otStartsAfterHrs: "9",
        otRateMultiplier: "1.5",
        weekendOtRate: "2.0",
        holidayOtRate: "2.5",
        maxOtPerDay: "4",
        maxOtPerMonth: "40",
        otToCompOff: true,
        compOffExpiry: "90",
        otPayoutEnabled: true,
        managerApprovalRequired: true,
        preApprovalRequired: false,
        roundOtToNearest: "30",
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
                : <input value={String(cfg[field])} onChange={e => set(field)(e.target.value)} type="text"
                    className="w-28 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 py-1.5 text-sm text-white text-right focus:outline-none focus:border-[#00E5A0]" />}
        </div>
    );

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="w-6 h-6 text-[#00E5A0]" /> Overtime Policy</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Configure OT calculation, rates, caps, and comp-off rules</p>
                </div>
                <button onClick={save}
                    className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                    <Save className="w-4 h-4" /> {saved ? "Saved ✅" : "Save Policy"}
                </button>
            </div>

            {/* OT Rate Preview */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Weekday OT Rate", val: `${cfg.otRateMultiplier}×`, color: "#00E5A0" },
                    { label: "Weekend OT Rate", val: `${cfg.weekendOtRate}×`, color: "#FFB800" },
                    { label: "Holiday OT Rate", val: `${cfg.holidayOtRate}×`, color: "#FF4444" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 text-center">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-3xl font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-2">OT Calculation</h3>
                    <Row label="OT starts after (hours worked)" desc="Hours of regular work before OT kicks in" field="otStartsAfterHrs" />
                    <Row label="Weekday OT multiplier" desc="e.g. 1.5 means 1.5× basic per OT hour" field="otRateMultiplier" />
                    <Row label="Weekend OT multiplier" field="weekendOtRate" />
                    <Row label="Holiday OT multiplier" field="holidayOtRate" />
                    <Row label="Round OT to nearest (minutes)" desc="e.g. 30 = round to nearest 30 min" field="roundOtToNearest" />
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-2">Caps & Limits</h3>
                    <Row label="Max OT per day (hours)" field="maxOtPerDay" />
                    <Row label="Max OT per month (hours)" field="maxOtPerMonth" />
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-2">Comp-off & Payout</h3>
                    <Row label="Allow OT → Comp-off conversion" field="otToCompOff" type="toggle" />
                    <Row label="Comp-off validity (days)" desc="Comp-off expires after this many days" field="compOffExpiry" />
                    <Row label="OT payout enabled" desc="Pay out unclaimed OT in payroll" field="otPayoutEnabled" type="toggle" />
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-2">Approval</h3>
                    <Row label="Manager approval required for OT" field="managerApprovalRequired" type="toggle" />
                    <Row label="Pre-approval required before OT" desc="Employee must request OT before working it" field="preApprovalRequired" type="toggle" />
                </div>
            </div>
        </div>
    );
}
