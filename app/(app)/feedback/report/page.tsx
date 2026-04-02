"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FileText, ChevronRight, Download, Star, TrendingUp, TrendingDown } from "lucide-react";
import ChartWrapper from '@/components/ui/ChartWrapper';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const RADAR_DATA = [
    { subject: "Leadership", self: 4.0, peers: 3.8, manager: 4.2 },
    { subject: "Execution", self: 4.5, peers: 4.3, manager: 4.4 },
    { subject: "Collaboration", self: 4.2, peers: 4.5, manager: 4.3 },
    { subject: "Communication", self: 3.5, peers: 3.7, manager: 3.9 },
    { subject: "Innovation", self: 4.0, peers: 4.1, manager: 4.0 },
];

const BAR_DATA = [
    { category: "Leadership", score: 4.0 },
    { category: "Execution", score: 4.4 },
    { category: "Collaboration", score: 4.3 },
    { category: "Communication", score: 3.7 },
    { category: "Innovation", score: 4.0 },
    { category: "Problem Solving", score: 4.2 },
];

const THEMES = [
    { theme: "Strong Ownership", type: "strength", count: 8, quotes: ["Always follows through", "Takes full accountability"] },
    { theme: "Clear Communication", type: "strength", count: 7, quotes: ["Great at simplifying complex info", "Excellent deck storytelling"] },
    { theme: "Delegation Skills", type: "growth", count: 5, quotes: ["Could trust the team more", "Sometimes micromanages"] },
];

const TABS = ["Radar View", "Bar Comparison", "Qualitative Themes"];

export default function FeedbackReportScreen() {
    const [tab, setTab] = useState(0);

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                            <Link href="/feedback/dashboard" className="hover:text-white">Feedback</Link>
                            <ChevronRight size={12} aria-hidden="true" />
                            <span className="text-white">360° Report</span>
                        </nav>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <FileText className="text-[#0066FF]" size={24} aria-hidden="true" /> 360° Feedback Report
                        </h1>
                        <p className="text-sm text-[#8899AA] mt-1">Priya Mehta · Mid-Year 2025 · 9 Reviewers</p>
                    </div>
                    <button type="button" className="flex items-center gap-2 bg-[#0D1928] border border-[#1A2A3A] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1A2A3A] transition-colors">
                        <Download size={14} aria-hidden="true" /> Export PDF
                    </button>
                </header>

                {/* Summary Row */}
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Overall Score", value: "4.2 / 5", trend: "+0.3", up: true, color: "#00E5A0" },
                        { label: "Peer Rating", value: "4.3 / 5", trend: "+0.2", up: true, color: "#0066FF" },
                        { label: "Manager Rating", value: "4.4 / 5", trend: "+0.5", up: true, color: "#9D00FF" },
                        { label: "Self Score", value: "4.0 / 5", trend: "-0.1", up: false, color: "#FFB800" },
                    ].map(s => (
                        <div key={s.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <dt className="text-xs text-[#8899AA] mb-2">{s.label}</dt>
                            <dd className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</dd>
                            <span className={`flex items-center gap-1 text-xs font-medium ${s.up ? "text-[#00E5A0]" : "text-[#FF4444]"}`}>
                                {s.up ? <TrendingUp size={11} aria-hidden="true" /> : <TrendingDown size={11} aria-hidden="true" />}
                                {s.trend} vs last cycle
                            </span>
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
                            aria-controls={`report-panel-${i}`}
                            id={`report-tab-${i}`}
                            onClick={() => setTab(i)}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === i ? "border-[#0066FF] text-white" : "border-transparent text-[#8899AA] hover:text-white"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div id={`report-panel-${tab}`} role="tabpanel" aria-labelledby={`report-tab-${tab}`}>
                    {tab === 0 && (
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-label="Radar competency view">
                            <h2 className="text-sm font-semibold text-white mb-4">Competency Radar — Self vs Peers vs Manager</h2>
                            <div className="h-72">
                                <ChartWrapper height="h-full">
                                    <RadarChart data={RADAR_DATA}>
                                        <PolarGrid stroke="#1A2A3A" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <Radar dataKey="self" stroke="#FFB800" fill="#FFB800" fillOpacity={0.15} name="Self" />
                                        <Radar dataKey="peers" stroke="#0066FF" fill="#0066FF" fillOpacity={0.15} name="Peers" />
                                        <Radar dataKey="manager" stroke="#00E5A0" fill="#00E5A0" fillOpacity={0.15} name="Manager" />
                                        <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                                    </RadarChart>
                                </ChartWrapper>
                            </div>
                        </section>
                    )}
                    {tab === 1 && (
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-label="Competency bar chart">
                            <h2 className="text-sm font-semibold text-white mb-4">Average Score by Competency</h2>
                            <div className="h-60">
                                <ChartWrapper height="h-full">
                                    <BarChart data={BAR_DATA} barSize={32}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                        <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                        <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} itemStyle={{ color: "#fff", fontSize: 12 }} />
                                        <Bar dataKey="score" fill="#0066FF" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ChartWrapper>
                            </div>
                        </section>
                    )}
                    {tab === 2 && (
                        <ul role="list" className="space-y-4">
                            {THEMES.map(t => (
                                <li key={t.theme} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span
                                            className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                                            style={{
                                                color: t.type === "strength" ? "#00E5A0" : "#FFB800",
                                                borderColor: (t.type === "strength" ? "#00E5A0" : "#FFB800") + "40",
                                                background: (t.type === "strength" ? "#00E5A0" : "#FFB800") + "15",
                                            }}
                                        >
                                            {t.type === "strength" ? "Strength" : "Growth Area"}
                                        </span>
                                        <h3 className="text-base font-semibold text-white">{t.theme}</h3>
                                        <span className="ml-auto text-xs text-[#8899AA]">{t.count} mentions</span>
                                    </div>
                                    <ul role="list" className="space-y-2">
                                        {t.quotes.map((q, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-[#445566] mt-0.5" aria-hidden="true">"</span>
                                                <p className="text-sm text-[#CCDDEE] italic">{q}"</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </main>
    );
}
