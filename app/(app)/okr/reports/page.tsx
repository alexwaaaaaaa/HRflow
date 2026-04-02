"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BarChart2, ChevronRight, Download, Target, TrendingUp, Users } from "lucide-react";
import ChartWrapper from '@/components/ui/ChartWrapper';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, Legend } from 'recharts';

const PROGRESS_TREND = [
    { week: "W1", company: 20, dept: 18, team: 15 },
    { week: "W2", company: 28, dept: 25, team: 22 },
    { week: "W3", company: 38, dept: 35, team: 30 },
    { week: "W4", company: 45, dept: 43, team: 40 },
    { week: "W5", company: 52, dept: 50, team: 47 },
    { week: "W6", company: 60, dept: 58, team: 55 },
    { week: "W7", company: 68, dept: 65, team: 62 },
    { week: "W8", company: 72, dept: 70, team: 68 },
];

const DEPT_DIST = [
    { dept: "Eng", on_track: 5, at_risk: 1, behind: 0 },
    { dept: "Sales", on_track: 3, at_risk: 2, behind: 0 },
    { dept: "Mktg", on_track: 3, at_risk: 1, behind: 0 },
    { dept: "Product", on_track: 1, at_risk: 1, behind: 1 },
    { dept: "HR", on_track: 4, at_risk: 0, behind: 0 },
];

const SUMMARY = [
    { label: "Total OKRs", value: 94, icon: Target, color: "#00E5A0" },
    { label: "On Track", value: "68%", icon: TrendingUp, color: "#00E5A0" },
    { label: "At Risk", value: "20%", icon: BarChart2, color: "#FFB800" },
    { label: "Behind", value: "12%", icon: Users, color: "#FF4444" },
];

const TABS = ["Progress Trend", "Department Breakdown", "Summary"];

export default function OKRReportsScreen() {
    const [tab, setTab] = useState(0);

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                            <Link href="/okr/dashboard" className="hover:text-white transition-colors">OKRs</Link>
                            <ChevronRight size={12} aria-hidden="true" />
                            <span className="text-white">Reports</span>
                        </nav>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <BarChart2 className="text-[#0066FF]" size={24} aria-hidden="true" /> OKR Reports
                        </h1>
                        <p className="text-sm text-[#8899AA] mt-1">Cycle analytics and performance insights · Q1 2025</p>
                    </div>
                    <button type="button" className="flex items-center gap-2 bg-[#0D1928] border border-[#1A2A3A] text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#1A2A3A] transition-colors">
                        <Download size={14} aria-hidden="true" /> Export PDF
                    </button>
                </header>

                {/* KPI Summary */}
                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {SUMMARY.map(s => (
                        <div key={s.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex items-start justify-between mb-2">
                                <dt className="text-xs text-[#8899AA]">{s.label}</dt>
                                <s.icon size={14} style={{ color: s.color }} aria-hidden="true" />
                            </div>
                            <dd className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</dd>
                        </div>
                    ))}
                </dl>

                {/* Tabs */}
                <div className="flex border-b border-[#1A2A3A]" role="tablist" aria-label="Report views">
                    {TABS.map((t, i) => (
                        <button
                            key={t}
                            type="button"
                            role="tab"
                            aria-selected={tab === i}
                            aria-controls={`tabpanel-${i}`}
                            id={`tab-${i}`}
                            onClick={() => setTab(i)}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === i ? "border-[#00E5A0] text-white" : "border-transparent text-[#8899AA] hover:text-white"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Tab panels */}
                <div id={`tabpanel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
                    {tab === 0 && (
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-label="Progress trend chart">
                            <h2 className="text-sm font-semibold text-white mb-4">Weekly Progress Trend</h2>
                            <div className="h-64">
                                <ChartWrapper height="h-full">
                                    <LineChart data={PROGRESS_TREND}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} itemStyle={{ color: "#fff", fontSize: 12 }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                                        <Line type="monotone" dataKey="company" name="Company" stroke="#00E5A0" strokeWidth={2.5} dot={false} />
                                        <Line type="monotone" dataKey="dept" name="Department" stroke="#0066FF" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="team" name="Team" stroke="#9D00FF" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ChartWrapper>
                            </div>
                        </section>
                    )}
                    {tab === 1 && (
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-label="Department breakdown chart">
                            <h2 className="text-sm font-semibold text-white mb-4">OKR Status by Department</h2>
                            <div className="h-64">
                                <ChartWrapper height="h-full">
                                    <BarChart data={DEPT_DIST} barSize={20}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                        <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} itemStyle={{ color: "#fff", fontSize: 12 }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                                        <Bar dataKey="on_track" name="On Track" fill="#00E5A0" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="at_risk" name="At Risk" fill="#FFB800" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="behind" name="Behind" fill="#FF4444" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartWrapper>
                            </div>
                        </section>
                    )}
                    {tab === 2 && (
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-label="OKR summary table">
                            <h2 className="text-sm font-semibold text-white mb-4">OKR Completion Summary</h2>
                            <table className="w-full text-sm text-left" aria-label="OKR summary by department">
                                <thead>
                                    <tr className="border-b border-[#1A2A3A] text-[#8899AA] text-xs uppercase tracking-wider">
                                        <th scope="col" className="py-3">Department</th>
                                        <th scope="col" className="py-3">Total OKRs</th>
                                        <th scope="col" className="py-3">On Track</th>
                                        <th scope="col" className="py-3">At Risk</th>
                                        <th scope="col" className="py-3">Behind</th>
                                        <th scope="col" className="py-3 text-right">Avg %</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {DEPT_DIST.map(d => (
                                        <tr key={d.dept} className="hover:bg-[#152336] transition-colors">
                                            <td className="py-3 font-medium text-white">{d.dept}</td>
                                            <td className="py-3 text-[#CCDDEE]">{d.on_track + d.at_risk + d.behind}</td>
                                            <td className="py-3"><span className="text-[#00E5A0] font-semibold">{d.on_track}</span></td>
                                            <td className="py-3"><span className="text-[#FFB800] font-semibold">{d.at_risk}</span></td>
                                            <td className="py-3"><span className="text-[#FF4444] font-semibold">{d.behind}</span></td>
                                            <td className="py-3 text-right font-bold text-white">
                                                {Math.round((d.on_track / (d.on_track + d.at_risk + d.behind)) * 100)}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    )}
                </div>

            </div>
        </main>
    );
}
