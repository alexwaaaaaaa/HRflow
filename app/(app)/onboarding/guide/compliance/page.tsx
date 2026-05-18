"use client";
import React, { useState } from "react";
import { ShieldCheck, ArrowRight, UploadCloud } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function FirstComplianceGuideScreen() {
    const [step, setStep] = useState(1);

    return (
        <Page
            title="Statutory Compliance Guide"
            subtitle={`Step ${step} of 3 • Est. 4 mins`}
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Guide", href: "/onboarding/go-live" },
                { label: "Compliance", href: "/onboarding/guide/compliance" },
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
                    <ShieldCheck size={400} strokeWidth={0.5} />
                </div>

                <div className="relative z-10">
                    {step === 1 && (
                        <div>
                            <h2 className="text-3xl font-black text-white mb-4">Add Registration Numbers</h2>
                            <p className="text-[#8899AA] mb-8 max-w-xl">
                                Kaarya generates your EPF, ESI, PT, and LWF challans automatically. We need your registration numbers to pre-fill them securely.
                            </p>

                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label htmlFor="epf-id" className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 block">
                                        EPF Establishment ID
                                    </label>
                                    <input
                                        id="epf-id"
                                        type="text"
                                        placeholder="e.g. MHBAN0000000000"
                                        aria-label="EPF Establishment ID"
                                        className="w-full bg-[#060D1A] border border-[#2A3A4A] rounded-lg px-4 py-3 text-white focus:border-rose-500 outline-none transition-colors uppercase font-mono"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="esi-code" className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 block">
                                        ESI Employer Code
                                    </label>
                                    <input
                                        id="esi-code"
                                        type="text"
                                        placeholder="17-Digit Code"
                                        aria-label="ESI Employer Code"
                                        className="w-full bg-[#060D1A] border border-[#2A3A4A] rounded-lg px-4 py-3 text-white focus:border-rose-500 outline-none transition-colors uppercase font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="text-3xl font-black text-white mb-4">Professional Tax Registration</h2>
                            <p className="text-[#8899AA] mb-8 max-w-xl">
                                Based on your employee locations, we detected the following PT states. Enter the PT registration number for each.
                            </p>

                            <div className="space-y-4 max-w-lg mb-12">
                                {[
                                    { code: "MH", name: "Maharashtra", count: "420 Employees" },
                                    { code: "KA", name: "Karnataka", count: "180 Employees" },
                                ].map((state) => (
                                    <div key={state.code} className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-4 flex gap-4 items-center">
                                        <div className="w-8 h-8 rounded-full bg-[#131B2B] flex items-center justify-center text-[#8899AA] font-bold text-xs uppercase">
                                            {state.code}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-bold text-sm">{state.name}</h4>
                                            <p className="text-xs text-[#556677]">{state.count}</p>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="PT Reg Number"
                                            aria-label={`PT Registration Number for ${state.name}`}
                                            className="bg-[#131B2B] border border-[#3A4A5A] rounded px-3 py-2 text-sm text-white outline-none w-40"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className="text-3xl font-black text-white mb-4">Link Previous Deductions?</h2>
                            <p className="text-[#8899AA] mb-8 max-w-xl">
                                If you&apos;re transitioning mid-financial year, uploading past PF and ESI returns helps calculate accurate YTD summaries for employees.
                            </p>

                            <label
                                htmlFor="ecr-upload"
                                className="border-2 border-dashed border-[#2A3A4A] rounded-xl p-8 hover:border-[#3A4A5A] hover:bg-[#131B2B] transition-colors cursor-pointer text-center group max-w-md mx-auto mb-10 flex flex-col items-center"
                            >
                                <UploadCloud size={32} className="text-[#556677] group-hover:text-white mx-auto mb-4 transition-colors" aria-hidden="true" />
                                <h4 className="text-white font-bold mb-1">Drop previous ECR files here</h4>
                                <p className="text-xs text-[#556677]">Or click to browse standard format txt files</p>
                                <input id="ecr-upload" type="file" className="sr-only" accept=".txt" aria-label="Upload ECR files" />
                            </label>
                            <div className="text-center">
                                <Button variant="ghost" size="sm" onClick={() => window.location.href = "/onboarding/go-live"}>
                                    Skip for now, handle later
                                </Button>
                            </div>
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

                        <Button
                            onClick={() => step < 3 ? setStep(step + 1) : window.location.href = "/onboarding/go-live"}
                            iconRight={<ArrowRight size={16} aria-hidden="true" />}
                        >
                            {step < 3 ? "Continue" : "Finish Guardrails"}
                        </Button>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
