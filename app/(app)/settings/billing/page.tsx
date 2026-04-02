"use client";

import React from 'react';
import { CreditCard, CheckCircle2, Users, Zap, ArrowUpRight, Download } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function BillingSubscriptionPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                    <CreditCard size={28} className="text-indigo-400" /> Billing & Subscription
                </h1>
                <p className="text-[#8899AA] text-sm max-w-2xl">Manage your Kaarya subscription plan, payment methods, and invoices.</p>
            </div>

            {/* Current Plan */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                    <div>
                        <div className="text-xs text-[#8899AA] uppercase tracking-wider font-semibold mb-2">Current Plan</div>
                        <h2 className="text-2xl font-bold text-white mb-1">Kaarya Enterprise</h2>
                        <p className="text-sm text-[#8899AA] mb-4">Unlimited modules, priority support, custom SLAs, and dedicated CSM.</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-white">₹199</span>
                            <span className="text-sm text-[#8899AA]">/ employee / month</span>
                        </div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#2A3A4A] rounded-xl p-4 text-sm space-y-3 w-full md:w-64 shrink-0">
                        <div className="flex justify-between"><span className="text-[#8899AA]">Active Employees</span><span className="text-white font-bold">256</span></div>
                        <div className="flex justify-between"><span className="text-[#8899AA]">Billing Cycle</span><span className="text-white font-bold">Annual</span></div>
                        <div className="flex justify-between"><span className="text-[#8899AA]">Next Invoice</span><span className="text-white font-bold">Apr 1, 2024</span></div>
                        <div className="flex justify-between"><span className="text-[#8899AA]">MRR</span><span className="text-indigo-400 font-bold">₹50,944</span></div>
                    </div>
                </div>
            </div>

            {/* What's Included */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">What's Included</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['All 22 Core Modules', 'AI + Chatbot Suite', 'Unlimited Workflows', 'Priority Email & Chat Support', 'Custom Integrations', 'Dedicated CSM', 'SOC 2 Type II Compliance', '99.99% SLA', 'White-labeling'].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-[#c0c6cc]">
                            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" /> {feat}
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Invoices */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#131B2B] flex justify-between items-center">
                    <h3 className="text-white font-medium">Recent Invoices</h3>
                    <Button variant="secondary" className="border-[#2A3A4A] text-xs h-auto py-1.5">View All</Button>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#1A2A3A] bg-[#0A1420]/50">
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Invoice</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Date</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Amount</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider w-16"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 'INV-2024-03', date: 'Mar 1, 2024', amount: '₹50,944', status: 'Paid' },
                            { id: 'INV-2024-02', date: 'Feb 1, 2024', amount: '₹49,401', status: 'Paid' },
                            { id: 'INV-2024-01', date: 'Jan 1, 2024', amount: '₹49,401', status: 'Paid' },
                        ].map((inv) => (
                            <tr key={inv.id} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors group">
                                <td className="p-4 text-sm text-white font-mono">{inv.id}</td>
                                <td className="p-4 text-sm text-[#8899AA]">{inv.date}</td>
                                <td className="p-4 text-sm text-white font-semibold">{inv.amount}</td>
                                <td className="p-4"><span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-medium">{inv.status}</span></td>
                                <td className="p-4"><button className="text-[#445566] hover:text-white opacity-0 group-hover:opacity-100 transition-all"><Download size={16} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
