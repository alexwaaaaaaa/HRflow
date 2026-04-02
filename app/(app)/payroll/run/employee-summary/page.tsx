"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, UserPlus, UserMinus, AlertTriangle, ArrowRight, Save, Filter, Search, Download } from "lucide-react";

const EMPLOYEES = [
    { id: "EMP-042", name: "Ravi Shankar", dept: "Engineering", type: "Regular", status: "Active", lwp: 0, remarks: "—" },
    { id: "EMP-045", name: "Sneha Patil", dept: "Sales", type: "Regular", status: "Active", lwp: 2, remarks: "Auto LOP (2 days)" },
    { id: "EMP-821", name: "Anil Desai", dept: "Operations", type: "New Joiner", status: "Joined 12 Nov", lwp: 0, remarks: "Pro-rata (19 days)" },
    { id: "EMP-824", name: "Pooja Sharma", dept: "HR", type: "New Joiner", status: "Joined 18 Nov", lwp: 0, remarks: "Pro-rata (13 days)" },
    { id: "EMP-018", name: "Vikram Singh", dept: "Engineering", type: "Exit", status: "Last Working: 05 Nov", lwp: 0, remarks: "FnF Process Flow" },
];

export default function EmployeeSummary() {
    const [editLWP, setEditLWP] = useState<string | null>(null);

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px 80px" }}>
            {/* Wizard Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                {[
                    { label: "Select Month", state: "done" },
                    { label: "Attendance Lock", state: "done" },
                    { label: "Employee Summary", state: "active" },
                    { label: "Review Gross", state: "pending" },
                    { label: "Review Deductions", state: "pending" },
                    { label: "Review Net", state: "pending" },
                    { label: "Approve", state: "pending" },
                    { label: "Disburse", state: "pending" }
                ].map((step, i, arr) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", position: "relative" }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: step.state === "done" ? "#00E5A0" : step.state === "active" ? "rgba(0,229,160,0.2)" : "#1A2A3A", display: "flex", alignItems: "center", justifyContent: "center", color: step.state === "done" ? "#060B14" : step.state === "active" ? "#00E5A0" : "#445566", fontSize: 12, fontWeight: 700, border: step.state === "active" ? "1px solid #00E5A0" : "none", boxShadow: step.state === "active" ? "0 0 10px rgba(0,229,160,0.3)" : "none", zIndex: 2 }}>
                                {step.state === "done" ? <CheckCircle2 size={14} /> : i + 1}
                            </div>
                            <div style={{ fontSize: 11, color: step.state === "pending" ? "#445566" : "#FFFFFF", textAlign: "center", fontWeight: step.state === "active" ? 600 : 400, position: "absolute", top: 32, width: 80 }}>{step.label}</div>
                        </div>
                        {i < arr.length - 1 && (
                            <div style={{ height: 2, background: step.state === "done" ? "#00E5A0" : "#1A2A3A", flex: 1, margin: "0 8px", marginBottom: 16 }} />
                        )}
                    </div>
                ))}
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Step 3: Employee Count & LWP Summary</h2>
            <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 24 }}>Review the final list of employees to be processed for November 2024.</div>

            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total for Processing</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>847</div>
                    <div style={{ fontSize: 12, color: "#00E5A0", display: "flex", alignItems: "center", gap: 4 }}><UserPlus size={14} /> 12 new vs last month</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Mid-month Joiners</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>12</div>
                    <div style={{ fontSize: 12, color: "#8899AA", display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={14} color="#FFB800" /> Subject to Pro-rata</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Exits (Not Processed)</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>3</div>
                    <div style={{ fontSize: 12, color: "#8899AA", display: "flex", alignItems: "center", gap: 4 }}><UserMinus size={14} /> Processed via FnF Module</div>
                </div>

                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total LWP/LOP Days</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#FF4444", marginBottom: 8 }}>115</div>
                    <div style={{ fontSize: 12, color: "#8899AA", display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={14} color="#FF4444" /> Over 47 employees</div>
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search by name or ID" style={{ width: 260, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <button style={{ height: 40, padding: "0 16px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Filter size={16} /> Filters
                    </button>
                    <div style={{ display: "flex", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, overflow: "hidden" }}>
                        <button style={{ height: 38, padding: "0 16px", background: "#1A2A3A", border: "none", color: "#FFFFFF", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>All (847)</button>
                        <button style={{ height: 38, padding: "0 16px", background: "none", border: "none", color: "#8899AA", fontSize: 13, cursor: "pointer" }}>New Joiners (12)</button>
                        <button style={{ height: 38, padding: "0 16px", background: "none", border: "none", color: "#8899AA", fontSize: 13, cursor: "pointer" }}>With LOP (47)</button>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#8899AA", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                        <Download size={14} /> Export List
                    </button>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", color: "#8899AA", fontSize: 12, textAlign: "left" }}>
                            <th style={{ padding: "16px 24px", fontWeight: 500, width: "30%" }}>Employee Info</th>
                            <th style={{ padding: "16px 24px", fontWeight: 500 }}>Category</th>
                            <th style={{ padding: "16px 24px", fontWeight: 500 }}>Status for Nov</th>
                            <th style={{ padding: "16px 24px", fontWeight: 500 }}>LWP / LOP Days</th>
                            <th style={{ padding: "16px 24px", fontWeight: 500, width: "20%" }}>Remarks</th>
                            <th style={{ padding: "16px 24px", fontWeight: 500, textAlign: "right" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EMPLOYEES.map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: "1px solid #1A2A3A", fontSize: 14 }}>
                                <td style={{ padding: "16px 24px" }}>
                                    <div style={{ fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>{emp.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA", display: "flex", gap: 8 }}>
                                        <span>{emp.id}</span> • <span>{emp.dept}</span>
                                    </div>
                                </td>
                                <td style={{ padding: "16px 24px" }}>
                                    <span style={{
                                        padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                                        background: emp.type === "New Joiner" ? "rgba(0,102,255,0.1)" : emp.type === "Exit" ? "rgba(255,68,68,0.1)" : "rgba(255,255,255,0.05)",
                                        color: emp.type === "New Joiner" ? "#0066FF" : emp.type === "Exit" ? "#FF4444" : "#8899AA"
                                    }}>
                                        {emp.type}
                                    </span>
                                </td>
                                <td style={{ padding: "16px 24px", color: emp.status === "Active" ? "#00E5A0" : "#FFB800" }}>{emp.status}</td>
                                <td style={{ padding: "16px 24px" }}>
                                    {editLWP === emp.id ? (
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <input type="number" defaultValue={emp.lwp} style={{ width: 60, height: 32, background: "#060B14", border: "1px solid #00E5A0", borderRadius: 4, color: "#FFFFFF", padding: "0 8px", outline: "none", fontSize: 13 }} autoFocus />
                                            <button onClick={() => setEditLWP(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#00E5A0" }}><Save size={16} /></button>
                                        </div>
                                    ) : (
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: emp.lwp > 0 ? "#FF4444" : "#FFFFFF", fontWeight: emp.lwp > 0 ? 600 : 400 }}>
                                            {emp.lwp} days
                                            {emp.type !== "Exit" && (
                                                <button onClick={() => setEditLWP(emp.id)} style={{ fontSize: 12, color: "#0066FF", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Edit</button>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: "16px 24px", color: "#8899AA", fontSize: 13 }}>{emp.remarks}</td>
                                <td style={{ padding: "16px 24px", textAlign: "right" }}>
                                    {emp.type === "Exit" ? (
                                        <Link href="/payroll/fnf" style={{ textDecoration: "none" }}>
                                            <button style={{ height: 32, padding: "0 12px", background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.2)", borderRadius: 6, color: "#FF4444", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Go to FnF</button>
                                        </Link>
                                    ) : (
                                        <button style={{ fontSize: 13, color: "#FF4444", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
                                            Exclude <ArrowRight size={14} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", borderTop: "1px solid #1A2A3A", background: "#0A1420", fontSize: 13, color: "#8899AA" }}>
                    <span>Showing 1-5 of 847 employees</span>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button style={{ background: "none", border: "none", color: "#445566", cursor: "not-allowed" }}>Previous</button>
                        <button style={{ background: "none", border: "none", color: "#FFFFFF", fontWeight: 500, padding: "0 8px" }}>1</button>
                        <button style={{ background: "none", border: "none", color: "#8899AA", padding: "0 8px", cursor: "pointer" }}>2</button>
                        <button style={{ background: "none", border: "none", color: "#8899AA", padding: "0 8px", cursor: "pointer" }}>3</button>
                        <span>...</span>
                        <button style={{ background: "none", border: "none", color: "#8899AA", padding: "0 8px", cursor: "pointer" }}>170</button>
                        <button style={{ background: "none", border: "none", color: "#0066FF", cursor: "pointer" }}>Next</button>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #1A2A3A" }}>
                <Link href="/payroll/run/attendance-lock">
                    <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>Back</button>
                </Link>
                <div style={{ display: "flex", gap: 16 }}>
                    <button style={{ height: 44, padding: "0 24px", background: "#1A2A3A", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Save size={16} /> Save Draft
                    </button>
                    <Link href="/payroll/run/review-gross">
                        <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            Next: Review Gross Salary <ChevronRight size={16} style={{ marginBottom: -2 }} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
