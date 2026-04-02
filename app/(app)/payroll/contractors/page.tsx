"use client";

import Link from "next/link";
import { FileText, Search, Filter, ArrowUpRight, Plus, Download } from "lucide-react";

const CONTRACTORS = [
    { id: "C-101", name: "Global Tech Services", type: "Agency", invoiceNo: "INV-2024-118", date: "25 Nov 2024", amount: 125000, tdsRate: 2, tdsAmt: 2500, net: 122500, status: "Pending Payment" },
    { id: "C-142", name: "Ravi Kumar", type: "Freelancer", invoiceNo: "RK-11-2024", date: "28 Nov 2024", amount: 45000, tdsRate: 10, tdsAmt: 4500, net: 40500, status: "Paid" },
    { id: "C-089", name: "DesignPros Agency", type: "Agency", invoiceNo: "DP-88912", date: "15 Nov 2024", amount: 280000, tdsRate: 2, tdsAmt: 5600, net: 274400, status: "Paid" },
    { id: "C-115", name: "Anita Sharma (Legal)", type: "Consultant", invoiceNo: "AS-CONS-09", date: "30 Nov 2024", amount: 65000, tdsRate: 10, tdsAmt: 6500, net: 58500, status: "Draft" },
];

export default function ContractorPayment() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Contractor & Consultant Payments</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Process vendor invoices and manage TDS deduction (Sec 194C / 194J).</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Download size={16} /> Export Bank File
                    </button>
                    <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Plus size={18} /> Add Invoice
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Consultant Payout (Nov)</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>₹5,15,000</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Pending Invoices</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFB800" }}>₹1,90,000</div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>Across 2 vendors</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>TDS Deducted (Sec 194C/J)</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444" }}>₹19,100</div>
                </div>
                <div style={{ background: "rgba(0,229,160,0.05)", border: "1px dashed rgba(0,229,160,0.3)", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>TDS Certificate Sync</h3>
                    <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>Upload Form 16A quarterly to distribute automatically to all registered contractors.</div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search vendor or invoice..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
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
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Contractor / Vendor</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Invoice Details</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Gross Amount</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>TDS Deducted</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Net Payable</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</th>
                            <th style={{ padding: "16px 20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {CONTRACTORS.map((con) => (
                            <tr key={con.id} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{con.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{con.id} • {con.type}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, color: "#FFFFFF", display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                        <FileText size={14} color="#8899AA" /> {con.invoiceNo}
                                    </div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>Dated: {con.date}</div>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 14, color: "#FFFFFF" }}>₹{con.amount.toLocaleString()}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, color: "#FF4444", marginBottom: 4 }}>- ₹{con.tdsAmt.toLocaleString()}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>@ {con.tdsRate}% Rate</div>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: "#00E5A0" }}>₹{con.net.toLocaleString()}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: con.status === "Paid" ? "rgba(0,229,160,0.1)" : con.status === "Pending Payment" ? "rgba(255,184,0,0.1)" : "rgba(136,153,170,0.1)", color: con.status === "Paid" ? "#00E5A0" : con.status === "Pending Payment" ? "#FFB800" : "#8899AA" }}>
                                        {con.status}
                                    </span>
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                    <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                                        Pay <ArrowUpRight size={14} />
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
