"use client";
import React from "react";
import ChartWrapper from '@/components/ui/ChartWrapper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend } from 'recharts';
import {
    Download, Filter, Calendar, TrendingUp, Users, Clock, Star
} from "lucide-react";

// Mock Data
const TIME_TO_PRODUCTIVITY = [
    { name: 'Jan', tech: 22, sales: 18, marketing: 15 },
    { name: 'Feb', tech: 20, sales: 17, marketing: 14 },
    { name: 'Mar', tech: 18, sales: 15, marketing: 12 },
    { name: 'Apr', tech: 16, sales: 14, marketing: 12 },
    { name: 'May', tech: 15, sales: 13, marketing: 11 },
];

const DROPOFF_RATES = [
    { name: 'Week 1', rate: 2.1 },
    { name: 'Week 2', rate: 1.5 },
    { name: 'Month 1', rate: 4.2 },
    { name: 'Month 2', rate: 2.8 },
    { name: 'Month 3', rate: 3.5 },
];

export default function OnboardingReports() {
    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <h1 className="text-2xl font-bold text-white">Onboarding Analytics</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Measure the effectiveness and ROI of your onboarding programs.</p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg px-4 py-2 flex items-center gap-2 text-sm text-[#8899AA]">
                        <Calendar size={16} /> Q1 2026 (Jan - Mar)
                    </div>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors text-sm font-medium flex items-center gap-2">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="px-4 py-2 bg-[#00E5A0] text-[#0A1420] font-semibold rounded-lg hover:bg-[#00c98d] transition-colors text-sm flex items-center gap-2">
                        <Download size={16} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#33E6FF]/10 text-[#33E6FF] flex items-center justify-center">
                            <Clock size={20} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded-full"><TrendingUp size={12} /> 12%</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">16 Days</h3>
                    <p className="text-sm font-medium text-[#8899AA]">Avg Time to Productivity</p>
                </div>

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#FFB020]/10 text-[#FFB020] flex items-center justify-center">
                            <Star size={20} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded-full"><TrendingUp size={12} /> 0.3</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">4.6/5.0</h3>
                    <p className="text-sm font-medium text-[#8899AA]">Onboarding eNPS Score</p>
                </div>

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#FF4444]/10 text-[#FF4444] flex items-center justify-center">
                            <Users size={20} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded-full"><TrendingUp size={12} /> 2%</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">94%</h3>
                    <p className="text-sm font-medium text-[#8899AA]">90-Day Retention Rate</p>
                </div>

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#9D00FF]/10 text-[#9D00FF] flex items-center justify-center">
                            <Calendar size={20} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">100%</h3>
                    <p className="text-sm font-medium text-[#8899AA]">Day 1 Readiness (IT Setup)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Chart 1: Time to Productivity */}
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Time to Productivity by Dept (Days)</h3>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <LineChart data={TIME_TO_PRODUCTIVITY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="name" stroke="#445566" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#445566" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A1420', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend wrapperStyle={{ fontSize: '12px', color: '#8899AA', paddingTop: '10px' }} />
                                <Line type="monotone" name="Engineering" dataKey="tech" stroke="#00E5A0" strokeWidth={3} dot={{ r: 4, fill: '#00E5A0', strokeWidth: 2, stroke: '#0F1C2E' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" name="Sales" dataKey="sales" stroke="#33E6FF" strokeWidth={3} dot={{ r: 4, fill: '#33E6FF', strokeWidth: 2, stroke: '#0F1C2E' }} />
                                <Line type="monotone" name="Marketing" dataKey="marketing" stroke="#9D00FF" strokeWidth={3} dot={{ r: 4, fill: '#9D00FF', strokeWidth: 2, stroke: '#0F1C2E' }} />
                            </LineChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Chart 2: Drop-off Rates */}
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Infant Attrition Rate (%)</h3>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <BarChart data={DROPOFF_RATES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={30}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="name" stroke="#445566" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#445566" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A1420', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: '#1A2A3A', opacity: 0.4 }}
                                />
                                <Bar name="Attrition %" dataKey="rate" fill="#FF4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Feedback Highlights */}
                <div className="lg:col-span-2 bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Recent Feedback Highlights</h3>
                        <button className="text-sm font-semibold text-[#00E5A0] hover:underline">View All Feedback</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-5 border border-[#1A2A3A] rounded-xl bg-[#0A1420]">
                            <div className="flex text-[#FFB020] mb-3">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>
                            <p className="text-sm text-[#8899AA] italic mb-4">"The pre-boarding portal was amazing. I knew exactly where to go and what to do on Day 1. My buddy Vikram was incredibly helpful!"</p>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#1A2A3A] text-xs flex items-center justify-center font-bold text-white">SR</div>
                                <span className="text-xs text-[#8899AA] font-semibold">Sneha R. • Product Design</span>
                            </div>
                        </div>

                        <div className="p-5 border border-[#1A2A3A] rounded-xl bg-[#0A1420]">
                            <div className="flex text-[#FFB020] mb-3">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} className="text-[#445566]" />
                            </div>
                            <p className="text-sm text-[#8899AA] italic mb-4">"Great induction sessions. However, my software access to Jira took 2 days to process which delayed my learning."</p>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#1A2A3A] text-xs flex items-center justify-center font-bold text-white">AM</div>
                                <span className="text-xs text-[#8899AA] font-semibold">Arjun M. • Engineering</span>
                            </div>
                        </div>

                        <div className="p-5 border border-[#2A3A4A] rounded-xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420]">
                            <h4 className="text-white font-bold mb-2">Key Improvement Area</h4>
                            <p className="text-sm text-[#8899AA] mb-4">Sentiment analysis indicates that <strong className="text-[#FF4444]">Software Provisioning Speed</strong> is the most common pain point mentioned in the last 30 days.</p>
                            <button className="text-sm text-white border border-[#445566] hover:bg-[#2A3A4A] transition-colors py-1.5 px-3 rounded-lg w-full text-center">Take Action via Helpdesk</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
