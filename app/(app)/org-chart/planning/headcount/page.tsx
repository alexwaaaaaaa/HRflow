"use client";

import Page from "@/components/ui/Page";

import React from "react";
import Link from "next/link";
import {
    Users, ChevronRight, Save, Play, Plus, ArrowRight
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const FORECAST_DATA = [
    { month: 'Apr', current: 1200, planned: 1200 },
    { month: 'May', current: 1200, planned: 1215 },
    { month: 'Jun', current: 1200, planned: 1230 },
    { month: 'Jul', current: 1200, planned: 1245 },
    { month: 'Aug', current: 1200, planned: 1255 },
    { month: 'Sep', current: 1200, planned: 1280 },
    { month: 'Oct', current: 1200, planned: 1300 },
];

export default function HeadcountPlanningScreen() {
    return (
        <Page
            title="Headcount Planning"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Planning", href: "/org-chart/planning" }, { label: "Headcount" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Workforce</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <Users className="w-6 h-6 text-indigo-400" />
                        </div>
                        Headcount Planning
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] hover:bg-[#1A2A3A] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                        <Play className="w-4 h-4" /> Run Simulation
                    </button>
                    <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                        <Save className="w-4 h-4" /> Save Draft
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="col-span-1 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4">Planning Assumptions</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1">Target Attrition Rate (%)</label>
                                <input type="number" defaultValue="12" className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2 text-sm focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1">Avg Time to Fill (Days)</label>
                                <input type="number" defaultValue="45" className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2 text-sm focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1">Growth Target</label>
                                <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2 text-sm focus:border-indigo-500 outline-none">
                                    <option>Aggressive (+20%)</option>
                                    <option>Moderate (+10%)</option>
                                    <option>Conservative (Flat)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4">Summary Impact</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                <span className="text-sm text-[#8899AA]">Current HC</span>
                                <span className="text-sm font-bold text-white">1,200</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                <span className="text-sm text-[#8899AA]">Expected Attrition</span>
                                <span className="text-sm font-bold text-pink-500">- 144</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                <span className="text-sm text-[#8899AA]">New Hires Planned</span>
                                <span className="text-sm font-bold text-emerald-400">+ 244</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm font-bold text-white">Target HC (End of Year)</span>
                                <span className="text-lg font-bold text-indigo-400">1,300</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 h-64">
                        <h3 className="text-sm font-bold text-white mb-4">Headcount Projection</h3>
                        <ChartWrapper height="h-[85%]">
                            <AreaChart data={FORECAST_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" stroke="#8899AA" fontSize={11} />
                                <YAxis stroke="#8899AA" fontSize={11} domain={['dataMin - 50', 'dataMax + 50']} />
                                <Tooltip contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                <Area type="step" dataKey="current" stroke="#4A5A6A" fill="transparent" strokeWidth={2} name="Current Baseline" />
                                <Area type="monotone" dataKey="planned" stroke="#6366f1" fill="url(#colorPlanned)" strokeWidth={2} name="Planned Growth" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                            <h3 className="text-sm font-bold text-white">Department Drill-down</h3>
                            <button className="text-xs font-medium text-indigo-400 flex items-center gap-1"><Plus className="w-3 h-3" /> Add Dept Row</button>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-[#1A2A3A]/40 text-[#8899AA] text-xs">
                                <tr>
                                    <th className="p-3 font-medium border-b border-[#2A3A4A]">Department</th>
                                    <th className="p-3 font-medium border-b border-[#2A3A4A]">Current HC</th>
                                    <th className="p-3 font-medium border-b border-[#2A3A4A]">Q1 Add</th>
                                    <th className="p-3 font-medium border-b border-[#2A3A4A]">Q2 Add</th>
                                    <th className="p-3 font-medium border-b border-[#2A3A4A]">Net Change</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { dept: "Engineering", hc: 432, q1: 15, q2: 25 },
                                    { dept: "Sales & Rev", hc: 215, q1: 30, q2: 10 },
                                    { dept: "Customer Success", hc: 120, q1: 5, q2: 5 },
                                    { dept: "Product Mgt", hc: 56, q1: 2, q2: 3 },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-[#1A2A3A]/20 transition-colors">
                                        <td className="p-3 text-sm font-bold text-white">{row.dept}</td>
                                        <td className="p-3 text-sm text-[#8899AA]">{row.hc}</td>
                                        <td className="p-3"><input type="number" defaultValue={row.q1} className="w-16 bg-[#0B1221] border border-[#2A3A4A] text-white text-center rounded py-1 text-xs focus:border-indigo-500 outline-none" /></td>
                                        <td className="p-3"><input type="number" defaultValue={row.q2} className="w-16 bg-[#0B1221] border border-[#2A3A4A] text-white text-center rounded py-1 text-xs focus:border-indigo-500 outline-none" /></td>
                                        <td className="p-3 text-emerald-400 text-sm font-bold flex items-center gap-1"><ArrowRight className="w-3 h-3" /> +{row.q1 + row.q2}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
