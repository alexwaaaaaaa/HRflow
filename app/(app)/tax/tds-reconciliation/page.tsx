"use client";

import React from "react";
import ChartWrapper from "@/components/ui/ChartWrapper";
import {
    AlertTriangle,
    FileCheck,
    CheckCircle2,
    BarChart2,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
} from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const CHART_DATA = [
    { month: "Apr", deducted: 3.8, deposited: 3.8, challan: 3.8 },
    { month: "May", deducted: 3.85, deposited: 3.85, challan: 3.85 },
    { month: "Jun", deducted: 3.9, deposited: 3.9, challan: 3.9 },
    { month: "Jul", deducted: 3.9, deposited: 3.9, challan: 3.9 },
    { month: "Aug", deducted: 4.1, deposited: 4.1, challan: 4.1 },
    { month: "Sep", deducted: 4.0, deposited: 4.0, challan: 4.0 },
    { month: "Oct", deducted: 3.95, deposited: 3.95, challan: 3.95 },
    { month: "Nov", deducted: 4.1, deposited: 4.1, challan: 4.1 },
    { month: "Dec", deducted: 4.25, deposited: 4.25, challan: 4.25 },
    { month: "Jan", deducted: 4.15, deposited: 4.1, challan: 4.1 },
    { month: "Feb", deducted: 4.5, deposited: 0, challan: 0 },
    { month: "Mar", deducted: 0, deposited: 0, challan: 0 },
];

export default function TDSReconciliationScreen() {
    return (
        <Page
            title="TDS Overall Reconciliation"
            subtitle="Reconcile TDS deducted in payroll vs deposited in bank vs registered in TRACES challans."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "TDS Reconciliation" },
            ]}
            maxWidth="1400px"
        >
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card padding="lg">
                        <p className="text-xs text-[#8899AA] font-semibold mb-1 uppercase tracking-wider">TDS Booked (Payroll)</p>
                        <p className="text-2xl font-black text-white">₹39,95,300</p>
                        <p className="text-[10px] text-[#445566] mt-1">YTD Deducted from Salary</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-xs text-[#8899AA] font-semibold mb-1 uppercase tracking-wider">TDS Deposited (Bank)</p>
                        <p className="text-2xl font-black text-[#0066FF]">₹39,90,300</p>
                        <p className="text-[10px] text-[#445566] mt-1">Total Paid via NetBanking</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-xs text-[#8899AA] font-semibold mb-1 uppercase tracking-wider">TRACES Challan Auth</p>
                        <p className="text-2xl font-black text-[#00E5A0]">₹39,90,300</p>
                        <p className="text-[10px] text-[#445566] mt-1">Verified on IT Portal</p>
                    </Card>
                    <Card padding="lg" className="bg-red-400/5 border border-red-400/20">
                        <p className="text-xs text-red-400 font-semibold mb-1 uppercase tracking-wider flex items-center gap-1">
                            <AlertTriangle size={14} aria-hidden="true" /> Unreconciled Variance
                        </p>
                        <p className="text-2xl font-black text-red-400">₹5,000</p>
                        <p className="text-[10px] text-red-400 mt-1">Action Required for Jan</p>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Chart */}
                    <Card padding="lg" className="lg:col-span-2">
                        <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                            <BarChart2 size={16} className="text-[#0066FF]" aria-hidden="true" />
                            YTD Three-way Matching (in Lakhs)
                        </h3>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-[300px]">
                                <BarChart data={CHART_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                    />
                                    <RechartsTooltip
                                        cursor={{ fill: "#1A2A3A" }}
                                        contentStyle={{
                                            backgroundColor: "#060B14",
                                            borderColor: "#2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                        itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                                        labelStyle={{ color: "#8899AA", fontSize: "10px" }}
                                    />
                                    <Legend
                                        iconType="circle"
                                        wrapperStyle={{ fontSize: "12px", color: "#8899AA" }}
                                    />
                                    <Bar dataKey="deducted" name="Books" fill="#445566" radius={[2, 2, 0, 0]} />
                                    <Bar dataKey="deposited" name="Bank" fill="#0066FF" radius={[2, 2, 0, 0]} />
                                    <Bar dataKey="challan" name="TRACES" fill="#00E5A0" radius={[2, 2, 0, 0]} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    {/* Exceptions List */}
                    <Card padding="none" className="lg:col-span-1 flex flex-col" style={{ maxHeight: "382px" }}>
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420]">
                            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
                                <AlertTriangle size={16} aria-hidden="true" /> Exceptions Detected
                            </h3>
                        </div>
                        <div className="overflow-y-auto flex-1">
                            {/* Exception 1 */}
                            <div className="p-4 border-b border-[#1A2A3A] hover:bg-[#1A2A3A]/20 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-sm font-bold text-white">Jan 2025 Variance</div>
                                    <Badge variant="danger">₹5,000 Low</Badge>
                                </div>
                                <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                                    Booked TDS is ₹4,15,000 but bank deposit shows ₹4,10,000. It seems TDS of employee EMP122
                                    (₹5,000) was recalculated after deposit.
                                </p>
                                <Button variant="ghost" size="sm">View Affected Employee</Button>
                            </div>

                            {/* Exception 2 (Resolved) */}
                            <div className="p-4 border-b border-[#1A2A3A] bg-[#00E5A0]/5 opacity-60">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-sm font-bold text-[#c8d8e8]">Dec 2024 Challan Delay</div>
                                    <span className="text-[#00E5A0] flex items-center text-[10px] font-bold uppercase gap-1">
                                        <CheckCircle2 size={12} aria-hidden="true" /> Resolved
                                    </span>
                                </div>
                                <p className="text-xs text-[#8899AA] leading-relaxed">
                                    Challan update from bank was delayed. Matched successfully on 12 Jan.
                                </p>
                            </div>

                            <div className="p-4 flex flex-col items-center justify-center text-center opacity-50 pt-8">
                                <FileCheck size={24} className="text-[#8899AA] mb-2" aria-hidden="true" />
                                <div className="text-xs text-[#8899AA]">No other exceptions found for FY 24-25</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
