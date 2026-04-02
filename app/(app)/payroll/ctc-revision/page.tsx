"use client";

import Link from "next/link";
import { PenTool, Search, ArrowUpRight, AlertTriangle } from "lucide-react";

const REVISIONS = [
    { id: "REV-901", emp: "Rahul Sharma", oldCtc: 800000, newCtc: 1200000, effective: "01 Nov 2024", type: "Promotion", status: "Pending Approval", by: "Priya Mehta" },
    { id: "REV-902", emp: "Sneha Patil", oldCtc: 1400000, newCtc: 1650000, effective: "01 Oct 2024", type: "Annual Appraisal", status: "Approved", by: "Manager" },
    { id: "REV-903", emp: "Amit Kumar", oldCtc: 650000, newCtc: 700000, effective: "15 Nov 2024", type: "Market Correction", status: "Draft", by: "HR Admin" },
];

export default function CtcRevisionWorkflow() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>CTC Revision Pipeline</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Review, approve, and auto-sync salary increments before payroll run.</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <Link href="/payroll/ctc-revision/bulk">
                        <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            Bulk Upload Revisions
                        </button>
                    </Link>
                    <Link href="/payroll/ctc-revision/fitment">
                        <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            <PenTool size={18} /> New Revision
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Pending Approvals</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFB800" }}>14</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Approved (Unsynced to Payroll)</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#0066FF" }}>8</div>
                </div>
                <div style={{ background: "rgba(255,184,0,0.05)", border: "1px dashed rgba(255,184,0,0.3)", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                        <AlertTriangle size={14} color="#FFB800" />
                        <h3 style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>Backdated Impact</h3>
                    </div>
                    <div style={{ fontSize: 12, color: "#8899AA", lineHeight: 1.5 }}>3 revisions have effective dates in the past. Arrears will be calculated automatically upon approval.</div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search employee..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <select style={{ height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                        <option>Status: Pending Approval</option>
                        <option>Status: Approved</option>
                        <option>Status: Applied to Payroll</option>
                    </select>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Employee & Request</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Current CTC</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Proposed CTC</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Delta</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</th>
                            <th style={{ padding: "16px 20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {REVISIONS.map((rev) => (
                            <tr key={rev.id} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{rev.emp}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA", display: "flex", gap: 6, alignItems: "center" }}>
                                        {rev.type} • Eff: {rev.effective}
                                        {rev.effective.includes("Oct") && <span title="Backdated Arrears Applicable" style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB800", display: "inline-block" }} />}
                                    </div>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#E5E7EB" }}>₹{rev.oldCtc.toLocaleString()}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>₹{rev.newCtc.toLocaleString()}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, color: "#00E5A0", fontWeight: 600, marginBottom: 4 }}>+ ₹{(rev.newCtc - rev.oldCtc).toLocaleString()}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>+ {(((rev.newCtc - rev.oldCtc) / rev.oldCtc) * 100).toFixed(1)}% Hike</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: rev.status === "Approved" ? "rgba(0,229,160,0.1)" : rev.status === "Pending Approval" ? "rgba(255,184,0,0.1)" : "rgba(255,255,255,0.05)", color: rev.status === "Approved" ? "#00E5A0" : rev.status === "Pending Approval" ? "#FFB800" : "#E5E7EB" }}>
                                        {rev.status}
                                    </span>
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                    {rev.status === "Pending Approval" ? (
                                        <Link href="/payroll/ctc-revision/fitment" style={{ textDecoration: "none" }}>
                                            <button style={{ height: 32, padding: "0 16px", background: "#FFB800", border: "none", borderRadius: 6, color: "#000", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                                                Review
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link href="/payroll/ctc-revision/fitment" style={{ textDecoration: "none" }}>
                                            <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                                                View <ArrowUpRight size={14} />
                                            </button>
                                        </Link>
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
