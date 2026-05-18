"use client";

import React, { useState } from "react";
import { Home, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function HomeLoan() {
    const [interest, setInterest] = useState("2,14,000");
    const [principal, setPrincipal] = useState("85,000");
    const [lenderName, setLenderName] = useState("HDFC Bank Ltd");
    const [lenderPan, setLenderPan] = useState("AACH0000A");

    const maxSection24 = 200000;

    // Calculation — byte-identical to pre-migration
    const interestVal = parseInt(interest.replace(/,/g, "")) || 0;
    const principalVal = parseInt(principal.replace(/,/g, "")) || 0;
    const sec24Eligible = Math.min(interestVal, maxSection24);

    return (
        <Page
            title="Home Loan Details"
            subtitle="Section 24(b) for interest and 80C for principal repayment"
            breadcrumbs={[
                { label: "Tax", href: "/tax/declaration/EMP-0848" },
                { label: "Home Loan" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                {/* Form Area */}
                <div className="flex flex-col gap-6">
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-5">Financial Details (FY 2024-25)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <div>
                                <label htmlFor="interest-paid" className="block text-sm text-[#8899AA] mb-2">
                                    Home Loan Interest Paid <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                    <input
                                        id="interest-paid"
                                        type="text"
                                        value={interest}
                                        onChange={(e) => setInterest(e.target.value)}
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-7 pr-3 outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                                <p className="text-xs text-[#8899AA] mt-1">Claimable under Section 24(b) up to ₹2L</p>
                            </div>
                            <div>
                                <label htmlFor="principal-repaid" className="block text-sm text-[#8899AA] mb-2">
                                    Principal Repaid <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                    <input
                                        id="principal-repaid"
                                        type="text"
                                        value={principal}
                                        onChange={(e) => setPrincipal(e.target.value)}
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-7 pr-3 outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                                <p className="text-xs text-[#8899AA] mt-1">Automatically added to 80C limit (₹1.5L max combined)</p>
                            </div>
                        </div>

                        <h3 className="text-base font-semibold text-white mb-5">Lender Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="lender-name" className="block text-sm text-[#8899AA] mb-2">
                                    Name of Lender / Bank <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id="lender-name"
                                    type="text"
                                    value={lenderName}
                                    onChange={(e) => setLenderName(e.target.value)}
                                    className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm px-4 outline-none focus:border-[#00E5A0]"
                                />
                            </div>
                            <div>
                                <label htmlFor="lender-pan" className="block text-sm text-[#8899AA] mb-2">
                                    PAN of Lender <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id="lender-pan"
                                    type="text"
                                    value={lenderPan}
                                    onChange={(e) => setLenderPan(e.target.value.toUpperCase())}
                                    maxLength={10}
                                    className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm px-4 outline-none focus:border-[#00E5A0] uppercase"
                                />
                            </div>
                        </div>
                    </Card>

                    <Card padding="md" className="border border-[#0066FF]/20 bg-[#0066FF]/5 flex items-start gap-3">
                        <Home size={18} className="text-[#0066FF] shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-[#8899AA] leading-relaxed">
                            <strong className="text-white">Section 80EEA:</strong> If you are a first-time home buyer, you may be
                            eligible for an additional ₹1.5L deduction if the property value is under ₹45L &amp; loan was sanctioned
                            between Apr&apos;19 - Mar&apos;22.{" "}
                            <a href="#" className="text-[#0066FF] hover:underline">
                                Claim 80EEA Deduction →
                            </a>
                        </p>
                    </Card>
                </div>

                {/* Sticky Summary */}
                <div className="lg:sticky lg:top-6 lg:self-start">
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-5">Deduction Summary</h3>

                        <div className="flex flex-col gap-4 mb-6">
                            {/* Sec 24b */}
                            <div>
                                <p className="text-sm text-white font-medium mb-2">Sec 24(b) - Home Loan Interest</p>
                                <div className="flex justify-between text-sm text-[#8899AA] mb-1">
                                    <span>Declared Interest:</span>
                                    <span>₹{interestVal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="text-[#00E5A0]">Eligible Exemption:</span>
                                    <span className="text-[#00E5A0]">₹{sec24Eligible.toLocaleString()}</span>
                                </div>
                                {interestVal > maxSection24 && (
                                    <p className="text-xs text-[#FFB800] mt-1">
                                        Limited to maximum ₹2,00,000 for self-occupied properties.
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-[#1A2A3A]" />

                            {/* Principal / 80C */}
                            <div>
                                <p className="text-sm text-white font-medium mb-2">Section 80C Addition</p>
                                <div className="flex justify-between text-sm text-[#8899AA] mb-1">
                                    <span>Declared Principal:</span>
                                    <span>₹{principalVal.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-[#0066FF]">
                                    This will be clubbed with your existing Section 80C limit (max ₹1.5L combined).
                                </p>
                            </div>
                        </div>

                        <Button className="w-full" icon={<Save size={16} />}>
                            Save Declarations
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
