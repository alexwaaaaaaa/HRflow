"use client";

import { BarChart3, PieChart, TrendingUp, AlertTriangle, MessageSquare, Download, Zap, ArrowUpRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const METRICS = [
    { label: "Overall Exit Score", value: "4.2/5", icon: BarChart3, trend: "+0.3", variant: "success" as const },
    { label: "Primary Reason", value: "Career Growth", icon: TrendingUp, detail: "45% of exits", variant: "info" as const },
    { label: "Participation Rate", value: "88%", icon: MessageSquare, trend: "-2%", variant: "danger" as const },
    { label: "High Potential Attrition", value: "04", icon: AlertTriangle, detail: "Critical Risk", variant: "warning" as const },
];

const EXIT_REASONS = [
    { reason: "Career Growth / Better Pay", perc: 45, color: "bg-blue-500" },
    { reason: "Work-Life Balance", perc: 25, color: "bg-emerald-500" },
    { reason: "Management / Leadership", perc: 15, color: "bg-amber-500" },
    { reason: "Personal / Health", perc: 10, color: "bg-indigo-500" },
    { reason: "Others", perc: 5, color: "bg-[#445566]" },
];

const ALERTS = [
    { name: "Arnab D.", dept: "Eng", rating: 2, snippet: "Burnout is a major concern..." },
    { name: "Sanya G.", dept: "Mkt", rating: 5, snippet: "Highly professional culture!" },
    { name: "Rahul V.", dept: "Prod", rating: 1, snippet: "Toxic manager in the..." },
];

export default function ExitInterviewDashboardHR() {
    return (
        <Page
            title="Attrition Insights"
            subtitle="Real-time analysis of employee exit feedback and organizational health metrics."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Exit Interview", href: "/fnf/exit-interview" },
                { label: "Dashboard" },
            ]}
            maxWidth="1400px"
            actions={
                <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                    Export Sentiment Report
                </Button>
            }
        >
            <div className="space-y-8">
                {/* KPI strip */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {METRICS.map((m) => (
                        <Card key={m.label} padding="md">
                            <m.icon size={20} className="mb-3 text-[#8899AA]" aria-hidden="true" />
                            <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">{m.label}</p>
                            <p className="mt-1 text-3xl font-black text-white">{m.value}</p>
                            <div className="mt-2">
                                <Badge variant={m.variant}>{m.trend ?? m.detail}</Badge>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Exit Reason Distribution */}
                    <div className="lg:col-span-2">
                        <Card padding="lg">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-base font-bold text-white">
                                    <PieChart size={18} className="text-blue-500" aria-hidden="true" />
                                    Exit Reason Distribution
                                </h2>
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm">Monthly</Button>
                                    <Button variant="ghost" size="sm">Quarterly</Button>
                                </div>
                            </div>
                            <ul className="space-y-4" role="list">
                                {EXIT_REASONS.map((r) => (
                                    <li key={r.reason} className="space-y-1.5">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                            <span className="text-[#8899AA]">{r.reason}</span>
                                            <span className="text-white">{r.perc}%</span>
                                        </div>
                                        <div
                                            className="h-2.5 overflow-hidden rounded-full border border-[#1A2A3A] bg-[#060B14]"
                                            role="progressbar"
                                            aria-valuenow={r.perc}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${r.reason}: ${r.perc}%`}
                                        >
                                            <div className={`${r.color} h-full transition-all`} style={{ width: `${r.perc}%` }} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Critical Alerts */}
                    <div>
                        <Card padding="md">
                            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#445566]">
                                <Zap size={16} className="text-amber-500" aria-hidden="true" />
                                Critical Sentiment Alerts
                            </h2>
                            <ul className="space-y-3" role="list">
                                {ALERTS.map((alert) => (
                                    <li
                                        key={alert.name}
                                        className="cursor-pointer rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-blue-500/30"
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-xs font-black text-white">
                                                {alert.name}{" "}
                                                <span className="text-[#445566]">· {alert.dept}</span>
                                            </span>
                                            <div className="flex gap-0.5" aria-label={`Rating: ${alert.rating} of 5`}>
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <div
                                                        key={s}
                                                        className={`h-1.5 w-1.5 rounded-full ${
                                                            s <= alert.rating
                                                                ? alert.rating <= 2
                                                                    ? "bg-rose-500"
                                                                    : "bg-emerald-500"
                                                                : "bg-[#1A2A3A]"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-[#445566]">"{alert.snippet}"</p>
                                        <div className="mt-2 flex justify-end">
                                            <ArrowUpRight size={12} className="text-[#445566]" aria-hidden="true" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline" size="sm" className="mt-4 w-full">
                                View Historical Analytics
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
