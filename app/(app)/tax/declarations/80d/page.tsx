"use client";

import React, { useState } from "react";
import {
    Info,
    ShieldCheck,
    Users,
    HeartPulse,
    Lightbulb,
    UploadCloud,
    CheckCircle2,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function Section80DPage() {
    const [seniorParents, setSeniorParents] = useState(false);
    const selfLimit = 25000;
    const parentsLimit = seniorParents ? 50000 : 25000;

    // Calculation logic — byte-identical to pre-migration
    const selfPremium = 15000;
    const healthCheckup = 5000;
    const selfTotal = selfPremium + healthCheckup;

    const parentsPremium = 12000;
    const parentsTotal = parentsPremium;

    const total80D = selfTotal + parentsTotal;

    const selfRemaining = Math.max(0, selfLimit - selfTotal);
    const parentsRemaining = Math.max(0, parentsLimit - parentsTotal);

    return (
        <Page
            title="Section 80D — Health Insurance"
            subtitle="Deduction for health insurance premiums & preventive check-ups"
            breadcrumbs={[
                { label: "Tax", href: "/tax/declarations" },
                { label: "80D Insurance" },
            ]}
            maxWidth="1400px"
        >
            <div className="space-y-6">
                {/* Limit Overview */}
                <Card padding="lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Bar 1: Self + Family */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-bold text-white text-lg">Self + Family Limit</span>
                                <span className="text-sm font-medium text-[#8899AA]">
                                    ₹{selfTotal.toLocaleString("en-IN")} / ₹{selfLimit.toLocaleString("en-IN")}
                                </span>
                            </div>
                            <div
                                className="h-3 bg-[#0A1420] rounded-full overflow-hidden flex ring-1 ring-inset ring-white/5 mb-2"
                                role="progressbar"
                                aria-valuenow={Math.round((selfTotal / selfLimit) * 100)}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label="Self and family 80D limit used"
                            >
                                <div
                                    className="h-full bg-[#00E5A0] transition-all duration-500"
                                    style={{ width: `${(selfTotal / selfLimit) * 100}%` }}
                                />
                            </div>
                            <p className="text-xs text-[#445566] flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-[#00E5A0]" aria-hidden="true" />
                                Includes ₹5,000 preventive check-up
                            </p>
                        </div>

                        {/* Bar 2: Parents */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-bold text-white text-lg flex items-center gap-2">
                                    Parents Limit
                                    <label className="flex items-center gap-2 text-xs font-normal text-[#8899AA] bg-[#1A2A3A] px-2 py-1 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="rounded bg-[#0D1928] border-[#445566] accent-[#0066FF]"
                                            checked={seniorParents}
                                            onChange={(e) => setSeniorParents(e.target.checked)}
                                        />
                                        Senior Citizens (60+)
                                    </label>
                                </span>
                                <span className="text-sm font-medium text-[#8899AA]">
                                    ₹{parentsTotal.toLocaleString("en-IN")} / ₹{parentsLimit.toLocaleString("en-IN")}
                                </span>
                            </div>
                            <div
                                className="h-3 bg-[#0A1420] rounded-full overflow-hidden flex ring-1 ring-inset ring-white/5 mb-2"
                                role="progressbar"
                                aria-valuenow={Math.round((parentsTotal / parentsLimit) * 100)}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label="Parents 80D limit used"
                            >
                                <div
                                    className="h-full bg-[#0066FF] transition-all duration-500"
                                    style={{ width: `${(parentsTotal / parentsLimit) * 100}%` }}
                                />
                            </div>
                            <p className="text-xs text-[#445566] flex items-center gap-1">
                                <Info className="w-3 h-3 text-[#0066FF]" aria-hidden="true" />
                                {seniorParents ? "Enhanced ₹50k limit active" : "Standard ₹25k limit"}
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Left Panel */}
                    <div className="xl:col-span-7 space-y-6">
                        {/* Self & Family */}
                        <Card padding="none">
                            <div className="p-5 border-b border-[#1A2A3A] bg-[#0A1420]/30 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#00E5A0]/20 text-[#00E5A0] flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                                </div>
                                <h3 className="font-bold text-white text-lg">Self, Spouse, and Dependent Children</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-lg p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-white text-sm mb-1">Company Group Insurance</h4>
                                            <p className="text-xs text-[#8899AA]">
                                                Your company provides health insurance. Premium covered: ₹8,500/year (Employer paid)
                                            </p>
                                        </div>
                                        <Badge variant="success">Active</Badge>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="self-premium" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                                Additional premium paid by you (Top-up):
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-[#8899AA]">₹</span>
                                                <input
                                                    id="self-premium"
                                                    type="text"
                                                    defaultValue="15,000"
                                                    readOnly
                                                    className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="insurance-provider" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                                    Insurance Provider
                                                </label>
                                                <input
                                                    id="insurance-provider"
                                                    type="text"
                                                    defaultValue="Star Health Insurance"
                                                    readOnly
                                                    className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="policy-number" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                                    Policy Number
                                                </label>
                                                <input
                                                    id="policy-number"
                                                    type="text"
                                                    defaultValue="SHI/2024/123456"
                                                    readOnly
                                                    className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm font-mono text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 border border-white/10 bg-[#0A1420] rounded-lg">
                                            <span className="text-sm text-[#c8d8e8] flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-[#00E5A0]" aria-hidden="true" />
                                                Premium Certificate .pdf
                                            </span>
                                            <span className="text-xs font-bold text-[#00E5A0]">Uploaded</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Preventive Health Check-up */}
                                <div className="border hover:border-white/20 border-white/5 rounded-lg p-5 transition-colors">
                                    <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                                        <HeartPulse className="w-4 h-4 text-pink-500" aria-hidden="true" />
                                        Preventive Health Check-up
                                    </h4>
                                    <p className="text-xs text-[#8899AA] mb-4">Cash payment allowed. Max ₹5,000 within 80D limit.</p>
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-1">
                                            <label htmlFor="health-checkup" className="sr-only">Preventive health check-up amount</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-[#8899AA]">₹</span>
                                                <input
                                                    id="health-checkup"
                                                    type="text"
                                                    defaultValue="5,000"
                                                    readOnly
                                                    className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                                />
                                            </div>
                                        </div>
                                        <Button variant="secondary" size="sm" icon={<UploadCloud className="w-4 h-4" />}>
                                            Upload Receipt
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Parents */}
                        <Card padding="none">
                            <div className="p-5 border-b border-[#1A2A3A] bg-[#0A1420]/30 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center">
                                        <Users className="w-5 h-5" aria-hidden="true" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg">Parents&apos; Health Insurance</h3>
                                </div>
                                <div className="flex items-center gap-2 bg-[#0A1420] p-1 rounded-lg border border-white/5">
                                    <Button variant="primary" size="sm">Yes</Button>
                                    <Button variant="ghost" size="sm">No</Button>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="parent-premium" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                            Annual Premium
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-[#8899AA]">₹</span>
                                            <input
                                                id="parent-premium"
                                                type="text"
                                                defaultValue="12,000"
                                                readOnly
                                                className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Who pays the premium?</label>
                                        <fieldset role="radiogroup" aria-label="Premium payer" className="border-0 p-0 m-0">
                                            <legend className="sr-only">Who pays the premium?</legend>
                                            <div className="flex items-center gap-4 mt-2">
                                                <label className="flex items-center gap-2 text-sm text-[#c8d8e8] cursor-pointer">
                                                    <input type="radio" name="payer" defaultChecked className="accent-[#0066FF]" />
                                                    I pay
                                                </label>
                                                <label className="flex items-center gap-2 text-sm text-[#445566] cursor-pointer">
                                                    <input type="radio" name="payer" className="accent-[#0066FF]" />
                                                    Parents pay
                                                </label>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="parent-insurer" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                            Insurance Provider
                                        </label>
                                        <input
                                            id="parent-insurer"
                                            type="text"
                                            defaultValue="HDFC Ergo"
                                            readOnly
                                            className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="parent-policy" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                            Policy Number
                                        </label>
                                        <input
                                            id="parent-policy"
                                            type="text"
                                            defaultValue="HDFCPAR123"
                                            readOnly
                                            className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm font-mono text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <Button variant="secondary" className="w-full" icon={<UploadCloud className="w-4 h-4" />}>
                                        Upload Premium Receipt
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Panel */}
                    <div className="xl:col-span-5 space-y-6">
                        {/* Summary */}
                        <Card padding="lg">
                            <h3 className="text-lg font-bold text-white mb-5 border-b border-white/10 pb-4">80D Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-[#c8d8e8]">
                                    <span>Self + Family premium</span>
                                    <span className="font-mono">₹{selfPremium.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-[#c8d8e8] pb-2 border-b border-white/5">
                                    <span className="text-xs text-[#445566]">Preventive check-up</span>
                                    <span className="font-mono text-xs">₹{healthCheckup.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-[#c8d8e8]">
                                    <span>Parents&apos; premium</span>
                                    <span className="font-mono">₹{parentsPremium.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="pt-3 border-t border-white/10 flex justify-between text-white font-bold text-base">
                                    <span>Total 80D Deduction</span>
                                    <span className="font-mono">₹{total80D.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-[#00E5A0] font-bold pb-1 pt-1">
                                    <span className="text-sm">Tax saving (22% slab)</span>
                                    <span className="font-mono">₹{(total80D * 0.22).toLocaleString("en-IN")} / year</span>
                                </div>
                            </div>
                        </Card>

                        {/* AI Suggestion */}
                        <Card padding="lg" className="border border-[#FFB800]/30 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 opacity-5 text-[#FFB800]" aria-hidden="true">
                                <Lightbulb className="w-32 h-32" />
                            </div>
                            <h4 className="font-bold text-[#FFB800] text-sm mb-2 flex items-center gap-2 relative z-10">
                                <Lightbulb className="w-4 h-4" aria-hidden="true" /> AI Suggestion
                            </h4>
                            <p className="text-xs text-[#c8d8e8] leading-relaxed relative z-10 space-y-2">
                                <span className="block">
                                    You have <b className="text-white">₹{selfRemaining.toLocaleString("en-IN")}</b> remaining in your self limit. Consider topping up your health insurance for better coverage and tax savings.
                                </span>
                                <span className="block">
                                    Your parents qualify for <b className="text-white">₹{parentsLimit.toLocaleString("en-IN")}</b> limit
                                    {seniorParents ? " (Senior status)" : " (Standard status)"}. Current claim: ₹{parentsTotal.toLocaleString("en-IN")}.{" "}
                                    <b className="text-[#FFB800]">₹{parentsRemaining.toLocaleString("en-IN")}</b> more can be claimed if premium increases.
                                </span>
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
