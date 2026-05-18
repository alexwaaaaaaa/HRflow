"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Users, FileText, IndianRupee, FileCheck, ArrowRight, Wallet, Plus, Search, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const STATS = [
    { label: 'Active Contractors', value: '42', color: 'text-indigo-400', icon: Users, sub: 'Across 5 departments' },
    { label: 'Pending Invoices', value: '14', color: 'text-amber-400', icon: FileText, sub: '₹4,25,000 awaiting payment' },
    { label: 'TDS Deducted (YTD)', value: '₹12.4L', color: 'text-red-400', icon: IndianRupee, sub: 'Under Sections 194J & 194C' },
    { label: 'Total Paid (YTD)', value: '₹1.8 Cr', color: 'text-emerald-400', icon: Wallet, sub: 'FY 2025-26 payments' },
];

const CONTRACTORS = [
    { id: 'CON-092', name: 'Acme Design Agency', type: 'Agency', pan: 'ABCDE1234F', section: '194J', tdsRate: '10%', activeInvoices: 2, totalPaid: 850000 },
    { id: 'CON-095', name: 'Raj Gupta', type: 'Freelancer', pan: 'XYZPQ5678G', section: '194J', tdsRate: '10%', activeInvoices: 1, totalPaid: 120000 },
    { id: 'CON-101', name: 'Secure IT Services', type: 'Company', pan: 'ITSEC9876H', section: '194C', tdsRate: '2%', activeInvoices: 3, totalPaid: 2400000 },
    { id: 'CON-104', name: 'Priya Sharma', type: 'Freelancer', pan: 'PRSHA3456K', section: '194J', tdsRate: '10%', activeInvoices: 0, totalPaid: 95000 },
    { id: 'CON-105', name: 'BlueStar Office Maint.', type: 'Vendor', pan: 'BLUMT1122V', section: '194C', tdsRate: '2%', activeInvoices: 1, totalPaid: 360000 },
];

const NAV = [
    { label: 'Invoices Dashboard', href: '/contractor/invoices', desc: 'Process and approve vendor invoices', icon: FileText },
    { label: 'TDS Compliance', href: '/contractor/tds', desc: 'Track 194J, 194C deductions and challans', icon: IndianRupee },
    { label: 'Form 16A Generation', href: '/contractor/form-16a', desc: 'Generate quarterly TDS certificates', icon: FileCheck },
    { label: 'Payment Runs', href: '/contractor/payments', desc: 'Bank advice for net contractor payouts', icon: Wallet },
];

export default function ContractorListScreen() {
    const [search, setSearch] = useState('');
    return (
        <Page
            title="Contractor Payroll"
            subtitle="Manage freelancers, agencies, TDS deductions, and invoice payments"
            breadcrumbs={[{ label: "Contractor", href: "/contractor" }, { label: "List" }]}
            maxWidth="1400px"
        >
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Users size={24} className="text-indigo-400" /> Contractor Payroll</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage freelancers, agencies, TDS deductions, and invoice payments</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Plus size={16} /> Add Contractor
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS.map(s => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-1">
                                <Icon size={16} className={s.color} />
                                <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                            </div>
                            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">{s.label}</div>
                            <div className="text-[10px] text-[#445566] mt-1">{s.sub}</div>
                        </div>
                    );
                })}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Quick Nav */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] text-white font-bold text-sm bg-[#060D1A]">Modules</div>
                    <div className="divide-y divide-[#1A2A3A]">
                        {NAV.map(n => {
                            const Icon = n.icon;
                            return (
                                <Link key={n.href} href={n.href} className="flex items-center gap-3 p-4 hover:bg-[#131B2B] transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-[#131B2B] border border-[#2A3A4A] flex items-center justify-center shrink-0 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                                        <Icon size={18} className="text-[#8899AA] group-hover:text-indigo-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white text-sm font-semibold group-hover:text-indigo-300 transition-colors">{n.label}</div>
                                        <div className="text-[#556677] text-xs">{n.desc}</div>
                                    </div>
                                    <ArrowRight size={14} className="text-[#445566] group-hover:text-indigo-400 shrink-0" />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Contractor List */}
                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                        <span className="text-white font-bold text-sm">Contractor Directory</span>
                        <div className="relative w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search name or PAN..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs focus:border-indigo-500 outline-none" />
                        </div>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-sm">
                            <thead className="text-[#8899AA] text-xs uppercase tracking-wider bg-[#0A1420]">
                                <tr>
                                    <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Contractor</th>
                                    <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">TDS Setup</th>
                                    <th className="px-5 py-3 text-center font-bold border-b border-[#1A2A3A]">Invoices</th>
                                    <th className="px-5 py-3 text-right font-bold border-b border-[#1A2A3A]">Total Paid</th>
                                    <th className="px-5 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {CONTRACTORS.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.pan.toLowerCase().includes(search.toLowerCase())).map((c, i) => (
                                    <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="text-white font-semibold text-xs">{c.name}</div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[#556677] text-[10px]">{c.id}</span>
                                                <span className="text-[#AABBCC] text-[10px] bg-[#1A2A3A] px-1.5 py-0.5 rounded">{c.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="text-[#AABBCC] text-xs font-mono">{c.pan}</div>
                                            <div className="text-[10px] text-red-400 font-bold mt-0.5">{c.section} @ {c.tdsRate} TDS</div>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            {c.activeInvoices > 0 ? (
                                                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold">{c.activeInvoices} Pending</span>
                                            ) : (
                                                <span className="text-[#445566] text-xs">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-right text-emerald-400 font-semibold text-xs">₹{c.totalPaid.toLocaleString()}</td>
                                        <td className="px-5 py-3 text-right">
                                            <button className="text-[#556677] hover:text-white p-1 rounded hover:bg-[#1A2A3A]"><MoreHorizontal size={14} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </Page>
    );
}
