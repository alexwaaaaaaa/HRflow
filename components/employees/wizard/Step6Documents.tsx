"use client";

import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, X, AlertTriangle } from "lucide-react";

const MANDATORY_DOCS = [
    { name: "PAN Card", status: "verified", icon: "🆔" },
    { name: "Aadhaar Card", status: "pending", icon: "🆔" },
    { name: "Passport Photo", status: "pending", icon: "📷" },
    { name: "Signed Offer Letter", status: "pending", icon: "📄" },
    { name: "Signed Appointment Letter", status: "pending", icon: "📋" },
];

const UPLOADED = [
    { name: "PAN_Card_Rahul.pdf", type: "pdf", cat: "Identity", size: "1.2 MB", date: "Today" },
    { name: "Graduation_Certificate.pdf", type: "pdf", cat: "Education", size: "3.4 MB", date: "Today" },
    { name: "Experience_Letter_Infosys.pdf", type: "pdf", cat: "Employment", size: "890 KB", date: "Today" },
];

export default function Step6Documents({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (d: Record<string, unknown>) => void }) {
    const [dragging, setDragging] = useState(false);
    const [scanning, setScanning] = useState<string | null>(null);
    const [scanned, setScanned] = useState<string[]>([]);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        // Simulate AI scan
        const fakeFile = "PAN_Card.pdf";
        setScanning(fakeFile);
        setTimeout(() => {
            setScanning(null);
            setScanned(prev => [...prev, fakeFile]);
        }, 1800);
    };

    return (
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", margin: "0 0 4px" }}>Upload Documents</h2>
            <p style={{ fontSize: 13, color: "#445566", margin: "0 0 24px" }}>Upload ID proofs, educational certificates, and employment documents. AI auto-categorizes uploaded files.</p>

            {/* Mandatory docs checklist */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <AlertTriangle size={16} color="#FFB800" />
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Mandatory Documents</h3>
                    <span style={{ fontSize: 12, color: "#FF4444", marginLeft: "auto" }}>Required before payroll</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {MANDATORY_DOCS.map(doc => (
                        <div key={doc.name} style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                            background: "#0A1420", borderRadius: 10, border: `1px solid ${doc.status === "verified" ? "rgba(0,229,160,0.2)" : "#1A2A3A"}`
                        }}>
                            <span style={{ fontSize: 18 }}>{doc.icon}</span>
                            <span style={{ fontSize: 14, color: "#FFFFFF", flex: 1 }}>{doc.name}</span>
                            {doc.status === "verified" ? (
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <CheckCircle2 size={15} color="#00E5A0" />
                                    <span style={{ fontSize: 12, color: "#00E5A0" }}>Verified</span>
                                </div>
                            ) : (
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 12, color: "#FF4444", padding: "3px 8px", background: "rgba(255,68,68,0.1)", borderRadius: 6 }}>Missing</span>
                                    <button style={{ height: 28, padding: "0 12px", background: "#1A2A3A", border: "1px solid #1A2A3A", borderRadius: 6, fontSize: 12, color: "#FFFFFF", cursor: "pointer" }}
                                        className="hover:border-[#445566]">Upload</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 10, fontSize: 12, color: "#FFB800" }}>
                    ⚠ 4 mandatory documents missing — employee can upload these via self-service portal
                </div>
            </div>

            {/* AI Upload Zone */}
            <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                style={{
                    border: `2px dashed ${dragging ? "#00E5A0" : "#1A2A3A"}`,
                    borderRadius: 14, padding: "40px 32px", textAlign: "center",
                    background: dragging ? "rgba(0,229,160,0.04)" : "transparent",
                    cursor: "pointer", transition: "all 0.2s", marginBottom: 20
                }}
            >
                <UploadCloud size={36} color={dragging ? "#00E5A0" : "#445566"} style={{ margin: "0 auto 12px" }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 6 }}>
                    {dragging ? "Release to upload" : "Drop files here or click to browse"}
                </div>
                <div style={{ fontSize: 13, color: "#00E5A0", marginBottom: 8 }}>
                    ✦ AI will auto-detect document type and categorize it
                </div>
                <div style={{ fontSize: 12, color: "#445566" }}>PDF, JPG, PNG, DOCX — max 10MB per file</div>

                {scanning && (
                    <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "10px 16px", background: "rgba(0,102,255,0.08)", borderRadius: 10, border: "1px solid rgba(0,102,255,0.2)" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #0066FF", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                        <span style={{ fontSize: 13, color: "#0066FF" }}>AI scanning: Detecting document type...</span>
                    </div>
                )}
                {scanned.length > 0 && (
                    <div style={{ marginTop: 12, padding: "10px 16px", background: "rgba(0,229,160,0.08)", borderRadius: 10, fontSize: 13, color: "#00E5A0" }}>
                        ✅ Detected: PAN Card — Extracted: AAACT1234C. Filed under Identity Proofs.
                    </div>
                )}
            </div>

            {/* Uploaded files */}
            {UPLOADED.length > 0 && (
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", margin: "0 0 16px" }}>Uploaded Documents ({UPLOADED.length})</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {UPLOADED.map(f => (
                            <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#0A1420", borderRadius: 10, border: "1px solid #1A2A3A" }}>
                                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <FileText size={18} color="#FF4444" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>{f.name}</div>
                                    <div style={{ fontSize: 11, color: "#445566", marginTop: 2 }}>{f.cat} · {f.size} · {f.date}</div>
                                </div>
                                <span style={{ background: "#1A2A3A", color: "#8899AA", padding: "2px 8px", borderRadius: 6, fontSize: 11 }}>{f.cat}</span>
                                <button style={{ width: 28, height: 28, borderRadius: 6, background: "transparent", border: "none", cursor: "pointer", color: "#445566", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    className="hover:text-[#FF4444] hover:bg-[rgba(255,68,68,0.08)]">
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
