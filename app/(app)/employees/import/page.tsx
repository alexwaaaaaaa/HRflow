"use client";

import { useState } from "react";
import { UploadCloud, FileSpreadsheet, Check, AlertTriangle, ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function BulkImport() {
    const [step, setStep] = useState(1);
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<string | null>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        setFile("employees_q3_batch.xlsx");
        setTimeout(() => setStep(2), 1500);
    };

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px 80px" }}>
            <div style={{ marginBottom: 32 }}>
                <Link href="/employees" style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Employees</Link>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12 }}>Bulk Import Employees</h1>
                <div style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Import multiple employees via Excel or CSV</div>
            </div>

            {/* Stepper */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                {[
                    { num: 1, label: "Upload File" },
                    { num: 2, label: "Map Columns" },
                    { num: 3, label: "Preview Data" },
                    { num: 4, label: "Import Complete" },
                ].map((s, i) => (
                    <div key={s.num} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: step > s.num ? "#00E5A0" : step === s.num ? "rgba(0,229,160,0.2)" : "#1A2A3A", border: step === s.num ? "1px solid #00E5A0" : "none", color: step > s.num ? "#060B14" : step === s.num ? "#00E5A0" : "#445566", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                                {step > s.num ? <Check size={14} /> : s.num}
                            </div>
                            <span style={{ fontSize: 14, fontWeight: step === s.num ? 600 : 400, color: step >= s.num ? "#FFFFFF" : "#445566" }}>{s.label}</span>
                        </div>
                        {i < 3 && <div style={{ width: 40, height: 2, background: step > s.num ? "#00E5A0" : "#1A2A3A" }} />}
                    </div>
                ))}
            </div>

            {/* STEP 1: UPLOAD */}
            {step === 1 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 32 }}>
                    <div>
                        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                            {["Basic Template (30 cols)", "Full Template (80 cols)", "Keka/Darwinbox Sync"].map(t => (
                                <div key={t} style={{ flex: 1, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 16, cursor: "pointer" }} className="hover:border-[#00E5A0] transition-colors">
                                    <FileSpreadsheet size={24} color="#00E5A0" style={{ marginBottom: 12 }} />
                                    <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{t}</div>
                                    <div style={{ fontSize: 12, color: "#0066FF", display: "flex", alignItems: "center", gap: 4 }}><Download size={12} /> Download</div>
                                </div>
                            ))}
                        </div>

                        <div
                            onDragOver={e => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            style={{ border: `2px dashed ${dragging ? "#00E5A0" : "#1A2A3A"}`, borderRadius: 16, padding: "60px 20px", textAlign: "center", background: dragging ? "rgba(0,229,160,0.02)" : "transparent", cursor: "pointer", transition: "all 0.2s" }}
                        >
                            {!file ? (
                                <>
                                    <UploadCloud size={40} color={dragging ? "#00E5A0" : "#445566"} style={{ margin: "0 auto 16px" }} />
                                    <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>{dragging ? "Drop file here" : "Drag & drop your Excel / CSV file"}</div>
                                    <div style={{ fontSize: 13, color: "#8899AA" }}>Supported: .xlsx, .csv • Max 10MB • Up to 10,000 employees</div>
                                    <button style={{ marginTop: 24, padding: "0 24px", height: 40, background: "#1A2A3A", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer" }}>Browse Files</button>
                                </>
                            ) : (
                                <>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(0,229,160,0.1)", color: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><FileSpreadsheet size={24} /></div>
                                    <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>{file}</div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                        <div style={{ width: 16, height: 16, border: "2px solid #00E5A0", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                                        <span style={{ fontSize: 13, color: "#00E5A0" }}>Analyzing headers...</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div>
                        <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 16 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Guidelines</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {["Download template before uploading", "First row must be column headers", "Date format: DD/MM/YYYY", "IDs auto-generated if blank"].map(g => (
                                    <div key={g} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                        <Check size={16} color="#00E5A0" style={{ marginTop: 2 }} />
                                        <span style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>{g}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 2: MAP */}
            {step === 2 && (
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, background: "#0D1928", border: "1px solid #1A2A3A", padding: "16px 24px", borderRadius: 12 }}>
                        <div><span style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>156 rows detected</span> <span style={{ color: "#8899AA", fontSize: 14 }}>• 32 cols mapped, 0 unmapped required</span></div>
                        <button onClick={() => setStep(3)} style={{ padding: "0 24px", height: 40, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>Preview Data <ArrowRight size={16} /></button>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 100px", gap: 16, padding: "12px 24px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase" }}>
                            <div>Your Header</div>
                            <div>Sample Data (Row 1)</div>
                            <div>HRFlow Field</div>
                            <div>Required</div>
                        </div>
                        {[
                            { y: "Full Name", s: "Rahul Sharma", h: "First Name", r: true },
                            { y: "Email Address", s: "rahul@techcorp.in", h: "Work Email", r: true },
                            { y: "Mobile", s: "9876543210", h: "Personal Mobile", r: true },
                            { y: "DOJ", s: "15/11/2024", h: "Date of Joining", r: true },
                            { y: "base_salary", s: "1200000", h: "Annual CTC", r: true },
                            { y: "blood_grp", s: "O+", h: "Blood Group", r: false },
                        ].map((r, i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 100px", gap: 16, padding: "16px 24px", borderBottom: "1px solid #1A2A3A", alignItems: "center" }}>
                                <div style={{ fontSize: 13, fontFamily: "monospace", color: "#8899AA" }}>{r.y}</div>
                                <div style={{ fontSize: 13, color: "#8899AA", fontStyle: "italic" }}>"{r.s}"</div>
                                <div>
                                    <select style={{ width: "100%", height: 36, background: "#060B14", border: "1px solid #00E5A0", borderRadius: 6, color: "#FFFFFF", padding: "0 12px", outline: "none" }}>
                                        <option>{r.h}</option>
                                    </select>
                                </div>
                                <div>{r.r && <span style={{ background: "rgba(255,68,68,0.1)", color: "#FF4444", padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Yes</span>}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 3: PREVIEW */}
            {step === 3 && (
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, background: "#0D1928", border: "1px solid #1A2A3A", padding: "16px 24px", borderRadius: 12 }}>
                        <div style={{ display: "flex", gap: 24 }}>
                            <div style={{ color: "#FFFFFF" }}><span style={{ fontSize: 20, fontWeight: 700 }}>156</span> Total</div>
                            <div style={{ color: "#00E5A0" }}><span style={{ fontSize: 20, fontWeight: 700 }}>153</span> Valid</div>
                            <div style={{ color: "#FFB800" }}><span style={{ fontSize: 20, fontWeight: 700 }}>3</span> Warnings</div>
                            <div style={{ color: "#FF4444" }}><span style={{ fontSize: 20, fontWeight: 700 }}>0</span> Errors</div>
                        </div>
                        <button onClick={() => setStep(4)} style={{ padding: "0 24px", height: 40, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>Import 156 Records</button>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start", borderLeft: "4px solid #FFB800" }}>
                        <AlertTriangle color="#FFB800" size={20} />
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFB800" }}>3 Designation warnings detected</div>
                            <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>&quot;VP Marketing&quot; and &quot;Lead Designer&quot; do not exist in the system. They will be auto-created during import.</div>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", whiteSpace: "nowrap" }}>
                            <thead>
                                <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                                    {["Status", "First Name", "Email", "Mobile", "Joining Date", "Designation", "CTC"].map(h => (
                                        <th key={h} style={{ padding: "12px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { s: "✅", n: "Rahul Sharma", e: "rahul@techcorp.in", m: "9876543210", d: "15/11/2024", des: "Senior SWE", c: "1200000" },
                                    { s: "✅", n: "Sneha Rao", e: "sneha@techcorp.in", m: "9876543000", d: "01/10/2024", des: "Marketing Exec", c: "800000" },
                                    { s: "⚠️", n: "Karan Johar", e: "karan@techcorp.in", m: "9876543111", d: "01/12/2024", des: "VP Marketing", c: "3500000", bg: "rgba(255,184,0,0.05)" },
                                ].map((r, i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid #1A2A3A", background: r.bg || "transparent" }}>
                                        <td style={{ padding: "12px 20px" }}>{r.s}</td>
                                        <td style={{ padding: "12px 20px", fontSize: 13, color: "#FFFFFF" }}>{r.n}</td>
                                        <td style={{ padding: "12px 20px", fontSize: 13, color: "#8899AA" }}>{r.e}</td>
                                        <td style={{ padding: "12px 20px", fontSize: 13, color: "#8899AA" }}>{r.m}</td>
                                        <td style={{ padding: "12px 20px", fontSize: 13, color: "#FFFFFF" }}>{r.d}</td>
                                        <td style={{ padding: "12px 20px", fontSize: 13, color: r.bg ? "#FFB800" : "#FFFFFF" }}>{r.des}</td>
                                        <td style={{ padding: "12px 20px", fontSize: 13, color: "#00E5A0" }}>{r.c}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <Check size={40} color="#00E5A0" />
                    </div>
                    <h2 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", marginBottom: 12 }}>Import Complete!</h2>
                    <p style={{ fontSize: 16, color: "#8899AA", marginBottom: 32 }}>156 employees imported successfully into HRFlow.</p>

                    <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                        <Link href="/employees" style={{ padding: "0 24px", height: 48, background: "#00E5A0", color: "#060B14", borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center" }}>
                            Go to Employee Directory
                        </Link>
                        <button onClick={() => setStep(1)} style={{ padding: "0 24px", height: 48, background: "#1A2A3A", border: "none", color: "#FFFFFF", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                            Import Another Batch
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
