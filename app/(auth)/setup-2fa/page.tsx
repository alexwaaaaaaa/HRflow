"use client";

import { useState } from "react";
import { ShieldCheck, Copy, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const MANUAL_KEY = "JBSW Y3DP EHPK 3PXP";

type StepStatus = "done" | "active" | "pending";
interface ProgressStep { label: string; status: StepStatus }
const STEPS: ProgressStep[] = [
    { label: "Download App", status: "done" },
    { label: "Scan QR Code", status: "active" },
    { label: "Verify Code", status: "pending" },
];

// QR cell pattern — computed at module scope (not in render)
const QR_CELLS = Array.from({ length: 49 }).map((_, i) => {
    const row = Math.floor(i / 7);
    const col = i % 7;
    const isCorner = (row < 2 && col < 2) || (row < 2 && col >= 5) || (row >= 5 && col < 2);
    return isCorner || i % 3 === 0;
});

export default function Setup2FAPage() {
    const [copied, setCopied] = useState(false);
    const [showSkipModal, setShowSkipModal] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(MANUAL_KEY.replace(/\s/g, ""));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const STEP_BG: Record<StepStatus, string> = {
        done: "#00E5A0",
        active: "transparent",
        pending: "#1A2A3A",
    };
    const STEP_BORDER: Record<StepStatus, string> = {
        done: "#00E5A0",
        active: "#00E5A0",
        pending: "#1A2A3A",
    };
    const STEP_COLOR: Record<StepStatus, string> = {
        done: "#060B14",
        active: "#00E5A0",
        pending: "#445566",
    };
    const STEP_TEXT_COLOR: Record<StepStatus, string> = {
        done: "#FFFFFF",
        active: "#00E5A0",
        pending: "#445566",
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060B14] px-4">
            <div className="w-full max-w-[560px] animate-fade-in">
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

                    {/* Progress steps */}
                    <ol className="flex items-center gap-2 mb-8" aria-label="Setup progress">
                        {STEPS.map((step, i) => (
                            <li key={i} className="flex items-center gap-2 flex-1">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold"
                                        style={{
                                            background: STEP_BG[step.status],
                                            border: `2px solid ${STEP_BORDER[step.status]}`,
                                            color: STEP_COLOR[step.status],
                                        }}
                                        aria-current={step.status === "active" ? "step" : undefined}
                                    >
                                        {step.status === "done" ? <Check size={14} aria-hidden="true" /> : i + 1}
                                    </div>
                                    <span className="text-xs font-medium whitespace-nowrap" style={{ color: STEP_TEXT_COLOR[step.status] }}>
                                        {step.label}
                                    </span>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div className="flex-1 h-px mx-2" style={{ background: i === 0 ? "#00E5A0" : "#1A2A3A" }} aria-hidden="true" />
                                )}
                            </li>
                        ))}
                    </ol>

                    <h2 className="text-[22px] font-bold text-white m-0">Set up Authenticator App</h2>
                    <p className="text-sm text-[#8899AA] mt-2 mb-6">
                        Scan the QR code with Google Authenticator or Authy
                    </p>

                    {/* Two-column layout */}
                    <div className="flex gap-8 mb-8">
                        {/* QR Code box */}
                        <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-[200px] h-[200px] bg-white rounded-xl p-4 flex items-center justify-center" aria-label="QR code for authenticator setup">
                                {/* Decorative QR pattern — real QR from backend */}
                                <div className="grid gap-0.5" style={{ gridTemplateColumns: "repeat(7, 1fr)", width: 168, height: 168 }}>
                                    {QR_CELLS.map((filled, i) => (
                                        <div key={i} className="rounded-sm" style={{ background: filled ? "#000000" : "#FFFFFF" }} />
                                    ))}
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="mt-2" onClick={() => { }}>
                                Or enter code manually
                            </Button>
                        </div>

                        {/* Instructions */}
                        <div className="flex-1">
                            <p className="text-xs text-[#00E5A0] font-medium mb-1">Step 1</p>
                            <p className="text-sm text-white mb-3">Download an authenticator app:</p>
                            <div className="flex gap-2 mb-6">
                                {["Google Auth", "Authy"].map((app) => (
                                    <div key={app} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#060B14] border border-[#1A2A3A] text-xs text-white">
                                        {app}
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-[#00E5A0] font-medium mb-1">Step 2</p>
                            <p className="text-sm text-white mb-2">Scan QR code or enter:</p>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#060B14] border border-[#1A2A3A]">
                                <span className="font-mono text-sm text-white tracking-widest flex-1">{MANUAL_KEY}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCopy}
                                    className="p-1 h-auto border-0 bg-transparent"
                                    aria-label={copied ? "Copied" : "Copy key"}
                                >
                                    {copied ? <Check size={14} className="text-[#00E5A0]" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Button size="lg" className="w-full mb-3" onClick={() => { }}>
                        Verify setup →
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-full"
                        onClick={() => setShowSkipModal(true)}
                    >
                        Skip for now (Not recommended)
                    </Button>

                    <div className="flex justify-center items-center gap-1.5 mt-4 text-[#00E5A0] text-xs">
                        <ShieldCheck size={12} aria-hidden="true" /> 2FA reduces account breach risk by 99.9%
                    </div>

                    {/* Skip modal */}
                    {showSkipModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(6,11,20,0.8)]" role="dialog" aria-modal="true" aria-labelledby="skip-2fa-title">
                            <div className="w-full max-w-[400px] animate-fade-in">
                                <Card variant="elevated" padding="lg">
                                    <h3 id="skip-2fa-title" className="text-lg font-semibold text-white m-0 mb-2">Are you sure?</h3>
                                    <p className="text-sm text-[#8899AA] mb-6">Your account will be less secure without 2FA.</p>
                                    <div className="flex gap-3">
                                        <Button variant="ghost" className="flex-1" onClick={() => setShowSkipModal(false)}>Go back</Button>
                                        <Button variant="danger" className="flex-1" onClick={() => { }}>Skip anyway</Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
