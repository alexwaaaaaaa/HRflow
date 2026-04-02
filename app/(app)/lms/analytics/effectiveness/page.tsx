"use client";
import React from "react";
import ChartWrapper from '@/components/ui/ChartWrapper';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import {
    Activity, TrendingUp, Users, Target, BookOpen, ChevronUp
} from "lucide-react";

const PERFORMANCE_DATA = [
    { month: 'Jul', un_trained: 65, trained: 65 },
    { month: 'Aug', un_trained: 66, trained: 70 },
    { month: 'Sep', un_trained: 65, trained: 78 },
    { month: 'Oct', un_trained: 67, trained: 85 },
    { month: 'Nov', un_trained: 66, trained: 88 },
    { month: 'Dec', un_trained: 68, trained: 92 },
];

export default function TrainingEffectivenessScreen() {
    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Activity size={28} className="text-[#00E5A0]" /> Training Effectiveness & ROI
                </h1>
                <p className="text-[#8899AA]">Measure the impact of learning programs on employee performance and business outcomes.</p>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Post-Training Perf. Lift", val: "+24%", sub: "Avg performance score diff", icon: TrendingUp, color: "text-[#00E5A0]", bg: "bg-[#00E5A0]/10" },
                    { label: "Application Rate", val: "72%", sub: "Skills applied within 30 days", icon: Target, color: "text-[#33E6FF]", bg: "bg-[#33E6FF]/10" },
                    { label: "Knowledge Retention", val: "88%", sub: "Passed 90-day refresher", icon: BookOpen, color: "text-[#FFB020]", bg: "bg-[#FFB020]/10" },
                    { label: "Promotion Rate", val: "18%", sub: "For certified employees", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" }
                ].map((kpi, i) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={i} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-xl ${kpi.bg}`}>
                                    <Icon size={24} className={kpi.color} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-extrabold text-white mb-1 relative z-10">{kpi.val}</h3>
                            <p className="text-sm font-semibold text-white mb-1 relative z-10">{kpi.label}</p>
                            <p className="text-xs text-[#8899AA] relative z-10">{kpi.sub}</p>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5A0]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h2 className="text-xl font-bold text-white">Performance Trajectory</h2>
                        <div className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg p-1 flex items-center text-xs">
                            <div className="flex items-center gap-1.5 px-2 py-1"><span className="w-2 h-2 rounded-full bg-[#00E5A0]"></span> Trained Cohort</div>
                            <div className="flex items-center gap-1.5 px-2 py-1"><span className="w-2 h-2 rounded-full bg-[#445566]"></span> Untrained Cohort</div>
                        </div>
                    </div>

                    <div className="h-80 w-full relative z-10">
                        <ChartWrapper height="h-full">
                            <LineChart data={PERFORMANCE_DATA} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" stroke="#8899AA" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                                <YAxis stroke="#8899AA" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={[60, 100]} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#0A1420', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="trained" stroke="#00E5A0" strokeWidth={3} dot={{ r: 4, fill: '#00E5A0' }} activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="un_trained" stroke="#445566" strokeWidth={3} dot={{ r: 4, fill: '#445566' }} />
                            </LineChart>
                        </ChartWrapper>
                    </div>
                    <p className="text-center text-xs text-[#8899AA] mt-4 relative z-10">Data based on performance appraisal scores (scale 0-100) before and after completing the "Advanced Leadership" curriculum.</p>
                </div>

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Top Courses by ROI Impact</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { course: "Advanced React Patterns", cat: "Engineering", impact: "+28%", text: "Code quality score" },
                            { course: "Managerial Leadership", cat: "Management", impact: "+15%", text: "Team retention rate" },
                            { course: "Enterprise Sales Playbook", cat: "Sales", impact: "+42%", text: "Win rate increase" },
                            { course: "Customer Success Strategies", cat: "Support", impact: "+18%", text: "CSAT score" },
                        ].map((c, i) => (
                            <div key={i} className="bg-[#152336] p-4 rounded-xl border border-[#2A3A4A] flex items-center justify-between hover:bg-[#1A2A3A] transition-colors cursor-pointer">
                                <div>
                                    <h4 className="font-bold text-white mb-1">{c.course}</h4>
                                    <span className="text-xs text-[#8899AA] uppercase tracking-wider">{c.cat}</span>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1 font-bold text-[#00E5A0] text-lg">
                                        {c.impact} <ChevronUp size={16} />
                                    </span>
                                    <p className="text-xs text-[#8899AA]">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
