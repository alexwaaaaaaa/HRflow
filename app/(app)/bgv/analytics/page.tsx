"use client";

import React from 'react';
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    PieChart as PieChartIcon, Target, Users, AlertTriangle, ChevronDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Line } from 'recharts';

const SLA_DATA = [
    { name: 'Identity', target: 95, actual: 98 },
    { name: 'Address', target: 90, actual: 85 },
    { name: 'Education', target: 85, actual: 88 },
    { name: 'Employment', target: 80, actual: 75 },
    { name: 'Criminal', target: 99, actual: 100 },
];

const DISCREPANCY_REASONS = [
    { name: 'Fake University/Course', count: 45 },
    { name: 'Tenure Mismatch > 3 Months', count: 32 },
    { name: 'Address Untraceable', count: 28 },
    { name: 'Designation Mismatch', count: 18 },
    { name: 'Fake Experience Letter', count: 12 },
];

export default function BGVAnalyticsScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <PieChartIcon className="text-indigo-500" size={28} />
                            BGV Analytics
                        </h1>
                        <p className="text-sm text-[#8899AA]">Insights into verification turnarounds, pass rates, and vendor SLAs.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer text-sm font-semibold">
                            Last 90 Days <ChevronDown size={16} className="text-[#8899AA]" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <MetricCard title="Overall Pass Rate" value="92.4%" target="95%" icon={<Users className="text-[#00E5A0]" size={24} />} color="border-[#00E5A0]/30 text-[#00E5A0]" />
                    <MetricCard title="Avg Discrepancy Rate" value="6.8%" target="< 5%" icon={<AlertTriangle className="text-amber-500" size={24} />} color="border-amber-500/30 text-amber-500" />
                    <MetricCard title="Global SLA Adherence" value="88.2%" target="90%" icon={<Target className="text-[#0066FF]" size={24} />} color="border-[#0066FF]/30 text-[#0066FF]" />
                    <MetricCard title="Candidate Drop-off" value="3.1%" target="< 5%" icon={<Users className="text-rose-500" size={24} />} color="border-rose-500/30 text-rose-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* SLA Adherence Chart */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 shadow-lg">
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-6">SLA Adherence by Check Type</h3>
                        <div className="h-64">
                            <ChartWrapper height="h-full">
                                <ComposedChart data={SLA_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="name" stroke="#556677" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#556677" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ fill: '#1A2A3A', opacity: 0.4 }}
                                    />
                                    <Bar dataKey="actual" fill="#0066FF" radius={[4, 4, 0, 0]} name="Actual %" barSize={40} />
                                    <Line type="stepAfter" dataKey="target" stroke="#00E5A0" strokeWidth={3} dot={false} name="Target %" />
                                </ComposedChart>
                            </ChartWrapper>
                        </div>
                    </div>

                    {/* Discrepancy Reasons */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 shadow-lg flex flex-col">
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-6">Top Discrepancy Reasons</h3>

                        <div className="space-y-4 flex-1">
                            {DISCREPANCY_REASONS.map((reason, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-slate-300 font-medium">{reason.name}</span>
                                        <span className="font-bold text-white">{reason.count} cases</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(reason.count / 45) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function MetricCard({ title, value, target, icon, color }: any) {
    return (
        <div className={`bg-[#0A1420] border-l-4 ${color} border-y border-y-[#1A2A3A] border-r border-r-[#1A2A3A] rounded-r-xl rounded-l-sm p-5 shadow-lg relative overflow-hidden`}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider">{title}</h3>
                {icon}
            </div>
            <div className="text-3xl font-black text-white mb-1">{value}</div>
            <div className="text-xs text-[#556677]">Target: <span className="font-semibold">{target}</span></div>
        </div>
    );
}
