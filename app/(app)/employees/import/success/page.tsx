"use client";

import Link from "next/link";
import { CheckCircle2, Download, Users, Briefcase, IndianRupee } from "lucide-react";

export default function ImportSuccessPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 120px)", padding: 24 }} className="animate-fade-in">
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 24, padding: "48px 40px", maxWidth: 640, width: "100%", textAlign: "center", position: "relative", overflow: "hidden" }}>
                {/* Decorative background glow */}
                <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 300, height: 300, background: "radial-gradient(circle, rgba(0,229,160,0.15) 0%, rgba(0,229,160,0) 70%)" }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ width: 80, height: 80, background: "rgba(0,229,160,0.1)", border: "2px solid #00E5A0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <CheckCircle2 size={40} color="#00E5A0" />
                    </div>

                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: "0 0 16px 0" }}>Import Successful!</h1>
                    <p style={{ fontSize: 16, color: "#8899AA", margin: "0 0 32px 0", lineHeight: 1.5 }}>
                        Successfully imported <strong style={{ color: "#FFFFFF" }}>123 employees</strong> into HRFlow.<br />
                        1 row was skipped due to validation errors.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
                        <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 12, padding: 16 }}>
                            <Users size={20} color="#0066FF" style={{ margin: "0 auto 12px" }} />
                            <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>123</div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Profiles Created</div>
                        </div>
                        <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 12, padding: 16 }}>
                            <Briefcase size={20} color="#0066FF" style={{ margin: "0 auto 12px" }} />
                            <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>123</div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Jobs Assigned</div>
                        </div>
                        <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 12, padding: 16 }}>
                            <IndianRupee size={20} color="#00E5A0" style={{ margin: "0 auto 12px" }} />
                            <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>123</div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Salaries Setup</div>
                        </div>
                    </div>

                    <div style={{ padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid #1A2A3A", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, textAlign: "left" }}>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Download Error Report</div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Contains the 1 skipped row with error details.</div>
                        </div>
                        <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} className="hover:bg-[#1A2A3A]">
                            <Download size={14} /> error_report.csv
                        </button>
                    </div>

                    <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                        <Link href="/employees">
                            <button style={{ height: 48, padding: "0 32px", background: "#00E5A0", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "#060B14", cursor: "pointer", boxShadow: "0 4px 14px rgba(0, 229, 160, 0.3)" }}>
                                Go to Employee Directory
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
