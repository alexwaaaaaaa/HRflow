"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, X, FileSpreadsheet } from "lucide-react";

export default function ImportMappingPage() {
    const columns = [
        { excel: "First Name", system: "First Name", status: "mapped" },
        { excel: "Last Name", system: "Last Name", status: "mapped" },
        { excel: "Email ID", system: "Work Email", status: "mapped" },
        { excel: "Mobile Num", system: "Mobile Number", status: "mapped" },
        { excel: "Role", system: "Designation", status: "mapped" },
        { excel: "Dept", system: "Department", status: "mapped" },
        { excel: "Joining Dt", system: "Date of Joining", status: "mapped" },
        { excel: "Salary L", system: "Annual CTC", status: "mapped" },
        { excel: "Grade/Level", system: "Grade", status: "mapped" },
        { excel: "UAN", system: "UAN Number", status: "mapped" },
        { excel: "PAN Number", system: "PAN Number", status: "mapped" },
        { excel: "Work Location", system: "Work Location", status: "mapped" },
        { excel: "Reporting To", system: "Reporting Manager", status: "mapped" },
        { excel: "DOB", system: "Date of Birth", status: "mapped" },
        { excel: "Personal Email", system: "Personal Email", status: "mapped" },
        { excel: "Emergency Contact", system: "Emergency Contact", status: "mapped" },
        { excel: "Blood Group", system: "Blood Group", status: "mapped" },
        { excel: "Address", system: "Current Address", status: "mapped" },
        { excel: "City", system: "City", status: "mapped" },
        { excel: "Pincode", system: "Pincode", status: "mapped" },
        { excel: "Custom Field 1", system: "Select Field...", status: "unmapped" },
        { excel: "Notes", system: "Select Field...", status: "unmapped", ignore: true },
    ];

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }} className="animate-fade-in">
            <Link href="/employees/import" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 24 }}>
                <ArrowLeft size={16} /> Back to Import
            </Link>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px 0" }}>Map Columns</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>File: HR_Data_Dump_Nov2024.xlsx <span style={{ color: "#445566", marginLeft: 8 }}>(124 rows, 22 columns)</span></div>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                    <Link href="/employees/import/preview">
                        <button style={{ height: 40, padding: "0 24px", background: "#00E5A0", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, color: "#060B14", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            Next: Preview Data <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr 100px", padding: "16px 24px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    <div>Your Excel Column</div>
                    <div></div>
                    <div>HRFlow Field</div>
                    <div style={{ textAlign: "right" }}>Status</div>
                </div>

                <div style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
                    {columns.map((col, i) => (
                        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr 100px", padding: "16px 24px", borderBottom: "1px solid #0A1420", alignItems: "center", background: col.ignore ? "rgba(255,255,255,0.02)" : "transparent", opacity: col.ignore ? 0.5 : 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <FileSpreadsheet size={16} color="#00E5A0" />
                                <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>{col.excel}</span>
                            </div>

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <ArrowRight size={16} color="#445566" />
                            </div>

                            <div>
                                <select style={{ width: "100%", height: 36, background: col.status === "mapped" ? "rgba(0,102,255,0.1)" : "#0A1420", border: col.status === "mapped" ? "1px solid rgba(0,102,255,0.3)" : "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: col.status === "mapped" ? "#0066FF" : "#8899AA", fontSize: 13, fontWeight: col.status === "mapped" ? 600 : 400, appearance: "none", cursor: "pointer" }}>
                                    <option>{col.system}</option>
                                </select>
                            </div>

                            <div style={{ textAlign: "right" }}>
                                {col.ignore ? (
                                    <span style={{ fontSize: 12, color: "#445566", background: "#0A1420", padding: "4px 8px", borderRadius: 6 }}>Ignored</span>
                                ) : col.status === "mapped" ? (
                                    <span style={{ fontSize: 12, color: "#00E5A0", background: "rgba(0,229,160,0.1)", padding: "4px 8px", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 4 }}><Check size={12} /> Mapped</span>
                                ) : (
                                    <span style={{ fontSize: 12, color: "#FFB800", background: "rgba(255,184,0,0.1)", padding: "4px 8px", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 4 }}><X size={12} /> Unmapped</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: 24, padding: 16, background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 4px 0" }}>Auto-mapping complete!</h4>
                    <p style={{ fontSize: 13, color: "#8899AA", margin: 0 }}>We successfully mapped 20 of 22 columns automatically.</p>
                </div>
                <div style={{ fontSize: 13, color: "#8899AA" }}>
                    <span style={{ color: "#FFB800", fontWeight: 600 }}>1</span> unmapped · <span style={{ color: "#445566", fontWeight: 600 }}>1</span> ignored
                </div>
            </div>
        </div>
    );
}
