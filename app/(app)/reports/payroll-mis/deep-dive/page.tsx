"use client";

import { Download, RefreshCw, Layers } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─── Static data ──────────────────────────────────────────────────────────────

const VARIANCE_DATA = [
    { component: "Basic Pay", prev: 2800000, current: 3100000 },
    { component: "HRA", prev: 1400000, current: 1550000 },
    { component: "Variable Bonus", prev: 0, current: 850000 },
    { component: "Leave Encashment", prev: 45000, current: 0 },
    { component: "EPF Employer", prev: 312000, current: 345000 },
];

interface VarianceItem {
    id: string;
    title: string;
    amount: string;
    amountColor: string;
    description: string;
    type: "Earnings" | "Deduction";
}

const VARIANCE_LOG: VarianceItem[] = [
    {
        id: "v1",
        title: "Variable Bonus Distribution",
        amount: "+₹8.5L",
        amountColor: "text-emerald-400",
        description: "Annual performance bonus credited to eligible employees in Sales & Marketing.",
        type: "Earnings",
    },
    {
        id: "v2",
        title: "New Joinee Basic & HRA",
        amount: "+₹3.0L",
        amountColor: "text-emerald-400",
        description: "Impact of 7 new mid-to-senior level joiners across Engineering.",
        type: "Earnings",
    },
    {
        id: "v3",
        title: "Leave Encashment (Zeroed)",
        amount: "-₹0.45L",
        amountColor: "text-pink-400",
        description: "One-time leave encashment was processed in Feb, not applicable in March.",
        type: "Earnings",
    },
    {
        id: "v4",
        title: "EPF Increase",
        amount: "+₹0.33L",
        amountColor: "text-amber-500",
        description: "Directly correlates with the increase in Basic Pay due to new joiners.",
        type: "Deduction",
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PayrollMISDeepDivePage() {
    return (
        <Page
            title="Payroll Variance & Deep Dive"
            subtitle="Component-level month-on-month variance analysis."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Payroll MIS", href: "/reports/payroll-mis" },
                { label: "Deep Dive" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<RefreshCw size={14} aria-hidden="true" />}
                    >
                        Recalculate
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Export Variance</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card padding="lg" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[#1A2A3A] text-[#8899AA] text-[10px] px-3 py-1 rounded-bl-lg">
                            Prev vs Curr
                        </div>
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Total Net Variance</p>
                        <p className="text-3xl font-bold text-pink-400 mb-1">+₹11.2 L</p>
                        <p className="text-xs text-[#8899AA]">Primarily driven by Variable Bonus payouts</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">New Joinee Impact</p>
                        <p className="text-3xl font-bold text-emerald-400 mb-1">+₹2.8 L</p>
                        <p className="text-xs text-[#8899AA]">7 new additions to payroll</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Exit Impact</p>
                        <p className="text-3xl font-bold text-indigo-400 mb-1">-₹1.4 L</p>
                        <p className="text-xs text-[#8899AA]">3 FnF settlements processed</p>
                    </Card>
                </div>

                {/* Chart + log */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Component Level MoM Change</h2>
                        <div className="h-[350px] w-full">
                            <ChartWrapper height="h-full">
                                <BarChart
                                    data={VARIANCE_DATA}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis
                                        dataKey="component"
                                        stroke="#8899AA"
                                        fontSize={11}
                                        angle={-30}
                                        textAnchor="end"
                                    />
                                    <YAxis
                                        stroke="#8899AA"
                                        fontSize={12}
                                        tickFormatter={(value: number) => `₹${value / 100000}L`}
                                    />
                                    <Tooltip
                                        formatter={(value) =>
                                            typeof value === "number"
                                                ? `₹${(value / 100000).toFixed(2)} Lakhs`
                                                : value
                                        }
                                        cursor={{ fill: "#1A2A3A" }}
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
                                    <Bar
                                        dataKey="prev"
                                        name="Feb 2026"
                                        fill="#3b82f6"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="current"
                                        name="Mar 2026"
                                        fill="#10b981"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="none">
                        <div className="p-4 border-b border-[#1A2A3A] flex items-center gap-2">
                            <Layers size={20} className="text-indigo-400" aria-hidden="true" />
                            <h2 className="text-base font-bold text-white">Variance Explanation Log</h2>
                        </div>
                        <div className="overflow-y-auto p-4 space-y-4">
                            {VARIANCE_LOG.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl relative"
                                >
                                    <div
                                        className={`absolute top-4 right-4 font-bold ${item.amountColor}`}
                                    >
                                        {item.amount}
                                    </div>
                                    <h3 className="text-white font-bold mb-1 pr-16">{item.title}</h3>
                                    <p className="text-sm text-[#8899AA] mb-3">{item.description}</p>
                                    <Badge variant={item.type === "Earnings" ? "info" : "warning"}>
                                        {item.type} Component
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
