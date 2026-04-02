"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    BookOpen, Search, Filter, Download,
    ArrowUpRight, ArrowDownRight, ChevronRight, Calendar
} from "lucide-react";

const LEDGER_ENTRIES = [
    { id: "TXN-849201", date: "2025-06-15", time: "14:30", account: "EWA Disbursal", type: "Debit", amount: 15000, balance: 485000, description: "EWA to Emp #142 (Ravi K)", status: "Completed" },
    { id: "TXN-849202", date: "2025-06-15", time: "16:45", account: "Loan Repayment", type: "Credit", amount: 25000, balance: 510000, description: "EMI deduction for Emp #089 (Sneha R)", status: "Completed" },
    { id: "TXN-849203", date: "2025-06-16", time: "09:15", account: "Insurance Premium", type: "Debit", amount: 450000, balance: 60000, description: "Group Health Renewal - Policy Q3", status: "Completed" },
    { id: "TXN-849204", date: "2025-06-16", time: "11:20", account: "Advance Salary", type: "Debit", amount: 50000, balance: 10000, description: "Emergency Advance - Emp #210 (Amit S)", status: "Pending" },
    { id: "TXN-849205", date: "2025-06-17", time: "10:00", account: "Operating Fund", type: "Credit", amount: 1000000, balance: 1010000, description: "Monthly Corporate Allocation", status: "Completed" },
    { id: "TXN-849206", date: "2025-06-17", time: "15:10", account: "EWA Disbursal", type: "Debit", amount: 8500, balance: 1001500, description: "EWA to Emp #112 (Priya M)", status: "Completed" },
];

export default function DoubleEntryLedgerScreen() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">General Ledger</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-[#00E5FF]" />
                        Double Entry Ledger
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Real-time accounting log for all embedded finance transactions</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Calendar className="w-4 h-4" />
                        Date Range
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF] opacity-5 rounded-full blur-3xl -mr-10 -mt-10" />
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total Debits (MTD)</p>
                    <h3 className="text-2xl font-bold text-white mb-2">₹6,28,500</h3>
                    <div className="flex items-center gap-1 text-xs text-[#8899AA]">
                        <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">12%</span> vs last month
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-5 rounded-full blur-3xl -mr-10 -mt-10" />
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total Credits (MTD)</p>
                    <h3 className="text-2xl font-bold text-white mb-2">₹10,25,000</h3>
                    <div className="flex items-center gap-1 text-xs text-[#8899AA]">
                        <ArrowDownRight className="w-3 h-3 text-pink-400" />
                        <span className="text-pink-400">4%</span> vs last month
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-5 rounded-full blur-3xl -mr-10 -mt-10" />
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Real-time Fund Balance</p>
                    <h3 className="text-2xl font-bold text-[#00E5FF] mb-2">₹10,01,500</h3>
                    <div className="flex items-center gap-1 text-xs text-[#8899AA]">
                        Fully Reconciled as of today
                    </div>
                </div>
            </div>

            {/* Ledger Table Section */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search transactions, IDs, names..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#00E5FF] transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Transaction ID</th>
                                <th className="p-4 font-medium">Date & Time</th>
                                <th className="p-4 font-medium">Account / Description</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                                <th className="p-4 font-medium text-right">Running Balance</th>
                                <th className="p-4 font-medium text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]/50">
                            {LEDGER_ENTRIES.map((entry, index) => (
                                <tr key={index} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4 font-mono text-[#00E5FF]">{entry.id}</td>
                                    <td className="p-4">
                                        <div className="text-white">{entry.date}</div>
                                        <div className="text-xs text-[#8899AA] mt-0.5">{entry.time}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-white font-medium">{entry.account}</div>
                                        <div className="text-xs text-[#8899AA] mt-0.5 w-48 truncate">{entry.description}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${entry.type === 'Credit' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-pink-500/10 text-pink-400'
                                            }`}>
                                            {entry.type === 'Credit' ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                                            {entry.type}
                                        </span>
                                    </td>
                                    <td className={`p-4 text-right font-medium ${entry.type === 'Credit' ? 'text-emerald-400' : 'text-pink-400'}`}>
                                        {entry.type === 'Credit' ? '+' : '-'}₹{entry.amount.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-right text-white font-mono">
                                        ₹{entry.balance.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-center">
                                        {entry.status === 'Completed' ? (
                                            <span className="inline-flex text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs font-medium">Completed</span>
                                        ) : (
                                            <span className="inline-flex text-amber-400 bg-amber-400/10 px-2 py-1 rounded text-xs font-medium">Pending</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Mock) */}
                <div className="p-4 border-t border-[#1A2A3A] flex items-center justify-between text-sm text-[#8899AA]">
                    <div>Showing 1 to 6 of 1,204 entries</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] hover:bg-[#2A3A4A] transition-colors disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1.5 rounded-lg border border-[#2A3A4A] bg-[#00E5FF]/10 text-[#00E5FF]">1</button>
                        <button className="px-3 py-1.5 rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] hover:bg-[#2A3A4A] transition-colors">2</button>
                        <button className="px-3 py-1.5 rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] hover:bg-[#2A3A4A] transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
