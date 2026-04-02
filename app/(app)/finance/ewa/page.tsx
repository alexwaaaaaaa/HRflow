"use client";

import React from "react";
import Link from "next/link";
import {
    Wallet, TrendingUp, History, Info, ChevronRight, AlertCircle, ArrowRight
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const WITHDRAWAL_HISTORY = [
    { id: "WTH-9291", date: "2025-10-12", amount: 15000, fee: 150, status: "Completed", cycle: "Oct 2025" },
    { id: "WTH-9102", date: "2025-09-05", amount: 8000, fee: 80, status: "Recovered", cycle: "Sep 2025" },
    { id: "WTH-8854", date: "2025-07-20", amount: 25000, fee: 250, status: "Recovered", cycle: "Jul 2025" },
];

const PAYCYCLE_PROJECTION = [
    { day: "1st", earned: 5000, available: 2500 },
    { day: "5th", earned: 25000, available: 12500 },
    { day: "10th", earned: 50000, available: 25000 },
    { day: "15th", earned: 75000, available: 37500 },
    { day: "20th", earned: 100000, available: 50000 },
    { day: "25th", earned: 125000, available: 62500 },
];

export default function EWADashboardScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Earned Wage Access</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Wallet className="w-8 h-8 text-[#00E5FF]" />
                        My On-Demand Salary
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Access your earned salary before payday. Flat fee of 1% per transaction.</p>
                </div>
                <Link href="/finance/ewa/withdraw" className="flex items-center gap-2 px-6 py-2.5 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] text-sm font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    Withdraw Salary
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Available Balance Card */}
                <div className="lg:col-span-1 bg-gradient-to-br from-[#0D1928] to-[#122235] border border-[#1A2A3A] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF] opacity-10 rounded-full blur-3xl -mr-20 -mt-20" />

                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-[#8899AA] text-sm font-medium">Available to Withdraw Now</p>
                            <div className="bg-[#00E5FF]/10 text-[#00E5FF] text-xs px-2 py-1 rounded font-medium">
                                Oct Pay Cycle
                            </div>
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-tight mb-2">₹37,500</h2>
                        <p className="text-sm text-[#8899AA] flex items-center gap-1">
                            <Info className="w-4 h-4" />
                            Based on 15 days of work (50% cap limit)
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#1A2A3A]">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-[#8899AA]">Total Salary Earned</span>
                            <span className="text-white font-medium">₹75,000</span>
                        </div>
                        <div className="w-full bg-[#1A2A3A] rounded-full h-2">
                            <div className="bg-[#00E5FF] h-2 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]" style={{ width: '50%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Accrual Chart */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-2">Salary Accrual Projection</h3>
                    <p className="text-xs text-[#8899AA] mb-6">See how your available withdrawal limit grows daily.</p>

                    <div className="h-64">
                        <ChartWrapper height="h-full">
                            <AreaChart data={PAYCYCLE_PROJECTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAvail" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`₹${value.toLocaleString()}`, "Amount"]}
                                />
                                <Area type="monotone" dataKey="available" name="Available Limit" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorAvail)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-xs text-[#8899AA] bg-amber-500/10 text-amber-500 p-3 rounded-lg border border-amber-500/20">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        Next payday is 1st of November. Any amounts withdrawn will be automatically deducted from your net pay.
                    </div>
                </div>
            </div>

            {/* Recent Withdrawals */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-[#1A2A3A] flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <History className="w-5 h-5 text-[#8899AA]" />
                        Recent Withdrawals
                    </h3>
                    <Link href="/finance/ewa/history" className="text-sm font-medium text-[#00E5FF] hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Transaction ID</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Pay Cycle</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                                <th className="p-4 font-medium text-right">Fee Deducted</th>
                                <th className="p-4 font-medium text-center">Recovery Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {WITHDRAWAL_HISTORY.map((txn) => (
                                <tr key={txn.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4 font-mono text-[#00E5FF]">{txn.id}</td>
                                    <td className="p-4 text-white font-medium">{txn.date}</td>
                                    <td className="p-4 text-[#8899AA]">{txn.cycle}</td>
                                    <td className="p-4 text-right text-white font-medium">₹{txn.amount.toLocaleString()}</td>
                                    <td className="p-4 text-right text-pink-400 font-medium">₹{txn.fee.toLocaleString()}</td>
                                    <td className="p-4 text-center">
                                        {txn.status === 'Completed' ? (
                                            <span className="inline-flex text-amber-400 bg-amber-400/10 px-2 py-1 rounded text-xs font-medium">Pending Auto-Deduction</span>
                                        ) : (
                                            <span className="inline-flex text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs font-medium">Recovered in Payroll</span>
                                        )}
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
