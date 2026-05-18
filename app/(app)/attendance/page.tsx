"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Clock, Lock, TrendingDown, RefreshCw, ChevronRight, AlertCircle, BarChart3, Zap, FileText, Edit3 } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import ChartWrapper from "@/components/ui/ChartWrapper";
import { Tooltip as RechartsTooltip } from 'recharts';

const DEPT_DATA = [
    { dept: "Engineering", employees: 320, present: 94.2, wfh: 22, lop: 42, alert: false },
    { dept: "Sales", employees: 180, present: 88.4, wfh: 8, lop: 28, alert: true },
    { dept: "Operations", employees: 172, present: 91.8, wfh: 5, lop: 31, alert: false },
    { dept: "Marketing", employees: 95, present: 96.1, wfh: 35, lop: 8, alert: false },
    { dept: "HR", employees: 42, present: 97.6, wfh: 18, lop: 2, alert: false },
    { dept: "Finance", employees: 38, present: 95.2, wfh: 12, lop: 4, alert: false },
];

const TREND_DATA = [
    { month: "Jun", att: 93, wfh: 18 },
    { month: "Jul", att: 94, wfh: 20 },
    { month: "Aug", att: 92, wfh: 22 },
    { month: "Sep", att: 91, wfh: 21 },
    { month: "Oct", att: 93, wfh: 24 },
    { month: "Nov", att: 91.4, wfh: 25 },
];

const TODAY_PIE = [
    { name: "Present", value: 731, color: "#00E5A0" },
    { name: "WFH", value: 68, color: "#0066FF" },
    { name: "Absent", value: 48, color: "#FF4444" },
    { name: "Leave", value: 45, color: "#9B59B6" },
    { name: "Not In", value: 12, color: "#FFB800" },
];

const LATE_ARRIVALS = [
    { name: "Rahul Patil", dept: "Sales", time: "10:45 AM", late: "1h 15m", avatar: "RP" },
    { name: "Kavya Nair", dept: "Eng", time: "10:22 AM", late: "52m", avatar: "KN" },
    { name: "Amit Sharma", dept: "Ops", time: "10:08 AM", late: "38m", avatar: "AS" },
    { name: "Pooja Iyer", dept: "Mktg", time: "09:48 AM", late: "18m", avatar: "PI" },
    { name: "Suresh Kumar", dept: "Finance", time: "09:38 AM", late: "8m", avatar: "SK" },
];

const QUICK_ACTIONS = [
    { label: "Mark Present", icon: Clock, href: "/attendance/live" },
    { label: "Approve Regularization", icon: Edit3, href: "/attendance/regularize/approve" },
    { label: "Lock Attendance", icon: Lock, href: "/attendance/freeze" },
    { label: "View Anomalies", icon: AlertCircle, href: "/attendance/anomalies" },
    { label: "Generate Report", icon: FileText, href: "/attendance/reports/late-coming" },
    { label: "Bulk Correction", icon: BarChart3, href: "/attendance/bulk-correction" },
];

// Calendar data
const NOV_CELLS: { date: number; type: "weekend" | "holiday" | "future" | "past"; pct?: number; holiday?: string }[] = [
    { date: 1, type: "past", pct: 94 },
    { date: 2, type: "weekend" },
    { date: 3, type: "weekend" },
    { date: 4, type: "past", pct: 96 },
    { date: 5, type: "past", pct: 93 },
    { date: 6, type: "holiday", holiday: "Diwali" },
    { date: 7, type: "past", pct: 88 },
    { date: 8, type: "past", pct: 91 },
    { date: 9, type: "weekend" },
    { date: 10, type: "weekend" },
    { date: 11, type: "past", pct: 92 },
    { date: 12, type: "past", pct: 86 }, // today
    { date: 13, type: "future" },
    { date: 14, type: "future" },
    { date: 15, type: "future" },
    { date: 16, type: "weekend" },
    { date: 17, type: "weekend" },
    { date: 18, type: "future" },
    { date: 19, type: "future" },
    { date: 20, type: "future" },
    { date: 21, type: "future" },
    { date: 22, type: "future" },
    { date: 23, type: "weekend" },
    { date: 24, type: "weekend" },
    { date: 25, type: "future" },
    { date: 26, type: "future" },
    { date: 27, type: "future" },
    { date: 28, type: "future" },
    { date: 29, type: "future" },
    { date: 30, type: "weekend" },
];

