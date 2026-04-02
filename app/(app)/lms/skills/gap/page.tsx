"use client";
import React from "react";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    Target, AlertTriangle, ArrowRight, BookOpen, ChevronRight, TrendingUp
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const RADAR_DATA = [
    { skill: 'React', current: 3, required: 4 },
    { skill: 'Node.js', current: 2, required: 3 },
    { skill: 'System Design', current: 2, required: 4 },
    { skill: 'AWS', current: 1, required: 3 },
    { skill: 'Testing', current: 4, required: 4 },
    { skill: 'Agile', current: 3, required: 3 },
];

const GAPS = [
    { skill: "System Design", levelDiff: 2, role: "Senior SDE Promotion", recCourse: "Advanced System Design" },
    { skill: "AWS", levelDiff: 2, role: "Senior SDE Promotion", recCourse: "AWS Solutions Architect" },
    { skill: "React", levelDiff: 1, role: "Senior SDE Promotion", recCourse: "Advanced React Patterns" },
    { skill: "Node.js", levelDiff: 1, role: "Senior SDE Promotion", recCourse: "Node.js Microservices" },
];

export default function SkillGapAnalysisScreen() {
    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Target size={28} className="text-[#FFB020]" /> Skill Gap Analysis
                </h1>
                <p className="text-[#8899AA]">Compare your current skills against the requirements for your target role.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Radar Chart */}
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#33E6FF]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h2 className="text-xl font-bold text-white">Current vs Target Role</h2>
                        <div className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg p-1 flex items-center text-xs">
                            <div className="flex items-center gap-1.5 px-2 py-1"><span className="w-2 h-2 rounded-full bg-[#33E6FF]"></span> Current (SDE II)</div>
                            <div className="flex items-center gap-1.5 px-2 py-1"><span className="w-2 h-2 rounded-full bg-[#FFB020]"></span> Target (Sr. SDE)</div>
                        </div>
                    </div>

                    <div className="h-80 w-full relative z-10">
                        <ChartWrapper height="h-full">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                                <PolarGrid stroke="#2A3A4A" />
                                <PolarAngleAxis dataKey="skill" tick={{ fill: '#8899AA', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#445566', fontSize: 10 }} />
                                <Radar name="Current" dataKey="current" stroke="#33E6FF" fill="#33E6FF" fillOpacity={0.3} strokeWidth={2} />
                                <Radar name="Required" dataKey="required" stroke="#FFB020" fill="#FFB020" fillOpacity={0.1} strokeWidth={2} strokeDasharray="3 3" />
                            </RadarChart>
                        </ChartWrapper>
                    </div>
                </div>

                {/* Summary & Recommendations */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#FF4444]/10 rounded-full blur-2xl"></div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                            <AlertTriangle size={20} className="text-[#FF4444]" /> Critical Gaps Identified
                        </h3>
                        <p className="text-sm text-[#8899AA] mb-6 relative z-10">You have 4 skill areas that are below the required proficiency level for your target role of Senior SDE.</p>

                        <div className="space-y-4 relative z-10">
                            {GAPS.map((gap, i) => (
                                <div key={i} className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-white">{gap.skill}</h4>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/20">-{gap.levelDiff} Level{gap.levelDiff > 1 ? 's' : ''}</span>
                                        </div>
                                        <p className="text-xs text-[#8899AA] uppercase tracking-wider">Required: {gap.role}</p>
                                    </div>
                                    <button className="shrink-0 px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-[#33E6FF] text-xs font-bold rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center justify-center gap-1.5">
                                        <BookOpen size={14} /> Add to Plan
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-8 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">Recommended Learning Path</h2>
                        <p className="text-sm text-[#8899AA]">Curated courses to bridge your skill gaps.</p>
                    </div>
                    <button className="px-6 py-2 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-colors flex items-center gap-2 shadow-lg shadow-[#00E5A0]/20">
                        Enroll in Path <TrendingUp size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {GAPS.map((gap, i) => (
                        <div key={i} className="bg-[#152336] border border-[#2A3A4A] rounded-xl p-5 hover:-translate-y-1 transition-transform group shadow-md cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#33E6FF]/5 rounded-bl-[100px] pointer-events-none"></div>
                            <div className="text-[10px] font-bold text-[#FFB020] bg-[#FFB020]/10 border border-[#FFB020]/20 w-max px-2 py-0.5 rounded uppercase tracking-wider mb-3">
                                Targets {gap.skill}
                            </div>
                            <h3 className="font-bold text-white mb-2 leading-snug group-hover:text-[#33E6FF] transition-colors">{gap.recCourse}</h3>
                            <div className="flex items-center text-xs font-semibold text-[#33E6FF] mt-4">
                                View Course <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
