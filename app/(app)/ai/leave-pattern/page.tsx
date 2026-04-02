"use client";

import React, { useState } from 'react';
import { Sparkles, Calendar, TrendingUp, AlertTriangle, Users, ArrowRight, Download, Filter, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

const patternData = [
    { month: 'Jul', leave: 1.2, sick: 0.5 }, { month: 'Aug', leave: 1.5, sick: 0.8 },
    { month: 'Sep', leave: 1.8, sick: 1.2 }, { month: 'Oct', leave: 2.4, sick: 1.8 },
    { month: 'Nov', leave: 2.8, sick: 2.4 }, { month: 'Dec', leave: 3.5, sick: 2.1 },
];

const deptLeaves = [
    { name: 'Engineering', count: 145, avg: 4.2 },
    { name: 'Sales', count: 112, avg: 5.8 },
    { name: 'Operations', count: 88, avg: 3.4 },
    { name: 'Marketing', count: 45, avg: 2.8 },
];

export default function LeavePatternAnalysisPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Calendar size={28} className="text-blue-400" /> Leave Pattern AI
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        AI-driven analysis of absenteeism, sick leave trends, and potential burnout indicators across your organization.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Download size={16} className="mr-2" /> Export Report
                    </Button>
                    <Button className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30">
                        View Burnout Risks (18)
                    </Button>
                </div>
            </div>

            {/* Smart Summary */}
            <div className="bg-gradient-to-r from-[#0D1928] to-[#131B2B] border border-blue-500/20 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg shadow-blue-900/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30 shrink-0">
                        <Sparkles size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Kaarya AI Synthesis</h3>
                        <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-3xl">
                            Unplanned absences in the <strong className="text-white">Sales department</strong> have increased by 34% this month, specifically around weekends (Friday/Monday sick leaves). Conversely, 18 employees in Engineering have <strong className="text-amber-400">zero paid time off recorded</strong> in the last 8 months, indicating high burnout risk.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                                <AlertTriangle size={14} /> Sales Unplanned +34%
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-medium border border-amber-500/20">
                                <Users size={14} /> 18 Burnout Risks
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Main Trend Chart */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white font-semibold">Absence Trend Forecast</h3>
                            <p className="text-[#8899AA] text-xs mt-1">Average days per employee across planned vs unplanned leaves</p>
                        </div>
                        <select className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-1.5 outline-none">
                            <option>Last 6 Months</option>
                            <option>Year to Date</option>
                        </select>
                    </div>
                    <div className="h-[280px] w-full mt-4">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <AreaChart data={patternData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorLeave" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorSick" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                    <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="leave" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLeave)" name="Planned Leave" />
                                    <Area type="monotone" dataKey="sick" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorSick)" name="Unplanned/Sick" />
                                </AreaChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>

                {/* Dept Breakdown */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-white font-semibold">Leave by Department</h3>
                        <p className="text-[#8899AA] text-xs mt-1">Total days taken (YTD)</p>
                    </div>
                    <div className="flex-1 min-h-[200px]">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <BarChart layout="vertical" data={deptLeaves} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1A2A3A" />
                                    <XAxis type="number" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} width={80} />
                                    <RechartsTooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px' }} />
                                    <Bar dataKey="count" fill="#3b82f6" barSize={16} radius={[0, 4, 4, 0]} name="Total Leaves Taken" />
                                </BarChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>
            </div>

            {/* Pattern Anomalies Table */}
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-400" /> Detected Anomalies
            </h3>

            {/* Search/Filter for Table */}
            <div className="flex gap-4 mb-4">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-lg flex items-center px-3 py-2 flex-1 md:max-w-xs focus-within:border-blue-500/50 transition-colors">
                    <Search size={16} className="text-[#8899AA]" />
                    <input type="text" placeholder="Search employees..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" />
                </div>
                <Button variant="secondary" className="border-[#1A2A3A] bg-[#0D1928] text-[#8899AA]">
                    <Filter size={16} className="mr-2" /> Filter by Type
                </Button>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Pattern Detected</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Severity</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">AI Recommendation</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {[
                            { id: 'EMP-112', name: 'Karan Mehra', type: 'Friday/Monday Sick Leaves', severity: 'Medium', rec: 'Discuss informally in 1:1' },
                            { id: 'EMP-055', name: 'Priya Desai', type: 'Zero PTO (10 Months)', severity: 'Critical', rec: 'Mandatory 3-day burnout block' },
                            { id: 'EMP-238', name: 'Amit Singh', type: 'Unapproved Overstay', severity: 'Low', rec: 'Automated policy reminder' },
                        ].map((emp, i) => (
                            <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{emp.name}</div>
                                    <div className="text-xs text-[#8899AA]">{emp.id}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{emp.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded text-xs font-medium ${emp.severity === 'Critical' ? 'bg-red-500/10 text-red-400' :
                                            emp.severity === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {emp.severity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{emp.rec}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/ai/leave-pattern/${emp.id}`}>
                                        <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-none text-xs py-1.5 px-3 h-auto">
                                            View Details
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
