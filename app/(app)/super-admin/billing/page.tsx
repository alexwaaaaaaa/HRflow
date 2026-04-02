"use client";
import React from 'react';
import { DollarSign, Download, TrendingUp, AlertCircle, CreditCard, Building2, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function BillingScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Billing & Receivables Hub</h1>
                    <p className="text-[#8899AA] text-sm">Monitor platform MRR, outstanding invoices, and failed Stripe payments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Ledgers
                    </button>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">$1.18M</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Monthly Recurring Revenue</div>
                    <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><TrendingUp size={12} /> +4.2% MoM</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-amber-400 mb-1">$45K</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Past Due (Net 30)</div>
                    <div className="text-[10px] text-[#556677] font-bold">From 14 Organizations</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-emerald-400 mb-1">$2.4M</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Collected (YTD)</div>
                    <div className="w-full h-1 bg-[#131B2B] mt-2 rounded">
                        <div className="h-full bg-emerald-500 w-[60%] rounded" />
                    </div>
                </div>
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-1">
                        <div className="text-3xl font-black text-rose-400">8</div>
                        <AlertCircle size={20} className="text-rose-400" />
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Failed Transactions</div>
                    <div className="text-[10px] text-rose-400/80 font-bold mt-2">Requires immediate retry action</div>
                </div>
            </div>

            {/* Collections & Invoices Table */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-6">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><CreditCard size={18} className="text-[#556677]" /> Recent Invoices & Collections</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Invoice ID</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Organization</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Amount</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Type</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Date Generated</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { id: 'INV-2026-1044', org: 'TechCorp India', amount: '$4,500', type: 'Annual Renewal', status: 'Paid', date: 'Oct 25, 2026' },
                                { id: 'INV-2026-1043', org: 'Apex Media Group', amount: '$3,200', type: 'Monthly Subs', status: 'Failed', date: 'Oct 24, 2026', err: true },
                                { id: 'INV-2026-1042', org: 'Zenith Logistics', amount: '$960', type: 'Monthly Subs', status: 'Paid', date: 'Oct 24, 2026' },
                                { id: 'INV-2026-1041', org: 'Global Finance Ltd', amount: '$15,000', type: 'Custom Implementation', status: 'Past Due', date: 'Sep 25, 2026', warn: true },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-mono text-indigo-400 font-bold text-xs">{row.id}</div>
                                    </td>
                                    <td className="px-6 py-4 text-white font-bold flex items-center gap-2">
                                        <Building2 size={14} className="text-[#556677]" /> {row.org}
                                    </td>
                                    <td className="px-6 py-4 text-white font-mono">{row.amount}</td>
                                    <td className="px-6 py-4 text-[#8899AA] text-xs">{row.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${row.err ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                row.warn ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            }`}>
                                            {row.status}
                                        </span>
                                        {row.err && <div className="text-[10px] text-rose-400/80 mt-1">Card Expired</div>}
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA] text-xs flex items-center gap-1">
                                        <Calendar size={12} /> {row.date}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {row.err ? (
                                            <button className="bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded transition-colors shadow-lg shadow-rose-500/20">
                                                Retry Charge
                                            </button>
                                        ) : row.warn ? (
                                            <button className="border border-[#2A3A4A] bg-[#131B2B] hover:bg-[#1A2A3A] text-white text-[10px] font-bold px-3 py-1.5 rounded transition-colors">
                                                Send Reminder
                                            </button>
                                        ) : (
                                            <button className="text-indigo-400 hover:text-indigo-300 transition-colors text-xs font-bold">
                                                View PDF
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
