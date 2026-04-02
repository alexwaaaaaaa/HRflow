"use client";
import React, { useState } from 'react';
import { Sparkles, Map, Users, Calculator, ShieldCheck, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductTourScreen() {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const tourSteps = [
        {
            title: "Welcome to Kaarya",
            desc: "India's most advanced Workforce OS. We've combined HR, Payroll, and Compliance into one seamless experience.",
            icon: <Sparkles size={32} className="text-indigo-400" />,
            color: "from-indigo-900/40 to-indigo-600/10",
            border: "border-indigo-500/30"
        },
        {
            title: "Centralized Employee Directory",
            desc: "Manage profiles, documents, and historical timelines in one visual dashboard. Syncs instantly across the platform.",
            icon: <Users size={32} className="text-emerald-400" />,
            color: "from-emerald-900/40 to-emerald-600/10",
            border: "border-emerald-500/30"
        },
        {
            title: "1-Click Native Payroll",
            desc: "Process complex Indian payroll configurations, calculate taxes, and disburse salaries—all without switching systems.",
            icon: <Calculator size={32} className="text-amber-400" />,
            color: "from-amber-900/40 to-amber-600/10",
            border: "border-amber-500/30"
        },
        {
            title: "Automated Compliance",
            desc: "PF, ESI, PT, and TDS filings generated automatically based on payroll runs. Zero error margin.",
            icon: <ShieldCheck size={32} className="text-rose-400" />,
            color: "from-rose-900/40 to-rose-600/10",
            border: "border-rose-500/30"
        }
    ];

    const current = tourSteps[step];

    return (
        <div className="min-h-screen bg-[#060D1A] flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#060D1A] to-[#060D1A]">

            <div className="absolute top-8 left-8 flex items-center gap-2 text-white font-bold text-xl tracking-tight">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm shadow-lg shadow-indigo-500/20">
                    K
                </div>
                Kaarya
            </div>

            <button onClick={() => router.push('/onboarding/checklist')} className="absolute top-8 right-8 text-[#556677] hover:text-white text-sm font-bold transition-colors">
                Skip Tour
            </button>

            <div className={`max-w-4xl w-full bg-[#0A1420]/80 backdrop-blur-xl border ${current.border} rounded-3xl overflow-hidden shadow-2xl transition-all duration-500`}>
                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Visual Side */}
                    <div className={`p-12 flex flex-col items-center justify-center bg-gradient-to-br ${current.color} transition-colors duration-500 relative min-h-[400px]`}>
                        <div className="w-24 h-24 rounded-2xl bg-[#060D1A] border border-white/10 flex items-center justify-center shadow-2xl mb-8 transform hover:scale-110 transition-transform cursor-pointer">
                            {current.icon}
                        </div>

                        {/* Abstract UI Representation */}
                        <div className="w-full max-w-sm bg-[#060D1A]/50 border border-white/10 rounded-xl p-4 backdrop-blur-sm space-y-3">
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
                            <div className="flex gap-1 mb-8">
                                {tourSteps.map((_, i) => (
                                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-indigo-500' : 'w-2 bg-[#1A2A3A]'}`} />
                                ))}
                            </div>

                            <h2 className="text-3xl font-black text-white mb-4 leading-tight">{current.title}</h2>
                            <p className="text-[#8899AA] text-lg leading-relaxed mb-8">
                                {current.desc}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                            <button
                                onClick={() => setStep(Math.max(0, step - 1))}
                                className={`text-sm font-bold transition-colors ${step === 0 ? 'text-transparent pointer-events-none' : 'text-[#556677] hover:text-white'}`}
                            >
                                Previous
                            </button>

                            {step < tourSteps.length - 1 ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="bg-white text-[#060D1A] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg shadow-white/10"
                                >
                                    Next <ArrowRight size={16} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => router.push('/onboarding/checklist')}
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/25"
                                >
                                    Get Started <CheckCircle2 size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
