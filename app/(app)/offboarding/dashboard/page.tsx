"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { LogOut, CheckSquare, Clock, Users, ArrowRight, ShieldAlert, FileText } from 'lucide-react';
import Link from 'next/link';

export default function OffboardingHubScreen() {
    return (
        <Page
            title="Lifecycle: Offboarding Hub"
            subtitle="Manage employee exits, clearances, and compliance from resignation to final settlement."
            breadcrumbs={[{ label: "Offboarding", href: "/offboarding" }, { label: "Dashboard" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><LogOut size={24} className="text-indigo-400" /> Lifecycle: Offboarding Hub</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage employee exits, clearances, and compliance from resignation to final settlement.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/offboarding/involuntary" className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
                        <ShieldAlert size={16} /> Initiate Involuntary Exit
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Clock size={14} /> Active Offboardings</div>
                    <div className="text-3xl font-black text-white mb-2">24</div>
                    <div className="text-[#556677] text-xs font-bold">In progress this month</div>
                </div>

                <div className="bg-[#0A1420] border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><CheckSquare size={14} /> Pending Clearances</div>
                    <div className="text-3xl font-black text-amber-500 mb-2">8</div>
                    <div className="text-amber-200/60 text-xs font-bold underline decoration-dashed cursor-pointer">View Blocked Exits</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Users size={14} /> Exit Interviews Pending</div>
                    <div className="text-3xl font-black text-white mb-2">12</div>
                    <div className="text-[#556677] text-xs font-bold">Scheduled for next 7 days</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><FileText size={14} /> Final Settlements Due</div>
                    <div className="text-3xl font-black text-white mb-2">5</div>
                    <div className="text-rose-400 text-xs font-bold">2 overdue for payout</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col h-full">
                    <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                        <h3 className="text-white font-bold text-lg">Active Exit Pipelines</h3>
                        <div className="flex gap-2">
                            <button className="text-xs text-[#8899AA] bg-[#131B2B] border border-[#2A3A4A] px-3 py-1.5 rounded-lg font-bold">Voluntary</button>
                            <button className="text-xs text-[#8899AA] hover:text-white transition-colors px-3 py-1.5 rounded-lg font-bold">Involuntary</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                    <th className="p-4 py-3">Employee</th>
                                    <th className="p-4 py-3">Stage</th>
                                    <th className="p-4 py-3">LWD (Last Working Day)</th>
                                    <th className="p-4 py-3 text-right">Action Tracker</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { name: 'Sarah Jenkins', role: 'Engineering Manager', stage: 'Clearances', lwd: 'Oct 24, 2025', pct: 60, status: 'warning' },
                                    { name: 'Michael Chang', role: 'Account Executive', stage: 'Exit Interview', lwd: 'Oct 15, 2025', pct: 85, status: 'normal' },
                                    { name: 'Aisha Patel', role: 'Data Scientist', stage: 'Manager Review', lwd: 'Nov 02, 2025', pct: 20, status: 'normal' },
                                    { name: 'David Torres', role: 'Operations Assoc', stage: 'Final Settlement', lwd: 'Oct 10, 2025', pct: 95, status: 'critical' },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors cursor-pointer group">
                                        <td className="p-4">
                                            <div className="font-bold text-white mb-0.5 group-hover:text-indigo-400 transition-colors">{row.name}</div>
                                            <div className="text-[#8899AA] text-xs">{row.role}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-[#1A2A3A] text-[#AABBCC] border border-[#2A3A4A] px-2 py-1 rounded text-xs font-bold">
                                                {row.stage}
                                            </span>
                                        </td>
                                        <td className="p-4 text-[#AABBCC] font-mono text-sm">{row.lwd}</td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-3">
                                                <div className="text-right">
                                                    <div className="text-white text-xs font-bold">{row.pct}%</div>
                                                    <div className="text-[#556677] text-[10px] uppercase">Completed</div>
                                                </div>
                                                <div className="w-12 h-1.5 rounded-full bg-[#131B2B] overflow-hidden">
                                                    <div className={`h-full ${row.status === 'critical' ? 'bg-rose-500' : row.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${row.pct}%` }}></div>
                                                </div>
                                                <ArrowRight size={14} className="text-[#556677] group-hover:text-white" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link href="/offboarding/resignation" className="flex items-center justify-between p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl hover:border-indigo-500/50 transition-colors group">
                                <div className="text-white font-bold text-sm group-hover:text-indigo-400">Log Resignation (HR Proxy)</div>
                                <ArrowRight size={16} className="text-[#556677] group-hover:text-indigo-400" />
                            </Link>
                            <Link href="/offboarding/clearance" className="flex items-center justify-between p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl hover:border-indigo-500/50 transition-colors group">
                                <div className="text-white font-bold text-sm group-hover:text-indigo-400">Department Clearances</div>
                                <ArrowRight size={16} className="text-[#556677] group-hover:text-indigo-400" />
                            </Link>
                            <Link href="/offboarding/assets" className="flex items-center justify-between p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl hover:border-indigo-500/50 transition-colors group">
                                <div className="text-white font-bold text-sm group-hover:text-indigo-400">IT Asset Recovery Dashboard</div>
                                <ArrowRight size={16} className="text-[#556677] group-hover:text-indigo-400" />
                            </Link>
                            <Link href="/offboarding/documents" className="flex items-center justify-between p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl hover:border-indigo-500/50 transition-colors group">
                                <div className="text-white font-bold text-sm group-hover:text-indigo-400">Generate Experience Letters</div>
                                <ArrowRight size={16} className="text-[#556677] group-hover:text-indigo-400" />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 text-center">
                        <h3 className="text-white font-bold mb-2">Attrition Insights</h3>
                        <p className="text-[#8899AA] text-xs mb-4">Voluntary turnover spiked 2.1% this quarter. View the thematic breakdown from Exit Interviews.</p>
                        <Link href="/offboarding/analytics" className="w-full bg-[#131B2B] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white font-bold py-2 rounded-xl text-sm transition-colors block shadow-sm">
                            View Retention Analytics
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
