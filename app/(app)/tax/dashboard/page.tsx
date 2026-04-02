"use client";

import React, { useState } from 'react';
import { TrendingUp, Users, FileText, Shield, FileCheck, RefreshCw, Upload, Search, Bell, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

// Mock Data
const collectionData = [
    { month: 'Apr', actual: 582000, projected: null },
    { month: 'May', actual: 590000, projected: null },
    { month: 'Jun', actual: 605000, projected: null },
    { month: 'Jul', actual: 612000, projected: null },
    { month: 'Aug', actual: 628000, projected: null },
    { month: 'Sep', actual: 635000, projected: null },
    { month: 'Oct', actual: 582000, projected: null },
    { month: 'Nov', actual: 645000, projected: null },
    { month: 'Dec', actual: null, projected: 650000 },
    { month: 'Jan', actual: null, projected: 660000 },
    { month: 'Feb', actual: null, projected: 670000 },
    { month: 'Mar', actual: null, projected: 700000 },
];

const pieData = [
    { name: 'Old Regime', value: 218, color: '#0066FF' },
    { name: 'New Regime', value: 126, color: '#00E5A0' },
];

const dashboardStats = [
    {
        title: "Total TDS Deducted (FY)",
        value: "₹68,42,800",
        subtext: "₹6,45,800 this month (Nov)",
        icon: TrendingUp,
        iconColor: "text-[#00E5A0]",
        progress: 58,
        progressColor: "bg-[#00E5A0]"
    },
    {
        title: "Employees Covered",
        value: "344",
        subtext: "Old Regime: 218 | New Regime: 126",
        icon: Users,
        iconColor: "text-[#0066FF]",
        progress: 100,
        progressColor: "bg-[#0066FF]",
        split: { val1: 63.4, val2: 36.6 }
    },
    {
        title: "Declarations Received",
        value: "291/344",
        subtext: "53 employees yet to declare",
        icon: FileText,
        iconColor: "text-[#FFB800]",
        progress: 84.6,
        progressColor: "bg-[#FFB800]"
    },
    {
        title: "Challan Status",
        value: "Q2 Filed",
        valueColor: "text-[#00E5A0]",
        subtext: "Q3 due: 15/01/2025 (47 days)",
        icon: Shield,
        iconColor: "text-[#00E5A0]",
        progress: 100,
        progressColor: "bg-[#00E5A0]"
    }
];

export default function TDSDashboard() {
    const [selectedFY, setSelectedFY] = useState('2024-25');

    return (
        <div className="p-6 max-w-[1200px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Tax & TDS Dashboard</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage FY {selectedFY} TDS deductions, declarations, and compliance</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                        PS
                    </div>
                    <select
                        value={selectedFY}
                        onChange={(e) => setSelectedFY(e.target.value)}
                        className="bg-[#0D1928] border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00E5A0]"
                    >
                        <option value="2024-25">FY 2024-25</option>
                        <option value="2023-24">FY 2023-24</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
                {dashboardStats.map((stat, idx) => (
                    <div key={idx} className="bg-[#0A1420] border border-slate-800 rounded-xl p-5 hover:scale-[1.02] hover:border-slate-700 transition-all duration-200 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg bg-[#0D1928] ${stat.iconColor}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
                            <h3 className={`text-2xl font-bold ${stat.valueColor || 'text-white'}`}>
                                {stat.value}
                                {stat.title === "Challan Status" && <CheckCircle2 className="inline ml-2 text-[#00E5A0]" size={20} />}
                            </h3>
                            <p className={`text-xs mt-2 ${stat.title === 'Challan Status' || stat.title === 'Employees Covered' ? 'text-slate-400' : stat.iconColor}`}>
                                {stat.subtext}
                            </p>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                            {stat.split ? (
                                <>
                                    <div className="bg-[#0066FF] h-full" style={{ width: `${stat.split.val1}%` }}></div>
                                    <div className="bg-[#00E5A0] h-full" style={{ width: `${stat.split.val2}%` }}></div>
                                </>
                            ) : (
                                <div className={`${stat.progressColor} h-full rounded-full`} style={{ width: `${stat.progress}%` }}></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Row 2: Charts */}
            <div className="grid grid-cols-12 gap-6">
                {/* Monthly Trend */}
                <div className="col-span-8 bg-[#0A1420] border border-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-6">Monthly TDS Deducted — FY {selectedFY}</h3>
                    <div className="h-[240px]">
                        <ChartWrapper height="h-[300px]">
                            <AreaChart data={collectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8899AA" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8899AA" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val / 100000}L`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                    itemStyle={{ color: '#E2E8F0' }}
                                    formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Amount']}
                                />
                                <Area type="monotone" dataKey="actual" stroke="#0066FF" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                                <Area type="monotone" dataKey="projected" stroke="#8899AA" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorProjected)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                    <div className="flex justify-center mt-4 space-x-6 text-sm text-slate-400">
                        <div className="flex items-center"><div className="w-3 h-3 bg-[#0066FF] rounded-sm mr-2"></div> Actual TDS</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-[#8899AA] rounded-sm mr-2 border border-dashed border-[#8899AA]"></div> Projected TDS</div>
                    </div>
                </div>

                {/* Liability Clock */}
                <div className="col-span-4 bg-[#0A1420] border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
                    <h3 className="text-lg font-semibold text-white">Annual Tax Liability Coverage</h3>
                    <div className="flex-grow flex items-center justify-center relative">
                        {/* Custom SVG Gauge (easier to control than Recharts Radial for exactly this design) */}
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="80" fill="none" stroke="#1A2A3A" strokeWidth="16" />
                                <circle cx="96" cy="96" r="80" fill="none" stroke="#00E5A0" strokeWidth="16" strokeDasharray="502" strokeDashoffset="85" className="transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-white drop-shadow-md">83%</span>
                                <span className="text-xs text-[#00E5A0] font-medium mt-1">Covered</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-4">
                        <p className="text-sm text-slate-300">₹1,36,800 remaining</p>
                        <p className="text-xs text-[#00E5A0]">4 months left</p>
                    </div>
                    <div className="space-y-2 mt-2 pt-4 border-t border-slate-800">
                        <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div><span className="text-slate-300">Under-deducted</span></div>
                            <span className="font-medium text-white">22 emp</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#FFB800] mr-2"></div><span className="text-slate-300">Over-deducted</span></div>
                            <span className="font-medium text-white">8 emp</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#00E5A0] mr-2"></div><span className="text-slate-300">On track</span></div>
                            <span className="font-medium text-white">314 emp</span>
                        </div>
                        <Link href="/tax/computation-detail" className="block text-xs text-[#0066FF] hover:text-blue-400 text-center mt-3 font-medium cursor-pointer">
                            View Details →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Row 3: Status & Timeline */}
            <div className="grid grid-cols-12 gap-6">
                {/* Declaration Status */}
                <div className="col-span-6 bg-[#0A1420] border border-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Declaration Status</h3>
                    <div className="space-y-1">
                        <div className="flex justify-between items-center p-3 hover:bg-[#0D1928] rounded-lg transition-colors border-b border-slate-800">
                            <div className="flex items-center space-x-3">
                                <CheckCircle2 size={18} className="text-[#00E5A0]" />
                                <span className="text-slate-300 text-sm">Declarations Submitted</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="bg-[#00E5A0]/10 text-[#00E5A0] px-2 py-0.5 rounded text-xs font-medium">291 emp</span>
                                <Link href="/tax/declarations" className="text-[#0066FF] text-xs hover:underline w-16 text-right cursor-pointer">View →</Link>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 hover:bg-[#0D1928] rounded-lg transition-colors border-b border-slate-800">
                            <div className="flex items-center space-x-3">
                                <Clock size={18} className="text-[#FFB800]" />
                                <span className="text-slate-300 text-sm">Declarations Pending</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="bg-[#FFB800]/10 text-[#FFB800] px-2 py-0.5 rounded text-xs font-medium">53 emp</span>
                                <button className="text-[#0066FF] text-xs hover:underline w-16 text-right">Remind →</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 hover:bg-[#0D1928] rounded-lg transition-colors border-b border-slate-800">
                            <div className="flex items-center space-x-3">
                                <Upload size={18} className="text-[#0066FF]" />
                                <span className="text-slate-300 text-sm">Proofs Uploaded</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="bg-[#0066FF]/10 text-[#0066FF] px-2 py-0.5 rounded text-xs font-medium">218 emp</span>
                                <Link href="/tax/proofs/upload" className="text-[#0066FF] text-xs hover:underline w-16 text-right cursor-pointer">Review →</Link>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 hover:bg-[#0D1928] rounded-lg transition-colors border-b border-slate-800">
                            <div className="flex items-center space-x-3">
                                <Search size={18} className="text-indigo-400" />
                                <span className="text-slate-300 text-sm">Proofs Under Review</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="bg-indigo-400/10 text-indigo-400 px-2 py-0.5 rounded text-xs font-medium">34 emp</span>
                                <Link href="/tax/verification" className="text-[#0066FF] text-xs hover:underline w-16 text-right cursor-pointer">Process →</Link>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 hover:bg-[#0D1928] rounded-lg transition-colors">
                            <div className="flex items-center space-x-3">
                                <AlertCircle size={18} className="text-red-500" />
                                <span className="text-slate-300 text-sm">Proofs Rejected</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-xs font-medium">12 emp</span>
                                <button className="text-[#0066FF] text-xs hover:underline w-16 text-right">Notify →</button>
                            </div>
                        </div>
                    </div>
                    <button className="mt-4 w-full bg-[#00E5A0]/10 text-[#00E5A0] hover:bg-[#00E5A0]/20 font-medium py-2.5 rounded-lg border border-[#00E5A0]/20 transition-colors text-sm flex items-center justify-center">
                        <Bell size={16} className="mr-2" />
                        Send Bulk Reminder to 53 employees
                    </button>
                </div>

                {/* Compliance Timeline */}
                <div className="col-span-6 bg-[#0A1420] border border-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Upcoming TDS Deadlines</h3>
                    <div className="relative pl-6 space-y-6">
                        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-800"></div>

                        <div className="relative">
                            <div className="absolute -left-[28px] top-0.5 w-4 h-4 rounded-full bg-[#00E5A0] border-4 border-[#0A1420]"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-medium bg-[#0D1928] text-slate-300 px-2 py-1 rounded">Oct 15</span>
                                        <span className="text-sm font-medium text-white">Q2 TDS Challan filed</span>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-[#00E5A0] flex items-center"><CheckCircle2 size={14} className="mr-1" /> Completed</span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[28px] top-0.5 w-4 h-4 rounded-full bg-[#00E5A0] border-4 border-[#0A1420]"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-medium bg-[#0D1928] text-slate-300 px-2 py-1 rounded">Oct 31</span>
                                        <span className="text-sm font-medium text-white">Q2 24Q Return filed</span>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-[#00E5A0] flex items-center"><CheckCircle2 size={14} className="mr-1" /> Completed</span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[28px] top-0.5 w-4 h-4 rounded-full bg-[#FFB800] border-4 border-[#0A1420] animate-pulse"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-medium bg-[#FFB800]/20 text-[#FFB800] px-2 py-1 rounded border border-[#FFB800]/30">Nov 30</span>
                                        <span className="text-sm font-bold text-white">Nov TDS Challan</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded animate-pulse">5 days left</span>
                            </div>
                        </div>

                        <div className="relative opacity-60">
                            <div className="absolute -left-[28px] top-0.5 w-4 h-4 rounded-full bg-slate-600 border-4 border-[#0A1420]"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-medium bg-[#0D1928] text-slate-400 px-2 py-1 rounded">Jan 15</span>
                                        <span className="text-sm font-medium text-white">Q3 TDS Challan</span>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-slate-400">Upcoming</span>
                            </div>
                        </div>

                        <div className="relative opacity-60">
                            <div className="absolute -left-[28px] top-0.5 w-4 h-4 rounded-full bg-slate-600 border-4 border-[#0A1420]"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-medium bg-[#0D1928] text-slate-400 px-2 py-1 rounded">Jan 31</span>
                                        <span className="text-sm font-medium text-white">Q3 24Q Return</span>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-slate-400">Upcoming</span>
                            </div>
                        </div>

                        <div className="relative opacity-60">
                            <div className="absolute -left-[28px] top-0.5 w-4 h-4 rounded-full bg-slate-600 border-4 border-[#0A1420]"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-medium bg-[#0D1928] text-slate-400 px-2 py-1 rounded">May 31</span>
                                        <span className="text-sm font-medium text-white">Form 16 Issuance <span className="text-xs bg-[#0D1928] px-1.5 py-0.5 rounded ml-2">FY 24-25</span></span>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-slate-400">Upcoming</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Row 4: Regime & Actions */}
            <div className="grid grid-cols-12 gap-6">
                {/* Regime Split */}
                <div className="col-span-7 bg-[#0A1420] border border-slate-800 rounded-xl p-6 shadow-lg flex items-center">
                    <div className="w-1/3 flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-white mb-2 self-start">Tax Regime Split</h3>
                        <div className="h-[160px] w-full relative">
                            <ChartWrapper height="h-[300px]">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </PieChart>
                            </ChartWrapper>
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none pb-2">
                                <span className="text-xl font-bold text-white">344</span>
                                <span className="text-[10px] text-slate-400">Total</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 pl-6 border-l border-slate-800">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-800">
                                    <th className="text-left font-medium text-slate-400 pb-2">Metric</th>
                                    <th className="text-right font-medium text-[#0066FF] pb-2">Old Regime <span className="text-xs font-normal text-slate-500">(218)</span></th>
                                    <th className="text-right font-medium text-[#00E5A0] pb-2">New Regime <span className="text-xs font-normal text-slate-500">(126)</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                <tr>
                                    <td className="py-3 text-slate-300">Avg Annual Tax</td>
                                    <td className="py-3 text-right text-white font-medium">₹1,42,400</td>
                                    <td className="py-3 text-right text-white font-medium">₹98,600</td>
                                </tr>
                                <tr>
                                    <td className="py-3 text-slate-300">Avg Monthly TDS</td>
                                    <td className="py-3 text-right text-white font-medium">₹11,867</td>
                                    <td className="py-3 text-right text-white font-medium">₹8,217</td>
                                </tr>
                                <tr>
                                    <td className="py-3 text-slate-300">Proof Required</td>
                                    <td className="py-3 text-right text-[#FFB800] font-medium">Yes</td>
                                    <td className="py-3 text-right text-slate-400 font-medium">No</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="mt-4 text-right">
                            <Link href="/tax/regime-comparison" className="text-sm text-[#0066FF] hover:underline cursor-pointer font-medium">
                                Regime Comparison Report →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="col-span-5 bg-[#0A1420] border border-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/tax/computation-detail" className="flex items-center p-3 sm:px-4 rounded-lg bg-[#0D1928] border border-slate-800 hover:bg-[#1A2A3A] hover:border-slate-600 transition-all group cursor-pointer">
                            <div className="bg-blue-500/10 p-2 rounded-md mr-3 group-hover:bg-blue-500/20 transition-colors">
                                <FileCheck size={18} className="text-blue-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-200 group-hover:text-white">Run TDS Computation</span>
                        </Link>
                        <Link href="/tax/form-16/bulk" className="flex items-center p-3 sm:px-4 rounded-lg bg-[#0D1928] border border-slate-800 hover:bg-[#1A2A3A] hover:border-slate-600 transition-all group cursor-pointer">
                            <div className="bg-indigo-500/10 p-2 rounded-md mr-3 group-hover:bg-indigo-500/20 transition-colors">
                                <FileText size={18} className="text-indigo-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-200 group-hover:text-white">Generate Form 16</span>
                        </Link>
                        <Link href="/tax/challan" className="flex items-center p-3 sm:px-4 rounded-lg bg-[#0D1928] border border-slate-800 hover:bg-[#1A2A3A] hover:border-slate-600 transition-all group cursor-pointer">
                            <div className="bg-[#00E5A0]/10 p-2 rounded-md mr-3 group-hover:bg-[#00E5A0]/20 transition-colors">
                                <Shield size={18} className="text-[#00E5A0]" />
                            </div>
                            <span className="text-sm font-medium text-slate-200 group-hover:text-white">File TDS Challan</span>
                        </Link>
                        <Link href="/tax/proofs/upload" className="flex items-center p-3 sm:px-4 rounded-lg bg-[#0D1928] border border-slate-800 hover:bg-[#1A2A3A] hover:border-slate-600 transition-all group cursor-pointer">
                            <div className="bg-purple-500/10 p-2 rounded-md mr-3 group-hover:bg-purple-500/20 transition-colors">
                                <Upload size={18} className="text-purple-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-200 group-hover:text-white">Upload Investment Proofs</span>
                        </Link>
                        <Link href="/tax/returns-24q" className="flex items-center p-3 sm:px-4 rounded-lg bg-[#0D1928] border border-slate-800 hover:bg-[#1A2A3A] hover:border-slate-600 transition-all group cursor-pointer">
                            <div className="bg-orange-500/10 p-2 rounded-md mr-3 group-hover:bg-orange-500/20 transition-colors">
                                <RefreshCw size={18} className="text-orange-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-200 group-hover:text-white">View 24Q Return</span>
                        </Link>
                        <Link href="/tax/ais-reconciliation" className="flex items-center p-3 sm:px-4 rounded-lg bg-[#0D1928] border border-slate-800 hover:bg-[#1A2A3A] hover:border-slate-600 transition-all group cursor-pointer">
                            <div className="bg-pink-500/10 p-2 rounded-md mr-3 group-hover:bg-pink-500/20 transition-colors">
                                <CheckCircle2 size={18} className="text-pink-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-200 group-hover:text-white">AIS Reconciliation</span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}
