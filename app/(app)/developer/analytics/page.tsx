"use client";
import React from 'react';
import { Activity, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

export default function ApiUsageAnalyticsPage() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Activity className="text-indigo-400" />
                        API Traffic & Analytics
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Monitor throughput, error rates, and endpoint utilization in real-time.</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-[#060D1A] border border-[#1A2A3A] text-white text-sm rounded-lg px-4 py-2 outline-none focus:border-indigo-500">
                        <option>Production API Key 1</option>
                        <option>Staging Key</option>
                    </select>
                    <select className="bg-[#060D1A] border border-[#1A2A3A] text-white text-sm rounded-lg px-4 py-2 outline-none focus:border-indigo-500">
                        <option>Last 7 Days</option>
                        <option>Last 24 Hours</option>
                        <option>This Month</option>
                    </select>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Requests', value: '452.8k', trend: '+12%', color: 'from-blue-500/20', icon: <TrendingUp size={16} /> },
                    { label: 'Avg Latency', value: '64ms', trend: '-5ms', color: 'from-emerald-500/20', icon: <Zap size={16} /> },
                    { label: 'Error Rate (4xx/5xx)', value: '0.12%', trend: '+0.01%', color: 'from-rose-500/20', icon: <AlertTriangle size={16} /> },
                    { label: 'Unique IPs', value: '4', trend: '0', color: 'from-amber-500/20', icon: <Activity size={16} /> }
                ].map((kpi, i) => (
                    <div key={i} className={`bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 relative overflow-hidden bg-gradient-to-br ${kpi.color} to-transparent`}>
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs font-bold text-[#8899AA] uppercase tracking-wider">{kpi.label}</p>
                            <span className="text-[#556677]">{kpi.icon}</span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-black text-white">{kpi.value}</span>
                            <span className={`text-xs font-bold ${kpi.trend.startsWith('-') && kpi.label.includes('Latency') ? 'text-emerald-400' : kpi.trend.startsWith('+') && !kpi.label.includes('Error') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {kpi.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Chart Placeholder */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 lg:col-span-2">
                    <h3 className="text-base font-bold text-white mb-6">Traffic Volume (Requests per hour)</h3>
                    <div className="h-64 flex items-end justify-between gap-1 border-b border-[#1A2A3A] pb-2 relative">
                        {/* Fake grid lines */}
                        <div className="absolute inset-x-0 bottom-1/2 border-t border-[#1A2A3A] border-dashed" />
                        <div className="absolute inset-x-0 bottom-3/4 border-t border-[#1A2A3A] border-dashed" />

                        {/* Fake bars */}
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div key={i} className="w-full flex justify-center group relative z-10">
                                <div className="w-full max-w-[12px] bg-indigo-500/80 hover:bg-indigo-400 rounded-t-sm transition-all" style={{ height: `${Math.max(10, Math.random() * 100)}%` }} />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-[#556677] font-mono">
                        <span>Mon 00:00</span>
                        <span>Tue 00:00</span>
                    </div>
                </div>

                {/* Top Endpoints */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0D1928]">
                        <h3 className="text-sm font-bold text-white">Top Endpoints</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <ul className="divide-y divide-[#1A2A3A]">
                            {[
                                { path: '/v2/attendance/sync', method: 'POST', count: '142k', pct: 45 },
                                { path: '/v2/employees', method: 'GET', count: '89k', pct: 28 },
                                { path: '/v2/payroll/preview', method: 'POST', count: '45k', pct: 15 },
                                { path: '/v2/leave/balances', method: 'GET', count: '38k', pct: 12 },
                            ].map((ep, i) => (
                                <li key={i} className="p-4 hover:bg-[#131B2B] transition-colors">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2 font-mono text-sm max-w-[70%]">
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{ep.method}</span>
                                            <span className="text-[#CCDDEE] truncate" title={ep.path}>{ep.path}</span>
                                        </div>
                                        <span className="text-white text-sm font-bold">{ep.count}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${ep.pct}%` }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
