"use client";

import React, { useState } from 'react';
import {
    Search, Filter, ChevronLeft, ChevronRight, Download,
    MoreHorizontal, Shield, AlertTriangle, CheckCircle, Clock,
    XCircle, FileText
} from 'lucide-react';
import Link from 'next/link';

const STATUS_RECORDS = [
    { id: 'BGC-2024-101', cand: 'Saurabh Kumar', role: 'Frontend Eng.', vendor: 'FirstAdvantage', initDate: '12 Nov 2024', status: 'Clear', prog: 100, color: 'text-[#00E5A0]', bg: 'bg-[#00E5A0]/10' },
    { id: 'BGC-2024-100', cand: 'Neha Sharma', role: 'DevOps Lead', vendor: 'Checkr', initDate: '10 Nov 2024', status: 'In Progress', prog: 65, color: 'text-[#0066FF]', bg: 'bg-[#0066FF]/10' },
    { id: 'BGC-2024-099', cand: 'Rajesh Patel', role: 'Sales VP', vendor: 'HireRight', initDate: '08 Nov 2024', status: 'Discrepancy', prog: 80, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'BGC-2024-098', cand: 'Kavita Singh', role: 'HR Manager', vendor: 'FirstAdvantage', initDate: '05 Nov 2024', status: 'Failed', prog: 100, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'BGC-2024-097', cand: 'Aman Gupta', role: 'Analyst', vendor: 'AuthBridge', initDate: '01 Nov 2024', status: 'Clear', prog: 100, color: 'text-[#00E5A0]', bg: 'bg-[#00E5A0]/10' },
    { id: 'BGC-2024-096', cand: 'Pooja Reddy', role: 'Support', vendor: 'Checkr', initDate: '28 Oct 2024', status: 'Clear', prog: 100, color: 'text-[#00E5A0]', bg: 'bg-[#00E5A0]/10' },
];

export default function BGVStatusScreen() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col h-screen">
            <div className="max-w-[1400px] mx-auto w-full flex flex-col flex-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">BGV Status Tracker</h1>
                        <p className="text-sm text-[#8899AA]">Track real-time background verification progress for all candidates.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white shadow-sm">
                            <Download size={16} className="mr-2" /> Export
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-3 mb-6 shrink-0 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search candidate, ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF] w-64 hover:border-[#2A3A4A] transition-colors"
                            />
                        </div>
                        <button className="px-3 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-sm text-[#8899AA] hover:text-white hover:border-[#2A3A4A] transition-colors flex items-center">
                            <Filter size={16} className="mr-2" /> Filter By Status
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[#8899AA]">Global Status:</span>
                        <div className="flex items-center gap-3 bg-[#060B14] px-3 py-1.5 rounded-lg border border-[#1A2A3A]">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#0066FF]"></div><span className="text-xs font-bold text-white">45 Active</span></div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-xs font-bold text-white">12 Issues</span></div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="flex-1 bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg flex flex-col min-h-0 overflow-hidden">
                    <div className="overflow-x-auto overflow-y-auto flex-1 custom-scrollbar">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead className="bg-[#060B14] sticky top-0 z-10">
                                <tr>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Verification ID</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Candidate & Role</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Vendor</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Initiated On</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Overall Status</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Progress</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {STATUS_RECORDS.map((rec) => (
                                    <tr key={rec.id} className="hover:bg-[#0D1928] transition-colors group">
                                        <td className="p-4">
                                            <Link href={`/bgv/status/${rec.id}`} className="font-mono text-sm text-[#0066FF] hover:underline cursor-pointer font-bold">{rec.id}</Link>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-white text-sm">{rec.cand}</div>
                                            <div className="text-xs text-[#8899AA]">{rec.role}</div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-300">
                                            <div className="flex items-center gap-2">
                                                <Shield size={14} className="text-[#556677]" /> {rec.vendor}
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-300">{rec.initDate}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold border border-current ${rec.bg} ${rec.color}`}>
                                                {rec.status === 'Clear' && <CheckCircle size={12} />}
                                                {rec.status === 'In Progress' && <Clock size={12} />}
                                                {rec.status === 'Discrepancy' && <AlertTriangle size={12} />}
                                                {rec.status === 'Failed' && <XCircle size={12} />}
                                                {rec.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${rec.status === 'Failed' ? 'bg-rose-500' : 'bg-[#00E5A0]'}`}
                                                        style={{ width: `${rec.prog}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-medium text-[#8899AA] w-6">{rec.prog}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-[#8899AA] hover:text-white p-1 rounded hover:bg-[#1A2A3A] transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between shrink-0">
                        <div className="text-sm text-[#8899AA]">
                            Showing <span className="font-bold text-white">1</span> to <span className="font-bold text-white">6</span> of <span className="font-bold text-white">124</span> checks
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#1A2A3A] text-[#556677] cursor-not-allowed">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#0066FF] bg-[#0066FF]/10 text-[#0066FF] font-bold text-sm">
                                1
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#1A2A3A] text-slate-300 hover:bg-[#1A2A3A] text-sm">
                                2
                            </button>
                            <span className="text-[#556677]">...</span>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#1A2A3A] text-slate-300 hover:bg-[#1A2A3A] text-sm">
                                12
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#1A2A3A] text-slate-300 hover:bg-[#1A2A3A]">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
