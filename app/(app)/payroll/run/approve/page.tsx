"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, FileText, Download, ShieldCheck, Users } from "lucide-react";

export default function ApprovePayroll() {
    const [agreed, setAgreed] = useState(false);

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px 80px" }}>
            {/* Wizard Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                {[
                    { label: "Select Month", state: "done" },
                    { label: "Attendance Lock", state: "done" },
                    { label: "Employee Summary", state: "done" },
                    { label: "Review Gross", state: "done" },
                    { label: "Review Deductions", state: "done" },
                    { label: "Review Net", state: "done" },
                    { label: "Approve", state: "active" },
                    { label: "Disburse", state: "pending" }
                ].map((step, i, arr) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", position: "relative" }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: step.state === "done" ? "#00E5A0" : step.state === "active" ? "rgba(0,229,160,0.2)" : "#1A2A3A", display: "flex", alignItems: "center", justifyContent: "center", color: step.state === "done" ? "#060B14" : step.state === "active" ? "#00E5A0" : "#445566", fontSize: 12, fontWeight: 700, border: step.state === "active" ? "1px solid #00E5A0" : "none", boxShadow: step.state === "active" ? "0 0 10px rgba(0,229,160,0.3)" : "none", zIndex: 2 }}>
                                {step.state === "done" ? <CheckCircle2 size={14} /> : i + 1}
                            </div>
                            <div style={{ fontSize: 11, color: step.state === "pending" ? "#445566" : "#FFFFFF", textAlign: "center", fontWeight: step.state === "active" ? 600 : 400, position: "absolute", top: 32, width: 80 }}>{step.label}</div>
                        </div>
                        {i < arr.length - 1 && (
                            <div style={{ height: 2, background: step.state === "done" ? "#00E5A0" : "#1A2A3A", flex: 1, margin: "0 8px", marginBottom: 16 }} />
                        )}
                    </div>
                ))}
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Step 7: Final Approval</h2>
            <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 32 }}>Review the final payroll summary and authorize it for disbursement. Once approved, payslips will be generated.</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 32 }}>
                {/* Left Side: Summary & Authorizers */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: "32px 40px" }}>
                        <h3 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", marginBottom: 24, textAlign: "center" }}>November 2024 Payroll Summary</h3>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid #1A2A3A", marginBottom: 16 }}>
                            <div style={{ fontSize: 15, color: "#8899AA" }}>Total Employees Processed</div>
                            <div style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", display: "flex", alignItems: "center", gap: 8 }}><Users size={16} color="#8899AA" /> 844</div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid #1A2A3A", marginBottom: 16 }}>
                            <div style={{ fontSize: 15, color: "#8899AA" }}>Total Gross Earnings</div>
                            <div style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF" }}>₹4,24,50,000</div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid #1A2A3A", marginBottom: 16 }}>
                            <div style={{ fontSize: 15, color: "#8899AA", display: "flex", flexDirection: "column", gap: 4 }}>
                                Total Deductions
                                <span style={{ fontSize: 12, color: "#445566" }}>Includes TDS, EPF, PT, Recoveries</span>
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 600, color: "#FF4444" }}>- ₹42,45,000</div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,229,160,0.05)", padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(0,229,160,0.3)", marginTop: 24 }}>
                            <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>Total Net Payout</div>
                            <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>₹3,82,05,000</div>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Approval Workflow</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ display: "flex", gap: 16 }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <CheckCircle2 size={14} color="#060B14" />
                                    </div>
                                    <div style={{ width: 2, height: 40, background: "#00E5A0", margin: "4px 0" }} />
                                </div>
                                <div style={{ flex: 1, paddingBottom: 16 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Prepared By</div>
                                    <div style={{ fontSize: 13, color: "#8899AA" }}>Priya Mehta (HR Exec) • Nov 25, 11:30 AM</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: 16 }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(0,229,160,0.2)", border: "1px solid #00E5A0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <div style={{ width: 8, height: 8, background: "#00E5A0", borderRadius: "50%" }} />
                                    </div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Final Approval</div>
                                    <div style={{ fontSize: 13, color: "#8899AA" }}>Waiting for your approval (Finance Head)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Compliance & Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Download Reports</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <button style={{ height: 44, width: "100%", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", transition: "border-color 0.2s" }} className="hover:border-[#00E5A0]">
                                <FileText size={18} color="#0066FF" /> Final Payroll Register (Excel)
                            </button>
                            <button style={{ height: 44, width: "100%", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", transition: "border-color 0.2s" }} className="hover:border-[#00E5A0]">
                                <FileText size={18} color="#FFB800" /> EPF & ESI Return File
                            </button>
                            <button style={{ height: 44, width: "100%", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", transition: "border-color 0.2s" }} className="hover:border-[#00E5A0]">
                                <FileText size={18} color="#00E5A0" /> TDS Deduction Report
                            </button>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Authorization</h3>
                        <div style={{ background: "rgba(255,184,0,0.05)", padding: 16, borderRadius: 8, border: "1px dashed rgba(255,184,0,0.3)", marginBottom: 20 }}>
                            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                <AlertTriangle size={18} color="#FFB800" style={{ flexShrink: 0, marginTop: 2 }} />
                                <div style={{ fontSize: 13, color: "#FFFFFF", lineHeight: 1.5 }}>
                                    This action will <span style={{ fontWeight: 600, color: "#FFB800" }}>lock the payroll permanently</span> for November 2024. Payslips will be generated and made available on employee portals under "Draft" state until disbursed.
                                </div>
                            </div>
                        </div>

                        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginBottom: 24 }}>
                            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 4, accentColor: "#00E5A0", width: 16, height: 16 }} />
                            <span style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                                I, Ajiit (Finance Head), hereby confirm that I have reviewed the payroll register and authorize the processing of ₹3.82 Cr for November 2024.
                            </span>
                        </label>

                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <Link href="/payroll/run/disburse" style={{ width: "100%" }}>
                                <button disabled={!agreed} style={{ height: 48, width: "100%", background: agreed ? "#00E5A0" : "#1A2A3A", border: "none", borderRadius: 8, color: agreed ? "#060B14" : "#445566", fontSize: 15, fontWeight: 700, cursor: agreed ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.3s" }}>
                                    <ShieldCheck size={18} style={{ marginBottom: -2 }} /> Approve & Lock Payroll
                                </button>
                            </Link>
                            <button style={{ height: 44, width: "100%", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FF4444", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                Reject & Send Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #1A2A3A" }}>
                <Link href="/payroll/run/review-net">
                    <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>Back</button>
                </Link>
            </div>
        </div>
    );
}
