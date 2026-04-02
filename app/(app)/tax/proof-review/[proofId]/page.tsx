"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, Check, X, AlertTriangle } from "lucide-react";

export default function ProofApproveRejectScreen() {
    return (
        <div style={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>

            <div style={{ padding: "16px 32px", borderBottom: "1px solid #1A2A3A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax/proof-review" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Review: Life Insurance Premium (LIC)</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>Rahul Sharma (EMP-0848) • Section 80C</div>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Proof 2 of 5 for this employee</div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button style={{ width: 32, height: 32, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 6, color: "#8899AA", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>&lt;</button>
                        <button style={{ width: 32, height: 32, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>&gt;</button>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

                {/* Left side: Document Preview */}
                <div style={{ flex: 1, background: "#060B14", borderRight: "1px solid #1A2A3A", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "12px 24px", display: "flex", justifyContent: "flex-end", alignItems: "center", borderBottom: "1px solid #1A2A3A" }}>
                        <button style={{ background: "transparent", border: "1px solid #1A2A3A", color: "#8899AA", fontSize: 12, padding: "4px 12px", borderRadius: 4, cursor: "pointer" }}>Open in New Tab</button>
                    </div>
                    <div style={{ flex: 1, padding: 32, display: "flex", justifyContent: "center", overflow: "auto" }}>
                        <div style={{ width: 600, height: 700, background: "#FFFFFF", borderRadius: 4, padding: 48, color: "#000", fontFamily: "serif" }}>
                            <h2 style={{ textAlign: "center", marginBottom: 32, color: "#000", fontSize: 24 }}>LIC RENEWAL PREMIUM RECEIPT</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "16px" }}>
                                <strong>Policy Holder:</strong> <span>Rahul Kumar Sharma</span>
                                <strong>Premium Paid:</strong> <span style={{ background: "rgba(0,102,255,0.2)" }}>₹ 30,000.00</span>
                                <strong>Date of Issuance:</strong> <span style={{ background: "rgba(0,102,255,0.2)" }}>15/05/2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: Verification Controls */}
                <div style={{ width: 400, background: "#0D1928", display: "flex", flexDirection: "column" }}>

                    <div style={{ padding: 24, borderBottom: "1px solid #1A2A3A" }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 1, margin: 0, marginBottom: 16 }}>Verification Checklist</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <div style={{ fontSize: 13, color: "#FFFFFF", marginBottom: 4 }}>Amount matches declared</div>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: "#00E5A0" }}>₹30,000</div>
                                </div>
                                <CheckCircle2 size={20} color="#00E5A0" />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <div style={{ fontSize: 13, color: "#FFFFFF", marginBottom: 4 }}>Valid for FY 24-25</div>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: "#00E5A0" }}>15-May-2024</div>
                                </div>
                                <CheckCircle2 size={20} color="#00E5A0" />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <div style={{ fontSize: 13, color: "#FFFFFF", marginBottom: 4 }}>Name matches employee</div>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Rahul Kumar Sharma</div>
                                </div>
                                <div style={{ color: "#FFB800" }}><AlertTriangle size={20} /></div>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: 24, flex: 1 }}>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Approved Amount (₹)</label>
                        <input type="text" value="30,000" readOnly style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 14, padding: "0 12px", outline: "none", marginBottom: 20 }} />

                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>HR Remarks (Optional/Required for rejection)</label>
                        <textarea placeholder="Add a note to employee..." style={{ width: "100%", height: 80, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 13, padding: 12, outline: "none", resize: "none" }} />
                    </div>

                    <div style={{ padding: 24, borderTop: "1px solid #1A2A3A", background: "#0A1420", display: "flex", gap: 16 }}>
                        <Link href="/tax/proof-review" style={{ flex: 1 }}>
                            <button style={{ width: "100%", height: 44, background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.3)", borderRadius: 8, color: "#FF4444", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} className="hover:bg-[#FF4444]/20">
                                <X size={16} /> Reject
                            </button>
                        </Link>
                        <Link href="/tax/proof-review" style={{ flex: 1 }}>
                            <button style={{ width: "100%", height: 44, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} className="hover:opacity-90">
                                <Check size={16} /> Approve
                            </button>
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
}
