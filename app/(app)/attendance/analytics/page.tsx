"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, Users, Clock, Download } from "lucide-react";

const DEPT_DATA = [
    { dept: "Engineering", present: 92, absent: 4, wfh: 4, lop: 1, avg: "09:02" },
    { dept: "Sales", present: 78, absent: 12, wfh: 10, lop: 3, avg: "09:48" },
    { dept: "Operations", present: 88, absent: 6, wfh: 6, lop: 2, avg: "08:55" },
    { dept: "Marketing", present: 82, absent: 9, wfh: 9, lop: 2, avg: "09:22" },
    { dept: "Finance", present: 95, absent: 3, wfh: 2, lop: 0, avg: "08:48" },
    { dept: "HR", present: 90, absent: 5, wfh: 5, lop: 1, avg: "09:05" },
];

const MONTHLY_TREND = [
    { month: "Sep", att: 87 }, { month: "Oct", att: 89 }, { month: "Nov", att: 84 },
    { month: "Dec", att: 80 }, { month: "Jan", att: 88 }, { month: "Feb", att: 91 }, { month: "Mar", att: 89 },
];

export default function AttendanceAnalytics() {
    const [period, setPeriod] = useState("Month");

    const maxTrend = Math.max(...MONTHLY_TREND.map(m => m.att));

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Attendance Analytics</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Trends, department breakdown and attendance health metrics</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1">
                        {["Week", "Month", "Quarter", "Year"].map(p => (
                            <button key={p} onClick={() => setPeriod(p)}
                                className={`px-3 py-1.5 text-xs rounded-lg ${period === p ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>{p}</button>
                        ))}
                    </div>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-sm text-white rounded-xl flex items-center gap-2 hover:bg-[#2A3A4A]">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Avg Attendance Rate", val: "88.5%", trend: "+2.1%", up: true, icon: Users },
                    { label: "Avg Check-in Time", val: "09:08 AM", trend: "-4 min", up: true, icon: Clock },
                    { label: "WFH Utilization", val: "22%", trend: "+3%", up: true, icon: TrendingUp },
                    { label: "LOP Days (MTD)", val: "47", trend: "-8 vs last", up: true, icon: TrendingDown },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-[#8899AA]">{k.label}</p>
                            <k.icon className="w-4 h-4 text-[#445566]" />
                        </div>
                        <p className="text-2xl font-bold">{k.val}</p>
                        <p className={`text-xs mt-1 flex items-center gap-1 ${k.up ? "text-[#00E5A0]" : "text-[#FF4444]"}`}>
                            {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {k.trend}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Trend Chart */}
                <div className="col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-6">Attendance Rate Trend (%)</h3>
                    <div className="flex items-end gap-4 h-40">
                        {MONTHLY_TREND.map((m, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-xs text-[#00E5A0] font-semibold">{m.att}%</span>
                                <div className="w-full rounded-t-lg bg-gradient-to-t from-[#00E5A0]/60 to-[#00E5A0]"
                                    style={{ height: `${(m.att / maxTrend) * 120}px` }} />
                                <span className="text-xs text-[#445566]">{m.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Insights */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">🤖 AI Insights</h3>
                    <div className="space-y-3">
                        {[
                            { text: "Sales dept has 12% absenteeism — 3× company average. Recommend HR check-in.", color: "#FF4444" },
                            { text: "Finance shows highest attendance (95%). Recognize top performers this month.", color: "#00E5A0" },
                            { text: "Monday absenteeism is 38% higher than other weekdays across all departments.", color: "#FFB800" },
                            { text: "WFH days correlate with 18% higher productivity score in Engineering.", color: "#0066FF" },
                        ].map((insight, i) => (
                            <div key={i} className="bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3">
                                <p className="text-xs text-[#8899AA]" style={{ borderLeft: `3px solid ${insight.color}`, paddingLeft: "8px" }}>
                                    {insight.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Department Table */}
            <div className="mt-6 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#1A2A3A]">
                    <h3 className="font-semibold">Department-wise Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                            <tr>
                                <th className="px-6 py-3 text-left">Department</th>
                                <th className="px-6 py-3 text-center">Present %</th>
                                <th className="px-6 py-3 text-center">Absent %</th>
                                <th className="px-6 py-3 text-center">WFH %</th>
                                <th className="px-6 py-3 text-center">LOP Days</th>
                                <th className="px-6 py-3 text-center">Avg Check-in</th>
                                <th className="px-6 py-3 text-center">Health</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {DEPT_DATA.map((row, i) => (
                                <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                    <td className="px-6 py-3 font-medium">{row.dept}</td>
                                    <td className="px-6 py-3 text-center text-[#00E5A0] font-semibold">{row.present}%</td>
                                    <td className="px-6 py-3 text-center text-[#FF4444]">{row.absent}%</td>
                                    <td className="px-6 py-3 text-center text-[#0066FF]">{row.wfh}%</td>
                                    <td className="px-6 py-3 text-center text-[#8899AA]">{row.lop}</td>
                                    <td className="px-6 py-3 text-center text-[#8899AA]">{row.avg} AM</td>
                                    <td className="px-6 py-3 text-center">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${row.present >= 90 ? "bg-[#00E5A0]/10 text-[#00E5A0]" : row.present >= 80 ? "bg-[#FFB800]/10 text-[#FFB800]" : "bg-[#FF4444]/10 text-[#FF4444]"}`}>
                                            {row.present >= 90 ? "Excellent" : row.present >= 80 ? "Good" : "Needs Attention"}
                                        </span>
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
