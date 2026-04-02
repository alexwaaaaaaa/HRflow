"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Database, ChevronRight, Download, Filter, Key, History, ShieldAlert
} from "lucide-react";

export default function DataExportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Data Export</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <Database className="w-6 h-6 text-emerald-400" />
                        </div>
                        Secure Dump Extract
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Export raw system data for integration with third-party BI tools, Snowflake, or Redshift.</p>
                </div>
                <div className="flex items-center gap-3 bg-[#1A2A3A] px-4 py-2 border border-[#2A3A4A] rounded-lg">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span className="text-xs text-[#8899AA]">All data exports are logged for compliance.</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Configuration Panel */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 lg:col-span-1 border-t-4 border-t-emerald-500">
                    <h2 className="text-lg font-bold text-white mb-6">Extract Configuration</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Data Domain</label>
                            <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors">
                                <option>Core Employee Master Data</option>
                                <option>Payroll Journals & History</option>
                                <option>Attendance & Shifts Log</option>
                                <option>Recruitment Funnel Data</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Date Range</label>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="date" className="bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500" defaultValue="2025-04-01" />
                                <input type="date" className="bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500" defaultValue="2026-03-31" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Anonymization Flag</label>
                            <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-amber-500 bg-amber-500 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-[#0B1221]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <span className="text-sm text-white font-medium">Mask PII Data</span>
                                </label>
                                <p className="text-[10px] text-[#8899AA] ml-8">Names, Emails, and Phone numbers will be hashed (SHA-256) for compliance with GDPR / DPDP Act.</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Output Format</label>
                            <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors">
                                <option>Parquet (Recommended for BI)</option>
                                <option>CSV (Comma Separated)</option>
                                <option>JSON Lines Format</option>
                            </select>
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-[#0B1221] font-bold rounded-lg transition-colors shadow-[0_4px_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" /> Execute Data Dump
                            </button>
                        </div>
                    </div>
                </div>

                {/* Automation & Keys */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Key className="w-5 h-5 text-indigo-400" /> API Access & Webhooks
                        </h2>
                        <p className="text-sm text-[#8899AA] mb-4">Instead of manual exports, connect your BI tools (Tableau, PowerBI, Looker) directly using our REST API or establish a secure warehouse sync.</p>

                        <div className="p-4 bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Production API Key</p>
                                <div className="font-mono text-white text-sm">sk_live_hR9vXm*************Kq2</div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-[#0B1221] border border-[#2A3A4A] text-white text-xs font-semibold rounded hover:bg-[#2A3A4A] transition-colors">Copy Key</button>
                                <button className="px-3 py-1.5 border border-pink-500/30 text-pink-400 text-xs font-semibold rounded hover:bg-pink-500/10 transition-colors">Revoke</button>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-4">
                            <button className="text-indigo-400 text-sm font-bold hover:underline">View API Documentation &rarr;</button>
                            <button className="text-emerald-400 text-sm font-bold hover:underline">Setup Snowflake Sync &rarr;</button>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex-1">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <History className="w-5 h-5 text-[#8899AA]" /> Recent Extract History
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[#1A2A3A]/30 text-[#8899AA] text-xs uppercase tracking-wider border-y border-[#2A3A4A]">
                                    <tr>
                                        <th className="p-3 font-medium">Extract Job ID</th>
                                        <th className="p-3 font-medium">Domain</th>
                                        <th className="p-3 font-medium">Initiated By</th>
                                        <th className="p-3 font-medium text-right">Size</th>
                                        <th className="p-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    <tr className="hover:bg-[#1A2A3A]/20">
                                        <td className="p-3 font-mono text-[#8899AA]">ext_9982ac</td>
                                        <td className="p-3 text-white">Core Employee Master</td>
                                        <td className="p-3 text-[#8899AA]">admin@company.com</td>
                                        <td className="p-3 text-right text-[#8899AA]">24.5 MB</td>
                                        <td className="p-3">
                                            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                                Completed (Parquet)
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#1A2A3A]/20">
                                        <td className="p-3 font-mono text-[#8899AA]">ext_8821bx</td>
                                        <td className="p-3 text-white">Payroll Journals</td>
                                        <td className="p-3 text-[#8899AA]">finance.head@company.com</td>
                                        <td className="p-3 text-right text-[#8899AA]">112.8 MB</td>
                                        <td className="p-3">
                                            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
                                                Masked (CSV)
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
