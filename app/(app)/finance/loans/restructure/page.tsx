"use client";

import { useState } from "react";
import { CheckCircle2, RefreshCw } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PRINCIPAL_BAL = 250000;
const OLD_EMI = 14000;
const INT_RATE = 8.5; // p.a.

export default function LoanRestructurePage() {
    const [newTenure, setNewTenure] = useState(24);

    const monthlyRate = INT_RATE / 12 / 100;
    const newEmi = PRINCIPAL_BAL * monthlyRate * Math.pow(1 + monthlyRate, newTenure) / (Math.pow(1 + monthlyRate, newTenure) - 1);

    return (
        <Page
            title="Restructure Loan Account"
            subtitle="Modify EMI amounts by extending or reducing the remaining tenure of an active loan."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Loans", href: "/finance/loans" },
                { label: "Restructure" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card padding="lg">
                        <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                            <div>
                                <h2 className="text-xl font-bold text-white">Sneha Rao</h2>
                                <p className="text-[#8899AA] text-sm mt-1">HR Generalist (EMP-112)</p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-indigo-400 font-bold">LN-8790</p>
                                <Badge variant="warning" className="mt-1">Target Account</Badge>
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
                                <RefreshCw size={16} className="text-emerald-400" aria-hidden="true" /> New Payment Terms
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label htmlFor="new-tenure-slider" className="block text-sm font-medium text-[#8899AA]">New Remaining Tenure</label>
                                        <span className="text-emerald-400 font-bold">{newTenure} Months</span>
                                    </div>
                                    <input
                                        id="new-tenure-slider"
                                        type="range"
                                        min="6"
                                        max="60"
                                        step="1"
                                        value={newTenure}
                                        onChange={(e) => setNewTenure(Number(e.target.value))}
                                        className="w-full h-2 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                        aria-valuemin={6}
                                        aria-valuemax={60}
                                        aria-valuenow={newTenure}
                                    />
                                    <div className="flex justify-between text-xs text-[#8899AA] mt-2">
                                        <span>6 mo</span>
                                        <span>Original: 20 mo</span>
                                        <span>60 mo</span>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="restructure-reason" className="block text-sm font-medium text-[#8899AA] mb-2">Reason for Restructuring</label>
                                    <textarea
                                        id="restructure-reason"
                                        rows={2}
                                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                                        placeholder="Financial hardship, salary revision, etc."
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <label className="flex items-start gap-3 cursor-pointer mb-6">
                            <input type="checkbox" className="mt-1 accent-emerald-500" />
                            <div className="text-sm text-[#8899AA]">
                                I confirm having obtained physical/digital approval from the employee acknowledging the new EMI schedule and revised interest implications.
                            </div>
                        </label>
                        <Button className="w-full" icon={<CheckCircle2 size={20} />}>Apply Restructure Strategy</Button>
                    </Card>
                </div>

                {/* EMI Comparison Sidebar */}
                <div className="md:col-span-1">
                    <Card padding="lg" className="sticky top-8 bg-gradient-to-br from-[#1A2A3A]/40 to-[#0D1928] border-[#2A3A4A]">
                        <h2 className="text-lg font-bold text-white mb-6">EMI Projection Comparison</h2>
                        <div className="space-y-6">
                            <div className="p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 opacity-60">
                                <p className="text-xs text-[#8899AA] mb-1">Old Monthly EMI</p>
                                <div className="text-2xl font-bold text-white line-through decoration-pink-500">₹{OLD_EMI.toLocaleString()}</div>
                                <p className="text-xs text-[#8899AA] mt-1">For 20 months</p>
                            </div>
                            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                                <p className="text-xs text-emerald-400 font-medium mb-1 flex justify-between">
                                    <span>New Monthly EMI</span>
                                    {newEmi < OLD_EMI
                                        ? <span className="bg-emerald-500/20 px-1.5 py-0.5 rounded">-₹{(OLD_EMI - newEmi).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                        : <span className="bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded">+₹{(newEmi - OLD_EMI).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                    }
                                </p>
                                <div className="text-3xl font-black text-white">₹{newEmi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                <p className="text-xs text-[#8899AA] mt-1">For {newTenure} months at {INT_RATE}% p.a.</p>
                            </div>
                            <div className="pt-4 border-t border-[#2A3A4A]">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#8899AA]">Net Interest Impact</span>
                                    <span className={newTenure > 20 ? "text-pink-400" : "text-emerald-400"}>
                                        {newTenure > 20 ? "Pays more interest" : "Saves interest"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
