"use client";
import React from 'react';
import { PieChart, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

const DEPARTMENTS = [
    { name: 'Engineering', code: 'CC-ENG', count: 145, amount: 24500000, color: 'bg-emerald-500' },
    { name: 'Sales', code: 'CC-SLS', count: 82, amount: 11200000, color: 'bg-blue-500' },
    { name: 'Marketing', code: 'CC-MKT', count: 45, amount: 4800000, color: 'bg-purple-500' },
    { name: 'Finance', code: 'CC-FIN', count: 35, amount: 3900000, color: 'bg-amber-500' },
    { name: 'Human Resources', code: 'CC-HR', count: 35, amount: 3100000, color: 'bg-rose-500' },
];

export default function CostCenterScreen() {
    const total = DEPARTMENTS.reduce((s, d) => s + d.amount, 0);

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/payroll/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Payroll Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><PieChart size={22} className="text-teal-400" /> Cost Center Report</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Payroll expense allocation by department & cost center for accounting entries.</p>
                </div>
                <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Download size={16} /> Tally/QuickBooks Export
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col justify-center">
                    <h3 className="text-white font-bold mb-6 text-center">Cost Allocation (March 2026)</h3>

                    <div className="space-y-4">
                        {DEPARTMENTS.map(d => {
                            const pct = (d.amount / total) * 100;
                            return (
                                <div key={d.code}>
                                    <div className="flex justify-between items-end mb-1">
                                        <div>
                                            <span className="text-white font-semibold text-sm mr-2">{d.name}</span>
                                            <span className="text-[#556677] text-[10px] bg-[#1A2A3A] px-1.5 py-0.5 rounded font-mono">{d.code}</span>
                                        </div>
                                        <span className="text-[#AABBCC] text-xs font-bold">₹{(d.amount / 100000).toFixed(2)}L</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                                            <div className={`h-full ${d.color} rounded-full`} style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="text-xs text-[#556677] w-10 text-right">{pct.toFixed(1)}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-48 h-48 rounded-full border-[16px] border-[#1A2A3A] flex items-center justify-center relative shadow-inner shadow-[#000]/50 mb-6">
                        <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-emerald-500 border-r-emerald-500 -rotate-45"></div>
                        <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-b-blue-500 border-l-blue-500 rotate-12"></div>
                        <div>
                            <div className="text-[#8899AA] text-[10px] uppercase font-bold tracking-wider mb-1">Total Payload</div>
                            <div className="text-2xl font-black text-white">₹{(total / 10000000).toFixed(2)} Cr</div>
                        </div>
                    </div>
                    <div className="text-[#8899AA] text-sm max-w-xs">
                        Export this consolidated report directly into your accounting software to map expenses automatically to general ledgers.
                    </div>
                </div>
            </div>
        </div>
    );
}
