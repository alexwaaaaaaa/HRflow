"use client";

import Link from "next/link";
import {
    PlayCircle, FileText, CheckCircle2, TrendingUp, Users,
    DollarSign, Calendar, ArrowRight, AlertTriangle,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface PendingItem {
    color: string;
    title: string;
    desc: string;
    href: string;
    linkLabel: string;
}

interface ActivityItem {
    color: string;
    text: string;
    time: string;
}

const PENDING_ITEMS: PendingItem[] = [
    { color: "#FFB800", title: "14 CTC revisions", desc: "Require approval before next run.", href: "/payroll/ctc-revision", linkLabel: "Review" },
    { color: "#0066FF", title: "Bank account verification", desc: "13 pending penny drops.", href: "/payroll-settings/bank-verify", linkLabel: "Execute" },
    { color: "#FF4444", title: "5 F&F settlements", desc: "Exited employees awaiting payout.", href: "/payroll/fnf", linkLabel: "Process" },
];

const ACTIVITY_LOG: ActivityItem[] = [
    { color: "#00E5A0", text: "System auto-locked attendance.", time: "Today, 02:00 PM" },
    { color: "#FFB800", text: "Arrears computation requested.", time: "Yesterday, 04:15 PM" },
    { color: "#0066FF", text: "October payroll finalized & disbursed.", time: "28 Oct, 06:10 PM" },
];

const QUICK_REPORTS = [
    { href: "/payroll/reports/variance", title: "Variance report", desc: "Component MoM comparison." },
    { href: "/payroll/reports/lop", title: "LOP detailed report", desc: "Absenteeism deduction impact." },
    { href: "/payroll/reports/joiners", title: "Mid-month joiners", desc: "Pro-rated salary breakdown." },
    { href: "/payroll/history", title: "Payroll registers", desc: "Download historical master files." },
];

const CONTROLS = [
    { href: "/payroll-settings/lock", label: "Lock/Unlock engine" },
    { href: "/payroll-settings/cycle", label: "Cycle settings" },
    { href: "/payroll-settings/components", label: "Salary components" },
];

const KPIS = [
    { icon: DollarSign, color: "#8899AA", label: "Last payout (Oct 2024)", value: "₹3.75 Cr", footer: <span className="flex items-center gap-1 text-[#00e5a0]"><TrendingUp size={11} aria-hidden="true" /> +2.4% MoM</span> },
    { icon: Users, color: "#8899AA", label: "Employees paid", value: "840", footer: <span className="text-[#8899AA]">Active headcount: 842</span> },
    { icon: FileText, color: "#0066FF", label: "Statutory dues (15th)", value: "₹42.5 L", footer: <span className="flex items-center gap-1 text-[#FFB800]"><AlertTriangle size={11} aria-hidden="true" /> Pending challan</span> },
    { icon: Calendar, color: "#FFB800", label: "Next run", value: "28 Nov", footer: <span className="flex items-center gap-1 text-[#00e5a0]"><CheckCircle2 size={11} aria-hidden="true" /> Attendance locked</span>, highlight: true },
];

export default function PayrollDashboardPage() {
    return (
        <Page
            title="Payroll dashboard"
            subtitle="Overview of upcoming runs, recent distributions, and compliance alerts"
            breadcrumbs={[{ label: "Payroll", href: "/payroll" }, { label: "Dashboard" }]}
            maxWidth="1200px"
            actions={
                <Button icon={<PlayCircle size={16} />} href="/payroll/run/select-month">Run payroll</Button>
            }
        >
            <div className="space-y-6">
                {/* KPIs */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {KPIS.map((k) => (
                        <Card
                            key={k.label}
                            className={k.highlight ? "border-[#FFB800]/30 bg-[#FFB800]/5" : ""}
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <k.icon size={14} style={{ color: k.color }} aria-hidden="true" />
                                <p className="text-xs text-[#8899AA]">{k.label}</p>
                            </div>
                            <p className="mb-2 text-2xl font-bold tabular-nums">{k.value}</p>
                            <p className="text-xs">{k.footer}</p>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
                    <div className="space-y-6">
                        {/* Pending */}
                        <Card padding="lg" aria-labelledby="pending-h">
                            <h2 id="pending-h" className="mb-4 text-base font-semibold">
                                Pending inputs (Nov 2024)
                            </h2>
                            <ul className="space-y-3">
                                {PENDING_ITEMS.map((item) => (
                                    <li
                                        key={item.href}
                                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#1A2A3A] bg-[#060B14] px-4 py-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="h-2 w-2 shrink-0 rounded-full"
                                                style={{ background: item.color }}
                                                aria-hidden="true"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.title}</p>
                                                <p className="text-xs text-[#8899AA]">{item.desc}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={item.href}
                                            className="text-sm font-semibold text-[#00e5a0] hover:underline"
                                        >
                                            {item.linkLabel}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Quick reports */}
                        <Card padding="lg" aria-labelledby="reports-h">
                            <CardHeader>
                                <CardTitle id="reports-h">Quick reports</CardTitle>
                                <Link href="/payroll/reports/variance" className="inline-flex items-center gap-1 text-xs text-[#8899AA] transition-colors hover:text-white">
                                    View all <ArrowRight size={12} aria-hidden="true" />
                                </Link>
                            </CardHeader>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {QUICK_REPORTS.map((r) => (
                                    <Link
                                        key={r.href}
                                        href={r.href}
                                        className="group block rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-[#00e5a0]/50"
                                    >
                                        <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-[#00e5a0]">
                                            {r.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-[#8899AA]">{r.desc}</p>
                                    </Link>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card padding="lg" aria-labelledby="controls-h">
                            <h2 id="controls-h" className="mb-4 text-base font-semibold">
                                Payroll controls
                            </h2>
                            <ul className="space-y-3">
                                {CONTROLS.map((c) => (
                                    <li key={c.href}>
                                        <Link
                                            href={c.href}
                                            className="flex items-center justify-between rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 transition-colors hover:bg-[#1A2A3A]/30"
                                        >
                                            <span className="text-sm">{c.label}</span>
                                            <ArrowRight size={14} className="text-[#8899AA]" aria-hidden="true" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card padding="lg" aria-labelledby="activity-h">
                            <CardHeader>
                                <CardTitle id="activity-h">Recent activity</CardTitle>
                                <Link
                                    href="/payroll/audit"
                                    className="text-xs text-[#8899AA] hover:text-white"
                                >
                                    Logs
                                </Link>
                            </CardHeader>
                            <ol className="space-y-4">
                                {ACTIVITY_LOG.map((item) => (
                                    <li key={item.text} className="flex gap-3">
                                        <span
                                            aria-hidden="true"
                                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                                            style={{ background: item.color }}
                                        />
                                        <div>
                                            <p className="text-sm">{item.text}</p>
                                            <p className="text-xs text-[#8899AA]">{item.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