function pctColor(pct: number) {
    if (pct >= 95) return { bg: "rgba(0,229,160,0.15)", border: "rgba(0,229,160,0.4)", text: "#00E5A0" };
    if (pct >= 85) return { bg: "rgba(255,184,0,0.15)", border: "rgba(255,184,0,0.4)", text: "#FFB800" };
    return { bg: "rgba(255,68,68,0.15)", border: "rgba(255,68,68,0.4)", text: "#FF4444" };
}

export default function AttendanceDashboard() {
    const [_selectedDept, setSelectedDept] = useState<string | null>(null);
    const today = 12;

    return (
        <Page
            title="Attendance"
            subtitle="TechCorp Solutions • November 2024 • 21 working days"
            breadcrumbs={[{ label: "Attendance" }]}
            maxWidth="1200px"
        >

        <main className="px-6 md:px-8 py-6 md:py-8 max-w-[1200px] mx-auto text-white">
            {/* HEADER */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1 tracking-tight">Attendance</h1>
                    <p className="text-sm text-[#8899AA]">TechCorp Solutions • November 2024 • 21 working days</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <label htmlFor="att-month" className="sr-only">Select month</label>
                    <select id="att-month" className="bg-[#0D1928] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#00E5A0] cursor-pointer">
                        <option>November 2024</option>
                        <option>October 2024</option>
                    </select>
                    <Link href="/attendance/live" className="px-4 py-2 bg-[#1A2A3A] text-sm font-medium text-white rounded-lg hover:bg-[#2A3A4A] flex items-center gap-2 transition-colors">
                        <Clock className="w-4 h-4" aria-hidden="true" /> Mark Attendance
                    </Link>
                    <Link href="/attendance/freeze" className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-lg hover:bg-[#00c98d] flex items-center gap-2 transition-colors">
                        <Lock className="w-4 h-4" aria-hidden="true" /> Lock Attendance
                    </Link>
                </div>
            </header>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {/* Card 1 */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-xs text-[#8899AA] mb-1">Today — 12 Nov 2024</p>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[28px] font-bold text-[#00E5A0]">731</span>
                        <span className="text-sm text-[#8899AA]">Present</span>
                        <span className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse ml-0.5"></span>
                    </div>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#8899AA]">
                        <span className="text-[#FF4444]">● 48 Absent</span>
                        <span className="text-[#FFB800]">● 12 Late</span>
                        <span className="text-[#0066FF]">● 68 WFH</span>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-xs text-[#8899AA] mb-1">Month Avg Attendance</p>
                    <p className="text-[28px] font-bold text-white mb-1">91.4%</p>
                    <p className="text-xs text-[#8899AA] mb-2">Target: 95%</p>
                    <div className="w-full bg-[#1A2A3A] rounded-full h-1.5 mb-1">
                        <div className="bg-[#FFB800] h-1.5 rounded-full" style={{ width: "91.4%" }}></div>
                    </div>
                    <p className="text-xs text-[#FF4444] flex items-center gap-1"><TrendingDown className="w-3 h-3" />−3.6% vs target</p>
                </div>
                {/* Card 3 */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-xs text-[#8899AA] mb-1">LOP Days (Payroll Impact)</p>
                    <p className="text-[28px] font-bold text-[#FF4444] mb-1">115 days</p>
                    <p className="text-xs text-[#8899AA] mb-1">47 employees affected</p>
                    <p className="text-xs text-[#FFB800] mb-2">₹4.82L deduction</p>
                    <Link href="/payroll/lop" className="text-xs text-[#0066FF] flex items-center hover:underline">View LOP Report <ChevronRight className="w-3 h-3" /></Link>
                </div>
                {/* Card 4 */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-xs text-[#8899AA] mb-1">Overtime This Month</p>
                    <p className="text-[28px] font-bold text-[#FFB800] mb-1">280 hrs</p>
                    <p className="text-xs text-[#8899AA] mb-1">64 employees</p>
                    <p className="text-xs text-[#00E5A0] mb-2">₹1.82L payout</p>
                    <Link href="/attendance/overtime" className="text-xs text-[#0066FF] flex items-center hover:underline">View OT Report <ChevronRight className="w-3 h-3" /></Link>
                </div>
                {/* Card 5 */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-xs text-[#8899AA] mb-1">Pending Regularizations</p>
                    <p className="text-[28px] font-bold text-[#FFB800] mb-1">23</p>
                    <p className="text-xs text-[#8899AA] mb-2">Awaiting manager approval</p>
                    <Link href="/attendance/regularize/approve" className="text-xs text-[#0066FF] flex items-center hover:underline">Review All <ChevronRight className="w-3 h-3" /></Link>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT */}
                <div className="flex-1 min-w-0 space-y-6">
                    {/* Heatmap Calendar */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-4">November 2024 Attendance Overview</h2>
                        <div className="grid grid-cols-7 gap-1 text-[11px] text-[#8899AA] text-center mb-1">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <div key={d}>{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {/* Empty first cell (Nov 1 is Friday col 5) - fill Mon-Thu */}
                            {[...Array(4)].map((_, i) => <div key={`empty-${i}`} />)}
                            {NOV_CELLS.map((cell) => {
                                const isToday = cell.date === today;
                                if (cell.type === "weekend") return (
                                    <div key={cell.date} className="rounded-lg bg-[#1A2A3A]/50 aspect-square flex flex-col items-center justify-center">
                                        <span className="text-[11px] text-[#445566]">{cell.date}</span>
                                    </div>
                                );
                                if (cell.type === "holiday") return (
                                    <div key={cell.date} className="rounded-lg bg-[#445566]/20 border border-[#445566]/40 aspect-square flex flex-col items-center justify-center">
                                        <span className="text-xs">🎉</span>
                                        <span className="text-[10px] text-[#8899AA]">{cell.date}</span>
                                    </div>
                                );
                                if (cell.type === "future") return (
                                    <div key={cell.date} className="rounded-lg bg-[#0A1420] border border-[#1A2A3A]/50 aspect-square flex flex-col items-center justify-center">
                                        <span className="text-[11px] text-[#445566]">{cell.date}</span>
                                    </div>
                                );
                                const c = pctColor(cell.pct!);
                                return (
                                    <div key={cell.date} className="rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                                        style={{ background: isToday ? "#00E5A0" : c.bg, border: `1px solid ${isToday ? "#00E5A0" : c.border}` }}>
                                        <span className={`text-[11px] font-medium ${isToday ? "text-[#060B14]" : "text-white"}`}>{cell.date}</span>
                                        <span className={`text-[10px] font-semibold ${isToday ? "text-[#060B14]" : c.text}`}>{cell.pct}%</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-[11px] text-[#8899AA]">
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#00E5A0]/40 inline-block"></span>≥95%</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#FFB800]/40 inline-block"></span>85–94%</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#FF4444]/40 inline-block"></span>&lt;85%</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#1A2A3A]/80 inline-block"></span>Weekend</span>
                        </div>
                    </div>

                    {/* Dept Table */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#1A2A3A]">
                            <h2 className="text-lg font-semibold m-0">Department-wise Attendance — November 2024</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                                    <tr>
                                        <th scope="col" className="px-5 py-3 text-left font-semibold uppercase tracking-wider">Department</th>
                                        <th scope="col" className="px-5 py-3 text-center font-semibold uppercase tracking-wider">Employees</th>
                                        <th scope="col" className="px-5 py-3 text-right font-semibold uppercase tracking-wider">Avg Present %</th>
                                        <th scope="col" className="px-5 py-3 text-right font-semibold uppercase tracking-wider">WFH %</th>
                                        <th scope="col" className="px-5 py-3 text-right font-semibold uppercase tracking-wider">LOP Days</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {DEPT_DATA.map((d, i) => (
                                        <tr key={i}
                                            className={`hover:bg-[#1A2A3A]/50 cursor-pointer transition-colors ${d.alert ? "border-l-2 border-l-[#FFB800] bg-[#FFB800]/5" : "border-l-2 border-l-transparent"}`}
                                            onClick={() => setSelectedDept(d.dept)}>
                                            <td className="px-5 py-3 font-medium flex items-center gap-2">
                                                {d.dept}
                                                {d.alert && <AlertCircle className="w-3.5 h-3.5 text-[#FFB800]" aria-label="Below target attendance" />}
                                            </td>
                                            <td className="px-5 py-3 text-center text-[#8899AA]">{d.employees}</td>
                                            <td className="px-5 py-3 text-right">
                                                <span className={d.alert ? "text-[#FFB800] font-medium" : d.present >= 95 ? "text-[#00E5A0]" : "text-white"}>{d.present}%</span>
                                            </td>
                                            <td className="px-5 py-3 text-right text-[#8899AA]">{d.wfh}%</td>
                                            <td className="px-5 py-3 text-right text-[#8899AA]">{d.lop}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Trend Chart */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-4">6-Month Attendance Trend</h2>
                        <div className="h-[180px]">
                            <ChartWrapper>
                                <ChartWrapper height="h-[300px]">
                                    <LineChart data={TREND_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} />
                                        <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} />
                                        <RechartsTooltip contentStyle={{ backgroundColor: "#060B14", borderColor: "#1A2A3A", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} labelStyle={{ color: "#8899AA" }} />
                                        <Line type="monotone" dataKey="att" stroke="#00E5A0" strokeWidth={2} dot={{ fill: "#00E5A0", r: 3 }} name="Attendance %" />
                                        <Line type="monotone" dataKey="wfh" stroke="#0066FF" strokeWidth={2} strokeDasharray="4 4" dot={false} name="WFH %" />
                                    </LineChart>
                                </ChartWrapper>
                            </ChartWrapper>
                        </div>
                        <div className="flex gap-4 mt-2 text-xs text-[#8899AA]">
                            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-[#00E5A0] inline-block"></span>Attendance %</span>
                            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-[#0066FF] inline-block border-dashed"></span>WFH %</span>
                            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-[#FFB800] inline-block border-dashed"></span>Target 95%</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full lg:w-[408px] shrink-0 space-y-6">
                    {/* Live Today Donut */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2 m-0">
                                Today&apos;s Live Status
                                <span className="text-[10px] bg-[#00E5A0]/20 text-[#00E5A0] px-2 py-0.5 rounded-full font-semibold" aria-label="Live data">LIVE</span>
                            </h2>
                            <button className="text-[#8899AA] hover:text-white transition-colors" aria-label="Refresh attendance data">
                                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="h-[180px]">
                            <ChartWrapper>
                                <ChartWrapper height="h-[300px]">
                                    <PieChart>
                                        <Pie data={TODAY_PIE} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
                                            {TODAY_PIE.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                        </Pie>
                                        <RechartsTooltip contentStyle={{ backgroundColor: "#060B14", borderColor: "#1A2A3A", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
                                    </PieChart>
                                </ChartWrapper>
                            </ChartWrapper>
                        </div>
                        <div className="space-y-2 mt-2">
                            {TODAY_PIE.map((s, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                                        <span className="text-[#8899AA]">{s.name}</span>
                                    </div>
                                    <span className="font-semibold">{s.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-[#1A2A3A] space-y-1.5 text-[11px] text-[#8899AA]">
                            <p>🟢 Ravi Kumar checked in — 09:58 AM</p>
                            <p>🟡 Sneha Patel checked in (late) — 10:12 AM</p>
                            <p>🔵 Arjun marked WFH — 09:05 AM</p>
                        </div>
                    </div>

                    {/* Late Arrivals */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold m-0">Late Arrivals (12)</h2>
                            <Link href="/attendance/late-arrivals" className="text-xs text-[#8899AA] hover:text-white flex items-center">View All <ChevronRight className="w-3 h-3" /></Link>
                        </div>
                        <div className="space-y-3">
                            {LATE_ARRIVALS.map((emp, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{emp.avatar}</div>
                                        <div>
                                            <p className="text-sm font-medium">{emp.name}</p>
                                            <p className="text-[11px] text-[#8899AA]">{emp.dept} • {emp.time}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded-full">{emp.late} late</span>
                                </div>
                            ))}
                        </div>
                        <Link href="/attendance/late-arrivals" className="block text-center text-xs text-[#0066FF] mt-4 hover:underline">View Full Report →</Link>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 m-0"><Zap className="w-4 h-4 text-[#00E5A0]" aria-hidden="true" />Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {QUICK_ACTIONS.map((a, i) => (
                                <Link key={i} href={a.href}
                                    className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-3 flex flex-col items-center gap-2 hover:border-[#00E5A0]/50 hover:bg-[#00E5A0]/5 transition-all group text-center">
                                    <a.icon className="w-5 h-5 text-[#00E5A0]" />
                                    <span className="text-xs text-[#8899AA] group-hover:text-white">{a.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    
        </Page>
        );
}
