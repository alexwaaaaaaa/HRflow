"use client";

import { use, useState } from "react";
import Link from "next/link";
import { UserPlus, History, CheckCircle2, Copy } from "lucide-react";

export default function RehireEmployee({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const empId = resolvedParams.id;
    const [step, setStep] = useState(1);

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 0 80px" }}>
            <div style={{ marginBottom: 32 }}>
                <Link href={`/employees/${empId}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12 }}>Rehire Employee</h2>
                <div style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Restore a past employee profile with new compensation and job details.</div>
            </div>

            {/* Employee Mini Card (Past details) */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1A2A3A", color: "#8899AA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>RS</div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>Rahul Kumar Sharma</div>
                    <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>{empId} • EX-EMPLOYEE</div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 2, textTransform: "uppercase" }}>Previous Tenure</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", display: "flex", alignItems: "center", gap: 6 }}><History size={14} /> 2.5 Years</div>
                </div>
            </div>

            {step === 1 ? (
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", marginBottom: 24 }}>New Employment Details</h3>

                    <div style={{ display: "flex", gap: 16, marginBottom: 24, padding: "16px", background: "rgba(0,229,160,0.05)", borderRadius: 12, border: "1px solid rgba(0,229,160,0.2)" }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Rejoin Date *</label>
                            <input type="date" defaultValue="2024-09-01" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #00E5A0", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Employee ID Settings</label>
                            <select style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }}>
                                <option>Keep Old ID ({empId})</option>
                                <option>Generate New ID</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                        <div>
                            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>
                                New Designation *
                                <span style={{ color: "#0066FF", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Copy size={12} /> Same as before</span>
                            </label>
                            <select style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }}>
                                <option>Engineering Manager</option>
                                <option selected>Staff Software Engineer</option>
                                <option>Senior Software Engineer</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>New Department *</label>
                            <select style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }}>
                                <option>Engineering</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>New Annual CTC (₹) *</label>
                            <input type="number" defaultValue="2400000" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 16, fontWeight: 600, outline: "none" }} />
                            <div style={{ fontSize: 12, color: "#8899AA", marginTop: 6 }}>(Previous CTC: ₹18,00,000)</div>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Reporting Manager</label>
                            <select style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }}>
                                <option>Kavya Reddy</option>
                                <option selected>Anil Kumar</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 32 }}>
                        <button onClick={() => setStep(2)} style={{ padding: "0 24px", height: 44, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            <UserPlus size={18} /> Confirm Rehire
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <CheckCircle2 size={40} color="#00E5A0" />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 12 }}>Employee Rehired Successfully!</h2>
                    <p style={{ fontSize: 15, color: "#8899AA", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
                        Rahul Sharma's profile has been activated with effect from 1st Sep 2024. Welcome email and portal access credentials have been dispatched.
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                        <Link href={`/employees/${empId}`} style={{ padding: "0 24px", height: 48, background: "#00E5A0", color: "#060B14", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center" }}>
                            Go to Active Profile
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
