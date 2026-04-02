"use client";

import { useState } from "react";
import { Mail, ChevronLeft, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type CardState = "idle" | "loading" | "success" | "error";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [state, setState] = useState<CardState>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMsg("Please enter a valid work email address.");
            return;
        }
        setErrorMsg("");
        setState("loading");
        await new Promise((r) => setTimeout(r, 1500));
        setState("success");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-grid"
            style={{ background: "#060B14" }}
        >
            <div
                className="animate-fade-in"
                style={{
                    width: 480,
                    background: "#0D1928",
                    border: "1px solid #1A2A3A",
                    borderRadius: 24,
                    padding: 48,
                }}
            >
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#00E5A0" }}>HRFlow</span>
                </div>

                {state !== "success" ? (
                    <>
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div style={{ background: "rgba(0,229,160,0.1)", borderRadius: 12, padding: 16 }}>
                                <Mail size={32} color="#00E5A0" />
                            </div>
                        </div>
                        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", textAlign: "center", margin: 0 }}>Reset your password</h1>
                        <p style={{ fontSize: 14, color: "#8899AA", textAlign: "center", marginTop: 8, marginBottom: 32 }}>
                            Enter your work email and we&apos;ll send you a reset link
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Input
                                label="Work Email Address"
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errorMsg}
                            />

                            <Button type="submit" size="lg" className="w-full" isLoading={state === "loading"} loadingText="Sending...">
                                Send Reset Link
                            </Button>

                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px" style={{ background: "#1A2A3A" }} />
                                <span style={{ color: "#445566", fontSize: 13 }}>or</span>
                                <div className="flex-1 h-px" style={{ background: "#1A2A3A" }} />
                            </div>

                            <Button type="button" variant="secondary" size="lg" className="w-full">
                                Try OTP on registered mobile instead
                            </Button>
                        </form>

                        <div className="flex justify-center mt-6">
                            <a href="/login" className="flex items-center gap-1" style={{ fontSize: 14, color: "#8899AA" }}>
                                <ChevronLeft size={14} /> Back to Sign In
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center text-center animate-fade-in">
                        <div style={{ background: "rgba(0,229,160,0.1)", borderRadius: 12, padding: 16, marginBottom: 24 }}>
                            <CheckCircle2 size={40} color="#00E5A0" />
                        </div>
                        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Check your inbox!</h2>
                        <p style={{ fontSize: 14, color: "#8899AA", marginTop: 8, marginBottom: 24 }}>
                            Reset link sent to <strong style={{ color: "#FFFFFF" }}>{email}</strong>. Valid for 15 minutes.
                        </p>
                        <Button size="lg" className="w-full" onClick={() => window.open("https://mail.google.com", "_blank")}>
                            Open Gmail
                        </Button>
                        <p style={{ fontSize: 13, color: "#445566", marginTop: 16 }}>Resend link available in 60s</p>
                        <a href="/login" style={{ fontSize: 14, color: "#8899AA", marginTop: 16 }}>← Back to Sign In</a>
                    </div>
                )}
            </div>
        </div>
    );
}
