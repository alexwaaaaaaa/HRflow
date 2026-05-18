"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { ShieldAlert, Users, Clock, AlertTriangle, Search, Filter, ChevronRight, MessageSquareWarning } from 'lucide-react';
import Link from 'next/link';

type SeverityColor = "rose" | "amber" | "emerald";

const SEVERITY_TEXT_CLASSES: Record<SeverityColor, string> = {
    rose: "flex items-center gap-1.5 text-xs font-bold text-rose-400",
    amber: "flex items-center gap-1.5 text-xs font-bold text-amber-400",
    emerald: "flex items-center gap-1.5 text-xs font-bold text-emerald-400",
} as const;

const SEVERITY_DOT_CLASSES: Record<SeverityColor, string> = {
    rose: "w-2 h-2 rounded-full bg-rose-400",
    amber: "w-2 h-2 rounded-full bg-amber-400",
    emerald: "w-2 h-2 rounded-full bg-emerald-400",
} as const;

const GRIEVANCE_ROWS: { id: string; cat: string; date: string; stage: string; severity: string; color: SeverityColor }[] = [
    { id: 'GRV-2026-142', cat: 'Workplace Harassment', date: '2 hrs ago', stage: 'Pending Assignment', severity: 'High', color: 'rose' },
    { id: 'GRV-2026-141', cat: 'Manager Dispute', date: '1 day ago', stage: 'Investigation', severity: 'Medium', color: 'amber' },
    { id: 'GRV-2026-139', cat: 'Policy Violation', date: '3 days ago', stage: 'Hearing Scheduled', severity: 'High', color: 'rose' },
    { id: 'GRV-2026-138', cat: 'Payroll Issue', date: '4 days ago', stage: 'Resolution Proposed', severity: 'Low', color: 'emerald' },
];

export default function GrievanceDashboardScreen() {
    return (
        <Page
            title="Grievance & IC Committee"
            subtitle="Secure, confidential management of workplace issues and POSH cases."
            breadcrumbs={[{ label: "Grievances", href: "/grievances" }, { label: "Dashboard" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Grievance & IC Committee</h1>
                    <p className="text-[#8899AA] text-sm">Secure, confidential management of workplace issues and POSH cases.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/grievances/reports" className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                        Analytics Report
                    </Link>
                    <Link href="/grievances/raise" className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-rose-500/20">
                        <MessageSquareWarning size={16} /> Log Incident
                    </Link>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full group-hover:bg-rose-500/10 transition-colors" />
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-rose-400">
                            <ShieldAlert size={20} />
                        </div>
                        <span className="bg-rose-500/10 text-rose-400 text-xs font-bold px-2 py-1 rounded border border-rose-500/20">Active</span>
                    </div>
                    <div className="text-3xl font-black text-white mb-1 relative z-10">12</div>
                    <div className="text-sm text-[#8899AA] font-medium relative z-10">Open Cases</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-2xl rounded-full group-hover:bg-amber-500/10 transition-colors" />
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-400">
                            <Clock size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white mb-1 relative z-10">4.2<span className="text-lg text-[#556677] ml-1">days</span></div>
                    <div className="text-sm text-[#8899AA] font-medium relative z-10">Avg Resolution Time</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 blur-2xl rounded-full group-hover:bg-sky-500/10 transition-colors" />
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="bg-sky-500/10 p-2.5 rounded-xl border border-sky-500/20 text-sky-400">
                            <Users size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white mb-1 relative z-10">4</div>
                    <div className="text-sm text-[#8899AA] font-medium relative z-10">Pending HR Assignment</div>
                </div>

                <div className="bg-[#0A1420] border border-rose-500/30 rounded-2xl p-5 relative overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.05)]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 blur-2xl rounded-full" />
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="bg-rose-500/20 p-2.5 rounded-xl border border-rose-500/30 text-rose-400 animate-pulse">
                            <AlertTriangle size={20} />
                        </div>
                        <span className="bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500/30 uppercase tracking-widest">SLA Breach</span>
                    </div>
                    <div className="text-3xl font-black text-rose-400 mb-1 relative z-10">2</div>
                    <div className="text-sm text-rose-400/70 font-medium relative z-10">Overdue SLA (48hrs)</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Active Cases Table */}
                <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                        <h2 className="text-lg font-bold text-white">Active Case Queue</h2>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                                <input type="text" placeholder="Case ID or keyword..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:border-indigo-500 outline-none w-48 transition-colors" />
                            </div>
                            <button className="bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg text-[#8899AA] hover:text-white transition-colors">
                                <Filter size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Case ID</th>
                                    <th className="px-6 py-4 font-bold">Category</th>
                                    <th className="px-6 py-4 font-bold">Initiated</th>
                                    <th className="px-6 py-4 font-bold">Stage</th>
                                    <th className="px-6 py-4 font-bold">Severity</th>
                                    <th className="px-6 py-4 font-bold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {GRIEVANCE_ROWS.map((row, i) => (
                                    <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                        <td className="px-6 py-4 font-mono text-indigo-400 font-bold">{row.id}</td>
                                        <td className="px-6 py-4 text-white font-medium">{row.cat}</td>
                                        <td className="px-6 py-4 text-[#8899AA]">{row.date}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-[#1A2A3A] px-2.5 py-1 rounded text-xs text-[#CCDDEE] border border-[#2A3A4A]">{row.stage}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={SEVERITY_TEXT_CLASSES[row.color]}>
                                                <div className={SEVERITY_DOT_CLASSES[row.color]} /> {row.severity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/grievances/${row.id}/assign`} className="text-indigo-400 hover:text-indigo-300 font-bold text-sm inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Review <ChevronRight size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right panel summary */}
                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Cases by Category</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Policy Violation', count: 4, pct: 33, color: 'bg-indigo-500' },
                                { label: 'Workplace Harassment (POSH)', count: 3, pct: 25, color: 'bg-rose-500' },
                                { label: 'Manager Dispute', count: 3, pct: 25, color: 'bg-amber-500' },
                                { label: 'Infrastructure/Facilities', count: 2, pct: 17, color: 'bg-sky-500' },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-[#8899AA]">{item.label}</span>
                                        <span className="text-white font-bold">{item.count}</span>
                                    </div>
                                    <div className="h-2 w-full bg-[#131B2B] rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
                        <h3 className="text-sm font-bold text-white mb-2 relative z-10 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                            IC Committee Status
                        </h3>
                        <p className="text-xs text-[#8899AA] mb-4 relative z-10 leading-relaxed">Ensure compliance with the POSH Act by maintaining active committee members.</p>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-xl flex items-center justify-between relative z-10 mb-2">
                            <div>
                                <div className="text-white text-sm font-bold">5 Members</div>
                                <div className="text-xs text-emerald-400">Compliant structure</div>
                            </div>
                            <button className="text-indigo-400 text-xs font-bold hover:text-indigo-300">Manage</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
