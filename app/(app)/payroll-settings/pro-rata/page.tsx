"use client";

import Link from "next/link";
import { Save, AlertTriangle, CornerDownRight } from "lucide-react";

export default function ProRataSettings() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Pro-Rata & LOP Settings</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Configure calculation rules for partial months (joiners/leavers) and Loss of Pay.</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Save size={16} /> Save Rules
                </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Pro-rata joining */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Mid-Month Joiners & Leavers</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div>
                            <label style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 500, display: "block", marginBottom: 6 }}>Pay generation rule</label>
                            <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 14, cursor: "pointer", outline: "none" }}>
                                <option>Calculate exactly based on worked days</option>
                                <option>Hold payroll if joined after 25th</option>
                            </select>
                        </div>

                        <div style={{ background: "rgba(255,184,0,0.05)", border: "1px dashed rgba(255,184,0,0.3)", borderRadius: 8, padding: "16px", display: "flex", gap: 12 }}>
                            <AlertTriangle size={18} color="#FFB800" style={{ flexShrink: 0, marginTop: 2 }} />
                            <div style={{ fontSize: 13, color: "#FFFFFF", lineHeight: 1.5 }}>
                                <span style={{ color: "#FFB800", fontWeight: 600 }}>Example:</span> Joined on Nov 15th.<br />
                                Base Days in Nov: 30.<br />
                                Payable Days: 16.<br />
                                Basic Salary = (Basic / 30) * 16.
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 500, display: "block", marginBottom: 12 }}>Components affected by Pro-rata</label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                                {["Basic", "HRA", "Special Allowance", "Transport Allowance", "Internet Recon"].map((comp, i) => (
                                    <label key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#060B14", padding: "8px 12px", border: "1px solid #1A2A3A", borderRadius: 8, cursor: "pointer" }}>
                                        <input type="checkbox" defaultChecked={i < 4} style={{ accentColor: "#00E5A0" }} />
                                        <span style={{ fontSize: 13, color: "#FFFFFF" }}>{comp}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* LOP Deduction Strategy */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Loss of Pay (LOP) Deductions</h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 16, background: "rgba(0,102,255,0.05)", border: "1px solid #0066FF", borderRadius: 12, cursor: "pointer" }}>
                            <input type="radio" name="lop" defaultChecked style={{ accentColor: "#0066FF", marginTop: 4, width: 16, height: 16 }} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Standard Component Level Deduction</div>
                                <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>Deduct LOP proportionally from all dependent components (Basic, HRA, etc.). Taxes will adjust dynamically based on lowered gross.</div>
                            </div>
                        </label>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 16, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 12, cursor: "pointer" }}>
                            <input type="radio" name="lop" style={{ accentColor: "#00E5A0", marginTop: 4, width: 16, height: 16 }} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Deduct solely from Gross as single line item</div>
                                <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>Show &quot;LOP Recovery&quot; as a separate deduction. Original Gross remains same on slip. Tax deduction might be impacted.</div>
                            </div>
                        </label>
                    </div>

                    <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid #1A2A3A" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                            <input type="checkbox" defaultChecked style={{ accentColor: "#00E5A0", width: 16, height: 16 }} />
                            <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>Count Weekends/Holidays as LOP if bordered by unpaid leaves</span>
                        </label>
                        <div style={{ display: "flex", gap: 8, marginTop: 12, paddingLeft: 28 }}>
                            <CornerDownRight color="#445566" size={16} />
                            <div style={{ fontSize: 13, color: "#8899AA" }}>&quot;Sandwich Rule&quot; — Example: Friday Sick (Unpaid) + Monday Sick (Unpaid) = 4 LOP days.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
