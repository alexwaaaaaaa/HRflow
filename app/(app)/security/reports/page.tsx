"use client";
import React from 'react';
import { FileText, ShieldCheck, Download, Calendar, ExternalLink, Activity } from 'lucide-react';
import Link from 'next/link';

export default function SecurityReportsScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/security/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Security</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Compliance & Security Reports</h1>
                    <p className="text-[#8899AA] text-sm">Generate automated audit summaries for SOC2, ISO 27001, and DPDP compliance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        Generate Custom Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">

                {/* SOC2 Report */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative group hover:border-[#2A3A4A] transition-colors flex flex-col h-full">
                    <div className="w-12 h-12 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center mb-4 border border-sky-500/20">
                        <ShieldCheck size={24} />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2">SOC 2 Type II Summary</h2>
                    <p className="text-sm text-[#8899AA] leading-relaxed mb-6 flex-1">
                        Aggregated access logs, change management trails, and incident response metrics mapped to TSC criteria (Security & Confidentiality).
                    </p>
                    <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-4 mt-auto">
                        <div className="text-xs font-mono text-[#556677]">Auto-updates Weekly</div>
                        <button className="text-sky-400 hover:text-sky-300 font-bold text-sm flex items-center gap-2 transition-colors">
                            <Download size={16} /> PDF
                        </button>
                    </div>
                </div>

                {/* ISO 27001 Report */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative group hover:border-[#2A3A4A] transition-colors flex flex-col h-full">
                    <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-4 border border-indigo-500/20">
                        <FileText size={24} />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2">ISO 27001 ISMS Output</h2>
                    <p className="text-sm text-[#8899AA] leading-relaxed mb-6 flex-1">
                        Information Security Management System documentation including risk assessments, asset inventory, and controls mapping.
                    </p>
                    <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-4 mt-auto">
                        <div className="text-xs font-mono text-[#556677]">Quarterly Export</div>
                        <button className="text-indigo-400 hover:text-indigo-300 font-bold text-sm flex items-center gap-2 transition-colors">
                            <Download size={16} /> PDF
                        </button>
                    </div>
                </div>

                {/* DPDP Compliance Report */}
                <div className="bg-[#0A1420] border border-emerald-500/30 rounded-2xl p-6 relative group hover:border-emerald-500/50 transition-colors flex flex-col h-full shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/20 relative z-10">
                        <Activity size={24} />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2 relative z-10">DPDP Act Readiness</h2>
                    <p className="text-sm text-[#8899AA] leading-relaxed mb-6 flex-1 relative z-10">
                        Consent status matrix, data breach log (within 72 hours protocol), and data deletion tracking for independent auditors.
                    </p>
                    <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-4 mt-auto relative z-10">
                        <div className="text-xs font-mono text-emerald-500/70">Required by CERT-In</div>
                        <button className="text-emerald-400 hover:text-emerald-300 font-bold text-sm flex items-center gap-2 transition-colors">
                            <Download size={16} /> Export (CSV)
                        </button>
                    </div>
                </div>

            </div>

            {/* Recent Executed Reports Table */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-8">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A]">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><Calendar size={18} className="text-[#556677]" /> Report Generation History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Report Type</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Period Covered</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Generated By</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Date</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] text-right">Download</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { type: 'SOC 2 Access Log Dump', period: 'Sep 2026', by: 'System Auto', date: 'Oct 01, 2026' },
                                { type: 'DPDP Remediation Check', period: 'Q3 2026', by: 'Sanjay Dutt', date: 'Sep 30, 2026' },
                                { type: 'ISO Asset Inventory', period: '2026 Snapshot', by: 'Aditi Krishnan', date: 'Aug 15, 2026' },
                                { type: 'Monthly Penetration Test Summary', period: 'Jul 2026', by: 'Security Vendor API', date: 'Aug 01, 2026' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4 text-white font-medium">{row.type}</td>
                                    <td className="px-6 py-4 text-[#8899AA]">{row.period}</td>
                                    <td className="px-6 py-4 text-[#556677]">{row.by}</td>
                                    <td className="px-6 py-4 text-[#8899AA]">{row.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-indigo-400 hover:text-white transition-colors">
                                            <Download size={18} className="ml-auto" />
                                        </button>
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
