"use client";
import React, { useState } from "react";
import {
    Users, CheckCircle2, Clock, AlertCircle, TrendingUp, TrendingDown,
    Calendar, FileText, Briefcase, ChevronRight, MoreVertical,
    GraduationCap, Gift, Zap
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

// Mock Data
const KPI_DATA = [
    { id: 1, title: "Active Onboardings", value: "42", trend: "+12%", trendLabel: "vs last month", icon: Users, color: "#00E5A0" },
    { id: 2, title: "Avg Time to Complete", value: "12 Days", trend: "-2 Days", trendLabel: "vs last month", icon: Clock, color: "#33E6FF" },
    { id: 3, title: "Tasks Overdue", value: "18", trend: "+5", trendLabel: "vs last week", icon: AlertCircle, color: "#FF4444" },
    { id: 4, title: "Feedback Score", value: "4.8/5", trend: "+0.2", trendLabel: "vs last month", icon: Zap, color: "#FFB020" },
];

const ONBOARDING_TREND = [
    { name: 'Week 1', completed: 15, dropoff: 2 },
    { name: 'Week 2', completed: 22, dropoff: 1 },
    { name: 'Week 3', completed: 18, dropoff: 0 },
    { name: 'Week 4', completed: 35, dropoff: 3 },
    { name: 'Week 5', completed: 28, dropoff: 1 },
];

const DEPARTMENT_DATA = [
    { name: 'Engineering', active: 15, color: '#00E5A0' },
    { name: 'Sales', active: 12, color: '#33E6FF' },
    { name: 'Marketing', active: 8, color: '#9D00FF' },
    { name: 'Design', active: 7, color: '#FFB020' },
];

const NEW_JOINERS = [
    { id: 1, name: "Sneha Rao", role: "Product Designer", dept: "Design", date: "Today", progress: 85, avatar: "SR" },
    { id: 2, name: "Arjun Mehta", role: "Frontend Dev", dept: "Engineering", date: "Tomorrow", progress: 60, avatar: "AM" },
    { id: 3, name: "Priya Singh", role: "Marketing Mngr", dept: "Marketing", date: "15 Mar", progress: 10, avatar: "PS" },
    { id: 4, name: "Kabir Das", role: "Sales Executive", dept: "Sales", date: "16 Mar", progress: 40, avatar: "KD" },
];

const PENDING_TASKS = [
    { id: 1, task: "IT Asset Provisioning for Arjun", assignee: "IT Team", due: "Today", priority: "High" },
    { id: 2, title: "Background Check pending", assignee: "HR Ops", due: "Overdue", priority: "Critical" },
    { id: 3, title: "Assign Buddy for Priya", assignee: "Marketing Head", due: "14 Mar", priority: "Medium" },
];

export default function OnboardingDashboard() {
    return (
        <main className="px-6 py-6 max-w-[1600px] mx-auto space-y-6 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Onboarding Dashboard</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Overview of new joiners, task progression, and experience metrics</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors text-sm font-medium">
                        Download Report
                    </button>
                    <button className="px-4 py-2 bg-[#00E5A0] text-[#0A1420] rounded-lg hover:bg-[#00c98d] transition-colors text-sm font-semibold flex items-center gap-2">
                        <Users size={16} aria-hidden="true" /> Add Joiner
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPI_DATA.map((kpi) => (
                    <div key={kpi.id} className="p-5 rounded-xl bg-[#0F1C2E] border border-[#1A2A3A]">
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center bg-opacity-10"
                                style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}
                            >
                                <kpi.icon size={20} aria-hidden="true" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${kpi.trend.startsWith('+') && kpi.title !== "Tasks Overdue" ? 'text-[#00E5A0] bg-[#00E5A0]/10' :
                                kpi.trend.startsWith('-') && kpi.title === "Avg Time to Complete" ? 'text-[#00E5A0] bg-[#00E5A0]/10' :
                                    'text-[#FF4444] bg-[#FF4444]/10'
                                }`}>
                                {kpi.trend.startsWith('+') ? <TrendingUp size={12} aria-hidden="true" /> : <TrendingDown size={12} aria-hidden="true" />}
                                {kpi.trend.replace(/[+-]/, '')}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{kpi.value}</h3>
                            <p className="text-[#8899AA] text-sm font-medium mt-1">{kpi.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 p-6 rounded-xl bg-[#0F1C2E] border border-[#1A2A3A]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white m-0">Onboarding Completion Trends</h2>
                        <label htmlFor="trend-period" className="sr-only">Select period</label>
                        <select id="trend-period" className="bg-[#1A2A3A] border border-[#2A3A4A] text-sm text-[#8899AA] rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer">
                            <option>Last 5 Weeks</option>
                            <option>Last 3 Months</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <AreaChart data={ONBOARDING_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorDropoff" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#FF4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="name" stroke="#445566" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#445566" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A1420', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#8899AA' }} />
                                <Area type="monotone" name="Completed Onboardings" dataKey="completed" stroke="#00E5A0" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
                                <Area type="monotone" name="Drop-offs/No Shows" dataKey="dropoff" stroke="#FF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorDropoff)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Dept Breakdowns */}
                <div className="p-6 rounded-xl bg-[#0F1C2E] border border-[#1A2A3A] flex flex-col">
                    <h2 className="text-lg font-semibold text-white mb-6">Active by Department</h2>
                    <div className="flex-1 min-h-[250px] relative">
                        <ChartWrapper height="h-full">
                            <PieChart>
                                <Pie
                                    data={DEPARTMENT_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="active"
                                    stroke="none"
                                >
                                    {DEPARTMENT_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A1420', borderColor: '#1A2A3A', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ChartWrapper>
                        {/* Center text manually as PieChart inner text can be tricky to style perfectly without custom shape */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-white">42</span>
                            <span className="text-xs text-[#8899AA]">Total</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {DEPARTMENT_DATA.map(d => (
                            <div key={d.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-[#8899AA]">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></div>
                                    {d.name}
                                </div>
                                <span className="text-white font-medium">{d.active}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Recent Joiners */}
                <div className="p-6 rounded-xl bg-[#0F1C2E] border border-[#1A2A3A]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Upcoming & Recent Joiners</h2>
                        <button className="text-sm text-[#00E5A0] hover:underline font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {NEW_JOINERS.map((joiner) => (
                            <div key={joiner.id} className="flex items-center justify-between p-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420]/50 hover:bg-[#1A2A3A] transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A2A3A] to-[#2A3A4A] flex items-center justify-center text-sm font-bold text-white border border-[#3A4A5A]">
                                        {joiner.avatar}
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-semibold text-white">{joiner.name}</h4>
                                        <p className="text-xs text-[#8899AA]">{joiner.role} • {joiner.dept}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2 w-32">
                                    <div className="flex items-center justify-between w-full text-xs">
                                        <span className="text-[#8899AA]">Joins {joiner.date}</span>
                                        <span className="text-white font-medium">{joiner.progress}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden" role="progressbar" aria-valuenow={joiner.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${joiner.name} onboarding ${joiner.progress}% complete`}>
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${joiner.progress}%`,
                                                backgroundColor: joiner.progress === 100 ? '#00E5A0' : joiner.progress > 50 ? '#33E6FF' : '#FFB020'
                                            }}
                                        />
                                    </div>
                                </div>

                                <button className="p-2 text-[#445566] group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" aria-label={`View ${joiner.name} onboarding details`}>
                                    <ChevronRight size={18} aria-hidden="true" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Priority Action Tasks */}
                <div className="p-6 rounded-xl bg-[#0F1C2E] border border-[#1A2A3A]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Priority Onboarding Tasks</h2>
                        <button className="text-sm text-[#00E5A0] hover:underline font-medium">View Calendar</button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { id: 1, title: "Approve IT Assets - Arjun Mehta", badge: "IT", due: "Today", time: "2 Hours Overdue", color: "#FF4444" },
                            { id: 2, title: "Upload Signed Offer - Sneha Rao", badge: "Compliance", due: "Today", time: "Ends in 4 hrs", color: "#FFB020" },
                            { id: 3, title: "Manager Welcome Check-in", badge: "Performance", due: "Tomorrow", time: "10:00 AM", color: "#00E5A0" },
                            { id: 4, title: "Review BGV Status - Priya Singh", badge: "HR Ops", due: "15 Mar", time: "Standard", color: "#33E6FF" },
                            { id: 5, title: "Send Pre-boarding Kit - Kabir", badge: "Comms", due: "16 Mar", time: "Standard", color: "#9D00FF" },
                        ].map(task => (
                            <div key={task.id} className="flex items-center justify-between p-3.5 rounded-lg border border-[#1A2A3A] bg-transparent hover:bg-[#1A2A3A] transition-colors group cursor-pointer">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <div className={`w-2 h-2 rounded-full mt-1.5`} style={{ backgroundColor: task.color }} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-white group-hover:text-[#00E5A0] transition-colors">{task.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8899AA] py-0.5 px-2 rounded-full bg-[#1A2A3A]">
                                                {task.badge}
                                            </span>
                                            <span className="text-xs text-[#445566]">•</span>
                                            <span className={`text-xs ${task.color === '#FF4444' ? 'text-[#FF4444]' : 'text-[#8899AA]'}`}>
                                                {task.due} - {task.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 rounded-md hover:bg-[#2A3A4A] text-[#8899AA] hover:text-[#00E5A0] transition-colors hidden group-hover:block" aria-label={`Mark task complete: ${task.title}`}>
                                        <CheckCircle2 size={16} aria-hidden="true" />
                                    </button>
                                    <button className="p-1.5 rounded-md hover:bg-[#2A3A4A] text-[#8899AA] transition-colors" aria-label={`More options for: ${task.title}`}>
                                        <MoreVertical size={16} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
