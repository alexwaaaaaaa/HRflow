"use client";
import React from 'react';
import { ShieldCheck, ShieldAlert, Activity, Server, Users, Key, AlertTriangle, Fingerprint, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SecurityDashboardScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Security Command Center</h1>
                    <p className="text-[#8899AA] text-sm">Monitor workspace security posture, access logs, and DPDP compliance in real-time.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Lock size={16} /> Enforce MFA All
                    </button>
                    <Link href="/security/reports" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <ShieldCheck size={16} /> Security Report
                    </Link>
                </div>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full group-hover:bg-emerald-500/10 transition-colors" />
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
                            <ShieldCheck size={20} />
                        </div>
                        <span className="text-emerald-400 text-xs font-bold px-2 py-1 bg-emerald-500/10 rounded border border-emerald-500/20">Healthy</span>
                    </div>
                    <div className="text-3xl font-black text-white mb-1 relative z-10">98<span className="text-xl text-[#556677] ml-1">%</span></div>
                    <div className="text-sm text-[#8899AA] font-medium relative z-10">Security Score</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 blur-2xl rounded-full group-hover:bg-sky-500/10 transition-colors" />
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="bg-sky-500/10 p-2.5 rounded-xl border border-sky-500/20 text-sky-400">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white mb-1 relative z-10">412</div>
                    <div className="text-sm text-[#8899AA] font-medium relative z-10">Active Sessions</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full group-hover:bg-indigo-500/10 transition-colors" />
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="bg-indigo-500/10 p-2.5 rounded-xl border border-indigo-500/20 text-indigo-400">
                            <Key size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white mb-1 relative z-10">24</div>
                    <div className="text-sm text-[#8899AA] font-medium relative z-10">API Keys Active</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group hover:border-rose-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full group-hover:bg-rose-500/10 transition-colors" />
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-rose-400">
                            <ShieldAlert size={20} />
                        </div>
                        <span className="text-rose-400 text-xs font-bold px-2 py-1 bg-rose-500/10 rounded border border-rose-500/20 animate-pulse">Action Req</span>
                    </div>
                    <div className="text-3xl font-black text-white mb-1 relative z-10">3</div>
                    <div className="text-sm text-[#8899AA] font-medium relative z-10">Open Incidents</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Security Events */}
                <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060D1A]">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2"><Fingerprint size={18} className="text-[#556677]" /> Recent Events</h2>
                        <Link href="/security/access-logs" className="text-indigo-400 text-sm font-bold hover:text-indigo-300 transition-colors">View All Logs</Link>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { icon: <AlertTriangle size={16} className="text-rose-400" />, event: 'Multiple Failed Logins', user: 'rajesh.k@company.com', time: '2 mins ago', ip: '45.22.11.9', loc: 'Mumbai, IN', status: 'Blocked' },
                                    { icon: <Lock size={16} className="text-indigo-400" />, event: 'MFA Disabled', user: 'admin.super@company.com', time: '1 hr ago', ip: '192.168.1.1', loc: 'Internal Network', status: 'Warning' },
                                    { icon: <Server size={16} className="text-sky-400" />, event: 'Bulk Export (Payroll Data)', user: 'finance.lead@company.com', time: '3 hrs ago', ip: '10.0.0.4', loc: 'Bangalore, IN', status: 'Info' },
                                    { icon: <Fingerprint size={16} className="text-[#556677]" />, event: 'New Device Login', user: 'sarah.j@company.com', time: '5 hrs ago', ip: '112.44.55.1', loc: 'London, UK', status: 'Info' },
                                    { icon: <Users size={16} className="text-emerald-400" />, event: 'Role Escalation', user: 'System Admin', time: 'Yesterday', ip: '10.0.0.1', loc: 'Internal Network', status: 'Info' },
                                ].map((log, i) => (
                                    <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                        <td className="px-6 py-4 w-12">{log.icon}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-white font-bold">{log.event}</div>
                                            <div className="text-xs text-[#556677]">{log.user}</div>
                                        </td>
                                        <td className="px-6 py-4 text-[#8899AA]">{log.time}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-white font-mono text-xs">{log.ip}</div>
                                            <div className="text-xs text-[#556677]">{log.loc}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${log.status === 'Blocked' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                    log.status === 'Warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                        'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]'
                                                }`}>
                                                {log.status}
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
                    {/* DPDP Compliance Snapshot */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 relative z-10 flex items-center gap-2">
                            Privacy & DPDP Act 2023
                        </h3>

                        <div className="space-y-3 relative z-10">
                            <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-xl flex items-center justify-between group cursor-pointer hover:border-[#3A4A5A]">
                                <div>
                                    <div className="text-white text-sm font-bold mb-0.5">Consent Flags</div>
                                    <div className="text-xs text-emerald-400">99.8% Coverage</div>
                                </div>
                                <ChevronRight size={16} className="text-[#556677] group-hover:text-white transition-colors" />
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-xl flex items-center justify-between group cursor-pointer hover:border-amber-500/50">
                                <div>
                                    <div className="text-white text-sm font-bold mb-0.5">Data Deletion Requests</div>
                                    <div className="text-xs text-amber-400">2 Pending Approval</div>
                                </div>
                                <ChevronRight size={16} className="text-[#556677] group-hover:text-white transition-colors" />
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-xl flex items-center justify-between group cursor-pointer hover:border-[#3A4A5A]">
                                <div>
                                    <div className="text-white text-sm font-bold mb-0.5">Data Masking Rules</div>
                                    <div className="text-xs text-[#8899AA]">14 Active Policies</div>
                                </div>
                                <ChevronRight size={16} className="text-[#556677] group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Threat Map / Geo Access (Mock) */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 flex flex-col items-center justify-center h-48 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5" />
                        <div className="relative z-10 text-center">
                            <Server size={32} className="text-[#2A3A4A] mx-auto mb-3" />
                            <h3 className="text-white font-bold text-sm mb-1">Global Access Map</h3>
                            <p className="text-xs text-[#556677]">Only internal network and IN/US IPs permitted.</p>
                            <Link href="/security/ip-whitelist" className="text-indigo-400 text-xs font-bold mt-2 inline-block hover:text-indigo-300">Manage IP Whitelist</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
