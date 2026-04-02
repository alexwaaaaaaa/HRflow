"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, UploadCloud, FileText, X } from "lucide-react";

const REQUIRED_PROOFS = [
    { id: "p1", section: "80C", name: "PPF Contribution", declared: "₹50,000", status: "Uploaded", file: "ppf_statement_24_25.pdf", approved: null },
    { id: "p2", section: "80C", name: "LIC Premium", declared: "₹30,000", status: "Pending", file: null, approved: null },
    { id: "p3", section: "HRA", name: "Rent Receipts (Apr-Sep)", declared: "₹1,50,000", status: "Rejected", file: "rent_apr_sep.pdf", approved: false, reason: "Signature missing on receipt #3" },
    { id: "p4", section: "80D", name: "Health Insurance Premium", declared: "₹18,000", status: "Approved", file: "health_ins_star.pdf", approved: true },
    { id: "p5", section: "80CCD(1B)", name: "NPS Tier 1", declared: "₹50,000", status: "Pending", file: null, approved: null },
];

export default function ProofUpload() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Investment Proof Submission</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Upload documents to support your FY 2024-25 tax declarations</div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: "20px 24px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 600, marginBottom: 4 }}>Submission Deadline: <span style={{ color: "#FF4444" }}>31 Jan 2025</span></div>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Failure to submit proofs will result in higher TDS deduction in Mar 2025.</div>
                </div>
                <div style={{ display: "flex", gap: 24 }}>
                    <div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 4 }}>Total Required</div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF" }}>5</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 4 }}>Uploaded</div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "#00E5A0" }}>1</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 4 }}>Pending</div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "#FFB800" }}>4</div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", color: "#8899AA", fontSize: 12, textAlign: "left" }}>
                            <th style={{ padding: "16px 24px", fontWeight: 500 }}>Section / Category</th>
                            <th style={{ padding: "16px", fontWeight: 500 }}>Declared Amount</th>
                            <th style={{ padding: "16px", fontWeight: 500 }}>Proof Document</th>
                            <th style={{ padding: "16px", fontWeight: 500 }}>Status</th>
                            <th style={{ padding: "16px 24px", fontWeight: 500, textAlign: "right" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {REQUIRED_PROOFS.map(proof => (
                            <tr key={proof.id} style={{ borderBottom: "1px solid #1A2A3A" }}>
                                <td style={{ padding: "16px 24px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>{proof.name}</div>
                                    <div style={{ fontSize: 12, color: "#0066FF", background: "rgba(0,102,255,0.1)", padding: "2px 6px", borderRadius: 4, display: "inline-block" }}>{proof.section}</div>
                                </td>
                                <td style={{ padding: "16px", fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>{proof.declared}</td>
                                <td style={{ padding: "16px" }}>
                                    {proof.file ? (
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8899AA" }}>
                                            <FileText size={16} color="#0066FF" />
                                            {proof.file}
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: 13, color: "#445566", fontStyle: "italic" }}>No file uploaded</div>
                                    )}
                                </td>
                                <td style={{ padding: "16px" }}>
                                    {proof.status === "Pending" && <span style={{ fontSize: 12, background: "rgba(255,184,0,0.1)", color: "#FFB800", padding: "4px 8px", borderRadius: 4, fontWeight: 500 }}>{proof.status}</span>}
                                    {proof.status === "Uploaded" && <span style={{ fontSize: 12, background: "rgba(0,102,255,0.1)", color: "#0066FF", padding: "4px 8px", borderRadius: 4, fontWeight: 500 }}>{proof.status} (In Review)</span>}
                                    {proof.status === "Approved" && <span style={{ fontSize: 12, background: "rgba(0,229,160,0.1)", color: "#00E5A0", padding: "4px 8px", borderRadius: 4, fontWeight: 500 }}>{proof.status}</span>}
                                    {proof.status === "Rejected" && (
                                        <div>
                                            <span style={{ fontSize: 12, background: "rgba(255,68,68,0.1)", color: "#FF4444", padding: "4px 8px", borderRadius: 4, fontWeight: 500 }}>{proof.status}</span>
                                            <div style={{ fontSize: 11, color: "#FF4444", marginTop: 4, maxWidth: 150 }}>{proof.reason}</div>
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: "16px 24px", textAlign: "right" }}>
                                    {proof.status === "Pending" || proof.status === "Rejected" ? (
                                        <Link href={`/tax/ocr-preview/${proof.id}`}>
                                            <button style={{ height: 32, padding: "0 16px", background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.3)", borderRadius: 6, color: "#00E5A0", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }} className="hover:bg-[#00E5A0]/20">
                                                <UploadCloud size={14} /> Upload
                                            </button>
                                        </Link>
                                    ) : (
                                        <button style={{ height: 32, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, fontWeight: 500, cursor: "pointer" }} className="hover:bg-[#1A2A3A]">
                                            View
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
}
