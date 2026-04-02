"use client";

import { useState } from "react";
import { Edit2, Download, Lock } from "lucide-react";

const TABS = ["Overview", "My Payslips", "My Leave", "My Documents", "My Attendance"];

export default function MyProfile() {
    const [activeTab, setActiveTab] = useState("Overview");
    const [editing, setEditing] = useState(false);

    return (
        <div style={{ paddingBottom: 60 }} className="animate-fade-in">
            {/* Profile Header */}
            <div style={{ margin: "32px 32px 24px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 20, padding: "24px 32px", display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,229,160,0.1)", color: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, border: "3px solid #00E5A0" }}>RS</div>
                    <div style={{ position: "absolute", bottom: 2, right: 2, width: 14, height: 14, borderRadius: "50%", background: "#00E5A0", border: "2px solid #0D1928" }} />
                </div>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", margin: "0 0 6px" }}>Rahul Kumar Sharma</h1>
                    <div style={{ fontSize: 15, color: "#8899AA", marginBottom: 12 }}>Senior Software Engineer · Engineering</div>
                    <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#8899AA" }}>
                        <span>📍 Pune Office</span>
                        <span>🗓 Joined 15/11/2021</span>
                        <span>🏆 Grade L3</span>
                        <span>👤 EMP-0848</span>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
                    <button onClick={() => setEditing(!editing)} style={{ height: 40, padding: "0 16px", background: editing ? "#00E5A0" : "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: editing ? "#060B14" : "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Edit2 size={14} /> {editing ? "Save Changes" : "Edit My Details"}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ margin: "0 32px 24px", display: "flex", gap: 4, borderBottom: "1px solid #1A2A3A", paddingBottom: 0 }}>
                {TABS.map(t => (
                    <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "12px 20px", background: "none", border: "none", borderBottom: activeTab === t ? "2px solid #00E5A0" : "2px solid transparent", color: activeTab === t ? "#FFFFFF" : "#8899AA", fontSize: 14, fontWeight: activeTab === t ? 600 : 400, cursor: "pointer", marginBottom: -1 }}>
                        {t}
                    </button>
                ))}
            </div>

            <div style={{ padding: "0 32px" }}>
                {activeTab === "Overview" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Personal Information</h3>
                                    {!editing && <div style={{ fontSize: 12, color: "#8899AA", display: "flex", alignItems: "center", gap: 4 }}><Lock size={12} /> Some fields managed by HR</div>}
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                    {[
                                        { label: "Personal Email", val: "rahul.sharma@gmail.com", editable: true },
                                        { label: "Personal Mobile", val: "+91 98765 43210", editable: true },
                                        { label: "Date of Birth", val: "15/03/1996", editable: false },
                                        { label: "Blood Group", val: "O+", editable: true },
                                        { label: "Emergency Contact", val: "Sunita Sharma — +91 87654 32100", editable: true },
                                        { label: "Current Address", val: "123 Koregaon Park, Pune 411001", editable: true },
                                    ].map(f => (
                                        <div key={f.label}>
                                            <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 6 }}>{f.label}</div>
                                            {editing && f.editable ? (
                                                <input defaultValue={f.val} style={{ width: "100%", height: 36, background: "#060B14", border: "1px solid #00E5A0", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 13, outline: "none" }} />
                                            ) : (
                                                <div style={{ fontSize: 14, color: f.editable ? "#FFFFFF" : "#445566", display: "flex", alignItems: "center", gap: 6 }}>
                                                    {f.val}
                                                    {!f.editable && <Lock size={11} color="#445566" />}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {editing && (
                                    <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(0,102,255,0.05)", borderRadius: 8, border: "1px solid rgba(0,102,255,0.2)", fontSize: 13, color: "#0066FF" }}>
                                        Need to change locked fields? <button style={{ background: "none", border: "none", color: "#00E5A0", cursor: "pointer", fontWeight: 600, padding: 0 }}>Raise a request to HR →</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Job Details</h3>
                                {[
                                    ["Department", "Engineering"], ["Designation", "Senior SWE"],
                                    ["Grade", "L3"], ["Reports to", "Kavya Reddy"],
                                    ["Location", "Pune Office"], ["Work Mode", "Hybrid"],
                                    ["Shift", "General (9AM–6PM)"], ["Employment", "Full-time"],
                                ].map(([k, v]) => (
                                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #0A1420" }}>
                                        <span style={{ fontSize: 13, color: "#8899AA" }}>{k}</span>
                                        <span style={{ fontSize: 13, color: "#FFFFFF" }}>{v}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>My Compensation</h3>
                                <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 12 }}>Annual CTC (visible to you only)</div>
                                <div style={{ fontSize: 28, fontWeight: 700, color: "#00E5A0", marginBottom: 4 }}>₹12,00,000</div>
                                <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 16 }}>Monthly In-hand: ~₹90,000</div>
                                <button style={{ width: "100%", height: 36, background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#0066FF", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                    <Download size={14} /> Download Salary Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "My Payslips" && (
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                        {["November 2024", "October 2024", "September 2024", "August 2024"].map((m, i) => (
                            <div key={m} style={{ display: "flex", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #1A2A3A", gap: 16 }}>
                                <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{m}</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Gross: ₹95,000 · Net: ₹90,000</div>
                                <span style={{ fontSize: 11, background: i === 0 ? "rgba(255,184,0,0.1)" : "rgba(0,229,160,0.1)", color: i === 0 ? "#FFB800" : "#00E5A0", padding: "4px 10px", borderRadius: 20, fontWeight: 500 }}>
                                    {i === 0 ? "Pending" : "Paid"}
                                </span>
                                <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                    <Download size={12} /> Payslip
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
