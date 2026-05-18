"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { DollarSign, FileText, Clock } from 'lucide-react';

export default function BillingScreen() {
    return (
        <Page
            title="Invoicing & Billing"
            subtitle="Convert approved timesheets into client-facing invoices based on project rate cards."
            breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: "Billing" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Financials</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><DollarSign size={24} className="text-emerald-400" /> Invoicing & Billing</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Convert approved timesheets into client-facing invoices based on project rate cards.</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center gap-2">
                    <FileText size={16} /> Draft Blank Invoice
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col h-full shadow-lg overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                        <h3 className="text-white font-bold">Unbilled Approved Hours (Ready for Invoicing)</h3>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        <div className="p-5 hover:bg-[#131B2B]/50 transition-colors flex items-center justify-between">
                            <div>
                                <h4 className="text-white font-bold mb-1">Acme Corp — Cloud Migration</h4>
                                <div className="text-[#8899AA] text-xs flex items-center gap-4">
                                    <span className="font-mono">PRJ-809</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> 345.5 hours approved</span>
                                </div>
                            </div>
                            <div className="text-right flex items-center gap-6">
                                <div>
                                    <div className="text-emerald-400 font-black font-mono text-lg">$62,400.00</div>
                                    <div className="text-[#556677] text-[10px] uppercase font-bold">Unbilled Value</div>
                                </div>
                                <button className="bg-[#131B2B] border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 px-4 py-2 font-bold rounded-lg text-xs transition-colors">
                                    Generate Draft
                                </button>
                            </div>
                        </div>

                        <div className="p-5 hover:bg-[#131B2B]/50 transition-colors flex items-center justify-between">
                            <div>
                                <h4 className="text-white font-bold mb-1">Stark Industries — Core Rewrite</h4>
                                <div className="text-[#8899AA] text-xs flex items-center gap-4">
                                    <span className="font-mono">PRJ-782</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> Milestone Achieved</span>
                                </div>
                            </div>
                            <div className="text-right flex items-center gap-6">
                                <div>
                                    <div className="text-emerald-400 font-black font-mono text-lg">$25,000.00</div>
                                    <div className="text-[#556677] text-[10px] uppercase font-bold">Fixed Fee</div>
                                </div>
                                <button className="bg-[#131B2B] border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 px-4 py-2 font-bold rounded-lg text-xs transition-colors">
                                    Generate Draft
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center">
                        <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Total Outstanding (AR)</div>
                        <div className="text-3xl font-black text-white mb-2 font-mono">$1.2M</div>
                        <div className="text-rose-400 text-xs font-bold">$40k past due &gt; 30 days</div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 text-sm">Recent Issued Invoices</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl group cursor-pointer hover:border-emerald-500/30 transition-colors">
                                <div>
                                    <div className="text-white text-xs font-bold mb-0.5">INV-2025-092</div>
                                    <div className="text-[#556677] text-[10px]">Acme Corp</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 block mb-0.5">Sent</span>
                                    <span className="text-[#8899AA] font-mono text-xs">$14,200</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl group cursor-pointer hover:border-emerald-500/30 transition-colors">
                                <div>
                                    <div className="text-white text-xs font-bold mb-0.5">INV-2025-091</div>
                                    <div className="text-[#556677] text-[10px]">Beta Systems</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 block mb-0.5">Paid</span>
                                    <span className="text-[#8899AA] font-mono text-xs">$8,500</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
