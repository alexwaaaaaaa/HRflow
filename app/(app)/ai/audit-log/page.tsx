"use client";

import React, { useState } from 'react';
import { ShieldAlert, Search, Filter, DownloadCloud, AlertTriangle, Eye, ArrowRight, User as UserIcon, Calendar, Activity, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AIAuditLogPage() {
    const logs = [
        { id: 'ADT-9042', time: '10:42 AM', user: 'System (AI Core)', action: 'Salary Benchmarking Adjust', target: 'Offer Req REQ-102', status: 'Auto-Executed', risk: 'Low' },
        { id: 'ADT-9041', time: '09:15 AM', user: 'Vikram S. (Recruiter)', action: 'Override AI Prediction', target: 'Candidate: Jane Doe', status: 'Manual Override', risk: 'Medium' },
        { id: 'ADT-9040', time: 'Yesterday', user: 'Priya R. (HR Admin)', action: 'Batch Approve OCR Data', target: 'Payroll Batch (145 records)', status: 'Approved', risk: 'High' },
        { id: 'ADT-9039', time: 'Yesterday', user: 'System (AI Core)', action: 'Detect Flight Risk', target: 'Aditi Sharma (Eng)', status: 'Alert Generated', risk: 'Low' },
        { id: 'ADT-9038', time: 'Oct 24', user: 'Administrator', action: 'Update AI Model Weights', target: 'Attrition Prediction', status: 'Config Changed', risk: 'Critical' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <ShieldAlert size={28} className="text-violet-400" /> AI Audit Trail
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Immutable ledger of all AI-driven decisions, autonomous actions, and human overrides for compliance and traceability.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Filter size={16} className="mr-2" /> Advanced Filter
                    </Button>
                    <Button className="bg-violet-600 hover:bg-violet-500 text-white border-none py-2 px-6">
                        <DownloadCloud size={16} className="mr-2" /> Export to CSV
                    </Button>
                </div>
            </div>

            {/* Smart Summary Board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 shrink-0">
                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex items-center gap-4">
                    <div className="bg-[#1A2A3A] p-3 rounded-xl border border-[#2A3A4A] text-[#8899AA]">
                        <Activity size={24} />
                    </div>
                    <div>
                        <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-1">Total AI Actions (MTD)</div>
                        <div className="text-2xl font-bold text-white">4,802</div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-violet-500/20 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="bg-violet-500/10 p-3 rounded-xl border border-violet-500/20 text-violet-400 relative z-10">
                        <UserIcon size={24} />
                    </div>
                    <div className="relative z-10">
                        <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-1">Human Overrides</div>
                        <div className="text-2xl font-bold text-violet-400">1.4%</div>
                        <div className="text-[10px] text-violet-500 mt-1 font-medium">-0.2% vs last month</div>
                    </div>
                </div>

                <div className="md:col-span-2 bg-[#0D1928] border border-amber-500/20 p-5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-start gap-4">
                        <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-500 flex-shrink-0 mt-1">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <div className="text-white text-sm font-semibold mb-1">Unusual Activity Detected</div>
                            <div className="text-[#8899AA] text-xs leading-relaxed max-w-sm">Elevated rate of manual overrides on the Attrition Prediction model by Engineering Managers in the last 48 hours. Suggests model drift.</div>
                        </div>
                    </div>
                    <Button variant="secondary" className="border-amber-500/30 text-amber-500 hover:text-amber-400 text-xs px-3 shadow-none bg-amber-500/5">Investigate</Button>
                </div>
            </div>

            {/* Search/Filter Bar */}
            <div className="flex gap-2 mb-6 shrink-0 w-full md:w-auto">
                <div className="bg-[#0D1928] border border-[#2A3A4A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-violet-500/50 transition-colors flex-1 w-full max-w-md">
                    <Search size={16} className="text-[#8899AA]" />
                    <input type="text" placeholder="Search by event ID, user, or resource..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" />
                </div>
            </div>

            {/* Audit Data Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#0A1420] border-b border-[#1A2A3A] sticky top-0 z-10 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">
                                <th className="px-6 py-4">Event ID / Time</th>
                                <th className="px-6 py-4">Actor</th>
                                <th className="px-6 py-4">Action Taken</th>
                                <th className="px-6 py-4">Target Resource</th>
                                <th className="px-6 py-4">Outcome</th>
                                <th className="px-6 py-4 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {logs.map((log, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-white font-mono">{log.id}</div>
                                        <div className="text-xs text-[#8899AA] mt-1 flex items-center gap-1"><Calendar size={10} /> {log.time}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-white flex items-center gap-2">
                                            {log.user.includes('System') ? <Activity size={14} className="text-violet-400" /> : <UserIcon size={14} className="text-[#8899AA]" />}
                                            {log.user}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#8899AA]">{log.action}</td>
                                    <td className="px-6 py-4 text-sm text-white font-medium">{log.target}</td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded w-fit border ${log.risk === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                log.risk === 'High' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    log.status === 'Manual Override' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
                                                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            }`}>
                                            {log.risk === 'Critical' ? <AlertTriangle size={12} /> : log.status === 'Manual Override' ? <UserIcon size={12} /> : <CheckCircle2 size={12} />}
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="secondary" className="border-[#2A3A4A] text-[#8899AA] text-[10px] h-auto py-1.5 px-3 uppercase tracking-wider group-hover:bg-[#2A3A4A] group-hover:text-white transition-colors">
                                            View Playback <ArrowRight size={12} className="ml-1" />
                                        </Button>
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
