"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Lock, Building2, XCircle } from "lucide-react";

type StepStatus = "done" | "active" | "pending" | "error";
type Step = { label: string; status: StepStatus };

const INITIAL_STEPS: Step[] = [
    { label: "Redirecting to Microsoft", status: "done" },
    { label: "Authenticating identity", status: "active" },
    { label: "Fetching organization data", status: "pending" },
    { label: "Setting up your session", status: "pending" },
];

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
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#060B14" }}>
            <div className="animate-fade-in" style={{ width: 520, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 24, padding: 48 }}>
                {/* Header logos */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        <span style={{ fontSize: 18, fontWeight: 700, color: "#00E5A0" }}>HRFlow</span>
                    </div>

                    {/* Connection line with blue dot */}
                    <div className="flex-1 mx-4 relative h-px" style={{ background: "#1A2A3A" }}>
                        <div className="animate-dot-travel absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "#0078D4" }} />
                    </div>

                    {/* Microsoft logo */}
                    <svg width="32" height="32" viewBox="0 0 23 23" fill="none">
                        <rect x="1" y="1" width="9.5" height="9.5" fill="#F25022" />
                        <rect x="12.5" y="1" width="9.5" height="9.5" fill="#7FBA00" />
                        <rect x="1" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
                        <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
                    </svg>
                </div>

                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Connecting to Microsoft 365</h2>
                <p style={{ fontSize: 14, color: "#8899AA", marginTop: 8, marginBottom: 32 }}>
                    Authenticating via your organization&apos;s Microsoft account
                </p>

                {/* Steps */}
                <div className="flex flex-col gap-4 mb-8">
                    {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div style={{
                                width: 24, height: 24, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                                background: step.status === "done" ? "#0078D4" : step.status === "active" ? "rgba(0,120,212,0.2)" : step.status === "error" ? "rgba(255,68,68,0.2)" : "#1A2A3A",
                                border: `2px solid ${step.status === "done" ? "#0078D4" : step.status === "active" ? "#0078D4" : step.status === "error" ? "#FF4444" : "#1A2A3A"}`,
                            }}>
                                {step.status === "done" ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                ) : step.status === "active" ? (
                                    <div className="w-2 h-2 rounded-full" style={{ background: "#0078D4", animation: "pulse 1s ease-in-out infinite" }} />
                                ) : step.status === "error" ? (
                                    <XCircle size={12} color="#FF4444" />
                                ) : null}
                            </div>
                            <span style={{ fontSize: 14, color: step.status === "done" ? "#FFFFFF" : step.status === "active" ? "#0078D4" : "#445566" }}>
                                {step.label}
                            </span>
                            {step.status === "active" && (
                                <div className="ml-auto">
                                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="#1A2A3A" strokeWidth="3" />
                                        <path d="M12 2a10 10 0 0 1 10 10" stroke="#0078D4" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full mb-8" style={{ background: "#1A2A3A" }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progress}%`, background: "#0078D4" }} />
                </div>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-6 mb-8">
                    {[
                        { icon: <ShieldCheck size={14} />, label: "256-bit encrypted" },
                        { icon: <Lock size={14} />, label: "Azure AD" },
                        { icon: <Building2 size={14} />, label: "Enterprise SSO" },
                    ].map((badge) => (
                        <div key={badge.label} className="flex items-center gap-1.5" style={{ color: "#8899AA", fontSize: 12 }}>
                            {badge.icon}{badge.label}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <a href="/login" style={{ fontSize: 14, color: "#8899AA" }}>Cancel and go back</a>
                </div>
            </div>
        </div>
    );
}
