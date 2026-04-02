"use client";
import React, { useState, useEffect } from 'react';
import { Blocks, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InstallIntegrationPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    useEffect(() => {
        if (step === 2) {
            const timer = setTimeout(() => setStep(3), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="min-h-screen bg-[#060D1A] flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 relative overflow-hidden shadow-2xl">

                <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-500/20">
                        K
                    </div>
                    <div className="flex gap-2 items-center text-[#556677]">
                        <span className="w-2 h-2 rounded-full bg-[#1A2A3A]" />
                        <span className="w-2 h-2 rounded-full bg-[#1A2A3A]" />
                        <span className="w-2 h-2 rounded-full bg-[#1A2A3A]" />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-[#060D1A] border border-[#1A2A3A] flex items-center justify-center">
                        <Blocks className="text-blue-500" size={32} />
                    </div>
                </div>

                {step === 1 && (
                    <div className="text-center animate-fade-in">
                        <h2 className="text-2xl font-bold text-white mb-2">Connect Jira Software</h2>
                        <p className="text-sm text-[#8899AA] mb-8 leading-relaxed px-4">
                            Jira is requesting access to your Kaarya workspace. It will be able to read Employee Profiles and write Performance goal status.
                        </p>
                        <div className="space-y-4">
                            <button onClick={() => setStep(2)} className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25">
                                Authorize Application
                            </button>
                            <button onClick={() => router.back()} className="w-full text-sm text-[#556677] hover:text-[#8899AA] font-bold">
                                Cancel Integration
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="text-center py-6 animate-fade-in">
                        <Loader2 className="animate-spin text-blue-500 mx-auto mb-4" size={40} />
                        <h2 className="text-lg font-bold text-white mb-1">Exchanging Tokens...</h2>
                        <p className="text-sm text-[#556677]">Establishing secure connection.</p>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center animate-fade-in">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/50">
                            <CheckCircle2 className="text-emerald-400" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Integration Success!</h2>
                        <p className="text-sm text-[#8899AA] mb-8 leading-relaxed px-4">
                            Jira Software has been successfully connected to your Kaarya workspace. You can now map projects.
                        </p>
                        <button onClick={() => router.push('/settings/integrations')} className="w-full bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-6 py-3 rounded-xl font-bold transition-all flex justify-center items-center gap-2">
                            Go to App Settings <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
