"use client";

import React from "react";
import Link from "next/link";
import {
    Network, ChevronRight, Download, Filter, Users, ShieldAlert, ArrowUpRight
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const SPAN_DISTRIBUTION = [
    { span: '1-3', count: 45 },
    { span: '4-7', count: 120 },
    { span: '8-12', count: 65 },
    { span: '13-20', count: 15 },
    { span: '>20', count: 4 },
];

export default function SpanOfControlReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col h-screen overflow-hidden">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Reporting Lines</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <Network className="w-6 h-6 text-emerald-400" />
                        </div>
                        Span of Control Analysis
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white rounded-lg transition-colors text-sm font-medium">
                        <Filter className="w-4 h-4" /> Filter by Dept
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(16,185,129,0.3)]">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 flex-shrink-0">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Average Span (Company)</h3>
                    <div className="text-3xl font-bold text-white mb-2">1:6.8</div>
                    <p className="text-xs text-emerald-400">Target Range: 1:6 to 1:10</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Total People Managers</h3>
                    <div className="text-3xl font-bold text-white mb-2">249</div>
                    <p className="text-xs text-[#8899AA]">~20% of total workforce</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 border-l-4 border-l-amber-500">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Micro-managers (Span &lt; 3)</h3>
                    <div className="text-3xl font-bold text-amber-500 mb-2">45</div>
                    <p className="text-xs text-[#8899AA]">Potential organizational bloat</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 border-l-4 border-l-pink-500">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Overloaded (Span &gt; 15)</h3>
                    <div className="text-3xl font-bold text-pink-500 mb-2">19</div>
                    <p className="text-xs text-[#8899AA]">Burnout & bottleneck risk</p>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">

                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col min-h-0 overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-pink-500" /> Span Exceptions Flagged
                        </h3>
                    </div>
                    <div className="flex-1 overflow-auto custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-[#1A2A3A]/40 text-[#8899AA] text-xs sticky top-0 z-10">
                                <tr>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A]">Manager Name & Dept</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-center">Direct Reports</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A]">Exception Type</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A]">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { name: "Rahul Sharma", role: "VP Sales", dept: "Sales & Rev", span: 24, type: "Overloaded (> 15)", color: "pink" },
                                    { name: "Anita Desai", role: "Head of Customer Service", dept: "Customer Success", span: 18, type: "High (13-20)", color: "amber" },
                                    { name: "Suresh P.", role: "Engineering Manager", dept: "Engineering", span: 2, type: "Micro-span (< 3)", color: "indigo" },
                                    { name: "Kiran R.", role: "Marketing Director", dept: "Marketing", span: 22, type: "Overloaded (> 15)", color: "pink" },
                                    { name: "Vivek M.", role: "QA Lead", dept: "Engineering", span: 1, type: "Micro-span (< 3)", color: "indigo" },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-[#1A2A3A]/20 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={`https://i.pravatar.cc/150?u=mgr${idx}`} className="w-8 h-8 rounded-full" alt="mgr" />
                                                <div>
                                                    <div className="text-sm font-bold text-white">{row.name}</div>
                                                    <div className="text-[10px] text-[#8899AA]">{row.role} · {row.dept}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`text-lg font-bold font-mono ${row.color === 'pink' ? 'text-pink-500' : row.color === 'amber' ? 'text-amber-500' : 'text-indigo-400'}`}>
                                                {row.span}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-[#8899AA]">{row.type}</td>
                                        <td className="p-4">
                                            <Link href={`/org-chart/span-of-control/${idx}`} className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                                                Analyze <ArrowUpRight className="w-3 h-3" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col min-h-0 p-6">
                    <h3 className="text-sm font-bold text-white mb-6">Distribution of Control Span</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ChartWrapper height="h-full">
                            <AreaChart data={SPAN_DISTRIBUTION} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                <XAxis type="number" stroke="#8899AA" fontSize={11} />
                                <YAxis dataKey="span" type="category" stroke="#8899AA" fontSize={11} />
                                <Tooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="count" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-xs text-[#8899AA]">Optimal clustering observed between 4-12 direct reports.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
