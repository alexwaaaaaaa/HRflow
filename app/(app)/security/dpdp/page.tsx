"use client";
import React from 'react';
import { FileCheck, Download, Search, AlertCircle, ShieldEllipsis, Users } from 'lucide-react';

export default function DPDPয়ConsentScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">DPDP Act Privacy & Consent</h1>
                    <p className="text-[#8899AA] text-sm">Manage Digital Personal Data Protection (DPDP) Act 2023 compliance and Data Principal registries.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Download size={16} /> Audit Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-emerald-400 mb-1">99.8%</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Active Consents</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-amber-400 mb-1">12</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Pending Renewal</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-rose-400 mb-1">3</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Withdrawn</div>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <ShieldEllipsis size={24} className="text-indigo-400 mb-2" />
                        <span className="text-[10px] font-bold text-indigo-400 uppercase border border-indigo-500/30 px-2 py-0.5 rounded">DPO</span>
                    </div>
                    <div className="text-sm font-bold text-white mb-1">Data Protection Officer</div>
                    <div className="text-xs text-[#8899AA]">Sanjay Dutt (Legal)</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-6">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search Data Principal (Employee)..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:border-indigo-500 outline-none w-80 transition-colors" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-[#131B2B] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-xs font-bold text-[#8899AA] hover:text-white transition-colors">Select All</button>
                        <button className="bg-[#131B2B] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-xs font-bold text-[#8899AA] hover:text-white transition-colors">Request Renewals</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4 w-10">
                                    <input type="checkbox" className="rounded border-[#3A4A5A] text-indigo-500 focus:ring-indigo-500 bg-[#131B2B]" />
                                </th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Data Principal</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Core HR Ops</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Biometric (Time)</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">AI Processing</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Last Updated</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] text-right">View Proof</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { name: 'Aditi Krishnan', role: 'VP Engineering', core: true, bio: true, ai: true, date: 'Oct 01, 2026' },
                                { name: 'Rahul Varma', role: 'SDE II', core: true, bio: true, ai: false, date: 'Sep 15, 2026', warning: 'AI Opt-out' },
                                { name: 'Fatima Sheikh', role: 'Product Manager', core: true, bio: true, ai: true, date: 'Mar 10, 2025', renewal: true },
                                { name: 'John Doe', role: 'Ex-Employee', core: false, bio: false, ai: false, date: 'Jan 05, 2026', withdrawn: true },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="p-4">
                                        <input type="checkbox" className="rounded border-[#3A4A5A] text-indigo-500 focus:ring-indigo-500 bg-[#1A2A3A]" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-white font-bold flex items-center gap-2">
                                            {row.name}
                                            {row.renewal && <span title="Renewal Overdue" className="flex items-center"><AlertCircle size={14} className="text-amber-400" /></span>}
                                        </div>
                                        <div className="text-xs text-[#556677]">{row.role}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.core ? <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] uppercase">Granted</span> : <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded text-[10px] uppercase">Revoked</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.bio ? <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] uppercase">Granted</span> : <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded text-[10px] uppercase">Revoked</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.ai ? (
                                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] uppercase">Granted</span>
                                        ) : (
                                            <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded text-[10px] uppercase flex items-center gap-1 w-max">Opt-Out</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA] text-sm">
                                        {row.date}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <button className="text-indigo-400 hover:text-white transition-colors">
                                            <FileCheck size={18} className="ml-auto" />
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
