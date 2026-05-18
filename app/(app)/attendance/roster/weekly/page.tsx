"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Plus, User, RefreshCw, Search } from "lucide-react";
import Link from "next/link";

type ShiftType = "Gen" | "Morning" | "Evening" | "Night" | "WFH" | "Off" | "Holiday";

const SHIFT_CONFIG: Record<ShiftType, { label: string; short: string; bg: string; border: string; text: string; time: string }> = {
    Gen: { label: "General", short: "GEN", bg: "rgba(0,229,160,0.15)", border: "rgba(0,229,160,0.4)", text: "#00E5A0", time: "9–6" },
    Morning: { label: "Morning", short: "MOR", bg: "rgba(0,102,255,0.15)", border: "rgba(0,102,255,0.4)", text: "#0066FF", time: "7–4" },
    Evening: { label: "Evening", short: "EVE", bg: "rgba(255,184,0,0.15)", border: "rgba(255,184,0,0.4)", text: "#FFB800", time: "14–11" },
    Night: { label: "Night", short: "NGT", bg: "rgba(255,68,68,0.15)", border: "rgba(255,68,68,0.4)", text: "#FF4444", time: "22–7" },
    WFH: { label: "WFH", short: "WFH", bg: "rgba(155,89,182,0.15)", border: "rgba(155,89,182,0.4)", text: "#9B59B6", time: "Flex" },
    Off: { label: "Week Off", short: "OFF", bg: "rgba(68,85,102,0.1)", border: "rgba(68,85,102,0.3)", text: "#445566", time: "—" },
    Holiday: { label: "Holiday", short: "HOL", bg: "rgba(68,85,102,0.1)", border: "rgba(68,85,102,0.3)", text: "#445566", time: "—" },
};

const ALL_SHIFTS: ShiftType[] = ["Gen", "Morning", "Evening", "Night", "WFH", "Off", "Holiday"];

const ROSTER_DATA: { name: string; emp: string; dept: string; avatar: string; schedule: ShiftType[] }[] = [
    { name: "Priya Mehta", emp: "EMP-0091", dept: "Engineering", avatar: "PM", schedule: ["Gen", "Gen", "Gen", "Gen", "Gen", "Off", "Off"] },
    { name: "Rohan Desai", emp: "EMP-0234", dept: "Engineering", avatar: "RD", schedule: ["Gen", "Gen", "WFH", "Gen", "Gen", "Off", "Off"] },
    { name: "Rahul Sharma", emp: "EMP-0848", dept: "Engineering", avatar: "RS", schedule: ["Gen", "WFH", "Gen", "WFH", "Gen", "Off", "Off"] },
    { name: "Suresh Kumar", emp: "EMP-0311", dept: "Operations", avatar: "SK", schedule: ["Morning", "Morning", "Morning", "Morning", "Morning", "Morning", "Off"] },
    { name: "Kavya Reddy", emp: "EMP-0901", dept: "HR", avatar: "KR", schedule: ["Gen", "Gen", "Gen", "Gen", "Gen", "Off", "Off"] },
    { name: "Ravi Singh", emp: "EMP-0567", dept: "Sales", avatar: "RV", schedule: ["Evening", "Evening", "Off", "Evening", "Evening", "Evening", "Off"] },
    { name: "Pooja Nair", emp: "EMP-0456", dept: "Finance", avatar: "PN", schedule: ["Night", "Night", "Night", "Night", "Night", "Night", "Off"] },
    { name: "Amit Kumar", emp: "EMP-0723", dept: "Operations", avatar: "AK", schedule: ["Gen", "Gen", "Gen", "Gen", "Gen", "Off", "Off"] },
    { name: "Sneha Rao", emp: "EMP-0145", dept: "Marketing", avatar: "SR", schedule: ["Gen", "WFH", "Gen", "Gen", "WFH", "Off", "Off"] },
    { name: "Vikram Singh", emp: "EMP-0678", dept: "Sales", avatar: "VS", schedule: ["Morning", "Morning", "WFH", "Morning", "Morning", "Off", "Off"] },
    { name: "Anita Joshi", emp: "EMP-0412", dept: "Finance", avatar: "AJ", schedule: ["Gen", "Gen", "Gen", "Gen", "Gen", "Off", "Off"] },
    { name: "Deepak Rao", emp: "EMP-0234", dept: "Operations", avatar: "DR", schedule: ["Night", "Night", "Off", "Night", "Night", "Night", "Off"] },
];

