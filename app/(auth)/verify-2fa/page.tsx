"use client";

import { useState, useRef, useEffect } from "react";
import { Smartphone, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const TOTAL = 6;
const CYCLE = 30;

export default function Verify2FAPage() {
    const [digits, setDigits] = useState<string[]>(Array(TOTAL).fill(""));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const [timeLeft, setTimeLeft] = useState(CYCLE);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const id = setInterval(() => setTimeLeft((t) => (t <= 1 ? CYCLE : t - 1)), 1000);
        return () => clearInterval(id);
    }, []);

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

    // Circular countdown progress (conic gradient)
    const pct = (timeLeft / CYCLE) * 100;
    const circleStyle: React.CSSProperties = {
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: `conic-gradient(#00E5A0 ${pct * 3.6}deg, #1A2A3A ${pct * 3.6}deg)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        fontWeight: 700,
        color: "#FFFFFF",
        flexShrink: 0,
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#060B14" }}>
            <div className="animate-fade-in" style={{ width: 480, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 24, padding: 48 }}>
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#00E5A0" }}>HRFlow</span>
                </div>

                <div className="flex justify-center mb-6">
                    <div style={{ background: "rgba(0,229,160,0.1)", borderRadius: 12, padding: 16 }}>
                        <Smartphone size={32} color="#00E5A0" />
                    </div>
                </div>

                <h1 style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF", textAlign: "center", margin: 0 }}>Two-factor authentication</h1>
                <p style={{ fontSize: 14, color: "#8899AA", textAlign: "center", marginTop: 8, marginBottom: 32 }}>
                    Enter the 6-digit code from your authenticator app
                </p>

                {/* OTP Boxes */}
                <div className={cn("flex justify-center gap-3 mb-4", shake && "animate-shake")} onPaste={handlePaste}>
                    {digits.map((d, i) => (
                        <input key={i} ref={(el) => { inputRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={d}
                            onChange={(e) => handleInput(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)}
                            style={{
                                width: 56, height: 56, textAlign: "center", fontSize: 24, fontWeight: 700, background: "#0D1928", borderRadius: 12, outline: "none",
                                color: error ? "#FF4444" : "#FFFFFF", border: `2px solid ${error ? "#FF4444" : d ? "#00E5A0" : "#1A2A3A"}`,
                                boxShadow: d && !error ? "0 0 0 3px rgba(0,229,160,0.15)" : "none", transition: "all 0.15s"
                            }}
                        />
                    ))}
                </div>

                {error && <p className="text-center text-sm mb-3" style={{ color: "#FF4444" }}>Invalid code. Please check your authenticator app.</p>}

                {/* Timer */}
                <div className="flex items-center justify-center gap-2 mb-6" style={{ color: "#445566", fontSize: 12 }}>
                    <RefreshCw size={12} />
                    <span>Code refreshes every 30 seconds</span>
                    <div style={circleStyle}>{timeLeft}</div>
                </div>

                <Button size="lg" className="w-full mb-4" disabled={!allFilled || loading} isLoading={loading} loadingText="Verifying..." onClick={handleVerify}>
                    Verify
                </Button>

                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: "#1A2A3A" }} />
                    <span style={{ fontSize: 12, color: "#445566" }}>or</span>
                    <div className="flex-1 h-px" style={{ background: "#1A2A3A" }} />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <a href="/security/backup-codes" style={{ fontSize: 14, color: "#0066FF" }}>Use backup code instead</a>
                    <a href="/forgot-password" style={{ fontSize: 14, color: "#0066FF" }}>Lost access to authenticator?</a>
                </div>
            </div>
        </div>
    );
}
