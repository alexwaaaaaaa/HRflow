"use client";
import React from 'react';
import { Search, Filter, ShieldAlert, AlertTriangle, CheckCircle2, Siren, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SecurityIncidentScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/security/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Security</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Incident Response Center</h1>
                    <p className="text-[#8899AA] text-sm">Track, manage, and mitigate security incidents like data breaches, lost devices, or policy violations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-rose-500/20">
                        <Siren size={16} /> Declare Incident
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div className="text-3xl font-black text-white mb-1">0</div>
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Clear</span>
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Critical Priority</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div className="text-3xl font-black text-rose-400 mb-1">3</div>
                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase animate-pulse">Open</span>
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">High Priority</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div className="text-3xl font-black text-amber-400 mb-1">12</div>
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Medium / Low</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div className="text-3xl font-black text-[#556677] mb-1">142</div>
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Resolved (YTD)</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-6">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search incidents..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:border-indigo-500 outline-none w-64 transition-colors" />
                        </div>
                    </div>
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-3 py-1.5 rounded-lg font-bold text-xs transition-colors py-1.5 flex items-center gap-2">
                        <Filter size={14} /> Filter
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Incident ID</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Description</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Severity</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Reported By</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Created</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { id: 'INC-2026-089', desc: 'Lost Corporate Laptop (EMP-1022)', sev: 'High', status: 'Investigating', by: 'Aditi Krishnan', time: '2 hours ago' },
                                { id: 'INC-2026-088', desc: 'Suspicious Email Forwarding Rule', sev: 'High', status: 'Triage', by: 'System Alert', time: 'Yesterday' },
                                { id: 'INC-2026-087', desc: 'Unauthorized Access to Payroll Folder', sev: 'High', status: 'Containment', by: 'System Alert', time: '2 days ago' },
                                { id: 'INC-2026-086', desc: 'Vendor Phishing Attempt', sev: 'Medium', status: 'Resolved', by: 'Rajesh Kumar', time: 'Oct 20, 2026' },
                                { id: 'INC-2026-085', desc: 'Shared Password Detected', sev: 'Low', status: 'Resolved', by: 'Meera Venkatesh', time: 'Oct 15, 2026' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="font-mono text-indigo-400 font-bold">{row.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-white font-medium max-w-[300px] truncate">{row.desc}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 text-xs font-bold ${row.sev === 'Critical' ? 'text-rose-500' :
                                                row.sev === 'High' ? 'text-rose-400' :
                                                    row.sev === 'Medium' ? 'text-amber-400' :
                                                        'text-sky-400'
                                            }`}>
                                            <AlertTriangle size={14} className={row.sev === 'Medium' ? 'text-amber-400' : row.sev === 'Low' ? 'text-sky-400' : 'text-rose-400'} />
                                            {row.sev}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${row.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA]">{row.by}</td>
                                    <td className="px-6 py-4 text-[#8899AA]">{row.time}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/security/incidents/${row.id}`} className="inline-flex items-center justify-center p-2 rounded-lg bg-[#131B2B] border border-[#2A3A4A] text-[#8899AA] group-hover:bg-indigo-600 group-hover:border-indigo-500 group-hover:text-white transition-all">
                                            <ChevronRight size={16} />
                                        </Link>
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
