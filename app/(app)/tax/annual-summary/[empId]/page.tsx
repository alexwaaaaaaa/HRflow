"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Download, Printer } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ChartWrapper } from "@/components/ui/chart-wrapper";

const DATA = [
    { name: "Take Home", value: 1128264, color: "#00E5A0" },
    { name: "Income Tax", value: 104936, color: "#FF4444" },
    { name: "PF & Deductions", value: 166800, color: "#0066FF" },
];

export default function AnnualSummary() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Annual Tax Statement (FY 2024-25)</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Comprehensive overview of your earnings and taxes</div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:bg-[#1A2A3A]">
                        <Printer size={14} /> Print
                    </button>
                    <button style={{ height: 36, padding: "0 16px", background: "#0066FF", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:opacity-90">
                        <Download size={14} /> Download PDF
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>

                {/* Left side: Visualization */}
                <div style={{ width: 340, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column" }}>
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Total CTC (Gross)</div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>₹14,00,000</div>
                    </div>

                    <div style={{ height: 200, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ChartWrapper height={200} width={200}>
                            <ChartWrapper height="h-[200px]">
                                <PieChart>
                                    <Pie
                                        data={DATA}
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 13 }} itemStyle={{ color: "#FFFFFF", fontWeight: 600 }} formatter={(value: any) => `₹${value?.toLocaleString()}`} />
                                </PieChart>
                            </ChartWrapper>
                        </ChartWrapper>
                        <div style={{ position: "absolute", textAlign: "center" }}>
                            <div style={{ fontSize: 11, color: "#8899AA" }}>Effective Tax</div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>7.5%</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                        {DATA.map(item => (
                            <div key={item.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />
                                    <span style={{ color: "#8899AA" }}>{item.name}</span>
                                </div>
                                <span style={{ color: "#FFFFFF", fontWeight: 600 }}>₹{item.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side: Detailed Breakdown */}
                <div style={{ flex: 1, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32 }}>

                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 24 }}>Tax Computation Summary</h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, borderBottom: "1px solid #1A2A3A", paddingBottom: 16 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Income under Head &apos;Salary&apos; (Gross)</div>
                            <div style={{ fontSize: 14, color: "#FFFFFF", textAlign: "right", fontWeight: 500 }}>₹14,00,000</div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, borderBottom: "1px solid #1A2A3A", paddingBottom: 16 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Less: Exemptions under Section 10 <br /><span style={{ fontSize: 11, color: "#445566" }}>(HRA, LTA, etc.)</span></div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right", fontWeight: 500 }}>(₹1,50,000)</div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, borderBottom: "1px solid #1A2A3A", paddingBottom: 16 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Less: Deductions under Section 16 <br /><span style={{ fontSize: 11, color: "#445566" }}>(Standard Deduction, Prof Tax)</span></div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right", fontWeight: 500 }}>(₹52,500)</div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, borderBottom: "1px solid #1A2A3A", paddingBottom: 16 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Less: Chapter VI-A Deductions <br /><span style={{ fontSize: 11, color: "#445566" }}>(80C, 80D, 80CCD)</span></div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right", fontWeight: 500 }}>(₹2,05,500)</div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, borderBottom: "1px dashed #445566", paddingBottom: 16 }}>
                            <div style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 600 }}>Total Taxable Income</div>
                            <div style={{ fontSize: 15, color: "#FFFFFF", textAlign: "right", fontWeight: 600 }}>₹9,92,000</div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, paddingTop: 8 }}>
                            <div style={{ fontSize: 16, color: "#FFB800", fontWeight: 700 }}>Total Tax Liability (incl. Cess)</div>
                            <div style={{ fontSize: 16, color: "#FFB800", textAlign: "right", fontWeight: 700 }}>₹1,04,936</div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
