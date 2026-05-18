"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { PieChart as PieChartIcon, Download, Users, Clock, MessageSquare, ChevronDown, AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

const SUMMARY_STATS = {
    totalSent: 450,
    responses: 315,
    completionRate: 70,
    avgTime: "4m 12s",
    status: "Active"
};

const RATING_DATA = [
    { name: '1', count: 12 },
    { name: '2', count: 28 },
    { name: '3', count: 45 },
    { name: '4', count: 120 },
    { name: '5', count: 110 },
];

const CHOICE_DATA = [
    { name: 'Health Insurance', value: 145, color: '#33E6FF' },
    { name: 'Flexible Hours', value: 95, color: '#FFB020' },
    { name: 'Learning Budget', value: 50, color: '#9D00FF' },
    { name: 'Stock Options', value: 25, color: '#00E5A0' },
];

const TEXT_RESPONSES = [
    { id: 1, text: "More frequent cross-team syncs would help eliminate silos.", sentiment: "neutral" },
    { id: 2, text: "The new flexible hours policy has been amazing for my work-life balance! Thank you.", sentiment: "positive" },
    { id: 3, text: "We need better documentation for the internal tools. Onboarding takes too long.", sentiment: "negative" },
    { id: 4, text: "Adding a quiet zone in the office would be great for focused work.", sentiment: "neutral" },
];

