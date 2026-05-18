"use client";
import React, { useState } from "react";
import { Sparkles, Users, Calculator, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";

// ─── Static data ─────────────────────────────────────────────────────────────

interface TourStep {
    title: string;
    desc: string;
    icon: React.ReactNode;
    colorFrom: string;
    colorTo: string;
    border: string;
}

const TOUR_STEPS: TourStep[] = [
    {
        title: "Welcome to Kaarya",
        desc: "India's most advanced Workforce OS. We've combined HR, Payroll, and Compliance into one seamless experience.",
        icon: <Sparkles size={32} className="text-indigo-400" aria-hidden="true" />,
        colorFrom: "rgba(49,46,129,0.4)",
        colorTo: "rgba(79,70,229,0.1)",
        border: "border-indigo-500/30",
    },
    {
        title: "Centralized Employee Directory",
        desc: "Manage profiles, documents, and historical timelines in one visual dashboard. Syncs instantly across the platform.",
        icon: <Users size={32} className="text-emerald-400" aria-hidden="true" />,
        colorFrom: "rgba(6,78,59,0.4)",
        colorTo: "rgba(16,185,129,0.1)",
        border: "border-emerald-500/30",
    },
    {
        title: "1-Click Native Payroll",
        desc: "Process complex Indian payroll configurations, calculate taxes, and disburse salaries—all without switching systems.",
        icon: <Calculator size={32} className="text-amber-400" aria-hidden="true" />,
        colorFrom: "rgba(120,53,15,0.4)",
        colorTo: "rgba(245,158,11,0.1)",
        border: "border-amber-500/30",
    },
    {
        title: "Automated Compliance",
        desc: "PF, ESI, PT, and TDS filings generated automatically based on payroll runs. Zero error margin.",
        icon: <ShieldCheck size={32} className="text-rose-400" aria-hidden="true" />,
        colorFrom: "rgba(136,19,55,0.4)",
        colorTo: "rgba(244,63,94,0.1)",
        border: "border-rose-500/30",
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductTourScreen() {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const current = TOUR_STEPS[step]!;

    return (
        <Page
            title="Product Tour"
            subtitle="Get a quick overview of what Kaarya can do for your organization."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Tour", href: "/onboarding/tour" },
            ]}
            actions={
                <Button variant="secondary" onClick={() => router.push("/onboarding/checklist")}>
                    Skip Tour
                </Button>
            }
        >
            <div className="max-w-4xl mx-auto">
                <div
                    className={`bg-[#0A1420]/80 backdrop-blur-xl border ${current.border} rounded-3xl overflow-hidden shadow-2xl transition-all duration-500`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Visual Side */}
                        <div
                            className="p-12 flex flex-col items-center justify-center relative"
                            style={{
                                background: `linear-gradient(to bottom right, ${current.colorFrom}, ${current.colorTo})`,
                                minHeight: "400px",
                            }}
                        >
                            <div className="w-24 h-24 rounded-2xl bg-[#060D1A] border border-white/10 flex items-center justify-center shadow-2xl mb-8 transform hover:scale-110 transition-transform cursor-pointer">
                                {current.icon}
                            </div>

                            {/* Abstract UI Representation */}
                            <div className="w-full max-w-sm bg-[#060D1A]/50 border border-white/10 rounded-xl p-4 backdrop-blur-sm space-y-3" aria-hidden="true">
                                <div className="h-4 w-1/3 bg-white/10 rounded" />
                                <div className="flex gap-2">
                                    <div className="h-10 w-10 rounded-full bg-white/5" />
                                    <div className="flex-1 space-y-2 py-1">
                                        <div className="h-3 w-3/4 bg-white/10 rounded" />
                                        <div className="h-3 w-1/2 bg-white/5 rounded" />
                                    </div>
                                </div>
                                <div className="h-20 w-full bg-white/5 rounded-lg border border-white/5" />
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-12 flex flex-col justify-between">
                            <div>
                                {/* Step indicators */}
                                <div className="flex gap-1 mb-8" role="tablist" aria-label="Tour progress">
                                    {TOUR_STEPS.map((_, i) => (
                                        <div
                                            key={i}
                                            role="tab"
                                            aria-selected={i === step}
                                            aria-label={`Step ${i + 1}`}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                i === step ? "w-8 bg-indigo-500" : "w-2 bg-[#1A2A3A]"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <h2 className="text-3xl font-black text-white mb-4 leading-tight">{current.title}</h2>
                                <p className="text-[#8899AA] text-lg leading-relaxed mb-8">{current.desc}</p>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <button
                                    type="button"
                                    onClick={() => setStep(Math.max(0, step - 1))}
                                    className={`text-sm font-bold transition-colors ${
                                        step === 0 ? "text-transparent pointer-events-none" : "text-[#556677] hover:text-white"
                                    }`}
                                    aria-hidden={step === 0}
                                >
                                    Previous
                                </button>

                                {step < TOUR_STEPS.length - 1 ? (
                                    <Button onClick={() => setStep(step + 1)} iconRight={<ArrowRight size={16} aria-hidden="true" />}>
                                        Next
                                    </Button>
                                ) : (
                                    <Button onClick={() => router.push("/onboarding/checklist")} icon={<CheckCircle2 size={16} aria-hidden="true" />}>
                                        Get Started
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
