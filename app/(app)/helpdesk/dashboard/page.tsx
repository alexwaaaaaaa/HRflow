"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import {
    Ticket, Clock, Star, Users, ArrowUpRight, ArrowDownRight,
    Filter, Download, AlertCircle, CheckCircle2, ChevronRight
} from "lucide-react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';

const TICKET_VOLUME = [
    { time: '08:00', it: 12, hr: 5 },
    { time: '10:00', it: 28, hr: 15 },
    { time: '12:00', it: 15, hr: 8 },
    { time: '14:00', it: 45, hr: 22 },
    { time: '16:00', it: 30, hr: 18 },
    { time: '18:00', it: 10, hr: 4 },
];

export default function HelpdeskDashboardHR() {
    return (
        <main className="p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Ticket size={28} className="text-[#9D00FF]" aria-hidden="true" />
                        Helpdesk Command Center
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Overview of ticket volumes, agent performance, and SLAs across all departments.</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button type="button" className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors text-sm font-medium flex items-center gap-2">
                        <Filter size={16} aria-hidden="true" /> Filter: Today
                    </button>
                    <button type="button" className="px-4 py-2 bg-[#00E5A0] text-[#0A1420] rounded-lg hover:bg-[#00c98d] transition-colors text-sm font-semibold flex items-center gap-2">
                        <Download size={16} aria-hidden="true" /> Export Report
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#33E6FF] transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#33E6FF]/5 rounded-full blur-2xl group-hover:bg-[#33E6FF]/10 transition-colors" aria-hidden="true"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] text-[#33E6FF] flex items-center justify-center border border-[#2A3A4A]" aria-hidden="true">
                            <Ticket size={20} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-[#FF4444] bg-[#FF4444]/10 px-2 py-1 rounded border border-[#FF4444]/20"><ArrowUpRight size={12} aria-hidden="true" /> 12%</span>
                    </div>
                    <dd className="text-3xl font-bold text-white mb-1 relative z-10">142</dd>
                    <dt className="text-sm font-medium text-[#8899AA] relative z-10">Unresolved Tickets</dt>
                </div>

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#FFB020] transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB020]/5 rounded-full blur-2xl group-hover:bg-[#FFB020]/10 transition-colors" aria-hidden="true"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] text-[#FFB020] flex items-center justify-center border border-[#2A3A4A]" aria-hidden="true">
                            <Clock size={20} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded border border-[#00E5A0]/20"><ArrowDownRight size={12} aria-hidden="true" /> 5m</span>
                    </div>
                    <dd className="text-3xl font-bold text-white mb-1 relative z-10">1h 14m</dd>
                    <dt className="text-sm font-medium text-[#8899AA] relative z-10">Avg. First Response Time</dt>
                </div>

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#FF4444] transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4444]/5 rounded-full blur-2xl group-hover:bg-[#FF4444]/10 transition-colors" aria-hidden="true"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] text-[#FF4444] flex items-center justify-center border border-[#2A3A4A]" aria-hidden="true">
                            <AlertCircle size={20} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-[#FF4444] bg-[#FF4444]/10 px-2 py-1 rounded border border-[#FF4444]/20"><ArrowUpRight size={12} aria-hidden="true" /> 3%</span>
                    </div>
                    <dd className="text-3xl font-bold text-white mb-1 relative z-10">8%</dd>
                    <dt className="text-sm font-medium text-[#8899AA] relative z-10">SLA Breach Rate</dt>
                </div>

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#00E5A0] transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5A0]/5 rounded-full blur-2xl group-hover:bg-[#00E5A0]/10 transition-colors" aria-hidden="true"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] text-[#00E5A0] flex items-center justify-center border border-[#2A3A4A]" aria-hidden="true">
                            <Star size={20} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded border border-[#00E5A0]/20"><ArrowUpRight size={12} aria-hidden="true" /> 0.2</span>
                    </div>
                    <dd className="text-3xl font-bold text-white mb-1 relative z-10">4.8/5.0</dd>
                    <dt className="text-sm font-medium text-[#8899AA] relative z-10">Customer Satisfaction (CSAT)</dt>
                </div>
            </dl>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Chart: Ticket Volume over Time */}
                <div className="lg:col-span-2 bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Ticket Volume (Today)</h3>
                        <div className="flex items-center gap-4 text-xs font-medium text-[#8899AA]">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#33E6FF]"></div> IT Support</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#9D00FF]"></div> HR Ops</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <AreaChart data={TICKET_VOLUME} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorIt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#33E6FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#33E6FF" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#9D00FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#9D00FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="time" stroke="#445566" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#445566" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A1420', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="it" stroke="#33E6FF" fillOpacity={1} fill="url(#colorIt)" strokeWidth={3} />
                                <Area type="monotone" dataKey="hr" stroke="#9D00FF" fillOpacity={1} fill="url(#colorHr)" strokeWidth={3} />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* SLA Risk List */}
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <AlertCircle size={18} className="text-[#FF4444]" aria-hidden="true" /> SLA at Risk
                        </h2>
                        <span className="text-xs bg-[#FF4444]/10 text-[#FF4444] px-2 py-1 rounded font-bold">5 Tickets</span>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                        {[
                            { id: "TKT-4401", title: "Laptop keyboard not typing 'E'", time: "Due in 15m", urgent: true },
                            { id: "TKT-4412", title: "Payroll mismatch query", time: "Due in 45m", urgent: false },
                            { id: "TKT-4420", title: "Office Wi-Fi down in sector 4", time: "Breached", urgent: true },
                        ].map(t => (
                            <div key={t.id} className="p-4 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-xl cursor-pointer transition-colors group">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-mono text-[#8899AA]">{t.id}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${t.time === 'Breached' ? 'bg-[#FF4444] text-white' : 'bg-[#FFB020]/10 text-[#FFB020] border border-[#FFB020]/20'
                                        }`}>
                                        {t.time}
                                    </span>
                                </div>
                                <h4 className="text-sm font-semibold text-white truncate">{t.title}</h4>
                            </div>
                        ))}
                    </div>
                    <Link href="/helpdesk/management" className="mt-4 w-full py-2 border border-[#2A3A4A] text-[#8899AA] hover:text-white hover:bg-[#1A2A3A] rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                        View All Tickets <ChevronRight size={16} />
                    </Link>
                </div>

            </div>

            {/* Agent Performance Table */}
            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-[#1A2A3A] flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">Top Performing Agents</h2>
                    <button type="button" className="text-sm font-semibold text-[#33E6FF] hover:underline">View Team Report</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#152336] text-[#8899AA] text-xs uppercase tracking-wider font-semibold">
                                <th scope="col" className="p-4 font-medium text-left">Agent</th>
                                <th scope="col" className="p-4 font-medium text-left">Department</th>
                                <th scope="col" className="p-4 font-medium text-left">Resolved (Today)</th>
                                <th scope="col" className="p-4 font-medium text-left">Avg Resolution Time</th>
                                <th scope="col" className="p-4 font-medium text-left">CSAT</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A] text-sm text-white">
                            {[
                                { name: "Amit Verma", dept: "IT Support", resolved: 24, time: "45m", csat: 4.9 },
                                { name: "Priya Singh", dept: "HR Ops", resolved: 18, time: "1h 20m", csat: 4.7 },
                                { name: "Rahul Deshmukh", dept: "Facilities", resolved: 12, time: "2h 10m", csat: 4.5 },
                            ].map((agent, i) => (
                                <tr key={i} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold border border-[#2A3A4A]">
                                                {agent.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-semibold">{agent.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-[#8899AA]">{agent.dept}</td>
                                    <td className="p-4 font-mono font-medium">{agent.resolved}</td>
                                    <td className="p-4 text-[#8899AA]">{agent.time}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-[#00E5A0]">
                                            <Star size={14} fill="currentColor" aria-hidden="true" />
                                            <span className="font-bold">{agent.csat}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    );
}
