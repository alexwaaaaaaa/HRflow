"use client";

import React from "react";
import { ArrowLeft, Coins, TrendingDown, BookOpen, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LeaveEncashmentPage() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", color: "#FFFFFF" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <Link href="/payroll" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Back to Payroll
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                            Leave Encashment — Payroll Processing
                            <span style={{ fontSize: 14, color: "#8899AA", background: "#1A2A3A", padding: "4px 12px", borderRadius: 16 }}>March 2025</span>
                        </h2>
                    </div>
                    <p style={{ color: "#8899AA", fontSize: 14, marginTop: 8 }}>Process approved leave encashment requests with automatic Section 10(10AA) tax exemption.</p>
                </div>
                <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    Include in March 2025 Payroll <ArrowRight size={18} />
                </button>
            </div>

            {/* Top Stats */}
            <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                <div style={{ flex: 1, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 24, background: "#1A2A3A", display: "flex", alignItems: "center", justifyContent: "center", color: "#8899AA" }}>
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <div style={{ color: "#8899AA", fontSize: 13, marginBottom: 4 }}>Approved Requests</div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>8</div>
                    </div>
                </div>

                <div style={{ flex: 1, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 24, background: "#FFB00020", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFB800" }}>
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <div style={{ color: "#8899AA", fontSize: 13, marginBottom: 4 }}>Total Tax Deducted (TDS)</div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>₹28,600</div>
                    </div>
                </div>

                <div style={{ flex: 1, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 24, background: "#00E5A020", display: "flex", alignItems: "center", justifyContent: "center", color: "#00E5A0" }}>
                        <Coins size={24} />
                    </div>
                    <div>
                        <div style={{ color: "#8899AA", fontSize: 13, marginBottom: 4 }}>Total Net Payout</div>
                        <div style={{ fontSize: 24, fontWeight: 600, color: "#00E5A0" }}>₹3,13,400</div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>Gross: ₹3,42,000</div>
                    </div>
                </div>
            </div>

            {/* Exemption Note */}
            <div style={{ background: "#1A2A3A", borderRadius: 12, padding: "16px 24px", display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 24, borderLeft: "4px solid #00E5A0" }}>
                <AlertCircle size={20} color="#00E5A0" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                    <h4 style={{ margin: "0 0 6px 0", fontSize: 14, fontWeight: 600 }}>Section 10(10AA) Income Tax Exemption</h4>
                    <p style={{ margin: 0, fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                        The maximum limit for leave encashment exemption for non-government employees is ₹25,00,000 (lifetime cap). Per-day salary calculation formula used is: <strong style={{ color: "#FFF" }}>Monthly Basic ÷ 26 Days</strong>. Leave encashment during employment (i.e. not at retirement) is fully taxable in the hands of the employee.
                    </p>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: "#0D1928", color: "#8899AA", textAlign: "left" }}>
                                <th style={{ padding: "16px 24px", fontWeight: 500 }}>Employee</th>
                                <th style={{ padding: "16px", fontWeight: 500 }}>Type</th>
                                <th style={{ padding: "16px", fontWeight: 500, textAlign: "center" }}>Days</th>
                                <th title="Monthly Basic / 26" style={{ padding: "16px", fontWeight: 500, textAlign: "right" }}>Per Day (₹)</th>
                                <th style={{ padding: "16px", fontWeight: 500, textAlign: "right" }}>Gross (₹)</th>
                                <th style={{ padding: "16px", fontWeight: 500, textAlign: "right", color: "#FFB800" }}>Sec 10(10AA)<br />Exempt (₹)</th>
                                <th style={{ padding: "16px", fontWeight: 500, textAlign: "right" }}>Taxable (₹)</th>
                                <th style={{ padding: "16px", fontWeight: 500, textAlign: "right", color: "#FF5555" }}>TDS (₹)</th>
                                <th style={{ padding: "16px 24px", fontWeight: 500, textAlign: "right" }}>Net Payout (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: "Rajesh Kumar", id: "EMP001", type: "PL", days: 10, per: 1538, gross: 15380, exempt: 0, tax: 15380, tds: 3076, st: "Service" },
                                { name: "Priya Sharma", id: "EMP002", type: "PL", days: 30, per: 1077, gross: 32308, exempt: 25000, tax: 7308, tds: 1462, st: "Retirement" },
                                { name: "Amit Verma", id: "EMP093", type: "EL", days: 15, per: 1346, gross: 20192, exempt: 0, tax: 20192, tds: 4038, st: "Service" },
                                { name: "Vikram Mehta", id: "EMP014", type: "PL", days: 45, per: 1731, gross: 77885, exempt: 77885, tax: 0, tds: 0, st: "Resignation" }, // Assume exit encashment
                                { name: "Neha Singh", id: "EMP112", type: "PL", days: 5, per: 962, gross: 4808, exempt: 0, tax: 4808, tds: 481, st: "Service" },
                                { name: "Ravi Shankar", id: "EMP205", type: "EL", days: 12, per: 1154, gross: 13846, exempt: 0, tax: 13846, tds: 1385, st: "Service" },
                                { name: "Anita Desai", id: "EMP268", type: "PL", days: 20, per: 1231, gross: 24615, exempt: 0, tax: 24615, tds: 2462, st: "Service" },
                                { name: "Suresh Babu", id: "EMP342", type: "PL", days: 60, per: 2558, gross: 153462, exempt: 153462, tax: 0, tds: 0, st: "Retirement" }
                            ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: "1px solid #1A2A3A" }}>
                                    <td style={{ padding: "16px 24px" }}>
                                        <div style={{ fontWeight: 500 }}>{row.name}</div>
                                        <div style={{ fontSize: 11, color: "#8899AA", marginTop: 2 }}>{row.id} • {row.st}</div>
                                    </td>
                                    <td style={{ padding: "16px" }}>
                                        <span style={{ background: "#1A2A3A", color: "#8899AA", padding: "4px 8px", borderRadius: 4, fontSize: 11 }}>{row.type}</span>
                                    </td>
                                    <td style={{ padding: "16px", textAlign: "center", fontWeight: 600 }}>{row.days}</td>
                                    <td style={{ padding: "16px", textAlign: "right", color: "#8899AA" }}>{row.per.toLocaleString()}</td>
                                    <td style={{ padding: "16px", textAlign: "right", fontWeight: 500 }}>{row.gross.toLocaleString()}</td>
                                    <td style={{ padding: "16px", textAlign: "right", color: row.exempt > 0 ? "#FFB800" : "#8899AA" }}>{row.exempt.toLocaleString()}</td>
                                    <td style={{ padding: "16px", textAlign: "right", color: "#8899AA" }}>{row.tax.toLocaleString()}</td>
                                    <td style={{ padding: "16px", textAlign: "right", color: row.tds > 0 ? "#FF5555" : "#8899AA" }}>-{row.tds.toLocaleString()}</td>
                                    <td style={{ padding: "16px 24px", textAlign: "right", fontWeight: 600, color: "#00E5A0" }}>{(row.gross - row.tds).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
