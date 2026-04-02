"use client";

import React, { useState } from 'react';
import { Sparkles, AlertTriangle, ShieldCheck, Activity, Search, Filter, RefreshCcw, Bell } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis, Tooltip as RechartsTooltip, Cell } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

// Mock data using generic 0-100 coordinates to plot anomalies
const scatterData = [
    { x: 20, y: 30, z: 200, category: 'Payroll', severity: 'Medium', label: 'Overtime Spike' },
    { x: 80, y: 75, z: 400, category: 'Compliance', severity: 'Critical', label: 'Missing KYC' },
    { x: 45, y: 85, z: 300, category: 'Expense', severity: 'High', label: 'Duplicate Claim' },
    { x: 15, y: 65, z: 150, category: 'Attendance', severity: 'Low', label: 'Proxy Login' },
    { x: 60, y: 20, z: 250, category: 'Expense', severity: 'Medium', label: 'Off-policy Flight' },
    { x: 75, y: 40, z: 350, category: 'Payroll', severity: 'High', label: 'Tax Calculation Error' },
    { x: 30, y: 90, z: 500, category: 'Compliance', severity: 'Critical', label: 'Expired Visa' },
];

export default function AnomalyDetectionPage() {
    const [filterCategory, setFilterCategory] = useState<string | null>(null);

    const filteredData = filterCategory ? scatterData.filter(d => d.category === filterCategory) : scatterData;

    const getColor = (severity: string) => {
        switch (severity) {
            case 'Critical': return '#FF4444';
            case 'High': return '#FFB800';
            case 'Medium': return '#3b82f6';
            default: return '#8899AA';
        }
    };

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Activity size={28} className="text-red-400" /> Variance & Anomaly Detection
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Real-time AI monitoring of continuous HR operations to flag statistical variances across payroll, expenses, and compliance.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <RefreshCcw size={16} className="mr-2" /> Refresh Model
                    </Button>
                    <Button className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30">
                        <Bell size={16} className="mr-2" /> Alert Settings
                    </Button>
                </div>
            </div>

            {/* Smart Summary */}
            <div className="bg-gradient-to-r from-[#0D1928] to-[#131B2B] border border-red-500/20 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg shadow-red-900/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30 shrink-0">
                        <Sparkles size={24} className="text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Kaarya Security Context</h3>
                        <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-3xl">
                            Detected <strong className="text-red-400">2 Critical anomalies</strong> in the last 24 hours requiring immediate intervention. The primary issue concerns expired Right-to-Work documentation for 3 active contractors, which poses a severe compliance penalty risk.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                                <AlertTriangle size={14} /> 2 Critical
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-medium border border-amber-500/20">
                                <ShieldCheck size={14} /> 12 High Risk
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Scatter Plot - Anomaly Topography */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white font-semibold flex items-center gap-2">Anomaly Topography</h3>
                            <p className="text-[#8899AA] text-xs mt-1">Variance clustering by volume and financial impact</p>
                        </div>
                        <div className="flex gap-2">
                            {['All', 'Compliance', 'Payroll', 'Expense'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterCategory(cat === 'All' ? null : cat)}
                                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${(filterCategory === cat || (cat === 'All' && !filterCategory))
                                            ? 'bg-[#1A2A3A] text-white border-[#445566]'
                                            : 'bg-transparent text-[#8899AA] border-[#2A3A4A] hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[320px] w-full">
                        <ClientOnly>
                            <ChartWrapper height="h-full">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                                    <XAxis type="number" dataKey="x" name="Frequency" hide />
                                    <YAxis type="number" dataKey="y" name="Impact" hide />
                                    <ZAxis type="number" dataKey="z" range={[50, 400]} name="Volume" />
                                    <RechartsTooltip
                                        cursor={{ strokeDasharray: '3 3', stroke: '#2A3A4A' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg shadow-xl">
                                                        <p className="text-white text-sm font-semibold mb-1">{data.label}</p>
                                                        <p className="text-[#8899AA] text-xs mb-1">Type: {data.category}</p>
                                                        <p className="text-xs" style={{ color: getColor(data.severity) }}>Risk: {data.severity}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Scatter name="Anomalies" data={filteredData}>
                                        {filteredData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getColor(entry.severity)} fillOpacity={0.6} />
                                        ))}
                                    </Scatter>
                                </ScatterChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>

                {/* KPI Breakdown */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="text-white font-semibold mb-2">Category Status</h3>

                    <div className="bg-[#131B2B] p-4 rounded-xl border border-red-500/20">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm font-medium">Compliance</span>
                            <span className="text-red-400 text-xs font-bold bg-red-500/10 px-2 py-0.5 rounded">Critical</span>
                        </div>
                        <p className="text-[#8899AA] text-xs font-medium">3 active anomalies</p>
                    </div>

                    <div className="bg-[#131B2B] p-4 rounded-xl border border-amber-500/20">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm font-medium">Payroll</span>
                            <span className="text-amber-500 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded">High</span>
                        </div>
                        <p className="text-[#8899AA] text-xs font-medium">8 active anomalies</p>
                    </div>

                    <div className="bg-[#131B2B] p-4 rounded-xl border border-blue-500/20">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm font-medium">Expenses</span>
                            <span className="text-blue-400 text-xs font-bold bg-blue-500/10 px-2 py-0.5 rounded">Medium</span>
                        </div>
                        <p className="text-[#8899AA] text-xs font-medium">14 active anomalies</p>
                    </div>

                    <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm font-medium">Time & Attendance</span>
                            <span className="text-[#8899AA] text-xs font-bold bg-[#1A2A3A] px-2 py-0.5 rounded border border-[#2A3A4A]">Low</span>
                        </div>
                        <p className="text-[#8899AA] text-xs font-medium">5 active anomalies</p>
                    </div>

                </div>
            </div>

            {/* List Table */}
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-400" /> Active Alert Queue
            </h3>

            <div className="flex gap-4 mb-4">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-lg flex items-center px-3 py-2 flex-1 md:max-w-xs focus-within:border-red-500/50 transition-colors">
                    <Search size={16} className="text-[#8899AA]" />
                    <input type="text" placeholder="Search ID or description..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" />
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Alert ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Description</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Severity</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Confidence</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {[
                            { id: 'ANM-902', cat: 'Compliance', desc: 'Expired Visas formatting for 3 active contractors', sev: 'Critical', conf: 99 },
                            { id: 'ANM-891', cat: 'Payroll', desc: 'Tax calculation standard deviation > 3$\sigma$ vs historical', sev: 'High', conf: 94 },
                            { id: 'ANM-870', cat: 'Expense', desc: 'Duplicate claims submitted across consecutive months', sev: 'Medium', conf: 88 },
                        ].map((alert, i) => (
                            <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                <td className="px-6 py-4 text-sm font-medium text-white group-hover:text-red-400 transition-colors">{alert.id}</td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{alert.cat}</td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{alert.desc}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${alert.sev === 'Critical' ? 'bg-red-500/10 text-red-400' :
                                            alert.sev === 'High' ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {alert.sev}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-emerald-400 font-mono">{alert.conf}%</td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/ai/anomaly-detection/${alert.id}`}>
                                        <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-none text-xs py-1.5 px-3 h-auto">
                                            Investigate
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
