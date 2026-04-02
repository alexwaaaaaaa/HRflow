"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";

export default function Form24QDashboard() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>Form 24Q (e-TDS Returns)</h1>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Quarterly statement for deduction of tax on salary</div>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", height: 40, color: "#FFFFFF", fontSize: 14 }}>
                        FY 2024-25 <ChevronDown size={16} color="#8899AA" />
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

                {/* Q1 */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                        <div>
                            <div style={{ fontSize: 12, color: "#00E5A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><CheckCircle2 size={14} /> Filed</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Quarter 1</h3>
                            <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Apr, May, Jun</div>
                        </div>
                        <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "8px 12px", textAlign: "right" }}>
                            <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 2 }}>Due Date</div>
                            <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>31 Jul 2024</div>
                        </div>
                    </div>

                    <div style={{ flex: 1, borderTop: "1px solid #1A2A3A", borderBottom: "1px solid #1A2A3A", padding: "16px 0", marginBottom: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                            <span style={{ color: "#8899AA" }}>Total TDS Deducted:</span>
                            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>₹14,50,000</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                            <span style={{ color: "#8899AA" }}>PRN / Token Number:</span>
                            <span style={{ color: "#FFFFFF", fontFamily: "monospace", letterSpacing: 1 }}>012345678X</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                            <span style={{ color: "#8899AA" }}>Filed On:</span>
                            <span style={{ color: "#FFFFFF" }}>28 Jul 2024</span>
                        </div>
                    </div>

                    <Link href="/tax/form24q/q1">
                        <button style={{ width: "100%", height: 40, background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }} className="hover:bg-[#1A2A3A]">
                            View Quarter Details <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>

                {/* Q2 */}
                <div style={{ background: "#0D1928", border: "1px solid #0066FF", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", boxShadow: "0 0 0 1px rgba(0,102,255,0.2) inset" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                        <div>
                            <div style={{ fontSize: 12, color: "#0066FF", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><Clock size={14} /> Ready to File</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Quarter 2</h3>
                            <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Jul, Aug, Sep</div>
                        </div>
                        <div style={{ background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 8, padding: "8px 12px", textAlign: "right" }}>
                            <div style={{ fontSize: 11, color: "#0066FF", marginBottom: 2 }}>Due Date</div>
                            <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>31 Oct 2024</div>
                        </div>
                    </div>

                    <div style={{ flex: 1, borderTop: "1px solid #1A2A3A", borderBottom: "1px solid #1A2A3A", padding: "16px 0", marginBottom: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                            <span style={{ color: "#8899AA" }}>Total TDS Deducted:</span>
                            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>₹15,20,500</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                            <span style={{ color: "#8899AA" }}>Challans Matched:</span>
                            <span style={{ color: "#00E5A0", fontWeight: 600 }}>12 / 12</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                            <span style={{ color: "#8899AA" }}>FVU Generation:</span>
                            <span style={{ color: "#0066FF", fontWeight: 600 }}>Pending</span>
                        </div>
                    </div>

                    <Link href="/tax/form24q/q2">
                        <button style={{ width: "100%", height: 40, background: "#0066FF", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }} className="hover:opacity-90">
                            Generate TXT File / FVU <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>

                {/* Q3 */}
                <div style={{ background: "#060B14", border: "1px dashed #1A2A3A", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", opacity: 0.6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                        <div>
                            <div style={{ fontSize: 12, color: "#8899AA", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Upcoming</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Quarter 3</h3>
                            <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Oct, Nov, Dec</div>
                        </div>
                        <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "8px 12px", textAlign: "right" }}>
                            <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 2 }}>Due Date</div>
                            <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>31 Jan 2025</div>
                        </div>
                    </div>
                </div>

                {/* Q4 */}
                <div style={{ background: "#060B14", border: "1px dashed #1A2A3A", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", opacity: 0.6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                        <div>
                            <div style={{ fontSize: 12, color: "#FFB800", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><AlertTriangle size={14} /> Annual Details Required</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Quarter 4</h3>
                            <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Jan, Feb, Mar</div>
                        </div>
                        <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "8px 12px", textAlign: "right" }}>
                            <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 2 }}>Due Date</div>
                            <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>31 May 2025</div>
                        </div>
                    </div>
                    <div style={{ fontSize: 12, color: "#FFB800", marginTop: "auto" }}>Q4 return must include Annexure II (Salary details mapped to Form 16).</div>
                </div>

            </div>

        </div>
    );
}
