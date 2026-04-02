"use client";
import React from 'react';
import { Package, Plus, Check, Edit2, Archive, DollarSign, Layers } from 'lucide-react';
import Link from 'next/link';

export default function PlanManagementScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Subscription Plans & Tiers</h1>
                    <p className="text-[#8899AA] text-sm">Configure default SaaS packages, pricing, and module bundles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Plus size={16} /> Create New Plan
                    </button>
                </div>
            </div>

            {/* Current Active Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

                {/* Startup Plan */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative flex flex-col h-full hover:border-[#2A3A4A] transition-colors group">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                                <Package size={20} />
                            </div>
                            <h2 className="text-white font-bold text-lg">Startup</h2>
                        </div>
                        <span className="text-xs text-[#556677] font-bold uppercase tracking-wider">Active</span>
                    </div>
                    <div className="mb-6">
                        <div className="text-3xl font-black text-white flex items-end gap-1 mb-1">
                            <span className="text-lg text-[#556677] pb-1">₹</span>7,500 <span className="text-xs text-[#8899AA] font-bold pb-2">/mo</span>
                        </div>
                        <p className="text-sm text-[#8899AA]">Up to 50 employees</p>
                    </div>
                    <div className="space-y-3 mb-8 flex-1">
                        <div className="text-xs font-bold text-[#556677] uppercase tracking-wider">Included Modules:</div>
                        {['Core HR', 'Leave & Attendance', 'Payroll Engine', 'Statutory Compliance (Basic)'].map((mod, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-white">
                                <Check size={14} className="text-emerald-400 shrink-0" />
                                <span>{mod}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 border-t border-[#1A2A3A] pt-4 mt-auto">
                        <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] text-white border border-[#2A3A4A] py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                            <Edit2 size={14} /> Edit
                        </button>
                    </div>
                </div>

                {/* Growth Plan */}
                <div className="bg-gradient-to-br from-[#0A1420] to-indigo-900/10 border-2 border-indigo-500/30 rounded-2xl p-6 relative flex flex-col h-full shadow-[0_0_30px_rgba(79,70,229,0.1)]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-lg">Most Popular</div>
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-4 mt-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                                <Layers size={20} />
                            </div>
                            <h2 className="text-white font-bold text-lg">Growth</h2>
                        </div>
                        <span className="text-xs text-[#556677] font-bold uppercase tracking-wider">Active</span>
                    </div>
                    <div className="mb-6">
                        <div className="text-3xl font-black text-white flex items-end gap-1 mb-1">
                            <span className="text-lg text-[#556677] pb-1">₹</span>25,000 <span className="text-xs text-[#8899AA] font-bold pb-2">/mo</span>
                        </div>
                        <p className="text-sm text-[#8899AA]">Up to 250 employees</p>
                    </div>
                    <div className="space-y-3 mb-8 flex-1">
                        <div className="text-xs font-bold text-[#556677] uppercase tracking-wider">All Startup features, plus:</div>
                        {['Performance Management', 'Expense Management', 'Recruitment (ATS)', 'API Access'].map((mod, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-white">
                                <Check size={14} className="text-indigo-400 shrink-0" />
                                <span>{mod}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 border-t border-[#1A2A3A] pt-4 mt-auto">
                        <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] text-white border border-[#2A3A4A] py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                            <Edit2 size={14} /> Edit
                        </button>
                    </div>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative flex flex-col h-full hover:border-[#2A3A4A] transition-colors group">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                                <DollarSign size={20} />
                            </div>
                            <h2 className="text-white font-bold text-lg">Enterprise</h2>
                        </div>
                        <span className="text-xs text-[#556677] font-bold uppercase tracking-wider">Custom</span>
                    </div>
                    <div className="mb-6">
                        <div className="text-3xl font-black text-white flex items-end gap-1 mb-1">
                            Let's Talk
                        </div>
                        <p className="text-sm text-[#8899AA]">250+ employees</p>
                    </div>
                    <div className="space-y-3 mb-8 flex-1">
                        <div className="text-xs font-bold text-[#556677] uppercase tracking-wider">All Growth features, plus:</div>
                        {['Dedicated Support', 'Custom White-labeling', 'SAML SSO Integration', 'On-prem Backup Export'].map((mod, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-white">
                                <Check size={14} className="text-emerald-400 shrink-0" />
                                <span>{mod}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 border-t border-[#1A2A3A] pt-4 mt-auto">
                        <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] text-white border border-[#2A3A4A] py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                            <Edit2 size={14} /> Edit
                        </button>
                    </div>
                </div>

            </div>

            {/* Legacy / Archived Plans */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-8">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center gap-2">
                    <Archive size={18} className="text-[#556677]" />
                    <h2 className="text-lg font-bold text-white">Legacy & Grandfathered Plans</h2>
                </div>
                <div className="p-6">
                    <p className="text-sm text-[#8899AA] mb-4">These plans are no longer available for new workspaces, but existing tenants remain supported.</p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl">
                            <div>
                                <h3 className="text-white font-bold text-sm">Beta Pioneer (Free Forever)</h3>
                                <p className="text-xs text-[#556677]">Created Jan 2024</p>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold">
                                <span className="text-[#8899AA]">14 Tenants Active</span>
                                <span className="bg-[#0A1420] border border-[#1A2A3A] text-[#556677] px-2 py-1 rounded text-[10px] uppercase">Read Only</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
