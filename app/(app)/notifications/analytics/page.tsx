"use client";
import React from 'react';
import { BarChart3, TrendingUp, Mail, MessageSquare } from 'lucide-react';

export default function NotificationAnalyticsPage() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <BarChart3 className="text-[#00E5A0]" />
                        Delivery Analytics
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Track open rates, delivery success, and engagement across channels.</p>
                </div>
                <select className="bg-[#060D1A] border border-[#1A2A3A] text-white text-sm rounded-lg px-4 py-2 outline-none">
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                    <option>Year to Date</option>
                </select>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Sent', value: '1.24M', trend: '+12%', color: 'from-blue-500/20 to-transparent' },
                    { label: 'Delivery Rate', value: '99.8%', trend: '+0.1%', color: 'from-emerald-500/20 to-transparent' },
                    { label: 'Open Rate (Email)', value: '62.4%', trend: '-2.4%', color: 'from-amber-500/20 to-transparent' },
                    { label: 'Push CTR', value: '18.2%', trend: '+5.5%', color: 'from-purple-500/20 to-transparent' }
                ].map((kpi, i) => (
                    <div key={i} className={`bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 relative overflow-hidden bg-gradient-to-br ${kpi.color}`}>
                        <p className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">{kpi.label}</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-black text-white">{kpi.value}</span>
                            <span className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {kpi.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Volume over time mock chart */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                    <h3 className="text-base font-bold text-white mb-6">Volumes by Channel</h3>
                    <div className="h-64 flex items-end justify-between gap-2 border-b border-[#1A2A3A] pb-2">
                        {/* Fake bars */}
                        {[40, 60, 45, 80, 55, 90, 75, 100, 85, 65, 50, 70].map((h, i) => (
                            <div key={i} className="w-full flex justify-center">
                                <div className="w-4 bg-indigo-500 rounded-t-sm" style={{ height: `${h}%` }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance by Subject */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                    <h3 className="text-base font-bold text-white mb-6">Top Performing Categories</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Payroll & Slips', val: '88%', icon: <Mail size={16} /> },
                            { name: 'Direct Mentions', val: '76%', icon: <MessageSquare size={16} /> },
                            { name: 'Policy Updates', val: '45%', icon: <TrendingUp size={16} /> },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="p-2 bg-[#131B2B] rounded-lg text-[#8899AA]">{item.icon}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">{item.name}</span>
                                        <span className="text-emerald-400 font-medium">{item.val}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: item.val }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
