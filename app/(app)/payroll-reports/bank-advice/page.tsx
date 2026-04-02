"use client";
import React, { useState } from 'react';
import { Landmark, ArrowLeft, Download, Filter, Search, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

const RUNS = [
    { id: 'PAY-Mar-26-R1', month: 'March 2026', type: 'Regular Payroll', totalAmount: 42500000, employees: 342, status: 'Generated', date: '28 Mar 2026' },
    { id: 'REIMB-Mar-26', month: 'March 2026', type: 'Reimbursements', totalAmount: 1840000, employees: 86, status: 'Paid', date: '15 Mar 2026' },
    { id: 'F&F-Feb-26', month: 'February 2026', type: 'Full & Final', totalAmount: 1250000, employees: 3, status: 'Paid', date: '10 Mar 2026' },
    { id: 'PAY-Feb-26-R1', month: 'February 2026', type: 'Regular Payroll', totalAmount: 41800000, employees: 338, status: 'Paid', date: '28 Feb 2026' },
];

export default function BankAdviceScreen() {
    const [search, setSearch] = useState('');

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/payroll/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Payroll Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Landmark size={22} className="text-emerald-400" /> Bank Advice</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Generate NEFT/RTGS upload files for your corporate bank portal</p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none">
                        <option>HDFC Corporate (Primary)</option>
                        <option>ICICI CMS (Secondary)</option>
                        <option>Standard Format (.txt)</option>
                    </select>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <span className="text-white font-bold text-sm">Payment Runs</span>
                    <div className="flex items-center gap-3">
                        <button className="text-[#8899AA] hover:text-white transition-colors"><Filter size={16} /></button>
                        <div className="relative w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search by run ID or month..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs focus:border-emerald-500 outline-none" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-[#8899AA] text-xs uppercase tracking-wider bg-[#0A1420]">
                            <tr>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Run Details</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Month / Type</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Employees</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Total Transfer</th>
                                <th className="px-5 py-4 text-center font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A] min-w-40">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {RUNS.filter(r => !search || r.id.toLowerCase().includes(search.toLowerCase()) || r.month.toLowerCase().includes(search.toLowerCase())).map((run, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="text-emerald-400 font-bold text-xs">{run.id}</div>
                                        <div className="text-[#556677] text-[10px] mt-0.5">Created: {run.date}</div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="text-white font-semibold text-xs">{run.month}</div>
                                        <div className="text-[#8899AA] text-[10px] mt-0.5">{run.type}</div>
                                    </td>
                                    <td className="px-5 py-4 text-right text-white font-semibold">{run.employees}</td>
                                    <td className="px-5 py-4 text-right font-black text-white text-base">₹{(run.totalAmount / 100000).toFixed(2)}L</td>
                                    <td className="px-5 py-4 text-center">
                                        {run.status === 'Paid' ? (
                                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1"><CheckCircle2 size={10} /> Paid</span>
                                        ) : (
                                            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1"><Clock size={10} /> Generated</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 ml-auto">
                                            <Download size={14} /> Bank File
                                        </button>
                                        <div className="mt-2 text-[10px] text-[#556677] hover:text-white cursor-pointer transition-colors text-right w-full block">Download Excel Summary</div>
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
