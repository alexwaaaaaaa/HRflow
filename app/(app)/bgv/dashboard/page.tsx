"use client";

import React, { useState } from 'react';
import {
    Search, Filter, Plus, FileSignature, ShieldCheck, UserCheck,
    AlertCircle, Clock, CheckCircle2, XCircle, FileText, ChevronRight,
    ArrowUpRight, Users, Activity
} from 'lucide-react';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';

const TREND_DATA = [
    { name: 'Jan', initiated: 45, completed: 38 },
    { name: 'Feb', initiated: 52, completed: 45 },
    { name: 'Mar', initiated: 68, completed: 60 },
    { name: 'Apr', initiated: 74, completed: 65 },
    { name: 'May', initiated: 85, completed: 78 },
    { name: 'Jun', initiated: 92, completed: 88 },
];

const TAT_DATA = [
    { vendor: 'FirstAdvantage', time: 4.2 },
    { name: 'Checkr', time: 3.8 },
    { name: 'HireRight', time: 5.1 },
    { name: 'AuthBridge', time: 4.5 }
];

const RECENT_BGC = [
    { id: 'BGC-2024-089', name: 'Rahul Sharma', role: 'SDE II', status: 'In Progress', progress: 65, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'BGC-2024-088', name: 'Priya Patel', role: 'Product Manager', status: 'Clear', progress: 100, color: 'text-[#00E5A0]', bg: 'bg-[#00E5A0]/10' },
    { id: 'BGC-2024-087', name: 'Amit Singh', role: 'Sales Exec', status: 'Discrepancy', progress: 80, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'BGC-2024-086', name: 'Sneha Gupta', role: 'HR Associate', status: 'Clear', progress: 100, color: 'text-[#00E5A0]', bg: 'bg-[#00E5A0]/10' },
];

