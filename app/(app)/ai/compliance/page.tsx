"use client";

import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, Search, CheckCircle, AlertTriangle, FileText, CheckSquare, Settings2, ShieldAlert } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ComplianceAIPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <ShieldCheck size={28} className="text-emerald-400" /> AI Compliance Audit
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Continuous scanning of company policies against active employment contracts, payroll configurations, and recent gazette updates.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Settings2 size={16} className="mr-2" /> Audit Configurations
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border-none py-2 px-6">
                        Run Full Scan <ShieldCheck size={16} className="ml-2" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">

                {/* Score & Factors */}
                <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2">

                    <div className="bg-gradient-to-b from-[#0D1928] to-[#131B2B] border border-emerald-500/30 p-8 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="text-[#8899AA] text-sm font-semibold uppercase tracking-widest mb-4 relative z-10">Overall Compliance Health</div>

                        <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="88" stroke="#1A2A3A" strokeWidth="12" fill="none" />
                                <circle cx="96" cy="96" r="88" stroke="#10b981" strokeWidth="12" fill="none" strokeDasharray="552.92" strokeDashoffset="55.29" className="transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#8899AA]">92</span>
                                <span className="text-emerald-400 text-sm font-bold mt-1">/ 100</span>
                            </div>
                        </div>

                        <p className="text-[#8899AA] text-xs leading-relaxed max-w-[200px] relative z-10">
                            Based on real-time statutory limits, policy configurations, and 4,402 active employee records.
                        </p>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl flex-1">
                        <h3 className="text-white font-semibold mb-6 flex items-center gap-2">Health Breakdown</h3>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-[#8899AA] flex items-center gap-2"><FileText size={14} /> Labor Law (State/Central)</span>
                                    <span className="text-emerald-400 font-bold">98%</span>
                                </div>
                                <div className="w-full bg-[#1A2A3A] rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full w-[98%]"></div></div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-[#8899AA] flex items-center gap-2"><CheckSquare size={14} /> Payroll Submissions (PF/ESI)</span>
                                    <span className="text-amber-500 font-bold">85%</span>
                                </div>
                                <div className="w-full bg-[#1A2A3A] rounded-full h-1.5"><div className="bg-amber-500 h-1.5 rounded-full w-[85%]"></div></div>
                                <p className="text-[10px] text-amber-500/80 mt-1 uppercase tracking-wider font-semibold">1 Missing Integration Detected</p>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-[#8899AA] flex items-center gap-2"><ShieldAlert size={14} /> External Vendor Compliance</span>
                                    <span className="text-red-400 font-bold">76%</span>
                                </div>
                                <div className="w-full bg-[#1A2A3A] rounded-full h-1.5"><div className="bg-red-500 h-1.5 rounded-full w-[76%]"></div></div>
                                <p className="text-[10px] text-red-400 mt-1 uppercase tracking-wider font-semibold">3 Visa Expiries Active</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Audit Items */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden h-full">
                    <div className="px-6 py-5 border-b border-[#1A2A3A] shrink-0 flex justify-between items-center bg-[#0A1420]">
                        <h3 className="text-white font-semibold flex items-center gap-2">Detected Audit Flags <span className="bg-[#1A2A3A] text-[#8899AA] text-xs px-2 py-0.5 rounded ml-2">4 Active</span></h3>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1.5 text-xs text-red-500 font-medium bg-red-500/10 px-2 py-1 rounded">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> 1 Critical
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">

                        {/* High Priority Item */}
                        <div className="bg-[#131B2B] border border-red-500/30 rounded-xl p-5 hover:border-red-500/50 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-500/10 text-red-400 p-2 rounded-lg">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium group-hover:text-red-400 transition-colors">Vendor Contract Violations (Visas)</h4>
                                        <p className="text-xs text-[#8899AA] mt-0.5">Category: Vendor Management • Relates to ANM-902</p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-wider rounded border border-red-500/20">
                                    Critical Risk
                                </span>
                            </div>
                            <div className="bg-[#0A1420] border border-[#2A3A4A] p-4 rounded-lg mt-4 text-sm text-[#8899AA] leading-relaxed">
                                AI has cross-referenced active IT contractors against Section 14 of the Foreigners Act. <strong className="text-white">3 individuals</strong> have expired Right-to-Work documentation while remaining active on vendor payroll API feeds.
                                <div className="mt-3 flex gap-2">
                                    <Link href="/ai/anomaly-detection/ANM-902">
                                        <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-none text-xs py-1 h-auto">View Anomaly</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Medium Priority Item */}
                        <div className="bg-[#131B2B] border border-amber-500/30 rounded-xl p-5 hover:border-amber-500/50 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-amber-500/10 text-amber-500 p-2 rounded-lg">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium group-hover:text-amber-500 transition-colors">Missing Form-11 (EPFO) Direct API Sync</h4>
                                        <p className="text-xs text-[#8899AA] mt-0.5">Category: Payroll Integrations • Relates to GAZ-2023-09-C</p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider rounded border border-amber-500/20">
                                    Medium Risk
                                </span>
                            </div>
                            <div className="bg-[#0A1420] border border-[#2A3A4A] p-4 rounded-lg mt-4 text-sm text-[#8899AA] leading-relaxed">
                                A recently gazetted mandate requires native API submission for Form 11. Our current integration relies on scheduled batch CSV uploads which will be deprecated by Dec 31, 2023. Engineering has scheduled the patch but it is not yet active in production.
                            </div>
                        </div>

                        {/* Resolved Item */}
                        <div className="bg-[#131B2B] border border-emerald-500/30 rounded-xl p-5 hover:border-emerald-500/50 transition-colors cursor-pointer group opacity-60">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium line-through">Professional Tax Slabs Update (Maharashtra)</h4>
                                        <p className="text-xs text-[#8899AA] mt-0.5">Auto-Actioned by Kaarya Payroll Engine on Sep 28</p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 bg-[#1A2A3A] text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded border border-[#2A3A4A]">
                                    Resolved
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
