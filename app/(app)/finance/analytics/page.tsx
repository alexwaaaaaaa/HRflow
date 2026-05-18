"use client";

import { PieChart as PieChartIcon, TrendingUp, Download, Filter } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

const MONTHLY_RECOVERY = [
    { month: "Jan", recovered: 450000, defaulted: 12000 },
    { month: "Feb", recovered: 480000, defaulted: 8000 },
    { month: "Mar", recovered: 510000, defaulted: 15000 },
    { month: "Apr", recovered: 490000, defaulted: 10000 },
    { month: "May", recovered: 550000, defaulted: 5000 },
    { month: "Jun", recovered: 610000, defaulted: 9000 },
];

const PROGRAM_ADOPTION = [
    { target: "EWA", usage: 65 },
    { target: "Personal Loans", usage: 22 },
    { target: "Adv Salary", usage: 15 },
    { target: "Insurances", usage: 88 },
];

const PORTFOLIO_DIST = [
    { name: "High Risk", value: 5, color: "#EC4899" },
    { name: "Medium Risk", value: 25, color: "#F59E0B" },
    { name: "Low Risk", value: 70, color: "#10B981" },
];

const BAR_COLORS = ["#00E5FF", "#7C3AED", "#00E5FF", "#7C3AED"] as const;

export default function FinanceAnalyticsPage() {
    return (
        <Page
            title="Finance Analytics"
            subtitle="Deep dive into financial wellness, adoption metrics, and recovery rates"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Analytics & Reports" },
            ]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} />}>Q2 2025</Button>
                    <Button icon={<Download size={14} />}>Export PDF</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Recovery Trends */}
                <Card padding="lg">
                    <h2 className="text-lg font-bold text-white mb-1">Loan &amp; Advance Recovery Trends</h2>
                    <p className="text-xs text-[#8899AA] mb-6">Monthly repayment collection vs defaults</p>
                    <div className="h-72">
                        <ChartWrapper height="h-full">
                            <AreaChart data={MONTHLY_RECOVERY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorDef" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`₹${value?.toLocaleString?.() ?? value}`, ""]}
                                />
                                <Area type="monotone" dataKey="recovered" stackId="1" stroke="#10B981" fill="url(#colorRec)" />
                                <Area type="monotone" dataKey="defaulted" stackId="2" stroke="#EC4899" fill="url(#colorDef)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </Card>

                {/* Program Adoption */}
                <Card padding="lg">
                    <h2 className="text-lg font-bold text-white mb-1">Benefit Adoption Rate</h2>
                    <p className="text-xs text-[#8899AA] mb-6">Percentage of workforce utilizing financial products</p>
                    <div className="h-72">
                        <ChartWrapper height="h-full">
                            <BarChart data={PROGRAM_ADOPTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="target" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} tickFormatter={(val) => `${val}%`} />
                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`${value}% of employees`, "Active Users"]}
                                />
                                <Bar dataKey="usage" radius={[4, 4, 0, 0]} barSize={40}>
                                    {PROGRAM_ADOPTION.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Portfolio Risk */}
                <Card padding="lg">
                    <h2 className="text-lg font-bold text-white mb-1">Loan Portfolio Risk</h2>
                    <p className="text-xs text-[#8899AA] mb-6">Risk assessment based on employee tenure and salary</p>
                    <div className="h-60 relative">
                        <ChartWrapper height="h-full">
                            <PieChart>
                                <Pie
                                    data={PORTFOLIO_DIST}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {PORTFOLIO_DIST.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`${value}%`, "Share"]}
                                />
                            </PieChart>
                        </ChartWrapper>
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                            <span className="text-2xl font-bold text-white">95%</span>
                            <span className="text-xs text-emerald-400">Safe/Low Risk</span>
                        </div>
                    </div>
                </Card>

                {/* AI Insights */}
                <Card padding="lg" className="lg:col-span-2">
                    <h2 className="text-lg font-bold text-white mb-6">AI-Driven Insights</h2>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex gap-4">
                            <TrendingUp size={20} className="text-emerald-400 mt-1 shrink-0" aria-hidden="true" />
                            <div>
                                <h4 className="text-sm font-semibold text-white mb-1">EWA Adoption is reducing absenteeism</h4>
                                <p className="text-xs text-[#8899AA] leading-relaxed">Employees enrolled in Earned Wage Access have shown a 14% decrease in unplanned leaves compared to last quarter. Financial stress reduction correlates strongly with attendance.</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex gap-4">
                            <PieChartIcon size={20} className="text-amber-400 mt-1 shrink-0" aria-hidden="true" />
                            <div>
                                <h4 className="text-sm font-semibold text-white mb-1">Insurance upgrade potential</h4>
                                <p className="text-xs text-[#8899AA] leading-relaxed">35% of employees at mid-management level are accessing OPD claims externally. Consider adding an OPD rider to the base policy next renewal cycle to improve retention.</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
