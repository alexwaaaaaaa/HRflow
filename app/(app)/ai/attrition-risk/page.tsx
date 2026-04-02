"use client";

import React from 'react';
import { AlertTriangle, TrendingUp, Users, ArrowRight, ShieldAlert, Activity, ChevronRight, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

const riskTrendData = [
    { month: 'Jul', high: 12, medium: 45 }, { month: 'Aug', high: 15, medium: 42 },
    { month: 'Sep', high: 18, medium: 50 }, { month: 'Oct', high: 24, medium: 55 },
    { month: 'Nov', high: 32, medium: 60 }, { month: 'Dec', high: 28, medium: 58 },
];

const departmentRisk = [
    { name: 'Engineering', risk: 85, count: 14, color: '#FF4444' },
    { name: 'Sales', risk: 65, count: 8, color: '#FFB800' },
    { name: 'Product', risk: 45, count: 3, color: '#FFB800' },
    { name: 'Marketing', risk: 25, count: 1, color: '#00E5A0' },
];

export default function AttritionRiskPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <ShieldAlert size={28} className="text-red-400" /> Attrition Risk Intelligence
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Kaarya AI analyzes compensation, tenure, engagement scores, and market trends to predict flight risks before they happen.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Download size={16} className="mr-2" /> Export Data
                    </Button>
                    <Button className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30">
                        View Critical Risks (32)
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0D1928] border border-red-500/30 shadow-[0_0_15px_rgba(255,68,68,0.1)] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full translate-x-8 -translate-y-8" />
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider">Critical Risk</div>
                        <AlertTriangle size={16} className="text-red-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 relative z-10">32 <span className="text-lg text-[#8899AA] font-normal">Emp</span></div>
                    <div className="text-sm text-red-400 flex items-center gap-1 relative z-10">
                        <TrendingUp size={14} /> +4 this week
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider">Estimated Cost</div>
                        <Activity size={16} className="text-amber-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">₹4.2<span className="text-lg text-[#8899AA] font-normal">Cr</span></div>
                    <div className="text-sm text-[#8899AA]">Potential replacement cost</div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider">Primary Driver</div>
                        <TrendingUp size={16} className="text-indigo-400" />
                    </div>
                    <div className="text-xl font-bold text-white mb-2 leading-tight">Below Market Comp</div>
                    <div className="text-sm text-[#8899AA]">Affects 65% of high risks</div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider">Model Confidence</div>
                        <ShieldAlert size={16} className="text-emerald-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">92%</div>
                    <div className="text-sm text-emerald-400">Based on historical accuracy</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Attrition Pipeline Chart */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white font-semibold">Predicted Risk Timeline</h3>
                            <p className="text-[#8899AA] text-xs mt-1">6-month forecast of employees entering high/medium risk bands</p>
                        </div>
                    </div>
                    <div className="h-[280px] w-full mt-4">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <AreaChart data={riskTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                    <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorHigh)" name="High Risk" />
                                    <Area type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorMedium)" name="Medium Risk" />
                                </AreaChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>

                {/* Risk by Department */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-white font-semibold">Risk by Department</h3>
                        <p className="text-[#8899AA] text-xs mt-1">Concentration of high-risk individuals</p>
                    </div>
                    <div className="flex-1 min-h-[200px]">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <BarChart layout="vertical" data={departmentRisk} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1A2A3A" />
                                    <XAxis type="number" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                                    <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} width={80} />
                                    <RechartsTooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px' }} />
                                    <Bar dataKey="risk" barSize={12} radius={[0, 4, 4, 0]} name="Risk Index">
                                        {departmentRisk.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>
            </div>

            {/* Critical Risk Employees List */}
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-400" /> Action Required: Critical Risk Employees
            </h3>
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Risk Score</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Primary Factor</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {[
                            { id: 1, name: 'Neha Reddy', role: 'SDE II', score: 95, factor: 'External Offer Identified', time: 'Immediate' },
                            { id: 2, name: 'Aisha Gupta', role: 'SDE II', score: 92, factor: 'No promotion (2.5 yrs)', time: '7 Days' },
                            { id: 3, name: 'Rahul Sharma', role: 'SDE II', score: 88, factor: 'Comp below 50th percentile', time: '14 Days' },
                        ].map((emp) => (
                            <tr key={emp.id} className="hover:bg-[#131B2B] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-medium text-white">
                                            {emp.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="font-medium text-white group-hover:text-indigo-400 transition-colors">{emp.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{emp.role}</td>
                                <td className="px-6 py-4">
                                    <span className="text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded">{emp.score}%</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{emp.factor}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/ai/attrition-risk/${emp.id}`}>
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
