"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import {
    LineChart as LineChartIcon, Download, Calendar, TrendingUp, Presentation
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const HISTORICAL_DATA = [
    { period: 'Q1 2022', engagement: 68, enps: 22, retention: 85 },
    { period: 'Q2 2022', engagement: 70, enps: 25, retention: 86 },
    { period: 'Q3 2022', engagement: 73, enps: 30, retention: 88 },
    { period: 'Q4 2022', engagement: 72, enps: 28, retention: 87 },
    { period: 'Q1 2023', engagement: 75, enps: 35, retention: 89 },
    { period: 'Q2 2023', engagement: 78, enps: 42, retention: 91 },
    { period: 'Q3 2023', engagement: 76, enps: 38, retention: 90 },
    { period: 'Q4 2023', engagement: 82, enps: 48, retention: 94 },
];

const EVENTS = [
    { p1: 'Q2 2022', p2: 'Q3 2022', name: 'New 4-Day Work Week Pilot', color: '#00E5A0' },
    { p1: 'Q1 2023', p2: 'Q2 2023', name: 'Annual Bonus Payouts', color: '#FFB020' },
];

export default function HistoricalTrendScreen() {
    const [dateRange, _setDateRange] = useState('Last 2 Years');
    const [activeMetrics, setActiveMetrics] = useState({
        engagement: true,
        enps: true,
        retention: false
    });

    const toggleMetric = (metric: keyof typeof activeMetrics) => {
        setActiveMetrics(prev => ({ ...prev, [metric]: !prev[metric] }));
    };

    return (
        <Page
            title="Historical Trends"
            subtitle="Track engagement, eNPS, and retention over time alongside key company events."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Surveys", href: "/engagement/surveys" }, { label: "Analytics", href: "/engagement/surveys/analytics" }, { label: "Trends" }]}
            maxWidth="1400px"
        >

        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <LineChartIcon size={32} className="text-[#00E5A0]" /> Historical Trends
                    </h1>
                    <p className="text-[#8899AA]">Track engagement, eNPS, and retention over time alongside key company events.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Calendar size={16} /> {dateRange}
                    </button>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Data
                    </button>
                    <button className="px-4 py-2 bg-[#00E5A0] text-[#0A1420] font-bold text-sm rounded-xl hover:bg-[#00cc8e] transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(0,229,160,0.2)]">
                        <Presentation size={16} /> Add Event
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 lg:col-span-3 bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">

                    <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                        <h3 className="text-white font-bold text-lg">Multi-Metric Trend Analysis</h3>

                        <div className="flex flex-wrap gap-2 text-sm font-bold">
                            <button
                                onClick={() => toggleMetric('engagement')}
                                className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-2 ${activeMetrics.engagement ? 'bg-[#33E6FF]/10 text-[#33E6FF] border-[#33E6FF]/30' : 'bg-[#152336] text-[#8899AA] border-[#2A3A4A] hover:text-white hover:border-[#445566]'}`}
                            >
                                <div className="w-2 h-2 rounded-full bg-[#33E6FF]"></div> Engagement Index
                            </button>
                            <button
                                onClick={() => toggleMetric('enps')}
                                className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-2 ${activeMetrics.enps ? 'bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/30' : 'bg-[#152336] text-[#8899AA] border-[#2A3A4A] hover:text-white hover:border-[#445566]'}`}
                            >
                                <div className="w-2 h-2 rounded-full bg-[#FF4444]"></div> eNPS
                            </button>
                            <button
                                onClick={() => toggleMetric('retention')}
                                className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-2 ${activeMetrics.retention ? 'bg-[#FFB020]/10 text-[#FFB020] border-[#FFB020]/30' : 'bg-[#152336] text-[#8899AA] border-[#2A3A4A] hover:text-white hover:border-[#445566]'}`}
                            >
                                <div className="w-2 h-2 rounded-full bg-[#FFB020]"></div> Retention %
                            </button>
                        </div>
                    </div>

                    <div className="h-[400px] w-full mt-4">
                        <ChartWrapper height="h-full">
                            <LineChart data={HISTORICAL_DATA} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4A" vertical={false} />
                                <XAxis dataKey="period" stroke="#8899AA" tick={{ fill: '#8899AA' }} axisLine={false} tickLine={false} />
                                <YAxis yAxisId="left" stroke="#8899AA" tick={{ fill: '#8899AA' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                                <YAxis yAxisId="right" orientation="right" stroke="#FF4444" tick={{ fill: '#FF4444' }} axisLine={false} tickLine={false} domain={[-20, 100]} />

                                <Tooltip
                                    contentStyle={{ backgroundColor: '#152336', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ fontWeight: 'bold' }}
                                />

                                {/* Overlay Events as ReferenceAreas */}
                                {EVENTS.map((evt, i) => (
                                    <ReferenceArea key={i} x1={evt.p1} x2={evt.p2} yAxisId="left" fill={evt.color} fillOpacity={0.05} />
                                ))}

                                {activeMetrics.engagement && <Line yAxisId="left" type="monotone" dataKey="engagement" stroke="#33E6FF" strokeWidth={3} dot={{ r: 4, fill: '#33E6FF', strokeWidth: 2, stroke: '#0F1C2E' }} activeDot={{ r: 6, strokeWidth: 0 }} name="Engagement" />}
                                {activeMetrics.enps && <Line yAxisId="right" type="monotone" dataKey="enps" stroke="#FF4444" strokeWidth={3} dot={{ r: 4, fill: '#FF4444', strokeWidth: 2, stroke: '#0F1C2E' }} activeDot={{ r: 6, strokeWidth: 0 }} name="eNPS" />}
                                {activeMetrics.retention && <Line yAxisId="left" type="monotone" dataKey="retention" stroke="#FFB020" strokeWidth={3} dot={{ r: 4, fill: '#FFB020', strokeWidth: 2, stroke: '#0F1C2E' }} activeDot={{ r: 6, strokeWidth: 0 }} name="Retention %" strokeDasharray="5 5" />}
                            </LineChart>
                        </ChartWrapper>
                    </div>

                    <p className="text-[#8899AA] text-xs text-center mt-4">Shaded areas indicate major company events or organizational changes.</p>
                </div>

                {/* Sidebar Insights */}
                <div className="col-span-1 space-y-6">

                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-[#00E5A0]" /> Year-over-Year Gain
                        </h3>
                        <div className="flex flex-col gap-6">
                            <div>
                                <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Engagement</p>
                                <div className="flex items-end gap-3">
                                    <h4 className="text-3xl font-black text-white">82<span className="text-sm font-medium text-[#445566]">/100</span></h4>
                                    <span className="text-[#00E5A0] font-bold text-sm bg-[#00E5A0]/10 px-2 py-0.5 rounded-md mb-1">+14 pts YoY</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">eNPS</p>
                                <div className="flex items-end gap-3">
                                    <h4 className="text-3xl font-black text-white">48</h4>
                                    <span className="text-[#00E5A0] font-bold text-sm bg-[#00E5A0]/10 px-2 py-0.5 rounded-md mb-1">+26 pts YoY</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                            <Presentation size={18} className="text-[#8899AA]" /> Key Events Timeline
                        </h3>
                        <div className="space-y-4">
                            {EVENTS.map((evt, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full mt-1 shrink-0 shadow-[0_0_8px_currentColor]" style={{ backgroundColor: evt.color, color: evt.color }}></div>
                                        {i !== EVENTS.length - 1 && <div className="w-0.5 h-full bg-[#1A2A3A] my-1"></div>}
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-white font-bold text-sm leading-tight">{evt.name}</p>
                                        <p className="text-xs text-[#8899AA] mt-1">{evt.p1} - {evt.p2}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-2 py-2 border border-[#2A3A4A] text-[#8899AA] hover:text-white font-bold rounded-xl hover:bg-[#1A2A3A] transition-colors text-sm">
                            Manage Events Timeline
                        </button>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
    );
}
