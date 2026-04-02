"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, Filter, DownloadCloud, FileText } from "lucide-react";

const EMPLOYEES = [
    { id: "EMP-0428", name: "Priya Mehta", dept: "Marketing", pan: "ABCDE1234F", status: "Generated" },
    { id: "EMP-0848", name: "Rahul Sharma", dept: "Engineering", pan: "XYZA9876Q", status: "Generated" },
    { id: "EMP-0193", name: "Rohan Desai", dept: "Sales", pan: "QWER5678T", status: "Generated" },
    { id: "EMP-0056", name: "Kavya Reddy", dept: "Engineering", pan: "ASDF4321G", status: "Error/Missing TRACES" },
    { id: "EMP-0012", name: "Arjun Nair", dept: "Product", pan: "ZXCV0987M", status: "Not Eligible" },
];

export default function Form16BulkDownload() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 1200, margin: "0 auto" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>Form 16 Dispatch & Download</h1>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Manage, download, and track Form 16 dispatch for FY 2024-25</div>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", height: 40, color: "#FFFFFF", fontSize: 14 }}>
                        FY 2024-25 <ChevronDown size={16} color="#8899AA" />
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>

                <div style={{ width: 340, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 24 }}>Batch Actions</h3>

                    <button style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 12, marginBottom: 16, cursor: "pointer", paddingLeft: 16 }} className="hover:border-[#0066FF]">
                        <DownloadCloud size={18} color="#0066FF" /> Download All (ZIP)
                    </button>

                    <div style={{ fontSize: 12, color: "#8899AA", textAlign: "center", marginBottom: 16 }}>45.2 MB • Contains 344 PDFs</div>

                    <div style={{ borderTop: "1px solid #1A2A3A", margin: "24px 0" }} />

                    <h4 style={{ fontSize: 13, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", marginBottom: 16 }}>Distribution Status</h4>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#FFFFFF", marginBottom: 12 }}>
                        <span>Emailed to Employees</span>
                        <span style={{ fontWeight: 600, color: "#00E5A0" }}>344 / 345</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#FFFFFF", marginBottom: 24 }}>
                        <span>Viewed by Employees</span>
                        <span style={{ fontWeight: 600 }}>215 / 344</span>
                    </div>

                    <button style={{ width: "100%", height: 44, background: "rgba(0,102,255,0.1)", border: "1px solid rgba(0,102,255,0.3)", borderRadius: 8, color: "#0066FF", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }} className="hover:bg-[#0066FF]/20">
                        Remind Unread Employees
                    </button>
                </div>

                <div style={{ flex: 1, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1A2A3A" }}>
                        <div style={{ display: "flex", gap: 16 }}>
                            <div style={{ position: "relative", width: 280 }}>
                                <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                                <input type="text" placeholder="Search employee..." style={{ width: "100%", height: 36, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, paddingLeft: 36, outline: "none" }} />
                            </div>
                            <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                                <Filter size={14} /> Filter
                            </button>
                        </div>
                    </div>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", color: "#8899AA", fontSize: 12, textAlign: "left" }}>
                                <th style={{ padding: "16px 24px", fontWeight: 500 }}>Employee</th>
                                <th style={{ padding: "16px", fontWeight: 500 }}>PAN Number</th>
                                <th style={{ padding: "16px", fontWeight: 500 }}>Status</th>
                                <th style={{ padding: "16px 24px", fontWeight: 500, textAlign: "right" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {EMPLOYEES.map((emp, i) => (
                                <tr key={i} style={{ borderBottom: "1px solid #1A2A3A" }}>
                                    <td style={{ padding: "16px 24px" }}>
                                        <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>{emp.name}</div>
                                        <div style={{ fontSize: 12, color: "#8899AA" }}>{emp.id}</div>
                                    </td>
                                    <td style={{ padding: "16px", fontSize: 13, color: "#FFFFFF" }}>{emp.pan}</td>
                                    <td style={{ padding: "16px" }}>
                                        <div style={{
                                            display: "inline-block", padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600,
                                            background: emp.status === "Generated" ? "rgba(0,229,160,0.1)" : emp.status === "Not Eligible" ? "rgba(255,184,0,0.1)" : "rgba(255,68,68,0.1)",
                                            color: emp.status === "Generated" ? "#00E5A0" : emp.status === "Not Eligible" ? "#FFB800" : "#FF4444"
                                        }}>
                                            {emp.status}
                                        </div>
                                    </td>
                                    <td style={{ padding: "16px 24px", textAlign: "right" }}>
                                        {emp.status === "Generated" ? (
                                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                                                <button style={{ height: 32, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }} className="hover:bg-[#1A2A3A]">
                                                    <FileText size={14} /> View
                                                </button>
                                                <button style={{ height: 32, padding: "0 16px", background: "#00E5A0", border: "none", borderRadius: 6, color: "#060B14", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }} className="hover:opacity-90">
                                                    <DownloadCloud size={14} /> PDF
                                                </button>
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: 12, color: "#8899AA" }}>—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
