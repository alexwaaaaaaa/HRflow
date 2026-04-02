"use client";

import Link from "next/link";
import { ArrowLeft, Calculator, Code2, HelpCircle, Save } from "lucide-react";

export default function FormulaBuilder() {
    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px" }}>
            <div style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                    <Link href="/payroll-settings/components" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Back to Components
                    </Link>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Formula Builder: HRA</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>House Rent Allowance calculation logic for CTC structures.</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        Cancel
                    </button>
                    <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Save size={16} /> Save Formula
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
                {/* Editor Area */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", background: "#0A1420", borderBottom: "1px solid #1A2A3A" }}>
                            <Code2 size={18} color="#00E5A0" />
                            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Expression Editor</h3>
                        </div>
                        <div style={{ padding: 20 }}>
                            <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: 16, minHeight: 160, fontFamily: "monospace", fontSize: 14, color: "#FFFFFF", lineHeight: 1.6 }}>
                                <span style={{ color: "#0066FF" }}>if</span> (CityType == <span style={{ color: "#FFB800" }}>&apos;Metro&apos;</span>) {'{\n'}
                                <span style={{ paddingLeft: 20 }}>return Basic * <span style={{ color: "#00E5A0" }}>0.50</span>;\n</span>
                                {'} '} <span style={{ color: "#0066FF" }}>else</span> {'{\n'}
                                <span style={{ paddingLeft: 20 }}>return Basic * <span style={{ color: "#00E5A0" }}>0.40</span>;\n</span>
                                {'}'}
                            </div>
                            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                                <button style={{ height: 28, padding: "0 12px", background: "#1A2A3A", border: "none", borderRadius: 4, color: "#FFFFFF", fontSize: 12, cursor: "pointer", fontFamily: "monospace" }}>+ Basic</button>
                                <button style={{ height: 28, padding: "0 12px", background: "#1A2A3A", border: "none", borderRadius: 4, color: "#FFFFFF", fontSize: 12, cursor: "pointer", fontFamily: "monospace" }}>+ Gross</button>
                                <button style={{ height: 28, padding: "0 12px", background: "#1A2A3A", border: "none", borderRadius: 4, color: "#FFFFFF", fontSize: 12, cursor: "pointer", fontFamily: "monospace" }}>if ... else</button>
                                <button style={{ height: 28, padding: "0 12px", background: "#1A2A3A", border: "none", borderRadius: 4, color: "#FFFFFF", fontSize: 12, cursor: "pointer", fontFamily: "monospace" }}>Math.min()</button>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <Calculator size={18} color="#0066FF" />
                            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Test Formula</h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                            <div>
                                <label style={{ fontSize: 13, color: "#8899AA", display: "block", marginBottom: 6 }}>Basic Salary Input</label>
                                <input type="number" defaultValue="40000" style={{ width: "100%", height: 38, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 13, color: "#8899AA", display: "block", marginBottom: 6 }}>City Type</label>
                                <select style={{ width: "100%", height: 38, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                                    <option>Metro</option>
                                    <option>Non-Metro</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ background: "rgba(0,229,160,0.05)", border: "1px dashed rgba(0,229,160,0.3)", borderRadius: 8, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: 14, color: "#8899AA" }}>Result:</div>
                            <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>₹20,000</div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Variables */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Available Variables</h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            { name: "Basic", desc: "Basic Salary Value" },
                            { name: "Gross", desc: "Total Gross CTC" },
                            { name: "CityType", desc: "'Metro' or 'Non-Metro'" },
                            { name: "BaseDays", desc: "Total worked days" },
                            { name: "Age", desc: "Employee Age (for PT/TDS)" }
                        ].map(va => (
                            <div key={va.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottom: "1px solid #1A2A3A" }}>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", fontFamily: "monospace", display: "inline-block", background: "#1A2A3A", padding: "2px 6px", borderRadius: 4, marginBottom: 4 }}>{va.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{va.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 24, padding: 16, background: "rgba(0,102,255,0.05)", borderRadius: 8, border: "1px solid rgba(0,102,255,0.2)" }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <HelpCircle size={16} color="#0066FF" style={{ flexShrink: 0, marginTop: 2 }} />
                            <div style={{ fontSize: 12, color: "#8899AA", lineHeight: 1.5 }}>
                                Use JavaScript-like syntax. Use <span style={{ fontFamily: "monospace", color: "#FFFFFF" }}>Math.min(a,b)</span> for maximum limits or standard operators (<span style={{ fontFamily: "monospace", color: "#FFFFFF" }}>+, -, *, /</span>).
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
