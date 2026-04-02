"use client";

import React, { useState } from 'react';
import { Sparkles, BrainCircuit, TrendingUp, AlertTriangle, Users, Zap, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const attritionTrend = [
    { month: 'Jan', rate: 4.2 }, { month: 'Feb', rate: 4.5 }, { month: 'Mar', rate: 3.8 },
    { month: 'Apr', rate: 4.9 }, { month: 'May', rate: 5.2 }, { month: 'Jun', rate: 5.8 },
    { month: 'Jul', rate: 6.1 },
];

const anomalyData = [
    { category: 'Payroll', value: 3, color: '#FF4444' },
    { category: 'Compliance', value: 1, color: '#FFB800' },
    { category: 'Attendance', value: 8, color: '#00E5A0' },
    { category: 'Expense', value: 2, color: '#0066FF' },
];

export default function AIInsightsDashboard() {
    return (
        <div className="p-6 md:p-8 animate-fade-in relative max-w-7xl mx-auto">

            {/* Contextual AI Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30">
                            <BrainCircuit size={28} className="text-indigo-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">AI Insights Overview</h1>
                    </div>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Kaarya AI is currently monitoring <span className="text-indigo-400 font-medium">12,408</span> data points across your organization. Here are the top anomalies and prescriptive actions for today.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-300">
                        <Zap size={16} className="mr-2" /> Train Model
                    </Button>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none">
                        <Sparkles size={16} className="mr-2" /> Ask HR Copilot
                    </Button>
                </div>
            </div>

            {/* Prescriptive Action Banner */}
            <div className="bg-gradient-to-r from-[#0D1928] to-[#131B2B] border border-red-500/20 rounded-2xl p-6 mb-8 flex items-center justify-between shadow-lg shadow-red-900/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="flex gap-4 items-start relative z-10">
                    <div className="mt-1 bg-red-500/20 p-2 rounded-full">
                        <AlertTriangle size={20} className="text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-red-400 font-semibold mb-1">Critical Attrition Risk Detected</h3>
                        <p className="text-[#8899AA] text-sm">
                            The AI predicts a <span className="text-white font-medium">85% probability</span> that 4 key engineers in the Payment Gateway team might leave within 30 days due to compensation disparity.
                        </p>
                    </div>
                </div>
                <Button variant="secondary" className="border-red-500/30 text-red-400 hover:bg-red-500/10 whitespace-nowrap z-10">
                    View Prescriptive Actions
                </Button>
            </div>

            {/* KPI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "AI Model Accuracy", value: "94.2%", trend: "+1.2%", positive: true, icon: Activity, color: "text-emerald-400" },
                    { label: "Predicted Time-to-Hire", value: "18 Days", trend: "-4 Days", positive: true, icon: TrendingUp, color: "text-blue-400" },
                    { label: "Payroll Anomalies", value: "3", trend: "0", positive: true, icon: AlertTriangle, color: "text-amber-400" },
                    { label: "Flight Risk Employees", value: "12", trend: "+2", positive: false, icon: Users, color: "text-red-400" },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.03] rounded-bl-full translate-x-8 -translate-y-8 transition-transform group-hover:scale-110 ${stat.color}`} />
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider">{stat.label}</div>
                            <stat.icon size={16} className={stat.color} />
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                        <div className={`text-sm ${stat.positive ? "text-emerald-400" : "text-red-400"} flex items-center gap-1`}>
                            {stat.trend} vs last month
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white font-semibold">Predicted Attrition Trend</h3>
                            <p className="text-[#8899AA] text-xs mt-1">AI forecast for the next quarter based on market factors & internal data</p>
                        </div>
                        <select className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-1.5 outline-none">
                            <option>Company Wide</option>
                            <option>Engineering</option>
                            <option>Sales</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full mt-4">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <AreaChart data={attritionTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                    <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ color: '#818cf8' }}
                                    />
                                    <Area type="monotone" dataKey="rate" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                                </AreaChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>

                {/* Anomalies Breakdown */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-white font-semibold">Active Anomalies</h3>
                        <p className="text-[#8899AA] text-xs mt-1">Issues flagged by the variance detection model</p>
                    </div>
                    <div className="flex-1 min-h-[200px]">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <BarChart layout="vertical" data={anomalyData} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1A2A3A" />
                                    <XAxis type="number" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis dataKey="category" type="category" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} width={80} />
                                    <RechartsTooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px' }} />
                                    <Bar dataKey="value" barSize={12} radius={[0, 4, 4, 0]}>
                                        {anomalyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                    <div className="mt-6">
                        <Button className="w-full bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-none flex justify-between items-center px-4">
                            <span>Review All Anomalies</span>
                            <ArrowRight size={16} className="text-[#8899AA]" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Smart Suggestions */}
            <h3 className="text-lg font-semibold text-white mt-10 mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-400" /> AI Suggestions for You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { title: "Optimize Shift Rosters", desc: "AI found overlapping shifts in Ops causing 12% unused capacity. Adjusting can save ₹45k this month.", icon: Activity },
                    { title: "Review Comp Bands", desc: "3 recent offer rejections correlate with our L4 Engineering bands being 8% below market median.", icon: TrendingUp },
                    { title: "Update Remote Policy", desc: "Based on sentiment analysis of recent pulse surveys, ambiguity in remote working is causing stress.", icon: ShieldCheck },
                ].map((item, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl hover:border-indigo-500/30 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-[#1A2A3A] p-2 rounded-lg text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                                <item.icon size={18} />
                            </div>
                            <h4 className="text-white font-medium text-sm">{item.title}</h4>
                        </div>
                        <p className="text-[#8899AA] text-xs leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
