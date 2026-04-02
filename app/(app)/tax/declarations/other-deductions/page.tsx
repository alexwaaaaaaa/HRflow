"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    ChevronRight,
    Info,
    GraduationCap,
    Heart,
    PiggyBank,
    BadgePlus,
    PlaneTakeoff,
    Lightbulb,
    CheckCircle2,
    AlertTriangle,
    UploadCloud,
    Plus
} from "lucide-react";

export default function OtherDeductionsPage() {
    const [eduLoanInterest, setEduLoanInterest] = useState(0); // 80E
    const [savingsInterest, setSavingsInterest] = useState(3400); // 80TTA
    const [ltaClaimed, setLtaClaimed] = useState(28000); // LTA
    const [donations, setDonations] = useState([
        { id: 1, name: "PM Relief Fund", amount: 10000, type: "100%", deduction: 10000 }
    ]);
    const total80G = donations.reduce((sum, item) => sum + item.deduction, 0);

    const totalOther = eduLoanInterest + savingsInterest + ltaClaimed + total80G;
    const additionalTaxSaved = totalOther * 0.22;

    // AI Scanner state
    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setScanning(false);
        }, 3000); // 3 seconds scan
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#0A1420] text-slate-200 font-sans p-6 pb-24">
            {/* HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                    <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/tax/declarations" className="hover:text-white transition-colors">Declarations</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-200">Other Deductions</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Other Tax Deductions</h1>
                        <p className="text-slate-400">Sections Chapter VI-A (80E, 80G, 80TTA, 80U) & Section 10 exemptions</p>
                    </div>
                    <div className="bg-[#FFB800]/10 border border-[#FFB800]/20 px-4 py-3 rounded-lg flex items-center gap-3">
                        <Info className="w-5 h-5 text-[#FFB800]" />
                        <p className="text-sm font-medium text-[#FFB800]">These sections are frequently overlooked. Check carefully.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* LEFT PANEL: SECTIONS (720px equivalent) */}
                <div className="xl:col-span-8 border-l-2 border-slate-800 pl-6 space-y-10">

                    {/* SECTION 80E */}
                    <section className="relative">
                        <div className="absolute -left-[45px] top-0.5 bg-[#0066FF]/20 border border-[#0066FF]/50 w-10 h-10 rounded-full flex items-center justify-center text-[#0066FF] ring-4 ring-[#0A1420]">
                            <GraduationCap className="w-5 h-5" />
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">80E — Education Loan Interest</h2>
                        <p className="text-sm text-slate-400 mb-4">No upper limit on deduction — full interest claimable for up to 8 years.</p>

                        <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Loan Taken For</label>
                                <div className="flex items-center gap-2 bg-[#0A1420] p-1 rounded-lg border border-white/5 w-fit">
                                    <button className="px-4 py-1.5 text-xs font-bold rounded bg-[#0066FF] text-white">Self</button>
                                    <button className="px-3 py-1.5 text-xs font-bold rounded text-slate-400 hover:text-white transition-colors">Spouse</button>
                                    <button className="px-3 py-1.5 text-xs font-bold rounded text-slate-400 hover:text-white transition-colors">Children</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Annual Interest Paid</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                    <input
                                        type="number"
                                        value={eduLoanInterest || ''}
                                        onChange={(e) => setEduLoanInterest(Number(e.target.value))}
                                        placeholder="e.g. 50000"
                                        className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Bank/Institution</label>
                                <input type="text" placeholder="e.g. State Bank of India" className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Proof: Bank Interest Certificate</label>
                                <button className="w-full p-2.5 border border-dashed border-white/20 text-[#0066FF] hover:bg-[#0066FF]/5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors font-medium">
                                    <UploadCloud className="w-4 h-4" /> Upload PDF
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 80G */}
                    <section className="relative">
                        <div className="absolute -left-[45px] top-0.5 bg-[#00E5A0]/20 border border-[#00E5A0]/50 w-10 h-10 rounded-full flex items-center justify-center text-[#00E5A0] ring-4 ring-[#0A1420]">
                            <Heart className="w-5 h-5" />
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">80G — Charitable Donations</h2>
                        <p className="text-sm text-slate-400 mb-4">100% or 50% deduction depending on fund/institution. PAN of NGO is mandatory.</p>

                        <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6">

                            <div className="space-y-3 mb-4">
                                {donations.map(d => (
                                    <div key={d.id} className="bg-[#0A1420] border border-white/5 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{d.name}</h4>
                                            <p className="text-xs text-[#00E5A0] mt-0.5 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {d.type} Deductible Category</p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-xs text-slate-500 mb-0.5">Donated Amount</p>
                                                <p className="font-mono text-sm text-white">₹{d.amount.toLocaleString('en-IN')}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-slate-500 mb-0.5">Eligible Deduction</p>
                                                <p className="font-mono text-sm font-bold text-[#00E5A0]">₹{d.deduction.toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="flex-1 p-3 border border-dashed border-white/20 text-slate-400 hover:text-white rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                                    <Plus className="w-4 h-4" /> Add Prime Minister's Relief Fund
                                </button>
                                <button className="flex-1 p-3 border border-dashed border-white/20 text-slate-400 hover:text-white rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                                    <Plus className="w-4 h-4" /> Add NGO / Trust Donation
                                </button>
                            </div>

                        </div>
                    </section>

                    {/* SECTION 80TTA */}
                    <section className="relative">
                        <div className="absolute -left-[45px] top-0.5 bg-[#FFB800]/20 border border-[#FFB800]/50 w-10 h-10 rounded-full flex items-center justify-center text-[#FFB800] ring-4 ring-[#0A1420]">
                            <PiggyBank className="w-5 h-5" />
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">80TTA — Savings Account Interest</h2>
                        <p className="text-sm text-slate-400 mb-4">Deduction up to ₹10,000 on interest from savings accounts (NOT Fixed Deposits).</p>

                        <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6 flex items-center justify-between gap-6">
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Interest income from savings</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                    <input
                                        type="number"
                                        value={savingsInterest}
                                        onChange={(e) => setSavingsInterest(Number(e.target.value))}
                                        className="w-full max-w-xs bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm font-bold text-white focus:outline-none focus:border-[#FFB800]"
                                    />
                                </div>
                            </div>
                            <div className="bg-[#0A1420] px-6 py-4 rounded-lg border border-[#FFB800]/20 text-center">
                                <p className="text-xs text-slate-400 mb-1">Allowed Deduction</p>
                                <p className="font-mono text-xl font-bold text-[#FFB800]">₹{Math.min(savingsInterest, 10000).toLocaleString('en-IN')}</p>
                                {savingsInterest > 10000 && <p className="text-[10px] text-slate-500 mt-1">Capped at ₹10,000</p>}
                            </div>
                        </div>
                    </section>

                    {/* SECTION LTA */}
                    <section className="relative">
                        <div className="absolute -left-[45px] top-0.5 bg-purple-500/20 border border-purple-500/50 w-10 h-10 rounded-full flex items-center justify-center text-purple-400 ring-4 ring-[#0A1420]">
                            <PlaneTakeoff className="w-5 h-5" />
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">Section 10(5) — LTA Exemption</h2>
                        <p className="text-sm text-slate-400 mb-4">Leave Travel Allowance. 2 domestic journeys claimable in a 4-year block (Current Block: 2022–2025).</p>

                        <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6">

                            {/* LTA Policy Summary */}
                            <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 mb-6 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-bold text-white">LTA component in salary structure: <span className="font-mono text-purple-400">₹50,000/yr</span></p>
                                    <p className="text-xs text-slate-400 mt-1">You have claimed <b className="text-white">1</b> out of 2 allowed journeys for Block 2022-25.</p>
                                </div>
                            </div>

                            {/* Claim 1 */}
                            <div className="bg-[#0A1420] border border-white/10 rounded-lg p-5 mb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                        <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs">Journey 1</span>
                                        Bangalore ✈️ Goa
                                    </h4>
                                    <span className="px-2 py-1 bg-[#00E5A0]/10 text-[#00E5A0] text-[10px] font-bold uppercase rounded">Claimed & Approved</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">Travel Dates</p>
                                        <p className="text-slate-300">14 Apr - 22 Apr &apos;24</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">Mode of Travel</p>
                                        <p className="text-slate-300">Air Economy (IndiGo)</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">Claim Amount</p>
                                        <p className="font-mono font-bold text-white">₹28,000</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full p-4 border border-dashed border-purple-500/30 text-purple-400 hover:bg-purple-500/10 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors font-bold">
                                <Plus className="w-5 h-5" /> Add Second Journey for Exemption
                            </button>
                        </div>
                    </section>

                    {/* SECTION 80U */}
                    <section className="relative">
                        <div className="absolute -left-[45px] top-0.5 bg-slate-700 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 ring-4 ring-[#0A1420]">
                            <BadgePlus className="w-5 h-5" />
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1 text-slate-400">80U — Disability of Self</h2>
                                <p className="text-sm text-slate-500 mb-4">Flat deduction of ₹75,000 or ₹1,25,000 depending on severity.</p>
                            </div>
                            <div className="flex items-center gap-2 bg-[#1A2A3A] p-1 rounded-lg border border-white/5 w-fit">
                                <button className="px-4 py-1.5 text-xs font-bold rounded text-slate-400 hover:text-white transition-colors">Yes</button>
                                <button className="px-4 py-1.5 text-xs font-bold rounded bg-slate-700 text-white">Not Applicable</button>
                            </div>
                        </div>
                    </section>

                </div>

                {/* RIGHT PANEL: AI SCANNER & SUMMARY (464px equivalent) */}
                <div className="xl:col-span-4 space-y-6">

                    {/* AI SCANNER */}
                    <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] rounded-xl border border-white/10 shadow-xl overflow-hidden sticky top-6">

                        <div className="p-5 border-b border-white/5 bg-[#00E5A0]/5 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-[#00E5A0] animate-pulse" />
                            <h3 className="font-bold text-[#00E5A0] text-lg">AI Savings Scanner</h3>
                        </div>

                        <div className="p-6 relative">
                            {scanning ? (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 border-4 border-[#00E5A0]/20 border-t-[#00E5A0] rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-sm font-bold text-white mb-2">Scanning your profile...</p>
                                    <p className="text-xs text-slate-400 animate-pulse">Analyzing payroll, past declarations, and tax rules.</p>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-start gap-3 bg-[#0A1420] p-3 rounded-lg border border-[#00E5A0]/20">
                                        <CheckCircle2 className="w-4 h-4 text-[#00E5A0] mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold text-[#00E5A0] mb-0.5">80G Optimized</p>
                                            <p className="text-[11px] text-slate-400">PM Relief Fund is 100% exempt without 10% income cap restriction.</p>
                                        </div>
                                    </div>

                                    {eduLoanInterest === 0 && (
                                        <div className="flex items-start gap-3 bg-[#0A1420] p-3 rounded-lg border border-red-500/20">
                                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-xs font-bold text-red-400 mb-0.5">Missing 80E (Education Loan)</p>
                                                <p className="text-[11px] text-slate-400">No claim found. If you have an education loan, interest is 100% tax-free.</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3 bg-[#0A1420] p-3 rounded-lg border border-yellow-500/20">
                                        <PlaneTakeoff className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold text-yellow-500 mb-0.5">LTA Utilization Warning</p>
                                            <p className="text-[11px] text-slate-400">You have 1 journey left in the 2022-25 block. Current block ends on Dec 31, 2025.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* TOTAL SUMMARY */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-5 border-b border-white/10 pb-4">Other Deductions Summary</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-slate-300">
                                <span>80E (Education Loan)</span>
                                <span className="font-mono">₹{eduLoanInterest.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>80G (Donations)</span>
                                <span className="font-mono">₹{total80G.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>80TTA (Savings Interest)</span>
                                <span className="font-mono">₹{Math.min(savingsInterest, 10000).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>LTA Exemption</span>
                                <span className="font-mono">₹{ltaClaimed.toLocaleString('en-IN')}</span>
                            </div>

                            <div className="pt-3 border-t border-white/10 mt-2">
                                <div className="flex justify-between text-white font-bold text-base mb-1">
                                    <span>Total Other Deductions</span>
                                    <span className="font-mono">₹{totalOther.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-[#00E5A0] font-bold">
                                    <span className="text-sm">Additional Tax Saved (22%)</span>
                                    <span className="font-mono text-lg">₹{Math.round(additionalTaxSaved).toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
