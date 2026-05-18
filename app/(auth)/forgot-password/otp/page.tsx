"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, ChevronLeft, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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
        if (timer <= 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot transition when countdown hits zero
            setResendActive(true);
            return;
        }
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

    const OTP_BOX_BASE = "w-14 h-14 text-center text-2xl font-bold bg-[#0D1928] rounded-xl outline-none transition-all duration-150";

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
                        <div className="bg-[rgba(255,184,0,0.1)] rounded-xl p-4">
                            <Phone size={32} color="#FFB800" aria-hidden="true" />
                        </div>
                    </div>

                    <h1 className="text-[28px] font-bold text-white text-center m-0">Enter verification code</h1>
                    <p className="text-sm text-[#8899AA] text-center mt-2 mb-8">
                        6-digit OTP sent to <strong className="text-white">+91 9876X-XXXXX</strong>
                    </p>

                    <div
                        className={cn("flex justify-center gap-3 mb-4", shake && "animate-shake")}
                        onPaste={handlePaste}
                        role="group"
                        aria-label="Enter 6-digit OTP"
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
                                aria-label={`OTP digit ${i + 1}`}
                                className={cn(
                                    OTP_BOX_BASE,
                                    error
                                        ? "border-2 border-[#FF4444] text-[#FF4444]"
                                        : d
                                        ? "border-2 border-[#00E5A0] text-white"
                                        : "border-2 border-[#1A2A3A] text-white focus:border-[#00E5A0]"
                                )}
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-center text-sm mb-3 text-[#FF4444]" role="alert">
                            Invalid OTP. 2 attempts left.
                        </p>
                    )}

                    <div className="text-center mb-4 text-sm text-[#8899AA]">
                        {resendActive ? (
                            <Button variant="ghost" size="sm" onClick={handleResend}>
                                Resend OTP
                            </Button>
                        ) : (
                            <>Resend OTP in <span className="text-[#00E5A0] font-semibold">{timerLabel}</span></>
                        )}
                    </div>

                    <Button size="lg" className="w-full mb-4" disabled={!allFilled || loading} isLoading={loading} loadingText="Verifying..." onClick={handleVerify}>
                        Verify &amp; Continue
                    </Button>

                    <div className="text-center mb-3">
                        <a href="/forgot-password" className="text-sm text-[#0066FF] hover:underline">Try email link instead</a>
                    </div>
                    <div className="flex justify-center">
                        <a href="/forgot-password" className="flex items-center gap-1 text-sm text-[#8899AA] hover:text-white transition-colors">
                            <ChevronLeft size={14} aria-hidden="true" /> Back to forgot password
                        </a>
                    </div>
                    <div className="flex justify-center items-center gap-1.5 mt-4 text-[#445566] text-xs">
                        <Lock size={12} aria-hidden="true" /> OTP valid for 10 minutes only
                    </div>
                </Card>
            </div>
        </div>
    );
}
