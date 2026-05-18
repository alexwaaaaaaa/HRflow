"use client";

import React from "react";
import {
    Calculator,
    Info,
    Upload,
    ArrowRight,
    History,
    Download,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Section89Relief() {
    return (
        <Page
            title="Relief Under Section 89(1)"
            subtitle="Calculate and claim tax relief on salary arrears or advance salary."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Section 89 Relief" },
            ]}
            maxWidth="900px"
        >
            <div className="space-y-6">
                {/* Banner */}
                <Card padding="md" className="border border-[#0066FF]/20 bg-[#0066FF]/10 flex items-start gap-3">
                    <Info size={20} className="text-[#0066FF] mt-0.5 shrink-0" aria-hidden="true" />
                    <div className="text-sm">
                        <h4 className="font-bold text-white mb-1">What is Section 89 Relief?</h4>
                        <p className="text-[#8899AA]">
                            If you received salary arrears or advance salary resulting in higher tax liability in the current year,
                            you can claim relief under Section 89. You must file{" "}
                            <strong className="text-white">Form 10E</strong> on the IT portal to claim this.
                        </p>
                    </div>
                </Card>

                {/* Main Form */}
                <Card padding="none">
                    <div className="p-6 border-b border-[#1A2A3A]">
                        <h2 className="text-lg font-bold text-white mb-5">Add Arrears Detail</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="arrears-fy" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                    Arrears For Financial Year
                                </label>
                                <select
                                    id="arrears-fy"
                                    className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                >
                                    <option>Select FY...</option>
                                    <option>2022-23</option>
                                    <option>2021-22</option>
                                    <option>2020-21</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="arrears-amount" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                    Arrears Amount Received Now
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-[#8899AA] font-bold">₹</span>
                                    <input
                                        id="arrears-amount"
                                        type="number"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                        placeholder="e.g. 150000"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="past-income" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                    Total Income (Excl. Arrears) in Past FY
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-[#8899AA] font-bold">₹</span>
                                    <input
                                        id="past-income"
                                        type="number"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="arrear-proof" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                    Upload Arrear Letter / Proof
                                </label>
                                <Button variant="secondary" className="w-full" icon={<Upload size={16} />}>
                                    Select Document
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button iconRight={<ArrowRight size={16} />}>Calculate Relief</Button>
                        </div>
                    </div>

                    {/* Simulation Result */}
                    <div className="p-6 bg-[#060B14]">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Calculator size={16} className="text-[#00E5A0]" aria-hidden="true" /> Calculation Summary
                        </h3>

                        <div className="space-y-2">
                            {[
                                { label: "Tax on current income (including arrears)", value: "₹2,45,000" },
                                { label: "Tax on current income (excluding arrears)", value: "₹1,90,000" },
                                { label: "Diff (A) - Tax on Arrears in current year", value: "₹55,000", highlight: true },
                                { label: "Tax on past year income (including arrears)", value: "₹1,60,000" },
                                { label: "Tax on past year income (excluding arrears)", value: "₹1,25,000" },
                                { label: "Diff (B) - Tax on Arrears in past year", value: "₹35,000", highlight: true },
                            ].map((row, i) => (
                                <div
                                    key={i}
                                    className={`flex justify-between items-center py-2 border-b border-[#1A2A3A] ${
                                        row.highlight ? "pl-4" : ""
                                    }`}
                                >
                                    <span className={`text-sm ${row.highlight ? "text-[#0066FF] font-semibold" : "text-[#445566]"}`}>
                                        {row.label}
                                    </span>
                                    <span className={`text-sm font-bold ${row.highlight ? "text-[#0066FF]" : "text-white"}`}>
                                        {row.value}
                                    </span>
                                </div>
                            ))}

                            <div className="flex justify-between items-center py-4 mt-2 bg-[#00E5A0]/10 px-4 rounded-lg border border-[#00E5A0]/20">
                                <span className="text-sm font-bold text-white uppercase tracking-wider">
                                    Eligible Relief under Sec 89{" "}
                                    <span className="text-xs text-[#8899AA] ml-1">(A - B)</span>
                                </span>
                                <span className="text-xl font-black text-[#00E5A0]">₹20,000</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <Button variant="secondary" icon={<Download size={16} />}>
                                Download Form 10E Data
                            </Button>
                            <Button>Submit Claim for Payroll</Button>
                        </div>
                    </div>
                </Card>

                {/* History */}
                <Card padding="lg">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <History size={16} className="text-[#8899AA]" aria-hidden="true" /> Past Submissions
                    </h3>
                    <p className="text-sm text-[#8899AA] italic">No past Section 89 claims found.</p>
                </Card>
            </div>
        </Page>
    );
}
