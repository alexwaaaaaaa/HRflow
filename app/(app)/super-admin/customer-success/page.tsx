"use client";
import React from 'react';
import { Target, TrendingDown, Users, Search, MoreVertical, ShieldCheck, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export default function CustomerSuccessScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Customer Success Center</h1>
                    <p className="text-[#8899AA] text-sm">Monitor workspace health scores, onboarding velocity, and enterprise account management.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mb-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">92.4</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Avg Health Score (0-100)</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-indigo-400 mb-1">14 Days</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Time to First Value (TTFV)</div>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-amber-400 mb-1">28</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">At-Risk Accounts</div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-1">
                        <div className="text-3xl font-black text-emerald-400">$2.1M</div>
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Expansion Pipeline (ARR)</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search accounts..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none w-64 transition-colors" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                            My Accounts
                        </button>
                        <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-amber-400 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                            Show At-Risk Only
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Organization</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">CSM / AE Owner</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Health Score</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Onboarding Status</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Last Touch</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { org: 'TechCorp India', csm: 'Meghna S.', score: 98, onb: '100% Completed', last: '2 days ago', status: 'good' },
                                { org: 'Global Finance Ltd', csm: 'Rahul V.', score: 85, onb: '100% Completed', last: '1 week ago', status: 'good' },
                                { org: 'Zenith Logistics', csm: 'Meghna S.', score: 62, onb: 'Stalled at Payroll Setup', last: '3 weeks ago', status: 'warn' },
                                { org: 'Sunset Technologies', csm: 'Unassigned', score: 24, onb: '0% - Abandoned', last: '2 months ago', status: 'err' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4 text-white font-bold">{row.org}</td>
                                    <td className="px-6 py-4 text-[#8899AA] text-xs font-bold flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[8px] uppercase">{row.csm.substring(0, 2)}</div>
                                        {row.csm}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-[#131B2B] rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${row.status === 'err' ? 'bg-rose-500' : row.status === 'warn' ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${row.score}%` }} />
                                            </div>
                                            <span className={`text-xs font-bold ${row.status === 'err' ? 'text-rose-400' : row.status === 'warn' ? 'text-amber-400' : 'text-emerald-400'}`}>{row.score}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA] text-xs">
                                        {row.onb}
                                    </td>
                                    <td className="px-6 py-4 text-[#556677] text-xs">{row.last}</td>
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
