"use client";
import React from 'react';
import { PiggyBank, BriefcaseBusiness, X } from 'lucide-react';

export default function FinancialNudgePage() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-[#0A1420] to-[#060D1A] border border-[#1A2A3A] rounded-2xl relative overflow-hidden shadow-2xl">
                {/* Header Image/Gradient */}
                <div className="h-32 bg-indigo-500/20 w-full relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.5)]">
                        <PiggyBank size={32} className="text-white" />
                    </div>
                    <button className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={20} /></button>
                </div>

                <div className="p-6 text-center">
                    <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 block">Tax Saving Nudge</span>
                    <h2 className="text-xl font-bold text-white mb-2">Maximize your 80C Limits</h2>
                    <p className="text-sm text-[#8899AA] mb-6">
                        You have declared ₹1.2L under Section 80C. Based on your current bracket, investing ₹30,000 more could save you exactly ₹9,360 in taxes!
                    </p>

                    <div className="bg-[#131B2B] rounded-xl p-4 flex items-center gap-4 text-left mb-6 border border-[#2A3A4A]">
                        <BriefcaseBusiness size={24} className="text-[#556677] shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-white">Suggested: ELSS Mutual Funds</p>
                            <p className="text-xs text-[#8899AA]">Lock-in period of 3 years.</p>
                        </div>
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors mb-3">
                        Update Tax Declaration
                    </button>
                    <button className="w-full text-sm text-[#556677] hover:text-[#8899AA] font-bold">
                        Remind Me Later
                    </button>
                </div>
            </div>
        </div>
    );
}
