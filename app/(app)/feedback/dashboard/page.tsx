"use client";
import React from "react";
import Link from "next/link";
import { MessageSquare, Plus, Clock, Star, Users, CheckCircle2, ChevronRight, BarChart2 } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const KPI = [
    { label: "Pending Requests", value: "3", sub: "2 overdue", icon: Clock, color: "#FF4444" },
    { label: "Received Feedback", value: "12", sub: "This cycle", icon: MessageSquare, color: "#00E5A0" },
    { label: "Avg Rating", value: "4.2", sub: "+0.3 vs last cycle", icon: Star, color: "#FFB800" },
    { label: "Reviewers Coverage", value: "87%", sub: "8 of 9 contributed", icon: Users, color: "#0066FF" },
];

const PENDING = [
    { name: "Ravi Kumar", role: "Engineering Lead", due: "Mar 15", avatar: "RK" },
    { name: "Sneha Rao", role: "Product Manager", due: "Mar 16", avatar: "SR" },
    { name: "Arjun Singh", role: "Marketing Head", due: "Mar 18", avatar: "AS" },
];

const RADAR_DATA = [
    { subject: "Leadership", A: 4.2 },
    { subject: "Execution", A: 4.0 },
    { subject: "Collaboration", A: 4.5 },
    { subject: "Communication", A: 3.8 },
    { subject: "Innovation", A: 4.1 },
    { subject: "Problem Solving", A: 4.3 },
];

export default function FeedbackDashboard() {
    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <MessageSquare className="text-[#9D00FF]" size={24} aria-hidden="true" /> 360° Feedback Dashboard
                        </h1>
                        <p className="text-sm text-[#8899AA] mt-1">Multi-rater feedback hub — Mid-Year cycle · Q1 2025</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/feedback/request" className="flex items-center gap-2 bg-[#0D1928] border border-[#1A2A3A] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1A2A3A] transition-colors">
                            <Plus size={14} aria-hidden="true" /> Request Feedback
                        </Link>
                        <Link href="/feedback/give" className="flex items-center gap-2 bg-[#9D00FF] text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#8300d4] transition-colors">
                            <Star size={14} aria-hidden="true" /> Give Feedback
                        </Link>
                    </div>
                </header>

                {/* KPIs */}
                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {KPI.map(k => (
                        <div key={k.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <dt className="text-xs text-[#8899AA] font-medium">{k.label}</dt>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: k.color + "20" }} aria-hidden="true">
                                    <k.icon size={14} style={{ color: k.color }} />
                                </div>
                            </div>
                            <dd className="text-3xl font-bold text-white mb-1">{k.value}</dd>
                            <p className="text-[11px] text-[#8899AA]">{k.sub}</p>
                        </div>
                    ))}
                </dl>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Pending */}
                    <section className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden" aria-labelledby="pending-heading">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2A3A]">
                            <h2 id="pending-heading" className="text-base font-semibold text-white">Pending Feedback Requests</h2>
                            <Link href="/feedback/give" className="text-xs text-[#9D00FF] hover:underline flex items-center gap-1">
                                Give All <ChevronRight size={12} aria-hidden="true" />
                            </Link>
                        </div>
                        <ul role="list" className="divide-y divide-[#1A2A3A]">
                            {PENDING.map(p => (
                                <li key={p.name} className="flex items-center gap-4 px-6 py-4 hover:bg-[#152336] transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-[#9D00FF]/20 border border-[#9D00FF]/30 flex items-center justify-center text-sm font-bold text-[#9D00FF] shrink-0" aria-hidden="true">
                                        {p.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white">{p.name}</p>
                                        <p className="text-xs text-[#8899AA]">{p.role}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs text-[#FF4444] font-medium mb-1">Due {p.due}</p>
                                        <Link
                                            href={`/feedback/form?for=${p.name}`}
                                            className="text-xs font-bold text-[#9D00FF] border border-[#9D00FF]/30 bg-[#9D00FF]/10 px-3 py-1 rounded-lg hover:bg-[#9D00FF]/20 transition-colors"
                                        >
                                            Give Feedback
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Radar */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="competency-radar-heading">
                        <h2 id="competency-radar-heading" className="text-sm font-semibold text-white mb-1">My Competency Profile</h2>
                        <p className="text-xs text-[#8899AA] mb-4">Based on received 360 feedback</p>
                        <div className="h-52">
                            <ChartWrapper height="h-full">
                                <RadarChart data={RADAR_DATA}>
                                    <PolarGrid stroke="#1A2A3A" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#8899AA", fontSize: 10 }} />
                                    <Radar dataKey="A" stroke="#9D00FF" fill="#9D00FF" fillOpacity={0.2} strokeWidth={2} />
                                    <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} itemStyle={{ color: "#fff", fontSize: 12 }} />
                                </RadarChart>
                            </ChartWrapper>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-[#8899AA]">Avg Score</span>
                            <span className="text-base font-bold text-[#9D00FF]">4.2 / 5</span>
                        </div>
                    </section>
                </div>

                {/* Quick Links */}
                <nav aria-label="360 Feedback navigation">
                    <ul role="list" className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: "View My Report", href: "/feedback/report", icon: BarChart2, color: "#00E5A0" },
                            { label: "Feedback History", href: "/feedback/history", icon: Clock, color: "#0066FF" },
                            { label: "Give Kudos", href: "/feedback/kudos", icon: Star, color: "#FFB800" },
                            { label: "Competency Assessment", href: "/feedback/competency", icon: CheckCircle2, color: "#9D00FF" },
                        ].map(l => (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    className="flex items-center gap-3 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 hover:border-opacity-60 transition-all group"
                                    style={{ borderColor: l.color + "30" } as React.CSSProperties}
                                >
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: l.color + "20" }} aria-hidden="true">
                                        <l.icon size={14} style={{ color: l.color }} />
                                    </div>
                                    <span className="text-sm font-medium text-white">{l.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

            </div>
        </main>
    );
}
