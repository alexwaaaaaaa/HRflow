"use client";

import { useState } from "react";
import { FileSignature, ShieldPlus, TrendingDown } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const COVERAGE_OPTIONS = [10, 15, 20] as const;
type CoverageOption = typeof COVERAGE_OPTIONS[number];

const PREMIUM_MAP: Record<CoverageOption, number> = { 10: 350, 15: 480, 20: 620 };

const MEMBERS = [
    { name: "Ananya Sharma", relation: "Self" },
    { name: "Rohan Sharma", relation: "Spouse" },
    { name: "Aarav Sharma", relation: "Child" },
] as const;

export default function InsuranceEnrollmentPage() {
    const [coverage, setCoverage] = useState<CoverageOption>(10);
    const premium = PREMIUM_MAP[coverage];

    return (
        <Page
            title="Enroll: GMC Super Top-up"
            subtitle="Configure your voluntary coverage and set up automatic payroll deductions."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Marketplace", href: "/finance/insurance/marketplace" },
                { label: "Enrollment" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {/* Step 1: Coverage */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">1. Select Extra Coverage Limit</h2>
                        <fieldset>
                            <legend className="sr-only">Select coverage amount</legend>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {COVERAGE_OPTIONS.map((val) => (
                                    <label
                                        key={val}
                                        className={`p-4 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${coverage === val ? "border-amber-400 bg-amber-500/10" : "border-[#2A3A4A] bg-[#1A2A3A]/40 hover:border-[#8899AA]"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="coverage"
                                            value={val}
                                            checked={coverage === val}
                                            onChange={() => setCoverage(val)}
                                            className="sr-only"
                                        />
                                        <span className={`text-xl font-bold ${coverage === val ? "text-amber-400" : "text-white"}`}>₹{val}L</span>
                                        <span className="text-xs text-[#8899AA] mt-1">Extra Cover</span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        <div className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg text-sm text-[#8899AA] flex items-start gap-3" role="note">
                            <ShieldPlus size={20} className="text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <p>
                                This is a Super Top-up plan with a <strong className="text-white">₹5 Lakh deductible</strong>.
                                It kicks in automatically once your base employer GMC limit of ₹5 Lakhs is exhausted during a single policy year.
                            </p>
                        </div>
                    </Card>

                    {/* Step 2: Members */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-4">2. Members Covered</h2>
                        <p className="text-sm text-[#8899AA] mb-4">
                            The super top-up will automatically inherit the same dependents registered under your primary corporate GMC plan.
                        </p>
                        <div className="space-y-2">
                            {MEMBERS.map((member) => (
                                <div key={member.name} className="flex justify-between items-center p-3 border border-[#2A3A4A] rounded text-sm bg-[#1A2A3A]/20">
                                    <span className="text-white font-medium">{member.name}</span>
                                    <span className="text-xs px-2 py-1 bg-[#2A3A4A] text-[#8899AA] rounded">{member.relation}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Step 3: Authorization */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-4">3. Payroll Authorization</h2>
                        <label className="flex items-start gap-3 cursor-pointer mb-6">
                            <input type="checkbox" className="mt-1 accent-emerald-500" />
                            <div className="text-sm text-[#8899AA] leading-relaxed">
                                I authorize HRFlow to deduct <strong className="text-white">₹{premium}</strong> per month from my salary starting next payroll cycle towards the premium of this voluntary cover. I understand this deduction is pre-tax and subject to Section 80D tax benefits.
                            </div>
                        </label>
                        <Button className="w-full" icon={<FileSignature size={20} />}>Sign &amp; Confirm Enrollment</Button>
                    </Card>
                </div>

                {/* Premium Summary Sidebar */}
                <div className="md:col-span-1">
                    <Card padding="lg" className="sticky top-8 bg-gradient-to-br from-[#1A2A3A]/40 to-[#0D1928] border-[#2A3A4A]">
                        <h2 className="text-lg font-bold text-white mb-6">Premium Summary</h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Policy Tenure</span>
                                <span className="text-white font-medium">1 Year (Auto-renews)</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Corporate Discount</span>
                                <span className="text-emerald-400 font-medium">45% Applied</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Max Coverage</span>
                                <span className="text-white font-medium text-lg">₹{coverage} Lakhs</span>
                            </div>
                        </div>
                        <div className="bg-[#0B1221]/80 rounded-xl p-4 mb-4 border border-amber-500/30">
                            <p className="text-xs text-amber-500 mb-1 font-medium">Monthly Payroll Deduction</p>
                            <div className="text-3xl font-black text-white">₹{premium}</div>
                            <p className="text-xs text-[#8899AA] mt-1">+ applicable GST</p>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20" role="note">
                            <TrendingDown size={16} className="shrink-0" aria-hidden="true" />
                            <p>Saves you roughly ₹1,320 in income tax annually under Section 80D (assuming 30% bracket).</p>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
