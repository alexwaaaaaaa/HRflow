"use client";

import { useState, useEffect } from "react";
import { LockKeyhole, Eye, EyeOff, Check, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type Criterion = { label: string; test: (p: string) => boolean };

const CRITERIA: Criterion[] = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "One number", test: (p) => /[0-9]/.test(p) },
    { label: "One special character (@#$%)", test: (p) => /[@#$%!^&*]/.test(p) },
];

function getStrength(password: string): number {
    return CRITERIA.filter((c) => c.test(password)).length;
}

const STRENGTH_COLORS = ["#1A2A3A", "#FF4444", "#FFB800", "#0066FF", "#00E5A0"] as const;
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"] as const;

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const strength = getStrength(password);
    const passwordsMatch = password && confirm && password === confirm;

    useEffect(() => {
        if (!success) return;
        const id = setInterval(() => setCountdown((c) => c - 1), 1000);
        return () => clearInterval(id);
    }, [success]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordsMatch) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
        setSuccess(true);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#060B14] px-4">
                <div className="w-full max-w-[480px] animate-fade-in text-center">
                    <Card variant="elevated" padding="lg">
                        <div className="w-20 h-20 rounded-full bg-[rgba(0,229,160,0.1)] flex items-center justify-center mx-auto mb-6">
                            <Check size={40} color="#00E5A0" aria-hidden="true" />
                        </div>
                        <h2 className="text-[26px] font-bold text-white m-0">Password reset successfully!</h2>
                        <p className="text-sm text-[#8899AA] mt-2">Redirecting to login in {countdown}s...</p>
                        <a href="/login" className="inline-block mt-4 text-sm text-[#00E5A0] hover:underline">Login now</a>
                    </Card>
                </div>
            </div>
        );
    }

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
                            <LockKeyhole size={32} color="#00E5A0" aria-hidden="true" />
                        </div>
                    </div>

                    <h1 className="text-[28px] font-bold text-white text-center m-0">Create new password</h1>
                    <p className="text-sm text-[#8899AA] text-center mt-2 mb-8">Must be at least 8 characters</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Create new password">
                        {/* New Password */}
                        <div>
                            <label htmlFor="new-password" className="block text-xs font-medium text-[#8899AA] mb-1.5">New Password</label>
                            <div className="relative">
                                <input
                                    id="new-password"
                                    type={showPw ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none bg-[#060B14] border border-[#1A2A3A] text-white focus:border-[#00E5A0] transition-colors"
                                    aria-describedby={password ? "pw-strength" : undefined}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 border-0 bg-transparent text-[#445566] hover:text-[#8899AA]"
                                    aria-label={showPw ? "Hide password" : "Show password"}
                                >
                                    {showPw ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                                </Button>
                            </div>

                            {/* Strength meter */}
                            {password && (
                                <div className="mt-2" id="pw-strength">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((s) => (
                                            <div
                                                key={s}
                                                className="flex-1 h-1.5 rounded transition-all duration-300"
                                                style={{ background: s <= strength ? STRENGTH_COLORS[strength] : "#1A2A3A" }}
                                            />
                                        ))}
                                    </div>
                                    <p className="mt-1 text-xs" style={{ color: STRENGTH_COLORS[strength] }}>{STRENGTH_LABELS[strength]}</p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirm-password" className="block text-xs font-medium text-[#8899AA] mb-1.5">Confirm Password</label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    type={showConfirm ? "text" : "password"}
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none text-white transition-colors bg-[#060B14] ${
                                        confirm && !passwordsMatch
                                            ? "border border-[#FF4444]"
                                            : passwordsMatch
                                            ? "border border-[#00E5A0]"
                                            : "border border-[#1A2A3A]"
                                    }`}
                                    aria-invalid={confirm && !passwordsMatch ? true : undefined}
                                    aria-describedby={confirm && !passwordsMatch ? "confirm-error" : undefined}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 border-0 bg-transparent text-[#445566] hover:text-[#8899AA]"
                                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                                >
                                    {showConfirm ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                                </Button>
                                {passwordsMatch && (
                                    <Check size={14} className="absolute right-9 top-1/2 -translate-y-1/2 text-[#00E5A0]" aria-hidden="true" />
                                )}
                            </div>
                            {confirm && !passwordsMatch && (
                                <p id="confirm-error" className="mt-1 text-xs text-[#FF4444]" role="alert">Passwords don&apos;t match</p>
                            )}
                        </div>

                        {/* Requirements checklist */}
                        <ul className="flex flex-col gap-1.5" aria-label="Password requirements">
                            {CRITERIA.map((c) => {
                                const met = c.test(password);
                                return (
                                    <li key={c.label} className="flex items-center gap-2 text-[13px] transition-colors duration-200" style={{ color: met ? "#00E5A0" : "#445566" }}>
                                        <Check size={12} style={{ opacity: met ? 1 : 0.3 }} aria-hidden="true" />
                                        {c.label}
                                    </li>
                                );
                            })}
                        </ul>

                        <Button type="submit" size="lg" className="w-full" disabled={!passwordsMatch || strength < 2} isLoading={loading} loadingText="Resetting...">
                            Reset Password
                        </Button>
                    </form>

                    <div className="flex justify-center items-center gap-1.5 mt-4 text-[#445566] text-xs">
                        <ShieldCheck size={12} aria-hidden="true" /> Your session will be secured after reset
                    </div>
                </Card>
            </div>
        </div>
    );
}
