"use client";
import React from 'react';
import { GitCompare, ArrowLeft, Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Link from 'next/link';

const VARIANCES = [
    { item: 'Basic Salary', current: 21050000, previous: 20800000, var: 250000, pct: 1.2, r: 'Increments & New Joinees' },
    { item: 'HRA', current: 9550000, previous: 9400000, var: 150000, pct: 1.6, r: 'Increments & New Joinees' },
    { item: 'Special Allowance', current: 18000000, previous: 17800000, var: 200000, pct: 1.1, r: 'Restructuring' },
    { item: 'Performance Bonus', current: 3900000, previous: 1200000, var: 2700000, pct: 225.0, r: 'Quarterly Payout Cycle' },
    { item: 'Leave Encashment', current: 0, previous: 850000, var: -850000, pct: -100.0, r: 'Annual event completed in Feb' },
    { item: 'TDS Deduction', current: -7100000, previous: -6800000, var: -300000, pct: 4.4, r: 'Due to higher bonus payouts' },
];

export default function VarianceReportScreen() {
    const totalVar = 2050000;
    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/payroll/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Payroll Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><GitCompare size={22} className="text-pink-400" /> Payroll Variance Report</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Compare March 2026 payroll vs February 2026 payroll to audit changes</p>
                </div>
                <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Download size={16} /> Export Excel
                </button>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex justify-between items-center text-center">
                <div className="flex-1">
                    <div className="text-[#8899AA] text-sm font-bold mb-1">Previous (Feb 2026)</div>
                    <div className="text-xl font-bold text-white">₹4,32,00,000</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[#556677] font-black italic">VS</div>
                <div className="flex-1">
                    <div className="text-[#8899AA] text-sm font-bold mb-1">Current (Mar 2026)</div>
                    <div className="text-xl font-bold text-white">₹4,52,50,000</div>
                </div>
                <div className="flex-1 border-l border-[#1A2A3A] pl-8 text-left">
                    <div className="text-[#8899AA] text-sm font-bold mb-1">Net Variance</div>
                    <div className="flex items-center gap-2 text-2xl font-black text-pink-400">
                        <TrendingUp size={24} /> ₹20,50,000
                        <span className="text-sm px-2 py-0.5 bg-pink-500/10 rounded-lg">+4.7%</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="text-[#8899AA] text-xs uppercase tracking-wider bg-[#060D1A]">
                        <tr>
                            <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Component</th>
                            <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Feb 2026</th>
                            <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Mar 2026</th>
                            <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Variance (₹)</th>
                            <th className="px-5 py-4 text-center font-bold border-b border-[#1A2A3A]">Var (%)</th>
                            <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Remarks / Primary Driver</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {VARIANCES.map((v, i) => (
                            <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                <td className="px-5 py-4 font-semibold text-white">{v.item}</td>
                                <td className="px-5 py-4 text-right text-[#AABBCC]">₹{v.previous.toLocaleString()}</td>
                                <td className="px-5 py-4 text-right text-[#AABBCC]">₹{v.current.toLocaleString()}</td>
                                <td className="px-5 py-4 text-right text-white font-bold tracking-wide">
                                    {v.var > 0 ? '+' : ''}{v.var.toLocaleString()}
                                </td>
                                <td className="px-5 py-4 text-center">
                                    <div className={`flex items-center justify-center gap-1 font-bold ${v.pct > 0 ? 'text-pink-400' : v.pct < 0 ? 'text-emerald-400' : 'text-[#556677]'}`}>
                                        {v.pct > 0 ? <TrendingUp size={12} /> : v.pct < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
                                        {Math.abs(v.pct).toFixed(1)}%
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-[#8899AA] text-xs max-w-xs">{v.r}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
