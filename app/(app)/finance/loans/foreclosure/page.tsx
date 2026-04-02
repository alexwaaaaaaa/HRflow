"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    TrendingDown, ChevronRight, CheckCircle2, AlertTriangle, FastForward
} from "lucide-react";

export default function LoanForeclosureScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col items-center">

            <div className="w-full max-w-4xl text-left mb-6">
                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                    <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/finance/loans" className="hover:text-white transition-colors">Loans</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Foreclosure</span>
                </div>

                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <FastForward className="w-8 h-8 text-pink-400" />
                    Early Loan Foreclosure
                </h1>
                <p className="text-sm text-[#8899AA] mt-1">Process a lump sum payment to clear an active loan before its scheduled maturity.</p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">

                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-white">Rahul Kumar</h2>
                                <p className="text-[#8899AA] text-sm mt-1">Design Lead (EMP-091)</p>
                            </div>
                            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-xs font-bold tracking-widest uppercase">
                                Active Loan
                            </span>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 border-t border-[#1A2A3A] pt-6">
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1">Loan Account ID</p>
                                <p className="font-mono text-indigo-400">LN-8809</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1">Original Tenure</p>
                                <p className="text-white">36 Months</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1">Remaining</p>
                                <p className="text-pink-400 font-bold">24 Months</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1">Int. Rate</p>
                                <p className="text-white">8.5% p.a.</p>
                            </div>
                        </div>

                        <div className="bg-[#1A2A3A]/40 rounded-xl p-6 border border-[#2A3A4A]">
                            <h3 className="text-sm font-bold text-white mb-4">Foreclosure Calculation</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center pb-3 border-b border-[#2A3A4A]/50 text-sm">
                                    <span className="text-[#8899AA]">Outstanding Principal</span>
                                    <span className="text-white font-medium">₹3,33,333</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-[#2A3A4A]/50 text-sm">
                                    <span className="text-[#8899AA]">Interest Due (Current Month)</span>
                                    <span className="text-white font-medium">₹2,361</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-[#2A3A4A]/50 text-sm">
                                    <span className="flex items-center gap-2 text-[#8899AA]">
                                        Foreclosure Penalty (1%)
                                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                                    </span>
                                    <span className="text-pink-400 font-medium">₹3,333</span>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-white font-bold">Total Payout Required</span>
                                    <span className="text-emerald-400 font-bold text-xl">₹3,39,027</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Execution Payment</h2>
                        <p className="text-sm text-[#8899AA] mb-6">
                            The employer must receive the lump sum amount via NEFT/RTGS into the designated account before confirming this action.
                        </p>

                        <label className="flex items-start gap-3 cursor-pointer mb-6">
                            <input type="checkbox" className="mt-1 bg-[#1A2A3A] border-[#2A3A4A] rounded text-pink-500 focus:ring-0 focus:ring-offset-0" />
                            <div className="text-sm text-[#8899AA]">
                                I confirm having received <strong className="text-white">₹3,39,027</strong> in the company bank account via UTR
                                <input type="text" placeholder="Enter UTR No." className="ml-2 bg-[#0B1221] border border-[#2A3A4A] text-white px-2 py-1 rounded w-32 focus:border-pink-500 focus:outline-none h-6 text-xs" />
                            </div>
                        </label>

                        <button className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                            <CheckCircle2 className="w-5 h-5" /> Confirm Receipt & Foreclose Loan
                        </button>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-gradient-to-br from-pink-500/10 to-red-500/5 border border-pink-500/20 rounded-2xl p-6 sticky top-8">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-pink-400" />
                            <h2 className="text-lg font-bold text-white">Impact</h2>
                        </div>
                        <ul className="space-y-4 text-sm text-[#8899AA]">
                            <li className="flex gap-2">
                                <span className="text-pink-400 mt-1">•</span>
                                <span>Future EMIs will be unqueued from payroll for this employee immediately.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-pink-400 mt-1">•</span>
                                <span>The loan account status will change to <strong>Closed (Foreclosed)</strong>.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-pink-400 mt-1">•</span>
                                <span>Employee's Internal Credit Score will be positively impacted.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-pink-400 mt-1">•</span>
                                <span>An NOC will be automatically generated and made available in the NOC Ledger.</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
