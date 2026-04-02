"use client";

import React, { useState } from "react";
import { Download, AlertTriangle } from "lucide-react";

const LATE_DATA = [
    { name: "Vikram Singh", dept: "Sales", date: "12/11", shift: "09:00", actual: "10:45 AM", lateBy: "1h 45m", freq: 8, pattern: "Habitual", avatar: "VS" },
    { name: "Ravi Kumar", dept: "Ops", date: "12/11", shift: "09:00", actual: "10:22 AM", lateBy: "1h 22m", freq: 6, pattern: "Habitual", avatar: "RK" },
    { name: "Pooja Iyer", dept: "Mktg", date: "12/11", shift: "09:00", actual: "09:48 AM", lateBy: "48m", freq: 4, pattern: "Habitual", avatar: "PI" },
    { name: "Ami Kumar", dept: "Fin", date: "11/11", shift: "09:00", actual: "09:38 AM", lateBy: "38m", freq: 2, pattern: "Occasional", avatar: "AK" },
    { name: "Kavya Reddy", dept: "Eng", date: "11/11", shift: "09:00", actual: "09:22 AM", lateBy: "22m", freq: 1, pattern: "Occasional", avatar: "KR" },
    { name: "Suresh Patil", dept: "Sales", date: "11/11", shift: "09:00", actual: "10:08 AM", lateBy: "1h 8m", freq: 3, pattern: "Occasional", avatar: "SP" },
    { name: "Preet Sharma", dept: "Eng", date: "08/11", shift: "09:00", actual: "09:52 AM", lateBy: "52m", freq: 1, pattern: "Occasional", avatar: "PS" },
];

export default function LateArrivalsReport() {
    const [period, setPeriod] = useState("Month");

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Late Arrivals Report</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Employees arriving after 09:30 AM</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1">
                        {["Today", "Week", "Month", "Custom"].map(p => (
                            <button key={p} onClick={() => setPeriod(p)}
                                className={`px-3 py-1.5 text-xs rounded-lg ${period === p ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>{p}</button>
                        ))}
                    </div>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-sm text-white rounded-lg flex items-center gap-2 hover:bg-[#2A3A4A]"><Download className="w-4 h-4" />Export</button>
                </div>
            </div>

            {/* SUMMARY */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Total Late Arrivals", val: "89", color: "#FFB800" },
                    { label: "Unique Employees", val: "34", color: "#FFFFFF" },
                    { label: "Avg Late By", val: "42 min", color: "#FF4444" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                ))}
            </div>

            {/* AI INSIGHT */}
            <div className="bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
                <span className="text-sm font-medium text-[#0066FF]">🤖 AI Insight:</span>
                <span className="text-sm text-[#8899AA]">Most late arrivals happen on Mondays (38%) and after public holidays. Sales dept avg check-in is 09:52 AM vs target 09:00 AM.</span>
            </div>

            {/* TABLE */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                            <tr>
                                <th className="px-5 py-3 text-left">Employee</th>
                                <th className="px-5 py-3 text-left">Date</th>
                                <th className="px-5 py-3 text-center">Shift Start</th>
                                <th className="px-5 py-3 text-center">Actual In</th>
                                <th className="px-5 py-3 text-center">Late By</th>
                                <th className="px-5 py-3 text-center">Frequency</th>
                                <th className="px-5 py-3 text-center">Pattern</th>
                                <th className="px-5 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {LATE_DATA.map((row, i) => (
                                <tr key={i} className={`hover:bg-[#1A2A3A]/50 transition-colors ${row.pattern === "Habitual" ? "border-l-2 border-l-[#FFB800]" : "border-l-2 border-l-transparent"}`}>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{row.avatar}</div>
                                            <div>
                                                <p className="font-medium">{row.name}</p>
                                                <p className="text-xs text-[#445566]">{row.dept}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-[#8899AA]">{row.date}</td>
                                    <td className="px-5 py-3 text-center text-[#8899AA]">{row.shift} AM</td>
                                    <td className="px-5 py-3 text-center text-[#FFB800]">{row.actual}</td>
                                    <td className="px-5 py-3 text-center font-semibold text-[#FF4444]">{row.lateBy}</td>
                                    <td className="px-5 py-3 text-center text-[#8899AA]">{row.freq}×</td>
                                    <td className="px-5 py-3 text-center">
                                        {row.pattern === "Habitual"
                                            ? <span className="text-xs bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 px-2 py-0.5 rounded-full flex items-center justify-center gap-1 w-fit mx-auto"><AlertTriangle className="w-3 h-3" />Habitual</span>
                                            : <span className="text-xs text-[#8899AA]">Occasional</span>}
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        {row.pattern === "Habitual" && (
                                            <button className="text-xs text-[#FF4444] hover:underline">Send Warning</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
