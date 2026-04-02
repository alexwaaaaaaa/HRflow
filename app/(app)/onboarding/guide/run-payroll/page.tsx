"use client";
import React, { useState } from 'react';
import { PlayCircle, Calculator, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function RunFirstPayrollGuideScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col">

            <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                        <PlayCircle size={20} />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg">Test Payroll Run</h2>
                        <p className="text-[#556677] text-xs font-mono">Step {step} of 2 • Est. 5 mins</p>
                    </div>
                </div>
                <Link href="/onboarding/go-live" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">
                    Save & Exit
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-4xl w-full bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none">
                        <Calculator size={400} strokeWidth={0.5} />
                    </div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

                        {/* Guide Content Side */}
                        <div>
                            {step === 1 && (
                                <div className="animate-fade-in">
                                    <h1 className="text-3xl font-black text-white mb-4">Run a Simulation</h1>
                                    <p className="text-[#8899AA] mb-8">
                                        Before you go live, let's run a "dry run" payroll for the previous month using your newly imported data.
                                        This will not transfer any funds or notify employees.
                                    </p>

                                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 mb-8">
                                        <h3 className="text-white font-bold mb-3 flex items-center gap-2">What we will check:</h3>
                                        <ul className="space-y-3 text-sm text-[#8899AA]">
                                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-400" /> Salary structure mappings</li>
                                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-400" /> EPF/ESI deduction logic</li>
                                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-400" /> PT calculations by state</li>
                                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-400" /> LOP/Attendance sync</li>
                                        </ul>
                                    </div>
                                    <p className="text-xs text-amber-500 font-bold bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                                        This is a safe sandbox environment. No real data will be altered.
                                    </p>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="animate-fade-in">
                                    <h1 className="text-3xl font-black text-white mb-4">Compare & Validate</h1>
                                    <p className="text-[#8899AA] mb-8">
                                        We're ready to compute. Once finished, grab your previous month's actual payroll payout report from your old system. Compare the net pay column to ensure our calculations match exactly.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex gap-4">
                                            <div className="mt-1 text-emerald-400"><ShieldCheck size={20} /></div>
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
                                <button
                                    onClick={() => setStep(Math.max(1, step - 1))}
                                    className={`text-sm font-bold transition-colors ${step === 1 ? 'text-transparent pointer-events-none' : 'text-[#556677] hover:text-white'}`}
                                >
                                    Back
                                </button>

                                {step < 2 ? (
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-500 transition-colors shadow-lg shadow-amber-500/20"
                                    >
                                        Next <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => window.location.href = '/payroll/simulation'}
                                        className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-500 transition-colors shadow-lg shadow-amber-600/30 ring-4 ring-amber-500/20"
                                    >
                                        Start Simulation Engine <PlayCircle size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Interactive UI Mockup Side */}
                        <div className="hidden md:block">
                            <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-2xl p-4 shadow-2xl rotate-3 transform transition-transform hover:rotate-0">
                                <div className="flex items-center justify-between mb-4 border-b border-[#1A2A3A] pb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center"><Calculator size={16} /></div>
                                        <span className="text-white font-bold">Payroll Month</span>
                                    </div>
                                    <span className="text-[#8899AA] text-sm">October 2026</span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="h-8 bg-[#131B2B] rounded animate-pulse" />
                                    <div className="h-8 bg-[#131B2B] rounded animate-pulse w-5/6" />
                                    <div className="h-8 bg-[#131B2B] rounded animate-pulse" />
                                </div>

                                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-sm text-center">
                                    Simulate Payroll Run
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
