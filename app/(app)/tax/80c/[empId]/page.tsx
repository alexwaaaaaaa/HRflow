"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Info, Save } from "lucide-react";

const INVESTMENTS_80C = [
    { id: "epf", name: "Employee Provident Fund (EPF)", desc: "Auto-computed from payroll", isAuto: true },
    { id: "ppf", name: "Public Provident Fund (PPF)", desc: "Notified under section 80C", isAuto: false },
    { id: "lic", name: "Life Insurance Premium", desc: "For self, spouse or children", isAuto: false },
    { id: "elss", name: "Equity Linked Savings Scheme (ELSS)", desc: "Mutual funds with 3yr lock-in", isAuto: false },
    { id: "tuition", name: "Children's Tuition Fee", desc: "Max 2 children, full time education", isAuto: false },
    { id: "fd", name: "Tax Saving Fixed Deposit", desc: "5 year notified term deposit", isAuto: false },
    { id: "home_principal", name: "Home Loan Principal Repayment", desc: "Notified under section 80C", isAuto: false },
    { id: "ssy", name: "Sukanya Samriddhi Yojana", desc: "For girl child", isAuto: false },
];

export default function Section80C() {
    const [values, setValues] = useState<Record<string, string>>({
        epf: "57,600",
        ppf: "50,000",
        lic: "30,000",
        elss: "40,000",
    });

    const totalDeclared = 177600; // 57.6 + 50 + 30 + 40
    const eligibleAmount = Math.min(totalDeclared, 150000);

    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax/declaration/EMP-0848" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>80C Investments</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Maximum deduction allowed: ₹1,50,000</div>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>

                {/* Form Area */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {INVESTMENTS_80C.map(inv => (
                        <div key={inv.id} style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>{inv.name}</h3>
                                        {inv.isAuto && (
                                            <span style={{ fontSize: 11, background: "rgba(0,229,160,0.1)", color: "#00E5A0", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>Auto-fetched</span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: 13, color: "#8899AA" }}>{inv.desc}</div>
                                </div>
                                <div style={{ width: 180, position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input
                                        type="text"
                                        value={values[inv.id] || ""}
                                        onChange={(e) => setValues({ ...values, [inv.id]: e.target.value })}
                                        disabled={inv.isAuto}
                                        placeholder="0"
                                        style={{ width: "100%", height: 44, background: inv.isAuto ? "rgba(255,255,255,0.02)" : "#060B14", border: inv.isAuto ? "1px dashed #1A2A3A" : "1px solid #1A2A3A", borderRadius: 8, color: inv.isAuto ? "#8899AA" : "#FFFFFF", fontSize: 15, paddingLeft: 28, paddingRight: 12, outline: "none" }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Sticky Summary */}
                <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>80C Summary</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, borderBottom: "1px solid #1A2A3A", paddingBottom: 20 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                <span style={{ color: "#8899AA" }}>Total Declared Amount</span>
                                <span style={{ color: "#FFFFFF", fontWeight: 600 }}>₹{totalDeclared.toLocaleString()}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                <span style={{ color: "#8899AA" }}>Maximum Limit</span>
                                <span style={{ color: "#FFFFFF" }}>₹1,50,000</span>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <span style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 600 }}>Eligible Deduction</span>
                            <span style={{ fontSize: 20, color: "#00E5A0", fontWeight: 700 }}>₹{eligibleAmount.toLocaleString()}</span>
                        </div>

                        {totalDeclared > 150000 && (
                            <div style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 8, padding: 12, display: "flex", gap: 8, marginBottom: 24 }}>
                                <Info size={16} color="#FFB800" style={{ flexShrink: 0, marginTop: 2 }} />
                                <div style={{ fontSize: 13, color: "#FFB800", lineHeight: 1.4 }}>
                                    Your total declared amount exceeds the ₹1.5L limit. The maximum allowed deduction will be restricted to ₹1,50,000.
                                </div>
                            </div>
                        )}

                        <button style={{ width: "100%", height: 44, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} className="hover:opacity-90">
                            <Save size={16} /> Save 80C Declaration
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
