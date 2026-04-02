"use client";

import { use } from "react";
import Link from "next/link";
import { Printer, Download, Share2 } from "lucide-react";

export default function EmployeeIDCard({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const empId = resolvedParams.id;

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 0 80px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <Link href={`/employees/${empId}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12 }}>Digital ID Card</h2>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:border-[#445566]">
                        <Share2 size={14} /> Share via WhatsApp
                    </button>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:border-[#445566]">
                        <Printer size={14} /> Print
                    </button>
                    <button style={{ height: 40, padding: "0 16px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <Download size={14} /> Download PDF
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
                {/* FRONT */}
                <div className="group" style={{ perspective: "1000px" }}>
                    <div style={{ paddingBottom: 12, textAlign: "center", color: "#8899AA", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Front Side</div>
                    <div style={{ width: 340, height: 500, margin: "0 auto", borderRadius: 20, background: "linear-gradient(145deg, #0A1420 0%, #060B14 100%)", border: "1px solid #1A2A3A", position: "relative", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                        {/* Top banner */}
                        <div style={{ height: 100, background: "#0066FF", borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%", transform: "scaleX(1.3)", position: "absolute", top: 0, left: 0, right: 0, zIndex: 0 }} />

                        <div style={{ position: "relative", zIndex: 1, padding: "24px", textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                            <div style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.02em", marginBottom: 32 }}>TechCorp</div>

                            <div style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto 24px", background: "#0D1928", border: "4px solid #060B14", overflow: "hidden" }}>
                                <img src="https://i.pravatar.cc/300?img=11" alt="Employee" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>

                            <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>Rahul Sharma</div>
                            <div style={{ fontSize: 14, color: "#00E5A0", fontWeight: 600, marginBottom: 2 }}>Senior Software Engineer</div>
                            <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 24 }}>Engineering</div>

                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: "auto" }}>
                                <div style={{ textAlign: "right", borderRight: "1px solid #1A2A3A", paddingRight: 16 }}>
                                    <div style={{ fontSize: 10, color: "#8899AA", textTransform: "uppercase" }}>Employee ID</div>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", fontFamily: "monospace" }}>{empId}</div>
                                </div>
                                <div style={{ textAlign: "left" }}>
                                    <div style={{ fontSize: 10, color: "#8899AA", textTransform: "uppercase" }}>Blood Group</div>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: "#FF4444" }}>O+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACK */}
                <div>
                    <div style={{ paddingBottom: 12, textAlign: "center", color: "#8899AA", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Reverse Side</div>
                    <div style={{ width: 340, height: 500, margin: "0 auto", borderRadius: 20, background: "#0D1928", border: "1px solid #1A2A3A", padding: "32px 24px", position: "relative", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column" }}>
                        <div style={{ fontSize: 11, color: "#FFFFFF", lineHeight: 1.5, textAlign: "center", marginBottom: 32 }}>
                            This card is the property of TechCorp Solutions Pvt Ltd. <br />
                            If found, please return to: <br />
                            <span style={{ color: "#8899AA" }}>123 Tech Park, Tower A, Bengaluru, 560100</span>
                        </div>

                        <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #1A2A3A" }}>
                            <div style={{ fontSize: 10, color: "#8899AA", textTransform: "uppercase", marginBottom: 4 }}>Emergency Contact</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Sunita Sharma (Mother)</div>
                            <div style={{ fontSize: 14, color: "#FFFFFF" }}>+91 98765 43210</div>
                        </div>

                        <div style={{ marginBottom: "auto" }}>
                            <div style={{ fontSize: 10, color: "#8899AA", textTransform: "uppercase", marginBottom: 4 }}>Date of Issue</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 12 }}>15 Nov 2024</div>
                            <div style={{ fontSize: 10, color: "#8899AA", textTransform: "uppercase", marginBottom: 4 }}>Valid Until</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>31 Dec 2028</div>
                        </div>

                        {/* Dummy Barcode Area */}
                        <div style={{ height: 60, background: "#FFFFFF", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 0" }}>
                            <div style={{ flex: 1, width: "90%", background: "repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 5px, #000 5px, #000 9px, transparent 9px, transparent 11px)" }} />
                            <div style={{ fontSize: 10, fontFamily: "monospace", color: "#000", marginTop: 2 }}>{empId}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 60, textAlign: "center" }}>
                <Link href="/employees/directory" style={{ color: "#0066FF", fontSize: 14, textDecoration: "none" }}>Generate IDs for entire department →</Link>
            </div>
        </div>
    );
}
