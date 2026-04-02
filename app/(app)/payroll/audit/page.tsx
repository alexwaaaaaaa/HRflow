"use client";

import Link from "next/link";
import { Download, Search, Filter, Shield, Clock, User, Calendar } from "lucide-react";

const AUDITS = [
    { time: "Today, 10:45 AM", user: "Priya Mehta", role: "Payroll Admin", action: "Approved Payroll Batch (Nov 2024)", details: "Authorized batch of 842 records for gross ₹3,98,54,500.", ip: "192.168.1.42", type: "Approval" },
    { time: "Today, 10:05 AM", user: "System", role: "Auto", action: " penny Drop Verification Complete", details: "Tested 13 accounts, 12 Success, 1 Failed (Vikram Reddy).", ip: "-", type: "System" },
    { time: "Today, 09:30 AM", user: "Ajiit Finance", role: "Finance Head", action: "Overrode Variable Pay", details: "Changed 'EMP-045 - Sneha Patil' achievement from 100% to 110%.", ip: "103.24.51.100", type: "Override" },
    { time: "Yesterday, 04:15 PM", user: "Priya Mehta", role: "Payroll Admin", action: "Deleted Attendance Record", details: "Removed 1 LOP day for EMP-001. System regenerated arrears.", ip: "192.168.1.42", type: "Modification" },
    { time: "Yesterday, 02:00 PM", user: "System", role: "Auto", action: "Attendance Locked (Nov)", details: "Triggered standard month-end lock. Syncing bio-metric data.", ip: "-", type: "System" },
];

export default function PayrollAuditLog() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Payroll Audit Log</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Track every change, approval, override, and system event within the payroll engine.</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 20px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Download size={16} /> Export SOC2 Report
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search by user or action..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", height: 40, cursor: "pointer" }}>
                        <Calendar size={14} color="#8899AA" />
                        <span style={{ fontSize: 14, color: "#FFFFFF" }}>Last 7 Days</span>
                    </div>
                    <select style={{ height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                        <option>Event Type: All</option>
                        <option>Overrides</option>
                        <option>Approvals</option>
                    </select>
                </div>
                <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Filter size={16} /> Advanced Filters
                </button>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Timestamp</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Actor</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Event / Action</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Details</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AUDITS.map((log, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 13, color: "#E5E7EB", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                                        <Clock size={14} color="#8899AA" /> {log.time}
                                    </div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                                        {log.user === "System" ? <Shield size={14} color="#0066FF" /> : <User size={14} color="#8899AA" />} {log.user}
                                    </div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{log.role}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: log.type === "Override" ? "rgba(255,184,0,0.1)" : log.type === "Approval" ? "rgba(0,229,160,0.1)" : "rgba(255,255,255,0.05)", color: log.type === "Override" ? "#FFB800" : log.type === "Approval" ? "#00E5A0" : "#E5E7EB" }}>
                                        {log.type}
                                    </span>
                                    <div style={{ fontSize: 13, color: "#FFFFFF", marginTop: 8 }}>{log.action}</div>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 13, color: "#8899AA", lineHeight: 1.5, maxWidth: 300 }}>
                                    {log.details}
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 12, color: "#8899AA", fontFamily: "monospace" }}>
                                    {log.ip}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ padding: "16px 0", color: "#8899AA", fontSize: 13, textAlign: "right" }}>
                Showing 1-5 of 1,208 system events
            </div>
        </div>
    );
}
