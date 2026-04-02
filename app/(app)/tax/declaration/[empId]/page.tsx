"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle2, Download, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartWrapper } from "@/components/ui/chart-wrapper";

const PROJECTED_TDS = [
    { month: "Apr", val: 1811 }, { month: "May", val: 1811 }, { month: "Jun", val: 1811 },
    { month: "Jul", val: 1811 }, { month: "Aug", val: 1811 }, { month: "Sep", val: 1811 },
    { month: "Oct", val: 1811 }, { month: "Nov", val: 1811 }, { month: "Dec", val: 1812 },
    { month: "Jan", val: 1812 }, { month: "Feb", val: 1812 }, { month: "Mar", val: 1812 },
];

export default function EmployeeTaxDeclaration() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Compact Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, padding: "16px 24px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1A2A3A", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: 18, fontWeight: 600 }}>RK</div>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Rahul Kumar Sharma</h2>
                            <span style={{ fontSize: 12, color: "#8899AA", background: "#060B14", padding: "2px 8px", borderRadius: 4, border: "1px solid #1A2A3A" }}>EMP-0848</span>
                            <span style={{ fontSize: 12, color: "#8899AA", background: "#060B14", padding: "2px 8px", borderRadius: 4, border: "1px solid #1A2A3A" }}>Engineering</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(0,102,255,0.1)", color: "#0066FF", fontSize: 12, fontWeight: 600, border: "1px solid rgba(0,102,255,0.3)" }}>FY 2024-25 Tax Declaration</span>
                            <span style={{ fontSize: 13, color: "#8899AA", display: "flex", alignItems: "center", gap: 6 }}>
                                Tax Regime: <span style={{ color: "#FFFFFF", fontWeight: 500 }}>Old Regime</span>
                                <Link href="/tax/regime-selector/EMP-0848" style={{ color: "#0066FF", textDecoration: "none", marginLeft: 4 }}>Switch?</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <Link href="/tax/form-12bb/EMP-0848">
                        <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }} className="hover:border-[#00E5A0]">
                            <Download size={14} /> Download Form 12BB
                        </button>
                    </Link>
                </div>
            </div>

            {/* Declaration Progress */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16, margin: 0 }}>Declaration Progress</h3>

                <div style={{ width: "100%", height: 8, background: "#1A2A3A", borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                    <div style={{ width: "70%", height: "100%", background: "#00E5A0" }} />
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ padding: "6px 12px", borderRadius: 8, background: "rgba(0,229,160,0.1)", color: "#00E5A0", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                        <CheckCircle2 size={14} /> 80C: ₹1,50,000 / ₹1,50,000
                    </div>
                    <div style={{ padding: "6px 12px", borderRadius: 8, background: "rgba(255,184,0,0.1)", color: "#FFB800", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                        <Clock size={14} /> 80D: ₹18,000 / ₹25,000
                    </div>
                    <div style={{ padding: "6px 12px", borderRadius: 8, background: "rgba(0,229,160,0.1)", color: "#00E5A0", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                        <CheckCircle2 size={14} /> HRA: ₹2,40,000
                    </div>
                    <div style={{ padding: "6px 12px", borderRadius: 8, background: "#1A2A3A", color: "#8899AA", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 12, height: 12, border: "2px solid #8899AA", borderRadius: 2 }} /> Home Loan: Not declared
                    </div>
                    <div style={{ padding: "6px 12px", borderRadius: 8, background: "#1A2A3A", color: "#8899AA", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 12, height: 12, border: "2px solid #8899AA", borderRadius: 2 }} /> Other: ₹0
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "760px 408px", gap: 32 }}>

                {/* Left side: Sections */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {/* 80C Card */}
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, transition: "border-color 0.2s" }} className="hover:border-[#0066FF]">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                                    80C Investments <span style={{ padding: "2px 8px", background: "rgba(0,102,255,0.1)", color: "#0066FF", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Max: ₹1,50,000</span>
                                </h3>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>PPF: ₹50K | LIC: ₹30K | ELSS: ₹40K | PF(auto): ₹57.6K</div>
                            </div>
                            <Link href="/tax/80c/EMP-0848" style={{ fontSize: 13, color: "#0066FF", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                                View/Edit <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ flex: 1, height: 6, background: "#1A2A3A", borderRadius: 3, overflow: "hidden" }}>
                                <div style={{ width: "100%", height: "100%", background: "#00E5A0" }} />
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#00E5A0" }}>Total: ₹1,50,000 ✅</div>
                        </div>
                    </div>

                    {/* 80D Card */}
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, transition: "border-color 0.2s" }} className="hover:border-[#0066FF]">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>80D Health Insurance</h3>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Health Insurance: ₹18,000</div>
                            </div>
                            <Link href="/tax/80d/EMP-0848" style={{ fontSize: 13, color: "#0066FF", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                                View/Edit <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                            <div style={{ flex: 1, height: 6, background: "#1A2A3A", borderRadius: 3, overflow: "hidden" }}>
                                <div style={{ width: "72%", height: "100%", background: "#FFB800" }} />
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>Total: ₹18,000</div>
                        </div>
                        <div style={{ fontSize: 12, color: "#FFB800", background: "rgba(255,184,0,0.1)", padding: "4px 8px", borderRadius: 4, display: "inline-block" }}>💡 ₹7,000 more eligible for deduction</div>
                    </div>

                    {/* HRA Card */}
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, transition: "border-color 0.2s" }} className="hover:border-[#0066FF]">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>House Rent Allowance (HRA)</h3>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Monthly rent: ₹25,000 | Landlord PAN: ABCDE1234F</div>
                            </div>
                            <Link href="/tax/hra/EMP-0848" style={{ fontSize: 13, color: "#0066FF", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                                Edit HRA <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div style={{ fontSize: 14, color: "#00E5A0", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                            <CheckCircle2 size={16} /> Exemption computed: ₹2,40,000/year
                        </div>
                    </div>

                    {/* Section 24b / Home Loan Card */}
                    <div style={{ background: "#0D1928", border: "1px dashed #445566", borderRadius: 16, padding: 24, transition: "border-color 0.2s" }} className="hover:border-[#0066FF]">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 4 }}>Home Loan Interest (Section 24b)</h3>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Eligible for interest paid (max ₹2,00,000)</div>
                            </div>
                            <Link href="/tax/home-loan/EMP-0848" style={{ fontSize: 13, color: "#0066FF", textDecoration: "none", padding: "6px 12px", border: "1px solid rgba(0,102,255,0.3)", borderRadius: 6 }}>
                                Declare Home Loan
                            </Link>
                        </div>
                    </div>

                    {/* Other Deductions */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>NPS 80CCD(1B)</h3>
                                <Link href="/tax/nps/EMP-0848"><ChevronRight size={16} color="#0066FF" /></Link>
                            </div>
                            <div style={{ fontSize: 12, color: "#00E5A0", background: "rgba(0,229,160,0.1)", padding: "4px 8px", borderRadius: 4, display: "inline-block" }}>Additional ₹50K deduction available</div>
                        </div>
                        <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Other Deductions</h3>
                                <Link href="/tax/other-deductions/EMP-0848"><span style={{ fontSize: 12, color: "#0066FF" }}>View All</span></Link>
                            </div>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>80E, 80G, 80U, 80TTA etc.</div>
                        </div>
                    </div>

                </div>

                {/* Right side: Sticky Summary */}
                <div style={{ position: "sticky", top: 24, alignSelf: "start", display: "flex", flexDirection: "column", gap: 24 }}>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Your Tax Summary — FY 2024-25</h3>

                        {/* Computation preview */}
                        <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 12, padding: "16px", fontFamily: "monospace", fontSize: 13 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#8899AA", marginBottom: 8 }}>
                                <span>Annual CTC:</span> <span>₹12,00,000</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#FF4444", marginBottom: 4 }}>
                                <span>- Std. Deduct:</span> <span>-₹50,000</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#FF4444", marginBottom: 4 }}>
                                <span>- 80C Invest:</span> <span>-₹1,50,000</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#FF4444", marginBottom: 4 }}>
                                <span>- 80D Insure:</span> <span>-₹18,000</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#FF4444", marginBottom: 12 }}>
                                <span>- HRA Exempt:</span> <span>-₹2,40,000</span>
                            </div>
                            <div style={{ borderTop: "1px solid #1A2A3A", marginBottom: 12 }} />
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#FFFFFF", fontWeight: 600, marginBottom: 16, fontSize: 14 }}>
                                <span>Taxable Inc:</span> <span>₹5,42,000</span>
                            </div>

                            <div style={{ color: "#8899AA", marginBottom: 8 }}>TAX COMPUTE:</div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#8899AA", marginBottom: 4 }}>
                                <span>Up to ₹2.5L:</span> <span>₹0</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#8899AA", marginBottom: 4 }}>
                                <span>₹2.5L–₹5L:</span> <span>₹12,500</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#8899AA", marginBottom: 4 }}>
                                <span>₹5L–₹5.42L:</span> <span>₹8,400</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#FFFFFF", marginBottom: 4 }}>
                                <span>Subtotal:</span> <span>₹20,900</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#FFFFFF", marginBottom: 12 }}>
                                <span>4% Cess:</span> <span>₹836</span>
                            </div>
                            <div style={{ borderTop: "1px dashed #1A2A3A", marginBottom: 12 }} />

                            <div style={{ display: "flex", justifyContent: "space-between", color: "#FFFFFF", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                                <span>ANNUAL TAX:</span> <span>₹21,736</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "#00E5A0", fontWeight: 700, fontSize: 15 }}>
                                <span>MONTHLY TDS:</span> <span>₹1,811</span>
                            </div>
                        </div>

                        {/* Projected TDS Chart */}
                        <div style={{ marginTop: 24 }}>
                            <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 12 }}>Projected Monthly TDS Deduction</div>
                            <div style={{ height: 120, width: "100%" }}>
                                <ChartWrapper height={120}>
                                    <ChartWrapper height="h-[300px]">
                                        <BarChart data={PROJECTED_TDS} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                                            <XAxis dataKey="month" stroke="#445566" fontSize={10} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#445566" fontSize={10} tickLine={false} axisLine={false} />
                                            <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                                            <Bar dataKey="val" fill="#0066FF" radius={[2, 2, 0, 0]} />
                                        </BarChart>
                                    </ChartWrapper>
                                </ChartWrapper>
                            </div>
                        </div>

                        <div style={{ marginTop: 24 }}>
                            <Link href="/tax/regime-selector/EMP-0848" style={{ width: "100%", padding: "12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "center", textDecoration: "none" }} className="hover:bg-[#1A2A3A] transition-colors">
                                Compare with New Regime →
                            </Link>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <button style={{ width: "100%", height: 48, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "opacity 0.2s" }} className="hover:opacity-90">
                            Submit Declaration
                        </button>
                        <button style={{ width: "100%", height: 48, background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#8899AA", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "color 0.2s" }} className="hover:text-[#FFFFFF]">
                            Save Draft
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
