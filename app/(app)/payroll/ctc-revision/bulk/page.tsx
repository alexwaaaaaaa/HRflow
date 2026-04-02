"use client";

import Link from "next/link";
import { UploadCloud, FileText, CheckCircle2, Download, ArrowLeft } from "lucide-react";

export default function BulkSalaryRevision() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <Link href="/payroll/ctc-revision" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", marginBottom: 24 }} className="hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to Pipeline
            </Link>

            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Bulk CTC Revision Import</h1>
                <div style={{ fontSize: 14, color: "#8899AA" }}>Upload a CSV/Excel file to schedule mass salary increments.</div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <div style={{ border: "2px dashed #1A2A3A", borderRadius: 12, padding: "48px 24px", textAlign: "center", marginBottom: 24, cursor: "pointer" }} className="hover:border-[#00E5A0] hover:bg-[#00E5A0]/5 transition-all">
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1A2A3A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", marginBottom: 16 }}>
                        <UploadCloud size={24} color="#8899AA" />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Click to upload file</div>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Supports .xlsx and .csv files up to 10MB. Download the template below if needed.</div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <FileText size={20} color="#0066FF" />
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 2 }}>hrflow_bulk_revision_template.xlsx</div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Headers: Emp_ID, New_CTC, Effective_Date, Reason</div>
                        </div>
                    </div>
                    <button style={{ height: 32, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                        <Download size={14} /> Download Template
                    </button>
                </div>
            </div>

            <div style={{ background: "rgba(255,184,0,0.05)", border: "1px dashed rgba(255,184,0,0.3)", borderRadius: 16, padding: 24 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,184,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <CheckCircle2 size={16} color="#FFB800" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Validation Rules</h3>
                        <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                            The system will automatically validate the uploaded data against the following rules:
                        </div>
                    </div>
                </div>

                <div style={{ paddingLeft: 44, display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#445566" }} />
                        <div style={{ fontSize: 13, color: "#E5E7EB" }}>New CTC must be greater than current CTC (unless Reason = &quot;Correction&quot;).</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#445566" }} />
                        <div style={{ fontSize: 13, color: "#E5E7EB" }}>Effective Date must follow `DD-MM-YYYY` format.</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#445566" }} />
                        <div style={{ fontSize: 13, color: "#E5E7EB" }}>Rows with invalid Emp_IDs will be flagged.</div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "not-allowed", opacity: 0.5, display: "flex", alignItems: "center", gap: 8 }}>
                    Validate Data
                </button>
            </div>
        </div>
    );
}
