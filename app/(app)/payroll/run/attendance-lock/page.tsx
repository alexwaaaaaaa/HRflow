"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, ChevronRight, ExternalLink } from "lucide-react";

const SUMMARY_DATA = [
    { dept: "Engineering", emp: 320, present: "94.2%", lop: 42, ot: "186 hrs", issues: 2 },
    { dept: "Sales", emp: 180, present: "88.4%", lop: 28, ot: "0 hrs", issues: 5 },
    { dept: "Operations", emp: 172, present: "91.8%", lop: 31, ot: "94 hrs", issues: 0 },
    { dept: "Marketing", emp: 95, present: "96.1%", lop: 8, ot: "0 hrs", issues: 0 },
    { dept: "HR", emp: 42, present: "97.6%", lop: 2, ot: "0 hrs", issues: 0 },
    { dept: "Finance", emp: 38, present: "95.2%", lop: 4, ot: "0 hrs", issues: 0 },
];

const ISSUES = [
    { id: 1, name: "Amit Kumar", dept: "Sales", issue: "3 days absent, no leave applied", action: "View" },
    { id: 2, name: "Pradeep Singh", dept: "Engineering", issue: "Regularization pending (08/11)", action: "Resolve" },
    { id: 3, name: "Kavya Iyer", dept: "Engineering", issue: "OT hours not approved", action: "Approve" },
    { id: 4, name: "Rahul Sharma", dept: "Sales", issue: "Comp-off request pending", action: "Review" },
    { id: 5, name: "Priya Nair", dept: "Sales", issue: "Missing punch-out (02/11)", action: "Resolve" },
    { id: 6, name: "Vikram Reddy", dept: "Sales", issue: "Missing punch-out (03/11)", action: "Resolve" },
    { id: 7, name: "Sneha Rao", dept: "Sales", issue: "Missing punch-out (05/11)", action: "Resolve" },
];

