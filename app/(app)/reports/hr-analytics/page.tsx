"use client";

import { Download, Target, Users, DollarSign, Activity } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Line,
    ComposedChart,
    Area,
} from "recharts";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─── Static data ──────────────────────────────────────────────────────────────

const PRODUCTIVITY_DATA = [
    { month: "Oct", revenue: 120, hcc: 100 },
    { month: "Nov", revenue: 125, hcc: 102 },
    { month: "Dec", revenue: 140, hcc: 105 },
    { month: "Jan", revenue: 135, hcc: 106 },
    { month: "Feb", revenue: 150, hcc: 110 },
    { month: "Mar", revenue: 165, hcc: 115 },
];

const PYRAMID_DATA = [
    { level: "L1 (Entry)", ic: 140, mgr: 0 },
    { level: "L2 (Mid)", ic: 85, mgr: 20 },
    { level: "L3 (Senior)", ic: 10, mgr: 28 },
    { level: "L4 (Lead)", ic: 2, mgr: 13 },
    { level: "L5 (Exec)", ic: 0, mgr: 5 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HRAnalyticsPage() {
    return (
        <Page
            title="Strategic HR Analytics"
            subtitle="Correlate HR metrics with business performance to drive strategic decisions."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "HR Analytics" },
            ]}
            maxWidth="1280px"
            actions={
                <Button icon={<Download size={14} aria-hidden="true" />}>Export Dashboard</Button>
            }
        >
            <div className="space-y-6">
                {/* Strategic KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card padding="lg" className="relative overflow-hidden">
                        <Target
                            size={96}
                            className="absolute -right-4 -bottom-4 text-emerald-500 opacity-5"
                            aria-hidden="true"
                        />
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Revenue per Employee</p>
                        <p className="text-3xl font-bold text-emerald-400 mb-1">₹45.2 L</p>
                        <p className="text-xs text-[#8899AA]">+12% YoY Growth</p>
                    </Card>
                    <Card padding="lg" className="relative overflow-hidden">
                        <DollarSign
                            size={96}
                            className="absolute -right-4 -bottom-4 text-amber-500 opacity-5"
                            aria-hidden="true"
                        />
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Human Capital ROI</p>
                        <p className="text-3xl font-bold text-amber-500 mb-1">2.4x</p>
                        <p className="text-xs text-[#8899AA]">Return on payroll investment</p>
                    </Card>
                    <Card padding="lg" className="relative overflow-hidden">
                        <Activity
                            size={96}
                            className="absolute -right-4 -bottom-4 text-indigo-500 opacity-5"
                            aria-hidden="true"
                        />
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Span of Control</p>
                        <p className="text-3xl font-bold text-indigo-400 mb-1">1:8</p>
                        <p className="text-xs text-[#8899AA]">Avg direct reports per manager</p>
                    </Card>
                    <Card padding="lg" className="relative overflow-hidden">
                        <Users
                            size={96}
                            className="absolute -right-4 -bottom-4 text-pink-500 opacity-5"
                            aria-hidden="true"
                        />
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Quality of Hire</p>
                        <p className="text-3xl font-bold text-pink-400 mb-1">82%</p>
                        <p className="text-xs text-[#8899AA]">Based on 90-day performance</p>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">
                            Revenue Growth vs Headcount Cost Index
                        </h2>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <ComposedChart
                                    data={PRODUCTIVITY_DATA}
                                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="month" stroke="#8899AA" fontSize={12} />
                                    <YAxis
                                        yAxisId="left"
                                        stroke="#8899AA"
                                        fontSize={12}
                                        domain={[80, 200]}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        stroke="#8899AA"
                                        fontSize={12}
                                        domain={[80, 150]}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Area
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="revenue"
                                        name="Rev Index"
                                        fill="#10b981"
                                        stroke="#10b981"
                                        fillOpacity={0.2}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="hcc"
                                        name="Cost Index"
                                        stroke="#f59e0b"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                    />
                                </ComposedChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">
                            Pyramid Structure (Manager vs IC)
                        </h2>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <BarChart
                                    data={PYRAMID_DATA}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                    <XAxis type="number" stroke="#8899AA" fontSize={12} />
                                    <YAxis
                                        dataKey="level"
                                        type="category"
                                        stroke="#8899AA"
                                        fontSize={12}
                                        width={100}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "#1A2A3A" }}
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar
                                        dataKey="ic"
                                        name="Ind. Contributor"
                                        stackId="a"
                                        fill="#6366f1"
                                        barSize={20}
                                    />
                                    <Bar
                                        dataKey="mgr"
                                        name="People Manager"
                                        stackId="a"
                                        fill="#ec4899"
                                        radius={[0, 4, 4, 0]}
                                    />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                </div>

                {/* Predictive insight */}
                <Card padding="lg" className="border-indigo-500/20 bg-indigo-500/5">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Activity size={20} aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="text-indigo-400 font-bold mb-1">Predictive Insight</h3>
                            <p className="text-sm text-white leading-relaxed">
                                Based on current revenue velocity and historical headcount ratios, you need to ramp
                                up hiring in the{" "}
                                <strong>Sales - Enterprise</strong> division by{" "}
                                <span className="text-amber-500 font-bold">15%</span> next quarter to meet your
                                projected sales targets. Current lead time to fill these roles is 42 days.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
