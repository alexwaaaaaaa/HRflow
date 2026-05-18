"use client";
import React from "react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { AlertTriangle, BookOpen, ChevronRight, TrendingUp } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const RADAR_DATA = [
    { skill: "React", current: 3, required: 4 },
    { skill: "Node.js", current: 2, required: 3 },
    { skill: "System Design", current: 2, required: 4 },
    { skill: "AWS", current: 1, required: 3 },
    { skill: "Testing", current: 4, required: 4 },
    { skill: "Agile", current: 3, required: 3 },
];

interface SkillGap {
    skill: string;
    levelDiff: number;
    role: string;
    recCourse: string;
}

const GAPS: SkillGap[] = [
    { skill: "System Design", levelDiff: 2, role: "Senior SDE Promotion", recCourse: "Advanced System Design" },
    { skill: "AWS", levelDiff: 2, role: "Senior SDE Promotion", recCourse: "AWS Solutions Architect" },
    { skill: "React", levelDiff: 1, role: "Senior SDE Promotion", recCourse: "Advanced React Patterns" },
    { skill: "Node.js", levelDiff: 1, role: "Senior SDE Promotion", recCourse: "Node.js Microservices" },
];

export default function SkillGapAnalysisScreen() {
    return (
        <Page
            title="Skill Gap Analysis"
            subtitle="Compare your current skills against the requirements for your target role"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Skills", href: "/lms/skills/matrix" },
                { label: "Gap Analysis" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Radar Chart */}
                <Card padding="lg" variant="elevated">
                    <CardHeader>
                        <CardTitle>Current vs Target Role</CardTitle>
                        <div className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg p-1 flex items-center text-xs">
                            <span className="flex items-center gap-1.5 px-2 py-1">
                                <span className="w-2 h-2 rounded-full bg-[#33E6FF]" aria-hidden="true" /> Current (SDE II)
                            </span>
                            <span className="flex items-center gap-1.5 px-2 py-1">
                                <span className="w-2 h-2 rounded-full bg-[#FFB020]" aria-hidden="true" /> Target (Sr. SDE)
                            </span>
                        </div>
                    </CardHeader>
                    <div className="h-80 w-full">
                        <ChartWrapper height="h-full">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                                <PolarGrid stroke="#2A3A4A" />
                                <PolarAngleAxis dataKey="skill" tick={{ fill: "#8899AA", fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: "#445566", fontSize: 10 }} />
                                <Radar name="Current" dataKey="current" stroke="#33E6FF" fill="#33E6FF" fillOpacity={0.3} strokeWidth={2} />
                                <Radar name="Required" dataKey="required" stroke="#FFB020" fill="#FFB020" fillOpacity={0.1} strokeWidth={2} strokeDasharray="3 3" />
                            </RadarChart>
                        </ChartWrapper>
                    </div>
                </Card>

                {/* Summary & Recommendations */}
                <div className="space-y-6">
                    <Card padding="lg" variant="elevated">
                        <CardTitle className="flex items-center gap-2 mb-4">
                            <AlertTriangle size={18} className="text-[#FF4444]" aria-hidden="true" /> Critical Gaps Identified
                        </CardTitle>
                        <p className="text-sm text-[#8899AA] mb-6">
                            You have 4 skill areas that are below the required proficiency level for your target role of Senior SDE.
                        </p>

                        <div className="space-y-4">
                            {GAPS.map((gap, i) => (
                                <div key={i} className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-white">{gap.skill}</h4>
                                            <Badge variant="danger">-{gap.levelDiff} Level{gap.levelDiff > 1 ? "s" : ""}</Badge>
                                        </div>
                                        <p className="text-xs text-[#8899AA] uppercase tracking-wider">Required: {gap.role}</p>
                                    </div>
                                    <Button variant="secondary" size="sm" icon={<BookOpen size={12} aria-hidden="true" />}>
                                        Add to Plan
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            <Card padding="lg">
                <CardHeader>
                    <div>
                        <CardTitle>Recommended Learning Path</CardTitle>
                        <p className="text-sm text-[#8899AA] mt-1">Curated courses to bridge your skill gaps.</p>
                    </div>
                    <Button variant="primary" icon={<TrendingUp size={16} />}>Enroll in Path</Button>
                </CardHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {GAPS.map((gap, i) => (
                        <div
                            key={i}
                            className="bg-[#152336] border border-[#2A3A4A] rounded-xl p-5 hover:-translate-y-1 transition-transform group shadow-md cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#33E6FF]/5 rounded-bl-[100px] pointer-events-none" aria-hidden="true" />
                            <Badge variant="warning" className="mb-3">Targets {gap.skill}</Badge>
                            <h3 className="font-bold text-white mb-2 leading-snug group-hover:text-[#33E6FF] transition-colors">{gap.recCourse}</h3>
                            <div className="flex items-center text-xs font-semibold text-[#33E6FF] mt-4">
                                View Course <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </Page>
    );
}
