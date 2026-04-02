"use client";

import { use, useState } from "react";
import Link from "next/link";
import { TrendingDown, AlertTriangle, UserCheck, ArrowRight } from "lucide-react";

export default function DemotionScreen({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [newCtc, setNewCtc] = useState(850000);
    const currentCtc = 1200000;
    const diff = newCtc - currentCtc;
    const pct = ((diff / currentCtc) * 100).toFixed(1);

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 32px 80px" }}>
            <Link href={`/employees/${id}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12, marginBottom: 8 }}>Demotion</h2>
            <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 28 }}>Initiate a grade, designation, or compensation demotion for this employee</div>

            <div style={{ background: "rgba(255,68,68,0.05)", border: "1px solid rgba(255,68,68,0.2)", borderRadius: 12, padding: 16, marginBottom: 28, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <AlertTriangle color="#FF4444" size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 13, color: "#FF4444", lineHeight: 1.5 }}>
                    This is a sensitive action requiring <strong>Manager + HR Head + MD approval</strong>. A demotion letter will be generated and sent to the employee upon final approval.
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 28 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 22 }}>New Position & Compensation</h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Demotion Reason *</label>
                                <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 14, outline: "none" }}>
                                    <option>Performance Issues</option>
                                    <option>Disciplinary Action</option>
                                    <option>Restructuring</option>
                                    <option>Voluntary (Employee Request)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Effective Date *</label>
                                <input type="date" defaultValue="2024-12-01" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", outline: "none" }} />
                            </div>
                        </div>

                        {/* Before → After */}
                        <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20, marginBottom: 20 }}>
                            <div style={{ fontSize: 12, color: "#8899AA", fontWeight: 600, textTransform: "uppercase", marginBottom: 14 }}>Position Change</div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center" }}>
                                <div style={{ background: "#0D1928", borderRadius: 10, padding: 14 }}>
                                    <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 4 }}>CURRENT</div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Sr. Software Engineer</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>Grade L3</div>
                                </div>
                                <ArrowRight color="#FF4444" size={20} />
                                <div>
                                    <label style={{ display: "block", fontSize: 11, color: "#FF4444", fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>NEW (Demoted)</label>
                                    <select style={{ width: "100%", height: 38, background: "#0D1928", border: "1px solid #FF4444", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 13, outline: "none", marginBottom: 8 }}>
                                        <option>Software Engineer</option>
                                        <option>Junior Software Engineer</option>
                                    </select>
                                    <select style={{ width: "100%", height: 38, background: "#0D1928", border: "1px solid #FF4444", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 13, outline: "none" }}>
                                        <option>Grade L2</option>
                                        <option>Grade L1</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>New Annual CTC *</label>
                            <input type="number" value={newCtc} onChange={e => setNewCtc(Number(e.target.value))} style={{ width: "100%", height: 48, background: "#060B14", border: "1px solid #FF4444", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 18, fontWeight: 700, outline: "none" }} />
                            <div style={{ fontSize: 13, color: "#FF4444", marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                                <TrendingDown size={14} /> Change: {pct}% (₹{Math.abs(diff).toLocaleString("en-IN")} reduction)
                            </div>
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Supporting Notes / Evidence *</label>
                            <textarea rows={4} placeholder="Provide context, PIP history, documented warnings, or other supporting reasons..." style={{ width: "100%", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "12px 14px", color: "#FFFFFF", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}></textarea>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Approval Chain (3 levels required)</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                            {[["Kavya Reddy", "Manager"], ["Priya Mehta", "HR Head"], ["Rajat Shah", "MD"]].map(([name, role], i) => (
                                <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ background: "#0A1420", padding: "10px 16px", borderRadius: 20, border: "1px solid #1A2A3A", display: "flex", alignItems: "center", gap: 8 }}>
                                        <UserCheck size={14} color="#8899AA" />
                                        <div>
                                            <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>{name}</div>
                                            <div style={{ fontSize: 11, color: "#445566" }}>{role}</div>
                                        </div>
                                    </div>
                                    {i < 2 && <ArrowRight size={14} color="#445566" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button style={{ width: "100%", height: 48, background: "#FF4444", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                        Submit Demotion for Approval
                    </button>
                </div>

                {/* Right Summary */}
                <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Impact Summary</h3>
                        {[
                            { l: "Grade", old: "L3", newV: "L2" },
                            { l: "Designation", old: "Sr. SWE", newV: "Software Engineer" },
                        ].map(r => (
                            <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1A2A3A", fontSize: 13 }}>
                                <span style={{ color: "#8899AA" }}>{r.l}</span>
                                <span style={{ color: "#FFFFFF" }}>{r.old} → <span style={{ color: "#FF4444" }}>{r.newV}</span></span>
                            </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1A2A3A", fontSize: 13 }}>
                            <span style={{ color: "#8899AA" }}>CTC</span>
                            <span>₹{(currentCtc / 100000).toFixed(1)}L → <span style={{ color: "#FF4444", fontWeight: 700 }}>₹{(newCtc / 100000).toFixed(1)}L</span></span>
                        </div>
                        <div style={{ padding: "14px 0", fontSize: 14, color: "#FF4444", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                            <TrendingDown size={16} /> {pct}% reduction (₹{Math.abs(diff).toLocaleString("en-IN")}/yr)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
