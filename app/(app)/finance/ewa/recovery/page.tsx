"use client";

import React from "react";
import Link from "next/link";
import {
    RefreshCw, ChevronRight, FileText, Download, CheckCircle2, AlertCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const RECOVERY_DATA = [
    { period: "May 2025", expected: 450000, recovered: 450000, unrecovered: 0 },
    { period: "Jun 2025", expected: 485000, recovered: 480000, unrecovered: 5000 },
    { period: "Jul 2025", expected: 510000, recovered: 510000, unrecovered: 0 },
    { period: "Aug 2025", expected: 490000, recovered: 475000, unrecovered: 15000 },
    { period: "Sep 2025", expected: 550000, recovered: 540000, unrecovered: 10000 },
];

const PENDING_DEDUCTIONS = [
    { emp: "Ananya S", id: "EMP-042", type: "EWA", amount: 15000, fee: 150, total: 15150, payroll_status: "Queued for OCT-2025" },
    { emp: "Rahul K", id: "EMP-091", type: "EWA", amount: 5000, fee: 50, total: 5050, payroll_status: "Queued for OCT-2025" },
    { emp: "Sneha R", id: "EMP-112", type: "Loan EMI", amount: 25000, fee: 0, total: 25000, payroll_status: "Queued for OCT-2025" },
];

export default function EWARecoveryScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/ewa" className="hover:text-white transition-colors">EWA</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Recovery Management</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <RefreshCw className="w-8 h-8 text-emerald-400" />
                        Repayment & Recovery
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Manage automated deductions from payroll for EWA and Loans</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                        Export Deduction Master
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        Sync to Payroll Engine
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-2">Collection Efficiency</h2>
                    <p className="text-xs text-[#8899AA] mb-6">Historical view of Expected vs Recovered amounts across payroll cycles</p>
                    <div className="h-64">
                        <ChartWrapper height="h-full">
                            <BarChart data={RECOVERY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`₹${value.toLocaleString()}`, "Amount"]}
                                />
                                <Bar dataKey="recovered" name="Recovered" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={32} />
                                <Bar dataKey="unrecovered" name="Unrecovered (FFS/Abscond)" stackId="a" fill="#EC4899" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Upcoming Payroll (Oct '25)</h2>

                    <div className="space-y-4 mb-8">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-[#8899AA]">Total EWA Deductions</span>
                                <span className="text-white font-bold">₹4,15,500</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-[#8899AA]">Total Loan EMIs</span>
                                <span className="text-white font-bold">₹1,25,000</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-[#8899AA]">Total Processing Fees</span>
                                <span className="text-amber-400 font-bold">₹4,155</span>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <div className="flex justify-between text-lg">
                                <span className="text-white font-bold">Total Recovery</span>
                                <span className="text-emerald-400 font-bold">₹5,44,655</span>
                            </div>
                            <p className="text-xs text-[#8899AA] mt-1 text-right">Across 112 employees</p>
                        </div>
                    </div>

                    <div className="bg-[#1A2A3A]/40 rounded-xl p-4 border border-[#2A3A4A] flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-white">Payroll Sync Status</h4>
                            <p className="text-xs text-[#8899AA] mt-1">Deduction master is ready to be pulled by the Payroll Engine for October processing.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#8899AA]" />
                        Line-level Deductions (Oct '25)
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Employee</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium text-right">Principal</th>
                                <th className="p-4 font-medium text-right">Fee / Interest</th>
                                <th className="p-4 font-medium text-right">Total Deduction</th>
                                <th className="p-4 font-medium text-center">Payroll Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {PENDING_DEDUCTIONS.map((deduction, idx) => (
                                <tr key={idx} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4">
                                        <div className="text-white font-medium">{deduction.emp}</div>
                                        <div className="text-[#8899AA] text-xs mt-0.5 font-mono">{deduction.id}</div>
                                    </td>
                                    <td className="p-4 text-[#8899AA]">{deduction.type}</td>
                                    <td className="p-4 text-right text-white">₹{deduction.amount.toLocaleString()}</td>
                                    <td className="p-4 text-right text-pink-400">₹{deduction.fee.toLocaleString()}</td>
                                    <td className="p-4 text-right text-emerald-400 font-bold">₹{deduction.total.toLocaleString()}</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex px-2 py-1 bg-amber-500/10 text-amber-500 rounded text-xs font-medium">
                                            {deduction.payroll_status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
