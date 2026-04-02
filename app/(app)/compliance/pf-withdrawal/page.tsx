"use client";

import React from 'react';
import {
    Activity, Clock, UploadCloud, FileCheck,
    ArrowRight, UserCheck, AlertCircle, FileText
} from 'lucide-react';

export default function PFWithdrawal() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            Form 19 & 10C Withdrawals <FileCheck size={24} className="text-amber-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Approve and track final settlement claims of exited employees.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Claims Radar */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <h2 className="text-sm font-black text-white uppercase tracking-widest">Active Claims Radar</h2>
                                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-[#1A2A3A] px-3 py-1 rounded-lg">Last 60 Days</div>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/80 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Ex-Employee</th>
                                        <th className="px-6 py-4">Claim Form</th>
                                        <th className="px-6 py-4">Date of Exit</th>
                                        <th className="px-6 py-4">Current Status</th>
                                        <th className="px-6 py-4 text-center">Employer Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { name: 'Ritesh Kumar', uan: '100456789012', form: 'Form 19 (PF Settlement)', doe: '31 Jan 2024', status: 'Pending Employer Approval', color: 'amber' },
                                        { name: 'Simran Singh', uan: '100456789013', form: 'Form 10C (EPS Withdrawal)', doe: '31 Jan 2024', status: 'Pending Employer Approval', color: 'amber' },
                                        { name: 'David Raj', uan: '100456789014', form: 'Form 31 (Advance)', doe: 'Active', status: 'Approved & Settled', color: 'emerald' },
                                        { name: 'Kavita Iyer', uan: '100456789015', form: 'Form 19 (PF Settlement)', doe: '15 Dec 2023', status: 'Rejected by Field Office', color: 'rose' },
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all">
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-black text-white">{row.name}</div>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">UAN: {row.uan}</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-300">{row.form}</td>
                                            <td className={`px-6 py-4 text-xs font-bold ${row.doe === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`}>{row.doe}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 w-max px-2 py-0.5 rounded text-${row.color}-500 bg-${row.color}-500/10 border border-${row.color}-500/20`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {row.status.includes('Pending') ? (
                                                    <button className="px-4 py-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-[9px] font-black text-amber-500 uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-colors">
                                                        Attest Request
                                                    </button>
                                                ) : (
                                                    <span className="text-slate-600">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-[#060B14]/50 border-t border-[#1A2A3A] text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest italic flex items-center justify-center gap-2">
                                <AlertCircle size={14} className="text-amber-500" /> Attestation must be completed within 15 days of online claim.
                            </div>
                        </div>
                    </div>

                    {/* Pre-requisites & Rules */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#1A2A3A] pb-4">Claim Prerequisites</h3>
                            <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex items-start gap-3">
                                <Clock size={16} className="text-amber-500 shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-xs font-black text-white">60-Day Waiting Period</div>
                                    <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed italic">
                                        Form 19/10C can only be filed online if 2 months have passed since Date of Exit (Non-employment).
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex items-start gap-3">
                                <UserCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-xs font-black text-white">Date of Exit Must be Updated</div>
                                    <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed italic">
                                        Employer must update DOE and Reason of Exit in Unified Portal first.
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex items-start gap-3 opacity-70">
                                <FileText size={16} className="text-slate-400 shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-xs font-black text-slate-300">Basic KYC verified via Aadhar</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
