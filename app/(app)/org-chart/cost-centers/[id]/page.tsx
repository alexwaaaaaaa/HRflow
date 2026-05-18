"use client";

import Page from "@/components/ui/Page";
import Image from "next/image";

import React from "react";
import Link from "next/link";
import {
    Wallet, ChevronRight, Edit, Users, Activity, Building2, Download
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const BUDGET_DATA = [
    { month: 'Apr', projected: 2.5, actual: 2.4 },
    { month: 'May', projected: 5.0, actual: 4.8 },
    { month: 'Jun', projected: 7.5, actual: 7.6 },
    { month: 'Jul', projected: 10.0, actual: 10.1 },
    { month: 'Aug', projected: 12.5, actual: 12.8 },
    { month: 'Sep', projected: 15.0, actual: 15.2 },
    { month: 'Oct', projected: 17.5, actual: 18.0 },
    { month: 'Nov', projected: 20.0, actual: 19.8 },
    { month: 'Dec', projected: 22.5, actual: 23.5 },
];

export default function CostCenterDetailScreen() {
    return (
        <Page
            title="R&D Software BLR"
            subtitle="Core engineering development node in Bangalore."
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Cost Centers", href: "/org-chart/cost-centers" }, { label: "Id" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col h-screen overflow-hidden">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/org-chart/cost-centers" className="hover:text-white transition-colors">Cost Centers</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">CC-1021</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 font-bold font-mono text-xl">
                            1021
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                                R&D Software BLR
                                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs font-semibold tracking-wider uppercase">Active</span>
                            </h1>
                            <p className="text-sm text-[#8899AA] mt-1">Core engineering development node in Bangalore.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] hover:bg-[#1A2A3A] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export Ledger
                    </button>
                    <button className="px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white text-sm font-semibold rounded-lg border border-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Edit className="w-4 h-4" /> Edit Cost Center
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">

                {/* Left Column */}
                <div className="col-span-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-8">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Wallet className="w-4 h-4 text-emerald-400" /> Budget Overview (FY 25-26)
                        </h3>
                        <div className="text-4xl font-bold text-white mb-1">₹38.2 <span className="text-xl text-[#8899AA] font-normal">Cr</span></div>
                        <p className="text-xs text-[#8899AA] mb-6">Total Annual Allocation</p>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899AA]">Utilized (Actuals)</span>
                                    <span className="text-emerald-400 font-bold">₹23.5 Cr (61%)</span>
                                </div>
                                <div className="h-2 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '61%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899AA]">Committed (Unpaid)</span>
                                    <span className="text-amber-500 font-bold">₹4.2 Cr (11%)</span>
                                </div>
                                <div className="h-2 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '11%' }}></div>
                                </div>
                            </div>
                            <div className="pt-4 mt-2 border-t border-[#1A2A3A] flex justify-between">
                                <span className="text-sm font-medium text-white">Remaining Balance</span>
                                <span className="text-sm font-bold text-emerald-400">₹10.5 Cr</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4 text-indigo-400" /> Ownership & Structure
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-center bg-[#1A2A3A]/40 p-3 rounded-xl border border-[#2A3A4A]">
                                <Image src="https://i.pravatar.cc/150?u=2" alt="Owner" className="w-10 h-10 rounded-full" width={40} height={40} />
                                <div>
                                    <p className="text-[10px] text-[#8899AA] font-medium uppercase tracking-wider mb-0.5">Budget Owner</p>
                                    <h4 className="text-white text-sm font-bold">Maya Patel</h4>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#1A2A3A]/40 p-3 rounded-xl border border-[#2A3A4A]">
                                    <p className="text-[10px] text-[#8899AA] font-medium uppercase mb-1">Entity</p>
                                    <p className="text-xs text-white">HRflow India Pvt Ltd</p>
                                </div>
                                <div className="bg-[#1A2A3A]/40 p-3 rounded-xl border border-[#2A3A4A]">
                                    <p className="text-[10px] text-[#8899AA] font-medium uppercase mb-1">Parent CC</p>
                                    <p className="text-xs text-indigo-400 cursor-pointer hover:underline">CC-9001</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-span-2 flex flex-col gap-6 min-h-0">

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 h-72 flex flex-col flex-shrink-0">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-400" /> Budget Burn Rate (YTD Cumulative)
                        </h3>
                        <div className="flex-1 w-full min-h-0">
                            <ChartWrapper height="h-full">
                                <AreaChart data={BUDGET_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="month" stroke="#8899AA" fontSize={12} />
                                    <YAxis stroke="#8899AA" fontSize={12} tickFormatter={(val) => `₹${val}Cr`} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                                    <Area type="monotone" dataKey="projected" name="Linear Projection" stroke="#6366f1" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorProjected)" />
                                    <Area type="monotone" dataKey="actual" name="Actual Spend" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col flex-1 min-h-0 overflow-hidden">
                        <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-indigo-400" /> Tagged Departments
                            </h3>
                            <button className="text-xs font-medium text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-md hover:bg-emerald-500/10 transition-colors">Manage Mappings</button>
                        </div>
                        <div className="flex-1 overflow-auto custom-scrollbar">
                            <table className="w-full text-left">
                                <thead className="bg-[#1A2A3A]/40 text-[#8899AA] text-xs sticky top-0 z-10">
                                    <tr>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">Department</th>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">Headcount</th>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">YTD Payroll Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    <tr className="hover:bg-[#1A2A3A]/20 transition-colors cursor-pointer">
                                        <td className="p-4">
                                            <div className="text-sm font-medium text-white">Engineering</div>
                                            <div className="text-[10px] text-[#8899AA] font-mono mt-0.5">DEPT-001</div>
                                        </td>
                                        <td className="p-4 text-[#8899AA] text-sm">215 <span className="text-[10px]">active</span></td>
                                        <td className="p-4 font-medium text-white">₹18.4 Cr</td>
                                    </tr>
                                    <tr className="hover:bg-[#1A2A3A]/20 transition-colors cursor-pointer">
                                        <td className="p-4">
                                            <div className="text-sm font-medium text-white">Product Mgt</div>
                                            <div className="text-[10px] text-[#8899AA] font-mono mt-0.5">DEPT-003</div>
                                        </td>
                                        <td className="p-4 text-[#8899AA] text-sm">45 <span className="text-[10px]">active</span></td>
                                        <td className="p-4 font-medium text-white">₹5.1 Cr</td>
                                    </tr>
                                    <tr className="hover:bg-[#1A2A3A]/20 transition-colors cursor-pointer">
                                        <td className="p-4">
                                            <div className="text-sm font-medium text-white">Design & UX</div>
                                            <div className="text-[10px] text-[#8899AA] font-mono mt-0.5">DEPT-012</div>
                                        </td>
                                        <td className="p-4 text-[#8899AA] text-sm">50 <span className="text-[10px]">active</span></td>
                                        <td className="p-4 font-medium text-white">₹4.8 Cr</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
    );
}
