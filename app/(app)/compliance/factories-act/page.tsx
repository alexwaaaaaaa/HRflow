"use client";

import React from 'react';
import {
    Factory, ClipboardCheck, AlertTriangle, FileText,
    Calendar, Building, FileSignature, CheckCircle
} from 'lucide-react';

export default function FactoriesAct() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Factories Act (1948) <Factory size={28} className="text-orange-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Manage factory licenses, safety audits, and statutory registers for manufacturing units.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Main Monitoring Area */}
                    <div className="lg:col-span-3 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* License Renewal */}
                            <div className="bg-[#0D1928] border border-orange-500/30 p-6 rounded-3xl relative overflow-hidden group shadow-lg shadow-orange-500/5">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <Building size={18} className="text-orange-500" />
                                        <h2 className="text-sm font-black text-white uppercase tracking-widest">Pune Plant - MIDC</h2>
                                    </div>
                                    <div className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest animate-pulse">
                                        Renewal Due
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs p-3 bg-[#060B14] rounded-xl border border-[#1A2A3A]">
                                        <span className="font-bold text-slate-500">License No.</span>
                                        <span className="font-mono text-white">FAC/MH/PN/88212</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs p-3 bg-rose-500/5 rounded-xl border border-rose-500/20">
                                        <span className="font-bold text-rose-500">Validity Expires</span>
                                        <span className="font-black text-rose-500">31-Dec-2024</span>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-3 bg-orange-600 rounded-xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
                                    <FileSignature size={14} /> Initiate Renewal Form 2
                                </button>
                            </div>

                            {/* Safety & Health Audit */}
                            <div className="bg-[#0D1928] border border-emerald-500/20 p-6 rounded-3xl relative overflow-hidden group shadow-lg">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <ClipboardCheck size={18} className="text-emerald-500" />
                                        <h2 className="text-sm font-black text-white uppercase tracking-widest">Safety Audit (HSE)</h2>
                                    </div>
                                    <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">
                                        Compliant
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs p-3 bg-[#060B14] rounded-xl border border-[#1A2A3A]">
                                        <span className="font-bold text-slate-500">Last Audit Date</span>
                                        <span className="font-bold text-white">15-Feb-2024</span>
                                    </div>
                                    <div className="flex justify-between text-xs p-3 bg-[#060B14] rounded-xl border border-[#1A2A3A]">
                                        <span className="font-bold text-slate-500">Next Scheduled</span>
                                        <span className="font-bold text-emerald-400">15-Feb-2025</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-2">
                                    <button className="flex-1 py-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">
                                        View Report
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Statutory Registers */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <h2 className="text-sm font-black text-white uppercase tracking-widest">Mandatory Registers (Form 11-29)</h2>
                                <button className="px-4 py-2 border border-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors">
                                    Export All PDF
                                </button>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Register Name</th>
                                        <th className="px-6 py-4">Frequency</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A] text-xs font-bold text-slate-300">
                                    <tr className="hover:bg-[#1A2A3A]/30 transition-all">
                                        <td className="px-6 py-4 font-black">Register of Adult Workers (Form 12)</td>
                                        <td className="px-6 py-4 text-slate-400">Daily / Live</td>
                                        <td className="px-6 py-4"><span className="text-emerald-500 flex items-center gap-1"><CheckCircle size={12} /> Updated</span></td>
                                        <td className="px-6 py-4 text-center"><button className="text-orange-500 hover:underline">View</button></td>
                                    </tr>
                                    <tr className="hover:bg-[#1A2A3A]/30 transition-all">
                                        <td className="px-6 py-4 font-black">Register of Leave with Wages (Form 15)</td>
                                        <td className="px-6 py-4 text-slate-400">Monthly</td>
                                        <td className="px-6 py-4"><span className="text-emerald-500 flex items-center gap-1"><CheckCircle size={12} /> Updated</span></td>
                                        <td className="px-6 py-4 text-center"><button className="text-orange-500 hover:underline">View</button></td>
                                    </tr>
                                    <tr className="hover:bg-[#1A2A3A]/30 transition-all bg-rose-500/5">
                                        <td className="px-6 py-4 font-black text-white">Register of Accidents (Form 26)</td>
                                        <td className="px-6 py-4 text-slate-400">Incident Based</td>
                                        <td className="px-6 py-4"><span className="text-rose-500 flex items-center gap-1"><AlertTriangle size={12} /> Pending Entry</span></td>
                                        <td className="px-6 py-4 text-center"><button className="px-3 py-1 bg-rose-500/20 text-rose-500 rounded border border-rose-500/30">Log</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    {/* Annual Returns & Briefing */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-orange-500/20 to-[#0D1928] border border-orange-500/30 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden">
                            <Calendar size={100} className="absolute -right-6 -bottom-6 text-orange-500 opacity-10" />
                            <div className="relative z-10">
                                <h3 className="text-xs font-black text-orange-400 uppercase tracking-[0.2em] mb-4">Annual Return</h3>
                                <div className="text-2xl font-black text-white mb-1">Form 21</div>
                                <p className="text-[10px] text-slate-300 font-medium leading-relaxed italic mb-6">Consolidated half-yearly / annual return filing to the Chief Inspector of Factories.</p>

                                <div className="p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Date</span>
                                    <span className="text-xs font-black text-white">31 Jan 2025</span>
                                </div>
                                <button className="w-full py-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-orange-500 font-black text-xs uppercase tracking-widest hover:border-orange-500/50 transition-all">
                                    Prepare Form 21
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
