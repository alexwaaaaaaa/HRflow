"use client";

import { Lock, Unlock, ShieldAlert, Save } from "lucide-react";
import { useState } from "react";

export default function PayrollLockSettings() {
    const [isLocked, setIsLocked] = useState(true);

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Payroll Lock Settings</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Control access to salary edits and attendance markings to prevent mismatch during processing.</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Save size={16} /> Save State
                </button>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: isLocked ? "rgba(255,184,0,0.1)" : "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {isLocked ? <Lock size={24} color="#FFB800" /> : <Unlock size={24} color="#00E5A0" />}
                        </div>
                        <div>
                            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Current Cycle: Nov 2024</h2>
                            <div style={{ fontSize: 14, color: isLocked ? "#FFB800" : "#00E5A0", fontWeight: 500 }}>
                                {isLocked ? "System is Locked for Processing" : "System is Open for Edits"}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsLocked(!isLocked)}
                        style={{ height: 36, padding: "0 16px", background: "transparent", border: `1px solid ${isLocked ? "#FFB800" : "#00E5A0"}`, borderRadius: 8, color: isLocked ? "#FFB800" : "#00E5A0", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                    >
                        {isLocked ? <Unlock size={14} /> : <Lock size={14} />}
                        {isLocked ? "Unlock System" : "Lock Now"}
                    </button>
                </div>

                <div style={{ borderTop: "1px solid #1A2A3A", paddingTop: 24 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>When Payroll is Locked:</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                            <ShieldAlert size={16} color="#FF4444" style={{ marginTop: 2, flexShrink: 0 }} />
                            <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>HR cannot edit CTC, Bank Details, or Statutory info for employees.</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                            <ShieldAlert size={16} color="#FF4444" style={{ marginTop: 2, flexShrink: 0 }} />
                            <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>Managers cannot approve past leaves that affect the current month&apos;s LOP.</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                            <ShieldAlert size={16} color="#FF4444" style={{ marginTop: 2, flexShrink: 0 }} />
                            <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>Employees cannot change tax declaration investments.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Auto-Lock Schedule</h2>

                <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: "#00E5A0", width: 16, height: 16 }} />
                    <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>Automatically lock system every month</span>
                </label>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingLeft: 28 }}>
                    <div>
                        <label style={{ fontSize: 13, color: "#8899AA", display: "block", marginBottom: 8 }}>Lock Trigger Date</label>
                        <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                            <option>25th of Current Month</option>
                            <option>28th of Current Month</option>
                            <option>Last Working Day</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ fontSize: 13, color: "#8899AA", display: "block", marginBottom: 8 }}>Unlock Trigger Date</label>
                        <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                            <option>1st of Next Month</option>
                            <option>2nd of Next Month</option>
                            <option>Manual Unlock Only</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
