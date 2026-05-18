"use client";

import { TrendingUp, Mail, MessageSquare } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { seededFloats } from "@/lib/random";

const KPI_ITEMS = [
    { label: "Total Sent", value: "1.24M", trend: "+12%", positive: true },
    { label: "Delivery Rate", value: "99.8%", trend: "+0.1%", positive: true },
    { label: "Open Rate (Email)", value: "62.4%", trend: "-2.4%", positive: false },
    { label: "Push CTR", value: "18.2%", trend: "+5.5%", positive: true },
] as const;

const TOP_CATEGORIES = [
    { name: "Payroll & Slips", val: 88, icon: Mail },
    { name: "Direct Mentions", val: 76, icon: MessageSquare },
    { name: "Policy Updates", val: 45, icon: TrendingUp },
] as const;

// Deterministic bar heights — no Math.random() in render
const BAR_HEIGHTS = seededFloats(42, 12).map((f) => Math.round(30 + f * 70));

export default function NotificationAnalyticsPage() {
    return (
        <Page
            title="Delivery Analytics"
            subtitle="Track open rates, delivery success, and engagement across channels"
            breadcrumbs={[
                { label: "Notifications", href: "/notifications" },
                { label: "Analytics" },
            ]}
            maxWidth="1100px"
            actions={
                <Button variant="secondary" size="sm">








                    Last 30 Days
                </Button>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {KPI_ITEMS.map((kpi) => (
                        <Card key={kpi.label} padding="md">
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                {kpi.label}
                            </p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black text-white">{kpi.value}</span>
                                <span
                                    className={`text-xs font-bold ${
                                        kpi.positive ? "text-emerald-400" : "text-rose-400"
                                    }`}
                                >
                                    {kpi.trend}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Volume chart */}
                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle>Volumes by Channel</CardTitle>
                        </CardHeader>
                        <div
                            className="flex h-64 items-end justify-between gap-2 border-b border-[#1A2A3A] pb-2"
                            role="img"
                            aria-label="Bar chart showing notification volumes by channel"
                        >
                            {BAR_HEIGHTS.map((h, i) => (
                                <div key={i} className="flex w-full justify-center">
                                    <div
                                        className="w-4 rounded-t-sm bg-indigo-500"
                                        style={{ height: `${h}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Top categories */}
                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle>Top Performing Categories</CardTitle>
                        </CardHeader>
                        <div className="space-y-4">
                            {TOP_CATEGORIES.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.name} className="flex items-center gap-4">
                                        <div className="rounded-lg bg-[#131B2B] p-2 text-[#8899AA]">
                                            <Icon size={16} aria-hidden="true" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-1 flex justify-between text-sm">
                                                <span className="text-white">{item.name}</span>
                                                <span className="font-medium text-emerald-400">
                                                    {item.val}%
                                                </span>
                                            </div>
                                            <div
                                                className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
                                                role="progressbar"
                                                aria-valuenow={item.val}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-label={`${item.name} open rate`}
                                            >
                                                <div
                                                    className="h-full rounded-full bg-emerald-500"
                                                    style={{ width: `${item.val}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        

        

        

            
        </Page>
    );
}
