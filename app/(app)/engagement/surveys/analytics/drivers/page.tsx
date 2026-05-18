"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import {
    Activity, Download, TrendingUp, TrendingDown, Layers, Zap
} from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, CartesianGrid, ReferenceLine } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

// Data format: x = Impact on Engagement (Correlation 0-1), y = Current Score (0-100), z = Size (Importance/Mentions)
const DRIVER_DATA = [
    { id: 1, name: 'Work-Life Balance', impact: 0.85, score: 42, mentions: 120, category: 'Wellbeing' },
    { id: 2, name: 'Career Growth', impact: 0.78, score: 55, mentions: 95, category: 'Development' },
    { id: 3, name: 'Compensation', impact: 0.65, score: 72, mentions: 150, category: 'Rewards' },
    { id: 4, name: 'Manager Support', impact: 0.92, score: 68, mentions: 80, category: 'Leadership' },
    { id: 5, name: 'Company Culture', impact: 0.75, score: 85, mentions: 200, category: 'Environment' },
    { id: 6, name: 'Goal Alignment', impact: 0.55, score: 78, mentions: 45, category: 'Strategy' },
    { id: 7, name: 'Tools & Resources', impact: 0.45, score: 62, mentions: 110, category: 'Environment' },
    { id: 8, name: 'Recognition', impact: 0.70, score: 58, mentions: 85, category: 'Rewards' },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        // Determine priority quadrant
        let priority = "Maintain";
        if (data.impact > 0.7 && data.score < 60) priority = "Critical Focus";
        else if (data.impact > 0.7 && data.score >= 60) priority = "Key Strength";
        else if (data.impact <= 0.7 && data.score < 60) priority = "Secondary Area";

        return (
            <div className="bg-[#152336] border border-[#2A3A4A] p-4 rounded-2xl shadow-2xl min-w-[200px]">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-white font-bold text-lg">{data.name}</p>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${priority === 'Critical Focus' ? 'bg-[#FF4444]/10 text-[#FF4444]' : priority === 'Key Strength' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : 'bg-[#33E6FF]/10 text-[#33E6FF]'}`}>
                        {priority}
                    </span>
                </div>
                <p className="text-sm text-[#8899AA] mb-4">{data.category}</p>
                <div className="space-y-1">
                    <div className="flex justify-between text-sm"><span className="text-[#8899AA]">Impact:</span> <span className="font-bold text-white">{(data.impact * 100).toFixed(0)}%</span></div>
                    <div className="flex justify-between text-sm"><span className="text-[#8899AA]">Score:</span> <span className={`font-bold ${data.score >= 70 ? 'text-[#00E5A0]' : data.score >= 50 ? 'text-[#FFB020]' : 'text-[#FF4444]'}`}>{data.score}/100</span></div>
                </div>
            </div>
        );
    }
    return null;
};

