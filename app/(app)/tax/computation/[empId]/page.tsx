"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Download, Info } from "lucide-react";

export default function TDSComputation() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>TDS Computation Sheet</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Rahul Sharma (EMP-0848) • FY 2024-25 • Old Regime</div>
                    </div>
                </div>
                <div>
                    <button style={{ height: 36, padding: "0 16px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:opacity-90">
                        <Download size={14} /> Download PDF
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                <div style={{ flex: 1, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Estimated Annual Taxable Income</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>₹9,42,000</div>
                </div>
                <div style={{ flex: 1, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Tax Computed</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>₹1,04,936</div>
                </div>
                <div style={{ flex: 1, background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#0066FF", marginBottom: 8 }}>TDS Deducted So Far</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#0066FF" }}>₹52,468 <span style={{ fontSize: 14, fontWeight: 500, color: "#8899AA" }}>/ Apr-Sep</span></div>
                </div>
                <div style={{ flex: 1, background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#FFB800", marginBottom: 8 }}>Remaining TDS Per Month</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFB800" }}>₹8,744 <span style={{ fontSize: 14, fontWeight: 500, color: "#FFB800" }}>/ Oct-Mar</span></div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden", marginBottom: 32 }}>

                <div style={{ padding: "16px 24px", background: "#0A1420", borderBottom: "1px solid #1A2A3A" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Computation Details</h3>
                </div>

                <div style={{ padding: 24 }}>

                    {/* Part A: Income */}
                    <div style={{ marginBottom: 32 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>A. Income from Salary</h4>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#FFFFFF" }}>1. Gross Salary Details</div>
                            <div style={{ fontSize: 14, color: "#FFFFFF", textAlign: "right", fontWeight: 500 }}>₹14,00,000</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA", paddingLeft: 16 }}>Basic Salary</div>
                            <div style={{ fontSize: 14, color: "#8899AA", textAlign: "right" }}>6,00,000</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA", paddingLeft: 16 }}>House Rent Allowance</div>
                            <div style={{ fontSize: 14, color: "#8899AA", textAlign: "right" }}>3,00,000</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA", paddingLeft: 16 }}>Special Allowance</div>
                            <div style={{ fontSize: 14, color: "#8899AA", textAlign: "right" }}>5,00,000</div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12, marginTop: 16 }}>
                            <div style={{ fontSize: 14, color: "#FFFFFF" }}>2. Less: Allowances Exempt u/s 10</div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right", fontWeight: 500 }}>(₹1,50,000)</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA", paddingLeft: 16 }}>House Rent Allowance Exemption (Sec 10(13A))</div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right" }}>(1,50,000)</div>
                        </div>

                        <div style={{ borderTop: "1px solid #1A2A3A", margin: "16px 0" }} />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 600 }}>3. Balance (1 - 2)</div>
                            <div style={{ fontSize: 15, color: "#FFFFFF", textAlign: "right", fontWeight: 600 }}>₹12,50,000</div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12, marginTop: 16 }}>
                            <div style={{ fontSize: 14, color: "#FFFFFF" }}>4. Less: Deductions u/s 16</div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right", fontWeight: 500 }}>(₹52,500)</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA", paddingLeft: 16 }}>Standard Deduction u/s 16(ia)</div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right" }}>(50,000)</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA", paddingLeft: 16 }}>Professional Tax u/s 16(iii)</div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right" }}>(2,500)</div>
                        </div>

                        <div style={{ borderTop: "1px dashed #445566", margin: "16px 0" }} />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16 }}>
                            <div style={{ fontSize: 15, color: "#00E5A0", fontWeight: 700 }}>Income Chargeable under Head &apos;Salaries&apos; (3 - 4)</div>
                            <div style={{ fontSize: 15, color: "#00E5A0", textAlign: "right", fontWeight: 700 }}>₹11,97,500</div>
                        </div>
                    </div>

                    {/* Part B: Other Income */}
                    <div style={{ marginBottom: 32 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>B. Income From Other Sources</h4>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Income from House Property (Loss)</div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right" }}>(50,000)</div>
                        </div>

                        <div style={{ borderTop: "1px dashed #445566", margin: "16px 0" }} />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16 }}>
                            <div style={{ fontSize: 15, color: "#00E5A0", fontWeight: 700 }}>Gross Total Income (A + B)</div>
                            <div style={{ fontSize: 15, color: "#00E5A0", textAlign: "right", fontWeight: 700 }}>₹11,47,500</div>
                        </div>
                    </div>

                    {/* Part C: Deductions */}
                    <div style={{ marginBottom: 32 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>C. Deductions under Chapter VI-A</h4>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Section 80C (PPF, LIC, ELSS, EPF, etc.)</div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right" }}>(1,50,000)</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Section 80CCD(1B) (NPS Tier 1 Additional)</div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right" }}>(50,000)</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Section 80D (Health Insurance Premium)</div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right" }}>(5,500)</div>
                        </div>

                        <div style={{ borderTop: "1px dashed #445566", margin: "16px 0" }} />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16 }}>
                            <div style={{ fontSize: 15, color: "#00E5A0", fontWeight: 700 }}>Total Taxable Income</div>
                            <div style={{ fontSize: 15, color: "#00E5A0", textAlign: "right", fontWeight: 700 }}>₹9,42,000</div>
                        </div>
                    </div>

                    {/* Part D: Tax Calculation */}
                    <div>
                        <h4 style={{ fontSize: 14, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>D. Tax Calculation</h4>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Tax on Total Income</div>
                            <div style={{ fontSize: 14, color: "#FFFFFF", textAlign: "right" }}>1,00,900</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Less: Rebate u/s 87A</div>
                            <div style={{ fontSize: 14, color: "#FF4444", textAlign: "right" }}>0</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Surcharge</div>
                            <div style={{ fontSize: 14, color: "#FFFFFF", textAlign: "right" }}>0</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Health & Education Cess @ 4%</div>
                            <div style={{ fontSize: 14, color: "#FFFFFF", textAlign: "right" }}>4,036</div>
                        </div>

                        <div style={{ borderTop: "1px dashed #445566", margin: "16px 0" }} />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16 }}>
                            <div style={{ fontSize: 16, color: "#FFB800", fontWeight: 700 }}>Total Tax Payable</div>
                            <div style={{ fontSize: 16, color: "#FFB800", textAlign: "right", fontWeight: 700 }}>₹1,04,936</div>
                        </div>
                    </div>

                </div>
            </div>

            <div style={{ display: "flex", gap: 12, background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 12, padding: 16 }}>
                <Info size={18} color="#0066FF" style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                    This computation is based on current declarations. TDS might be re-adjusted if proofs for declared investments are not submitted and verified before the final cut-off date (31 Jan 2025).
                </div>
            </div>

        </div>
    );
}
