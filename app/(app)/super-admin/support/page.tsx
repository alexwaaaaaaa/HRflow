"use client";
import React from 'react';
import { LifeBuoy, Filter, Search, Clock, ShieldAlert, CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function SupportTicketsScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Global Support Triage</h1>
                    <p className="text-[#8899AA] text-sm">Manage L3 escalations and enterprise workspace tickets across the platform.</p>
                </div>
            </div>

            {/* Metric Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mb-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">142</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Open Tickets</div>
                </div>
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-rose-400 mb-1">18</div>
                    <div className="text-xs text-rose-400 font-bold uppercase tracking-wider">SLA Breached</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">2.4h</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Avg Resolution Time</div>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-1">
                        <div className="text-3xl font-black text-amber-400">4</div>
                        <ShieldAlert size={20} className="text-amber-400" />
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">P0 Incidents</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                {/* Search & Toolbar */}
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search by Ticket ID, Workspace, or Subject..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none w-80 transition-colors" />
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <span className="text-xs font-bold text-[#556677] uppercase">Filter:</span>
                            <select className="bg-[#131B2B] border border-[#2A3A4A] text-white text-xs font-bold rounded-lg px-3 py-2 outline-none appearance-none cursor-pointer">
                                <option>Status: Open</option>
                                <option>Status: P0 Only</option>
                                <option>Status: Resolved</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Ticket Details</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Organization</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Priority</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">SLA Clock</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Assignee</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { id: 'TCK-9901', sub: 'Payroll Calculation Mismatch in FnF', org: 'TechCorp India', pri: 'P0 - Critical', status: 'Open', clock: '1h 12m', err: true },
                                { id: 'TCK-9892', sub: 'New Feature Request: Custom Approval Flow', org: 'Zenith Logistics', pri: 'P3 - Low', status: 'In Progress', clock: '12h 45m' },
                                { id: 'TCK-9884', sub: 'Cannot download Form 16 Part B', org: 'Apex Media Group', pri: 'P2 - High', status: 'Open', clock: '4h 20m', warn: true },
                                { id: 'TCK-9871', sub: 'Login Page 500 Error for all employees', org: 'Sunset Technologies', pri: 'P0 - Critical', status: 'Resolved', clock: '-', resolved: true },
                                { id: 'TCK-9865', sub: 'Billing invoice discrepancy', org: 'Global Finance Ltd', pri: 'P1 - Urgent', status: 'Open', clock: '2h 10m' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors cursor-pointer group">
                                    <td className="px-6 py-4">
                                        <div className="text-white font-bold text-sm truncate max-w-xs">{row.sub}</div>
                                        <div className="text-[10px] text-[#556677] font-mono mt-0.5">{row.id}</div>
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA] font-bold text-xs">{row.org}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${row.err || row.resolved && row.pri.includes('P0') ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                row.warn ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]'
                                            }`}>
                                            {row.pri}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {row.resolved ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Clock size={14} className="text-indigo-400" />}
                                            <span className={`font-bold text-xs ${row.resolved ? 'text-emerald-400' : 'text-indigo-400'}`}>{row.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white font-mono font-bold text-xs">{row.clock}</td>
                                    <td className="px-6 py-4 text-[#8899AA] text-xs flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold">L3</div>
                                        {row.resolved ? '-' : 'Unassigned'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
