"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import {
    BarChart2, Download, TrendingUp, Users, Star, Gift, Filter, Calendar
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const MONTHLY_RECOGNITION = [
    { name: 'Jan', received: 45, given: 40 },
    { name: 'Feb', received: 52, given: 48 },
    { name: 'Mar', received: 68, given: 65 },
    { name: 'Apr', received: 55, given: 50 },
    { name: 'May', received: 85, given: 80 },
    { name: 'Jun', received: 72, given: 70 },
    { name: 'Jul', received: 95, given: 90 },
];

const BADGE_DISTRIBUTION = [
    { name: 'Team Player', value: 35, color: '#33E6FF' },
    { name: 'Innovator', value: 25, color: '#FFB020' },
    { name: 'Problem Solver', value: 20, color: '#9D00FF' },
    { name: 'Customer Hero', value: 15, color: '#FF4444' },
    { name: 'Above & Beyond', value: 5, color: '#00E5A0' },
];

const TOP_DEPARTMENTS = [
    { rank: 1, dept: "Engineering", score: 98 },
    { rank: 2, dept: "Sales", score: 85 },
    { rank: 3, dept: "Marketing", score: 72 },
    { rank: 4, dept: "Customer Success", score: 65 },
    { rank: 5, dept: "Product", score: 58 },
];

