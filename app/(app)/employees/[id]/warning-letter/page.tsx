"use client";

import { use, useState } from "react";
import Link from "next/link";

const INCIDENTS = ["Attendance irregularity", "Insubordination", "Misconduct", "Poor performance", "Policy violation", "Other"];
const LEVELS = ["Verbal Warning (1st)", "Written Warning (1st)", "Written Warning (2nd)", "Final Warning"];

export default function WarningLetter({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [incident, setIncident] = useState(INCIDENTS[0]);
    const [level, setLevel] = useState(LEVELS[0]);
    const [desc, setDesc] = useState("");
    const [improvement, setImprovement] = useState("");

    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 32px 80px" }}>
            <Link href={`/employees/${id}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12, marginBottom: 24 }}>Warning Letter</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 28 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 20 }}>Incident Details</h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Incident Type *</label>
                                <select value={incident} onChange={e => setIncident(e.target.value)} style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }}>
                                    {INCIDENTS.map(i => <option key={i}>{i}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Incident Date *</label>
                                <input type="date" defaultValue="2024-11-10" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", outline: "none" }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Warning Level *</label>
                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                {LEVELS.map(l => (
                                    <button key={l} onClick={() => setLevel(l)} style={{ padding: "8px 14px", background: level === l ? "rgba(255,68,68,0.1)" : "#060B14", border: `1px solid ${level === l ? "#FF4444" : "#1A2A3A"}`, borderRadius: 8, color: level === l ? "#FF4444" : "#8899AA", fontSize: 13, cursor: "pointer" }}>{l}</button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Incident Description * <span style={{ color: "#445566" }}>(min 50 chars)</span></label>
                            <textarea rows={4} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe what happened, when and how..." style={{ width: "100%", background: "#060B14", border: `1px solid ${desc.length > 0 && desc.length < 50 ? "#FF4444" : "#1A2A3A"}`, borderRadius: 8, padding: "12px 14px", color: "#FFFFFF", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}></textarea>
                            {desc.length > 0 && desc.length < 50 && <div style={{ fontSize: 12, color: "#FF4444", marginTop: 4 }}>Minimum 50 characters required ({desc.length}/50)</div>}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Expected Improvement</label>
                                <textarea rows={3} value={improvement} onChange={e => setImprovement(e.target.value)} placeholder="What should the employee do differently..." style={{ width: "100%", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "12px 14px", color: "#FFFFFF", fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box" }}></textarea>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <div>
                                    <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Improvement Deadline</label>
                                    <input type="date" defaultValue="2024-12-10" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", outline: "none" }} />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Witnessed By (optional)</label>
                                    <input placeholder="Search employee..." style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 13, outline: "none" }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 12 }}>
                            <button style={{ flex: 1, height: 44, background: "#FF4444", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Generate & Issue Warning Letter</button>
                            <button style={{ height: 44, padding: "0 20px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>Save Draft</button>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 12 }}>Previous Warnings</h3>
                        <div style={{ textAlign: "center", padding: "20px 0", color: "#8899AA", fontSize: 13 }}>
                            No previous warnings on record ✅
                        </div>
                    </div>
                </div>

                {/* Letter Preview */}
                <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "40px 32px", color: "#000", fontFamily: "serif", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", fontSize: 13, lineHeight: 1.8, height: "fit-content" }}>
                    <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: -0.5, marginBottom: 4 }}>TechCorp</div>
                    <div style={{ fontSize: 12, color: "#666", borderBottom: "1px solid #CCC", paddingBottom: 16, marginBottom: 24 }}>Solutions Pvt. Ltd. · 123 Tech Park, Bengaluru</div>
                    <div style={{ fontWeight: 700, textAlign: "center", textDecoration: "underline", marginBottom: 24 }}>{level.toUpperCase()}</div>
                    <div style={{ marginBottom: 16 }}>Date: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
                    <div style={{ marginBottom: 16 }}><strong>To,</strong><br />Rahul Kumar Sharma<br />Sr. Software Engineer, Engineering</div>
                    <div style={{ marginBottom: 16 }}><strong>Subject: {level} — {incident}</strong></div>
                    <div style={{ marginBottom: 16 }}>This is to bring to your notice that on the date of incident, your conduct regarding <strong>{incident.toLowerCase()}</strong> was found to be in violation of company policy.</div>
                    <div style={{ marginBottom: 16 }}>{desc || "[Incident description will appear here...]"}</div>
                    <div style={{ marginBottom: 16 }}>You are expected to: {improvement || "[Improvement expectations will appear here...]"}</div>
                    <div style={{ marginTop: 40 }}>
                        <div style={{ height: 40, borderBottom: "1px dashed #CCC", width: 200, marginBottom: 4 }} />
                        <div>Priya Mehta, HR Manager</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
