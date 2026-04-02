"use client";
import React from 'react';
import { Network, Activity, Search, AlertCircle, Lock, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function APIUsageScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Global API Traffic Control</h1>
                    <p className="text-[#8899AA] text-sm">Monitor public B2B API usage, rate limit enforcement, and Webhook deliveries across all tenants.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mb-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">2.4M</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Reqs (Last 24h)</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">99.9%</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Success Rate (2xx)</div>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-amber-400 mb-1">45K</div>
                    <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Rate Limited (429)</div>
                </div>
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-1">
                        <div className="text-3xl font-black text-rose-400">12</div>
                        <AlertCircle size={20} className="text-rose-400" />
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Failed Webhooks (5xx)</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><Network size={18} className="text-[#556677]" /> Heavy Integrators (Top Consumers)</h2>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search Tenant/App..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:border-indigo-500 outline-none w-64 transition-colors" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Organization</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">OAuth App ID</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Volume (24h)</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Rate Limit Quota</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Top Endpoint</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { org: 'TechCorp India', app: 'app_8f991d', vol: '1.2M', limit: '95%', end: 'GET /v1/employees', warn: true },
                                { org: 'Zenith Logistics', app: 'app_2x11cv', vol: '450K', limit: '45%', end: 'POST /v1/attendance/punch' },
                                { org: 'Global Finance Ltd', app: 'app_9k88pl', vol: '320K', limit: '32%', end: 'GET /v1/payroll/slips' },
                                { org: 'Apex Media Group', app: 'app_11mxcq', vol: '89K', limit: '100%', end: 'GET /v1/leaves', err: true },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4 text-white font-bold">{row.org}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-[#8899AA] font-mono text-xs">
                                            <Code2 size={12} /> {row.app}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white font-mono">{row.vol}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-1.5 bg-[#131B2B] rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${row.err ? 'bg-rose-500' : row.warn ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: row.limit }} />
                                            </div>
                                            <span className={`text-xs font-bold ${row.err ? 'text-rose-400' : row.warn ? 'text-amber-400' : 'text-emerald-400'}`}>{row.limit}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA] font-mono text-xs">{row.end}</td>
                                    <td className="px-6 py-4 text-right">
                                        {row.err && (
                                            <button className="text-xs font-bold text-rose-400 hover:text-white transition-colors bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded">
                                                Throttle App
                                            </button>
                                        )}
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
