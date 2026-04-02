"use client";
import React from "react";
import NextLink from "next/link";
import { Briefcase, Users, Clock, CheckCircle2, TrendingUp, Calendar, ChevronRight } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from 'recharts';
import { ChartWrapper } from "@/components/ui/chart-wrapper";

const APPLICANT_TREND = [
    { day: "Mon", count: 45 }, { day: "Tue", count: 52 }, { day: "Wed", count: 38 },
    { day: "Thu", count: 65 }, { day: "Fri", count: 48 }, { day: "Sat", count: 20 }, { day: "Sun", count: 15 },
];

const SOURCE_DATA = [
    { name: "LinkedIn", value: 340, color: "#0066FF" },
    { name: "Careers Page", value: 180, color: "#00E5A0" },
    { name: "Referrals", value: 95, color: "#9B59B6" },
    { name: "Indeed", value: 110, color: "#FFB800" },
];

const INTERVIEWS = [
    { id: 1, candidate: "Rahul Sharma", role: "Frontend Engineer", time: "10:30 AM", type: "Technical", interviewer: "Priya N." },
    { id: 2, candidate: "Sneha Gupta", role: "Product Manager", time: "11:45 AM", type: "Culture Fit", interviewer: "Rajesh K." },
    { id: 3, candidate: "Amit Patel", role: "Sales Executive", time: "02:00 PM", type: "Final Round", interviewer: "Neha S." },
];

export default function ATSDashboard() {
    return (
        <main className="px-6 md:px-8 py-6 md:py-8 max-w-[1200px] mx-auto text-white">
            <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                <div>
                    <h1 className="text-3xl font-bold mb-1 tracking-tight">Recruitment Dashboard</h1>
                    <p className="text-sm text-[#8899AA]">Overview of hiring pipeline, jobs, and interviews</p>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl hover:bg-[#243040] transition-colors">Reports</button>
                    <button className="h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-colors">
                        Post a New Job
                    </button>
                </div>
            </header>

            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Open Roles", value: "24", icon: Briefcase, color: "#0066FF", trend: "+3 this week" },
                    { label: "Total Candidates", value: "842", icon: Users, color: "#9B59B6", trend: "+125 this week" },
                    { label: "Avg Time to Hire", value: "18d", icon: Clock, color: "#FFB800", trend: "-2d vs last month" },
                    { label: "Offers Accepted", value: "12", icon: CheckCircle2, color: "#00E5A0", trend: "100% acceptance" },
                ].map(k => (
                    <div key={k.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: k.color + "15" }}>
                                <k.icon size={18} style={{ color: k.color }} aria-hidden="true" />
                            </div>
                            <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-[#1A2A3A] text-[#8899AA]">{k.trend}</span>
                        </div>
                        <dd className="text-2xl font-bold text-white mb-0.5">{k.value}</dd>
                        <dt className="text-xs text-[#8899AA]">{k.label}</dt>
                    </div>
                ))}
            </dl>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                {/* Pipeline Chart */}
                <section className="xl:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="pipeline-chart-heading">
                    <div className="flex items-center justify-between mb-6">
                        <h2 id="pipeline-chart-heading" className="font-semibold text-sm m-0">Applications Received (Last 7 Days)</h2>
                        <span className="text-xs text-[#00E5A0] flex items-center gap-1"><TrendingUp size={12} aria-hidden="true" /> +15%</span>
                    </div>
                    <div className="h-[220px]">
                        <ChartWrapper>
                            <ChartWrapper height="h-full">
                                <AreaChart data={APPLICANT_TREND}>
                                    <defs>
                                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                    <RechartsTooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                                    <Area type="monotone" dataKey="count" stroke="#0066FF" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                </AreaChart>
                            </ChartWrapper>
                        </ChartWrapper>
                    </div>
                </section>

                {/* Sourcing Channel */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col" aria-labelledby="sourcing-heading">
                    <h2 id="sourcing-heading" className="font-semibold text-sm mb-4 m-0">Sourcing Channels</h2>
                    <div className="flex-1 flex flex-col justify-center relative">
                        <div className="h-[160px] mb-4">
                            <ChartWrapper>
                                <ChartWrapper height="h-full">
                                    <PieChart>
                                        <Pie data={SOURCE_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
                                            {SOURCE_DATA.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                                        </Pie>
                                        <RechartsTooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 12 }} />
                                    </PieChart>
                                </ChartWrapper>
                            </ChartWrapper>
                        </div>
                        <div className="space-y-2">
                            {SOURCE_DATA.map(s => (
                                <div key={s.name} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                                        <span className="text-[#8899AA]">{s.name}</span>
                                    </div>
                                    <span className="font-medium">{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Interviews Today */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5" aria-labelledby="interviews-heading">
                    <div className="flex items-center justify-between mb-4">
                        <h2 id="interviews-heading" className="font-semibold text-sm m-0">Interviews Today</h2>
                        <button className="text-xs text-[#0066FF] hover:underline">View Calendar</button>
                    </div>
                    <div className="space-y-3">
                        {INTERVIEWS.map(int => (
                            <div key={int.id} className="p-3 bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex items-center justify-between group cursor-pointer hover:border-[#2A3A4A] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] text-[#8899AA] flex items-center justify-center shrink-0">
                                        <Calendar size={16} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-white">{int.candidate}</p>
                                        <p className="text-[11px] text-[#445566]">{int.role} · {int.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-white">{int.time}</p>
                                    <p className="text-[10px] text-[#445566]">w/ {int.interviewer}</p>
                                </div>
                            </div>
                        ))}
                        {INTERVIEWS.length === 0 && <p className="text-xs text-[#445566] py-4 text-center">No interviews scheduled for today.</p>}
                    </div>
                </section>

                {/* Top Open Roles */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5" aria-labelledby="roles-heading">
                    <div className="flex items-center justify-between mb-4">
                        <h2 id="roles-heading" className="font-semibold text-sm m-0">Active Job Postings</h2>
                        <button className="text-xs text-[#0066FF] hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { role: "Senior Frontend Engineer", dept: "Engineering", count: 45, new: 12 },
                            { role: "Product Marketing Manager", dept: "Marketing", count: 28, new: 5 },
                            { role: "Enterprise Sales Rep", dept: "Sales", count: 62, new: 18 },
                        ].map((job, i) => (
                            <div key={i} className="p-3 bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex items-center justify-between hover:border-[#2A3A4A] cursor-pointer transition-colors">
                                <div>
                                    <p className="font-medium text-sm text-white">{job.role}</p>
                                    <p className="text-[11px] text-[#445566]">{job.dept}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs font-semibold text-white">{job.count} total</p>
                                        <p className="text-[10px] text-[#00E5A0]">+{job.new} new</p>
                                    </div>
                                    <ChevronRight size={14} className="text-[#445566]" aria-hidden="true" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main >
    );
}
