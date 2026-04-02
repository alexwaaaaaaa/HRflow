"use client";
import React from 'react';
import { Server, Cpu, Database, Network, Search, AlertCircle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function PlatformHealthScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                        Infrastructure Telemetry
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> 99.99% Uptime</span>
                    </h1>
                    <p className="text-[#8899AA] text-sm">Deep-dive into microservices, databases, and network latency.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mb-6">
                {/* High Level Node Status */}
                {[
                    { stat: '42ms', label: 'Global API Latency (p99)', icon: Network, color: 'emerald' },
                    { stat: '1.2TB / 5TB', label: 'Primary DB Storage', icon: Database, color: 'indigo' },
                    { stat: '1,204', label: 'Active Webhook Queues', icon: Server, color: 'emerald' },
                    { stat: '92%', label: 'ElasticSearch Heap', icon: Cpu, color: 'amber', err: true },
                ].map((item, i) => (
                    <div key={i} className={`bg-[#0A1420] border ${item.err ? 'border-amber-500/30' : 'border-[#1A2A3A]'} rounded-2xl p-5 relative overflow-hidden group`}>
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <item.icon size={64} />
                        </div>
                        <div className={`text-3xl font-black mb-1 ${item.err ? 'text-amber-400' : 'text-white'}`}>{item.stat}</div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider flex items-center justify-between">
                            {item.label}
                            {item.err && <AlertCircle size={14} className="text-amber-400" />}
                        </div>
                    </div>
                ))}
            </div>

            {/* Service Map Visualization (Mock) */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">Service Mesh Topology</h2>
                    <div className="text-xs text-indigo-400 font-bold flex items-center gap-1 cursor-pointer">View Datadog APM <ArrowUpRight size={14} /></div>
                </div>
                <div className="p-8 h-80 flex items-center justify-center relative bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                    {/* Mock graph nodes */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-[600px] h-[200px]">

                            {/* Gateway */}
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 bg-[#131B2B] border border-indigo-500/30 rounded-xl p-3 text-center z-10 shadow-[0_0_20px_rgba(79,70,229,0.1)]">
                                <div className="font-bold text-white text-sm mb-1">API Gateway</div>
                                <div className="text-[10px] text-emerald-400">12ms • 45k req/s</div>
                            </div>

                            {/* Auth Service */}
                            <div className="absolute top-0 left-1/3 -translate-x-1/2 w-32 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 text-center z-10">
                                <div className="font-bold text-white text-sm mb-1">Auth Service</div>
                                <div className="text-[10px] text-emerald-400">8ms</div>
                            </div>

                            {/* Payroll Core */}
                            <div className="absolute bottom-0 left-1/3 -translate-x-1/2 w-32 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 text-center z-10">
                                <div className="font-bold text-white text-sm mb-1">Payroll Core</div>
                                <div className="text-[10px] text-emerald-400">84ms</div>
                            </div>

                            {/* Postgres */}
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-32 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 text-center z-10">
                                <div className="font-bold text-white text-sm mb-1">Primary DB</div>
                                <div className="text-[10px] text-[#556677]">PostgreSQL 15</div>
                            </div>

                            {/* Search */}
                            <div className="absolute top-0 right-1/4 w-32 bg-[#131B2B] border border-amber-500/50 rounded-xl p-3 text-center z-10 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                <div className="font-bold text-amber-400 text-sm mb-1">Search Nodes</div>
                                <div className="text-[10px] text-amber-400">High JVM Heap</div>
                            </div>

                            {/* SVG Lines */}
                            <svg className="absolute inset-0 w-full h-full -z-10" style={{ strokeWidth: 2 }}>
                                <path d="M 128 100 L 200 50" stroke="#3A4A5A" />
                                <path d="M 128 100 L 200 150" stroke="#3A4A5A" />
                                <path d="M 200 50 L 400 50" stroke="#3A4A5A" />
                                <path d="M 200 150 L 472 100" stroke="#3A4A5A" />
                                <path d="M 200 50 L 472 100" stroke="#3A4A5A" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
