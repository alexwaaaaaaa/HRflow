"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, ChevronLeft, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const TOTAL = 6;

export default function ForgotPasswordOtpPage() {
    const [digits, setDigits] = useState<string[]>(Array(TOTAL).fill(""));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const [timer, setTimer] = useState(30);
    const [resendActive, setResendActive] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timer <= 0) { setResendActive(true); return; }
        const id = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(id);
    }, [timer]);

    const handleInput = (i: number, v: string) => {
        if (!/^\d?$/.test(v)) return;
        const next = [...digits];
        next[i] = v;
        setDigits(next);
        if (v && i < TOTAL - 1) inputRefs.current[i + 1]?.focus();
    };

    const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !digits[i] && i > 0) inputRefs.current[i - 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, TOTAL);
        if (paste.length === TOTAL) { setDigits(paste.split("")); inputRefs.current[TOTAL - 1]?.focus(); }
    };

    const allFilled = digits.every(Boolean);

    const handleVerify = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        setError(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const handleResend = () => { setTimer(30); setResendActive(false); setDigits(Array(TOTAL).fill("")); };
    const timerLabel = `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-grid" style={{ background: "#060B14" }}>
            <div className="animate-fade-in" style={{ width: 480, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 24, padding: 48 }}>
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#00E5A0" }}>HRFlow</span>
                </div>

                <div className="flex justify-center mb-6">
                    <div style={{ background: "rgba(255,184,0,0.1)", borderRadius: 12, padding: 16 }}>
                        <Phone size={32} color="#FFB800" />
                    </div>
                </div>

                <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", textAlign: "center", margin: 0 }}>Enter verification code</h1>
                <p style={{ fontSize: 14, color: "#8899AA", textAlign: "center", marginTop: 8, marginBottom: 32 }}>
                    6-digit OTP sent to <strong style={{ color: "#FFFFFF" }}>+91 9876X-XXXXX</strong>
                </p>

                <div className={cn("flex justify-center gap-3 mb-4", shake && "animate-shake")} onPaste={handlePaste}>
                    {digits.map((d, i) => (
                        <input key={i} ref={(el) => { inputRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={d}
                            onChange={(e) => handleInput(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)}
                            style={{
                                width: 56, height: 56, textAlign: "center", fontSize: 24, fontWeight: 700, background: "#0D1928", borderRadius: 12, outline: "none",
                                color: error ? "#FF4444" : "#FFFFFF",
                                border: `2px solid ${error ? "#FF4444" : d ? "#00E5A0" : "#1A2A3A"}`,
                                boxShadow: d && !error ? "0 0 0 3px rgba(0,229,160,0.15)" : "none", transition: "all 0.15s"
                            }}
                        />
                    ))}
                </div>

                {error && <p className="text-center text-sm mb-3" style={{ color: "#FF4444" }}>Invalid OTP. 2 attempts left.</p>}

                <div className="text-center mb-4" style={{ fontSize: 14, color: "#8899AA" }}>
                    {resendActive
                        ? <button onClick={handleResend} style={{ color: "#0066FF", cursor: "pointer", background: "none", border: "none" }}>Resend OTP</button>
                        : <>Resend OTP in <span style={{ color: "#00E5A0", fontWeight: 600 }}>{timerLabel}</span></>}
                </div>

                <Button size="lg" className="w-full mb-4" disabled={!allFilled || loading} isLoading={loading} loadingText="Verifying..." onClick={handleVerify}>
                    Verify &amp; Continue
                </Button>

                <div className="text-center mb-3">
                    <a href="/forgot-password" style={{ fontSize: 14, color: "#0066FF" }}>Try email link instead</a>
                </div>
                <div className="flex justify-center">
                    <a href="/forgot-password" className="flex items-center gap-1" style={{ fontSize: 14, color: "#8899AA" }}>
                        <ChevronLeft size={14} /> Back to forgot password
                    </a>
                </div>
                <div className="flex justify-center items-center gap-1.5 mt-4" style={{ color: "#445566", fontSize: 12 }}>
                    <Lock size={12} /> OTP valid for 10 minutes only
                </div>
            </div>
        </div>
    );
}
