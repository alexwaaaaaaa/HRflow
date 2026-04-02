"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ShieldOff } from "lucide-react";

export default function SuspendEmployee({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [salaryType, setSalaryType] = useState("full");
    const [indefinite, setIndefinite] = useState(false);

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 32px 80px" }}>
            <Link href={`/employees/${id}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12, marginBottom: 24 }}>Suspend Employee</h2>

            <div style={{ background: "rgba(255,68,68,0.05)", border: "1px solid rgba(255,68,68,0.3)", borderRadius: 12, padding: 20, marginBottom: 28, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <ShieldOff color="#FF4444" size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FF4444", marginBottom: 4 }}>Employee will be suspended</div>
                    <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                        Suspension will restrict the employee's system access and mark their attendance days as "Suspended". A suspension order will be sent to the employee via email.
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 24 }}>Suspension Details</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Suspension Type *</label>
                        <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }}>
                            <option>Pending Inquiry / Departmental</option>
                            <option>Disciplinary Action</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Suspension Start Date *</label>
                        <input type="date" defaultValue={new Date().toISOString().split("T")[0]} style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", outline: "none" }} />
                    </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, cursor: "pointer" }}>
                        <input type="checkbox" checked={indefinite} onChange={e => setIndefinite(e.target.checked)} style={{ accentColor: "#FF4444" }} />
                        <span style={{ fontSize: 14, color: "#FFFFFF" }}>Until further notice (no defined end date)</span>
                    </label>
                    {!indefinite && (
                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Suspension End Date *</label>
                            <input type="date" defaultValue="2024-11-30" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", outline: "none" }} />
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 12 }}>Salary During Suspension *</label>
                    <div style={{ display: "flex", gap: 12 }}>
                        {[["full", "Full Pay"], ["half", "Half Pay"], ["none", "No Pay"]].map(([v, l]) => (
                            <button key={v} onClick={() => setSalaryType(v)} style={{ flex: 1, height: 44, background: salaryType === v ? (v === "none" ? "rgba(255,68,68,0.1)" : "rgba(0,229,160,0.1)") : "#060B14", border: `1px solid ${salaryType === v ? (v === "none" ? "#FF4444" : "#00E5A0") : "#1A2A3A"}`, borderRadius: 10, color: salaryType === v ? "#FFFFFF" : "#8899AA", fontSize: 14, fontWeight: salaryType === v ? 600 : 400, cursor: "pointer" }}>
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Reason *</label>
                    <textarea rows={3} placeholder="State the reason for suspension..." style={{ width: "100%", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "12px 14px", color: "#FFFFFF", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}></textarea>
                </div>

                <div style={{ marginBottom: 28, padding: "14px 16px", background: "#060B14", borderRadius: 12, border: "1px solid #1A2A3A" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: "#FF4444" }} />
                        <span style={{ fontSize: 13, color: "#8899AA" }}>Revoke system access (portal login, email) during suspension period</span>
                    </label>
                </div>

                <button style={{ width: "100%", height: 48, background: "#FF4444", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                    Suspend Employee
                </button>
            </div>
        </div>
    );
}
