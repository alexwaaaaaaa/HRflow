"use client";

import { File, Download, UploadCloud, Folder, Search, CheckCircle } from "lucide-react";

export default function DocumentsTab() {
    const categories = [
        { name: "Identity & Verification", count: 4, icon: <File size={16} /> },
        { name: "Onboarding Letters", count: 2, icon: <Folder size={16} /> },
        { name: "Prior Experience", count: 3, icon: <Folder size={16} /> },
        { name: "Tax & Compliance", count: 5, icon: <File size={16} /> },
    ];

    const documents = [
        { name: "Aadhaar Card.pdf", category: "Identity", date: "01 Jun 2021", size: "1.2 MB", verified: true },
        { name: "PAN Card.pdf", category: "Identity", date: "01 Jun 2021", size: "0.8 MB", verified: true },
        { name: "Offer Letter signed.pdf", category: "Onboarding", date: "15 May 2021", size: "2.1 MB", verified: true },
        { name: "Form 16 - FY23.pdf", category: "Tax", date: "10 May 2024", size: "3.5 MB", verified: false },
        { name: "Relieving Letter - Previous.pdf", category: "Experience", date: "05 Jun 2021", size: "1.1 MB", verified: true },
    ];

    return (
        <div>
            {/* Header Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ position: "relative", width: 300 }}>
                    <Search size={16} color="#445566" style={{ position: "absolute", left: 16, top: 11 }} />
                    <input
                        type="text"
                        placeholder="Search employee documents..."
                        style={{
                            width: "100%", height: 38, background: "#0A1420", border: "1px solid #1A2A3A",
                            borderRadius: 8, padding: "0 16px 0 40px", color: "#FFFFFF", fontSize: 13
                        }}
                    />
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 38, padding: "0 16px", background: "#1A2A3A", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 13, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Download size={14} /> Download All (.zip)
                    </button>
                    <button style={{ height: 38, padding: "0 16px", background: "#00E5A0", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#060B14", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <UploadCloud size={16} /> Upload Document
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 24 }}>
                {/* Sidebar Categories */}
                <div>
                    <h3 style={{ fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Vault Folders</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <button style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "#1A2A3A", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 13, cursor: "pointer" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Folder size={16} color="#00E5A0" /> All Documents</span>
                            <span style={{ fontSize: 11, background: "#0D1928", padding: "2px 8px", borderRadius: 12 }}>14</span>
                        </button>
                        {categories.map((c) => (
                            <button key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "transparent", border: "none", borderRadius: 8, color: "#8899AA", fontSize: 13, cursor: "pointer" }} className="hover:bg-[#0D1928] hover:text-white">
                                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>{c.icon} {c.name}</span>
                                <span style={{ fontSize: 11 }}>{c.count}</span>
                            </button>
                        ))}
                    </div>

                    <div style={{ background: "rgba(0,229,160,0.06)", border: "1px dashed rgba(0,229,160,0.3)", borderRadius: 12, padding: 20, marginTop: 24, textAlign: "center" }}>
                        <UploadCloud size={24} color="#00E5A0" style={{ margin: "0 auto 12px" }} />
                        <div style={{ fontSize: 13, color: "#FFFFFF", marginBottom: 4 }}>Drag & Drop files</div>
                        <div style={{ fontSize: 11, color: "#8899AA" }}>PDF, JPG, PNG up to 10MB</div>
                    </div>
                </div>

                {/* Document List */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 120px 100px 80px", padding: "12px 24px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", fontSize: 11, color: "#445566", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>
                        <span>Document Name</span>
                        <span>Category</span>
                        <span>Added On</span>
                        <span>Size</span>
                        <span style={{ textAlign: "right" }}>Actions</span>
                    </div>

                    {documents.map((doc, i) => (
                        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 140px 120px 100px 80px", padding: "16px 24px", borderBottom: "1px solid #0A1420", alignItems: "center" }} className="hover:bg-[#0A1420]">
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 32, height: 32, background: "rgba(0,102,255,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#0066FF" }}>
                                    <File size={16} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, color: "#FFFFFF", display: "flex", alignItems: "center", gap: 8 }}>
                                        {doc.name}
                                        {doc.verified && <CheckCircle size={12} color="#00E5A0" />}
                                    </div>
                                    <div style={{ fontSize: 11, color: "#445566", marginTop: 2 }}>Click to preview</div>
                                </div>
                            </div>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>{doc.category}</span>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>{doc.date}</span>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>{doc.size}</span>
                            <div style={{ textAlign: "right" }}>
                                <button style={{ background: "none", border: "none", color: "#0066FF", cursor: "pointer", padding: 4 }}><Download size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
