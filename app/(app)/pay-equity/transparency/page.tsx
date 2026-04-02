"use client";
import React, { useState } from 'react';
import { Eye, ShieldAlert, CheckCircle2, Search, Filter } from 'lucide-react';

export default function PayTransparencyScreen() {
    const [toggle, setToggle] = useState(true);

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Eye size={24} className="text-sky-400" /> External Pay Transparency Management</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage public salary ranges published to ATS and job boards for compliance with local transparency laws.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-4">Global Transparency Rule Engine</h3>
                    <div className="flex items-center justify-between bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                        <div>
                            <div className="text-white font-bold text-sm">Strict Geography Enforcement</div>
                            <div className="text-[#8899AA] text-xs mt-1">Force range publication for NY, CA, WA, CO</div>
                        </div>
                        <div
                            className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${toggle ? 'bg-sky-500' : 'bg-[#2A3A4A]'}`}
                            onClick={() => setToggle(!toggle)}
                        >
                            <div className={`absolute top-1 bottom-1 w-4 bg-white rounded-full transition-all shadow ${toggle ? 'left-7' : 'left-1'}`}></div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 bg-sky-500/5 border border-sky-500/20 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-sky-400 font-bold mb-2">32 Job Postings require immediate action</h3>
                        <p className="text-sky-200/70 text-sm max-w-md">Remote listings implicitly cover transparent jurisdictions but lack required salary banding.</p>
                    </div>
                    <button className="bg-[#131B2B] border border-sky-500/30 text-sky-400 font-bold px-4 py-2 rounded-xl text-sm transition-colors hover:bg-sky-500/10 shadow-sm shrink-0 whitespace-nowrap">
                        Auto-Append Ranges
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden mt-6">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-4 items-center justify-between bg-[#060D1A]">
                    <h3 className="text-white font-bold px-2">Active Requisition Bandings</h3>
                    <div className="relative w-full md:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search Req or Title..."
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-sky-500 outline-none" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Req ID / Title</th>
                                <th className="p-4 py-3">Location</th>
                                <th className="p-4 py-3">Internal Band</th>
                                <th className="p-4 py-3">Publicly Posted Range</th>
                                <th className="p-4 py-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">REQ-4029</div>
                                    <div className="text-[#8899AA] text-xs">Sr. React Developer</div>
                                </td>
                                <td className="p-4 text-[#AABBCC]">Remote (US)</td>
                                <td className="p-4">
                                    <div className="text-[#556677] font-mono text-xs">$140k - $180k</div>
                                </td>
                                <td className="p-4">
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded p-1.5 inline-block">
                                        <span className="text-sky-400 font-mono font-bold">$135,000 - $190,000</span>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                        <CheckCircle2 size={12} /> Published
                                    </span>
                                </td>
                            </tr>

                            <tr className="border-b border-rose-500/10 bg-rose-500/5 hover:bg-rose-500/10 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">REQ-4091</div>
                                    <div className="text-[#8899AA] text-xs">Director, PMM</div>
                                </td>
                                <td className="p-4 text-[#AABBCC]">New York, NY</td>
                                <td className="p-4">
                                    <div className="text-[#556677] font-mono text-xs">$180k - $220k</div>
                                </td>
                                <td className="p-4">
                                    <span className="text-rose-400 font-bold text-xs">Missing</span>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                        <ShieldAlert size={12} /> Non-Compliant
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
