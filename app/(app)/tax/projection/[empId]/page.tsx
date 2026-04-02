"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Eye, BarChart2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { ChartWrapper } from "@/components/ui/chart-wrapper";

const DATA = [
    { month: "Apr 24", tds: 8744 },
    { month: "May 24", tds: 8744 },
    { month: "Jun 24", tds: 8744 },
    { month: "Jul 24", tds: 8744 },
    { month: "Aug 24", tds: 8744 },
    { month: "Sep 24", tds: 8744 },
    // Projection (Post declaration updates)
    { month: "Oct 24", projection: 8744 },
    { month: "Nov 24", projection: 8744 },
    { month: "Dec 24", projection: 8744 },
    { month: "Jan 25", projection: 8744 },
    { month: "Feb 25", projection: 8744 },
    { month: "Mar 25", projection: 8744 },
];

export default function TDSProjection() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>TDS Deduction Projection</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Month-on-month projection of TDS based on current CTC and investments</div>
                    </div>
                </div>
                <Link href="/tax/computation/EMP-0848">
                    <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:bg-[#1A2A3A]">
                        <Eye size={14} /> View Computation
                    </button>
                </Link>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 24 }}>Projection Timeline (FY 2024-25)</h3>

                <div style={{ height: 300, width: "100%" }}>
                    <ChartWrapper height={300}>
                        <ChartWrapper height="h-[300px]">
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
                                <XAxis dataKey="month" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                                <Tooltip
                                    contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}
                                    itemStyle={{ color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}
                                    formatter={(value: any) => [`₹${value?.toLocaleString()}`, 'TDS']}
                                />
                                {/* Marker line for Current Month */}
                                <ReferenceLine x="Sep 24" stroke="#00E5A0" strokeDasharray="3 3" label={{ position: 'top', value: 'Current Month', fill: '#00E5A0', fontSize: 11 }} />

                                <Area type="monotone" dataKey="tds" stroke="#0066FF" strokeWidth={3} fillOpacity={1} fill="url(#colorTds)" name="Actual TDS" />
                                <Area type="stepAfter" dataKey="projection" stroke="#FFB800" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorProj)" name="Projected TDS" />
                            </AreaChart>
                        </ChartWrapper>
                    </ChartWrapper>
                </div>

                <div style={{ display: "flex", gap: 24, marginTop: 24, justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#FFFFFF", fontWeight: 500 }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#0066FF" }} /> Actual Deductions
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#FFFFFF", fontWeight: 500 }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFB800", border: "2px dashed #060B14" }} /> Projected Deductions
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 24 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,102,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                        <BarChart2 size={20} color="#0066FF" />
                    </div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>Total TDS (Annual)</h4>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>₹1,04,936</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 24 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                        <BarChart2 size={20} color="#00E5A0" />
                    </div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>Deducted Till Date</h4>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>₹52,468</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 24 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,184,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                        <BarChart2 size={20} color="#FFB800" />
                    </div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>Pending TDS (Remaining)</h4>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>₹52,468</div>
                </div>
            </div>

        </div>
    );
}