const WEEK_DAYS = [
    { label: "Mon", date: "10 Mar" },
    { label: "Tue", date: "11 Mar" },
    { label: "Wed", date: "12 Mar" },
    { label: "Thu", date: "13 Mar" },
    { label: "Fri", date: "14 Mar" },
    { label: "Sat", date: "15 Mar" },
    { label: "Sun", date: "16 Mar" },
];

const DEPTS = ["All Departments", "Engineering", "Operations", "HR", "Sales", "Finance", "Marketing"];

export default function ShiftRosterWeekly() {
    const [dept, setDept] = useState("All Departments");
    const [search, setSearch] = useState("");
    const [roster, setRoster] = useState(ROSTER_DATA);
    const [editCell, setEditCell] = useState<{ row: number; col: number } | null>(null);
    const [weekOffset, setWeekOffset] = useState(0);

    const filtered = roster.filter(r =>
        (dept === "All Departments" || r.dept === dept) &&
        (r.name.toLowerCase().includes(search.toLowerCase()) || r.emp.toLowerCase().includes(search.toLowerCase()))
    );

    function updateShift(rowIdx: number, colIdx: number, shift: ShiftType) {
        // find correct row in original roster
        const originalIdx = roster.findIndex(r => r.emp === filtered[rowIdx].emp);
        const updated = roster.map((r, i) =>
            i === originalIdx
                ? { ...r, schedule: r.schedule.map((s, j) => j === colIdx ? shift : s) as ShiftType[] }
                : r
        );
        setRoster(updated);
        setEditCell(null);
    }

    // Stats
    const totalWFH = filtered.flatMap(r => r.schedule).filter(s => s === "WFH").length;
    const totalNight = filtered.flatMap(r => r.schedule).filter(s => s === "Night").length;
    const totalOff = filtered.flatMap(r => r.schedule).filter(s => s === "Off").length;

    return (
        <Page
            title="Shift Roster"
            subtitle="Week of 10–16 March 2025 •"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Roster", href: "/attendance/roster" }, { label: "Weekly" }]}
            maxWidth="1400px"
        >







        <div className="p-6 md:p-8 max-w-[1400px] mx-auto text-white">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Shift Roster</h1>
                    <p className="text-sm text-[#8899AA]">Week of 10–16 March 2025 • {filtered.length} employees</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Week nav */}
                    <div className="flex items-center gap-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-3 py-2">
                        <button onClick={() => setWeekOffset(w => w - 1)} className="p-1 hover:text-[#00E5A0] transition-colors"><ChevronLeft size={16} /></button>
                        <span className="text-sm font-medium text-white px-2">{weekOffset === 0 ? "Current Week" : weekOffset > 0 ? `+${weekOffset}w` : `${weekOffset}w`}</span>
                        <button onClick={() => setWeekOffset(w => w + 1)} className="p-1 hover:text-[#00E5A0] transition-colors"><ChevronRight size={16} /></button>
                    </div>
                    <button className="flex items-center gap-2 h-9 px-3 bg-[#0D1928] border border-[#1A2A3A] text-sm rounded-xl hover:bg-[#1A2A3A] transition-colors">
                        <RefreshCw size={14} /> Auto-Schedule
                    </button>
                    <button className="flex items-center gap-2 h-9 px-3 bg-[#0D1928] border border-[#1A2A3A] text-sm rounded-xl hover:bg-[#1A2A3A] transition-colors">
                        <Download size={14} /> Export
                    </button>
                    <Link href="/attendance/roster/assign" className="flex items-center gap-2 h-9 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] transition-colors">
                        <Plus size={14} /> Assign Shifts
                    </Link>
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#9B59B6]/10 flex items-center justify-center"><User size={16} className="text-[#9B59B6]" /></div>
                    <div>
                        <p className="text-xl font-bold text-white">{totalWFH}</p>
                        <p className="text-xs text-[#8899AA]">WFH slots this week</p>
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FF4444]/10 flex items-center justify-center"><span className="text-base">🌙</span></div>
                    <div>
                        <p className="text-xl font-bold text-white">{totalNight}</p>
                        <p className="text-xs text-[#8899AA]">Night shifts this week</p>
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1A2A3A] flex items-center justify-center"><span className="text-base">🏖️</span></div>
                    <div>
                        <p className="text-xl font-bold text-white">{totalOff}</p>
                        <p className="text-xs text-[#8899AA]">Days off this week</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee or EMP ID..."
                        className="w-full h-9 bg-[#0D1928] border border-[#1A2A3A] rounded-lg pl-9 pr-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] transition-colors" />
                </div>
                <select value={dept} onChange={e => setDept(e.target.value)} className="h-9 bg-[#0D1928] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                    {DEPTS.map(d => <option key={d}>{d}</option>)}
                </select>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4">
                {ALL_SHIFTS.map(s => (
                    <span key={s} className="flex items-center gap-1.5 text-xs" style={{ color: SHIFT_CONFIG[s].text }}>
                        <span className="w-2.5 h-2.5 rounded" style={{ background: SHIFT_CONFIG[s].bg, border: `1px solid ${SHIFT_CONFIG[s].border}` }} />
                        {SHIFT_CONFIG[s].label} ({SHIFT_CONFIG[s].time})
                    </span>
                ))}
                <span className="text-[11px] text-[#445566] ml-2">Click any cell to edit shift</span>
            </div>

            {/* Roster Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                    <thead className="bg-[#0A1420]">
                        <tr>
                            <th className="px-4 py-3.5 text-left text-xs text-[#8899AA] font-medium sticky left-0 bg-[#0A1420] z-10 min-w-[200px]">Employee</th>
                            {WEEK_DAYS.map(d => (
                                <th key={d.label} className="px-2 py-3.5 text-center text-xs text-[#8899AA] font-medium min-w-[100px]">
                                    <p className="font-semibold text-white">{d.label}</p>
                                    <p className="text-[10px] text-[#445566]">{d.date}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A1420]">
                        {filtered.map((emp, ri) => (
                            <tr key={emp.emp} className="hover:bg-[#1A2A3A]/20 transition-colors">
                                <td className="px-4 py-3 sticky left-0 bg-[#0D1928] z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA] shrink-0">{emp.avatar}</div>
                                        <div>
                                            <p className="font-medium text-white text-[13px]">{emp.name}</p>
                                            <p className="text-[10px] text-[#445566]">{emp.emp} · {emp.dept}</p>
                                        </div>
                                    </div>
                                </td>
                                {emp.schedule.map((shift, ci) => {
                                    const cfg = SHIFT_CONFIG[shift];
                                    const isEditing = editCell?.row === ri && editCell?.col === ci;
                                    return (
                                        <td key={ci} className="px-2 py-3 text-center relative">
                                            <button
                                                onClick={() => setEditCell(isEditing ? null : { row: ri, col: ci })}
                                                className="w-full px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all hover:scale-105"
                                                style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text }}
                                            >
                                                {cfg.short}
                                            </button>
                                            {/* Dropdown picker */}
                                            {isEditing && (
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-30 bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-2xl p-2 min-w-[140px]">
                                                    {ALL_SHIFTS.map(s => (
                                                        <button key={s} onClick={() => updateShift(ri, ci, s)}
                                                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs hover:bg-[#1A2A3A] transition-colors ${s === shift ? "bg-[#1A2A3A]" : ""}`}
                                                            style={{ color: SHIFT_CONFIG[s].text }}
                                                        >
                                                            <span className="w-2 h-2 rounded-full" style={{ background: SHIFT_CONFIG[s].text }} />
                                                            {SHIFT_CONFIG[s].label}
                                                            <span className="ml-auto text-[#445566]">{SHIFT_CONFIG[s].time}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12 text-[#445566]">No employees found</div>
            )}
        </div>
    
        

        

        

        </Page>
    );
}
