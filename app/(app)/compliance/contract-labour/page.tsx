"use client";

import React, { useState } from 'react';
import {
    Users, ShieldAlert, FileText, UploadCloud,
    CheckSquare, Search, FileSignature, HardHat
} from 'lucide-react';

export default function ContractLabour() {
    const [activeTab, setActiveTab] = useState('principal');

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Contract Labour (CLRA) <HardHat size={28} className="text-yellow-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Manage Principal Employer RC and verify Contractor Licenses/Challans.</p>
                    </div>

                    <div className="flex bg-[#0D1928] border border-[#1A2A3A] p-1 rounded-xl w-max">
                        <button
                            onClick={() => setActiveTab('principal')}
                            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'principal' ? 'bg-[#1A2A3A] text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Principal Employer (PE)
                        </button>
                        <button
                            onClick={() => setActiveTab('contractors')}
                            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'contractors' ? 'bg-[#1A2A3A] text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Contractor Verification
                        </button>
                    </div>
                </div>

                {activeTab === 'principal' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in slide-in-from-right-8 duration-500">
                        <div className="lg:col-span-3 space-y-6">

                            {/* RC Summary */}
                            <div className="bg-[#0D1928] border border-yellow-500/20 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <FileSignature size={120} className="text-yellow-500" />
                                </div>
                                <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
                                    <div>
                                        <h2 className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-1">Registration Certificate (Form I)</h2>
                                        <div className="text-2xl font-black text-white">RC/MH/LC/2023/991</div>
                                        <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest flex items-center gap-2">
                                            <CheckSquare size={14} className="text-emerald-500" /> Valid for up to 200 Contract Workers
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button className="px-6 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:border-yellow-500/50 transition-all flex items-center gap-2">
                                            <FileText size={14} /> Download Certificate
                                        </button>
                                        <button className="px-6 py-2 bg-yellow-600 rounded-xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-yellow-700 transition-all shadow-lg text-center">
                                            Apply for Amendment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Returns */}
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-xl">
                                <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50">
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Annual Return (Form XXV)</h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Filing Period</div>
                                            <div className="text-sm font-black text-slate-300">Jan - Dec 2023</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</div>
                                            <div className="text-sm font-black text-emerald-500 flex items-center gap-1"><CheckSquare size={14} /> Filed</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Date of Filing</div>
                                            <div className="text-sm font-black text-white">10 Feb 2024</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="space-y-6">
                            <div className="bg-[#0D1928] border border-rose-500/20 rounded-2xl p-6 shadow-xl space-y-4">
                                <h3 className="text-xs font-black text-rose-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                    <ShieldAlert size={14} /> Principal Employer Liability
                                </h3>
                                <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                                    Under Section 21 of CLRA, if the contractor fails to pay wages, PF, or ESI, the Principal Employer is legally bound to clear the dues. Always audit contractor challans monthly.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in slide-in-from-left-8 duration-500">
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                                <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Contractor Monthly Compliance Audit</h2>
                                    <div className="flex gap-4">
                                        <div className="text-[10px] font-black text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded uppercase tracking-widest">
                                            Audit Month: Mar 2024
                                        </div>
                                    </div>
                                </div>
                                <table className="w-full text-left">
                                    <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                        <tr>
                                            <th className="px-6 py-4">Contractor / Agency</th>
                                            <th className="px-6 py-4 text-center">Labor License</th>
                                            <th className="px-6 py-4 text-center">PF Challan</th>
                                            <th className="px-6 py-4 text-center">ESIC Challan</th>
                                            <th className="px-6 py-4 text-center">Wage Register</th>
                                            <th className="px-6 py-4 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A]">
                                        {[
                                            { name: 'A-Z Facility Management', lic: 'Valid', pf: 'Verified', esi: 'Verified', wage: 'Signed', status: 'Clear', color: 'emerald' },
                                            { name: 'SecureForce Guards Pvt Ltd', lic: 'Valid', pf: 'Pending', esi: 'Pending', wage: 'Unsigned', status: 'Hold Payment', color: 'rose' },
                                            { name: 'Elite IT Staffing', lic: 'Exempt (<20)', pf: 'Verified', esi: 'Exempt', wage: 'Signed', status: 'Clear', color: 'emerald' },
                                        ].map((row, i) => (
                                            <tr key={i} className={`group hover:bg-[#1A2A3A]/30 transition-all ${row.status === 'Hold Payment' ? 'bg-rose-500/5' : ''}`}>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-black text-white">{row.name}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center"><span className="text-[10px] text-slate-400 font-bold">{row.lic}</span></td>
                                                <td className="px-6 py-4 text-center"><span className={`text-[10px] font-bold ${row.pf === 'Verified' ? 'text-emerald-500' : row.pf === 'Pending' ? 'text-rose-500' : 'text-slate-500'}`}>{row.pf}</span></td>
                                                <td className="px-6 py-4 text-center"><span className={`text-[10px] font-bold ${row.esi === 'Verified' ? 'text-emerald-500' : row.esi === 'Pending' ? 'text-rose-500' : 'text-slate-500'}`}>{row.esi}</span></td>
                                                <td className="px-6 py-4 text-center"><span className="text-[10px] text-slate-400 font-bold">{row.wage}</span></td>
                                                <td className="px-6 py-4 text-center">
                                                    {row.status === 'Hold Payment' ? (
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-rose-500 border border-rose-500/30 bg-rose-500/10 px-2 py-1 rounded">Hold Invoice</span>
                                                    ) : (
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded">Clear Invoice</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
