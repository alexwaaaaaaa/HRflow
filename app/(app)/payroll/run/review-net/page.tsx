"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight, AlertTriangle, Search, Download, IndianRupee, PieChart, ShieldAlert } from "lucide-react";

const NET_DATA = [
    { id: "EMP-042", name: "Ravi Shankar", paymentMode: "Bank Transfer", bank: "HDFC ••• 4201", gross: 128000, ded: 16525, net: 111475, status: "Ready" },
    { id: "EMP-045", name: "Sneha Patil", paymentMode: "Bank Transfer", bank: "ICICI ••• 8820", gross: 110500, ded: 25225, net: 85275, status: "Ready" },
    { id: "EMP-821", name: "Anil Desai", paymentMode: "Pending Bank", bank: "Verification pending", gross: 48500, ded: 2025, net: 46475, status: "Hold" },
    { id: "EMP-112", name: "Rajesh Kumar", paymentMode: "Bank Transfer", bank: "SBI ••• 9912", gross: 172500, ded: 30525, net: 141975, status: "Ready" },
    { id: "EMP-155", name: "Kiran Sharma", paymentMode: "Cheque", bank: "Offline Mode", gross: 55000, ded: 6000, net: 49000, status: "Manual" },
];

export default function ReviewNet() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

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
                    { label: "Review Net", state: "active" },
                    { label: "Approve", state: "pending" },
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

            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Step 6: Review Net Payout</h2>
            <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 24 }}>Final transfer amounts and payment modes. This is the exact amount that will hit the bank account.</div>

            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.5fr", gap: 16, marginBottom: 24 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Net Payout</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#00E5A0", marginBottom: 8 }}>₹3.82 Cr</div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>Across 844 employees</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Bank Transfers</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>₹3.81 Cr</div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>841 employees</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Cheque/Cash</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>₹1.1 L</div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>3 employees</div>
                </div>

                <div style={{ background: "rgba(255,68,68,0.05)", border: "1px solid rgba(255,68,68,0.3)", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#FF4444", marginBottom: 8 }}>Payouts on Hold</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <div>
                            <div style={{ fontSize: 28, fontWeight: 700, color: "#FF4444", marginBottom: 8 }}>16</div>
                            <div style={{ fontSize: 12, color: "#FF4444" }}>Missing bank details</div>
                        </div>
                        <button style={{ height: 32, padding: "0 12px", background: "#FF4444", border: "none", borderRadius: 6, color: "#FFFFFF", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Resolve</button>
                    </div>
                </div>
            </div>

            {/* Hold Banner */}
            <div style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.3)", borderRadius: 12, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
                <ShieldAlert color="#FFB800" size={20} />
                <div style={{ flex: 1, fontSize: 14, color: "#FFFFFF" }}>
                    <span style={{ fontWeight: 600, color: "#FFB800" }}>Note:</span> Payouts on Hold will not be included in the final bank transfer file. You can process them later via Off-cycle once details are resolved.
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search employee" style={{ width: 260, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <div style={{ display: "flex", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, overflow: "hidden" }}>
                        <button style={{ height: 38, padding: "0 16px", background: "#1A2A3A", border: "none", color: "#FFFFFF", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>All (844)</button>
                        <button style={{ height: 38, padding: "0 16px", background: "none", border: "none", color: "#FF4444", fontSize: 13, cursor: "pointer" }}>On Hold (16)</button>
                        <button style={{ height: 38, padding: "0 16px", background: "none", border: "none", color: "#8899AA", fontSize: 13, cursor: "pointer" }}>Manual Mode (3)</button>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#8899AA", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                        <IndianRupee size={14} /> Download Bank Format Format
                    </button>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#8899AA", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                        <PieChart size={14} /> Variance Report
                    </button>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", color: "#8899AA", fontSize: 12, textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Employee</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Gross Pay</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Total Deductions</th>
                            <th style={{ padding: "16px 20px", fontWeight: 700, color: "#00E5A0" }}>Net Payable</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Payment Mode</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Bank Account / Remarks</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NET_DATA.map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: "1px solid #1A2A3A", fontSize: 14, background: emp.status === "Hold" ? "rgba(255,68,68,0.03)" : "transparent" }}>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>{emp.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{emp.id}</div>
                                </td>
                                <td style={{ padding: "16px 20px", color: "#8899AA" }}>{formatCurrency(emp.gross)}</td>
                                <td style={{ padding: "16px 20px", color: "#8899AA" }}>{formatCurrency(emp.ded)}</td>
                                <td style={{ padding: "16px 20px", fontWeight: 700, color: "#00E5A0", fontSize: 16 }}>{formatCurrency(emp.net)}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        {emp.paymentMode === "Bank Transfer" ? <IndianRupee size={14} color="#00E5A0" /> : <AlertTriangle size={14} color={emp.status === "Hold" ? "#FF4444" : "#8899AA"} />}
                                        <span style={{ color: emp.status === "Hold" ? "#FF4444" : "#FFFFFF" }}>{emp.paymentMode}</span>
                                    </div>
                                </td>
                                <td style={{ padding: "16px 20px", color: emp.status === "Hold" ? "#FF4444" : "#8899AA" }}>{emp.bank}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{
                                        padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600,
                                        background: emp.status === "Ready" ? "rgba(0,229,160,0.1)" : emp.status === "Hold" ? "rgba(255,68,68,0.1)" : "rgba(255,184,0,0.1)",
                                        color: emp.status === "Ready" ? "#00E5A0" : emp.status === "Hold" ? "#FF4444" : "#FFB800"
                                    }}>
                                        {emp.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bottom Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #1A2A3A" }}>
                <Link href="/payroll/run/review-deductions">
                    <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>Back</button>
                </Link>
                <div style={{ display: "flex", gap: 16 }}>
                    <Link href="/payroll/anomaly-alerts">
                        <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            <AlertTriangle size={16} /> View Anomaly Report
                        </button>
                    </Link>
                    <Link href="/payroll/run/approve">
                        <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            Proceed to Approval <ChevronRight size={16} style={{ marginBottom: -2 }} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
