"use client";

import React, { useState } from 'react';
import { Network, Activity, FileJson, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Server, BarChart2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, AreaChart, Area } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const latencyData = [
    { time: '08:00', ms: 142 }, { time: '09:00', ms: 155 },
    { time: '10:00', ms: 198 }, { time: '11:00', ms: 220 },
    { time: '12:00', ms: 180 }, { time: '13:00', ms: 145 },
];

const accuracyData = [
    { model: 'Document AI (OCR)', val: 99.2 },
    { model: 'Attrition Predictor', val: 94.5 },
    { model: 'NL Query Intent', val: 96.8 },
    { model: 'Compensation Opt', val: 91.2 },
    { model: 'Gazette Parser', val: 98.1 },
];

export default function AIModelPerformancePage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Network size={28} className="text-indigo-400" /> AI Model Performance
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Technical observability dashboard for Kaarya's embedded machine learning models, inference latency, and prediction accuracy drift.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <FileJson size={16} className="mr-2" /> Download Logs
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">

                {/* Global Metrics Side */}
                <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 shrink-0">

                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <Zap size={16} className="text-emerald-400" />
                            <h3 className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider">System Status</h3>
                        </div>
                        <div className="text-xl font-bold text-white mb-3">All Models Operational</div>
                        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 99.99% Uptime (MTD)
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity size={16} className="text-blue-400" />
                            <h3 className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider">Inference Latency</h3>
                        </div>
                        <div className="text-2xl font-bold text-white">142 <span className="text-sm font-normal text-[#8899AA]">ms</span></div>
                        <div className="h-16 mt-4 -ml-4 -mb-2">
                            <ClientOnly>
                                <ChartWrapper height="h-full">
                                    <AreaChart data={latencyData}>
                                        <Area type="monotone" dataKey="ms" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                                    </AreaChart>
                                </ChartWrapper>
                            </ClientOnly>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <Server size={16} className="text-purple-400" />
                            <h3 className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider">API Requests (24h)</h3>
                        </div>
                        <div className="text-2xl font-bold text-white">124.5k</div>
                        <div className="text-xs text-[#8899AA] mt-2">+12% vs prior day</div>
                    </div>

                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col h-full overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#1A2A3A] bg-[#0A1420] shrink-0 flex justify-between items-center">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <BarChart2 size={18} className="text-[#8899AA]" /> Model Registry & Accuracy
                        </h3>
                        <div className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider rounded">
                            No active drift detected
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0A1420] border-b border-[#1A2A3A] sticky top-0 z-10">
                                    <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Model Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Version</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Accuracy / F1 Score</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Validation Data</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {accuracyData.map((model, i) => (
                                    <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-white">{model.model}</div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-[#8899AA] font-mono">v4.2.{i}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 bg-[#1A2A3A] h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${model.val}%` }} />
                                                </div>
                                                <span className="text-sm font-bold text-white">{model.val}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-[#8899AA]">Auto-sampled (24h)</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
