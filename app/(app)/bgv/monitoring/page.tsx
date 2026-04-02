"use client";

import React, { useState } from 'react';
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    Activity, Search, Filter, AlertTriangle, ShieldAlert,
    Clock, CheckCircle, ExternalLink, RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';

const MONITORING_DATA = [
    { name: 'Week 1', alerts: 2 },
    { name: 'Week 2', alerts: 5 },
    { name: 'Week 3', alerts: 1 },
    { name: 'Week 4', alerts: 8 },
    { name: 'Week 5', alerts: 3 },
];

const ALERTS = [
    { id: 'CM-09', emp: 'Vikram Batra', role: 'Security Analyst', type: 'Court Record Update', severity: 'Critical', date: '2 hrs ago', status: 'New' },
    { id: 'CM-08', emp: 'Anita Desai', role: 'Finance Dir', type: 'Credit Score Drop (CIBIL)', severity: 'Medium', date: '1 day ago', status: 'Investigating' },
    { id: 'CM-07', emp: 'Rahul Sharma', role: 'SDE II', type: 'Database Match (Watchlist)', severity: 'High', date: '3 days ago', status: 'New' },
    { id: 'CM-06', emp: 'Priya Patel', role: 'Product Mgr', type: 'Address Verification Resync', severity: 'Low', date: '1 week ago', status: 'Resolved' },
];

export default function ContinuousMonitoringScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1200px] mx-auto">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <Activity className="text-rose-500" size={28} />
                            Continuous Monitoring
                        </h1>
                        <p className="text-sm text-[#8899AA]">Real-time risk alerts for active employees via continuous background screening.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-[#556677] flex items-center gap-1.5 px-3 py-1.5 bg-[#0A1420] border border-[#1A2A3A] rounded border-dashed">
                            <span className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse"></span>
                            Monitoring Active
                        </span>
                        <button className="p-2 border border-[#1A2A3A] bg-[#0A1420] text-[#8899AA] hover:text-white rounded-lg transition-colors">
                            <RefreshCw size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    {/* Stats */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                            <div className="text-[#8899AA] text-sm font-medium mb-1 flex items-center gap-2"><ShieldAlert size={16} /> Monitored Employees</div>
                            <div className="text-3xl font-bold text-white mb-2">342</div>
                            <div className="text-xs text-[#00E5A0]">+12 enrolled this month</div>
                        </div>
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full border-b border-l border-rose-500/20"></div>
                            <div className="text-[#8899AA] text-sm font-medium mb-1 flex items-center gap-2"><AlertTriangle size={16} className="text-rose-500" /> Active Alerts</div>
                            <div className="text-3xl font-bold text-white mb-2">14</div>
                            <div className="text-xs text-rose-500">3 critical requiring action</div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="lg:col-span-3 bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Alerts Generated (Rolling 30 Days)</h3>
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-xs text-white px-2 py-1 rounded outline-none focus:border-[#0066FF] transition-colors">
                                <option>All Types</option>
                                <option>Criminal</option>
                                <option>Financial</option>
                            </select>
                        </div>
                        <div className="h-40">
                            <ChartWrapper height="h-full">
                                <LineChart data={MONITORING_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="name" stroke="#556677" tick={{ fill: '#8899AA', fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#556677" tick={{ fill: '#8899AA', fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#0A1420', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ stroke: '#2A3A4A' }}
                                    />
                                    <Line type="monotone" dataKey="alerts" stroke="#F43F5E" strokeWidth={2} dot={{ r: 4, fill: '#060B14', stroke: '#F43F5E' }} activeDot={{ r: 6 }} name="Alerts" />
                                </LineChart>
                            </ChartWrapper>
                        </div>
                    </div>
                </div>

                {/* Alerts List */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg flex flex-col min-h-[400px]">
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0D1928]">
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider">Recent Monitoring Alerts</h3>
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-2 text-[#556677]" />
                                <input type="text" placeholder="Search employee..." className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded pl-8 pr-3 py-1.5 outline-none focus:border-[#0066FF] w-48 transition-colors" />
                            </div>
                            <button className="p-1.5 bg-[#060B14] border border-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors">
                                <Filter size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#060B14]">
                                <tr>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Alert ID</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Employee</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Alert Type</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Severity</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Date</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {ALERTS.map((alert) => (
                                    <tr key={alert.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                        <td className="p-4 font-mono text-sm text-[#8899AA]">{alert.id}</td>
                                        <td className="p-4">
                                            <div className="font-bold text-white text-sm">{alert.emp}</div>
                                            <div className="text-xs text-[#556677]">{alert.role}</div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-300 font-medium">{alert.type}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider
                                                ${alert.severity === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                                    alert.severity === 'High' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                        alert.severity === 'Medium' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                                                            'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/20'}`}
                                            >
                                                {alert.severity}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-[#8899AA]">{alert.date}</td>
                                        <td className="p-4 text-right">
                                            <button className="px-3 py-1.5 bg-[#0066FF]/10 text-[#0066FF] font-semibold text-xs rounded hover:bg-[#0066FF] hover:text-white transition-colors">
                                                Review Case
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
