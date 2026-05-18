"use client";

import { useState, useRef, useEffect } from "react";
import { ShieldCheck, ChevronLeft, Lock } from "lucide-react";
import AuthRightPanel from "@/components/auth/AuthRightPanel";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const TOTAL = 6;
const TIMER_START = 30;

type BoxState = "idle" | "loading" | "error" | "success" | "expired";

export default function VerifyOtpPage() {
    const [digits, setDigits] = useState<string[]>(Array(TOTAL).fill(""));
    const [boxState, setBoxState] = useState<BoxState>("idle");
    const [timer, setTimer] = useState(TIMER_START);
    const [resendActive, setResendActive] = useState(false);
    const [shake, setShake] = useState(false);
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

    const handleInput = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const next = [...digits];
        next[index] = value;
        setDigits(next);
        if (value && index < TOTAL - 1) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, TOTAL);
        if (paste.length === TOTAL) {
            setDigits(paste.split(""));
            inputRefs.current[TOTAL - 1]?.focus();
        }
    };

    const allFilled = digits.every(Boolean);

    const handleVerify = async () => {
        setBoxState("loading");
        await new Promise((r) => setTimeout(r, 1200));
        setBoxState("error");
        setShake(true);
        setTimeout(() => { setShake(false); }, 500);
    };

    const handleResend = () => {
        setTimer(TIMER_START);
        setResendActive(false);
        setDigits(Array(TOTAL).fill(""));
        inputRefs.current[0]?.focus();
    };

    const timerLabel = `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`;

    const OTP_BOX_BASE = "w-14 h-14 text-center text-2xl font-bold bg-[#0D1928] rounded-xl outline-none transition-all duration-150";
    const otpBorderClass = boxState === "error"
        ? "border-2 border-[#FF4444] text-[#FF4444]"
        : boxState === "success"
        ? "border-2 border-[#00E5A0] text-[#00E5A0]"
        : "border-2 border-[#1A2A3A] text-white focus:border-[#00E5A0]";

    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            {/* LEFT PANEL */}
            <div className="flex w-full flex-col px-6 py-10 sm:px-12 lg:w-[600px] lg:min-w-[600px] lg:px-20 bg-[#060B14]">
                {/* Back */}
                <a href="/login" className="flex items-center gap-1.5 w-fit text-[#8899AA] text-sm hover:text-white transition-colors">
                    <ChevronLeft size={16} aria-hidden="true" /> Back to login
                </a>

                {/* Centered content */}
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-[rgba(0,229,160,0.1)] flex items-center justify-center">
                        <ShieldCheck size={40} color="#00E5A0" aria-hidden="true" />
                    </div>

                    <h1 className="text-[32px] font-bold text-white mt-4 mb-2">
                        Verify your identity
                    </h1>
                    <p className="text-sm text-[#8899AA]">We sent a 6-digit OTP to</p>
                    <p className="text-sm text-white font-semibold">r***@techcorp.in</p>

                    {/* OTP Boxes */}
                    <div
                        className={cn("flex gap-3 mt-8", shake && "animate-shake")}
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
                                className={cn(OTP_BOX_BASE, otpBorderClass)}
                            />
                        ))}
                    </div>

                    {/* Error message */}
                    {boxState === "error" && (
                        <p className="mt-3 text-sm text-[#FF4444]" role="alert">
                            Invalid OTP. 2 attempts left.
                        </p>
                    )}

                    {/* Timer / Resend */}
                    <div className="mt-4 text-sm text-[#8899AA]">
                        {resendActive ? (
                            <Button variant="ghost" size="sm" onClick={handleResend}>
                                Resend OTP
                            </Button>
                        ) : (
                            <>Resend OTP in <span className="text-[#00E5A0] font-semibold">{timerLabel}</span></>
                        )}
                    </div>

                    <Button
                        className="w-full mt-6"
                        size="lg"
                        disabled={!allFilled || boxState === "loading"}
                        isLoading={boxState === "loading"}
                        loadingText="Verifying..."
                        onClick={handleVerify}
                    >
                        Verify OTP
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4"
                        onClick={() => { }}
                    >
                        Verify via Authenticator App instead
                    </Button>

                    <div className="flex items-center gap-1.5 mt-4 text-[#445566] text-xs">
                        <Lock size={12} aria-hidden="true" /> OTP valid for 10 minutes only
                    </div>
                </div>
            </div>

            <div className="hidden flex-1 lg:flex">
                <AuthRightPanel />
            </div>
        </div>
    );
}
