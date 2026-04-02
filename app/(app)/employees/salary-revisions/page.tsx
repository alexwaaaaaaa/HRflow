"use client";

import { Search, Download, FileText } from "lucide-react";
import Link from "next/link";

const REVISIONS = [
    { id: 1, empId: "EMP-0848", name: "Rahul Kumar Sharma", dept: "Engineering", oldCtc: 1200000, newCtc: 1380000, pct: 15.0, date: "01/04/2024", type: "Annual Increment", by: "Priya Mehta", status: "Approved" },
    { id: 2, empId: "EMP-0210", name: "Sneha Rao", dept: "Marketing", oldCtc: 850000, newCtc: 950000, pct: 11.8, date: "15/03/2024", type: "Market Correction", by: "Priya Mehta", status: "Approved" },
    { id: 3, empId: "EMP-0412", name: "Karan Mehta", dept: "Engineering", oldCtc: 1800000, newCtc: 2400000, pct: 33.3, date: "01/03/2024", type: "Promotion", by: "Super Admin", status: "Pending" },
    { id: 4, empId: "EMP-0115", name: "Vikram Singh", dept: "Sales", oldCtc: 600000, newCtc: 720000, pct: 20.0, date: "01/02/2024", type: "Annual Increment", by: "Rohan Desai", status: "Approved" },
    { id: 5, empId: "EMP-0992", name: "Ananya Patel", dept: "Product", oldCtc: 2100000, newCtc: 2100000, pct: 0, date: "01/01/2024", type: "Variable Payout", by: "Priya Mehta", status: "Approved" },
];

export default function SalaryRevisionsHistory() {
    return (
        <div style={{ paddingBottom: 60 }} className="animate-fade-in">
            {/* Header */}
            <div style={{ padding: "32px 32px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Salary Revision History</h1>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Track all compensation changes and approvals</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:border-[#445566]">
                        <Download size={14} /> Export to Excel
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, padding: "0 32px 24px" }}>
                {[
                    { label: "Total Revisions (This Year)", val: "47" },
                    { label: "Average Increment", val: "14.2%", green: true },
                    { label: "Total Cost Impact", val: "₹1.2 Cr" },
                ].map(c => (
                    <div key={c.label} style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 8, textTransform: "uppercase" }}>{c.label}</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: c.green ? "#00E5A0" : "#FFFFFF" }}>{c.val}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div style={{ padding: "0 32px 16px", display: "flex", gap: 12 }}>
                <div style={{ position: "relative", width: 280 }}>
                    <Search size={16} color="#8899AA" style={{ position: "absolute", left: 14, top: 12 }} />
                    <input placeholder="Search employee..." style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 40px", color: "#FFFFFF", fontSize: 13, outline: "none" }} />
                </div>
                {["Department", "Revision Type", "Status", "Date Range"].map(f => (
                    <select key={f} style={{ height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 13, outline: "none", cursor: "pointer" }}>
                        <option>{f}</option>
                    </select>
                ))}
            </div>

            {/* Table */}
            <div style={{ padding: "0 32px" }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "200px 100px 100px 100px 80px 100px 140px 100px 90px 40px", padding: "12px 20px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", fontSize: 11, fontWeight: 500, color: "#8899AA", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        <div>Employee</div>
                        <div>Dept</div>
                        <div>Old CTC</div>
                        <div>New CTC</div>
                        <div>% Chg</div>
                        <div>Effective</div>
                        <div>Type</div>
                        <div>Appr. By</div>
                        <div>Status</div>
                        <div style={{ textAlign: "right" }}></div>
                    </div>
                    {REVISIONS.map((row, i) => (
                        <div key={row.id} style={{ display: "grid", gridTemplateColumns: "200px 100px 100px 100px 80px 100px 140px 100px 90px 40px", padding: "12px 20px", borderBottom: i < REVISIONS.length - 1 ? "1px solid #1A2A3A" : "none", alignItems: "center" }} className="hover:bg-[#1A2A3A] transition-colors">
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>
                                {row.name}
                                <div style={{ fontSize: 11, color: "#445566", fontFamily: "monospace", marginTop: 2 }}>{row.empId}</div>
                            </div>
                            <div style={{ fontSize: 13, color: "#FFFFFF" }}>{row.dept}</div>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>₹{(row.oldCtc / 100000).toFixed(1)}L</div>
                            <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>₹{(row.newCtc / 100000).toFixed(1)}L</div>
                            <div style={{ fontSize: 13, color: row.pct > 0 ? "#00E5A0" : "#8899AA", fontWeight: 600 }}>{row.pct > 0 ? `+${row.pct}%` : "—"}</div>
                            <div style={{ fontSize: 13, color: "#FFFFFF" }}>{row.date}</div>
                            <div style={{ fontSize: 12, color: "#8899AA", background: "#1A2A3A", padding: "2px 8px", borderRadius: 6, display: "inline-block" }}>{row.type}</div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>{row.by}</div>
                            <div>
                                <span style={{ fontSize: 11, background: row.status === "Approved" ? "rgba(0,229,160,0.1)" : "rgba(255,184,0,0.1)", color: row.status === "Approved" ? "#00E5A0" : "#FFB800", padding: "4px 8px", borderRadius: 20, fontWeight: 500 }}>{row.status}</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <Link href={`/employees/${row.empId}/salary-revision`} style={{ color: "#445566" }} className="hover:text-[#0066FF]">
                                    <FileText size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
