"use client";

import React from "react";
import { Eye, BarChart2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import { ChartWrapper } from "@/components/ui/ChartMountGate";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const DATA = [
    { month: "Apr 24", tds: 8744 },
    { month: "May 24", tds: 8744 },
    { month: "Jun 24", tds: 8744 },
    { month: "Jul 24", tds: 8744 },
    { month: "Aug 24", tds: 8744 },
    { month: "Sep 24", tds: 8744 },
    { month: "Oct 24", projection: 8744 },
    { month: "Nov 24", projection: 8744 },
    { month: "Dec 24", projection: 8744 },
    { month: "Jan 25", projection: 8744 },
    { month: "Feb 25", projection: 8744 },
    { month: "Mar 25", projection: 8744 },
];

export default function TDSProjection() {
    return (
        <Page
            title="TDS Deduction Projection"
            subtitle="Month-on-month projection of TDS based on current CTC and investments"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "TDS Projection" },
            ]}
            maxWidth="1000px"
            actions={
                <Button variant="secondary" icon={<Eye size={14} />} href="/tax/computation/EMP-0848">View Computation</Button>
            }
        >
            <div className="space-y-6">
                {/* Chart */}
                <Card padding="lg">
                    <h3 className="text-base font-semibold text-white mb-6">Projection Timeline (FY 2024-25)</h3>
                    <div className="h-[300px] w-full">
                        <ChartWrapper height={300}>
                            <AreaChart data={DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTds" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FFB800" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#FFB800" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    stroke="#8899AA"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#8899AA"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `₹${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "#060B14",
                                        border: "1px solid #1A2A3A",
                                        borderRadius: 8,
                                    }}
                                    itemStyle={{ color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}
                                    formatter={(value: unknown) => [`₹${(value as number)?.toLocaleString()}`, "TDS"]}
                                />
                                <ReferenceLine
                                    x="Sep 24"
                                    stroke="#00E5A0"
                                    strokeDasharray="3 3"
                                    label={{
                                        position: "top",
                                        value: "Current Month",
                                        fill: "#00E5A0",
                                        fontSize: 11,
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="tds"
                                    stroke="#0066FF"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorTds)"
                                    name="Actual TDS"
                                />
                                <Area
                                    type="stepAfter"
                                    dataKey="projection"
                                    stroke="#FFB800"
                                    strokeWidth={3}
                                    strokeDasharray="5 5"
                                    fillOpacity={1}
                                    fill="url(#colorProj)"
                                    name="Projected TDS"
                                />
                            </AreaChart>
                        </ChartWrapper>
                    </div>

                    <div className="flex gap-6 mt-6 justify-center">
                        <div className="flex items-center gap-2 text-sm text-white font-medium">
                            <div className="w-3 h-3 rounded-full bg-[#0066FF]" aria-hidden="true" /> Actual Deductions
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white font-medium">
                            <div className="w-3 h-3 rounded-full bg-[#FFB800] border-2 border-dashed border-[#060B14]" aria-hidden="true" /> Projected Deductions
                        </div>
                    </div>
                </Card>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Total TDS (Annual)", value: "₹1,04,936", color: "text-[#0066FF]", bg: "bg-[#0066FF]/10" },
                        { label: "Deducted Till Date", value: "₹52,468", color: "text-[#00E5A0]", bg: "bg-[#00E5A0]/10" },
                        { label: "Pending TDS (Remaining)", value: "₹52,468", color: "text-[#FFB800]", bg: "bg-[#FFB800]/10" },
                    ].map((kpi) => (
                        <Card key={kpi.label} padding="lg">
                            <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center mb-4`}>
                                <BarChart2 size={20} className={kpi.color} aria-hidden="true" />
                            </div>
                            <h4 className="text-sm font-semibold text-white mb-2">{kpi.label}</h4>
                            <div className="text-2xl font-bold text-white">{kpi.value}</div>
                        </Card>
                    ))}
                </div>
            </div>
        </Page>
    );
}
