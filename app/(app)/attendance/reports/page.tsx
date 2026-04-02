"use client";

import React, { useState } from "react";
import { Download, FileText, Users, Clock, TrendingDown, BarChart3, ChevronRight } from "lucide-react";

const REPORTS = [
    { id: 1, name: "Monthly Attendance Summary", desc: "Employee-wise present/absent/LOP for the month", icon: FileText, lastRun: "07 Mar 2025", category: "Summary" },
    { id: 2, name: "Late Arrivals Report", desc: "Employees arriving after shift start time", icon: Clock, lastRun: "07 Mar 2025", category: "Punctuality" },
    { id: 3, name: "Absenteeism Report", desc: "Department-wise absenteeism trends", icon: TrendingDown, lastRun: "06 Mar 2025", category: "Absence" },
    { id: 4, name: "Overtime Report", desc: "OT hours and payout calculation by employee", icon: BarChart3, lastRun: "05 Mar 2025", category: "OT" },
    { id: 5, name: "Regularization Report", desc: "Approved vs rejected regularization requests", icon: FileText, lastRun: "04 Mar 2025", category: "Requests" },
    { id: 6, name: "Department Headcount", desc: "Present/WFH/Absent count by department daily", icon: Users, lastRun: "07 Mar 2025", category: "Summary" },
    { id: 7, name: "Shift Compliance Report", desc: "Employees outside assigned shift timings", icon: Clock, lastRun: "03 Mar 2025", category: "Punctuality" },
    { id: 8, name: "WFH Usage Report", desc: "Work-from-home frequency per employee", icon: BarChart3, lastRun: "02 Mar 2025", category: "WFH" },
];

const RECENT_RUNS = [
    { name: "Monthly Attendance Summary", generatedBy: "Priya Mehta", on: "07 Mar, 09:15 AM", format: "Excel", size: "124 KB" },
    { name: "Late Arrivals Report", generatedBy: "System Auto", on: "07 Mar, 08:00 AM", format: "PDF", size: "56 KB" },
    { name: "Department Headcount", generatedBy: "Priya Mehta", on: "06 Mar, 06:30 PM", format: "Excel", size: "38 KB" },
];

const CATEGORIES = ["All", "Summary", "Punctuality", "Absence", "OT", "Requests", "WFH"];

export default function AttendanceReports() {
    const [cat, setCat] = useState("All");
    const [month, setMonth] = useState("March 2025");

    const shown = REPORTS.filter(r => cat === "All" || r.category === cat);

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Attendance Reports</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Generate, schedule, and download attendance reports</p>
                </div>
                <div className="flex gap-3 items-center">
                    <select value={month} onChange={e => setMonth(e.target.value)}
                        className="bg-[#0D1928] border border-[#1A2A3A] text-sm rounded-xl px-3 py-2 text-white focus:outline-none">
                        {["March 2025", "February 2025", "January 2025"].map(m => <option key={m}>{m}</option>)}
                    </select>
                    <button className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-[#00c98d]">
                        <Download className="w-4 h-4" /> Bulk Export
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Reports Generated", val: "127", color: "#FFFFFF", sub: "this month" },
                    { label: "Scheduled Reports", val: "8", color: "#00E5A0", sub: "auto-run daily" },
                    { label: "Pending Reviews", val: "3", color: "#FFB800", sub: "awaiting approval" },
                    { label: "Avg Generation Time", val: "2.4s", color: "#0066FF", sub: "last 30 days" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</p>
                        <p className="text-xs text-[#445566] mt-1">{k.sub}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Report List */}
                <div className="col-span-2">
                    {/* Category Filter */}
                    <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1 w-fit mb-5">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setCat(c)}
                                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${cat === c ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>
                                {c}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {shown.map(r => (
                            <div key={r.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#00E5A0]/40 transition-colors group cursor-pointer">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#00E5A0]/10 flex items-center justify-center">
                                        <r.icon className="w-5 h-5 text-[#00E5A0]" />
                                    </div>
                                    <span className="text-xs text-[#445566] bg-[#0A1420] border border-[#1A2A3A] px-2 py-0.5 rounded-full">{r.category}</span>
                                </div>
                                <h3 className="font-semibold text-sm mb-1">{r.name}</h3>
                                <p className="text-xs text-[#8899AA] mb-4">{r.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#445566]">Last: {r.lastRun}</span>
                                    <button className="text-xs text-[#00E5A0] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Generate <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Downloads */}
                <div>
                    <h3 className="text-sm font-semibold text-[#8899AA] mb-4 uppercase tracking-wider">Recent Downloads</h3>
                    <div className="space-y-3">
                        {RECENT_RUNS.map((r, i) => (
                            <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4">
                                <p className="text-sm font-medium mb-1">{r.name}</p>
                                <p className="text-xs text-[#8899AA] mb-2">{r.generatedBy} · {r.on}</p>
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.format === "PDF" ? "bg-[#FF4444]/10 text-[#FF4444]" : "bg-[#00E5A0]/10 text-[#00E5A0]"}`}>
                                        {r.format} · {r.size}
                                    </span>
                                    <button className="text-xs text-[#0066FF] flex items-center gap-1 hover:underline">
                                        <Download className="w-3 h-3" /> Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-xl p-4">
                        <p className="text-sm font-semibold text-[#0066FF] mb-2">📅 Schedule Reports</p>
                        <p className="text-xs text-[#8899AA] mb-3">Auto-generate and email reports on a schedule</p>
                        <button className="w-full px-3 py-2 text-xs font-semibold bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30 rounded-lg hover:bg-[#0066FF]/20">
                            Configure Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
