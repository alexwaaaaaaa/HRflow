"use client";

import React from "react";
import { Download, Printer } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartWrapper } from "@/components/ui/ChartMountGate";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const DATA = [
    { name: "Take Home", value: 1128264, color: "#00E5A0" },
    { name: "Income Tax", value: 104936, color: "#FF4444" },
    { name: "PF & Deductions", value: 166800, color: "#0066FF" },
];

export default function AnnualSummary() {
    return (
        <Page
            title="Annual Tax Statement (FY 2024-25)"
            subtitle="Comprehensive overview of your earnings and taxes"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "Annual Summary" },
            ]}
            maxWidth="1000px"
            actions={
                <>
                    <Button variant="secondary" icon={<Printer size={14} />}>Print</Button>
                    <Button icon={<Download size={14} />}>Download PDF</Button>
                </>
            }
        >
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side: Visualization */}
                <Card padding="lg" className="lg:w-[340px] shrink-0 flex flex-col">
                    <div className="text-center mb-4">
                        <p className="text-xs text-[#8899AA] mb-1">Total CTC (Gross)</p>
                        <p className="text-3xl font-bold text-white">₹14,00,000</p>
                    </div>

                    <div className="h-[200px] relative flex justify-center items-center">
                        <ChartWrapper height={200} width={200}>
                            <PieChart>
                                <Pie data={DATA} innerRadius={70} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                                    {DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 13 }} itemStyle={{ color: "#FFFFFF", fontWeight: 600 }} formatter={(value: unknown) => `₹${(value as number)?.toLocaleString()}`} />
                            </PieChart>
                        </ChartWrapper>
                        <div className="absolute text-center pointer-events-none">
                            <p className="text-xs text-[#8899AA]">Effective Tax</p>
                            <p className="text-lg font-bold text-white">7.5%</p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        {DATA.map((item) => (
                            <div key={item.name} className="flex justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                                    <span className="text-[#8899AA]">{item.name}</span>
                                </div>
                                <span className="text-white font-semibold">₹{item.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Right side: Detailed Breakdown */}
                <Card padding="lg" className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-6">Tax Computation Summary</h3>

                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-[1fr_140px] gap-4 border-b border-[#1A2A3A] pb-4">
                            <p className="text-sm text-[#8899AA]">Income under Head &apos;Salary&apos; (Gross)</p>
                            <p className="text-sm text-white text-right font-medium">₹14,00,000</p>
                        </div>
                        <div className="grid grid-cols-[1fr_140px] gap-4 border-b border-[#1A2A3A] pb-4">
                            <div>
                                <p className="text-sm text-[#8899AA]">Less: Exemptions under Section 10</p>
                                <p className="text-xs text-[#445566]">(HRA, LTA, etc.)</p>
                            </div>
                            <p className="text-sm text-[#FF4444] text-right font-medium">(₹1,50,000)</p>
                        </div>
                        <div className="grid grid-cols-[1fr_140px] gap-4 border-b border-[#1A2A3A] pb-4">
                            <div>
                                <p className="text-sm text-[#8899AA]">Less: Deductions under Section 16</p>
                                <p className="text-xs text-[#445566]">(Standard Deduction, Prof Tax)</p>
                            </div>
                            <p className="text-sm text-[#FF4444] text-right font-medium">(₹52,500)</p>
                        </div>
                        <div className="grid grid-cols-[1fr_140px] gap-4 border-b border-[#1A2A3A] pb-4">
                            <div>
                                <p className="text-sm text-[#8899AA]">Less: Chapter VI-A Deductions</p>
                                <p className="text-xs text-[#445566]">(80C, 80D, 80CCD)</p>
                            </div>
                            <p className="text-sm text-[#FF4444] text-right font-medium">(₹2,05,500)</p>
                        </div>
                        <div className="grid grid-cols-[1fr_140px] gap-4 border-b border-dashed border-[#445566] pb-4">
                            <p className="text-sm font-semibold text-white">Total Taxable Income</p>
                            <p className="text-sm font-semibold text-white text-right">₹9,92,000</p>
                        </div>
                        <div className="grid grid-cols-[1fr_140px] gap-4 pt-2">
                            <p className="text-base font-bold text-[#FFB800]">Total Tax Liability (incl. Cess)</p>
                            <p className="text-base font-bold text-[#FFB800] text-right">₹1,04,936</p>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
