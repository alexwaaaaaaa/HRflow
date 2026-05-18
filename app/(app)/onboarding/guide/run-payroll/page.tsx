"use client";
import React, { useState } from "react";
import { PlayCircle, Calculator, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function RunFirstPayrollGuideScreen() {
    const [step, setStep] = useState(1);

    return (
        <Page
            title="Test Payroll Run"
            subtitle={`Step ${step} of 2 • Est. 5 mins`}
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Guide", href: "/onboarding/go-live" },
                { label: "Run Payroll", href: "/onboarding/guide/run-payroll" },
            ]}
            maxWidth="1000px"
            actions={
                <Link href="/onboarding/go-live" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">
                    Save &amp; Exit
                </Link>
            }
        >
            <Card className="relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none" aria-hidden="true">
                    <Calculator size={400} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

                    {/* Guide Content Side */}
                    <div>
                        {step === 1 && (
                            <div>
                                <h2 className="text-3xl font-black text-white mb-4">Run a Simulation</h2>
                                <p className="text-[#8899AA] mb-8">
                                    Before you go live, let&apos;s run a &ldquo;dry run&rdquo; payroll for the previous month using your newly imported data.
                                    This will not transfer any funds or notify employees.
                                </p>

                                <Card variant="elevated" className="mb-8">
                                    <h3 className="text-white font-bold mb-3">What we will check:</h3>
                                    <ul className="space-y-3 text-sm text-[#8899AA]">
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" /> Salary structure mappings
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" /> EPF/ESI deduction logic
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" /> PT calculations by state
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" /> LOP/Attendance sync
                                        </li>
                                    </ul>
                                </Card>
                                <p className="text-xs text-amber-500 font-bold bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                                    This is a safe sandbox environment. No real data will be altered.
                                </p>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h2 className="text-3xl font-black text-white mb-4">Compare &amp; Validate</h2>
                                <p className="text-[#8899AA] mb-8">
                                    We&apos;re ready to compute. Once finished, grab your previous month&apos;s actual payroll payout report from your old system. Compare the net pay column to ensure our calculations match exactly.
                                </p>

                                <div className="space-y-4">
                                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex gap-4">
                                        <div className="mt-1 text-emerald-400"><ShieldCheck size={20} aria-hidden="true" /></div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">If it matches perfectly:</h4>
                                            <p className="text-sm text-[#8899AA]">You are 100% ready to use Kaarya for your next real payroll cycle.</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] border-l-4 border-l-amber-500 rounded-xl p-4 flex gap-4">
                                        <div className="flex-1">
                                            <h4 className="text-white font-bold mb-1">If there are discrepancies:</h4>
                                            <p className="text-sm text-[#8899AA]">It usually means a custom component mapping is missing. Our support team can help you identify it instantly.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-8 border-t border-[#1A2A3A] mt-8">
                            <Button
                                variant="ghost"
                                onClick={() => setStep(Math.max(1, step - 1))}
                                className={step === 1 ? "invisible" : ""}
                            >
                                Back
                            </Button>

                            {step < 2 ? (
                                <Button
                                    onClick={() => setStep(step + 1)}
                                    iconRight={<ArrowRight size={16} aria-hidden="true" />}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => window.location.href = "/payroll/simulation"}
                                    icon={<PlayCircle size={16} aria-hidden="true" />}
                                >
                                    Start Simulation Engine
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Interactive UI Mockup Side */}
                    <div className="hidden md:block">
                        <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-2xl p-4 shadow-2xl rotate-3 transform transition-transform hover:rotate-0">
                            <div className="flex items-center justify-between mb-4 border-b border-[#1A2A3A] pb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                        <Calculator size={16} aria-hidden="true" />
                                    </div>
                                    <span className="text-white font-bold">Payroll Month</span>
                                </div>
                                <span className="text-[#8899AA] text-sm">October 2026</span>
                            </div>

                            <div className="space-y-3 mb-6" aria-hidden="true">
                                <div className="h-8 bg-[#131B2B] rounded animate-pulse" />
                                <div className="h-8 bg-[#131B2B] rounded animate-pulse w-5/6" />
                                <div className="h-8 bg-[#131B2B] rounded animate-pulse" />
                            </div>

                            <Button className="w-full">
                                Simulate Payroll Run
                            </Button>
                        </div>
                    </div>

                </div>
            </Card>
        </Page>
    );
}
