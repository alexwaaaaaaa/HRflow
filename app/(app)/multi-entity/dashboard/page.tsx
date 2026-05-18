"use client";

import {
    Users,
    UserPlus,
    FileSignature,
    ArrowUpRight,
    ArrowDownRight,
    IndianRupee,
    Building2,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Static data ──────────────────────────────────────────────────────────────

interface KpiItem {
    icon: React.ElementType;
    label: string;
    value: string;
    sub: string;
    up: boolean;
    warn?: boolean;
}

const KPI_ITEMS: KpiItem[] = [
    { icon: Users, label: "Total Headcount", value: "567", sub: "+15 vs last month", up: true },
    { icon: UserPlus, label: "Monthly Attrition", value: "1.2%", sub: "-0.3% vs last month", up: false },
    { icon: IndianRupee, label: "Total Payroll Cost", value: "₹3.29 Cr", sub: "+2.1% vs last month", up: true },
    { icon: FileSignature, label: "Pending Approvals", value: "24", sub: "Across 3 entities", up: true, warn: true },
];

interface BarItem {
    m: string;
    h: number;
    val: string;
    active?: boolean;
}

const BAR_DATA: BarItem[] = [
    { m: "May", h: 60, val: "₹3.01" },
    { m: "Jun", h: 65, val: "₹3.10" },
    { m: "Jul", h: 62, val: "₹3.08" },
    { m: "Aug", h: 70, val: "₹3.18" },
    { m: "Sep", h: 72, val: "₹3.22" },
    { m: "Oct", h: 85, val: "₹3.29", active: true },
];

interface EntityDist {
    e: string;
    v: number;
    p: number;
    barCls: string;
}

const ENTITY_DIST: EntityDist[] = [
    { e: "Acme Tech (Parent)", v: 342, p: 60, barCls: "bg-[#4f46e5]" },
    { e: "Acme Retail", v: 128, p: 23, barCls: "bg-blue-500" },
    { e: "Acme Logistics", v: 85, p: 15, barCls: "bg-emerald-500" },
    { e: "Acme Global US", v: 12, p: 2, barCls: "bg-purple-500" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ item }: { item: KpiItem }) {
    const Icon = item.icon;
    return (
        <Card padding="lg">
            <div className="flex items-start justify-between">
                <p className="text-sm font-bold text-[#8899AA]">{item.label}</p>
                <div
                    className={`rounded-lg p-1.5 ${
                        item.warn ? "bg-amber-500/10 text-amber-400" : "bg-[#4f46e5]/10 text-[#818cf8]"
                    }`}
                >
                    <Icon size={16} aria-hidden="true" />
                </div>
            </div>
            <p className="mt-2 text-3xl font-black text-white">{item.value}</p>
            <p
                className={`mt-1 flex items-center gap-1 text-xs font-bold ${
                    item.warn ? "text-amber-400" : item.up ? "text-emerald-400" : "text-red-400"
                }`}
            >
                {!item.warn &&
                    (item.up ? (
                        <ArrowUpRight size={14} aria-hidden="true" />
                    ) : (
                        <ArrowDownRight size={14} aria-hidden="true" />
                    ))}
                {item.sub}
            </p>
        </Card>
    );
}

function PayrollBar({ bar }: { bar: BarItem }) {
    return (
        <div className="group relative flex flex-1 cursor-pointer flex-col items-center gap-3">
            <div
                className="absolute -top-8 z-10 whitespace-nowrap rounded bg-[#1A2A3A] px-2 py-1 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
            >
                {bar.val} Cr
            </div>
            <div className="relative flex w-full items-end justify-center overflow-hidden rounded-t-lg bg-[#0D1928]" style={{ height: "200px" }}>
                <div
                    className={`w-full rounded-t-lg transition-all duration-500 ease-out group-hover:opacity-80 ${
                        bar.active ? "bg-[#4f46e5]" : "bg-[#4f46e5]/30"
                    }`}
                    style={{ height: `${bar.h}%` }}
                    role="img"
                    aria-label={`${bar.m}: ${bar.val} Cr`}
                />
            </div>
            <span className={`text-xs font-bold ${bar.active ? "text-white" : "text-[#7a8fa6]"}`}>{bar.m}</span>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GroupDashboardPage() {
    return (
        <Page
            title="Group Executive Dashboard"
            subtitle="High-level view of 4 active entities and 567 total employees"
            breadcrumbs={[{ label: "Multi-Entity", href: "/multi-entity/list" }, { label: "Dashboard" }]}
            maxWidth="1400px"
            actions={
                <Badge variant="info" dot>
                    4 Active Entities
                </Badge>
            }
        >
            {/* KPI strip */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {KPI_ITEMS.map((kpi) => (
                    <KpiCard key={kpi.label} item={kpi} />
                ))}
            </div>

            {/* Charts row */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* Payroll trend */}
                <Card padding="lg" className="lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-white">Group Payroll Trend</h2>
                        <label htmlFor="trend-period" className="sr-only">
                            Select period
                        </label>
                        <select
                            id="trend-period"
                            className="rounded border border-[#2A3A4A] bg-[#0D1928] px-2 py-1 text-xs text-[#AABBCC] outline-none"
                        >
                            <option>Last 6 Months</option>
                            <option>YTD</option>
                        </select>
                    </div>
                    <div className="flex h-64 items-end justify-between gap-2 pt-4">
                        {BAR_DATA.map((bar) => (
                            <PayrollBar key={bar.m} bar={bar} />
                        ))}
                    </div>
                </Card>

                {/* Entity distribution */}
                <Card padding="lg">
                    <h2 className="mb-4 border-b border-[#1A2A3A] pb-3 text-sm font-bold text-white">
                        Entity Distribution
                    </h2>
                    <ul className="space-y-4 pt-2" role="list" aria-label="Employee distribution by entity">
                        {ENTITY_DIST.map((item) => (
                            <li key={item.e}>
                                <div className="mb-1.5 flex justify-between text-xs font-bold">
                                    <span className="text-[#AABBCC]">{item.e}</span>
                                    <span className="text-white">{item.v}</span>
                                </div>
                                <div
                                    className="h-2 w-full overflow-hidden rounded-full bg-[#0D1928]"
                                    role="progressbar"
                                    aria-valuenow={item.p}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label={`${item.e}: ${item.p}%`}
                                >
                                    <div className={`h-full ${item.barCls}`} style={{ width: `${item.p}%` }} />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 border-t border-[#1A2A3A] pt-6">
                        <Button variant="secondary" icon={<Building2 size={14} />} className="w-full justify-center" href="/multi-entity/list">Manage Entities</Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
