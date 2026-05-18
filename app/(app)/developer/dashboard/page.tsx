"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Terminal, Copy, ArrowUpRight, Activity, BookOpen, KeySquare } from 'lucide-react';
import Link from 'next/link';

export default function DeveloperDashboardPage() {
    return (
        <Page
            title="Developer Portal"
            subtitle="Manage API keys, monitor usage, and integrate Kaarya into your internal tools."
            breadcrumbs={[{ label: "Developer", href: "/developer" }, { label: "Dashboard" }]}
            maxWidth="1300px"
        >

        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Terminal className="text-indigo-400" />
                        Developer Portal
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Manage API keys, monitor usage, and integrate Kaarya into your internal tools.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/developer/keys" className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex gap-2 items-center">
                        <KeySquare size={16} /> Manage Keys
                    </Link>
                    <Link href="/developer/docs" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex gap-2 items-center shadow-lg shadow-indigo-500/20">
                        <BookOpen size={16} /> API Docs
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats */}
                <div className="bg-gradient-to-br from-[#0A1420] to-indigo-900/10 border border-[#1A2A3A] rounded-xl p-6 col-span-1 md:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-[#8899AA] uppercase tracking-wider">Usage This Month (Production)</h3>
                        <span className="text-xs bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 font-bold px-2 py-1 rounded">Healthy</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-3xl font-black text-white mb-1">2.4M</p>
                            <p className="text-sm text-[#556677]">Total Requests</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-white mb-1">99.99%</p>
                            <p className="text-sm text-[#556677]">Success Rate</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-xs text-[#8899AA] mb-2 font-mono">
                            <span>Quota Usage: 2.4M / 5.0M</span>
                            <span>48%</span>
                        </div>
                        <div className="w-full h-2 bg-[#131B2B] rounded-full overflow-hidden border border-[#1A2A3A]">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 w-[48%]" />
                        </div>
                    </div>
                </div>

                {/* Quick Start Card */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                    <h3 className="text-base font-bold text-white mb-4">Quick Start</h3>
                    <div className="space-y-4">
                        <div className="bg-[#060D1A] border border-[#1A2A3A] p-3 rounded-lg flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-[#131B2B] flex items-center justify-center text-xs font-mono text-[#8899AA]">sh</div>
                                <span className="text-sm font-mono text-[#CCDDEE]">curl -H "Authorization:..."</span>
                            </div>
                            <button className="text-[#556677] hover:text-white transition-colors opacity-0 group-hover:opacity-100"><Copy size={16} /></button>
                        </div>

                        <div className="space-y-2">
                            <Link href="/developer/docs/auth" className="flex items-center justify-between text-sm text-[#8899AA] hover:text-indigo-400 transition-colors p-2 hover:bg-[#1A2A3A] rounded">
                                Authentication Guide <ArrowUpRight size={14} />
                            </Link>
                            <Link href="/developer/webhooks" className="flex items-center justify-between text-sm text-[#8899AA] hover:text-indigo-400 transition-colors p-2 hover:bg-[#1A2A3A] rounded">
                                Webhook Listening <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Endpoints & Status */}
            <h3 className="text-sm font-bold text-[#8899AA] uppercase tracking-wider mt-10 mb-4 flex items-center gap-2">
                <Activity size={16} className="text-emerald-500" /> Active Endpoints & Latency
            </h3>
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm text-[#8899AA]">
                    <thead className="bg-[#060D1A] border-b border-[#1A2A3A] text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-medium">Endpoint</th>
                            <th className="px-6 py-4 font-medium">Method</th>
                            <th className="px-6 py-4 font-medium">Avg Latency</th>
                            <th className="px-6 py-4 font-medium text-right">Error Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A] font-mono">
                        <tr className="hover:bg-[#131B2B] transition-colors">
                            <td className="px-6 py-4 text-white">/api/v2/employees</td>
                            <td className="px-6 py-4"><span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">GET</span></td>
                            <td className="px-6 py-4 text-[#CCDDEE]">45ms</td>
                            <td className="px-6 py-4 text-right text-emerald-400">0.01%</td>
                        </tr>
                        <tr className="hover:bg-[#131B2B] transition-colors">
                            <td className="px-6 py-4 text-white">/api/v2/payroll/runs</td>
                            <td className="px-6 py-4"><span className="text-amber-400 bg-amber-500/10 px-2 py-1 rounded">POST</span></td>
                            <td className="px-6 py-4 text-[#CCDDEE]">120ms</td>
                            <td className="px-6 py-4 text-right text-emerald-400">0.05%</td>
                        </tr>
                        <tr className="hover:bg-[#131B2B] transition-colors">
                            <td className="px-6 py-4 text-white">/api/v2/webhooks/trigger</td>
                            <td className="px-6 py-4"><span className="text-rose-400 bg-rose-500/10 px-2 py-1 rounded">DEL</span></td>
                            <td className="px-6 py-4 text-[#CCDDEE]">85ms</td>
                            <td className="px-6 py-4 text-right text-emerald-400">0.00%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
        </Page>
    );
}