export default function RRReportsScreen() {
    const [dateRange, _setDateRange] = useState('Last 6 Months');

    return (
        <Page
            title="Recognition & Rewards Analytics"
            subtitle="Deep dive into user engagement, recognition trends, and budget utilization."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Rr", href: "/engagement/rr" }, { label: "Reports" }]}
            maxWidth="1400px"
        >

        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <BarChart2 size={32} className="text-[#33E6FF]" /> Recognition & Rewards Analytics
                    </h1>
                    <p className="text-[#8899AA]">Deep dive into user engagement, recognition trends, and budget utilization.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Calendar size={16} /> {dateRange}
                    </button>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Download size={16} /> Export PDF
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users size={64} className="text-[#33E6FF]" />
                    </div>
                    <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Participation Rate</p>
                    <div className="flex items-end gap-3 relative z-10">
                        <h3 className="text-4xl font-black text-white">82%</h3>
                        <span className="flex items-center text-[#00E5A0] text-sm font-bold mb-1"><TrendingUp size={14} className="mr-1" /> +5%</span>
                    </div>
                    <p className="text-[#8899AA] text-xs mt-3 relative z-10">Active users giving/receiving pts</p>
                </div>

                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Star size={64} className="text-[#FFB020]" />
                    </div>
                    <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Total Recognitions</p>
                    <div className="flex items-end gap-3 relative z-10">
                        <h3 className="text-4xl font-black text-white">1,452</h3>
                        <span className="flex items-center text-[#00E5A0] text-sm font-bold mb-1"><TrendingUp size={14} className="mr-1" /> +12%</span>
                    </div>
                    <p className="text-[#8899AA] text-xs mt-3 relative z-10">Badges & appreciation given</p>
                </div>

                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Gift size={64} className="text-[#9D00FF]" />
                    </div>
                    <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Points Redeemed</p>
                    <div className="flex items-end gap-3 relative z-10">
                        <h3 className="text-4xl font-black text-white">125k</h3>
                        <span className="flex items-center text-[#FF4444] text-sm font-bold mb-1"><TrendingUp size={14} className="mr-1" /> -2%</span>
                    </div>
                    <p className="text-[#8899AA] text-xs mt-3 relative z-10">Total points spent in catalog</p>
                </div>

                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BarChart2 size={64} className="text-[#00E5A0]" />
                    </div>
                    <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Points Liquidity</p>
                    <div className="flex items-end gap-3 relative z-10">
                        <h3 className="text-4xl font-black text-white">4.2m</h3>
                    </div>
                    <p className="text-[#8899AA] text-xs mt-3 relative z-10">Unspent points in ecosystem</p>
                </div>
            </div>

            {/* Main Charts area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Trend Chart */}
                <div className="col-span-1 lg:col-span-2 bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-lg">Recognition Trend over Time</h3>
                        <button className="text-[#8899AA] hover:text-white p-2 border border-[#2A3A4A] rounded-lg bg-[#152336]"><Filter size={16} /></button>
                    </div>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <LineChart data={MONTHLY_RECOGNITION} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4A" vertical={false} />
                                <XAxis dataKey="name" stroke="#8899AA" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#8899AA" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#152336', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                                />
                                <Line type="monotone" dataKey="received" stroke="#33E6FF" strokeWidth={3} dot={{ r: 4, fill: '#33E6FF', strokeWidth: 2, stroke: '#0F1C2E' }} activeDot={{ r: 6, strokeWidth: 0 }} name="Recognitions Received" />
                                <Line type="monotone" dataKey="given" stroke="#FFB020" strokeWidth={3} dot={{ r: 4, fill: '#FFB020', strokeWidth: 2, stroke: '#0F1C2E' }} activeDot={{ r: 6, strokeWidth: 0 }} name="Recognitions Given" />
                            </LineChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="col-span-1 bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                    <h3 className="text-white font-bold text-lg mb-6">Badge Distribution</h3>
                    <div className="h-[240px] w-full relative">
                        <ChartWrapper height="h-full">
                            <PieChart>
                                <Pie
                                    data={BADGE_DISTRIBUTION}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {BADGE_DISTRIBUTION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#152336', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                                    formatter={(value: any, name: any, _props: any) => [`${value}%`, name]}
                                />
                            </PieChart>
                        </ChartWrapper>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-black text-white">5</span>
                            <span className="text-[10px] text-[#8899AA] font-bold uppercase tracking-wider">Badges</span>
                        </div>
                    </div>

                    {/* Custom Legend */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {BADGE_DISTRIBUTION.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-xs text-[#CCDDEE] truncate">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Top Departments */}
                <div className="col-span-1 bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-lg">Top Departments</h3>
                        <span className="text-xs text-[#8899AA] font-bold">By Engagement Score</span>
                    </div>
                    <div className="space-y-4">
                        {TOP_DEPARTMENTS.map(dept => (
                            <div key={dept.rank} className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${dept.rank === 1 ? 'bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/30' : dept.rank === 2 ? 'bg-[#8899AA]/20 text-[#8899AA] border border-[#8899AA]/30' : dept.rank === 3 ? 'bg-[#CD7F32]/20 text-[#CD7F32] border border-[#CD7F32]/30' : 'bg-[#152336] text-[#445566]'}`}>
                                    #{dept.rank}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-bold text-white">{dept.dept}</span>
                                        <span className="text-sm font-bold text-[#33E6FF]">{dept.score}</span>
                                    </div>
                                    <div className="h-2 bg-[#152336] rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-[#33E6FF] to-blue-500 rounded-full" style={{ width: `${dept.score}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Budget Utilization Details */}
                <div className="col-span-1 lg:col-span-2 bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                    <h3 className="text-white font-bold text-lg mb-6">Budget vs Reality</h3>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#2A3A4A]">
                                <th className="pb-3 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Program</th>
                                <th className="pb-3 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Allocated Budget</th>
                                <th className="pb-3 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Used</th>
                                <th className="pb-3 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Remaining</th>
                                <th className="pb-3 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { name: "Spot Awards Q4", allocated: 50000, used: 42500, status: "warning" },
                                { name: "Peer Nominations", allocated: 120000, used: 85000, status: "good" },
                                { name: "Work Anniversaries", allocated: 80000, used: 78000, status: "critical" },
                                { name: "Birthdays", allocated: 25000, used: 12500, status: "good" },
                            ].map((prog, i) => (
                                <tr key={i} className="hover:bg-[#152336] transition-colors">
                                    <td className="py-4 text-sm font-bold text-white">{prog.name}</td>
                                    <td className="py-4 text-sm font-bold text-[#8899AA] text-right font-mono">{prog.allocated.toLocaleString()}</td>
                                    <td className="py-4 text-sm font-bold text-white text-right font-mono">{prog.used.toLocaleString()}</td>
                                    <td className="py-4 text-sm font-bold text-[#33E6FF] text-right font-mono">{(prog.allocated - prog.used).toLocaleString()}</td>
                                    <td className="py-4 text-center">
                                        <div className={`w-2.5 h-2.5 rounded-full mx-auto ${prog.status === 'good' ? 'bg-[#00E5A0] shadow-[0_0_10px_#00E5A0]' : prog.status === 'warning' ? 'bg-[#FFB020] shadow-[0_0_10px_#FFB020]' : 'bg-[#FF4444] shadow-[0_0_10px_#FF4444]'}`}></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
