"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    History, Search, Download, ChevronRight, Filter, Calendar
} from "lucide-react";

const TXN_HISTORY = [
    { id: "TXN-9428", emp: "Suraj P (EMP-182)", date: "2025-10-18", time: "09:42", amount: 10000, fee: 100, status: "Success", method: "IMPS", utr: "ICIC92817293" },
    { id: "TXN-9427", emp: "Ravi K (EMP-042)", date: "2025-10-18", time: "08:15", amount: 25000, fee: 250, status: "Pending", method: "NEFT", utr: "-" },
    { id: "TXN-9426", emp: "Neha S (EMP-310)", date: "2025-10-17", time: "19:22", amount: 8000, fee: 80, status: "Failed", method: "IMPS", utr: "-" },
    { id: "TXN-9425", emp: "Vikram R (EMP-011)", date: "2025-10-17", time: "14:10", amount: 35000, fee: 350, status: "Success", method: "IMPS", utr: "HDFC91827491" },
    { id: "TXN-9424", emp: "Priya M (EMP-305)", date: "2025-10-16", time: "11:05", amount: 15000, fee: 150, status: "Success", method: "IMPS", utr: "UTIB99182736" },
];

export default function EWATransactionHistoryScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/ewa" className="hover:text-white transition-colors">EWA</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Transaction History</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <History className="w-8 h-8 text-[#00E5FF]" />
                        Transaction Master Log
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Global ledger of all EWA withdrawal attempts, successes, and failures.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Calendar className="w-4 h-4" />
                        This Month
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                        <Download className="w-4 h-4" />
                        Export Master
                    </button>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by TXN, UTR, or Employee..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#00E5FF] transition-colors"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                        Status: All
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Txn ID / UTR</th>
                                <th className="p-4 font-medium">Date & Time</th>
                                <th className="p-4 font-medium">Employee</th>
                                <th className="p-4 font-medium text-right">Amount Requested</th>
                                <th className="p-4 font-medium text-right">Fee Deducted</th>
                                <th className="p-4 font-medium text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {TXN_HISTORY.map((txn) => (
                                <tr key={txn.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-mono text-[#00E5FF] font-medium">{txn.id}</div>
                                        <div className="text-[#8899AA] text-xs font-mono mt-0.5">{txn.utr}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-white">{txn.date}</div>
                                        <div className="text-[#8899AA] text-xs">{txn.time}</div>
                                    </td>
                                    <td className="p-4 text-white font-medium">
                                        {txn.emp}
                                    </td>
                                    <td className="p-4 text-right text-white font-bold">
                                        ₹{txn.amount.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-right text-pink-400 font-medium">
                                        ₹{txn.fee.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-center">
                                        {txn.status === 'Success' && (
                                            <span className="inline-flex px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium">
                                                {txn.status}
                                            </span>
                                        )}
                                        {txn.status === 'Failed' && (
                                            <span className="inline-flex px-2 py-1 bg-pink-500/10 text-pink-400 rounded text-xs font-medium">
                                                {txn.status}
                                            </span>
                                        )}
                                        {txn.status === 'Pending' && (
                                            <span className="inline-flex px-2 py-1 bg-amber-500/10 text-amber-500 rounded text-xs font-medium">
                                                {txn.status} ({txn.method})
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Optional Pagination placeholder */}
                <div className="p-4 border-t border-[#1A2A3A] flex justify-between items-center text-sm text-[#8899AA]">
                    <div>Showing 1 to 5 of 1,429 transactions</div>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1 bg-[#1A2A3A] rounded border border-[#2A3A4A] opacity-50">Prev</button>
                        <button className="px-3 py-1 bg-[#00E5FF]/20 text-[#00E5FF] rounded border border-[#00E5FF]/30">1</button>
                        <button className="px-3 py-1 bg-[#1A2A3A] hover:bg-[#2A3A4A] rounded border border-[#2A3A4A] transition-colors">2</button>
                        <button className="px-3 py-1 bg-[#1A2A3A] hover:bg-[#2A3A4A] rounded border border-[#2A3A4A] transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
