"use client";
import React from 'react';
import { Store, ShoppingBag, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function MarketplaceRevenueScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">App Marketplace Economics</h1>
                    <p className="text-[#8899AA] text-sm">Monetization tracking for 3rd party integrations and apps passing billing through Kaarya.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mb-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">$84K</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Gross App Volume (GAV)</div>
                </div>
                <div className="bg-[#0A1420] border border-indigo-500/30 rounded-2xl p-5 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-4 right-4 flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded">
                        Platform Take-rate: 20%
                    </div>
                    <div className="text-3xl font-black text-indigo-400 mb-1 mt-4">$16.8K</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Net Kaarya Revenue</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Top Earning Providers */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2"><Store size={18} className="text-[#556677]" /> Top Performing 3rd-Party Devs</h2>
                    </div>
                    <div className="divide-y divide-[#1A2A3A]">
                        {[
                            { name: 'Acme Background Checks (BGV)', rev: '$42,000', installs: '850', rate: '20%' },
                            { name: 'GiftCard Co. Data Connector', rev: '$12,400', installs: '320', rate: '15%' },
                            { name: 'Bio-Sync Identity Matrix', rev: '$8,500', installs: '145', rate: '20%' },
                        ].map((dev, i) => (
                            <div key={i} className="p-5 hover:bg-[#131B2B] transition-colors flex justify-between items-center">
                                <div>
                                    <h4 className="text-white font-bold text-sm flex items-center gap-2">
                                        {dev.name} <CheckCircle2 size={12} className="text-indigo-400" />
                                    </h4>
                                    <p className="text-xs text-[#8899AA] mt-1">{dev.installs} Active Tenant Installations</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-emerald-400">{dev.rev}</div>
                                    <div className="text-[10px] text-[#556677] uppercase font-bold tracking-wider mt-0.5">Platform Cut: {dev.rate}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
