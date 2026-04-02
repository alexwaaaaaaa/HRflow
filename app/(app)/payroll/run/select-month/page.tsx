"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function SelectMonth() {
    const [month, setMonth] = useState("Nov");
    const [type, setType] = useState("regular");
    const [scope, setScope] = useState({ all: true, new: true, notice: true, lop: false });

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px 80px" }}>
            {/* Wizard Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                {[
                    { label: "Select Month", state: "active" },
                    { label: "Attendance Lock", state: "pending" },
                    { label: "Employee Summary", state: "pending" },
                    { label: "Review Gross", state: "pending" },
                    { label: "Review Deductions", state: "pending" },
                    { label: "Review Net", state: "pending" },
                    { label: "Approve", state: "pending" },
                    { label: "Disburse", state: "pending" }
                ].map((step, i, arr) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", position: "relative" }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: step.state === "active" ? "rgba(0,229,160,0.2)" : "#1A2A3A", display: "flex", alignItems: "center", justifyContent: "center", color: step.state === "active" ? "#00E5A0" : "#445566", fontSize: 12, fontWeight: 700, border: step.state === "active" ? "1px solid #00E5A0" : "none", boxShadow: step.state === "active" ? "0 0 10px rgba(0,229,160,0.3)" : "none", zIndex: 2 }}>
                                {i + 1}
                            </div>
                            <div style={{ fontSize: 11, color: step.state === "pending" ? "#445566" : "#FFFFFF", textAlign: "center", fontWeight: step.state === "active" ? 600 : 400, position: "absolute", top: 32, width: 80 }}>{step.label}</div>
                        </div>
                        {i < arr.length - 1 && (
                            <div style={{ height: 2, background: "#1A2A3A", flex: 1, margin: "0 8px", marginBottom: 16 }} />
                        )}
                    </div>
                ))}
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Run Payroll — Step 1: Select Period</h2>
            <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 32 }}>Choose the payroll month and verify pre-run settings</div>

            <div style={{ display: "grid", gridTemplateColumns: "700px 468px", gap: 32 }}>
                {/* Left Form */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>Payroll Period *</h3>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#FFFFFF" }}>
                                <button style={{ background: "none", border: "none", color: "#8899AA", cursor: "pointer" }}>&lt;</button>
                                2024
                                <button style={{ background: "none", border: "none", color: "#8899AA", cursor: "pointer" }}>&gt;</button>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 24 }}>
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
                                <button key={m} onClick={() => setMonth(m)} style={{ height: 40, background: month === m ? "#00E5A0" : "#060B14", border: `1px solid ${month === m ? "#00E5A0" : "#1A2A3A"}`, borderRadius: 8, color: month === m ? "#060B14" : "#8899AA", fontSize: 14, fontWeight: month === m ? 600 : 400, cursor: "pointer" }}>
                                    {m}
                                </button>
                            ))}
                        </div>

                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 12 }}>Payroll Type *</label>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {[
                                    { id: "regular", l: "Regular Monthly Payroll" },
                                    { id: "offcycle", l: "Off-cycle Payroll (supplementary)" },
                                    { id: "contractor", l: "Contractor Payroll only" },
                                ].map(t => (
                                    <label key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                                        <input type="radio" name="type" value={t.id} checked={type === t.id} onChange={() => setType(t.id)} style={{ accentColor: "#00E5A0" }} />
                                        <span style={{ fontSize: 14, color: "#FFFFFF" }}>{t.l}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Effective From</label>
                                <input type="text" readOnly value={`01/${month === "Nov" ? "11" : "10"}/2024`} style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#8899AA", outline: "none", boxSizing: "border-box" }} />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Effective To</label>
                                <input type="text" readOnly value={`30/${month === "Nov" ? "11" : "10"}/2024`} style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#8899AA", outline: "none", boxSizing: "border-box" }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>Employee Scope</h3>
                            <button style={{ fontSize: 13, color: "#00E5A0", background: "none", border: "none", cursor: "pointer" }}>Exclude specific employees?</button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                                <input type="checkbox" checked={scope.all} onChange={e => setScope({ ...scope, all: e.target.checked })} style={{ accentColor: "#00E5A0" }} />
                                <span style={{ fontSize: 14, color: "#FFFFFF" }}>All active employees (847)</span>
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginLeft: 26 }}>
                                <input type="checkbox" checked={scope.new} onChange={e => setScope({ ...scope, new: e.target.checked })} style={{ accentColor: "#00E5A0" }} disabled={!scope.all} />
                                <span style={{ fontSize: 14, color: scope.all ? "#FFFFFF" : "#445566" }}>New joiners this month (12 — pro-rata)</span>
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginLeft: 26 }}>
                                <input type="checkbox" checked={scope.notice} onChange={e => setScope({ ...scope, notice: e.target.checked })} style={{ accentColor: "#00E5A0" }} disabled={!scope.all} />
                                <span style={{ fontSize: 14, color: scope.all ? "#FFFFFF" : "#445566" }}>Employees on notice period (8)</span>
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginLeft: 26 }}>
                                <input type="checkbox" checked={scope.lop} onChange={e => setScope({ ...scope, lop: e.target.checked })} style={{ accentColor: "#00E5A0" }} disabled={!scope.all} />
                                <span style={{ fontSize: 14, color: scope.all ? "#FFFFFF" : "#445566" }}>Employees on LOP (will include with deduction)</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Pre-run Checklist</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <div style={{ display: "flex", gap: 10, fontSize: 14, color: "#FFFFFF" }}>
                                <CheckCircle2 size={18} color="#00E5A0" /> Attendance locked for {month} 2024 (08/{month === "Nov" ? "11" : "10"}/2024)
                            </div>
                            <div style={{ display: "flex", gap: 10, fontSize: 14, color: "#FFFFFF" }}>
                                <CheckCircle2 size={18} color="#00E5A0" /> Salary structures updated
                            </div>
                            <div style={{ display: "flex", gap: 10, fontSize: 14, color: "#FFFFFF", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                <div style={{ display: "flex", gap: 10 }}><AlertTriangle size={18} color="#FFB800" /> 16 employees have unverified banks (831/847)</div>
                                <span style={{ fontSize: 13, color: "#0066FF", cursor: "pointer" }}>Resolve</span>
                            </div>
                            <div style={{ display: "flex", gap: 10, fontSize: 14, color: "#FFFFFF" }}>
                                <CheckCircle2 size={18} color="#00E5A0" /> Previous month payroll disbursed
                            </div>
                            <div style={{ display: "flex", gap: 10, fontSize: 14, color: "#FFFFFF" }}>
                                <CheckCircle2 size={18} color="#00E5A0" /> No pending salary revisions
                            </div>
                            <div style={{ display: "flex", gap: 10, fontSize: 14, color: "#FFFFFF", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                <div style={{ display: "flex", gap: 10 }}><AlertTriangle size={18} color="#FFB800" /> 3 anomalies from last month unresolved</div>
                                <span style={{ fontSize: 13, color: "#0066FF", cursor: "pointer" }}>View</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Preview */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 28 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 20 }}>Expected Payroll Summary</h3>

                        <div style={{ fontSize: 14, color: "#FFFFFF", marginBottom: 16 }}>Month: {month === "Nov" ? "November" : month} 2024</div>
                        <div style={{ height: 1, background: "#1A2A3A", marginBottom: 16 }} />

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#8899AA", marginBottom: 12 }}>
                            <span>Total Employees</span> <span style={{ color: "#FFFFFF" }}>{scope.all ? 847 : 0}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#8899AA", marginBottom: 12 }}>
                            <span>New Joiners (pro-rata)</span> <span style={{ color: "#FFFFFF" }}>{scope.new ? 12 : 0}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#8899AA", marginBottom: 16 }}>
                            <span>Exits (FnF separate)</span> <span style={{ color: "#FFFFFF" }}>3</span>
                        </div>
                        <div style={{ height: 1, background: "#1A2A3A", marginBottom: 16 }} />

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#8899AA", marginBottom: 12 }}>
                            <span>Expected Gross</span> <span style={{ color: "#FFFFFF" }}>~₹4.24 Cr</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#8899AA", marginBottom: 12 }}>
                            <span>Expected Deductions</span> <span style={{ color: "#FFFFFF" }}>~₹42 L</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 600, color: "#8899AA", marginBottom: 16 }}>
                            <span>Expected Net</span> <span style={{ color: "#00E5A0" }}>~₹3.82 Cr</span>
                        </div>
                        <div style={{ height: 1, background: "#1A2A3A", marginBottom: 16 }} />

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#8899AA", marginBottom: 12 }}>
                            <span>Employer PF</span> <span style={{ color: "#FFFFFF" }}>~₹18.4 L</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#8899AA", marginBottom: 12 }}>
                            <span>Employer ESI</span> <span style={{ color: "#FFFFFF" }}>~₹2.8 L</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#8899AA", marginBottom: 16 }}>
                            <span>Gratuity Provision</span> <span style={{ color: "#FFFFFF" }}>~₹8.1 L</span>
                        </div>
                        <div style={{ height: 1, background: "#1A2A3A", marginBottom: 16 }} />

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 600, color: "#8899AA", marginBottom: 16 }}>
                            <span>Total Cost to Company</span> <span style={{ color: "#FFFFFF" }}>~₹4.93 Cr</span>
                        </div>

                        <div style={{ fontSize: 12, color: "#445566", fontStyle: "italic", textAlign: "center" }}>These are estimates. Actuals depend on attendance data.</div>
                    </div>

                    <div style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.3)", borderRadius: 12, padding: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#00E5A0", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                            <Calendar size={18} /> Disbursement scheduled: 30/11/2024
                        </div>
                        <div style={{ fontSize: 13, color: "#8899AA", paddingLeft: 28 }}>Working days in November: 21</div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #1A2A3A" }}>
                <Link href="/payroll">
                    <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>← Back to Payroll Dashboard</button>
                </Link>
                <Link href="/payroll/run/attendance-lock">
                    <button style={{ height: 44, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        Next: Lock Attendance Check <ChevronRight size={16} style={{ marginBottom: -2 }} />
                    </button>
                </Link>
            </div>
        </div>
    );
}
