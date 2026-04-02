"use client";
import React, { useState } from 'react';
import { BarChart2, ArrowLeft, Download, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const MONTHLY_DATA = [
    { month: 'Apr', medical: 42000, lta: 0, fuel: 18500, internet: 14400, other: 8200 },
    { month: 'May', medical: 31000, lta: 0, fuel: 22000, internet: 14400, other: 5600 },
    { month: 'Jun', medical: 55000, lta: 125000, fuel: 19500, internet: 14400, other: 7100 },
    { month: 'Jul', medical: 28000, lta: 0, fuel: 21000, internet: 14400, other: 6800 },
    { month: 'Aug', medical: 63000, lta: 0, fuel: 24000, internet: 14400, other: 9200 },
    { month: 'Sep', medical: 44000, lta: 220000, fuel: 18000, internet: 14400, other: 7500 },
    { month: 'Oct', medical: 38000, lta: 0, fuel: 20000, internet: 14400, other: 6200 },
    { month: 'Nov', medical: 52000, lta: 0, fuel: 23500, internet: 14400, other: 8900 },
    { month: 'Dec', medical: 71000, lta: 0, fuel: 26000, internet: 14400, other: 11200 },
    { month: 'Jan', medical: 45000, lta: 0, fuel: 19000, internet: 14400, other: 7300 },
    { month: 'Feb', medical: 39000, lta: 0, fuel: 22500, internet: 14400, other: 8100 },
    { month: 'Mar', medical: 28400, lta: 0, fuel: 17000, internet: 9000, other: 5200 },
];

export default function ReimbursementReportsScreen() {
    const total = MONTHLY_DATA.reduce((s, m) => s + m.medical + m.lta + m.fuel + m.internet + m.other, 0);
    const maxVal = Math.max(...MONTHLY_DATA.map(m => m.medical + m.lta + m.fuel + m.internet + m.other));

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/reimbursements/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Reimbursements</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><BarChart2 size={22} className="text-violet-400" /> Reimbursement Reports</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Monthly and annual summary of all reimbursement payouts across the organization</p>
                </div>
                <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Download size={16} /> Export Report
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                    { label: 'Medical', value: '₹5.36L', color: 'text-rose-400' },
                    { label: 'LTA', value: '₹3.45L', color: 'text-amber-400' },
                    { label: 'Fuel', value: '₹2.51L', color: 'text-blue-400' },
                    { label: 'Internet', value: '₹1.59L', color: 'text-teal-400' },
                    { label: 'Others', value: '₹0.91L', color: 'text-[#8899AA]' },
                ].map(card => (
                    <div key={card.label} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4 text-center">
                        <div className={`text-xl font-black ${card.color}`}>{card.value}</div>
                        <div className="text-xs text-[#8899AA] mt-1">{card.label} (YTD)</div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold">Monthly Payout — FY 2025-26</h3>
                    <div className="text-violet-400 font-black text-xl">₹{(total / 100000).toFixed(2)}L Total</div>
                </div>
                <div className="flex items-end gap-2 h-48">
                    {MONTHLY_DATA.map(m => {
                        const totalMonth = m.medical + m.lta + m.fuel + m.internet + m.other;
                        const pct = totalMonth / maxVal * 100;
                        return (
                            <div key={m.month} className="flex-1 flex flex-col items-center gap-1 group">
                                <div className="text-[10px] text-[#556677] opacity-0 group-hover:opacity-100 transition-opacity">₹{(totalMonth / 1000).toFixed(0)}k</div>
                                <div className="w-full rounded-t-lg overflow-hidden" style={{ height: `${pct * 1.7}px` }}>
                                    <div className="w-full h-full flex flex-col">
                                        <div style={{ flex: m.other / totalMonth }} className="bg-[#8899AA]/40" />
                                        <div style={{ flex: m.internet / totalMonth }} className="bg-teal-500/60" />
                                        <div style={{ flex: m.fuel / totalMonth }} className="bg-blue-500/60" />
                                        <div style={{ flex: m.lta / totalMonth }} className="bg-amber-500/70" />
                                        <div style={{ flex: m.medical / totalMonth }} className="bg-rose-500/70" />
                                    </div>
                                </div>
                                <span className="text-[10px] text-[#556677]">{m.month}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                    {[['bg-rose-500/70', 'Medical'], ['bg-amber-500/70', 'LTA'], ['bg-blue-500/60', 'Fuel'], ['bg-teal-500/60', 'Internet'], ['bg-[#8899AA]/40', 'Others']].map(([cls, label]) => (
                        <div key={label} className="flex items-center gap-1.5 text-xs text-[#8899AA]">
                            <div className={`w-3 h-3 rounded-sm ${cls}`} />
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#060D1A] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Month</th>
                                <th className="px-5 py-3 text-right font-bold border-b border-[#1A2A3A]">Medical</th>
                                <th className="px-5 py-3 text-right font-bold border-b border-[#1A2A3A]">LTA</th>
                                <th className="px-5 py-3 text-right font-bold border-b border-[#1A2A3A]">Fuel</th>
                                <th className="px-5 py-3 text-right font-bold border-b border-[#1A2A3A]">Internet</th>
                                <th className="px-5 py-3 text-right font-bold border-b border-[#1A2A3A]">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {MONTHLY_DATA.map(m => {
                                const total = m.medical + m.lta + m.fuel + m.internet + m.other;
                                return (
                                    <tr key={m.month} className="hover:bg-[#131B2B] transition-colors">
                                        <td className="px-5 py-3 text-white font-semibold">{m.month} 2026</td>
                                        <td className="px-5 py-3 text-right text-rose-400">₹{m.medical.toLocaleString()}</td>
                                        <td className="px-5 py-3 text-right text-amber-400">₹{m.lta.toLocaleString()}</td>
                                        <td className="px-5 py-3 text-right text-blue-400">₹{m.fuel.toLocaleString()}</td>
                                        <td className="px-5 py-3 text-right text-teal-400">₹{m.internet.toLocaleString()}</td>
                                        <td className="px-5 py-3 text-right text-white font-bold">₹{total.toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
