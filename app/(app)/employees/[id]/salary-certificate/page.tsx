"use client";

import { use } from "react";
import Link from "next/link";
import { Download, CheckCircle2, Send } from "lucide-react";

export default function SalaryCertificate({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const empId = resolvedParams.id;

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 0 80px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <Link href={`/employees/${empId}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12 }}>Salary Certificate</h2>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:border-[#445566]">
                        <Send size={14} /> Email to Employee
                    </button>
                    <button style={{ height: 40, padding: "0 16px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <Download size={14} /> Download PDF
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>

                {/* Document View */}
                <div style={{ background: "#FFFFFF", borderRadius: 8, padding: "60px 48px", color: "#000", fontFamily: "'Times New Roman', Times, serif", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", minHeight: 800 }}>

                    {/* Letterhead */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #000", paddingBottom: 24, marginBottom: 40 }}>
                        <div>
                            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>TechCorp</div>
                            <div style={{ fontSize: 14, color: "#444", marginTop: 4 }}>Solutions Pvt. Ltd.</div>
                        </div>
                        <div style={{ textAlign: "right", fontSize: 12, lineHeight: 1.6, color: "#444" }}>
                            123 Tech Park, Tower A,<br />
                            Bengaluru, Karnataka 560100<br />
                            PAN: ABCDE1234F • GSTIN: 29ABCDE1234F1Z5
                        </div>
                    </div>

                    <div style={{ textAlign: "center", fontSize: 18, fontWeight: 700, textDecoration: "underline", marginBottom: 40 }}>
                        TO WHOMSOEVER IT MAY CONCERN
                    </div>

                    <div style={{ fontSize: 15, lineHeight: 2, marginBottom: 40 }}>
                        This is to certify that <strong>Mr. Rahul Sharma</strong> (Employee ID: {empId}) is a bona fide employee of TechCorp Solutions Pvt Ltd. He has been working with us since <strong>15th November 2021</strong> and is currently designated as a <strong>Senior Software Engineer</strong>.
                        <br /><br />
                        As per our records, his current Annual Cost to Company (CTC) is <strong>₹12,00,000/- (Rupees Twelve Lakhs Only)</strong>. The monthly breakup of his gross salary is as follows:
                    </div>

                    <table style={{ width: "80%", margin: "0 auto 40px", borderCollapse: "collapse", fontSize: 14 }}>
                        <tbody>
                            {[
                                { k: "Basic Salary", v: "₹40,000" },
                                { k: "House Rent Allowance (HRA)", v: "₹20,000" },
                                { k: "Special Allowance", v: "₹30,000" },
                                { k: "Leave Travel Allowance (LTA)", v: "₹5,000" },
                                { k: "PF Employer Contribution", v: "₹5,000" },
                            ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: "1px solid #CCC" }}>
                                    <td style={{ padding: "8px 0" }}>{row.k}</td>
                                    <td style={{ padding: "8px 0", textAlign: "right", fontWeight: 600 }}>{row.v}</td>
                                </tr>
                            ))}
                            <tr>
                                <td style={{ padding: "12px 0", fontWeight: 700, fontSize: 16 }}>Total Monthly Gross</td>
                                <td style={{ padding: "12px 0", textAlign: "right", fontWeight: 700, fontSize: 16 }}>₹1,00,000</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{ fontSize: 15, lineHeight: 2, marginBottom: 60 }}>
                        This certificate is issued exclusively upon the request of the employee for the purpose of opening a bank account / applying for a loan / processing a visa, and does not hold the company responsible for any financial liabilities.
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <div>
                            <div style={{ marginBottom: 8 }}>For <strong>TechCorp Solutions Pvt Ltd</strong></div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" alt="Signature" style={{ height: 60, opacity: 0.8 }} />
                            <div style={{ marginTop: 8, fontWeight: 600 }}>Priya Mehta</div>
                            <div style={{ fontSize: 14, color: "#444" }}>Authorized Signatory, HR</div>
                        </div>
                        <div style={{ textAlign: "right", fontSize: 14 }}>
                            Date: {new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}<br />
                            Place: Bengaluru
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Certificate Options</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Purpose of Issue</label>
                                <select style={{ width: "100%", height: 38, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 13, outline: "none" }}>
                                    <option>Bank Loan Application</option>
                                    <option>Visa / Immigration</option>
                                    <option>Opening Bank Account</option>
                                    <option>General Purpose</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Format Type</label>
                                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 8 }}>
                                    <input type="radio" name="fmt" defaultChecked style={{ accentColor: "#00E5A0" }} />
                                    <span style={{ fontSize: 13, color: "#FFFFFF" }}>With Detailed CTC Breakup</span>
                                </label>
                                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                                    <input type="radio" name="fmt" style={{ accentColor: "#00E5A0" }} />
                                    <span style={{ fontSize: 13, color: "#FFFFFF" }}>Gross Annual CTC Only</span>
                                </label>
                            </div>

                            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginTop: 8, background: "#0A1420", padding: 12, borderRadius: 8, border: "1px solid #1A2A3A" }}>
                                <input type="checkbox" defaultChecked style={{ accentColor: "#00E5A0", marginTop: 2, flexShrink: 0 }} />
                                <span style={{ fontSize: 12, color: "#8899AA", lineHeight: 1.4 }}>Include Digital Signature of Authorized Signatory</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 12, padding: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <CheckCircle2 color="#0066FF" size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{ fontSize: 12, color: "#0066FF", lineHeight: 1.5 }}>
                            This document is auto-generated based on the employee's current active payroll profile. Any recent revisions are already reflected.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
