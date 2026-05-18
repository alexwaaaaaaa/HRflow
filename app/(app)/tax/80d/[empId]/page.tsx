"use client";

import React, { useState } from "react";
import { Info, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Section80D() {
    const [selfSenior, setSelfSenior] = useState(false);
    const [parentSenior, setParentSenior] = useState(true);

    const [selfPremium, setSelfPremium] = useState("12,000");
    const [selfCheckup, setSelfCheckup] = useState("5,000");
    const [parentPremium, setParentPremium] = useState("45,000");
    const [parentCheckup, setParentCheckup] = useState("0");

    const selfLimit = selfSenior ? 50000 : 25000;
    const parentLimit = parentSenior ? 50000 : 25000;

    // Calculation logic — byte-identical to pre-migration
    const selfTotal = Math.min(parseInt(selfPremium.replace(/,/g, "")) + parseInt(selfCheckup.replace(/,/g, "")), selfLimit);
    const parentTotal = Math.min(parseInt(parentPremium.replace(/,/g, "")) + parseInt(parentCheckup.replace(/,/g, "")), parentLimit);

    return (
        <Page
            title="80D Health Insurance"
            subtitle="Medical insurance premium and preventive health check-up"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "Declaration", href: "/tax/declaration/EMP-0848" },
                { label: "80D Health Insurance" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                {/* Form Area */}
                <div className="flex flex-col gap-6">
                    {/* Self & Family */}
                    <Card padding="none">
                        <div className="flex justify-between items-center px-5 py-4 border-b border-[#1A2A3A]">
                            <h3 className="text-base font-semibold text-white">Self, Spouse & Children</h3>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-[#8899AA]">Senior Citizen (60+)?</span>
                                <div className="flex bg-[#060B14] border border-[#1A2A3A] rounded-lg overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => setSelfSenior(true)}
                                        className={`px-3 py-1.5 text-xs font-semibold transition-colors ${selfSenior ? "bg-[#1A2A3A] text-white" : "text-[#8899AA] hover:text-white"}`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelfSenior(false)}
                                        className={`px-3 py-1.5 text-xs font-semibold transition-colors ${!selfSenior ? "bg-[#1A2A3A] text-white" : "text-[#8899AA] hover:text-white"}`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <label htmlFor="self-premium" className="text-sm font-medium text-white block mb-1">Health Insurance Premium</label>
                                    <p className="text-xs text-[#8899AA]">Premium paid via non-cash mode</p>
                                </div>
                                <div className="relative w-44">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                    <input
                                        id="self-premium"
                                        type="text"
                                        value={selfPremium}
                                        onChange={(e) => setSelfPremium(e.target.value)}
                                        placeholder="0"
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-7 pr-3 outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <label htmlFor="self-checkup" className="text-sm font-medium text-white block mb-1">Preventive Health Check-up</label>
                                    <p className="text-xs text-[#8899AA]">Max overall limit ₹5,000 (included in main limit)</p>
                                </div>
                                <div className="relative w-44">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                    <input
                                        id="self-checkup"
                                        type="text"
                                        value={selfCheckup}
                                        onChange={(e) => setSelfCheckup(e.target.value)}
                                        placeholder="0"
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-7 pr-3 outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Parents */}
                    <Card padding="none">
                        <div className="flex justify-between items-center px-5 py-4 border-b border-[#1A2A3A]">
                            <h3 className="text-base font-semibold text-white">Parents</h3>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-[#8899AA]">Senior Citizen parents?</span>
                                <div className="flex bg-[#060B14] border border-[#1A2A3A] rounded-lg overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => setParentSenior(true)}
                                        className={`px-3 py-1.5 text-xs font-semibold transition-colors ${parentSenior ? "bg-[#1A2A3A] text-white" : "text-[#8899AA] hover:text-white"}`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setParentSenior(false)}
                                        className={`px-3 py-1.5 text-xs font-semibold transition-colors ${!parentSenior ? "bg-[#1A2A3A] text-white" : "text-[#8899AA] hover:text-white"}`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <label htmlFor="parent-premium" className="text-sm font-medium text-white block mb-1">Health Insurance Premium</label>
                                    <p className="text-xs text-[#8899AA]">Premium paid via non-cash mode for parents</p>
                                </div>
                                <div className="relative w-44">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                    <input
                                        id="parent-premium"
                                        type="text"
                                        value={parentPremium}
                                        onChange={(e) => setParentPremium(e.target.value)}
                                        placeholder="0"
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-7 pr-3 outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <label htmlFor="parent-checkup" className="text-sm font-medium text-white block mb-1">Preventive Health Check-up</label>
                                    <p className="text-xs text-[#8899AA]">Max overall limit ₹5,000 (across all members)</p>
                                </div>
                                <div className="relative w-44">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                    <input
                                        id="parent-checkup"
                                        type="text"
                                        value={parentCheckup}
                                        onChange={(e) => setParentCheckup(e.target.value)}
                                        placeholder="0"
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-7 pr-3 outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card padding="md" className="border border-[#0066FF]/20 bg-[#0066FF]/5">
                        <div className="flex gap-3">
                            <Info size={18} className="text-[#0066FF] shrink-0 mt-0.5" aria-hidden="true" />
                            <p className="text-xs text-[#8899AA] leading-relaxed">
                                <strong className="text-white">Note:</strong> Cash payments are not eligible for 80D deduction, except for Preventive Health Check-up. Premiums must be paid via cheque, drafting, net banking, UPI, or credit cards.
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Sticky Summary */}
                <div className="lg:sticky lg:top-6 lg:self-start">
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-5">80D Summary</h3>

                        <div className="flex flex-col gap-3 mb-4">
                            <div className="flex justify-between text-xs">
                                <span className="text-[#8899AA]">Self & Family (Max ₹{selfLimit.toLocaleString()})</span>
                                <span className="text-white font-medium">₹{selfTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[#8899AA]">Parents (Max ₹{parentLimit.toLocaleString()})</span>
                                <span className="text-white font-medium">₹{parentTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-[#1A2A3A] pt-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-white">Total 80D Eligible</span>
                                <span className="text-xl font-bold text-[#00E5A0]">₹{(selfTotal + parentTotal).toLocaleString()}</span>
                            </div>
                        </div>

                        <Button className="w-full" icon={<Save size={16} />}>
                            Save 80D Declaration
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
