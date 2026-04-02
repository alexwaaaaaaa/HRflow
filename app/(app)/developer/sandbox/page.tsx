"use client";
import React, { useState } from 'react';
import { BoxSelect, Play, AlertTriangle, Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SandboxEnvironmentPage() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <BoxSelect className="text-amber-500" />
                        Sandbox Environment
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Safely build and test API integrations against an isolated copy of your data.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/developer/sandbox/testing" className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex gap-2 items-center shadow-lg shadow-amber-500/20">
                        <Play size={16} fill="currentColor" /> Open API Tester
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Environment Status Card */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 col-span-1 md:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />

                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">My Sandbox Instance</h3>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                                <span className="text-sm font-bold text-emerald-400">Available</span>
                            </div>
                        </div>
                        <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                            Reset Data
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#060D1A] border border-[#1A2A3A] rounded-lg p-4">
                            <p className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-1">Base URL</p>
                            <code className="text-sm font-mono text-amber-300 select-all">https://api.sandbox.kaarya.com</code>
                        </div>
                        <div className="bg-[#060D1A] border border-[#1A2A3A] rounded-lg p-4">
                            <p className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-1">Last Synced to Prod</p>
                            <p className="text-sm text-white font-mono">14 days ago</p>
                        </div>
                    </div>
                </div>

                {/* Quick Info */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 relative">
                    <AlertTriangle className="text-amber-500 mb-4" size={24} />
                    <h3 className="text-amber-500 font-bold mb-2">Sandbox Policies</h3>
                    <ul className="text-sm text-amber-500/80 space-y-2 list-disc list-inside">
                        <li>Emails and SMS are <strong>never</strong> actually sent to users.</li>
                        <li>Data is completely isolated from Production.</li>
                        <li>Rate limits are strictly enforced (10 req/sec).</li>
                        <li>Data can be wiped and re-synced from Prod manually.</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#8899AA] uppercase tracking-wider flex items-center gap-2">
                    <Code size={16} /> Sandbox API Keys
                </h3>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm text-[#8899AA]">
                        <thead className="bg-[#060D1A] border-b border-[#1A2A3A] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px-6 py-4 font-medium">Token</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            <tr className="hover:bg-[#131B2B] transition-colors">
                                <td className="px-6 py-4 font-medium text-white">Default Sandbox Key</td>
                                <td className="px-6 py-4">
                                    <code className="font-mono text-white bg-[#060D1A] border border-[#1A2A3A] px-2 py-1 rounded">
                                        sk_test_5xAb...1kLm
                                    </code>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors text-sm">Rotate</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State for Webhooks in DB */}
            <div className="bg-[#060D1A] border border-dashed border-[#1A2A3A] rounded-xl flex items-center justify-between p-6">
                <div>
                    <h3 className="text-base font-bold text-white mb-1">Sandbox Webhooks</h3>
                    <p className="text-sm text-[#556677]">Configure webhooks that only trigger for sandbox events.</p>
                </div>
                <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                    Configure
                </button>
            </div>

        </div>
    );
}
