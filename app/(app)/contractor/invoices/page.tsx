"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { FileText, ArrowLeft, Upload, Search, Clock, Eye, Download } from 'lucide-react';
import Link from 'next/link';

const INVOICES = [
    { id: 'INV-2026-041', contractor: 'Acme Design Agency', date: '08 Mar 2026', gross: 250000, tds: 25000, net: 225000, status: 'Approval Pending', age: '2 days' },
    { id: 'INV-2026-039', contractor: 'Raj Gupta', date: '05 Mar 2026', gross: 40000, tds: 4000, net: 36000, status: 'Approval Pending', age: '5 days' },
    { id: 'SEC-MAR-01', contractor: 'Secure IT Services', date: '01 Mar 2026', gross: 120000, tds: 2400, net: 117600, status: 'Ready for Payment', age: '9 days' },
    { id: 'FEE-1029', contractor: 'Priya Sharma', date: '28 Feb 2026', gross: 65000, tds: 6500, net: 58500, status: 'Paid', age: '—' },
];

const STATUS_CFG: Record<string, string> = {
    'Approval Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Ready for Payment': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Paid': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export default function ContractorInvoiceScreen() {
    const [search, setSearch] = useState('');

    return (
        <Page
            title="Contractor Invoices"
            subtitle="Upload, review, and approve invoices. TDS is automatically calculated based on contractor profile."
            breadcrumbs={[{ label: "Contractor", href: "/contractor" }, { label: "Invoices" }]}
            maxWidth="1300px"
        >

        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/contractor/list" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Contractor Payroll</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><FileText size={22} className="text-amber-400" /> Contractor Invoices</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Upload, review, and approve invoices. TDS is automatically calculated based on contractor profile.</p>
                </div>
                <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Upload size={16} /> Upload Invoice
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-bold text-sm">Action Required Process</h3>
                        <span className="text-[#556677] text-xs">2 Invoices</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400"><Clock size={18} /></div>
                            <div>
                                <div className="text-white font-bold">Total ₹2,61,000 Net Payable</div>
                                <div className="text-[#8899AA] text-xs">Pending manager approval before payment</div>
                            </div>
                        </div>
                        <button className="bg-[#0A1420] border border-[#2A3A4A] hover:border-amber-500/50 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">Review Approvals</button>
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Ready to Pay</div>
                    <div className="text-2xl font-black text-blue-400 mb-1">₹1,17,600</div>
                    <div className="text-xs text-[#556677]">1 invoice approved</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">TDS to Deduct</div>
                    <div className="text-2xl font-black text-red-400 mb-1">₹31,400</div>
                    <div className="text-xs text-[#556677]">From pending & approved</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <div className="flex gap-2">
                        {['All Invoices', 'Pending Approval', 'Ready to Pay', 'Paid'].map(t => (
                            <button key={t} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${t === 'All Invoices' ? 'bg-[#1A2A3A] text-white' : 'text-[#556677] hover:bg-[#131B2B] hover:text-white transition-colors'}`}>{t}</button>
                        ))}
                    </div>
                    <div className="relative w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search invoice or contractor..." value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs focus:border-amber-500 outline-none transition-colors" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-[#8899AA] text-xs uppercase tracking-wider bg-[#0A1420]">
                            <tr>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Invoice Details</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Contractor</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Gross Amount</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">TDS Deducted</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Net Payable</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A] ml-2 block">Status</th>
                                <th className="px-5 py-4 text-right border-b border-[#1A2A3A]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {INVOICES.map((inv, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="text-white font-semibold text-xs flex items-center gap-2">
                                            <FileText size={12} className="text-[#556677]" /> {inv.id}
                                        </div>
                                        <div className="text-[#556677] text-[10px] mt-1">Date: {inv.date}</div>
                                    </td>
                                    <td className="px-5 py-4 text-[#AABBCC] text-xs font-medium">{inv.contractor}</td>
                                    <td className="px-5 py-4 text-right text-[#8899AA] text-xs">₹{inv.gross.toLocaleString()}</td>
                                    <td className="px-5 py-4 text-right text-red-400 text-xs">-₹{inv.tds.toLocaleString()}</td>
                                    <td className="px-5 py-4 text-right text-emerald-400 font-bold">₹{inv.net.toLocaleString()}</td>
                                    <td className="px-5 py-4 pt-5 pb-3">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${STATUS_CFG[inv.status]}`}>{inv.status}</span>
                                        {inv.age !== '—' && <div className="text-[#556677] text-[10px] mt-1 ml-1">{inv.age} in queue</div>}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button className="text-[#556677] hover:text-white p-1 rounded hover:bg-[#1A2A3A]" title="View Document"><Eye size={16} /></button>
                                            <button className="text-[#556677] hover:text-white p-1 rounded hover:bg-[#1A2A3A]" title="Download PDF"><Download size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
