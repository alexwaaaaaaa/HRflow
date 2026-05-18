"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Building, Banknote, HelpCircle } from 'lucide-react';

export default function SingaporePayrollScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><span className="text-2xl">🇸🇬</span> Singapore CPF & Payroll Hub</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage localized SI reporting, CPF Board submissions, and SDL contributions.</p>
                </div>
                <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
                    Download IR8A Tax Forms
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Total Gross Processing (Oct 2025)</div>
                    <div className="text-3xl font-black text-white mb-2">342.5k <span className="text-sm text-[#556677] font-bold">SGD</span></div>
                    <div className="text-[#8899AA] text-xs font-bold">32 Employees (Singapore Branch)</div>
                </div>

                <div className="bg-[#0A1420] border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden cursor-pointer hover:border-cyan-500 transition-colors group">
                    <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 flex justify-between items-center">
                        Total Employer CPF
                        <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"><ChevronRightIcon /></div>
                    </div>
                    <div className="text-3xl font-black text-white mb-2">56.4k <span className="text-sm text-[#556677] font-bold">SGD</span></div>
                    <div className="text-[#8899AA] text-xs">Automated based on age & PR status brackets</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden cursor-pointer hover:border-[#2A3A4A] transition-colors group">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex justify-between items-center">
                        Self-Help Group (SHG) Funds
                        <div className="w-6 h-6 rounded-full bg-[#131B2B] flex items-center justify-center"><ChevronRightIcon /></div>
                    </div>
                    <div className="text-3xl font-black text-white mb-2">1,250 <span className="text-sm text-[#556677] font-bold">SGD</span></div>
                    <div className="text-[#8899AA] text-xs">CDAC, ECF, MBMF, SINDA deducted</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                        <h3 className="text-white font-bold flex items-center gap-2"><Banknote size={18} className="text-emerald-400" /> CPF e-Submission (FTP)</h3>
                        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20">Ready for Transfer</span>
                    </div>
                    <div className="p-6 space-y-6">
                        <p className="text-[#8899AA] text-sm leading-relaxed">The monthly FTP file (TXT format) containing all Central Provident Fund, SHG, and Skills Development Levy (SDL) contributions is generated and validated against CPF Board specs.</p>

                        <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A] text-sm">
                                <span className="text-white font-bold">Total File Value</span>
                                <span className="font-mono text-emerald-400 font-bold">112,850.00 SGD</span>
                            </div>
                            <div className="flex justify-between p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A] text-sm">
                                <span className="text-white font-bold">Total Records</span>
                                <span className="font-mono text-white font-bold">32</span>
                            </div>
                            <div className="flex justify-between p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A] text-sm">
                                <span className="text-white font-bold">Due Date</span>
                                <span className="text-rose-400 font-bold">14 Nov 2025</span>
                            </div>
                        </div>

                        <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            Transmit file via CPF EZPay
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-3 mb-4">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <Building size={18} className="text-indigo-400" /> Skills Development Levy (SDL)
                            </h3>
                            <HelpCircle size={16} className="text-[#556677] cursor-help" />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[#8899AA] text-sm">Calculated at 0.25% of gross (Capped)</span>
                            <span className="text-2xl font-black text-white font-mono">285.50 <span className="text-sm text-[#556677] font-bold">SGD</span></span>
                        </div>
                        <div className="w-full bg-[#131B2B] p-3 rounded-xl border border-[#2A3A4A] text-xs text-[#556677] leading-relaxed">
                            SDL is automatically capped at $11.25 per employee max, or minimum $2.00, routed via CPF Board.
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Foreign Worker Levy (FWL)</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#8899AA]">Work Permit Holders (WP)</span>
                                <span className="text-white font-bold font-mono">4</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#8899AA]">S Pass Holders</span>
                                <span className="text-white font-bold font-mono">2</span>
                            </div>
                            <div className="pt-3 border-t border-[#1A2A3A] flex items-center justify-between">
                                <span className="text-white font-bold text-sm">MOM Levy Estimate</span>
                                <span className="text-rose-400 font-bold font-mono">2,400.00 SGD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChevronRightIcon() {
    return (
        <Page
            title="Singapore Payroll"
            subtitle="Manage localized SI reporting, CPF Board submissions, and SDL contributions."
            breadcrumbs={[{ label: "Global", href: "/global" }, { label: "Singapore Payroll" }]}
            maxWidth="1400px"
        >

        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
        </svg>
    
        </Page>
    );
}
