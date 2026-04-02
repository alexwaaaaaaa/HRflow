"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, FileText, Download, Building2, UploadCloud, RefreshCw } from "lucide-react";

export default function DisbursePayroll() {
    const [selectedBank, setSelectedBank] = useState("icici");

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
                    { label: "Approve", state: "done" },
                    { label: "Disburse", state: "active" }
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

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Step 8: Initiate Disbursement</h2>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Payroll is approved. Proceed to disburse ₹3.81 Cr via bank transfer.</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,229,160,0.1)", padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(0,229,160,0.2)" }}>
                    <CheckCircle2 color="#00E5A0" size={18} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0" }}>Payroll Locked</span>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                {/* Left Side: Corporate Bank Selection */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Select Corporate Bank Account</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {[
                                { id: "icici", name: "ICICI Bank - Current A/C", acc: "•••• 4521", bal: "₹4,50,20,000", tag: "Primary" },
                                { id: "hdfc", name: "HDFC Bank - Current A/C", acc: "•••• 9882", bal: "₹1,20,00,000", tag: "" },
                            ].map(bank => (
                                <label key={bank.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, background: selectedBank === bank.id ? "rgba(0,229,160,0.05)" : "#060B14", border: `1px solid ${selectedBank === bank.id ? "#00E5A0" : "#1A2A3A"}`, borderRadius: 12, cursor: "pointer", transition: "all 0.2s" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <input type="radio" name="bank" value={bank.id} checked={selectedBank === bank.id} onChange={() => setSelectedBank(bank.id)} style={{ accentColor: "#00E5A0", width: 18, height: 18 }} />
                                        <div>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                                                {bank.name}
                                                {bank.tag && <span style={{ padding: "2px 6px", background: "#1A2A3A", borderRadius: 4, fontSize: 10, color: "#8899AA" }}>{bank.tag}</span>}
                                            </div>
                                            <div style={{ fontSize: 13, color: "#8899AA" }}>A/C: {bank.acc} • Balance: <span style={{ color: "#00E5A0" }}>{bank.bal}</span></div>
                                        </div>
                                    </div>
                                    <Building2 size={24} color={selectedBank === bank.id ? "#00E5A0" : "#445566"} opacity={0.5} />
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Disbursement Methods</h3>

                        {/* Option 1: Direct Integration */}
                        <div style={{ display: "flex", gap: 20, padding: 20, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 12, marginBottom: 16, opacity: selectedBank === "icici" ? 1 : 0.5 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,102,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <RefreshCw size={20} color="#0066FF" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Direct Bank Integration</div>
                                <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 16 }}>Push payouts directly to ICICI CIB portal without downloading files. Requires maker-checker at bank portal.</div>
                                <button disabled={selectedBank !== "icici"} style={{ height: 38, padding: "0 20px", background: "#0066FF", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: selectedBank === "icici" ? "pointer" : "not-allowed" }}>
                                    Push to ICICI Portal
                                </button>
                            </div>
                        </div>

                        {/* Option 2: File Download */}
                        <div style={{ display: "flex", gap: 20, padding: 20, background: "#060B14", border: "1px solid #00E5A0", borderRadius: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Download size={20} color="#00E5A0" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Manual File Download</div>
                                <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 16 }}>Generate bank-specific format file (TXT/CSV) to upload manually.</div>
                                <Link href="/payroll/run/bank-file">
                                    <button style={{ height: 38, padding: "0 20px", background: "transparent", border: "1px solid #00E5A0", borderRadius: 8, color: "#00E5A0", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                                        <FileText size={16} /> Generate {selectedBank === "icici" ? "ICICI" : "HDFC"} Format File
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Post-Disbursement Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Post-Disbursement Actions</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                <input type="checkbox" defaultChecked style={{ marginTop: 4, accentColor: "#00E5A0" }} />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Publish Payslips immediately</div>
                                    <div style={{ fontSize: 13, color: "#8899AA" }}>Employees can view and download their Nov 2024 payslip on their portal.</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                <input type="checkbox" defaultChecked style={{ marginTop: 4, accentColor: "#00E5A0" }} />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Send Email Notification</div>
                                    <div style={{ fontSize: 13, color: "#8899AA" }}>Send automated email to employees with payslip attached (password protected).</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                <input type="checkbox" style={{ marginTop: 4, accentColor: "#00E5A0" }} />
                                <div style={{ opacity: 0.6 }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Send WhatsApp Notification</div>
                                    <div style={{ fontSize: 13, color: "#8899AA" }}>Notify employees via HRFlow WhatsApp bot. (Add-on required)</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #1A2A3A" }}>
                            <button style={{ height: 44, width: "100%", background: "#1A2A3A", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                <UploadCloud size={18} /> Execute Post-Payout Actions
                            </button>
                            <div style={{ fontSize: 12, color: "#445566", textAlign: "center", marginTop: 12 }}>Only click after bank transfer is successfully completed.</div>
                        </div>
                    </div>

                    <div style={{ background: "rgba(0,102,255,0.05)", border: "1px dashed rgba(0,102,255,0.3)", borderRadius: 16, padding: 20, textAlign: "center" }}>
                        <div style={{ width: 48, height: 48, background: "rgba(0,102,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                            <FileText color="#0066FF" size={24} />
                        </div>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Need Accounting Journal?</h3>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 16 }}>Download the payroll journal voucher file to import into Tally, Zoho Books, or Quickbooks.</div>
                        <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #0066FF", borderRadius: 8, color: "#0066FF", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Generate JV File</button>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #1A2A3A" }}>
                <Link href="/payroll/run/approve">
                    <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>Back</button>
                </Link>
                <Link href="/payroll">
                    <button style={{ height: 44, padding: "0 24px", background: "#1A2A3A", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>Exit Wizard</button>
                </Link>
            </div>
        </div>
    );
}
