"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Send, CheckCircle2, ChevronRight, Download, Search, Filter, AlertTriangle
} from "lucide-react";

const PENDING_DISBURSEMENTS = [
    { id: "WTH-9301", emp: "Ananya S", account: "HDFC •••• 1204", amount: 15000, fee: 150, net: 14850, date: "Oct 16, 2025 09:15", status: "Pending API" },
    { id: "WTH-9302", emp: "Rahul K", account: "SBI •••• 9921", amount: 5000, fee: 50, net: 4950, date: "Oct 16, 2025 10:30", status: "Pending API" },
    { id: "WTH-9303", emp: "Vikram R", account: "ICICI •••• 3341", amount: 25000, fee: 250, net: 24750, date: "Oct 16, 2025 11:45", status: "Failed (Invalid VPA)" },
];

const PROCESSED = [
    { id: "WTH-9290", emp: "Priya M", account: "Axis •••• 8812", amount: 10000, fee: 100, net: 9900, date: "Oct 15, 2025 14:20", status: "Success", utr: "CMS19283019284" },
    { id: "WTH-9289", emp: "Amit V", account: "HDFC •••• 4410", amount: 12000, fee: 120, net: 11880, date: "Oct 15, 2025 11:10", status: "Success", utr: "CMS19283019111" },
];

export default function EWADisbursementScreen() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/ewa" className="hover:text-white transition-colors">EWA</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Disbursements</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Send className="w-8 h-8 text-[#00E5FF]" />
                        EWA Disbursements Queue
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Review, retry, or manually approve outgoing EWA transfers</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                        <CheckCircle2 className="w-4 h-4" />
                        Process All Pending (2)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Escrow Balance</p>
                    <h3 className="text-2xl font-bold text-white mb-1">₹8,45,000</h3>
                    <p className="text-xs flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" /> Sufficient for queue
                    </p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Pending Volume</p>
                    <h3 className="text-2xl font-bold text-amber-400 mb-1">₹20,000</h3>
                    <p className="text-xs text-[#8899AA]">Across 2 requests</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Failed Transfers</p>
                    <h3 className="text-2xl font-bold text-pink-400 mb-1">1</h3>
                    <p className="text-xs text-[#8899AA]">Requires manual intervention</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total Disbursed (MTD)</p>
                    <h3 className="text-2xl font-bold text-white mb-1">₹4,15,500</h3>
                    <p className="text-xs text-[#8899AA]">Across 84 requests</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden mb-8">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/40">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-400" /> Action Required
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0B1221] text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Req ID</th>
                                <th className="p-4 font-medium">Employee</th>
                                <th className="p-4 font-medium">Bank Details</th>
                                <th className="p-4 font-medium text-right">Gross</th>
                                <th className="p-4 font-medium text-right">Net Payload</th>
                                <th className="p-4 font-medium text-center">Status</th>
                                <th className="p-4 font-medium text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {PENDING_DISBURSEMENTS.map((req) => (
                                <tr key={req.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4 font-mono text-[#00E5FF]">{req.id}</td>
                                    <td className="p-4 text-white font-medium">
                                        {req.emp}
                                        <div className="text-xs text-[#8899AA] mt-1">{req.date}</div>
                                    </td>
                                    <td className="p-4 text-[#8899AA] font-mono text-xs">{req.account}</td>
                                    <td className="p-4 text-right text-[#8899AA]">₹{req.amount.toLocaleString()}</td>
                                    <td className="p-4 text-right text-emerald-400 font-bold">₹{req.net.toLocaleString()}</td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${req.status.includes('Failed') ? 'bg-pink-500/10 text-pink-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {req.status.includes('Failed') ? (
                                            <button className="px-3 py-1 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-xs font-medium rounded transition-colors">Resolve</button>
                                        ) : (
                                            <button className="px-3 py-1 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] font-medium rounded text-xs transition-colors">Push to API</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-white">Recently Processed</h2>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by UTR or name..."
                                className="w-64 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#00E5FF] transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Req ID</th>
                                <th className="p-4 font-medium">Employee</th>
                                <th className="p-4 font-medium">Bank Details</th>
                                <th className="p-4 font-medium text-right">Net Sent</th>
                                <th className="p-4 font-medium">Bank UTR</th>
                                <th className="p-4 font-medium text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {PROCESSED.map((txn) => (
                                <tr key={txn.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4 font-mono text-[#00E5FF]">{txn.id}</td>
                                    <td className="p-4 text-white font-medium">
                                        {txn.emp}
                                        <div className="text-xs text-[#8899AA] mt-1">{txn.date}</div>
                                    </td>
                                    <td className="p-4 text-[#8899AA] font-mono text-xs">{txn.account}</td>
                                    <td className="p-4 text-right text-emerald-400 font-bold">₹{txn.net.toLocaleString()}</td>
                                    <td className="p-4 font-mono text-xs text-[#8899AA]">{txn.utr}</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium">
                                            {txn.status}
                                        </span>
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
