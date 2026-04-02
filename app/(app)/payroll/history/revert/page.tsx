"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCcw, Lock, CheckCircle2 } from "lucide-react";

export default function RevertPayroll() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <Link href="/payroll/history" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", marginBottom: 24 }} className="hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to History
            </Link>

            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Revert Payroll Batch (Nov 2024)</h1>
                <div style={{ fontSize: 14, color: "#8899AA" }}>Delete the generated payroll register and unlock attendance to make corrections.</div>
            </div>

            <div style={{ background: "rgba(255,68,68,0.05)", border: "1px solid rgba(255,68,68,0.3)", borderRadius: 16, padding: 24, marginBottom: 32 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <AlertTriangle size={24} color="#FF4444" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FF4444", marginBottom: 8 }}>Critical Warning</h2>
                        <div style={{ fontSize: 14, color: "#FFFFFF", lineHeight: 1.5, marginBottom: 16 }}>
                            Reverting payroll is a destructive action that unpacks the currently locked batch. It will delete all generated payslips for Nov 2024 and remove the bank payout file.
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 20, color: "#8899AA", fontSize: 13, display: "flex", flexDirection: "column", gap: 8 }}>
                            <li>Employees who have already received their payslip via email will see an invalid link.</li>
                            <li>Pending arrears and LOP values will be un-consumed and sent back to the draft queue.</li>
                            <li>Make sure bank disbursement has <b style={{ color: "#FFFFFF" }}>NOT</b> been initiated.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 32 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Reversion Scope (842 Employees)</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <CheckCircle2 size={18} color="#00E5A0" />
                        <div style={{ fontSize: 14, color: "#E5E7EB" }}>Payslips deleted from Employee Portal</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <CheckCircle2 size={18} color="#00E5A0" />
                        <div style={{ fontSize: 14, color: "#E5E7EB" }}>Attendance & LOP tracking unlocked for November</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <CheckCircle2 size={18} color="#00E5A0" />
                        <div style={{ fontSize: 14, color: "#E5E7EB" }}>Arrears & Variable Pay inputs marked as &quot;Draft&quot;</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Lock size={18} color="#8899AA" />
                        <div style={{ fontSize: 14, color: "#8899AA" }}>Statutory Challans (PF/PT/TDS) remain untouched unless regenerated</div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#FFFFFF", marginBottom: 8 }}>Reason for Reversion</label>
                <textarea
                    placeholder="E.g., Missed 5 employee increments, need to adjust basic salary before payout..."
                    style={{ width: "100%", height: 100, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: 12, color: "#FFFFFF", fontSize: 14, outline: "none", resize: "none", marginBottom: 24 }}
                />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                    <Link href="/payroll/history">
                        <button style={{ height: 40, padding: "0 20px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                    </Link>
                    <button style={{ height: 40, padding: "0 20px", background: "#FF4444", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <RefreshCcw size={16} /> Confirm Revert Batch
                    </button>
                </div>
            </div>
        </div>
    );
}