export default function BGVDashboard() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-1">
                            <span className="hover:text-white cursor-pointer transition-colors">BGV & Documents</span>
                            <ChevronRight size={14} />
                            <span className="text-white font-medium">Dashboard</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <ShieldCheck className="text-[#0066FF]" size={28} />
                            BGV Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/bgv/initiate" className="bg-[#0066FF] hover:bg-[#0052cc] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                            <Plus size={16} /> Initiate BGV
                        </Link>
                    </div>
                </div>

                {/* Top Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <MetricCard
                        title="Verifications in Progress"
                        value="124"
                        trend="+12% this month"
                        icon={<Activity className="text-amber-500" size={24} />}
                        color="border-amber-500/30 bg-amber-500/5 text-amber-500"
                    />
                    <MetricCard
                        title="Cleared (MTD)"
                        value="88"
                        trend="+5% vs last month"
                        icon={<CheckCircle2 className="text-[#00E5A0]" size={24} />}
                        color="border-[#00E5A0]/30 bg-[#00E5A0]/5 text-[#00E5A0]"
                    />
                    <MetricCard
                        title="Open Discrepancies"
                        value="12"
                        trend="-3% vs last month"
                        icon={<AlertCircle className="text-rose-500" size={24} />}
                        color="border-rose-500/30 bg-rose-500/5 text-rose-500"
                    />
                    <MetricCard
                        title="Avg Turnaround Time"
                        value="4.2 Days"
                        trend="-0.5 days vs Target"
                        icon={<Clock className="text-[#0066FF]" size={24} />}
                        color="border-[#0066FF]/30 bg-[#0066FF]/5 text-[#0066FF]"
                    />
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Verification Volume Trend</h3>
                                <p className="text-xs text-[#8899AA]">Initiated vs Completed (Last 6 Months)</p>
                            </div>
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-xs text-white px-3 py-1.5 rounded-lg outline-none focus:border-[#0066FF] transition-colors">
                                <option>Last 6 Months</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div className="h-64">
                            <ChartWrapper height="h-full">
                                <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorInit" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="name" stroke="#556677" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#556677" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0A1420', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="initiated" stroke="#0066FF" fillOpacity={1} fill="url(#colorInit)" activeDot={{ r: 6, strokeWidth: 2, fill: '#060B14', stroke: '#0066FF' }} name="Initiated" />
                                    <Area type="monotone" dataKey="completed" stroke="#00E5A0" fillOpacity={1} fill="url(#colorComp)" activeDot={{ r: 6, strokeWidth: 2, fill: '#060B14', stroke: '#00E5A0' }} name="Completed" />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-1">Check Type Breakdown</h3>
                        <p className="text-xs text-[#8899AA] mb-6">Current active verifications</p>

                        <div className="space-y-5">
                            <ProgressRow label="Identity Check (ID, PAN, Aadhaar)" value={94} color="bg-[#00E5A0]" />
                            <ProgressRow label="Address Check (Current & Perm)" value={82} color="bg-[#0066FF]" />
                            <ProgressRow label="Education Verification" value={65} color="bg-amber-500" />
                            <ProgressRow label="Employment Verification" value={76} color="bg-indigo-500" />
                            <ProgressRow label="Criminal & Court Checks" value={45} color="bg-rose-500" />
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl shadow-lg overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0D1928]">
                            <h3 className="font-bold text-white">Recent Initiations</h3>
                            <Link href="/bgv/status" className="text-xs text-[#0066FF] hover:underline font-medium">View All</Link>
                        </div>
                        <div className="flex-1 p-0">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#060B14]/50 border-b border-[#1A2A3A]">
                                        <th className="p-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Candidate / ID</th>
                                        <th className="p-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                                        <th className="p-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {RECENT_BGC.map((bgc) => (
                                        <tr key={bgc.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                            <td className="p-3">
                                                <div className="font-medium text-slate-200 text-sm">{bgc.name}</div>
                                                <div className="text-xs text-[#8899AA]">{bgc.id}</div>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium border border-current ${bgc.color} ${bgc.bg}`}>
                                                        {bgc.status}
                                                    </span>
                                                    {bgc.progress < 100 && <span className="text-[10px] text-[#8899AA]">{bgc.progress}%</span>}
                                                </div>
                                            </td>
                                            <td className="p-3 text-right">
                                                <Link href={`/bgv/status/${bgc.id}`} className="p-1.5 text-[#0066FF] hover:bg-[#0066FF]/10 rounded inline-block transition-colors">
                                                    <ChevronRight size={16} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-white mb-1">Action Items</h3>
                                <p className="text-xs text-[#8899AA]">Tasks requiring HR attention</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <ActionItem
                                title="Review Discrepancy: Amit Singh"
                                desc="Education verification mismatch with provided records."
                                time="2 hours ago"
                                type="danger"
                            />
                            <ActionItem
                                title="Insufficient Information"
                                desc="Need updated ID proof for Sneha Gupta. Previous upload illegible."
                                time="4 hours ago"
                                type="warning"
                            />
                            <ActionItem
                                title="Vendor SLA Breach Warning"
                                desc="FirstAdvantage TAT exceeding 7 days for 3 candidates."
                                time="1 day ago"
                                type="info"
                            />
                            <ActionItem
                                title="Clearance Approval Required"
                                desc="Background checks completed for 5 individuals. Pending final HR approval."
                                time="1 day ago"
                                type="success"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function MetricCard({ title, value, trend, icon, color }: any) {
    return (
        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 shadow-lg relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40 -mr-4 -mt-4 ${color.split(' ')[0].replace('border-', 'bg-')}`}></div>
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 relative z-10 ${color}`}>
                {icon}
            </div>
            <h3 className="text-[#8899AA] text-sm font-medium mb-1 relative z-10">{title}</h3>
            <div className="flex items-end gap-2 relative z-10">
                <span className="text-2xl font-bold text-white">{value}</span>
            </div>
            <div className="text-xs text-[#556677] mt-2 relative z-10">{trend}</div>
        </div>
    );
}

function ProgressRow({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">{label}</span>
                <span className="font-bold text-white">{value}%</span>
            </div>
            <div className="h-2 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
}

function ActionItem({ title, desc, time, type }: any) {
    const typeStyles = {
        danger: { icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
        warning: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
        info: { icon: FileText, color: 'text-[#0066FF]', bg: 'bg-[#0066FF]/10', border: 'border-[#0066FF]/20' },
        success: { icon: CheckCircle2, color: 'text-[#00E5A0]', bg: 'bg-[#00E5A0]/10', border: 'border-[#00E5A0]/20' }
    };

    // @ts-expect-error: dynamic map
    const st = typeStyles[type];
    const Icon = st.icon;

    return (
        <div className={`p-3 rounded-xl border ${st.border} bg-[#060B14] flex gap-3 group hover:bg-[#1A2A3A]/40 transition-colors cursor-pointer`}>
            <div className={`w-8 h-8 rounded-lg ${st.bg} flex items-center justify-center shrink-0`}>
                <Icon className={st.color} size={16} />
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#0066FF] transition-colors">{title}</h4>
                    <span className="text-[10px] text-[#556677]">{time}</span>
                </div>
                <p className="text-xs text-[#8899AA] mt-1 line-clamp-1">{desc}</p>
            </div>
        </div>
    );
}
