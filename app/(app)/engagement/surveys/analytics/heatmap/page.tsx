"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import {
    Grid3X3, Download, Filter, TrendingUp, TrendingDown
} from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';
import { seededFloats } from '@/lib/random';

const DEPARTMENTS = ['Engineering', 'Product', 'Sales', 'Marketing', 'Customer Success', 'HR', 'Finance', 'Legal'];
const DRIVERS = ['Work-Life Balance', 'Career Growth', 'Compensation', 'Manager Support', 'Company Culture', 'Alignment with Goals'];

// Generate dummy heatmap data Let z be the score (0-100)
const HEATMAP_DATA = DEPARTMENTS.flatMap((dept, yIndex) =>
    DRIVERS.map((driver, xIndex) => {
        // some pseudo-random but realistic looking scores
        let baseScore = 60 + (yIndex * 5) - (xIndex * 3);
        if (dept === 'Sales' && driver === 'Work-Life Balance') baseScore = 30;
        if (dept === 'Engineering' && driver === 'Compensation') baseScore = 85;
        if (dept === 'HR' && driver === 'Company Culture') baseScore = 90;

        // clamp between 0-100 — seeded, not Math.random()
        const [rand] = seededFloats(yIndex * 100 + xIndex, 1);
        const score = Math.max(0, Math.min(100, baseScore + Math.floor(rand * 20 - 10)));

        return {
            x: xIndex,
            y: yIndex,
            z: score,
            dept,
            driver
        };
    })
);

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#152336] border border-[#2A3A4A] p-3 rounded-xl shadow-xl">
                <p className="text-white font-bold mb-1">{data.dept} • {data.driver}</p>
                <p className="text-sm">Score: <span className={`font-bold ${data.z >= 70 ? 'text-[#00E5A0]' : data.z >= 50 ? 'text-[#FFB020]' : 'text-[#FF4444]'}`}>{data.z}</span>/100</p>
            </div>
        );
    }
    return null;
};

export default function HeatmapScreen() {
    const [metric, setMetric] = useState('Favorability');

    const getColor = (score: number) => {
        if (score >= 75) return '#00E5A0'; // High/Green
        if (score >= 50) return '#FFB020'; // Med/Yellow
        return '#FF4444'; // Low/Red
    };

    return (
        <Page
            title="Score Heatmap"
            subtitle="Identify hotspots and problem areas across different demographics."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Surveys", href: "/engagement/surveys" }, { label: "Analytics", href: "/engagement/surveys/analytics" }, { label: "Heatmap" }]}
            maxWidth="1400px"
        >









        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Grid3X3 size={32} className="text-[#33E6FF]" /> Score Heatmap
                    </h1>
                    <p className="text-[#8899AA]">Identify hotspots and problem areas across different demographics.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <select
                        value={metric}
                        onChange={(e) => setMetric(e.target.value)}
                        className="px-4 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold text-sm rounded-xl focus:outline-none focus:border-[#33E6FF] appearance-none cursor-pointer"
                    >
                        <option>Favorability</option>
                        <option>Participation Rate</option>
                        <option>eNPS</option>
                    </select>
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Filter size={16} /> Filters
                    </button>
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 lg:col-span-3 bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl overflow-x-auto relative">
                    <h3 className="text-white font-bold mb-6">Department vs. Engagement Drivers</h3>

                    <div className="min-w-[800px] h-[500px]">
                        <ChartWrapper height="h-full">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 120 }}>
                                <CartesianGrid stroke="#1A2A3A" />
                                <XAxis
                                    type="number"
                                    dataKey="x"
                                    name="driver"
                                    domain={[-0.5, DRIVERS.length - 0.5]}
                                    ticks={DRIVERS.map((_, i) => i)}
                                    tickFormatter={(v) => DRIVERS[v] || ''}
                                    stroke="#8899AA"
                                    tick={{ fill: '#8899AA', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    angle={-45}
                                    textAnchor="end"
                                    dx={-10}
                                    dy={10}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="y"
                                    name="dept"
                                    domain={[-0.5, DEPARTMENTS.length - 0.5]}
                                    ticks={DEPARTMENTS.map((_, i) => i)}
                                    tickFormatter={(v) => DEPARTMENTS[v] || ''}
                                    stroke="#8899AA"
                                    tick={{ fill: '#8899AA', fontSize: 13, fontWeight: 'bold' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <ZAxis type="number" dataKey="z" range={[800, 800]} name="score" />
                                <Tooltip cursor={{ strokeDasharray: '3 3', stroke: '#33E6FF' }} content={<CustomTooltip />} />
                                <Scatter data={HEATMAP_DATA} shape="square">
                                    {HEATMAP_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getColor(entry.z)} opacity={0.8} className="hover:opacity-100 hover:stroke-white hover:stroke-2 transition-all cursor-pointer" />
                                    ))}
                                </Scatter>
                            </ScatterChart>
                        </ChartWrapper>
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-6 border-t border-[#1A2A3A] pt-4">
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#FF4444] rounded"></div> <span className="text-xs text-[#8899AA] font-bold">Needs Attention (&lt;50)</span></div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#FFB020] rounded"></div> <span className="text-xs text-[#8899AA] font-bold">Average (50-74)</span></div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#00E5A0] rounded"></div> <span className="text-xs text-[#8899AA] font-bold">Excellent (75+)</span></div>
                    </div>
                </div>

                {/* Sidebar Insights */}
                <div className="col-span-1 space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-[#00E5A0]" /> Top Strengths
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-[#152336] p-3 rounded-xl border border-[#2A3A4A]">
                                <p className="text-sm font-bold text-white mb-1">Company Culture in HR</p>
                                <p className="text-xs text-[#00E5A0] font-black">90 / 100 Score</p>
                            </div>
                            <div className="bg-[#152336] p-3 rounded-xl border border-[#2A3A4A]">
                                <p className="text-sm font-bold text-white mb-1">Compensation in Engineering</p>
                                <p className="text-xs text-[#00E5A0] font-black">85 / 100 Score</p>
                            </div>
                            <div className="bg-[#152336] p-3 rounded-xl border border-[#2A3A4A]">
                                <p className="text-sm font-bold text-white mb-1">Goal Alignment in Prod</p>
                                <p className="text-xs text-[#00E5A0] font-black">82 / 100 Score</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <TrendingDown size={18} className="text-[#FF4444]" /> Critical Areas
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-[#FF4444]/10 p-3 rounded-xl border border-[#FF4444]/30">
                                <p className="text-sm font-bold text-white mb-1">Work-Life Balance in Sales</p>
                                <p className="text-xs text-[#FF4444] font-black mb-2">30 / 100 Score</p>
                                <button className="text-xs font-bold text-[#FF4444] hover:underline">Create Action Plan →</button>
                            </div>
                            <div className="bg-[#FF4444]/10 p-3 rounded-xl border border-[#FF4444]/30">
                                <p className="text-sm font-bold text-white mb-1">Career Growth in CS</p>
                                <p className="text-xs text-[#FF4444] font-black mb-2">42 / 100 Score</p>
                                <button className="text-xs font-bold text-[#FF4444] hover:underline">Create Action Plan →</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        

        

        

            
        </Page>
    );
}
