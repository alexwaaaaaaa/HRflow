"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Save, Zap, Bell, Clock, CheckCircle2 } from "lucide-react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
    );
}

const RULES = [
    { id: 1, title: "Auto-apply LOP after 2 consecutive absences", trigger: "2+ absent days", action: "Mark LOP + notify HR", active: true },
    { id: 2, title: "Send late warning after 3 late arrivals in a month", trigger: "3 late arrivals", action: "Email to employee + manager", active: true },
    { id: 3, title: "Auto-regularize approved WFH days", trigger: "WFH approved", action: "Mark as Present (WFH)", active: true },
    { id: 4, title: "Escalate if absent 3+ days without leave", trigger: "3+ absent, no leave", action: "Email HR + Dept Head", active: false },
    { id: 5, title: "Auto-approve regularization for shift employees", trigger: "Biometric mismatch < 10 min", action: "Auto-approve", active: false },
];

export default function AttendanceAutomation() {
    const [rules, setRules] = useState(RULES);
    const [saved, setSaved] = useState(false);
    const [cfg, setCfg] = useState({
        lopAfterDays: "2",
        lateWarningCount: "3",
        autoRegWindow: "7",
        escalationDays: "3",
        notifyOnCheckIn: true,
        notifyOnMissedPunch: true,
        dailySummaryEmail: true,
        weeklyReport: false,
    });

    const toggleRule = (id: number) => setRules(r => r.map(x => x.id === id ? { ...x, active: !x.active } : x));
    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
    type CfgKey = keyof typeof cfg;
    const set = (k: CfgKey) => (v: string | boolean) => setCfg(p => ({ ...p, [k]: v }));

    return (
        <Page
            title="Automation"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Settings", href: "/attendance/settings" }, { label: "Automation" }]}
            maxWidth="900px"
        >

        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Zap className="w-6 h-6 text-[#FFB800]" /> Automation Rules</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Configure automated actions triggered by attendance events</p>
                </div>
                <button onClick={save}
                    className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                    <Save className="w-4 h-4" /> {saved ? "Saved ✅" : "Save Changes"}
                </button>
            </div>

            {/* Rules list */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-[#1A2A3A] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#FFB800]" />
                    <h3 className="font-semibold">Active Automation Rules</h3>
                    <span className="ml-auto text-xs text-[#8899AA]">{rules.filter(r => r.active).length}/{rules.length} enabled</span>
                </div>
                <div className="divide-y divide-[#1A2A3A]">
                    {rules.map(rule => (
                        <div key={rule.id} className={`px-6 py-4 flex items-center gap-4 ${rule.active ? "" : "opacity-50"}`}>
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${rule.active ? "bg-[#00E5A0]/10" : "bg-[#1A2A3A]"}`}>
                                <CheckCircle2 className={`w-4 h-4 ${rule.active ? "text-[#00E5A0]" : "text-[#445566]"}`} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{rule.title}</p>
                                <div className="flex gap-4 mt-1">
                                    <span className="text-xs text-[#0066FF]">Trigger: {rule.trigger}</span>
                                    <span className="text-xs text-[#445566]">→ {rule.action}</span>
                                </div>
                            </div>
                            <Toggle on={rule.active} onChange={() => toggleRule(rule.id)} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Thresholds */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-5">
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-[#0066FF]" />
                    <h3 className="font-semibold">Thresholds</h3>
                </div>
                {[
                    { label: "LOP trigger after N absent days", field: "lopAfterDays" as CfgKey },
                    { label: "Late warning after N late arrivals", field: "lateWarningCount" as CfgKey },
                    { label: "Regularization window (days)", field: "autoRegWindow" as CfgKey },
                    { label: "Escalation after N absent days no leave", field: "escalationDays" as CfgKey },
                ].map(row => (
                    <div key={row.field} className="flex justify-between items-center py-3 border-b border-[#1A2A3A] last:border-0">
                        <label className="text-sm">{row.label}</label>
                        <input value={String(cfg[row.field])} onChange={e => set(row.field)(e.target.value)} type="number"
                            className="w-20 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 py-1.5 text-sm text-white text-right focus:outline-none focus:border-[#00E5A0]" />
                    </div>
                ))}
            </div>

            {/* Notifications */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-4 h-4 text-[#8B5CF6]" />
                    <h3 className="font-semibold">Automated Notifications</h3>
                </div>
                {[
                    { label: "Notify employee on check-in confirmation", field: "notifyOnCheckIn" as CfgKey },
                    { label: "Alert HR on missed punch-out", field: "notifyOnMissedPunch" as CfgKey },
                    { label: "Send daily summary to HR", field: "dailySummaryEmail" as CfgKey },
                    { label: "Weekly attendance report email", field: "weeklyReport" as CfgKey },
                ].map(row => (
                    <div key={row.field} className="flex justify-between items-center py-3 border-b border-[#1A2A3A] last:border-0">
                        <label className="text-sm">{row.label}</label>
                        <Toggle on={!!cfg[row.field]} onChange={() => set(row.field)(!cfg[row.field])} />
                    </div>
                ))}
            </div>
        </div>
    
        </Page>
        );
}
