"use client";

import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import AuthRightPanel from "@/components/auth/AuthRightPanel";
import Button from "@/components/ui/Button";
import { seededFloats } from "@/lib/random";

type Criterion = { label: string; test: (p: string) => boolean };
const CRITERIA: Criterion[] = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "One number", test: (p) => /[0-9]/.test(p) },
    { label: "One special character (@#$%)", test: (p) => /[@#$%!^&*]/.test(p) },
];
const STRENGTH_COLORS = ["#1A2A3A", "#FF4444", "#FFB800", "#0066FF", "#00E5A0"] as const;
function getStrength(p: string) { return CRITERIA.filter((c) => c.test(p)).length; }

// Confetti component — defined at module scope (not inside render)
const CONFETTI_COLORS = ["#00E5A0", "#0066FF", "#FFB800", "#FF4444", "#FFFFFF"];
// Deterministic positions / shapes / durations so React 19 strict purity is preserved.
const CONFETTI_PIECES = (() => {
    const left = seededFloats(601, 20);
    const dur = seededFloats(602, 20);
    const delay = seededFloats(603, 20);
    const shape = seededFloats(604, 20);
    return left.map((l, i) => ({
        left: `${l * 100}%`,
        duration: `${1.5 + dur[i]!}s`,
        delay: `${delay[i]! * 0.5}s`,
        rounded: shape[i]! > 0.5 ? "50%" : 2,
    }));
})();

function Confetti() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
            {CONFETTI_PIECES.map((p, i) => (
                <div key={i} style={{
                    position: "absolute",
                    left: p.left,
                    top: 0,
                    width: 8,
                    height: 8,
                    borderRadius: p.rounded,
                    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                    animation: `confetti-fall ${p.duration} ease-in ${p.delay} forwards`,
                }} />
            ))}
        </div>
    );
}

