"use client";

import Link from "next/link";
import { Download, Users, Calendar, Search, HandCoins } from "lucide-react";

const JOINERS = [
    { emp: "Neha Gupta", id: "EMP-450", doj: "15 Nov 2024", baseDays: 30, payDays: 16, ctc: 1200000, monthlyGross: 100000, proRata: 53333.33 },
    { emp: "Rajeev Kumar", id: "EMP-451", doj: "05 Nov 2024", baseDays: 30, payDays: 26, ctc: 800000, monthlyGross: 66666.67, proRata: 57777.78 },
    { emp: "Anita Desai", id: "EMP-452", doj: "25 Nov 2024", baseDays: 30, payDays: 6, ctc: 1500000, monthlyGross: 125000, proRata: 25000.00 },
];

export default function MidMonthJoinerPreview() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Mid-Month Joiners & Leavers</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Verify pro-rata salary logic for new hires and exited employees in Nov 2024 cycle.</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 20px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Download size={16} /> Export Preview
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <Users size={16} color="#00E5A0" />
                        <div style={{ fontSize: 13, color: "#8899AA" }}>New Joiners (Pro-Rata)</div>
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>12</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <Users size={16} color="#FFB800" />
                        <div style={{ fontSize: 13, color: "#8899AA" }}>Exited Employees</div>
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>4</div>
                </div>
                <div style={{ background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 12, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <HandCoins size={16} color="#0066FF" />
                        <div style={{ fontSize: 13, color: "#8899AA" }}>Pro-Rata Strategy</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Actual Days (30 in Nov)</div>
                    <div style={{ fontSize: 12, color: "#0066FF", marginTop: 4 }}><Link href="/payroll-settings/pro-rata" style={{ color: "inherit" }}>Change Settings →</Link></div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search employee..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <select style={{ height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                        <option>Type: New Joiners</option>
                        <option>Type: Exited</option>
                    </select>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Employee</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Date of Joining</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center" }}>Payable Days</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>Standard Gross</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>Pro-Rated Gross</th>
                            <th style={{ padding: "16px 20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {JOINERS.map((row) => (
                            <tr key={row.id} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{row.emp}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{row.id}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, color: "#E5E7EB", display: "flex", alignItems: "center", gap: 6 }}>
                                        <Calendar size={14} color="#8899AA" /> {row.doj}
                                    </div>
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "center" }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0", background: "rgba(0,229,160,0.1)", padding: "4px 8px", borderRadius: 6 }}>{row.payDays} / {row.baseDays}</span>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#8899AA", textAlign: "right" }}>₹{row.monthlyGross.toLocaleString()}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: "#FFFFFF", textAlign: "right" }}>₹{row.proRata.toFixed(2)}</td>
                                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                    <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer" }}>View Breakup</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
