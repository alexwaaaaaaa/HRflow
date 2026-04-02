"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    Activity, ChevronRight, Target, Users, Zap, TrendingUp, ScatterChart as ScatterIcon
} from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ZAxis } from 'recharts';

const HIGH_PERFORMER_DATA = [
    { name: 'Engineering', compRatio: 1.15, perfScore: 4.8, count: 25 },
    { name: 'Sales', compRatio: 0.95, perfScore: 4.2, count: 18 },
    { name: 'Marketing', compRatio: 1.05, perfScore: 4.5, count: 12 },
    { name: 'Finance', compRatio: 0.98, perfScore: 3.9, count: 8 },
    { name: 'Ops', compRatio: 1.02, perfScore: 4.1, count: 15 },
];

export default function HRAnalyticsAdvancedScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/reports/hr-analytics" className="hover:text-white transition-colors">HR Analytics</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Advanced View</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <Activity className="w-6 h-6 text-indigo-400" />
                        </div>
                        Advanced HR Analytics
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Multi-variable correlation analysis for compensation, performance, and retention.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Impact of Pay on Tenure</h3>
                    <div className="text-2xl font-bold mb-1 text-white">0.78 <span className="text-xs text-[#8899AA] font-normal">Correlation (r)</span></div>
                    <p className="text-xs text-emerald-400 mt-2">Strong Positive Driver</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="w-10 h-10 bg-pink-500/10 text-pink-500 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Training to Performance</h3>
                    <div className="text-2xl font-bold mb-1 text-white">0.45 <span className="text-xs text-[#8899AA] font-normal">Correlation (r)</span></div>
                    <p className="text-xs text-emerald-400 mt-2">Moderate Positive Driver</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Time to Productivity</h3>
                    <div className="text-2xl font-bold mb-1 text-white">45 <span className="text-sm">Days</span></div>
                    <p className="text-xs text-emerald-400 mt-2">-12 days YoY improvement</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Regrettable Attrition Cost</h3>
                    <div className="text-2xl font-bold mb-1 text-white">₹1.8 <span className="text-sm">Cr/Yr</span></div>
                    <p className="text-xs text-pink-400 mt-2">Estimated replacement cost</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Scatter Plot: Comp Ratio vs Performance */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <ScatterIcon className="w-5 h-5 text-indigo-400" /> Pay for Performance Alignment
                    </h2>
                    <p className="text-sm text-[#8899AA] mb-6">Compa-Ratio vs Performance Score (Bubble size = employee count)</p>
                    <div className="h-[350px] w-full">
                        <ChartWrapper height="h-full">
                            <ScatterChart margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                                <XAxis type="number" dataKey="perfScore" name="Performance" domain={[3, 5]} stroke="#8899AA"
                                    label={{ value: "Performance Score (1-5)", position: "bottom", fill: "#8899AA", fontSize: 12, dy: 10 }} />
                                <YAxis type="number" dataKey="compRatio" name="Compa-Ratio" domain={[0.8, 1.3]} stroke="#8899AA"
                                    label={{ value: "Compa-Ratio", angle: -90, position: "left", fill: "#8899AA", fontSize: 12, dx: -10 }} />
                                <ZAxis type="number" dataKey="count" range={[50, 400]} name="Headcount" />
                                <Tooltip cursor={{ strokeDasharray: '3 3', stroke: '#2A3A4A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Scatter name="Departments" data={HIGH_PERFORMER_DATA} fill="#6366f1" fillOpacity={0.6} stroke="#3b82f6" />
                                {/* Quadrant Lines */}
                                <line x1="4" y1="0.8" x2="4" y2="1.3" stroke="#2A3A4A" strokeDasharray="5 5" />
                                <line x1="3" y1="1.0" x2="5" y2="1.0" stroke="#2A3A4A" strokeDasharray="5 5" />
                            </ScatterChart>
                        </ChartWrapper>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col">
                    <h2 className="text-lg font-bold text-white mb-6">Key Insights & Action Items</h2>
                    <div className="flex-1 space-y-4">

                        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl relative">
                            <h3 className="text-amber-500 font-bold mb-1">Flight Risk Alert: Sales (Top Performers)</h3>
                            <p className="text-sm text-[#8899AA] mb-3">Your highest performing sales reps (Avg Score 4.2) are currently compensated below market median (Compa-Ratio: 0.95).</p>
                            <button className="text-xs font-bold text-amber-500 hover:underline">Review Compensation &rarr;</button>
                        </div>

                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl relative">
                            <h3 className="text-emerald-400 font-bold mb-1">Optimal Alignment: Engineering</h3>
                            <p className="text-sm text-[#8899AA] mb-3">Engineering department shows excellent Pay-for-Performance alignment. Top performers are consistently rewarded above median (Compa-Ratio: 1.15).</p>
                        </div>

                        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl relative">
                            <h3 className="text-indigo-400 font-bold mb-1">Time to Productivity Bottleneck</h3>
                            <p className="text-sm text-[#8899AA]">New hires in Marketing are taking 15 days longer to reach full productivity compared to other departments. Consider revamping their specialized onboarding track.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
