"use client";
import React from 'react';
import { HeartPulse, CheckCircle2, TrendingUp } from 'lucide-react';

export default function WellnessAlertPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-gradient-to-br from-[#0A1420] to-emerald-900/10 border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(16,185,129,0.1)] text-center animate-fade-in">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />

                <div className="relative z-10 mb-6">
                    <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce-soft">
                        <HeartPulse className="text-emerald-400" size={40} />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Step Goal Reached!</h2>
                <p className="text-[#8899AA] text-base mb-8 leading-relaxed max-w-sm mx-auto">
                    Amazing job! You hit your streak of 10,000 steps for 5 consecutive days. Your physical wellness score is going up.
                </p>

                <div className="flex items-center justify-between bg-[#060D1A] border border-[#1A2A3A] rounded-xl p-4 mb-8">
                    <div className="text-left">
                        <p className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-1">Kaarya Points</p>
                        <p className="text-xl font-bold text-white flex items-center gap-2"><TrendingUp size={16} className="text-emerald-400" /> +250</p>
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-1">Weekly Streak</p>
                        <p className="text-xl font-bold text-white">5 Days</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-[#060D1A]">
                        <CheckCircle2 size={24} />
                    </div>
                </div>

                <div className="flex gap-3 relative z-10 justify-center">
                    <button className="bg-emerald-500 hover:bg-emerald-400 text-[#060D1A] px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5">
                        Claim Points
                    </button>
                    <button className="px-6 py-3 border border-[#2A3A4A] bg-[#131B2B] hover:bg-[#1A2A3A] text-white rounded-xl font-semibold transition-colors">
                        Close
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes bounce-soft {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-soft {
                    animation: bounce-soft 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
