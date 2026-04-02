"use client";

import React, { useState } from "react";
import { ArrowRightLeft, TrendingUp, TrendingDown, Minus, Download, Users, Wallet, CreditCard, Layers } from "lucide-react";

export default function PayrollComparisonPage() {
    const variances = [
        { id: 1, dept: 'Engineering', category: 'Basic Salary', current: '₹34,50,000', prev: '₹32,10,000', varAmount: '+₹2,40,000', varPercent: '+7.48%', trend: 'up' },
        { id: 2, dept: 'Sales', category: 'Incentives/Bonus', current: '₹8,25,000', prev: '₹4,10,000', varAmount: '+₹4,15,000', varPercent: '+101.2%', trend: 'up' }, // Huge jump
        { id: 3, dept: 'Marketing', category: 'Loss of Pay', current: '₹45,000', prev: '₹85,000', varAmount: '-₹40,000', varPercent: '-47.05%', trend: 'down' }, // Good, deduction reduced
        { id: 4, dept: 'Operations', category: 'Overtime', current: '₹1,20,000', prev: '₹1,20,000', varAmount: '₹0', varPercent: '0.00%', trend: 'flat' },
        { id: 5, dept: 'HR & Admin', category: 'Basic Salary', current: '₹8,50,000', prev: '₹8,80,000', varAmount: '-₹30,000', varPercent: '-3.40%', trend: 'down' }, // Exit
    ];

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center gap-2">
                            <ArrowRightLeft className="w-6 h-6 text-[#0066FF]" /> Payroll Month-over-Month Comparison
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Identify anomalies and validate variances before finalizing the current cycle.</p>
                    </div>
                    <div className="flex gap-3 text-sm">
                        <div className="flex items-center gap-2 bg-[#060B14] border border-[#1A2A3A] px-3 py-1.5 rounded-lg">
                            <span className="text-gray-400">Base:</span>
                            <select className="bg-transparent text-white outline-none font-medium appearance-none">
                                <option>Feb 2025</option>
                            </select>
                        </div>
                        <span className="flex items-center text-gray-500 font-bold px-1">VS</span>
                        <div className="flex items-center gap-2 bg-[#060B14] border border-[#1A2A3A] px-3 py-1.5 rounded-lg">
                            <span className="text-gray-400">Compare:</span>
                            <select className="bg-transparent text-white outline-none font-medium appearance-none">
                                <option>March 2025 (Draft)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Global KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#00E5A0]/30 transition-colors relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <p className="text-sm text-gray-400 font-medium">Headcount Processed</p>
                            <div className="p-1.5 bg-[#0066FF]/10 rounded-lg group-hover:bg-[#0066FF]/20 transition-colors"><Users className="w-4 h-4 text-[#0066FF]" /></div>
                        </div>
                        <div className="flex items-baseline gap-2 relative z-10">
                            <p className="text-3xl font-bold text-white">148</p>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm font-medium text-[#00E5A0] relative z-10">
                            <TrendingUp className="w-3.5 h-3.5" /> +5 <span className="text-gray-500 font-normal ml-1">(153 total)</span>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#FFB800]/30 transition-colors relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <p className="text-sm text-gray-400 font-medium">Total Gross Earnings</p>
                            <div className="p-1.5 bg-[#FFB800]/10 rounded-lg group-hover:bg-[#FFB800]/20 transition-colors"><Wallet className="w-4 h-4 text-[#FFB800]" /></div>
                        </div>
                        <div className="flex items-baseline gap-2 relative z-10">
                            <p className="text-3xl font-bold text-white">₹1.15 Cr</p>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm font-medium text-[#FFB800] relative z-10">
                            <TrendingUp className="w-3.5 h-3.5" /> +8.2% <span className="text-gray-500 font-normal ml-1">vs ₹1.06 Cr</span>
                        </div>
                        {/* Alert dot if variance > 5% */}
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#FF4444] animate-pulse"></div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#00E5A0]/30 transition-colors relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <p className="text-sm text-gray-400 font-medium">Total Deductions</p>
                            <div className="p-1.5 bg-[#FF4444]/10 rounded-lg group-hover:bg-[#FF4444]/20 transition-colors"><Layers className="w-4 h-4 text-[#FF4444]" /></div>
                        </div>
                        <div className="flex items-baseline gap-2 relative z-10">
                            <p className="text-3xl font-bold text-white">₹22.4 L</p>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm font-medium text-[#00E5A0] relative z-10">
                            <TrendingDown className="w-3.5 h-3.5" /> -1.5% <span className="text-gray-500 font-normal ml-1">vs ₹22.7 L</span>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#00E5A0]/30 transition-colors relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <p className="text-sm text-gray-400 font-medium">Net Payout</p>
                            <div className="p-1.5 bg-[#00E5A0]/10 rounded-lg group-hover:bg-[#00E5A0]/20 transition-colors"><CreditCard className="w-4 h-4 text-[#00E5A0]" /></div>
                        </div>
                        <div className="flex items-baseline gap-2 relative z-10">
                            <p className="text-3xl font-bold text-[#00E5A0]">₹92.6 L</p>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm font-medium text-[#00E5A0] relative z-10">
                            <TrendingUp className="w-3.5 h-3.5" /> +9.4% <span className="text-gray-500 font-normal ml-1">vs ₹84.6 L</span>
                        </div>
                    </div>

                </div>

                {/* Variance Table */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060B14]">
                        <h3 className="font-semibold text-white">Detailed Variance Breakdown</h3>
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-[#1A2A3A] rounded-lg text-sm hover:bg-[#1A2A3A] transition-colors">
                            <Download className="w-4 h-4 text-gray-400" /> Export Excel
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#0A1420] text-gray-400 border-b border-[#1A2A3A]">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Department</th>
                                    <th className="px-6 py-4 font-medium">Category Component</th>
                                    <th className="px-6 py-4 font-medium text-right bg-[#060B14]">March 25 (Curr)</th>
                                    <th className="px-6 py-4 font-medium text-right">Feb 25 (Prev)</th>
                                    <th className="px-6 py-4 font-medium text-right">Absolute Variance</th>
                                    <th className="px-6 py-4 font-medium text-right">% Variance</th>
                                    <th className="px-6 py-4 font-medium text-center w-16">Trend</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {variances.map((v) => {
                                    const absVal = v.varAmount.replace(/[\+\-]/g, '');
                                    const isHighVar = parseFloat(v.varPercent.replace(/[\+\-\%]/g, '')) > 20;

                                    return (
                                        <tr key={v.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                            <td className="px-6 py-4 text-gray-300 font-medium">{v.dept}</td>
                                            <td className="px-6 py-4 text-white font-medium">{v.category}</td>
                                            <td className="px-6 py-4 text-right font-mono font-bold bg-[#060B14]/50">{v.current}</td>
                                            <td className="px-6 py-4 text-right font-mono text-gray-400">{v.prev}</td>

                                            <td className={`px-6 py-4 text-right font-mono font-medium ${v.trend === 'up' && v.category !== 'Loss of Pay' ? 'text-[#FFB800]' : v.trend === 'down' && v.category === 'Loss of Pay' ? 'text-[#00E5A0]' : 'text-gray-300'}`}>
                                                {v.varAmount}
                                            </td>

                                            <td className="px-6 py-4 text-right font-medium relative">
                                                {isHighVar ? <span className="absolute left-2 top-4 w-1.5 h-1.5 rounded-full bg-[#FF4444]"></span> : null}
                                                <span className={`${v.trend === 'up' && v.category !== 'Loss of Pay' ? 'text-[#FFB800]' : v.trend === 'down' && v.category === 'Loss of Pay' ? 'text-[#00E5A0]' : 'text-gray-300'}`}>{v.varPercent}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className={`mx-auto w-6 h-6 rounded flex items-center justify-center ${v.trend === 'up' ? 'bg-[#FFB800]/10 text-[#FFB800]' : v.trend === 'down' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : 'bg-[#1A2A3A] text-gray-500'}`}>
                                                    {v.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : v.trend === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 bg-[#0a1420] border-t border-[#1A2A3A] text-xs text-gray-400 text-right">
                        Threshold alert configured at &gt;15% variance.
                    </div>
                </div>

            </div>
        </div>
    );
}
