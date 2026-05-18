"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { IndianRupee, FileText, CheckCircle2, ChevronDown, Download, AlertTriangle } from 'lucide-react';

export default function FinalSettlementScreen() {
    const [expanded, setExpanded] = useState(true);

    return (
        <Page
            title="Sarah Jenkins"
            subtitle="LWD: Oct 24, 2025 • Dept: Engineering • Entity: HRFlow Tech (India) Pvt Ltd"
            breadcrumbs={[{ label: "Offboarding", href: "/offboarding" }, { label: "Settlement" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Final Clearance & Settlement (FnF)</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><IndianRupee size={24} className="text-emerald-400" /> Sarah Jenkins</h1>
                    <p className="text-[#8899AA] text-sm mt-1">LWD: Oct 24, 2025 • Dept: Engineering • Entity: HRFlow Tech (India) Pvt Ltd</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Statement
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Summary Header */}
                <div className="bg-gradient-to-r from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 shadow-xl flex items-center justify-between">
                    <div>
                        <div className="text-[#8899AA] text-sm font-bold uppercase tracking-wider mb-2">Net Settlement Amount</div>
                        <div className="text-5xl font-black text-white tracking-tight flex items-center gap-2">
                            <IndianRupee size={36} className="text-[#556677]" /> 2,45,890.00
                        </div>
                    </div>

                    <div className="text-right space-y-3">
                        <div className="flex items-center gap-2 justify-end text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                            <CheckCircle2 size={16} /> Clearance 100% Complete
                        </div>
                        <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] w-full">
                            Process Payout
                        </button>
                    </div>
                </div>

                {/* Calculation Breakdown */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full flex items-center justify-between p-5 border-b border-[#1A2A3A] bg-[#060D1A] hover:bg-[#131B2B] transition-colors"
                    >
                        <h3 className="text-white font-bold flex items-center gap-2"><FileText size={18} className="text-[#556677]" /> Full & Final Calculation Breakdown</h3>
                        <ChevronDown size={20} className={`text-[#8899AA] transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </button>

                    {expanded && (
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Earnings */}
                            <div className="p-6 border-b md:border-b-0 md:border-r border-[#1A2A3A] bg-[#060D1A]/50">
                                <h4 className="text-emerald-400 font-bold text-sm uppercase mb-4 tracking-wider">Earnings (+)</h4>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center pb-2 border-b border-[#1A2A3A] border-dashed">
                                        <span className="text-white">Basic Arrears (Oct 1 - Oct 24)</span>
                                        <span className="text-[#AABBCC] font-mono">₹ 1,12,000.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-[#1A2A3A] border-dashed">
                                        <span className="text-white">Leave Encashment (12 Days)</span>
                                        <span className="text-[#AABBCC] font-mono">₹ 48,500.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-[#1A2A3A] border-dashed">
                                        <span className="text-white">Gratuity (4 Years Completed)</span>
                                        <span className="text-[#AABBCC] font-mono">₹ 1,05,000.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-[#1A2A3A] border-dashed">
                                        <span className="text-white">Pending Reimbursements</span>
                                        <span className="text-[#AABBCC] font-mono">₹ 12,450.00</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-[#1A2A3A] flex justify-between items-center text-emerald-400 font-bold">
                                    <span>Total Gross Payable</span>
                                    <span className="font-mono">₹ 2,77,950.00</span>
                                </div>
                            </div>

                            {/* Deductions */}
                            <div className="p-6 bg-[#060D1A]/50">
                                <h4 className="text-rose-400 font-bold text-sm uppercase mb-4 tracking-wider">Deductions (-)</h4>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center pb-2 border-b border-[#1A2A3A] border-dashed">
                                        <span className="text-white">Income Tax (TDS)</span>
                                        <span className="text-[#AABBCC] font-mono">₹ 28,400.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-[#1A2A3A] border-dashed">
                                        <span className="text-white">Notice Period Buyout (4 days)</span>
                                        <span className="text-rose-400 font-mono">₹ 14,800.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-[#1A2A3A] border-dashed">
                                        <div className="flex items-center gap-1 text-white">Asset Recovery <AlertTriangle size={12} className="text-amber-400" /></div>
                                        <span className="text-rose-400 font-mono">₹ 3,660.00</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-[#1A2A3A] flex justify-between items-center text-rose-400 font-bold">
                                    <span>Total Deductions</span>
                                    <span className="font-mono">₹ 46,860.00</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-4 flex gap-4 text-sm text-sky-200/80">
                    <AlertTriangle size={20} className="text-sky-400 shrink-0" />
                    <div>
                        <strong className="text-sky-400 block mb-1">Tax Exemption Notice</strong>
                        Gratuity amount of ₹1,05,000.00 falls under the statutory exemption limit of ₹20 Lakhs under Section 10(10) of the Income Tax Act. No TDS has been computed on this component.
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
