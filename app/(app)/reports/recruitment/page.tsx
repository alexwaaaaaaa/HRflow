"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    Filter, ChevronRight, Download, Users, Briefcase
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const FUNNEL_DATA = [
    { stage: 'Sourced', count: 1200 },
    { stage: 'Screened', count: 850 },
    { stage: 'Interviewed', count: 320 },
    { stage: 'Offered', count: 45 },
    { stage: 'Hired', count: 38 },
];

export default function RecruitmentReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Recruitment Funnel</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Filter className="w-8 h-8 text-pink-400 transform rotate-180" />
                        Recruitment Funnel
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Track candidate pipeline, conversion rates, and time-to-hire.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Time to Fill (Avg)</h3>
                    <div className="text-3xl font-bold mb-1 text-white">42 Days</div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Offer Acceptance</h3>
                    <div className="text-3xl font-bold mb-1 text-emerald-400">84.4%</div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Cost Per Hire</h3>
                    <div className="text-3xl font-bold mb-1 text-pink-400">₹45k</div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Open Reqs</h3>
                    <div className="text-3xl font-bold mb-1 text-amber-500">12</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Funnel Chart */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Pipeline Conversion</h2>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height="h-full">
                            <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                <XAxis type="number" stroke="#8899AA" fontSize={12} />
                                <YAxis dataKey="stage" type="category" stroke="#8899AA" fontSize={12} width={100} />
                                <Tooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Bar dataKey="count" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={30} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Sourcing Channels */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Source of Hire</h2>
                    <div className="space-y-4">
                        {[
                            { name: 'Employee Referrals', percent: 45, color: 'bg-emerald-400' },
                            { name: 'LinkedIn', percent: 30, color: 'bg-blue-500' },
                            { name: 'Job Portals (Naukri, etc.)', percent: 15, color: 'bg-indigo-400' },
                            { name: 'Agencies', percent: 10, color: 'bg-pink-400' },
                        ].map(source => (
                            <div key={source.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-[#8899AA]">{source.name}</span>
                                    <span className="text-white font-medium">{source.percent}%</span>
                                </div>
                                <div className="w-full bg-[#1A2A3A] rounded-full h-2">
                                    <div className={`${source.color} h-2 rounded-full`} style={{ width: `${source.percent}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
