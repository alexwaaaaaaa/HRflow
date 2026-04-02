"use client";

import React from "react";
import Link from "next/link";
import {
    LineChart as ChartIcon, ChevronRight, Activity, Users, Filter, Download
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const ATTRITION_TREND = [
    { period: 'Q1', voluntary: 4.2, involuntary: 1.1 },
    { period: 'Q2', voluntary: 5.1, involuntary: 1.5 },
    { period: 'Q3', voluntary: 3.8, involuntary: 0.8 },
    { period: 'Q4', voluntary: 4.5, involuntary: 1.2 },
];

const TENURE_DATA = [
    { name: '< 1 Year', value: 350 },
    { name: '1-3 Years', value: 450 },
    { name: '3-5 Years', value: 250 },
    { name: '5+ Years', value: 150 },
];
const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];

export default function WorkforceAnalyticsScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col h-screen overflow-hidden">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Analytics</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <ChartIcon className="w-6 h-6 text-indigo-400" />
                        </div>
                        Workforce Analytics
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white rounded-lg transition-colors text-sm font-medium">
                        <Filter className="w-4 h-4" /> Filter Data
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                        <Download className="w-4 h-4" /> Generate Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 flex-shrink-0">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <h3 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Total Headcount</h3>
                    <div className="text-3xl font-bold text-white mb-2">1,200</div>
                    <p className="text-xs text-emerald-400 flex items-center gap-1"><Activity className="w-3 h-3" /> +12% YoY</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <h3 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Overall Attrition (TTM)</h3>
                    <div className="text-3xl font-bold text-white mb-2">14.6%</div>
                    <p className="text-xs text-pink-500 flex items-center gap-1"><Activity className="w-3 h-3" /> Industry avg: 12%</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <h3 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Diversity (Female %)</h3>
                    <div className="text-3xl font-bold text-white mb-2">32.4%</div>
                    <p className="text-xs text-emerald-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Target: 35%</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <h3 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Avg Manager Span</h3>
                    <div className="text-3xl font-bold text-white mb-2">1:8</div>
                    <p className="text-xs text-[#8899AA]">Healthy ratio</p>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col min-h-0">
                    <h3 className="text-sm font-bold text-white mb-6">Attrition Trend (Trailing 4 Quarters)</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ChartWrapper height="h-full">
                            <BarChart data={ATTRITION_TREND} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="period" stroke="#8899AA" fontSize={11} />
                                <YAxis stroke="#8899AA" fontSize={11} tickFormatter={(val) => `${val}%`} />
                                <Tooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="voluntary" stackId="a" name="Voluntary" fill="#ec4899" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="involuntary" stackId="a" name="Involuntary" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col min-h-0 overflow-hidden relative">
                    <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                        <h3 className="text-sm font-bold text-white">Tenure Distribution</h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-6 relative">
                        <ChartWrapper height="h-full">
                            <PieChart>
                                <Pie
                                    data={TENURE_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {TENURE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend verticalAlign="middle" align="right" layout="vertical" wrapperStyle={{ fontSize: '12px', color: '#8899AA' }} />
                            </PieChart>
                        </ChartWrapper>
                        {/* Center text overlay approximation */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -ml-32">
                            <div className="text-center">
                                <span className="text-2xl font-bold text-white block">1.8</span>
                                <span className="text-[10px] text-[#8899AA] uppercase tracking-widest">Avg Yrs</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
