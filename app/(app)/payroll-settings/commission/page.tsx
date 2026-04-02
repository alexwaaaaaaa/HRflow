"use client";

import React, { useState } from "react";
import { ArrowLeft, Plus, Save, Banknote, RefreshCcw, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CommissionSetupPage() {
    const [revenue, setRevenue] = useState(3500000);

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", display: "flex", gap: 32, flexDirection: "row", color: "#FFFFFF" }}>

            {/* LEFT PANEL - CONFIG */}
            <div style={{ flex: "0 0 680px", display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                    <Link href="/payroll-settings" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Back to Settings
                    </Link>
                    <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Commission Plan Setup</h2>
                    <p style={{ color: "#8899AA", fontSize: 14, marginTop: 4 }}>Configure sales commission structures, slabs, accelerators, and clawbacks.</p>
                </div>

                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ display: "flex", gap: 24 }}>
                        <div style={{ flex: 2 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Plan Name</label>
                            <input type="text" defaultValue="FY 2025-26 Sales Commission" style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Type</label>
                            <select style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }}>
                                <option>Revenue-based</option>
                                <option>Deal-count</option>
                                <option>Hybrid</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Applicable Roles</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {["Sales Executive", "Sr. Sales Exec", "Account Executive"].map(role => (
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
                            <label style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>Revenue Slabs</label>
                            <button style={{ background: "transparent", border: "none", color: "#00E5A0", fontSize: 13, cursor: "pointer" }}>+ Add Slab</button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {[
                                { min: 0, max: 500000, rate: 2.0 },
                                { min: 500000, max: 2000000, rate: 3.0 },
                                { min: 2000000, max: 5000000, rate: 4.5 },
                                { min: 5000000, max: "Max", rate: 6.0 },
                            ].map((slab, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#0D1928", padding: "8px 12px", borderRadius: 8, border: "1px solid #1A2A3A" }}>
                                    <span style={{ fontSize: 13, color: "#8899AA", width: 40 }}>From:</span>
                                    <span style={{ fontSize: 13, color: "#8899AA" }}>₹</span>
                                    <input type="text" defaultValue={slab.min} style={{ width: 80, height: 32, background: "#1A2A3A", border: "none", borderRadius: 4, color: "#FFF", textAlign: "right", paddingRight: 8, outline: "none" }} />
                                    <span style={{ fontSize: 13, color: "#8899AA" }}>to ₹</span>
                                    <input type="text" defaultValue={slab.max} disabled={slab.max === "Max"} style={{ width: 80, height: 32, background: "#1A2A3A", border: "none", borderRadius: 4, color: slab.max === "Max" ? "#8899AA" : "#FFF", textAlign: "right", paddingRight: 8, outline: "none" }} />
                                    <ArrowLeft size={16} color="#4A5A6A" style={{ transform: "rotate(180deg)", margin: "0 8px" }} />
                                    <span style={{ fontSize: 13, color: "#00E5A0", fontWeight: 500 }}>Comm. Rate:</span>
                                    <input type="text" defaultValue={slab.rate} style={{ width: 60, height: 32, background: "#1A2A3A", border: "1px solid #00E5A040", borderRadius: 4, color: "#00E5A0", textAlign: "center", outline: "none", fontWeight: 600 }} />
                                    <span style={{ fontSize: 13, color: "#8899AA" }}>%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Accelerators & Clawbacks */}
                    <div style={{ display: "flex", gap: 16 }}>
                        <div style={{ flex: 1, background: "#0D1928", padding: 16, borderRadius: 8, border: "1px dashed #2A3A4A" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#FFFFFF", marginBottom: 12 }}>
                                <TrendingUp size={16} color="#00E5A0" /> Accelerators
                            </label>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                                <span style={{ color: "#8899AA" }}>If target &gt;</span>
                                <input type="text" defaultValue="120%" style={{ width: 50, height: 28, background: "#1A2A3A", border: "none", borderRadius: 4, color: "#FFF", textAlign: "center", outline: "none" }} />
                                <span style={{ color: "#8899AA" }}>:</span>
                                <input type="text" defaultValue="1.5x" style={{ width: 50, height: 28, background: "#1A2A3A", border: "none", borderRadius: 4, color: "#FFF", textAlign: "center", outline: "none" }} />
                                <span style={{ color: "#8899AA" }}>multiplier</span>
                            </div>
                        </div>

                        <div style={{ flex: 1, background: "#0D1928", padding: 16, borderRadius: 8, border: "1px dashed #2A3A4A" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#FFFFFF", marginBottom: 12 }}>
                                <RefreshCcw size={16} color="#FFB800" /> Clawback Rules
                            </label>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                                <span style={{ color: "#8899AA" }}>If cancelled avg</span>
                                <input type="text" defaultValue="90" style={{ width: 40, height: 28, background: "#1A2A3A", border: "none", borderRadius: 4, color: "#FFF", textAlign: "center", outline: "none" }} />
                                <span style={{ color: "#8899AA" }}>days:</span>
                                <input type="text" defaultValue="50%" style={{ width: 50, height: 28, background: "#1A2A3A", border: "none", borderRadius: 4, color: "#FFF", textAlign: "center", outline: "none" }} />
                                <span style={{ color: "#8899AA" }}>reclaim</span>
                            </div>
                        </div>
                    </div>

                    {/* Draw */}
                    <div style={{ background: "#0D1928", padding: 16, borderRadius: 8, border: "1px solid #1A2A3A", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Draw Against Commission</div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Monthly advance credited to employee, adjusted at quarter end</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>₹</span>
                            <input type="text" defaultValue="20000" style={{ width: 80, height: 32, background: "#1A2A3A", border: "1px solid #2A3A4A", borderRadius: 4, color: "#FFF", textAlign: "right", paddingRight: 8, outline: "none" }} />
                            <span style={{ fontSize: 13, color: "#8899AA" }}>/mo</span>
                        </div>
                    </div>

                    <button style={{ height: 48, background: "#00E5A0", color: "#060B14", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
                        <Save size={18} /> Save Commission Plan
                    </button>
                </div>
            </div>

            {/* RIGHT PANEL - SIMULATOR */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, position: "sticky", top: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, borderBottom: "1px solid #1A2A3A", paddingBottom: 16 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "#00E5A020", display: "flex", alignItems: "center", justifyContent: "center", color: "#00E5A0" }}>
                            <Banknote size={20} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Earnings Simulator</h3>
                            <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>Evaluate slab calculations instantly</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Enter Trial Revenue</label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: 16, top: 12, color: "#8899AA" }}>₹</span>
                            <input type="range" min="0" max="10000000" step="100000" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} style={{ position: "absolute", bottom: -12, left: 0, width: "100%", accentColor: "#00E5A0" }} />
                            <input type="text" value={revenue.toLocaleString()} readOnly style={{ width: "100%", height: 44, background: "#0D1928", border: "1px solid #00E5A040", borderRadius: 8, color: "#FFFFFF", padding: "0 16px 0 32px", fontSize: 16, fontWeight: 500, outline: "none" }} />
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12, background: "#0D1928", borderRadius: 12, padding: 16, border: "1px solid #1A2A3A" }}>
                        <div style={{ fontSize: 12, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Calculations</div>

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                            <span style={{ color: "#CCC" }}>₹0 - ₹5L @ 2.0%</span>
                            <span>{revenue >= 500000 ? "₹10,000" : `₹${(revenue * 0.02).toLocaleString()}`}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: revenue > 500000 ? "#CCC" : "#4A5A6A" }}>
                            <span >₹5L - ₹20L @ 3.0%</span>
                            <span>{revenue >= 2000000 ? "₹45,000" : revenue > 500000 ? `₹${((revenue - 500000) * 0.03).toLocaleString()}` : "₹0"}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: revenue > 2000000 ? "#CCC" : "#4A5A6A" }}>
                            <span>₹20L - ₹50L @ 4.5%</span>
                            <span>{revenue >= 5000000 ? "₹1,35,000" : revenue > 2000000 ? `₹${((revenue - 2000000) * 0.045).toLocaleString()}` : "₹0"}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: revenue > 5000000 ? "#00E5A0" : "#4A5A6A" }}>
                            <span>₹50L+ @ 6.0%</span>
                            <span>{revenue > 5000000 ? `₹${((revenue - 5000000) * 0.06).toLocaleString()}` : "₹0"}</span>
                        </div>

                        <div style={{ height: 1, background: "#1A2A3A", margin: "4px 0" }}></div>

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 500 }}>
                            <span>Gross Commission</span>
                            <span>₹{
                                (Math.min(revenue, 500000) * 0.02 +
                                    Math.max(0, Math.min(revenue - 500000, 1500000)) * 0.03 +
                                    Math.max(0, Math.min(revenue - 2000000, 3000000)) * 0.045 +
                                    Math.max(0, revenue - 5000000) * 0.06).toLocaleString()
                            }</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#FF5555" }}>
                            <span>Less: Draw Adjustment (Quarterly)</span>
                            <span>-₹60,000</span>
                        </div>

                        <div style={{ padding: "12px", background: "#00E5A015", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #00E5A030", marginTop: 8 }}>
                            <span style={{ fontSize: 14, fontWeight: 500, color: "#00E5A0" }}>Net Payout Amount</span>
                            <span style={{ fontSize: 20, fontWeight: 600, color: "#00E5A0" }}>₹{
                                Math.max(0, (Math.min(revenue, 500000) * 0.02 +
                                    Math.max(0, Math.min(revenue - 500000, 1500000)) * 0.03 +
                                    Math.max(0, Math.min(revenue - 2000000, 3000000)) * 0.045 +
                                    Math.max(0, revenue - 5000000) * 0.06) - 60000).toLocaleString()
                            }</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#8899AA", textAlign: "right" }}>*Subject to TDS as per applicable slab</div>
                    </div>
                </div>
            </div>

        </div>
    );
}
