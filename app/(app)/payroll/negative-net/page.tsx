"use client";

import React, { useState } from "react";
import { ArrowLeft, AlertOctagon, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function NegativeNetPayPage() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px", color: "#FFFFFF" }}>
            <div style={{ marginBottom: 32 }}>
                <Link href="/payroll" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                    <ArrowLeft size={16} /> Back to Exceptions
                </Link>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: "#FF444420", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF4444" }}>
                        <AlertOctagon size={22} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: "#FF4444" }}>Negative Net Pay Resolution</h2>
                        <p style={{ color: "#8899AA", fontSize: 14, marginTop: 4 }}>Deductions exceed gross earnings for this employee in the current cycle.</p>
                    </div>
                </div>
            </div>

            {/* Employee Card */}
            <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32, marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 24, borderBottom: "1px dashed #1A2A3A" }}>
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 600 }}>Suresh Babu</div>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>EMP088 • Associate Consultant</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Net Pay Profile</div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: "#FF4444", marginTop: 4 }}>-₹12,800</div>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 32 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 12 }}>EARNINGS</div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
                            <span style={{ color: "#CCC" }}>Gross Salary</span>
                            <span style={{ fontWeight: 500 }}>₹22,000</span>
                        </div>
                    </div>
                    <div style={{ width: 1, background: "#1A2A3A" }}></div>
                    <div style={{ flex: 1.5 }}>
                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 12 }}>DEDUCTIONS</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                <span style={{ color: "#CCC" }}>Loss of Pay (26 days)</span>
                                <span>₹22,000</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                <span style={{ color: "#CCC" }}>Provident Fund (PF)</span>
                                <span>₹1,800</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                <span style={{ color: "#CCC" }}>Income Tax (TDS)</span>
                                <span>₹3,000</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                <span style={{ color: "#CCC" }}>Company Loan EMI</span>
                                <span>₹8,000</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 600, borderTop: "1px solid #1A2A3A", paddingTop: 12, marginTop: 4 }}>
                                <span>Total Deductions</span>
                                <span>₹34,800</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resolution Options */}
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 20px 0" }}>How would you like to resolve?</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Auto Suggestion */}
                <div style={{ background: "#00E5A010", border: "1px solid #00E5A040", borderRadius: 12, padding: 20, cursor: "pointer", transition: "transform 0.1s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#00E5A0", fontWeight: 600 }}>
                            <CheckCircle2 size={18} /> Auto-resolve: Smart Suggestion
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0" }}>Net: ₹3,200</div>
                    </div>
                    <ul style={{ margin: "0 0 16px 0", paddingLeft: 24, color: "#8899AA", fontSize: 14, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 6 }}>
                        <li>Defer <strong>Company Loan EMI (₹8,000)</strong> to April 2025.</li>
                        <li>Reduce <strong>TDS by ₹3,000</strong> (spread recalculation over remaining FY).</li>
                        <li>Waive loan penalty of ₹3,000 automatically.</li>
                    </ul>
                    <button style={{ width: "100%", height: 40, background: "#00E5A0", color: "#060B14", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Apply Suggestion</button>
                </div>

                {/* Option 1 */}
                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Carry forward deductions to next month</div>
                        <div style={{ fontSize: 13, color: "#8899AA" }}>Defer ₹12,800 shortage. Net pay this month will be ₹0. Next month will deduct extra ₹12,800.</div>
                    </div>
                    <ChevronRight size={20} color="#8899AA" />
                </div>

                {/* Option 2 */}
                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", opacity: 0.6 }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Waive deductions completely</span>
                            <span style={{ background: "#FFB00020", color: "#FFB800", fontSize: 10, padding: "2px 6px", borderRadius: 4 }}>Requires CFO Approval</span>
                        </div>
                        <div style={{ fontSize: 13, color: "#8899AA" }}>Waive loan EMI (-₹8,000). TDS waiver (-₹3,000) not recommended due to compliance.</div>
                    </div>
                    <ChevronRight size={20} color="#8899AA" />
                </div>

                {/* Option 3 */}
                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Record manual payment from employee</div>
                        <div style={{ fontSize: 13, color: "#8899AA" }}>Employee repays ₹12,800 via bank transfer manually. Records as advance recovery.</div>
                    </div>
                    <ChevronRight size={20} color="#8899AA" />
                </div>

            </div>
        </div>
    );
}
