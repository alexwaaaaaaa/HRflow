"use client";

import Link from "next/link";
import { Download, Layers, ShieldCheck, Calculator, Info } from "lucide-react";

export default function ComponentMasterMap() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Component Master Map</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Visualization of all active earnings, deductions, and statutory mappings.</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 20px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Download size={16} /> Export Map
                    </button>
                    <Link href="/payroll-settings/components">
                        <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                            Manage Components
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 32 }}>
                {/* Fixed Components */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(0,102,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Layers size={16} color="#0066FF" />
                        </div>
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Fixed Earnings (Core)</h2>
                    </div>
                    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ paddingBottom: 16, borderBottom: "1px dashed #1A2A3A" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Basic Salary</div>
                                <span style={{ fontSize: 11, background: "#1A2A3A", color: "#8899AA", padding: "2px 6px", borderRadius: 4 }}>Formula</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>50% of annual CTC</div>
                        </div>
                        <div style={{ paddingBottom: 16, borderBottom: "1px dashed #1A2A3A" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>House Rent Allowance</div>
                                <span style={{ fontSize: 11, background: "#1A2A3A", color: "#8899AA", padding: "2px 6px", borderRadius: 4 }}>Formula</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>50% of Basic Salary</div>
                        </div>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Special Allowance</div>
                                <span style={{ fontSize: 11, background: "rgba(255,184,0,0.1)", color: "#FFB800", padding: "2px 6px", borderRadius: 4 }}>Balancing</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Absorbs remainder of Gross</div>
                        </div>
                    </div>
                </div>

                {/* Variable & Flex */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Calculator size={16} color="#00E5A0" />
                        </div>
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Variable & FBP</h2>
                    </div>
                    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ paddingBottom: 16, borderBottom: "1px dashed #1A2A3A" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>LTA (Leave Travel)</div>
                                <span style={{ fontSize: 11, background: "#1A2A3A", color: "#8899AA", padding: "2px 6px", borderRadius: 4 }}>FBP</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Max ₹40,000 /yr (Tax Ex)</div >
                        </div>
                        <div style={{ paddingBottom: 16, borderBottom: "1px dashed #1A2A3A" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Internet Allowance</div>
                                <span style={{ fontSize: 11, background: "#1A2A3A", color: "#8899AA", padding: "2px 6px", borderRadius: 4 }}>Fixed Claim</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>₹1,500 /mo fixed</div>
                        </div>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Variable Pay (Bonus)</div>
                                <span style={{ fontSize: 11, background: "rgba(255,255,255,0.1)", color: "#FFFFFF", padding: "2px 6px", borderRadius: 4 }}>Performance</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Target % input by Manager</div>
                        </div>
                    </div>
                </div>

                {/* Deductions & Statutory */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ShieldCheck size={16} color="#FF4444" />
                        </div>
                        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Deductions & Stat.</h2>
                    </div>
                    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ paddingBottom: 16, borderBottom: "1px dashed #1A2A3A" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Provident Fund (PF)</div>
                                <span style={{ fontSize: 11, background: "rgba(255,68,68,0.1)", color: "#FF4444", padding: "2px 6px", borderRadius: 4 }}>Statutory</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>12% of Basic (Restricted 1.5L)</div>
                        </div>
                        <div style={{ paddingBottom: 16, borderBottom: "1px dashed #1A2A3A" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Professional Tax (PT)</div>
                                <span style={{ fontSize: 11, background: "rgba(255,68,68,0.1)", color: "#FF4444", padding: "2px 6px", borderRadius: 4 }}>Statutory</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>State Slab Mapping</div>
                        </div>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Income Tax (TDS)</div>
                                <span style={{ fontSize: 11, background: "rgba(255,68,68,0.1)", color: "#FF4444", padding: "2px 6px", borderRadius: 4 }}>Statutory</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Projected from Annual CTC</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #1A2A3A", borderRadius: 12, padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
                <Info size={18} color="#8899AA" />
                <div style={{ fontSize: 13, color: "#E5E7EB", lineHeight: 1.5 }}>
                    Modifying "Balancing" components automatically adjusts other variables to preserve the Gross CTC amount.
                </div>
            </div>
        </div>
    );
}
