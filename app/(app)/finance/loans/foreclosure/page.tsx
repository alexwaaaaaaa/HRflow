"use client";

import { CheckCircle2, AlertTriangle, FastForward } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const IMPACT_POINTS = [
    "Future EMIs will be unqueued from payroll for this employee immediately.",
    "The loan account status will change to Closed (Foreclosed).",
    "Employee's Internal Credit Score will be positively impacted.",
    "An NOC will be automatically generated and made available in the NOC Ledger.",
] as const;

export default function LoanForeclosurePage() {
    return (
        <Page
            title="Early Loan Foreclosure"
            subtitle="Process a lump sum payment to clear an active loan before its scheduled maturity."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Loans", href: "/finance/loans" },
                { label: "Foreclosure" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {/* Loan Details */}
                    <Card padding="lg">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-white">Rahul Kumar</h2>
                                <p className="text-[#8899AA] text-sm mt-1">Design Lead (EMP-091)</p>
                            </div>
                            <Badge variant="warning">Active Loan</Badge>
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
                                        <AlertTriangle size={12} className="text-amber-500" aria-hidden="true" />
                                    </span>
                                    <span className="text-pink-400 font-medium">₹3,333</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-white font-bold">Total Payout Required</span>
                                    <span className="text-emerald-400 font-bold text-xl">₹3,39,027</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Execution */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-4">Execution Payment</h2>
                        <p className="text-sm text-[#8899AA] mb-6">
                            The employer must receive the lump sum amount via NEFT/RTGS into the designated account before confirming this action.
                        </p>
                        <label className="flex items-start gap-3 cursor-pointer mb-6">
                            <input type="checkbox" className="mt-1 accent-pink-500" />
                            <div className="text-sm text-[#8899AA]">
                                I confirm having received <strong className="text-white">₹3,39,027</strong> in the company bank account via UTR
                                <input
                                    type="text"
                                    placeholder="Enter UTR No."
                                    aria-label="UTR number"
                                    className="ml-2 bg-[#0B1221] border border-[#2A3A4A] text-white px-2 py-1 rounded w-32 focus:border-pink-500 focus:outline-none h-6 text-xs"
                                />
                            </div>
                        </label>
                        <Button variant="danger" className="w-full" icon={<CheckCircle2 size={20} />}>Confirm Receipt &amp; Foreclose Loan</Button>
                    </Card>
                </div>

                {/* Impact Sidebar */}
                <div className="md:col-span-1">
                    <Card padding="lg" className="sticky top-8 border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-red-500/5">
                        <div className="flex items-center gap-3 mb-4">
                            <FastForward size={24} className="text-pink-400" aria-hidden="true" />
                            <h2 className="text-lg font-bold text-white">Impact</h2>
                        </div>
                        <ul className="space-y-4 text-sm text-[#8899AA]">
                            {IMPACT_POINTS.map((point) => (
                                <li key={point} className="flex gap-2">
                                    <span className="text-pink-400 mt-1" aria-hidden="true">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
