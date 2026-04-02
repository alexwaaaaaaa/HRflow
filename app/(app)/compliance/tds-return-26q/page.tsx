"use client";

import React, { useState } from 'react';
import {
    FileSpreadsheet, Download, CheckCircle, AlertTriangle, Info,
    ArrowRight, Filter, Search, Upload
} from 'lucide-react';

const vendors = [
    { name: 'ABC Tech Solutions Pvt. Ltd.', pan: 'AABCT1234H', section: '194C', nature: 'IT Services Contract', amount: '5,00,000', tds: '10,000', status: 'OK' },
    { name: 'Sharma & Associates (CA)', pan: 'BSHSA5678K', section: '194J', nature: 'Professional Fee', amount: '1,50,000', tds: '15,000', status: 'OK' },
    { name: 'Prime Facility Management', pan: 'CPFMT9012L', section: '194C', nature: 'Housekeeping Contract', amount: '80,000', tds: '1,600', status: 'BSR Missing' },
    { name: 'Cloud Infra Pvt. Ltd.', pan: 'DCILB3456M', section: '194J', nature: 'Cloud Platform Fee', amount: '2,40,000', tds: '24,000', status: 'OK' },
    { name: 'Office Supplies Depot', pan: 'INVALID_PAN', section: '194Q', nature: 'Goods Purchase (>50L)', amount: '60,000', tds: '600', status: 'PAN Invalid' },
];

export default function TDSReturn26Q() {
    const [quarter, setQuarter] = useState(3);
    const [filter, setFilter] = useState<'all' | 'errors'>('all');

    const filtered = filter === 'errors' ? vendors.filter(v => v.status !== 'OK') : vendors;

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Compliance <ArrowRight size={10} /> Income Tax <ArrowRight size={10} /> TDS Return 26Q
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <FileSpreadsheet size={28} className="text-purple-500" /> Form 26Q — Non-Salary TDS Return
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            Quarterly TDS statement for non-salary payments: contractors, professionals, rent, etc.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all">
                            Resolve Errors (2)
                        </button>
                        <button className="px-6 py-2.5 bg-purple-600 rounded-xl text-sm font-black text-white hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center gap-2">
                            <Download size={16} /> Generate FVU File
                        </button>
                    </div>
                </div>

                {/* Quarter Selector */}
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {['Q1 (Apr–Jun 23)', 'Q2 (Jul–Sep 23)', 'Q3 (Oct–Dec 23)', 'Q4 (Jan–Mar 24)'].map((q, i) => (
                        <button key={i} onClick={() => setQuarter(i)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all
                                ${quarter === i ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]' : 'bg-[#0D1928] border border-[#1A2A3A] text-slate-400 hover:text-white'}`}>
                            {q}
                        </button>
                    ))}
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Deductees', val: '15', color: 'purple' },
                        { label: 'Gross Payment', val: '₹15.3L', color: 'blue' },
                        { label: 'Total TDS', val: '₹51,200', color: 'emerald' },
                        { label: 'Errors to Fix', val: '2', color: 'rose' },
                    ].map((k, i) => (
                        <div key={i} className={`bg-[#0D1928] border border-${k.color}-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-${k.color}-500/40 transition-all`}>
                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">{k.label}</div>
                            <div className={`text-2xl font-black text-${k.color}-400 tabular-nums tracking-tight`}>{k.val}</div>
                            <div className={`absolute -bottom-4 -right-4 w-14 h-14 bg-${k.color}-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700`} />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Vendor Table */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-4 bg-[#060B14]/60 border-b border-[#1A2A3A] flex justify-between items-center gap-4">
                                <h2 className="text-xs font-black text-white uppercase tracking-widest">Vendor / Deductee List</h2>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input className="pl-7 pr-3 py-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-xs text-white outline-none focus:border-purple-500 w-36" placeholder="Search PAN..." />
                                    </div>
                                    <button onClick={() => setFilter(f => f === 'all' ? 'errors' : 'all')}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all
                                            ${filter === 'errors' ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-[#060B14] border-[#1A2A3A] text-slate-500 hover:text-white'}`}>
                                        <Filter size={11} /> {filter === 'errors' ? 'Errors Only' : 'Show All'}
                                    </button>
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-4 py-3">Vendor / PAN</th>
                                        <th className="px-4 py-3">Sec. / Nature</th>
                                        <th className="px-4 py-3 text-right">Amount (₹)</th>
                                        <th className="px-4 py-3 text-right">TDS (₹)</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {filtered.map((v, i) => (
                                        <tr key={i} className={`transition-all ${v.status !== 'OK' ? 'bg-rose-500/5' : 'hover:bg-[#1A2A3A]/30'}`}>
                                            <td className="px-4 py-3">
                                                <div className="text-xs font-bold text-white">{v.name}</div>
                                                <div className={`text-[10px] font-mono ${v.status.includes('PAN') ? 'text-rose-400' : 'text-slate-500'}`}>{v.pan}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-xs font-black text-slate-300">{v.section}</div>
                                                <div className="text-[9px] text-slate-500">{v.nature}</div>
                                            </td>
                                            <td className="px-4 py-3 text-xs font-bold text-slate-300 text-right tabular-nums">{v.amount}</td>
                                            <td className="px-4 py-3 text-xs font-black text-purple-400 text-right tabular-nums">{v.tds}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border
                                                    ${v.status === 'OK' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                                                    {v.status === 'OK' ? <CheckCircle size={8} className="inline mr-1" /> : <AlertTriangle size={8} className="inline mr-1" />}
                                                    {v.status}
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
                        {/* Error Summary */}
                        <div className="bg-[#0D1928] border border-rose-500/20 rounded-2xl p-5 shadow-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 mb-4">Errors to Resolve</h3>
                            <div className="space-y-3">
                                <div className="flex gap-3 p-3 bg-[#060B14] border border-rose-500/20 rounded-xl">
                                    <AlertTriangle size={14} className="text-rose-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-[10px] font-black text-rose-400">Office Supplies Depot</div>
                                        <div className="text-[9px] text-slate-500 mt-0.5">PAN invalid — update vendor PAN before filing</div>
                                    </div>
                                </div>
                                <div className="flex gap-3 p-3 bg-[#060B14] border border-amber-500/20 rounded-xl">
                                    <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-[10px] font-black text-amber-400">Prime Facility Management</div>
                                        <div className="text-[9px] text-slate-500 mt-0.5">BSR code missing for Feb challan — import from bank</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Reference */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4">TDS Rate Reference</h3>
                            <table className="w-full">
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { sec: '194C', rate: '1% / 2%', desc: 'Contractor (Ind/Others)' },
                                        { sec: '194J', rate: '10%', desc: 'Professional Fees' },
                                        { sec: '194I(a)', rate: '2%', desc: 'Rent – Plant' },
                                        { sec: '194I(b)', rate: '10%', desc: 'Rent – Land/Building' },
                                        { sec: '194Q', rate: '0.1%', desc: 'Purchase of Goods' },
                                    ].map((r, i) => (
                                        <tr key={i}>
                                            <td className="py-2 pr-3 text-[10px] font-black text-purple-400">{r.sec}</td>
                                            <td className="py-2 pr-3 text-[10px] font-bold text-white">{r.rate}</td>
                                            <td className="py-2 text-[9px] text-slate-500">{r.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Upload */}
                        <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl flex gap-3">
                            <Info size={15} className="text-purple-400 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                Filing due: <b className="text-purple-400">31st July</b> for Q1, <b className="text-purple-400">31st Oct</b> for Q2, <b className="text-purple-400">31st Jan</b> for Q3, <b className="text-purple-400">31st May</b> for Q4.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
