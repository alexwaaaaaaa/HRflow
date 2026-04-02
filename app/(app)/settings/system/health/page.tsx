"use client";

import React from 'react';
import { Activity, Server, Database, Cpu, Wifi, Clock, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function SystemHealthPage() {
    const services = [
        { name: 'API Gateway', status: 'Operational', uptime: '99.99%', latency: '42ms', icon: Wifi },
        { name: 'PostgreSQL (Primary)', status: 'Operational', uptime: '99.98%', latency: '8ms', icon: Database },
        { name: 'Redis Cache', status: 'Operational', uptime: '99.99%', latency: '1ms', icon: Cpu },
        { name: 'Worker Queue (BullMQ)', status: 'Degraded', uptime: '99.5%', latency: '120ms', icon: Server },
        { name: 'Search Engine (Elastic)', status: 'Operational', uptime: '99.97%', latency: '15ms', icon: Database },
        { name: 'File Storage (S3)', status: 'Operational', uptime: '100%', latency: '35ms', icon: Server },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Activity size={28} className="text-emerald-400" /> System Health
                    </h1>
                    <p className="text-[#8899AA] text-sm">Real-time operational status of all Kaarya infrastructure components.</p>
                </div>
                <Button variant="secondary" className="border-[#2A3A4A] text-white"><RefreshCw size={16} className="mr-2" /> Refresh</Button>
            </div>

            {/* Overall Status */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-8 flex items-center gap-4">
                <CheckCircle2 size={32} className="text-emerald-400" />
                <div>
                    <div className="text-white font-semibold text-lg">All Systems Operational</div>
                    <div className="text-sm text-emerald-400/80">Last checked: 30 seconds ago • Overall Uptime (30d): 99.97%</div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                {services.map((svc, idx) => {
                    const Icon = svc.icon;
                    const isDegraded = svc.status === 'Degraded';
                    return (
                        <div key={idx} className={`bg-[#0D1928] border rounded-2xl p-5 ${isDegraded ? 'border-amber-500/30' : 'border-[#1A2A3A]'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${isDegraded ? 'bg-amber-500/10 text-amber-400' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>
                                        <Icon size={18} />
                                    </div>
                                    <h3 className="text-white font-medium text-sm">{svc.name}</h3>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 ${isDegraded ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    }`}>
                                    {isDegraded ? <AlertTriangle size={10} /> : <CheckCircle2 size={10} />}
                                    {svc.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-2.5">
                                    <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold">Uptime</div>
                                    <div className="text-white font-bold text-sm">{svc.uptime}</div>
                                </div>
                                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-2.5">
                                    <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold">Avg Latency</div>
                                    <div className="text-white font-bold text-sm">{svc.latency}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Incident History */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                <h3 className="text-white font-medium mb-4">Recent Incidents (Last 7 Days)</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <AlertTriangle size={14} className="text-amber-400 shrink-0" />
                        <span className="text-white">Worker Queue latency spike (120ms+)</span>
                        <span className="text-[#445566] ml-auto text-xs">2 hrs ago • Investigating</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                        <span className="text-[#8899AA]">Scheduled maintenance — Redis cluster upgrade</span>
                        <span className="text-[#445566] ml-auto text-xs">3 days ago • Resolved</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
