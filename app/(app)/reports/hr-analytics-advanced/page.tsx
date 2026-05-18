"use client";

import { Activity, Target, Users, Zap, TrendingUp } from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ZAxis } from "recharts";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─── Static data ──────────────────────────────────────────────────────────────

const HIGH_PERFORMER_DATA = [
    { name: "Engineering", compRatio: 1.15, perfScore: 4.8, count: 25 },
    { name: "Sales", compRatio: 0.95, perfScore: 4.2, count: 18 },
    { name: "Marketing", compRatio: 1.05, perfScore: 4.5, count: 12 },
    { name: "Finance", compRatio: 0.98, perfScore: 3.9, count: 8 },
    { name: "Ops", compRatio: 1.02, perfScore: 4.1, count: 15 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HRAnalyticsAdvancedPage() {
    return (
        <Page
            title="Advanced HR Analytics"
            subtitle="Multi-variable correlation analysis for compensation, performance, and retention."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "HR Analytics", href: "/reports/hr-analytics" },
                { label: "Advanced View" },
            ]}
            maxWidth="1280px"
        >
            <div className="space-y-6">
                {/* KPI cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card padding="lg">
                        <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center mb-4">
                            <TrendingUp size={20} aria-hidden="true" />
                        </div>
                        <p className="text-[#8899AA] text-sm font-medium mb-1">Impact of Pay on Tenure</p>
                        <p className="text-2xl font-bold text-white mb-1">
                            0.78{" "}
                            <span className="text-xs text-[#8899AA] font-normal">Correlation (r)</span>
                        </p>
                        <p className="text-xs text-emerald-400">Strong Positive Driver</p>
                    </Card>
                    <Card padding="lg">
                        <div className="w-10 h-10 bg-pink-500/10 text-pink-500 rounded-lg flex items-center justify-center mb-4">
                            <Target size={20} aria-hidden="true" />
                        </div>
                        <p className="text-[#8899AA] text-sm font-medium mb-1">Training to Performance</p>
                        <p className="text-2xl font-bold text-white mb-1">
                            0.45{" "}
                            <span className="text-xs text-[#8899AA] font-normal">Correlation (r)</span>
                        </p>
                        <p className="text-xs text-emerald-400">Moderate Positive Driver</p>
                    </Card>
                    <Card padding="lg">
                        <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-4">
                            <Users size={20} aria-hidden="true" />
                        </div>
                        <p className="text-[#8899AA] text-sm font-medium mb-1">Time to Productivity</p>
                        <p className="text-2xl font-bold text-white mb-1">
                            45 <span className="text-sm">Days</span>
                        </p>
                        <p className="text-xs text-emerald-400">-12 days YoY improvement</p>
                    </Card>
                    <Card padding="lg">
                        <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center mb-4">
                            <Zap size={20} aria-hidden="true" />
                        </div>
                        <p className="text-[#8899AA] text-sm font-medium mb-1">Regrettable Attrition Cost</p>
                        <p className="text-2xl font-bold text-white mb-1">
                            ₹1.8 <span className="text-sm">Cr/Yr</span>
                        </p>
                        <p className="text-xs text-pink-400">Estimated replacement cost</p>
                    </Card>
                </div>

                {/* Scatter + Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <Activity size={18} className="text-indigo-400" aria-hidden="true" />
                            Pay for Performance Alignment
                        </h2>
                        <p className="text-sm text-[#8899AA] mb-6">
                            Compa-Ratio vs Performance Score (Bubble size = employee count)
                        </p>
                        <div className="h-[350px] w-full">
                            <ChartWrapper height="h-full">
                                <ScatterChart margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                                    <XAxis
                                        type="number"
                                        dataKey="perfScore"
                                        name="Performance"
                                        domain={[3, 5]}
                                        stroke="#8899AA"
                                        label={{
                                            value: "Performance Score (1-5)",
                                            position: "bottom",
                                            fill: "#8899AA",
                                            fontSize: 12,
                                            dy: 10,
                                        }}
                                    />
                                    <YAxis
                                        type="number"
                                        dataKey="compRatio"
                                        name="Compa-Ratio"
                                        domain={[0.8, 1.3]}
                                        stroke="#8899AA"
                                        label={{
                                            value: "Compa-Ratio",
                                            angle: -90,
                                            position: "left",
                                            fill: "#8899AA",
                                            fontSize: 12,
                                            dx: -10,
                                        }}
                                    />
                                    <ZAxis
                                        type="number"
                                        dataKey="count"
                                        range={[50, 400]}
                                        name="Headcount"
                                    />
                                    <Tooltip
                                        cursor={{ strokeDasharray: "3 3", stroke: "#2A3A4A" }}
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Scatter
                                        name="Departments"
                                        data={HIGH_PERFORMER_DATA}
                                        fill="#6366f1"
                                        fillOpacity={0.6}
                                        stroke="#3b82f6"
                                    />
                                </ScatterChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Key Insights &amp; Action Items</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                                <h3 className="text-amber-500 font-bold mb-1">
                                    Flight Risk Alert: Sales (Top Performers)
                                </h3>
                                <p className="text-sm text-[#8899AA] mb-3">
                                    Your highest performing sales reps (Avg Score 4.2) are currently compensated
                                    below market median (Compa-Ratio: 0.95).
                                </p>
                                <Button variant="ghost" size="sm" className="text-amber-500">
                                    Review Compensation →
                                </Button>
                            </div>

                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                <h3 className="text-emerald-400 font-bold mb-1">
                                    Optimal Alignment: Engineering
                                </h3>
                                <p className="text-sm text-[#8899AA]">
                                    Engineering department shows excellent Pay-for-Performance alignment. Top
                                    performers are consistently rewarded above median (Compa-Ratio: 1.15).
                                </p>
                            </div>

                            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                                <h3 className="text-indigo-400 font-bold mb-1">
                                    Time to Productivity Bottleneck
                                </h3>
                                <p className="text-sm text-[#8899AA]">
                                    New hires in Marketing are taking 15 days longer to reach full productivity
                                    compared to other departments. Consider revamping their specialized onboarding
                                    track.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
