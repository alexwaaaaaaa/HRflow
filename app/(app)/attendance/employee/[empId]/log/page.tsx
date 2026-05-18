"use client";

import Page from "@/components/ui/Page";

import { useState } from "react";
import { ChevronLeft, Printer, Download } from "lucide-react";
import Link from "next/link";

const LOG_DATA = [
    { date: "12 Nov", day: "Tue", punchIn: "09:12 AM", punchOut: "—", hours: "5h 28m", ot: "—", status: "Present", source: "Biometric", today: true },
    { date: "11 Nov", day: "Mon", punchIn: "09:45 AM", punchOut: "06:00 PM", hours: "8h 15m", ot: "—", status: "Late", source: "Mobile", today: false },
    { date: "10 Nov", day: "Sun", punchIn: "—", punchOut: "—", hours: "—", ot: "—", status: "Weekend", source: "—", today: false },
    { date: "09 Nov", day: "Sat", punchIn: "—", punchOut: "—", hours: "—", ot: "—", status: "Weekend", source: "—", today: false },
    { date: "08 Nov", day: "Fri", punchIn: "—", punchOut: "—", hours: "—", ot: "—", status: "Absent", source: "—", today: false },
    { date: "07 Nov", day: "Thu", punchIn: "08:50 AM", punchOut: "08:45 PM", hours: "11h 55m", ot: "2h 55m", status: "Present", source: "Biometric", today: false },
    { date: "06 Nov", day: "Wed", punchIn: "—", punchOut: "—", hours: "—", ot: "—", status: "Holiday", source: "—", today: false },
    { date: "05 Nov", day: "Tue", punchIn: "09:00 AM", punchOut: "06:30 PM", hours: "9h 30m", ot: "30m", status: "Present", source: "QR Code", today: false },
    { date: "04 Nov", day: "Mon", punchIn: "09:05 AM", punchOut: "06:00 PM", hours: "8h 55m", ot: "—", status: "WFH", source: "Web", today: false },
    { date: "01 Nov", day: "Fri", punchIn: "09:02 AM", punchOut: "06:10 PM", hours: "9h 08m", ot: "—", status: "Present", source: "Biometric", today: false },
];

const STATUS_CFG: Record<string, { cls: string; label: string }> = {
    Present: { cls: "bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30", label: "✅ Present" },
    Late: { cls: "bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30", label: "🟡 Late" },
    Absent: { cls: "bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30", label: "❌ Absent" },
    WFH: { cls: "bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30", label: "🔵 WFH" },
    Weekend: { cls: "bg-[#1A2A3A] text-[#445566]", label: "🏖 Weekend" },
    Holiday: { cls: "bg-[#445566]/20 text-[#8899AA]", label: "🎉 Holiday" },
};

const ROW_BG: Record<string, string> = {
    Absent: "bg-[#FF4444]/5",
    Late: "bg-[#FFB800]/5",
    WFH: "bg-[#0066FF]/5",
    Weekend: "bg-[#1A2A3A]/30",
    Holiday: "bg-[#445566]/10",
};

