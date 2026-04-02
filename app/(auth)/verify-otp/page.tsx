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
        if (timer <= 0) { setResendActive(true); return; }
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

    return (
        <div className="flex min-h-screen" style={{ minWidth: 1440 }}>
            {/* LEFT PANEL */}
            <div
                className="flex flex-col"
                style={{ width: 600, minWidth: 600, background: "#060B14", padding: "40px 80px", position: "relative" }}
            >
                {/* Back */}
                <a href="/login" className="flex items-center gap-1.5 w-fit" style={{ color: "#8899AA", fontSize: 14 }}>
                    <ChevronLeft size={16} /> Back to login
                </a>

                {/* Centered content */}
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <div
                        style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <ShieldCheck size={40} color="#00E5A0" />
                    </div>

                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", marginTop: 16, marginBottom: 8 }}>
                        Verify your identity
                    </h1>
                    <p style={{ fontSize: 14, color: "#8899AA" }}>We sent a 6-digit OTP to</p>
                    <p style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 600 }}>r***@techcorp.in</p>

                    {/* OTP Boxes */}
                    <div className={cn("flex gap-3 mt-8", shake && "animate-shake")} onPaste={handlePaste}>
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
                                style={{
                                    width: 56,
                                    height: 56,
                                    textAlign: "center",
                                    fontSize: 24,
                                    fontWeight: 700,
                                    background: "#0D1928",
                                    borderRadius: 12,
                                    outline: "none",
                                    color: boxState === "error" ? "#FF4444" : boxState === "success" ? "#00E5A0" : "#FFFFFF",
                                    border: `2px solid ${boxState === "error"
                                        ? "#FF4444"
                                        : boxState === "success"
                                            ? "#00E5A0"
                                            : d
                                                ? "#00E5A0"
                                                : "#1A2A3A"
                                        }`,
                                    boxShadow: d ? "0 0 0 3px rgba(0,229,160,0.15)" : "none",
                                    transition: "all 0.15s",
                                }}
                            />
                        ))}
                    </div>

                    {/* Error message */}
                    {boxState === "error" && (
                        <p className="mt-3 text-sm" style={{ color: "#FF4444" }}>
                            Invalid OTP. 2 attempts left.
                        </p>
                    )}

                    {/* Timer / Resend */}
                    <div className="mt-4" style={{ fontSize: 14, color: "#8899AA" }}>
                        {resendActive ? (
                            <button onClick={handleResend} style={{ color: "#0066FF", cursor: "pointer", background: "none", border: "none" }}>
                                Resend OTP
                            </button>
                        ) : (
                            <>Resend OTP in <span style={{ color: "#00E5A0", fontWeight: 600 }}>{timerLabel}</span></>
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

                    <button onClick={() => { }} style={{ fontSize: 14, color: "#0066FF", marginTop: 16, background: "none", border: "none", cursor: "pointer" }}>
                        Verify via Authenticator App instead
                    </button>

                    <div className="flex items-center gap-1.5 mt-4" style={{ color: "#445566", fontSize: 12 }}>
                        <Lock size={12} /> OTP valid for 10 minutes only
                    </div>
                </div>
            </div>

            <AuthRightPanel />
        </div>
    );
}
