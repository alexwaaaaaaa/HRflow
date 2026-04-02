"use client";

import React from 'react';
import {
    Users, Plus, CheckCircle, Clock, Search,
    UploadCloud, ArrowRight, Activity
} from 'lucide-react';

export default function ESICIPNumber() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            ESIC IP Number Generation <Activity size={28} className="text-emerald-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Insured Person (IP) Number registration for new joiners.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Action Area */}
                    <div className="lg:col-span-3 space-y-6">

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <div>
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Pending IP Registration</h2>
                                </div>
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="text" placeholder="Search Joiners..." className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-emerald-500" />
                                </div>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Employee</th>
                                        <th className="px-6 py-4">DOJ</th>
                                        <th className="px-6 py-4">Aadhar / Pre-existing</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { id: 'EMP-905', name: 'Ajit Singh', doj: '02 Apr 2024', aadhar: 'Verified', pre: 'None' },
                                        { id: 'EMP-906', name: 'Nisha Patil', doj: '03 Apr 2024', aadhar: 'Verified', pre: 'None' },
                                        { id: 'EMP-907', name: 'Kabir Das', doj: '05 Apr 2024', aadhar: 'Pending', pre: 'None' },
                                        { id: 'EMP-908', name: 'Lalit Ram', doj: '10 Apr 2024', aadhar: 'Verified', pre: 'Likely Has Old IP' },
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all">
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-black text-white">{row.name}</div>
                                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">{row.id}</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-400">{row.doj}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-[8px] font-black uppercase tracking-widest w-max px-2 py-0.5 rounded ${row.aadhar === 'Verified' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>
                                                        {row.aadhar}
                                                    </span>
                                                    {row.pre !== 'None' && (
                                                        <span className="text-[8px] font-black uppercase tracking-widest text-rose-500">{row.pre}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button disabled={row.aadhar !== 'Verified'} className="px-3 py-1.5 rounded-lg border border-emerald-500/30 text-[9px] font-black uppercase text-emerald-500 hover:bg-emerald-500/10 transition-colors disabled:opacity-30">
                                                    Register
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-[#060B14] border-t border-[#1A2A3A] text-center">
                                <button className="w-full py-2 bg-emerald-600 rounded-xl text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2">
                                    <UploadCloud size={16} /> Download ESIC Portal Excel Format
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">ESIC Quick Rules</h3>
                            <ul className="space-y-3 text-[10px] text-slate-300 font-medium leading-relaxed italic">
                                <li>• Mandatory for employees earning up to ₹21,000 gross.</li>
                                <li>• Registration must be done within 10 days of DOJ.</li>
                                <li>• Do not generate new IP if employee already has one from a previous job. Just link the existing IP to your employer code.</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
