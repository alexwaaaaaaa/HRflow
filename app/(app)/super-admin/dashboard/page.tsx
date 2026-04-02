"use client";
import React from 'react';
import { Server, Activity, Users, Building2, TrendingUp, DollarSign, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminDashboardScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                        Titan Dashboard <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider block mt-1 w-max">System Healthy</span>
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Platform overview across all organizations, nodes, and revenues.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-[#131B2B] border border-[#2A3A4A] px-4 py-2 rounded-lg text-xs font-bold text-white flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Updates
                    </div>
                </div>
            </div>

            {/* KPI Row 1: Ecosystem & Revenue */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Building2 size={64} />
                    </div>
                    <p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Total Organizations</p>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-black text-white">4,281</span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 pb-1">
                            <TrendingUp size={12} /> +42 this week
                        </span>
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users size={64} />
                    </div>
                    <p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Total Employees Managed</p>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-black text-white">1.14M</span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 pb-1">
                            +12k MRR net
                        </span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#0A1420] to-indigo-900/10 border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-400">
                        <DollarSign size={64} />
                    </div>
                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">Annual Recurring Revenue</p>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-black text-white">$14.2M</span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 pb-1">
                            <TrendingUp size={12} /> 24% YOY
                        </span>
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden group hover:border-[#2A3A4A] transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={64} />
                    </div>
                    <p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Avg API Latency (p99)</p>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-black text-white">42ms</span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 pb-1">
                            Stable
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">

                {/* Platform Health Overview */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden h-full">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Server size={18} className="text-[#556677]" /> Infrastructure Status</h2>
                            <Link href="/super-admin/health" className="text-xs font-bold text-indigo-400 hover:text-white transition-colors">View Grafana</Link>
                        </div>
                        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: 'Core API Nodes', stat: '48 / 48 Online', load: '32%', status: 'ok' },
                                { name: 'Payroll Workers', stat: '128 / 128 Online', load: '68%', status: 'ok' },
                                { name: 'DB Read Replicas', stat: '12 / 12 Online', load: '45%', status: 'ok' },
                                { name: 'Search Elastic', stat: 'High Memory', load: '92%', status: 'warn' },
                            ].map((node, i) => (
                                <div key={i} className={`border rounded-xl p-4 ${node.status === 'ok' ? 'bg-[#131B2B] border-[#2A3A4A]' : 'bg-amber-500/5 border-amber-500/20'}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className={`w-2 h-2 rounded-full ${node.status === 'ok' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                                    </div>
                                    <h3 className="text-white font-bold text-sm mb-1">{node.name}</h3>
                                    <div className={`text-xs font-mono font-bold mb-3 ${node.status === 'warn' ? 'text-amber-400' : 'text-[#8899AA]'}`}>{node.stat}</div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] text-[#556677] font-bold uppercase">
                                            <span>Load</span>
                                            <span>{node.load}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-[#0A1420] rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${node.status === 'warn' ? 'bg-amber-500' : 'bg-indigo-500'}`} style={{ width: node.load }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Alerts & Action Items */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden h-full">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A]">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">Global Alerts</h2>
                        </div>
                        <div className="p-2 space-y-1">
                            <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-xl flex items-start gap-3">
                                <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-white font-bold text-sm">ElasticSearch High Memory</h4>
                                    <p className="text-xs text-[#8899AA] mt-1">Cluster ap-south-1 experiencing high JVM heap usage. Auto-scale triggered.</p>
                                    <div className="text-[10px] text-[#556677] mt-2 font-mono">12 mins ago</div>
                                </div>
                            </div>

                            <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl flex items-start gap-3">
                                <Zap size={18} className="text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-white font-bold text-sm">API Rate Limit Approaching</h4>
                                    <p className="text-xs text-[#8899AA] mt-1">Org: "TechCorp India" hitting 90% of dedicated tier limit.</p>
                                    <div className="text-[10px] text-[#556677] mt-2 font-mono">1 hour ago</div>
                                </div>
                            </div>

                            <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-xl flex items-start gap-3">
                                <ShieldCheck size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-white font-bold text-sm">SOC 2 Audit Dump Ready</h4>
                                    <p className="text-xs text-[#8899AA] mt-1">Monthly compliance snapshot generated across 4,281 tenants.</p>
                                    <div className="text-[10px] text-[#556677] mt-2 font-mono">System • Today</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
