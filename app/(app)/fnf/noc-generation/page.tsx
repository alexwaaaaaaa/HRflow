"use client";

import React from 'react';
import {
    ShieldAlert, CheckCircle, Clock, ArrowLeft,
    FileCheck, Download, Printer, Save, Info, HardDrive, Cpu, Laptop
} from 'lucide-react';

export default function NOCGeneration() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">No Objection Certificate (NOC)</h1>
                            <p className="text-slate-400 text-sm font-medium">Clearance verification from all departments before final release.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2.5 bg-[#0066FF] rounded-xl text-sm font-black text-white hover:bg-[#0052cc] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                            Generate Unified NOC
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Clearance Matrix */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl relative">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#0D1928]/50 flex justify-between items-center">
                                <h2 className="text-lg font-black text-white flex items-center">
                                    <ShieldAlert size={20} className="mr-3 text-amber-500" /> Clearance Status Matrix
                                </h2>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Employee: Arnab Das</span>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Department</th>
                                        <th className="px-6 py-4">Verification Check</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Approver</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { dept: 'IT & Infrastructure', check: 'Hardware & Asset Return', status: 'Cleared', approver: 'Rahul Sharma', color: 'text-emerald-500', icon: Laptop },
                                        { dept: 'Finance & Accounts', check: 'Pending Loans & Advances', status: 'Cleared', approver: 'Sonia Verma', color: 'text-emerald-500', icon: FileCheck },
                                        { dept: 'Library / Knowledge', check: 'E-Books & Access Revoked', status: 'Pending', approver: 'Anil Gupta', color: 'text-amber-500', icon: HardDrive },
                                        { dept: 'Administration', check: 'ID Cards & Keys Submitted', status: 'Cleared', approver: 'Priya Raj', color: 'text-emerald-500', icon: Cpu },
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all cursor-pointer">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-[#060B14] rounded-lg text-slate-500 group-hover:text-blue-500 transition-colors">
                                                        <row.icon size={16} />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-200">{row.dept}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500 italic tracking-tighter">{row.check}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Cleared' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${row.color}`}>{row.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors uppercase italic">{row.approver}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-4">
                            <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                            <div className="text-xs text-slate-500 font-medium leading-relaxed italic tracking-tight">
                                Unified NOC can only be generated once "Library / Knowledge" clearance is completed. Manual override is restricted to Senior HR Managers.
                            </div>
                        </div>
                    </div>

                    {/* NOC Preview Snippet */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-8 shadow-2xl relative overflow-hidden group">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center border-b border-[#1A2A3A] pb-4 italic">Document Snippet</h3>

                            <div className="bg-white rounded-xl p-8 text-[#1e293b] font-serif shadow-inner relative overflow-hidden">
                                <div className="text-center space-y-1 mb-8">
                                    <div className="font-sans font-black text-xs uppercase text-[#64748b]">NOC Certificate</div>
                                    <div className="w-12 h-px bg-[#1e293b]/10 mx-auto" />
                                </div>
                                <div className="text-[11px] leading-relaxed space-y-4">
                                    <p>This is to certify that <b>Arnab Das (EMP-771)</b> has been granted clearance from all operational departments of <b>HRFlow Solutions</b>.</p>
                                    <p>There are no outstanding dues, assets, or liabilities pending against the mentioned employee as of <b>April 24, 2024</b>.</p>
                                    <div className="pt-8 text-right opacity-30 select-none grayscale">
                                        <div className="w-24 h-px bg-[#1e293b] ml-auto mb-1" />
                                        <div className="text-[8px] font-sans font-black italic">Digital Signature Verified</div>
                                    </div>
                                </div>
                                {/* Watermark */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-[-25deg] pointer-events-none">
                                    <FileCheck size={120} />
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <button className="w-full py-4 bg-[#0D1928] border border-blue-500/20 rounded-xl text-blue-500 font-black text-[10px] uppercase tracking-widest hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2">
                                    <Printer size={16} /> Batch Print NOCs
                                </button>
                                <p className="text-[9px] text-slate-600 font-bold text-center uppercase tracking-tighter italic">NOC is mandatory for Experience Letter release.</p>
                            </div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
