"use client";
import React from 'react';
import { Database, Search, Download, Filter, Eye, PenTool, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function DataAccessLogScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/security/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Security</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Data Access Audit Logs</h1>
                    <p className="text-[#8899AA] text-sm">Comprehensive legally-binding trails of all operations on PII, financials, and company data.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Filter size={16} /> Filter Event Type
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Download size={16} /> Export to CSV
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-6 shadow-xl">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search resource, user, or IP..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:border-indigo-500 outline-none w-80 transition-colors" />
                        </div>
                    </div>
                    <div className="text-xs text-[#556677] uppercase font-bold tracking-wider">Retention: 7 Years (Compliance Mode)</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Timestamp (UTC)</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Actor</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Action</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Resource</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Source IP</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A] font-mono text-xs">
                            {[
                                { time: '2026-10-24 14:05:12', user: 'meera.v@company.com', act: 'READ', icon: <Eye size={14} className="text-sky-400" />, res: 'grievance_case:GRV-2026-142', ip: '203.0.113.42', result: 'ALLOW' },
                                { time: '2026-10-24 13:42:01', user: 'system_background', act: 'UPDATE', icon: <PenTool size={14} className="text-amber-400" />, res: 'payroll_run:OCT-26', ip: 'Internal', result: 'ALLOW' },
                                { time: '2026-10-24 11:15:33', user: 'rajesh.k@company.com', act: 'READ', icon: <Eye size={14} className="text-sky-400" />, res: 'employee_profile:all_salary_data', ip: '112.44.55.1', result: 'DENY (403)' },
                                { time: '2026-10-24 09:30:00', user: 'admin.super@company.com', act: 'DELETE', icon: <Trash2 size={14} className="text-rose-400" />, res: 'employee_record:EMP-0012', ip: '192.168.1.1', result: 'ALLOW' },
                                { time: '2026-10-23 22:10:45', user: 'ext.auditor@firm.com', act: 'READ', icon: <Eye size={14} className="text-sky-400" />, res: 'compliance_report:Q3', ip: '198.51.100.2', result: 'ALLOW' },
                                { time: '2026-10-23 15:22:11', user: 'sarah.j@company.com', act: 'UPDATE', icon: <PenTool size={14} className="text-amber-400" />, res: 'settings:mfa_policy', ip: '10.0.0.5', result: 'ALLOW' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group cursor-default">
                                    <td className="px-6 py-3 text-[#8899AA]">{row.time}</td>
                                    <td className="px-6 py-3 text-[#CCDDEE]">{row.user}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-2">
                                            {row.icon} <span className="text-white">{row.act}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-indigo-300">{row.res}</td>
                                    <td className="px-6 py-3 text-[#556677]">{row.ip}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${row.result.includes('ALLOW') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                                            }`}>
                                            {row.result}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center gap-2 text-xs text-[#556677] mt-4 ml-2">
                <Database size={14} />
                <p>Logs are immutable and write-once using WORM storage architecture to prevent tampering.</p>
            </div>
        </div>
    );
}
