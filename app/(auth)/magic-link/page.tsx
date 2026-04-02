"use client";

import { useState } from "react";
import { Wand2, MailCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#060B14" }}>
            <div className="animate-fade-in" style={{ width: 480, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 24, padding: 48 }}>
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#00E5A0" }}>HRFlow</span>
                </div>

                {!sent ? (
                    /* STATE A — Request */
                    <>
                        <div className="flex justify-center mb-6">
                            <div style={{ background: "rgba(0,229,160,0.1)", borderRadius: 12, padding: 16 }}>
                                <Wand2 size={32} color="#00E5A0" />
                            </div>
                        </div>
                        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF", textAlign: "center", margin: 0 }}>Sign in without password</h1>
                        <p style={{ fontSize: 14, color: "#8899AA", textAlign: "center", marginTop: 8, marginBottom: 32 }}>
                            We'll send a secure login link to your work email
                        </p>
                        <form onSubmit={handleSend} className="flex flex-col gap-4">
                            <Input type="email" placeholder="you@company.com" label="Work Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Button type="submit" size="lg" className="w-full" isLoading={loading} loadingText="Sending...">
                                Send Magic Link
                            </Button>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px" style={{ background: "#1A2A3A" }} />
                                <span style={{ fontSize: 12, color: "#445566" }}>or</span>
                                <div className="flex-1 h-px" style={{ background: "#1A2A3A" }} />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <a href="/login" style={{ fontSize: 14, color: "#0066FF" }}>Sign in with password →</a>
                                <a href="/verify-otp" style={{ fontSize: 14, color: "#0066FF" }}>Sign in with OTP →</a>
                            </div>
                        </form>
                    </>
                ) : (
                    /* STATE B — Sent */
                    <div className="flex flex-col items-center text-center animate-fade-in">
                        <div className="animate-bounce-gentle mb-6" style={{ background: "rgba(0,229,160,0.1)", borderRadius: 12, padding: 20 }}>
                            <MailCheck size={48} color="#00E5A0" />
                        </div>
                        <h2 style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Check your email</h2>
                        <p style={{ fontSize: 14, color: "#8899AA", marginTop: 8, marginBottom: 24 }}>
                            Magic link sent to <strong style={{ color: "#FFFFFF" }}>{email}</strong>
                        </p>

                        {[
                            { icon: "✉️", text: "Click the link in the email" },
                            { icon: "⚡", text: "Link expires in 15 minutes" },
                            { icon: "🔒", text: "One-time use only" },
                        ].map((item) => (
                            <div key={item.text} className="w-full flex items-center gap-3 rounded-lg px-4 py-3 mb-2" style={{ background: "#060B14", border: "1px solid #1A2A3A" }}>
                                <span style={{ fontSize: 18 }}>{item.icon}</span>
                                <span style={{ fontSize: 14, color: "#FFFFFF" }}>{item.text}</span>
                            </div>
                        ))}

                        <div className="mt-4 mb-4" style={{ fontSize: 14, color: "#8899AA" }}>
                            {resendTimer > 0
                                ? <>Resend in <span style={{ color: "#00E5A0", fontWeight: 600 }}>{resendTimer}s</span></>
                                : <button onClick={() => { setSent(false); }} style={{ color: "#0066FF", background: "none", border: "none", cursor: "pointer" }}>Resend link</button>}
                        </div>

                        <div className="flex gap-3 w-full mb-4">
                            <Button variant="secondary" className="flex-1" onClick={() => window.open("https://mail.google.com", "_blank")}>Open Gmail</Button>
                            <Button variant="secondary" className="flex-1" onClick={() => window.open("https://outlook.live.com", "_blank")}>Open Outlook</Button>
                        </div>

                        <button onClick={() => setSent(false)} style={{ fontSize: 14, color: "#8899AA", background: "none", border: "none", cursor: "pointer" }}>
                            Wrong email? Go back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
