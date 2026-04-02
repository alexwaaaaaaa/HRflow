"use client";

import React, { useState } from "react";
import { ArrowLeft, Send, Download } from "lucide-react";
import Link from "next/link";

export default function CTCLetterPage() {
    const [letterType, setLetterType] = useState("Offer");
    const [employee, setEmployee] = useState("Kavya Nair");
    const [template, setTemplate] = useState("Detailed");
    const [language, setLanguage] = useState("English");
    const [includeSign, setIncludeSign] = useState(true);
    const [includeStamp, setIncludeStamp] = useState(true);

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", display: "flex", gap: 32, flexDirection: "row", color: "#FFFFFF" }}>
            {/* LEFT PANEL */}
            <div style={{ flex: "0 0 480px", display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                    <Link href="/payroll" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Back to Payroll
                    </Link>
                    <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>CTC Letter Generation</h2>
                    <p style={{ color: "#8899AA", fontSize: 14, marginTop: 4 }}>Configure and generate official compensation letters.</p>
                </div>

                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                        <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Letter Type</label>
                        <select
                            value={letterType}
                            onChange={(e) => setLetterType(e.target.value)}
                            style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }}
                        >
                            <option value="Offer">Offer Letter</option>
                            <option value="Revision">Revision Letter</option>
                            <option value="Appointment">Appointment Letter</option>
                            <option value="Increment">Increment Letter</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Employee</label>
                        <input type="text" value={employee} onChange={(e) => setEmployee(e.target.value)} style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }} placeholder="Search employee..." />
                    </div>

                    <div style={{ background: "#0D1928", padding: 16, borderRadius: 8, border: "1px solid #1A2A3A" }}>
                        <h4 style={{ fontSize: 12, color: "#8899AA", margin: "0 0 12px 0", textTransform: "uppercase" }}>System Data</h4>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <span style={{ fontSize: 14, color: "#8899AA" }}>Current CTC</span>
                            <span style={{ fontSize: 14, fontWeight: 500 }}>₹9,60,000</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <span style={{ fontSize: 14, color: "#8899AA" }}>Revised CTC</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0" }}>₹12,00,000</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 14, color: "#8899AA" }}>Effective Date</span>
                            <span style={{ fontSize: 14, fontWeight: 500 }}>01/04/2025</span>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Template Layout</label>
                        <div style={{ display: "flex", gap: 12 }}>
                            {["Standard", "Detailed", "Minimal"].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTemplate(t)}
                                    style={{ flex: 1, height: 36, background: template === t ? "#00E5A020" : "#0D1928", border: `1px solid ${template === t ? "#00E5A0" : "#1A2A3A"}`, color: template === t ? "#00E5A0" : "#8899AA", borderRadius: 8, fontSize: 13, cursor: "pointer" }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 16 }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Signatory Name</label>
                            <input type="text" defaultValue="Vikram Mehta" style={{ width: "100%", height: 36, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Designation</label>
                            <input type="text" defaultValue="Finance Manager" style={{ width: "100%", height: 36, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }} />
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
                            <input type="checkbox" checked={includeSign} onChange={(e) => setIncludeSign(e.target.checked)} style={{ accentColor: "#00E5A0" }} />
                            Include Digital Signature
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
                            <input type="checkbox" checked={includeStamp} onChange={(e) => setIncludeStamp(e.target.checked)} style={{ accentColor: "#00E5A0" }} />
                            Include Company Stamp
                        </label>
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Language</label>
                        <div style={{ display: "flex", gap: 16, fontSize: 14 }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                                <input type="radio" name="lang" checked={language === "English"} onChange={() => setLanguage("English")} style={{ accentColor: "#00E5A0" }} /> English
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: "#8899AA" }}>
                                <input type="radio" name="lang" checked={language === "Hindi"} onChange={() => setLanguage("Hindi")} style={{ accentColor: "#00E5A0" }} /> Hindi (Beta)
                            </label>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ flex: 1, height: 44, background: "#00E5A0", color: "#060B14", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <Download size={16} /> Generate PDF
                    </button>
                    <button style={{ flex: 1, height: 44, background: "#1A2A3A", color: "#FFFFFF", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <Send size={16} /> Send via Email
                    </button>
                </div>
            </div>

            {/* RIGHT PANEL - A4 PREVIEW */}
            <div style={{ flex: 1, background: "#E8ECEF", borderRadius: 16, padding: "32px", display: "flex", justifyContent: "center", overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}>

                {/* A4 Paper */}
                <div style={{ width: "210mm", minHeight: "297mm", background: "#FFFFFF", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", padding: "40mm 25mm", color: "#333333", fontSize: "14px", lineHeight: "1.6", fontFamily: "serif", position: "relative" }}>

                    {/* Header */}
                    <div style={{ borderBottom: "2px solid #0055FF", paddingBottom: "20px", marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <div>
                            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0055FF", letterSpacing: "-0.5px" }}>HRFlow Corp.</div>
                            <div style={{ fontSize: "12px", color: "#666" }}>123 Tech Park, Bengaluru, KA 560001</div>
                        </div>
                        <div style={{ fontSize: "12px", color: "#666", textAlign: "right" }}>
                            Date: April 01, 2025<br />
                            Ref: HRF/REV/2025/1042
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ fontWeight: "bold", marginBottom: "20px" }}>Private & Confidential</div>

                    <div style={{ marginBottom: "30px" }}>
                        To,<br />
                        <strong>{employee || "[Employee Name]"}</strong><br />
                        Emp ID: EMP-0091<br />
                        Engineering Department
                    </div>

                    <div style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "30px", textAlign: "center", fontSize: "16px" }}>
                        Subject: {letterType} Letter - Salary Revision
                    </div>

                    <p style={{ marginBottom: "20px" }}>Dear {employee ? employee.split(" ")[0] : "[First Name]"},</p>

                    <p style={{ marginBottom: "20px", textAlign: "justify" }}>
                        Following our recent performance appraisal cycle, we are pleased to inform you that your compensation has been revised. Your hard work and dedication to HRFlow have been truly appreciated over the past year.
                    </p>

                    <p style={{ marginBottom: "30px", textAlign: "justify" }}>
                        Your revised Total Cost to Company (CTC) will be <strong>₹12,00,000 (Rupees Twelve Lakhs Only)</strong> per annum, effective from <strong>April 01, 2025</strong>.
                        {template === "Detailed" ? " Please find the detailed breakup of your compensation structure attached below." : " The annexure detailing your components will be shared separately."}
                    </p>

                    {template === "Detailed" && (
                        <div style={{ marginBottom: "40px" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                                <thead>
                                    <tr style={{ background: "#F4F6F8", borderTop: "1px solid #CCC", borderBottom: "1px solid #CCC" }}>
                                        <th style={{ padding: "8px 12px", textAlign: "left" }}>Salary Component</th>
                                        <th style={{ padding: "8px 12px", textAlign: "right" }}>Monthly (₹)</th>
                                        <th style={{ padding: "8px 12px", textAlign: "right" }}>Annual (₹)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: "1px solid #EEE" }}>
                                        <td style={{ padding: "8px 12px" }}>Basic Salary</td>
                                        <td style={{ padding: "8px 12px", textAlign: "right" }}>50,000</td>
                                        <td style={{ padding: "8px 12px", textAlign: "right" }}>6,00,000</td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid #EEE" }}>
                                        <td style={{ padding: "8px 12px" }}>House Rent Allowance</td>
                                        <td style={{ padding: "8px 12px", textAlign: "right" }}>25,000</td>
                                        <td style={{ padding: "8px 12px", textAlign: "right" }}>3,00,000</td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid #EEE" }}>
                                        <td style={{ padding: "8px 12px" }}>Special Allowance</td>
                                        <td style={{ padding: "8px 12px", textAlign: "right" }}>20,833</td>
                                        <td style={{ padding: "8px 12px", textAlign: "right" }}>2,50,000</td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid #EEE" }}>
                                        <td style={{ padding: "8px 12px" }}>Employer PF Contribution</td>
                                        <td style={{ padding: "8px 12px", textAlign: "right" }}>4,167</td>
                                        <td style={{ padding: "8px 12px", textAlign: "right" }}>50,000</td>
                                    </tr>
                                    <tr style={{ borderTop: "2px solid #CCC", borderBottom: "2px solid #CCC", fontWeight: "bold", background: "#FAFAFA" }}>
                                        <td style={{ padding: "8px 12px" }}>Total Cost to Company (CTC)</td>
                                        <td style={{ padding: "8px 12px", textAlign: "right" }}>1,00,000</td>
                                        <td style={{ padding: "8px 12px", textAlign: "right" }}>12,00,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    <p style={{ marginBottom: "40px", textAlign: "justify" }}>
                        All other terms and conditions of your employment remain unchanged. We look forward to your continued contribution to the company's success.
                    </p>

                    <p style={{ marginBottom: "60px" }}>Yours sincerely,</p>

                    {/* Signature Block */}
                    <div style={{ position: "relative" }}>
                        {includeSign && (
                            <div style={{ position: "absolute", top: "-40px", left: "10px", opacity: 0.8 }}>
                                <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 40C35 40 40 20 45 35C48 45 42 50 38 45C33 35 55 15 65 30C75 45 70 50 80 40C90 30 100 25 110 35" stroke="#0033A0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        )}
                        {includeStamp && (
                            <div style={{ position: "absolute", top: "-60px", left: "120px", opacity: 0.4 }}>
                                <div style={{ width: "80px", height: "80px", border: "3px solid #D00", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#D00", fontWeight: "bold", fontSize: "10px", textAlign: "center", transform: "rotate(-15deg)" }}>
                                    HRFLOW<br />AUTHORIZED
                                </div>
                            </div>
                        )}
                        <div style={{ fontWeight: "bold" }}>Vikram Mehta</div>
                        <div style={{ fontSize: "12px", color: "#666" }}>Finance Manager</div>
                        <div style={{ fontSize: "12px", color: "#666" }}>HRFlow Corp.</div>
                    </div>

                </div>
            </div>
        </div>
    );
}
