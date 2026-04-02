"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home, Building, Hammer, Upload, CheckCircle2, FileText, AlertCircle } from "lucide-react";

export default function HomeLoanPage() {
    const [propertyType, setPropertyType] = useState("self"); // self, letout, underconstruction
    const [interest, setInterest] = useState(242000);
    const [principal, setPrincipal] = useState(148000);

    const sec24Cap = 200000;

    const claimableInterest = propertyType === "self" ? Math.min(interest, sec24Cap) : interest; // Let out has no cap on interest technically but overall loss carry forward is capped at 2L. For simplicity here:
    const excessInterest = Math.max(0, interest - sec24Cap);

    const taxSaved = claimableInterest * 0.22;

    return (
        <div className="min-h-screen bg-[#0A1420] text-slate-200 font-sans p-6 pb-24">
            {/* HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                    <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/tax/declarations" className="hover:text-white transition-colors">Declarations</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-200">Home Loan</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Home Loan — Tax Declaration</h1>
                <p className="text-slate-400">Section 24b (Interest) | Section 80C (Principal) | Section 80EEA (Additional interest)</p>
            </div>

            <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-lg font-bold text-white mb-3">What type of property do you have?</h2>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setPropertyType("self")}
                            className={`flex-1 min-w-[160px] p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${propertyType === 'self' ? 'border-[#0066FF] bg-[#0066FF]/10 text-white' : 'border-white/10 text-slate-400 hover:border-white/30'}`}
                        >
                            <Home className={`w-6 h-6 ${propertyType === 'self' ? 'text-[#0066FF]' : ''}`} />
                            <span className="font-bold text-sm text-center">Self-Occupied</span>
                        </button>
                        <button
                            onClick={() => setPropertyType("letout")}
                            className={`flex-1 min-w-[160px] p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${propertyType === 'letout' ? 'border-[#0066FF] bg-[#0066FF]/10 text-white' : 'border-white/10 text-slate-400 hover:border-white/30'}`}
                        >
                            <Building className={`w-6 h-6 ${propertyType === 'letout' ? 'text-[#0066FF]' : ''}`} />
                            <span className="font-bold text-sm text-center">Let-Out / Rented</span>
                        </button>
                        <button
                            onClick={() => setPropertyType("underconstruction")}
                            className={`flex-1 min-w-[160px] p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${propertyType === 'underconstruction' ? 'border-[#0066FF] bg-[#0066FF]/10 text-white' : 'border-white/10 text-slate-400 hover:border-white/30'}`}
                        >
                            <Hammer className={`w-6 h-6 ${propertyType === 'underconstruction' ? 'text-[#0066FF]' : ''}`} />
                            <span className="font-bold text-sm text-center line-clamp-2 leading-tight px-2">Under Construction</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* LEFT PANEL: HOME LOAN DETAILS (700px equivalent) */}
                <div className="xl:col-span-7 space-y-6">

                    {/* LOAN INFO */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 overflow-hidden">
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30">
                            <h3 className="font-bold text-white text-lg">Loan Details</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Bank Name</label>
                                    <input type="text" defaultValue="SBI Home Loans" className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#0066FF]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Loan Account No.</label>
                                    <input type="text" defaultValue="SBIH2024XXXXXX" className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm font-mono tracking-wider text-slate-200 focus:outline-none focus:border-[#0066FF]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Loan Disbursement Date</label>
                                    <input type="date" defaultValue="2020-03-15" className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#0066FF] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Outstanding Principal</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                        <input type="text" defaultValue="35,00,000" className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* INTEREST & PRINCIPAL */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 overflow-hidden">
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30 flex justify-between items-center">
                            <h3 className="font-bold text-white text-lg">Annual Interest Statement (FY 2024-25)</h3>
                            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase rounded border border-yellow-500/20">Requires Proof</span>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Total Interest Paid</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                        <input type="number" value={interest} onChange={(e) => setInterest(Number(e.target.value))} className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Total Principal Repaid</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                        <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                                    </div>
                                </div>
                            </div>

                            {propertyType === "self" && (
                                <div className="bg-[#0A1420] rounded-lg p-3 border border-white/5 text-sm">
                                    <p className="text-slate-400 mb-1">Max claimable interest for self-occupied: <span className="text-white font-bold">₹2,00,000</span></p>
                                    {excessInterest > 0 && <p className="text-yellow-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> ₹{(excessInterest).toLocaleString('en-IN')} interest cannot be claimed.</p>}
                                </div>
                            )}
                            <div className="bg-[#0A1420] rounded-lg p-3 border border-white/5 text-sm">
                                <p className="text-slate-400">Principal component (<span className="text-white font-bold">₹{(principal).toLocaleString('en-IN')}</span>) directly added to Section 80C pool.</p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/5">
                                <h4 className="text-sm font-bold text-slate-300 mb-2">Upload Interest Certificate</h4>
                                <p className="text-xs text-slate-500 mb-3">Download the format from your bank portal (e.g. SBI → Statement → Interest Certificate)</p>
                                <div className="flex items-center justify-between p-3 border border-dashed border-[#0066FF]/30 bg-[#0066FF]/5 rounded-lg cursor-pointer hover:bg-[#0066FF]/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-[#0066FF]" />
                                        <div>
                                            <p className="text-sm text-[#0066FF] font-medium">Upload Certificate</p>
                                            <p className="text-[10px] text-slate-400">PDF, max 5MB</p>
                                        </div>
                                    </div>
                                    <Upload className="w-4 h-4 text-[#0066FF]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FIRST TIME BUYER */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 overflow-hidden">
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30 flex justify-between items-center">
                            <h3 className="font-bold text-white text-lg">First Time Buyer (80EEA)</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-300 mb-4">Are you a first-time property buyer and the loan was sanctioned between 01/04/2019 and 31/03/2022?</p>
                            <div className="flex gap-4">
                                <button className="flex-1 p-2 bg-[#0A1420] border border-white/10 rounded-lg text-sm text-slate-400 hover:text-white transition-colors">Yes (Check Eligibility)</button>
                                <button className="flex-1 p-2 bg-[#0066FF] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#0066FF]/20">No</button>
                            </div>
                            <div className="mt-4 text-xs text-slate-500 p-3 bg-[#0A1420] rounded-lg border border-white/5">
                                80EEA provides an additional ₹1,50,000 deduction on home loan interest beyond the ₹2,00,000 limit, subject to conditions (e.g. Stamp value ≤ ₹45L).
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT PANEL: DEDUCTION TRACKER (484px equivalent) */}
                <div className="xl:col-span-5 space-y-6">

                    {/* TRACKER */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 shadow-xl overflow-hidden sticky top-6">
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30">
                            <h3 className="font-bold text-white text-lg">Deduction Tracker</h3>
                        </div>
                        <div className="p-6">

                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-slate-300 mb-3 flex justify-between">
                                    <span>Section 24b (Interest)</span>
                                    <span className="text-[#00E5A0] font-mono font-bold">₹{claimableInterest.toLocaleString('en-IN')}</span>
                                </h4>
                                <div className="space-y-2 text-xs text-slate-400 bg-[#0A1420] p-3 rounded-lg border border-white/5">
                                    <div className="flex justify-between">
                                        <span>Actual Interest</span>
                                        <span className="font-mono text-white">₹{interest.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Max Limit (Self-Occupied)</span>
                                        <span className="font-mono text-white">₹{sec24Cap.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                                        <span>Excess (Not claimed)</span>
                                        <span className="font-mono text-white">₹{excessInterest.toLocaleString('en-IN')}</span>
                                    </div>
                                    {claimableInterest === sec24Cap && (
                                        <div className="mt-2 text-[#00E5A0] font-bold flex items-center justify-end gap-1"><CheckCircle2 className="w-3 h-3" /> Fully Claimed</div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-slate-300 mb-3 flex justify-between">
                                    <span>Section 80C (Principal)</span>
                                    <span className="text-[#00E5A0] font-mono font-bold">₹{principal.toLocaleString('en-IN')}</span>
                                </h4>
                                <div className="space-y-2 text-xs text-slate-400 bg-[#0A1420] p-3 rounded-lg border border-white/5">
                                    <p>This amount is routed to the consolidated 80C pool limit of ₹1,50,000.</p>
                                    <p className="mt-2 text-[#0066FF] font-medium text-right flex items-center justify-end gap-1">View 80C Status <ChevronRight className="w-3 h-3" /></p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <h4 className="text-sm font-bold text-white mb-4">Tax Impact</h4>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-slate-300">
                                        <span>Without home loan (Tax)</span>
                                        <span className="font-mono">₹55,058</span>
                                    </div>
                                    <div className="flex justify-between text-[#00E5A0] pb-2 border-b border-white/5">
                                        <span>Home loan saves (Section 24b)</span>
                                        <span className="font-mono">-₹{taxSaved.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-white font-bold pt-1">
                                        <span>Effective tax liability</span>
                                        <span className="font-mono text-lg">₹{Math.max(0, 55058 - taxSaved).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <div className="mt-4 bg-[#0A1420] rounded-lg p-3 text-center border border-white/5">
                                    <p className="text-xs text-slate-400 mb-1">Your monthly in-hand increases by</p>
                                    <p className="text-xl font-bold text-[#00E5A0]">₹{Math.round(taxSaved / 12).toLocaleString('en-IN')} / mo</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
