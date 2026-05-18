"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Wallet, ArrowLeft, Download, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ContractorPaymentsScreen() {
    return (
        <Page
            title="Contractor Payment Runs"
            subtitle="Generate bank advice files for net payments to contractors via NEFT/RTGS"
            breadcrumbs={[{ label: "Contractor", href: "/contractor" }, { label: "Payments" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/contractor/list" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Contractor Payroll</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Wallet size={22} className="text-blue-400" /> Contractor Payment Runs</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Generate bank advice files for net payments to contractors via NEFT/RTGS</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Download size={16} /> Generate Bank File
                </button>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="text-white font-bold text-lg">Next Payment Run</h3>
                        <div className="text-[#8899AA] text-sm mt-1">Includes all approved invoices unpaid to date</div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black text-blue-400">₹1,17,600</div>
                        <div className="text-xs text-[#556677] mt-1">Net Payable Amount</div>
                    </div>
                </div>
                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex justify-between items-center group cursor-pointer hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400"><FileText size={18} /></div>
                        <div>
                            <div className="text-white font-semibold text-sm">Secure IT Services</div>
                            <div className="text-[#8899AA] text-xs">INV: SEC-MAR-01 · TDS: ₹2,400</div>
                        </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                        <div>
                            <div className="text-white font-bold text-sm">₹1,17,600</div>
                            <div className="text-emerald-400 text-xs flex items-center gap-1 justify-end"><CheckCircle2 size={10} /> Ready</div>
                        </div>
                        <ChevronRight size={16} className="text-[#445566] group-hover:text-white transition-colors" />
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A]">
                    <span className="text-white font-bold text-sm">Past Payment Runs</span>
                </div>
                <div className="divide-y divide-[#1A2A3A]">
                    {[
                        { id: 'RUN-2026-03-01', date: '01 Mar 2026', contractors: 4, amount: 485000, bank: 'HDFC Corp' },
                        { id: 'RUN-2026-02-15', date: '15 Feb 2026', contractors: 2, amount: 152000, bank: 'HDFC Corp' },
                        { id: 'RUN-2026-02-01', date: '01 Feb 2026', contractors: 5, amount: 620000, bank: 'HDFC Corp' },
                    ].map((run, i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-[#131B2B] transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#1A2A3A] rounded-lg border border-[#2A3A4A] flex items-center justify-center text-[#8899AA]">
                                    <Wallet size={16} />
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-sm">{run.id}</div>
                                    <div className="text-[#556677] text-xs mt-0.5">{run.date} · {run.bank}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 text-right">
                                <div>
                                    <div className="text-[#8899AA] text-[10px] uppercase font-bold tracking-wider mb-0.5">Contractors</div>
                                    <div className="text-white text-sm">{run.contractors}</div>
                                </div>
                                <div className="w-24">
                                    <div className="text-[#8899AA] text-[10px] uppercase font-bold tracking-wider mb-0.5">Total Paid</div>
                                    <div className="text-emerald-400 font-bold text-sm">₹{run.amount.toLocaleString()}</div>
                                </div>
                                <button className="text-[#556677] hover:text-white transition-colors" title="Download Text File"><Download size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    
        </Page>
    );
}
