"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Home, Save } from "lucide-react";

export default function HomeLoan() {
    const [interest, setInterest] = useState("2,14,000");
    const [principal, setPrincipal] = useState("85,000");
    const [lenderName, setLenderName] = useState("HDFC Bank Ltd");
    const [lenderPan, setLenderPan] = useState("AACH0000A");

    // Limits
    const maxSection24 = 200000;

    // Calculation (parsing commas)
    const interestVal = parseInt(interest.replace(/,/g, '')) || 0;
    const principalVal = parseInt(principal.replace(/,/g, '')) || 0;

    const sec24Eligible = Math.min(interestVal, maxSection24);

    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax/declaration/EMP-0848" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Home Loan Details</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Section 24(b) for interest and 80C for principal repayment</div>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>

                {/* Form Area */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Financial Details (FY 2024-25)</h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Home Loan Interest Paid <span style={{ color: "#FF4444" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input type="text" value={interest} onChange={e => setInterest(e.target.value)} style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 28, outline: "none" }} />
                                </div>
                                <div style={{ fontSize: 11, color: "#8899AA", marginTop: 4 }}>Claimable under Section 24(b) up to ₹2L</div>
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Principal Repaid <span style={{ color: "#FF4444" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input type="text" value={principal} onChange={e => setPrincipal(e.target.value)} style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 28, outline: "none" }} />
                                </div>
                                <div style={{ fontSize: 11, color: "#8899AA", marginTop: 4 }}>Automatically added to 80C limit (₹1.5L max combined)</div>
                            </div>
                        </div>

                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Lender Information</h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Name of Lender / Bank <span style={{ color: "#FF4444" }}>*</span></label>
                                <input type="text" value={lenderName} onChange={e => setLenderName(e.target.value)} style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 16, outline: "none" }} />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>PAN of Lender <span style={{ color: "#FF4444" }}>*</span></label>
                                <input type="text" value={lenderPan} onChange={e => setLenderPan(e.target.value.toUpperCase())} maxLength={10} style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 16, outline: "none", textTransform: "uppercase" }} />
                            </div>
                        </div>

                    </div>

                    <div style={{ background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 12, padding: 16, display: "flex", gap: 12 }}>
                        <Home size={18} color="#0066FF" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                            <strong>Section 80EEA:</strong> If you are a first-time home buyer, you may be eligible for an additional ₹1.5L deduction if the property value is under ₹45L & loan was sanctioned between Apr&apos;19 - Mar&apos;22. <a href="#" style={{ color: "#0066FF", textDecoration: "none" }}>Claim 80EEA Deduction &rarr;</a>
                        </div>
                    </div>

                </div>

                {/* Sticky Summary */}
                <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Deduction Summary</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                            {/* Sec 24b */}
                            <div>
                                <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, marginBottom: 8 }}>Sec 24(b) - Home Loan Interest</div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8899AA", marginBottom: 4 }}>
                                    <span>Declared Interest:</span>
                                    <span>₹{interestVal.toLocaleString()}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>
                                    <span style={{ color: "#00E5A0" }}>Eligible Exemption:</span>
                                    <span style={{ color: "#00E5A0" }}>₹{sec24Eligible.toLocaleString()}</span>
                                </div>
                                {interestVal > maxSection24 && (
                                    <div style={{ fontSize: 11, color: "#FFB800", marginTop: 4 }}>Limited to maximum ₹2,00,000 for self-occupied properties.</div>
                                )}
                            </div>

                            <div style={{ borderTop: "1px solid #1A2A3A" }} />

                            {/* Principal / 80C */}
                            <div>
                                <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, marginBottom: 8 }}>Section 80C Addition</div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8899AA", marginBottom: 4 }}>
                                    <span>Declared Principal:</span>
                                    <span>₹{principalVal.toLocaleString()}</span>
                                </div>
                                <div style={{ fontSize: 11, color: "#0066FF" }}>This will be clubbed with your existing Section 80C limit (max ₹1.5L combined).</div>
                            </div>
                        </div>

                        <button style={{ width: "100%", height: 44, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} className="hover:opacity-90">
                            <Save size={16} /> Save Declarations
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