export default function FirstLoginPage() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [twoFa, setTwoFa] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const strength = getStrength(password);
    const passwordsMatch = password && confirm && password === confirm;

    const handleActivate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordsMatch) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
        setSuccess(true);
    };

    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            {success && <Confetti />}

            {/* LEFT PANEL */}
            <div className="flex w-full flex-col px-6 py-10 sm:px-12 lg:w-[560px] lg:min-w-[560px] lg:px-16 bg-[#060B14]">
                {success ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="w-20 h-20 rounded-full bg-[rgba(0,229,160,0.15)] flex items-center justify-center mb-6">
                            <Check size={40} color="#00E5A0" aria-hidden="true" />
                        </div>
                        <h2 className="text-[28px] font-bold text-white m-0">Account Activated!</h2>
                        <p className="text-sm text-[#8899AA] mt-2">Redirecting to your dashboard...</p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col justify-center">
                        {/* Welcome badge */}
                        <div className="mb-6">
                            <span className="inline-block bg-[rgba(0,229,160,0.1)] text-[#00E5A0] rounded-full px-3 py-1 text-xs font-medium">
                                Welcome to HRFlow!
                            </span>
                        </div>

                        <h1 className="text-[32px] font-bold text-white m-0">Let&apos;s set up your account</h1>
                        <p className="text-sm text-[#8899AA] mt-2 mb-6">
                            You&apos;ve been invited by <strong className="text-white">Priya Mehta (HR Admin)</strong> at TechCorp Solutions Pvt. Ltd.
                        </p>

                        {/* Employee info card */}
                        <div className="flex items-center gap-4 rounded-xl p-4 mb-6 bg-[#060B14] border border-[#1A2A3A]">
                            <div className="w-12 h-12 rounded-full bg-[rgba(0,229,160,0.2)] flex items-center justify-center flex-shrink-0 text-base font-bold text-[#00E5A0]" aria-hidden="true">
                                RS
                            </div>
                            <div>
                                <div className="text-base font-semibold text-white">Rahul Sharma</div>
                                <div className="text-sm text-[#8899AA]">Software Engineer — Backend</div>
                                <div className="text-xs text-[#445566]">Engineering • Pune Office</div>
                            </div>
                        </div>

                        <form onSubmit={handleActivate} className="flex flex-col gap-4" aria-label="Activate account">
                            {/* New Password */}
                            <div>
                                <label htmlFor="create-password" className="block text-xs font-medium text-[#8899AA] mb-1.5">Create your password</label>
                                <div className="relative">
                                    <input
                                        id="create-password"
                                        type={showPw ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none bg-[#0D1928] border border-[#1A2A3A] text-white focus:border-[#00E5A0] transition-colors"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowPw(!showPw)}
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 border-0 bg-transparent text-[#445566]"
                                        aria-label={showPw ? "Hide password" : "Show password"}
                                    >
                                        {showPw ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                                    </Button>
                                </div>
                                {password && (
                                    <div className="mt-2">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map((s) => (
                                                <div key={s} className="flex-1 h-1.5 rounded transition-all duration-300" style={{ background: s <= strength ? STRENGTH_COLORS[strength] : "#1A2A3A" }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm */}
                            <div>
                                <label htmlFor="confirm-password" className="block text-xs font-medium text-[#8899AA] mb-1.5">Confirm password</label>
                                <div className="relative">
                                    <input
                                        id="confirm-password"
                                        type={showConfirm ? "text" : "password"}
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none text-white transition-colors bg-[#0D1928] ${
                                            confirm && !passwordsMatch
                                                ? "border border-[#FF4444]"
                                                : passwordsMatch
                                                ? "border border-[#00E5A0]"
                                                : "border border-[#1A2A3A]"
                                        }`}
                                        aria-invalid={confirm && !passwordsMatch ? true : undefined}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 border-0 bg-transparent text-[#445566]"
                                        aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                                    >
                                        {showConfirm ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                                    </Button>
                                </div>
                            </div>

                            {/* 2FA toggle */}
                            <div className="flex items-center justify-between rounded-lg p-3 bg-[#0D1928] border border-[#1A2A3A]">
                                <div>
                                    <div className="text-sm font-medium text-white">Set up 2FA</div>
                                    <div className="text-xs text-[#8899AA]">Recommended for security</div>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setTwoFa(!twoFa)}
                                    className="relative w-10 h-[22px] p-0 border-0 rounded-full transition-colors"
                                    style={{ background: twoFa ? "#00E5A0" : "#1A2A3A" }}
                                    aria-pressed={twoFa}
                                    aria-label="Toggle two-factor authentication"
                                >
                                    <span
                                        className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all duration-200"
                                        style={{ left: twoFa ? 21 : 3 }}
                                    />
                                </Button>                            </div>
                            {twoFa && (
                                <p className="text-xs text-[#8899AA] bg-[#0D1928] border border-[#1A2A3A] rounded-lg px-3 py-2">
                                    You&apos;ll set up authenticator in the next step
                                </p>
                            )}

                            {/* Phone number (optional) */}
                            <div>
                                <label htmlFor="mobile-number" className="block text-xs font-medium text-[#8899AA] mb-1.5">Mobile number (optional)</label>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1 px-3 rounded-lg bg-[#0D1928] border border-[#1A2A3A] h-10 text-sm text-white flex-shrink-0">
                                        🇮🇳 +91
                                    </div>
                                    <input
                                        id="mobile-number"
                                        type="tel"
                                        placeholder="98765 43210"
                                        className="flex-1 h-10 px-3 rounded-lg text-sm outline-none bg-[#0D1928] border border-[#1A2A3A] text-white focus:border-[#00E5A0] transition-colors"
                                    />
                                </div>
                                <p className="text-xs text-[#445566] mt-1">For OTP fallback</p>
                            </div>

                            <Button type="submit" size="lg" className="w-full mt-2" disabled={!passwordsMatch} isLoading={loading} loadingText="Activating...">
                                Activate My Account
                            </Button>

                            <p className="text-xs text-[#445566] text-center">
                                By continuing, you agree to HRFlow&apos;s{" "}
                                <a href="/legal/terms" className="text-[#0066FF] hover:underline">Terms of Service</a> and{" "}
                                <a href="/legal/privacy" className="text-[#0066FF] hover:underline">Privacy Policy</a>
                            </p>
                        </form>
                    </div>
                )}
            </div>

            <div className="hidden flex-1 lg:flex">
                <AuthRightPanel />
            </div>
        </div>
    );
}
