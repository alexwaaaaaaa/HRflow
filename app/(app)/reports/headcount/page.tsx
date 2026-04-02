"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    Users, ChevronRight, Download, Filter, TrendingUp, PieChart as PieChartIcon, MapPin
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const DEPT_DATA = [
    { name: 'Engineering', headcount: 145 },
    { name: 'Sales', headcount: 85 },
    { name: 'Marketing', headcount: 40 },
    { name: 'HR & Admin', headcount: 15 },
    { name: 'Finance', headcount: 20 },
];

const GENDER_DATA = [
    { name: 'Male', value: 180 },
    { name: 'Female', value: 115 },
    { name: 'Non-Binary', value: 10 },
];

const TENURE_DATA = [
    { month: 'Jan', value: 285 },
    { month: 'Feb', value: 290 },
    { month: 'Mar', value: 298 },
    { month: 'Apr', value: 305 },
];

const COLORS = ['#00E5FF', '#8B5CF6', '#F59E0B', '#EC4899', '#10B981'];

export default function HeadcountReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Headcount Report</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Users className="w-8 h-8 text-indigo-400" />
                        Headcount Analytics
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Real-time breakdown of employee distribution across dimensions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Total Headcount", value: "305", info: "+7 since last month", color: "text-white" },
                    { label: "Full-Time", value: "280", info: "91.8% of workforce", color: "text-indigo-400" },
                    { label: "Contractors", value: "25", info: "8.2% of workforce", color: "text-amber-500" },
                    { label: "Avg. Tenure", value: "3.2 Yrs", info: "Stable core team", color: "text-emerald-400" }
                ].map((kpi, idx) => (
                    <div key={idx} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-[#8899AA] text-sm font-medium mb-2">{kpi.label}</h3>
                        <div className={`text-3xl font-bold mb-1 ${kpi.color}`}>{kpi.value}</div>
                        <p className="text-xs text-[#8899AA]">{kpi.info}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Department Distribution */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-indigo-400" /> Distribution by Department
                    </h2>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <BarChart data={DEPT_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                <XAxis type="number" stroke="#8899AA" fontSize={12} />
                                <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={12} width={80} />
                                <Tooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Bar dataKey="headcount" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Headcount Trend */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" /> Headcount Growth (YTD)
                    </h2>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <LineChart data={TENURE_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" stroke="#8899AA" fontSize={12} />
                                <YAxis stroke="#8899AA" fontSize={12} domain={['dataMin - 10', 'dataMax + 10']} />
                                <Tooltip contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Line type="monotone" dataKey="value" stroke="#00E5FF" strokeWidth={3} dot={{ r: 4, fill: '#00E5FF', strokeWidth: 2, stroke: '#0B1221' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ChartWrapper>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Diversity/Gender */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-sm font-bold text-white mb-6 text-center uppercase tracking-wider text-[#8899AA]">Gender Diversity</h2>
                    <div className="h-[200px] w-full flex justify-center">
                        <ChartWrapper height="h-full">
                            <PieChart>
                                <Pie data={GENDER_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                                    {GENDER_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                            </PieChart>
                        </ChartWrapper>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                        {GENDER_DATA.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-[#8899AA]">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                {entry.name}: <span className="text-white font-medium">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Table */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center">
                        <h2 className="text-sm font-bold text-white">Location Breakdown</h2>
                        <a href="/reports/headcount" className="text-indigo-400 text-xs hover:underline">View Detailed Grid</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs">
                                <tr>
                                    <th className="p-4 font-medium">Location</th>
                                    <th className="p-4 font-medium text-right">Headcount</th>
                                    <th className="p-4 font-medium text-right">% of Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A] text-sm">
                                <tr className="hover:bg-[#1A2A3A]/30">
                                    <td className="p-4 flex items-center gap-3 text-white"><MapPin className="w-4 h-4 text-[#8899AA]" /> Bengaluru (HQ)</td>
                                    <td className="p-4 text-right">180</td>
                                    <td className="p-4 text-right text-[#8899AA]">59%</td>
                                </tr>
                                <tr className="hover:bg-[#1A2A3A]/30">
                                    <td className="p-4 flex items-center gap-3 text-white"><MapPin className="w-4 h-4 text-[#8899AA]" /> Mumbai</td>
                                    <td className="p-4 text-right">85</td>
                                    <td className="p-4 text-right text-[#8899AA]">28%</td>
                                </tr>
                                <tr className="hover:bg-[#1A2A3A]/30">
                                    <td className="p-4 flex items-center gap-3 text-white"><MapPin className="w-4 h-4 text-[#8899AA]" /> Remote (India)</td>
                                    <td className="p-4 text-right">40</td>
                                    <td className="p-4 text-right text-[#8899AA]">13%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
