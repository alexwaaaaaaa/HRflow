"use client";

import { use, useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function ShowCauseNotice({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [status, setStatus] = useState<"draft" | "issued" | "responded">("draft");

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 32px 80px" }}>
            <Link href={`/employees/${id}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12, marginBottom: 8 }}>Show Cause Notice</h2>
            <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 28 }}>Issue a formal notice requiring the employee to explain their conduct</div>

            {/* Status Tracker */}
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
                {[
                    { key: "draft", label: "Notice Issued" },
                    { key: "issued", label: "Response Received" },
                    { key: "responded", label: "Reviewed" },
                ].map((s, i) => (
                    <div key={s.key} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: status >= s.key ? "rgba(0,229,160,0.05)" : "#0D1928", border: `1px solid ${status >= s.key ? "#00E5A0" : "#1A2A3A"}`, borderRadius: 20 }}>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", background: ["issued", "responded"].includes(status) && i < ["draft", "issued", "responded"].indexOf(status) ? "#00E5A0" : status === s.key ? "rgba(0,229,160,0.2)" : "#1A2A3A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#00E5A0", fontWeight: 700 }}>
                                {i + 1}
                            </div>
                            <span style={{ fontSize: 13, color: "#FFFFFF" }}>{s.label}</span>
                        </div>
                        {i < 2 && <div style={{ width: 30, height: 2, background: "#1A2A3A" }} />}
                    </div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 20 }}>Notice Details</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Subject / Allegation *</label>
                                <input placeholder="e.g. Unauthorized absence from 5th to 8th November 2024" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Body of Notice *</label>
                                <textarea rows={5} defaultValue={`You are hereby required to submit written explanation for your conduct related to the alleged misconduct. Your explanation must be submitted within the stipulated time.`} style={{ width: "100%", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "12px 14px", color: "#FFFFFF", fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box" }}></textarea>
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Response Deadline *</label>
                                <input type="date" defaultValue="2024-11-25" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", outline: "none" }} />
                            </div>
                        </div>
                        <button style={{ width: "100%", height: 44, background: "#FF4444", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 24 }}>Issue Notice to Employee</button>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Employee Response</h3>
                        <div style={{ padding: "20px", background: "#060B14", borderRadius: 12, border: "1px solid #1A2A3A", marginBottom: 16, minHeight: 100 }}>
                            <div style={{ fontSize: 13, color: "#445566", fontStyle: "italic" }}>No response submitted yet. Response is due by 25/11/2024.</div>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>HR Review / Outcome</label>
                            <textarea rows={3} placeholder="After receiving employee response, add your remarks and outcome here..." style={{ width: "100%", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "12px 14px", color: "#FFFFFF", fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box" }}></textarea>
                        </div>
                    </div>
                    <div style={{ background: "rgba(255,68,68,0.05)", border: "1px solid rgba(255,68,68,0.2)", borderRadius: 12, padding: 16, display: "flex", gap: 12 }}>
                        <AlertTriangle color="#FF4444" size={18} style={{ flexShrink: 0 }} />
                        <div style={{ fontSize: 13, color: "#FF4444", lineHeight: 1.5 }}>Failure to respond by the deadline may result in further disciplinary action including termination.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
