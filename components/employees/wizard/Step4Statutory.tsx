"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const inputStyle = {
    width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A",
    borderRadius: 8, padding: "0 12px", fontSize: 14, color: "#FFFFFF", outline: "none",
    boxSizing: "border-box" as const, transition: "border-color 0.2s"
};

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 14, padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: "0 0 20px" }}>{title}</h3>
            {children}
        </div>
    );
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#8899AA", marginBottom: 8 }}>
                {label} {required && <span style={{ color: "#FF4444" }}>*</span>}
            </label>
            {children}
            {hint && <div style={{ fontSize: 11, color: "#445566", marginTop: 6 }}>{hint}</div>}
        </div>
    );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
            <span style={{ fontSize: 14, color: "#FFFFFF" }}>{label}</span>
            <button
                onClick={() => onChange(!checked)}
                style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: checked ? "#00E5A0" : "#1A2A3A",
                    border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s"
                }}
            >
                <span style={{
                    position: "absolute", top: 3, left: checked ? 22 : 3,
                    width: 18, height: 18, borderRadius: "50%", background: "#FFFFFF",
                    transition: "left 0.2s"
                }} />
            </button>
        </div>
    );
}

export default function Step4Statutory({ data: _data, onUpdate: _onUpdate }: { data: Record<string, unknown>; onUpdate: (d: Record<string, unknown>) => void }) {
    const [pfEnabled, setPfEnabled] = useState(true);
    const [uanVerifying, setUanVerifying] = useState(false);
    const [uanVerified, setUanVerified] = useState<null | boolean>(null);
    const [npsEnabled, setNpsEnabled] = useState(false);
    const [regime, setRegime] = useState<"new" | "old">("new");

    const verifyUAN = () => {
        setUanVerifying(true);
        setUanVerified(null);
        setTimeout(() => {
            setUanVerifying(false);
            setUanVerified(true);
        }, 1800);
    };

    return (
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", margin: "0 0 4px" }}>Statutory Details</h2>
            <p style={{ fontSize: 13, color: "#445566", margin: "0 0 24px" }}>Configure India-specific statutory registrations for this employee</p>

            {/* PF Section */}
            <SectionCard title="Provident Fund (PF)">
                <Toggle label="PF Applicable" checked={pfEnabled} onChange={setPfEnabled} />
                {pfEnabled && (
                    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 0 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                            <Field label="UAN Number" hint="12-digit Universal Account Number from EPFO">
                                <div style={{ display: "flex", gap: 8 }}>
                                    <input style={{ ...inputStyle, flex: 1 }} placeholder="100XXXXXXXXX" maxLength={12}
                                        onFocus={e => e.target.style.borderColor = uanVerified ? "#00E5A0" : "#00E5A0"}
                                        onBlur={e => e.target.style.borderColor = uanVerified === true ? "#00E5A0" : "#1A2A3A"} />
                                    <button
                                        onClick={verifyUAN}
                                        style={{
                                            height: 40, padding: "0 14px", background: "#1A2A3A", border: "1px solid #1A2A3A",
                                            borderRadius: 8, fontSize: 13, color: "#FFFFFF", cursor: "pointer", flexShrink: 0,
                                            display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s"
                                        }}
                                        className="hover:border-[#445566]"
                                    >
                                        {uanVerifying ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : "Verify"}
                                    </button>
                                </div>
                                {uanVerified === true && (
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, padding: "8px 12px", background: "rgba(0,229,160,0.08)", borderRadius: 8, border: "1px solid rgba(0,229,160,0.2)" }}>
                                        <CheckCircle2 size={14} color="#00E5A0" />
                                        <span style={{ fontSize: 12, color: "#00E5A0" }}>UAN verified: Rahul Kumar Sharma — DOB matches ✓</span>
                                    </div>
                                )}
                            </Field>
                            <Field label="PF Member ID" hint="Auto-generated from establishment code">
                                <div style={{ height: 40, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 8, display: "flex", alignItems: "center", padding: "0 12px", fontSize: 13, color: "#445566" }}>
                                    MH/BAN/12345/0089/1248
                                </div>
                            </Field>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 4 }}>
                            <Field label="Employer PF Contribution">
                                <input defaultValue="12%" style={inputStyle} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                            </Field>
                            <Field label="Employee PF Contribution">
                                <input defaultValue="12%" style={inputStyle} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                            </Field>
                        </div>
                        <Toggle label="Employee opts for full PF (above ₹15K wage)" checked={true} onChange={() => { }} />
                    </div>
                )}
            </SectionCard>

            {/* ESI Section */}
            <SectionCard title="Employees' State Insurance (ESI)">
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 10 }}>
                    <CheckCircle2 size={18} color="#00E5A0" />
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Not Applicable</div>
                        <div style={{ fontSize: 12, color: "#445566" }}>Employee gross salary &gt; ₹21,000/month — ESI not applicable</div>
                    </div>
                </div>
                <p style={{ fontSize: 12, color: "#445566", marginTop: 12 }}>
                    Auto-calculated from CTC entered in Step 3. ESI will auto-activate if salary is revised below ₹21,000/month.
                </p>
            </SectionCard>

            {/* Professional Tax */}
            <SectionCard title="Professional Tax (PT)">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <Field label="State (from work location)">
                        <div style={{ height: 40, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 8, display: "flex", alignItems: "center", padding: "0 12px", fontSize: 14, color: "#8899AA" }}>
                            Maharashtra (auto-set)
                        </div>
                    </Field>
                    <Field label="Monthly PT Deduction">
                        <div style={{ height: 40, background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 8, display: "flex", alignItems: "center", padding: "0 12px", fontSize: 14, color: "#00E5A0", fontWeight: 600 }}>
                            ₹200/month
                        </div>
                        <div style={{ fontSize: 11, color: "#445566", marginTop: 4 }}>Maharashtra PT slab for salary &gt; ₹10,000/month</div>
                    </Field>
                </div>
            </SectionCard>

            {/* NPS */}
            <SectionCard title="National Pension System (NPS)">
                <Toggle label="Employee opts for NPS" checked={npsEnabled} onChange={setNpsEnabled} />
                {npsEnabled && (
                    <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        <Field label="PRAN Number" hint="Permanent Retirement Account Number">
                            <input style={inputStyle} placeholder="12-digit PRAN" onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                        </Field>
                        <Field label="Employer Contribution">
                            <input defaultValue="10%" style={inputStyle} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                        </Field>
                    </div>
                )}
            </SectionCard>

            {/* Income Tax */}
            <SectionCard title="Income Tax">
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: "#8899AA", marginBottom: 12, display: "block" }}>Tax Regime Preference</label>
                    <div style={{ display: "flex", gap: 12 }}>
                        {(["new", "old"] as const).map(r => (
                            <button
                                key={r}
                                onClick={() => setRegime(r)}
                                style={{
                                    flex: 1, padding: "14px 20px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                                    background: regime === r ? "rgba(0,229,160,0.08)" : "#0A1420",
                                    border: `1.5px solid ${regime === r ? "#00E5A0" : "#1A2A3A"}`,
                                    transition: "all 0.2s"
                                }}
                            >
                                <div style={{ fontSize: 14, fontWeight: 600, color: regime === r ? "#00E5A0" : "#FFFFFF" }}>
                                    {r === "new" ? "New Regime" : "Old Regime"}
                                </div>
                                <div style={{ fontSize: 12, color: "#445566", marginTop: 4 }}>
                                    {r === "new" ? "Default from FY 2024-25 — lower slab rates, no exemptions" : "Higher slab rates with 80C/HRA deductions"}
                                </div>
                            </button>
                        ))}
                    </div>
                    <div style={{ fontSize: 11, color: "#445566", marginTop: 10 }}>Employee can change this via tax declaration portal</div>
                </div>
                <Toggle label="New joiner to submit Form 12B (previous employer TDS)" checked={false} onChange={() => { }} />
            </SectionCard>
        </div>
    );
}
