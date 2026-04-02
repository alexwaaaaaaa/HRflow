"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Save, X, AlertTriangle, History } from "lucide-react";

export default function EditEmployee({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1200);
    };

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px" }}>Edit Employee — Rahul Sharma</h2>
                    <div style={{ fontSize: 13, color: "#8899AA", display: "flex", alignItems: "center", gap: 6 }}>
                        <History size={14} /> Last edited by Priya Mehta on 12/11/2024
                    </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <Link href={`/employees/${resolvedParams.id}`} style={{ padding: "10px 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                        <X size={14} /> Cancel
                    </Link>
                    <button onClick={handleSave} style={{ padding: "0 20px", background: saved ? "#0A1420" : "#00E5A0", border: saved ? "1px solid #00E5A0" : "none", borderRadius: 8, color: saved ? "#00E5A0" : "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
                        {saving ? "Saving..." : saved ? "✅ Changes Saved" : <><Save size={16} /> Save Changes</>}
                    </button>
                </div>
            </div>

            <div style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 12, padding: 16, marginBottom: 24, display: "flex", alignItems: "flex-start", gap: 12 }}>
                <AlertTriangle color="#FFB800" size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFB800", marginBottom: 4 }}>Note on editing structural fields</div>
                    <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>Changes to Designation, Grade, or Department will trigger an approval workflow and a new entry in the employee&apos;s timeline. Salary changes must be done via the Salary Revision module.</div>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Personal */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 20 }}>Personal Information</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        <div>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Full Name *</label>
                            <input defaultValue="Rahul Kumar Sharma" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF" }} />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Personal Email *</label>
                            <input defaultValue="rahul.sharma@gmail.com" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF" }} />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Mobile *</label>
                            <input defaultValue="+91 98765 43210" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF" }} />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Date of Birth</label>
                            <input type="date" defaultValue="1996-03-15" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF" }} />
                        </div>
                    </div>
                </div>

                {/* Job */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 20 }}>Job & Organizational Details</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        <div style={{ borderLeft: "2px solid #FFB800", paddingLeft: 12, marginLeft: -14 }}>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Designation</label>
                            <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #FFB800", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", outline: "none" }}>
                                <option>Software Engineer</option>
                                <option selected>Senior Software Engineer</option>
                                <option>Tech Lead</option>
                            </select>
                            <div style={{ fontSize: 11, color: "#FFB800", marginTop: 6 }}>Approval required for title changes</div>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Department</label>
                            <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF" }}>
                                <option selected>Engineering</option>
                                <option>Product</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Reporting Manager</label>
                            <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF" }}>
                                <option>Anil Kumar</option>
                                <option selected>Kavya Reddy</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Location</label>
                            <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF" }}>
                                <option selected>Pune</option>
                                <option>Bengaluru</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <Link href={`/employees/${resolvedParams.id}/salary-revision`} style={{ color: "#0066FF", fontSize: 14, textDecoration: "none" }}>
                        Need to revise salary? Go to Salary Revisions →
                    </Link>
                </div>
            </div>
        </div>
    );
}
