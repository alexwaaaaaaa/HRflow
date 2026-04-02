"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    RefreshCw, ChevronRight, Shield, AlertTriangle, CheckCircle2, ArrowRight
} from "lucide-react";

export default function InsuranceRenewalScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col items-center">

            <div className="w-full max-w-4xl text-left mb-6">
                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                    <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/finance/insurance/policy" className="hover:text-white transition-colors">Insurance</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Renewal</span>
                </div>

                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <RefreshCw className="w-8 h-8 text-emerald-400" />
                    Policy Renewal Portal
                </h1>
                <p className="text-sm text-[#8899AA] mt-1">Review and confirm your voluntary insurance covers for the upcoming policy year.</p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-2 space-y-6">

                    {/* Action required banner */}
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-bold text-amber-500 mb-1">Open Enrollment window is closing soon!</h2>
                            <p className="text-sm text-amber-500/80 mb-3">
                                You must confirm your voluntary policy renewals by <strong>31 Oct 2025</strong>. Otherwise, your cover for Parents and Super Top-up will lapse.
                            </p>
                        </div>
                    </div>

                    {/* Policy 1 : Parents Cover */}
                    <div className="bg-[#0D1928] border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-amber-500 text-[#0B1221] text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider uppercase">Action Needed</div>

                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white">Parents Mediclaim Cover</h3>
                                <p className="text-[#8899AA] text-sm mt-1">Current Cover: ₹3,00,000</p>
                            </div>
                        </div>

                        <div className="bg-[#1A2A3A]/40 rounded-xl p-4 mb-6 border border-[#2A3A4A]">
                            <h4 className="text-sm font-bold text-white mb-3">Proposed Renewal Terms (2025-26)</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#8899AA]">Cover Amount</span>
                                    <span className="text-white font-medium">₹3,00,000</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#8899AA]">Previous Premium</span>
                                    <span className="text-[#8899AA] line-through">₹1,200/mo</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                                        Revised Premium <span className="text-[10px] bg-emerald-500/20 px-1 py-0.5 rounded text-emerald-400">+10% Age Bracket Update</span>
                                    </span>
                                    <span className="text-white font-bold">₹1,320/mo</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors flex justify-center items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Opt For Renewal
                            </button>
                            <button className="px-4 py-2.5 bg-transparent border border-[#2A3A4A] hover:bg-[#1A2A3A] text-[#8899AA] hover:text-white text-sm font-medium rounded-lg transition-colors">
                                Opt Out
                            </button>
                        </div>
                    </div>

                    {/* Policy 2 : Super Top-up */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">

                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white">GMC Super Top-up</h3>
                                <p className="text-[#8899AA] text-sm mt-1">Current Cover: ₹10,00,000</p>
                            </div>
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold tracking-widest uppercase">
                                Opted In
                            </span>
                        </div>

                        <div className="bg-[#1A2A3A]/40 rounded-xl p-4 border border-[#2A3A4A]">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Renewal Premium</span>
                                <span className="text-white font-bold">₹350/mo (No Change)</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="md:col-span-1 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 sticky top-8">
                        <h3 className="text-lg font-bold text-white mb-6">Payroll Impact Summary</h3>

                        <div className="space-y-4 mb-6 pt-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Parents Cover</span>
                                <span className="text-emerald-400 font-medium">₹1,320/mo</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Super Top-up</span>
                                <span className="text-emerald-400 font-medium">₹350/mo</span>
                            </div>
                            <div className="pt-4 border-t border-[#1A2A3A] flex justify-between items-center">
                                <span className="text-white font-bold">New Monthly Deduction</span>
                                <span className="text-2xl font-black text-white">₹1,670</span>
                            </div>
                        </div>

                        <button className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-white hover:bg-gray-200 text-black font-semibold rounded-lg transition-colors">
                            Submit Final Confirmations <ArrowRight className="w-4 h-4 border-black" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
