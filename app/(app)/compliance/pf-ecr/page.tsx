"use client";

import React, { useState } from 'react';
import {
    FileSpreadsheet, Upload, Download, CheckCircle,
    AlertCircle, Activity, ArrowRight, Save, Trash2, ShieldAlert
} from 'lucide-react';

export default function PFECRFile() {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            ECR Statement Generation <FileSpreadsheet size={28} className="text-emerald-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Electronic Challan cum Return (ECR) text file compilation.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all shadow-lg italic">
                            Format Specs
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* File Generation / Upload Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden group">

                            <h2 className="text-xs font-black text-white uppercase tracking-widest border-b border-[#1A2A3A] pb-4 flex justify-between items-center">
                                Step 1: Generate TXT File
                                <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-[9px] border border-emerald-500/20">System Auto-Gen Ready</span>
                            </h2>

                            <div
                                className={`w-full p-12 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center transition-all duration-300 ${dragActive ? 'border-emerald-500 bg-emerald-500/5' : 'border-[#1A2A3A] bg-[#060B14]'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
                            >
                                <div className="w-20 h-20 bg-[#0D1928] rounded-full flex items-center justify-center mb-6 shadow-xl border border-[#1A2A3A] group-hover:scale-110 transition-transform">
                                    <FileSpreadsheet size={32} className="text-emerald-500" />
                                </div>
                                <h3 className="text-lg font-black text-white mb-2">ECR Data Ready for March 2024</h3>
                                <p className="text-xs text-slate-500 font-medium max-w-sm mb-8 leading-relaxed italic">
                                    The system has compiled the UAN, wages, and contribution data for 245 active employees based on finalized payroll.
                                </p>
                                <button className="px-8 py-4 bg-emerald-600 rounded-2xl text-white font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3">
                                    <Download size={18} /> Download ECR Text File
                                </button>
                                <div className="mt-8 pt-6 border-t border-[#1A2A3A] w-full max-w-sm flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <span>Or upload modified TXT</span>
                                    <button className="px-4 py-2 bg-[#0D1928] rounded-lg border border-[#1A2A3A] hover:text-white transition-colors">Browse</button>
                                </div>
                            </div>
                        </div>

                        {/* Error Analytics */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Pre-Validation Report</h3>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-[#060B14] border border-[#1A2A3A] p-4 rounded-xl text-center">
                                    <div className="text-2xl font-black text-emerald-500 tabular-nums">245</div>
                                    <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Valid Entries</div>
                                </div>
                                <div className="bg-[#060B14] border border-rose-500/20 p-4 rounded-xl text-center group-hover:border-rose-500/50 transition-colors">
                                    <div className="text-2xl font-black text-rose-500 tabular-nums">02</div>
                                    <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">UAN Mismatch</div>
                                </div>
                                <div className="bg-[#060B14] border border-amber-500/20 p-4 rounded-xl text-center group-hover:border-amber-500/50 transition-colors">
                                    <div className="text-2xl font-black text-amber-500 tabular-nums">01</div>
                                    <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Wage Limit Flag</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step-by-Step Guide & Fixes */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-rose-500/30 rounded-3xl p-6 shadow-xl border-t-4 border-t-rose-500 h-[400px] flex flex-col">
                            <h3 className="text-xs font-black text-rose-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <ShieldAlert size={14} /> Critical Fixes Required
                            </h3>

                            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                                {[
                                    { emp: 'EMP-210 (Karan)', type: 'UAN Validation Failed', msg: 'Name mismatch in Aadhar/UAN.' },
                                    { emp: 'EMP-304 (Pooja)', type: 'Inactive UAN', msg: 'UAN not linked to current establishment.' },
                                    { emp: 'EMP-112 (Rahul)', type: 'High Contribution Warning', msg: 'VPF contribution > Gross Wages.' },
                                ].map((alert, i) => (
                                    <div key={i} className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-slate-700 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{alert.emp}</span>
                                        </div>
                                        <div className="text-xs font-bold text-rose-400 mb-1">{alert.type}</div>
                                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">{alert.msg}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">EPFO Portal Flow</h3>
                            <ul className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#1A2A3A] before:to-transparent">
                                {[
                                    { step: '1', text: 'Login to unifiedportal-emp.epfindia.gov.in' },
                                    { step: '2', text: 'Payments > ECR/Return Filing' },
                                    { step: '3', text: 'Upload the downloaded TXT file' },
                                    { step: '4', text: 'Verify Output & Generate Challan' }
                                ].map((s, i) => (
                                    <li key={i} className="flex gap-4 items-center relative z-10">
                                        <div className="w-5 h-5 rounded-full bg-[#060B14] border border-[#1A2A3A] text-[9px] font-black text-slate-400 flex items-center justify-center shrink-0">
                                            {s.step}
                                        </div>
                                        <span className="text-[10px] text-slate-300 font-medium leading-relaxed">{s.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
