"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    CalendarCheck, ChevronRight, Download, Filter, Palmtree, UserX
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LEAVE_DATA = [
    { dept: 'Engineering', 'Annual Leave': 450, 'Sick Leave': 120, 'Unpaid': 15 },
    { dept: 'Sales', 'Annual Leave': 320, 'Sick Leave': 90, 'Unpaid': 25 },
    { dept: 'Marketing', 'Annual Leave': 180, 'Sick Leave': 40, 'Unpaid': 5 },
    { dept: 'HR', 'Annual Leave': 80, 'Sick Leave': 20, 'Unpaid': 0 },
];

export default function LeaveUtilizationReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Leave Utilization</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <CalendarCheck className="w-8 h-8 text-emerald-400" />
                        Leave Utilization Report
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Analyze time-off trends, accrued liabilities, and absenteeism.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <Filter className="w-4 h-4" /> YTD (Jan - Mar)
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Total Leave Days Taken", value: "1,450", info: "YTD across all types", icon: CalendarCheck, color: "text-white" },
                    { label: "Avg. Sick Days/Emp", value: "1.8", info: "Within normal limits (benchmark: 2.1)", icon: UserX, color: "text-emerald-400" },
                    { label: "Accrued Leave Liability", value: "₹4.2M", info: "Equivalent cost of unavailed leaves", icon: Palmtree, color: "text-amber-500" },
                    { label: "High Absenteeism Rate", value: "2.4%", info: "Unplanned leave rate", icon: UserX, color: "text-pink-400" }
                ].map((kpi, idx) => (
                    <div key={idx} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                        <kpi.icon className={`absolute -right-4 -bottom-4 w-24 h-24 ${kpi.color} opacity-5 group-hover:scale-110 transition-transform`} />
                        <h3 className="text-[#8899AA] text-sm font-medium mb-2">{kpi.label}</h3>
                        <div className={`text-3xl font-bold mb-1 ${kpi.color}`}>{kpi.value}</div>
                        <p className="text-xs text-[#8899AA]">{kpi.info}</p>
                    </div>
                ))}
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-bold text-white mb-6">Leave Consumption by Department</h2>
                <div className="h-[400px] w-full">
                    <ChartWrapper height="h-full">
                        <BarChart data={LEAVE_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                            <XAxis dataKey="dept" stroke="#8899AA" fontSize={12} />
                            <YAxis stroke="#8899AA" fontSize={12} />
                            <Tooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }} />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="Annual Leave" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={40} />
                            <Bar dataKey="Sick Leave" stackId="a" fill="#F59E0B" />
                            <Bar dataKey="Unpaid" stackId="a" fill="#EC4899" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartWrapper>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center">
                    <h2 className="text-sm font-bold text-white">High Balance Alerts (&gt; 25 Days Unavailed)</h2>
                    <span className="text-xs text-[#8899AA] px-2 py-1 bg-[#1A2A3A] rounded border border-[#2A3A4A]">Encourage mandatory block leaves</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs">
                            <tr>
                                <th className="p-4 font-medium">Employee</th>
                                <th className="p-4 font-medium">Department</th>
                                <th className="p-4 font-medium">Annual Leave Balance</th>
                                <th className="p-4 font-medium text-right">Estimated Liability Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A] text-sm">
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4 text-white font-medium">Ramesh K</td>
                                <td className="p-4 text-[#8899AA]">Engineering</td>
                                <td className="p-4 text-amber-500 font-bold">42 Days</td>
                                <td className="p-4 text-right text-white">₹1,85,000</td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4 text-white font-medium">Swati Desai</td>
                                <td className="p-4 text-[#8899AA]">Sales</td>
                                <td className="p-4 text-amber-500 font-bold">38 Days</td>
                                <td className="p-4 text-right text-white">₹2,10,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
