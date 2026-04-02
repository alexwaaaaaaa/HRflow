"use client";
import React from 'react';
import { Briefcase, Building2, Users, FileSignature, CheckCircle2, ShieldAlert, ArrowRight, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function CAPartnerPortalScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Chartered Accountant (CA) Partner Network</h1>
                    <p className="text-[#8899AA] text-sm">Manage multi-tenant access for CA firms managing payroll/compliance for their SME clients.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mb-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">412</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Registered CA Firms</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-indigo-400 mb-1">1,845</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Client Workspaces Managed</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-emerald-400 mb-1">$45K</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Total Rev Share (YTD)</div>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1">
                        <div className="text-3xl font-black text-amber-400">14</div>
                        <FileSignature size={20} className="text-amber-400" />
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Pending KYC Approvals</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Top CA Partners List */}
                <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2"><Briefcase size={18} className="text-[#556677]" /> Active Partner Agency Network</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Partner Firm</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Tier</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Clients</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Net MRR</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { name: 'KPMG India (Payroll Div)', tier: 'Platinum', clients: 124, mrr: '$12,400', status: 'verified' },
                                    { name: 'Sharma & Associates', tier: 'Gold', clients: 45, mrr: '$4,500', status: 'verified' },
                                    { name: 'Agrawal Tax Pro', tier: 'Silver', clients: 12, mrr: '$1,200', status: 'verified' },
                                    { name: 'FinTrust Advisory', tier: 'Onboarding', clients: 0, mrr: '$0', status: 'pending' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="text-white font-bold text-sm flex items-center gap-2">
                                                <Building2 size={14} className="text-[#556677]" /> {row.name}
                                                {row.status === 'verified' && <CheckCircle2 size={12} className="text-emerald-400" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${row.tier === 'Platinum' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                                    row.tier === 'Gold' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                        'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]'
                                                }`}>
                                                {row.tier}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-white font-bold">{row.clients}</td>
                                        <td className="px-6 py-4 text-white font-mono font-bold text-xs">{row.mrr}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-indigo-400 hover:text-indigo-300 transition-colors text-xs font-bold flex items-center gap-1 justify-end w-full">
                                                Manage <ArrowRight size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* KYC Action Required */}
                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center gap-2">
                            <ShieldAlert size={16} className="text-amber-400" />
                            <h3 className="font-bold text-white text-sm">Pending KYC/KYB Reviews</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            <div className="p-4 hover:bg-[#131B2B] transition-colors group">
                                <h4 className="font-bold text-white text-sm mb-1">Delhi Tax Consultants LLP</h4>
                                <p className="text-xs text-[#8899AA] mb-3">Submitted GSTIN and Firm Registration Docs for Tier 1 Partner Access.</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 rounded text-xs font-bold transition-colors">Approve</button>
                                    <button className="flex-1 bg-[#131B2B] border border-[#2A3A4A] text-white py-1.5 rounded text-xs font-bold transition-colors">Review Docs</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
