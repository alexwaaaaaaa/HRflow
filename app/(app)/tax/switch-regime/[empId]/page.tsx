"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, AlertTriangle, ArrowRightLeft } from "lucide-react";

export default function RegimeSwitch() {
    const [opted, setOpted] = useState("OLD");

    return (
        <div style={{ padding: "24px 32px", maxWidth: 800, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Switch Tax Regime</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Rahul Sharma (EMP-0848)</div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32, marginBottom: 24 }}>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                    <div style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ fontSize: 12, color: "#8899AA", textTransform: "uppercase", fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>Current Regime</div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: opted === "OLD" ? "#0066FF" : "#00E5A0", background: "rgba(255,255,255,0.02)", border: "1px solid #1A2A3A", borderRadius: 8, padding: "12px 0" }}>
                            {opted === "OLD" ? "Old Tax Regime" : "New Tax Regime"}
                        </div>
                    </div>

                    <div style={{ padding: "0 24px" }}>
                        <ArrowRightLeft size={32} color="#445566" />
                    </div>

                    <div style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ fontSize: 12, color: "#8899AA", textTransform: "uppercase", fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>Target Regime</div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: opted === "OLD" ? "#00E5A0" : "#0066FF", border: "1px dashed #445566", borderRadius: 8, padding: "12px 0" }}>
                            {opted === "OLD" ? "New Tax Regime" : "Old Tax Regime"}
                        </div>
                    </div>
                </div>

                <div style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 12, padding: 16, display: "flex", gap: 16, marginBottom: 32 }}>
                    <AlertTriangle size={24} color="#FFB800" style={{ flexShrink: 0 }} />
                    <div style={{ fontSize: 14, color: "#FFFFFF", lineHeight: 1.5 }}>
                        <strong>Important:</strong> Switching regimes mid-year may result in a significant spike in your monthly TDS deductions to cover any shortfall from previous months. Previously considered 80C/80D deductions will become null and void if you switch to the New Regime.
                    </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                    <input type="checkbox" id="confirm" style={{ width: 18, height: 18, accentColor: "#0066FF" }} />
                    <label htmlFor="confirm" style={{ fontSize: 14, color: "#8899AA", userSelect: "none" }}>I understand the implications and wish to proceed with the change.</label>
                </div>

                <div style={{ borderTop: "1px solid #1A2A3A", marginTop: 32, paddingTop: 24, display: "flex", justifyContent: "flex-end" }}>
                    <button onClick={() => setOpted(opted === "OLD" ? "NEW" : "OLD")} style={{ height: 44, padding: "0 24px", background: "#0066FF", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 700, cursor: "pointer" }} className="hover:opacity-90">
                        Confirm Switch to {opted === "OLD" ? "New Regime" : "Old Regime"}
                    </button>
                </div>

            </div>
        </div>
    );
}
