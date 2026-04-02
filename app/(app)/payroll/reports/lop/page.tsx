"use client";

import Link from "next/link";
import { Download, Filter, Search, Info, CornerDownRight } from "lucide-react";

const LOP_DATA = [
    { emp: "Rahul Sharma", id: "EMP-001", totalDays: 30, lopDays: 2.5, basicDed: 4166.67, hraDed: 2083.33, totalDed: 7500.00, reason: "Unapproved Sick Leave + Half Day Shortfall" },
    { emp: "Sneha Patil", id: "EMP-045", totalDays: 30, lopDays: 1.0, basicDed: 2000.00, hraDed: 1000.00, totalDed: 3500.00, reason: "Absent without notice (12 Nov)" },
    { emp: "Vikram Reddy", id: "EMP-204", totalDays: 30, lopDays: 4.0, basicDed: 6000.00, hraDed: 3000.00, totalDed: 11000.00, reason: "Leave balance exhausted" },
];

export default function LopCalculationDetail() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Loss of Pay (LOP) Detail Report</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Component-wise breakdown of deductions for Nov 2024.</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Filter size={16} /> Filters
                    </button>
                    <button style={{ height: 40, padding: "0 20px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Affected Employees</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFB800" }}>42</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total LOP Days</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>68.5</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Value Deducted</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444" }}>₹1,45,200</div>
                </div>
                <div style={{ background: "rgba(0,102,255,0.05)", border: "1px dashed rgba(0,102,255,0.3)", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                        <Info size={14} color="#0066FF" />
                        <h3 style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>Calculation Logic</h3>
                    </div>
                    <div style={{ fontSize: 12, color: "#8899AA", lineHeight: 1.5 }}>Deduction is performed component-wise proportionally (Basic, HRA) over 30 base days.</div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search employee..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Employee</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center" }}>LOP Days</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>Basic Ded.</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>HRA / Other Ded.</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>Total Impact</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LOP_DATA.map((row) => (
                            <tr key={row.id} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{row.emp}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{row.id}</div>
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "center" }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: "#FFB800", background: "rgba(255,184,0,0.1)", padding: "4px 8px", borderRadius: 6 }}>{row.lopDays} Days</span>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#FF4444", textAlign: "right" }}>-₹{row.basicDed.toFixed(2)}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#FF4444", textAlign: "right" }}>-₹{row.hraDed.toFixed(2)}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: "#FFFFFF", textAlign: "right" }}>₹{row.totalDed.toFixed(2)}</td>
                                <td style={{ padding: "16px 20px", fontSize: 13, color: "#8899AA" }}>{row.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ padding: "16px 24px", background: "rgba(0,102,255,0.05)", borderTop: "1px solid #1A2A3A", display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <CornerDownRight size={16} color="#0066FF" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#FFFFFF", lineHeight: 1.5 }}>
                        Taxes (Income Tax) and statutory components (PF, PT) have been automatically recalculated based on the reduced Gross Salary.
                    </span>
                </div>
            </div>
        </div>
    );
}
