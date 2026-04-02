"use client";

import React, { useState } from "react";
import { ArrowLeft, Calculator, Plus, Save, Settings2 } from "lucide-react";
import Link from "next/link";

export default function VariablePaySetupPage() {
    const [planName, setPlanName] = useState("Q4 FY24-25 Sales Variable");

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", display: "flex", gap: 32, flexDirection: "row", color: "#FFFFFF" }}>

            {/* LEFT PANEL - CONFIG */}
            <div style={{ flex: "0 0 640px", display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                    <Link href="/payroll-settings" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Back to Settings
                    </Link>
                    <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Variable Pay Setup</h2>
                    <p style={{ color: "#8899AA", fontSize: 14, marginTop: 4 }}>Configure variable pay rules, payout frequencies, and target metrics.</p>
                </div>

                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Plan Name</label>
                        <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }} />
                    </div>

                    <div style={{ display: "flex", gap: 24 }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Payout Frequency</label>
                            <div style={{ display: "flex", gap: 12 }}>
                                {["Monthly", "Quarterly", "Annual"].map(freq => (
                                    <label key={freq} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", color: freq === "Quarterly" ? "#FFFFFF" : "#8899AA" }}>
                                        <input type="radio" name="freq" checked={freq === "Quarterly"} readOnly style={{ accentColor: "#00E5A0" }} /> {freq}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Payout Formula Type</label>
                            <select style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }}>
                                <option>Target Achievement %</option>
                                <option>Linear Multiplier</option>
                                <option>Fixed Amount Matrix</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Eligible Roles</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {["Sales Executive", "Account Manager", "BDM"].map(role => (
                                <span key={role} style={{ background: "#1A2A3A", color: "#FFFFFF", padding: "6px 12px", borderRadius: 16, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                                    {role} <span style={{ color: "#8899AA", cursor: "pointer" }}>×</span>
                                </span>
                            ))}
                            <button style={{ background: "transparent", border: "1px dashed #3A4A5A", color: "#8899AA", padding: "6px 12px", borderRadius: 16, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                                <Plus size={14} /> Add Role
                            </button>
                        </div>
                    </div>

                    <hr style={{ border: "none", borderTop: "1px solid #1A2A3A", margin: "8px 0" }} />

                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <label style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>Payout Slabs (Target Achievement %)</label>
                            <button style={{ background: "transparent", border: "none", color: "#00E5A0", fontSize: 13, cursor: "pointer" }}>+ Add Slab</button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {[
                                { min: 0, max: 49, payout: 0 },
                                { min: 50, max: 74, payout: 50 },
                                { min: 75, max: 89, payout: 75 },
                                { min: 90, max: 99, payout: 90 },
                                { min: 100, max: 119, payout: 100 },
                                { min: 120, max: "Max", payout: 120 },
                            ].map((slab, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#0D1928", padding: "8px 12px", borderRadius: 8, border: "1px solid #1A2A3A" }}>
                                    <span style={{ fontSize: 13, color: "#8899AA", width: 40 }}>From:</span>
                                    <input type="text" defaultValue={slab.min} style={{ width: 60, height: 32, background: "#1A2A3A", border: "none", borderRadius: 4, color: "#FFF", textAlign: "center", outline: "none" }} />
                                    <span style={{ fontSize: 13, color: "#8899AA" }}>% to</span>
                                    <input type="text" defaultValue={slab.max} disabled={slab.max === "Max"} style={{ width: 60, height: 32, background: "#1A2A3A", border: "none", borderRadius: 4, color: slab.max === "Max" ? "#8899AA" : "#FFF", textAlign: "center", outline: "none" }} />
                                    <span style={{ fontSize: 13, color: "#8899AA" }}>% achieve</span>
                                    <ArrowLeft size={16} color="#4A5A6A" style={{ transform: "rotate(180deg)", margin: "0 8px" }} />
                                    <span style={{ fontSize: 13, color: "#00E5A0", fontWeight: 500 }}>Payout:</span>
                                    <input type="text" defaultValue={slab.payout} style={{ width: 60, height: 32, background: "#1A2A3A", border: "1px solid #00E5A040", borderRadius: 4, color: "#00E5A0", textAlign: "center", outline: "none", fontWeight: 600 }} />
                                    <span style={{ fontSize: 13, color: "#8899AA" }}>% of Variable Comp</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 24, background: "#0D1928", padding: 16, borderRadius: 8, border: "1px dashed #2A3A4A" }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Max Payout Cap</label>
                            <input type="text" defaultValue="200%" style={{ width: "100%", height: 36, background: "#1A2A3A", border: "1px solid #2A3A4A", borderRadius: 6, color: "#FFFFFF", padding: "0 12px", outline: "none" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>TDS Treatment</label>
                            <select style={{ width: "100%", height: 36, background: "#1A2A3A", border: "1px solid #2A3A4A", borderRadius: 6, color: "#FFFFFF", padding: "0 12px", outline: "none" }}>
                                <option>Deduct immediately (Lump sum)</option>
                                <option>Spread over remaining FY</option>
                            </select>
                        </div>
                    </div>

                    <button style={{ height: 48, background: "#00E5A0", color: "#060B14", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
                        <Save size={18} /> Save Variable Pay Plan
                    </button>
                </div>
            </div>

            {/* RIGHT PANEL - SIMULATOR */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, position: "sticky", top: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, borderBottom: "1px solid #1A2A3A", paddingBottom: 16 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "#00E5A020", display: "flex", alignItems: "center", justifyContent: "center", color: "#00E5A0" }}>
                            <Calculator size={20} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Formula Live Simulator</h3>
                            <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>Sample calculations based on active config</div>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {[
                            { name: "Kavya Nair", pct: 124, var: 96000, out: 115200, payPct: 120, trend: "up" },
                            { name: "Rohit Joshi", pct: 85, var: 72000, out: 54000, payPct: 75, trend: "down" },
                            { name: "Meena Iyer", pct: 62, var: 60000, out: 30000, payPct: 50, trend: "down" },
                            { name: "Rahul Gupta", pct: 105, var: 80000, out: 80000, payPct: 100, trend: "even" },
                            { name: "Vikas Tyagi", pct: 45, var: 50000, out: 0, payPct: 0, trend: "down" },
                        ].map((emp, i) => (
                            <div key={i} style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 16 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                    <span style={{ fontSize: 14, fontWeight: 500 }}>{emp.name}</span>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: emp.pct >= 100 ? "#00E5A0" : "#FFB800", background: emp.pct >= 100 ? "#00E5A020" : "#FFB00020", padding: "4px 8px", borderRadius: 4 }}>
                                        {emp.pct}% Achieved
                                    </span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8899AA", marginBottom: 4 }}>
                                    <span>Base Variable (100%)</span>
                                    <span>₹{emp.var.toLocaleString()}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8899AA", marginBottom: 12 }}>
                                    <span>Slab Applied</span>
                                    <span>{emp.payPct}% Payout</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1A2A3A", padding: "10px 12px", borderRadius: 6 }}>
                                    <span style={{ fontSize: 13, color: "#CCC" }}>Final Payout</span>
                                    <span style={{ fontSize: 16, fontWeight: 600, color: emp.out > emp.var ? "#00E5A0" : emp.out === emp.var ? "#FFF" : "#FFB800" }}>₹{emp.out.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 24, background: "#1A2A3A", padding: "12px", borderRadius: 8, fontSize: 12, color: "#8899AA", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <Settings2 size={14} /> View raw JSON calculation log
                    </div>
                </div>
            </div>

        </div>
    );
}
