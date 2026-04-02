"use client";

import { use, useState } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, UserCheck } from "lucide-react";

export default function SalaryRevision({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [incrementType, setIncrementType] = useState("Amount");
    const [newCTC, setNewCTC] = useState(1380000);
    const currentCTC = 1200000;
    const diff = newCTC - currentCTC;
    const pct = ((diff / currentCTC) * 100).toFixed(1);

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 0 80px" }}>
            <div style={{ marginBottom: 24 }}>
                <Link href={`/employees/${resolvedParams.id}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12 }}>Salary Revision</h2>
            </div>

            {/* Employee Mini Card */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(0,102,255,0.15)", color: "#0066FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>RS</div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>Rahul Kumar Sharma</div>
                    <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>EMP-0848 • Senior Software Engineer (L3) • Engineering</div>
                </div>
                <div style={{ textAlign: "right", background: "#0A1420", padding: "10px 16px", borderRadius: 12, border: "1px solid #1A2A3A" }}>
                    <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 2, textTransform: "uppercase" }}>Current CTC</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#00E5A0" }}>₹12,00,000</div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 20 }}>Revision Details</h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Revision Type *</label>
                                <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF" }}>
                                    <option>Annual Increment</option>
                                    <option>Promotion</option>
                                    <option>Market Correction</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Effective Date *</label>
                                <input type="date" defaultValue="2024-04-01" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF" }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                                <input type="radio" name="inc" checked={incrementType === "Amount"} onChange={() => setIncrementType("Amount")} style={{ accentColor: "#00E5A0" }} />
                                <span style={{ fontSize: 14, color: "#FFFFFF" }}>Enter New CTC</span>
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                                <input type="radio" name="inc" checked={incrementType === "%"} onChange={() => setIncrementType("%")} style={{ accentColor: "#00E5A0" }} />
                                <span style={{ fontSize: 14, color: "#FFFFFF" }}>Enter % Increment</span>
                            </label>
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>{incrementType === "Amount" ? "New Annual CTC *" : "Increment % *"}</label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="number"
                                    value={incrementType === "Amount" ? newCTC : pct}
                                    onChange={e => {
                                        if (incrementType === "Amount") setNewCTC(Number(e.target.value));
                                        else setNewCTC(currentCTC * (1 + Number(e.target.value) / 100));
                                    }}
                                    style={{ width: "100%", height: 48, background: "#060B14", border: "1px solid #00E5A0", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 18, fontWeight: 600, outline: "none" }}
                                />
                                <div style={{ position: "absolute", right: 14, top: 14, color: "#8899AA", fontSize: 14 }}>
                                    {incrementType === "Amount" ? "INR" : "%"}
                                </div>
                            </div>
                            <div style={{ fontSize: 13, color: "#00E5A0", marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                                <TrendingUp size={14} /> Change: +₹{diff.toLocaleString("en-IN")} ({pct}%)
                            </div>
                        </div>

                        <div style={{ marginTop: 24, padding: "16px 20px", background: "#060B14", borderRadius: 12, border: "1px solid #1A2A3A" }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", marginBottom: 12 }}>Options</div>
                            <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" }}>
                                <input type="checkbox" defaultChecked style={{ accentColor: "#00E5A0" }} />
                                <span style={{ fontSize: 13, color: "#8899AA" }}>Send revision letter to employee on approval</span>
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                                <input type="checkbox" defaultChecked style={{ accentColor: "#00E5A0" }} />
                                <span style={{ fontSize: 13, color: "#8899AA" }}>Include arrears in next payroll (Effective date is in past)</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 20 }}>Approval Chain</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#0A1420", padding: "8px 16px", borderRadius: 20, border: "1px solid #1A2A3A" }}>
                                <UserCheck size={14} color="#00E5A0" /> <span style={{ fontSize: 13, color: "#FFFFFF" }}>Kavya Reddy (Manager)</span>
                            </div>
                            <ArrowRight size={16} color="#445566" />
                            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#0A1420", padding: "8px 16px", borderRadius: 20, border: "1px solid #1A2A3A" }}>
                                <UserCheck size={14} color="#8899AA" /> <span style={{ fontSize: 13, color: "#8899AA" }}>Priya Mehta (HR)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sticky Summary */}
                <div style={{ position: "sticky", top: 24, alignSelf: "start", display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Impact Summary</h3>

                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid #1A2A3A", marginBottom: 12 }}>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>Current CTC</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>₹{currentCTC.toLocaleString("en-IN")}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid #1A2A3A", marginBottom: 12 }}>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>New CTC</span>
                            <span style={{ fontSize: 16, fontWeight: 700, color: "#00E5A0" }}>₹{newCTC.toLocaleString("en-IN")}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid #1A2A3A", marginBottom: 16 }}>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>Monthly Gross</span>
                            <span style={{ fontSize: 14, color: "#FFFFFF" }}>₹{Math.round(currentCTC / 12).toLocaleString("en-IN")} → ₹{Math.round(newCTC / 12).toLocaleString("en-IN")}</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "start", gap: 10, background: "rgba(0,229,160,0.05)", padding: "12px 14px", borderRadius: 8, border: "1px solid rgba(0,229,160,0.2)" }}>
                            <CheckCircle2 color="#00E5A0" size={16} style={{ marginTop: 2, flexShrink: 0 }} />
                            <div style={{ fontSize: 12, color: "#00E5A0", lineHeight: 1.4 }}>
                                L3 Band Range: ₹8L – ₹15L. The new CTC is within the allowed parity range.
                            </div>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <button style={{ width: "100%", height: 48, background: "#00E5A0", color: "#060B14", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 20px rgba(0,229,160,0.2)" }} className="hover:shadow-[0_0_30px_rgba(0,229,160,0.4)] transition-all">
                            Submit for Approval
                        </button>
                        <p style={{ fontSize: 11, color: "#445566", textAlign: "center", marginTop: 12 }}>
                            This will trigger a workflow to the manager.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Dummy checkcircle2 for inline
function CheckCircle2({ size, color, style }: { size: number, color: string, style?: any }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
}
