"use client";
import React, { useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Filter, Calendar, Users, Briefcase, FileText } from "lucide-react";
import ChartWrapper from '@/components/ui/ChartWrapper';

const metrics = [
    { title: "Average Time to Fill", value: "32 Days", change: "-4 Days", trend: "down", color: "#00E5A0" },
    { title: "Average Time to Hire", value: "24 Days", change: "-2 Days", trend: "down", color: "#00E5A0" },
    { title: "Candidate Quality Score", value: "9.2/10", change: "+0.4", trend: "up", color: "#00E5A0" },
    { title: "Cost Per Hire", value: "₹21,000", change: "+₹1.5k", trend: "up", color: "#FF4444" },
];

const funnelData = [
    { stage: "Applied", candidates: 1240 },
    { stage: "Screening", candidates: 850 },
    { stage: "First Round", candidates: 320 },
    { stage: "Final Round", candidates: 85 },
    { stage: "Offered", candidates: 32 },
    { stage: "Hired", candidates: 28 },
];

const timeInStageData = [
    { name: "Sourcing", engineering: 8, sales: 5, marketing: 6 },
    { name: "Screening", engineering: 3, sales: 2, marketing: 2 },
    { name: "Interviews", engineering: 14, sales: 8, marketing: 10 },
    { name: "Offer", engineering: 5, sales: 3, marketing: 4 },
];

export default function ATSAnalyticsDeepDive() {
    return (
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Recruitment Analytics Deep Dive</h1>
                    <p className="text-sm text-[#8899AA]">Interactive visual analysis of the hiring pipeline, bottlenecks, and costs.</p>
                </div>
                <div className="flex gap-3">
                    <select className="h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 text-sm font-medium text-white focus:outline-none">
                        <option>Q1 2025</option><option>Q4 2024</option><option>YTD</option>
                    </select>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl relative overflow-hidden group">
                        <p className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-2">{m.title}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-bold text-white">{m.value}</h3>
                            <span className="text-xs font-bold px-2 py-1 rounded" style={{ color: m.color, backgroundColor: m.color + "15" }}>
                                {m.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Funnel Chart */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg">Recruitment Funnel (Drop-off Analysis)</h3>
                        <button className="text-xs px-3 py-1.5 bg-[#1A2A3A] text-white rounded-lg hover:bg-[#2A3A4A] transition-colors">By Department</button>
                    </div>
                    <div className="h-[300px]">
                        <ChartWrapper height="h-full">
                            <BarChart data={funnelData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: '#8899AA', fontSize: 12, fontWeight: 500 }} width={90} />
                                <Tooltip cursor={{ fill: '#1A2A3A', opacity: 0.4 }} contentStyle={{ backgroundColor: '#060B14', borderColor: '#1A2A3A', borderRadius: '12px', fontSize: '12px' }} itemStyle={{ color: '#0066FF', fontWeight: 'bold' }} />
                                <Bar dataKey="candidates" fill="#0066FF" radius={[0, 4, 4, 0]} barSize={24} minPointSize={2}>
                                    {funnelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 5 ? '#00E5A0' : '#0066FF'} fillOpacity={1 - (index * 0.1)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartWrapper>
                    </div>
                    <div className="mt-4 flex gap-4 text-xs">
                        <div className="bg-[#1A2A3A]/50 p-3 rounded-xl flex-1 border border-[#2A3A4A]">
                            <p className="text-[#8899AA] mb-1">Screening to Interview Ratio</p>
                            <p className="font-bold text-white text-lg">37.6% <span className="text-[#FF4444] text-[10px] ml-1">↓ Warning</span></p>
                        </div>
                        <div className="bg-[#1A2A3A]/50 p-3 rounded-xl flex-1 border border-[#2A3A4A]">
                            <p className="text-[#8899AA] mb-1">Offer Acceptance Rate</p>
                            <p className="font-bold text-[#00E5A0] text-lg">87.5%</p>
                        </div>
                    </div>
                </div>

                {/* Sourcing Effectiveness */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-6">Sourcing Mix vs Quality</h3>
                    <div className="space-y-5">
                        {[
                            { name: "Employee Referrals", vol: "15%", qual: 9.5, clr: "#9B59B6" },
                            { name: "LinkedIn Promoted", vol: "42%", qual: 8.2, clr: "#0066FF" },
                            { name: "Direct Careers Page", vol: "28%", qual: 7.8, clr: "#00E5A0" },
                            { name: "External Agencies", vol: "10%", qual: 8.5, clr: "#FFB800" },
                            { name: "Others (Job Boards)", vol: "5%", qual: 6.5, clr: "#445566" },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs mb-1.5 font-medium">
                                    <span className="text-white">{s.name} <span className="text-[#8899AA]">({s.vol} volume)</span></span>
                                    <span style={{ color: s.clr }}>Avg Quality: {s.qual}</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${s.qual * 10}%`, backgroundColor: s.clr }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 bg-[#0A1420] border border-[#FFB800]/20 p-4 rounded-xl flex gap-3">
                        <FileText size={20} className="text-[#FFB800] shrink-0" />
                        <p className="text-xs text-[#8899AA] leading-relaxed">
                            <strong className="text-white">Insight:</strong> Referrals generate lower volume but highest candidate quality. Consider increasing the referral bonus to boost volume in this channel.
                        </p>
                    </div>
                </div>
            </div>

            {/* Time in Stage Bar Chart */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Average Time in Stage (Days) by Dept</h3>
                </div>
                <div className="h-[250px]">
                    <ChartWrapper height="h-full">
                        <BarChart data={timeInStageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                            <XAxis dataKey="name" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: '#1A2A3A', opacity: 0.1 }} contentStyle={{ backgroundColor: '#060B14', borderColor: '#1A2A3A', borderRadius: '12px', fontSize: '12px' }} />
                            <Bar dataKey="engineering" name="Engineering" fill="#0066FF" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="sales" name="Sales" fill="#00E5A0" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="marketing" name="Marketing" fill="#9B59B6" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ChartWrapper>
                </div>
            </div>

        </div>
    );
}
