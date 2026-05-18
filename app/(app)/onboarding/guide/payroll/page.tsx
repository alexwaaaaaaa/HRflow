"use client";
import React, { useState } from "react";
import { ArrowRight, CheckCircle2, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function FirstPayrollGuideScreen() {
    const [step, setStep] = useState(1);

    return (
        <Page
            title="Payroll Configuration Guide"
            subtitle={`Step ${step} of 3 • Est. 5 mins`}
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Guide", href: "/onboarding/go-live" },
                { label: "Payroll", href: "/onboarding/guide/payroll" },
            ]}
            maxWidth="800px"
            actions={
                <Link href="/onboarding/go-live" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">
                    Save &amp; Exit
                </Link>
            }
        >
            <Card className="relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none" aria-hidden="true">
                    <DollarSign size={400} strokeWidth={0.5} />
                </div>

                <div className="relative z-10">
                    {step === 1 && (
                        <div>
                            <h2 className="text-3xl font-black text-white mb-4">Define Your Pay Cycle</h2>
                            <p className="text-[#8899AA] mb-10 max-w-xl">
                                When do you process attendance and pay your employees? This sets the cadence for all automated compliance filings.
                            </p>

                            <div className="space-y-6 max-w-lg mb-12" role="radiogroup" aria-label="Pay cycle options">
                                <div className="bg-[#060D1A] border border-indigo-500/50 rounded-xl p-4 flex gap-4 cursor-pointer hover:bg-[#131B2B] transition-colors">
                                    <div className="mt-1 text-indigo-400"><CheckCircle2 size={24} aria-hidden="true" /></div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Standard Monthly</h4>
                                        <p className="text-sm text-[#8899AA]">Attendance: 1st to 30th/31st. Payout on 1st of next month.</p>
                                    </div>
                                </div>
                                <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-4 flex gap-4 cursor-pointer hover:bg-[#131B2B] transition-colors opacity-60">
                                    <div className="mt-1 text-[#556677]"><Calendar size={24} aria-hidden="true" /></div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Custom Dates</h4>
                                        <p className="text-sm text-[#556677]">e.g., Attendance 26th to 25th. Payout on 30th.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="text-3xl font-black text-white mb-4">Salary Components</h2>
                            <p className="text-[#8899AA] mb-10 max-w-xl">
                                Kaarya has created a standard Indian salary structure based on industry best practices. You can customize the percentages.
                            </p>

                            <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl overflow-hidden mb-12 max-w-2xl">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#131B2B] border-b border-[#2A3A4A] text-[#8899AA]">
                                        <tr>
                                            <th className="p-4 font-medium" scope="col">Component</th>
                                            <th className="p-4 font-medium" scope="col">Calculation Logic</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A] text-white">
                                        <tr>
                                            <td className="p-4 font-bold">Basic Pay</td>
                                            <td className="p-4">
                                                <div className="flex gap-2 items-center">
                                                    <label htmlFor="basic-pct" className="sr-only">Basic Pay percentage of CTC</label>
                                                    <input
                                                        id="basic-pct"
                                                        type="text"
                                                        defaultValue="50"
                                                        aria-label="Basic Pay percentage of CTC"
                                                        className="w-16 bg-[#1A2A3A] border border-[#3A4A5A] rounded px-2 py-1 text-center outline-none"
                                                    />
                                                    <span className="text-[#8899AA]">% of CTC</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold">HRA (House Rent Allow.)</td>
                                            <td className="p-4">
                                                <div className="flex gap-2 items-center">
                                                    <label htmlFor="hra-pct" className="sr-only">HRA percentage of Basic</label>
                                                    <input
                                                        id="hra-pct"
                                                        type="text"
                                                        defaultValue="50"
                                                        aria-label="HRA percentage of Basic"
                                                        className="w-16 bg-[#1A2A3A] border border-[#3A4A5A] rounded px-2 py-1 text-center outline-none"
                                                    />
                                                    <span className="text-[#8899AA]">% of Basic</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold">Special Allowance</td>
                                            <td className="p-4 text-[#8899AA] italic">Balancing Figure (Remainder of CTC)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8">
                            <div className="w-24 h-24 bg-emerald-500/10 rounded-full mx-auto flex items-center justify-center border border-emerald-500/20 mb-6">
                                <CheckCircle2 className="text-emerald-400" size={48} aria-hidden="true" />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-4">Payroll Engine Ready!</h2>
                            <p className="text-[#8899AA] mb-10 max-w-lg mx-auto">
                                Statutory components (PF, PT, ESI, LWF) have been automatically mapped based on your company&apos;s registered states.
                            </p>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-8 border-t border-[#1A2A3A]">
                        <Button
                            variant="ghost"
                            onClick={() => setStep(Math.max(1, step - 1))}
                            className={step === 1 ? "invisible" : ""}
                        >
                            Back
                        </Button>

                        {step < 3 ? (
                            <Button
                                onClick={() => setStep(step + 1)}
                                iconRight={<ArrowRight size={16} aria-hidden="true" />}
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                onClick={() => window.location.href = "/onboarding/go-live"}
                                icon={<CheckCircle2 size={16} aria-hidden="true" />}
                            >
                                Finish Guide
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </Page>
    );
}
