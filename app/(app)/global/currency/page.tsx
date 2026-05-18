"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { DollarSign, Search, ArrowRightLeft, RefreshCw, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CurrencyMgmtScreen() {
    const [base, setBase] = useState('INR');

    return (
        <Page
            title="Multi-Currency Settings"
            subtitle="Configure reporting currencies, exchange rate synchronization, and baseline corporate currency."
            breadcrumbs={[{ label: "Global", href: "/global" }, { label: "Currency" }]}
            maxWidth="1300px"
        >

        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><DollarSign size={24} className="text-amber-400" /> Multi-Currency Settings</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Configure reporting currencies, exchange rate synchronization, and baseline corporate currency.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/global/exchange-rates" className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        View Rate History <ArrowRightLeft size={16} />
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-6">
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">Corporate Reporting Currency</h3>
                                <p className="text-[#8899AA] text-xs">The primary currency used for all consolidated global reports (Analytics, Cost, Headcount Budgets).</p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-full border border-amber-500/30 text-amber-400 font-black text-xl">
                                ₹
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl mb-6">
                            <select value={base} onChange={e => setBase(e.target.value)} className="bg-[#060D1A] border border-[#2A3A4A] text-white font-bold px-4 py-2.5 rounded-lg outline-none w-48 text-lg">
                                <option value="INR">INR (Indian Rupee)</option>
                                <option value="USD">USD (US Dollar)</option>
                                <option value="EUR">EUR (Euro)</option>
                            </select>
                            <div className="text-sm text-[#8899AA] bg-amber-500/5 px-4 py-2 rounded-lg border border-amber-500/20 text-amber-200">
                                <AlertCircle size={14} className="inline mr-1 -mt-0.5 text-amber-400" />
                                Changing base currency triggers background recalculation of all historical dashboard values.
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col h-[400px]">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between shrink-0">
                            <h3 className="text-white font-bold">Active Transaction Currencies (Local Payrolls)</h3>
                            <div className="relative w-48">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                                <input type="text" placeholder="Search..." className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs outline-none" />
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                        <th className="p-4 py-3 sticky top-0 bg-[#131B2B]">Currency</th>
                                        <th className="p-4 py-3 sticky top-0 bg-[#131B2B]">Code</th>
                                        <th className="p-4 py-3 sticky top-0 bg-[#131B2B]">Symbol</th>
                                        <th className="p-4 py-3 sticky top-0 bg-[#131B2B] text-right">In Use By</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { name: 'Indian Rupee', code: 'INR', sym: '₹', use: 'Acme India (Parent)' },
                                        { name: 'US Dollar', code: 'USD', sym: '$', use: 'Acme Inc (US), Expats' },
                                        { name: 'UAE Dirham', code: 'AED', sym: 'د.إ', use: 'Acme Middle East LLC' },
                                        { name: 'Singapore Dollar', code: 'SGD', sym: 'S$', use: 'Acme APAC Pte Ltd' },
                                    ].map((c, i) => (
                                        <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors">
                                            <td className="p-4 text-white font-bold">{c.name}</td>
                                            <td className="p-4 font-mono text-[#8899AA]">{c.code}</td>
                                            <td className="p-4 font-mono text-amber-400 font-bold text-lg">{c.sym}</td>
                                            <td className="p-4 text-right text-[#AABBCC] text-xs">{c.use}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-3 bg-[#060D1A] border-t border-[#1A2A3A] text-center">
                            <button className="text-amber-500 hover:text-amber-400 text-xs font-bold transition-colors">
                                + Add Currency Support
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center justify-between">
                            Exchange Rate Config
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">Sync Source Provider</label>
                                <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white font-bold px-4 py-3 rounded-xl outline-none">
                                    <option>Open Exchange Rates (OER)</option>
                                    <option>Fixer.io</option>
                                    <option>European Central Bank API</option>
                                    <option>Manual Entry Only</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">Auto-Sync Frequency</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-[#1A2A3A] border border-amber-500/50 text-amber-400 font-bold px-3 py-2 rounded-lg text-xs text-center cursor-pointer">Daily (EOD)</div>
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] hover:bg-[#1A2A3A] text-[#8899AA] font-bold px-3 py-2 rounded-lg text-xs text-center cursor-pointer transition-colors">Monthly Close</div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#1A2A3A]">
                                <button className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                                    <RefreshCw size={16} className="text-amber-400" /> Force Sync Now
                                </button>
                                <p className="text-center text-[#556677] text-[10px] mt-2">Last sync: 2 hours ago (Success)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
