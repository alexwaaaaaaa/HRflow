"use client";
import React, { useState } from 'react';
import { Activity, Search, Filter, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function IntegrationLogsPage() {
    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#556677] mb-2">
                        <Link href="/settings/integrations/1" className="hover:text-white flex items-center"><ArrowLeft size={14} className="mr-1" /> Slack Settings</Link>
                    </div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Activity className="text-indigo-400" />
                        Slack Integration Logs
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Audit trail of automated data syncs and webhooks specific to this integration.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" size={16} />
                        <input type="text" placeholder="Search event ID or type..." className="w-64 pl-9 pr-3 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-sm text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-3 py-2 rounded-lg transition-colors border border-[#2A3A4A]">
                        <Filter size={16} />
                    </button>
                </div>
            </div>

            {/* Summary Banner */}
            <div className="bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/20 rounded-xl p-4 flex gap-4 items-center">
                <div className="bg-rose-500/20 p-2 rounded-lg">
                    <AlertTriangle className="text-rose-400" size={24} />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">2 Failed Deliveries in last 24h</h4>
                    <p className="text-[#8899AA] text-xs mt-0.5">Some Slack slash commands timed out before Kaarya could respond.</p>
                </div>
                <button className="ml-auto bg-[#0A1420] border border-[#1A2A3A] hover:bg-[#131B2B] text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors">
                    Retry Failed
                </button>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm text-[#8899AA]">
                    <thead className="bg-[#060D1A] border-b border-[#1A2A3A] text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Event Type / Direction</th>
                            <th className="px-6 py-4 font-medium">Payload Ref</th>
                            <th className="px-6 py-4 font-medium">Timestamp</th>
                            <th className="px-6 py-4 font-medium text-right">View Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A] font-mono">
                        {[
                            { status: 504, event: 'Slash Command /kaarya leave', dir: 'INBOUND', ref: 'cmd_928xn', time: '10 mins ago', color: 'rose' },
                            { status: 200, event: 'Webhook leave.approved', dir: 'OUTBOUND', ref: 'msg_po82b', time: '1 hour ago', color: 'emerald' },
                            { status: 200, event: 'Webhook employee.created', dir: 'OUTBOUND', ref: 'msg_xj28a', time: '3 hours ago', color: 'emerald' },
                            { status: 504, event: 'Slash Command /kaarya peers', dir: 'INBOUND', ref: 'cmd_1l9xn', time: '4 hours ago', color: 'rose' },
                            { status: 200, event: 'Org Announcement Sync', dir: 'OUTBOUND', ref: 'msg_98zqw', time: 'Yesterday', color: 'emerald' },
                        ].map((log, i) => (
                            <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                                        {log.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-sans">{log.event}</span>
                                        <span className="text-[10px] font-bold text-[#556677] uppercase tracking-wider">{log.dir}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#CCDDEE]">{log.ref}</td>
                                <td className="px-6 py-4 font-sans text-[#556677]">{log.time}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-indigo-400 hover:text-indigo-300 transition-colors font-bold font-sans">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 border-t border-[#1A2A3A] bg-[#060D1A] flex justify-center">
                    <button className="text-[#8899AA] hover:text-white text-sm font-bold transition-colors">Load Older Logs</button>
                </div>
            </div>

        </div>
    );
}
