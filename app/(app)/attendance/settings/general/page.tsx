"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Save, Globe, Clock, Users, Monitor } from "lucide-react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
    );
}

function Row({ label, desc, type = "text", value, onChange }: { label: string; desc?: string; type?: string; value: string | boolean; onChange: (v: string | boolean) => void }) {
    return (
        <div className="flex justify-between items-center py-4 border-b border-[#1A2A3A] last:border-0">
            <div>
                <p className="text-sm font-medium">{label}</p>
                {desc && <p className="text-xs text-[#445566] mt-0.5">{desc}</p>}
            </div>
            {type === "toggle"
                ? <Toggle on={!!value} onChange={() => onChange(!value)} />
                : type === "select"
                    ? <select value={String(value)} onChange={e => onChange(e.target.value)}
                        className="bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                        {type === "select" && ["All", "Manager Only", "HR Only", "Admin Only"].map(o => <option key={o}>{o}</option>)}
                    </select>
                    : <input value={String(value)} onChange={e => onChange(e.target.value)} type={type}
                        className="w-32 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 py-1.5 text-sm text-white text-right focus:outline-none focus:border-[#00E5A0]" />
            }
        </div>
    );
}

export default function AttendanceSettingsGeneral() {
    const [saved, setSaved] = useState(false);
    const [cfg, setCfg] = useState({
        companyTimezone: "Asia/Kolkata (IST)",
        workingDays: "26",
        attendanceSource: "Biometric + Mobile",
        selfieVerification: true,
        syncInterval: "5",
        roundToNearest: "15",
        allowManualEntry: false,
        manualEntryApproval: true,
        dataRetentionDays: "365",
        exportFormat: "Excel",
        realTimeSync: true,
        emailReports: true,
    });

    type CfgKey = keyof typeof cfg;
    const set = (k: CfgKey) => (v: string | boolean) => setCfg(p => ({ ...p, [k]: v }));
    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <Page
            title="General Settings"
            subtitle="Core attendance configuration for your organisation"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Settings", href: "/attendance/settings" }, { label: "General" }]}
            maxWidth="900px"
        >

        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">General Settings</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Core attendance configuration for your organisation</p>
                </div>
                <button onClick={save}
                    className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 transition-colors ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                    <Save className="w-4 h-4" /> {saved ? "Saved ✅" : "Save Changes"}
                </button>
            </div>

            <div className="space-y-4">
                {/* Timezone & Calendar */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Globe className="w-4 h-4 text-[#00E5A0]" />
                        <h3 className="font-semibold">Timezone & Calendar</h3>
                    </div>
                    <Row label="Company Timezone" desc="All attendance times will be recorded in this timezone" type="text" value={cfg.companyTimezone} onChange={set("companyTimezone")} />
                    <Row label="Working Days per Month" desc="Used for LOP and payroll calculation" type="number" value={cfg.workingDays} onChange={set("workingDays")} />
                </div>

                {/* Attendance Source */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Monitor className="w-4 h-4 text-[#0066FF]" />
                        <h3 className="font-semibold">Capture Settings</h3>
                    </div>
                    <Row label="Selfie Verification" desc="Require live selfie during mobile check-in" type="toggle" value={cfg.selfieVerification} onChange={set("selfieVerification")} />
                    <Row label="Biometric Sync Interval (min)" desc="How often biometric data syncs to server" type="number" value={cfg.syncInterval} onChange={set("syncInterval")} />
                    <Row label="Round Time To Nearest (min)" desc="Round check-in/out times for reporting" type="number" value={cfg.roundToNearest} onChange={set("roundToNearest")} />
                </div>

                {/* Manual Entry */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-[#FFB800]" />
                        <h3 className="font-semibold">Manual Entry</h3>
                    </div>
                    <Row label="Allow Manual Attendance Entry" desc="HR can manually mark attendance" type="toggle" value={cfg.allowManualEntry} onChange={set("allowManualEntry")} />
                    <Row label="Manual Entry Requires Approval" desc="Manager must approve manual entries" type="toggle" value={cfg.manualEntryApproval} onChange={set("manualEntryApproval")} />
                </div>

                {/* Data & Export */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-[#8B5CF6]" />
                        <h3 className="font-semibold">Data & Reporting</h3>
                    </div>
                    <Row label="Data Retention (days)" desc="Attendance records older than this will be archived" type="number" value={cfg.dataRetentionDays} onChange={set("dataRetentionDays")} />
                    <Row label="Real-Time Dashboard Sync" desc="Update dashboard every few seconds" type="toggle" value={cfg.realTimeSync} onChange={set("realTimeSync")} />
                    <Row label="Email Daily Summary Reports" desc="Send automated reports to HR email" type="toggle" value={cfg.emailReports} onChange={set("emailReports")} />
                </div>
            </div>
        </div>
    
        </Page>
        );
}
