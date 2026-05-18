"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Search, Download, ChevronLeft, ChevronRight, MapPin, Monitor } from "lucide-react";

const LOG_DATA = [
    { name: "Priya Mehta", emp: "EMP-0091", dept: "Engineering", checkIn: "09:02 AM", checkOut: "06:34 PM", hours: "9h 32m", source: "Biometric", location: "HQ - Mumbai", status: "Present", late: false },
    { name: "Vikram Singh", emp: "EMP-0567", dept: "Sales", checkIn: "10:45 AM", checkOut: "07:10 PM", hours: "8h 25m", source: "Mobile", location: "Field", status: "Late", late: true },
    { name: "Rohan Desai", emp: "EMP-0234", dept: "Engineering", checkIn: "08:50 AM", checkOut: "08:30 PM", hours: "11h 40m", source: "Biometric", location: "HQ - Mumbai", status: "Present", late: false },
    { name: "Sneha Rao", emp: "EMP-0145", dept: "Marketing", checkIn: "09:15 AM", checkOut: "06:00 PM", hours: "8h 45m", source: "QR Code", location: "HQ - Delhi", status: "Present", late: false },
    { name: "Amit Kumar", emp: "EMP-0723", dept: "Operations", checkIn: "09:52 AM", checkOut: "05:30 PM", hours: "7h 38m", source: "Biometric", location: "HQ - Mumbai", status: "Late", late: true },
    { name: "Kavya Reddy", emp: "EMP-0312", dept: "Finance", checkIn: "08:45 AM", checkOut: "06:15 PM", hours: "9h 30m", source: "Mobile", location: "WFH", status: "WFH", late: false },
    { name: "Suresh Patil", emp: "EMP-0889", dept: "Sales", checkIn: "—", checkOut: "—", hours: "—", source: "—", location: "—", status: "Absent", late: false },
    { name: "Anjali Nair", emp: "EMP-0421", dept: "HR", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h 00m", source: "Biometric", location: "HQ - Mumbai", status: "Present", late: false },
    { name: "Deepak Joshi", emp: "EMP-0198", dept: "Engineering", checkIn: "09:05 AM", checkOut: "07:45 PM", hours: "10h 40m", source: "Biometric", location: "HQ - Mumbai", status: "Present", late: false },
    { name: "Neha Verma", emp: "EMP-0556", dept: "Marketing", checkIn: "09:30 AM", checkOut: "06:00 PM", hours: "8h 30m", source: "QR Code", location: "HQ - Delhi", status: "Present", late: false },
];

const STATUS_CFG: Record<string, string> = {
    Present: "bg-[#00E5A0]/10 text-[#00E5A0]",
    Late: "bg-[#FFB800]/10 text-[#FFB800]",
    Absent: "bg-[#FF4444]/10 text-[#FF4444]",
    WFH: "bg-[#0066FF]/10 text-[#0066FF]",
};

const SOURCE_ICONS: Record<string, React.ReactNode> = {
    Biometric: <span className="text-[10px] text-[#445566]">🔒</span>,
    Mobile: <span className="text-[10px] text-[#445566]">📱</span>,
    "QR Code": <span className="text-[10px] text-[#445566]">📷</span>,
    "—": <span className="text-[10px] text-[#445566]">—</span>,
};

export default function DailyLog() {
    const [date, setDate] = useState("2025-03-07");
    const [search, setSearch] = useState("");

    const filtered = LOG_DATA.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) || e.emp.toLowerCase().includes(search.toLowerCase())
    );

    const stats = {
        present: filtered.filter(e => e.status === "Present").length,
        late: filtered.filter(e => e.status === "Late").length,
        absent: filtered.filter(e => e.status === "Absent").length,
        wfh: filtered.filter(e => e.status === "WFH").length,
    };

    const prevDay = () => {
        const d = new Date(date);
        d.setDate(d.getDate() - 1);
        setDate(d.toISOString().split("T")[0]);
    };
    const nextDay = () => {
        const d = new Date(date);
        d.setDate(d.getDate() + 1);
        setDate(d.toISOString().split("T")[0]);
    };

    return (
        <Page
            title="Daily Attendance Log"
            subtitle="Real-time check-in/check-out records for selected date"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Daily Log" }]}
            maxWidth="1400px"
        >

        <div className="p-6 md:p-8 max-w-[1400px] mx-auto text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Daily Attendance Log</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Real-time check-in/check-out records for selected date</p>
                </div>
                <div className="flex gap-3 items-center">
                    {/* Date Nav */}
                    <div className="flex items-center gap-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-3 py-2">
                        <button onClick={prevDay} className="text-[#8899AA] hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)}
                            className="bg-transparent text-sm text-white focus:outline-none" />
                        <button onClick={nextDay} className="text-[#8899AA] hover:text-white"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-sm text-white rounded-xl flex items-center gap-2 hover:bg-[#2A3A4A]">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            {/* Status Summary */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Present", val: stats.present, color: "#00E5A0" },
                    { label: "Late", val: stats.late, color: "#FFB800" },
                    { label: "Absent", val: stats.absent, color: "#FF4444" },
                    { label: "WFH", val: stats.wfh, color: "#0066FF" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-3xl font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative max-w-xs mb-5">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#445566]" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee..."
                    className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
            </div>

            {/* Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                            <tr>
                                <th className="px-5 py-3 text-left">Employee</th>
                                <th className="px-5 py-3 text-left">Department</th>
                                <th className="px-5 py-3 text-center">Check-In</th>
                                <th className="px-5 py-3 text-center">Check-Out</th>
                                <th className="px-5 py-3 text-center">Hours Worked</th>
                                <th className="px-5 py-3 text-center">Source</th>
                                <th className="px-5 py-3 text-left">Location</th>
                                <th className="px-5 py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {filtered.map((row, i) => (
                                <tr key={i} className={`hover:bg-[#1A2A3A]/50 transition-colors ${row.late ? "border-l-2 border-l-[#FFB800]" : row.status === "Absent" ? "border-l-2 border-l-[#FF4444]" : "border-l-2 border-l-transparent"}`}>
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
                                    <td className="px-5 py-3 text-center font-semibold text-white">{row.checkIn}</td>
                                    <td className="px-5 py-3 text-center text-[#8899AA]">{row.checkOut}</td>
                                    <td className="px-5 py-3 text-center text-[#00E5A0] font-semibold">{row.hours}</td>
                                    <td className="px-5 py-3 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            {SOURCE_ICONS[row.source]}
                                            <span className="text-xs text-[#8899AA]">{row.source}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1 text-xs text-[#8899AA]">
                                            {row.location === "WFH" ? <Monitor className="w-3 h-3 text-[#0066FF]" /> : row.location !== "—" ? <MapPin className="w-3 h-3 text-[#445566]" /> : null}
                                            {row.location}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <span className={`text-xs px-2.5 py-0.5 rounded-full ${STATUS_CFG[row.status]}`}>{row.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-5 py-3 border-t border-[#1A2A3A] text-xs text-[#445566]">
                    Showing {filtered.length} of {LOG_DATA.length} employees
                </div>
            </div>
        </div>
    
        </Page>
        );
}
