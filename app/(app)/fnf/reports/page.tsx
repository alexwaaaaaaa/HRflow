"use client";

import {
    BarChart3, TrendingDown, Download, Calendar, Filter, RefreshCw, UserX,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface KpiCard {
    label: string;
    val: string;
    trend: string;
    icon: typeof BarChart3;
    color: string;
    trendVariant: "success" | "danger";
}

const KPI_CARDS: KpiCard[] = [
    { label: "Annual Attrition %", val: "14.2%", trend: "-2.1%", icon: UserX, color: "text-emerald-500", trendVariant: "success" },
    { label: "Avg Settlement Vol", val: "₹4.8L", trend: "+12%", icon: BarChart3, color: "text-blue-500", trendVariant: "danger" },
    { label: "Cycle Time (Avg)", val: "8.5d", trend: "-1.2d", icon: RefreshCw, color: "text-violet-500", trendVariant: "success" },
    { label: "Outstanding Claims", val: "₹12.4L", trend: "High", icon: TrendingDown, color: "text-rose-500", trendVariant: "danger" },
];

interface BarItem {
    label: string;
    val: number;
    color: string;
}

const BAR_ITEMS: BarItem[] = [
    { label: "ENG", val: 80, color: "bg-blue-500" },
    { label: "SAL", val: 55, color: "bg-indigo-500" },
    { label: "OPS", val: 40, color: "bg-violet-500" },
    { label: "HR", val: 20, color: "bg-emerald-500" },
    { label: "FIN", val: 35, color: "bg-amber-500" },
    { label: "MKG", val: 65, color: "bg-rose-500" },
];

interface ExitDriver {
    reason: string;
    pct: number;
    color: string;
}

const EXIT_DRIVERS: ExitDriver[] = [
    { reason: "Better Opportunities", pct: 42, color: "bg-blue-500" },
    { reason: "Personal Reasons", pct: 28, color: "bg-indigo-500" },
    { reason: "Relocation", pct: 15, color: "bg-rose-500" },
    { reason: "Higher Education", pct: 10, color: "bg-emerald-500" },
    { reason: "Other", pct: 5, color: "bg-[#445566]" },
];

export default function FnFReports() {
    return (
        <Page
            title="Attrition & Settlement Analytics"
            subtitle="Strategic insights into employee exit patterns and financial impact."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Reports" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Calendar size={14} aria-hidden="true" />}>
                        FY 2023-24
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>
                        Download Annual Audit
                    </Button>
                </>
            }
        >
            <div className="space-y-8">
                {/* KPI strip */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {KPI_CARDS.map((m) => {
                        const Icon = m.icon;
                        return (
                            <Card key={m.label} padding="md">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className={`rounded-xl border border-[#1A2A3A] bg-[#060B14] p-2 ${m.color}`}>
                                        <Icon size={22} aria-hidden="true" />
                                    </div>
                                    <Badge variant={m.trendVariant}>{m.trend}</Badge>
                                </div>
                                <p className="text-3xl font-black tracking-tight text-white">{m.val}</p>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#445566]">{m.label}</p>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Primary Chart */}
                    <div className="lg:col-span-2">
                        <Card padding="lg">
                            <div className="mb-8 flex items-start justify-between">
                                <div>
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-white">
                                        Exit Volume by Department
                                    </h2>
                                    <p className="mt-1 text-[10px] font-bold uppercase text-[#445566]">
                                        Cross-departmental resignation distribution
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm" icon={<Filter size={16} aria-hidden="true" />} aria-label="Filter chart" />
                            </div>

                            {/* Bar chart */}
                            <div className="flex h-[250px] items-end justify-between gap-4" role="img" aria-label="Exit volume by department bar chart">
                                {BAR_ITEMS.map((bar) => (
                                    <div key={bar.label} className="group/bar flex flex-1 flex-col items-center gap-4">
                                        <div className="w-full">
                                            <div
                                                className={`w-full ${bar.color} rounded-t-lg transition-all`}
                                                style={{ height: `${bar.val * 2.5}px` }}
                                                aria-label={`${bar.label}: ${bar.val}`}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                            {bar.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Exit Drivers */}
                    <div>
                        <Card padding="lg">
                            <h2 className="mb-6 border-b border-[#1A2A3A] pb-4 text-xs font-bold uppercase tracking-widest text-white">
                                Top Exit Drivers
                            </h2>
                            <ul className="space-y-4" role="list">
                                {EXIT_DRIVERS.map((row) => (
                                    <li key={row.reason} className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                                            <span className="text-[#8899AA]">{row.reason}</span>
                                            <span className="text-white">{row.pct}%</span>
                                        </div>
                                        <div
                                            className="h-1.5 overflow-hidden rounded-full border border-[#1A2A3A] bg-[#060B14]"
                                            role="progressbar"
                                            aria-valuenow={row.pct}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${row.reason}: ${row.pct}%`}
                                        >
                                            <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline" size="sm" icon={<Download size={14} aria-hidden="true" />} className="mt-8 w-full">
                                Full Demographic Data
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
