"use client";

import React, { useState } from "react";
import { Info, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NPSDeclaration() {
    const [npsContribution, setNpsContribution] = useState("50,000");
    const [pran, setPran] = useState("110022334455");

    // Calculation — byte-identical to pre-migration
    const npsAmount = parseInt(npsContribution.replace(/,/g, "")) || 0;
    const eligible80ccd1b = Math.min(npsAmount, 50000);
    const overflowTo80c = Math.max(0, npsAmount - 50000);

    return (
        <Page
            title="NPS Tier 1 — Section 80CCD(1B)"
            subtitle="Self contribution to National Pension System"
            breadcrumbs={[
                { label: "Tax", href: "/tax/declaration/EMP-0848" },
                { label: "NPS Declaration" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                {/* Form Area */}
                <div className="flex flex-col gap-6">
                    <Card padding="lg">
                        <Card variant="bare" className="border border-[#00E5A0]/20 bg-[#00E5A0]/5 rounded-lg p-4 mb-6 flex items-start gap-3">
                            <Info size={16} className="text-[#00E5A0] shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <p className="text-sm text-[#00E5A0] font-semibold mb-1">Exclusive Additional Deduction</p>
                                <p className="text-sm text-white leading-relaxed">
                                    Voluntary investment in National Pension System (NPS) Tier 1 account gives you an exclusive tax
                                    deduction of up to <span className="font-bold">₹50,000</span> above the standard ₹1.5L limit
                                    under section 80C.
                                </p>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="nps-contribution" className="block text-sm text-[#8899AA] mb-2">
                                    Voluntary Contribution <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                    <input
                                        id="nps-contribution"
                                        type="text"
                                        value={npsContribution}
                                        onChange={(e) => setNpsContribution(e.target.value)}
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-7 pr-3 outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                                <p className="text-xs text-[#8899AA] mt-1">Only include your self-contribution (Tier 1)</p>
                            </div>
                            <div>
                                <label htmlFor="pran-number" className="block text-sm text-[#8899AA] mb-2">
                                    PRAN (Permanent Retirement A/c No.)
                                </label>
                                <input
                                    id="pran-number"
                                    type="text"
                                    value={pran}
                                    onChange={(e) => setPran(e.target.value)}
                                    maxLength={12}
                                    className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm px-4 outline-none focus:border-[#00E5A0]"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sticky Summary */}
                <div className="lg:sticky lg:top-6 lg:self-start">
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-5">NPS Summary</h3>

                        <div className="flex flex-col gap-4 mb-6">
                            <div>
                                <p className="text-sm text-white font-medium mb-2">Section 80CCD(1B) Exemption</p>
                                <div className="flex justify-between text-sm text-[#8899AA] mb-1">
                                    <span>Declared Contribution:</span>
                                    <span>₹{npsAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="text-[#00E5A0]">Exclusive Exemption:</span>
                                    <span className="text-[#00E5A0]">₹{eligible80ccd1b.toLocaleString()}</span>
                                </div>
                            </div>

                            {overflowTo80c > 0 && (
                                <>
                                    <div className="border-t border-[#1A2A3A]" />
                                    <div>
                                        <p className="text-sm text-white font-medium mb-2">Spillover to Section 80C</p>
                                        <div className="flex justify-between text-sm text-[#8899AA] mb-1">
                                            <span>Remaining Amount:</span>
                                            <span>₹{overflowTo80c.toLocaleString()}</span>
                                        </div>
                                        <p className="text-xs text-[#0066FF]">
                                            This additional amount has been clubbed with your 80C declarations (subject to overall
                                            ₹1.5L limit).
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        <Button className="w-full" icon={<Save size={16} />}>
                            Save NPS Declaration
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
