"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Download, CheckCircle2, ShieldCheck, Mail, RefreshCw } from "lucide-react";

export default function Form16Generator() {
    const [status, setStatus] = useState<"idle" | "generating" | "signing" | "done">("idle");

    const handleGenerate = () => {
        setStatus("generating");
        setTimeout(() => setStatus("signing"), 2000);
        setTimeout(() => setStatus("done"), 4000);
    };

    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>Form 16 Generator</h1>
                    <div style={{ fontSize: 13, color: "#8899AA" }}>Generate and digitally sign Form 16 (Part A & Part B) for all employees</div>
                </div>
            </div>

            {/* Stepper Wizard */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32, marginBottom: 24 }}>

                <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#00E5A0", color: "#060B14", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, zIndex: 2 }}>1</div>
                        <div style={{ position: "absolute", top: 20, left: "50%", right: "-50%", height: 2, background: "#00E5A0" }} />
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", marginTop: 12 }}>Data Verification</div>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: status === "idle" ? "#1A2A3A" : "#00E5A0", color: status === "idle" ? "#8899AA" : "#060B14", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, zIndex: 2 }}>
                            {status === "done" ? <CheckCircle2 size={24} /> : "2"}
                        </div>
                        <div style={{ position: "absolute", top: 20, left: "-50%", right: "50%", height: 2, background: "#00E5A0" }} />
                        <div style={{ position: "absolute", top: 20, left: "50%", right: "-50%", height: 2, background: status === "idle" ? "#1A2A3A" : "#00E5A0" }} />
                        <div style={{ fontSize: 13, fontWeight: 600, color: status === "idle" ? "#8899AA" : "#FFFFFF", marginTop: 12 }}>Generation & Traces</div>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: status === "done" ? "#00E5A0" : "#1A2A3A", color: status === "done" ? "#060B14" : "#8899AA", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, zIndex: 2 }}>3</div>
                        <div style={{ position: "absolute", top: 20, left: "-50%", right: "50%", height: 2, background: status === "idle" ? "#1A2A3A" : "#00E5A0" }} />
                        <div style={{ fontSize: 13, fontWeight: 600, color: status === "done" ? "#FFFFFF" : "#8899AA", marginTop: 12 }}>Digital Sign & Distribute</div>
                    </div>
                </div>

                {status === "idle" && (
                    <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
                        <div style={{ width: 64, height: 64, background: "rgba(0,102,255,0.1)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", marginBottom: 24 }}>
                            <FileText size={32} color="#0066FF" />
                        </div>
                        <h3 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", marginBottom: 12 }}>Ready to generate Form 16</h3>
                        <div style={{ fontSize: 14, color: "#8899AA", lineHeight: 1.6, marginBottom: 32 }}>
                            Payroll is finalized for FY 2024-25. 345 employees are eligible for Form 16. The generated PDFs will automatically include Part A (Traces) and Part B (Annexure) digitally signed.
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32, textAlign: "left" }}>
                            <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: 16 }}>
                                <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 4 }}>Company TAN</div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>MUMK12345E</div>
                            </div>
                            <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: 16 }}>
                                <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 4 }}>Signatory Persona</div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Ananya Singh (Director)</div>
                            </div>
                        </div>

                        <button onClick={handleGenerate} style={{ width: 250, height: 48, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }} className="hover:opacity-90">
                            Start Generation Process
                        </button>
                    </div>
                )}

                {status === "generating" && (
                    <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto", padding: "40px 0" }}>
                        <RefreshCw size={48} color="#0066FF" className="animate-spin" style={{ margin: "0 auto", marginBottom: 24 }} />
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Merging Part A from TRACES & Generating Part B</h3>
                        <div style={{ fontSize: 14, color: "#8899AA" }}>Processed 145 / 345 employees... Please wait.</div>
                    </div>
                )}

                {status === "signing" && (
                    <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto", padding: "40px 0" }}>
                        <ShieldCheck size={48} color="#00E5A0" className="animate-pulse" style={{ margin: "0 auto", marginBottom: 24 }} />
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Applying Digital Signatures</h3>
                        <div style={{ fontSize: 14, color: "#8899AA" }}>Signing PDFs using DSC Token (Ananya Singh)...</div>
                    </div>
                )}

                {status === "done" && (
                    <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
                        <div style={{ width: 64, height: 64, background: "rgba(0,229,160,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", marginBottom: 24 }}>
                            <CheckCircle2 size={32} color="#00E5A0" />
                        </div>
                        <h3 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 12 }}>Form 16 Generation Successful!</h3>
                        <div style={{ fontSize: 14, color: "#8899AA", lineHeight: 1.6, marginBottom: 32 }}>
                            345 digitally signed Form 16 documents have been generated and are ready to be dispatched explicitly to employees.
                        </div>

                        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                            <button style={{ height: 44, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:bg-[#1A2A3A]">
                                <Download size={16} /> Download ZIP Archive
                            </button>
                            <button style={{ height: 44, padding: "0 24px", background: "#0066FF", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:opacity-90">
                                <Mail size={16} /> Email to all 345 Employees
                            </button>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}
