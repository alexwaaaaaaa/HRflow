"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Lock, Building2, XCircle } from "lucide-react";
import Card from "@/components/ui/Card";

type StepStatus = "done" | "active" | "pending" | "error";
type Step = { label: string; status: StepStatus };

const INITIAL_STEPS: Step[] = [
    { label: "Redirecting to Google", status: "done" },
    { label: "Authenticating identity", status: "active" },
    { label: "Fetching organization data", status: "pending" },
    { label: "Setting up your session", status: "pending" },
];

const STEP_BG: Record<StepStatus, string> = {
    done: "#00E5A0",
    active: "rgba(0,229,160,0.2)",
    pending: "#1A2A3A",
    error: "rgba(255,68,68,0.2)",
};
const STEP_BORDER: Record<StepStatus, string> = {
    done: "#00E5A0",
    active: "#00E5A0",
    pending: "#1A2A3A",
    error: "#FF4444",
};
const STEP_TEXT: Record<StepStatus, string> = {
    done: "#FFFFFF",
    active: "#00E5A0",
    pending: "#445566",
    error: "#FF4444",
};

const SECURITY_BADGES = [
    { icon: ShieldCheck, label: "256-bit encrypted" },
    { icon: Lock, label: "OAuth 2.0" },
    { icon: Building2, label: "Enterprise SSO" },
] as const;

export default function GoogleSSOPage() {
    const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
    const [progress, setProgress] = useState(30);

    useEffect(() => {
        const timers = [
            setTimeout(() => {
                setSteps((s) => s.map((step, i) => i === 1 ? { ...step, status: "done" } : i === 2 ? { ...step, status: "active" } : step));
                setProgress(60);
            }, 2000),
            setTimeout(() => {
                setSteps((s) => s.map((step, i) => i === 2 ? { ...step, status: "done" } : i === 3 ? { ...step, status: "active" } : step));
                setProgress(85);
            }, 4000),
            setTimeout(() => {
                setSteps((s) => s.map((step, i) => i === 3 ? { ...step, status: "done" } : step));
                setProgress(100);
            }, 6000),
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
                            <div className="animate-dot-travel absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00E5A0]" />
                        </div>

                        {/* Google logo */}
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-label="Google" role="img">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-white m-0">Connecting to Google Workspace</h2>
                    <p className="text-sm text-[#8899AA] mt-2 mb-8">
                        Authenticating via your organization&apos;s Google account
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
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#060B14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    ) : step.status === "active" ? (
                                        <div className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse" />
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
                                            <path d="M12 2a10 10 0 0 1 10 10" stroke="#00E5A0" strokeWidth="3" strokeLinecap="round" />
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
                        <div className="h-full rounded-full bg-[#00E5A0] transition-all duration-700" style={{ width: `${progress}%` }} />
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
