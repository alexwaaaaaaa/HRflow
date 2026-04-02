"use client";

import React, { useState } from "react";
import { Download, Search, ChevronDown } from "lucide-react";

const EMPLOYEES = [
    { name: "Priya Mehta", emp: "EMP-0091", dept: "Engineering", shift: "General", workingDays: 26, present: 24, absent: 1, wfh: 1, lop: 0, late: 3, ot: "4h 30m", status: "Active" },
    { name: "Vikram Singh", emp: "EMP-0567", dept: "Sales", shift: "General", workingDays: 26, present: 20, absent: 4, wfh: 2, lop: 2, late: 8, ot: "0h", status: "Active" },
    { name: "Rohan Desai", emp: "EMP-0234", dept: "Engineering", shift: "General", workingDays: 26, present: 25, absent: 1, wfh: 0, lop: 0, late: 1, ot: "12h", status: "Active" },
    { name: "Sneha Rao", emp: "EMP-0145", dept: "Marketing", shift: "General", workingDays: 26, present: 22, absent: 2, wfh: 2, lop: 1, late: 2, ot: "0h", status: "Active" },
    { name: "Amit Kumar", emp: "EMP-0723", dept: "Operations", shift: "Morning", workingDays: 26, present: 23, absent: 3, wfh: 0, lop: 1, late: 5, ot: "2h", status: "Active" },
    { name: "Kavya Reddy", emp: "EMP-0312", dept: "Finance", shift: "General", workingDays: 26, present: 26, absent: 0, wfh: 0, lop: 0, late: 0, ot: "1h 30m", status: "Active" },
    { name: "Suresh Patil", emp: "EMP-0889", dept: "Sales", shift: "General", workingDays: 26, present: 18, absent: 6, wfh: 2, lop: 3, late: 4, ot: "0h", status: "Active" },
    { name: "Anjali Nair", emp: "EMP-0421", dept: "HR", shift: "General", workingDays: 26, present: 25, absent: 1, wfh: 0, lop: 0, late: 1, ot: "0h", status: "Active" },
];

export default function AttendanceSummary() {
    const [search, setSearch] = useState("");
    const [month, setMonth] = useState("March 2025");
    const [dept, setDept] = useState("All");

    const filtered = EMPLOYEES.filter(e =>
        (dept === "All" || e.dept === dept) &&
        (e.name.toLowerCase().includes(search.toLowerCase()) || e.emp.toLowerCase().includes(search.toLowerCase()))
    );

    const totals = {
        present: filtered.reduce((s, e) => s + e.present, 0),
        absent: filtered.reduce((s, e) => s + e.absent, 0),
        lop: filtered.reduce((s, e) => s + e.lop, 0),
    };

    return (
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Attendance Summary</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Monthly employee-wise attendance overview</p>
                </div>
                <div className="flex gap-3 items-center">
                    <select value={month} onChange={e => setMonth(e.target.value)}
                        className="bg-[#0D1928] border border-[#1A2A3A] text-sm rounded-xl px-3 py-2 text-white focus:outline-none">
                        {["March 2025", "February 2025", "January 2025"].map(m => <option key={m}>{m}</option>)}
                    </select>
                    <button className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-[#00c98d]">
                        <Download className="w-4 h-4" /> Export Excel
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-5 gap-4 mb-6">
                {[
                    { label: "Total Employees", val: filtered.length, color: "#FFFFFF" },
                    { label: "Total Present Days", val: totals.present, color: "#00E5A0" },
                    { label: "Total Absent Days", val: totals.absent, color: "#FF4444" },
                    { label: "Total LOP Days", val: totals.lop, color: "#FFB800" },
                    { label: "Avg Attendance", val: `${Math.round((totals.present / (filtered.length * 26)) * 100)}%`, color: "#0066FF" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-5">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#445566]" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee..."
                        className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                </div>
                <div className="relative">
                    <select value={dept} onChange={e => setDept(e.target.value)}
                        className="bg-[#0D1928] border border-[#1A2A3A] text-sm rounded-xl pl-3 pr-8 py-2 text-white focus:outline-none appearance-none">
                        {["All", "Engineering", "Sales", "Operations", "Marketing", "Finance", "HR"].map(d => <option key={d}>{d}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-[#445566] pointer-events-none" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                            <tr>
                                <th className="px-5 py-3 text-left">Employee</th>
                                <th className="px-5 py-3 text-left">Department</th>
                                <th className="px-5 py-3 text-center">Shift</th>
                                <th className="px-5 py-3 text-center">Working Days</th>
                                <th className="px-5 py-3 text-center">Present</th>
                                <th className="px-5 py-3 text-center">Absent</th>
                                <th className="px-5 py-3 text-center">WFH</th>
                                <th className="px-5 py-3 text-center">LOP</th>
                                <th className="px-5 py-3 text-center">Late</th>
                                <th className="px-5 py-3 text-center">OT</th>
                                <th className="px-5 py-3 text-center">Attendance %</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {filtered.map((row, i) => {
                                const pct = Math.round((row.present / row.workingDays) * 100);
                                return (
                                    <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#00E5A0]">
                                                    {row.name.split(" ").map(n => n[0]).join("")}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{row.name}</p>
                                                    <p className="text-xs text-[#445566]">{row.emp}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-[#8899AA]">{row.dept}</td>
                                        <td className="px-5 py-3 text-center text-[#8899AA]">{row.shift}</td>
                                        <td className="px-5 py-3 text-center text-[#8899AA]">{row.workingDays}</td>
                                        <td className="px-5 py-3 text-center text-[#00E5A0] font-semibold">{row.present}</td>
                                        <td className="px-5 py-3 text-center text-[#FF4444]">{row.absent}</td>
                                        <td className="px-5 py-3 text-center text-[#0066FF]">{row.wfh}</td>
                                        <td className="px-5 py-3 text-center text-[#FFB800]">{row.lop}</td>
                                        <td className="px-5 py-3 text-center text-[#8899AA]">{row.late}</td>
                                        <td className="px-5 py-3 text-center text-[#8899AA]">{row.ot}</td>
                                        <td className="px-5 py-3 text-center">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${pct >= 90 ? "bg-[#00E5A0]" : pct >= 75 ? "bg-[#FFB800]" : "bg-[#FF4444]"}`}
                                                        style={{ width: `${pct}%` }} />
                                                </div>
                                                <span className={`text-xs font-semibold ${pct >= 90 ? "text-[#00E5A0]" : pct >= 75 ? "text-[#FFB800]" : "text-[#FF4444]"}`}>{pct}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
