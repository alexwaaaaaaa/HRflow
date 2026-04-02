"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Download, Printer, Share2, FileSignature, CheckCircle2 } from "lucide-react";

export default function Form12BBDeclaration() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 900, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax/declaration/EMP-0848" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Form 12BB</h1>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:bg-[#1A2A3A]">
                        <Printer size={14} /> Print
                    </button>
                    <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:bg-[#1A2A3A]">
                        <Share2 size={14} /> Share
                    </button>
                    <button style={{ height: 36, padding: "0 16px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:opacity-90">
                        <Download size={14} /> PDF
                    </button>
                </div>
            </div>

            {/* Simulated Paper A4 */}
            <div style={{ background: "#FFFFFF", borderRadius: 4, padding: "48px 64px", color: "#000000", fontFamily: "sans-serif", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>

                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 4 }}>FORM NO. 12BB</h2>
                    <div style={{ fontSize: 14 }}>(See rule 26C)</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 12 }}>Statement showing particulars of claims by an employee for deduction of tax under section 192</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px", fontSize: 13, marginBottom: 32 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #DDDDDD", paddingBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>1. Name and address of the employee:</span>
                    </div>
                    <div>
                        <div style={{ fontWeight: 700 }}>Rahul Kumar Sharma</div>
                        <div>A-204, Green Valley Apts, Kothrud, Pune 411038</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #DDDDDD", paddingBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>2. Permanent Account Number of the employee:</span>
                    </div>
                    <div style={{ fontWeight: 700 }}>ABCDE1234F</div>

                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #DDDDDD", paddingBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>3. Financial year:</span>
                    </div>
                    <div style={{ fontWeight: 700 }}>2024-2025</div>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, border: "1px solid #000" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #000", padding: 8, textAlign: "left", width: "40px" }}>Sl. No.</th>
                            <th style={{ border: "1px solid #000", padding: 8, textAlign: "left" }}>Nature of claim</th>
                            <th style={{ border: "1px solid #000", padding: 8, textAlign: "right", width: "120px" }}>Amount (Rs.)</th>
                            <th style={{ border: "1px solid #000", padding: 8, textAlign: "left" }}>Evidence / particulars</th>
                        </tr>
                        <tr style={{ fontSize: 11, fontStyle: "italic", background: "#F5F5F5" }}>
                            <td style={{ border: "1px solid #000", padding: 4, textAlign: "center" }}>(1)</td>
                            <td style={{ border: "1px solid #000", padding: 4, textAlign: "center" }}>(2)</td>
                            <td style={{ border: "1px solid #000", padding: 4, textAlign: "center" }}>(3)</td>
                            <td style={{ border: "1px solid #000", padding: 4, textAlign: "center" }}>(4)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* HRA */}
                        <tr>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>(1)</td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>
                                <div style={{ fontWeight: 600, marginBottom: 8 }}>House Rent Allowance</div>
                                <div>(i) Rent paid to the landlord</div>
                                <div>(ii) Name of the landlord</div>
                                <div>(iii) Address of the landlord</div>
                                <div>(iv) Permanent Account Number of the landlord<br />(if rent payment exceeds Rs. 1 lakh per annum)</div>
                            </td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top", textAlign: "right" }}>
                                <br />3,00,000<br /><br /><br />
                            </td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>
                                <br />
                                <div style={{ borderBottom: "1px dotted #000", paddingBottom: 2, marginBottom: 4 }}>Mr. Vivek Deshmukh</div>
                                <div style={{ borderBottom: "1px dotted #000", paddingBottom: 2, marginBottom: 4 }}>B-10, Vasant Vihar, Pune</div>
                                <div style={{ borderBottom: "1px dotted #000", paddingBottom: 2, marginBottom: 4 }}>XYZA9876Q</div>
                                Rent Receipts Attached
                            </td>
                        </tr>

                        {/* LTA */}
                        <tr>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>(2)</td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>
                                <div style={{ fontWeight: 600 }}>Leave travel concessions or assistance</div>
                            </td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top", textAlign: "right" }}>NIL</td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>—</td>
                        </tr>

                        {/* Home Loan */}
                        <tr>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>(3)</td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>
                                <div style={{ fontWeight: 600, marginBottom: 8 }}>Deduction of interest on borrowing</div>
                                <div>(i) Interest payable/paid to the lender</div>
                                <div>(ii) Name of the lender</div>
                                <div>(iii) Address of the lender</div>
                                <div>(iv) Permanent Account Number of the lender</div>
                            </td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top", textAlign: "right" }}>NIL</td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>—</td>
                        </tr>

                        {/* Chapter VI-A */}
                        <tr>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>(4)</td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>
                                <div style={{ fontWeight: 600, marginBottom: 8 }}>Chapter VI-A Deductions</div>
                                <div style={{ fontWeight: 600 }}>(A) Section 80C, 80CCC and 80CCD</div>
                                <div style={{ paddingLeft: 16 }}>- Public Provident Fund (PPF)</div>
                                <div style={{ paddingLeft: 16 }}>- Life Insurance Premium</div>
                                <div style={{ paddingLeft: 16 }}>- ELSS Mutual Funds</div>
                                <div style={{ fontWeight: 600, marginTop: 8 }}>(B) Other sections under Chapter VI-A</div>
                                <div style={{ paddingLeft: 16 }}>- Section 80D (Health Insurance)</div>
                            </td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top", textAlign: "right" }}>
                                <br /><br />
                                50,000<br />
                                30,000<br />
                                40,000<br />
                                <br />
                                18,000
                            </td>
                            <td style={{ border: "1px solid #000", padding: 8, verticalAlign: "top" }}>
                                <br /><br />
                                Receipt Attached<br />
                                Policy Document<br />
                                Account Statement<br />
                                <br />
                                Policy & Premium Receipt
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ marginTop: 48, marginBottom: 24, textAlign: "center", fontWeight: 700, fontSize: 16 }}>Verification</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, textAlign: "justify" }}>
                    I, <strong>Rahul Kumar Sharma</strong>, son/daughter of <strong>Suresh Sharma</strong> do hereby certify that the information given above is complete and correct.
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48 }}>
                    <div>
                        <div style={{ marginBottom: 8 }}>Place: <strong>Pune</strong></div>
                        <div>Date: <strong>{new Date().toLocaleDateString('en-IN')}</strong></div>
                    </div>
                    <div style={{ textAlign: "center", width: 250 }}>
                        <div style={{ height: 60, borderBottom: "1px solid #000", position: "relative" }}>
                            <div style={{ position: "absolute", bottom: -10, left: -20, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#00E5A0" }}>
                                <FileSignature size={32} />
                                <span style={{ fontSize: 12, fontWeight: 700, color: "#00E5A0", border: "1px solid #00E5A0", padding: "2px 6px", borderRadius: 4, transform: "rotate(-10deg)" }}>Digitally Signed</span>
                            </div>
                        </div>
                        <div style={{ marginTop: 8 }}>(Signature of employee)</div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div style={{ position: "fixed", bottom: 0, left: "260px", right: 0, background: "#060B14", borderTop: "1px solid #1A2A3A", padding: "16px 32px", display: "flex", justifyContent: "flex-end", gap: 16, zIndex: 10 }}>
                <button style={{ height: 44, padding: "0 24px", background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.3)", borderRadius: 8, color: "#00E5A0", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} /> Mark as Verified by HR
                </button>
                <button style={{ height: 44, padding: "0 24px", background: "#0066FF", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 700, cursor: "pointer" }} className="hover:opacity-90">
                    Send to Employee for e-Sign
                </button>
            </div>

        </div>
    );
}
