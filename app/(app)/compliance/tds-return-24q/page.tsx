"use client";

import React, { useState } from 'react';
import {
    FileSpreadsheet, Download, CheckCircle, AlertTriangle, Info,
    ArrowRight, RefreshCw, Upload, Eye, Shield
} from 'lucide-react';

const deductees = [
    { name: 'Rahul Kumar Sharma', pan: 'AAXPS1234C', section: '192', taxDeducted: '1,08,000', taxPaid: '1,08,000', status: 'OK' },
    { name: 'Priya Mehta', pan: 'BXZPM5678F', section: '192', taxDeducted: '78,000', taxPaid: '78,000', status: 'OK' },
    { name: 'Arjun Nair', pan: 'CPMNA9012G', section: '192', taxDeducted: '1,44,000', taxPaid: '1,44,000', status: 'OK' },
    { name: 'Sunita Patel', pan: 'INVALID', section: '192', taxDeducted: '36,000', taxPaid: '36,000', status: 'PAN Error' },
    { name: 'Vijay Reddy', pan: 'EPXVR3456H', section: '192A', taxDeducted: '12,500', taxPaid: '12,500', status: 'OK' },
];

const quarters = ['Q1 (Apr–Jun 23)', 'Q2 (Jul–Sep 23)', 'Q3 (Oct–Dec 23)', 'Q4 (Jan–Mar 24)'];

export default function TDSReturn24Q() {
    const [quarter, setQuarter] = useState(3);
    const [step, setStep] = useState<'review' | 'validate' | 'generate'>('review');

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Compliance <ArrowRight size={10} /> Income Tax <ArrowRight size={10} /> TDS Return 24Q
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <FileSpreadsheet size={28} className="text-indigo-500" /> Form 24Q — Salary TDS Return
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            Quarterly e-TDS statement for salary deductions. Generates NSDL FVU-compatible file.
                        </p>
                    </div>
                    <button className="px-6 py-2.5 bg-indigo-600 rounded-xl text-sm font-black text-white hover:bg-indigo-700 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center gap-2">
                        <Download size={16} /> Download FVU File
                    </button>
                </div>

                {/* Quarter Selector */}
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {quarters.map((q, i) => (
                        <button key={i} onClick={() => setQuarter(i)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all
                                ${quarter === i ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-[#0D1928] border border-[#1A2A3A] text-slate-400 hover:text-white'}`}>
                            {q}
                        </button>
                    ))}
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-4">
                    {[
                        { id: 'review', label: '1. Review Deductees', icon: Eye },
                        { id: 'validate', label: '2. CSI Validation', icon: Shield },
                        { id: 'generate', label: '3. Generate FVU', icon: FileSpreadsheet },
                    ].map((s, i) => (
                        <React.Fragment key={s.id}>
                            <button onClick={() => setStep(s.id as typeof step)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                                    ${step === s.id ? 'bg-indigo-600 text-white' : 'bg-[#0D1928] border border-[#1A2A3A] text-slate-500 hover:text-white'}`}>
                                <s.icon size={14} /> {s.label}
                            </button>
                            {i < 2 && <ArrowRight size={14} className="text-slate-600 shrink-0" />}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* KPI Row */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'Total Employees', val: '42', color: 'indigo' },
                                { label: 'Total Tax Deducted', val: '₹43.5L', color: 'emerald' },
                                { label: 'PAN Errors', val: '1', color: 'rose' },
                            ].map((k, i) => (
                                <div key={i} className={`bg-[#0D1928] border border-${k.color}-500/20 p-4 rounded-2xl text-center`}>
                                    <div className={`text-2xl font-black text-${k.color}-400 tabular-nums`}>{k.val}</div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{k.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Deductee Table */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-4 bg-[#060B14]/60 border-b border-[#1A2A3A] flex justify-between items-center">
                                <h2 className="text-xs font-black text-white uppercase tracking-widest">Deductee List — {quarters[quarter]}</h2>
                                <span className="text-[10px] text-slate-500 font-bold">Showing 1–5 of 42</span>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-4 py-3">Employee / PAN</th>
                                        <th className="px-4 py-3">Section</th>
                                        <th className="px-4 py-3 text-right">Tax Deducted (₹)</th>
                                        <th className="px-4 py-3 text-right">Tax Paid (₹)</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {deductees.map((d, i) => (
                                        <tr key={i} className={`transition-all ${d.status !== 'OK' ? 'bg-rose-500/5' : 'hover:bg-[#1A2A3A]/30'}`}>
                                            <td className="px-4 py-3">
                                                <div className="text-xs font-bold text-white">{d.name}</div>
                                                <div className={`text-[10px] font-mono ${d.status !== 'OK' ? 'text-rose-400' : 'text-slate-500'}`}>{d.pan}</div>
                                            </td>
                                            <td className="px-4 py-3 text-xs font-bold text-slate-400">{d.section}</td>
                                            <td className="px-4 py-3 text-xs font-bold text-slate-300 text-right tabular-nums">{d.taxDeducted}</td>
                                            <td className="px-4 py-3 text-xs font-bold text-slate-300 text-right tabular-nums">{d.taxPaid}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border
                                                    ${d.status === 'OK' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                                                    {d.status === 'OK' ? <CheckCircle size={8} className="inline mr-1" /> : <AlertTriangle size={8} className="inline mr-1" />}
                                                    {d.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-6">
                        {/* Filing Status */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4 border-b border-[#1A2A3A] pb-3">Filing Status by Quarter</h3>
                            <div className="space-y-3">
                                {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400">{q} FY 2023-24</span>
                                        <span className={`text-[9px] font-black px-2 py-1 rounded-full border
                                            ${i < 3 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                            {i < 3 ? 'Filed' : 'Due: 31 May'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CSI Validation Box */}
                        <div className="bg-[#0D1928] border border-indigo-500/20 rounded-2xl p-5 shadow-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">CSI Validation</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Challan Matched</span>
                                    <span className="font-black text-emerald-500">✓ 3/3</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">BSR Codes</span>
                                    <span className="font-black text-emerald-500">✓ Valid</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">PAN Validation</span>
                                    <span className="font-black text-rose-500">✗ 1 Error</span>
                                </div>
                            </div>
                            <button className="mt-4 w-full py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:bg-indigo-600/30 transition-colors flex items-center justify-center gap-2">
                                <RefreshCw size={12} /> Re-run Validation
                            </button>
                        </div>

                        {/* Upload Consolidated */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-3">Upload to TRACES</h3>
                            <p className="text-[10px] text-slate-500 mb-4 leading-relaxed">Submit FVU file on TDS-CPC portal after generation.</p>
                            <button className="w-full py-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2">
                                <Upload size={13} /> Go to TDS-CPC Portal
                            </button>
                        </div>

                        {/* Tip */}
                        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl flex gap-3">
                            <Info size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                Form 24Q Q4 includes Annexure II (salary details for Form 16 issuance). Due: 31st May after FY end.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
