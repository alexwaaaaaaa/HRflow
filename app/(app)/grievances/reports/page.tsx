"use client";
import React from 'react';
import { Search, Filter, Download, FileSpreadsheet, FileIcon, ChevronDown, Calendar } from 'lucide-react';

export default function GrievanceReportsScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Cases Report Hub</h1>
                    <p className="text-[#8899AA] text-sm">Download aggregated data dumps and custom queries for compliance reporting.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Filter size={16} /> Filters
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Download size={16} /> Export View
                    </button>
                </div>
            </div>

            {/* Quick Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-3 relative group">
                    <label className="text-[10px] text-[#556677] uppercase font-bold tracking-wider mb-1 block">Date Range</label>
                    <div className="flex items-center justify-between text-white text-sm cursor-pointer">
                        <span className="flex items-center gap-2"><Calendar size={14} className="text-[#8899AA]" /> Last 6 Months</span>
                        <ChevronDown size={14} className="text-[#556677]" />
                    </div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-3 relative group">
                    <label className="text-[10px] text-[#556677] uppercase font-bold tracking-wider mb-1 block">Category</label>
                    <div className="flex items-center justify-between text-white text-sm cursor-pointer">
                        <span className="truncate">All Categories</span>
                        <ChevronDown size={14} className="text-[#556677]" />
                    </div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-3 relative group">
                    <label className="text-[10px] text-[#556677] uppercase font-bold tracking-wider mb-1 block">Status</label>
                    <div className="flex items-center justify-between text-white text-sm cursor-pointer">
                        <span className="truncate">All Statuses</span>
                        <ChevronDown size={14} className="text-[#556677]" />
                    </div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-3 relative group">
                    <label className="text-[10px] text-[#556677] uppercase font-bold tracking-wider mb-1 block">Location / Branch</label>
                    <div className="flex items-center justify-between text-white text-sm cursor-pointer">
                        <span className="truncate">All Locations</span>
                        <ChevronDown size={14} className="text-[#556677]" />
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search report..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:border-indigo-500 outline-none w-64 transition-colors" />
                        </div>
                        <span className="text-xs text-[#556677] font-bold">142 Records Found</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Case ID</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Filing Date</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Category</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Location</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Resolution Time</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Action Taken</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { id: 'GRV-2026-142', date: 'Oct 24, 2026', cat: 'POSH', loc: 'Bangalore', status: 'Investigation', res: '-', action: '-' },
                                { id: 'GRV-2026-141', date: 'Oct 20, 2026', cat: 'Manager Dispute', loc: 'Hyderabad', status: 'Resolved', res: '4 Days', action: 'Mediation / Warning' },
                                { id: 'GRV-2026-139', date: 'Oct 15, 2026', cat: 'Policy Violation', loc: 'Mumbai', status: 'Resolved', res: '12 Days', action: 'Termination' },
                                { id: 'GRV-2026-138', date: 'Oct 12, 2026', cat: 'Payroll Issue', loc: 'Remote', status: 'Appealed', res: '-', action: '-' },
                                { id: 'GRV-2026-135', date: 'Sep 28, 2026', cat: 'POSH', loc: 'Delhi', status: 'Resolved', res: '45 Days', action: 'Written Warning' },
                                { id: 'GRV-2026-131', date: 'Sep 10, 2026', cat: 'Facilities', loc: 'Bangalore', status: 'Resolved', res: '2 Days', action: 'Corrective Measure' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                    <td className="px-6 py-4 font-mono text-indigo-400 font-bold">{row.id}</td>
                                    <td className="px-6 py-4 text-[#8899AA]">{row.date}</td>
                                    <td className="px-6 py-4 text-white">{row.cat}</td>
                                    <td className="px-6 py-4 text-[#8899AA]">{row.loc}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${row.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                row.status === 'Investigation' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA]">{row.res}</td>
                                    <td className="px-6 py-4 text-white font-medium">{row.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                    <div className="text-xs text-[#556677]">Showing 1-6 of 142</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#131B2B] border border-[#2A3A4A] rounded text-[#8899AA] text-xs font-bold hover:text-white transition-colors disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 bg-[#131B2B] border border-[#2A3A4A] rounded text-[#8899AA] text-xs font-bold hover:text-white transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Quick Export Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-[#0A1420] border border-[#1A2A3A] hover:border-indigo-500/50 rounded-2xl p-6 transition-colors flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                            <FileSpreadsheet size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Raw Data Dump (CSV)</h4>
                            <p className="text-xs text-[#8899AA]">Complete unformatted dataset for Excel/BI tools.</p>
                        </div>
                    </div>
                    <Download size={20} className="text-[#556677] group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] hover:border-emerald-500/50 rounded-2xl p-6 transition-colors flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                            <FileIcon size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Executive Summary (PDF)</h4>
                            <p className="text-xs text-[#8899AA]">Formatted presentation-ready board report.</p>
                        </div>
                    </div>
                    <Download size={20} className="text-[#556677] group-hover:text-emerald-400 transition-colors" />
                </div>
            </div>

        </div>
    );
}
