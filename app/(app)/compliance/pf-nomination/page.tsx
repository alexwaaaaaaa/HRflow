"use client";

import React from 'react';
import {
    Users, Plus, CheckCircle, Clock, Search,
    FileSignature, ShieldAlert, ArrowRight, XCircle
} from 'lucide-react';

export default function PFNomination() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            PF e-Nomination Tracker <FileSignature size={24} className="text-rose-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Track Aadhar-based e-Nomination status across all active UANs.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl flex items-center justify-between group">
                        <div>
                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">e-Nomination Complete</div>
                            <div className="text-3xl font-black text-white">218</div>
                        </div>
                        <CheckCircle size={32} className="text-emerald-500/50 group-hover:text-emerald-500 transition-colors shadow-lg" />
                    </div>
                    <div className="bg-[#0D1928] border border-amber-500/30 p-6 rounded-2xl flex items-center justify-between group shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                        <div>
                            <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Pending Submission</div>
                            <div className="text-3xl font-black text-amber-500 tabular-nums">84</div>
                        </div>
                        <Clock size={32} className="text-amber-500/50 group-hover:text-amber-500 transition-colors animate-pulse" />
                    </div>
                    <div className="bg-[#0D1928] border border-rose-500/30 p-6 rounded-2xl flex items-center justify-between group">
                        <div>
                            <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Aadhar Profile Mismatch</div>
                            <div className="text-3xl font-black text-rose-500 tabular-nums">10</div>
                        </div>
                        <XCircle size={32} className="text-rose-500/50 group-hover:text-rose-500 transition-colors" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Defaulters List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                    <ShieldAlert size={16} className="text-amber-500" /> Pending Action List
                                </h2>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input type="text" placeholder="Search Details..." className="bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-rose-500" />
                                    </div>
                                    <button className="px-4 py-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:border-slate-700 transition-colors">
                                        Send Reminder
                                    </button>
                                </div>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Employee</th>
                                        <th className="px-6 py-4">Blocker/Status</th>
                                        <th className="px-6 py-4">Days Overdue</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { name: 'Sanjay Dutt', uan: '100456789020', status: 'Aadhar DB Not Seeded', days: 45, type: 'critical' },
                                        { name: 'Karan Singh', uan: '100456789021', status: 'Pending e-Sign by Emp', days: 12, type: 'warning' },
                                        { name: 'Sneha Patil', uan: '100456789022', status: 'Profile Photo Missing', days: 5, type: 'warning' },
                                        { name: 'Vikram Das', uan: '100456789023', status: 'Aadhar Name Mismatch', days: 60, type: 'critical' },
                                    ].map((row, i) => (
                                        <tr key={i} className={`group hover:bg-[#1A2A3A]/30 transition-all ${row.type === 'critical' ? 'bg-rose-500/5' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-black text-white">{row.name}</div>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">UAN: {row.uan}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${row.type === 'critical' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                                    }`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 text-xs font-black tabular-nums ${row.days > 30 ? 'text-rose-500' : 'text-slate-400'}`}>
                                                {row.days} Days
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-white border border-[#1A2A3A] px-3 py-1 rounded bg-[#060B14] transition-colors">Notify</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-[#060B14]/50 border-t border-[#1A2A3A] text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">
                                Note: Employers cannot file e-nomination. It must be initiated via Member Portal.
                            </div>
                        </div>
                    </div>

                    {/* How-To Guide for employees */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl relative overflow-hidden h-full flex flex-col">
                            <h3 className="text-xs font-black text-rose-500 uppercase tracking-[0.2em] mb-4">Nomination Flow (For Emp)</h3>

                            <div className="flex-1 space-y-4 relative z-10 p-4 border border-[#1A2A3A] bg-[#060B14]/50 rounded-2xl">
                                <ul className="space-y-4 text-[10px] text-slate-300 font-medium leading-relaxed">
                                    <li className="flex gap-3">
                                        <span className="font-black text-rose-500">1.</span> Login to UAN Member Portal.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-black text-rose-500">2.</span> Update Profile Photo & Address in View Profile.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-black text-rose-500">3.</span> Go to Manage &gt; e-Nomination.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-black text-rose-500">4.</span> Add Family Details (Aadhar, Photo mandatory for nominees).
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-black text-rose-500">5.</span> Allocate PF/EPS share %.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-black text-rose-500">6.</span> Authenticate via Aadhar Virtual ID OTP (e-Sign).
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-6">
                                <button className="w-full py-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-slate-300 font-black text-xs uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2">
                                    Share Guide via Email
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
