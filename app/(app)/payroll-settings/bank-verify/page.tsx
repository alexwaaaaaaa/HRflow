"use client";

import Link from "next/link";
import { Search, Filter, PlayCircle, RefreshCw } from "lucide-react";

const ACCOUNTS = [
    { name: "Rahul Sharma", id: "EMP-001", bank: "HDFC Bank", accEnd: "4451", ifsc: "HDFC0001234", status: "Verified", pennyDrop: "Success" },
    { name: "Sneha Patil", id: "EMP-045", bank: "ICICI Bank", accEnd: "9822", ifsc: "ICIC0000014", status: "Verified", pennyDrop: "Success" },
    { name: "Vikram Reddy", id: "EMP-204", bank: "State Bank of India", accEnd: "1190", ifsc: "SBIN0004561", status: "Failed", pennyDrop: "Name Mismatch" },
    { name: "Kiran Sharma", id: "EMP-312", bank: "Axis Bank", accEnd: "3321", ifsc: "UTIB0000192", status: "Pending", pennyDrop: "Not Initiated" },
    { name: "Amit Kumar", id: "EMP-415", bank: "Kotak Mahindra", accEnd: "8845", ifsc: "KKBK0000213", status: "Verified", pennyDrop: "Success" },
];

export default function BankAccountVerification() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Bank Account Verification</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Verify employee bank accounts via automated penny drops before payroll disbursement.</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <PlayCircle size={18} /> Run Penny Drop on Pending
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Accounts</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>842</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Verified Active</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>825</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Failed / Invalid</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444" }}>4</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Pending Verification</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFB800" }}>13</div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search employee..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <select style={{ height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                        <option>Status: All</option>
                        <option>Status: Verified</option>
                        <option>Status: Failed</option>
                        <option>Status: Pending</option>
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
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Bank Details</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Verification Status</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Penny Drop Response</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ACCOUNTS.map((acc, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{acc.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{acc.id}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, color: "#E5E7EB", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                                        {acc.bank} •••• {acc.accEnd}
                                    </div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>IFSC: {acc.ifsc}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: acc.status === "Verified" ? "rgba(0,229,160,0.1)" : acc.status === "Failed" ? "rgba(255,68,68,0.1)" : "rgba(255,184,0,0.1)", color: acc.status === "Verified" ? "#00E5A0" : acc.status === "Failed" ? "#FF4444" : "#FFB800" }}>
                                        {acc.status}
                                    </span>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 13, color: acc.pennyDrop === "Success" ? "#8899AA" : (acc.pennyDrop === "Not Initiated" ? "#8899AA" : "#FF4444") }}>
                                    {acc.pennyDrop}
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {acc.status === "Failed" ? (
                                            <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #FF4444", borderRadius: 6, color: "#FF4444", fontSize: 12, cursor: "pointer" }}>Request Update</button>
                                        ) : acc.status === "Pending" ? (
                                            <button style={{ height: 32, width: 32, padding: 0, background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="Verify Single">
                                                <RefreshCw size={14} />
                                            </button>
                                        ) : null}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
