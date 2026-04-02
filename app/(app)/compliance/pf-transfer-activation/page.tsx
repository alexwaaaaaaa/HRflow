"use client";

import React, { useState } from 'react';
import {
    RefreshCcw, MoveRight, ArrowRight, ShieldCheck, Clock,
    FileText, UserPlus, CheckCircle, Search, UploadCloud
} from 'lucide-react';

export default function PFTransferAndActivation() {
    const [activeTab, setActiveTab] = useState('transfer');

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header with Tabs */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            {activeTab === 'transfer' ? (
                                <><RefreshCcw size={28} className="text-blue-500" /> Form 13 Transfer Approval</>
                            ) : (
                                <><UserPlus size={28} className="text-emerald-500" /> UAN Activation Tracker</>
                            )}
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            {activeTab === 'transfer' ? 'Attest transfer requests coming from previous employer or joining new employer.' : 'Monitor Aadhar OTP based UAN activation for new joiners.'}
                        </p>
                    </div>

                    <div className="flex bg-[#0D1928] border border-[#1A2A3A] p-1 rounded-xl w-max">
                        <button
                            onClick={() => setActiveTab('transfer')}
                            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'transfer' ? 'bg-[#1A2A3A] text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            PF Transfer (Form 13)
                        </button>
                        <button
                            onClick={() => setActiveTab('activation')}
                            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'activation' ? 'bg-[#1A2A3A] text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            UAN Activation
                        </button>
                    </div>
                </div>

                {activeTab === 'transfer' ? (
                    /* Transfer View */
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in slide-in-from-right-8 duration-500">
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                                <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                        Pending Transfer Requests (Online)
                                    </h2>
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input type="text" placeholder="Search Request..." className="bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-blue-500" />
                                    </div>
                                </div>

                                <table className="w-full text-left">
                                    <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                        <tr>
                                            <th className="px-6 py-4">Employee Details</th>
                                            <th className="px-6 py-4">Transfer From (Old Est.)</th>
                                            <th className="px-6 py-4">Transfer To (New Est.)</th>
                                            <th className="px-6 py-4 text-center">Attest</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A]">
                                        {[
                                            { name: 'Sameer Khan', uan: '100456789030', old: 'M/S Tech Mahindra (PUNE)', new: 'Kaarya Tech (MUMBAI)', pendingAt: 'Current' },
                                            { name: 'Aditi Rao', uan: '100456789031', old: 'Wipro Ltd (BLR)', new: 'Kaarya Tech (MUMBAI)', pendingAt: 'Current' },
                                        ].map((row, i) => (
                                            <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all">
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-black text-white">{row.name}</div>
                                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">UAN: {row.uan}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-[10px] font-bold text-slate-400 leading-tight">{row.old}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-[10px] font-bold text-blue-400 leading-tight">{row.new}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button className="px-4 py-1.5 bg-blue-600 rounded-lg text-[9px] font-black text-white uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg">
                                                        DSC Sign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Guidelines Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl space-y-4 text-sm text-slate-300">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#1A2A3A] pb-4">Transfer Rules</h3>
                                <p className="italic text-slate-400 leading-relaxed text-[11px]">Online PF transfers can be attested by either the present employer OR the previous employer depending on how the employee routed the request.</p>
                                <div className="p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex gap-3 text-[10px] font-medium items-center">
                                    <MoveRight size={14} className="text-blue-500 shrink-0" />
                                    <span>Always advise new joiners to route requests to PRESENT employer for faster processing.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* UAN Activation Tracker View */
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in slide-in-from-left-8 duration-500">
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                                <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                        Activation Status (Recent Joiners)
                                    </h2>
                                    <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:border-emerald-500/30 transition-colors flex items-center gap-2">
                                        <Clock size={14} /> Send Reminders
                                    </button>
                                </div>
                                <table className="w-full text-left">
                                    <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                        <tr>
                                            <th className="px-6 py-4">Employee</th>
                                            <th className="px-6 py-4">UAN Status</th>
                                            <th className="px-6 py-4">Activation Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A]">
                                        {[
                                            { name: 'Mohit Sharma', doj: '15 Apr 2024', status: 'Generated', uan: '100456789040', act: 'Pending by Emp', actColor: 'amber' },
                                            { name: 'Anjali Verma', doj: '15 Apr 2024', status: 'Generated', uan: '100456789041', act: 'Activated', actColor: 'emerald' },
                                            { name: 'Rohan Gupta', doj: '15 Apr 2024', status: 'Pre-existing', uan: '100456789042', act: 'Activated', actColor: 'emerald' },
                                        ].map((row, i) => (
                                            <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all">
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-black text-white">{row.name}</div>
                                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">DOJ: {row.doj}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{row.status}</div>
                                                    <div className="text-[10px] font-mono text-slate-500">{row.uan}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 w-max px-2 py-0.5 rounded text-${row.actColor}-500 bg-${row.actColor}-500/10 border border-${row.actColor}-500/20`}>
                                                        {row.act === 'Activated' ? <CheckCircle size={10} /> : <Clock size={10} />} {row.act}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Guidelines Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl space-y-4">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#1A2A3A] pb-4">Why Activate?</h3>
                                <p className="italic text-slate-400 leading-relaxed text-[11px]">Employees must activate their UAN using Aadhar-linked mobile number to access passbook, file e-nomination, or submit withdrawal/advance claims.</p>
                                <button className="w-full py-2 bg-emerald-600 rounded-xl text-[10px] font-black uppercase text-white hover:bg-emerald-700 transition-all">
                                    Copy Activation Link
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