export default function AttendanceLock() {
    const [locked, setLocked] = useState(true);

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px 80px" }}>
            {/* Wizard Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                {[
                    { label: "Select Month", state: "done" },
                    { label: "Attendance Lock", state: "active" },
                    { label: "Employee Summary", state: "pending" },
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

            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Step 2: Attendance Lock Verification</h2>
            <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 24 }}>Confirm attendance data is final before payroll computation</div>

            {locked ? (
                <div style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.3)", borderRadius: 16, padding: "20px 24px", marginBottom: 32, display: "flex", gap: 16, alignItems: "center" }}>
                    <CheckCircle2 color="#00E5A0" size={32} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Attendance Locked for November 2024</div>
                        <div style={{ fontSize: 14, color: "#8899AA" }}>Locked by: Priya Mehta on 08/11/2024 at 11:30 AM • 847 employees&apos; attendance data frozen</div>
                    </div>
                </div>
            ) : (
                <div style={{ background: "rgba(255,68,68,0.05)", border: "1px solid rgba(255,68,68,0.3)", borderRadius: 16, padding: "20px 24px", marginBottom: 32, display: "flex", gap: 16, alignItems: "center" }}>
                    <AlertTriangle color="#FF4444" size={32} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "#FF4444", marginBottom: 4 }}>Attendance NOT locked for November 2024</div>
                        <div style={{ fontSize: 14, color: "#8899AA" }}>Payroll calculations may change if attendance is modified.</div>
                    </div>
                    <button onClick={() => setLocked(true)} style={{ height: 40, padding: "0 20px", background: "#FF4444", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                        Lock Attendance Now
                    </button>
                </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "720px 1fr", gap: 32 }}>
                {/* Left Side: Summary Table */}
                <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Attendance Summary — November 2024</h3>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", color: "#8899AA", fontSize: 12, textAlign: "left" }}>
                                    <th style={{ padding: "12px 20px", fontWeight: 500 }}>Department</th>
                                    <th style={{ padding: "12px 20px", fontWeight: 500 }}>Employees</th>
                                    <th style={{ padding: "12px 20px", fontWeight: 500 }}>Avg Present %</th>
                                    <th style={{ padding: "12px 20px", fontWeight: 500 }}>LOP Days</th>
                                    <th style={{ padding: "12px 20px", fontWeight: 500 }}>OT Hours</th>
                                    <th style={{ padding: "12px 20px", fontWeight: 500 }}>Issues</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SUMMARY_DATA.map((row, i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid #1A2A3A", fontSize: 14, background: row.issues > 0 ? "rgba(255,184,0,0.05)" : "transparent", borderLeft: row.issues > 0 ? "3px solid #FFB800" : "3px solid transparent" }}>
                                        <td style={{ padding: "14px 20px", color: "#FFFFFF", fontWeight: 500 }}>{row.dept}</td>
                                        <td style={{ padding: "14px 20px", color: "#8899AA" }}>{row.emp}</td>
                                        <td style={{ padding: "14px 20px", color: "#FFFFFF" }}>{row.present}</td>
                                        <td style={{ padding: "14px 20px", color: row.lop > 10 ? "#FF4444" : "#FFFFFF" }}>{row.lop}</td>
                                        <td style={{ padding: "14px 20px", color: "#8899AA" }}>{row.ot}</td>
                                        <td style={{ padding: "14px 20px" }}>
                                            {row.issues > 0 ? (
                                                <span style={{ color: "#FFB800", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                                                    <AlertTriangle size={14} /> {row.issues} pending
                                                </span>
                                            ) : (
                                                <span style={{ color: "#00E5A0" }}>0</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                <tr style={{ background: "#0A1420", fontSize: 14, fontWeight: 700 }}>
                                    <td style={{ padding: "14px 20px", color: "#FFFFFF" }}>TOTAL</td>
                                    <td style={{ padding: "14px 20px", color: "#FFFFFF" }}>847</td>
                                    <td style={{ padding: "14px 20px", color: "#00E5A0" }}>92.6%</td>
                                    <td style={{ padding: "14px 20px", color: "#FF4444" }}>115</td>
                                    <td style={{ padding: "14px 20px", color: "#FFFFFF" }}>280 hrs</td>
                                    <td style={{ padding: "14px 20px", color: "#FFB800" }}>7 issues</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Link href="/attendance/reports" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0066FF", textDecoration: "none", marginBottom: 24 }}>
                        View detailed attendance <ExternalLink size={14} />
                    </Link>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: "16px 20px" }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>LOP Deduction Impact</h3>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                            <div>
                                <div style={{ fontSize: 13, color: "#FFFFFF", marginBottom: 4 }}>115 LOP days across 47 employees</div>
                                <div style={{ fontSize: 12, color: "#445566" }}>LOP will be auto-deducted in salary computation</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 12, color: "#8899AA" }}>Estimated LOP deduction:</div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: "#FF4444" }}>₹4,82,000</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Issues & OT */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Unresolved Issues (7)</h3>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16, maxHeight: 300, overflowY: "auto", paddingRight: 4 }}>
                            {ISSUES.map(issue => (
                                <div key={issue.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: 12, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#FFFFFF", fontWeight: 500, marginBottom: 4 }}>
                                            <AlertTriangle size={14} color="#FFB800" /> {issue.name} <span style={{ color: "#445566", fontSize: 12 }}>({issue.dept})</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: "#8899AA", paddingLeft: 20 }}>{issue.issue}</div>
                                    </div>
                                    <Link href="/attendance/reports" style={{ textDecoration: "none" }}>
                                        <button style={{ fontSize: 12, color: "#0066FF", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>{issue.action}</button>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div style={{ fontSize: 12, color: "#445566", textAlign: "center", marginBottom: 16 }}>These issues won&apos;t block payroll but will be noted</div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <Link href="/payroll/run/employee-summary" style={{ textDecoration: "none" }}>
                                <button style={{ height: 40, width: "100%", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, cursor: "pointer" }}>Resolve All Issues First</button>
                            </Link>
                            <Link href="/payroll/run/employee-summary" style={{ textDecoration: "none" }}>
                                <button style={{ height: 40, width: "100%", background: "none", border: "none", color: "#FFB800", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>Proceed Anyway</button>
                            </Link>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>OT Hours Summary</h3>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                            <div style={{ fontSize: 14, color: "#FFFFFF" }}>Total OT hours:</div>
                            <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 600 }}>280 hrs <span style={{ color: "#8899AA", fontWeight: 400, fontSize: 13 }}>(64 emp)</span></div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #1A2A3A" }}>
                            <div style={{ fontSize: 14, color: "#FFFFFF" }}>Estimated OT payout:</div>
                            <div style={{ fontSize: 14, color: "#00E5A0", fontWeight: 600 }}>₹1,82,400</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 11, padding: "4px 8px", background: "rgba(0,102,255,0.1)", color: "#0066FF", borderRadius: 4, fontWeight: 600 }}>OT computed at 1.5x rate</span>
                            <Link href="/attendance/reports" style={{ fontSize: 13, color: "#0066FF", textDecoration: "none" }}>Review OT details →</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #1A2A3A" }}>
                <Link href="/payroll/run/select-month">
                    <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>Back</button>
                </Link>
                <Link href="/payroll/run/employee-summary">
                    <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        Next: Employee Summary <ChevronRight size={16} style={{ marginBottom: -2 }} />
                    </button>
                </Link>
            </div>
        </div>
    );
}
