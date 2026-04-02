"use client";

import React, { useState } from 'react';
import { Sparkles, TrendingUp, IndianRupee, Target, Activity, Search, Filter, LineChart as LineChartIcon, ArrowRight, Map, Briefcase, ChevronRight, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

// Mock data for equity/comp models
const compModelData = [
    { name: 'Kavya S.', current: 22, optimal: 28, risk: 85, performance: 4.8 },
    { name: 'Rohan M.', current: 28, optimal: 32, risk: 60, performance: 3.9 },
    { name: 'Aditi S.', current: 35, optimal: 36, risk: 20, performance: 4.2 },
    { name: 'Vikram K.', current: 18, optimal: 25, risk: 95, performance: 4.5 },
    { name: 'Sneha R.', current: 42, optimal: 45, risk: 15, performance: 4.9 },
    { name: 'Arif N.', current: 25, optimal: 27, risk: 30, performance: 3.5 },
];

export default function CompensationIntelligencePage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <IndianRupee size={28} className="text-indigo-400" /> Compensation Intelligence
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        AI-optimized total rewards structuring. Predicts the ideal mix of base, bonus, and ESOPs to maximize retention while minimizing cash burn.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Filter size={16} className="mr-2" /> Global Market Sync
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                        <Zap size={16} className="mr-2" /> Run Appraisals Bot
                    </Button>
                </div>
            </div>

            {/* Smart Summary */}
            <div className="bg-gradient-to-r from-[#0D1928] to-[#131B2B] border border-indigo-500/20 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30 shrink-0">
                        <Sparkles size={24} className="text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Total Rewards Optimization (Q4 Cycle)</h3>
                        <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-3xl">
                            The AI model recommends shifting <strong className="text-white">12% of the upcoming cash bonus pool to RSUs</strong> for top-quartile engineers. This aligns with competitor retention strategies and reduces immediate cash outlays by ₹1.2Cr while maintaining a 94% retention probability.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                                <Activity size={14} /> Cash Conservation: ₹1.2Cr
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                <Target size={14} /> Retention Prob: 94%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Scatter Plot: Pay vs Performance vs Risk */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white font-semibold">Pay vs. Performance Matrix</h3>
                            <p className="text-[#8899AA] text-xs mt-1">Bubble size = Attrition Risk. Target: Top-Right, small bubbles.</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                                <span className="w-3 h-3 rounded-full bg-red-400"></span> High Risk
                            </span>
                            <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                                <span className="w-3 h-3 rounded-full bg-indigo-500"></span> Low Risk
                            </span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full mt-4 relative">
                        {/* Quadrant Lines */}
                        <div className="absolute top-0 bottom-6 left-1/2 w-px bg-[#2A3A4A] border-dashed border-l border-[#445566]" />
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-[#2A3A4A] border-dashed border-t border-[#445566]" />

                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                                    <XAxis type="number" dataKey="performance" name="Performance Score" domain={[0, 5]} stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis type="number" dataKey="current" name="Current Comp (LPA)" domain={[0, 60]} stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <ZAxis type="number" dataKey="risk" range={[50, 400]} name="Attrition Risk" />
                                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }}
                                        contentStyle={{ backgroundColor: '#131B2B', borderColor: '#2A3A4A', borderRadius: '8px', color: '#fff' }}
                                        formatter={(val, name) => [name === 'Current Comp (LPA)' ? `₹${val}L` : val, name]}
                                    />
                                    <Scatter name="Employees" data={compModelData}>
                                        {compModelData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.risk > 70 ? '#ef4444' : '#6366f1'} fillOpacity={0.7} />
                                        ))}
                                    </Scatter>
                                </ScatterChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>

                {/* AI Interventions Panel */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col h-full overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#1A2A3A] bg-[#0A1420]">
                        <h3 className="text-white font-semibold">AI Pay Structuring</h3>
                        <p className="text-xs text-[#8899AA] mt-1">Recommended specific adjustments</p>
                    </div>

                    <div className="p-6 space-y-4 flex-1 overflow-y-auto">

                        <div className="bg-[#131B2B] border border-red-500/30 p-4 rounded-xl">
                            <h4 className="text-white font-medium text-sm mb-1">Flight Risk: Vikram K.</h4>
                            <p className="text-xs text-[#8899AA] mb-3">High performer (4.5) significantly underpaid vs market median. 95% attrition risk within 60 days.</p>
                            <div className="flex items-center justify-between text-xs mb-3">
                                <span className="text-white">Current: ₹18L</span>
                                <ArrowRight size={14} className="text-[#445566]" />
                                <span className="text-emerald-400 font-bold">Optimal: ₹25L</span>
                            </div>
                            <Button className="w-full bg-[#1A2A3A] hover:bg-[#2A3A4A] text-red-400 border-none text-[10px] uppercase font-bold py-1.5 h-auto">
                                Propose Mid-Cycle Hike
                            </Button>
                        </div>

                        <div className="bg-[#131B2B] border border-indigo-500/30 p-4 rounded-xl">
                            <h4 className="text-white font-medium text-sm mb-1">ESOP structuring: L4 Engineering</h4>
                            <p className="text-xs text-[#8899AA] mb-3">Instead of standard 10% cash bonus, model suggests offering $10k RSUs vesting over 2 years for top 20%.</p>
                            <Button className="w-full bg-[#1A2A3A] hover:bg-[#2A3A4A] text-indigo-400 border-none text-[10px] uppercase font-bold py-1.5 h-auto">
                                View RSU Impact Model
                            </Button>
                        </div>

                    </div>
                </div>

            </div>

            {/* Salary Budgets table wrapper */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden mt-8">
                <div className="px-6 py-4 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-white">Departmental Pay Equity Model</h3>
                    <Button variant="secondary" className="border-[#2A3A4A] text-white text-xs h-8 px-3 py-1">Export Analysis</Button>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Department</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Avg Compa-Ratio</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Gender Pay Gap (Adjusted)</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Budget Required to Target</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        <tr className="hover:bg-[#131B2B] transition-colors group">
                            <td className="px-6 py-4 text-sm font-medium text-white">Engineering</td>
                            <td className="px-6 py-4 text-sm text-red-400 font-bold">0.82</td>
                            <td className="px-6 py-4 text-sm text-emerald-400 font-bold text-center">-0.5%</td>
                            <td className="px-6 py-4 text-sm text-white">₹1.4 Cr</td>
                        </tr>
                        <tr className="hover:bg-[#131B2B] transition-colors group">
                            <td className="px-6 py-4 text-sm font-medium text-white">Sales</td>
                            <td className="px-6 py-4 text-sm text-emerald-400 font-bold">1.05</td>
                            <td className="px-6 py-4 text-sm text-red-400 font-bold text-center">+4.2%</td>
                            <td className="px-6 py-4 text-sm text-white">₹12 L <span className="text-xs text-[#8899AA]">(Equity fix only)</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}
