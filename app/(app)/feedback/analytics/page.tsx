"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BarChart2, ChevronRight, Download, TrendingUp, Users, MessageCircle, Star } from "lucide-react";
import ChartWrapper from '@/components/ui/ChartWrapper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const OVERVIEW = [
    { label: "Total Feedbacks", value: "247", icon: MessageCircle, color: "#9D00FF" },
    { label: "Avg Rating", value: "4.1 / 5", icon: Star, color: "#FFB800" },
    { label: "Participation Rate", value: "91%", icon: Users, color: "#00E5A0" },
    { label: "Improvement vs Last Cycle", value: "+0.4", icon: TrendingUp, color: "#0066FF" },
];

const DEPT_BREAKDOWN = [
    { dept: "Eng", avg: 4.3 },
    { dept: "Sales", avg: 3.8 },
    { dept: "Mktg", avg: 4.1 },
    { dept: "Product", avg: 4.0 },
    { dept: "HR", avg: 4.5 },
    { dept: "Ops", avg: 3.9 },
];

const TREND = [
    { cycle: "Q2 2024", avg: 3.6 },
    { cycle: "Q3 2024", avg: 3.8 },
    { cycle: "Q4 2024", avg: 3.9 },
    { cycle: "Q1 2025", avg: 4.1 },
];

const RADAR_DATA = [
    { subject: "Leadership", org: 4.0 },
    { subject: "Execution", org: 4.2 },
    { subject: "Collaboration", org: 4.4 },
    { subject: "Communication", org: 3.8 },
    { subject: "Innovation", org: 3.9 },
];

const TABS = ["Department", "Trend", "Competency"];

export default function FeedbackAnalyticsScreen() {
    const [tab, setTab] = useState(0);

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                            <Link href="/feedback/dashboard" className="hover:text-white">Feedback</Link>
                            <ChevronRight size={12} aria-hidden="true" />
                            <span className="text-white">Analytics</span>
                        </nav>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <BarChart2 className="text-[#9D00FF]" size={24} aria-hidden="true" /> Feedback Analytics
                        </h1>
                        <p className="text-sm text-[#8899AA] mt-1">Organization-wide 360° feedback insights · Mid-Year 2025</p>
                    </div>
                    <button type="button" className="flex items-center gap-2 bg-[#0D1928] border border-[#1A2A3A] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1A2A3A] transition-colors">
                        <Download size={14} aria-hidden="true" /> Export Report
                    </button>
                </header>

                {/* Overview KPIs */}
                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {OVERVIEW.map(o => (
                        <div key={o.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex items-start justify-between mb-2">
                                <dt className="text-xs text-[#8899AA]">{o.label}</dt>
                                <o.icon size={14} style={{ color: o.color }} aria-hidden="true" />
                            </div>
                            <dd className="text-2xl font-bold" style={{ color: o.color }}>{o.value}</dd>
                        </div>
                    ))}
                </dl>

                {/* Tabs */}
                <div className="flex border-b border-[#1A2A3A]" role="tablist" aria-label="Analytics views">
                    {TABS.map((t, i) => (
                        <button
                            key={t}
                            type="button"
                            role="tab"
                            aria-selected={tab === i}
                            aria-controls={`analytics-panel-${i}`}
                            id={`analytics-tab-${i}`}
                            onClick={() => setTab(i)}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === i ? "border-[#9D00FF] text-white" : "border-transparent text-[#8899AA] hover:text-white"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div id={`analytics-panel-${tab}`} role="tabpanel" aria-labelledby={`analytics-tab-${tab}`}>
                    {tab === 0 && (
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-label="Department average ratings chart">
                            <h2 className="text-sm font-semibold text-white mb-4">Average 360 Rating by Department</h2>
                            <div className="h-64">
                                <ChartWrapper height="h-full">
                                    <BarChart data={DEPT_BREAKDOWN} barSize={36}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                        <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <YAxis domain={[3, 5]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} itemStyle={{ color: "#fff", fontSize: 12 }} />
                                        <Bar dataKey="avg" name="Avg Rating" fill="#9D00FF" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ChartWrapper>
                            </div>
                        </section>
                    )}
                    {tab === 1 && (
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-label="Feedback trend over cycles">
                            <h2 className="text-sm font-semibold text-white mb-4">Avg Rating Trend Across Cycles</h2>
                            <div className="h-64">
                                <ChartWrapper height="h-full">
                                    <LineChart data={TREND}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                        <XAxis dataKey="cycle" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <YAxis domain={[3, 5]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} itemStyle={{ color: "#fff", fontSize: 12 }} />
                                        <Line type="monotone" dataKey="avg" name="Avg Rating" stroke="#9D00FF" strokeWidth={2.5} dot={{ fill: "#9D00FF", r: 4 }} />
                                    </LineChart>
                                </ChartWrapper>
                            </div>
                        </section>
                    )}
                    {tab === 2 && (
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-label="Org-wide competency radar">
                            <h2 className="text-sm font-semibold text-white mb-4">Org-Wide Competency Averages</h2>
                            <div className="h-72">
                                <ChartWrapper height="h-full">
                                    <RadarChart data={RADAR_DATA}>
                                        <PolarGrid stroke="#1A2A3A" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <Radar dataKey="org" stroke="#9D00FF" fill="#9D00FF" fillOpacity={0.25} strokeWidth={2} name="Org Avg" />
                                        <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                                    </RadarChart>
                                </ChartWrapper>
                            </div>
                        </section>
                    )}
                </div>

                {/* Top/Bottom table */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden" aria-labelledby="dept-table-heading">
                    <div className="px-6 py-4 border-b border-[#1A2A3A]">
                        <h2 id="dept-table-heading" className="text-base font-semibold text-white">Department Performance Breakdown</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left" aria-label="Department feedback breakdown">
                            <thead>
                                <tr className="border-b border-[#1A2A3A] text-xs text-[#8899AA] uppercase tracking-wider">
                                    <th scope="col" className="px-6 py-3">Department</th>
                                    <th scope="col" className="px-6 py-3 text-right">Responses</th>
                                    <th scope="col" className="px-6 py-3 text-right">Avg Rating</th>
                                    <th scope="col" className="px-6 py-3 text-right">Participation</th>
                                    <th scope="col" className="px-6 py-3 text-right">vs Last Cycle</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {DEPT_BREAKDOWN.map(d => (
                                    <tr key={d.dept} className="hover:bg-[#152336] transition-colors">
                                        <td className="px-6 py-3 font-semibold text-white">{d.dept}</td>
                                        <td className="px-6 py-3 text-right text-[#CCDDEE]">{Math.round(d.avg * 10)}</td>
                                        <td className="px-6 py-3 text-right">
                                            <span className="font-bold" style={{ color: d.avg >= 4.2 ? "#00E5A0" : d.avg >= 3.8 ? "#FFB800" : "#FF4444" }}>{d.avg}</span>
                                        </td>
                                        <td className="px-6 py-3 text-right text-[#CCDDEE]">{Math.round(d.avg * 20)}%</td>
                                        <td className="px-6 py-3 text-right text-[#00E5A0] font-semibold">+{(d.avg - 3.7).toFixed(1)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </main>
    );
}
