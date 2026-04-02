"use client";

import React from 'react';
import {
    CheckCircle, Clock, ShieldCheck, ShieldAlert,
    ArrowRight, Fingerprint, CreditCard, Users, Search, Banknote
} from 'lucide-react';

export default function EPFOKYCVerification() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            Member KYC Verification <ShieldCheck size={24} className="text-emerald-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Approve and digitally sign employee KYC updates (Aadhar, PAN, Bank).</p>
                    </div>
                </div>

                {/* KPI Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-colors">
                        <div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Members</div>
                            <div className="text-2xl font-black text-white">312</div>
                        </div>
                        <Users size={24} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex items-center justify-between group hover:border-emerald-500/30 transition-colors">
                        <div>
                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">100% Verified</div>
                            <div className="text-2xl font-black text-white">285</div>
                        </div>
                        <ShieldCheck size={24} className="text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <div className="bg-[#0D1928] border border-amber-500/20 p-5 rounded-2xl flex items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.05)] group">
                        <div>
                            <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Pending Approval</div>
                            <div className="text-2xl font-black text-amber-500">22</div>
                        </div>
                        <Clock size={24} className="text-amber-500/50 group-hover:text-amber-500 transition-colors animate-pulse" />
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex items-center justify-between group hover:border-rose-500/30 transition-colors">
                        <div>
                            <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Missing / Rejected</div>
                            <div className="text-2xl font-black text-white">05</div>
                        </div>
                        <ShieldAlert size={24} className="text-rose-500/50 group-hover:text-rose-500 transition-colors" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Pending Approvals Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <h2 className="text-sm font-black text-white uppercase tracking-widest">Pending Employer Approval</h2>
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="text" placeholder="Search UAN/Name..." className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-blue-500/50" />
                                </div>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Employee</th>
                                        <th className="px-6 py-4">Document Type</th>
                                        <th className="px-6 py-4">Uploaded On</th>
                                        <th className="px-6 py-4 text-center">Approve</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { name: 'Sanjay Dutt', uan: '100456789020', doc: 'Aadhar', icon: Fingerprint, date: 'Today, 10:42 AM', color: 'text-violet-500' },
                                        { name: 'Karan Singh', uan: '100456789021', doc: 'Bank A/C', icon: Banknote, date: 'Yesterday', color: 'text-emerald-500' },
                                        { name: 'Sneha Patil', uan: '100456789022', doc: 'PAN Card', icon: CreditCard, date: '14 Apr 24', color: 'text-blue-500' },
                                        { name: 'Vikram Das', uan: '100456789023', doc: 'Bank A/C', icon: Banknote, date: '12 Apr 24', color: 'text-emerald-500' },
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all">
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-black text-white">{row.name}</div>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">UAN: {row.uan}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-1.5 rounded-lg bg-[#060B14] border border-[#1A2A3A] ${row.color}`}>
                                                        <row.icon size={12} />
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-300">{row.doc}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-400">{row.date}</td>
                                            <td className="px-6 py-4 text-center">
                                                <input type="checkbox" className="w-4 h-4 rounded border-[#1A2A3A] bg-[#060B14] text-emerald-500 focus:ring-emerald-500/50 cursor-pointer" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-[#060B14] border-t border-[#1A2A3A] flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Selected: 0</span>
                                <button className="px-6 py-2.5 bg-emerald-600 rounded-xl text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all opacity-50 cursor-not-allowed">
                                    Sign with DSC & Approve
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* DSC & Guidelines */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-[#0D1928] to-[#1A2A3A] border border-blue-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                            <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-4">Digital Signature (DSC)</h3>

                            <div className="space-y-4 relative z-10">
                                <div className="p-4 bg-[#060B14]/80 border border-[#1A2A3A] rounded-xl text-center">
                                    <div className="text-sm font-black text-white uppercase tracking-tight">Active Token Detected</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">HR Director (Valid till 2025)</div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic text-center">
                                    Approving KYC requires the physical DSC token to be plugged in and the e-Signer utility running on this machine.
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000 pointer-events-none" />
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Urgent Actions Required</h3>
                            <div className="space-y-3">
                                <div className="p-3 border border-rose-500/20 bg-rose-500/5 rounded-xl border-l-2 border-l-rose-500">
                                    <h4 className="text-xs font-bold text-slate-200">Invalid Bank Details / IFSC (03)</h4>
                                    <p className="text-[10px] text-slate-500 mt-1 italic">Employees need to re-submit latest cheque copy.</p>
                                </div>
                                <div className="p-3 border border-amber-500/20 bg-amber-500/5 rounded-xl border-l-2 border-l-amber-500">
                                    <h4 className="text-xs font-bold text-slate-200">Aadhar Name Mismatch (02)</h4>
                                    <p className="text-[10px] text-slate-500 mt-1 italic">Joint Declaration form submission pending.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
