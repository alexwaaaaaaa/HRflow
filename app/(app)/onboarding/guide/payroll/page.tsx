"use client";
import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, DollarSign, Calendar, Percent } from 'lucide-react';
import Link from 'next/link';

export default function FirstPayrollGuideScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col">

            {/* Guide Header */}
            <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <Calculator size={20} />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg">Payroll Configuration Guide</h2>
                        <p className="text-[#556677] text-xs font-mono">Step {step} of 3 • Est. 5 mins</p>
                    </div>
                </div>
                <Link href="/onboarding/go-live" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">
                    Save & Exit
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-3xl w-full bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

                    {/* Background Graphic */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none">
                        <DollarSign size={400} strokeWidth={0.5} />
                    </div>

                    <div className="relative z-10">
                        {step === 1 && (
                            <div className="animate-fade-in">
                                <h1 className="text-3xl font-black text-white mb-4">Define Your Pay Cycle</h1>
                                <p className="text-[#8899AA] mb-10 max-w-xl">
                                    When do you process attendance and pay your employees? This sets the cadence for all automated compliance filings.
                                </p>

                                <div className="space-y-6 max-w-lg mb-12">
                                    <div className="bg-[#060D1A] border border-indigo-500/50 rounded-xl p-4 flex gap-4 cursor-pointer hover:bg-[#131B2B] transition-colors">
                                        <div className="mt-1 text-indigo-400"><CheckCircle2 size={24} /></div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Standard Monthly</h4>
                                            <p className="text-sm text-[#8899AA]">Attendance: 1st to 30th/31st. Payout on 1st of next month.</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-4 flex gap-4 cursor-pointer hover:bg-[#131B2B] transition-colors opacity-60">
                                        <div className="mt-1 text-[#556677]"><Calendar size={24} /></div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Custom Dates</h4>
                                            <p className="text-sm text-[#556677]">e.g., Attendance 26th to 25th. Payout on 30th.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fade-in">
                                <h1 className="text-3xl font-black text-white mb-4">Salary Components</h1>
                                <p className="text-[#8899AA] mb-10 max-w-xl">
                                    Kaarya has created a standard Indian salary structure based on industry best practices. You can customize the percentages.
                                </p>

                                <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl overflow-hidden mb-12 max-w-2xl">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-[#131B2B] border-b border-[#2A3A4A] text-[#8899AA]">
                                            <tr>
                                                <th className="p-4 font-medium">Component</th>
                                                <th className="p-4 font-medium">Calculation Logic</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#1A2A3A] text-white">
                                            <tr>
                                                <td className="p-4 font-bold">Basic Pay</td>
                                                <td className="p-4 flex gap-2 items-center">
                                                    <input type="text" defaultValue="50" className="w-16 bg-[#1A2A3A] border border-[#3A4A5A] rounded px-2 py-1 text-center outline-none" />
                                                    <span className="text-[#8899AA]">% of CTC</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-bold">HRA (House Rent Allow.)</td>
                                                <td className="p-4 flex gap-2 items-center">
                                                    <input type="text" defaultValue="50" className="w-16 bg-[#1A2A3A] border border-[#3A4A5A] rounded px-2 py-1 text-center outline-none" />
                                                    <span className="text-[#8899AA]">% of Basic</span>
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
                            <div className="animate-fade-in text-center py-8">
                                <div className="w-24 h-24 bg-emerald-500/10 rounded-full mx-auto flex items-center justify-center border border-emerald-500/20 mb-6">
                                    <CheckCircle2 className="text-emerald-400" size={48} />
                                </div>
                                <h1 className="text-3xl font-black text-white mb-4">Payroll Engine Ready!</h1>
                                <p className="text-[#8899AA] mb-10 max-w-lg mx-auto">
                                    Statutory components (PF, PT, ESI, LWF) have been automatically mapped based on your company's registered states.
                                </p>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-8 border-t border-[#1A2A3A]">
                            <button
                                onClick={() => setStep(Math.max(1, step - 1))}
                                className={`text-sm font-bold transition-colors ${step === 1 ? 'text-transparent pointer-events-none' : 'text-[#556677] hover:text-white'}`}
                            >
                                Back
                            </button>

                            {step < 3 ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
                                >
                                    Continue <ArrowRight size={16} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => window.location.href = '/onboarding/go-live'}
                                    className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20"
                                >
                                    Finish Guide <CheckCircle2 size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