export default function DriverAnalysisScreen() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredData = activeCategory === 'All' ? DRIVER_DATA : DRIVER_DATA.filter(d => d.category === activeCategory);

    return (
        <Page
            title="Driver Analysis"
            subtitle="Discover which factors have the highest mathematical impact on overall engagement."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Surveys", href: "/engagement/surveys" }, { label: "Analytics", href: "/engagement/surveys/analytics" }, { label: "Drivers" }]}
            maxWidth="1400px"
        >

        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Activity size={32} className="text-[#33E6FF]" /> Driver Analysis
                    </h1>
                    <p className="text-[#8899AA]">Discover which factors have the highest mathematical impact on overall engagement.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <select
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="px-4 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold text-sm rounded-xl focus:outline-none focus:border-[#33E6FF] appearance-none cursor-pointer"
                    >
                        <option>All</option>
                        <option>Wellbeing</option>
                        <option>Development</option>
                        <option>Rewards</option>
                        <option>Leadership</option>
                        <option>Environment</option>
                    </select>
                    <button className="px-5 py-2.5 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Download size={18} /> Export Matrix
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">

                {/* Main Chart */}
                <div className="col-span-1 xl:col-span-3 bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            <Layers size={20} className="text-[#33E6FF]" /> Impact vs. Performance Matrix
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-[#8899AA] bg-[#152336] px-3 py-1.5 rounded-lg border border-[#2A3A4A]">
                            <Zap size={14} className="text-[#FFB020]" /> Bubble size = Mention frequency
                        </div>
                    </div>

                    <div className="flex-1 w-full min-h-[500px] relative">

                        {/* Quadrant Labels */}
                        <div className="absolute top-4 left-4 text-[#8899AA] text-xs font-bold uppercase tracking-wider opacity-50 z-10 pointer-events-none">Secondary Area<br />(Low Impact, Low Score)</div>
                        <div className="absolute top-4 right-4 text-[#FF4444] text-xs font-bold uppercase tracking-wider text-right opacity-80 z-10 pointer-events-none">Critical Focus<br />(High Impact, Low Score)</div>
                        <div className="absolute bottom-12 left-4 text-[#8899AA] text-xs font-bold uppercase tracking-wider opacity-50 z-10 pointer-events-none">Hidden Strength<br />(Low Impact, High Score)</div>
                        <div className="absolute bottom-12 right-4 text-[#00E5A0] text-xs font-bold uppercase tracking-wider text-right opacity-80 z-10 pointer-events-none">Key Strength<br />(High Impact, High Score)</div>

                        <ChartWrapper height="h-full">
                            <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
                                <CartesianGrid stroke="#1A2A3A" strokeDasharray="3 3" />

                                {/* X = Score, inverted domain so low score is right (for standard matrix layout) or standard. Let's do standard: right is high score. Wait, usually matrix is Impact(y) vs Score(x). Let's do Impact(x) vs Score(y) */}
                                {/* Standard Priority Matrix: X = Impact, Y = Score (inverted so low score is top/right if we want red there). Let's stick to standard math: X=Impact (0-1), Y=Score (0-100). */}

                                <XAxis
                                    type="number"
                                    dataKey="impact"
                                    name="Impact on Engagement"
                                    domain={[0.2, 1.0]}
                                    stroke="#8899AA"
                                    tick={{ fill: '#8899AA', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                                >
                                </XAxis>

                                <YAxis
                                    type="number"
                                    dataKey="score"
                                    name="Current Score"
                                    domain={[0, 100]}
                                    stroke="#8899AA"
                                    tick={{ fill: '#8899AA', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <ZAxis type="number" dataKey="mentions" range={[100, 1500]} name="Mentions" />
                                <Tooltip cursor={{ strokeDasharray: '3 3', stroke: '#33E6FF' }} content={<CustomTooltip />} />

                                {/* Define Quadrants centrally. Let avg impact be 0.7, avg score be 60 */}
                                <ReferenceLine x={0.7} stroke="#445566" strokeOpacity={0.5} strokeDasharray="3 3" />
                                <ReferenceLine y={60} stroke="#445566" strokeOpacity={0.5} strokeDasharray="3 3" />

                                <Scatter data={filteredData} shape="circle">
                                    {filteredData.map((entry, index) => {
                                        let fill = '#33E6FF'; // Default Secondary
                                        if (entry.impact > 0.7 && entry.score < 60) fill = '#FF4444'; // Critical
                                        else if (entry.impact > 0.7 && entry.score >= 60) fill = '#00E5A0'; // Key Strength

                                        return (


                                            <Cell
                                                key={`cell-${index}`}
                                                fill={fill}
                                                opacity={0.7}
                                                className="hover:opacity-100 hover:stroke-white hover:stroke-2 transition-all cursor-pointer"
                                            />
                                        
        
)
                                    })}
                                </Scatter>
                            </ScatterChart>
                        </ChartWrapper>

                        <div className="absolute bottom-0 left-0 w-full text-center text-[#8899AA] text-sm font-bold mt-2">
                            Impact on Engagement (Correlation) →
                        </div>
                        <div className="absolute top-1/2 -left-8 -rotate-90 text-center text-[#8899AA] text-sm font-bold origin-center translate-y-[-50%]">
                            ← Current Score / Favorability
                        </div>

                    </div>
                </div>

                {/* Sidebar Action Areas */}
                <div className="col-span-1 space-y-6">

                    <div className="bg-[#1A2A3A] border border-[#FF4444]/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(255,68,68,0.1)]">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <TrendingDown size={18} className="text-[#FF4444]" /> Critical Priorities
                        </h3>
                        <p className="text-sm text-[#8899AA] mb-4">High impact, low performing areas. Focus action plans here first.</p>

                        <div className="space-y-3">
                            {DRIVER_DATA.filter(d => d.impact > 0.7 && d.score < 60).map(d => (
                                <div key={d.id} className="bg-[#0F1C2E] p-4 rounded-2xl border border-[#2A3A4A] flex justify-between items-center group hover:border-[#FF4444]/50 transition-colors">
                                    <div>
                                        <p className="text-white font-bold text-sm mb-1 group-hover:text-[#FF4444] transition-colors">{d.name}</p>
                                        <p className="text-xs text-[#8899AA]">Score: <span className="text-[#FF4444] font-bold">{d.score}</span></p>
                                    </div>
                                    <button className="p-2 bg-[#152336] rounded-lg text-[#8899AA] hover:bg-[#FF4444] hover:text-white transition-colors">
                                        <Zap size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-[#00E5A0]" /> Leverage Strengths
                        </h3>
                        <p className="text-sm text-[#8899AA] mb-4">High impact, high performing areas. Maintain and celebrate these.</p>

                        <div className="space-y-3">
                            {DRIVER_DATA.filter(d => d.impact > 0.7 && d.score >= 60).sort((a, b) => b.score - a.score).slice(0, 3).map(d => (
                                <div key={d.id} className="bg-[#152336] border border-[#2A3A4A] px-4 py-3 rounded-2xl flex justify-between items-center">
                                    <span className="text-white text-sm font-bold">{d.name}</span>
                                    <span className="text-[#00E5A0] text-sm font-black">{d.score}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    
        </Page>
    );
}
