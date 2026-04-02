"use client";
import React from "react";
import ChartWrapper from '@/components/ui/ChartWrapper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend } from 'recharts';
import {
    Download, Filter, Calendar, TrendingUp, Users, Clock,
    Star, AlertCircle, FileText
} from "lucide-react";

export default function HelpdeskReports() {
    const VOLUME_DATA = [
        { name: 'Mon', it: 45, hr: 22 },
        { name: 'Tue', it: 52, hr: 28 },
        { name: 'Wed', it: 38, hr: 18 },
        { name: 'Thu', it: 65, hr: 24 },
        { name: 'Fri', it: 48, hr: 20 },
    ];

    const TYPE_DATA = [
        { name: 'Access Requests', value: 400, color: '#33E6FF' },
        { name: 'Hardware', value: 300, color: '#9D00FF' },
        { name: 'Payroll', value: 200, color: '#FFB020' },
        { name: 'Other', value: 100, color: '#00E5A0' },
    ];

    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FileText size={28} className="text-[#33E6FF]" />
                        Helpdesk Analytics & Reports
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Deep dive into ticketing metrics, agent workload, and SLA compliance.</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors text-sm font-medium flex items-center gap-2">
                        <Calendar size={16} /> Last 30 Days
                    </button>
                    <button className="px-5 py-2 bg-[#00E5A0] text-[#0A1420] rounded-lg hover:bg-[#00c98d] transition-colors text-sm font-semibold flex items-center gap-2">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Total Tickets Created</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-white">1,245</span>
                        <span className="text-xs font-bold text-[#FF4444] mb-1">+12% vs last month</span>
                    </div>
                </div>
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Resolution Rate</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-white">94%</span>
                        <span className="text-xs font-bold text-[#00E5A0] mb-1">+2% vs last month</span>
                    </div>
                </div>
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Avg Resolution Time</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-white">4h 12m</span>
                        <span className="text-xs font-bold text-[#00E5A0] mb-1">-45m vs last month</span>
                    </div>
                </div>
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">SLA Compliance</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-white">98.2%</span>
                        <span className="text-xs font-bold text-[#00E5A0] mb-1">+0.5% vs last month</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Ticket Volume Trends */}
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">Ticket Volume (IT vs HR)</h3>
                        <button className="text-[#8899AA] hover:text-white"><Filter size={16} /></button>
                    </div>
                    <div className="h-[300px]">
                        <ChartWrapper height="h-full">
                            <BarChart data={VOLUME_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="name" stroke="#445566" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#445566" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A1420', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: '#1A2A3A', opacity: 0.4 }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#8899AA' }} />
                                <Bar dataKey="it" name="IT Support" fill="#33E6FF" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="hr" name="HR Ops" fill="#9D00FF" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Distribution by Category */}
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">Ticket Distribution by Category</h3>
                        <button className="text-[#8899AA] hover:text-white"><Filter size={16} /></button>
                    </div>
                    <div className="h-[300px] flex items-center">
                        <ChartWrapper height="h-full">
                            <PieChart>
                                <Pie
                                    data={TYPE_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {TYPE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A1420', borderColor: '#1A2A3A', borderRadius: '8px', color: '#fff' }}
                                />
                                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#8899AA' }} />
                            </PieChart>
                        </ChartWrapper>
                    </div>
                </div>

            </div>

            {/* Agent Performance Table */}
            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                <div className="p-6 border-b border-[#1A2A3A]">
                    <h3 className="text-lg font-bold text-white">Agent Performance Index</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#152336] text-[#8899AA] text-xs uppercase tracking-wider font-semibold">
                                <th className="p-4">Agent Name</th>
                                <th className="p-4">Tickets Handled</th>
                                <th className="p-4">Avg Res Time</th>
                                <th className="p-4">SLA Breach %</th>
                                <th className="p-4">CSAT Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A] text-sm text-white">
                            {[
                                { name: "Amit Verma", handled: 145, time: "45m", breach: "1.2%", csat: 4.9, avatar: "AV" },
                                { name: "Priya Singh", handled: 120, time: "1h 15m", breach: "2.5%", csat: 4.7, avatar: "PS" },
                                { name: "Rahul Deshmukh", handled: 98, time: "2h 30m", breach: "5.0%", csat: 4.4, avatar: "RD" },
                                { name: "Sneha Rao", handled: 110, time: "1h 50m", breach: "3.1%", csat: 4.8, avatar: "SR" },
                            ].map((agent, i) => (
                                <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center font-bold text-xs">{agent.avatar}</div>
                                        <span className="font-semibold">{agent.name}</span>
                                    </td>
                                    <td className="p-4 text-[#8899AA] font-mono">{agent.handled}</td>
                                    <td className="p-4 text-[#8899AA]">{agent.time}</td>
                                    <td className={`p-4 font-bold ${parseFloat(agent.breach) > 3 ? 'text-[#FF4444]' : 'text-[#00E5A0]'}`}>
                                        {agent.breach}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-[#FFB020]">
                                            <Star size={14} fill="currentColor" />
                                            <span className="font-bold text-white">{agent.csat}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
