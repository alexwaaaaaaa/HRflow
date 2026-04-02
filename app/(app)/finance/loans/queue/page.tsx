"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Clock, ChevronRight, CheckCircle2, XCircle, Search, Filter, AlertTriangle, FileText
} from "lucide-react";

const APPROVAL_QUEUE = [
    { id: "LNR-9102", emp: "Suraj P", role: "Software Eng", req: 150000, tenure: 12, emi: 13083, purpose: "Medical", status: "Pending HR", score: 850, date: "Oct 16, 2025" },
    { id: "LNR-9101", emp: "Neha S", role: "Marketing", req: 50000, tenure: 6, emi: 8540, purpose: "Education", status: "Pending Finance", score: 710, date: "Oct 15, 2025" },
    { id: "LNR-9100", emp: "Karan M", role: "Sales Rep", req: 300000, tenure: 24, emi: 13636, purpose: "Marriage", status: "Pending Finance", score: 920, date: "Oct 14, 2025" },
];

export default function LoanApprovalQueueScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/loans" className="hover:text-white transition-colors">Loans</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Approval Queue</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Clock className="w-8 h-8 text-indigo-400" />
                        Loan Approval Queue
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Review pending employee loan applications requiring HR or Finance sign-off.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total Pipeline Draft</p>
                    <h3 className="text-2xl font-bold text-white mb-1">₹5,00,000</h3>
                    <p className="text-xs text-[#8899AA]">Across 3 requests</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Avg Review Time</p>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-1">2.4 Days</h3>
                    <p className="text-xs text-[#8899AA]">YTD SLA Performance</p>
                </div>
                <div className="bg-[#0D1928] border border-amber-500/20 rounded-2xl p-6 bg-amber-500/5">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Pending Action</p>
                    <h3 className="text-2xl font-bold text-amber-500 mb-1">2 Requests</h3>
                    <p className="text-xs text-amber-500/80">Require your direct approval</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by Employee or Req ID..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Req ID / Date</th>
                                <th className="p-4 font-medium">Employee</th>
                                <th className="p-4 font-medium text-right">Requested</th>
                                <th className="p-4 font-medium text-center">Tenure / EMI</th>
                                <th className="p-4 font-medium text-center">Credit Score</th>
                                <th className="p-4 font-medium text-center">Docs</th>
                                <th className="p-4 font-medium text-center">Status / Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {APPROVAL_QUEUE.map((req) => (
                                <tr key={req.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-mono text-indigo-400 font-medium">{req.id}</div>
                                        <div className="text-xs text-[#8899AA] mt-1">{req.date}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-white font-medium">{req.emp}</div>
                                        <div className="text-[#8899AA] text-xs mt-0.5">{req.role}</div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="text-white font-bold">₹{req.req.toLocaleString()}</div>
                                        <div className="text-[#8899AA] text-xs">{req.purpose}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="text-white">{req.tenure} mo</div>
                                        <div className="text-xs text-indigo-400 mt-0.5">₹{req.emi.toLocaleString()}/mo</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold ${req.score >= 800 ? 'text-emerald-400 bg-emerald-500/10' : req.score >= 700 ? 'text-amber-400 bg-amber-500/10' : 'text-pink-400 bg-pink-500/10'}`}>
                                            {req.score}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button className="text-[#8899AA] hover:text-white transition-colors">
                                            <FileText className="w-5 h-5 mx-auto" />
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-xs font-medium text-amber-500">{req.status}</span>
                                            {req.status === 'Pending Finance' ? (
                                                <div className="flex gap-2">
                                                    <button className="p-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-md transition-colors" title="Approve">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1.5 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 rounded-md transition-colors" title="Reject">
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-[#8899AA] uppercase">Waiting on HR</span>
                                            )}
                                        </div>
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
