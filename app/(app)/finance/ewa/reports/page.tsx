"use client";

import React from "react";
import { PieChart as PieChartIcon, Download, Filter, BarChart3, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie, Legend } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

const MONTHLY_USAGE = [
    { month: "May", amount: 1200000, unique_users: 145 },
    { month: "Jun", amount: 1550000, unique_users: 180 },
    { month: "Jul", amount: 1450000, unique_users: 165 },
    { month: "Aug", amount: 1800000, unique_users: 210 },
    { month: "Sep", amount: 2100000, unique_users: 245 },
    { month: "Oct", amount: 2450000, unique_users: 280 },
];

const USAGE_BY_DEPARTMENT = [
    { name: "Sales", value: 35, color: "#00E5FF" },
    { name: "Support", value: 40, color: "#7C3AED" },
    { name: "Engineering", value: 15, color: "#10B981" },
    { name: "Operations", value: 10, color: "#F59E0B" },
];

interface KpiTile {
    label: string;
    value: string;
    sub: string;
    subColor: string;
    valueColor?: string;
    icon?: any;
}

const KPI_TILES: KpiTile[] = [
    { label: "Total Active Users", value: "280", sub: "14% vs last month", subColor: "text-emerald-400", icon: TrendingUp },
    { label: "Avg. Withdrawal Amount", value: "₹8,750", sub: "Per transaction", subColor: "text-[#8899AA]" },
    { label: "Avg. Transactions / User", value: "2.1", sub: "Per month", subColor: "text-[#8899AA]" },
    { label: "Fee Revenue Generated", value: "₹1,05,500", sub: "YTD via 1% fee model", subColor: "text-[#8899AA]", valueColor: "text-emerald-400" },
];

const INSIGHTS = [
    { color: "text-[#00E5FF]", title: "Peak Withdrawal Days", body: "65% of all EWA transactions occur between the 20th and 25th of the month, indicating mid-month liquidity crunches." },
    { color: "text-purple-400", title: "Average Wait Time", body: "On average, funds are deposited into employee accounts within 12 seconds of successful IMPS API trigger." },
    { color: "text-emerald-400", title: "Retention Correlation", body: "Employees using EWA at least once a quarter have a 22% lower attrition rate compared to non-users in similar roles." },
] as const;

export default function EWAReportsPage() {
    return (
        <Page
            title="EWA Usage Analytics"
            subtitle="Deep dive into adoption rates, withdrawal patterns, and financial impact."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "EWA", href: "/finance/ewa" },
                { label: "Reports & Analytics" },
            ]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} />}>H2 2025</Button>
                    <Button icon={<Download size={14} />}>Download Report</Button>
                </>
            }
        >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {KPI_TILES.map((tile) => (
                    <Card key={tile.label} padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-1">{tile.label}</p>
                        <h3 className={`text-2xl font-bold mb-1 ${tile.valueColor ?? "text-white"}`}>{tile.value}</h3>
                        <p className={`text-xs flex items-center gap-1 ${tile.subColor}`}>
                            {"icon" in tile && tile.icon && <tile.icon size={12} aria-hidden="true" />}
                            {tile.sub}
                        </p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Volume Trend */}
                <Card padding="lg" className="lg:col-span-2">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart3 size={20} className="text-[#8899AA]" aria-hidden="true" />
                        Monthly Disbursement Volume
                    </h2>
                    <div className="h-72">
                        <ChartWrapper height="h-full">
                            <AreaChart data={MONTHLY_USAGE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} tickFormatter={(val) => `₹${val / 100000}L`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`₹${value?.toLocaleString?.() ?? value}`, "Amount"]}
                                />
                                <Area type="monotone" dataKey="amount" name="Disbursement" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </Card>

                {/* Usage by Department */}
                <Card padding="lg">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <PieChartIcon size={20} className="text-[#8899AA]" aria-hidden="true" />
                        Adoption by Department
                    </h2>
                    <div className="h-64">
                        <ChartWrapper height="h-full">
                            <PieChart>
                                <Pie
                                    data={USAGE_BY_DEPARTMENT}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {USAGE_BY_DEPARTMENT.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`${value}%`, "Share of Users"]}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px", color: "#8899AA" }} />
                            </PieChart>
                        </ChartWrapper>
                    </div>
                </Card>
            </div>

            {/* Insights Panel */}
            <Card padding="lg" className="bg-gradient-to-r from-[#1A2A3A]/40 to-[#0D1928] border-[#2A3A4A]">
                <h3 className="text-lg font-bold text-white mb-4">Behavioral Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {INSIGHTS.map((insight, i) => (
                        <div key={insight.title} className={i > 0 ? "border-t md:border-t-0 md:border-l border-[#2A3A4A] pt-4 md:pt-0 md:pl-6" : ""}>
                            <div className={`${insight.color} font-medium text-sm mb-1`}>{insight.title}</div>
                            <p className="text-[#8899AA] text-sm">{insight.body}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </Page>
    );
}
