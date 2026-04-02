"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Info, CheckCircle2, ArrowRight, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartWrapper } from "@/components/ui/chart-wrapper";

const COMPARISON_DATA = [
    {
        name: "Old Regime",
        tax: 21736,
        takeHome: 1128264,
    },
    {
        name: "New Regime",
        tax: 42000,
        takeHome: 1108000,
    }
];

export default function RegimeSelector() {
    const [selectedRegime, setSelectedRegime] = useState<"OLD" | "NEW">("OLD");

    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto" }}>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <Link href="/tax/declaration/EMP-0848" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                    <ChevronLeft size={20} />
                </Link>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Compare & Choose Tax Regime</h1>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>

                    {/* Left side: Charts & Takehome */}
                    <div style={{ flex: 1, borderRight: "1px solid #1A2A3A", paddingRight: 32 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <div>
                                <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Annual CTC</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>₹12,00,000</div>
                            </div>
                            <div style={{ background: "rgba(0,102,255,0.1)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                                <TrendingDown size={18} color="#0066FF" />
                                <div>
                                    <div style={{ fontSize: 11, color: "#0066FF", fontWeight: 600 }}>RECOMMENDATION</div>
                                    <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 500 }}>Old Regime saves ₹20,264</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ height: 200, width: "100%", marginBottom: 24 }}>
                            <ChartWrapper height={200}>
                                <ChartWrapper height="h-[300px]">
                                    <BarChart data={COMPARISON_DATA} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={13} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "#8899AA", paddingTop: 16 }} />
                                        <Bar dataKey="takeHome" stackId="a" fill="#00E5A0" name="Annual Take-Home" radius={[4, 0, 0, 4]} />
                                        <Bar dataKey="tax" stackId="a" fill="#FF4444" name="Tax Payable" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ChartWrapper>
                            </ChartWrapper>
                        </div>
                    </div>

                    {/* Right side: Breakdown */}
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Tax Computation Breakdown</h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px", gap: 16, borderBottom: "1px solid #1A2A3A", paddingBottom: 12, marginBottom: 12 }}>
                            <div style={{ fontSize: 12, color: "#8899AA", fontWeight: 500 }}>Component</div>
                            <div style={{ fontSize: 12, color: "#8899AA", fontWeight: 500, textAlign: "right" }}>Old Regime</div>
                            <div style={{ fontSize: 12, color: "#8899AA", fontWeight: 500, textAlign: "right" }}>New Regime</div>
                        </div>

                        {[
                            { label: "Gross Income", old: "12,00,000", new: "12,00,000", color: "#FFFFFF" },
                            { label: "Standard Deduction", old: "(50,000)", new: "(50,000)", color: "#FF4444" },
                            { label: "80C Investments", old: "(1,50,000)", new: "—", color: "#FF4444" },
                            { label: "80D Health Ins.", old: "(18,000)", new: "—", color: "#FF4444" },
                            { label: "HRA Exemption", old: "(2,40,000)", new: "—", color: "#FF4444" },
                            { label: "Taxable Income", old: "5,42,000", new: "11,50,000", color: "#FFFFFF", bold: true },
                            { label: "Tax Computed", old: "20,900", new: "40,000", color: "#FFB800" },
                            { label: "Sec 87A Rebate", old: "—", new: "—", color: "#00E5A0" },
                            { label: "Health & Edu Cess", old: "+836", new: "+1,600", color: "#FFB800" }
                        ].map((row, i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px", gap: 16, marginBottom: 12 }}>
                                <div style={{ fontSize: 13, color: "#8899AA", fontWeight: row.bold ? 600 : 400 }}>{row.label}</div>
                                <div style={{ fontSize: 13, color: row.color, textAlign: "right", fontWeight: row.bold ? 600 : 400 }}>{row.old}</div>
                                <div style={{ fontSize: 13, color: row.color, textAlign: "right", fontWeight: row.bold ? 600 : 400 }}>{row.new}</div>
                            </div>
                        ))}

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px", gap: 16, paddingTop: 16, borderTop: "1px dashed #1A2A3A", marginTop: 4 }}>
                            <div style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 700 }}>Total Tax</div>
                            <div style={{ fontSize: 15, color: "#00E5A0", textAlign: "right", fontWeight: 700 }}>₹21,736</div>
                            <div style={{ fontSize: 15, color: "#FF4444", textAlign: "right", fontWeight: 700 }}>₹41,600</div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Selection Area */}
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 16 }}>Select your Tax Regime for FY 2024-25</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>

                <div
                    onClick={() => setSelectedRegime("OLD")}
                    style={{ background: selectedRegime === "OLD" ? "rgba(0,102,255,0.05)" : "#0D1928", border: selectedRegime === "OLD" ? "2px solid #0066FF" : "1px solid #1A2A3A", borderRadius: 16, padding: 24, cursor: "pointer", position: "relative", transition: "all 0.2s" }}
                    className="hover:border-[#0066FF]/50"
                >
                    {selectedRegime === "OLD" && (
                        <div style={{ position: "absolute", top: 16, right: 16, color: "#0066FF" }}><CheckCircle2 size={24} /></div>
                    )}
                    <h4 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>Old Tax Regime</h4>
                    <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 16, minHeight: 40 }}>Best if you have significant investments, home loan, or pay rent. Needs proof submission.</div>
                    <div style={{ padding: "12px 16px", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#8899AA" }}>Est. Annual Tax</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: "#00E5A0" }}>₹21,736</span>
                    </div>
                </div>

                <div
                    onClick={() => setSelectedRegime("NEW")}
                    style={{ background: selectedRegime === "NEW" ? "rgba(0,102,255,0.05)" : "#0D1928", border: selectedRegime === "NEW" ? "2px solid #0066FF" : "1px solid #1A2A3A", borderRadius: 16, padding: 24, cursor: "pointer", position: "relative", transition: "all 0.2s" }}
                    className="hover:border-[#0066FF]/50"
                >
                    {selectedRegime === "NEW" && (
                        <div style={{ position: "absolute", top: 16, right: 16, color: "#0066FF" }}><CheckCircle2 size={24} /></div>
                    )}
                    <h4 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>New Tax Regime (Default)</h4>
                    <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 16, minHeight: 40 }}>Lower tax rates but fewer deductions. No proof submission required (except standard deduction).</div>
                    <div style={{ padding: "12px 16px", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#8899AA" }}>Est. Annual Tax</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: "#FF4444" }}>₹41,600</span>
                    </div>
                </div>

            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1A2A3A", paddingTop: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#8899AA", fontSize: 13 }}>
                    <Info size={16} color="#0066FF" />
                    <span>You can switch your regime any time before 31 Mar 2025.</span>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                    <Link href="/tax/declaration/EMP-0848">
                        <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]">
                            Cancel
                        </button>
                    </Link>
                    <Link href="/tax/declaration/EMP-0848">
                        <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }} className="hover:opacity-90">
                            Confirm & Continue <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
