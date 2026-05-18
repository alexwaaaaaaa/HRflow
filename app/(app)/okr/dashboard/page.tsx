"use client";

import { useState } from "react";
import {
    Target, TrendingUp, Plus, ChevronRight,
    BarChart2, Calendar, Users, ArrowUpRight, RefreshCw, Filter
} from "lucide-react";
import { RadialBarChart, RadialBar, Tooltip } from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type OkrStatus = "on-track" | "at-risk" | "behind";

interface CompanyOkr {
    title: string;
    owner: string;
    progress: number;
    status: OkrStatus;
    due: string;
}

const CYCLES = ["Q1 2025 (Jan–Mar)", "Q4 2024 (Oct–Dec)", "Q3 2024 (Jul–Sep)"] as const;

const KPI = [
    { label: "Company OKRs", value: "8", sub: "3 on track · 2 at risk", icon: Target, colorClass: "text-[#00E5A0]", bgClass: "bg-[#00E5A0]/10" },
    { label: "Dept OKRs", value: "24", sub: "18 on track · 4 at risk", icon: Users, colorClass: "text-[#0066FF]", bgClass: "bg-[#0066FF]/10" },
    { label: "Team OKRs", value: "62", sub: "Across 9 departments", icon: BarChart2, colorClass: "text-[#FFB800]", bgClass: "bg-[#FFB800]/10" },
    { label: "Avg Progress", value: "68%", sub: "+4% vs last cycle", icon: TrendingUp, colorClass: "text-[#9D00FF]", bgClass: "bg-[#9D00FF]/10" },
] as const;

const COMPANY_OKRS: CompanyOkr[] = [
    { title: "Achieve ₹100 Cr ARR", owner: "CEO", progress: 72, status: "on-track", due: "Mar 31" },
    { title: "Expand to 3 new cities", owner: "Expansion", progress: 45, status: "at-risk", due: "Mar 31" },
    { title: "Maintain NPS > 60", owner: "CX Team", progress: 88, status: "on-track", due: "Mar 31" },
    { title: "Reduce churn < 5%", owner: "Product", progress: 34, status: "behind", due: "Mar 31" },
];

const RADIAL_DATA = [
    { name: "On Track", value: 68, fill: "#00E5A0" },
    { name: "At Risk", value: 20, fill: "#FFB800" },
    { name: "Behind", value: 12, fill: "#FF4444" },
];

const STATUS_VARIANT: Record<OkrStatus, "success" | "warning" | "danger"> = {
    "on-track": "success",
    "at-risk": "warning",
    "behind": "danger",
};

const STATUS_LABEL: Record<OkrStatus, string> = {
    "on-track": "On Track",
    "at-risk": "At Risk",
    "behind": "Behind",
};

// Static progress bar color map — no template literals
const STATUS_PROGRESS_BAR: Record<OkrStatus, string> = {
    "on-track": "bg-[#00E5A0]",
    "at-risk": "bg-[#FFB800]",
    "behind": "bg-[#FF4444]",
};

