"use client";

import { useState } from "react";
import {
    Users,
    Clock,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Watch,
    Briefcase,
    Filter,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    PieChart,
    Pie,
} from "recharts";

import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─────────────────────────────────────────────────────────────────────────────
// Static data (module scope — keeps render pure)
// ─────────────────────────────────────────────────────────────────────────────

type TrendType = "positive" | "negative" | "neutral";

interface StatTile {
    label: string;
    value: string;
    trend: string;
    type: TrendType;
    icon: typeof Users;
}

const STATS: StatTile[] = [
    { label: "Total Headcount", value: "412", trend: "0", type: "neutral", icon: Users },
    { label: "Present Today", value: "385", trend: "+2.4%", type: "positive", icon: Briefcase },
    { label: "On Leave", value: "15", trend: "-1.2%", type: "positive", icon: Calendar },
    { label: "Late Arrivals", value: "32", trend: "+12.5%", type: "negative", icon: Clock },
];

interface StatusSlice {
    name: string;
    value: number;
    color: string;
}

const STATUS_DATA: StatusSlice[] = [
    { name: "On Time", value: 310, color: "#00E5A0" },
    { name: "Late (< 15m)", value: 45, color: "#FFB800" },
    { name: "Late (> 15m)", value: 30, color: "#FF4444" },
    { name: "Absent", value: 12, color: "#1A2A3A" },
    { name: "On Leave", value: 15, color: "#0066FF" },
];

const TREND_DATA = [
    { day: "Mon", present: 94, onTime: 85 },
    { day: "Tue", present: 95, onTime: 88 },
    { day: "Wed", present: 93, onTime: 82 },
    { day: "Thu", present: 96, onTime: 90 },
    { day: "Fri", present: 92, onTime: 75 },
    { day: "Sat", present: 15, onTime: 12 },
    { day: "Sun", present: 5, onTime: 4 },
];

interface DeptRow {
    dept: string;
    present: number;
    total: number;
}

const DEPT_DATA: DeptRow[] = [
    { dept: "Engineering", present: 98, total: 120 },
    { dept: "Sales", present: 85, total: 95 },
    { dept: "Marketing", present: 92, total: 40 },
    { dept: "Operations", present: 95, total: 110 },
    { dept: "HR & Admin", present: 100, total: 25 },
];

const PERIODS = ["Today", "This Week", "This Month"] as const;
type Period = (typeof PERIODS)[number];

// ─────────────────────────────────────────────────────────────────────────────
// Pure helpers
// ─────────────────────────────────────────────────────────────────────────────

function deptBarColor(pct: number): string {
    if (pct >= 95) return "bg-[#00E5A0]";
    if (pct >= 85) return "bg-[#0066FF]";
    return "bg-[#FFB800]";
}

function statIconColor(type: TrendType): string {
    if (type === "positive") return "text-[#00E5A0]";
    if (type === "negative") return "text-[#f87171]";
    return "text-[#60a5fa]";
}

