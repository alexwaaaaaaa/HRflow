"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Scale, AlertCircle, TrendingDown, Users, FileBarChart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function PayEquityDashboardScreen() {
    return (
        <Page
            title="Pay Equity & Fair Pay Hub"
            subtitle="Monitor compensation fairness, analyze organizational pay gaps, and ensure global living wage compliance."
            breadcrumbs={[{ label: "Pay Equity", href: "/pay-equity" }, { label: "Dashboard" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Scale size={24} className="text-emerald-400" /> Pay Equity & Fair Pay Hub</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Monitor compensation fairness, analyze organizational pay gaps, and ensure global living wage compliance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/pay-equity/audit" className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <FileBarChart size={16} /> Generate Audit Report (EU Directive)
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Unadjusted Gender Pay Gap</div>
                    <div className="text-3xl font-black text-rose-400 mb-2">12.4%</div>
                    <div className="text-[#8899AA] text-xs font-bold flex items-center gap-1"><TrendingDown size={14} /> Improved 1.2% since Jan</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <div className="text-emerald-500/80 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">Adjusted Pay Gap (Like-for-Like)</div>
                    <div className="text-3xl font-black mb-2">1.8%</div>
                    <div className="text-emerald-200/50 text-xs font-bold">Within internal tolerance (&lt; 2%)</div>
                </div>

                <div className="bg-gradient-to-r from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Remediation Budget Needed</div>
                    <div className="text-3xl font-black text-amber-400 mb-2">$420k</div>
                    <div className="text-[#556677] text-xs font-bold hover:text-white cursor-pointer underline decoration-dashed">View Recommended Adjustments</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">Overall Compa-Ratio</div>
                    <div className="text-3xl font-black text-white mb-2">0.98</div>
                    <div className="text-[#8899AA] text-xs font-bold">Organization median</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-6">
                            <h3 className="text-white font-bold">Adjusted Pay Gap Tracker</h3>
                            <span className="text-xs text-[#8899AA] bg-[#131B2B] px-2 py-1 rounded">By Department</span>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'Engineering', val: 3.2, hc: '340 HC', status: 'Action Needed' },
                                { label: 'Sales & Revenue', val: 1.5, hc: '120 HC', status: 'Ok' },
                                { label: 'Product & Design', val: 0.8, hc: '85 HC', status: 'Ok' },
                                { label: 'Operations', val: 4.5, hc: '210 HC', status: 'Critical Risk' },
                            ].map((d, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1.5 font-bold">
                                        <span className="text-white flex items-center gap-2">{d.label} <span className="text-[#556677] font-normal">({d.hc})</span></span>
                                        <span className={`flex items-center gap-1 ${d.status === 'Ok' ? 'text-emerald-400' : d.status === 'Action Needed' ? 'text-amber-400' : 'text-rose-400'}`}>{d.val}% Gap</span>
                                    </div>
                                    <div className="w-full h-2 bg-[#131B2B] rounded-full overflow-hidden flex">
                                        {/* Center line representation logic mock */}
                                        <div className="h-full bg-transparent w-1/2 flex justify-end">
                                            {/* Negative gap would go here */}
                                        </div>
                                        <div className="h-full bg-transparent w-1/2 border-l border-[#556677]">
                                            <div className={`h-full ${d.status === 'Ok' ? 'bg-emerald-500' : d.status === 'Action Needed' ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${(d.val / 5) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-6">
                            <Link href="/pay-equity/unexplained-gap" className="text-emerald-400 hover:text-white text-xs font-bold transition-colors">Analyze Unexplained Gaps Model &rarr;</Link>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 flex items-center gap-2">
                            <AlertCircle size={18} className="text-amber-400" /> Regulatory Compliance Alerts
                        </h3>

                        <div className="space-y-3">
                            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-amber-400 font-bold text-sm">EU Pay Transparency Directive</div>
                                    <span className="bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Deadline: Jun 2026</span>
                                </div>
                                <p className="text-amber-200/70 text-xs">Awaiting publication of internal pay ranges for France and Germany entities. Gap reporting prepared.</p>
                            </div>

                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-emerald-400 font-bold text-sm flex items-center gap-2"><CheckCircle2 size={16} /> Living Wage Compliance (UK)</div>
                                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Compliant</span>
                                </div>
                                <p className="text-emerald-200/70 text-xs">All London-based employees are currently paid above the Real Living Wage threshold.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto bg-[#131B2B] border border-[#2A3A4A] rounded-full flex items-center justify-center text-[#8899AA] mb-3">
                            <Users size={20} />
                        </div>
                        <h3 className="text-white font-bold mb-2">Fair Pay Check (Offer Stage)</h3>
                        <p className="text-[#8899AA] text-xs mb-4">Integrate real-time equity validation before generating candidate offers.</p>
                        <Link href="/pay-equity/fair-pay-check" className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2.5 rounded-xl text-sm transition-colors block text-center">
                            Configure Interceptor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
