"use client";

import React from "react";
import Link from "next/link";
import { Download, FileText, Lock, ChevronDown } from "lucide-react";

export default function EmployeeForm16() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 900, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>My Form 16</h1>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Download your digitally signed TDS certificates</div>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", height: 40, color: "#FFFFFF", fontSize: 14 }}>
                        FY 2024-25 <ChevronDown size={16} color="#8899AA" />
                    </div>
                </div>
            </div>

            <div style={{ background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 12, padding: "16px 24px", marginBottom: 32, display: "flex", gap: 16, alignItems: "center" }}>
                <Lock size={20} color="#0066FF" />
                <div style={{ fontSize: 14, color: "#8899AA", lineHeight: 1.5 }}>
                    Your downloaded Form 16 PDF is password protected. <br />
                    <strong style={{ color: "#FFFFFF" }}>Password:</strong> Your PAN Number in CAPITAL LETTERS followed by Date of Birth in DDMMYYYY format. <br />
                    Example: If PAN is ABCDE1234F and DOB is 15-May-1990, password is <strong>ABCDE1234F15051990</strong>.
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>

                {/* Current Year */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                        <div style={{ width: 48, height: 48, background: "rgba(0,229,160,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FileText size={24} color="#00E5A0" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 4 }}>Form 16 (Part A & B)</h3>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>Financial Year 2024-25 (Assessment Year 2025-26)</div>
                            <div style={{ fontSize: 12, color: "#00E5A0", marginTop: 8 }}>Generated on 15 May 2025</div>
                        </div>
                    </div>
                    <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:opacity-90">
                        <Download size={16} /> Download PDF
                    </button>
                </div>

                {/* Previous Years Archive */}
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", marginTop: 32, marginBottom: 16 }}>Archive</h3>

                <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 12, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div style={{ width: 40, height: 40, background: "#1A2A3A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FileText size={20} color="#8899AA" />
                        </div>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF", marginBottom: 2 }}>Form 16 (FY 2023-24)</div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Assessment Year 2024-25</div>
                        </div>
                    </div>
                    <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:bg-[#1A2A3A]">
                        <Download size={14} /> PDF
                    </button>
                </div>

                <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 12, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div style={{ width: 40, height: 40, background: "#1A2A3A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FileText size={20} color="#8899AA" />
                        </div>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF", marginBottom: 2 }}>Form 16 (FY 2022-23)</div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Assessment Year 2023-24</div>
                        </div>
                    </div>
                    <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:bg-[#1A2A3A]">
                        <Download size={14} /> PDF
                    </button>
                </div>

            </div>

        </div>
    );
}
