"use client";

import React from 'react';
import {
    Table, Database, Download, FileSpreadsheet,
    ArrowLeft, Search, Filter, MoreHorizontal, FileJson,
    ChevronDown, LayoutGrid, List, FileText
} from 'lucide-react';

export default function FnFDetailedReports() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3 italic">
                            Data Explorer <Database size={24} className="text-blue-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Granular settlement ledger for audit and compliance reporting.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-emerald-600 rounded-xl text-xs font-black text-white hover:bg-emerald-700 transition-all shadow-lg flex items-center italic">
                            <FileSpreadsheet size={16} className="mr-2" /> Export .XLSX
                        </button>
                        <button className="px-5 py-2.5 bg-blue-600 rounded-xl text-xs font-black text-white hover:bg-blue-700 transition-all shadow-lg flex items-center italic">
                            <FileJson size={16} className="mr-2" /> Export .JSON
                        </button>
                    </div>
                </div>

                {/* Advanced Filtering */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-3">
                        <div className="relative group">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-blue-500" />
                            <input
                                type="text"
                                placeholder="Global filter..."
                                className="w-64 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-blue-500/50 italic"
                            />
                        </div>
                        <div className="flex bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-0.5">
                            <button className="p-2.5 bg-[#1A2A3A] rounded-lg text-blue-500"><List size={16} /></button>
                            <button className="p-2.5 text-slate-600 hover:text-white"><LayoutGrid size={16} /></button>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {['Dept', 'Reason', 'Dues Range', 'Stage'].map((filter) => (
                            <button key={filter} className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 hover:text-white transition-all italic tracking-widest">
                                {filter} <ChevronDown size={12} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Data Grid */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl relative">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                <tr>
                                    <th className="px-6 py-5 whitespace-nowrap">Transaction ID</th>
                                    <th className="px-6 py-5">Employee Name</th>
                                    <th className="px-6 py-5">Earnings (₹)</th>
                                    <th className="px-6 py-5">Deductions (₹)</th>
                                    <th className="px-6 py-5">Net Paid (₹)</th>
                                    <th className="px-6 py-5">Payment Ref</th>
                                    <th className="px-6 py-5">Audit Status</th>
                                    <th className="px-6 py-5 text-right">Ledger</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { id: 'TXN-98212', name: 'Arnab Das', earn: '4,75,102', ded: '1,49,900', net: '3,25,202', ref: 'IMPS-00921', status: 'Passed' },
                                    { id: 'TXN-98213', name: 'Rahul Nair', earn: '2,10,000', ded: '45,000', net: '1,65,000', ref: 'NEFT-8821', status: 'Flagged' },
                                    { id: 'TXN-98214', name: 'Sonia Gill', earn: '8,42,000', ded: '2,10,000', net: '6,32,000', ref: 'BANK-0091', status: 'Passed' },
                                    { id: 'TXN-98215', name: 'Priya Iyer', earn: '1,25,000', ded: '12,000', net: '1,13,000', ref: 'IMPS-7721', status: 'Passed' },
                                    { id: 'TXN-98216', name: 'Anil Das', earn: '3,10,200', ded: '88,000', net: '2,22,200', ref: 'CHQ-0012', status: 'Pending' },
                                ].map((row, i) => (
                                    <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all font-sans">
                                        <td className="px-6 py-5">
                                            <span className="text-[10px] font-black text-blue-500/70 group-hover:text-blue-500 transition-all uppercase tracking-widest italic">{row.id}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-xs font-black text-white hover:underline cursor-pointer italic tracking-tight uppercase">{row.name}</div>
                                        </td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-400">₹{row.earn}</td>
                                        <td className="px-6 py-5 text-xs font-bold text-rose-500/80">₹{row.ded}</td>
                                        <td className="px-6 py-5 text-xs font-black text-emerald-500">₹{row.net}</td>
                                        <td className="px-6 py-5">
                                            <div className="text-[10px] font-black text-slate-600 group-hover:text-slate-400 transition-colors uppercase italic">{row.ref}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-[0.2em] ${row.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    row.status === 'Flagged' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-600 hover:text-blue-500 transition-all"><FileText size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex justify-between items-center text-[10px] text-slate-600 font-bold uppercase tracking-widest italic pt-4">
                    <div>Showing 1 - 25 of 142 records</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#1A2A3A] rounded border border-[#1A2A3A] text-white">1</button>
                        <button className="px-3 py-1 hover:bg-[#1A2A3A] rounded border border-[#1A2A3A]">2</button>
                        <button className="px-3 py-1 hover:bg-[#1A2A3A] rounded border border-[#1A2A3A]">3</button>
                        <span className="px-3 py-1">...</span>
                        <button className="px-3 py-1 hover:bg-[#1A2A3A] rounded border border-[#1A2A3A]">Last</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
