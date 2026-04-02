"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FileSignature, ChevronRight, CheckCircle2, ShieldPlus, TrendingDown
} from "lucide-react";

export default function InsuranceEnrollmentScreen() {
    const [coverage, setCoverage] = useState(10); // Lakhs

    // Mock premium calc
    const basePremium = 350;
    const premium = coverage === 10 ? 350 : coverage === 15 ? 480 : 620;

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col items-center">

            <div className="w-full max-w-4xl text-left mb-6">
                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                    <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/finance/insurance/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Enrollment</span>
                </div>

                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <ShieldPlus className="w-8 h-8 text-amber-400" />
                    Enroll: GMC Super Top-up
                </h1>
                <p className="text-sm text-[#8899AA] mt-1">Configure your voluntary coverage and set up automatic payroll deductions.</p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6">1. Select Extra Coverage Limit</h2>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[10, 15, 20].map((val) => (
                                <div
                                    key={val}
                                    onClick={() => setCoverage(val)}
                                    className={`p-4 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${coverage === val ? 'border-amber-400 bg-amber-500/10' : 'border-[#2A3A4A] bg-[#1A2A3A]/40 hover:border-[#8899AA]'}`}
                                >
                                    <span className={`text-xl font-bold ${coverage === val ? 'text-amber-400' : 'text-white'}`}>₹{val}L</span>
                                    <span className="text-xs text-[#8899AA] mt-1">Extra Cover</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg text-sm text-[#8899AA] flex items-start gap-3">
                            <ShieldPlus className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                            <p>
                                This is a Super Top-up plan with a <strong className="text-white">₹5 Lakh deductible</strong>.
                                It kicks in automatically once your base employer GMC limit of ₹5 Lakhs is exhausted during a single policy year.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">2. Members Covered</h2>
                        <p className="text-sm text-[#8899AA] mb-4">
                            The super top-up will automatically inherit the same dependents registered under your primary corporate GMC plan.
                        </p>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 border border-[#2A3A4A] rounded text-sm bg-[#1A2A3A]/20">
                                <span className="text-white font-medium">Ananya Sharma</span>
                                <span className="text-xs px-2 py-1 bg-[#2A3A4A] text-[#8899AA] rounded">Self</span>
                            </div>
                            <div className="flex justify-between items-center p-3 border border-[#2A3A4A] rounded text-sm bg-[#1A2A3A]/20">
                                <span className="text-white font-medium">Rohan Sharma</span>
                                <span className="text-xs px-2 py-1 bg-[#2A3A4A] text-[#8899AA] rounded">Spouse</span>
                            </div>
                            <div className="flex justify-between items-center p-3 border border-[#2A3A4A] rounded text-sm bg-[#1A2A3A]/20">
                                <span className="text-white font-medium">Aarav Sharma</span>
                                <span className="text-xs px-2 py-1 bg-[#2A3A4A] text-[#8899AA] rounded">Child</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">3. Payroll Authorization</h2>

                        <label className="flex items-start gap-3 cursor-pointer mb-6">
                            <input type="checkbox" className="mt-1 bg-[#1A2A3A] border-[#2A3A4A] rounded text-emerald-500 focus:ring-0 focus:ring-offset-0" />
                            <div className="text-sm text-[#8899AA] leading-relaxed">
                                I authorize HRFlow to deduct <strong className="text-white">₹{premium}</strong> per month from my salary starting next payroll cycle towards the premium of this voluntary cover. I understand this deduction is pre-tax and subject to Section 80D tax benefits.
                            </div>
                        </label>

                        <button className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-white hover:bg-gray-200 text-black font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            <FileSignature className="w-5 h-5" /> Sign & Confirm Enrollment
                        </button>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-gradient-to-br from-[#1A2A3A]/40 to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 sticky top-8">
                        <h2 className="text-lg font-bold text-white mb-6">Premium Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Policy Tenure</span>
                                <span className="text-white font-medium">1 Year (Auto-renews)</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Corporate Discount</span>
                                <span className="text-emerald-400 font-medium">45% Applied</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Max Coverage</span>
                                <span className="text-white font-medium text-lg">₹{coverage} Lakhs</span>
                            </div>
                        </div>

                        <div className="bg-[#0B1221]/80 rounded-xl p-4 mb-4 border border-amber-500/30">
                            <p className="text-xs text-amber-500 mb-1 font-medium">Monthly Payroll Deduction</p>
                            <div className="text-3xl font-black text-white">₹{premium}</div>
                            <p className="text-xs text-[#8899AA] mt-1">+ applicable GST</p>
                        </div>

                        <div className="flex items-start gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                            <TrendingDown className="w-4 h-4 flex-shrink-0" />
                            <p>Saves you roughly ₹1,320 in income tax annually under Section 80D (assuming 30% bracket).</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
