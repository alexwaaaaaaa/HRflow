"use client";
import React from 'react';
import { Building2, Globe, Users, CreditCard, Activity, Cpu, ExternalLink, Settings, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OrganizationDetailScreen({ params }: { params: { id: string } }) {
    const orgId = "ORG-A981";

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/organizations" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Organizations</Link>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white mb-1">TechCorp India Pvt Ltd</h1>
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Active</span>
                            </div>
                            <div className="text-[#8899AA] text-sm flex items-center gap-3 font-mono">
                                <span>{orgId}</span>
                                <span className="text-[#3A4A5A]">|</span>
                                <span className="flex items-center gap-1"><Globe size={14} /> techcorp.hrflow.in</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Settings size={16} /> Backend Settings
                    </button>
                    <Link href={`/super-admin/organizations/${orgId}/impersonate`} className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-rose-500/20">
                        <ShieldAlert size={16} /> System Impersonation
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">

                {/* Left Col: Overview */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Key Stats */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 grid grid-cols-2 gap-4">
                        <div className="col-span-2 flex items-center justify-between border-b border-[#1A2A3A] pb-4">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Current Cycle</h3>
                        </div>
                        <div>
                            <div className="text-xs text-[#556677] uppercase font-bold mb-1">Seats Used</div>
                            <div className="text-xl font-black text-white flex items-center gap-2"><Users size={16} className="text-[#8899AA]" /> 450</div>
                        </div>
                        <div>
                            <div className="text-xs text-[#556677] uppercase font-bold mb-1">MRR Impact</div>
                            <div className="text-xl font-black text-emerald-400 border-emerald-400/20">$4,500</div>
                        </div>
                    </div>

                    {/* Subscription Details */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 space-y-4">
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2"><CreditCard size={16} className="text-[#556677]" /> Subscription</h3>

                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl">
                            <span className="text-indigo-400 font-bold text-sm block mb-1">Enterprise (India)</span>
                            <span className="text-[#8899AA] text-xs">Annual Contract • Renews Oct 2027</span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm border-b border-[#1A2A3A] pb-2">
                                <span className="text-[#556677]">Payment Method</span>
                                <span className="text-white font-bold">ACH / Bank TXN</span>
                            </div>
                            <div className="flex justify-between items-center text-sm pt-1">
                                <span className="text-[#556677]">Account Exec</span>
                                <span className="text-white font-bold">Meghna S. (AM-04)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Operations */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden h-full">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Cpu size={18} className="text-[#556677]" /> Ecosystem Provisioning</h2>
                        </div>

                        <div className="p-6 divide-y divide-[#1A2A3A]">
                            {/* Modules */}
                            <div className="pb-6">
                                <h3 className="text-xs text-[#8899AA] uppercase font-bold tracking-wider mb-4">Enabled Modules (Feature Flags)</h3>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                    {['Core HR', 'Payroll Engine', 'Statutory India', 'Leave & Attendance', 'Performance Mgmt', 'Expense Mgmt'].map((mod, i) => (
                                        <div key={i} className="bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg flex items-center justify-between text-xs">
                                            <span className="text-white font-medium">{mod}</span>
                                            <div className="w-8 h-4 bg-emerald-500 rounded-full relative">
                                                <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5" />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg flex items-center justify-between text-xs opacity-50 grayscale">
                                        <span className="text-white font-medium">BGV Pro</span>
                                        <div className="w-8 h-4 bg-[#2A3A4A] rounded-full relative">
                                            <div className="w-3 h-3 bg-gray-400 rounded-full absolute top-0.5 left-0.5" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Limits & Usage */}
                            <div className="py-6">
                                <h3 className="text-xs text-[#8899AA] uppercase font-bold tracking-wider mb-4 flex justify-between">
                                    <span>Platform Usage Limits</span>
                                    <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">Modify Quotas</span>
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm font-bold text-white mb-2">
                                            <span>Storage (Attachments, Resumes)</span>
                                            <span className="font-mono">45GB / 100GB</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-[#131B2B] rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500 rounded-full w-[45%]" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm font-bold text-white mb-2">
                                            <span>API Calls (Monthly)</span>
                                            <span className="font-mono">842K / 1M</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-[#131B2B] rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500 rounded-full w-[84%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="pt-6">
                                <h3 className="text-xs text-rose-400 uppercase font-bold tracking-wider mb-4">Danger Zone</h3>
                                <div className="flex flex-col gap-3">
                                    <button className="w-full text-left p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-colors flex justify-between items-center group">
                                        <div>
                                            <span className="text-rose-400 font-bold text-sm block">Suspend Workspace</span>
                                            <span className="text-[#8899AA] text-xs">Temporarily revoke login access for all employees.</span>
                                        </div>
                                        <ArrowRight size={16} className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
