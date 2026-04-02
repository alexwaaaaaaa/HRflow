"use client";
import React from 'react';
import { Target, Search, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingProgressScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Implementation & Onboarding Ops</h1>
                    <p className="text-[#8899AA] text-sm">Track the data migration and go-live status of newly acquired Enterprise tenants.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#060D1A]">
                    <div className="relative w-full md:w-80">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search organization..." className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none transition-colors" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Organization</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Assigned IM (Owner)</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Phase</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Progress Matrix</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Target Go-Live</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { org: 'Zenith Logistics', owner: 'Rahul V.', phase: 'Data Migration', progress: 45, golive: 'Nov 01, 2026', err: true },
                                { org: 'Apex Media Group', owner: 'Meghna S.', phase: 'Parallel Payroll Run', progress: 85, golive: 'Oct 31, 2026' },
                                { org: 'Global Finance Ltd', owner: 'Rahul V.', phase: 'Kickoff / Scoping', progress: 10, golive: 'Dec 15, 2026' },
                                { org: 'TechCorp India', owner: 'Priya A.', phase: 'Hypercare', progress: 100, golive: 'Oct 01, 2026', done: true },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="text-white font-bold text-sm mb-1">{row.org}</div>
                                        {row.err && <div className="text-[10px] text-rose-400 font-bold flex items-center gap-1"><AlertCircle size={10} /> Data formatting issues block</div>}
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA] font-bold text-xs">{row.owner}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${row.done ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                row.err ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                    'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                            }`}>
                                            {row.phase}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 mt-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-48 h-1.5 bg-[#131B2B] rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${row.done ? 'bg-emerald-500' : row.err ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${row.progress}%` }} />
                                            </div>
                                            <span className="text-xs font-bold text-white">{row.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA] text-xs font-bold">{row.golive}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
