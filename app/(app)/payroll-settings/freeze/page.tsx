"use client";

import { Save, Snowflake } from "lucide-react";

export default function SalaryFreezeSettings() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Salary Structure Freeze</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Lock core salary structures to prevent unauthorized modifications across the organization.</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Save size={16} /> Save Policy
                </button>
            </div>

            <div style={{ background: "rgba(0,102,255,0.05)", border: "1px dashed rgba(0,102,255,0.3)", borderRadius: 12, padding: 16, display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 24 }}>
                <Snowflake size={20} color="#0066FF" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: 13, color: "#E5E7EB", lineHeight: 1.5 }}>
                    When a parameter is frozen, it cannot be modified by HR Managers. Only Admins with 'Super Admin' or 'Payroll Master' roles can unlock and edit these values.
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Component Value Freeze</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", paddingBottom: 16, borderBottom: "1px solid #1A2A3A" }}>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Basic + DA Formula</div>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>Lock the formula computation (e.g., 50% of CTC).</div>
                        </div>
                        <div style={{ width: 40, height: 24, background: "#00E5A0", borderRadius: 12, display: "flex", alignItems: "center", padding: 2 }}>
                            <div style={{ width: 20, height: 20, background: "#060B14", borderRadius: "50%", transform: "translateX(16px)" }} />
                        </div>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", paddingBottom: 16, borderBottom: "1px solid #1A2A3A" }}>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Statutory Deductions (PF/PT/ESI)</div>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>Prevent manual overriding of statutory deduction amounts.</div>
                        </div>
                        <div style={{ width: 40, height: 24, background: "#00E5A0", borderRadius: 12, display: "flex", alignItems: "center", padding: 2 }}>
                            <div style={{ width: 20, height: 20, background: "#060B14", borderRadius: "50%", transform: "translateX(16px)" }} />
                        </div>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Flexible Benefit Plan (FBP)</div>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>Lock FBP declarations outside of the designated declaration window.</div>
                        </div>
                        <div style={{ width: 40, height: 24, background: "#1A2A3A", borderRadius: 12, display: "flex", alignItems: "center", padding: 2 }}>
                            <div style={{ width: 20, height: 20, background: "#8899AA", borderRadius: "50%" }} />
                        </div>
                    </label>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>CTC Boundary Guardrails</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <div>
                        <label style={{ fontSize: 13, color: "#8899AA", display: "block", marginBottom: 8 }}>Minimum Allowed Hike (%)</label>
                        <input type="number" defaultValue="0" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <div>
                        <label style={{ fontSize: 13, color: "#8899AA", display: "block", marginBottom: 8 }}>Maximum Allowed Hike (%) - Guardrail</label>
                        <input type="number" defaultValue="30" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                        <div style={{ fontSize: 12, color: "#FFB800", marginTop: 8 }}>Revisions above 30% require Super Admin approval.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
