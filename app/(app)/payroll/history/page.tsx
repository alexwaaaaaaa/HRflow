"use client";

import Link from "next/link";
import { Download, Search, Calendar, FileText, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";

const HISTORY = [
    { month: "October 2024", date: "28 Oct 2024", type: "Regular Payroll", emps: 840, gross: "₹4,12,50,000", net: "₹3,75,00,000", status: "Completed", by: "Priya Mehta" },
    { month: "October 2024", date: "15 Oct 2024", type: "Diwali Bonus", emps: 835, gross: "₹42,00,000", net: "₹42,00,000", status: "Completed", by: "Ajiit Finance" },
    { month: "September 2024", date: "28 Sep 2024", type: "Regular Payroll", emps: 825, gross: "₹3,95,00,000", net: "₹3,60,00,000", status: "Completed", by: "Priya Mehta" },
    { month: "August 2024", date: "28 Aug 2024", type: "Regular Payroll", emps: 810, gross: "₹3,88,00,000", net: "₹3,52,00,000", status: "Completed", by: "Priya Mehta" },
    { month: "July 2024", date: "28 Jul 2024", type: "Regular Payroll", emps: 805, gross: "₹3,85,00,000", net: "₹3,48,00,000", status: "Completed", by: "Priya Mehta" },
];

export default function PayrollHistory() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Payroll History & Archives</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Access past payroll runs, download registers, and audit logs.</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <Link href="/payroll/reports/variance">
                        <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            <TrendingUp size={16} /> Month Variance Report
                        </button>
                    </Link>
                    <Link href="/payroll/reports/variance">
                        <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            <Download size={16} /> Export Consolidated YTD
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search by month or type..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <select style={{ height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                        <option>FY: 2024-2025</option>
                        <option>FY: 2023-2024</option>
                    </select>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Payroll Month</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Run Details</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Employees</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Gross Amount</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Net Amount</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</th>
                            <th style={{ padding: "16px 20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {HISTORY.map((run, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                                        <Calendar size={14} color="#8899AA" /> {run.month}
                                    </div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>Processed: {run.date}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, color: "#E5E7EB", marginBottom: 4 }}>{run.type}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>By: {run.by}</div>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#E5E7EB" }}>{run.emps}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#FFFFFF" }}>{run.gross}</td>
                                <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: "#00E5A0" }}>{run.net}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: "rgba(0,229,160,0.1)", color: "#00E5A0", display: "inline-flex", alignItems: "center", gap: 4 }}>
                                        <CheckCircle2 size={12} /> {run.status}
                                    </span>
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                                        <Link href="/payroll/reports/variance" style={{ textDecoration: "none" }}>
                                            <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                                <FileText size={14} /> Register
                                            </button>
                                        </Link>
                                        <Link href="/payroll/audit" title="View Audit Log" style={{ textDecoration: "none" }}>
                                            <button style={{ height: 32, width: 32, padding: 0, background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#8899AA", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <AlertTriangle size={14} />
                                            </button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ padding: "16px 0", color: "#8899AA", fontSize: 13, textAlign: "right" }}>
                Showing past 5 payroll records
            </div>
        </div>
    );
}
