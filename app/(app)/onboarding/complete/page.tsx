"use client";
import React, { useEffect, useState } from 'react';
import { PartyPopper, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SetupCompleteCelebrationScreen() {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Simple timeout to mock confetti trigger
        const timer = setTimeout(() => setShowConfetti(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col justify-center items-center p-6 relative overflow-hidden">

            {/* Celebration Background Effects */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${showConfetti ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-600/20 blur-[120px] rounded-full" />

                {/* CSS Confetti Mockup (In a real app, use react-confetti) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-3 h-3 rounded-sm ${['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'][Math.floor(Math.random() * 5)]}`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * -20}%`,
                                animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fall {
                    to { transform: translateY(100vh) rotate(720deg); }
                }
            `}} />

            <div className="max-w-xl w-full text-center relative z-10 animate-fade-in-up">

                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-full mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/30 border-4 border-[#060D1A] ring-4 ring-emerald-500/20 relative">
                    <PartyPopper className="text-white relative z-10 animate-bounce" size={48} />
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                </div>

                <h1 className="text-5xl font-black text-white mb-4 tracking-tight">You're All Set!</h1>
                <p className="text-xl text-[#8899AA] mb-12">
                    Welcome to the future of HR. Your workspace is fully configured, data is imported, and payroll is ready to roll.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-12 max-w-sm mx-auto">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4 flex flex-col items-center justify-center">
                        <div className="text-3xl font-black text-white mb-1">1,210</div>
                        <div className="text-xs text-[#556677] font-bold uppercase tracking-wider">Employees</div>
                    </div>
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4 flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 text-emerald-400 mb-1">
                            <CheckCircle2 size={24} />
                            <span className="text-3xl font-black">100%</span>
                        </div>
                        <div className="text-xs text-[#556677] font-bold uppercase tracking-wider">Compliant</div>
                    </div>
                </div>

                <button onClick={() => window.location.href = '/dashboard'} className="bg-white text-[#060D1A] px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center w-full sm:w-auto mx-auto gap-3 hover:bg-gray-100 transition-all hover:-translate-y-1 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    Go to Your Dashboard <ArrowRight size={20} />
                </button>

            </div>
        </div>
    );
}
