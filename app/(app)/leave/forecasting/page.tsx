"use client";

import { AlertTriangle, ArrowUpRight, TrendingUp, Users } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import { seededFloats } from "@/lib/random";

// ─────────────────────────────────────────────────────────────────────────────
// Static data — deterministic, no Math.random() in render
// ─────────────────────────────────────────────────────────────────────────────

// Deterministic projected availability — backend would supply real values
// from leave forecasts. Holiday-week dip preserved from original design.
const WEEK_AVAILABILITY = seededFloats(2024, 12).map(
    (r, i) => 80 + r * 15 - (i > 8 ? 20 : 0)
);

const KPI_CARDS = [
    {
        title: "Leave Liability (EL)",
        value: "₹48.5L",
        trend: "+12% projected by Dec 31",
        trendVariant: "danger" as const,
        icon: TrendingUp,
    },
    {
        title: "Highest Risk Dept",
        value: "Engineering",
        trend: "Averages 14 unused EL per person",
        trendVariant: "warning" as const,
        icon: AlertTriangle,
    },
    {
        title: "Upcoming Month Impact",
        value: "18%",
        trend: "Of workforce planned leave in Dec",
        trendVariant: "neutral" as const,
        icon: Users,
    },
] as const;

const TREND_CLASSES = {
    danger: "text-[#FF4444]",
    warning: "text-[#FFB800]",
    neutral: "text-[#556677]",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveForecastingPage() {
    return (
        <Page
            title="Leave Forecasting & Liability"
            subtitle="Predictive analytics for upcoming team absences and financial liability of unused leaves"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Forecasting" },
            ]}
            maxWidth="1200px"
        >


            <div className="space-y-6">
                {/* KPI cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {KPI_CARDS.map((kpi) => (
                        <Card key={kpi.title} padding="md">
                            <div className="mb-4 flex items-start justify-between">
                                <p className="text-sm font-bold uppercase tracking-wider text-[#8899AA]">{kpi.title}</p>
                                <kpi.icon size={18} className={TREND_CLASSES[kpi.trendVariant]} aria-hidden="true" />
                            </div>
                            <p className="text-3xl font-black text-white">{kpi.value}</p>
                            <p className={`mt-2 flex items-center gap-1 text-xs font-bold ${TREND_CLASSES[kpi.trendVariant]}`}>
                                {kpi.trendVariant === "danger" && <ArrowUpRight size={14} aria-hidden="true" />}
                                {kpi.trend}
                            </p>
                        </Card>
                    ))}
                </div>

                {/* Forecast chart */}
                <Card padding="none">
                    <CardHeader className="border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                        <CardTitle>Projected Resource Availability (Next 90 Days)</CardTitle>
                        <select
                            aria-label="Filter by department"
                            className="rounded border border-[#1A2A3A] bg-[#060B14] p-1.5 text-xs text-white outline-none"
                        >
                            <option>All Departments</option>
                            <option>Engineering</option>
                        </select>
                    </CardHeader>

                    <div
                        className="relative flex h-[300px] items-end gap-2 p-6 pb-8"
                        role="img"
                        aria-label="Bar chart showing projected resource availability over 12 weeks"
                    >
                        {/* Y-axis guides */}
                        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 pb-8 opacity-20">
                            {[100, 75, 50, 25, 0].map((val) => (
                                <div key={val} className="relative h-0 w-full border-b border-dashed border-white">
                                    <span className="absolute -left-5 -top-3 font-mono text-[10px] text-white">{val}%</span>
                                </div>
                            ))}
                        </div>

                        {/* Bars */}
                        {WEEK_AVAILABILITY.map((h, i) => (
                            <div
                                key={i}
                                className="group relative z-10 flex h-full flex-1 cursor-crosshair flex-col justify-end"
                            >
                                <div
                                    className={`w-full rounded-t-sm opacity-80 transition-all duration-500 ease-out group-hover:opacity-100 ${
                                        h < 75 ? "bg-[#FFB800]" : "bg-[#0066FF]"
                                    }`}
                                    style={{ height: `${h}%` }}
                                />
                                <div className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded border border-[#1A2A3A] bg-[#060B14] px-2 py-1 text-xs font-bold text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                                    Week {i + 1}: {Math.round(h)}% Available
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between border-t border-[#1A2A3A] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#556677]">
                        <span>Current Week</span>
                        <span>+45 Days</span>
                        <span>+90 Days</span>
                    </div>
                </Card>
            </div>
            
        </Page>
    );
}