const QUICK_ACTIONS = [
    { label: "Do Check-in", href: "/okr/check-in", icon: RefreshCw, colorClass: "text-[#00E5A0]", bgClass: "bg-[#00E5A0]/10" },
    { label: "View Alignment", href: "/okr/alignment", icon: ArrowUpRight, colorClass: "text-[#0066FF]", bgClass: "bg-[#0066FF]/10" },
    { label: "OKR Reports", href: "/okr/reports", icon: BarChart2, colorClass: "text-[#FFB800]", bgClass: "bg-[#FFB800]/10" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function OkrRow({ okr }: { okr: CompanyOkr }) {
    return (
        <li className="px-6 py-4 hover:bg-[#152336] transition-colors">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                    <p className="text-sm font-semibold text-white mb-0.5">{okr.title}</p>
                    <p className="text-xs text-[#8899AA]">Owner: {okr.owner} · Due {okr.due}</p>
                </div>
                <Badge variant={STATUS_VARIANT[okr.status]}>{STATUS_LABEL[okr.status]}</Badge>
            </div>
            <div className="flex items-center gap-3">
                <div
                    className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={okr.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${okr.title}: ${okr.progress}% complete`}
                >
                    <div
                        className={`h-full rounded-full transition-all duration-700 ${STATUS_PROGRESS_BAR[okr.status]}`}
                        style={{ width: `${okr.progress}%` }}
                    />
                </div>
                <span className="text-xs font-bold text-white shrink-0">{okr.progress}%</span>
            </div>
        </li>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OKRDashboard() {
    const [cycle, setCycle] = useState<string>(CYCLES[0]);

    return (
        <Page
            title="OKR Dashboard"
            subtitle="Objectives & Key Results — company-wide progress at a glance."
            breadcrumbs={[{ label: "OKRs" }]}
            maxWidth="1400px"
            actions={
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <label htmlFor="cycle-select" className="sr-only">Select OKR Cycle</label>
                        <select
                            id="cycle-select"
                            value={cycle}
                            onChange={(e) => setCycle(e.target.value)}
                            className="bg-[#0D1928] border border-[#1A2A3A] text-white text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-[#00e5a0] appearance-none cursor-pointer"
                        >
                            {CYCLES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                        <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8899AA] pointer-events-none" aria-hidden="true" />
                    </div>
                    <Button variant="secondary" icon={<Filter size={16} />} aria-label="Filter OKRs">Filter</Button>
                    <Button icon={<Plus size={16} />} href="/okr/create">New OKR</Button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {KPI.map((k) => (
                        <Card key={k.label} padding="md" className="hover:border-[#2A3A4A] transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <p className="text-xs text-[#8899AA] font-medium">{k.label}</p>
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${k.bgClass}`}
                                    aria-hidden="true"
                                >
                                    <k.icon size={15} className={k.colorClass} />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{k.value}</p>
                            <p className="text-[11px] text-[#8899AA]">{k.sub}</p>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Company OKRs */}
                    <section className="lg:col-span-2" aria-labelledby="company-okrs-heading">
                        <Card padding="none" className="overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2A3A]">
                                <h2 id="company-okrs-heading" className="text-base font-semibold text-white">Company Objectives</h2>
                                <Link href="/okr/company" className="text-xs text-[#00e5a0] hover:underline flex items-center gap-1">
                                    View All <ChevronRight size={12} aria-hidden="true" />
                                </Link>
                            </div>
                            <ul role="list" className="divide-y divide-[#1A2A3A]">
                                {COMPANY_OKRS.map((okr) => (
                                    <OkrRow key={okr.title} okr={okr} />
                                ))}
                            </ul>
                        </Card>
                    </section>

                    {/* Right column */}
                    <div className="flex flex-col gap-6">
                        {/* Radial Progress */}
                        <section aria-labelledby="progress-dist-heading">
                            <Card padding="lg">
                                <h2 id="progress-dist-heading" className="text-sm font-semibold text-white mb-4">Progress Distribution</h2>
                                <div className="h-40">
                                    <ChartWrapper height="h-full">
                                        <RadialBarChart
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="50%"
                                            outerRadius="90%"
                                            data={RADIAL_DATA}
                                            startAngle={90}
                                            endAngle={-270}
                                        >
                                            <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "#1A2A3A" }} />
                                            <Tooltip
                                                contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 12 }}
                                                formatter={(v: unknown) => [`${v}%`, ""]}
                                            />
                                        </RadialBarChart>
                                    </ChartWrapper>
                                </div>
                                <ul role="list" className="mt-3 space-y-2">
                                    {RADIAL_DATA.map((d) => (
                                        <li key={d.name} className="flex items-center justify-between text-xs">
                                            <span className="flex items-center gap-2 text-[#8899AA]">
                                                <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} aria-hidden="true" />
                                                {d.name}
                                            </span>
                                            <span className="font-bold text-white">{d.value}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </section>

                        {/* Quick Actions */}
                        <section aria-labelledby="quick-actions-heading">
                            <Card padding="lg">
                                <h2 id="quick-actions-heading" className="text-sm font-semibold text-white mb-3">Quick Actions</h2>
                                <nav aria-label="OKR quick actions">
                                    <ul role="list" className="space-y-2">
                                        {QUICK_ACTIONS.map((a) => (
                                            <li key={a.href}>
                                                <Link
                                                    href={a.href}
                                                    className="flex items-center gap-3 p-3 bg-[#0A1420] border border-[#1A2A3A] rounded-xl hover:border-opacity-60 transition-all group"
                                                >
                                                    <div
                                                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${a.bgClass}`}
                                                        aria-hidden="true"
                                                    >
                                                        <a.icon size={13} className={a.colorClass} />
                                                    </div>
                                                    <span className="text-sm text-white font-medium">{a.label}</span>
                                                    <ChevronRight size={13} className="ml-auto text-[#7a8fa6] group-hover:text-white transition-colors" aria-hidden="true" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </Card>
                        </section>
                    </div>
                </div>
            </div>
        </Page>
    );
}
