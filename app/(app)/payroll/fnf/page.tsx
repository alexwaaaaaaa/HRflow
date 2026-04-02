"use client";

import Link from "next/link";
import { UserMinus, Calculator, CheckCircle2, Search, ArrowRight, HandCoins } from "lucide-react";

export default function FnfSettlement() {
    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Full & Final (F&F) Settlement</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Initiate and manage terminal payouts for exited employees.</div>
                </div>
                <Link href="/payroll/fnf/process">
                    <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <UserMinus size={18} /> Initiate New F&F
                    </button>
                </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 24, display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,184,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Calculator size={24} color="#FFB800" />
                    </div>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>4</div>
                        <div style={{ fontSize: 13, color: "#8899AA" }}>Pending F&F Processing</div>
                    </div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 24, display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <CheckCircle2 size={24} color="#00E5A0" />
                    </div>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>12</div>
                        <div style={{ fontSize: 13, color: "#8899AA" }}>F&F Processed This Fiscal Year</div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #1A2A3A" }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>Pending Settlements</h2>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 10 }} />
                        <input type="text" placeholder="Search exited employee..." style={{ width: 260, height: 36, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 13, outline: "none" }} />
                    </div>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Employee</th>
                            <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Exit Date & Type</th>
                            <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Clearance Status</th>
                            <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { emp: "Neha Gupta", id: "EMP-410", exitDate: "30 Oct 2024", exitType: "Resignation", clearance: "100", status: "Ready" },
                            { emp: "Rajeev Singh", id: "EMP-502", exitDate: "15 Oct 2024", exitType: "Termination", clearance: "100", status: "Ready" },
                            { emp: "Anita Desai", id: "EMP-315", exitDate: "10 Nov 2024", exitType: "Resignation", clearance: "75", status: "Pending IT Clearance" },
                            { emp: "Suresh Pillai", id: "EMP-288", exitDate: "05 Nov 2024", exitType: "End of Contract", clearance: "50", status: "Pending Manager Clearance" },
                        ].map((ex, i) => (
                            <tr key={i} style={{ borderBottom: i < 3 ? "1px solid #1A2A3A" : "none" }}>
                                <td style={{ padding: "16px 24px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{ex.emp}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{ex.id}</div>
                                </td>
                                <td style={{ padding: "16px 24px" }}>
                                    <div style={{ fontSize: 14, color: "#FFFFFF", marginBottom: 4 }}>{ex.exitDate}</div>
                                    <div style={{ fontSize: 12, color: ex.exitType === "Termination" ? "#FF4444" : "#8899AA" }}>{ex.exitType}</div>
                                </td>
                                <td style={{ padding: "16px 24px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                        <div style={{ flex: 1, height: 6, background: "#1A2A3A", borderRadius: 3 }}>
                                            <div style={{ width: `${ex.clearance}%`, height: "100%", background: ex.clearance === "100" ? "#00E5A0" : "#FFB800", borderRadius: 3 }} />
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: ex.clearance === "100" ? "#00E5A0" : "#FFB800" }}>{ex.clearance}%</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>{ex.status}</div>
                                </td>
                                <td style={{ padding: "16px 24px" }}>
                                    {ex.clearance === "100" ? (
                                        <Link href="/payroll/fnf/process" style={{ textDecoration: "none" }}>
                                            <button style={{ height: 32, padding: "0 16px", background: "transparent", border: "1px solid #00E5A0", borderRadius: 6, color: "#00E5A0", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                                Process F&F <ArrowRight size={14} />
                                            </button>
                                        </Link>
                                    ) : (
                                        <button disabled style={{ height: 32, padding: "0 16px", background: "#1A2A3A", border: "none", borderRadius: 6, color: "#445566", fontSize: 12, fontWeight: 600, cursor: "not-allowed", display: "flex", alignItems: "center", gap: 6 }}>
                                            Awaiting Clearance
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: 24, padding: "20px 24px", background: "rgba(0,102,255,0.05)", border: "1px dashed rgba(0,102,255,0.3)", borderRadius: 16, display: "flex", gap: 16, alignItems: "center" }}>
                <HandCoins size={24} color="#0066FF" />
                <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Standard F&F Inclusions</div>
                    <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                        The system automatically calculates Gratuity (if tenure &gt; 5 years), Leave Encashment balance, Notice Pay recovery/payout, and pending variables. Make sure Exit Clearances from Admin and IT are completed.
                    </div>
                </div>
            </div>
        </div>
    );
}
