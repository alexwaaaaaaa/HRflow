"use client";
import React from 'react';
import { DollarSign, CheckCircle2, History, CreditCard, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CommissionTrackingScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Partner Commission Payouts</h1>
                    <p className="text-[#8899AA] text-sm">Calculate and disburse rev-share amounts to CAs, Affiliates, and Resellers.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

                {/* Due Payouts */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2"><DollarSign size={18} className="text-emerald-400" /> Pending Payouts (October 2026 Cycle)</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Partner Entity</th>
                                        <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Commission Base</th>
                                        <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Rate</th>
                                        <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Amount Due</th>
                                        <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { name: 'KPMG India (Payroll Div)', base: '$12,400', rate: '20%', amt: '$2,480' },
                                        { name: 'SaaS Implementors UK', base: '$8,200', rate: '15%', amt: '$1,230' },
                                        { name: 'Middle East Tech Disti', base: '$45,000', rate: '30%', amt: '$13,500' },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                            <td className="px-6 py-4 text-white font-bold text-sm">{row.name}</td>
                                            <td className="px-6 py-4 text-white font-mono text-xs">{row.base}</td>
                                            <td className="px-6 py-4 text-[#8899AA] font-mono text-xs">{row.rate}</td>
                                            <td className="px-6 py-4 text-emerald-400 font-mono font-bold">{row.amt}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded text-xs font-bold transition-colors">
                                                    Process Payout
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Ledger Summary */}
                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Treasury Overview</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Cleared This Month (YTD)</div>
                                <div className="text-3xl font-black text-white">$142K</div>
                            </div>
                            <div className="border-t border-[#1A2A3A] pt-4">
                                <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Outstanding Pipeline</div>
                                <div className="text-2xl font-black text-amber-400">$17.2K</div>
                            </div>
                        </div>

                        <button className="w-full mt-6 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                            <CreditCard size={16} /> Link Stripe Connect
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
