"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight, AlertTriangle, TrendingUp, Filter, Search, Download, History, Eye } from "lucide-react";

const GROSS_DATA = [
    { id: "EMP-042", name: "Ravi Shankar", dept: "Engineering", basic: 65000, hra: 32500, lta: 8333, spl: 22167, ot: 0, bonus: 0, gross: 128000, status: "Normal", trend: 0 },
    { id: "EMP-045", name: "Sneha Patil", dept: "Sales", basic: 45000, hra: 22500, lta: 0, spl: 18000, ot: 0, bonus: 25000, gross: 110500, status: "Spike", trend: 29 },
    { id: "EMP-821", name: "Anil Desai", dept: "Operations", basic: 24000, hra: 12000, lta: 0, spl: 8000, ot: 4500, bonus: 0, gross: 48500, status: "Pro-rata", trend: -36 },
    { id: "EMP-112", name: "Rajesh Kumar", dept: "Engineering", basic: 85000, hra: 42500, lta: 10000, spl: 35000, ot: 0, bonus: 0, gross: 172500, status: "Normal", trend: 0 },
    { id: "EMP-134", name: "Priya Nair", dept: "HR", basic: 55000, hra: 27500, lta: 5000, spl: 15000, ot: 0, bonus: 0, gross: 102500, status: "Arrears", trend: 15 },
];

export default function ReviewGross() {
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
                    { label: "Review Gross", state: "active" },
                    { label: "Review Deductions", state: "pending" },
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

            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Step 4: Review Gross Salaries</h2>
            <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 24 }}>Verify total earnings before deductions (Basic, HRA, Allowances, OT, Bonus, Arrears).</div>

            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Gross Earnings</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>₹4.24 Cr</div>
                    <div style={{ fontSize: 12, color: "#00E5A0", display: "flex", alignItems: "center", gap: 4 }}><TrendingUp size={14} /> +₹12L vs Oct</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Fixed Components</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>₹3.98 Cr</div>
                    <div style={{ fontSize: 12, color: "#8899AA", display: "flex", alignItems: "center", gap: 4 }}>Basic, HRA, Allowances</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Variable & OT</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>₹18.5 L</div>
                    <div style={{ fontSize: 12, color: "#8899AA", display: "flex", alignItems: "center", gap: 4 }}>Sales Incentive + OT</div>
                </div>

                <div style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.3)", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#FFB800", marginBottom: 8 }}>Spikes / Anomalies</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFB800", marginBottom: 8 }}>18</div>
                    <div style={{ fontSize: 12, color: "#FFB800", display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={14} /> &gt; 15% variance vs Oct</div>
                </div>
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
                    <div style={{ display: "flex", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, overflow: "hidden" }}>
                        <button style={{ height: 38, padding: "0 16px", background: "#1A2A3A", border: "none", color: "#FFFFFF", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>All (844)</button>
                        <button style={{ height: 38, padding: "0 16px", background: "none", border: "none", color: "#FFB800", fontSize: 13, cursor: "pointer" }}>Anomalies (18)</button>
                        <button style={{ height: 38, padding: "0 16px", background: "none", border: "none", color: "#8899AA", fontSize: 13, cursor: "pointer" }}>With Arrears (24)</button>
                        <button style={{ height: 38, padding: "0 16px", background: "none", border: "none", color: "#8899AA", fontSize: 13, cursor: "pointer" }}>Pro-rata (56)</button>
                    </div>
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
                            <th style={{ padding: "16px 20px", fontWeight: 500, position: "sticky", left: 0, background: "#0A1420", zIndex: 10 }}>Employee</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Basic</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>HRA</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Spl Allowance</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>LTA / Others</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>OT + Bonus</th>
                            <th style={{ padding: "16px 20px", fontWeight: 700, color: "#FFFFFF" }}>Total Gross</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500 }}>Status</th>
                            <th style={{ padding: "16px 20px", fontWeight: 500, textAlign: "right" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {GROSS_DATA.map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: "1px solid #1A2A3A", fontSize: 14, background: emp.status === "Spike" ? "rgba(255,184,0,0.03)" : "transparent" }}>
                                <td style={{ padding: "16px 20px", position: "sticky", left: 0, background: emp.status === "Spike" ? "#0F1E28" : "#0D1928", borderRight: "1px solid #1A2A3A", zIndex: 10 }}>
                                    <div style={{ fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>{emp.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{emp.id}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>{formatCurrency(emp.basic)}</td>
                                <td style={{ padding: "16px 20px" }}>{formatCurrency(emp.hra)}</td>
                                <td style={{ padding: "16px 20px" }}>{formatCurrency(emp.spl)}</td>
                                <td style={{ padding: "16px 20px" }}>{formatCurrency(emp.lta)}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    {emp.ot + emp.bonus > 0 ? (
                                        <span style={{ color: "#00E5A0" }}>+{formatCurrency(emp.ot + emp.bonus)}</span>
                                    ) : "-"}
                                </td>
                                <td style={{ padding: "16px 20px", fontWeight: 700, color: "#FFFFFF" }}>{formatCurrency(emp.gross)}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    {emp.status === "Spike" ? (
                                        <span style={{ padding: "4px 8px", background: "rgba(255,184,0,0.1)", color: "#FFB800", borderRadius: 4, fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, width: "fit-content" }}><TrendingUp size={12} /> +{emp.trend}%</span>
                                    ) : emp.status === "Pro-rata" ? (
                                        <span style={{ padding: "4px 8px", background: "rgba(255,68,68,0.1)", color: "#FF4444", borderRadius: 4, fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, width: "fit-content" }}><TrendingUp size={12} style={{ transform: "scaleY(-1)" }} /> {emp.trend}%</span>
                                    ) : emp.status === "Arrears" ? (
                                        <span style={{ padding: "4px 8px", background: "rgba(0,102,255,0.1)", color: "#0066FF", borderRadius: 4, fontSize: 11, fontWeight: 600, width: "fit-content", display: "inline-block" }}>Arrears</span>
                                    ) : (
                                        <span style={{ color: "#8899AA", fontSize: 12 }}>Normal</span>
                                    )}
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "right", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                                    <button style={{ height: 32, width: 32, background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#8899AA", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} title="View Calculation">
                                        <Eye size={14} />
                                    </button>
                                    <button style={{ height: 32, width: 32, background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#8899AA", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} title="Compare with Last Month">
                                        <History size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bottom Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #1A2A3A" }}>
                <Link href="/payroll/run/employee-summary">
                    <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>Back</button>
                </Link>
                <Link href="/payroll/run/review-deductions">
                    <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        Next: Review Deductions <ChevronRight size={16} style={{ marginBottom: -2 }} />
                    </button>
                </Link>
            </div>
        </div>
    );
}
