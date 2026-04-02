"use client";

import React, { useState } from 'react';
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    Users, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight,
    Calendar, Watch, Coffee, Briefcase, MapPin, Search, Filter
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

export default function AttendanceDashboard() {
    const [period, setPeriod] = useState('Today');

    // Stats
    const stats = [
        { label: "Total Headcount", value: "412", trend: "0", type: "neutral", icon: Users },
        { label: "Present Today", value: "385", trend: "+2.4%", type: "positive", icon: Briefcase },
        { label: "On Leave", value: "15", trend: "-1.2%", type: "positive", icon: Calendar },
        { label: "Late Arrivals", value: "32", trend: "+12.5%", type: "negative", icon: Clock },
    ];

    // Status breakdown for Pie Chart
    const statusData = [
        { name: 'On Time', value: 310, color: '#00E5A0' },
        { name: 'Late (< 15m)', value: 45, color: '#FFB800' },
        { name: 'Late (> 15m)', value: 30, color: '#FF4444' },
        { name: 'Absent', value: 12, color: '#1A2A3A' },
        { name: 'On Leave', value: 15, color: '#0066FF' },
    ];

    // Attendance Trend (Last 7 days)
    const trendData = [
        { day: 'Mon', present: 94, onTime: 85 },
        { day: 'Tue', present: 95, onTime: 88 },
        { day: 'Wed', present: 93, onTime: 82 },
        { day: 'Thu', present: 96, onTime: 90 },
        { day: 'Fri', present: 92, onTime: 75 },
        { day: 'Sat', present: 15, onTime: 12 },
        { day: 'Sun', present: 5, onTime: 4 },
    ];

    // Department wise
    const deptData = [
        { dept: 'Engineering', present: 98, total: 120 },
        { dept: 'Sales', present: 85, total: 95 },
        { dept: 'Marketing', present: 92, total: 40 },
        { dept: 'Operations', present: 95, total: 110 },
        { dept: 'HR & Admin', present: 100, total: 25 },
    ];

    return (
        <main className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Attendance Dashboard</h1>
                        <p className="text-sm text-[#8899AA]">Real-time overview of workforce attendance and punctuality.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-lg p-1 flex" role="group" aria-label="Select period">
                            {['Today', 'This Week', 'This Month'].map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPeriod(p)}
                                    aria-pressed={period === p}
                                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${period === p ? 'bg-[#1A2A3A] text-white' : 'text-[#8899AA] hover:text-white'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                        <button type="button" aria-label="Filter attendance" className="p-2 border border-[#1A2A3A] bg-[#0A1420] rounded-lg hover:bg-[#1A2A3A] transition-colors text-white">
                            <Filter size={16} aria-hidden="true" />
                        </button>
                    </div>
                </header>

                {/* KPI Cards */}
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#2A3A4A] transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-lg bg-[#1A2A3A] flex items-center justify-center" aria-hidden="true">
                                    <stat.icon size={20} className={
                                        stat.type === 'positive' ? 'text-[#00E5A0]' :
                                            stat.type === 'negative' ? 'text-[#FF4444]' : 'text-[#0066FF]'
                                    } />
                                </div>
                                <div className={`flex items-center text-xs font-bold px-2 py-1 rounded bg-[#060B14] ${stat.type === 'positive' ? 'text-[#00E5A0]' :
                                    stat.type === 'negative' ? 'text-[#FF4444]' : 'text-[#8899AA]'
                                    }`} aria-hidden="true">
                                    {stat.type === 'positive' ? <ArrowUpRight size={14} className="mr-1" /> :
                                        stat.type === 'negative' ? <ArrowDownRight size={14} className="mr-1" /> : null}
                                    {stat.trend}
                                </div>
                            </div>
                            <dd className="text-3xl font-black text-white mb-1">{stat.value}</dd>
                            <dt className="text-sm font-medium text-[#8899AA]">{stat.label}</dt>
                        </div>
                    ))}
                </dl>

                {/* Main Charts Row */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Today's Distribution */}
                    <div className="col-span-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-sm font-bold text-white mb-6 flex items-center">
                            <Watch size={16} className="text-[#FFB800] mr-2" aria-hidden="true" />
                            Today&apos;s Status
                        </h2>
                        <div className="h-[220px] relative">
                            <ChartWrapper height="h-[220px]">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%" cy="50%"
                                        innerRadius={65} outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        cursor={{ fill: '#1A2A3A' }}
                                        contentStyle={{ backgroundColor: '#060B14', borderColor: '#2A3A4A', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff', fontSize: '12px' }}
                                    />
                                </PieChart>
                            </ChartWrapper>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-black text-white">93%</span>
                                <span className="text-[10px] text-[#8899AA] font-bold uppercase tracking-wider">Present</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4">
                            {statusData.slice(0, 4).map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center text-[#8899AA]">
                                        <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                        {item.name}
                                    </div>
                                    <span className="font-bold text-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Attendance Trend */}
                    <div className="col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-sm font-bold text-white mb-6">Attendance Trend (%)</h2>
                        <div className="h-[280px]">
                            <ChartWrapper height="h-[280px]">
                                <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorOnTime" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8899AA', fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8899AA', fontSize: 11 }} domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#060B14', borderColor: '#2A3A4A', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff', fontSize: '12px' }}
                                        labelStyle={{ color: '#8899AA', fontSize: '11px', marginBottom: '4px' }}
                                    />
                                    <Area type="monotone" dataKey="present" name="Present %" stroke="#0066FF" strokeWidth={3} fillOpacity={1} fill="url(#colorPresent)" />
                                    <Area type="monotone" dataKey="onTime" name="On Time %" stroke="#00E5A0" strokeWidth={3} fillOpacity={1} fill="url(#colorOnTime)" />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Department Breakdown */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-white">Department Attendance</h3>
                            <button className="text-xs text-[#0066FF] font-semibold hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {deptData.map((dept, i) => {
                                const percentage = Math.round((dept.present / dept.total) * 100);
                                return (
                                    <div key={i}>
                                        <div className="flex justify-between items-end mb-1.5">
                                            <span className="text-sm font-medium text-slate-300">{dept.dept}</span>
                                            <div className="text-xs">
                                                <span className="text-white font-bold">{percentage}%</span>
                                                <span className="text-[#556677] ml-2">({dept.present}/{dept.total})</span>
                                            </div>
                                        </div>
                                        <div
                                            className="h-2 w-full bg-[#060B14] rounded-full overflow-hidden"
                                            role="progressbar"
                                            aria-valuenow={percentage}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${dept.dept} attendance: ${percentage}%`}
                                        >
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${percentage >= 95 ? 'bg-[#00E5A0]' :
                                                    percentage >= 85 ? 'bg-[#0066FF]' : 'bg-[#FFB800]'
                                                    }`}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Items */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6 flex flex-col">
                        <h2 className="text-sm font-bold text-white mb-4">Pending Actions</h2>

                        <div className="flex-1 space-y-3">
                            <div className="p-3 bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-lg flex items-start space-x-3 hover:bg-[#FFB800]/10 cursor-pointer transition-colors">
                                <Clock className="text-[#FFB800] mt-0.5" size={18} aria-hidden="true" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="text-sm font-bold text-[#FFB800]">Regularization Requests</h3>
                                        <span className="bg-[#FFB800] text-[#060B14] text-[10px] font-black px-2 py-0.5 rounded-full">14</span>
                                    </div>
                                    <p className="text-xs text-[#8899AA] mt-1">Require manager or HR approval for missed punches.</p>
                                </div>
                            </div>

                            <div className="p-3 bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-lg flex items-start space-x-3 hover:bg-[#FF4444]/10 cursor-pointer transition-colors">
                                <AlertTriangle className="text-[#FF4444] mt-0.5" size={18} aria-hidden="true" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="text-sm font-bold text-[#FF4444]">Anomalies Detected</h3>
                                        <span className="bg-[#FF4444] text-white text-[10px] font-black px-2 py-0.5 rounded-full">8</span>
                                    </div>
                                    <p className="text-xs text-[#8899AA] mt-1">Fake GPS, short check-ins, or buddy punching alerts.</p>
                                </div>
                            </div>

                            <div className="p-3 bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-lg flex items-start space-x-3 hover:bg-[#0066FF]/10 cursor-pointer transition-colors">
                                <Calendar className="text-[#0066FF] mt-0.5" size={18} aria-hidden="true" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="text-sm font-bold text-[#0066FF]">Shift Roster Conflicts</h3>
                                        <span className="bg-[#0066FF] text-white text-[10px] font-black px-2 py-0.5 rounded-full">3</span>
                                    </div>
                                    <p className="text-xs text-[#8899AA] mt-1">Unassigned shifts or overlapping schedules for next week.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
