"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Lock, Building2, XCircle } from "lucide-react";
import Card from "@/components/ui/Card";

type StepStatus = "done" | "active" | "pending" | "error";
type Step = { label: string; status: StepStatus };

const INITIAL_STEPS: Step[] = [
    { label: "Redirecting to Microsoft", status: "done" },
    { label: "Authenticating identity", status: "active" },
    { label: "Fetching organization data", status: "pending" },
    { label: "Setting up your session", status: "pending" },
];

const STEP_BG: Record<StepStatus, string> = {
    done: "#0078D4",
    active: "rgba(0,120,212,0.2)",
    pending: "#1A2A3A",
    error: "rgba(255,68,68,0.2)",
};
const STEP_BORDER: Record<StepStatus, string> = {
    done: "#0078D4",
    active: "#0078D4",
    pending: "#1A2A3A",
    error: "#FF4444",
};
const STEP_TEXT: Record<StepStatus, string> = {
    done: "#FFFFFF",
    active: "#0078D4",
    pending: "#445566",
    error: "#FF4444",
};

const SECURITY_BADGES = [
    { icon: ShieldCheck, label: "256-bit encrypted" },
    { icon: Lock, label: "Azure AD" },
    { icon: Building2, label: "Enterprise SSO" },
] as const;

export default function MicrosoftSSOPage() {
    const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
    const [progress, setProgress] = useState(30);

    useEffect(() => {
        const timers = [
            setTimeout(() => { setSteps((s) => s.map((step, i) => i === 1 ? { ...step, status: "done" } : i === 2 ? { ...step, status: "active" } : step)); setProgress(60); }, 2000),
            setTimeout(() => { setSteps((s) => s.map((step, i) => i === 2 ? { ...step, status: "done" } : i === 3 ? { ...step, status: "active" } : step)); setProgress(85); }, 4000),
            setTimeout(() => { setSteps((s) => s.map((step, i) => i === 3 ? { ...step, status: "done" } : step)); setProgress(100); }, 6000),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060B14] px-4">
            <div className="w-full max-w-[520px] animate-fade-in">
                <Card variant="elevated" padding="lg">
                    {/* Header logos */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#00E5A0] flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-[#00E5A0]">HRFlow</span>
                        </div>

                        {/* Connection line */}
                        <div className="flex-1 mx-4 relative h-px bg-[#1A2A3A]" aria-hidden="true">
                            <div className="animate-dot-travel absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0078D4]" />
                        </div>

                        {/* Microsoft logo */}
                        <svg width="32" height="32" viewBox="0 0 23 23" fill="none" aria-label="Microsoft" role="img">
                            <rect x="1" y="1" width="9.5" height="9.5" fill="#F25022" />
                            <rect x="12.5" y="1" width="9.5" height="9.5" fill="#7FBA00" />
                            <rect x="1" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
                            <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-white m-0">Connecting to Microsoft 365</h2>
                    <p className="text-sm text-[#8899AA] mt-2 mb-8">
                        Authenticating via your organization&apos;s Microsoft account
                    </p>

                    {/* Steps */}
                    <ol className="flex flex-col gap-4 mb-8" aria-label="Authentication progress">
                        {steps.map((step, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <div
                                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                                    style={{ background: STEP_BG[step.status], border: `2px solid ${STEP_BORDER[step.status]}` }}
                                    aria-hidden="true"
                                >
                                    {step.status === "done" ? (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    ) : step.status === "active" ? (
                                        <div className="w-2 h-2 rounded-full bg-[#0078D4] animate-pulse" />
                                    ) : step.status === "error" ? (
                                        <XCircle size={12} color="#FF4444" />
                                    ) : null}
                                </div>
                                <span className="text-sm" style={{ color: STEP_TEXT[step.status] }}>
                                    {step.label}
                                </span>
                                {step.status === "active" && (
                                    <div className="ml-auto" aria-label="Loading">
                                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="#1A2A3A" strokeWidth="3" />
                                            <path d="M12 2a10 10 0 0 1 10 10" stroke="#0078D4" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>

                    {/* Progress bar */}
                    <div
                        className="w-full h-1.5 rounded-full mb-8 bg-[#1A2A3A]"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Authentication progress"
                    >
                        <div className="h-full rounded-full transition-all duration-700 bg-[#0078D4]" style={{ width: `${progress}%` }} />
                    </div>

                    {/* Security badges */}
                    <div className="flex items-center justify-center gap-6 mb-8">
                        {SECURITY_BADGES.map((badge) => {
                            const Icon = badge.icon;
                            return (
                                <div key={badge.label} className="flex items-center gap-1.5 text-[#8899AA] text-xs">
                                    <Icon size={14} aria-hidden="true" />{badge.label}
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center">
                        <a href="/login" className="text-sm text-[#8899AA] hover:text-white transition-colors">Cancel and go back</a>
                    </div>
                </Card>
            </div>
        </div>
    );
}