export default function EmployeeAttendanceLog(_props: { params: { empId: string } }) {
    const [activeMonth, setActiveMonth] = useState("Nov 2024");
    const MONTHS = ["Sep 2024", "Oct 2024", "Nov 2024"];

    const summary = { present: 20, late: 3, wfh: 6, ot: 8.5 };

    return (
        <Page
            title="Rahul Kumar Sharma"
            subtitle="EMP-0848 • Engineering •"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Employee", href: "/attendance/employee" }, { label: "Log" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            {/* BACK + HEADER */}
            <Link href="/attendance/live" className="flex items-center gap-2 text-sm text-[#8899AA] hover:text-white mb-5 w-fit">
                <ChevronLeft className="w-4 h-4" /> Back to Live Attendance
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#1A2A3A] flex items-center justify-center text-lg font-bold text-[#8899AA]">RS</div>
                    <div>
                        <h1 className="text-2xl font-bold">Rahul Kumar Sharma</h1>
                        <p className="text-sm text-[#8899AA]">EMP-0848 • Engineering • <span className="bg-[#0066FF]/10 text-[#0066FF] px-2 py-0.5 rounded-full text-xs">Hybrid (3 days office)</span></p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-[#1A2A3A] rounded-lg hover:bg-[#2A3A4A]"><Printer className="w-4 h-4 text-[#8899AA]" /></button>
                    <button className="p-2 bg-[#1A2A3A] rounded-lg hover:bg-[#2A3A4A]"><Download className="w-4 h-4 text-[#8899AA]" /></button>
                </div>
            </div>

            {/* MONTH TABS */}
            <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1 w-fit mb-6">
                {MONTHS.map(m => (
                    <button key={m} onClick={() => setActiveMonth(m)}
                        className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${activeMonth === m ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>
                        {m}
                    </button>
                ))}
            </div>

            {/* SUMMARY */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Present", val: `${summary.present}/21`, color: "#00E5A0" },
                    { label: "Late", val: summary.late, color: "#FFB800" },
                    { label: "WFH Days", val: summary.wfh, color: "#0066FF" },
                    { label: "OT Hours", val: `${summary.ot}h`, color: "#FFB800" },
                ].map((s, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4">
                        <p className="text-xs text-[#8899AA] mb-1">{s.label}</p>
                        <p className="text-2xl font-bold" style={{ color: s.color }}>{s.val}</p>
                    </div>
                ))}
            </div>

            {/* LOG TABLE */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#1A2A3A] flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Attendance Log — {activeMonth}</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                            <tr>
                                <th className="px-5 py-3 text-left font-medium">Date</th>
                                <th className="px-5 py-3 text-left font-medium">Day</th>
                                <th className="px-5 py-3 text-left font-medium">Punch In</th>
                                <th className="px-5 py-3 text-left font-medium">Punch Out</th>
                                <th className="px-5 py-3 text-left font-medium">Hours</th>
                                <th className="px-5 py-3 text-left font-medium">OT</th>
                                <th className="px-5 py-3 text-left font-medium">Status</th>
                                <th className="px-5 py-3 text-left font-medium">Source</th>
                                <th className="px-5 py-3 text-left font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {LOG_DATA.map((row, i) => {
                                const cfg = STATUS_CFG[row.status];
                                return (
                                    <tr key={i} className={`${ROW_BG[row.status] || ""} hover:bg-[#1A2A3A]/40 transition-colors ${row.today ? "border-l-2 border-l-[#00E5A0]" : "border-l-2 border-l-transparent"}`}>
                                        <td className="px-5 py-3 font-medium">{row.date} {row.today && <span className="text-[10px] bg-[#00E5A0]/20 text-[#00E5A0] px-1.5 py-0.5 rounded ml-1">Today</span>}</td>
                                        <td className="px-5 py-3 text-[#8899AA]">{row.day}</td>
                                        <td className="px-5 py-3">
                                            <span className={row.status === "Late" ? "text-[#FFB800]" : row.status === "WFH" ? "text-[#0066FF]" : "text-[#00E5A0]"}>{row.punchIn}</span>
                                        </td>
                                        <td className="px-5 py-3 text-[#8899AA]">{row.punchOut}</td>
                                        <td className="px-5 py-3 font-semibold">{row.hours}</td>
                                        <td className="px-5 py-3">
                                            {row.ot !== "—" ? <span className="text-[#FFB800] font-medium">⭐ {row.ot}</span> : <span className="text-[#445566]">—</span>}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.cls}`}>{cfg.label}</span>
                                        </td>
                                        <td className="px-5 py-3">
                                            {row.source !== "—" && <span className="text-xs text-[#8899AA]">{row.source}</span>}
                                        </td>
                                        <td className="px-5 py-3">
                                            {(row.status === "Absent" || row.status === "Late") && (
                                                <Link href="/attendance/regularize/new" className="text-xs text-[#0066FF] hover:underline">Regularize</Link>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        </Page>
        );
}
