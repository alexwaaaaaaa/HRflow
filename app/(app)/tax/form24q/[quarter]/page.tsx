"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Download, CheckCircle2, FileText, CreditCard, Users, ExternalLink } from "lucide-react";

export default function Form24QQuarterDetail({ params }: { params: { quarter: string } }) {
    const qStr = params.quarter.toUpperCase(); // Q1, Q2 etc

    // Simulate data based on quarter
    const isFiled = qStr === "Q1";
    const statusText = isFiled ? "Filed Successfully" : "Pending Generation";
    const statusColor = isFiled ? "#00E5A0" : "#0066FF";

    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax/form24q" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Form 24Q - {qStr} (FY 2024-25)</h1>
                        <div style={{ fontSize: 13, color: statusColor, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                            {isFiled && <CheckCircle2 size={14} />} {statusText}
                        </div>
                    </div>
                </div>
                {!isFiled ? (
                    <button style={{ height: 40, padding: "0 20px", background: "#0066FF", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:opacity-90">
                        <FileText size={16} /> Generate TXT for FVU Utility
                    </button>
                ) : (
                    <button style={{ height: 40, padding: "0 20px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:bg-[#1A2A3A]">
                        <Download size={16} /> Download Filed TXT
                    </button>
                )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 24 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <h4 style={{ fontSize: 13, color: "#8899AA", margin: 0, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><CreditCard size={16} /> Challan Count</h4>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>12</div>
                    <div style={{ fontSize: 12, color: "#00E5A0", marginTop: 4 }}>All fully mapped</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <h4 style={{ fontSize: 13, color: "#8899AA", margin: 0, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><Users size={16} /> Total Deductees</h4>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>345</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <h4 style={{ fontSize: 13, color: "#8899AA", margin: 0, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "#FFFFFF", fontWeight: "bold" }}>₹</span> Total TDS Deposited</h4>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>14,50,000</div>
                </div>
            </div>

            {/* Annexure II specifically for Q4 */}
            {qStr === "Q4" && (
                <div style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFB800", margin: 0, marginBottom: 8 }}>Annexure II Required</h3>
                            <div style={{ fontSize: 13, color: "#FFB800", maxWidth: 600, lineHeight: 1.5 }}>
                                Q4 return includes Annexure II, which requires the complete salary breakdown, exemptions, deductions under Chapter VI-A, and final tax calculations for the entire FY for all employees. Ensure all proofs are verified before generation.
                            </div>
                        </div>
                        <Link href="/tax/proof-review">
                            <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid rgba(255,184,0,0.4)", borderRadius: 8, color: "#FFB800", fontSize: 13, fontWeight: 600, cursor: "pointer" }} className="hover:bg-[rgba(255,184,0,0.1)]">
                                Review Final Proofs
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Missing Info warnings */}
            {!isFiled && (
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 16 }}>Pre-flight Validations</h3>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <CheckCircle2 size={16} color="#00E5A0" />
                        <div style={{ fontSize: 14, color: "#FFFFFF" }}>Valid Company TAN & PAN</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <CheckCircle2 size={16} color="#00E5A0" />
                        <div style={{ fontSize: 14, color: "#FFFFFF" }}>Responsible Person Details Updated</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <CheckCircle2 size={16} color="#00E5A0" />
                        <div style={{ fontSize: 14, color: "#FFFFFF" }}>No negative TDS/Salary entries</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#060B14", fontSize: 10, fontWeight: "bold" }}>!</span></div>
                        <div style={{ fontSize: 14, color: "#FFB800" }}>3 Deductees missing valid PAN</div>
                        <button style={{ marginLeft: "auto", background: "transparent", border: "1px solid #1A2A3A", color: "#FFFFFF", fontSize: 12, padding: "4px 12px", borderRadius: 4, cursor: "pointer" }}>View List</button>
                    </div>
                </div>
            )}

            <div style={{ fontSize: 13, color: "#8899AA", textAlign: "center", marginTop: 40 }}>
                To file the TXT output, use the official NSDL e-Gov FVU Utility. <br />
                <a href="#" style={{ color: "#0066FF", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8 }}>Download latest FVU version from TIN-NSDL <ExternalLink size={12} /></a>
            </div>

        </div>
    );
}
