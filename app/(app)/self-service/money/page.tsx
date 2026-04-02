"use client";
import React, { useState } from 'react';
import { IndianRupee, ArrowLeft, TrendingUp, Briefcase, ChevronRight, Lock, Download } from 'lucide-react';
import Link from 'next/link';

export default function MyMoneyScreen() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Back to Dashboard</Link>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><IndianRupee size={22} className="text-emerald-400" /> My Total Rewards</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Holistic view of your compensation, benefits, and long-term equity.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-6">Annual Compensation (FY 2025-26)</h3>
                        <div className="flex items-end gap-6 mb-8">
                            <div className="text-5xl font-black text-emerald-400">₹33,36,000</div>
                            <div className="text-[#8899AA] text-sm font-bold mb-1">Total Target CTC</div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-white font-semibold">Fixed Base Pay</span>
                                <span className="text-[#AABBCC]">₹24,00,000</span>
                            </div>
                            <div className="w-full h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '72%' }} />
                            </div>

                            <div className="flex justify-between items-center text-sm mt-4">
                                <span className="text-white font-semibold">Flexible Benefits (FBP)</span>
                                <span className="text-[#AABBCC]">₹4,80,000</span>
                            </div>
                            <div className="w-full h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '14%' }} />
                            </div>

                            <div className="flex justify-between items-center text-sm mt-4">
                                <span className="text-white font-semibold flex items-center gap-2">Target Variable Pay <Lock size={12} className="text-[#556677]" /></span>
                                <span className="text-[#AABBCC]">₹3,00,000</span>
                            </div>
                            <div className="w-full h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                                <div className="bg-amber-400 h-full rounded-full" style={{ width: '9%' }} />
                            </div>

                            <div className="flex justify-between items-center text-sm mt-4">
                                <span className="text-white font-semibold">Retirals (PF & Gratuity)</span>
                                <span className="text-[#AABBCC]">₹1,56,000</span>
                            </div>
                            <div className="w-full h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                                <div className="bg-blue-400 h-full rounded-full" style={{ width: '5%' }} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 text-indigo-500/10"><TrendingUp size={160} /></div>
                        <div className="relative z-10">
                            <h3 className="text-indigo-300 font-bold mb-1 text-sm uppercase tracking-wider">Equity & ESOPs</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-3xl font-black text-white">4,500 <span className="text-xl text-indigo-400 font-semibold">Options</span></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div>
                                    <div className="text-[#8899AA] text-xs">Vested (Exerciseable)</div>
                                    <div className="text-white font-bold text-lg mt-0.5">2,250</div>
                                </div>
                                <div>
                                    <div className="text-[#8899AA] text-xs">Unvested</div>
                                    <div className="text-white font-bold text-lg mt-0.5">2,250</div>
                                </div>
                                <div>
                                    <div className="text-[#8899AA] text-xs">Strike Price</div>
                                    <div className="text-white font-bold text-lg mt-0.5">₹10.00</div>
                                </div>
                                <div>
                                    <div className="text-[#8899AA] text-xs">Current Est. Value</div>
                                    <div className="text-emerald-400 font-bold text-lg mt-0.5">~ ₹1.2 Cr</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="text-white font-bold mb-4">Other Benefits Value</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-[#1A2A3A] pb-3">
                                <div>
                                    <div className="text-white text-sm font-semibold">Health Insurance</div>
                                    <div className="text-[#556677] text-xs mt-0.5">Family Floater (₹5L)</div>
                                </div>
                                <div className="text-emerald-400 font-bold text-sm">₹24,500/yr</div>
                            </div>
                            <div className="flex justify-between items-center border-b border-[#1A2A3A] pb-3">
                                <div>
                                    <div className="text-white text-sm font-semibold">Internet Allowance</div>
                                    <div className="text-[#556677] text-xs mt-0.5">Direct Reimbursement</div>
                                </div>
                                <div className="text-emerald-400 font-bold text-sm">₹12,000/yr</div>
                            </div>
                            <div className="flex justify-between items-center pb-1">
                                <div>
                                    <div className="text-white text-sm font-semibold">L+D Budget</div>
                                    <div className="text-[#556677] text-xs mt-0.5">Courses & Certifications</div>
                                </div>
                                <div className="text-emerald-400 font-bold text-sm">₹50,000/yr</div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#1A2A3A]">
                            <div className="flex justify-between text-[#8899AA] text-xs font-bold uppercase">
                                <span>Total True Value</span>
                                <span className="text-emerald-400 text-sm">₹34,22,500</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="text-white font-bold mb-4">Actions</h3>
                        <div className="space-y-2">
                            <Link href="/self-service/tax" className="flex items-center justify-between p-3 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl transition-colors group">
                                <span className="text-white text-sm font-semibold">Tax Planning</span>
                                <ChevronRight size={16} className="text-[#556677] group-hover:text-emerald-400" />
                            </Link>
                            <button className="w-full flex items-center justify-between p-3 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl transition-colors group">
                                <span className="text-white text-sm font-semibold">Download Comp Letter</span>
                                <Download size={16} className="text-[#556677] group-hover:text-emerald-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
