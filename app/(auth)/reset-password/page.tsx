"use client";

import { useState, useEffect } from "react";
import { LockKeyhole, Eye, EyeOff, Check, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";

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

const STRENGTH_COLORS = ["#1A2A3A", "#FF4444", "#FFB800", "#0066FF", "#00E5A0"];
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];

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
            <div className="min-h-screen flex items-center justify-center" style={{ background: "#060B14" }}>
                <div className="animate-fade-in text-center" style={{ width: 480, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 24, padding: 48 }}>
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <Check size={40} color="#00E5A0" />
                    </div>
                    <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Password reset successfully!</h2>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 8 }}>Redirecting to login in {countdown}s...</p>
                    <a href="/login" style={{ display: "inline-block", marginTop: 16, fontSize: 14, color: "#00E5A0" }}>Login now</a>
                </div>
            </div>
        );
    }

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
                        <LockKeyhole size={32} color="#00E5A0" />
                    </div>
                </div>

                <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", textAlign: "center", margin: 0 }}>Create new password</h1>
                <p style={{ fontSize: 14, color: "#8899AA", textAlign: "center", marginTop: 8, marginBottom: 32 }}>Must be at least 8 characters</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* New Password */}
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#8899AA", display: "block", marginBottom: 6 }}>New Password</label>
                        <div className="relative">
                            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••" className="w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none"
                                style={{ background: "#060B14", border: "1px solid #1A2A3A", color: "#FFFFFF", transition: "border 0.2s" }}
                                onFocus={(e) => (e.target.style.borderColor = "#00E5A0")}
                                onBlur={(e) => (e.target.style.borderColor = "#1A2A3A")}
                            />
                            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#445566] hover:text-[#8899AA]">
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {/* Strength meter */}
                        {password && (
                            <div className="mt-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((s) => (
                                        <div key={s} className="flex-1 h-1.5 rounded transition-all duration-300"
                                            style={{ background: s <= strength ? STRENGTH_COLORS[strength] : "#1A2A3A" }} />
                                    ))}
                                </div>
                                <p className="mt-1 text-xs" style={{ color: STRENGTH_COLORS[strength] }}>{STRENGTH_LABELS[strength]}</p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#8899AA", display: "block", marginBottom: 6 }}>Confirm Password</label>
                        <div className="relative">
                            <input type={showConfirm ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)}
                                placeholder="••••••••" className="w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none"
                                style={{ background: "#060B14", border: `1px solid ${confirm && !passwordsMatch ? "#FF4444" : passwordsMatch ? "#00E5A0" : "#1A2A3A"}`, color: "#FFFFFF", transition: "border 0.2s" }}
                            />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#445566] hover:text-[#8899AA]">
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            {passwordsMatch && (
                                <Check size={14} className="absolute right-9 top-1/2 -translate-y-1/2" style={{ color: "#00E5A0" }} />
                            )}
                        </div>
                        {confirm && !passwordsMatch && (
                            <p className="mt-1 text-xs" style={{ color: "#FF4444" }}>Passwords don&apos;t match</p>
                        )}
                    </div>

                    {/* Requirements checklist */}
                    <div className="flex flex-col gap-1.5">
                        {CRITERIA.map((c) => {
                            const met = c.test(password);
                            return (
                                <div key={c.label} className="flex items-center gap-2" style={{ fontSize: 13, color: met ? "#00E5A0" : "#445566", transition: "color 0.2s" }}>
                                    <Check size={12} style={{ opacity: met ? 1 : 0.3 }} />
                                    {c.label}
                                </div>
                            );
                        })}
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={!passwordsMatch || strength < 2} isLoading={loading} loadingText="Resetting...">
                        Reset Password
                    </Button>
                </form>

                <div className="flex justify-center items-center gap-1.5 mt-4" style={{ color: "#445566", fontSize: 12 }}>
                    <ShieldCheck size={12} /> Your session will be secured after reset
                </div>
            </div>
        </div>
    );
}
