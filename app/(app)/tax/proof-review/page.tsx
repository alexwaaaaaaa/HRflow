"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, Filter } from "lucide-react";

const EMPLOYEES = [
    { id: "EMP-0428", name: "Priya Mehta", dept: "Marketing", submitted: 4, verified: 3, pending: 1, status: "Review In Progress" },
    { id: "EMP-0848", name: "Rahul Sharma", dept: "Engineering", submitted: 5, verified: 0, pending: 5, status: "Submitted" },
    { id: "EMP-0193", name: "Rohan Desai", dept: "Sales", submitted: 2, verified: 2, pending: 0, status: "Verified" },
    { id: "EMP-0056", name: "Kavya Reddy", dept: "Engineering", submitted: 3, verified: 1, pending: 2, status: "Review In Progress" },
    { id: "EMP-0012", name: "Arjun Nair", dept: "Product", submitted: 0, verified: 0, pending: 0, status: "Not Submitted" },
];

export default function ProofVerificationDashboard() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 1200, margin: "0 auto" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>Investment Proof Verifications</h1>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Review and approve employee submitted documents for final TDS calculation</div>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", height: 40, color: "#FFFFFF", fontSize: 14 }}>
                        FY 2024-25 <ChevronDown size={16} color="#8899AA" />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Employees (Old Regime)</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>358</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Submitted by</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>311</div>
                </div>
                <div style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#FFB800", marginBottom: 8 }}>Pending HR Review</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFB800" }}>47</div>
                </div>
                <div style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#00E5A0", marginBottom: 8 }}>Verification Complete</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>182</div>
                </div>
            </div>

            {/* Table Area */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>

                {/* Toolbar */}
                <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1A2A3A" }}>
                    <div style={{ display: "flex", gap: 16 }}>
                        <div style={{ position: "relative", width: 280 }}>
                            <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                            <input type="text" placeholder="Search employee..." style={{ width: "100%", height: 36, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, paddingLeft: 36, outline: "none" }} />
                        </div>
                        <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                            <Filter size={14} /> Status: Pending Review
                        </button>
                    </div>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", color: "#8899AA", fontSize: 12, textAlign: "left" }}>
                            <th style={{ padding: "16px 24px", fontWeight: 500 }}>Employee</th>
                            <th style={{ padding: "16px", fontWeight: 500 }}>Department</th>
                            <th style={{ padding: "16px", fontWeight: 500 }}>Total Proofs</th>
                            <th style={{ padding: "16px", fontWeight: 500 }}>Verified</th>
                            <th style={{ padding: "16px", fontWeight: 500 }}>Status</th>
                            <th style={{ padding: "16px 24px", fontWeight: 500, textAlign: "right" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EMPLOYEES.map((emp, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #1A2A3A" }}>
                                <td style={{ padding: "16px 24px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>{emp.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{emp.id}</div>
                                </td>
                                <td style={{ padding: "16px", fontSize: 13, color: "#FFFFFF" }}>{emp.dept}</td>
                                <td style={{ padding: "16px", fontSize: 13, color: "#FFFFFF" }}>{emp.submitted}</td>
                                <td style={{ padding: "16px", fontSize: 13, color: "#00E5A0" }}>{emp.verified}</td>
                                <td style={{ padding: "16px" }}>
                                    <div style={{
                                        display: "inline-block", padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600,
                                        background: emp.status === "Submitted" ? "rgba(255,184,0,0.1)" : emp.status === "Verified" ? "rgba(0,229,160,0.1)" : emp.status === "Review In Progress" ? "rgba(0,102,255,0.1)" : "#1A2A3A",
                                        color: emp.status === "Submitted" ? "#FFB800" : emp.status === "Verified" ? "#00E5A0" : emp.status === "Review In Progress" ? "#0066FF" : "#8899AA"
                                    }}>
                                        {emp.status}
                                    </div>
                                    {emp.pending > 0 && emp.status !== "Not Submitted" && (
                                        <span style={{ fontSize: 12, color: "#FF4444", marginLeft: 8 }}>({emp.pending} pending)</span>
                                    )}
                                </td>
                                <td style={{ padding: "16px 24px", textAlign: "right" }}>
                                    {(emp.status === "Submitted" || emp.status === "Review In Progress") ? (
                                        <Link href={`/tax/proof-review/${emp.id}`}>
                                            <button style={{ height: 32, padding: "0 16px", background: "#0066FF", border: "none", borderRadius: 6, color: "#FFFFFF", fontSize: 12, fontWeight: 600, cursor: "pointer" }} className="hover:opacity-90">
                                                Review Items
                                            </button>
                                        </Link>
                                    ) : (
                                        <button style={{ height: 32, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#8899AA", fontSize: 12, fontWeight: 500, cursor: "pointer" }} disabled>
                                            View
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
