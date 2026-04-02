"use client";

import React from "react";
import { ArrowLeft, CheckCircle2, ChevronDown, Award, TrendingUp, Filter, Search } from "lucide-react";
import Link from "next/link";

export default function IncentivePaymentPage() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", color: "#FFFFFF" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <Link href="/payroll" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Back to Payroll
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                            Incentive Payments
                            <span style={{ fontSize: 14, color: "#8899AA", background: "#1A2A3A", padding: "4px 12px", borderRadius: 16 }}>March 2025</span>
                        </h2>
                    </div>
                </div>
                <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={18} /> Include All in March Payroll
                </button>
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                {/* Left side metrics */}
                <div style={{ flex: 2, display: "flex", gap: 16 }}>
                    <div style={{ flex: 1, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                            <Award size={14} color="#00E5A0" /> Perfect Attendance
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>₹1,05,000</div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>42 employees (₹2,500 each)</div>
                    </div>

                    <div style={{ flex: 1, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                            <Award size={14} color="#FFB800" /> Referral Bonuses
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>₹30,000</div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>2 employees (₹15,000 each)</div>
                    </div>

                    <div style={{ flex: 1, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                            <Award size={14} color="#44AAFF" /> Productivity Q1
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>₹28,000</div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>5 employees (variable % mix)</div>
                    </div>
                </div>

                {/* Right side AI analysis */}
                <div style={{ flex: 1, background: "#00E5A010", border: "1px solid #00E5A030", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#00E5A0", fontSize: 14, fontWeight: 600 }}>
                        <TrendingUp size={18} /> AI Impact Analysis
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>Total: ₹1,63,000</div>
                    <p style={{ margin: 0, fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                        Highest incentive payout in 6 months. Estimated to boost team satisfaction by <strong style={{ color: "#FFF" }}>+7%</strong> and reduce attrition risk by 12%.
                    </p>
                </div>
            </div>

            {/* In-depth Table */}
            <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #1A2A3A" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Computed Breakdown (49 Total)</h3>
                    <div style={{ display: "flex", gap: 12 }}>
                        <div style={{ position: "relative" }}>
                            <Search size={14} color="#8899AA" style={{ position: "absolute", left: 12, top: 11 }} />
                            <input type="text" placeholder="Search employee..." style={{ width: 200, height: 36, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px 0 32px", outline: "none", fontSize: 13 }} />
                        </div>
                        <button style={{ height: 36, padding: "0 16px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#8899AA", fontSize: 13, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>

                {/* Group Collapsible Pattern */}
                {[
                    {
                        group: "Perfect Attendance", color: "#00E5A0", items: [
                            { name: "Rahul Gupta", id: "EMP012", amt: 2500, tds: 250, st: "Approved" },
                            { name: "Meena Iyer", id: "EMP085", amt: 2500, tds: 250, st: "Approved" },
                            { name: "Kavya Nair", id: "EMP091", amt: 2500, tds: 250, st: "Approved" },
                        ]
                    },
                    {
                        group: "Employee Referral Bonus", color: "#FFB800", items: [
                            { name: "Vikram Mehta", id: "EMP014", amt: 15000, tds: 3000, st: "Approved" },
                            { name: "Rajesh Kumar", id: "EMP081", amt: 15000, tds: 1500, st: "Pending Approval", isPending: true },
                        ]
                    }
                ].map((category, i) => (
                    <div key={i} style={{ borderBottom: i === 0 ? "1px solid #1A2A3A" : "none" }}>
                        <div style={{ padding: "12px 24px", background: "#0D1928", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                            <ChevronDown size={16} color="#8899AA" />
                            <span style={{ fontSize: 14, fontWeight: 600, color: category.color }}>{category.group}</span>
                            <span style={{ fontSize: 12, color: "#8899AA" }}>{category.items.length} records</span>
                        </div>

                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                                <tbody>
                                    {category.items.map((row, j) => (
                                        <tr key={j} style={{ borderBottom: "1px solid #1A2A3A" }}>
                                            <td style={{ padding: "12px 16px 12px 64px", width: "30%" }}>
                                                <div style={{ fontWeight: 500 }}>{row.name}</div>
                                                <div style={{ fontSize: 11, color: "#8899AA", marginTop: 2 }}>{row.id}</div>
                                            </td>
                                            <td style={{ padding: "16px", textAlign: "right" }}>
                                                <span style={{ color: "#8899AA", fontSize: 12, marginRight: 8 }}>Gross:</span>
                                                <span style={{ fontWeight: 500 }}>₹{row.amt.toLocaleString()}</span>
                                            </td>
                                            <td style={{ padding: "16px", textAlign: "right" }}>
                                                <span style={{ color: "#8899AA", fontSize: 12, marginRight: 8 }}>TDS:</span>
                                                <span style={{ color: "#FF5555" }}>-₹{row.tds.toLocaleString()}</span>
                                            </td>
                                            <td style={{ padding: "16px", textAlign: "right" }}>
                                                <span style={{ color: "#8899AA", fontSize: 12, marginRight: 8 }}>Net:</span>
                                                <span style={{ fontWeight: 600, color: "#00E5A0" }}>₹{(row.amt - row.tds).toLocaleString()}</span>
                                            </td>
                                            <td style={{ padding: "16px 24px", textAlign: "right" }}>
                                                {row.isPending ? (
                                                    <span style={{ fontSize: 12, color: "#FFB800", background: "#FFB00020", padding: "4px 8px", borderRadius: 4 }}>Pending Appr.</span>
                                                ) : (
                                                    <span style={{ fontSize: 12, color: "#00E5A0", background: "#00E5A015", padding: "4px 8px", borderRadius: 4 }}>Approved</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

                <div style={{ padding: "16px 24px", background: "#050A10", textAlign: "center", color: "#8899AA", fontSize: 13, cursor: "pointer" }}>
                    + View 42 more records
                </div>
            </div>

        </div>
    );
}
