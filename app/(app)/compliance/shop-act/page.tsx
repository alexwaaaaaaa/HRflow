"use client";

import React from 'react';
import {
    Store, FileCheck, MapPin, Search, Plus, CheckCircle,
    AlertCircle, Download, ExternalLink, Users
} from 'lucide-react';

export default function ShopAct() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Shops & Establishments Act <Store size={28} className="text-cyan-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">S&E Registrations, Renewals, and localized leave/holiday compliance.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Branch Registrations list */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <h2 className="text-sm font-black text-white uppercase tracking-widest">S&E Certificates by Branch</h2>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input type="text" placeholder="Search Branch..." className="bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500" />
                                    </div>
                                    <button className="px-4 py-1.5 bg-[#1A2A3A] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center gap-1">
                                        <Plus size={14} /> Add New
                                    </button>
                                </div>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Branch Location</th>
                                        <th className="px-6 py-4">Reg No. / Form C</th>
                                        <th className="px-6 py-4">Validity</th>
                                        <th className="px-6 py-4">Headcount Allowed</th>
                                        <th className="px-6 py-4 text-center">Certificate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { loc: 'HQ - Koramangala, BLR', reg: 'SE/KA/09/22301', valid: 'Lifetime', hc: 'Max 150', status: 'active', color: 'emerald' },
                                        { loc: 'Sales Office - Andheri, MH', reg: '27293881023 (Intimation)', valid: 'Not Req', hc: '0-9 Emp', status: 'active', color: 'emerald' },
                                        { loc: 'Support Center - Noida, UP', reg: 'UP/GBN/SE/9912', valid: '31-Dec-2023', hc: 'Max 50', status: 'expired', color: 'rose' },
                                    ].map((row, i) => (
                                        <tr key={i} className={`group transition-all ${row.status === 'expired' ? 'bg-rose-500/5 hover:bg-rose-500/10' : 'hover:bg-[#1A2A3A]/30'}`}>
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-black text-white flex items-center gap-2"><MapPin size={12} className={`text-${row.color}-500`} />{row.loc}</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.reg}</td>
                                            <td className="px-6 py-4">
                                                {row.status === 'expired' ? (
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 flex items-center gap-1 animate-pulse">
                                                        <AlertCircle size={12} /> Expired: {row.valid}
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                                                        <CheckCircle size={12} /> {row.valid}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-300 flex items-center gap-1">
                                                <Users size={12} className="text-slate-500" /> {row.hc}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {row.status === 'expired' ? (
                                                    <button className="px-3 py-1 bg-rose-600 rounded-lg text-[9px] font-black uppercase text-white hover:bg-rose-700">Renew</button>
                                                ) : (
                                                    <button className="text-slate-500 hover:text-cyan-500 transition-colors"><Download size={16} className="mx-auto" /></button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-[#060B14] border-t border-[#1A2A3A] flex gap-2 justify-center text-[10px] font-black uppercase tracking-widest text-cyan-500 italic">
                                Note: Shop Act Certificate must be prominently displayed at every branch premises.
                            </div>
                        </div>
                    </div>

                    {/* Regional Leave Rules */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#1A2A3A] pb-4 flex items-center gap-2">
                                <FileCheck size={14} className="text-cyan-500" /> S&E Local Leave Rules
                            </h3>
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                                S&E Act governs minimum leave encashment and carry-forward rules which must reflect in the HRFlow Leave Module.
                            </p>
                            <div className="space-y-2 mt-4">
                                <div className="p-3 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Karnataka</div>
                                    <div className="text-[9px] text-slate-500 font-bold mt-1">1 Earned Leave per 20 days worked. Max carry forward: 30.</div>
                                </div>
                                <div className="p-3 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Maharashtra</div>
                                    <div className="text-[9px] text-slate-500 font-bold mt-1">15 days of Paid Leave. Max carry forward: 45.</div>
                                </div>
                            </div>
                            <button className="w-full mt-4 py-2 border border-[#1A2A3A] rounded-lg text-xs font-black text-slate-400 hover:text-white hover:border-slate-500 transition-all flex justify-center items-center gap-1">
                                Sync with Leave Module <ExternalLink size={12} />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
