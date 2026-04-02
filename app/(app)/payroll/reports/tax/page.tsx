"use client";

import Link from "next/link";
import { Download, Search, Filter, ShieldAlert, BookUser } from "lucide-react";

const TAX_DATA = [
    { emp: "Rahul Sharma", id: "EMP-001", regime: "New Regime", pf: 1800, pt: 200, tds: 15400, esi: 0, total: 17400, projected: 184800 },
    { emp: "Sneha Patil", id: "EMP-045", regime: "Old Regime", pf: 1800, pt: 200, tds: 4200, esi: 0, total: 6200, projected: 50400 },
    { emp: "Amit Kumar", id: "EMP-102", regime: "New Regime", pf: 1500, pt: 0, tds: 0, esi: 240, total: 1740, projected: 0 },
    { emp: "Vikram Reddy", id: "EMP-204", regime: "Old Regime", pf: 1800, pt: 200, tds: 32000, esi: 0, total: 34000, projected: 384000 },
];

export default function PayrollTaxOverview() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Payroll Tax & Statutory Overview</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Review PF, PT, ESI, and TDS deductions for the Nov 2024 cycle.</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 20px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Download size={16} /> Export TDS Register
                    </button>
                    <button style={{ height: 40, padding: "0 20px", background: "#0066FF", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <ShieldAlert size={16} /> Generate Challans
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total TDS Deducted</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444" }}>₹14,50,000</div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>710 Employees</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Provident Fund (PF)</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444" }}>₹15,12,000</div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>Both EE & ER Share</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Professional Tax (PT)</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444" }}>₹1,68,000</div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>Across 14 States</div>
                </div>
                <div style={{ background: "rgba(0,102,255,0.05)", border: "1px dashed rgba(0,102,255,0.3)", borderRadius: 12, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <BookUser size={16} color="#0066FF" />
                        <div style={{ fontSize: 13, color: "#E5E7EB", fontWeight: 500 }}>Tax Regimes</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8899AA", marginBottom: 4 }}>
                        <span>New Regime:</span>
                        <span style={{ color: "#FFFFFF", fontWeight: 600 }}>640</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8899AA" }}>
                        <span>Old Regime:</span>
                        <span style={{ color: "#FFFFFF", fontWeight: 600 }}>202</span>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search employee..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <select style={{ height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                        <option>State: All</option>
                        <option>Maharashtra (MH)</option>
                        <option>Karnataka (KA)</option>
                    </select>
                </div>
                <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Filter size={16} /> Filters
                </button>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Employee</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Tax Regime</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>PF (EE)</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>PT</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>TDS</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>Total Deductions</th>
                            <th style={{ padding: "16px 20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {TAX_DATA.map((row) => (
                            <tr key={row.id} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{row.emp}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{row.id}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{ fontSize: 12, fontWeight: 500, padding: "4px 8px", background: row.regime === "New Regime" ? "rgba(0,102,255,0.1)" : "rgba(255,255,255,0.05)", color: row.regime === "New Regime" ? "#0066FF" : "#E5E7EB", borderRadius: 4 }}>
                                        {row.regime}
                                    </span>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#FF4444", textAlign: "right" }}>{row.pf > 0 ? `-₹${row.pf}` : "-"}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#FF4444", textAlign: "right" }}>{row.pt > 0 ? `-₹${row.pt}` : "-"}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#FF4444", fontWeight: 600, textAlign: "right" }}>{row.tds > 0 ? `-₹${row.tds}` : "-"}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: "#FFFFFF", textAlign: "right" }}>₹{row.total}</td>
                                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                    <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer" }}>Tax Sheet</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
