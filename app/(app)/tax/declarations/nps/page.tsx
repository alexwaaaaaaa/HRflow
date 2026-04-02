"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Info, Banknote, Briefcase, Star, CheckCircle2, TrendingUp } from "lucide-react";

export default function NPSPage() {
    const [pran, setPran] = useState("500987654321");
    const [voluntaryNps, setVoluntaryNps] = useState(50000); // 80CCD(1B)
    const [employeeNps, setEmployeeNps] = useState(0); // 80CCD(1)

    const employerNps = 60000; // 80CCD(2) - 10% of basic

    const voluntaryTaxSaving = Math.min(voluntaryNps, 50000) * 0.22;
    const employerTaxSaving = employerNps * 0.22;

    // Simple retirement projection for display
    const currentCorpus = 240000;
    const yearsToRetirement = 31;
    const monthlyContribution = (employerNps + employeeNps + voluntaryNps) / 12;
    // A rough Future Value approximation: FV = PMT * (((1 + r)^n - 1) / r) * (1 + r) + PV(1+r)^n
    // Let r = 10% annual = 0.00833/month
    const r = 0.10 / 12;
    const n = yearsToRetirement * 12;
    const fvContributions = monthlyContribution * (((Math.pow(1 + r, n) - 1)) / r) * (1 + r);
    const fvPrincipal = currentCorpus * Math.pow(1 + 0.10, yearsToRetirement); // Assuming 10% annual compounding for simplicity
    const projectedCorpus = Math.round(fvContributions + fvPrincipal);
    const monthlyPension = Math.round(projectedCorpus * 0.40 * 0.06 / 12); // Assuming 40% annuity, 6% return on annuity

    return (
        <div className="min-h-screen bg-[#0A1420] text-slate-200 font-sans p-6 pb-24">
            {/* HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                    <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/tax/declarations" className="hover:text-white transition-colors">Declarations</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-200">NPS Declaration</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">NPS — National Pension System</h1>
                        <p className="text-slate-400">Section 80CCD(1) + 80CCD(2) + 80CCD(1B)</p>
                    </div>
                    <div className="bg-[#0066FF]/10 border border-[#0066FF]/20 px-4 py-3 rounded-lg flex items-center gap-3">
                        <Info className="w-5 h-5 text-[#0066FF]" />
                        <p className="text-sm font-medium text-[#0066FF]">NPS offers unique tax benefits OVER AND ABOVE the ₹1.5L 80C limit.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* LEFT PANEL: DECLARATION FORM (700px equivalent) */}
                <div className="xl:col-span-7 space-y-6">

                    {/* SECTION D: PRAN DETAILS */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-slate-400 mb-1.5">Permanent Retirement Account Number (PRAN)</label>
                            <div className="relative">
                                <input type="text" value={pran} onChange={(e) => setPran(e.target.value)} className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm font-mono tracking-widest text-white focus:outline-none focus:border-[#0066FF]" />
                                <CheckCircle2 className="absolute right-3 top-3 w-4 h-4 text-[#00E5A0]" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1.5">Recordkeeping Agency</label>
                            <div className="flex items-center gap-2 bg-[#0A1420] p-1 rounded-lg border border-white/5 w-fit">
                                <button className="px-4 py-1.5 text-xs font-bold rounded bg-[#0066FF] text-white">NSDL</button>
                                <button className="px-4 py-1.5 text-xs font-bold rounded text-slate-400 hover:text-white transition-colors">KFintech</button>
                            </div>
                        </div>
                    </div>

                    {/* SECTION A: EMPLOYER NPS */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Briefcase className="w-24 h-24 text-white" />
                        </div>
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30 flex justify-between items-center relative z-10">
                            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-slate-400" /> Employer's NPS Contribution
                            </h3>
                            <span className="px-2 py-1 bg-[#0A1420] text-slate-400 text-xs font-bold rounded border border-white/10">80CCD(2)</span>
                        </div>
                        <div className="p-6 relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0A1420] border border-white/5 p-4 rounded-lg">
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-1">₹{employerNps.toLocaleString('en-IN')}<span className="text-sm font-normal text-slate-400">/year</span></h4>
                                    <p className="text-xs text-slate-500">Auto-deducted (10% of Basic Pay: ₹5,000/mo)</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-[#00E5A0] font-bold flex items-center justify-end gap-1"><CheckCircle2 className="w-3 h-3" /> Fully Exempt</p>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Over 80C Limit</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                                This deduction is handled by payroll automatically and requires no additional proof.
                            </p>
                        </div>
                    </div>

                    {/* SECTION C: EXTRA VOLUNTARY NPS */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-[#FFB800]/30 overflow-hidden shadow-[0_4px_24px_rgba(255,184,0,0.05)]">
                        <div className="p-5 border-b border-white/5 bg-gradient-to-r from-[#FFB800]/10 to-transparent flex justify-between items-center">
                            <h3 className="font-bold text-[#FFB800] text-lg flex items-center gap-2">
                                <Star className="w-5 h-5" /> Extra Voluntary NPS
                            </h3>
                            <span className="px-2 py-1 bg-[#FFB800] text-slate-900 text-[10px] uppercase tracking-widest font-black rounded shadow shadow-[#FFB800]/20">80CCD(1B)</span>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-300 mb-5">
                                An additional <b className="text-white">₹50,000</b> tax deduction is available exclusively for voluntary Tier-1 NPS contributions—separate from the ₹1.5L 80C limit!
                            </p>
                            <div className="bg-[#0A1420] p-5 rounded-lg border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Contribution to 80CCD(1B)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                        <input
                                            type="number"
                                            value={voluntaryNps}
                                            onChange={(e) => setVoluntaryNps(Number(e.target.value))}
                                            className="w-full bg-[#1A2A3A] border border-white/10 rounded-lg pl-8 p-2.5 text-sm font-bold text-white focus:outline-none focus:border-[#FFB800]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-[#1A2A3A] p-3 rounded-lg border border-white/5 text-center">
                                        <p className="text-xs text-slate-400 mb-1">Additional Tax Saved</p>
                                        <p className="text-xl font-bold text-[#FFB800]">₹{Math.round(voluntaryTaxSaving).toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="block text-xs font-medium text-slate-400 mb-2">Tier Type</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 text-sm text-white">
                                        <input type="radio" name="tier" checked readOnly className="accent-[#0066FF]" /> Tier I (Tax Benefit)
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-slate-500">
                                        <input type="radio" name="tier" disabled className="accent-[#0066FF]" /> Tier II (No Tax Benefit)
                                    </label>
                                </div>
                            </div>

                            <div className="mt-5 flex gap-4 pr-4 border-t border-white/5 pt-5">
                                <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                                    Upload NSDL Statement
                                </button>
                                <span className="self-center text-xs text-[#00E5A0] font-bold flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" /> nsdl_st_2025.pdf
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* SECTION B: EMPLOYEE NPS (IN 80C) */}
                    <div className="bg-[#1A2A3A]/50 rounded-xl border border-white/5 overflow-hidden">
                        <div className="p-4 border-b border-white/5">
                            <h3 className="font-bold text-slate-300 text-sm flex items-center gap-2">
                                <Banknote className="w-4 h-4 text-slate-400" /> Regular Voluntary NPS (Within 80C)
                            </h3>
                        </div>
                        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <p className="text-xs text-slate-400 max-w-sm">
                                Any contribution exceeding the ₹50,000 extra limit under 80CCD(1B) can be claimed here, up to the total 80C limit of ₹1.5L.
                            </p>
                            <div className="relative w-40 shrink-0">
                                <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                <input type="number" value={employeeNps} onChange={(e) => setEmployeeNps(Number(e.target.value))} className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2 text-sm text-white focus:outline-none focus:border-slate-500 transition-colors" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT PANEL: RETIREMENT CALCULATOR (484px equivalent) */}
                <div className="xl:col-span-5 space-y-6">

                    {/* TAX SUMMARY TILE */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 shadow-xl overflow-hidden sticky top-6">
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30">
                            <h3 className="font-bold text-white text-lg">NPS Tax Benefit Summary</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3 mb-6">
                                {/* Headers */}
                                <div className="flex text-[10px] text-slate-500 font-bold uppercase tracking-widest pb-2 border-b border-white/5">
                                    <div className="flex-1">Section</div>
                                    <div className="w-24 text-right">Declared</div>
                                    <div className="w-24 text-right">Tax Saved</div>
                                </div>

                                <div className="flex text-sm">
                                    <div className="flex-1 text-slate-300">Employer — 80CCD(2)</div>
                                    <div className="w-24 text-right font-mono text-white">₹{employerNps.toLocaleString('en-IN')}</div>
                                    <div className="w-24 text-right font-mono text-[#00E5A0]">₹{Math.round(employerTaxSaving).toLocaleString('en-IN')}</div>
                                </div>

                                <div className="flex text-sm">
                                    <div className="flex-1 text-[#FFB800] font-medium">Extra — 80CCD(1B)</div>
                                    <div className="w-24 text-right font-mono text-[#FFB800] font-bold">₹{voluntaryNps.toLocaleString('en-IN')}</div>
                                    <div className="w-24 text-right font-mono text-[#FFB800] font-bold">₹{Math.round(voluntaryTaxSaving).toLocaleString('en-IN')}</div>
                                </div>

                                <div className="flex text-sm opacity-50">
                                    <div className="flex-1 text-slate-300">Employee — 80CCD(1)</div>
                                    <div className="w-24 text-right font-mono text-white">₹{employeeNps}</div>
                                    <div className="w-24 text-right font-mono text-[#00E5A0]">₹0</div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-[#00E5A0]/10 to-transparent p-4 rounded-xl border border-[#00E5A0]/20 flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-slate-400 mb-0.5">Total NPS Tax Savings</p>
                                    <p className="text-sm font-bold text-slate-300">over and above 80C</p>
                                </div>
                                <p className="text-2xl font-bold font-mono text-[#00E5A0]">₹{Math.round(employerTaxSaving + voluntaryTaxSaving).toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>

                    {/* RETIREMENT CALCULATOR */}
                    <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] rounded-xl border border-white/10 shadow-xl overflow-hidden">
                        <div className="p-5 border-b border-white/5 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[#0066FF]" />
                            <h3 className="font-bold text-white text-lg">NPS Retirement Projection</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-xs text-slate-400 mb-1">Projected Corpus at Age 60</p>
                                    <p className="text-3xl font-bold font-mono text-[#0066FF]">₹{(projectedCorpus / 10000000).toFixed(2)}<span className="text-lg">Cr</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 mb-1">Monthly Pension</p>
                                    <p className="text-xl font-bold font-mono text-white">₹{monthlyPension.toLocaleString('en-IN')}</p>
                                </div>
                            </div>

                            {/* Visualization */}
                            <div className="relative mb-6">
                                <div className="h-40 bg-[#0A1420] rounded-lg border border-white/5 relative overflow-hidden group">
                                    {/* Pseudo-chart SVG */}
                                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <path d="M0,100 C20,95 40,80 60,50 C80,20 100,5 100,5 L100,100 Z" fill="rgba(0,102,255,0.2)" />
                                        <path d="M0,100 C20,95 40,80 60,50 C80,20 100,5 100,5" fill="none" stroke="#0066FF" strokeWidth="2" />
                                        <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-end justify-between p-2 pb-1 text-[10px] text-slate-500">
                                        <span>Age 29</span>
                                        <span>Age 45</span>
                                        <span>Age 60</span>
                                    </div>
                                </div>
                            </div>

                            {/* Inputs mini */}
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="bg-[#1A2A3A] p-2 rounded border border-white/5">
                                    <span className="text-slate-500 block mb-1">Return assumed</span>
                                    <span className="text-white font-bold">10% p.a.</span>
                                </div>
                                <div className="bg-[#1A2A3A] p-2 rounded border border-white/5">
                                    <span className="text-slate-500 block mb-1">Annuity %</span>
                                    <span className="text-white font-bold">40% of corpus</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-600 mt-4 text-center">Estimates based on current contributions continuing till retirement.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
