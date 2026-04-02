"use client";
import React from 'react';
import { Globe, ShieldCheck, AlertCircle, Search, RefreshCw, Server, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CustomDomainManagementScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Custom Domain & SSL Provisioning</h1>
                    <p className="text-[#8899AA] text-sm">Manage CNAME records, automated Let's Encrypt certificates, and custom routing for Enterprise tenants.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <RefreshCw size={16} /> Force Renew All SSL
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mb-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">124</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Active Custom Domains</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-emerald-400 mb-1">100%</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">SSL Coverage</div>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-1">
                        <div className="text-3xl font-black text-amber-400">3</div>
                        <AlertCircle size={20} className="text-amber-400" />
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Pending DNS Verification</div>
                </div>
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-rose-400 mb-1">0</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">SSL Expiring &lt; 7 Days</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#060D1A]">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><Server size={18} className="text-[#556677]" /> Domain Directory</h2>
                    <div className="relative w-full md:w-80">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search domain or organization..." className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none transition-colors" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Custom Domain</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Organization</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">SSL Provider</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Target Route</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { dom: 'people.techcorp.in', org: 'TechCorp India', status: 'Active', ssl: 'Let\'s Encrypt (Automated)', route: 'tenant.kaarya.com/t/techcorp' },
                                { dom: 'hr.zenithlogistics.com', org: 'Zenith Logistics', status: 'Pending Verification', ssl: 'Pending', route: 'tenant.kaarya.com/t/zenith', warn: true },
                                { dom: 'careers.globalfinance.co.uk', org: 'Global Finance Ltd', status: 'Active', ssl: 'Custom (AWS ACM)', route: 'jobs.kaarya.com/c/globalfin' },
                                { dom: 'portal.apexmedia.com', org: 'Apex Media Group', status: 'Active', ssl: 'Let\'s Encrypt (Automated)', route: 'tenant.kaarya.com/t/apex' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4 text-indigo-400 font-bold text-sm flex items-center gap-2">
                                        <Globe size={14} className="text-[#556677]" /> {row.dom}
                                    </td>
                                    <td className="px-6 py-4 text-white font-bold text-xs">{row.org}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            {row.warn ? <AlertCircle size={14} className="text-amber-400" /> : <CheckCircle2 size={14} className="text-emerald-400" />}
                                            <span className={`text-xs font-bold ${row.warn ? 'text-amber-400' : 'text-emerald-400'}`}>{row.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA] text-[10px] uppercase font-bold tracking-wider">{row.ssl}</td>
                                    <td className="px-6 py-4 text-[#556677] font-mono text-xs">{row.route}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
