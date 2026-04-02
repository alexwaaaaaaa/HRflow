"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Zap, CheckCircle2, FileText } from "lucide-react";

export default function OCRPreview() {
    const [status, setStatus] = useState<"uploading" | "scanning" | "done">("done");

    return (
        <div style={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>

            <div style={{ padding: "16px 32px", borderBottom: "1px solid #1A2A3A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax/proof-upload/EMP-0848" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>LIC Premium Proof</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>Section 80C • Declared: ₹30,000</div>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

                {/* Left side: Document Preview */}
                <div style={{ flex: 1, background: "#060B14", borderRight: "1px solid #1A2A3A", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1A2A3A" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#FFFFFF" }}>
                            <FileText size={16} color="#0066FF" /> lic_premium_receipt.pdf
                        </div>
                        <button style={{ background: "transparent", border: "1px solid #1A2A3A", color: "#8899AA", fontSize: 12, padding: "4px 12px", borderRadius: 4, cursor: "pointer" }}>Change File</button>
                    </div>
                    <div style={{ flex: 1, padding: 32, display: "flex", justifyContent: "center", overflow: "auto" }}>
                        {/* Fake Document Mockup */}
                        <div style={{ width: 600, height: 800, background: "#FFFFFF", borderRadius: 4, padding: 48, color: "#000", fontFamily: "serif", position: "relative" }}>

                            {/* OCR Highlight overlays */}
                            <div style={{ position: "absolute", top: 116, left: 44, right: 44, height: 28, background: "rgba(0,229,160,0.2)", border: "1px solid #00E5A0", borderRadius: 4 }} />
                            <div style={{ position: "absolute", top: 196, left: 244, width: 150, height: 28, background: "rgba(0,229,160,0.2)", border: "1px solid #00E5A0", borderRadius: 4 }} />
                            <div style={{ position: "absolute", top: 316, left: 244, width: 120, height: 28, background: "rgba(0,229,160,0.2)", border: "1px solid #00E5A0", borderRadius: 4 }} />

                            <h2 style={{ textAlign: "center", marginBottom: 40, color: "#000", fontSize: 24 }}>Life Insurance Corporation of India</h2>
                            <h3 style={{ textAlign: "center", marginBottom: 32, textDecoration: "underline", fontSize: 16 }}>RENEWAL PREMIUM RECEIPT</h3>

                            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "16px" }}>
                                <strong>Policy Holder:</strong> <span>Rahul Kumar Sharma</span>
                                <strong>Policy Number:</strong> <span>887766554</span>
                                <strong>Date of Issuance:</strong> <span>15/05/2024</span>
                                <strong>Plan Details:</strong> <span>Jeevan Anand (149)</span>
                                <strong>Premium Paid:</strong> <span>₹ 30,000.00</span>
                                <strong>Mode of Payment:</strong> <span>Yearly</span>
                            </div>

                            <div style={{ position: "absolute", bottom: 48, right: 48, textAlign: "right" }}>
                                <div style={{ marginBottom: 4 }}>Authorized Signatory</div>
                                <div style={{ color: "#0066FF", fontStyle: "italic", fontWeight: "bold", fontSize: 20 }}>LIC India</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: OCR Extraction */}
                <div style={{ width: 400, background: "#0D1928", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: 24, borderBottom: "1px solid #1A2A3A" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Zap size={16} color="#00E5A0" />
                            </div>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>HRFlow AI Scanner</h3>
                        </div>
                        <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                            We have auto-extracted the details from your document. Please verify them before submitting.
                        </div>
                    </div>

                    <div style={{ padding: 24, flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 20 }}>

                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 6 }}>Provider / Entity Name</label>
                            <input type="text" value="Life Insurance Corporation of India" readOnly style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #00E5A0", borderRadius: 6, color: "#FFFFFF", fontSize: 14, padding: "0 12px", outline: "none" }} />
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 6 }}>Amount Paid</label>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <input type="text" value="30,000" readOnly style={{ flex: 1, height: 40, background: "#060B14", border: "1px solid #00E5A0", borderRadius: 6, color: "#FFFFFF", fontSize: 14, padding: "0 12px", outline: "none" }} />
                                <div style={{ fontSize: 12, color: "#00E5A0", display: "flex", alignItems: "center", gap: 4 }}><CheckCircle2 size={14} /> Matches declaration</div>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 6 }}>Date of Payment</label>
                            <input type="text" value="15-May-2024" readOnly style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #00E5A0", borderRadius: 6, color: "#FFFFFF", fontSize: 14, padding: "0 12px", outline: "none" }} />
                            <div style={{ fontSize: 11, color: "#8899AA", marginTop: 6 }}>Falls within FY 2024-25</div>
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 6 }}>Policy / Ref Number</label>
                            <input type="text" value="887766554" readOnly style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #00E5A0", borderRadius: 6, color: "#FFFFFF", fontSize: 14, padding: "0 12px", outline: "none" }} />
                        </div>

                    </div>

                    <div style={{ padding: 24, borderTop: "1px solid #1A2A3A", background: "#0A1420" }}>
                        <Link href="/tax/proof-upload/EMP-0848" style={{ display: "block" }}>
                            <button style={{ width: "100%", height: 44, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} className="hover:opacity-90">
                                Confirm & Submit Proof
                            </button>
                        </Link>
                        <button style={{ width: "100%", height: 44, background: "transparent", border: "1px solid transparent", borderRadius: 8, color: "#8899AA", fontSize: 14, fontWeight: 500, cursor: "pointer", marginTop: 8 }} className="hover:text-[#FFFFFF]">
                            Edit Details Manually
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}
