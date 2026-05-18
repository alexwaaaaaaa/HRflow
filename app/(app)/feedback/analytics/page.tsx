"use client";
import { useState } from "react";
import { Download, TrendingUp, Users, MessageCircle, Star } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
    Legend,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
} from "recharts";

interface KpiItem {
    label: string;
    value: string;
    icon: React.ElementType;
    color: string;
}

const OVERVIEW: KpiItem[] = [
    { label: "Total Feedbacks", value: "247", icon: MessageCircle, color: "#9D00FF" },
    { label: "Avg Rating", value: "4.1 / 5", icon: Star, color: "#FFB800" },
    { label: "Participation Rate", value: "91%", icon: Users, color: "#00E5A0" },
    { label: "Improvement vs Last Cycle", value: "+0.4", icon: TrendingUp, color: "#0066FF" },
];

interface DeptRow {
    dept: string;
    avg: number;
}

const DEPT_BREAKDOWN: DeptRow[] = [
    { dept: "Eng", avg: 4.3 },
    { dept: "Sales", avg: 3.8 },
    { dept: "Mktg", avg: 4.1 },
    { dept: "Product", avg: 4.0 },
    { dept: "HR", avg: 4.5 },
    { dept: "Ops", avg: 3.9 },
];

const TREND = [
    { cycle: "Q2 2024", avg: 3.6 },
    { cycle: "Q3 2024", avg: 3.8 },
    { cycle: "Q4 2024", avg: 3.9 },
    { cycle: "Q1 2025", avg: 4.1 },
];

const RADAR_DATA = [
    { subject: "Leadership", org: 4.0 },
    { subject: "Execution", org: 4.2 },
    { subject: "Collaboration", org: 4.4 },
    { subject: "Communication", org: 3.8 },
    { subject: "Innovation", org: 3.9 },
];

const TABS = ["Department", "Trend", "Competency"] as const;

const _RATING_VARIANT: Record<string, "success" | "warning" | "danger"> = {};

function getRatingVariant(avg: number): "success" | "warning" | "danger" {
    if (avg >= 4.2) return "success";
    if (avg >= 3.8) return "warning";
    return "danger";
}

const DEPT_COLUMNS: Column<DeptRow>[] = [
    {
        key: "dept",
        label: "Department",
        render: (d) => <span className="font-semibold text-white">{d.dept}</span>,
        sortable: true,
        sortValue: (d) => d.dept,
    },
    {
        key: "responses",
        label: "Responses",
        align: "right",
        render: (d) => <span className="text-[#CCDDEE]">{Math.round(d.avg * 10)}</span>,
    },
    {
        key: "avg",
        label: "Avg Rating",
        align: "center",
        render: (d) => <Badge variant={getRatingVariant(d.avg)}>{d.avg.toFixed(1)}</Badge>,
        sortable: true,
        sortValue: (d) => d.avg,
    },
    {
        key: "participation",
        label: "Participation",
        align: "right",
        render: (d) => <span className="text-[#CCDDEE]">{Math.round(d.avg * 20)}%</span>,
    },
    {
        key: "delta",
        label: "vs Last Cycle",
        align: "right",
        render: (d) => (
            <span className="font-semibold text-[#00E5A0]">+{(d.avg - 3.7).toFixed(1)}</span>
        ),
    },
];

export default function FeedbackAnalyticsPage() {
    const [tab, setTab] = useState<0 | 1 | 2>(0);

    return (
        <Page
            title="Feedback Analytics"
            subtitle="Organization-wide 360° feedback insights · Mid-Year 2025"
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "Analytics" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Download size={14} />}>
                    Export Report
                </Button>
            }
        >
            {/* KPI tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {OVERVIEW.map((o) => (
                    <Card key={o.label} padding="md">
                        <div className="flex items-start justify-between mb-2">
                            <p className="text-xs text-[#8899AA]">{o.label}</p>
                            <o.icon size={14} style={{ color: o.color }} aria-hidden="true" />
                        </div>
                        <p className="text-2xl font-bold" style={{ color: o.color }}>
                            {o.value}
                        </p>
                    </Card>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#1A2A3A]" role="tablist" aria-label="Analytics views">
                {TABS.map((t, i) => (
                    <button
                        key={t}
                        type="button"
                        role="tab"
                        aria-selected={tab === i}
                        aria-controls={`analytics-panel-${i}`}
                        id={`analytics-tab-${i}`}
                        onClick={() => setTab(i as 0 | 1 | 2)}
                        className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                            tab === i
                                ? "border-[#9D00FF] text-white"
                                : "border-transparent text-[#8899AA] hover:text-white"
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div
                id={`analytics-panel-${tab}`}
                role="tabpanel"
                aria-labelledby={`analytics-tab-${tab}`}
            >
                {tab === 0 && (
                    <Card padding="lg">
                        <h2 className="text-sm font-semibold text-white mb-4">
                            Average 360 Rating by Department
                        </h2>
                        <div className="h-64">
                            <ChartWrapper height="h-full">
                                <BarChart data={DEPT_BREAKDOWN} barSize={36}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#1A2A3A"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="dept"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                    />
                                    <YAxis
                                        domain={[3, 5]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#060B14",
                                            border: "1px solid #1A2A3A",
                                            borderRadius: 8,
                                        }}
                                        itemStyle={{ color: "#fff", fontSize: 12 }}
                                    />
                                    <Bar
                                        dataKey="avg"
                                        name="Avg Rating"
                                        fill="#9D00FF"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                )}
                {tab === 1 && (
                    <Card padding="lg">
                        <h2 className="text-sm font-semibold text-white mb-4">
                            Avg Rating Trend Across Cycles
                        </h2>
                        <div className="h-64">
                            <ChartWrapper height="h-full">
                                <LineChart data={TREND}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#1A2A3A"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="cycle"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                    />
                                    <YAxis
                                        domain={[3, 5]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#060B14",
                                            border: "1px solid #1A2A3A",
                                            borderRadius: 8,
                                        }}
                                        itemStyle={{ color: "#fff", fontSize: 12 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="avg"
                                        name="Avg Rating"
                                        stroke="#9D00FF"
                                        strokeWidth={2.5}
                                        dot={{ fill: "#9D00FF", r: 4 }}
                                    />
                                </LineChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                )}
                {tab === 2 && (
                    <Card padding="lg">
                        <h2 className="text-sm font-semibold text-white mb-4">
                            Org-Wide Competency Averages
                        </h2>
                        <div className="h-72">
                            <ChartWrapper height="h-full">
                                <RadarChart data={RADAR_DATA}>
                                    <PolarGrid stroke="#1A2A3A" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                    />
                                    <Radar
                                        dataKey="org"
                                        stroke="#9D00FF"
                                        fill="#9D00FF"
                                        fillOpacity={0.25}
                                        strokeWidth={2}
                                        name="Org Avg"
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#060B14",
                                            border: "1px solid #1A2A3A",
                                            borderRadius: 8,
                                        }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                                </RadarChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                )}
            </div>

            {/* Department breakdown table */}
            <Card padding="none">
                <div className="px-6 py-4 border-b border-[#1A2A3A]">
                    <h2 className="text-base font-semibold text-white">
                        Department Performance Breakdown
                    </h2>
                </div>
                <div className="p-4">
                    <DataTable<DeptRow>
                        data={DEPT_BREAKDOWN}
                        columns={DEPT_COLUMNS}
                        rowKey={(d) => d.dept}
                        aria-label="Department feedback breakdown"
                        emptyTitle="No department data"
                    />
                </div>
            </Card>
        </Page>
    );
}
