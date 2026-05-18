"use client";

import { useState } from "react";
import { BarChart2, Download, Target, TrendingUp, Users } from "lucide-react";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface DeptRow {
    dept: string;
    on_track: number;
    at_risk: number;
    behind: number;
}

const PROGRESS_TREND = [
    { week: "W1", company: 20, dept: 18, team: 15 },
    { week: "W2", company: 28, dept: 25, team: 22 },
    { week: "W3", company: 38, dept: 35, team: 30 },
    { week: "W4", company: 45, dept: 43, team: 40 },
    { week: "W5", company: 52, dept: 50, team: 47 },
    { week: "W6", company: 60, dept: 58, team: 55 },
    { week: "W7", company: 68, dept: 65, team: 62 },
    { week: "W8", company: 72, dept: 70, team: 68 },
];

const DEPT_DIST: DeptRow[] = [
    { dept: "Eng", on_track: 5, at_risk: 1, behind: 0 },
    { dept: "Sales", on_track: 3, at_risk: 2, behind: 0 },
    { dept: "Mktg", on_track: 3, at_risk: 1, behind: 0 },
    { dept: "Product", on_track: 1, at_risk: 1, behind: 1 },
    { dept: "HR", on_track: 4, at_risk: 0, behind: 0 },
];

const SUMMARY = [
    { label: "Total OKRs", value: "94", icon: Target, colorClass: "text-[#00E5A0]" },
    { label: "On Track", value: "68%", icon: TrendingUp, colorClass: "text-[#00E5A0]" },
    { label: "At Risk", value: "20%", icon: BarChart2, colorClass: "text-[#FFB800]" },
    { label: "Behind", value: "12%", icon: Users, colorClass: "text-[#FF4444]" },
] as const;

const TABS = ["Progress Trend", "Department Breakdown", "Summary"] as const;

// Static tab style maps — no template literals
const TAB_ACTIVE = "border-[#00E5A0] text-white";
const TAB_INACTIVE = "border-transparent text-[#8899AA] hover:text-white";

const SUMMARY_COLUMNS: Column<DeptRow>[] = [
    {
        key: "dept",
        label: "Department",
        render: (r) => <span className="font-medium text-white">{r.dept}</span>,
        sortable: true,
        sortValue: (r) => r.dept,
    },
    {
        key: "total",
        label: "Total OKRs",
        render: (r) => <span className="text-[#CCDDEE]">{r.on_track + r.at_risk + r.behind}</span>,
        sortable: true,
        sortValue: (r) => r.on_track + r.at_risk + r.behind,
    },
    {
        key: "on_track",
        label: "On Track",
        render: (r) => <span className="text-[#00E5A0] font-semibold">{r.on_track}</span>,
        sortable: true,
        sortValue: (r) => r.on_track,
    },
    {
        key: "at_risk",
        label: "At Risk",
        render: (r) => <span className="text-[#FFB800] font-semibold">{r.at_risk}</span>,
        sortable: true,
        sortValue: (r) => r.at_risk,
    },
    {
        key: "behind",
        label: "Behind",
        render: (r) => <span className="text-[#FF4444] font-semibold">{r.behind}</span>,
        sortable: true,
        sortValue: (r) => r.behind,
    },
    {
        key: "avg",
        label: "Avg %",
        align: "right",
        render: (r) => (
            <span className="font-bold text-white">
                {Math.round((r.on_track / (r.on_track + r.at_risk + r.behind)) * 100)}%
            </span>
        ),
        sortable: true,
        sortValue: (r) => Math.round((r.on_track / (r.on_track + r.at_risk + r.behind)) * 100),
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OKRReportsPage() {
    const [tab, setTab] = useState(0);

    return (
        <Page
            title="OKR Reports"
            subtitle="Cycle analytics and performance insights · Q1 2025"
            breadcrumbs={[
                { label: "OKRs", href: "/okr/dashboard" },
                { label: "Reports" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Download size={14} />}>Export PDF</Button>
            }
        >
            <div className="space-y-6">
                {/* KPI Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {SUMMARY.map((s) => (
                        <Card key={s.label} padding="md">
                            <div className="flex items-start justify-between mb-2">
                                <p className="text-xs text-[#8899AA]">{s.label}</p>
                                <s.icon size={14} className={s.colorClass} aria-hidden="true" />
                            </div>
                            <p className={`text-3xl font-bold ${s.colorClass}`}>{s.value}</p>
                        </Card>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#1A2A3A]" role="tablist" aria-label="Report views">
                    {TABS.map((t, i) => (
                        <button
                            key={t}
                            type="button"
                            role="tab"
                            aria-selected={tab === i}
                            aria-controls={`tabpanel-${i}`}
                            id={`tab-${i}`}
                            onClick={() => setTab(i)}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === i ? TAB_ACTIVE : TAB_INACTIVE}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Tab panels */}
                <div id={`tabpanel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
                    {tab === 0 && (
                        <section aria-label="Progress trend chart">
                            <Card padding="lg">
                                <h2 className="text-sm font-semibold text-white mb-4">Weekly Progress Trend</h2>
                                <div className="h-64">
                                    <ChartWrapper height="h-full">
                                        <LineChart data={PROGRESS_TREND}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                            <Tooltip
                                                contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}
                                                itemStyle={{ color: "#fff", fontSize: 12 }}
                                            />
                                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                                            <Line type="monotone" dataKey="company" name="Company" stroke="#00E5A0" strokeWidth={2.5} dot={false} />
                                            <Line type="monotone" dataKey="dept" name="Department" stroke="#0066FF" strokeWidth={2} dot={false} />
                                            <Line type="monotone" dataKey="team" name="Team" stroke="#9D00FF" strokeWidth={2} dot={false} />
                                        </LineChart>
                                    </ChartWrapper>
                                </div>
                            </Card>
                        </section>
                    )}
                    {tab === 1 && (
                        <section aria-label="Department breakdown chart">
                            <Card padding="lg">
                                <h2 className="text-sm font-semibold text-white mb-4">OKR Status by Department</h2>
                                <div className="h-64">
                                    <ChartWrapper height="h-full">
                                        <BarChart data={DEPT_DIST} barSize={20}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                            <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                            <Tooltip
                                                contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}
                                                itemStyle={{ color: "#fff", fontSize: 12 }}
                                            />
                                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                                            <Bar dataKey="on_track" name="On Track" fill="#00E5A0" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="at_risk" name="At Risk" fill="#FFB800" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="behind" name="Behind" fill="#FF4444" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ChartWrapper>
                                </div>
                            </Card>
                        </section>
                    )}
                    {tab === 2 && (
                        <section aria-label="OKR summary table">
                            <Card padding="none">
                                <div className="px-6 py-4 border-b border-[#1A2A3A]">
                                    <h2 className="text-sm font-semibold text-white">OKR Completion Summary</h2>
                                </div>
                                <DataTable<DeptRow>
                                    data={DEPT_DIST}
                                    columns={SUMMARY_COLUMNS}
                                    rowKey={(r) => r.dept}
                                    aria-label="OKR summary by department"
                                    emptyTitle="No data"
                                    emptyDescription="No department OKR data available."
                                />
                            </Card>
                        </section>
                    )}
                </div>
            </div>
        </Page>
    );
}
