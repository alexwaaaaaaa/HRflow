"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Plus, Edit2, ToggleLeft, ToggleRight } from "lucide-react";

interface Shift {
    name: string;
    start: string;
    end: string;
    days: string;
    employees: number;
    color: string;
    active: boolean;
}

const SHIFTS: Shift[] = [
    { name: "General Shift", start: "09:00", end: "18:00", days: "Mon–Fri", employees: 489, color: "#00E5A0", active: true },
    { name: "Morning Shift", start: "07:00", end: "16:00", days: "Mon–Sat", employees: 120, color: "#0066FF", active: true },
    { name: "Evening Shift", start: "14:00", end: "23:00", days: "Mon–Sat", employees: 89, color: "#FFB800", active: true },
    { name: "Night Shift", start: "22:00", end: "07:00", days: "Mon–Sun", employees: 42, color: "#FF4444", active: true },
    { name: "Flexible Shift", start: "10:00", end: "19:00", days: "Mon–Fri", employees: 107, color: "#9B59B6", active: true },
];

const DAYS_LIST = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ShiftConfig() {
    const [shifts, setShifts] = useState(SHIFTS);
    const [selected, setSelected] = useState<Shift | null>(null);
    const [worked, _setWorked] = useState(9);
    const [workDays, setWorkDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"]);

    const toggleDay = (d: string) => setWorkDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

    return (
        <Page
            title="Shift Configuration"
            subtitle="Define work schedules for your organization"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Shifts", href: "/attendance/shifts" }, { label: "Config" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <h2 className="text-2xl font-bold mb-1">Shift Configuration</h2>
            <p className="text-sm text-[#8899AA] mb-6">Define work schedules for your organization</p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT — LIST */}
                <div className="w-full lg:w-[380px] shrink-0">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Configured Shifts ({shifts.length})</h3>
                        <button onClick={() => setSelected({ name: "", start: "09:00", end: "18:00", days: "Mon–Fri", employees: 0, color: "#00E5A0", active: true })}
                            className="text-sm text-[#00E5A0] flex items-center gap-1 hover:underline">
                            <Plus className="w-4 h-4" /> Add Shift
                        </button>
                    </div>
                    <div className="space-y-3">
                        {shifts.map((s, i) => (
                            <div key={i} onClick={() => setSelected(s)}
                                className={`bg-[#0D1928] border rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-[#2A3A4A] transition-colors ${selected?.name === s.name ? "border-[#00E5A0]/50" : "border-[#1A2A3A]"}`}>
                                <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">{s.name}</p>
                                    <p className="text-xs text-[#8899AA]">{s.start} – {s.end} • {s.days}</p>
                                    <p className="text-xs text-[#445566]">{s.employees} employees</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="p-1 hover:bg-[#1A2A3A] rounded"><Edit2 className="w-3.5 h-3.5 text-[#8899AA]" /></button>
                                    <button onClick={e => { e.stopPropagation(); setShifts(ss => ss.map((x, j) => j === i ? { ...x, active: !x.active } : x)); }}
                                        className="p-1 hover:bg-[#1A2A3A] rounded">
                                        {s.active ? <ToggleRight className="w-4 h-4 text-[#00E5A0]" /> : <ToggleLeft className="w-4 h-4 text-[#445566]" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — FORM */}
                <div className="flex-1">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-5">
                        <h3 className="text-lg font-semibold">{selected?.name ? `Edit: ${selected.name}` : "Add New Shift"}</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm text-[#8899AA] mb-2">Shift Name *</label>
                                <input defaultValue={selected?.name || ""} placeholder="General Shift"
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0] placeholder-[#445566]" />
                            </div>
                            <div>
                                <label className="block text-sm text-[#8899AA] mb-2">Shift Color</label>
                                <input type="color" defaultValue={selected?.color || "#00E5A0"}
                                    className="w-full h-[46px] bg-[#060B14] border border-[#1A2A3A] rounded-xl px-2 cursor-pointer" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-[#8899AA] mb-2">Start Time *</label>
                                <input type="time" defaultValue={selected?.start || "09:00"}
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                            </div>
                            <div>
                                <label className="block text-sm text-[#8899AA] mb-2">End Time *</label>
                                <input type="time" defaultValue={selected?.end || "18:00"}
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                            </div>
                        </div>
                        <p className="text-xs text-[#00E5A0] -mt-3">Working hours: {worked}h 00m (incl. 1h break)</p>

                        <div>
                            <label className="block text-sm text-[#8899AA] mb-3">Working Days *</label>
                            <div className="flex gap-2 flex-wrap">
                                {DAYS_LIST.map(d => (
                                    <button key={d} onClick={() => toggleDay(d)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${workDays.includes(d) ? "bg-[#00E5A0] text-[#060B14] border-[#00E5A0]" : "border-[#1A2A3A] text-[#8899AA] hover:border-[#2A3A4A]"}`}>
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 space-y-3">
                            <h4 className="text-sm font-medium text-[#8899AA]">Attendance Rules</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Grace period (mins)", def: "15" },
                                    { label: "Half-day if late by", def: "4 hours" },
                                    { label: "Min hours for full day", def: "8 hours" },
                                    { label: "OT starts after", def: "9 hours" },
                                ].map(r => (
                                    <div key={r.label}>
                                        <label className="block text-xs text-[#445566] mb-1">{r.label}</label>
                                        <input defaultValue={r.def}
                                            className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 py-3 bg-[#00E5A0] text-[#060B14] font-bold rounded-xl hover:bg-[#00c98d]">Save Shift</button>
                            <button className="px-6 py-3 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
        );
}
