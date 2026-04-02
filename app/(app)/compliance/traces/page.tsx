"use client";

import React from 'react';
import {
    Link as LinkIcon, Download, RefreshCw, AlertTriangle,
    CheckCircle, Key, FileText, Database
} from 'lucide-react';

export default function TracesIntegration() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            TRACES Integration <LinkIcon size={28} className="text-purple-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Directly sync PAN verification, Form 16s, and Justification Reports from TRACES.</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle size={10} /> API Connected
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Actions and Status */}
                    <div className="lg:col-span-3 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* PAN Verification API */}
                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-3xl relative overflow-hidden group hover:border-purple-500/50 transition-colors cursor-pointer shadow-lg">
                                <div className="absolute -right-4 -top-4 text-[#1A2A3A] opacity-30 group-hover:opacity-100 group-hover:text-purple-500/10 transition-all">
                                    <Database size={100} />
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <div className="p-3 bg-[#060B14] rounded-xl w-max">
                                        <Database size={24} className="text-purple-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1">Bulk PAN Verification</h3>
                                        <p className="text-[10px] text-slate-500 font-bold italic leading-relaxed">Validate employee PANs against TRACES DB prior to TDS filing.</p>
                                    </div>
                                    <div className="pt-2 text-[9px] font-black uppercase tracking-widest text-slate-400 flex justify-between items-center">
                                        <span>Last Sync: 12 Apr</span>
                                        <RefreshCw size={12} className="text-purple-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Form 16 Download */}
                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-3xl relative overflow-hidden group hover:border-blue-500/50 transition-colors cursor-pointer shadow-lg">
                                <div className="relative z-10 space-y-4">
                                    <div className="p-3 bg-[#060B14] rounded-xl w-max">
                                        <FileText size={24} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1">Form 16 Bulk Request</h3>
                                        <p className="text-[10px] text-slate-500 font-bold italic leading-relaxed">Initiate download request for Part A/B for all active employees.</p>
                                    </div>
                                    <div className="pt-2 text-[9px] font-black uppercase tracking-widest text-blue-500 flex justify-between items-center">
                                        <span>Ready for FY23-24</span>
                                        <Download size={12} />
                                    </div>
                                </div>
                            </div>

                            {/* CSI File Download */}
                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors cursor-pointer shadow-lg">
                                <div className="relative z-10 space-y-4">
                                    <div className="p-3 bg-[#060B14] rounded-xl w-max">
                                        <Download size={24} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1">CSI File Auto-Sync</h3>
                                        <p className="text-[10px] text-slate-500 font-bold italic leading-relaxed">Fetch Challan Status Inquiry file automatically for FVU validation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent API Logs */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-4 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <h2 className="text-sm font-black text-white uppercase tracking-widest">Recent API Transactions</h2>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Request Type</th>
                                        <th className="px-6 py-4">Timestamp</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A] text-xs font-bold text-slate-300">
                                    <tr className="hover:bg-[#1A2A3A]/30 transition-all">
                                        <td className="px-6 py-4 font-black">Verify PAN List (42)</td>
                                        <td className="px-6 py-4 text-slate-400 text-[10px]">12 Apr 2024, 10:15 AM</td>
                                        <td className="px-6 py-4"><span className="text-emerald-500">Success</span></td>
                                        <td className="px-6 py-4">42 Valid, 0 Invalid</td>
                                    </tr>
                                    <tr className="hover:bg-[#1A2A3A]/30 transition-all">
                                        <td className="px-6 py-4 font-black">Download CSI File</td>
                                        <td className="px-6 py-4 text-slate-400 text-[10px]">10 Apr 2024, 02:30 PM</td>
                                        <td className="px-6 py-4"><span className="text-emerald-500">Success</span></td>
                                        <td className="px-6 py-4">Matched 3 Challans</td>
                                    </tr>
                                    <tr className="hover:bg-[#1A2A3A]/30 transition-all bg-rose-500/5">
                                        <td className="px-6 py-4 font-black">Form 16 Request</td>
                                        <td className="px-6 py-4 text-slate-400 text-[10px]">09 Apr 2024, 11:00 AM</td>
                                        <td className="px-6 py-4"><span className="text-rose-500">Failed</span></td>
                                        <td className="px-6 py-4 text-[10px] text-rose-400 font-mono">ERR_AUTH_TOKEN_EXP</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Auth Config */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#1A2A3A] pb-4 flex items-center gap-2">
                                <Key size={14} /> Authentication
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">TAN Number</label>
                                    <input type="text" value="BLRK01982E" disabled className="w-full mt-1 bg-[#060B14] border border-[#1A2A3A] rounded-lg p-2 text-xs text-white font-mono opacity-70" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">TRACES User ID</label>
                                    <input type="text" value="hrflow_b2b_api" disabled className="w-full mt-1 bg-[#060B14] border border-[#1A2A3A] rounded-lg p-2 text-xs text-white font-mono opacity-70" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                                    <input type="password" value="********" disabled className="w-full mt-1 bg-[#060B14] border border-[#1A2A3A] rounded-lg p-2 text-xs text-white font-mono opacity-70" />
                                </div>
                                <button className="w-full mt-4 py-2 border border-purple-500/30 text-purple-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-purple-500/10 transition-colors">
                                    Update Credentials
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
