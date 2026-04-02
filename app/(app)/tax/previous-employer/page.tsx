"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Info, ArrowUpCircle } from "lucide-react";

export default function PreviousEmployerIncome() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 900, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Form 12B (Previous Employer)</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Declare income earned and TDS deducted by previous employers in FY 2024-25</div>
                    </div>
                </div>
            </div>

            <div style={{ background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 12, padding: 16, display: "flex", gap: 12, marginBottom: 24 }}>
                <Info size={20} color="#0066FF" style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                    If you joined Kaarya after 1st April 2024, you must declare your previous salary details using Form 12B. This ensures accurate TDS computation and prevents under-deduction of tax for the current financial year. Failure to do so will result in tax liability and penalty during personal ITR filing.
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32 }}>

                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Previous Employment Details</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                    <div style={{ gridColumn: "span 2" }}>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Company Name <span style={{ color: "#FF4444" }}>*</span></label>
                        <input type="text" placeholder="e.g. Infosys Limited" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 16, outline: "none" }} />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Company TAN</label>
                        <input type="text" placeholder="BLRI12345F" maxLength={10} style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 16, outline: "none", textTransform: "uppercase" }} />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>PAN of Previous Employer</label>
                        <input type="text" placeholder="ABCDE1234F" maxLength={10} style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 16, outline: "none", textTransform: "uppercase" }} />
                    </div>
                </div>

                <div style={{ borderTop: "1px dashed #1A2A3A", margin: "24px 0" }} />

                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Income & Tax Profile</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Gross Salary Paid <span style={{ color: "#FF4444" }}>*</span></label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                            <input type="text" placeholder="0" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 28, outline: "none" }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>TDS Deducted <span style={{ color: "#FF4444" }}>*</span></label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                            <input type="text" placeholder="0" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 28, outline: "none" }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Professional Tax Paid</label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                            <input type="text" placeholder="0" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 28, outline: "none" }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Provident Fund (EPF) Deducted</label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                            <input type="text" placeholder="0" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 28, outline: "none" }} />
                        </div>
                    </div>
                </div>

                <div style={{ padding: 16, background: "#060B14", border: "1px dashed #1A2A3A", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 24, cursor: "pointer" }} className="hover:border-[#0066FF]">
                    <ArrowUpCircle size={24} color="#0066FF" />
                    <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>Upload Previous Employer Form 16 or F&F Statement</div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>PDF, PNG, JPG up to 5MB</div>
                </div>

                <div style={{ borderTop: "1px solid #1A2A3A", paddingTop: 24, display: "flex", justifyContent: "flex-end", gap: 16 }}>
                    <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "none", color: "#8899AA", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                        Cancel
                    </button>
                    <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:opacity-90">
                        <Save size={16} /> Save Form 12B
                    </button>
                </div>

            </div>

        </div>
    );
}
