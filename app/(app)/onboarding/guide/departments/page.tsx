"use client";
import React, { useState } from 'react';
import { Building2, ArrowRight, Network, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';

export default function SetupDepartmentsGuideScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col">

            <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg">Org Structure Guide</h2>
                        <p className="text-[#556677] text-xs font-mono">Step {step} of 2 • Est. 3 mins</p>
                    </div>
                </div>
                <Link href="/onboarding/checklist" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">
                    Save & Exit
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-3xl w-full bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none">
                        <Network size={400} strokeWidth={0.5} />
                    </div>

                    <div className="relative z-10">
                        {step === 1 && (
                            <div className="animate-fade-in text-center max-w-xl mx-auto">
                                <div className="w-20 h-20 bg-[#131B2B] rounded-2xl mx-auto flex items-center justify-center mb-6 border border-[#2A3A4A]">
                                    <LayoutTemplate className="text-sky-400" size={32} />
                                </div>
                                <h1 className="text-3xl font-black text-white mb-4">Choose an Org Template</h1>
                                <p className="text-[#8899AA] mb-8">
                                    Don't want to build from scratch? Pick a template that closely aligns with your company's structure. You can customize it later.
                                </p>

                                <div className="grid grid-cols-2 gap-4 text-left mb-10">
                                    <div className="bg-[#060D1A] border border-sky-500/50 rounded-xl p-4 cursor-pointer relative overflow-hidden group hover:bg-[#131B2B] transition-colors">
                                        <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-4 border-sky-500 bg-[#0A1420]" />
                                        <h4 className="text-white font-bold mb-1">Tech Startup</h4>
                                        <p className="text-xs text-[#556677] mb-4">Engineering, Product, Sales, Marketing, Ops</p>
                                        <div className="flex gap-1">
                                            <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-[10px] text-[#8899AA]">5 Depts</span>
                                            <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-[10px] text-[#8899AA]">Flat hierarchy</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-4 cursor-pointer hover:border-[#3A4A5A] transition-colors relative">
                                        <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-[#3A4A5A]" />
                                        <h4 className="text-white font-bold mb-1">Modern Enterprise</h4>
                                        <p className="text-xs text-[#556677] mb-4">C-Suite, IT, HR, Finance, Enterprise Sales, R&D + Nested sub-depts</p>
                                        <div className="flex gap-1">
                                            <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-[10px] text-[#8899AA]">12 Depts</span>
                                            <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-[10px] text-[#8899AA]">Multi-level</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fade-in">
                                <h1 className="text-3xl font-black text-white mb-4">Review Departments</h1>
                                <p className="text-[#8899AA] mb-8 max-w-xl">
                                    We've loaded the Tech Startup template. Add or remove departments as needed.
                                </p>

                                <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-4 space-y-2 mb-10 max-h-64 overflow-y-auto w-full max-w-lg mx-auto">
                                    {['Engineering', 'Product Management', 'Sales & Revenue', 'Marketing', 'People & Operations', 'Finance'].map((dept, i) => (
                                        <div key={i} className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg flex justify-between items-center group">
                                            <span className="text-sm font-bold text-white flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-sky-400" /> {dept}</span>
                                            <button className="text-[#556677] hover:text-rose-400 font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                                        </div>
                                    ))}
                                    <button className="w-full border-2 border-dashed border-[#2A3A4A] hover:border-sky-500/50 p-3 rounded-lg text-sky-400 font-bold text-sm transition-colors text-center mt-2">
                                        + Add custom department
                                    </button>
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
                                onClick={() => step < 2 ? setStep(step + 1) : window.location.href = '/onboarding/checklist'}
                                className="bg-sky-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-sky-500 transition-colors shadow-lg shadow-sky-500/20"
                            >
                                {step < 2 ? 'Customize Structure' : 'Save Organization'} <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
