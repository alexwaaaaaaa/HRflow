"use client";

import Link from "next/link";
import {
    PlayCircle, CheckCircle2, TrendingUp,
    FileText, IndianRupee, ShieldAlert, Award, ChevronRight,
} from "lucide-react";
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, BarChart as RechartsBarChart } from "recharts";
import ClientOnly from "@/components/ui/ClientOnly";
import ChartWrapper from "@/components/ui/ChartWrapper";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Types ────────────────────────────────────────────────────────────────────
interface HistoryRow {
    month: string;
    emp: number;
    gross: string;
    net: string;
    status: "In Progress" | "Disbursed";
    href: string;
}

interface QuickAction {
    icon: React.ReactNode;
    label: string;
    href: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TREND_DATA = [
    { name: "Dec", net: 3.2, pf: 0.15, tds: 0.8, total: 4.15 },
    { name: "Jan", net: 3.3, pf: 0.16, tds: 0.82, total: 4.28 },
    { name: "Feb", net: 3.3, pf: 0.16, tds: 0.85, total: 4.31 },
    { name: "Mar", net: 3.4, pf: 0.17, tds: 0.9, total: 4.47 },
    { name: "Apr", net: 3.6, pf: 0.18, tds: 1.0, total: 4.78 },
    { name: "May", net: 3.6, pf: 0.18, tds: 1.0, total: 4.78 },
    { name: "Jun", net: 3.52, pf: 0.17, tds: 0.95, total: 4.64 },
    { name: "Jul", net: 3.58, pf: 0.17, tds: 0.96, total: 4.71 },
    { name: "Aug", net: 3.64, pf: 0.18, tds: 1.0, total: 4.82 },
    { name: "Sep", net: 3.71, pf: 0.18, tds: 1.1, total: 4.99 },
    { name: "Oct", net: 3.74, pf: 0.18, tds: 1.2, total: 5.12 },
    { name: "Nov", net: 3.82, pf: 0.18, tds: 1.22, total: 5.22 },
];

const DEPT_DATA = [
    { name: "Engineering", value: 1.8 },
    { name: "Sales", value: 0.9 },
    { name: "Operations", value: 0.72 },
    { name: "Marketing", value: 0.42 },
    { name: "HR", value: 0.18 },
    { name: "Finance", value: 0.16 },
];

const HISTORY: HistoryRow[] = [
    { month: "Nov 2024", emp: 847, gross: "₹4.24 Cr", net: "—", status: "In Progress", href: "/payroll/run/review-deductions" },
    { month: "Oct 2024", emp: 839, gross: "₹4.12 Cr", net: "₹3.74 Cr", status: "Disbursed", href: "/payroll/history" },
    { month: "Sep 2024", emp: 836, gross: "₹4.08 Cr", net: "₹3.71 Cr", status: "Disbursed", href: "/payroll/history" },
    { month: "Aug 2024", emp: 830, gross: "₹4.01 Cr", net: "₹3.64 Cr", status: "Disbursed", href: "/payroll/history" },
    { month: "Jul 2024", emp: 824, gross: "₹3.95 Cr", net: "₹3.58 Cr", status: "Disbursed", href: "/payroll/history" },
    { month: "Jun 2024", emp: 820, gross: "₹3.89 Cr", net: "₹3.52 Cr", status: "Disbursed", href: "/payroll/history" },
];

const PAYROLL_STEPS = [
    { label: "Select Month", state: "done" as const },
    { label: "Attendance Lock", state: "done" as const },
    { label: "Employee Summary", state: "done" as const },
    { label: "Review Gross", state: "done" as const },
    { label: "Review Deductions", state: "active" as const },
    { label: "Review Net", state: "pending" as const },
    { label: "Approve", state: "pending" as const },
    { label: "Disburse", state: "pending" as const },
];

const KPI_CARDS = [
    { label: "November Gross", value: "₹4,24,50,000", sub1: "847 employees", sub2: "+₹12L vs Oct", highlight: "success" as const },
    { label: "Net Payout", value: "₹3,82,05,000", sub1: "After all deductions", sub2: "⏳ Not yet disbursed", highlight: "warning" as const },
    { label: "Deductions", value: "₹42,45,000", sub1: "PF ₹18.4L | TDS ₹12.2L", sub2: "PT ₹1.6L", highlight: null },
    { label: "Employer Cost", value: "₹68,20,000", sub1: "PF + ESI + Gratuity", sub2: "Not deducted from emp", highlight: null },
    { label: "Anomalies", value: "3", sub1: "Require attention", sub2: "Resolve →", highlight: "danger" as const },
];

const STATUTORY_ITEMS = [
    { label: "PF Challan", status: "Due 15 Nov", variant: "warning" as const },
    { label: "ESI Challan", status: "Due 15 Nov", variant: "warning" as const },
    { label: "PT Payment", status: "Oct Filed", variant: "success" as const },
    { label: "TDS Challan", status: "Oct Filed", variant: "success" as const },
];

const QUICK_ACTIONS: QuickAction[] = [
    { icon: <IndianRupee size={18} aria-hidden="true" />, label: "Run Payroll", href: "/payroll/run/select-month" },
    { icon: <CheckCircle2 size={18} aria-hidden="true" />, label: "Approve Payroll", href: "/payroll/run/approve" },
    { icon: <FileText size={18} aria-hidden="true" />, label: "Generate Payslips", href: "/payroll/payslips/bulk" },
    { icon: <IndianRupee size={18} aria-hidden="true" />, label: "Disburse Salary", href: "/payroll/run/disburse" },
    { icon: <ShieldAlert size={18} aria-hidden="true" />, label: "Run FnF", href: "/payroll/fnf" },
    { icon: <Award size={18} aria-hidden="true" />, label: "Off-cycle Payroll", href: "/off-cycle-payroll" },
];

const LEGEND_ITEMS = [
    { color: "#0066FF", label: "Net Salary" },
    { color: "#FFB800", label: "Employer PF" },
    { color: "#FF4444", label: "TDS" },
    { color: "#00E5A0", label: "Total Cost", isLine: true },
];

const CALENDAR_EVENTS = [
    { color: "#445566", date: "1 Nov", desc: "Payroll month start", done: false },
    { color: "#00E5A0", date: "8 Nov", desc: "Attendance locked", done: true },
    { color: "#FFB800", date: "25 Nov", desc: "Payroll run deadline", done: false },
    { color: "#FF4444", date: "30 Nov", desc: "Salary disbursement day", done: false },
];

const tooltipStyle = { background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 };
const tooltipItemStyle = { color: "#FFFFFF" };

// ─── History table columns ────────────────────────────────────────────────────
const HISTORY_COLUMNS: Column<HistoryRow>[] = [
    {
        key: "month",
        label: "Month",
        render: (r) => <span className="font-medium text-white">{r.month}</span>,
        sortable: true,
        sortValue: (r) => r.month,
    },
    {
        key: "emp",
        label: "Employees",
        render: (r) => <span className="text-[#8899AA]">{r.emp}</span>,
    },
    {
        key: "gross",
        label: "Gross",
        render: (r) => <span className="text-white">{r.gross}</span>,
    },
    {
        key: "net",
        label: "Net",
        render: (r) => <span className="text-white">{r.net}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => (
            <Badge variant={r.status === "Disbursed" ? "success" : "warning"}>
                {r.status}
            </Badge>
        ),
    },
    {
        key: "action",
        label: "",
        align: "right",
        render: (r) => (
            <Link href={r.href} className="text-sm font-medium text-[#0066FF] hover:underline">
                {r.net === "—" ? "Continue" : "View"}
            </Link>
        ),
    },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PayrollDashboard() {
    return (
        <Page
            title="Payroll"
            subtitle="TechCorp Solutions · FY 2024-25"
            breadcrumbs={[{ label: "Payroll" }]}
            maxWidth="1200px"
            actions={
                <Button icon={<PlayCircle size={16} aria-hidden="true" />} href="/payroll/run/select-month">Run Payroll</Button>
            }
        >
            <div className="space-y-6">
                {/* Payroll Run Status Banner */}
                <Card padding="lg" aria-labelledby="run-status-heading">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h2 id="run-status-heading" className="text-base font-semibold text-white">
                            November 2024 Payroll Run
                        </h2>
                        <Link href="/payroll/run/review-deductions">
                            <Button size="sm" iconRight={<ChevronRight size={14} aria-hidden="true" />}>
                                Continue from where you left off
                            </Button>
                        </Link>
                    </div>

                    <ol className="flex items-center justify-between" aria-label="Payroll run progress">
                        {PAYROLL_STEPS.map((step, i, arr) => (
                            <li key={step.label} className="flex flex-1 items-center">
                                <div className="relative flex flex-col items-center gap-2">
                                    <div
                                        className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                                        style={{
                                            background: step.state === "done" ? "#00E5A0" : step.state === "active" ? "rgba(255,184,0,0.2)" : "#1A2A3A",
                                            color: step.state === "done" ? "#060B14" : step.state === "active" ? "#FFB800" : "#445566",
                                            border: step.state === "active" ? "1px solid #FFB800" : "none",
                                            boxShadow: step.state === "active" ? "0 0 10px rgba(255,184,0,0.5)" : "none",
                                        }}
                                        aria-label={`${step.label} — ${step.state}`}
                                    >
                                        {step.state === "done" ? <CheckCircle2 size={14} aria-hidden="true" /> : i + 1}
                                    </div>
                                    <span
                                        className="absolute top-8 w-20 text-center text-[10px] leading-tight"
                                        style={{
                                            color: step.state === "pending" ? "#445566" : "#FFFFFF",
                                            fontWeight: step.state === "active" ? 600 : 400,
                                        }}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                                {i < arr.length - 1 && (
                                    <div
                                        className="mb-4 mx-2 h-0.5 flex-1 rounded-full"
                                        style={{ background: step.state === "done" ? "#00E5A0" : "#1A2A3A" }}
                                        aria-hidden="true"
                                    />
                                )}
                            </li>
                        ))}
                    </ol>
                </Card>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                    {KPI_CARDS.map((c) => (
                        <Card key={c.label} className={c.highlight === "danger" ? "border-red-500/20" : ""}>
                            <p className="text-xs font-medium text-[#8899AA]">{c.label}</p>
                            <p className={`mt-2 text-2xl font-bold tracking-tight ${c.highlight === "danger" ? "text-red-400" : "text-white"}`}>
                                {c.value}
                            </p>
                            <p className="mt-1 text-sm text-[#8899AA]">{c.sub1}</p>
                            <p className={`mt-1 flex items-center gap-1 text-xs ${c.highlight === "success" ? "text-[#00e5a0]" : c.highlight === "warning" ? "text-[#FFB800]" : "text-[#8899AA]"}`}>
                                {c.highlight === "success" && <TrendingUp size={12} aria-hidden="true" />}
                                {c.sub2}
                            </p>
                        </Card>
                    ))}
                </div>

                {/* Two-column Layout */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6">
                        {/* Payroll Cost Trend Chart */}
                        <Card padding="lg" aria-labelledby="trend-chart-heading">
                            <CardHeader>
                                <CardTitle id="trend-chart-heading">Payroll Cost — Last 12 Months</CardTitle>
                                <Link href="/payroll-comparison" className="text-sm text-[#0066FF] hover:underline">
                                    View Details →
                                </Link>
                            </CardHeader>
                            <ClientOnly>
                                <ChartWrapper height="h-[220px]">
                                    <ComposedChart data={TREND_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="name" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}Cr`} />
                                        <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} />
                                        <Bar dataKey="net" stackId="a" fill="#0066FF" maxBarSize={30} radius={[0, 0, 4, 4]} name="Net Salary" />
                                        <Bar dataKey="pf" stackId="a" fill="#FFB800" name="Employer PF" />
                                        <Bar dataKey="tds" stackId="a" fill="#FF4444" radius={[4, 4, 0, 0]} name="TDS" />
                                        <Line type="monotone" dataKey="total" stroke="#00E5A0" strokeWidth={3} dot={{ r: 4, fill: "#0D1928", stroke: "#00E5A0", strokeWidth: 2 }} name="Total CTC Cost" />
                                    </ComposedChart>
                                </ChartWrapper>
                            </ClientOnly>
                            <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-[#8899AA]" aria-label="Chart legend">
                                {LEGEND_ITEMS.map((l) => (
                                    <div key={l.label} className="flex items-center gap-1.5">
                                        {l.isLine
                                            ? <div className="h-0.5 w-5 rounded-full" style={{ background: l.color }} aria-hidden="true" />
                                            : <div className="h-2 w-2 rounded-full" style={{ background: l.color }} aria-hidden="true" />
                                        }
                                        {l.label}
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Department + Statutory */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <Card padding="lg" aria-labelledby="dept-chart-heading">
                                <h2 id="dept-chart-heading" className="mb-4 text-base font-semibold text-white">
                                    Department-wise (₹ Cr)
                                </h2>
                                <ClientOnly>
                                    <ChartWrapper height="h-[180px]">
                                        <RechartsBarChart data={DEPT_DATA} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={11} width={80} tickLine={false} axisLine={false} />
                                            <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} formatter={(v: unknown) => `₹${(v as number) ?? 0} Cr`} />
                                            <Bar dataKey="value" fill="#00E5A0" radius={[0, 4, 4, 0]} barSize={16} />
                                        </RechartsBarChart>
                                    </ChartWrapper>
                                </ClientOnly>
                            </Card>

                            <Card padding="lg" aria-labelledby="statutory-heading">
                                <h2 id="statutory-heading" className="mb-4 text-base font-semibold text-white">
                                    Statutory Compliance
                                </h2>
                                <ul className="flex flex-col gap-3">
                                    {STATUTORY_ITEMS.map((item) => (
                                        <li
                                            key={item.label}
                                            className="flex items-center justify-between rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 py-2.5"
                                        >
                                            <span className="text-sm text-white">{item.label}</span>
                                            <Badge variant={item.variant}>{item.status}</Badge>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/payroll/audit" className="mt-4 block text-center text-sm text-[#0066FF] hover:underline">
                                    Go to Compliance →
                                </Link>
                            </Card>
                        </div>

                        {/* Payroll History Table */}
                        <Card padding="none" aria-labelledby="history-heading">
                            <div className="flex items-center justify-between border-b border-[#1A2A3A] px-6 py-4">
                                <h2 id="history-heading" className="text-base font-semibold text-white">
                                    Payroll History
                                </h2>
                                <Link href="/payroll/history" className="text-sm text-[#0066FF] hover:underline">
                                    View All →
                                </Link>
                            </div>
                            <DataTable<HistoryRow>
                                data={HISTORY}
                                columns={HISTORY_COLUMNS}
                                rowKey={(r) => r.month}
                                aria-label="Payroll history"
                                emptyTitle="No payroll history"
                            />
                        </Card>
                    </div>

                    {/* Right Column */}
                    <aside className="flex flex-col gap-6">
                        {/* Quick Actions */}
                        <Card padding="lg" aria-labelledby="quick-actions-heading">
                            <h2 id="quick-actions-heading" className="mb-4 text-base font-semibold text-white">
                                Quick Actions
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {QUICK_ACTIONS.map((action) => (
                                    <Link key={action.label} href={action.href} className="no-underline">
                                        <div className="group flex cursor-pointer flex-col gap-3 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 text-white transition-all hover:border-[#334455] hover:bg-[#0D1928]">
                                            <div className="text-[#00E5A0] transition-transform group-hover:scale-110">
                                                {action.icon}
                                            </div>
                                            <div className="text-xs font-medium leading-tight">{action.label}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </Card>

                        {/* Payroll Calendar */}
                        <Card padding="lg" aria-labelledby="calendar-heading">
                            <h2 id="calendar-heading" className="mb-4 text-base font-semibold text-white">
                                Payroll Calendar
                            </h2>
                            <div className="mb-4 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                                <div className="mb-4 text-sm font-semibold text-white">November 2024</div>
                                <ul className="flex flex-col gap-3">
                                    {CALENDAR_EVENTS.map((ev) => (
                                        <li key={ev.date} className="flex items-start gap-3 text-sm">
                                            <div
                                                className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                                                style={{ background: ev.color }}
                                                aria-hidden="true"
                                            />
                                            <div>
                                                <span className="text-white">{ev.date}:</span>
                                                <span className="ml-1.5 text-[#8899AA]">{ev.desc}</span>
                                                {ev.done && (
                                                    <CheckCircle2
                                                        size={12}
                                                        className="mb-0.5 ml-1.5 inline text-[#00E5A0]"
                                                        aria-label="Completed"
                                                    />
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Button variant="outline" className="w-full">
                                Add to Google Calendar
                            </Button>
                        </Card>
                    </aside>
                </div>
            </div>
        </Page>
    );
}
