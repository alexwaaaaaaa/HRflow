"use client";

import React, { useState } from "react";
import {
    TrendingUp, Users, Clock, IndianRupee, Download,
    ChevronRight, Loader2, CheckCircle2, BarChart3,
    AlertCircle, Plus, Upload,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip as RechartsTooltip } from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Types & static data ──────────────────────────────────────────────────────

interface Employee {
    name: string;
    avatar: string;
    emp: string;
    role: string;
    dept: string;
    target: number;
    achievement: number;
    status: "approved" | "pending" | "missing" | "rejected";
}

const EMPLOYEES: Employee[] = [
    { name: "Rajesh Khanna", avatar: "RK", emp: "EMP-001", role: "VP Sales", dept: "Sales", target: 200000, achievement: 112, status: "approved" },
    { name: "Priya Kapoor", avatar: "PK", emp: "EMP-002", role: "Sales Manager", dept: "Sales", target: 150000, achievement: 98, status: "pending" },
    { name: "Deepak Mehta", avatar: "DM", emp: "EMP-003", role: "Sr. Account Exec", dept: "Sales", target: 100000, achievement: 76, status: "pending" },
    { name: "Anjali Singh", avatar: "AS", emp: "EMP-004", role: "Business Dev", dept: "Sales", target: 80000, achievement: 130, status: "approved" },
    { name: "Vikas Sharma", avatar: "VS", emp: "EMP-005", role: "Account Exec", dept: "Sales", target: 80000, achievement: 55, status: "missing" },
    { name: "Neha Gupta", avatar: "NG", emp: "EMP-006", role: "Regional Manager", dept: "Business", target: 120000, achievement: 91, status: "approved" },
    { name: "Rahul Patel", avatar: "RP", emp: "EMP-007", role: "Solutions Arch", dept: "Tech Sales", target: 75000, achievement: 105, status: "pending" },
    { name: "Kavita Reddy", avatar: "KR", emp: "EMP-008", role: "Account Manager", dept: "Sales", target: 90000, achievement: 0, status: "missing" },
];

const DEPT_CHART = [
    { name: "Sales", achieved: 92 },
    { name: "Business", achieved: 91 },
    { name: "Tech Sales", achieved: 105 },
    { name: "Mktg", achieved: 78 },
];

const STATUS_MAP = {
    approved: { label: "Approved", variant: "success" as const },
    pending: { label: "Pending Input", variant: "warning" as const },
    missing: { label: "No Data", variant: "danger" as const },
    rejected: { label: "Rejected", variant: "neutral" as const },
};

const CHART_TOOLTIP_STYLE = { background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 };

// ─── Module-scope subcomponents ───────────────────────────────────────────────

function EmployeeCell({ row }: { row: Employee }) {
    return (
        <div className="flex items-center gap-3">
            <div
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A2A3A] text-[10px] font-bold text-[#8899AA]"
            >
                {row.avatar}
            </div>
            <div>
                <p className="text-sm font-medium text-white">{row.name}</p>
                <p className="text-[11px] text-[#445566]">{row.emp}</p>
            </div>
        </div>
    );
}

function RoleCell({ row }: { row: Employee }) {
    return (
        <div>
            <p className="text-sm text-[#8899AA]">{row.role}</p>
            <p className="text-[11px] text-[#445566]">{row.dept}</p>
        </div>
    );
}

function AchievementCell({ row }: { row: Employee }) {
    if (row.achievement === 0) {
        return <span className="text-xs text-[#445566]">No data</span>;
    }
    const color = row.achievement >= 100 ? "#00E5A0" : row.achievement >= 85 ? "#FFB800" : "#FF4444";
    return (
        <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-semibold" style={{ color }}>{row.achievement}%</span>
            <div className="h-1.5 w-20 rounded-full bg-[#1A2A3A]">
                <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(row.achievement, 100)}%`, background: color }}
                    role="progressbar"
                    aria-valuenow={Math.min(row.achievement, 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${row.name} achievement`}
                />
            </div>
        </div>
    );
}

function PayoutCell({ row }: { row: Employee }) {
    const payout = row.achievement > 0 ? Math.round(row.target * Math.min(row.achievement, 100) / 100) : 0;
    return payout > 0 ? (
        <span className="text-sm font-semibold text-[#00E5A0]">₹{payout.toLocaleString("en-IN")}</span>
    ) : (
        <span className="text-[#445566]">—</span>
    );
}

