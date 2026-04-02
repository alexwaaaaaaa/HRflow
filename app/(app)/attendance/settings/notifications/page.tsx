"use client";

import React, { useState } from "react";
import { Save, Bell, Mail, Smartphone, MessageSquare } from "lucide-react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
    );
}

const NOTIFICATION_SECTIONS = [
    {
        title: "Employee Notifications",
        icon: Smartphone,
        color: "#00E5A0",
        items: [
            { label: "Check-in confirmation", desc: "Notify employee when check-in is recorded", key: "emp_checkin" },
            { label: "Check-out reminder", desc: "Alert if employee hasn't punched out by shift end", key: "emp_checkout_reminder" },
            { label: "Regularization status update", desc: "Approved/rejected regularization request", key: "emp_reg_status" },
            { label: "Late warning", desc: "Notify when flagged as late for the day", key: "emp_late_warn" },
            { label: "WFH approval", desc: "WFH request approved or rejected", key: "emp_wfh" },
        ]
    },
    {
        title: "Manager Notifications",
        icon: Bell,
        color: "#0066FF",
        items: [
            { label: "Team absent alert", desc: "Alert if >2 team members absent on same day", key: "mgr_absent" },
            { label: "Pending regularization request", desc: "New regularization awaiting approval", key: "mgr_reg_pending" },
            { label: "Habitual late coming alert", desc: "Employee marked habitual late comer", key: "mgr_habitual" },
            { label: "OT request pending", desc: "Employee requested overtime approval", key: "mgr_ot" },
        ]
    },
    {
        title: "HR Notifications",
        icon: Mail,
        color: "#FFB800",
        items: [
            { label: "Daily attendance summary", desc: "Morning email with previous day stats", key: "hr_daily" },
            { label: "LOP auto-applied alert", desc: "Notify HR when LOP is auto-applied", key: "hr_lop" },
            { label: "Biometric device offline", desc: "Alert when a device loses connectivity", key: "hr_bio_offline" },
            { label: "Monthly attendance report", desc: "Auto-generated on 1st of each month", key: "hr_monthly" },
            { label: "Anomaly detection alert", desc: "Suspicious or unusual attendance flagged", key: "hr_anomaly" },
        ]
    },
];

export default function NotificationsSettings() {
    const initialState = Object.fromEntries(
        NOTIFICATION_SECTIONS.flatMap(s => s.items.map(i => [i.key, true]))
    );
    const [enabled, setEnabled] = useState<Record<string, boolean>>(initialState);
    const [channels, setChannels] = useState({ email: true, push: true, sms: false, whatsapp: false });
    const [saved, setSaved] = useState(false);

    const toggle = (k: string) => setEnabled(e => ({ ...e, [k]: !e[k] }));
    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Bell className="w-6 h-6 text-[#8B5CF6]" /> Notification Settings</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Configure who gets notified about attendance events and via which channel</p>
                </div>
                <button onClick={save}
                    className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                    <Save className="w-4 h-4" /> {saved ? "Saved ✅" : "Save Settings"}
                </button>
            </div>

            {/* Channels */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-5">
                <h3 className="font-semibold mb-4">Delivery Channels</h3>
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { label: "Email", key: "email" as const, icon: Mail, color: "#0066FF" },
                        { label: "Push", key: "push" as const, icon: Smartphone, color: "#00E5A0" },
                        { label: "SMS", key: "sms" as const, icon: MessageSquare, color: "#FFB800" },
                        { label: "WhatsApp", key: "whatsapp" as const, icon: MessageSquare, color: "#25D366" },
                    ].map(ch => (
                        <div key={ch.key} onClick={() => setChannels(c => ({ ...c, [ch.key]: !c[ch.key] }))}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-colors ${channels[ch.key] ? "border-[#00E5A0]/40 bg-[#00E5A0]/5" : "border-[#1A2A3A] hover:border-[#2A3A4A]"}`}>
                            <ch.icon className="w-5 h-5" style={{ color: channels[ch.key] ? ch.color : "#445566" }} />
                            <span className={`text-xs font-medium ${channels[ch.key] ? "text-white" : "text-[#445566]"}`}>{ch.label}</span>
                            <span className={`text-[10px] ${channels[ch.key] ? "text-[#00E5A0]" : "text-[#445566]"}`}>{channels[ch.key] ? "Active" : "Off"}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notification Rules */}
            <div className="space-y-4">
                {NOTIFICATION_SECTIONS.map(section => (
                    <div key={section.title} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#1A2A3A] flex items-center gap-2">
                            <section.icon className="w-4 h-4" style={{ color: section.color }} />
                            <h3 className="font-semibold">{section.title}</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {section.items.map(item => (
                                <div key={item.key} className="px-6 py-3.5 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">{item.label}</p>
                                        <p className="text-xs text-[#445566]">{item.desc}</p>
                                    </div>
                                    <Toggle on={enabled[item.key]} onChange={() => toggle(item.key)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
