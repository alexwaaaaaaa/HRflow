"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const inputStyle = {
    width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A",
    borderRadius: 8, padding: "0 12px", fontSize: 14, color: "#FFFFFF", outline: "none",
    boxSizing: "border-box" as const, transition: "border-color 0.2s"
};

export default function Step5Bank({ data: _data, onUpdate: _onUpdate }: { data: Record<string, unknown>; onUpdate: (d: Record<string, unknown>) => void }) {
    const [ifsc, setIfsc] = useState("");
    const [ifscVerified, setIfscVerified] = useState(false);
    const [pennyState, setPennyState] = useState<"idle" | "verifying" | "success" | "failed">("idle");
    const [accountNumber, setAccountNumber] = useState("");
    const [confirmAccount, setConfirmAccount] = useState("");
    const [requestSent, setRequestSent] = useState(false);

    const handleIfscChange = (val: string) => {
        const v = val.toUpperCase().slice(0, 11);
        setIfsc(v);
        setIfscVerified(v.length === 11);
    };

    const verifyPenny = () => {
        setPennyState("verifying");
        setTimeout(() => setPennyState("success"), 2200);
    };

    const accountMismatch = confirmAccount.length > 0 && accountNumber !== confirmAccount;

    return (
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", margin: "0 0 4px" }}>Bank Details</h2>
            <p style={{ fontSize: 13, color: "#445566", margin: "0 0 24px" }}>Salary disbursement account — IFSC auto-fills branch details, penny drop verifies account</p>

            {/* Primary account card */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 28, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,102,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        🏦
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>Primary Salary Account</div>
                        <div style={{ fontSize: 12, color: "#445566" }}>Salary will be credited to this account every month</div>
                    </div>
                    <span style={{ marginLeft: "auto", background: "rgba(0,229,160,0.1)", color: "#00E5A0", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>PRIMARY</span>
                </div>

                {/* Account holder name */}
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: "#8899AA", marginBottom: 8, display: "block" }}>Account Holder Name *</label>
                    <input defaultValue="Rahul Kumar Sharma" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#00E5A0"}
                        onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    <div style={{ fontSize: 11, color: "#445566", marginTop: 4 }}>Pre-filled from Step 1. Edit for joint accounts.</div>
                </div>

                {/* Account number */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 16 }}>
                    <div>
                        <label style={{ fontSize: 13, color: "#8899AA", marginBottom: 8, display: "block" }}>Account Number *</label>
                        <input
                            value={accountNumber}
                            onChange={e => setAccountNumber(e.target.value)}
                            type="password"
                            placeholder="Enter account number"
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: 13, color: "#8899AA", marginBottom: 8, display: "block" }}>Confirm Account Number *</label>
                        <input
                            value={confirmAccount}
                            onChange={e => setConfirmAccount(e.target.value)}
                            placeholder="Re-enter to confirm"
                            style={{ ...inputStyle, borderColor: accountMismatch ? "#FF4444" : "#1A2A3A" }}
                            onFocus={e => e.target.style.borderColor = accountMismatch ? "#FF4444" : "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = accountMismatch ? "#FF4444" : "#1A2A3A"}
                        />
                        {accountMismatch && <div style={{ fontSize: 11, color: "#FF4444", marginTop: 4 }}>Account numbers don&apos;t match</div>}
                    </div>
                </div>

                {/* Account type */}
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: "#8899AA", marginBottom: 8, display: "block" }}>Account Type</label>
                    <div style={{ display: "flex", gap: 10 }}>
                        {["Savings", "Current"].map(t => (
                            <label key={t} style={{ cursor: "pointer" }}>
                                <input type="radio" name="accType" defaultChecked={t === "Savings"} style={{ display: "none" }} />
                                <span style={{ display: "block", padding: "8px 20px", borderRadius: 8, fontSize: 13, background: t === "Savings" ? "rgba(0,229,160,0.1)" : "#1A2A3A", border: `1px solid ${t === "Savings" ? "#00E5A0" : "#1A2A3A"}`, color: t === "Savings" ? "#00E5A0" : "#8899AA", cursor: "pointer", transition: "all 0.15s" }}>
                                    {t}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* IFSC */}
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: "#8899AA", marginBottom: 8, display: "block" }}>IFSC Code *</label>
                    <input
                        value={ifsc}
                        onChange={e => handleIfscChange(e.target.value)}
                        placeholder="HDFC0001234"
                        style={{ ...inputStyle, fontFamily: "monospace", letterSpacing: "0.1em", borderColor: ifscVerified ? "#00E5A0" : "#1A2A3A" }}
                        onFocus={e => e.target.style.borderColor = "#00E5A0"}
                        onBlur={e => e.target.style.borderColor = ifscVerified ? "#00E5A0" : "#1A2A3A"}
                    />

                    {/* Bank info after IFSC */}
                    {ifscVerified && (
                        <div style={{ marginTop: 10, padding: "12px 16px", background: "#0A1420", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 10, display: "flex", alignItems: "center", gap: 14, animation: "fadeIn 0.3s ease" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,102,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏦</div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0" }}>HDFC Bank — Andheri West</div>
                                <div style={{ fontSize: 12, color: "#445566" }}>Andheri West Branch, Mumbai 400058 • MICR: 400240009</div>
                            </div>
                            <CheckCircle2 size={18} color="#00E5A0" style={{ marginLeft: "auto" }} />
                        </div>
                    )}
                </div>

                {/* Penny drop */}
                <div style={{ padding: "16px 20px", background: "#0A1420", borderRadius: 12, border: "1px solid #1A2A3A" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Verify Account (Penny Drop)</div>
                            <div style={{ fontSize: 12, color: "#445566" }}>We&apos;ll transfer ₹1 to verify this account is active</div>
                        </div>
                        <button
                            onClick={verifyPenny}
                            disabled={pennyState === "verifying" || pennyState === "success"}
                            style={{
                                height: 38, padding: "0 20px", borderRadius: 8, border: "1px solid #1A2A3A",
                                background: pennyState === "success" ? "rgba(0,229,160,0.1)" : "#1A2A3A",
                                fontSize: 13, color: pennyState === "success" ? "#00E5A0" : "#FFFFFF",
                                cursor: pennyState === "verifying" ? "wait" : "pointer",
                                display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s"
                            }}
                        >
                            {pennyState === "verifying" && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />}
                            {pennyState === "success" && <CheckCircle2 size={14} />}
                            {pennyState === "idle" ? "Verify Account" : pennyState === "verifying" ? "Transferring ₹1..." : "Verified ✓"}
                        </button>
                    </div>
                    {pennyState === "success" && (
                        <div style={{ padding: "10px 14px", background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.3)", borderRadius: 8, fontSize: 13, color: "#00E5A0" }}>
                            ✅ Account verified: RAHUL KUMAR SHARMA — Name matches employee record
                        </div>
                    )}
                </div>

                {/* Divider — request from employee option */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                    <div style={{ flex: 1, height: 1, background: "#1A2A3A" }} />
                    <span style={{ fontSize: 12, color: "#445566" }}>Or</span>
                    <div style={{ flex: 1, height: 1, background: "#1A2A3A" }} />
                </div>

                <div>
                    <div style={{ fontSize: 14, color: "#8899AA", marginBottom: 10 }}>Request bank details from employee directly</div>
                    <button
                        onClick={() => setRequestSent(true)}
                        style={{
                            height: 38, padding: "0 20px", background: requestSent ? "rgba(0,229,160,0.08)" : "transparent",
                            border: `1px solid ${requestSent ? "rgba(0,229,160,0.3)" : "#1A2A3A"}`,
                            borderRadius: 8, fontSize: 13, color: requestSent ? "#00E5A0" : "#8899AA",
                            cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s"
                        }}
                    >
                        <Send size={14} />
                        {requestSent ? "Request sent • Waiting for employee..." : "Send bank details request via WhatsApp/Email"}
                    </button>
                </div>
            </div>

            {/* Add another account */}
            <button style={{ width: "100%", padding: "16px", background: "transparent", border: "2px dashed #1A2A3A", borderRadius: 14, fontSize: 14, color: "#445566", cursor: "pointer", transition: "all 0.2s" }}
                className="hover:border-[#445566] hover:text-[#8899AA]">
                + Add Another Account (EWA / Loan disbursement)
            </button>
        </div>
    );
}
