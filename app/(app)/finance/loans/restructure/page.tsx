"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    GitMerge, ChevronRight, CheckCircle2, AlertCircle, RefreshCw
} from "lucide-react";

export default function LoanRestructureScreen() {
    const [newTenure, setNewTenure] = useState(24);

    // Mock vars based on Ln-8790
    const principalBal = 250000;
    const oldEmi = 14000;
    const intRate = 8.5; // p.a.
    const monthlyRate = intRate / 12 / 100;

    const newEmi = principalBal * monthlyRate * Math.pow(1 + monthlyRate, newTenure) / (Math.pow(1 + monthlyRate, newTenure) - 1);

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col items-center">

            <div className="w-full max-w-4xl text-left mb-6">
                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                    <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/finance/loans" className="hover:text-white transition-colors">Loans</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Restructure</span>
                </div>

                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <GitMerge className="w-8 h-8 text-amber-400" />
                    Restructure Loan Account
                </h1>
                <p className="text-sm text-[#8899AA] mt-1">Modify EMI amounts by extending or reducing the remaining tenure of an active loan.</p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">

                        <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                            <div>
                                <h2 className="text-xl font-bold text-white">Sneha Rao</h2>
                                <p className="text-[#8899AA] text-sm mt-1">HR Generalist (EMP-112)</p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-indigo-400 font-bold">LN-8790</p>
                                <p className="text-amber-500 text-xs mt-1">Target Account</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-white mb-4">Current Outstanding</h3>
                            <div className="bg-[#1A2A3A]/40 rounded-xl p-4 border border-[#2A3A4A] flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Principal Balance</span>
                                <span className="text-white font-bold text-xl">₹2,50,000</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <RefreshCw className="w-4 h-4 text-emerald-400" /> New Payment Terms
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-medium text-[#8899AA]">New Remaining Tenure</label>
                                        <span className="text-emerald-400 font-bold">{newTenure} Months</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="6" max="60" step="1"
                                        value={newTenure}
                                        onChange={(e) => setNewTenure(Number(e.target.value))}
                                        className="w-full h-2 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                    <div className="flex justify-between text-xs text-[#8899AA] mt-2">
                                        <span>6 mo</span>
                                        <span>Original: 20 mo</span>
                                        <span>60 mo</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#8899AA] mb-2">Reason for Restructuring</label>
                                    <textarea
                                        rows={2}
                                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                                        placeholder="Financial hardship, salary revision, etc."
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">

                        <label className="flex items-start gap-3 cursor-pointer mb-6">
                            <input type="checkbox" className="mt-1 bg-[#1A2A3A] border-[#2A3A4A] rounded text-emerald-500 focus:ring-0 focus:ring-offset-0" />
                            <div className="text-sm text-[#8899AA]">
                                I confirm having obtained physical/digital approval from the employee acknowledging the new EMI schedule and revised interest implications.
                            </div>
                        </label>

                        <button className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-[#0B1221] font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                            <CheckCircle2 className="w-5 h-5" /> Apply Restructure Strategy
                        </button>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-gradient-to-br from-[#1A2A3A]/40 to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 sticky top-8">
                        <h2 className="text-lg font-bold text-white mb-6">EMI Projection Comparison</h2>

                        <div className="space-y-6">

                            <div className="p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 opacity-60">
                                <p className="text-xs text-[#8899AA] mb-1">Old Monthly EMI</p>
                                <div className="text-2xl font-bold text-white line-through decoration-pink-500">₹{oldEmi.toLocaleString()}</div>
                                <p className="text-xs text-[#8899AA] mt-1">For 20 months</p>
                            </div>

                            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                <p className="text-xs text-emerald-400 font-medium mb-1 flex justify-between">
                                    <span>New Monthly EMI</span>
                                    {newEmi < oldEmi ? (
                                        <span className="bg-emerald-500/20 px-1.5 py-0.5 rounded">-₹{(oldEmi - newEmi).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                    ) : (
                                        <span className="bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded">+₹{(newEmi - oldEmi).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                    )}
                                </p>
                                <div className="text-3xl font-black text-white">₹{newEmi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                <p className="text-xs text-[#8899AA] mt-1">For {newTenure} months at {intRate}% p.a.</p>
                            </div>

                            <div className="pt-4 border-t border-[#2A3A4A]">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#8899AA]">Net Interest Impact</span>
                                    <span className={newTenure > 20 ? 'text-pink-400' : 'text-emerald-400'}>
                                        {newTenure > 20 ? 'Pays more interest' : 'Saves interest'}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
