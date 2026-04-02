"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Download, Send } from "lucide-react";

export default function EmploymentVerification({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [type, setType] = useState("current");
    const [showSalary, setShowSalary] = useState(false);

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 32px 80px" }}>
            <Link href={`/employees/${id}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12, marginBottom: 24 }}>Employment Verification Letter</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 500px", gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 20 }}>Letter Configuration</h3>

                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 10 }}>Letter Type</label>
                            <div style={{ display: "flex", gap: 12 }}>
                                {[["current", "Current Employment Verification"], ["experience", "Experience Certificate (Ex-Employee)"]].map(([v, l]) => (
                                    <label key={v} style={{ flex: 1, display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", background: type === v ? "rgba(0,229,160,0.05)" : "#060B14", border: `1px solid ${type === v ? "#00E5A0" : "#1A2A3A"}`, borderRadius: 10, cursor: "pointer" }}>
                                        <input type="radio" name="type" value={v} checked={type === v} onChange={() => setType(v)} style={{ accentColor: "#00E5A0", marginTop: 2, flexShrink: 0 }} />
                                        <span style={{ fontSize: 13, color: "#FFFFFF", lineHeight: 1.4 }}>{l}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Addressed To (optional)</label>
                                <input placeholder="e.g. The Visa Officer, US Embassy" style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>As On Date</label>
                                <input type="date" defaultValue={new Date().toISOString().split("T")[0]} style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px", color: "#FFFFFF", outline: "none" }} />
                            </div>

                            <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 10, padding: "14px 16px" }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", marginBottom: 12 }}>Include in Letter</div>
                                {[
                                    { k: "showSalary", l: "Current CTC (₹12,00,000)", state: showSalary, set: setShowSalary },
                                ].map(f => (
                                    <label key={f.k} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                                        <input type="checkbox" checked={f.state} onChange={e => f.set(e.target.checked)} style={{ accentColor: "#00E5A0" }} />
                                        <span style={{ fontSize: 13, color: "#8899AA" }}>{f.l}</span>
                                    </label>
                                ))}
                                {["Designation & Department", "Date of Joining", "Employment Status"].map(l => (
                                    <label key={l} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, cursor: "pointer" }}>
                                        <input type="checkbox" defaultChecked style={{ accentColor: "#00E5A0" }} />
                                        <span style={{ fontSize: 13, color: "#8899AA" }}>{l}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                            <button style={{ flex: 1, height: 44, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                <Download size={16} /> Download PDF
                            </button>
                            <button style={{ height: 44, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                                <Send size={14} /> Email Employee
                            </button>
                        </div>
                    </div>
                </div>

                {/* Letter Preview */}
                <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "44px 36px", color: "#111", fontFamily: "serif", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", fontSize: 13.5, lineHeight: 1.9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #000", paddingBottom: 20, marginBottom: 32 }}>
                        <div>
                            <div style={{ fontSize: 24, fontWeight: 900 }}>TechCorp</div>
                            <div style={{ fontSize: 12, color: "#555" }}>Solutions Pvt. Ltd.</div>
                        </div>
                        <div style={{ textAlign: "right", fontSize: 11, color: "#555", lineHeight: 1.5 }}>
                            123 Tech Park, Bengaluru 560100<br />
                            TAN: AAACT1234C | PAN: AAACT1234C
                        </div>
                    </div>

                    <div style={{ textAlign: "center", fontWeight: 700, textDecoration: "underline", marginBottom: 28, fontSize: 15 }}>
                        {type === "current" ? "TO WHOMSOEVER IT MAY CONCERN" : "EXPERIENCE CERTIFICATE"}
                    </div>

                    <div>
                        Date: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}<br /><br />
                        This is to certify that <strong>Mr. Rahul Kumar Sharma</strong> {type === "current" ? "is employed" : "was employed"} with TechCorp Solutions Pvt. Ltd. as a <strong>Senior Software Engineer</strong> in the Engineering department since <strong>15th March 2022</strong>.
                        {type === "current" && " He is currently a full-time employee in good standing."}
                        {showSalary && <><br /><br />His current annual Cost to Company (CTC) is <strong>₹12,00,000/- (Rupees Twelve Lakhs Only)</strong>.</>}
                        <br /><br />
                        This certificate is issued at the request of the employee and is valid for the purpose stated above.
                    </div>

                    <div style={{ marginTop: 60 }}>
                        <div style={{ height: 36, borderBottom: "1px dashed #CCC", width: 200, marginBottom: 6 }} />
                        <div style={{ fontWeight: 700 }}>Priya Mehta</div>
                        <div style={{ fontSize: 12, color: "#555" }}>Authorized Signatory — HR</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
