"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
    );
}

export default function AttendancePolicy() {
    const [saved, setSaved] = useState(false);
    const [policy, setPolicy] = useState({
        gracePeriod: "15",
        halfDayThreshold: "4",
        minHours: "8",
        lateAfter: "09:15",
        lotesHalfDay: "4",
        latesPerHalfDay: "3",
        notifyLates: "3",
        lopEnabled: true,
        lopDays: "2",
        lopAutoApply: "3",
        notifyAbsences: "3",
        otAfter: "9",
        otRate: "1.5",
        maxOTDay: "4",
        maxOTMonth: "40",
        otToCompOff: true,
        maxWFH: "2",
        wfhApproval: true,
        wfhLocationCheck: true,
        maxRegPerMonth: "3",
        regWindow: "7",
        autoApproveReg: false,
    });

    type PolicyKey = keyof typeof policy;

    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    const Row = ({ label, field, type = "text" }: { label: string; field: PolicyKey; type?: string }) => (
        <div className="flex justify-between items-center py-3 border-b border-[#1A2A3A] last:border-0">
            <label className="text-sm">{label}</label>
            {type === "toggle"
                ? <Toggle on={!!policy[field]} onChange={() => setPolicy(p => ({ ...p, [field]: !p[field] }))} />
                : <input value={String(policy[field])} onChange={e => setPolicy(p => ({ ...p, [field]: e.target.value }))} type={type}
                    className="w-28 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 py-1.5 text-sm text-white text-right focus:outline-none focus:border-[#00E5A0]" />}
        </div>
    );

    const sections = [
        {
            title: "General Attendance", rows: [
                { label: "Grace period for late (minutes)", field: "gracePeriod" as PolicyKey },
                { label: "Half-day threshold (hours)", field: "halfDayThreshold" as PolicyKey },
                { label: "Minimum hours for full day", field: "minHours" as PolicyKey },
            ]
        },
        {
            title: "Late Arrival Rules", rows: [
                { label: "Late after (time)", field: "lateAfter" as PolicyKey, type: "time" },
                { label: "Half-day if late by (hours)", field: "lotesHalfDay" as PolicyKey },
                { label: "Lates to count as 1 half-day", field: "latesPerHalfDay" as PolicyKey },
                { label: "Notify manager after X lates", field: "notifyLates" as PolicyKey },
            ]
        },
        {
            title: "Absence Rules", rows: [
                { label: "Consecutive absent = LOP enabled", field: "lopEnabled" as PolicyKey, type: "toggle" },
                { label: "LOP after N absent days", field: "lopDays" as PolicyKey },
                { label: "Auto-apply LOP after X days", field: "lopAutoApply" as PolicyKey },
                { label: "Notify HR on X consecutive absences", field: "notifyAbsences" as PolicyKey },
            ]
        },
        {
            title: "Overtime Policy", rows: [
                { label: "OT calculation starts after (hrs)", field: "otAfter" as PolicyKey },
                { label: "Max OT per day (hrs)", field: "maxOTDay" as PolicyKey },
                { label: "Max OT per month (hrs)", field: "maxOTMonth" as PolicyKey },
                { label: "OT to comp-off conversion", field: "otToCompOff" as PolicyKey, type: "toggle" },
            ]
        },
        {
            title: "WFH Policy", rows: [
                { label: "Max WFH days per week", field: "maxWFH" as PolicyKey },
                { label: "WFH requires approval", field: "wfhApproval" as PolicyKey, type: "toggle" },
                { label: "Location check on WFH", field: "wfhLocationCheck" as PolicyKey, type: "toggle" },
            ]
        },
        {
            title: "Regularization Rules", rows: [
                { label: "Max requests per month", field: "maxRegPerMonth" as PolicyKey },
                { label: "Window to submit (days)", field: "regWindow" as PolicyKey },
                { label: "Auto-approve prior approved", field: "autoApproveReg" as PolicyKey, type: "toggle" },
            ]
        },
    ];

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Attendance Policy</h2>
                    <p className="text-sm text-[#8899AA]">Configure rules that drive all attendance calculations</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Reset to Default</button>
                    <button onClick={save}
                        className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 transition-colors ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                        <Save className="w-4 h-4" />{saved ? "Saved ✅" : "Save Policy"}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {sections.map(sec => (
                    <div key={sec.title} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-2">{sec.title}</h3>
                        <div>
                            {sec.rows.map(r => <Row key={r.field} label={r.label} field={r.field} type={r.type} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
