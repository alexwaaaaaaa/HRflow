"use client";
import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Building, FileText, UploadCloud } from 'lucide-react';
import Link from 'next/link';

export default function FirstComplianceGuideScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col">

            <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg">Statutory Compliance Guide</h2>
                        <p className="text-[#556677] text-xs font-mono">Step {step} of 3 • Est. 4 mins</p>
                    </div>
                </div>
                <Link href="/onboarding/go-live" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">
                    Save & Exit
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-3xl w-full bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none">
                        <ShieldCheck size={400} strokeWidth={0.5} />
                    </div>

                    <div className="relative z-10">
                        {step === 1 && (
                            <div className="animate-fade-in">
                                <h1 className="text-3xl font-black text-white mb-4">Add Registration Numbers</h1>
                                <p className="text-[#8899AA] mb-8 max-w-xl">
                                    Kaarya generates your EPF, ESI, PT, and LWF challans automatically. We need your registration numbers to pre-fill them securely.
                                </p>

                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 block">EPF Establishment ID</label>
                                        <input type="text" placeholder="e.g. MHBAN0000000000" className="w-full bg-[#060D1A] border border-[#2A3A4A] rounded-lg px-4 py-3 text-white focus:border-rose-500 outline-none transition-colors uppercase font-mono" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 block">ESI Employer Code</label>
                                        <input type="text" placeholder="17-Digit Code" className="w-full bg-[#060D1A] border border-[#2A3A4A] rounded-lg px-4 py-3 text-white focus:border-rose-500 outline-none transition-colors uppercase font-mono" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fade-in">
                                <h1 className="text-3xl font-black text-white mb-4">Professional Tax Registration</h1>
                                <p className="text-[#8899AA] mb-8 max-w-xl">
                                    Based on your employee locations, we detected the following PT states. Enter the PT registration number for each.
                                </p>

                                <div className="space-y-4 max-w-lg mb-12">
                                    <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-4 flex gap-4 items-center">
                                        <div className="w-8 h-8 rounded-full bg-[#131B2B] flex items-center justify-center text-[#8899AA] font-bold text-xs uppercase">MH</div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-bold text-sm">Maharashtra</h4>
                                            <p className="text-xs text-[#556677]">420 Employees</p>
                                        </div>
                                        <input type="text" placeholder="PT Reg Number" className="bg-[#131B2B] border border-[#3A4A5A] rounded px-3 py-2 text-sm text-white outline-none w-40" />
                                    </div>
                                    <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-4 flex gap-4 items-center">
                                        <div className="w-8 h-8 rounded-full bg-[#131B2B] flex items-center justify-center text-[#8899AA] font-bold text-xs uppercase">KA</div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-bold text-sm">Karnataka</h4>
                                            <p className="text-xs text-[#556677]">180 Employees</p>
                                        </div>
                                        <input type="text" placeholder="PT Reg Number" className="bg-[#131B2B] border border-[#3A4A5A] rounded px-3 py-2 text-sm text-white outline-none w-40" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-fade-in">
                                <h1 className="text-3xl font-black text-white mb-4">Link Previous Deductions?</h1>
                                <p className="text-[#8899AA] mb-8 max-w-xl">
                                    If you're transitioning mid-financial year, uploading past PF and ESI returns helps calculate accurate YTD summaries for employees.
                                </p>

                                <div className="border-2 border-dashed border-[#2A3A4A] rounded-xl p-8 hover:border-[#3A4A5A] hover:bg-[#131B2B] transition-colors cursor-pointer text-center group max-w-md mx-auto mb-10">
                                    <UploadCloud size={32} className="text-[#556677] group-hover:text-white mx-auto mb-4 transition-colors" />
                                    <h4 className="text-white font-bold mb-1">Drop previous ECR files here</h4>
                                    <p className="text-xs text-[#556677]">Or click to browse standard format txt files</p>
                                </div>
                                <div className="text-center">
                                    <button onClick={() => window.location.href = '/onboarding/go-live'} className="text-[#8899AA] hover:text-white font-bold text-sm transition-colors underline">Skip for now, handle later</button>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-8 border-t border-[#1A2A3A]">
                            <button
                                onClick={() => setStep(Math.max(1, step - 1))}
                                className={`text-sm font-bold transition-colors ${step === 1 ? 'text-transparent pointer-events-none' : 'text-[#556677] hover:text-white'}`}
                            >
                                Back
                            </button>

                            <button
                                onClick={() => step < 3 ? setStep(step + 1) : window.location.href = '/onboarding/go-live'}
                                className="bg-rose-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-rose-500 transition-colors shadow-lg shadow-rose-500/20"
                            >
                                {step < 3 ? 'Continue' : 'Finish Guardrails'} <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
