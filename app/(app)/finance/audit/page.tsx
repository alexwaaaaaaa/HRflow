"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Clock, Search, Filter, Download, ChevronRight, ShieldCheck, User
} from "lucide-react";

const AUDIT_LOGS = [
    { id: "LOG-0912", date: "2025-10-15 14:30:22", user: "Admin (Priya M)", action: "Modified Policy", entity: "EWA Config", details: "Changed Max Withdrawal % from 40% to 50%", ip: "192.168.1.45" },
    { id: "LOG-0911", date: "2025-10-15 11:20:00", user: "System", action: "Auto-Reconciliation", entity: "General Ledger", details: "Daily transaction sync with RazorpayX completed. 0 variances.", ip: "10.0.0.12" },
    { id: "LOG-0910", date: "2025-10-14 16:45:10", user: "Finance Lead (Ravi K)", action: "Approved Loan", entity: "Loan ADV-002", details: "Approved ₹50,000 for Sneha Rao", ip: "192.168.1.102" },
    { id: "LOG-0909", date: "2025-10-14 09:15:00", user: "Finance Lead (Ravi K)", action: "Exported Data", entity: "Analytics Report", details: "Exported Q3 Portfolio Risk Report as PDF", ip: "192.168.1.102" },
    { id: "LOG-0908", date: "2025-10-13 15:10:45", user: "System", action: "Failed Transaction", entity: "EWA Disbursal", details: "Transfer failed for TXN-8492X. Account inactive.", ip: "10.0.0.12" },
];

export default function FinanceAuditTrailScreen() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/settings" className="hover:text-white transition-colors">Settings</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Audit Trail</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-[#00E5FF]" />
                        Compliance Audit Trail
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Immutable log of system changes, approvals, and data exports</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                        Date Range
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                        Export Log
                    </button>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A]">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search logs by user, action, or ID..."
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
                                <th className="p-4 font-medium">Log ID & Time</th>
                                <th className="p-4 font-medium">Actor</th>
                                <th className="p-4 font-medium">Action & Entity</th>
                                <th className="p-4 font-medium">Details</th>
                                <th className="p-4 font-medium text-right">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {AUDIT_LOGS.map((log) => (
                                <tr key={log.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-mono text-[#00E5FF] text-xs mb-1">{log.id}</div>
                                        <div className="text-[#8899AA] text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {log.date}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${log.user === 'System' ? 'bg-purple-500/20 text-purple-400' : 'bg-[#1A2A3A] text-white'}`}>
                                                {log.user === 'System' ? 'S' : <User className="w-3 h-3" />}
                                            </div>
                                            <span className="text-white font-medium">{log.user}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-white font-medium">{log.action}</div>
                                        <div className="text-xs text-[#8899AA]">{log.entity}</div>
                                    </td>
                                    <td className="p-4 text-[#8899AA] max-w-sm">
                                        {log.details}
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className="font-mono text-xs text-[#8899AA] bg-[#1A2A3A] px-2 py-1 rounded">
                                            {log.ip}
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
