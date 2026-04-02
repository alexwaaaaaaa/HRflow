"use client";

import Link from "next/link";
import { Plus, Search, Filter, HelpCircle } from "lucide-react";

const ARREARS = [
    { id: "ARR-892", emp: "Rahul Sharma", type: "Salary Arrear", amount: 15400, month: "Oct 2024", reason: "Annual increment backdated to Oct 1st", status: "Pending" },
    { id: "ARR-893", emp: "Sneha Patil", type: "LOP Reversal", amount: 4800, month: "Sep 2024", reason: "Manager approved leave late. 2 days reversed.", status: "Processed" },
    { id: "ARR-894", emp: "Amit Kumar", type: "Bonus Arrear", amount: 25000, month: "Oct 2024", reason: "Q3 Performance Bonus missed in last cycle", status: "Pending" },
    { id: "ARR-895", emp: "Kiran Sharma", type: "LOP Reversal", amount: 2100, month: "Oct 2024", reason: "System sync issue with biometric. 1 day reversed.", status: "Pending" },
];

export default function ArrearsDashboard() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Arrears & LOP Reversals</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Manage pending arrears to be added to the upcoming payroll cycle (Nov 2024).</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Plus size={18} /> Add Arrear / Reversal
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
                {/* Main List */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ position: "relative" }}>
                            <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                            <input type="text" placeholder="Search employee..." style={{ width: 260, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <select style={{ height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                                <option>Type: All</option>
                                <option>Salary Arrear</option>
                                <option>LOP Reversal</option>
                            </select>
                            <button style={{ height: 40, padding: "0 16px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                                <Filter size={16} /> Filters
                            </button>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                                    <th style={{ padding: "16px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Employee</th>
                                    <th style={{ padding: "16px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Type & Month</th>
                                    <th style={{ padding: "16px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Amount</th>
                                    <th style={{ padding: "16px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ARREARS.map(arr => (
                                    <tr key={arr.id} style={{ borderBottom: "1px solid #1A2A3A", cursor: "pointer", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                        <td style={{ padding: "16px" }}>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{arr.emp}</div>
                                            <div style={{ fontSize: 12, color: "#8899AA" }}>{arr.id}</div>
                                        </td>
                                        <td style={{ padding: "16px" }}>
                                            <div style={{ fontSize: 14, color: "#FFFFFF", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                                                {arr.type}
                                                {arr.type === "LOP Reversal" && <span style={{ padding: "2px 6px", background: "rgba(0,102,255,0.1)", borderRadius: 4, fontSize: 10, color: "#0066FF" }}>Auto</span>}
                                            </div>
                                            <div style={{ fontSize: 13, color: "#8899AA" }}>For {arr.month}</div>
                                        </td>
                                        <td style={{ padding: "16px" }}>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0", marginBottom: 4 }}>+ ₹{arr.amount.toLocaleString()}</div>
                                            <div style={{ fontSize: 12, color: "#8899AA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 180 }}>{arr.reason}</div>
                                        </td>
                                        <td style={{ padding: "16px" }}>
                                            <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: arr.status === "Pending" ? "rgba(255,184,0,0.1)" : "rgba(0,229,160,0.1)", color: arr.status === "Pending" ? "#FFB800" : "#00E5A0" }}>
                                                {arr.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ padding: "12px 16px", borderTop: "1px solid #1A2A3A", fontSize: 13, color: "#8899AA", textAlign: "center" }}>
                            Viewing all {ARREARS.length} records.
                        </div>
                    </div>
                </div>

                {/* Right Panel widgets */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Pending Arrears Summary</h3>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>Salary Arrears (2)</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>₹40,400</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #1A2A3A" }}>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>LOP Reversals (2)</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>₹6,900</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Total Impact</div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: "#00E5A0" }}>+ ₹47,300</div>
                        </div>
                    </div>

                    <div style={{ background: "rgba(0,102,255,0.05)", border: "1px dashed rgba(0,102,255,0.3)", borderRadius: 12, padding: 16 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 12 }}>
                            <HelpCircle size={16} color="#0066FF" style={{ flexShrink: 0, marginTop: 2 }} />
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>Auto LOP Reversals</div>
                        </div>
                        <div style={{ fontSize: 12, color: "#8899AA", lineHeight: 1.5, marginBottom: 12 }}>
                            When managers approve a leave request that falls into a previously locked payroll cycle, the system automatically creates an LOP reversal record to refund the deducted salary.
                        </div>
                        <Link href="/payroll-settings/pro-rata">
                            <button style={{ height: 28, padding: "0 12px", background: "transparent", border: "1px solid #0066FF", borderRadius: 6, color: "#0066FF", fontSize: 12, cursor: "pointer" }}>Configure Rules</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
