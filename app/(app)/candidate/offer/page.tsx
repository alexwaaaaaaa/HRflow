"use client";
import React from 'react';
import { CheckCircle2, ArrowRight, Download, CreditCard, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CandidateOfferScreen() {
    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col items-center justify-center py-10 px-6">

            {/* Celebration Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-10 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <div className="w-20 h-20 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(79,70,229,0.3)]">
                    <Sparkles size={32} aria-hidden="true" />
                </div>
                <h1 className="text-5xl font-black text-white tracking-tight">Congratulations, Anita!</h1>
                <p className="text-[#8899AA] text-lg">We were incredibly impressed by your background and interviews. We are thrilled to invite you to join the HRFlow team.</p>
            </div>

            {/* Offer Summary Card */}
            <div className="w-full max-w-2xl bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" aria-hidden="true"></div>

                <div className="p-8 border-b border-[#1A2A3A] flex justify-between items-center relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Senior Frontend Engineer</h2>
                        <div className="text-indigo-400 font-bold text-sm">Engineering • Bengaluru (Hybrid)</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[#556677] text-xs font-bold uppercase tracking-wider mb-1">Proposed Start Date</div>
                        <div className="text-white font-bold text-lg">Mon, Dec 01, 2025</div>
                    </div>
                </div>

                <div className="p-8 space-y-6 relative z-10">
                    <div>
                        <div className="text-[#8899AA] text-sm mb-4">Compensation Summary</div>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg"><CreditCard size={24} aria-hidden="true" /></div>
                                <div>
                                    <div className="text-white font-bold text-lg">₹38,00,000</div>
                                    <div className="text-[#8899AA] text-xs mt-0.5">Annual Target CTC (Fixed + Variable)</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-emerald-400 font-bold text-lg">2,500 units</div>
                                <div className="text-[#8899AA] text-xs mt-0.5">Restricted Stock Units (RSU)</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="text-[#8899AA] text-sm mb-4">Included Benefits</div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" />
                                <span className="text-white text-sm font-semibold">Premium Health Insurance</span>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" />
                                <span className="text-white text-sm font-semibold">Unlimited PTO</span>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" />
                                <span className="text-white text-sm font-semibold">Home Office Setup Budget</span>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" />
                                <span className="text-white text-sm font-semibold">Relocation Assistance</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-[#1A2A3A] bg-[#060D1A] flex flex-col items-center justify-center gap-4 relative z-10">
                    <Link href="/candidate/accept" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-colors text-center shadow-[0_0_20px_rgba(79,70,229,0.4)] text-lg flex items-center justify-center gap-2">
                        Review Full Letter &amp; Accept <ArrowRight size={20} aria-hidden="true" />
                    </Link>
                    <Button variant="ghost" size="sm">
                        <Download size={14} aria-hidden="true" /> Download PDF Version
                    </Button>
                    <p className="text-[#556677] text-xs mt-2 text-center">Offer expires on Nov 15, 2025 at 11:59PM IST.</p>
                </div>
            </div>

            {/* Background confetti effect */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30" aria-hidden="true">
                <div className="absolute top-[20%] left-[10%] w-3 h-3 bg-rose-500 rounded-full blur-[2px]"></div>
                <div className="absolute top-[30%] right-[20%] w-4 h-4 bg-blue-500 rounded-full blur-[2px]"></div>
                <div className="absolute top-[60%] left-[30%] w-2 h-2 bg-emerald-500 rounded-full blur-[1px]"></div>
                <div className="absolute top-[40%] right-[30%] w-3 h-3 bg-amber-500 rounded-full blur-[2px]"></div>
            </div>
        </div>
    );
}
