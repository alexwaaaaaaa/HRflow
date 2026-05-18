"use client";
import React from "react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { PieChart as PieChartIcon, Download, ArrowUpRight, ArrowDownRight, CreditCard,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from "recharts";

const BUDGET_USAGE = [
    { dept: "Engineering", budget: 150000, used: 125000 },
    { dept: "Sales", budget: 80000, used: 75000 },
    { dept: "Marketing", budget: 60000, used: 30000 },
    { dept: "Product", budget: 75000, used: 45000 },
    { dept: "HR & Ops", budget: 40000, used: 35000 },
];

const SPEND_BREAKDOWN = [
    { name: "External Courses (Udemy, Coursera)", value: 45 },
    { name: "Certifications (AWS, GCP)", value: 25 },
    { name: "Conferences & Events", value: 20 },
    { name: "Internal Tools & Content", value: 10 },
];

const PIE_COLORS = ["#33E6FF", "#00E5A0", "#FFB020", "#9D00FF"] as const;

const PIE_DOT_CLASSES: Record<number, string> = {
    0: "bg-[#33E6FF]",
    1: "bg-[#00E5A0]",
    2: "bg-[#FFB020]",
    3: "bg-[#9D00FF]",
};

export default function TrainingBudgetScreen() {
    return (
        <Page
            title="Training Budget & Spend"
            subtitle="Track L&D budget allocation, utilization by department, and cost per employee"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Analytics", href: "/lms/analytics/effectiveness" },
                { label: "Budget" },
            ]}
            maxWidth="1400px"
            actions={
                <Button variant="secondary" icon={<Download size={16} />}>Export CSV</Button>
            }
        >
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card padding="lg" variant="elevated">
                    <p className="text-sm font-semibold text-[#8899AA] mb-2">Total L&amp;D Budget (FY25)</p>
                    <p className="text-3xl font-extrabold text-white mb-4">$405,000</p>
                    <div
                        className="w-full bg-[#1A2A3A] rounded-full h-1.5 mb-2"
                        role="progressbar"
                        aria-valuenow={76}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="76% allocated"
                    >
                        <div className="bg-[#33E6FF] h-1.5 rounded-full w-[76%]" />
                    </div>
                    <p className="text-xs text-[#8899AA]">76% allocated across departments</p>
                </Card>

                <Card padding="lg" variant="elevated">
                    <p className="text-sm font-semibold text-[#8899AA] mb-2">Total Spend YTD</p>
                    <p className="text-3xl font-extrabold text-white mb-4">$310,000</p>
                    <Badge variant="danger">
                        <ArrowUpRight size={12} aria-hidden="true" /> +14% vs Last YTD
                    </Badge>
                </Card>

                <Card padding="lg" variant="elevated">
                    <p className="text-sm font-semibold text-[#8899AA] mb-2">Avg Cost per Learner</p>
                    <p className="text-3xl font-extrabold text-white mb-4">$645</p>
                    <Badge variant="success">
                        <ArrowDownRight size={12} aria-hidden="true" /> -5% vs Last Year
                    </Badge>
                </Card>

                <Card padding="lg" variant="elevated">
                    <Button
                        variant="secondary"
                        className="flex items-center justify-between w-full p-4"
                        aria-label="Manage budget allocation"
                    >
                        <div className="flex flex-col text-left">
                            <span className="text-white font-bold mb-1">Manage Budget Allocation</span>
                            <span className="text-xs text-[#8899AA]">Adjust limits &amp; approvals</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#33E6FF]/10 text-[#33E6FF] flex items-center justify-center">
                            <CreditCard size={18} aria-hidden="true" />
                        </div>
                    </Button>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <Card padding="lg" className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Budget vs Used by Department</CardTitle>
                        <div className="flex items-center gap-4 text-xs text-[#8899AA]">
                            <span className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded bg-[#33E6FF]" aria-hidden="true" /> Used
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded bg-[#1A2A3A] border border-[#2A3A4A]" aria-hidden="true" /> Remaining
                            </span>
                        </div>
                    </CardHeader>
                    <div className="h-80 w-full">
                        <ChartWrapper height="h-full">
                            <BarChart data={BUDGET_USAGE} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                <XAxis dataKey="dept" stroke="#8899AA" axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#8899AA" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: "#0A1420", borderColor: "#2A3A4A", borderRadius: "12px", color: "#fff" }}
                                    cursor={{ fill: "#1A2A3A", opacity: 0.4 }}
                                    formatter={(value: unknown) => value ? [`$${(value as number).toLocaleString()}`, ""] : ["", ""]}
                                />
                                <Bar dataKey="used" name="Used" stackId="a" fill="#33E6FF" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="budget" name="Total Budget" stackId="a" fill="#1A2A3A" stroke="#2A3A4A" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </Card>

                <Card padding="lg" className="flex flex-col">
                    <CardTitle className="mb-2">Spend Distribution</CardTitle>
                    <p className="text-sm text-[#8899AA] mb-6">Breakdown of YTD expenses by category.</p>
                    <div className="h-64 relative mb-6">
                        <ChartWrapper height="h-full">
                            <PieChart>
                                <Pie data={SPEND_BREAKDOWN} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                                    {SPEND_BREAKDOWN.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: "#0A1420", borderColor: "#2A3A4A", borderRadius: "12px", color: "#fff" }}
                                    formatter={(value: unknown) => [`${value}%`, ""]}
                                />
                            </PieChart>
                        </ChartWrapper>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center" aria-hidden="true">
                            <PieChartIcon size={24} className="text-[#8899AA] mb-1" />
                            <span className="text-xl font-bold text-white">YTD</span>
                        </div>
                    </div>
                    <div className="space-y-3 mt-auto">
                        {SPEND_BREAKDOWN.map((cat, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${PIE_DOT_CLASSES[i] ?? "bg-[#8899AA]"}`} aria-hidden="true" />
                                    <span className="text-white font-medium">{cat.name}</span>
                                </div>
                                <span className="text-[#8899AA] font-bold">{cat.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </Page>
    );
}
