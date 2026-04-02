"use client";

import { useState, useEffect } from "react";
import { Lock, AlertTriangle, Clock, MapPin, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

const UNLOCK_MINUTES = 23;
const UNLOCK_SECONDS = 14;

export default function AccountLockedPage() {
    const [totalSec, setTotalSec] = useState(UNLOCK_MINUTES * 60 + UNLOCK_SECONDS);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        if (totalSec <= 0) return;
        const id = setInterval(() => setTotalSec((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [totalSec]);

    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    const label = `${minutes} minutes ${String(seconds).padStart(2, "0")} seconds`;

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#060B14" }}>
            <div className="animate-fade-in" style={{ width: 480, background: "#0D1928", border: "1px solid rgba(255,68,68,0.3)", borderRadius: 24, padding: 48 }}>
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#00E5A0" }}>HRFlow</span>
                </div>

                <div className="flex justify-center mb-6">
                    <div style={{ background: "rgba(255,68,68,0.1)", borderRadius: 16, padding: 20 }}>
                        <Lock size={48} color="#FF4444" />
                    </div>
                </div>

                <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", textAlign: "center", margin: 0 }}>Account Locked</h1>
                <p style={{ fontSize: 14, color: "#8899AA", textAlign: "center", marginTop: 8, marginBottom: 24 }}>
                    Your account has been temporarily locked due to multiple failed login attempts.
                </p>

                {/* Info card */}
                <div className="rounded-xl p-4 mb-6 flex flex-col gap-3" style={{ background: "#060B14", border: "1px solid #1A2A3A" }}>
                    <div className="flex items-center gap-3">
                        <AlertTriangle size={16} color="#FFB800" />
                        <span style={{ fontSize: 14, color: "#FFFFFF" }}>5 failed attempts detected</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock size={14} color="#8899AA" />
                        <span style={{ fontSize: 12, color: "#8899AA" }}>Last attempt: 12/11/2024 at 09:45 AM</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin size={14} color="#8899AA" />
                        <span style={{ fontSize: 12, color: "#8899AA" }}>IP: 103.21.xx.xx (Mumbai, Maharashtra)</span>
                    </div>
                </div>

                {/* Unlock options */}
                {!emailSent ? (
                    <div className="flex flex-col gap-2 mb-6">
                        <Button size="lg" className="w-full" onClick={() => setEmailSent(true)}>Unlock via Email</Button>
                        <Button variant="secondary" size="lg" className="w-full">Unlock via Mobile OTP</Button>
                    </div>
                ) : (
                    <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(0,229,160,0.08)", border: "1px solid #00E5A0" }}>
                        <p style={{ fontSize: 14, color: "#00E5A0", textAlign: "center" }}>✅ Check your inbox for the unlock link</p>
                    </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: "#1A2A3A" }} />
                    <span style={{ fontSize: 12, color: "#445566" }}>or</span>
                    <div className="flex-1 h-px" style={{ background: "#1A2A3A" }} />
                </div>

                <div className="flex items-center justify-center gap-2 mb-6" style={{ fontSize: 14, color: "#8899AA" }}>
                    <Mail size={14} />
                    Contact HR Admin: Priya Mehta (priya@techcorp.in)
                </div>

                {/* Auto-unlock countdown */}
                {totalSec > 0 && (
                    <div className="text-center mb-4 rounded-lg p-3" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)" }}>
                        <p style={{ fontSize: 13, color: "#FFB800" }}>Account auto-unlocks in {label}</p>
                    </div>
                )}

                <div className="text-center">
                    <a href="/security" style={{ fontSize: 14, color: "#FF4444" }}>Report unauthorized access →</a>
                </div>
            </div>
        </div>
    );
}
