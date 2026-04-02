"use client";

import Link from "next/link";
import { Search, Filter, RefreshCw, ArrowUpRight } from "lucide-react";

const COMMISSIONS = [
    { id: "COM-11", emp: "Neha Gupta", role: "Account Executive", deals: 12, revenue: 1250000, rate: 5, payout: 62500, status: "Calculated" },
    { id: "COM-12", emp: "Rajeev Singh", role: "Sales Director", deals: 45, revenue: 8500000, rate: 2, payout: 170000, status: "Approved" },
    { id: "COM-13", emp: "Anita Desai", role: "SDR", deals: 28, revenue: 450000, rate: 10, payout: 45000, status: "Calculated" },
    { id: "COM-14", emp: "Suresh Pillai", role: "Account Executive", deals: 8, revenue: 680000, rate: 5, payout: 34000, status: "Draft" },
];

export default function CommissionPayout() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Sales Commissions (Nov 2024)</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Manage revenue-based incentive payouts for the sales and SDR teams.</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <RefreshCw size={16} color="#0066FF" /> Sync with CRM (Salesforce)
                    </button>
                    <button style={{ height: 40, padding: "0 20px", background: "#1A2A3A", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        Approve Batch
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Revenue Closed</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>₹2.45 Cr</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Commission Value</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>₹8,45,500</div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>3.4% Blended Rate</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Eligible Reps</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>38</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Synced Deals</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#0066FF" }}>214</div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search sales rep..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
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
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Rep Name</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Deals Closed</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Eligible Revenue</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Comm. Rate</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Final Payout</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</th>
                            <th style={{ padding: "16px 20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {COMMISSIONS.map((comm) => (
                            <tr key={comm.id} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{comm.emp}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{comm.role}</div>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#E5E7EB" }}>{comm.deals} Deals</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#E5E7EB" }}>₹{comm.revenue.toLocaleString()}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#00E5A0" }}>{comm.rate}%</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>₹{comm.payout.toLocaleString()}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: comm.status === "Approved" ? "rgba(0,229,160,0.1)" : "rgba(136,153,170,0.1)", color: comm.status === "Approved" ? "#00E5A0" : "#8899AA" }}>
                                        {comm.status}
                                    </span>
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                    <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                                        View Deals <ArrowUpRight size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
