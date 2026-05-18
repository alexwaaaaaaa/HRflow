"use client";

import { useState, useRef, useEffect } from "react";
import { Smartphone, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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

    const pct = (timeLeft / CYCLE) * 100;

    const OTP_BOX_BASE = "w-14 h-14 text-center text-2xl font-bold bg-[#0D1928] rounded-xl outline-none transition-all duration-150";
    const otpBorderClass = error
        ? "border-2 border-[#FF4444] text-[#FF4444]"
        : "border-2 border-[#1A2A3A] text-white focus:border-[#00E5A0]";

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060B14] px-4">
            <div className="w-full max-w-[480px] animate-fade-in">
                <Card variant="elevated" padding="lg">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-7 h-7 rounded-full bg-[#00E5A0] flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-[#00E5A0]">HRFlow</span>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="bg-[rgba(0,229,160,0.1)] rounded-xl p-4">
                            <Smartphone size={32} color="#00E5A0" aria-hidden="true" />
                        </div>
                    </div>

                    <h1 className="text-[26px] font-bold text-white text-center m-0">Two-factor authentication</h1>
                    <p className="text-sm text-[#8899AA] text-center mt-2 mb-8">
                        Enter the 6-digit code from your authenticator app
                    </p>

                    {/* OTP Boxes */}
                    <div
                        className={cn("flex justify-center gap-3 mb-4", shake && "animate-shake")}
                        onPaste={handlePaste}
                        role="group"
                        aria-label="Enter 6-digit authenticator code"
                    >
                        {digits.map((d, i) => (
                            <input
                                key={i}
                                ref={(el) => { inputRefs.current[i] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={d}
                                onChange={(e) => handleInput(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                aria-label={`Code digit ${i + 1}`}
                                className={cn(OTP_BOX_BASE, otpBorderClass)}
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-center text-sm mb-3 text-[#FF4444]" role="alert">
                            Invalid code. Please check your authenticator app.
                        </p>
                    )}

                    {/* Timer */}
                    <div className="flex items-center justify-center gap-2 mb-6 text-[#445566] text-xs">
                        <RefreshCw size={12} aria-hidden="true" />
                        <span>Code refreshes every 30 seconds</span>
                        {/* inline-style: conic-gradient for countdown ring — cannot be expressed as static Tailwind */}
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                            style={{ background: `conic-gradient(#00E5A0 ${pct * 3.6}deg, #1A2A3A ${pct * 3.6}deg)` }}
                            role="timer"
                            aria-label={`${timeLeft} seconds until code refresh`}
                        >
                            {timeLeft}
                        </div>
                    </div>

                    <Button size="lg" className="w-full mb-4" disabled={!allFilled || loading} isLoading={loading} loadingText="Verifying..." onClick={handleVerify}>
                        Verify
                    </Button>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 h-px bg-[#1A2A3A]" />
                        <span className="text-xs text-[#445566]">or</span>
                        <div className="flex-1 h-px bg-[#1A2A3A]" />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <a href="/security/backup-codes" className="text-sm text-[#0066FF] hover:underline">Use backup code instead</a>
                        <a href="/forgot-password" className="text-sm text-[#0066FF] hover:underline">Lost access to authenticator?</a>
                    </div>
                </Card>
            </div>
        </div>
    );
}
