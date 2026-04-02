"use client";
import React from 'react';
import { Search, Building2, ExternalLink, Filter, MoreVertical, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function OrganizationListScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Organizations Database</h1>
                    <p className="text-[#8899AA] text-sm">Manage all tenant workspaces, subscriptions, and platform access.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-indigo-500/20">
                        Provision New Tenant
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-6">

                {/* Search & Toolbar */}
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search by Org Name, Domain, or ID..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none w-80 transition-colors" />
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <span className="text-xs font-bold text-[#556677] uppercase">Filter Status:</span>
                            <select className="bg-[#131B2B] border border-[#2A3A4A] text-white text-xs font-bold rounded-lg px-3 py-2 outline-none appearance-none cursor-pointer">
                                <option>All Active</option>
                                <option>Churned</option>
                                <option>Trial</option>
                            </select>
                        </div>
                    </div>
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-3 py-2 rounded-lg font-bold text-xs transition-colors flex items-center gap-2">
                        <Filter size={14} /> Advanced Filters
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Organization</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Plan Tier</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Workspace Domain</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] text-right">Employees</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] text-right">MRR</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { id: 'ORG-A981', name: 'TechCorp India', plan: 'Enterprise (Annual)', domain: 'techcorp.hrflow.in', emp: 450, mrr: '$4,500', status: 'Active' },
                                { id: 'ORG-B102', name: 'Zenith Logistics', plan: 'Growth (Monthly)', domain: 'zenith.hrflow.in', emp: 120, mrr: '$960', status: 'Active' },
                                { id: 'ORG-C334', name: 'Apex Media Group', plan: 'Trial', domain: 'apexmedia.hrflow.in', emp: 45, mrr: '$0', status: 'Trial Ends in 4d', warn: true },
                                { id: 'ORG-D881', name: 'Global Finance Ltd', plan: 'Custom Enterprise', domain: 'gfl.kaarya.com', emp: 1200, mrr: '$15,000', status: 'Active', customUrl: true },
                                { id: 'ORG-X992', name: 'Sunset Technologies', plan: 'Startup', domain: 'sunset.hrflow.in', emp: 15, mrr: '$90', status: 'Suspended (Billing)', err: true },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-[#131B2B] border border-[#2A3A4A] flex items-center justify-center text-[#556677]">
                                                <Building2 size={16} />
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-sm tracking-wide">{row.name}</div>
                                                <div className="text-[10px] text-indigo-400 font-mono mt-0.5">{row.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[#8899AA] font-medium">{row.plan}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-white flex items-center gap-2">
                                            {row.domain}
                                            {row.customUrl && <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-1 py-0.5 rounded text-[8px] font-bold uppercase">Custom Name</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-white font-mono font-bold">{row.emp}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-emerald-400 font-bold">{row.mrr}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${row.err ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                row.warn ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/super-admin/organizations/${row.id}`} className="bg-[#131B2B] border border-[#2A3A4A] p-1.5 rounded hover:bg-indigo-600 hover:text-white hover:border-indigo-500 text-[#8899AA] transition-colors">
                                                <ExternalLink size={16} />
                                            </Link>
                                            <button className="bg-[#131B2B] border border-[#2A3A4A] p-1.5 rounded hover:bg-[#1A2A3A] text-[#8899AA] transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
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
