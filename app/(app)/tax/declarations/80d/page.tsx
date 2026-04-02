"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ChevronRight,
    ShieldCheck,
    Plus,
    Info,
    CheckCircle2,
    Users,
    UserCheck,
    HeartPulse,
    Lightbulb,
    UploadCloud
} from "lucide-react";

export default function Section80DPage() {
    const [seniorParents, setSeniorParents] = useState(false);
    const selfLimit = 25000;
    const parentsLimit = seniorParents ? 50000 : 25000;

    const selfPremium = 15000;
    const healthCheckup = 5000;
    const selfTotal = selfPremium + healthCheckup;

    const parentsPremium = 12000;
    const parentsTotal = parentsPremium;

    const total80D = selfTotal + parentsTotal;
    const totalLimit = selfLimit + parentsLimit;

    const selfRemaining = Math.max(0, selfLimit - selfTotal);
    const parentsRemaining = Math.max(0, parentsLimit - parentsTotal);

    return (
        <div className="min-h-screen bg-[#0A1420] text-slate-200 font-sans p-6 pb-24">
            {/* HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                    <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/tax/declarations" className="hover:text-white transition-colors">Declarations</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-200">80D Insurance</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Section 80D — Health Insurance</h1>
                        <p className="text-slate-400">Deduction for health insurance premiums & preventive check-ups</p>
                    </div>
                    <div className="bg-[#0066FF]/10 border border-[#0066FF]/20 px-4 py-3 rounded-lg flex items-center gap-3">
                        <Info className="w-5 h-5 text-[#0066FF]" />
                        <p className="text-sm font-medium text-[#0066FF]">Senior citizen parents qualify for ₹50,000 limit instead of ₹25,000</p>
                    </div>
                </div>
            </div>

            {/* LIMIT OVERVIEW (Top) */}
            <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Bar 1: Self + Family */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <span className="font-bold text-white text-lg">Self + Family Limit</span>
                            <span className="text-sm font-medium text-slate-400">₹{selfTotal.toLocaleString('en-IN')} / ₹{selfLimit.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="h-3 bg-[#0A1420] rounded-full overflow-hidden flex ring-1 ring-inset ring-white/5 mb-2">
                            <div className="h-full bg-[#00E5A0] transition-all duration-500" style={{ width: `${(selfTotal / selfLimit) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#00E5A0]" /> Includes ₹5,000 preventive check-up
                        </p>
                    </div>

                    {/* Bar 2: Parents */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <span className="font-bold text-white text-lg flex items-center gap-2">
                                Parents Limit
                                <label className="flex items-center gap-2 text-xs font-normal text-slate-400 bg-slate-800 px-2 py-1 rounded cursor-pointer">
                                    <input type="checkbox" className="rounded bg-slate-700 border-slate-600 text-[#0066FF]" checked={seniorParents} onChange={(e) => setSeniorParents(e.target.checked)} />
                                    Senior Citizens (60+)
                                </label>
                            </span>
                            <span className="text-sm font-medium text-slate-400">₹{parentsTotal.toLocaleString('en-IN')} / ₹{parentsLimit.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="h-3 bg-[#0A1420] rounded-full overflow-hidden flex ring-1 ring-inset ring-white/5 mb-2">
                            <div className="h-full bg-[#0066FF] transition-all duration-500" style={{ width: `${(parentsTotal / parentsLimit) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Info className="w-3 h-3 text-[#0066FF]" />
                            {seniorParents ? "Enhanced ₹50k limit active" : "Standard ₹25k limit"}
                        </p>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* LEFT PANEL: DECLARATION FORM (700px equivalent) */}
                <div className="xl:col-span-7 space-y-6">

                    {/* SECTION A - SELF */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 overflow-hidden">
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#00E5A0]/20 text-[#00E5A0] flex items-center justify-center">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-white text-lg">Self, Spouse, and Dependent Children</h3>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-lg p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-white text-sm mb-1">Company Group Insurance</h4>
                                        <p className="text-xs text-slate-400">Your company provides health insurance. Premium covered: ₹8,500/year (Employer paid)</p>
                                    </div>
                                    <span className="px-2 py-1 bg-[#00E5A0]/10 text-[#00E5A0] text-xs font-bold rounded">Active</span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Additional premium paid by you (Top-up):</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                            <input type="text" value="15,000" readOnly className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-400 mb-1.5">Insurance Provider</label>
                                            <input type="text" value="Star Health Insurance" readOnly className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-slate-300 focus:outline-none focus:border-[#0066FF]" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-400 mb-1.5">Policy Number</label>
                                            <input type="text" value="SHI/2024/123456" readOnly className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm font-mono text-slate-300 focus:outline-none focus:border-[#0066FF]" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between p-3 border border-white/10 bg-[#0A1420] rounded-lg">
                                            <span className="text-sm text-slate-300 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#00E5A0]" /> Premium Certificate .pdf</span>
                                            <span className="text-xs font-bold text-[#00E5A0]">Uploaded</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Preventive Health Check-up */}
                            <div className="border hover:border-white/20 border-white/5 rounded-lg p-5 transition-colors">
                                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                                    <HeartPulse className="w-4 h-4 text-pink-500" /> Preventive Health Check-up
                                </h4>
                                <p className="text-xs text-slate-400 mb-4">Cash payment allowed. Max ₹5,000 within 80D limit.</p>

                                <div className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                            <input type="text" value="5,000" readOnly className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                                        </div>
                                    </div>
                                    <button className="flex-1 px-4 py-2.5 border border-dashed border-white/20 text-slate-400 hover:text-white rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                                        <UploadCloud className="w-4 h-4" /> Upload Receipt
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION B - PARENTS */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 overflow-hidden">
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center">
                                    <Users className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-white text-lg">Parents&apos; Health Insurance</h3>
                            </div>
                            <div className="flex items-center gap-2 bg-[#0A1420] p-1 rounded-lg border border-white/5">
                                <button className="px-3 py-1 bg-[#0066FF] text-white text-xs font-bold rounded">Yes</button>
                                <button className="px-3 py-1 text-slate-400 hover:text-white text-xs font-bold rounded transition-colors">No</button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Annual Premium</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                        <input type="text" value="12,000" readOnly className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Who pays the premium?</label>
                                    <div className="flex items-center gap-2 mt-2">
                                        <label className="flex items-center gap-2 text-sm text-slate-300">
                                            <input type="radio" name="payer" defaultChecked className="accent-[#0066FF]" /> I pay
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-500 ml-4">
                                            <input type="radio" name="payer" className="accent-[#0066FF]" /> Parents pay
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Insurance Provider</label>
                                    <input type="text" value="HDFC Ergo" readOnly className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-slate-300 focus:outline-none focus:border-[#0066FF]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Policy Number</label>
                                    <input type="text" value="HDFCPAR123" readOnly className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm font-mono text-slate-300 focus:outline-none focus:border-[#0066FF]" />
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/5">
                                <div className="flex items-center justify-between p-3 border border-dashed hover:border-white/30 transition-colors border-white/20 bg-white/5 rounded-lg cursor-pointer group">
                                    <span className="text-sm text-slate-300 flex items-center gap-2 group-hover:text-white"><UploadCloud className="w-4 h-4 text-slate-400" /> Upload Premium Receipt</span>
                                    <span className="text-xs font-bold text-[#0066FF]">Browse Files</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT PANEL (500px equivalent) */}
                <div className="xl:col-span-5 space-y-6">

                    {/* FAMILY DIAGRAM */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 overflow-hidden shadow-xl">
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30">
                            <h3 className="font-bold text-white text-lg">Family Coverage View</h3>
                        </div>
                        <div className="p-6">

                            {/* Tree nodes */}
                            <div className="space-y-4">
                                {/* Self */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src="https://ui-avatars.com/api/?name=Arjun+Mehta&background=0A1420&color=fff&rounded=true" className="w-8 h-8 rounded-full border border-white/10" alt="avatar" />
                                        <div>
                                            <p className="text-sm font-bold text-white">Arjun Mehta (Self)</p>
                                            <p className="text-xs text-[#00E5A0]">₹15,000 covered</p>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-[#00E5A0]" />
                                </div>

                                {/* Spouse */}
                                <div className="flex items-center justify-between pl-8 border-l border-white/10 ml-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30 text-xs font-bold">SP</div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Spouse</p>
                                            <p className="text-xs text-slate-500">Covered under same policy</p>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="w-4 h-4 text-[#00E5A0]" />
                                </div>

                                {/* Add Child */}
                                <div className="flex items-center justify-between pl-8 border-l border-white/10 ml-4 pb-4 border-b border-white/5">
                                    <button className="flex items-center gap-2 text-xs font-bold text-[#0066FF] hover:text-[#3385FF] transition-colors">
                                        <Plus className="w-3 h-3" /> Add Child Dependent
                                    </button>
                                </div>

                                {/* Father */}
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center border border-[#0066FF]/30 text-xs font-bold">F</div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Father {seniorParents ? " (Senior)" : ""}</p>
                                            <p className="text-xs text-[#0066FF]">₹12,000 covered (HDFC)</p>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-[#0066FF]" />
                                </div>

                                {/* Mother */}
                                <div className="flex items-center justify-between pl-8 border-l border-white/10 ml-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center border border-[#0066FF]/30 text-xs font-bold">M</div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Mother {seniorParents ? " (Senior)" : ""}</p>
                                            <p className="text-xs text-slate-500">Covered under parents&apos; policy</p>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* SUMMARY TABLE */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-5 border-b border-white/10 pb-4">80D Summary</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-slate-300">
                                <span>Self + Family premium</span>
                                <span className="font-mono">₹{selfPremium.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-slate-300 pb-2 border-b border-white/5">
                                <span className="text-xs text-slate-500">Preventive check-up</span>
                                <span className="font-mono text-xs">₹{healthCheckup.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>Parents&apos; premium</span>
                                <span className="font-mono">₹{parentsPremium.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="pt-3 border-t border-white/10 flex justify-between text-white font-bold text-base">
                                <span>Total 80D Deduction</span>
                                <span className="font-mono">₹{total80D.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-[#00E5A0] font-bold pb-1 pt-1">
                                <span className="text-sm">Tax saving (22% slab)</span>
                                <span className="font-mono">₹{(total80D * 0.22).toLocaleString('en-IN')} / year</span>
                            </div>
                        </div>
                    </div>

                    {/* AI SUGGESTION */}
                    <div className="bg-[#1A2A3A] border border-[#ffb800]/30 rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-5 text-[#ffb800]">
                            <Lightbulb className="w-32 h-32" />
                        </div>
                        <h4 className="font-bold text-[#ffb800] text-sm mb-2 flex items-center gap-2 relative z-10">
                            <Lightbulb className="w-4 h-4" /> AI Suggestion
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed relative z-10 space-y-2">
                            <span className="block">You have <b className="text-white">₹{selfRemaining.toLocaleString('en-IN')}</b> remaining in your self limit. Consider topping up your health insurance for better coverage and tax savings.</span>
                            <span className="block">Your parents qualify for <b className="text-white">₹{parentsLimit.toLocaleString('en-IN')}</b> limit{seniorParents ? ' (Senior status)' : ' (Standard status)'}. Current claim: ₹{parentsTotal.toLocaleString('en-IN')}. <b className="text-[#ffb800]">₹{parentsRemaining.toLocaleString('en-IN')}</b> more can be claimed if premium increases.</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
