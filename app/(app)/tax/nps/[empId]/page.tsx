"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Info, Save } from "lucide-react";

export default function NPSDeclaration() {
    const [npsContribution, setNpsContribution] = useState("50,000");
    const [pran, setPran] = useState("110022334455");

    const npsAmount = parseInt(npsContribution.replace(/,/g, '')) || 0;
    const eligible80ccd1b = Math.min(npsAmount, 50000);
    const overflowTo80c = Math.max(0, npsAmount - 50000);

    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax/declaration/EMP-0848" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>NPS Tier 1 — Section 80CCD(1B)</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Self contribution to National Pension System</div>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>

                {/* Form Area */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 8, padding: 16, marginBottom: 24 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                <Info size={16} color="#00E5A0" style={{ flexShrink: 0, marginTop: 2 }} />
                                <div>
                                    <div style={{ fontSize: 13, color: "#00E5A0", fontWeight: 600, marginBottom: 4 }}>Exclusive Additional Deduction</div>
                                    <div style={{ fontSize: 13, color: "#FFFFFF", lineHeight: 1.5 }}>Voluntary investment in National Pension System (NPS) Tier 1 account gives you an exclusive tax deduction of up to <span style={{ fontWeight: 700 }}>₹50,000</span> above the standard ₹1.5L limit under section 80C.</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Voluntary Contribution <span style={{ color: "#FF4444" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input type="text" value={npsContribution} onChange={e => setNpsContribution(e.target.value)} style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 28, outline: "none" }} />
                                </div>
                                <div style={{ fontSize: 11, color: "#8899AA", marginTop: 4 }}>Only include your self-contribution (Tier 1)</div>
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>PRAN (Permanent Retirement A/c No.)</label>
                                <input type="text" value={pran} onChange={e => setPran(e.target.value)} maxLength={12} style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 16, outline: "none" }} />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sticky Summary */}
                <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>NPS Summary</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                            <div>
                                <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, marginBottom: 8 }}>Section 80CCD(1B) Exemption</div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8899AA", marginBottom: 4 }}>
                                    <span>Declared Contribution:</span>
                                    <span>₹{npsAmount.toLocaleString()}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>
                                    <span style={{ color: "#00E5A0" }}>Exclusive Exemption:</span>
                                    <span style={{ color: "#00E5A0" }}>₹{eligible80ccd1b.toLocaleString()}</span>
                                </div>
                            </div>

                            {overflowTo80c > 0 && (
                                <>
                                    <div style={{ borderTop: "1px solid #1A2A3A" }} />
                                    <div>
                                        <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, marginBottom: 8 }}>Spillover to Section 80C</div>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8899AA", marginBottom: 4 }}>
                                            <span>Remaining Amount:</span>
                                            <span>₹{overflowTo80c.toLocaleString()}</span>
                                        </div>
                                        <div style={{ fontSize: 11, color: "#0066FF" }}>This additional amount has been clubbed with your 80C declarations (subject to overall ₹1.5L limit).</div>
                                    </div>
                                </>
                            )}
                        </div>

                        <button style={{ width: "100%", height: 44, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} className="hover:opacity-90">
                            <Save size={16} /> Save NPS Declaration
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
