"use client";

import React, { useState } from 'react';
import {
    Users, Plus, CheckCircle, Clock,
    ArrowRight, ArrowLeft, UploadCloud, Link as LinkIcon, BadgeAlert, AlertOctagon
} from 'lucide-react';

export default function UANGeneration() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            UAN Bulk Generation <Users size={28} className="text-indigo-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Register new joiners and generate Universal Account Numbers.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2.5 bg-indigo-600 rounded-xl text-sm font-black text-white hover:bg-indigo-700 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center gap-2 italic">
                            <UploadCloud size={16} /> Upload Bulk TXT
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Action Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* New Joiners Pending UAN */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <div>
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Pending UAN Generation</h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Employees missing UAN</p>
                                </div>
                                <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-rose-500/20">08 Actionable</span>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Employee</th>
                                        <th className="px-6 py-4">DOJ</th>
                                        <th className="px-6 py-4">Aadhar Status</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { id: 'EMP-901', name: 'Ritesh Kumar', doj: '01 Apr 2024', aadhar: 'Verified' },
                                        { id: 'EMP-902', name: 'Simran Singh', doj: '01 Apr 2024', aadhar: 'Verified' },
                                        { id: 'EMP-903', name: 'David Raj', doj: '04 Apr 2024', aadhar: 'Pending' },
                                        { id: 'EMP-904', name: 'Kavita Iyer', doj: '05 Apr 2024', aadhar: 'Verified' },
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all">
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-black text-white">{row.name}</div>
                                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">{row.id}</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-400">{row.doj}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 w-max px-2 py-0.5 rounded ${row.aadhar === 'Verified' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                                    }`}>
                                                    {row.aadhar === 'Verified' ? <CheckCircle size={10} /> : <Clock size={10} />} {row.aadhar}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    disabled={row.aadhar !== 'Verified'}
                                                    className="p-2 rounded-lg text-indigo-500 font-black hover:bg-indigo-500/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-[#060B14] border-t border-[#1A2A3A]">
                                <button className="w-full py-3 bg-[#0D1928] border border-indigo-500/30 rounded-xl text-indigo-400 font-black text-xs uppercase tracking-widest hover:bg-indigo-500/10 transition-all flex items-center justify-center gap-2">
                                    <ArrowRight size={16} /> Generate Bulk TXT for Verified
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Guidelines & Recent Runs */}
                    <div className="space-y-6">

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">EPFO Prerequisites</h3>
                            <ul className="space-y-3 text-[10px] text-slate-300 font-medium leading-relaxed italic">
                                <li className="flex gap-2 items-start">
                                    <BadgeAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                    Aadhar Verification is structurally mandatory for new UAN generation via portal.
                                </li>
                                <li className="flex gap-2 items-start">
                                    <BadgeAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                    Name must exactly match the Aadhar database to avoid rejection.
                                </li>
                                <li className="flex gap-2 items-start">
                                    <AlertOctagon size={14} className="text-rose-500 shrink-0 mt-0.5" />
                                    For re-hires/transfers, do NOT generate a new UAN. Use the Form-13 (Transfer) process.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl h-[280px] flex flex-col">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-4 border-b border-[#1A2A3A] pb-4">Recent Generations</h3>

                            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                                {[
                                    { date: '10 Mar 24', count: 12, status: 'Completed' },
                                    { date: '15 Feb 24', count: 5, status: 'Completed' },
                                    { date: '12 Jan 24', count: 28, status: 'Completed' },
                                ].map((run, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl">
                                        <div>
                                            <div className="text-xs font-black text-slate-300 uppercase tracking-widest">{run.date}</div>
                                            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{run.count} UANs Issued</div>
                                        </div>
                                        <CheckCircle size={16} className="text-emerald-500" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
