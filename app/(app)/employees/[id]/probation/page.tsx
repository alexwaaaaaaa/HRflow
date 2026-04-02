"use client";

import { use, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, AlertTriangle, Star } from "lucide-react";

export default function ProbationReview({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [outcome, setOutcome] = useState("confirm");
    const [rating, setRating] = useState(4);

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 32px 80px" }}>
            <Link href={`/employees/${id}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12, marginBottom: 24 }}>Probation Review</h2>

            {/* Probation Info */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 20 }}>
                {[
                    { icon: "🗓", label: "Joined", val: "15/11/2024" },
                    { icon: "⏱", label: "Period", val: "6 months" },
                    { icon: "📅", label: "Ends On", val: "14/05/2025" },
                    { icon: "⏳", label: "Remaining", val: "183 days" },
                ].map(c => (
                    <div key={c.label} style={{ textAlign: "center", padding: "12px", background: "#0A1420", borderRadius: 12 }}>
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
                        <div style={{ fontSize: 11, color: "#8899AA", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>{c.val}</div>
                    </div>
                ))}
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 24 }}>Review Outcome</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                    {[
                        { val: "confirm", label: "Confirm Employment", desc: "End probation and confirm as permanent employee", color: "#00E5A0", icon: <CheckCircle2 size={18} /> },
                        { val: "extend", label: "Extend Probation", desc: "Extend for an additional period (3 or 6 months)", color: "#FFB800", icon: <Clock size={18} /> },
                        { val: "terminate", label: "Terminate (Not Suitable)", desc: "End employment — probation failed", color: "#FF4444", icon: <AlertTriangle size={18} /> },
                    ].map(o => (
                        <label key={o.val} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: 16, background: outcome === o.val ? `${o.color}08` : "#060B14", border: `1px solid ${outcome === o.val ? o.color : "#1A2A3A"}`, borderRadius: 12, cursor: "pointer" }}>
                            <input type="radio" name="outcome" value={o.val} checked={outcome === o.val} onChange={() => setOutcome(o.val)} style={{ accentColor: o.color, marginTop: 2, flexShrink: 0 }} />
                            <div style={{ color: o.color }}>{o.icon}</div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{o.label}</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>{o.desc}</div>
                            </div>
                        </label>
                    ))}
                </div>

                {outcome === "extend" && (
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Extend By</label>
                        <select style={{ height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }}>
                            <option>3 months</option>
                            <option>6 months</option>
                        </select>
                    </div>
                )}

                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 10 }}>Performance Rating during Probation</label>
                    <div style={{ display: "flex", gap: 8 }}>
                        {[1, 2, 3, 4, 5].map(s => (
                            <button key={s} onClick={() => setRating(s)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                <Star size={28} fill={s <= rating ? "#FFB800" : "none"} color={s <= rating ? "#FFB800" : "#445566"} />
                            </button>
                        ))}
                        <span style={{ fontSize: 14, color: "#8899AA", marginLeft: 8, alignSelf: "center" }}>{rating}/5</span>
                    </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Manager Feedback *</label>
                    <textarea rows={4} placeholder="Describe employee performance, strengths, and areas of improvement..." style={{ width: "100%", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "12px 14px", color: "#FFFFFF", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}></textarea>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ flex: 1, height: 48, background: outcome === "terminate" ? "#FF4444" : "#00E5A0", border: "none", borderRadius: 8, color: outcome === "terminate" ? "#FFFFFF" : "#060B14", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                        {outcome === "confirm" ? "Confirm Employment & Generate Letter" : outcome === "extend" ? "Extend Probation" : "Terminate Employee"}
                    </button>
                </div>
            </div>
        </div>
    );
}
