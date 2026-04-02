"use client";

import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import AuthRightPanel from "@/components/auth/AuthRightPanel";
import Button from "@/components/ui/Button";

type Criterion = { label: string; test: (p: string) => boolean };
const CRITERIA: Criterion[] = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "One number", test: (p) => /[0-9]/.test(p) },
    { label: "One special character (@#$%)", test: (p) => /[@#$%!^&*]/.test(p) },
];
const STRENGTH_COLORS = ["#1A2A3A", "#FF4444", "#FFB800", "#0066FF", "#00E5A0"];
function getStrength(p: string) { return CRITERIA.filter((c) => c.test(p)).length; }

// Confetti component
const CONFETTI_COLORS = ["#00E5A0", "#0066FF", "#FFB800", "#FF4444", "#FFFFFF"];
function Confetti() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{
                    position: "absolute",
                    left: `${Math.random() * 100}%`,
                    top: 0,
                    width: 8,
                    height: 8,
                    borderRadius: Math.random() > 0.5 ? "50%" : 2,
                    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                    animation: `confetti-fall ${1.5 + Math.random()}s ease-in ${Math.random() * 0.5}s forwards`,
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
        <div className="flex min-h-screen" style={{ minWidth: 1440 }}>
            {success && <Confetti />}

            {/* LEFT PANEL */}
            <div className="flex flex-col" style={{ width: 560, minWidth: 560, background: "#060B14", padding: "40px 64px", position: "relative" }}>
                {success ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
                        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,229,160,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                            <Check size={40} color="#00E5A0" />
                        </div>
                        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Account Activated!</h2>
                        <p style={{ fontSize: 14, color: "#8899AA", marginTop: 8 }}>Redirecting to your dashboard...</p>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 flex flex-col justify-center">
                            {/* Welcome badge */}
                            <div className="mb-6">
                                <span style={{ display: "inline-block", background: "rgba(0,229,160,0.1)", color: "#00E5A0", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 500 }}>
                                    🎉 Welcome to HRFlow!
                                </span>
                            </div>

                            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Let&apos;s set up your account</h1>
                            <p style={{ fontSize: 14, color: "#8899AA", marginTop: 8, marginBottom: 24 }}>
                                You've been invited by <strong style={{ color: "#FFFFFF" }}>Priya Mehta (HR Admin)</strong> at TechCorp Solutions Pvt. Ltd.
                            </p>

                            {/* Employee info card */}
                            <div className="flex items-center gap-4 rounded-xl p-4 mb-6" style={{ background: "#060B14", border: "1px solid #1A2A3A" }}>
                                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(0,229,160,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, fontWeight: 700, color: "#00E5A0" }}>
                                    RS
                                </div>
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>Rahul Sharma</div>
                                    <div style={{ fontSize: 14, color: "#8899AA" }}>Software Engineer — Backend</div>
                                    <div style={{ fontSize: 12, color: "#445566" }}>Engineering • Pune Office</div>
                                </div>
                            </div>

                            <form onSubmit={handleActivate} className="flex flex-col gap-4">
                                {/* New Password */}
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 500, color: "#8899AA", display: "block", marginBottom: 6 }}>Create your password</label>
                                    <div className="relative">
                                        <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                                            className="w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none"
                                            style={{ background: "#0D1928", border: "1px solid #1A2A3A", color: "#FFFFFF" }}
                                            onFocus={(e) => (e.target.style.borderColor = "#00E5A0")} onBlur={(e) => (e.target.style.borderColor = "#1A2A3A")}
                                        />
                                        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#445566]">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                                    </div>
                                    {password && (
                                        <div className="mt-2">
                                            <div className="flex gap-1">{[1, 2, 3, 4].map((s) => <div key={s} className="flex-1 h-1.5 rounded transition-all duration-300" style={{ background: s <= strength ? STRENGTH_COLORS[strength] : "#1A2A3A" }} />)}</div>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm */}
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 500, color: "#8899AA", display: "block", marginBottom: 6 }}>Confirm password</label>
                                    <div className="relative">
                                        <input type={showConfirm ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••"
                                            className="w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none"
                                            style={{ background: "#0D1928", border: `1px solid ${confirm && !passwordsMatch ? "#FF4444" : passwordsMatch ? "#00E5A0" : "#1A2A3A"}`, color: "#FFFFFF" }}
                                        />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#445566]">{showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                                    </div>
                                </div>

                                {/* 2FA toggle */}
                                <div className="flex items-center justify-between rounded-lg p-3" style={{ background: "#0D1928", border: "1px solid #1A2A3A" }}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>Set up 2FA</div>
                                        <div style={{ fontSize: 12, color: "#8899AA" }}>Recommended for security</div>
                                    </div>
                                    <button type="button" onClick={() => setTwoFa(!twoFa)}
                                        style={{ width: 40, height: 22, borderRadius: 11, background: twoFa ? "#00E5A0" : "#1A2A3A", position: "relative", transition: "background 0.2s", border: "none", cursor: "pointer" }}>
                                        <div style={{ position: "absolute", top: 3, left: twoFa ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF", transition: "left 0.2s" }} />
                                    </button>
                                </div>
                                {twoFa && <p style={{ fontSize: 12, color: "#8899AA", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "8px 12px" }}>You&apos;ll set up authenticator in the next step</p>}

                                {/* Phone number (optional) */}
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 500, color: "#8899AA", display: "block", marginBottom: 6 }}>Mobile number (optional)</label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center gap-1 px-3 rounded-lg" style={{ background: "#0D1928", border: "1px solid #1A2A3A", height: 40, fontSize: 14, color: "#FFFFFF", flexShrink: 0 }}>
                                            🇮🇳 +91
                                        </div>
                                        <input type="tel" placeholder="98765 43210" className="flex-1 h-10 px-3 rounded-lg text-sm outline-none"
                                            style={{ background: "#0D1928", border: "1px solid #1A2A3A", color: "#FFFFFF" }} />
                                    </div>
                                    <p style={{ fontSize: 12, color: "#445566", marginTop: 4 }}>For OTP fallback</p>
                                </div>

                                <Button type="submit" size="lg" className="w-full mt-2" disabled={!passwordsMatch} isLoading={loading} loadingText="Activating...">
                                    Activate My Account
                                </Button>

                                <p style={{ fontSize: 12, color: "#445566", textAlign: "center" }}>
                                    By continuing, you agree to HRFlow&apos;s{" "}
                                    <a href="/legal/terms" style={{ color: "#0066FF" }}>Terms of Service</a> and{" "}
                                    <a href="/legal/privacy" style={{ color: "#0066FF" }}>Privacy Policy</a>
                                </p>
                            </form>
                        </div>
                    </>
                )}
            </div>

            <AuthRightPanel />
        </div>
    );
}
