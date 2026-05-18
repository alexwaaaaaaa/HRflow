"use client";
import React, { useState } from "react";
import { ArrowRight, Network, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const DEPARTMENTS = ["Engineering", "Product Management", "Sales & Revenue", "Marketing", "People & Operations", "Finance"];

export default function SetupDepartmentsGuideScreen() {
    const [step, setStep] = useState(1);

    return (
        <Page
            title="Org Structure Guide"
            subtitle={`Step ${step} of 2 • Est. 3 mins`}
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Guide", href: "/onboarding/checklist" },
                { label: "Departments", href: "/onboarding/guide/departments" },
            ]}
            maxWidth="800px"
            actions={
                <Link href="/onboarding/checklist" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">
                    Save &amp; Exit
                </Link>
            }
        >
            <Card className="relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none" aria-hidden="true">
                    <Network size={400} strokeWidth={0.5} />
                </div>

                <div className="relative z-10">
                    {step === 1 && (
                        <div className="text-center max-w-xl mx-auto">
                            <div className="w-20 h-20 bg-[#131B2B] rounded-2xl mx-auto flex items-center justify-center mb-6 border border-[#2A3A4A]">
                                <LayoutTemplate className="text-sky-400" size={32} aria-hidden="true" />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-4">Choose an Org Template</h2>
                            <p className="text-[#8899AA] mb-8">
                                Don&apos;t want to build from scratch? Pick a template that closely aligns with your company&apos;s structure. You can customize it later.
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-left mb-10">
                                <div className="bg-[#060D1A] border border-sky-500/50 rounded-xl p-4 cursor-pointer relative overflow-hidden group hover:bg-[#131B2B] transition-colors">
                                    <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-4 border-sky-500 bg-[#0A1420]" aria-hidden="true" />
                                    <h4 className="text-white font-bold mb-1">Tech Startup</h4>
                                    <p className="text-xs text-[#556677] mb-4">Engineering, Product, Sales, Marketing, Ops</p>
                                    <div className="flex gap-1">
                                        <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-[10px] text-[#8899AA]">5 Depts</span>
                                        <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-[10px] text-[#8899AA]">Flat hierarchy</span>
                                    </div>
                                </div>
                                <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-4 cursor-pointer hover:border-[#3A4A5A] transition-colors relative">
                                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-[#3A4A5A]" aria-hidden="true" />
                                    <h4 className="text-white font-bold mb-1">Modern Enterprise</h4>
                                    <p className="text-xs text-[#556677] mb-4">C-Suite, IT, HR, Finance, Enterprise Sales, R&amp;D + Nested sub-depts</p>
                                    <div className="flex gap-1">
                                        <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-[10px] text-[#8899AA]">12 Depts</span>
                                        <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-[10px] text-[#8899AA]">Multi-level</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="text-3xl font-black text-white mb-4">Review Departments</h2>
                            <p className="text-[#8899AA] mb-8 max-w-xl">
                                We&apos;ve loaded the Tech Startup template. Add or remove departments as needed.
                            </p>

                            <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-4 space-y-2 mb-10 max-h-64 overflow-y-auto w-full max-w-lg mx-auto">
                                {DEPARTMENTS.map((dept) => (
                                    <div key={dept} className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg flex justify-between items-center group">
                                        <span className="text-sm font-bold text-white flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-sky-400" aria-hidden="true" /> {dept}
                                        </span>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            aria-label={`Remove ${dept} department`}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="w-full border-2 border-dashed border-[#2A3A4A] hover:border-sky-500/50 p-3 rounded-lg text-sky-400 font-bold text-sm transition-colors text-center mt-2"
                                >
                                    + Add custom department
                                </button>
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
                            onClick={() => step < 2 ? setStep(step + 1) : window.location.href = "/onboarding/checklist"}
                            iconRight={<ArrowRight size={16} aria-hidden="true" />}
                        >
                            {step < 2 ? "Customize Structure" : "Save Organization"}
                        </Button>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
