"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, TrendingUp, FileCheck, Plus, Trash2, Banknote, Lightbulb, CheckCircle2 } from "lucide-react";

export default function Section80CPage() {
    const limit = 150000;
    const autoEPF = 21600;

    const [declarations, setDeclarations] = useState([
        { id: 1, name: "Public Provident Fund (PPF)", amount: 50000, bank: "SBI PPF", proof: "Statement uploaded 15/01/24" },
        { id: 2, name: "ELSS Mutual Fund", amount: 38400, bank: "Axis Long Term Equity", proof: "Statement uploaded" },
    ]);

    const totalDeclared = declarations.reduce((sum, item) => sum + item.amount, 0);
    const total80C = autoEPF + totalDeclared;
    const remaining = Math.max(0, limit - total80C);

    const epfWidth = (autoEPF / limit) * 100;
    const declaredWidth = Math.min(((totalDeclared) / limit) * 100, 100 - epfWidth);

    const unaddedOptions = [
        { name: "Life Insurance Premium", icon: ShieldCheck },
        { name: "National Savings Certificate (NSC)", icon: Banknote },
        { name: "5-Year Tax Saver FD", icon: Banknote },
        { name: "Sukanya Samridhi Yojana", icon: TrendingUp },
    ];

    return (
        <div className="min-h-screen bg-[#0A1420] text-slate-200 font-sans p-6 pb-24">
            {/* HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                    <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/tax/declarations" className="hover:text-white transition-colors">Declarations</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-200">80C Investments</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Section 80C — Investment Declarations</h1>
                <p className="text-slate-400">Maximum deduction: ₹1,50,000 per year</p>
            </div>

            {/* LIMIT METER */}
            <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6 mb-6">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <span className="text-2xl font-bold text-white">₹{total80C.toLocaleString('en-IN')}</span>
                        <span className="text-slate-400"> / ₹1,50,000 declared</span>
                    </div>
                    {remaining > 0 ? (
                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm font-bold rounded-lg border border-yellow-500/20">
                            ₹{remaining.toLocaleString('en-IN')} remaining
                        </span>
                    ) : (
                        <span className="px-3 py-1 bg-[#00E5A0]/10 text-[#00E5A0] text-sm font-bold rounded-lg border border-[#00E5A0]/20 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> 80C Maxed Out!
                        </span>
                    )}
                </div>

                <div className="h-4 bg-[#0A1420] rounded-full overflow-hidden flex ring-1 ring-inset ring-white/5">
                    <div className="h-full bg-[#0066FF] transition-all duration-500" style={{ width: `${epfWidth}%` }} title={`EPF: ₹${autoEPF.toLocaleString('en-IN')}`}></div>
                    <div className="h-full bg-[#00E5A0] transition-all duration-500" style={{ width: `${declaredWidth}%` }} title={`Declared: ₹${totalDeclared.toLocaleString('en-IN')}`}></div>
                </div>

                <div className="flex font-medium text-xs mt-3 gap-6">
                    <div className="flex items-center gap-2 text-[#0066FF]"><div className="w-3 h-3 rounded-sm bg-[#0066FF]"></div> EPF (Auto): ₹{autoEPF.toLocaleString('en-IN')}</div>
                    <div className="flex items-center gap-2 text-[#00E5A0]"><div className="w-3 h-3 rounded-sm bg-[#00E5A0]"></div> Declared: ₹{totalDeclared.toLocaleString('en-IN')}</div>
                    {remaining > 0 && <div className="flex items-center gap-2 text-slate-500"><div className="w-3 h-3 rounded-sm bg-[#0A1420] border border-slate-600"></div> Remaining: ₹{remaining.toLocaleString('en-IN')}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* LEFT PANEL: INSTRUMENTS (equivalent to 720px) */}
                <div className="xl:col-span-8 space-y-4">

                    {/* AUTO FILLED CAEGORY */}
                    <h2 className="text-lg font-bold text-white mt-2">Auto-Filled from Payroll</h2>
                    <div className="bg-[#1A2A3A] rounded-xl border border-[#0066FF]/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base">Employee Provident Fund (EPF)</h3>
                                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-[#00E5A0]" /> Proof auto-verified from PF statement
                                </p>
                                <p className="text-xs text-[#0066FF] mt-1 italic">Deducted from salary: ₹1,800/mo × 12</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-white">₹21,600<span className="text-sm font-normal text-slate-400">/yr</span></div>
                            <div className="text-xs text-slate-500 mt-1 flex items-center justify-end gap-1"><ShieldCheck className="w-3 h-3" /> Auto-locked</div>
                        </div>
                    </div>

                    {/* DECLARED CATEGORY */}
                    <h2 className="text-lg font-bold text-white mt-6">Your Declarations</h2>
                    {declarations.map((item) => (
                        <div key={item.id} className="bg-[#1A2A3A] rounded-xl border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-white/20 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#00E5A0]/10 text-[#00E5A0] flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base">{item.name}</h3>
                                    <p className="text-sm text-slate-300 mt-0.5">{item.bank}</p>
                                    <p className="text-xs text-[#00E5A0] mt-1 flex items-center gap-1">
                                        <FileCheck className="w-3 h-3" /> Proof: {item.proof}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 border-t border-white/5 pt-4 sm:pt-0 sm:border-t-0">
                                <div className="text-xl font-bold text-white">₹{item.amount.toLocaleString('en-IN')}</div>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded transition-colors" title="Edit">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-red-400/10 hover:bg-red-400/20 text-red-400 rounded transition-colors" title="Remove">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* ADD MORE */}
                    <div className="space-y-3 mt-4">
                        {unaddedOptions.map((opt, i) => (
                            <div key={i} className="bg-[#1A2A3A]/50 rounded-xl border border-dashed border-white/10 p-4 flex items-center justify-between group hover:bg-[#1A2A3A] transition-all cursor-pointer hover:border-white/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-800 text-slate-400 rounded-lg group-hover:bg-[#0066FF]/20 group-hover:text-[#0066FF] transition-colors">
                                        <opt.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-400 group-hover:text-white transition-colors">{opt.name}</span>
                                </div>
                                <button className="text-sm font-medium text-[#0066FF] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                        ))}
                        <button className="w-full p-4 border border-dashed border-white/10 text-slate-400 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                            <Plus className="w-5 h-5" /> Add Other 80C Instrument
                        </button>
                    </div>

                </div>

                {/* RIGHT PANEL (equivalent to 464px) */}
                <div className="xl:col-span-4 space-y-6">

                    {/* SUMMARY CARD */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-5 border-b border-white/10 pb-4">Section 80C Summary</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-slate-300">
                                <span>Auto (EPF)</span>
                                <span className="font-mono">₹{autoEPF.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>Declared by you</span>
                                <span className="font-mono">₹{totalDeclared.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="pt-3 border-t border-white/10 flex justify-between text-white font-bold text-base">
                                <span>Total Limit Used</span>
                                <span className="font-mono">₹{total80C.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="mt-6 bg-[#0A1420] rounded-lg p-4 border border-white/5">
                            <p className="text-xs text-slate-400 mb-1">Tax saved so far (22% slab)</p>
                            <p className="text-xl font-bold text-[#00E5A0]">₹{(total80C * 0.22).toLocaleString('en-IN')}</p>

                            {remaining > 0 && (
                                <div className="mt-3 pt-3 border-t border-white/5">
                                    <p className="text-xs text-slate-400">Additional saving if maxed</p>
                                    <p className="text-sm font-bold text-yellow-500 flex items-center gap-1">
                                        <TrendingUp className="w-4 h-4" /> ₹{(remaining * 0.22).toLocaleString('en-IN')} more!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* AI OPTIMIZER CARD */}
                    {remaining > 0 && (
                        <div className="bg-gradient-to-br from-[#00E5A0]/10 to-[#0066FF]/10 rounded-xl border border-[#00E5A0]/20 p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Lightbulb className="w-24 h-24" />
                            </div>

                            <h3 className="text-lg font-bold text-[#00E5A0] mb-3 flex items-center gap-2 relative z-10">
                                <Lightbulb className="w-5 h-5" /> AI 80C Optimizer
                            </h3>

                            <p className="text-sm text-slate-300 leading-relaxed mb-5 relative z-10">
                                You have <span className="font-bold text-white">₹{remaining.toLocaleString('en-IN')}</span> of 80C limit remaining. Based on your age (29) and risk profile, here are recommended ways to maximize savings:
                            </p>

                            <div className="space-y-3 relative z-10">
                                <div className="bg-[#0A1420]/80 backdrop-blur rounded p-3 border border-white/5 hover:border-[#00E5A0]/30 transition-colors">
                                    <h4 className="font-bold text-white text-sm">Option 1: ELSS Mutual Fund</h4>
                                    <p className="text-xs text-slate-400 mt-1 mb-2">High Growth • 3 yr lock-in • 12-15% expected</p>
                                    <button className="text-xs font-bold text-[#00E5A0]">Explore ELSS →</button>
                                </div>
                                <div className="bg-[#0A1420]/80 backdrop-blur rounded p-3 border border-white/5 hover:border-[#00E5A0]/30 transition-colors">
                                    <h4 className="font-bold text-white text-sm">Option 2: 5-Year Tax Saver FD</h4>
                                    <p className="text-xs text-slate-400 mt-1 mb-2">Zero Risk • 5 yr lock-in • 6.5-7% guaranteed</p>
                                    <button className="text-xs font-bold text-[#00E5A0]">Explore FDs →</button>
                                </div>
                            </div>

                            <p className="text-[10px] text-slate-500 mt-4 relative z-10">These are AI suggestions, not financial advice.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

function Edit2({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
        </svg>
    );
}
