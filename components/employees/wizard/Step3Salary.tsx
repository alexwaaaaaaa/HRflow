"use client";

import { useState } from "react";
import ClientOnly from "@/components/ui/ClientOnly";

const inputStyle = {
    width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A",
    borderRadius: 8, padding: "0 12px", fontSize: 14, color: "#FFFFFF", outline: "none",
    boxSizing: "border-box" as const, transition: "border-color 0.2s"
};

const COMPONENTS = [
    { name: "Basic Salary", monthly: 51000, annual: 612000, pct: 34, type: "Fixed" },
    { name: "HRA", monthly: 25500, annual: 306000, pct: 17, type: "Fixed (Tax-exempt)" },
    { name: "Special Allowance", monthly: 35667, annual: 428004, pct: 24, type: "Fixed" },
    { name: "Conveyance Allowance", monthly: 1600, annual: 19200, pct: 1, type: "Fixed" },
    { name: "Medical Allowance", monthly: 1250, annual: 15000, pct: 1, type: "Fixed" },
    { name: "LTA", monthly: 5000, annual: 60000, pct: 3, type: "Flexible" },
];

const EMPLOYER = [
    { name: "PF (Employer 12%)", monthly: 1800, annual: 21600, pct: 1.2 },
    { name: "Gratuity Provision", monthly: 2452, annual: 29424, pct: 1.6 },
];

function fmt(n: number) {
    return n.toLocaleString("en-IN");
}

