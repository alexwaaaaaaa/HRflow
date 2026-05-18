"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Landmark, ArrowLeft, ArrowRight, Wallet, Percent, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function MyFinanceScreen() {
    return (
        <Page
            title="My Finances"
            subtitle="Manage salary accounts, advance salary, and statutory deposits."
            breadcrumbs={[{ label: "Self Service", href: "/self-service" }, { label: "Finance" }]}
            maxWidth="1300px"
        >

        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Back to Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Landmark size={22} className="text-amber-400" /> My Finances</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage salary accounts, advance salary, and statutory deposits.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-6">
                    {/* Direct Deposit */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-4">
                            <h3 className="text-white font-bold flex items-center gap-2"><Wallet size={18} className="text-[#556677]" /> Salary Account</h3>
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">Verified</span>
                        </div>
                        <div>
                            <div className="text-[#8899AA] text-xs uppercase tracking-wider font-bold mb-1">HDFC Bank Ltd.</div>
                            <div className="text-white font-mono text-lg mb-4">XXXX XXXX 4521</div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#556677]">IFSC Code</span>
                                <span className="text-[#AABBCC]">HDFC0001234</span>
                            </div>
                            <div className="mt-6 flex gap-2">
                                <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2 rounded-lg text-xs transition-colors">Update Bank</button>
                            </div>
                        </div>
                    </div>

                    {/* EPF Info */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-4">
                            <h3 className="text-white font-bold flex items-center gap-2"><ShieldCheck size={18} className="text-[#556677]" /> PF Account details</h3>
                        </div>
                        <div>
                            <div className="text-[#8899AA] text-xs uppercase tracking-wider font-bold mb-1">UAN Number</div>
                            <div className="text-white font-mono text-lg mb-4">1009 8453 2100</div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#556677]">PF Member ID</span>
                                <span className="text-[#AABBCC]">TNMAS0012345678</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-gradient-to-r from-[#0A1420] to-[#131B2B] border border-[#2A3A4A] rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-start h-full justify-between">
                            <div>
                                <div className="text-amber-400 font-black text-sm uppercase tracking-wider flex items-center gap-2 mb-2"><Percent size={14} /> Earned Wage Access</div>
                                <h2 className="text-3xl font-bold text-white mb-2">Need an advance?</h2>
                                <p className="text-[#8899AA] max-w-sm text-sm leading-relaxed mb-6">Withdraw up to 50% of your earned salary for the month instantly. Zero interest, flat convenience fee.</p>
                            </div>

                            <div className="w-full bg-[#060D1A] border border-[#1A2A3A] rounded-xl p-5 flex items-center justify-between">
                                <div>
                                    <div className="text-[#556677] text-xs font-bold uppercase mb-1">Available to withdraw</div>
                                    <div className="text-white font-black text-2xl">₹68,400</div>
                                </div>
                                <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                                    Withdraw Now <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
