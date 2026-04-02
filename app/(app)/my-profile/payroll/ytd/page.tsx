"use client";

import { Download, Eye, FileText, Filter, Receipt, TrendingUp } from "lucide-react";

export default function EmployeeYTD() {
    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>My Payroll & YTD Summary</h1>
            <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 32 }}>Fiscal Year: Apr 2024 - Mar 2025</div>

            {/* YTD Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>YTD Gross Earnings</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>₹7,68,800</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>YTD Taxes (TDS)</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444" }}>₹68,800</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>YTD Net Payout</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>₹6,83,600</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Form 16 Status</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#FFB800", marginTop: 6 }}>Available May &apos;25</div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
                {/* Payslip History */}
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF" }}>Payslip History</h2>
                        <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                            <Filter size={14} /> Filter Year
                        </button>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                        {[
                            { month: "November 2024", gross: 96100, deduction: 10600, net: 85500, paidOn: "28 Nov 2024" },
                            { month: "October 2024", gross: 96100, deduction: 11200, net: 84900, paidOn: "28 Oct 2024" },
                            { month: "September 2024", gross: 96100, deduction: 10600, net: 85500, paidOn: "28 Sep 2024" },
                            { month: "August 2024", gross: 96100, deduction: 10600, net: 85500, paidOn: "28 Aug 2024" },
                            { month: "July 2024", gross: 96100, deduction: 10600, net: 85500, paidOn: "28 Jul 2024" },
                            { month: "June 2024", gross: 96100, deduction: 10600, net: 85500, paidOn: "28 Jun 2024" },
                        ].map((slip, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: i < 5 ? "1px solid #1A2A3A" : "none" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <FileText size={20} color="#00E5A0" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>{slip.month}</div>
                                        <div style={{ fontSize: 12, color: "#8899AA" }}>Net: ₹{slip.net.toLocaleString()} • Paid on {slip.paidOn}</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                        <Eye size={14} /> View
                                    </button>
                                    <button style={{ height: 32, padding: "0 12px", background: "#1A2A3A", border: "none", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                        <Download size={14} /> PDF
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions & Tax Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Tax & Investments</h3>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,102,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Receipt size={18} color="#0066FF" />
                            </div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>IT Declaration</div>
                                <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Submit proof for Sec 80C, HRA to reduce TDS.</div>
                                <button style={{ height: 28, padding: "0 12px", background: "transparent", border: "1px solid #0066FF", borderRadius: 6, color: "#0066FF", fontSize: 12, cursor: "pointer" }}>Submit Proofs</button>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,184,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <TrendingUp size={18} color="#FFB800" />
                            </div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Tax Regime</div>
                                <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 8 }}>You are opted into the <b>New Tax Regime</b>.</div>
                                <button style={{ height: 28, padding: "0 12px", background: "transparent", border: "1px solid #FFB800", borderRadius: 6, color: "#FFB800", fontSize: 12, cursor: "pointer" }}>Change Regime</button>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: "rgba(0,229,160,0.05)", border: "1px dashed rgba(0,229,160,0.3)", borderRadius: 12, padding: 20, textAlign: "center" }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Need Help?</h3>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 12 }}>Have an issue with your payslip or TDS? Raise a ticket with the payroll team.</div>
                        <button style={{ height: 36, padding: "0 16px", background: "#1A2A3A", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 500, cursor: "pointer", width: "100%" }}>Contact Payroll Helpdesk</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
