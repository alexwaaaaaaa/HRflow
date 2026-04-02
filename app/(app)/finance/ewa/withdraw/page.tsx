"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    WalletCards, ChevronRight, AlertTriangle, CheckCircle2, Lock, ArrowRight
} from "lucide-react";

export default function EWAWithdrawalScreen() {
    const [amount, setAmount] = useState<string>("5000");
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1 = input, 2 = review, 3 = success
    const maxLimit = 37500;
    const processingFee = parseInt(amount) * 0.01;
    const netDeposit = parseInt(amount) - processingFee;

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col items-center">

            <div className="w-full max-w-2xl text-left mb-6">
                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-4">
                    <Link href="/finance/ewa" className="hover:text-white transition-colors">EWA</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Withdraw Funds</span>
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">On-Demand Withdrawal</h1>
            </div>

            <div className="w-full max-w-2xl bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                {/* Stepper logic */}
                {step === 1 && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">How much do you need?</h2>
                            <div className="bg-[#00E5FF]/10 text-[#00E5FF] px-3 py-1.5 rounded-lg text-sm font-semibold">
                                Max available: ₹{maxLimit.toLocaleString()}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Enter Amount (₹)</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-2xl text-[#8899AA]">₹</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-[#1A2A3A] border-2 border-[#2A3A4A] focus:border-[#00E5FF] text-white text-3xl font-bold rounded-xl py-6 pl-14 pr-6 transition-colors shadow-inner"
                                    max={maxLimit}
                                />
                            </div>

                            {/* Preset Buttons */}
                            <div className="flex gap-3 mt-4">
                                {[5000, 10000, 20000, maxLimit].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setAmount(val.toString())}
                                        className="flex-1 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        ₹{val === maxLimit ? 'Max' : (val / 1000) + 'k'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 mb-8">
                            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <p className="text-sm text-amber-500/90 leading-relaxed">
                                Note: This amount will be deducted from your next salary payout on November 1st.
                            </p>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            disabled={!amount || parseInt(amount) > maxLimit || parseInt(amount) < 100}
                            className="w-full py-4 bg-[#00E5FF] hover:bg-[#00C5DD] disabled:bg-[#1A2A3A] disabled:text-[#8899AA] text-[#0B1221] font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            Review Details <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in slide-in-from-right-8 fade-in duration-300">
                        <button onClick={() => setStep(1)} className="text-[#8899AA] text-sm font-medium hover:text-white mb-6 flex items-center gap-1">
                            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Edit
                        </button>

                        <h2 className="text-xl font-bold text-white mb-6">Review & Confirm</h2>

                        <div className="bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl p-5 mb-6">
                            <div className="flex justify-between py-2 border-b border-[#2A3A4A]">
                                <span className="text-[#8899AA]">Requested Amount</span>
                                <span className="text-white font-medium">₹{parseInt(amount).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#2A3A4A]">
                                <span className="text-[#8899AA]">Processing Fee (1%)</span>
                                <span className="text-pink-400 font-medium">- ₹{processingFee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between py-3 mt-2">
                                <span className="text-white font-bold text-lg">Net Deposit to Bank</span>
                                <span className="text-emerald-400 font-bold text-xl">₹{netDeposit.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="p-4 border border-[#2A3A4A] rounded-xl bg-[#1A2A3A] flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-[#0B1221] rounded-lg flex items-center justify-center border border-[#2A3A4A]">
                                <WalletCards className="w-6 h-6 text-[#8899AA]" />
                            </div>
                            <div>
                                <p className="text-[#8899AA] text-xs">Depositing to primary salary account:</p>
                                <p className="text-white font-medium text-sm">HDFC Bank •••• 4021</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 mb-8">
                            <input type="checkbox" id="consent" className="mt-1" defaultChecked />
                            <label htmlFor="consent" className="text-xs text-[#8899AA] leading-relaxed">
                                I understand that this amount is an advance on my earned wages and will be recovered in full from my next payroll cycle.
                                By confirming, I authorize HRFlow to deduct ₹{parseInt(amount).toLocaleString()} + applicable taxes from my net pay.
                            </label>
                        </div>

                        <button
                            onClick={() => setStep(3)}
                            className="w-full py-4 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                        >
                            <Lock className="w-5 h-5" />
                            Confirm & Transfer Instantly
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in zoom-in text-center py-8 duration-500">
                        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Transfer Initiated!</h2>
                        <p className="text-[#8899AA] mb-8 max-w-sm mx-auto">
                            ₹{netDeposit.toLocaleString()} is on its way to your HDFC Bank account via IMPS. It usually takes less than 2 minutes.
                        </p>

                        <div className="bg-[#1A2A3A]/40 rounded-xl p-4 mb-8 border border-[#2A3A4A] w-64 mx-auto text-left">
                            <div className="text-xs text-[#8899AA] mb-1">Transaction ID</div>
                            <div className="font-mono text-[#00E5FF] font-medium text-sm">TXN-IMPS-8A9F2001</div>
                        </div>

                        <Link href="/finance/ewa" className="inline-block py-3 px-8 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white font-medium rounded-xl transition-colors">
                            Return to Dashboard
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}
