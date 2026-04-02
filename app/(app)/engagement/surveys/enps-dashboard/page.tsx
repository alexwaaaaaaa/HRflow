"use client";
import React, { useState } from 'react';
import {
    Heart, Download, TrendingUp, TrendingDown, Users, Calendar, Filter, MessageSquare, AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ReferenceLine, Cell } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const ENPS_TREND = [
    { month: 'Jan', score: 32 },
    { month: 'Feb', score: 35 },
    { month: 'Mar', score: 34 },
    { month: 'Apr', score: 40 },
    { month: 'May', score: 45 },
    { month: 'Jun', score: 42 },
];

const DEPT_SCORES = [
    { dept: 'Engineering', score: 55, responseRate: 85 },
    { dept: 'Product', score: 48, responseRate: 92 },
    { dept: 'Sales', score: 35, responseRate: 78 },
    { dept: 'Marketing', score: -5, responseRate: 65 },
    { dept: 'Finance', score: 20, responseRate: 80 },
];

const RECENT_FEEDBACK = [
    { text: "Management is transparent and the team is incredibly supportive.", category: "Leadership", sentiment: "positive", type: "Promoter" },
    { text: "Too many meetings are disrupting deep work hours.", category: "Processes", sentiment: "negative", type: "Detractor" },
    { text: "Great benefits, but career progression paths are unclear.", category: "Growth", sentiment: "neutral", type: "Passive" },
];

export default function ENPSDashboardScreen() {
    const [dateRange, setDateRange] = useState('Last 6 Months');

    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Heart size={32} className="text-[#FF4444]" /> eNPS Tracker
                    </h1>
                    <p className="text-[#8899AA]">Monitor Employee Net Promoter Score and company sentiment over time.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Calendar size={16} /> {dateRange}
                    </button>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Data
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">

                {/* Main Score Card */}
                <div className="col-span-1 lg:col-span-1 bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#FF4444] via-[#FFB020] to-[#00E5A0]"></div>
                    <p className="text-[#8899AA] text-sm font-bold uppercase tracking-wider mb-2">Company eNPS</p>
                    <h2 className="text-7xl font-black text-white mb-2 tracking-tighter">42</h2>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="flex items-center text-[#00E5A0] text-sm font-bold"><TrendingUp size={16} className="mr-1" /> +2 from last month</span>
                    </div>

                    <div className="w-full bg-[#152336] p-4 rounded-2xl border border-[#2A3A4A]">
                        <div className="flex justify-between text-xs font-bold uppercase mb-2">
                            <span className="text-[#FF4444]">Detractors</span>
                            <span className="text-[#FFB020]">Passives</span>
                            <span className="text-[#00E5A0]">Promoters</span>
                        </div>
                        <div className="h-4 w-full rounded-full overflow-hidden flex">
                            <div className="h-full bg-[#FF4444]" style={{ width: '15%' }}></div>
                            <div className="h-full bg-[#FFB020]" style={{ width: '28%' }}></div>
                            <div className="h-full bg-[#00E5A0]" style={{ width: '57%' }}></div>
                        </div>
                        <div className="flex justify-between text-white font-black text-sm mt-1">
                            <span>15%</span>
                            <span>28%</span>
                            <span>57%</span>
                        </div>
                    </div>

                    <p className="text-[#8899AA] text-xs mt-4">Calculated by subtracting Detractors from Promoters. (Scores range from -100 to 100).</p>
                </div>

                {/* Trend Chart */}
                <div className="col-span-1 lg:col-span-3 bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-lg">6-Month Trend</h3>
                        <div className="flex items-center gap-4 text-sm font-bold">
                            <span className="flex items-center gap-2 text-[#8899AA]"><div className="w-3 h-3 rounded-full bg-[#FF4444]"></div> Benchmark (30)</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <LineChart data={ENPS_TREND} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4A" vertical={false} />
                                <XAxis dataKey="month" stroke="#8899AA" tick={{ fill: '#8899AA' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#8899AA" tick={{ fill: '#8899AA' }} axisLine={false} tickLine={false} domain={[-20, 100]} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#152336', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#00E5A0', fontWeight: 'bold' }}
                                />
                                <ReferenceLine y={30} stroke="#FF4444" strokeDasharray="3 3" opacity={0.5} />
                                <ReferenceLine y={0} stroke="#445566" />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#00E5A0"
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: '#00E5A0', strokeWidth: 3, stroke: '#0F1C2E' }}
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                    name="eNPS Score"
                                />
                            </LineChart>
                        </ChartWrapper>
                    </div>
                </div>

            </div>

            {/* Bottom section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Department Breakdown */}
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6 border-b border-[#1A2A3A] pb-4">
                        <h3 className="text-white font-bold text-lg">Scores by Department</h3>
                        <button className="text-[#8899AA] hover:text-white transition-colors p-2"><Filter size={18} /></button>
                    </div>

                    <div className="h-[300px] w-full mt-4">
                        <ChartWrapper height="h-full">
                            <BarChart data={DEPT_SCORES} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4A" horizontal={false} />
                                <XAxis type="number" stroke="#8899AA" tick={{ fill: '#8899AA' }} axisLine={false} tickLine={false} domain={[-20, 100]} />
                                <YAxis dataKey="dept" type="category" stroke="#fff" tick={{ fill: '#fff', fontSize: 12, fontWeight: 'bold' }} axisLine={false} tickLine={false} width={100} />
                                <Tooltip
                                    cursor={{ fill: '#152336' }}
                                    contentStyle={{ backgroundColor: '#1A2A3A', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                />
                                <ReferenceLine x={0} stroke="#445566" />
                                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                                    {DEPT_SCORES.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.score < 0 ? '#FF4444' : entry.score < 30 ? '#FFB020' : '#00E5A0'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Qualitative Feedback */}
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6 border-b border-[#1A2A3A] pb-4">
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            <MessageSquare size={18} className="text-[#33E6FF]" /> Recent Comments
                        </h3>
                        <button className="text-[#33E6FF] text-sm font-bold hover:underline">View All</button>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                        {RECENT_FEEDBACK.map((fb, i) => (
                            <div key={i} className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-5 hover:border-[#445566] transition-colors relative overflow-hidden group">
                                {/* Indicator line */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${fb.type === 'Promoter' ? 'bg-[#00E5A0]' : fb.type === 'Detractor' ? 'bg-[#FF4444]' : 'bg-[#FFB020]'}`}></div>

                                <div className="flex justify-between items-start mb-2 pl-3">
                                    <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded ${fb.type === 'Promoter' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : fb.type === 'Detractor' ? 'bg-[#FF4444]/10 text-[#FF4444]' : 'bg-[#FFB020]/10 text-[#FFB020]'}`}>
                                        {fb.type}
                                    </span>
                                    <span className="text-[#8899AA] text-xs font-bold border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-0.5 rounded-md">
                                        {fb.category}
                                    </span>
                                </div>
                                <p className="text-[#CCDDEE] text-sm leading-relaxed pl-3 italic">"{fb.text}"</p>
                            </div>
                        ))}

                        {/* Insight Alert */}
                        <div className="mt-4 bg-[#FFB020]/10 border border-[#FFB020]/30 rounded-2xl p-4 flex gap-4">
                            <AlertTriangle size={20} className="text-[#FFB020] shrink-0" />
                            <div>
                                <h4 className="text-[#FFB020] font-bold text-sm mb-1">AI Insight</h4>
                                <p className="text-[#8899AA] text-xs">"Processes" and "Meetings" are the most common themes among neutral/detractor comments this month.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
