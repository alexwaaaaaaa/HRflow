"use client";

import React from 'react';
import {
    Search, Filter, Download, ArrowLeft,
    MoreHorizontal, User, History, CheckCircle, Clock, AlertCircle, Eye, MessageSquare, ShieldAlert
} from 'lucide-react';

export default function FnFTracker() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            FnF Lifecycle Tracker <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Real-time monitoring of all active exit settlements.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative group">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by ID, Name or Stage..."
                                className="w-80 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all font-medium"
                            />
                        </div>
                        <button className="p-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-slate-400 hover:text-white transition-all shadow-lg italic">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Tracking Table */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-[#060B14]/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-5">Employee</th>
                                <th className="px-6 py-5">LWD</th>
                                <th className="px-6 py-5">Current Stage</th>
                                <th className="px-6 py-5">SLA Status</th>
                                <th className="px-6 py-5">Documents</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { name: 'Arnab Das', id: 'EMP-771', lwd: '24 Apr 24', stage: 'Finance Review', sla: 'On Track', progress: 65, docs: 4, statusColor: 'text-blue-500' },
                                { name: 'Rahul Nair', id: 'EMP-442', lwd: '12 Apr 24', stage: 'Asset Recovery', sla: 'At Risk', progress: 40, docs: 2, statusColor: 'text-rose-500' },
                                { name: 'Sonia Gill', id: 'EMP-901', lwd: '28 Mar 24', stage: 'Settled', sla: 'Completed', progress: 100, docs: 6, statusColor: 'text-emerald-500' },
                                { name: 'Priya Iyer', id: 'EMP-112', lwd: '05 May 24', stage: 'Notice Period', sla: 'Upcoming', progress: 10, docs: 1, statusColor: 'text-slate-500' },
                            ].map((row, i) => (
                                <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all cursor-pointer">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center font-black text-xs text-blue-500">
                                                {row.name.charAt(0)}{row.name.split(' ')[1].charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-white uppercase italic tracking-tighter">{row.name}</div>
                                                <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{row.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-xs font-bold text-slate-400 italic font-sans">{row.lwd}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-2 max-w-[140px]">
                                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/50">
                                                <span>{row.stage}</span>
                                                <span className="italic">{row.progress}%</span>
                                            </div>
                                            <div className="h-1 bg-[#060B14] rounded-full overflow-hidden border border-[#1A2A3A]">
                                                <div
                                                    className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                                    style={{ width: `${row.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={`text-[10px] font-black uppercase flex items-center gap-2 tracking-widest ${row.statusColor}`}>
                                            {row.sla === 'On Track' && <CheckCircle size={14} />}
                                            {row.sla === 'At Risk' && <AlertCircle size={14} />}
                                            {row.sla === 'Completed' && <CheckCircle size={14} />}
                                            {row.sla === 'Upcoming' && <Clock size={14} />}
                                            {row.sla}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="px-2 py-0.5 bg-blue-500/10 rounded-md text-[10px] font-black text-blue-500 uppercase italic border border-blue-500/20">{row.docs} Files</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-blue-500/10 rounded-lg text-blue-500 transition-all" title="View Progress">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-emerald-500/10 rounded-lg text-emerald-500 transition-all" title="Add Note">
                                                <MessageSquare size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-all">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Analytics Snapshot */}
                <div className="grid grid-cols-4 gap-6">
                    {[
                        { label: 'Avg Cycle Time', val: '12.4 Days', trend: '-2.1', icon: Clock, color: 'text-blue-500' },
                        { label: 'Pending Clearances', val: '28 Cases', trend: '+4', icon: AlertCircle, color: 'text-amber-500' },
                        { label: 'Settled this Month', val: '₹1.2Cr+', trend: '88%', icon: CheckCircle, color: 'text-emerald-500' },
                        { label: 'Audit Exceptions', val: '02', trend: 'Critical', icon: ShieldAlert, color: 'text-rose-500' },
                    ].map((card, i) => (
                        <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl space-y-3 relative overflow-hidden group">
                            <div className="flex justify-between items-start">
                                <div className={`p-2 bg-[#060B14] rounded-xl border border-[#1A2A3A] ${card.color}`}>
                                    <card.icon size={20} />
                                </div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{card.trend}</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white tracking-tighter italic">{card.val}</div>
                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{card.label}</div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
