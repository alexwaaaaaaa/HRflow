"use client";

import Link from "next/link";
import { Plus, Search, Filter, UploadCloud, TrendingUp } from "lucide-react";

const BONUSES = [
    { id: "BON-01", name: "Diwali Bonus 2024", type: "Flat Percentage", amount: "₹45,50,000", emps: 840, month: "Oct 2024", status: "Paid" },
    { id: "BON-02", name: "Q3 Performance Bonus", type: "Performance Linked", amount: "₹12,40,000", emps: 45, month: "Nov 2024", status: "Pending Approval" },
    { id: "BON-03", name: "Referral Bonus (Q3)", type: "Fixed Amount", amount: "₹1,50,000", emps: 3, month: "Nov 2024", status: "Draft" },
];

export default function BonusPayout() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Bonus & Off-Cycle Payouts</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Manage festive bonuses, performance incentives, and referral payouts.</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <UploadCloud size={16} /> Import Bulk
                    </button>
                    <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Plus size={18} /> Create Bonus Batch
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Bonus Disbursed (YTD)</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>₹64,20,000</div>
                    <div style={{ fontSize: 12, color: "#00E5A0", marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}><TrendingUp size={14} /> +12% from last year</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Upcoming Payouts (Nov)</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFB800" }}>₹13,90,000</div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 8 }}>Across 2 batches</div>
                </div>
                <div style={{ background: "rgba(0,102,255,0.05)", border: "1px dashed rgba(0,102,255,0.3)", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>TDS on Bonus</h3>
                    <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>By default, bonuses are taxed strictly in the month they are paid. You can configure TDS spacing across remaining months in settings.</div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search batch name..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                </div>
                <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Filter size={16} /> Filters
                </button>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Batch Name</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Calculation Type</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Target Month</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Total Amount</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</th>
                            <th style={{ padding: "16px 20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {BONUSES.map((batch) => (
                            <tr key={batch.id} style={{ borderBottom: "1px solid #1A2A3A", cursor: "pointer", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{batch.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{batch.id} • {batch.emps} Employees</div>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#E5E7EB" }}>{batch.type}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#E5E7EB" }}>{batch.month}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>{batch.amount}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: batch.status === "Paid" ? "rgba(0,229,160,0.1)" : batch.status === "Pending Approval" ? "rgba(255,184,0,0.1)" : "rgba(136,153,170,0.1)", color: batch.status === "Paid" ? "#00E5A0" : batch.status === "Pending Approval" ? "#FFB800" : "#8899AA" }}>
                                        {batch.status}
                                    </span>
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                    <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer" }}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
