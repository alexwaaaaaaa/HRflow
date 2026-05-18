"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { ArrowRightLeft, Search, Filter, RefreshCw, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function ExchangeRateScreen() {
    const [base, setBase] = useState('INR');

    const RATES = [
        { curr: 'US Dollar', code: 'USD', val: 83.45, change: '+0.12', trend: 'up' },
        { curr: 'Euro', code: 'EUR', val: 90.12, change: '-0.05', trend: 'down' },
        { curr: 'UAE Dirham', code: 'AED', val: 22.72, change: '+0.03', trend: 'up' },
        { curr: 'Singapore Dollar', code: 'SGD', val: 61.50, change: '+0.15', trend: 'up' },
        { curr: 'British Pound', code: 'GBP', val: 105.80, change: '-0.20', trend: 'down' },
    ];

    return (
        <Page
            title="FX & Exchange Rates Matrix"
            subtitle="Live exchange rates and historical conversion logs for cross-border payroll processing."
            breadcrumbs={[{ label: "Global", href: "/global" }, { label: "Exchange Rates" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><ArrowRightLeft size={24} className="text-amber-400" /> FX & Exchange Rates Matrix</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Live exchange rates and historical conversion logs for cross-border payroll processing.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Rate History
                    </button>
                    <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                        <RefreshCw size={16} /> Force Sync
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-4 items-center justify-between bg-[#060D1A]">
                    <div className="flex items-center gap-3 text-sm text-white font-bold">
                        <span className="text-[#556677]">Base Currency:</span>
                        <select value={base} onChange={e => setBase(e.target.value)} className="bg-[#131B2B] border border-[#2A3A4A] px-3 py-1.5 rounded-lg outline-none cursor-pointer focus:border-amber-500 transition-colors">
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="text-[#8899AA] hover:text-white transition-colors bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg"><Filter size={16} /></button>
                        <div className="relative flex-1 md:w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search Currency..."
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-amber-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-5 divide-x divide-[#1A2A3A] border-b border-[#1A2A3A]">
                    {RATES.map((r, i) => (
                        <div key={i} className="p-6 hover:bg-[#131B2B]/30 transition-colors">
                            <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                                {r.code}
                                <span className={`flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded ${r.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                    {r.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />} {r.change}
                                </span>
                            </div>
                            <div className="flex items-end gap-2">
                                <div className="text-2xl font-black text-white font-mono">{r.val.toFixed(4)}</div>
                            </div>
                            <div className="text-[#556677] text-[10px] mt-1">1 {r.code} = {r.val.toFixed(4)} {base}</div>
                        </div>
                    ))}
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white font-bold">Conversion Log (Payroll Runs)</h3>
                        <span className="text-xs text-[#556677]">Automatically recorded during payroll commit</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                    <th className="p-4 py-3">Payroll Cycle</th>
                                    <th className="p-4 py-3">Entity / Group</th>
                                    <th className="p-4 py-3">Conversion Path</th>
                                    <th className="p-4 py-3 text-right">Applied Rate</th>
                                    <th className="p-4 py-3 text-right">Converted Amount (Base)</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm border-b border-[#1A2A3A]">
                                <tr className="hover:bg-[#131B2B]/50 transition-colors">
                                    <td className="p-4 font-bold text-white">Oct 2025</td>
                                    <td className="p-4 text-[#AABBCC]">Acme US Inc</td>
                                    <td className="p-4 text-[#8899AA] font-mono text-xs">USD &rarr; INR</td>
                                    <td className="p-4 text-right font-mono text-white">83.4210</td>
                                    <td className="p-4 text-right font-bold text-emerald-400">₹ 2,45,00,000</td>
                                </tr>
                                <tr className="hover:bg-[#131B2B]/50 transition-colors">
                                    <td className="p-4 font-bold text-white">Oct 2025</td>
                                    <td className="p-4 text-[#AABBCC]">Acme Middle East</td>
                                    <td className="p-4 text-[#8899AA] font-mono text-xs">AED &rarr; INR</td>
                                    <td className="p-4 text-right font-mono text-white">22.7150</td>
                                    <td className="p-4 text-right font-bold text-emerald-400">₹ 4,13,00,000</td>
                                </tr>
                                <tr className="hover:bg-[#131B2B]/50 transition-colors">
                                    <td className="p-4 font-bold text-white">Sep 2025</td>
                                    <td className="p-4 text-[#AABBCC]">Acme US Inc</td>
                                    <td className="p-4 text-[#8899AA] font-mono text-xs">USD &rarr; INR</td>
                                    <td className="p-4 text-right font-mono text-white">83.3905</td>
                                    <td className="p-4 text-right font-bold text-emerald-400">₹ 2,42,00,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
