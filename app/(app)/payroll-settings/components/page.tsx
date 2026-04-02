"use client";

import Link from "next/link";
import { Plus, Search, MoreVertical, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

const COMPONENTS = [
    { id: "COMP-01", name: "Basic Salary", type: "Earning", calc: "Flat Amount", taxable: true, pf: true, status: "Active", isSystem: true },
    { id: "COMP-02", name: "House Rent Allowance (HRA)", type: "Earning", calc: "Formula (50% of Basic)", taxable: true, pf: false, status: "Active", isSystem: true },
    { id: "COMP-03", name: "Special Allowance", type: "Earning", calc: "Formula (Gross - Basic - HRA)", taxable: true, pf: false, status: "Active", isSystem: true },
    { id: "COMP-04", name: "Sales Incentive", type: "Earning", calc: "Variable (Input Monthly)", taxable: true, pf: false, status: "Active", isSystem: false },
    { id: "COMP-05", name: "Leave Travel Allowance", type: "Earning", calc: "Flat Amount", taxable: false, pf: false, status: "Inactive", isSystem: false },
    { id: "COMP-06", name: "Provident Fund (EPF)", type: "Deduction", calc: "Formula (12% of Basic)", taxable: false, pf: true, status: "Active", isSystem: true },
    { id: "COMP-07", name: "Professional Tax", type: "Deduction", calc: "Slab Based", taxable: false, pf: false, status: "Active", isSystem: true },
    { id: "COMP-08", name: "Income Tax (TDS)", type: "Deduction", calc: "Auto Calculated", taxable: false, pf: false, status: "Active", isSystem: true },
];

export default function SalaryComponents() {
    const [activeTab, setActiveTab] = useState("Earnings");

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Salary Components</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Configure earnings, deductions, and variable pay elements for your payroll calculation.</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Plus size={18} /> Add Component
                </button>
            </div>

            <div style={{ display: "flex", gap: 32 }}>
                {/* Sidebar Navigation */}
                <div style={{ width: 240, flexShrink: 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {["Earnings", "Deductions", "Reimbursements", "Formulas", "Pay Slips"].map((item) => (
                            <div key={item} onClick={() => setActiveTab(item)} style={{ padding: "12px 16px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: activeTab === item ? 600 : 500, color: activeTab === item ? "#00E5A0" : "#8899AA", background: activeTab === item ? "rgba(0,229,160,0.1)" : "transparent", transition: "all 0.2s" }} className="hover:bg-[#1A2A3A]">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF" }}>{activeTab} Components</h2>
                        <div style={{ position: "relative" }}>
                            <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                            <input type="text" placeholder={`Search ${activeTab.toLowerCase()}`} style={{ width: 260, height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                        </div>
                    </div>

                    <div style={{ border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                                    <th style={{ padding: "16px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Component Name</th>
                                    <th style={{ padding: "16px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Calculation Type</th>
                                    <th style={{ padding: "16px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Taxable</th>
                                    <th style={{ padding: "16px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</th>
                                    <th style={{ padding: "16px", width: 64 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPONENTS.filter(c => activeTab === "Formulas" || c.type === (activeTab.includes("Earning") ? "Earning" : activeTab.includes("Deduction") ? "Deduction" : activeTab)).map((comp) => (
                                    <tr key={comp.id} style={{ borderBottom: "1px solid #1A2A3A" }}>
                                        <td style={{ padding: "16px" }}>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                                                {comp.name}
                                                {comp.isSystem && <span style={{ padding: "2px 6px", background: "#1A2A3A", borderRadius: 4, fontSize: 10, color: "#8899AA" }}>System</span>}
                                            </div>
                                            <div style={{ fontSize: 12, color: "#8899AA" }}>{comp.id} • Pro-rata applicable</div>
                                        </td>
                                        <td style={{ padding: "16px" }}>
                                            <div style={{ fontSize: 14, color: "#FFFFFF" }}>{comp.calc}</div>
                                        </td>
                                        <td style={{ padding: "16px" }}>
                                            {comp.taxable ? <CheckCircle2 size={16} color="#00E5A0" /> : <XCircle size={16} color="#445566" />}
                                        </td>
                                        <td style={{ padding: "16px" }}>
                                            <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: comp.status === "Active" ? "rgba(0,229,160,0.1)" : "rgba(136,153,170,0.1)", color: comp.status === "Active" ? "#00E5A0" : "#8899AA" }}>
                                                {comp.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: "16px", textAlign: "right" }}>
                                            {activeTab === "Formulas" && comp.calc.includes("Formula") ? (
                                                <Link href="/payroll-settings/components/formula">
                                                    <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#0066FF", fontSize: 13, fontWeight: 600 }}>Edit Formula</button>
                                                </Link>
                                            ) : (
                                                <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#8899AA" }}>
                                                    <MoreVertical size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
