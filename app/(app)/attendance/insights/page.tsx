"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Lightbulb, TrendingDown, TrendingUp, Users, AlertTriangle } from "lucide-react";

const INSIGHTS = [
    {
        type: "Risk", severity: "High", title: "Sales Dept Attendance Below Threshold",
        desc: "Sales team attendance has dropped to 78% this week — 12% below company benchmark. 4 habitual latecomers identified.",
        action: "Schedule department check-in", metric: "78% attendance", trend: "down"
    },
    {
        type: "Pattern", severity: "Medium", title: "Monday Absenteeism Spike Detected",
        desc: "Monday absenteeism is 38% higher than regular working days. Pattern consistent for last 3 months.",
        action: "Review Monday patterns", metric: "+38% on Mondays", trend: "down"
    },
    {
        type: "Positive", severity: "Low", title: "Finance Team — 100% Attendance This Week",
        desc: "Finance department achieved perfect attendance for the 3rd consecutive week. Avg check-in: 08:48 AM.",
        action: "Recognize team", metric: "100% attendance", trend: "up"
    },
    {
        type: "Pattern", severity: "Medium", title: "Post-Holiday Absence Increase",
        desc: "Absence rates rise by 22% on the working day after every public holiday. 12 employees affected.",
        action: "Send pre-holiday reminder", metric: "+22% post-holiday", trend: "down"
    },
    {
        type: "Risk", severity: "High", title: "3 Employees with Pending Regularization",
        desc: "3 employees have not regularized their attendance for last month. LOP will be applied at payroll cutoff.",
        action: "Send reminder", metric: "3 pending", trend: "down"
    },
    {
        type: "Positive", severity: "Low", title: "WFH Productivity Correlation",
        desc: "Engineering employees working from home show 18% higher task completion rates vs in-office days.",
        action: "Review WFH policy", metric: "+18% productivity", trend: "up"
    },
];

const SEV: Record<string, { bg: string; text: string; border: string }> = {
    High: { bg: "bg-[#FF4444]/10", text: "text-[#FF4444]", border: "border-[#FF4444]/30" },
    Medium: { bg: "bg-[#FFB800]/10", text: "text-[#FFB800]", border: "border-[#FFB800]/30" },
    Low: { bg: "bg-[#00E5A0]/10", text: "text-[#00E5A0]", border: "border-[#00E5A0]/30" },
};

export default function AttendanceInsights() {
    const [filter, setFilter] = useState("All");

    const shown = INSIGHTS.filter(i => filter === "All" || i.type === filter || i.severity === filter);

    return (
        <Page
            title="Insights"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Insights" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Lightbulb className="w-6 h-6 text-[#FFB800]" /> Attendance Insights
                    </h2>
                    <p className="text-sm text-[#8899AA] mt-1">AI-powered insights based on attendance patterns and trends</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Insights Generated", val: INSIGHTS.length, icon: Lightbulb, color: "#FFB800" },
                    { label: "High Priority", val: INSIGHTS.filter(i => i.severity === "High").length, icon: AlertTriangle, color: "#FF4444" },
                    { label: "Positive Signals", val: INSIGHTS.filter(i => i.type === "Positive").length, icon: TrendingUp, color: "#00E5A0" },
                    { label: "Patterns Found", val: INSIGHTS.filter(i => i.type === "Pattern").length, icon: Users, color: "#0066FF" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${k.color}20` }}>
                            <k.icon className="w-5 h-5" style={{ color: k.color }} />
                        </div>
                        <div>
                            <p className="text-xs text-[#8899AA]">{k.label}</p>
                            <p className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1 w-fit mb-6">
                {["All", "Risk", "Pattern", "Positive", "High", "Medium"].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${filter === f ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>
                        {f}
                    </button>
                ))}
            </div>

            {/* Insights Cards */}
            <div className="space-y-4">
                {shown.map((insight, i) => {
                    const s = SEV[insight.severity];
                    return (
                        <div key={i} className={`bg-[#0D1928] border rounded-2xl p-5 ${insight.severity === "High" ? "border-[#FF4444]/30" : "border-[#1A2A3A]"}`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.bg}`}>
                                        {insight.trend === "down" ? <TrendingDown className={`w-4 h-4 ${s.text}`} /> : <TrendingUp className={`w-4 h-4 ${s.text}`} />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{insight.title}</h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.bg} ${s.text} border ${s.border}`}>{insight.severity}</span>
                                            <span className="text-[10px] text-[#445566]">{insight.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-bold ${s.text}`}>{insight.metric}</p>
                                </div>
                            </div>
                            <p className="text-sm text-[#8899AA] mb-3">{insight.desc}</p>
                            <button className={`text-xs px-3 py-1.5 rounded-lg border ${s.border} ${s.text} ${s.bg} hover:opacity-80`}>
                                {insight.action} →
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    
        </Page>
        );
}
