"use client";

import Link from "next/link";
import { Download, Filter, TrendingDown, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─── Static data ──────────────────────────────────────────────────────────────

const ATTRITION_TREND = [
    { month: "Oct", rate: 2.1, voluntary: 1.8, involuntary: 0.3 },
    { month: "Nov", rate: 1.9, voluntary: 1.5, involuntary: 0.4 },
    { month: "Dec", rate: 2.5, voluntary: 2.1, involuntary: 0.4 },
    { month: "Jan", rate: 3.2, voluntary: 2.8, involuntary: 0.4 },
    { month: "Feb", rate: 1.5, voluntary: 1.2, involuntary: 0.3 },
    { month: "Mar", rate: 1.8, voluntary: 1.6, involuntary: 0.2 },
];

const REASONS = [
    { reason: "Better Compensation", count: 42 },
    { reason: "Career Growth", count: 28 },
    { reason: "Relocation/Personal", count: 15 },
    { reason: "Work-Life Balance", count: 12 },
    { reason: "Involuntary", count: 14 },
];

type ExitType = "Voluntary" | "Involuntary";

interface ExitRow {
    id: string;
    name: string;
    dept: string;
    lwd: string;
    type: ExitType;
}

const EXIT_TYPE_VARIANT: Record<ExitType, "warning" | "danger"> = {
    Voluntary: "warning",
    Involuntary: "danger",
};

const RECENT_EXITS: ExitRow[] = [
    { id: "e1", name: "Ankit Patel", dept: "Engineering", lwd: "15 Mar 2026", type: "Voluntary" },
    { id: "e2", name: "Simran Kaur", dept: "Marketing", lwd: "01 Mar 2026", type: "Voluntary" },
    { id: "e3", name: "David Lee", dept: "Sales", lwd: "28 Feb 2026", type: "Involuntary" },
];

const EXIT_COLUMNS: Column<ExitRow>[] = [
    {
        key: "name",
        label: "Employee",
        render: (r) => <span className="font-medium text-white">{r.name}</span>,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "dept",
        label: "Department",
        render: (r) => <span className="text-[#8899AA]">{r.dept}</span>,
    },
    {
        key: "lwd",
        label: "Last Working Day",
        render: (r) => <span className="text-[#8899AA]">{r.lwd}</span>,
    },
    {
        key: "type",
        label: "Type",
        render: (r) => <Badge variant={EXIT_TYPE_VARIANT[r.type]}>{r.type}</Badge>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AttritionReportPage() {
    return (
        <Page
            title="Attrition Analysis"
            subtitle="Track turnover rates, identify flight risks, and analyze exit reasons."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Attrition" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>
                        LTM (Last 12 Months)
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Export Report</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Annualized Attrition</p>
                        <p className="text-3xl font-bold text-pink-400 mb-1">18.4%</p>
                        <p className="text-xs text-[#8899AA]">+2.1% v/s benchmark</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Voluntary Turnovers</p>
                        <p className="text-3xl font-bold text-white mb-1">97</p>
                        <p className="text-xs text-[#8899AA]">LTM Period</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Regretted Attrition</p>
                        <p className="text-3xl font-bold text-amber-500 mb-1">34</p>
                        <p className="text-xs text-[#8899AA]">Top performers lost</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Early Attrition (&lt;6mo)</p>
                        <p className="text-3xl font-bold text-pink-400 mb-1">12%</p>
                        <p className="text-xs text-[#8899AA]">Of total exits</p>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <TrendingDown size={18} className="text-pink-500" aria-hidden="true" />
                            Monthly Attrition Rate (%)
                        </h2>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <AreaChart data={ATTRITION_TREND} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="month" stroke="#8899AA" fontSize={12} />
                                    <YAxis stroke="#8899AA" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="rate"
                                        stroke="#ec4899"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRate)"
                                    />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Top Exit Reasons (Voluntary)</h2>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <BarChart
                                    data={REASONS}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                    <XAxis type="number" stroke="#8899AA" fontSize={12} />
                                    <YAxis
                                        dataKey="reason"
                                        type="category"
                                        stroke="#8899AA"
                                        fontSize={12}
                                        width={120}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "#1A2A3A" }}
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                </div>

                {/* Risk + exits */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card padding="lg" className="border-amber-500/20 bg-amber-500/5">
                        <h2 className="text-sm font-bold text-amber-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
                            <AlertTriangle size={16} aria-hidden="true" /> High Risk Segments
                        </h2>
                        <p className="text-sm text-[#8899AA] mb-4">
                            Our predictive model indicates elevated flight risk in the following groups:
                        </p>
                        <ul className="space-y-3" aria-label="High risk segments">
                            <li className="flex justify-between items-center bg-[#1A2A3A]/40 p-3 rounded-lg border border-[#2A3A4A]">
                                <span className="text-white text-sm">Engineering · Mid-level</span>
                                <Badge variant="danger">22% Risk</Badge>
                            </li>
                            <li className="flex justify-between items-center bg-[#1A2A3A]/40 p-3 rounded-lg border border-[#2A3A4A]">
                                <span className="text-white text-sm">Sales · Tenured &gt;3yrs</span>
                                <Badge variant="danger">18% Risk</Badge>
                            </li>
                        </ul>
                        <Button variant="ghost" size="sm" className="mt-4 text-amber-500">
                            Run Cohort Retention Strategy →
                        </Button>
                    </Card>

                    <div className="lg:col-span-2">
                        <Card padding="none">
                            <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center">
                                <h2 className="text-sm font-bold text-white">Recent Exits</h2>
                                <Link
                                    href="/employees?status=exit"
                                    className="text-pink-400 text-xs hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"
                                >
                                    View All Exits
                                </Link>
                            </div>
                            <DataTable<ExitRow>
                                data={RECENT_EXITS}
                                columns={EXIT_COLUMNS}
                                rowKey={(r) => r.id}
                                emptyTitle="No recent exits"
                                aria-label="Recent exits"
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
