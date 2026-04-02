"use client";
import React, { useState } from 'react';
import { TrendingUp, ArrowLeft, Search, Download } from 'lucide-react';
import Link from 'next/link';

const EMPLOYEES = [
    { name: 'Anita Kulkarni', dept: 'Engineering', medical: { limit: 15000, used: 8400 }, lta: { limit: 50000, used: 0 }, internet: { limit: 24000, used: 14400 }, fuel: { limit: 0, used: 0 } },
    { name: 'Rahul Sharma', dept: 'Sales', medical: { limit: 15000, used: 15000 }, lta: { limit: 50000, used: 45000 }, internet: { limit: 24000, used: 21600 }, fuel: { limit: 18000, used: 8500 } },
    { name: 'Meena Joshi', dept: 'Finance', medical: { limit: 15000, used: 3200 }, lta: { limit: 50000, used: 0 }, internet: { limit: 24000, used: 7200 }, fuel: { limit: 0, used: 0 } },
    { name: 'Karan Singh', dept: 'Sales', medical: { limit: 15000, used: 0 }, lta: { limit: 50000, used: 0 }, internet: { limit: 24000, used: 12000 }, fuel: { limit: 18000, used: 17200 } },
    { name: 'Vijay Kumar', dept: 'HR', medical: { limit: 15000, used: 7800 }, lta: { limit: 50000, used: 50000 }, internet: { limit: 24000, used: 14400 }, fuel: { limit: 0, used: 0 } },
];

const BalBar = ({ used, limit }: { used: number; limit: number }) => {
    if (limit === 0) return <span className="text-xs text-[#445566]">N/A</span>;
    const pct = Math.min(Math.round(used / limit * 100), 100);
    const color = pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-amber-500' : 'bg-violet-500';
    return (
        <div>
            <div className="flex justify-between text-[10px] mb-0.5">
                <span className="text-[#556677]">₹{used.toLocaleString()} / ₹{limit.toLocaleString()}</span>
                <span className={pct >= 100 ? 'text-red-400' : pct >= 80 ? 'text-amber-400' : 'text-[#8899AA]'}>{pct}%</span>
            </div>
            <div className="h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
};

export default function ReimbursementBalanceScreen() {
    const [search, setSearch] = useState('');
    const filtered = EMPLOYEES.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.dept.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <Link href="/reimbursements/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Reimbursements</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><TrendingUp size={22} className="text-violet-400" /> Reimbursement Balance Tracker</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Employee-wise view of limits used and remaining across all categories (FY 2025-26)</p>
                </div>
                <button className="flex items-center gap-2 bg-[#131B2B] border border-[#2A3A4A] hover:border-violet-500/50 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Download size={16} /> Export
                </button>
            </div>

            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                <input type="text" placeholder="Search employee or department..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-violet-500 outline-none transition-colors" />
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#060D1A] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Employee</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A] min-w-48">Medical (₹15k)</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A] min-w-48">LTA (₹50k)</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A] min-w-48">Internet (₹24k)</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A] min-w-48">Fuel</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {filtered.map((emp, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="text-white font-semibold text-xs">{emp.name}</div>
                                        <div className="text-[#556677] text-[10px]">{emp.dept}</div>
                                    </td>
                                    <td className="px-5 py-4"><BalBar used={emp.medical.used} limit={emp.medical.limit} /></td>
                                    <td className="px-5 py-4"><BalBar used={emp.lta.used} limit={emp.lta.limit} /></td>
                                    <td className="px-5 py-4"><BalBar used={emp.internet.used} limit={emp.internet.limit} /></td>
                                    <td className="px-5 py-4"><BalBar used={emp.fuel.used} limit={emp.fuel.limit} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
