"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw, Calculator, Save, GripVertical } from "lucide-react";

export default function SalaryFitment() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <Link href="/payroll/ctc-revision" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", marginBottom: 24 }} className="hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to Pipeline
            </Link>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Salary Fitment Engine</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Manually adjust component values to arrive at a target Net Pay or CTC.</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Save size={16} /> Apply to Revision
                </button>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 24, display: "flex", gap: 24, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 13, color: "#8899AA", display: "block", marginBottom: 8 }}>Enter Target Annual CTC</label>
                    <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 16, top: 10, color: "#8899AA", fontSize: 14 }}>₹</span>
                        <input type="number" defaultValue="1400000" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px 0 32px", color: "#FFFFFF", fontSize: 14, outline: "none", fontWeight: 600 }} />
                    </div>
                </div>
                <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "#445566", marginTop: 24 }}>OR</div>
                <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 13, color: "#8899AA", display: "block", marginBottom: 8 }}>Enter Target Net Take-home (Monthly)</label>
                    <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 16, top: 10, color: "#8899AA", fontSize: 14 }}>₹</span>
                        <input type="number" placeholder="Enter Net Pay" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px 0 32px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "rgba(0,102,255,0.1)", border: "1px solid #0066FF", borderRadius: 8, color: "#0066FF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginTop: 24 }}>
                    <RefreshCw size={16} /> Auto-Fit
                </button>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ padding: "16px 24px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", display: "flex", alignItems: "center", gap: 8 }}><Calculator size={18} /> Component Breakup</h2>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Current Model: Standard Structure</div>
                </div>

                <div style={{ padding: "24px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            { name: "Basic Salary", val: 58333, type: "Formula" },
                            { name: "House Rent Allowance (HRA)", val: 29167, type: "Formula" },
                            { name: "Special Allowance", val: 24167, type: "Balancing" },
                            { name: "Other Allowances", val: 5000, type: "Fixed" }
                        ].map((c, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, background: "#060B14", border: "1px solid #1A2A3A", padding: "12px 16px", borderRadius: 8 }}>
                                <GripVertical size={16} color="#445566" style={{ cursor: "grab" }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 2 }}>{c.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{c.type} Base</div>
                                </div>
                                <div style={{ position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: 10, color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input type="number" defaultValue={c.val} disabled={c.type === "Formula" || c.type === "Balancing"} style={{ width: 140, height: 40, background: c.type === "Fixed" ? "#0D1928" : "transparent", border: c.type === "Fixed" ? "1px solid #1A2A3A" : "none", borderRadius: 6, padding: "0 12px 0 28px", color: c.type === "Fixed" ? "#FFFFFF" : "#8899AA", fontSize: 14, outline: "none", textAlign: "right" }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px dashed #1A2A3A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 14, color: "#8899AA" }}>Monthly Gross Salary</div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#00E5A0" }}>₹1,16,667</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
