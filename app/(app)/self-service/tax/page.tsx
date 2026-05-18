"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Calculator, ArrowLeft, Download, FileText } from 'lucide-react';
import Link from 'next/link';

export default function MyTaxSummaryScreen() {
    const [activeTab, setActiveTab] = useState<'computation' | 'declaration'>('computation');

    return (
        <Page
            title="My Tax Summary"
            subtitle="Review your income tax projections and submit investment declarations (FY 2025-26)."
            breadcrumbs={[{ label: "Self Service", href: "/self-service" }, { label: "Tax" }]}
            maxWidth="1300px"
        >

        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2">
                <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Calculator size={22} className="text-indigo-400" /> My Tax Summary</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Review your income tax projections and submit investment declarations (FY 2025-26).</p>
                </div>
                <div className="text-right">
                    <div className="text-[#8899AA] text-xs font-bold uppercase mb-1">Selected Regime</div>
                    <div className="text-white font-bold bg-[#1A2A3A] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-sm inline-flex items-center gap-2">
                        New Tax Regime
                    </div>
                </div>
            </div>

            <div className="flex gap-4 border-b border-[#1A2A3A] pb-0">
                <button onClick={() => setActiveTab('computation')} className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'computation' ? 'border-indigo-400 text-indigo-400' : 'border-transparent text-[#556677] hover:text-white'}`}>
                    Tax Computation (Projected)
                </button>
                <button onClick={() => setActiveTab('declaration')} className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'declaration' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-[#556677] hover:text-white'}`}>
                    Investment Declarations
                </button>
            </div>

            {activeTab === 'computation' && (
                <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                            <h3 className="text-white font-bold">Projected Annual Income & Tax</h3>
                            <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1"><Download size={14} /> PDF Copy</button>
                        </div>
                        <table className="w-full text-sm">
                            <tbody className="divide-y divide-[#1A2A3A]">
                                <tr className="hover:bg-[#131B2B]">
                                    <td className="px-5 py-4 text-[#8899AA]">Gross Annual Income (A)</td>
                                    <td className="px-5 py-4 text-right text-white font-medium">₹33,36,000</td>
                                </tr>
                                <tr className="hover:bg-[#131B2B]">
                                    <td className="px-5 py-4 text-[#8899AA]">Less: Standard Deduction (B)</td>
                                    <td className="px-5 py-4 text-right text-red-400 font-medium">- ₹50,000</td>
                                </tr>
                                <tr className="hover:bg-[#131B2B]">
                                    <td className="px-5 py-4 text-[#8899AA]">Less: Chapter VI-A Deductions (C)</td>
                                    <td className="px-5 py-4 text-right text-red-400 font-medium">- ₹0</td>
                                    <td className="w-10 text-xs text-[#556677]">(N/A in New Regime)</td>
                                </tr>
                                <tr className="bg-[#131B2B] border-t-2 border-[#2A3A4A]">
                                    <td className="px-5 py-4 text-white font-bold">Net Taxable Income (A-B-C)</td>
                                    <td className="px-5 py-4 text-right text-white font-black text-lg">₹32,86,000</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="bg-[#060D1A] p-5">
                            <h4 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-4">Tax Calculation</h4>
                            <div className="space-y-2 text-sm text-[#AABBCC]">
                                <div className="flex justify-between"><span>Tax on Income</span> <span>₹7,85,800</span></div>
                                <div className="flex justify-between"><span>Surcharge</span> <span>₹0</span></div>
                                <div className="flex justify-between"><span>Health & Education Cess (4%)</span> <span>₹31,432</span></div>
                            </div>
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#1A2A3A]">
                                <span className="text-white font-bold">Total Annual Tax Liability</span>
                                <span className="text-indigo-400 font-black text-2xl">₹8,17,232</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 text-center">
                            <h3 className="text-[#8899AA] text-sm font-bold uppercase mb-2">Monthly TDS Deduction</h3>
                            <div className="text-4xl font-black text-white mb-2">₹68,103</div>
                            <p className="text-[#556677] text-xs">Based on current projections. This may vary slightly based on actual monthly payouts and LOPs.</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'declaration' && (
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <FileText size={48} className="mx-auto text-[#556677] mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Not Applicable for New Tax Regime</h3>
                    <p className="text-[#8899AA] text-sm max-w-md mx-auto mb-6">Since you have opted for the New Tax Regime for FY 2025-26, you do not need to submit investment proofs like 80C, 80D, or Rent Receipts to save tax.</p>

                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
                        Change Regime to Old
                    </button>
                    <p className="text-xs text-[#556677] mt-3">Note: Regime change is permitted only once during the financial year.</p>
                </div>
            )}
        </div>
    
        </Page>
    );
}
