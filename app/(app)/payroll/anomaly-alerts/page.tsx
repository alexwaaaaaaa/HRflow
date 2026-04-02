"use client";

import Link from "next/link";
import { AlertTriangle, TrendingUp, TrendingDown, ArrowLeft, Filter, Search, Download, CheckCircle2, X, ChevronRight } from "lucide-react";
import { useState } from "react";

const ANOMALIES = [
    { id: "EMP-045", name: "Sneha Patil", dept: "Sales", type: "Spike", metric: "Gross Pay", prev: 85500, current: 110500, variance: 29.2, reason: "Sales Bonus (Q3) ₹25,000 added", severity: "Medium", status: "Unresolved" },
    { id: "EMP-821", name: "Anil Desai", dept: "Operations", type: "Drop", metric: "Net Pay", prev: 74200, current: 46475, variance: -37.3, reason: "Pro-rata processing (Joined 12 Nov)", severity: "Low", status: "Resolved" },
    { id: "EMP-204", name: "Vikram Reddy", dept: "Engineering", type: "Compliance", metric: "TDS", prev: 12000, current: 28500, variance: 137.5, reason: "Investment declaration missing. Switch to old regime default.", severity: "High", status: "Unresolved" },
    { id: "EMP-312", name: "Kiran Sharma", dept: "HR", type: "Spike", metric: "OT Hours", prev: 0, current: 48, variance: 100, reason: "48 hours OT logged in single month. Needs HR Head approval.", severity: "High", status: "Unresolved" },
    { id: "EMP-415", name: "Amit Kumar", dept: "Marketing", type: "Drop", metric: "Net Pay", prev: 65000, current: 32000, variance: -50.7, reason: "14 days LOP deducted", severity: "Medium", status: "Unresolved" },
];

