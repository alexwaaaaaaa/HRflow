"use client";
import React from "react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { TrendingUp, Users, Target, BookOpen, ChevronUp } from "lucide-react";

const PERFORMANCE_DATA = [
    { month: "Jul", un_trained: 65, trained: 65 },
    { month: "Aug", un_trained: 66, trained: 70 },
    { month: "Sep", un_trained: 65, trained: 78 },
    { month: "Oct", un_trained: 67, trained: 85 },
    { month: "Nov", un_trained: 66, trained: 88 },
    { month: "Dec", un_trained: 68, trained: 92 },
];

interface KpiItem {
    label: string;
    val: string;
    sub: string;
    icon: React.ElementType;
    colorClass: string;
    bgClass: string;
}

const KPI_ITEMS: KpiItem[] = [
    { label: "Post-Training Perf. Lift", val: "+24%", sub: "Avg performance score diff", icon: TrendingUp, colorClass: "text-[#00E5A0]", bgClass: "bg-[#00E5A0]/10" },
    { label: "Application Rate", val: "72%", sub: "Skills applied within 30 days", icon: Target, colorClass: "text-[#33E6FF]", bgClass: "bg-[#33E6FF]/10" },
    { label: "Knowledge Retention", val: "88%", sub: "Passed 90-day refresher", icon: BookOpen, colorClass: "text-[#FFB020]", bgClass: "bg-[#FFB020]/10" },
    { label: "Promotion Rate", val: "18%", sub: "For certified employees", icon: Users, colorClass: "text-purple-400", bgClass: "bg-purple-500/10" },
];

interface RoiCourse {
    course: string;
    cat: string;
    impact: string;
    text: string;
}

const ROI_COURSES: RoiCourse[] = [
    { course: "Advanced React Patterns", cat: "Engineering", impact: "+28%", text: "Code quality score" },
    { course: "Managerial Leadership", cat: "Management", impact: "+15%", text: "Team retention rate" },
    { course: "Enterprise Sales Playbook", cat: "Sales", impact: "+42%", text: "Win rate increase" },
    { course: "Customer Success Strategies", cat: "Support", impact: "+18%", text: "CSAT score" },
];

export default function TrainingEffectivenessScreen() {
    return (
        <Page
            title="Training Effectiveness & ROI"
            subtitle="Measure the impact of learning programs on employee performance and business outcomes"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Analytics", href: "/lms/analytics/budget" },
                { label: "Effectiveness" },
            ]}
            maxWidth="1400px"
        >
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {KPI_ITEMS.map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                        <Card key={kpi.label} padding="lg" variant="elevated">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${kpi.bgClass}`}>
                                    <Icon size={24} className={kpi.colorClass} aria-hidden="true" />
                                </div>
                            </div>
                            <p className="text-3xl font-extrabold text-white mb-1">{kpi.val}</p>
                            <p className="text-sm font-semibold text-white mb-1">{kpi.label}</p>
                            <p className="text-xs text-[#8899AA]">{kpi.sub}</p>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card padding="lg" variant="elevated">
                    <CardHeader>
                        <CardTitle>Performance Trajectory</CardTitle>
                        <div className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg p-1 flex items-center text-xs">
                            <span className="flex items-center gap-1.5 px-2 py-1">
                                <span className="w-2 h-2 rounded-full bg-[#00E5A0]" aria-hidden="true" /> Trained Cohort
                            </span>
                            <span className="flex items-center gap-1.5 px-2 py-1">
                                <span className="w-2 h-2 rounded-full bg-[#445566]" aria-hidden="true" /> Untrained Cohort
                            </span>
                        </div>
                    </CardHeader>
                    <div className="h-80 w-full">
                        <ChartWrapper height="h-full">
                            <LineChart data={PERFORMANCE_DATA} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" stroke="#8899AA" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                                <YAxis stroke="#8899AA" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={[60, 100]} />
                                <RechartsTooltip contentStyle={{ backgroundColor: "#0A1420", borderColor: "#2A3A4A", borderRadius: "12px", color: "#fff" }} itemStyle={{ color: "#fff" }} />
                                <Line type="monotone" dataKey="trained" stroke="#00E5A0" strokeWidth={3} dot={{ r: 4, fill: "#00E5A0" }} activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="un_trained" stroke="#445566" strokeWidth={3} dot={{ r: 4, fill: "#445566" }} />
                            </LineChart>
                        </ChartWrapper>
                    </div>
                    <p className="text-center text-xs text-[#8899AA] mt-4">
                        Data based on performance appraisal scores (scale 0–100) before and after completing the &ldquo;Advanced Leadership&rdquo; curriculum.
                    </p>
                </Card>

                <Card padding="lg">
                    <CardTitle className="mb-6">Top Courses by ROI Impact</CardTitle>
                    <div className="space-y-4">
                        {ROI_COURSES.map((c, i) => (
                            <div
                                key={i}
                                className="bg-[#152336] p-4 rounded-xl border border-[#2A3A4A] flex items-center justify-between hover:bg-[#1A2A3A] transition-colors cursor-pointer"
                            >
                                <div>
                                    <h4 className="font-bold text-white mb-1">{c.course}</h4>
                                    <span className="text-xs text-[#8899AA] uppercase tracking-wider">{c.cat}</span>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1 font-bold text-[#00E5A0] text-lg">
                                        {c.impact} <ChevronUp size={16} aria-hidden="true" />
                                    </span>
                                    <p className="text-xs text-[#8899AA]">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </Page>
    );
}
