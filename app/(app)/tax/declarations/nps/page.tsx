"use client";

import React, { useState } from "react";
import {
    Info,
    Banknote,
    Briefcase,
    Star,
    CheckCircle2,
    TrendingUp,
    UploadCloud,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function NPSPage() {
    const [pran, setPran] = useState("500987654321");
    const [voluntaryNps, setVoluntaryNps] = useState(50000);
    const [employeeNps, setEmployeeNps] = useState(0);

    const employerNps = 60000;

    // Calculation — byte-identical to pre-migration
    const voluntaryTaxSaving = Math.min(voluntaryNps, 50000) * 0.22;
    const employerTaxSaving = employerNps * 0.22;

    const currentCorpus = 240000;
    const yearsToRetirement = 31;
    const monthlyContribution = (employerNps + employeeNps + voluntaryNps) / 12;
    const r = 0.1 / 12;
    const n = yearsToRetirement * 12;
    const fvContributions = monthlyContribution * (((Math.pow(1 + r, n) - 1)) / r) * (1 + r);
    const fvPrincipal = currentCorpus * Math.pow(1 + 0.1, yearsToRetirement);
    const projectedCorpus = Math.round(fvContributions + fvPrincipal);
    const monthlyPension = Math.round(projectedCorpus * 0.4 * 0.06 / 12);

    return (
        <Page
            title="NPS — National Pension System"
            subtitle="Section 80CCD(1) + 80CCD(2) + 80CCD(1B)"
            breadcrumbs={[
                { label: "Tax", href: "/tax/declarations" },
                { label: "NPS Declaration" },
            ]}
            maxWidth="1400px"
            actions={
                <Card variant="bare" className="border border-[#0066FF]/20 bg-[#0066FF]/10 px-4 py-3 rounded-lg flex items-center gap-3">
                    <Info className="w-5 h-5 text-[#0066FF]" aria-hidden="true" />
                    <p className="text-sm font-medium text-[#0066FF]">
                        NPS offers unique tax benefits OVER AND ABOVE the ₹1.5L 80C limit.
                    </p>
                </Card>
            }
        >
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left Panel */}
                <div className="xl:col-span-7 space-y-6">
                    {/* PRAN Details */}
                    <Card padding="lg" className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                            <label htmlFor="pran-input" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                Permanent Retirement Account Number (PRAN)
                            </label>
                            <div className="relative">
                                <input
                                    id="pran-input"
                                    type="text"
                                    value={pran}
                                    onChange={(e) => setPran(e.target.value)}
                                    className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm font-mono tracking-widest text-white focus:outline-none focus:border-[#0066FF]"
                                />
                                <CheckCircle2 className="absolute right-3 top-3 w-4 h-4 text-[#00E5A0]" aria-hidden="true" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Recordkeeping Agency</label>
                            <div className="flex items-center gap-2 bg-[#0A1420] p-1 rounded-lg border border-white/5 w-fit">
                                <Button variant="primary" size="sm">NSDL</Button>
                                <Button variant="ghost" size="sm">KFintech</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Employer NPS */}
                    <Card padding="none" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none" aria-hidden="true">
                            <Briefcase className="w-24 h-24 text-white" />
                        </div>
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#0A1420]/30 flex justify-between items-center relative z-10">
                            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-[#445566]" aria-hidden="true" />
                                Employer&apos;s NPS Contribution
                            </h3>
                            <Badge variant="neutral">80CCD(2)</Badge>
                        </div>
                        <div className="p-6 relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0A1420] border border-white/5 p-4 rounded-lg">
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-1">
                                        ₹{employerNps.toLocaleString("en-IN")}
                                        <span className="text-sm font-normal text-[#445566]">/year</span>
                                    </h4>
                                    <p className="text-xs text-[#445566]">Auto-deducted (10% of Basic Pay: ₹5,000/mo)</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-[#00E5A0] font-bold flex items-center justify-end gap-1">
                                        <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Fully Exempt
                                    </p>
                                    <p className="text-[10px] text-[#445566] mt-1 uppercase tracking-widest">Over 80C Limit</p>
                                </div>
                            </div>
                            <p className="text-xs text-[#445566] mt-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#445566]" aria-hidden="true" />
                                This deduction is handled by payroll automatically and requires no additional proof.
                            </p>
                        </div>
                    </Card>

                    {/* Extra Voluntary NPS */}
                    <Card padding="none" className="border border-[#FFB800]/30">
                        <div className="p-5 border-b border-white/5 bg-gradient-to-r from-[#FFB800]/10 to-transparent flex justify-between items-center">
                            <h3 className="font-bold text-[#FFB800] text-lg flex items-center gap-2">
                                <Star className="w-5 h-5" aria-hidden="true" /> Extra Voluntary NPS
                            </h3>
                            <Badge variant="warning">80CCD(1B)</Badge>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-[#c8d8e8] mb-5">
                                An additional <b className="text-white">₹50,000</b> tax deduction is available exclusively for voluntary
                                Tier-1 NPS contributions—separate from the ₹1.5L 80C limit!
                            </p>
                            <div className="bg-[#0A1420] p-5 rounded-lg border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div>
                                    <label htmlFor="voluntary-nps" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                        Contribution to 80CCD(1B)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-[#445566]">₹</span>
                                        <input
                                            id="voluntary-nps"
                                            type="number"
                                            value={voluntaryNps}
                                            onChange={(e) => setVoluntaryNps(Number(e.target.value))}
                                            className="w-full bg-[#1A2A3A] border border-white/10 rounded-lg pl-8 p-2.5 text-sm font-bold text-white focus:outline-none focus:border-[#FFB800]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Card variant="bare" className="bg-[#1A2A3A] p-3 rounded-lg border border-white/5 text-center">
                                        <p className="text-xs text-[#445566] mb-1">Additional Tax Saved</p>
                                        <p className="text-xl font-bold text-[#FFB800]">
                                            ₹{Math.round(voluntaryTaxSaving).toLocaleString("en-IN")}
                                        </p>
                                    </Card>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="block text-xs font-medium text-[#8899AA] mb-2">Tier Type</label>
                                <fieldset role="radiogroup" aria-label="NPS tier type" className="border-0 p-0 m-0">
                                    <legend className="sr-only">NPS tier type</legend>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                            <input type="radio" name="tier" defaultChecked className="accent-[#0066FF]" />
                                            Tier I (Tax Benefit)
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-[#445566] cursor-not-allowed">
                                            <input type="radio" name="tier" disabled className="accent-[#0066FF]" />
                                            Tier II (No Tax Benefit)
                                        </label>
                                    </div>
                                </fieldset>
                            </div>

                            <div className="mt-5 flex gap-4 pr-4 border-t border-white/5 pt-5">
                                <Button variant="secondary" icon={<UploadCloud className="w-4 h-4" />}>
                                    Upload NSDL Statement
                                </Button>
                                <span className="self-center text-xs text-[#00E5A0] font-bold flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> nsdl_st_2025.pdf
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Employee NPS (in 80C) */}
                    <Card padding="md" className="opacity-70">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-[#c8d8e8] text-sm flex items-center gap-2">
                                <Banknote className="w-4 h-4 text-[#445566]" aria-hidden="true" />
                                Regular Voluntary NPS (Within 80C)
                            </h3>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <p className="text-xs text-[#445566] max-w-sm">
                                Any contribution exceeding the ₹50,000 extra limit under 80CCD(1B) can be claimed here, up to the
                                total 80C limit of ₹1.5L.
                            </p>
                            <div className="relative w-40 shrink-0">
                                <label htmlFor="employee-nps" className="sr-only">Employee NPS contribution</label>
                                <span className="absolute left-3 top-2.5 text-[#445566]">₹</span>
                                <input
                                    id="employee-nps"
                                    type="number"
                                    value={employeeNps}
                                    onChange={(e) => setEmployeeNps(Number(e.target.value))}
                                    className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2 text-sm text-white focus:outline-none focus:border-[#445566] transition-colors"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Panel */}
                <div className="xl:col-span-5 space-y-6">
                    {/* Tax Summary */}
                    <Card padding="lg" className="lg:sticky lg:top-6">
                        <h3 className="font-bold text-white text-lg mb-5">NPS Tax Benefit Summary</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex text-[10px] text-[#445566] font-bold uppercase tracking-widest pb-2 border-b border-white/5">
                                <div className="flex-1">Section</div>
                                <div className="w-24 text-right">Declared</div>
                                <div className="w-24 text-right">Tax Saved</div>
                            </div>
                            <div className="flex text-sm">
                                <div className="flex-1 text-[#c8d8e8]">Employer — 80CCD(2)</div>
                                <div className="w-24 text-right font-mono text-white">₹{employerNps.toLocaleString("en-IN")}</div>
                                <div className="w-24 text-right font-mono text-[#00E5A0]">
                                    ₹{Math.round(employerTaxSaving).toLocaleString("en-IN")}
                                </div>
                            </div>
                            <div className="flex text-sm">
                                <div className="flex-1 text-[#FFB800] font-medium">Extra — 80CCD(1B)</div>
                                <div className="w-24 text-right font-mono text-[#FFB800] font-bold">
                                    ₹{voluntaryNps.toLocaleString("en-IN")}
                                </div>
                                <div className="w-24 text-right font-mono text-[#FFB800] font-bold">
                                    ₹{Math.round(voluntaryTaxSaving).toLocaleString("en-IN")}
                                </div>
                            </div>
                            <div className="flex text-sm opacity-50">
                                <div className="flex-1 text-[#c8d8e8]">Employee — 80CCD(1)</div>
                                <div className="w-24 text-right font-mono text-white">₹{employeeNps}</div>
                                <div className="w-24 text-right font-mono text-[#00E5A0]">₹0</div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-[#00E5A0]/10 to-transparent p-4 rounded-xl border border-[#00E5A0]/20 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-[#445566] mb-0.5">Total NPS Tax Savings</p>
                                <p className="text-sm font-bold text-[#c8d8e8]">over and above 80C</p>
                            </div>
                            <p className="text-2xl font-bold font-mono text-[#00E5A0]">
                                ₹{Math.round(employerTaxSaving + voluntaryTaxSaving).toLocaleString("en-IN")}
                            </p>
                        </div>
                    </Card>

                    {/* Retirement Projection */}
                    <Card padding="lg" className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420]">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-[#0066FF]" aria-hidden="true" />
                            <h3 className="font-bold text-white text-lg">NPS Retirement Projection</h3>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-xs text-[#445566] mb-1">Projected Corpus at Age 60</p>
                                <p className="text-3xl font-bold font-mono text-[#0066FF]">
                                    ₹{(projectedCorpus / 10000000).toFixed(2)}
                                    <span className="text-lg">Cr</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-[#445566] mb-1">Monthly Pension</p>
                                <p className="text-xl font-bold font-mono text-white">
                                    ₹{monthlyPension.toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>

                        {/* Pseudo-chart */}
                        <div className="relative mb-6">
                            <div className="h-40 bg-[#0A1420] rounded-lg border border-white/5 relative overflow-hidden">
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
                                    <path d="M0,100 C20,95 40,80 60,50 C80,20 100,5 100,5 L100,100 Z" fill="rgba(0,102,255,0.2)" />
                                    <path
                                        d="M0,100 C20,95 40,80 60,50 C80,20 100,5 100,5"
                                        fill="none"
                                        stroke="#0066FF"
                                        strokeWidth="2"
                                    />
                                    <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                </svg>
                                <div className="absolute inset-0 flex items-end justify-between p-2 pb-1 text-[10px] text-[#445566]">
                                    <span>Age 29</span>
                                    <span>Age 45</span>
                                    <span>Age 60</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <Card variant="bare" className="bg-[#1A2A3A] p-2 rounded border border-white/5">
                                <span className="text-[#445566] block mb-1">Return assumed</span>
                                <span className="text-white font-bold">10% p.a.</span>
                            </Card>
                            <Card variant="bare" className="bg-[#1A2A3A] p-2 rounded border border-white/5">
                                <span className="text-[#445566] block mb-1">Annuity %</span>
                                <span className="text-white font-bold">40% of corpus</span>
                            </Card>
                        </div>
                        <p className="text-[10px] text-[#445566] mt-4 text-center">
                            Estimates based on current contributions continuing till retirement.
                        </p>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
