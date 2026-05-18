"use client";

import { CheckCircle2, ChevronDown, Award, TrendingUp, Filter, Search } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface IncentiveItem {
    name: string;
    id: string;
    amt: number;
    tds: number;
    st: "Approved" | "Pending Approval";
}

interface IncentiveCategory {
    group: string;
    color: string;
    items: IncentiveItem[];
}

const CATEGORIES: IncentiveCategory[] = [
    {
        group: "Perfect Attendance",
        color: "#00E5A0",
        items: [
            { name: "Rahul Gupta", id: "EMP012", amt: 2500, tds: 250, st: "Approved" },
            { name: "Meena Iyer", id: "EMP085", amt: 2500, tds: 250, st: "Approved" },
            { name: "Kavya Nair", id: "EMP091", amt: 2500, tds: 250, st: "Approved" },
        ],
    },
    {
        group: "Employee Referral Bonus",
        color: "#FFB800",
        items: [
            { name: "Vikram Mehta", id: "EMP014", amt: 15000, tds: 3000, st: "Approved" },
            { name: "Rajesh Kumar", id: "EMP081", amt: 15000, tds: 1500, st: "Pending Approval" },
        ],
    },
];

export default function IncentivePaymentPage() {
    return (
        <Page
            title="Incentive Payments"
            subtitle="March 2025 · Performance-linked and attendance incentives"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Incentives" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<CheckCircle2 size={14} aria-hidden="true" />}>
                    Include All in March Payroll
                </Button>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <div className="mb-2 flex items-center gap-1.5 text-sm text-[#8899AA]">
                            <Award size={13} className="text-[#00E5A0]" aria-hidden="true" /> Perfect Attendance
                        </div>
                        <p className="text-2xl font-semibold text-white">₹1,05,000</p>
                        <p className="mt-1 text-xs text-[#8899AA]">42 employees (₹2,500 each)</p>
                    </Card>
                    <Card>
                        <div className="mb-2 flex items-center gap-1.5 text-sm text-[#8899AA]">
                            <Award size={13} className="text-[#FFB800]" aria-hidden="true" /> Referral Bonuses
                        </div>
                        <p className="text-2xl font-semibold text-white">₹30,000</p>
                        <p className="mt-1 text-xs text-[#8899AA]">2 employees (₹15,000 each)</p>
                    </Card>
                    <Card>
                        <div className="mb-2 flex items-center gap-1.5 text-sm text-[#8899AA]">
                            <Award size={13} className="text-[#44AAFF]" aria-hidden="true" /> Productivity Q1
                        </div>
                        <p className="text-2xl font-semibold text-white">₹28,000</p>
                        <p className="mt-1 text-xs text-[#8899AA]">5 employees (variable % mix)</p>
                    </Card>
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.05)] p-5"
                    >
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#00E5A0]">
                            <TrendingUp size={16} aria-hidden="true" /> AI Impact Analysis
                        </div>
                        <p className="text-2xl font-bold text-[#00E5A0]">Total: ₹1,63,000</p>
                        <p className="mt-2 text-xs leading-relaxed text-[#8899AA]">
                            Highest incentive payout in 6 months. Estimated to boost team satisfaction by{" "}
                            <strong className="text-white">+7%</strong> and reduce attrition risk by 12%.
                        </p>
                    </Card>
                </div>

                {/* Breakdown Table */}
                <Card padding="none" aria-labelledby="incentive-breakdown-heading">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A2A3A] px-6 py-4">
                        <h3 id="incentive-breakdown-heading" className="text-base font-semibold text-white">
                            Computed Breakdown (49 Total)
                        </h3>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                                <input
                                    type="search"
                                    placeholder="Search employee..."
                                    aria-label="Search employee"
                                    className="h-9 w-48 rounded-lg border border-[#1A2A3A] bg-[#0D1928] pl-8 pr-3 text-sm text-white outline-none focus:border-[#00e5a0]"
                                />
                            </div>
                            <Button variant="secondary" size="sm" icon={<Filter size={12} aria-hidden="true" />}>
                                Filter
                            </Button>
                        </div>
                    </div>

                    {CATEGORIES.map((category, i) => (
                        <div key={category.group} className={i < CATEGORIES.length - 1 ? "border-b border-[#1A2A3A]" : ""}>
                            {/* Group Header */}
                            <div className="flex cursor-pointer items-center gap-3 bg-[#0D1928] px-6 py-3">
                                <ChevronDown size={15} className="text-[#8899AA]" aria-hidden="true" />
                                <span className="text-sm font-semibold" style={{ color: category.color }}>
                                    {category.group}
                                </span>
                                <span className="text-xs text-[#8899AA]">{category.items.length} records</span>
                            </div>

                            {/* Items */}
                            <div className="divide-y divide-[#1A2A3A]">
                                {category.items.map((row) => (
                                    <div
                                        key={row.id}
                                        className="flex flex-wrap items-center gap-4 px-6 py-3 text-sm"
                                    >
                                        <div className="w-48 pl-8">
                                            <p className="font-medium text-white">{row.name}</p>
                                            <p className="text-xs text-[#8899AA]">{row.id}</p>
                                        </div>
                                        <div className="flex flex-1 flex-wrap gap-6">
                                            <div>
                                                <span className="mr-2 text-xs text-[#8899AA]">Gross:</span>
                                                <span className="font-medium text-white">₹{row.amt.toLocaleString()}</span>
                                            </div>
                                            <div>
                                                <span className="mr-2 text-xs text-[#8899AA]">TDS:</span>
                                                <span className="text-red-400">-₹{row.tds.toLocaleString()}</span>
                                            </div>
                                            <div>
                                                <span className="mr-2 text-xs text-[#8899AA]">Net:</span>
                                                <span className="font-semibold text-[#00E5A0]">₹{(row.amt - row.tds).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <Badge variant={row.st === "Approved" ? "success" : "warning"}>
                                            {row.st}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="cursor-pointer border-t border-[#1A2A3A] bg-[#050A10] py-4 text-center text-sm text-[#8899AA]">
                        + View 42 more records
                    </div>
                </Card>
            </div>
        </Page>
    );
}
