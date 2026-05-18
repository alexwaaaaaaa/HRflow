"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { IndianRupee, ArrowLeft, Search, Download, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import Link from 'next/link';

const TDS_RECORDS = [
    { contractor: 'Acme Design Agency', pan: 'ABCDE1234F', section: '194J (10%)', invoice: 'INV-2026-041', date: '08 Mar 2026', gross: 250000, tds: 25000, status: 'Challan Pending' },
    { contractor: 'Raj Gupta', pan: 'XYZPQ5678G', section: '194J (10%)', invoice: 'INV-2026-039', date: '05 Mar 2026', gross: 40000, tds: 4000, status: 'Challan Pending' },
    { contractor: 'Secure IT Services', pan: 'ITSEC9876H', section: '194C (2%)', invoice: 'SEC-MAR-01', date: '01 Mar 2026', gross: 120000, tds: 2400, status: 'Paid via Challan' },
    { contractor: 'Priya Sharma', pan: 'PRSHA3456K', section: '194J (10%)', invoice: 'FEE-1029', date: '28 Feb 2026', gross: 65000, tds: 6500, status: 'Paid via Challan' },
    { contractor: 'BlueStar Office Maint.', pan: 'BLUMT1122V', section: '194C (2%)', invoice: 'INV-001', date: '15 Feb 2026', gross: 80000, tds: 1600, status: 'Return Filed' },
];

export default function ContractorTDSScreen() {
    const [search, setSearch] = useState('');

    return (
        <Page
            title="TDS Compliance (Contractors)"
            subtitle="Track Section 194J/194C deductions, generate challans, and prepare Q4 returns."
            breadcrumbs={[{ label: "Contractor", href: "/contractor" }, { label: "Tds" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <Link href="/contractor/list" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2">
                <ArrowLeft size={14} /> Contractor Payroll
            </Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <IndianRupee size={22} className="text-red-400" /> TDS Compliance (Contractors)
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track Section 194J/194C deductions, generate challans, and prepare Q4 returns.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <Download size={16} /> FVU Export
                    </button>
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <IndianRupee size={16} /> Pay TDS Challan
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">TDS Deducted (This Month)</h3>
                    <div className="text-3xl font-black text-red-400">₹29,000</div>
                    <div className="text-xs text-[#556677] mt-1 space-y-1">
                        <div className="flex justify-between"><span>Sec 194J:</span> <span className="text-white">₹29,000</span></div>
                        <div className="flex justify-between"><span>Sec 194C:</span> <span className="text-white">₹0</span></div>
                    </div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Challan Deposit Due</h3>
                    <div className="text-3xl font-black text-amber-400">₹29,000</div>
                    <div className="flex items-center gap-2 text-xs text-amber-500 mt-2 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg w-max">
                        <AlertTriangle size={14} /> Due by 7 Apr 2026
                    </div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Form 26Q Status (Q4)</h3>
                    <div className="text-xl font-bold text-white mb-2">Pending Filing</div>
                    <div className="flex items-center gap-2 text-xs text-[#556677]">
                        <CheckCircle2 size={14} className="text-emerald-400" /> Q1, Q2, Q3 Filed
                    </div>
                    <div className="text-xs text-[#556677] mt-1 ml-5">Due by 31 May 2026</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <span className="text-white font-bold text-sm">TDS Deduction Register</span>
                    <div className="relative w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search PAN or Contractor..." value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs focus:border-red-500 outline-none transition-colors" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-[#8899AA] text-xs uppercase tracking-wider bg-[#0A1420]">
                            <tr>
                                <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Contractor</th>
                                <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">PAN</th>
                                <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Invoice / Date</th>
                                <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Section</th>
                                <th className="px-5 py-3 text-right font-bold border-b border-[#1A2A3A]">Amount</th>
                                <th className="px-5 py-3 text-right font-bold border-b border-[#1A2A3A]">TDS Deducted</th>
                                <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A] ml-2 block">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {TDS_RECORDS.filter(t => !search || t.contractor.toLowerCase().includes(search.toLowerCase()) || t.pan.toLowerCase().includes(search.toLowerCase())).map((record, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                    <td className="px-5 py-3 text-white font-semibold text-xs">{record.contractor}</td>
                                    <td className="px-5 py-3 text-[#AABBCC] text-xs font-mono">{record.pan}</td>
                                    <td className="px-5 py-3">
                                        <div className="text-white text-xs flex items-center gap-1.5"><FileText size={12} className="text-[#556677]" />{record.invoice}</div>
                                        <div className="text-[#556677] text-[10px]">{record.date}</div>
                                    </td>
                                    <td className="px-5 py-3 text-[#AABBCC] text-xs font-bold">{record.section}</td>
                                    <td className="px-5 py-3 text-right text-[#8899AA] text-xs">₹{record.gross.toLocaleString()}</td>
                                    <td className="px-5 py-3 text-right text-red-400 font-bold">₹{record.tds.toLocaleString()}</td>
                                    <td className="px-5 py-3 pt-4">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${record.status === 'Challan Pending' ? 'bg-amber-500/10 text-amber-400' :
                                                record.status === 'Paid via Challan' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
                                            }`}>{record.status}</span>
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