export default function SurveyResultsScreen() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <Page
            title="Q3 Employee Engagement Pulse"
            subtitle="Completion Rate"
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Surveys", href: "/engagement/surveys" }, { label: "Results" }]}
            maxWidth="1200px"
        >

        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Title & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link href="/engagement/surveys/dashboard" className="text-[#8899AA] hover:text-white text-sm font-bold flex items-center gap-1 transition-colors">
                            Dashboard <ChevronDown size={14} className="-rotate-90" />
                        </Link>
                        <span className="bg-[#00E5A0]/10 text-[#00E5A0] text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse"></span> Active
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white">Q3 Employee Engagement Pulse</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2 text-sm">
                        <Download size={16} /> Export CSV
                    </button>
                    <button className="px-5 py-2 bg-[#33E6FF] text-[#0A1420] font-bold rounded-xl hover:bg-[#29b8cc] transition-colors flex items-center gap-2 text-sm shadow-[0_5px_15px_rgba(51,230,255,0.2)]">
                        Send Reminder
                    </button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-2xl p-5 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1A2A3A] rounded-xl flex items-center justify-center text-[#8899AA]">
                        <Users size={20} />
                    </div>
                    <div>
                        <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider">Responses</p>
                        <h3 className="text-2xl font-black text-white">{SUMMARY_STATS.responses} <span className="text-sm text-[#445566] font-medium">/ {SUMMARY_STATS.totalSent}</span></h3>
                    </div>
                </div>
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-2xl p-5 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#33E6FF]/10 rounded-xl flex items-center justify-center text-[#33E6FF]">
                        <PieChartIcon size={20} />
                    </div>
                    <div>
                        <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider">Completion Rate</p>
                        <h3 className="text-2xl font-black text-white">{SUMMARY_STATS.completionRate}%</h3>
                    </div>
                </div>
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-2xl p-5 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FFB020]/10 rounded-xl flex items-center justify-center text-[#FFB020]">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider">Avg Time</p>
                        <h3 className="text-2xl font-black text-white">{SUMMARY_STATS.avgTime}</h3>
                    </div>
                </div>
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-2xl p-5 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#00E5A0]/10 rounded-xl flex items-center justify-center text-[#00E5A0]">
                        <MessageSquare size={20} />
                    </div>
                    <div>
                        <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider">Comments</p>
                        <h3 className="text-2xl font-black text-white">124</h3>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#2A3A4A] mb-8 gap-8">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'overview' ? 'text-[#33E6FF] border-[#33E6FF]' : 'text-[#8899AA] border-transparent hover:text-white'}`}
                >
                    Summary Report
                </button>
                <button
                    onClick={() => setActiveTab('individual')}
                    className={`pb-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'individual' ? 'text-[#33E6FF] border-[#33E6FF]' : 'text-[#8899AA] border-transparent hover:text-white'}`}
                >
                    Individual Responses (Anonymous)
                </button>
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">

                    {/* Question 1: Rating */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <div className="flex justify-between items-start mb-6 border-b border-[#1A2A3A] pb-4">
                            <div>
                                <span className="text-[#33E6FF] font-black text-lg mr-2">Q1.</span>
                                <h3 className="text-white font-bold text-lg inline">How would you rate your work-life balance currently?</h3>
                            </div>
                            <span className="px-3 py-1 bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-xs font-bold uppercase tracking-wider rounded-lg">Rating Scale</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="col-span-1 md:col-span-2 h-[250px]">
                                <ChartWrapper height="h-full">
                                    <BarChart data={RATING_DATA} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4A" vertical={false} />
                                        <XAxis dataKey="name" stroke="#8899AA" tick={{ fill: '#8899AA' }} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#8899AA" tick={{ fill: '#8899AA' }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            cursor={{ fill: '#1A2A3A' }}
                                            contentStyle={{ backgroundColor: '#152336', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                            itemStyle={{ color: '#33E6FF', fontWeight: 'bold' }}
                                        />
                                        <Bar dataKey="count" fill="#33E6FF" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ChartWrapper>
                            </div>
                            <div className="col-span-1 flex flex-col justify-center gap-6">
                                <div className="bg-[#152336] p-4 rounded-xl border border-[#2A3A4A] text-center">
                                    <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Average Score</p>
                                    <h4 className="text-4xl font-black text-white">3.9 <span className="text-xl text-[#445566]">/ 5</span></h4>
                                </div>
                                <div className="bg-[#152336] p-4 rounded-xl border border-[#2A3A4A]">
                                    <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Distribution</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span className="text-white">Promoters (4-5)</span> <span className="text-[#00E5A0] font-bold">73%</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-white">Passives (3)</span> <span className="text-[#FFB020] font-bold">14%</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-white">Detractors (1-2)</span> <span className="text-[#FF4444] font-bold">13%</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question 2: Choice */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <div className="flex justify-between items-start mb-6 border-b border-[#1A2A3A] pb-4">
                            <div>
                                <span className="text-[#33E6FF] font-black text-lg mr-2">Q2.</span>
                                <h3 className="text-white font-bold text-lg inline">Which benefits are most important to you?</h3>
                            </div>
                            <span className="px-3 py-1 bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-xs font-bold uppercase tracking-wider rounded-lg">Multiple Choice</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="h-[250px] relative">
                                <ChartWrapper height="h-full">
                                    <PieChart>
                                        <Pie
                                            data={CHOICE_DATA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {CHOICE_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#152336', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                        />
                                    </PieChart>
                                </ChartWrapper>
                            </div>
                            <div>
                                <div className="space-y-4">
                                    {CHOICE_DATA.map((entry, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-center mb-1 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }}></div>
                                                    <span className="text-white font-bold">{entry.name}</span>
                                                </div>
                                                <div className="space-x-2">
                                                    <span className="text-[#8899AA]">{entry.value} votes</span>
                                                    <span className="font-bold" style={{ color: entry.color }}>{Math.round((entry.value / 315) * 100)}%</span>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                                                <div className="h-full rounded-full" style={{ width: `${(entry.value / 315) * 100}%`, backgroundColor: entry.color }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question 3: Text Analysis */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <div className="flex justify-between items-start mb-6 border-b border-[#1A2A3A] pb-4">
                            <div>
                                <span className="text-[#33E6FF] font-black text-lg mr-2">Q3.</span>
                                <h3 className="text-white font-bold text-lg inline">What could we do to improve company culture?</h3>
                            </div>
                            <span className="px-3 py-1 bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1">
                                <AlertCircle size={14} /> Text Analysis
                            </span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {TEXT_RESPONSES.map(resp => (
                                <div key={resp.id} className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-4 flex gap-4 items-start hover:border-[#445566] transition-colors">
                                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${resp.sentiment === 'positive' ? 'bg-[#00E5A0] shadow-[0_0_8px_#00E5A0]' : resp.sentiment === 'negative' ? 'bg-[#FF4444] shadow-[0_0_8px_#FF4444]' : 'bg-[#FFB020] shadow-[0_0_8px_#FFB020]'}`}></div>
                                    <p className="text-[#CCDDEE] text-sm leading-relaxed">{resp.text}</p>
                                </div>
                            ))}
                            <button className="w-full py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors mt-2 text-sm">
                                View All 124 Comments
                            </button>
                        </div>
                    </div>

                </div>
            )}

            {activeTab === 'individual' && (
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-12 text-center animate-in fade-in">
                    <div className="w-16 h-16 bg-[#1A2A3A] rounded-2xl flex items-center justify-center text-[#445566] mx-auto mb-4">
                        <Users size={32} />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">Individual Responses</h3>
                    <p className="text-[#8899AA] mb-6 max-w-md mx-auto">Browse through responses one by one. Personal identifiers are hidden because this survey is fully anonymous.</p>
                    <button className="px-6 py-2.5 bg-[#33E6FF] text-[#0A1420] font-bold rounded-xl hover:bg-[#29b8cc] transition-colors">
                        Start Viewing Responses
                    </button>
                </div>
            )}

        </div>
    
        </Page>
    );
}