export default function Step3Salary({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (d: Record<string, unknown>) => void }) {
    const [ctc, setCtc] = useState(1800000);
    const scale = ctc / 1800000;

    const gross = Math.round(120017 * scale);
    const takehome = Math.round(109717 * scale);
    const employer = Math.round(124269 * scale);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
            {/* LEFT */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 28 }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", margin: "0 0 4px" }}>Salary Structure</h2>
                <p style={{ fontSize: 13, color: "#445566", margin: "0 0 24px" }}>Enter annual CTC — components auto-calculate in real-time</p>

                {/* Structure selector */}
                <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 13, color: "#8899AA", marginBottom: 8, display: "block" }}>Apply Salary Structure</label>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <select style={{ ...inputStyle, flex: 1 }}
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"}>
                            <option>L3 — Standard Structure (IT)</option>
                            <option>L3 — Executive Structure</option>
                            <option>Custom Structure</option>
                        </select>
                        <span style={{ background: "rgba(0,102,255,0.1)", color: "#0066FF", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, flexShrink: 0 }}>L3</span>
                    </div>
                </div>

                {/* CTC input — big */}
                <div style={{ marginBottom: 28, padding: "20px 24px", background: "#0A1420", borderRadius: 12, border: "1px solid #1A2A3A" }}>
                    <label style={{ fontSize: 13, color: "#8899AA", marginBottom: 10, display: "block" }}>Annual CTC (Cost to Company) *</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 28, fontWeight: 700, color: "#00E5A0" }}>₹</span>
                        <input
                            type="number"
                            value={ctc}
                            onChange={e => setCtc(Number(e.target.value))}
                            style={{ background: "transparent", border: "none", fontSize: 28, fontWeight: 700, color: "#FFFFFF", outline: "none", width: 280 }}
                        />
                        <div style={{ fontSize: 12, color: "#445566" }}>/ year</div>
                    </div>
                    <div style={{ fontSize: 14, color: "#00E5A0", marginTop: 8 }}>Monthly gross: ₹{fmt(gross)}</div>
                </div>

                {/* Salary breakup table */}
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", margin: "0 0 12px" }}>Salary Breakup</h3>
                <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #1A2A3A" }}>
                    {/* Header */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 140px 80px 120px", background: "#0A1420", padding: "10px 16px", borderBottom: "1px solid #1A2A3A" }}>
                        {["Component", "Monthly (₹)", "Annual (₹)", "% CTC", "Type"].map(h => (
                            <div key={h} style={{ fontSize: 11, color: "#445566", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
                        ))}
                    </div>

                    <div style={{ padding: "8px 0" }}>
                        <div style={{ padding: "8px 16px", fontSize: 11, color: "#00E5A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>EARNINGS</div>
                        {COMPONENTS.map((c) => (
                            <div key={c.name} style={{ display: "grid", gridTemplateColumns: "1fr 130px 140px 80px 120px", padding: "10px 16px", borderBottom: "1px solid #0A1420", transition: "background 0.15s" }} className="hover:bg-[#0A1420]">
                                <span style={{ fontSize: 14, color: "#FFFFFF" }}>{c.name}</span>
                                <span style={{ fontSize: 14, color: "#FFFFFF" }}>{fmt(Math.round(c.monthly * scale))}</span>
                                <span style={{ fontSize: 14, color: "#FFFFFF" }}>{fmt(Math.round(c.annual * scale))}</span>
                                <span style={{ fontSize: 14, color: "#8899AA" }}>{c.pct}%</span>
                                <span style={{ fontSize: 12, color: "#445566" }}>{c.type}</span>
                            </div>
                        ))}

                        {/* Gross row */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 140px 80px 120px", padding: "12px 16px", background: "rgba(0,229,160,0.05)", borderTop: "1px solid rgba(0,229,160,0.2)", borderBottom: "1px solid #1A2A3A" }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0" }}>Gross Salary</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0" }}>{fmt(gross)}</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0" }}>{fmt(gross * 12)}</span>
                            <span style={{ fontSize: 14, color: "#8899AA" }}>80%</span>
                            <span />
                        </div>

                        <div style={{ padding: "8px 16px", fontSize: 11, color: "#0066FF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>EMPLOYER CONTRIBUTIONS</div>
                        {EMPLOYER.map(c => (
                            <div key={c.name} style={{ display: "grid", gridTemplateColumns: "1fr 130px 140px 80px 120px", padding: "10px 16px", borderBottom: "1px solid #0A1420" }}>
                                <span style={{ fontSize: 14, color: "#8899AA" }}>{c.name}</span>
                                <span style={{ fontSize: 14, color: "#8899AA" }}>{fmt(Math.round(c.monthly * scale))}</span>
                                <span style={{ fontSize: 14, color: "#8899AA" }}>{fmt(Math.round(c.annual * scale))}</span>
                                <span style={{ fontSize: 14, color: "#445566" }}>{c.pct}%</span>
                                <span style={{ fontSize: 12, color: "#445566" }}>Statutory</span>
                            </div>
                        ))}

                        {/* CTC Total */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 140px 80px 120px", padding: "14px 16px", background: "#0A1420", borderTop: "1px solid #1A2A3A" }}>
                            <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>TOTAL CTC</span>
                            <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>{fmt(Math.round(employer * scale / 12))}</span>
                            <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>{fmt(ctc)}</span>
                            <span style={{ fontSize: 14, color: "#FFFFFF" }}>100%</span>
                            <span />
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Compliance check */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 14px" }}>Compliance Check</h3>
                    {[
                        { ok: true, text: "Min wage (Maharashtra): CTC > ₹8,736/month ✓" },
                        { ok: true, text: "PF: Basic ≥ ₹15,000 threshold met" },
                        { ok: true, text: "ESI: Gross > ₹21,000, ESI not applicable" },
                        { ok: "warn", text: "HRA: 40% of Basic (50% recommended for metro)" },
                    ].map(({ ok, text }, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 3 ? "1px solid #0A1420" : "none" }}>
                            <span style={{ fontSize: 14 }}>{ok === true ? "✅" : "⚠️"}</span>
                            <span style={{ fontSize: 12, color: ok === "warn" ? "#FFB800" : "#8899AA" }}>{text}</span>
                        </div>
                    ))}
                </div>

                {/* Market benchmarking */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "#00E5A0" }}>✦</span> AI Market Comparison
                    </h3>
                    <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 12 }}>L3 Software Engineers in Bengaluru</div>
                    <div style={{ padding: "12px 14px", background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 10, marginBottom: 12 }}>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 2 }}>Market Median (P50)</div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>₹16,50,000 CTC</div>
                        <div style={{ fontSize: 12, color: "#00E5A0", marginTop: 4 }}>Your offer: ₹18L — Top 30th percentile 💪</div>
                    </div>
                    {[{ label: "P25", val: "₹13L" }, { label: "P50", val: "₹16.8L" }, { label: "P75", val: "₹21L" }].map(({ label, val }) => (
                        <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #0A1420" }}>
                            <span style={{ fontSize: 12, color: "#445566" }}>{label}</span>
                            <span style={{ fontSize: 12, color: "#8899AA" }}>{val}</span>
                        </div>
                    ))}
                </div>

                {/* Take-home estimate */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 14px" }}>Monthly Take-home Estimate</h3>
                    {[
                        { label: "Gross Salary", val: `₹${fmt(gross)}`, color: "#FFFFFF" },
                        { label: "Employee PF (12%)", val: `-₹1,800`, color: "#FF4444" },
                        { label: "TDS (estimated)", val: `-₹8,500`, color: "#FF4444" },
                        { label: "Employee ESI", val: "₹0 (N/A)", color: "#445566" },
                    ].map(({ label, val, color }) => (
                        <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #0A1420", fontSize: 13 }}>
                            <span style={{ color: "#8899AA" }}>{label}</span>
                            <span style={{ color, fontWeight: 500 }}>{val}</span>
                        </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 4px", fontSize: 15 }}>
                        <span style={{ fontWeight: 600, color: "#FFFFFF" }}>Net Take-home</span>
                        <span style={{ fontWeight: 700, color: "#00E5A0" }}>≈₹{fmt(takehome)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