function ActionCell({ row }: { row: Employee }) {
    if (row.status === "pending" || row.status === "missing") {
        return (
            <Button variant="ghost" size="sm" icon={<Plus size={11} aria-hidden="true" />}>
                Enter
            </Button>
        );
    }
    return (
        <Button variant="ghost" size="sm" iconRight={<ChevronRight size={11} aria-hidden="true" />}>
            View
        </Button>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VariablePayPage() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const filtered = EMPLOYEES.filter((e) =>
        statusFilter === "all" || e.status === statusFilter
    );

    const totalTarget = EMPLOYEES.reduce((s, e) => s + e.target, 0);
    const totalEstPayout = EMPLOYEES.filter((e) => e.achievement > 0)
        .reduce((s, e) => s + Math.round(e.target * Math.min(e.achievement, 100) / 100), 0);
    const avgAchievement = Math.round(
        EMPLOYEES.filter((e) => e.achievement > 0).reduce((s, e) => s + e.achievement, 0) /
        EMPLOYEES.filter((e) => e.achievement > 0).length
    );
    const pendingCount = EMPLOYEES.filter((e) => e.status === "pending" || e.status === "missing").length;

    function handleSubmitToPayroll() {
        setSubmitting(true);
        setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 2500);
    }

    const columns: Column<Employee>[] = [
        {
            key: "employee",
            label: "Employee",
            render: (r) => <EmployeeCell row={r} />,
            sortable: true,
            sortValue: (r) => r.name,
        },
        {
            key: "role",
            label: "Role",
            render: (r) => <RoleCell row={r} />,
        },
        {
            key: "target",
            label: "Target Variable (₹)",
            align: "right",
            render: (r) => <span className="text-sm font-medium text-white">₹{r.target.toLocaleString("en-IN")}</span>,
            sortable: true,
            sortValue: (r) => r.target,
        },
        {
            key: "achievement",
            label: "Achievement %",
            align: "center",
            render: (r) => <AchievementCell row={r} />,
        },
        {
            key: "payout",
            label: "Est. Payout (₹)",
            align: "right",
            render: (r) => <PayoutCell row={r} />,
        },
        {
            key: "status",
            label: "Status",
            render: (r) => <Badge variant={STATUS_MAP[r.status].variant}>{STATUS_MAP[r.status].label}</Badge>,
        },
        {
            key: "action",
            label: "Action",
            align: "center",
            render: (r) => <ActionCell row={r} />,
        },
    ];

    return (
        <Page
            title="Variable Pay"
            subtitle="Q4 FY 2024–25 · Performance-linked payout computation"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Variable Pay" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Upload size={15} aria-hidden="true" />}>
                        Bulk Upload
                    </Button>
                    <Button variant="secondary" icon={<Download size={15} aria-hidden="true" />}>
                        Export
                    </Button>
                    <Button
                        onClick={handleSubmitToPayroll}
                        disabled={submitting || submitted}
                        variant={submitted ? "outline" : "primary"}
                        icon={
                            submitting ? (
                                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                            ) : submitted ? (
                                <CheckCircle2 size={15} aria-hidden="true" />
                            ) : (
                                <TrendingUp size={15} aria-hidden="true" />
                            )
                        }
                    >
                        {submitting ? "Submitting…" : submitted ? "Submitted to Payroll" : "Save & Submit to Payroll"}
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <div className="mb-3 flex items-start justify-between">
                            <p className="text-xs text-[#8899AA]">Total Target Variable</p>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(255,184,0,0.1)]">
                                <IndianRupee size={15} className="text-[#FFB800]" aria-hidden="true" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">₹{(totalTarget / 100000).toFixed(1)}L</p>
                        <p className="mt-1 text-[11px] text-[#8899AA]">Budgeted across all eligible</p>
                    </Card>
                    <Card>
                        <div className="mb-3 flex items-start justify-between">
                            <p className="text-xs text-[#8899AA]">Estimated Payout</p>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(0,229,160,0.1)]">
                                <TrendingUp size={15} className="text-[#00E5A0]" aria-hidden="true" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">₹{(totalEstPayout / 100000).toFixed(2)}L</p>
                        <p className="mt-1 text-[11px] text-[#8899AA]">Avg {avgAchievement}% achievement</p>
                    </Card>
                    <Card>
                        <div className="mb-3 flex items-start justify-between">
                            <p className="text-xs text-[#8899AA]">Eligible Employees</p>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(0,102,255,0.1)]">
                                <Users size={15} className="text-[#0066FF]" aria-hidden="true" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{EMPLOYEES.length}</p>
                        <p className="mt-1 text-[11px] text-[#8899AA]">Q4 variable pay entitled</p>
                    </Card>
                    <Card>
                        <div className="mb-3 flex items-start justify-between">
                            <p className="text-xs text-[#8899AA]">Pending Inputs</p>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(255,68,68,0.1)]">
                                <Clock size={15} className="text-red-400" aria-hidden="true" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{pendingCount}</p>
                        <p className="mt-1 text-[11px] text-[#8899AA]">Manager input required</p>
                    </Card>
                </div>

                {/* Chart + Missing Inputs */}
                <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                    {/* Dept achievement chart */}
                    <Card padding="lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                                <BarChart3 size={16} className="text-[#0066FF]" aria-hidden="true" />
                                Department Achievement %
                            </h3>
                            <span className="text-xs text-[#8899AA]">Q4 FY 2024–25</span>
                        </div>
                        <ChartWrapper height="h-[200px]">
                            <BarChart data={DEPT_CHART} barSize={32}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} />
                                <YAxis domain={[0, 130]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                <RechartsTooltip
                                    contentStyle={CHART_TOOLTIP_STYLE}
                                    itemStyle={{ color: "#fff" }}
                                    labelStyle={{ color: "#8899AA" }}
                                    formatter={(v) => [`${v}%`, "Achievement"]}
                                />
                                <Bar dataKey="achieved" radius={[6, 6, 0, 0]}>
                                    {DEPT_CHART.map((d) => (
                                        <Cell
                                            key={d.name}
                                            fill={d.achieved >= 100 ? "#00E5A0" : d.achieved >= 85 ? "#FFB800" : "#FF4444"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartWrapper>
                        <div className="mt-3 flex gap-4 text-xs text-[#8899AA]" aria-label="Chart legend">
                            <span className="flex items-center gap-1">
                                <span className="h-2 w-3 rounded bg-[#00E5A0]" aria-hidden="true" /> ≥100%
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="h-2 w-3 rounded bg-[#FFB800]" aria-hidden="true" /> 85–99%
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="h-2 w-3 rounded bg-[#FF4444]" aria-hidden="true" /> &lt;85%
                            </span>
                        </div>
                    </Card>

                    {/* Missing Inputs */}
                    <Card padding="lg">
                        <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
                            <AlertCircle size={16} className="text-[#FFB800]" aria-hidden="true" />
                            Missing Inputs
                        </h3>
                        <div className="space-y-3">
                            {EMPLOYEES.filter((e) => e.status === "missing").map((e) => (
                                <div
                                    key={e.emp}
                                    className="flex items-center gap-3 rounded-xl border border-red-500/15 bg-red-500/5 p-3"
                                >
                                    <div
                                        aria-hidden="true"
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A2A3A] text-[10px] font-bold text-[#8899AA]"
                                    >
                                        {e.avatar}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-white">{e.name}</p>
                                        <p className="text-[11px] text-[#8899AA]">{e.dept}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" iconRight={<ChevronRight size={12} aria-hidden="true" />}>
                                        Remind
                                    </Button>
                                </div>
                            ))}
                            {EMPLOYEES.filter((e) => e.status === "missing").length === 0 && (
                                <p className="py-4 text-center text-sm text-[#445566]">All data received ✓</p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
                    {(["all", "approved", "pending", "missing"] as const).map((s) => (
                        <button
                            key={s}
                            role="tab"
                            aria-selected={statusFilter === s}
                            onClick={() => setStatusFilter(s)}
                            className={`rounded-lg px-3 py-2 text-xs capitalize transition-colors ${
                                statusFilter === s
                                    ? "bg-[#0066FF] text-white"
                                    : "bg-[#1A2A3A] text-[#8899AA] hover:text-white"
                            }`}
                        >
                            {s === "all" ? "All" : STATUS_MAP[s].label}
                        </button>
                    ))}
                </div>

                {/* Variable Pay Table */}
                <Card padding="none">
                    <DataTable<Employee>
                        data={filtered}
                        columns={columns}
                        rowKey={(r) => r.emp}
                        searchable
                        searchPlaceholder="Search employee or department…"
                        aria-label="Variable pay computation"
                        emptyTitle="No employees found"
                        emptyDescription="No employees match your current filter."
                    />
                </Card>
            </div>
        </Page>
    );
}
