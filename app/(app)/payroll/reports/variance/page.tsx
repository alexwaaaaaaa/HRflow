"use client";

import Link from "next/link";
import { Download, TrendingUp, TrendingDown, HelpCircle, AlertTriangle } from "lucide-react";

const VARIANCES = [
    { component: "Basic Salary", oct: 12500000, nov: 12750000, diff: 250000, perc: 2.0, reason: "3 New Joiners, 1 Increment" },
    { component: "HRA", oct: 5000000, nov: 5100000, diff: 100000, perc: 2.0, reason: "Proportionate to Basic change" },
    { component: "Variable Pay", oct: 0, nov: 2415500, diff: 2415500, perc: 100, reason: "Q3 Payout Cycle" },
    { component: "Overtime (OT)", oct: 125000, nov: 45000, diff: -80000, perc: -64.0, reason: "Lower shift extensions" },
    { component: "LOP Deduction", oct: 45000, nov: 85000, diff: 40000, perc: 88.8, reason: "High unpaid leaves" },
];

export default function MonthVarianceReport() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Month-on-Month Variance Report</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Compare current payroll run (Nov 2024) against previous month (Oct 2024).</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Download size={16} /> Export Detailed CSV
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 24 }}>
                    <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 8 }}>Previous Net (Oct 2024)</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>₹3,75,00,000</div>
                    <div style={{ fontSize: 13, color: "#8899AA", marginTop: 8 }}>840 Employees Paid</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 24 }}>
                    <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 8 }}>Current Net (Nov 2024)</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>₹3,98,54,500</div>
                    <div style={{ fontSize: 13, color: "#8899AA", marginTop: 8 }}>842 Employees Eligible</div>
                </div>
                <div style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.3)", borderRadius: 12, padding: 24 }}>
                    <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 8 }}>Net Payroll Variance</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#00E5A0", display: "flex", alignItems: "center", gap: 12 }}>
                        + ₹23,54,500 <TrendingUp size={24} />
                    </div>
                    <div style={{ fontSize: 13, color: "#00E5A0", marginTop: 8 }}>+6.27% increase overall</div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #1A2A3A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>Component-wise Variance</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8899AA" }}>
                        <HelpCircle size={14} /> AI identified primary drivers for variance limit breaches.
                    </div>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Salary Component</th>
                            <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>Oct 2024 (₹)</th>
                            <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>Nov 2024 (₹)</th>
                            <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>Difference</th>
                            <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Primary Driver / Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {VARIANCES.map((v, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>{v.component}</td>
                                <td style={{ padding: "16px 24px", fontSize: 14, color: "#E5E7EB", textAlign: "right" }}>{v.oct.toLocaleString()}</td>
                                <td style={{ padding: "16px 24px", fontSize: 14, color: "#FFFFFF", textAlign: "right" }}>{v.nov.toLocaleString()}</td>
                                <td style={{ padding: "16px 24px", textAlign: "right" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: v.diff > 0 ? (v.component.includes("Deduction") ? "#FF4444" : "#00E5A0") : (v.component.includes("Deduction") ? "#00E5A0" : "#FF4444"), display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                                        {v.diff > 0 ? "+" : ""}{v.diff.toLocaleString()}
                                        {v.diff > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    </div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{v.perc > 0 ? "+" : ""}{v.perc}%</div>
                                </td>
                                <td style={{ padding: "16px 24px", fontSize: 13, color: "#8899AA" }}>{v.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ padding: "16px 24px", background: "rgba(255,184,0,0.05)", borderTop: "1px solid #1A2A3A", display: "flex", alignItems: "center", gap: 12 }}>
                    <AlertTriangle size={16} color="#FFB800" />
                    <span style={{ fontSize: 13, color: "#FFFFFF" }}>Variance in <b style={{ color: "#FFB800" }}>Variable Pay</b> and <b style={{ color: "#FFB800" }}>Overtime</b> exceeds the standard 10% threshold. Requires managerial acknowledgment.</span>
                </div>
            </div>

            <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
                <button style={{ height: 40, padding: "0 20px", background: "transparent", border: "1px solid #00E5A0", borderRadius: 8, color: "#00E5A0", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Acknowledge Variances</button>
            </div>
        </div>
    );
}
