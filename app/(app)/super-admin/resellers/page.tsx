"use client";
import React from 'react';
import { Search, Building, MoreVertical, Plus, Star, Award } from 'lucide-react';
import Link from 'next/link';

export default function ResellerManagementScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Global Reseller Network</h1>
                    <p className="text-[#8899AA] text-sm">Manage B2B Value Added Resellers (VARs), distis, and affiliate partners selling HRFlow.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Plus size={16} /> Onboard Reseller
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-6">
                {/* Search & Toolbar */}
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row md:items-center gap-4 bg-[#060D1A]">
                    <div className="relative w-full md:w-80">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search reseller name or ID..." className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none transition-colors" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Reseller Partner</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Contract Type</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Region / Territory</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Active Seats Sold</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Net ARR Driven</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { name: 'Middle East Tech Disti', type: 'White-label Wholesale', reg: 'MENA', seats: '14,500', arr: '$1.2M', tier: 'Titanium' },
                                { name: 'SaaS Implementors UK', type: 'Value Added Reseller', reg: 'UK/Europe', seats: '4,200', arr: '$320K', tier: 'Gold' },
                                { name: 'HR Consultants Pvt Ltd', type: 'Referral Affiliate', reg: 'India', seats: '850', arr: '$45K', tier: 'Silver' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="text-white font-bold text-sm flex items-center gap-2">
                                            <Award size={16} className={row.tier === 'Titanium' ? 'text-indigo-400' : row.tier === 'Gold' ? 'text-amber-400' : 'text-[#8899AA]'} />
                                            {row.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-[#1A2A3A] px-2 py-1 rounded text-[10px] text-[#8899AA] font-bold uppercase tracking-wider border border-[#2A3A4A]">
                                            {row.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white font-bold text-xs">{row.reg}</td>
                                    <td className="px-6 py-4 text-white font-bold">{row.seats}</td>
                                    <td className="px-6 py-4 text-emerald-400 font-mono font-bold text-xs">{row.arr}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] px-2 py-1 rounded text-[#8899AA] transition-colors">
                                            <MoreVertical size={16} />
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
