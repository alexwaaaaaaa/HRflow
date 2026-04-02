"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    LineChart as LineChartIcon, ChevronRight, Download, Target, Users, DollarSign, Activity
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ComposedChart, Area } from 'recharts';

const PRODUCTIVITY_DATA = [
    { month: 'Oct', revenue: 120, hcc: 100 },
    { month: 'Nov', revenue: 125, hcc: 102 },
    { month: 'Dec', revenue: 140, hcc: 105 },
    { month: 'Jan', revenue: 135, hcc: 106 },
    { month: 'Feb', revenue: 150, hcc: 110 },
    { month: 'Mar', revenue: 165, hcc: 115 }, // Est.
];

export default function HRAnalyticsScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">HR Analytics</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <LineChartIcon className="w-6 h-6 text-indigo-400" />
                        </div>
                        Strategic HR Analytics
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Correlate HR metrics with business performance to drive strategic decisions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Download className="w-4 h-4" /> Export Dashboard
                    </button>
                </div>
            </div>

            {/* Strategic KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <Target className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500 opacity-5" />
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Revenue per Employee</h3>
                    <div className="text-3xl font-bold mb-1 text-emerald-400">₹45.2 L</div>
                    <p className="text-xs text-[#8899AA] mt-1">+12% YoY Growth</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <DollarSign className="absolute -right-4 -bottom-4 w-24 h-24 text-amber-500 opacity-5" />
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Human Capital ROI</h3>
                    <div className="text-3xl font-bold mb-1 text-amber-500">2.4x</div>
                    <p className="text-xs text-[#8899AA] mt-1">Return on payroll investment</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <Activity className="absolute -right-4 -bottom-4 w-24 h-24 text-indigo-500 opacity-5" />
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Span of Control</h3>
                    <div className="text-3xl font-bold mb-1 text-indigo-400">1:8</div>
                    <p className="text-xs text-[#8899AA] mt-1">Avg direct reports per manager</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <Users className="absolute -right-4 -bottom-4 w-24 h-24 text-pink-500 opacity-5" />
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Quality of Hire</h3>
                    <div className="text-3xl font-bold mb-1 text-pink-400">82%</div>
                    <p className="text-xs text-[#8899AA] mt-1">Based on 90-day performance</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Revenue vs Headcount Cost */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Revenue Growth vs Headcount Cost Index</h2>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <ComposedChart data={PRODUCTIVITY_DATA} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" stroke="#8899AA" fontSize={12} />
                                <YAxis yAxisId="left" stroke="#8899AA" fontSize={12} domain={[80, 200]} />
                                <YAxis yAxisId="right" orientation="right" stroke="#8899AA" fontSize={12} domain={[80, 150]} />
                                <Tooltip contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Area yAxisId="left" type="monotone" dataKey="revenue" name="Rev Index" fill="#10b981" stroke="#10b981" fillOpacity={0.2} />
                                <Line yAxisId="right" type="monotone" dataKey="hcc" name="Cost Index" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                            </ComposedChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Managerial vs Individual Contributor */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Pyramid Structure (Manager vs IC)</h2>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <BarChart data={[
                                { level: 'L1 (Entry)', ic: 140, mgr: 0 },
                                { level: 'L2 (Mid)', ic: 85, mgr: 20 },
                                { level: 'L3 (Senior)', ic: 10, mgr: 28 },
                                { level: 'L4 (Lead)', ic: 2, mgr: 13 },
                                { level: 'L5 (Exec)', ic: 0, mgr: 5 },
                            ]} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                <XAxis type="number" stroke="#8899AA" fontSize={12} />
                                <YAxis dataKey="level" type="category" stroke="#8899AA" fontSize={12} width={100} />
                                <Tooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Bar dataKey="ic" name="Ind. Contributor" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} barSize={20} />
                                <Bar dataKey="mgr" name="People Manager" stackId="a" fill="#ec4899" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

            </div>

            <div className="bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-indigo-400 font-bold mb-1">Predictive Insight</h3>
                    <p className="text-sm text-white leading-relaxed">Based on current revenue velocity and historical headcount ratios, you need to ramp up hiring in the <strong>Sales - Enterprise</strong> division by <span className="text-amber-500 font-bold">15%</span> next quarter to meet your projected sales targets. Current lead time to fill these roles is 42 days.</p>
                </div>
            </div>

        </div>
    );
}
