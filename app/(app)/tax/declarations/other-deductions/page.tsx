"use client";

import React, { useState, useEffect } from "react";
import {
    Info,
    GraduationCap,
    Heart,
    PiggyBank,
    BadgePlus,
    PlaneTakeoff,
    Lightbulb,
    CheckCircle2,
    AlertTriangle,
    UploadCloud,
    Plus,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function OtherDeductionsPage() {
    const [eduLoanInterest, setEduLoanInterest] = useState(0);
    const [savingsInterest, setSavingsInterest] = useState(3400);
    const [ltaClaimed] = useState(28000);
    const [donations] = useState([
        { id: 1, name: "PM Relief Fund", amount: 10000, type: "100%", deduction: 10000 },
    ]);
    const total80G = donations.reduce((sum, item) => sum + item.deduction, 0);

    const totalOther = eduLoanInterest + savingsInterest + ltaClaimed + total80G;
    const additionalTaxSaved = totalOther * 0.22;

    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setScanning(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Page
            title="Other Tax Deductions"
            subtitle="Sections Chapter VI-A (80E, 80G, 80TTA, 80U) & Section 10 exemptions"
            breadcrumbs={[
                { label: "Tax", href: "/tax/declarations" },
                { label: "Other Deductions" },
            ]}
            maxWidth="1400px"
            actions={
                <Card variant="bare" className="border border-[#FFB800]/20 bg-[#FFB800]/10 px-4 py-3 rounded-lg flex items-center gap-3">
                    <Info className="w-5 h-5 text-[#FFB800]" aria-hidden="true" />
                    <p className="text-sm font-medium text-[#FFB800]">These sections are frequently overlooked. Check carefully.</p>
                </Card>
            }
        >
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left Panel */}
                <div className="xl:col-span-8 border-l-2 border-[#1A2A3A] pl-6 space-y-10">
                    {/* 80E */}
                    <section className="relative">
                        <div className="absolute -left-[45px] top-0.5 bg-[#0066FF]/20 border border-[#0066FF]/50 w-10 h-10 rounded-full flex items-center justify-center text-[#0066FF] ring-4 ring-[#0A1420]" aria-hidden="true">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">80E — Education Loan Interest</h2>
                        <p className="text-sm text-[#445566] mb-4">No upper limit on deduction — full interest claimable for up to 8 years.</p>
                        <Card padding="lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Loan Taken For</label>
                                    <div className="flex items-center gap-2 bg-[#0A1420] p-1 rounded-lg border border-white/5 w-fit">
                                        <Button variant="primary" size="sm">Self</Button>
                                        <Button variant="ghost" size="sm">Spouse</Button>
                                        <Button variant="ghost" size="sm">Children</Button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="edu-loan-interest" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                        Annual Interest Paid
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-[#445566]">₹</span>
                                        <input
                                            id="edu-loan-interest"
                                            type="number"
                                            value={eduLoanInterest || ""}
                                            onChange={(e) => setEduLoanInterest(Number(e.target.value))}
                                            placeholder="e.g. 50000"
                                            className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="edu-bank" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                        Bank/Institution
                                    </label>
                                    <input
                                        id="edu-bank"
                                        type="text"
                                        placeholder="e.g. State Bank of India"
                                        className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edu-proof" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                        Proof: Bank Interest Certificate
                                    </label>
                                    <Button variant="secondary" className="w-full" icon={<UploadCloud className="w-4 h-4" />}>
                                        Upload PDF
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* 80G */}
                    <section className="relative">
                        <div className="absolute -left-[45px] top-0.5 bg-[#00E5A0]/20 border border-[#00E5A0]/50 w-10 h-10 rounded-full flex items-center justify-center text-[#00E5A0] ring-4 ring-[#0A1420]" aria-hidden="true">
                            <Heart className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">80G — Charitable Donations</h2>
                        <p className="text-sm text-[#445566] mb-4">
                            100% or 50% deduction depending on fund/institution. PAN of NGO is mandatory.
                        </p>
                        <Card padding="lg">
                            <div className="space-y-3 mb-4">
                                {donations.map((d) => (
                                    <div
                                        key={d.id}
                                        className="bg-[#0A1420] border border-white/5 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                    >
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{d.name}</h4>
                                            <p className="text-xs text-[#00E5A0] mt-0.5 flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                                                {d.type} Deductible Category
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-xs text-[#445566] mb-0.5">Donated Amount</p>
                                                <p className="font-mono text-sm text-white">₹{d.amount.toLocaleString("en-IN")}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-[#445566] mb-0.5">Eligible Deduction</p>
                                                <p className="font-mono text-sm font-bold text-[#00E5A0]">
                                                    ₹{d.deduction.toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="flex-1" icon={<Plus className="w-4 h-4" />}>
                                    Add PM&apos;s Relief Fund
                                </Button>
                                <Button variant="outline" className="flex-1" icon={<Plus className="w-4 h-4" />}>
                                    Add NGO / Trust Donation
                                </Button>
                            </div>
                        </Card>
                    </section>

                    {/* 80TTA */}
                    <section className="relative">
                        <div className="absolute -left-[45px] top-0.5 bg-[#FFB800]/20 border border-[#FFB800]/50 w-10 h-10 rounded-full flex items-center justify-center text-[#FFB800] ring-4 ring-[#0A1420]" aria-hidden="true">
                            <PiggyBank className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">80TTA — Savings Account Interest</h2>
                        <p className="text-sm text-[#445566] mb-4">
                            Deduction up to ₹10,000 on interest from savings accounts (NOT Fixed Deposits).
                        </p>
                        <Card padding="lg" className="flex items-center justify-between gap-6">
                            <div className="flex-1">
                                <label htmlFor="savings-interest" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                    Interest income from savings
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-[#445566]">₹</span>
                                    <input
                                        id="savings-interest"
                                        type="number"
                                        value={savingsInterest}
                                        onChange={(e) => setSavingsInterest(Number(e.target.value))}
                                        className="w-full max-w-xs bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm font-bold text-white focus:outline-none focus:border-[#FFB800]"
                                    />
                                </div>
                            </div>
                            <div className="bg-[#0A1420] px-6 py-4 rounded-lg border border-[#FFB800]/20 text-center">
                                <p className="text-xs text-[#445566] mb-1">Allowed Deduction</p>
                                <p className="font-mono text-xl font-bold text-[#FFB800]">
                                    ₹{Math.min(savingsInterest, 10000).toLocaleString("en-IN")}
                                </p>
                                {savingsInterest > 10000 && (
                                    <p className="text-[10px] text-[#445566] mt-1">Capped at ₹10,000</p>
                                )}
                            </div>
                        </Card>
                    </section>

                    {/* LTA */}
                    <section className="relative">
                        <div className="absolute -left-[45px] top-0.5 bg-purple-500/20 border border-purple-500/50 w-10 h-10 rounded-full flex items-center justify-center text-purple-400 ring-4 ring-[#0A1420]" aria-hidden="true">
                            <PlaneTakeoff className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">Section 10(5) — LTA Exemption</h2>
                        <p className="text-sm text-[#445566] mb-4">
                            Leave Travel Allowance. 2 domestic journeys claimable in a 4-year block (Current Block: 2022–2025).
                        </p>
                        <Card padding="lg">
                            <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 mb-6 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-bold text-white">
                                        LTA component in salary structure:{" "}
                                        <span className="font-mono text-purple-400">₹50,000/yr</span>
                                    </p>
                                    <p className="text-xs text-[#445566] mt-1">
                                        You have claimed <b className="text-white">1</b> out of 2 allowed journeys for Block 2022-25.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#0A1420] border border-white/10 rounded-lg p-5 mb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                        <Badge variant="purple">Journey 1</Badge>
                                        Bangalore ✈ Goa
                                    </h4>
                                    <Badge variant="success">Claimed &amp; Approved</Badge>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-xs text-[#445566] mb-0.5">Travel Dates</p>
                                        <p className="text-[#c8d8e8]">14 Apr - 22 Apr &apos;24</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#445566] mb-0.5">Mode of Travel</p>
                                        <p className="text-[#c8d8e8]">Air Economy (IndiGo)</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#445566] mb-0.5">Claim Amount</p>
                                        <p className="font-mono font-bold text-white">₹28,000</p>
                                    </div>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full" icon={<Plus className="w-5 h-5" />}>
                                Add Second Journey for Exemption
                            </Button>
                        </Card>
                    </section>

                    {/* 80U */}
                    <section className="relative">
                        <div className="absolute -left-[45px] top-0.5 bg-[#1A2A3A] w-10 h-10 rounded-full flex items-center justify-center text-[#445566] ring-4 ring-[#0A1420]" aria-hidden="true">
                            <BadgePlus className="w-5 h-5" />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-[#445566] mb-1">80U — Disability of Self</h2>
                                <p className="text-sm text-[#445566] mb-4">
                                    Flat deduction of ₹75,000 or ₹1,25,000 depending on severity.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 bg-[#1A2A3A] p-1 rounded-lg border border-white/5 w-fit">
                                <Button variant="ghost" size="sm">Yes</Button>
                                <Button variant="secondary" size="sm">Not Applicable</Button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Panel */}
                <div className="xl:col-span-4 space-y-6">
                    {/* AI Scanner */}
                    <Card padding="none" className="lg:sticky lg:top-6">
                        <div className="p-5 border-b border-white/5 bg-[#00E5A0]/5 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-[#00E5A0] animate-pulse" aria-hidden="true" />
                            <h3 className="font-bold text-[#00E5A0] text-lg">AI Savings Scanner</h3>
                        </div>
                        <div className="p-6 relative">
                            {scanning ? (
                                <div className="text-center py-8">
                                    <div
                                        className="w-12 h-12 border-4 border-[#00E5A0]/20 border-t-[#00E5A0] rounded-full animate-spin mx-auto mb-4"
                                        role="status"
                                        aria-label="Scanning profile"
                                    />
                                    <p className="text-sm font-bold text-white mb-2">Scanning your profile...</p>
                                    <p className="text-xs text-[#445566] animate-pulse">
                                        Analyzing payroll, past declarations, and tax rules.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 bg-[#0A1420] p-3 rounded-lg border border-[#00E5A0]/20">
                                        <CheckCircle2 className="w-4 h-4 text-[#00E5A0] mt-0.5 shrink-0" aria-hidden="true" />
                                        <div>
                                            <p className="text-xs font-bold text-[#00E5A0] mb-0.5">80G Optimized</p>
                                            <p className="text-[11px] text-[#445566]">
                                                PM Relief Fund is 100% exempt without 10% income cap restriction.
                                            </p>
                                        </div>
                                    </div>

                                    {eduLoanInterest === 0 && (
                                        <div className="flex items-start gap-3 bg-[#0A1420] p-3 rounded-lg border border-red-500/20">
                                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
                                            <div>
                                                <p className="text-xs font-bold text-red-400 mb-0.5">Missing 80E (Education Loan)</p>
                                                <p className="text-[11px] text-[#445566]">
                                                    No claim found. If you have an education loan, interest is 100% tax-free.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3 bg-[#0A1420] p-3 rounded-lg border border-yellow-500/20">
                                        <PlaneTakeoff className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" aria-hidden="true" />
                                        <div>
                                            <p className="text-xs font-bold text-yellow-500 mb-0.5">LTA Utilization Warning</p>
                                            <p className="text-[11px] text-[#445566]">
                                                You have 1 journey left in the 2022-25 block. Current block ends on Dec 31, 2025.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Summary */}
                    <Card padding="lg">
                        <h3 className="text-lg font-bold text-white mb-5 border-b border-white/10 pb-4">Other Deductions Summary</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-[#c8d8e8]">
                                <span>80E (Education Loan)</span>
                                <span className="font-mono">₹{eduLoanInterest.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-[#c8d8e8]">
                                <span>80G (Donations)</span>
                                <span className="font-mono">₹{total80G.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-[#c8d8e8]">
                                <span>80TTA (Savings Interest)</span>
                                <span className="font-mono">₹{Math.min(savingsInterest, 10000).toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-[#c8d8e8]">
                                <span>LTA Exemption</span>
                                <span className="font-mono">₹{ltaClaimed.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="pt-3 border-t border-white/10 mt-2">
                                <div className="flex justify-between text-white font-bold text-base mb-1">
                                    <span>Total Other Deductions</span>
                                    <span className="font-mono">₹{totalOther.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-[#00E5A0] font-bold">
                                    <span className="text-sm">Additional Tax Saved (22%)</span>
                                    <span className="font-mono text-lg">₹{Math.round(additionalTaxSaved).toLocaleString("en-IN")}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
