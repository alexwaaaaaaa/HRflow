"use client";
import React, { useState } from 'react';
import { UserPlus, ArrowLeft, Copy, CheckCircle2, IndianRupee } from 'lucide-react';
import Link from 'next/link';

export default function ReferralStatusScreen() {
    const [copied, setCopied] = useState(false);
    const link = "https://careers.acme.com/ref/anita-k-942";

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Back to Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><UserPlus size={22} className="text-pink-400" /> Employee Referral Hub</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track your referred candidates and bonus progress.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-4">Your Active Referrals</h3>
                        <div className="space-y-4">
                            {/* Referral 1 */}
                            <div className="p-4 border border-[#1A2A3A] rounded-xl bg-[#060D1A] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">SK</div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Sanjay Kumar</h4>
                                        <div className="text-[#8899AA] text-xs">Applied: Senior Product Designer</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div>
                                        <div className="text-[#556677] text-[10px] uppercase font-bold text-right">Status</div>
                                        <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold"><CheckCircle2 size={14} /> Offered</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[#556677] text-[10px] uppercase font-bold">Estimated Bonus</div>
                                        <div className="text-white font-bold text-sm">₹50,000</div>
                                    </div>
                                </div>
                            </div>

                            {/* Referral 2 */}
                            <div className="p-4 border border-[#1A2A3A] rounded-xl bg-[#060D1A] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg">RJ</div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Riya Jain</h4>
                                        <div className="text-[#8899AA] text-xs">Applied: Frontend Engineer</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div>
                                        <div className="text-[#556677] text-[10px] uppercase font-bold text-right">Status</div>
                                        <div className="flex items-center gap-1.5 text-blue-400 text-sm font-bold"><div className="w-2 h-2 rounded-full bg-blue-400" /> Interviewing</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[#556677] text-[10px] uppercase font-bold">Estimated Bonus</div>
                                        <div className="text-white font-bold text-sm">₹40,000</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-pink-900/40 to-rose-900/40 border border-pink-500/30 rounded-2xl p-6 text-center">
                        <h3 className="text-pink-100 font-bold mb-2">Total Bonus Earned</h3>
                        <div className="flex items-center justify-center gap-1 text-4xl font-black text-white mb-2"><IndianRupee size={28} className="text-pink-400" /> 1,20,000</div>
                        <p className="text-pink-200/60 text-xs">Total payout across 3 successful hires since 2022.</p>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-4">Your Custom Link</h3>
                        <div className="flex items-center bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-1">
                            <input type="text" readOnly value={link} className="bg-transparent border-none outline-none text-[#8899AA] text-xs w-full px-3 py-2" />
                            <button onClick={handleCopy} className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white p-2 rounded transition-colors" title="Copy link">
                                {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                            </button>
                        </div>
                        <p className="text-[#556677] text-xs mt-3 leading-relaxed">Share this link directly with friends. Anyone who applies through it is automatically tagged as your referral.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
