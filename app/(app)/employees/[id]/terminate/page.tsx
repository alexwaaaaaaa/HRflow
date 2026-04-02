"use client";

import { use, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CalendarDays, CheckCircle2 } from "lucide-react";

export default function TerminateEmployee({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const empId = resolvedParams.id;
    const [step, setStep] = useState(1);

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 0 80px" }}>
            <div style={{ marginBottom: 32 }}>
                <Link href={`/employees/${empId}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12 }}>Terminate Employee</h2>
                <div style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Initiate offboarding & full-and-final settlement</div>
            </div>

            {/* Employee Mini Card */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,68,68,0.1)", color: "#FF4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>RS</div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>Rahul Kumar Sharma</div>
                    <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>{empId} • Senior Software Engineer • Engineering</div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 2, textTransform: "uppercase" }}>Notice Period</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>60 Days</div>
                </div>
            </div>

            {step === 1 ? (
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", marginBottom: 24 }}>Termination Details</h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Termination Type *</label>
                            <select style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }}>
                                <option>Resignation (Voluntary)</option>
                                <option>Termination (Involuntary - Performance)</option>
                                <option>Termination (Involuntary - Disciplinary)</option>
                                <option>Absconding</option>
                                <option>Retirement</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Notice Provided</label>
                            <select style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }}>
                                <option>Yes - Serving full notice</option>
                                <option>Yes - Notice buyout requested</option>
                                <option>No (Immediate Termination)</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24, padding: "20px", background: "rgba(0,102,255,0.05)", borderRadius: 12, border: "1px solid rgba(0,102,255,0.2)" }}>
                        <div>
                            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8899AA", marginBottom: 8 }}><CalendarDays size={14} /> Resignation Date *</label>
                            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ width: "100%", height: 44, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                        </div>
                        <div>
                            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8899AA", marginBottom: 8 }}><CalendarDays size={14} /> Last Working Day *</label>
                            <input type="date" defaultValue="2024-07-06" style={{ width: "100%", height: 44, background: "#0A1420", border: "1px solid #00E5A0", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                            <div style={{ fontSize: 11, color: "#00E5A0", marginTop: 6 }}>(Auto-calculated: 60 days from Resignation Date)</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Reason / Remarks *</label>
                        <textarea rows={4} placeholder="Enter reason for leaving..." style={{ width: "100%", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "12px 14px", color: "#FFFFFF", fontSize: 14, outline: "none", resize: "none" }}></textarea>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 12, padding: 16 }}>
                        <AlertTriangle color="#FFB800" size={20} style={{ flexShrink: 0 }} />
                        <div style={{ fontSize: 13, color: "#FFB800", lineHeight: 1.5 }}>
                            Employee's portal access will automatically be revoked on the Last Working Day at 11:59 PM.
                            Asset recovery and FnF tasks will be created immediately.
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 32 }}>
                        <button onClick={() => setStep(2)} style={{ padding: "0 24px", height: 44, background: "#FF4444", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            Initiate Offboarding
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <CheckCircle2 size={40} color="#00E5A0" />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 12 }}>Offboarding Initiated</h2>
                    <p style={{ fontSize: 15, color: "#8899AA", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
                        Rahul Sharma is now serving notice period. Relevant departments have been notified for Asset Recovery and clearance. FnF computation is now unlocked.
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                        <button style={{ padding: "0 24px", height: 48, background: "#00E5A0", color: "#060B14", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                            View Clearance Checklist
                        </button>
                        <Link href={`/employees/${empId}`} style={{ padding: "0 24px", height: 48, background: "#1A2A3A", border: "none", color: "#FFFFFF", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center" }}>
                            Back to Profile
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
