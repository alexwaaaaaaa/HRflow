"use client";
import React, { useState } from 'react';
import {
    BarChart2, Filter, Download, Zap, Heart, Users, Target, MoveUpRight, MoveDownRight, ArrowRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Cell } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const BENCHMARK_DATA = [
    { metric: 'Overall eNPS', company: 42, industry: 35, delta: 7 },
    { metric: 'Work-Life Balance', company: 65, industry: 70, delta: -5 },
    { metric: 'Compensation', company: 58, industry: 55, delta: 3 },
    { metric: 'Career Growth', company: 78, industry: 62, delta: 16 },
    { metric: 'Company Culture', company: 85, industry: 75, delta: 10 },
    { metric: 'Manager Support', company: 72, industry: 78, delta: -6 },
];

export default function BenchmarkComparisonScreen() {
    const [industry, setIndustry] = useState('Technology (Software)');
    const [size, setSize] = useState('500-1000 Employees');

    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <BarChart2 size={32} className="text-[#33E6FF]" /> Industry Benchmarks
                    </h1>
                    <p className="text-[#8899AA]">Compare your engagement scores against industry standards and peers.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="px-4 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold text-sm rounded-xl focus:outline-none focus:border-[#33E6FF] appearance-none cursor-pointer"
                    >
                        <option>Technology (Software)</option>
                        <option>Financial Services</option>
                        <option>Healthcare</option>
                        <option>Retail</option>
                    </select>
                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="px-4 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold text-sm rounded-xl focus:outline-none focus:border-[#33E6FF] appearance-none cursor-pointer"
                    >
                        <option>500-1000 Employees</option>
                        <option>1000-5000 Employees</option>
                        <option>5000+ Employees</option>
                    </select>
                    <button className="px-4 py-2 bg-[#33E6FF] text-[#0A1420] font-bold text-sm rounded-xl hover:bg-[#29b8cc] transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(51,230,255,0.2)]">
                        <Download size={16} /> Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">

                {/* Main Chart */}
                <div className="col-span-1 xl:col-span-3 bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl flex flex-col">
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        Score Comparison vs. <span className="text-[#33E6FF]">{industry}</span>
                    </h3>

                    <div className="flex-1 w-full min-h-[400px]">
                        <ChartWrapper height="h-full">
                            <BarChart data={BENCHMARK_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barGap={0}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4A" vertical={false} />
                                <XAxis dataKey="metric" stroke="#8899AA" tick={{ fill: '#8899AA', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#8899AA" tick={{ fill: '#8899AA' }} axisLine={false} tickLine={false} domain={[-20, 100]} />

                                <Tooltip
                                    cursor={{ fill: '#152336' }}
                                    contentStyle={{ backgroundColor: '#1A2A3A', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ fontWeight: 'bold' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />

                                <ReferenceLine y={0} stroke="#445566" />

                                <Bar dataKey="company" name="Your Company" fill="#33E6FF" radius={[4, 4, 0, 0]} barSize={24} />
                                <Bar dataKey="industry" name="Industry Average" fill="#1A2A3A" stroke="#445566" strokeWidth={1} radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Sidebar Insights */}
                <div className="col-span-1 space-y-6">

                    {/* Top Percentile */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Target size={64} className="text-[#00E5A0]" />
                        </div>
                        <h3 className="text-[#8899AA] font-bold mb-1 text-xs uppercase tracking-wider">Overall Ranking</h3>
                        <div className="flex items-end gap-2 mb-4">
                            <h2 className="text-4xl font-black text-white">Top 15%</h2>
                        </div>
                        <p className="text-sm text-[#8899AA] leading-relaxed">
                            Your overall eNPS (42) places you in the top 15th percentile of technology companies with 500-1000 employees.
                        </p>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Comparative Insights</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <MoveUpRight size={16} className="text-[#00E5A0]" />
                                    <span className="text-sm font-bold text-white">Biggest Advantage</span>
                                </div>
                                <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded-xl p-3">
                                    <p className="text-sm font-bold text-[#00E5A0]">Career Growth (+16 pts)</p>
                                    <p className="text-xs text-[#8899AA] mt-1">Significant lead over industry avg (62). Great for employer branding.</p>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <MoveDownRight size={16} className="text-[#FF4444]" />
                                    <span className="text-sm font-bold text-white">Biggest Gap</span>
                                </div>
                                <div className="bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl p-3">
                                    <p className="text-sm font-bold text-[#FF4444]">Manager Support (-6 pts)</p>
                                    <p className="text-xs text-[#8899AA] mt-1">Falling behind peers (78 avg). Consider targeted manager training.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* Detail Table */}
            <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl shadow-xl overflow-hidden mt-8">
                <div className="p-6 border-b border-[#1A2A3A] bg-[#0A1420]">
                    <h2 className="text-lg font-bold text-white">Detailed Metric Breakdown</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0D1826] border-b border-[#1A2A3A]">
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Survey Driver</th>
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Your Score</th>
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Industry Avg</th>
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Delta (Points)</th>
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {BENCHMARK_DATA.map((row, i) => (
                                <tr key={i} className="hover:bg-[#152336] transition-colors group">
                                    <td className="p-4 font-bold text-white text-sm">{row.metric}</td>
                                    <td className="p-4 text-sm font-black text-[#33E6FF]">{row.company}</td>
                                    <td className="p-4 text-sm font-bold text-[#8899AA]">{row.industry}</td>
                                    <td className="p-4 text-sm font-bold">
                                        <span className={row.delta > 0 ? 'text-[#00E5A0]' : row.delta < 0 ? 'text-[#FF4444]' : 'text-[#8899AA]'}>
                                            {row.delta > 0 ? '+' : ''}{row.delta}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${row.delta > 5 ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : row.delta < -5 ? 'bg-[#FF4444]/10 text-[#FF4444]' : 'bg-[#1A2A3A] text-[#8899AA] border border-[#2A3A4A]'}`}>
                                            {row.delta > 5 ? 'Outperforming' : row.delta < -5 ? 'Underperforming' : 'At Parity'}
                                        </span>
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
