"use client";

import { useState } from "react";
import { Mail, ChevronLeft, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

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
        <div className="min-h-screen flex items-center justify-center bg-[#060B14] px-4">
            <div className="w-full max-w-[480px] animate-fade-in">
                <Card variant="elevated" padding="lg">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="w-7 h-7 rounded-full bg-[#00E5A0] flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-[#00E5A0]">HRFlow</span>
                    </div>

                    {state !== "success" ? (
                        <>
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-[rgba(0,229,160,0.1)] rounded-xl p-4">
                                    <Mail size={32} color="#00E5A0" aria-hidden="true" />
                                </div>
                            </div>
                            <h1 className="text-[28px] font-bold text-white text-center m-0">Reset your password</h1>
                            <p className="text-sm text-[#8899AA] text-center mt-2 mb-8">
                                Enter your work email and we&apos;ll send you a reset link
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Reset password">
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
                                    <div className="flex-1 h-px bg-[#1A2A3A]" />
                                    <span className="text-[#445566] text-[13px]">or</span>
                                    <div className="flex-1 h-px bg-[#1A2A3A]" />
                                </div>

                                <Button type="button" variant="secondary" size="lg" className="w-full">
                                    Try OTP on registered mobile instead
                                </Button>
                            </form>

                            <div className="flex justify-center mt-6">
                                <a href="/login" className="flex items-center gap-1 text-sm text-[#8899AA] hover:text-white transition-colors">
                                    <ChevronLeft size={14} aria-hidden="true" /> Back to Sign In
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-center animate-fade-in">
                            <div className="bg-[rgba(0,229,160,0.1)] rounded-xl p-4 mb-6">
                                <CheckCircle2 size={40} color="#00E5A0" aria-hidden="true" />
                            </div>
                            <h2 className="text-[28px] font-bold text-white m-0">Check your inbox!</h2>
                            <p className="text-sm text-[#8899AA] mt-2 mb-6">
                                Reset link sent to <strong className="text-white">{email}</strong>. Valid for 15 minutes.
                            </p>
                            <Button size="lg" className="w-full" onClick={() => window.open("https://mail.google.com", "_blank")}>
                                Open Gmail
                            </Button>
                            <p className="text-[13px] text-[#445566] mt-4">Resend link available in 60s</p>
                            <a href="/login" className="text-sm text-[#8899AA] mt-4 hover:text-white transition-colors">← Back to Sign In</a>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
