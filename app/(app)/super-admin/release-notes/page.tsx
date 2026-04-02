"use client";
import React from 'react';
import { FileText, Pencil, Plus, Send, History } from 'lucide-react';
import Link from 'next/link';

export default function ReleaseNotesScreen() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Changelog & Release Notes</h1>
                    <p className="text-[#8899AA] text-sm">Publish platform updates, new features, and bug fixes to the global changelog.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Plus size={16} /> Draft New Release List
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

                <div className="md:col-span-2 space-y-6">
                    {/* Active/Latest Draft */}
                    <div className="bg-[#0A1420] border border-indigo-500/30 rounded-2xl p-6 relative">
                        <div className="absolute top-0 right-0 px-4 py-2 bg-indigo-500/10 text-indigo-400 font-bold text-xs uppercase tracking-wider rounded-bl-2xl rounded-tr-2xl border-b border-l border-indigo-500/30">
                            Current Draft (v2.4.1)
                        </div>

                        <div className="space-y-4 pt-4">
                            <input type="text" defaultValue="October 2026 Platform Update Release" className="w-full bg-transparent text-2xl font-bold text-white outline-none border-b border-transparent focus:border-[#2A3A4A] pb-2 transition-colors" />

                            <textarea
                                className="w-full h-48 bg-[#131B2B] border border-[#2A3A4A] text-[#8899AA] text-sm rounded-xl p-4 outline-none resize-none focus:border-indigo-500 transition-colors"
                                defaultValue="### 🚀 New Features&#10;- AI Performance Reviews (Beta) is now rolling out to select tenants.&#10;- Added detailed IP Whitelisting capabilities under Security Settings.&#10;&#10;### 🐛 Bug Fixes&#10;- Fixed an issue where Form 16 Part B generation would timeout on large batches.&#10;- Resolved calendar rendering artifact in Night Mode."
                            />

                            <div className="flex items-center justify-between pt-4 border-t border-[#1A2A3A]">
                                <span className="text-xs text-[#556677] font-mono">Last autosaved 2 mins ago</span>
                                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                                    <Send size={16} /> Publish to Changelog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden h-full">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center gap-2">
                            <History size={18} className="text-[#556677]" />
                            <h3 className="font-bold text-white text-sm">Published History</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A] flex-1 overflow-y-auto">
                            {[
                                { ver: 'v2.4.0', title: 'Start of Month Fixes', date: 'Oct 01, 2026' },
                                { ver: 'v2.3.9', title: 'DPDP Compliance Patch', date: 'Sep 15, 2026' },
                                { ver: 'v2.3.8', title: 'Payroll Engine Overhaul', date: 'Aug 28, 2026' },
                            ].map((ver, i) => (
                                <div key={i} className="p-4 hover:bg-[#131B2B] transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="font-bold text-white text-sm truncate">{ver.title}</div>
                                        <div className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono border border-emerald-500/20">{ver.ver}</div>
                                    </div>
                                    <div className="text-xs text-[#556677]">{ver.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
