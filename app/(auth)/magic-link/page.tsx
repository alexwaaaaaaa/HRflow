"use client";

import { useState } from "react";
import { Wand2, MailCheck, Zap, Lock, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function MagicLinkPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        setSent(true);
        setResendTimer(60);
        const countdown = setInterval(() => {
            setResendTimer((t) => { if (t <= 1) { clearInterval(countdown); return 0; } return t - 1; });
        }, 1000);
    };

    const MAGIC_LINK_STEPS = [
        { icon: Zap, text: "Click the link in the email" },
        { icon: Lock, text: "Link expires in 15 minutes" },
        { icon: RefreshCw, text: "One-time use only" },
    ] as const;

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

                    {!sent ? (
                        /* STATE A — Request */
                        <>
                            <div className="flex justify-center mb-6">
                                <div className="bg-[rgba(0,229,160,0.1)] rounded-xl p-4">
                                    <Wand2 size={32} color="#00E5A0" aria-hidden="true" />
                                </div>
                            </div>
                            <h1 className="text-[26px] font-bold text-white text-center m-0">Sign in without password</h1>
                            <p className="text-sm text-[#8899AA] text-center mt-2 mb-8">
                                We&apos;ll send a secure login link to your work email
                            </p>
                            <form onSubmit={handleSend} className="flex flex-col gap-4" aria-label="Request magic link">
                                <Input type="email" placeholder="you@company.com" label="Work Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Button type="submit" size="lg" className="w-full" isLoading={loading} loadingText="Sending...">
                                    Send Magic Link
                                </Button>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-px bg-[#1A2A3A]" />
                                    <span className="text-xs text-[#445566]">or</span>
                                    <div className="flex-1 h-px bg-[#1A2A3A]" />
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <a href="/login" className="text-sm text-[#0066FF] hover:underline">Sign in with password →</a>
                                    <a href="/verify-otp" className="text-sm text-[#0066FF] hover:underline">Sign in with OTP →</a>
                                </div>
                            </form>
                        </>
                    ) : (
                        /* STATE B — Sent */
                        <div className="flex flex-col items-center text-center animate-fade-in">
                            <div className="animate-bounce-gentle mb-6 bg-[rgba(0,229,160,0.1)] rounded-xl p-5">
                                <MailCheck size={48} color="#00E5A0" aria-hidden="true" />
                            </div>
                            <h2 className="text-[26px] font-bold text-white m-0">Check your email</h2>
                            <p className="text-sm text-[#8899AA] mt-2 mb-6">
                                Magic link sent to <strong className="text-white">{email}</strong>
                            </p>

                            <ul className="w-full flex flex-col gap-2 mb-4" aria-label="Next steps">
                                {MAGIC_LINK_STEPS.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.text} className="w-full flex items-center gap-3 rounded-lg px-4 py-3 bg-[#060B14] border border-[#1A2A3A]">
                                            <Icon size={16} className="text-[#8899AA] flex-shrink-0" aria-hidden="true" />
                                            <span className="text-sm text-white">{item.text}</span>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="mt-2 mb-4 text-sm text-[#8899AA]">
                                {resendTimer > 0
                                    ? <>Resend in <span className="text-[#00E5A0] font-semibold">{resendTimer}s</span></>
                                    : <Button variant="ghost" size="sm" onClick={() => { setSent(false); }}>Resend link</Button>}
                            </div>

                            <div className="flex gap-3 w-full mb-4">
                                <Button variant="secondary" className="flex-1" onClick={() => window.open("https://mail.google.com", "_blank")}>Open Gmail</Button>
                                <Button variant="secondary" className="flex-1" onClick={() => window.open("https://outlook.live.com", "_blank")}>Open Outlook</Button>
                            </div>

                            <Button variant="ghost" size="sm" onClick={() => setSent(false)}>
                                Wrong email? Go back
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