export default function AnomalyAlerts() {
    const [resolved, setResolved] = useState<string[]>(["EMP-821"]);

    const formatCurrency = (amount: number) => {
        if (amount < 1000) return amount.toString();
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    const toggleResolve = (id: string) => {
        if (resolved.includes(id)) {
            setResolved(resolved.filter(r => r !== id));
        } else {
            setResolved([...resolved, id]);
        }
    };

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px 80px" }}>
            <div style={{ marginBottom: 24 }}>
                <Link href="/payroll/run/review-net" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                    <ArrowLeft size={16} /> Back to Payroll Wizard
                </Link>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                            <AlertTriangle color="#FFB800" size={28} /> Payroll Anomalies
                        </h1>
                        <div style={{ fontSize: 14, color: "#8899AA" }}>November 2024 • 18 potential issues detected that require your review.</div>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            <Download size={16} /> Export Report
                        </button>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Anomalies</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>18</div>
                    <div style={{ fontSize: 13, color: "#00E5A0" }}>14 unresolved</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>High Severity</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FF4444", marginBottom: 8 }}>3</div>
                    <div style={{ fontSize: 13, color: "#FF4444" }}>Requires immediate action</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Salary Spikes (&gt;15%)</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFB800", marginBottom: 8 }}>8</div>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Bonus / Sales Incentives</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Salary Drops (&lt;-15%)</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#8899AA", marginBottom: 8 }}>7</div>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>LOP / Pro-rata</div>
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
                        <button style={{ height: 38, padding: "0 16px", background: "#1A2A3A", border: "none", color: "#FFFFFF", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>All (18)</button>
                        <button style={{ height: 38, padding: "0 16px", background: "none", border: "none", color: "#FF4444", fontSize: 13, cursor: "pointer" }}>High Severity (3)</button>
                        <button style={{ height: 38, padding: "0 16px", background: "none", border: "none", color: "#FFB800", fontSize: 13, cursor: "pointer" }}>Unresolved (14)</button>
                    </div>
                    <button style={{ height: 40, padding: "0 16px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Filter size={16} /> More Filters
                    </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 14, color: "#8899AA" }}>Show Resolved</span>
                    <label style={{ position: "relative", display: "inline-block", width: 44, height: 24 }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, background: "#00E5A0", transition: ".4s", borderRadius: 24 }}>
                            <span style={{ position: "absolute", content: '""', height: 18, width: 18, left: 22, bottom: 3, background: "#060B14", transition: ".4s", borderRadius: "50%" }} />
                        </span>
                    </label>
                </div>
            </div>

            {/* Anomalies List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {ANOMALIES.map((anomaly, i) => {
                    const isRes = resolved.includes(anomaly.id);
                    return (
                        <div key={i} style={{ background: "#0D1928", border: `1px solid ${isRes ? "#1A2A3A" : anomaly.severity === "High" ? "rgba(255,68,68,0.3)" : "rgba(255,184,0,0.3)"}`, borderRadius: 16, padding: 24, display: "flex", gap: 24, alignItems: "flex-start", opacity: isRes ? 0.6 : 1, transition: "opacity 0.2s, border-color 0.2s" }}>
                            {/* Status Icon */}
                            <div style={{ width: 48, height: 48, borderRadius: "50%", background: isRes ? "rgba(0,229,160,0.1)" : anomaly.severity === "High" ? "rgba(255,68,68,0.1)" : "rgba(255,184,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: isRes ? "#00E5A0" : anomaly.severity === "High" ? "#FF4444" : "#FFB800", flexShrink: 0 }}>
                                {isRes ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                            </div>

                            {/* Details */}
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                                            <span style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF" }}>{anomaly.name}</span>
                                            <span style={{ fontSize: 13, color: "#8899AA" }}>{anomaly.id} • {anomaly.dept}</span>
                                            {!isRes && (
                                                <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: anomaly.severity === "High" ? "rgba(255,68,68,0.1)" : "rgba(255,184,0,0.1)", color: anomaly.severity === "High" ? "#FF4444" : "#FFB800" }}>
                                                    {anomaly.severity} Severity
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>
                                            Anomaly in <span style={{ color: "#0066FF" }}>{anomaly.metric}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{ display: "flex", gap: 12 }}>
                                        <Link href="/payroll/payslips/bulk" style={{ textDecoration: "none" }}><button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, cursor: "pointer" }}>View Payslip</button></Link>
                                        <button onClick={() => toggleResolve(anomaly.id)} style={{ height: 36, padding: "0 16px", background: isRes ? "transparent" : "#1A2A3A", border: isRes ? "1px solid #1A2A3A" : "none", borderRadius: 8, color: isRes ? "#8899AA" : "#FFFFFF", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                            {isRes ? <><X size={14} /> Mark Unresolved</> : <><CheckCircle2 size={14} /> Mark as Reviewed</>}
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: 32, alignItems: "center", background: "#060B14", padding: "16px 20px", borderRadius: 12 }}>
                                    <div>
                                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 4 }}>Previous Month (Oct)</div>
                                        <div style={{ fontSize: 16, color: "#FFFFFF", fontWeight: 500 }}>{formatCurrency(anomaly.prev)}{anomaly.metric === "OT Hours" ? " hrs" : ""}</div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: anomaly.variance > 0 ? "#FFB800" : "#8899AA", fontSize: 13, fontWeight: 600, background: anomaly.variance > 0 ? "rgba(255,184,0,0.1)" : "rgba(136,153,170,0.1)", padding: "4px 10px", borderRadius: 12 }}>
                                            {anomaly.variance > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {Math.abs(anomaly.variance)}%
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 4 }}>Current Month (Nov)</div>
                                        <div style={{ fontSize: 16, color: "#FFFFFF", fontWeight: 500 }}>{formatCurrency(anomaly.current)}{anomaly.metric === "OT Hours" ? " hrs" : ""}</div>
                                    </div>
                                    <div style={{ width: 1, height: 40, background: "#1A2A3A" }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 4 }}>System Identified Reason</div>
                                        <div style={{ fontSize: 14, color: "#FFFFFF" }}>{anomaly.reason}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
                <Link href="/payroll/run/review-net">
                    <button style={{ height: 44, padding: "0 32px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        Return to Payroll Wizard <ChevronRight size={16} />
                    </button>
                </Link>
            </div>
        </div>
    );
}
