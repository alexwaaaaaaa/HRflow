"use client";

import { useState } from "react";
import { WalletCards, AlertTriangle, CheckCircle2, Lock, ArrowRight, ChevronLeft } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const MAX_LIMIT = 37500;
const PRESET_AMOUNTS = [5000, 10000, 20000, MAX_LIMIT] as const;

export default function EWAWithdrawalPage() {
    const [amount, setAmount] = useState<string>("5000");
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const parsedAmount = parseInt(amount) || 0;
    const processingFee = parsedAmount * 0.01;
    const netDeposit = parsedAmount - processingFee;
    const isValid = parsedAmount >= 100 && parsedAmount <= MAX_LIMIT;

    return (
        <Page
            title="On-Demand Withdrawal"
            subtitle="Withdraw your earned salary before payday"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "EWA", href: "/finance/ewa" },
                { label: "Withdraw Funds" },
            ]}
            maxWidth="700px"
        >
            <Card padding="lg" className="relative overflow-hidden">
                {step === 1 && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">How much do you need?</h2>
                            <span className="bg-[#00E5FF]/10 text-[#00E5FF] px-3 py-1.5 rounded-lg text-sm font-semibold">
                                Max available: ₹{MAX_LIMIT.toLocaleString()}
                            </span>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="withdrawal-amount" className="block text-sm font-medium text-[#8899AA] mb-2">Enter Amount (₹)</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-[#8899AA]" aria-hidden="true">₹</span>
                                <input
                                    id="withdrawal-amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-[#1A2A3A] border-2 border-[#2A3A4A] focus:border-[#00E5FF] text-white text-3xl font-bold rounded-xl py-6 pl-14 pr-6 transition-colors"
                                    max={MAX_LIMIT}
                                    min={100}
                                    aria-describedby="amount-hint"
                                />
                            </div>
                            <p id="amount-hint" className="sr-only">Minimum ₹100, maximum ₹{MAX_LIMIT.toLocaleString()}</p>

                            <div className="flex gap-3 mt-4" role="group" aria-label="Preset amounts">
                                {PRESET_AMOUNTS.map((val) => (
                                    <Button
                                        key={val}
                                        variant="secondary"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => setAmount(val.toString())}
                                    >
                                        {val === MAX_LIMIT ? "Max" : `₹${val / 1000}k`}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 mb-8" role="note">
                            <AlertTriangle size={20} className="text-amber-500 shrink-0" aria-hidden="true" />
                            <p className="text-sm text-amber-500/90 leading-relaxed">
                                Note: This amount will be deducted from your next salary payout on November 1st.
                            </p>
                        </div>

                        <Button
                            className="w-full py-4 text-lg"
                            onClick={() => setStep(2)}
                            disabled={!isValid}
                            icon={<ArrowRight size={20} />}
                            iconRight
                        >
                            Review Details
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <Button variant="ghost" size="sm" onClick={() => setStep(1)} icon={<ChevronLeft size={14} />} className="mb-6">
                            Back to Edit
                        </Button>

                        <h2 className="text-xl font-bold text-white mb-6">Review &amp; Confirm</h2>

                        <div className="bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl p-5 mb-6">
                            <div className="flex justify-between py-2 border-b border-[#2A3A4A]">
                                <span className="text-[#8899AA]">Requested Amount</span>
                                <span className="text-white font-medium">₹{parsedAmount.toLocaleString()}</span>
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
                                <WalletCards size={24} className="text-[#8899AA]" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-[#8899AA] text-xs">Depositing to primary salary account:</p>
                                <p className="text-white font-medium text-sm">HDFC Bank •••• 4021</p>
                            </div>
                        </div>

                        <label className="flex items-start gap-2 mb-8 cursor-pointer">
                            <input type="checkbox" id="consent" defaultChecked className="mt-1 accent-[#00E5FF]" />
                            <span className="text-xs text-[#8899AA] leading-relaxed">
                                I understand that this amount is an advance on my earned wages and will be recovered in full from my next payroll cycle.
                                By confirming, I authorize HRFlow to deduct ₹{parsedAmount.toLocaleString()} + applicable taxes from my net pay.
                            </span>
                        </label>

                        <Button
                            className="w-full py-4 text-lg"
                            onClick={() => setStep(3)}
                            icon={<Lock size={20} />}
                        >
                            Confirm &amp; Transfer Instantly
                        </Button>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-8">
                        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={48} className="text-emerald-400" aria-hidden="true" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Transfer Initiated!</h2>
                        <p className="text-[#8899AA] mb-8 max-w-sm mx-auto">
                            ₹{netDeposit.toLocaleString()} is on its way to your HDFC Bank account via IMPS. It usually takes less than 2 minutes.
                        </p>
                        <div className="bg-[#1A2A3A]/40 rounded-xl p-4 mb-8 border border-[#2A3A4A] w-64 mx-auto text-left">
                            <div className="text-xs text-[#8899AA] mb-1">Transaction ID</div>
                            <div className="font-mono text-[#00E5FF] font-medium text-sm">TXN-IMPS-8A9F2001</div>
                        </div>
                        <Button variant="secondary" href="/finance/ewa">Return to Dashboard</Button>
                    </div>
                )}
            </Card>
        </Page>
    );
}
