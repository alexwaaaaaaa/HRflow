"use client";

import Link from "next/link";
import { Settings, Calculator, ShieldCheck, Banknote } from "lucide-react";

export default function PayrollSettingsDashboard() {
    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Payroll Settings</h1>
                <div style={{ fontSize: 14, color: "#8899AA" }}>Configure salary structures, compliance rules, and calculation logic.</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
                {/* Section 1 */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2A3A", background: "#0A1420", display: "flex", alignItems: "center", gap: 12 }}>
                        <Calculator size={18} color="#00E5A0" />
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Earnings & Deductions</h2>
                    </div>
                    <div style={{ padding: "12px 0" }}>
                        <Link href="/payroll-settings/components" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", textDecoration: "none" }} className="hover:bg-[#1A2A3A]/30">
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Salary Components</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Create and manage Basic, HRA, Allowances.</div>
                            </div>
                        </Link>
                        <Link href="/payroll-settings/components/formula" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", textDecoration: "none" }} className="hover:bg-[#1A2A3A]/30">
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Formula Builder</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Define logic for dependent components.</div>
                            </div>
                        </Link>
                        <Link href="/payroll-settings/cycle" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", textDecoration: "none" }} className="hover:bg-[#1A2A3A]/30">
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Payroll Cycle Dates</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Set lock dates and pay frequencies.</div>
                            </div>
                        </Link>
                        <Link href="/payroll-settings/pro-rata" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", textDecoration: "none" }} className="hover:bg-[#1A2A3A]/30">
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Pro-rata & LOP Rules</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Configure partial month and absence logic.</div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Section 2 */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2A3A", background: "#0A1420", display: "flex", alignItems: "center", gap: 12 }}>
                        <ShieldCheck size={18} color="#0066FF" />
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Compliance & Tax</h2>
                    </div>
                    <div style={{ padding: "12px 0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", cursor: "pointer", opacity: 0.6 }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>PF / ESI Configuration</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Manage statutory codes and contribution rates.</div>
                            </div>
                            <span style={{ fontSize: 10, background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4, color: "#8899AA" }}>Coming Soon</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", cursor: "pointer", opacity: 0.6 }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Professional Tax (PT)</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>State-wise PT deduction slabs mapping.</div>
                            </div>
                            <span style={{ fontSize: 10, background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4, color: "#8899AA" }}>Coming Soon</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", cursor: "pointer", opacity: 0.6 }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Income Tax (TDS) Rules</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Define section 89 relief and investment proofs limit.</div>
                            </div>
                            <span style={{ fontSize: 10, background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4, color: "#8899AA" }}>Coming Soon</span>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2A3A", background: "#0A1420", display: "flex", alignItems: "center", gap: 12 }}>
                        <Banknote size={18} color="#FFB800" />
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Disbursement & Adjustments</h2>
                    </div>
                    <div style={{ padding: "12px 0" }}>
                        <Link href="/payroll-settings/bank-verify" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", textDecoration: "none" }} className="hover:bg-[#1A2A3A]/30">
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Bank Verification</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Penny drop and account validation logs.</div>
                            </div>
                        </Link>
                        <Link href="/payroll-settings/arrears-logic" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", textDecoration: "none" }} className="hover:bg-[#1A2A3A]/30">
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Arrears Logic</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Configure historical adjustment calculations.</div>
                            </div>
                        </Link>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", cursor: "pointer", opacity: 0.6 }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>F&F Rules</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Gratuity, notice pay, and leave encashment math.</div>
                            </div>
                            <span style={{ fontSize: 10, background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4, color: "#8899AA" }}>Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