function statTrendColor(type: TrendType): string {
    if (type === "positive") return "text-[#00E5A0]";
    if (type === "negative") return "text-[#f87171]";
    return "text-[#8899AA]";
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AttendanceDashboard() {
    const [period, setPeriod] = useState<Period>("Today");

    return (
        <Page
            title="Attendance Dashboard"
            subtitle="Real-time overview of workforce attendance and punctuality."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Attendance", href: "/attendance" },
                { label: "Dashboard" },
            ]}
            maxWidth="1400px"
            actions={
                <div className="flex items-center gap-3">
                    <div
                        className="flex rounded-lg border border-[#1A2A3A] bg-[#0D1928] p-1"
                        role="group"
                        aria-label="Select period"
                    >
                        {PERIODS.map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPeriod(p)}
                                aria-pressed={period === p}
                                className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                                    period === p
                                        ? "bg-[#1A2A3A] text-white"
                                        : "text-[#8899AA] hover:text-white"
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        icon={<Filter size={14} aria-hidden="true" />}
                        aria-label="Filter attendance"
                    >
                        Filter
                    </Button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* KPI tiles */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {STATS.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.label}>
                                <div className="mb-4 flex items-start justify-between">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A2A3A] ${statIconColor(stat.type)}`}
                                        aria-hidden="true"
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <div
                                        className={`flex items-center rounded bg-[#060B14] px-2 py-1 text-xs font-bold ${statTrendColor(stat.type)}`}
                                        aria-hidden="true"
                                    >
                                        {stat.type === "positive" && (
                                            <ArrowUpRight size={14} className="mr-1" />
                                        )}
                                        {stat.type === "negative" && (
                                            <ArrowDownRight size={14} className="mr-1" />
                                        )}
                                        {stat.trend}
                                    </div>
                                </div>
                                <p className="text-3xl font-black text-white">{stat.value}</p>
                                <p className="mt-1 text-sm font-medium text-[#8899AA]">
                                    {stat.label}
                                </p>
                            </Card>
                        );
                    })}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Today's status donut */}
                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Watch size={16} className="text-[#FFB800]" aria-hidden="true" />
                                Today&apos;s Status
                            </CardTitle>
                        </CardHeader>
                        <div className="relative h-[220px]">
                            <ChartWrapper height="h-[220px]">
                                <PieChart>
                                    <Pie
                                        data={STATUS_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {STATUS_DATA.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        cursor={{ fill: "#1A2A3A" }}
                                        contentStyle={{
                                            backgroundColor: "#060B14",
                                            borderColor: "#2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                        itemStyle={{ color: "#fff", fontSize: "12px" }}
                                    />
                                </PieChart>
                            </ChartWrapper>
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-white">93%</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8899AA]">
                                    Present
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3">
                            {STATUS_DATA.slice(0, 4).map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between text-xs"
                                >
                                    <div className="flex items-center text-[#8899AA]">
                                        <span
                                            aria-hidden="true"
                                            className="mr-2 h-2 w-2 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        {item.name}
                                    </div>
                                    <span className="font-bold text-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Attendance trend */}
                    <Card padding="lg" className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Attendance Trend (%)</CardTitle>
                        </CardHeader>
                        <div className="h-[280px]">
                            <ChartWrapper height="h-[280px]">
                                <AreaChart
                                    data={TREND_DATA}
                                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="colorPresent"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#0066FF"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#0066FF"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="colorOnTime"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#00E5A0"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#00E5A0"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#1A2A3A"
                                    />
                                    <XAxis
                                        dataKey="day"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                        domain={[0, 100]}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#060B14",
                                            borderColor: "#2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                        itemStyle={{ color: "#fff", fontSize: "12px" }}
                                        labelStyle={{
                                            color: "#8899AA",
                                            fontSize: "11px",
                                            marginBottom: "4px",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="present"
                                        name="Present %"
                                        stroke="#0066FF"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorPresent)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="onTime"
                                        name="On Time %"
                                        stroke="#00E5A0"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorOnTime)"
                                    />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Department breakdown */}
                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle>Department Attendance</CardTitle>
                            <Button variant="ghost" size="sm">
                                View All
                            </Button>
                        </CardHeader>
                        <div className="space-y-4">
                            {DEPT_DATA.map((dept) => {
                                const pct = Math.round((dept.present / dept.total) * 100);
                                return (
                                    <div key={dept.dept}>
                                        <div className="mb-1.5 flex items-end justify-between">
                                            <span className="text-sm font-medium text-slate-300">
                                                {dept.dept}
                                            </span>
                                            <div className="text-xs">
                                                <span className="font-bold text-white">{pct}%</span>
                                                <span className="ml-2 text-[#7a8fa6]">
                                                    ({dept.present}/{dept.total})
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="h-2 w-full overflow-hidden rounded-full bg-[#060B14]"
                                            role="progressbar"
                                            aria-valuenow={pct}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${dept.dept} attendance: ${pct}%`}
                                        >
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${deptBarColor(pct)}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Pending actions */}
                    <Card padding="lg" className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Pending Actions</CardTitle>
                        </CardHeader>
                        <div className="flex-1 space-y-3">
                            <div className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#FFB800]/20 bg-[#FFB800]/5 p-3 transition-colors hover:bg-[#FFB800]/10">
                                <Clock
                                    className="mt-0.5 text-[#FFB800]"
                                    size={18}
                                    aria-hidden="true"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="text-sm font-bold text-[#FFB800]">
                                            Regularization Requests
                                        </h3>
                                        <span className="rounded-full bg-[#FFB800] px-2 py-0.5 text-[10px] font-black text-[#060B14]">
                                            14
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-[#8899AA]">
                                        Require manager or HR approval for missed punches.
                                    </p>
                                </div>
                            </div>

                            <div className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#FF4444]/20 bg-[#FF4444]/5 p-3 transition-colors hover:bg-[#FF4444]/10">
                                <AlertTriangle
                                    className="mt-0.5 text-[#f87171]"
                                    size={18}
                                    aria-hidden="true"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="text-sm font-bold text-[#f87171]">
                                            Anomalies Detected
                                        </h3>
                                        <span className="rounded-full bg-[#FF4444] px-2 py-0.5 text-[10px] font-black text-white">
                                            8
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-[#8899AA]">
                                        Fake GPS, short check-ins, or buddy punching alerts.
                                    </p>
                                </div>
                            </div>

                            <div className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#0066FF]/20 bg-[#0066FF]/5 p-3 transition-colors hover:bg-[#0066FF]/10">
                                <Calendar
                                    className="mt-0.5 text-[#60a5fa]"
                                    size={18}
                                    aria-hidden="true"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="text-sm font-bold text-[#60a5fa]">
                                            Shift Roster Conflicts
                                        </h3>
                                        <span className="rounded-full bg-[#0066FF] px-2 py-0.5 text-[10px] font-black text-white">
                                            3
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-[#8899AA]">
                                        Unassigned shifts or overlapping schedules for next week.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
