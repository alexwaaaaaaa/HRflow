"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Info, Heart, Lightbulb, Save } from "lucide-react";

const OTHER_DEDUCTIONS = [
    { id: "80e", sec: "80E", name: "Higher Education Loan Interest", desc: "No upper limit on interest paid for 8 years", limit: "No Limit", icon: <Lightbulb size={20} color="#0066FF" /> },
    { id: "80g", sec: "80G", name: "Donations to Charitable Funds", desc: "Subject to qualifying limit & institution category", limit: "Varies", icon: <Heart size={20} color="#FF4444" /> },
    { id: "80tta", sec: "80TTA", name: "Savings Bank Interest", desc: "For Non-Senior citizens", limit: "₹10,000", icon: <Info size={20} color="#00E5A0" /> },
    { id: "80u", sec: "80U", name: "Person with Disability", desc: "Self disability deduction", limit: "₹1,25,000", icon: <Info size={20} color="#FFB800" /> },
];

export default function OtherDeductions() {
    const [values, setValues] = useState<Record<string, string>>({
        "80tta": "8,500"
    });

    const totalDeductions = Object.values(values).reduce((acc, curr) => acc + (parseInt(curr.replace(/,/g, '')) || 0), 0);

    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax/declaration/EMP-0848" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Other Exemptions & Deductions</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Chapter VI-A sections apart from 80C, 80D, etc.</div>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>

                {/* Form Area */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {OTHER_DEDUCTIONS.map(item => (
                        <div key={item.id} style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: "20px 24px", display: "flex", gap: 20 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#060B14", border: "1px solid #1A2A3A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {item.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                    <div>
                                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 4 }}>Section {item.sec} - {item.name}</h3>
                                        <div style={{ fontSize: 13, color: "#8899AA" }}>{item.desc} | <span style={{ color: "#00E5A0" }}>Max Limit: {item.limit}</span></div>
                                    </div>
                                </div>
                                <div style={{ width: 220, position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input
                                        type="text"
                                        value={values[item.id] || ""}
                                        onChange={(e) => setValues({ ...values, [item.id]: e.target.value })}
                                        placeholder="0"
                                        style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 15, paddingLeft: 28, paddingRight: 12, outline: "none" }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Sticky Summary */}
                <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Deduction Totals</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                            {OTHER_DEDUCTIONS.map(item => {
                                const val = parseInt(values[item.id] || '0'.replace(/,/g, '')) || 0;
                                if (val === 0) return null;
                                return (
                                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                        <span style={{ color: "#8899AA" }}>Sec {item.sec}</span>
                                        <span style={{ color: "#FFFFFF", fontWeight: 500 }}>₹{val.toLocaleString()}</span>
                                    </div>
                                )
                            })}
                            {totalDeductions === 0 && (
                                <div style={{ fontSize: 13, color: "#8899AA", fontStyle: "italic" }}>No amounts declared yet.</div>
                            )}
                            <div style={{ borderTop: "1px solid #1A2A3A", paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 600 }}>Total Additional</span>
                                <span style={{ fontSize: 20, color: "#00E5A0", fontWeight: 700 }}>₹{totalDeductions.toLocaleString()}</span>
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
