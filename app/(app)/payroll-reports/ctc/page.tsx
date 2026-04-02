"use client";
import React, { useState } from 'react';
import { Layers, ArrowLeft, Download, Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const EMPLOYEES = [
    { id: 'EMP-001', name: 'Anita Kulkarni', dept: 'Engineering', fixed: 2400000, flexi: 480000, retiral: 156000, variable: 300000, totalCTC: 3336000 },
    { id: 'EMP-042', name: 'Rahul Sharma', dept: 'Sales', fixed: 1200000, flexi: 240000, retiral: 78000, variable: 600000, totalCTC: 2118000 },
    { id: 'EMP-089', name: 'Meena Joshi', dept: 'Finance', fixed: 1800000, flexi: 360000, retiral: 117000, variable: 150000, totalCTC: 2427000 },
    { id: 'EMP-121', name: 'Karan Singh', dept: 'Sales', fixed: 900000, flexi: 180000, retiral: 58500, variable: 450000, totalCTC: 1588500 },
];

export default function CTCReportScreen() {
    const [search, setSearch] = useState('');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <Link href="/payroll/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Payroll Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Layers size={22} className="text-blue-400" /> CTC & Compensation Report</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Detailed breakdown of company liability (Fixed, Flexi, Retirals, and Variable)</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Download size={16} /> Export to Excel
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Total CTC (Annualized)</div>
                    <div className="text-3xl font-black text-blue-400">₹9.46 Cr</div>
                    <div className="text-xs text-[#556677] mt-1">Across 342 active employees</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 col-span-3 flex items-center gap-8">
                    {[
                        { label: 'Fixed Base', val: '65%', amt: '₹6.15 Cr' },
                        { label: 'Flexi (FBP)', val: '15%', amt: '₹1.42 Cr' },
                        { label: 'Retirals (PF/Gratuity)', val: '6%', amt: '₹0.56 Cr' },
                        { label: 'Variable / Bonus', val: '14%', amt: '₹1.33 Cr' },
                    ].map((c, i) => (
                        <div key={i} className="flex-1">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-white font-bold">{c.val}</span>
                                <span className="text-[#556677] text-xs">{c.amt}</span>
                            </div>
                            <div className="h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: c.val }} />
                            </div>
                            <div className="text-[10px] text-[#8899AA] uppercase tracking-wider font-bold">{c.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <span className="text-white font-bold text-sm">Employee CTC Breakdown</span>
                    <div className="relative w-72">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search employee..." value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs focus:border-blue-500 outline-none" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-[#8899AA] text-xs uppercase tracking-wider bg-[#0A1420]">
                            <tr>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Employee</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Fixed Base</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Flexi (FBP)</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Retirals (ER)</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Variable/Bonus</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A] bg-blue-500/5">Total CTC (PA)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {EMPLOYEES.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase())).map((e, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                    <td className="px-5 py-3 flex flex-col">
                                        <span className="text-white font-semibold flex items-center gap-2">{e.name} <TrendIndicator val={e.totalCTC} /></span>
                                        <span className="text-[#556677] text-[10px]">{e.id} · {e.dept}</span>
                                    </td>
                                    <td className="px-5 py-3 text-right text-[#AABBCC]">₹{e.fixed.toLocaleString()}</td>
                                    <td className="px-5 py-3 text-right text-[#AABBCC]">₹{e.flexi.toLocaleString()}</td>
                                    <td className="px-5 py-3 text-right text-[#AABBCC]">₹{e.retiral.toLocaleString()}</td>
                                    <td className="px-5 py-3 text-right text-[#AABBCC]">₹{e.variable.toLocaleString()}</td>
                                    <td className="px-5 py-3 text-right text-blue-400 font-bold bg-blue-500/5">₹{e.totalCTC.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function TrendIndicator({ val }: { val: number }) {
    if (val > 2000000) return <TrendingUp size={12} className="text-emerald-500" />;
    return null;
}
