"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function ShiftAssign() {
    const [assignTo, setAssignTo] = useState("individual");
    const [hasConflict] = useState(true);

    return (
        <Page
            title="Assign Shifts"
            subtitle="Assign work schedules to employees"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Roster", href: "/attendance/roster" }, { label: "Assign" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <h2 className="text-2xl font-bold mb-1">Assign Shifts</h2>
            <p className="text-sm text-[#8899AA] mb-6">Assign work schedules to employees</p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT */}
                <div className="flex-1">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-5">
                        <div>
                            <label className="block text-sm text-[#8899AA] mb-3">Assign To *</label>
                            <div className="space-y-2">
                                {[
                                    { val: "individual", label: "Individual Employee" },
                                    { val: "department", label: "Department" },
                                    { val: "grade", label: "Grade / Level" },
                                    { val: "custom", label: "Custom List" },
                                ].map(opt => (
                                    <label key={opt.val} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${assignTo === opt.val ? "border-[#00E5A0] bg-[#00E5A0]/5" : "border-[#1A2A3A] hover:border-[#2A3A4A]"}`}>
                                        <input type="radio" name="assignTo" value={opt.val} checked={assignTo === opt.val} onChange={() => setAssignTo(opt.val)} className="accent-[#00E5A0]" />
                                        <span className="text-sm">{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-[#8899AA] mb-2">
                                {assignTo === "individual" ? "Employee" : assignTo === "department" ? "Department" : "Select"} *
                            </label>
                            <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                <option>Rahul Sharma (EMP-0848)</option>
                                <option>Priya Mehta (EMP-0091)</option>
                                <option>Kavya Reddy (EMP-0901)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-[#8899AA] mb-2">Shift *</label>
                            <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                <option>🟢 General Shift (09:00–18:00)</option>
                                <option>🔵 Morning Shift (07:00–16:00)</option>
                                <option>🟡 Evening Shift (14:00–23:00)</option>
                                <option>🔴 Night Shift (22:00–07:00)</option>
                                <option>🟣 Flexible Shift</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-[#8899AA] mb-2">Date Range *</label>
                            <div className="grid grid-cols-2 gap-3 mb-2">
                                <input type="date" defaultValue="2024-11-11"
                                    className="bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                                <input type="date" defaultValue="2024-11-30"
                                    className="bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                            </div>
                            <button className="text-xs text-[#0066FF] hover:underline">Apply for entire month</button>
                        </div>

                        <div>
                            <label className="block text-sm text-[#8899AA] mb-3">Repeat *</label>
                            <div className="space-y-2">
                                {["Daily (every day in range)", "Specific days", "Alternate weeks (Week A / Week B)"].map((r, i) => (
                                    <label key={i} className="flex items-center gap-3 cursor-pointer">
                                        <input type="radio" name="repeat" defaultChecked={i === 0} className="accent-[#00E5A0]" />
                                        <span className="text-sm">{r}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* PREVIEW */}
                        <div className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl px-4 py-3 text-sm text-[#00E5A0]">
                            Rahul Sharma will be on <strong>General Shift</strong> from 11/11 to 30/11/2024
                        </div>

                        {/* CONFLICT */}
                        {hasConflict && (
                            <div className="bg-[#FFB800]/5 border border-[#FFB800]/30 rounded-xl px-4 py-3">
                                <div className="flex items-center gap-2 text-sm text-[#FFB800] mb-2">
                                    <AlertTriangle className="w-4 h-4" /> ⚠️ Conflict on 15 Nov: Currently has Morning shift
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-[#8899AA]">Override?</span>
                                    <button className="w-8 h-4 rounded-full bg-[#FFB800] relative"><span className="absolute top-0.5 right-0.5 w-3 h-3 bg-white rounded-full" /></button>
                                </div>
                            </div>
                        )}

                        <button className="w-full py-3 bg-[#00E5A0] text-[#060B14] font-bold rounded-xl hover:bg-[#00c98d]">Assign</button>
                    </div>
                </div>

                {/* RIGHT — MINI ROSTER */}
                <div className="w-full lg:w-[420px] shrink-0">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Preview — Week of 11–17 Nov</h3>
                        <div className="grid grid-cols-7 gap-1 mb-2 text-[10px] text-[#445566] text-center">
                            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <div key={i}>{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {["Gen", "WFH", "Gen", "WFH", "Gen", "Off", "Off"].map((s, i) => (
                                <div key={i} className="py-1.5 text-[9px] font-medium rounded text-center"
                                    style={{
                                        backgroundColor: s === "Off" ? "#1A2A3A44" : s === "WFH" ? "#0066FF22" : "#00E5A022",
                                        color: s === "Off" ? "#445566" : s === "WFH" ? "#0066FF" : "#00E5A0"
                                    }}>
                                    {s}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-[#8899AA] mt-3 text-center">Changes reflected after saving</p>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
        );
}
