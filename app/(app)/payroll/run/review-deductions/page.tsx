"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight, AlertTriangle, Filter, Search, Download, Settings, Edit2 } from "lucide-react";

const DEDUCTION_DATA = [
    { id: "EMP-042", name: "Ravi Shankar", gross: 128000, epf: 1800, eps: 0, pt: 200, tds: 14500, lwf: 25, advance: 0, totalDed: 16525, status: "Normal" },
    { id: "EMP-045", name: "Sneha Patil", gross: 110500, epf: 1800, eps: 0, pt: 200, tds: 18200, lwf: 25, advance: 5000, totalDed: 25225, status: "High TDS" },
    { id: "EMP-821", name: "Anil Desai", gross: 48500, epf: 1800, eps: 0, pt: 200, tds: 0, lwf: 25, advance: 0, totalDed: 2025, status: "No TDS" },
    { id: "EMP-112", name: "Rajesh Kumar", gross: 172500, epf: 1800, eps: 0, pt: 200, tds: 28500, lwf: 25, advance: 0, totalDed: 30525, status: "Normal" },
    { id: "EMP-134", name: "Priya Nair", gross: 102500, epf: 1800, eps: 0, pt: 200, tds: 9500, lwf: 25, advance: 0, totalDed: 11525, status: "Normal" },
];

export default function ReviewDeductions() {
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
                    { label: "Review Deductions", state: "active" },
                    { label: "Review Net", state: "pending" },
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

            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Step 5: Review Deductions</h2>
            <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 24 }}>Verify statutory deductions (PF, PT, TDS, LWF) and loan/advance recoveries.</div>

            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 24 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Deductions</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444", marginBottom: 8 }}>₹42.45 L</div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>10% of Gross</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total TDS</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>₹24.05 L</div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>Across 612 employees</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Employee PF</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>₹14.88 L</div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>Capped at ₹1800 for 812</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Prof. Tax & LWF</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>₹1.72 L</div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>State-wise deduction</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Loan/Advance</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>₹1.80 L</div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>Recoveries from 18 emp</div>
                </div>
            </div>

            {/* Compliance Warning Banner */}
            <div style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.3)", borderRadius: 12, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
                <AlertTriangle color="#FFB800" size={20} />
                <div style={{ flex: 1, fontSize: 14, color: "#FFFFFF" }}>
                    <span style={{ fontWeight: 600, color: "#FFB800" }}>TDS Anomaly Detected:</span> 12 employees have TDS &gt; 35% of their gross pay due to missing investment declarations.
                </div>
                <button style={{ height: 32, padding: "0 16px", background: "transparent", border: "1px solid #FFB800", borderRadius: 6, color: "#FFB800", fontSize: 13, cursor: "pointer" }}>View Employees</button>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search employee" style={{ width: 260, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <button style={{ height: 40, padding: "0 16px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Filter size={16} /> Filters
                    </button>
                    <button style={{ height: 40, padding: "0 16px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Settings size={16} /> Override Deductions
                    </button>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#8899AA", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                        <Download size={14} /> Export Register
                    </button>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", color: "#8899AA", fontSize: 12, textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", fontWeight: 500, position: "sticky", left: 0, background: "#0A1420", zIndex: 10, width: 250 }}>Employee</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Total Gross</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>EPF</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Prof. Tax</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Income Tax (TDS)</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Recoveries</th>
                            <th style={{ padding: "16px 20px", fontWeight: 700, color: "#FF4444" }}>Total Deductions</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500, textAlign: "right" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DEDUCTION_DATA.map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: "1px solid #1A2A3A", fontSize: 14, background: emp.status === "High TDS" ? "rgba(255,184,0,0.03)" : "transparent" }}>
                                <td style={{ padding: "16px 20px", position: "sticky", left: 0, background: emp.status === "High TDS" ? "#0F1E28" : "#0D1928", borderRight: "1px solid #1A2A3A", zIndex: 10 }}>
                                    <div style={{ fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>{emp.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{emp.id}</div>
                                </td>
                                <td style={{ padding: "16px 20px", color: "#FFFFFF" }}>{formatCurrency(emp.gross)}</td>
                                <td style={{ padding: "16px 20px" }}>{formatCurrency(emp.epf)}</td>
                                <td style={{ padding: "16px 20px" }}>{formatCurrency(emp.pt)}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    {emp.tds > 0 ? (
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <span style={{ color: emp.status === "High TDS" ? "#FFB800" : "#8899AA", fontWeight: emp.status === "High TDS" ? 600 : 400 }}>{formatCurrency(emp.tds)}</span>
                                            {emp.status === "High TDS" && <span title="High TDS %"><AlertTriangle size={14} color="#FFB800" /></span>}
                                        </div>
                                    ) : (
                                        <span style={{ color: "#8899AA" }}>No TDS</span>
                                    )}
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    {emp.advance > 0 ? (
                                        <span style={{ color: "#FF4444", fontWeight: 500 }}>{formatCurrency(emp.advance)}</span>
                                    ) : "-"}
                                </td>
                                <td style={{ padding: "16px 20px", fontWeight: 700, color: "#FF4444" }}>{formatCurrency(emp.totalDed)}</td>
                                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                    <button style={{ height: 32, width: 32, background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#0066FF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: "auto" }} title="Edit Deductions">
                                        <Edit2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bottom Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #1A2A3A" }}>
                <Link href="/payroll/run/review-gross">
                    <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>Back</button>
                </Link>
                <Link href="/payroll/run/review-net">
                    <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        Next: Review Net Pay <ChevronRight size={16} style={{ marginBottom: -2 }} />
                    </button>
                </Link>
            </div>
        </div>
    );
}
