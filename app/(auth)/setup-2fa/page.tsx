"use client";

import { useState } from "react";
import { ShieldCheck, Copy, Check } from "lucide-react";
import Button from "@/components/ui/Button";

const MANUAL_KEY = "JBSW Y3DP EHPK 3PXP";

type ProgressStep = { label: string; status: "done" | "active" | "pending" };
const STEPS: ProgressStep[] = [
    { label: "Download App", status: "done" },
    { label: "Scan QR Code", status: "active" },
    { label: "Verify Code", status: "pending" },
];

export default function Setup2FAPage() {
    const [copied, setCopied] = useState(false);
    const [showSkipModal, setShowSkipModal] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(MANUAL_KEY.replace(/\s/g, ""));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#060B14" }}>
            <div className="animate-fade-in" style={{ width: 560, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 24, padding: 48 }}>
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#00E5A0" }}>HRFlow</span>
                </div>

                {/* Progress steps */}
                <div className="flex items-center gap-2 mb-8">
                    {STEPS.map((step, i) => (
                        <div key={i} className="flex items-center gap-2 flex-1">
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 600,
                                    background: step.status === "done" ? "#00E5A0" : step.status === "active" ? "transparent" : "#1A2A3A",
                                    border: `2px solid ${step.status === "done" ? "#00E5A0" : step.status === "active" ? "#00E5A0" : "#1A2A3A"}`,
                                    color: step.status === "done" ? "#060B14" : step.status === "active" ? "#00E5A0" : "#445566",
                                }}>
                                    {step.status === "done" ? <Check size={14} /> : i + 1}
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 500, color: step.status === "done" ? "#FFFFFF" : step.status === "active" ? "#00E5A0" : "#445566", whiteSpace: "nowrap" }}>
                                    {step.label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && <div className="flex-1 h-px mx-2" style={{ background: i === 0 ? "#00E5A0" : "#1A2A3A" }} />}
                        </div>
                    ))}
                </div>

                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Set up Authenticator App</h2>
                <p style={{ fontSize: 14, color: "#8899AA", marginTop: 8, marginBottom: 24 }}>
                    Scan the QR code with Google Authenticator or Authy
                </p>

                {/* Two-column layout */}
                <div className="flex gap-8 mb-8">
                    {/* QR Code box */}
                    <div className="flex flex-col items-center" style={{ minWidth: 200 }}>
                        <div style={{ width: 200, height: 200, background: "#FFFFFF", borderRadius: 12, padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {/* Simple CSS QR pattern */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, width: 168, height: 168 }}>
                                {Array.from({ length: 49 }).map((_, i) => {
                                    const row = Math.floor(i / 7);
                                    const col = i % 7;
                                    const isCorner = (row < 2 && col < 2) || (row < 2 && col >= 5) || (row >= 5 && col < 2);
                                    const filled = isCorner || (Math.random() > 0.5 && !isCorner);
                                    return <div key={i} style={{ background: i % 3 === 0 || isCorner ? "#000000" : "#FFFFFF", borderRadius: 1 }} />;
                                })}
                            </div>
                        </div>
                        <button onClick={() => { }} style={{ fontSize: 12, color: "#0066FF", marginTop: 8, background: "none", border: "none", cursor: "pointer" }}>
                            Or enter code manually
                        </button>
                    </div>

                    {/* Instructions */}
                    <div className="flex-1">
                        <p style={{ fontSize: 12, color: "#00E5A0", fontWeight: 500, marginBottom: 4 }}>Step 1</p>
                        <p style={{ fontSize: 14, color: "#FFFFFF", marginBottom: 12 }}>Download an authenticator app:</p>
                        <div className="flex gap-2 mb-6">
                            {["Google Auth", "Authy"].map((app) => (
                                <div key={app} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#060B14", border: "1px solid #1A2A3A", fontSize: 12, color: "#FFFFFF" }}>
                                    {app}
                                </div>
                            ))}
                        </div>

                        <p style={{ fontSize: 12, color: "#00E5A0", fontWeight: 500, marginBottom: 4 }}>Step 2</p>
                        <p style={{ fontSize: 14, color: "#FFFFFF", marginBottom: 8 }}>Scan QR code or enter:</p>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#060B14", border: "1px solid #1A2A3A" }}>
                            <span style={{ fontFamily: "monospace", fontSize: 14, color: "#FFFFFF", letterSpacing: 2, flex: 1 }}>{MANUAL_KEY}</span>
                            <button onClick={handleCopy} className="flex items-center gap-1 transition-colors" style={{ color: copied ? "#00E5A0" : "#8899AA", background: "none", border: "none", cursor: "pointer" }}>
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                        </div>
                    </div>
                </div>

                <Button size="lg" className="w-full mb-3" onClick={() => { }}>
                    Verify setup →
                </Button>
                <button onClick={() => setShowSkipModal(true)} className="w-full h-10 rounded-lg text-sm font-medium transition-colors" style={{ background: "transparent", border: "none", color: "#8899AA", cursor: "pointer" }}>
                    Skip for now (Not recommended)
                </button>

                <div className="flex justify-center items-center gap-1.5 mt-4" style={{ color: "#00E5A0", fontSize: 12 }}>
                    <ShieldCheck size={12} /> 2FA reduces account breach risk by 99.9%
                </div>

                {/* Skip modal */}
                {showSkipModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(6,11,20,0.8)" }}>
                        <div className="animate-fade-in" style={{ width: 400, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>Are you sure?</h3>
                            <p style={{ fontSize: 14, color: "#8899AA", marginBottom: 24 }}>Your account will be less secure without 2FA.</p>
                            <div className="flex gap-3">
                                <Button variant="ghost" className="flex-1" onClick={() => setShowSkipModal(false)}>Go back</Button>
                                <Button variant="danger" className="flex-1" onClick={() => { }}>Skip anyway</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
