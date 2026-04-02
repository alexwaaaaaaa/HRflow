"use client";

import Link from "next/link";
import { Plus, Search, Filter, ShieldAlert, AlertTriangle } from "lucide-react";

const BANDS = [
    { id: "BND-L1", name: "Entry Level (L1)", roles: "Associate, Junior Engineer", min: 300000, max: 600000, mid: 450000, count: 245, alert: 12 },
    { id: "BND-L2", name: "Mid Level (L2)", roles: "Engineer, Specialist", min: 600000, max: 1200000, mid: 900000, count: 320, alert: 5 },
    { id: "BND-L3", name: "Senior Level (L3)", roles: "Senior Engineer, Manager", min: 1200000, max: 2400000, mid: 1800000, count: 180, alert: 0 },
    { id: "BND-L4", name: "Leadership (L4)", roles: "Director, VP", min: 2400000, max: 5000000, mid: 3700000, count: 42, alert: 2 },
];

export default function SalaryBandSetup() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Salary Bands & Pay Ranges</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Define CTC guardrails by grade or designation to maintain internal parity.</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Plus size={18} /> Create New Band
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Active Bands</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>6</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Employees Mapped to Bands</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>100%</div>
                </div>
                <div style={{ background: "rgba(255,68,68,0.05)", border: "1px dashed rgba(255,68,68,0.3)", borderRadius: 12, padding: 20 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        <ShieldAlert size={16} color="#FF4444" />
                        <div style={{ fontSize: 13, color: "#8899AA" }}>Out of Band Anomalies</div>
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444", display: "flex", alignItems: "center", gap: 12 }}>
                        19
                        <span style={{ fontSize: 12, fontWeight: 500, padding: "4px 8px", background: "rgba(255,68,68,0.1)", borderRadius: 6 }}>View Details</span>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search bands or roles..." style={{ width: 280, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                </div>
                <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Filter size={16} /> Filter
                </button>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Band Details</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Pay Range (Min - Max)</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center" }}>Mid-Point</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center" }}>Headcount</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5, textAlign: "right" }}>Anomalies</th>
                            <th style={{ padding: "16px 20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {BANDS.map((band) => (
                            <tr key={band.id} style={{ borderBottom: "1px solid #1A2A3A", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{band.name}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>Mapped Roles: {band.roles}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{ fontSize: 13, color: "#E5E7EB", width: 60 }}>{(band.min / 100000).toFixed(1)}L</div>
                                        <div style={{ height: 6, width: 100, background: "#1A2A3A", borderRadius: 3, position: "relative" }}>
                                            <div style={{ position: "absolute", left: "0%", right: "0%", top: 0, bottom: 0, background: "#00E5A0", borderRadius: 3 }} />
                                        </div>
                                        <div style={{ fontSize: 13, color: "#E5E7EB", width: 60, textAlign: "right" }}>{(band.max / 100000).toFixed(1)}L</div>
                                    </div>
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "center", fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>
                                    ₹{(band.mid / 100000).toFixed(2)}L
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "center", fontSize: 14, color: "#E5E7EB" }}>
                                    {band.count}
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                    {band.alert > 0 ? (
                                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#FF4444", background: "rgba(255,68,68,0.1)", padding: "4px 8px", borderRadius: 6 }}>
                                            <AlertTriangle size={14} /> {band.alert} Outside
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: 13, color: "#8899AA" }}>None</div>
                                    )}
                                </td>
                                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                    <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer" }}>Edit Band</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
