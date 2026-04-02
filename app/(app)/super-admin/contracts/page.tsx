"use client";
import React from 'react';
import { Search, FileSignature, CalendarClock, Download, Filter } from 'lucide-react';
import Link from 'next/link';

export default function ContractManagementScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">MSA & Contract Repository</h1>
                    <p className="text-[#8899AA] text-sm">Master Service Agreements, custom pricing contracts, and renewal tracking for Enterprise accounts.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mb-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">84</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Active Enterprise Contracts</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-amber-400 mb-1">12</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Renewals Due (90 Days)</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">$4.2M</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Contracted ARR Value</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                {/* Search & Toolbar */}
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search organization or contract ID..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none w-80 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Contract ID</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Organization</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Term length</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Expiration Date</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Renewal Status</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { id: 'MSA-2024-089', org: 'TechCorp India', term: '36 Months', exp: 'Dec 31, 2027', status: 'Active' },
                                { id: 'MSA-2023-144', org: 'Global Finance Ltd', term: '12 Months', exp: 'Nov 15, 2026', status: 'Renewal Review', warn: true },
                                { id: 'MSA-2022-012', org: 'Zenith Logistics', term: '24 Months', exp: 'Oct 30, 2026', status: 'At Risk', err: true },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4 text-indigo-400 font-mono text-xs font-bold">{row.id}</td>
                                    <td className="px-6 py-4 text-white font-bold text-sm">{row.org}</td>
                                    <td className="px-6 py-4 text-[#8899AA] text-xs font-bold">{row.term}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-white font-mono text-xs">
                                            <CalendarClock size={12} className="text-[#556677]" /> {row.exp}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${row.err ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                row.warn ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#556677] hover:text-white transition-colors flex justify-end w-full">
                                            <Download size={16} />
                                        </button>
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
