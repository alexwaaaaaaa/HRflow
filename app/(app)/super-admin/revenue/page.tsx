"use client";
import React from 'react';
import { DollarSign, ArrowUpRight, BarChart3, TrendingUp, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function RevenueDashboardScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Financial Operations & Revenue</h1>
                    <p className="text-[#8899AA] text-sm">Analyze MRR, ARR, expansion revenue, and multi-tenant payment flows.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

                {/* Main Metrics */}
                <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-[#0A1420] to-indigo-900/10 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
                            <h3 className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">Annual Recurring Revenue (ARR)</h3>
                            <div className="text-4xl font-black text-white">$14.2M</div>
                            <div className="mt-4 flex items-center gap-4 text-sm font-bold border-t border-indigo-500/20 pt-4">
                                <span className="text-emerald-400 flex items-center gap-1"><TrendingUp size={16} /> +24% YoY</span>
                                <span className="text-[#8899AA]">Target: $20M</span>
                            </div>
                        </div>
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                            <h3 className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Net Revenue Retention (NRR)</h3>
                            <div className="text-4xl font-black text-white text-emerald-400">114%</div>
                            <div className="mt-4 flex items-center gap-4 text-sm font-bold border-t border-[#1A2A3A] pt-4">
                                <span className="text-emerald-400">World-class benchmark</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 h-80 flex flex-col items-center justify-center relative">
                        <div className="absolute top-4 left-4 font-bold text-white">MRR Growth (12 Months)</div>
                        <BarChart3 size={48} className="text-[#2A3A4A] mb-4" />
                        <span className="text-[#556677] text-sm font-bold uppercase tracking-widest">Chart Visualization Area</span>
                    </div>
                </div>

                {/* Secondary Metrics */}
                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 space-y-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#1A2A3A] pb-4">Revenue Breakdown</h3>

                        <div>
                            <div className="flex justify-between text-sm font-bold text-white mb-2">
                                <span>Subscription Revenue</span>
                                <span>$1.05M</span>
                            </div>
                            <div className="text-xs text-[#8899AA]">Monthly recurring software licenses.</div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm font-bold text-white mb-2">
                                <span>Implementation & Setup Services</span>
                                <span>$85K</span>
                            </div>
                            <div className="text-xs text-[#8899AA]">One-time data migration and onboarding fees.</div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm font-bold text-white mb-2">
                                <span>Add-ons & Usage Billing</span>
                                <span>$45K</span>
                            </div>
                            <div className="text-xs text-[#8899AA]">API overages, WhatsApp texts, etc.</div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2"><CreditCard size={18} className="text-[#556677]" /> Recent High-Value Upgrades</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-white font-bold">TechCorp India</span>
                                <span className="text-emerald-400 font-bold block bg-emerald-500/10 px-2 py-0.5 rounded textxs">+$4,500 MRR</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-t border-[#1A2A3A] pt-4">
                                <span className="text-white font-bold">Global Finance</span>
                                <span className="text-emerald-400 font-bold block bg-emerald-500/10 px-2 py-0.5 rounded textxs">+$15,000 ARR</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
