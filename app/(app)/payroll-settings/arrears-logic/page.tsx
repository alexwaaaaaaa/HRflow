"use client";

import Link from "next/link";
import { Calculator, Save, AlertTriangle, Settings, RefreshCw, HandCoins } from "lucide-react";

export default function ArrearsComputationSettings() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Arrears Computation Settings</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Configure how backdated salary revisions and LOP reversals are calculated.</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Save size={16} /> Save Logic
                </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Backdated CTC Increments */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <HandCoins size={20} color="#00E5A0" />
                        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>Backdated CTC Increments</h2>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 16, background: "rgba(0,229,160,0.05)", border: "1px solid #00E5A0", borderRadius: 12, cursor: "pointer" }}>
                            <input type="radio" name="ctc_arrear" defaultChecked style={{ accentColor: "#00E5A0", marginTop: 4, width: 16, height: 16 }} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Component-wise Difference Projection</div>
                                <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>Calculate the exact difference between Old CTC and New CTC for each individual component (Basic, HRA, etc.) for the elapsed months.</div>
                            </div>
                        </label>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 16, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 12, cursor: "pointer" }}>
                            <input type="radio" name="ctc_arrear" style={{ accentColor: "#00E5A0", marginTop: 4, width: 16, height: 16 }} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Lump Sum Special Arrear Element</div>
                                <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>Post the total difference amount as a single taxable line item called &quot;Income Arrears&quot; without distributing into components.</div>
                            </div>
                        </label>
                    </div>

                    <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #1A2A3A" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                            <input type="checkbox" defaultChecked style={{ accentColor: "#00E5A0", width: 16, height: 16 }} />
                            <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>Recalculate PT & PF on backdated arrears</span>
                        </label>
                    </div>
                </div>

                {/* Tax Treatment */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <Calculator size={20} color="#0066FF" />
                        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>Tax (Section 89) Treatment</h2>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                        <AlertTriangle size={18} color="#FFB800" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                            Arrears spanning across different financial years require Section 89(1) tax relief calculation. How should the system handle cross-financial year arrears?
                        </div>
                    </div>

                    <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 14, cursor: "pointer", outline: "none" }}>
                        <option>Deduct TDS strictly in current year (Let employee claim Sec 89)</option>
                        <option>Auto-compute Sec 89(1) relief and adjust current TDS</option>
                        <option>Require Manual Intervention for cross-FY arrears</option>
                    </select>
                </div>

                {/* Automation Rules */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <RefreshCw size={20} color="#FFB800" />
                        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>System Automation</h2>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                            <input type="checkbox" defaultChecked style={{ accentColor: "#00E5A0", marginTop: 4, width: 16, height: 16 }} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Auto-process pending arrears in standard payroll run</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>If disabled, arrears must be processed in an off-cycle run.</div>
                            </div>
                        </label>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                            <input type="checkbox" defaultChecked style={{ accentColor: "#00E5A0", marginTop: 4, width: 16, height: 16 }} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Auto-generate arrears on retroactive LOP deletion</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Generate standard &quot;LOP Reversal&quot; positive adjustment automatically when admin deletes historical attendance markings.</div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
