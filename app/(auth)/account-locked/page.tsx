"use client";

import { useState, useEffect } from "react";
import { Lock, AlertTriangle, Clock, MapPin, Mail, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const UNLOCK_MINUTES = 23;
const UNLOCK_SECONDS = 14;

export default function AccountLockedPage() {
    const [totalSec, setTotalSec] = useState(UNLOCK_MINUTES * 60 + UNLOCK_SECONDS);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        if (totalSec <= 0) return;
        const id = setInterval(() => setTotalSec((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [totalSec]);

    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    const label = `${minutes} minutes ${String(seconds).padStart(2, "0")} seconds`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060B14] px-4">
            <div className="w-full max-w-[480px] animate-fade-in">
                <Card variant="elevated" padding="lg" className="border-[rgba(255,68,68,0.3)]">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="w-7 h-7 rounded-full bg-[#00E5A0] flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-[#00E5A0]">HRFlow</span>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="bg-[rgba(255,68,68,0.1)] rounded-2xl p-5">
                            <Lock size={48} color="#FF4444" aria-hidden="true" />
                        </div>
                    </div>

                    <h1 className="text-[28px] font-bold text-white text-center m-0">Account Locked</h1>
                    <p className="text-sm text-[#8899AA] text-center mt-2 mb-6">
                        Your account has been temporarily locked due to multiple failed login attempts.
                    </p>

                    {/* Info card */}
                    <Card variant="default" padding="sm" className="mb-6 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <AlertTriangle size={16} color="#FFB800" aria-hidden="true" />
                            <span className="text-sm text-white">5 failed attempts detected</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={14} color="#8899AA" aria-hidden="true" />
                            <span className="text-xs text-[#8899AA]">Last attempt: 12/11/2024 at 09:45 AM</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin size={14} color="#8899AA" aria-hidden="true" />
                            <span className="text-xs text-[#8899AA]">IP: 103.21.xx.xx (Mumbai, Maharashtra)</span>
                        </div>
                    </Card>

                    {/* Unlock options */}
                    {!emailSent ? (
                        <div className="flex flex-col gap-2 mb-6">
                            <Button size="lg" className="w-full" onClick={() => setEmailSent(true)}>Unlock via Email</Button>
                            <Button variant="secondary" size="lg" className="w-full">Unlock via Mobile OTP</Button>
                        </div>
                    ) : (
                        <div className="rounded-xl p-4 mb-6 bg-[rgba(0,229,160,0.08)] border border-[#00E5A0] flex items-center gap-3" role="status">
                            <CheckCircle2 size={16} color="#00E5A0" aria-hidden="true" />
                            <p className="text-sm text-[#00E5A0]">Check your inbox for the unlock link</p>
                        </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 h-px bg-[#1A2A3A]" />
                        <span className="text-xs text-[#445566]">or</span>
                        <div className="flex-1 h-px bg-[#1A2A3A]" />
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-6 text-sm text-[#8899AA]">
                        <Mail size={14} aria-hidden="true" />
                        Contact HR Admin: Priya Mehta (priya@techcorp.in)
                    </div>

                    {/* Auto-unlock countdown */}
                    {totalSec > 0 && (
                        <div className="text-center mb-4 rounded-lg p-3 bg-[rgba(255,184,0,0.08)] border border-[rgba(255,184,0,0.2)]" role="timer" aria-live="polite">
                            <p className="text-[13px] text-[#FFB800]">Account auto-unlocks in {label}</p>
                        </div>
                    )}

                    <div className="text-center">
                        <a href="/security" className="text-sm text-[#FF4444] hover:underline">Report unauthorized access →</a>
                    </div>
                </Card>
            </div>
        </div>
    );
}
