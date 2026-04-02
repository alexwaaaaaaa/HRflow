"use client";

import React, { useState } from "react";
import { ArrowLeft, ShieldCheck, CheckCircle2, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function StatutoryBonusPage() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", color: "#FFFFFF" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <Link href="/payroll" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Back to Payroll
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, display: "flex", alignItems: "center", gap: 12 }}>
                            Statutory Bonus — FY 2024-25
                            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#00E5A020", color: "#00E5A0", padding: "4px 12px", borderRadius: 16, fontSize: 13, border: "1px solid #00E5A040" }}>
                                <ShieldCheck size={14} /> Payment of Bonus Act, 1965
                            </div>
                        </h2>
                    </div>
                    <p style={{ color: "#8899AA", fontSize: 14, marginTop: 8 }}>Process annual minimum/maximum bonus for eligible employees based on qualifying salary.</p>
                </div>
                <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <PlayCircle size={18} /> Process Bonus Payroll
                </button>
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                {/* Eligibility Criteria */}
                <div style={{ flex: 1, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px 0", color: "#FFFFFF" }}>Act Compliance Check</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            "Establishment type: Factory / Non-seasonal",
                            "Employee salary: ≤ ₹21,000/month",
                            "Minimum 30 working days verified",
                            "Minimum bonus: 8.33% of annual salary",
                            "Maximum bonus: 20% of annual salary"
                        ].map((rule, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#8899AA" }}>
                                <CheckCircle2 size={16} color="#00E5A0" /> {rule}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div style={{ flex: 1, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: "#8899AA", fontSize: 13, marginBottom: 8 }}>Eligible Employees</div>
                        <div style={{ fontSize: 32, fontWeight: 600 }}>89</div>
                        <div style={{ fontSize: 13, color: "#00E5A0", marginTop: 4 }}>Salary ≤ ₹21,000/month</div>
                    </div>
                    <div style={{ width: 1, height: 60, background: "#1A2A3A", margin: "0 24px" }}></div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: "#8899AA", fontSize: 13, marginBottom: 8 }}>Ineligible Employees</div>
                        <div style={{ fontSize: 32, fontWeight: 600, color: "#8899AA" }}>258</div>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Salary &gt; ₹21,000/month</div>
                    </div>
                </div>

                {/* Total Payout */}
                <div style={{ flex: 1, background: "#00E5A010", border: "1px solid #00E5A030", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#00E5A0", fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
                        <ShieldCheck size={18} /> 100% Compliant Array
                    </div>
                    <div style={{ color: "#8899AA", fontSize: 13, marginBottom: 4 }}>Total Statutory Payout</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF" }}>₹12,84,000</div>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #1A2A3A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Bonus Computation (89 Eligible)</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 13, color: "#8899AA" }}>Bulk Action:</span>
                        <select style={{ height: 32, background: "#1A2A3A", border: "none", borderRadius: 6, color: "#FFFFFF", padding: "0 12px", outline: "none", fontSize: 13 }}>
                            <option>Set all to Min (8.33%)</option>
                            <option>Set all to Max (20%)</option>
                            <option>Set to 10%</option>
                        </select>
                        <button style={{ height: 32, padding: "0 16px", background: "#00E5A0", border: "none", borderRadius: 6, color: "#060B14", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Apply</button>
                    </div>
                </div>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: "#0D1928", color: "#8899AA", textAlign: "left" }}>
                                <th style={{ padding: "12px 24px", fontWeight: 500 }}>Employee</th>
                                <th style={{ padding: "12px 16px", fontWeight: 500, textAlign: "right" }}>Annual Basic (₹)</th>
                                <th style={{ padding: "12px 16px", fontWeight: 500, textAlign: "right" }}>Qualifying (₹)</th>
                                <th style={{ padding: "12px 16px", fontWeight: 500, textAlign: "right" }}>Min Bonus 8.33%</th>
                                <th style={{ padding: "12px 16px", fontWeight: 500, textAlign: "center" }}>Declared %</th>
                                <th style={{ padding: "12px 16px", fontWeight: 500, textAlign: "right" }}>Gross Bonus (₹)</th>
                                <th style={{ padding: "12px 16px", fontWeight: 500, textAlign: "right" }}>TDS (₹)</th>
                                <th style={{ padding: "12px 24px", fontWeight: 500, textAlign: "right" }}>Net Bonus (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: "Mohan Lal", id: "EMP234", basic: 144000, qual: 144000, min: 11995, pct: 10, tds: 2880 },
                                { name: "Shanti Devi", id: "EMP256", basic: 192000, qual: 192000, min: 15994, pct: 10, tds: 3840 },
                                { name: "Raju Bhai", id: "EMP281", basic: 240000, qual: 252000, min: 19992, pct: 15, tds: 5400 }, // Capped logic implicitly handled
                                { name: "Kamla Kamat", id: "EMP302", basic: 110000, qual: 110000, min: 9163, pct: 8.33, tds: 0 },
                                { name: "Ajay Singh", id: "EMP310", basic: 168000, qual: 168000, min: 13994, pct: 12, tds: 4032 },
                            ].map((emp, i) => {
                                const gross = Math.round(emp.qual * (emp.pct / 100));
                                const net = gross - emp.tds;
                                return (
                                    <tr key={i} style={{ borderBottom: "1px solid #1A2A3A" }}>
                                        <td style={{ padding: "12px 24px" }}>
                                            <div style={{ fontWeight: 500 }}>{emp.name}</div>
                                            <div style={{ fontSize: 11, color: "#8899AA", marginTop: 2 }}>{emp.id}</div>
                                        </td>
                                        <td style={{ padding: "12px 16px", textAlign: "right" }}>{emp.basic.toLocaleString()}</td>
                                        <td style={{ padding: "12px 16px", textAlign: "right" }}>{emp.qual.toLocaleString()}</td>
                                        <td style={{ padding: "12px 16px", textAlign: "right", color: "#8899AA" }}>{emp.min.toLocaleString()}</td>
                                        <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                            <input type="number" defaultValue={emp.pct} style={{ width: 60, height: 28, background: "#1A2A3A", border: "1px solid #2A3A4A", borderRadius: 4, color: "#FFF", textAlign: "center", outline: "none" }} /> %
                                        </td>
                                        <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 500 }}>{gross.toLocaleString()}</td>
                                        <td style={{ padding: "12px 16px", textAlign: "right", color: "#FF5555" }}>-{emp.tds.toLocaleString()}</td>
                                        <td style={{ padding: "12px 24px", textAlign: "right", fontWeight: 600, color: "#00E5A0" }}>{net.toLocaleString()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
