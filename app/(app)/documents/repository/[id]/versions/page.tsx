"use client";

import React from 'react';
import {
    Clock, History, ArrowLeft, Download, Eye, Undo, CheckCircle2, FileText
} from 'lucide-react';
import Link from 'next/link';

const VERSIONS = [
    { v: 'v3.0', current: true, date: '12 Nov 2024, 10:30 AM', author: 'Rahul Sharma', size: '2.4 MB', change: 'Updated compensation structure based on Q4 appraisal.', bg: 'bg-[#00E5A0]/10', color: 'text-[#00E5A0]' },
    { v: 'v2.1', current: false, date: '01 Oct 2024, 02:15 PM', author: 'HR Auto-Gen', size: '2.3 MB', change: 'Fixed formatting issues in standard clauses.', bg: 'bg-[#1A2A3A]', color: 'text-[#8899AA]' },
    { v: 'v2.0', current: false, date: '15 Jan 2024, 09:00 AM', author: 'Priya Patel', size: '2.3 MB', change: 'Annual increment revision applied.', bg: 'bg-[#1A2A3A]', color: 'text-[#8899AA]' },
    { v: 'v1.0', current: false, date: '05 Aug 2022, 11:45 AM', author: 'System', size: '2.1 MB', change: 'Initial offer letter generation on onboarding.', bg: 'bg-[#1A2A3A]', color: 'text-[#8899AA]' },
];

export default function DocumentVersionHistoryScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto pb-12">

                {/* Header */}
                <div className="mb-6">
                    <Link href="/documents/repository" className="inline-flex items-center text-sm text-[#8899AA] hover:text-white mb-4 transition-colors">
                        <ArrowLeft size={16} className="mr-1" /> Back to Document Details
                    </Link>
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center text-[#0066FF]">
                                <FileText size={32} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                                    Appointment_Letter_RahulS.pdf
                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20 uppercase tracking-wide">
                                        Current: v3.0
                                    </span>
                                </h1>
                                <p className="text-sm text-[#8899AA] mt-1 font-medium">Employee Records • Rahul Sharma</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#1A2A3A] bg-[#0D1928] flex items-center gap-3">
                        <History size={20} className="text-[#556677]" />
                        <h2 className="text-base font-bold text-white">Version History Map</h2>
                    </div>

                    <div className="p-8 relative">
                        {/* Timeline line */}
                        <div className="absolute left-10 top-12 bottom-12 w-0.5 bg-[#1A2A3A]"></div>

                        <div className="space-y-8">
                            {VERSIONS.map((ver, i) => (
                                <div key={i} className="relative z-10 flex gap-6 group">
                                    <div className={`mt-1 w-4 h-4 rounded-full border-4 border-[#0A1420] shadow-[0_0_0_2px_currentColor] ml-0.5 shrink-0 ${ver.color} ${ver.current ? 'bg-[#00E5A0]' : 'bg-[#1A2A3A]'}`}></div>

                                    <div className={`flex-1 p-5 rounded-xl border transition-colors ${ver.current ? 'bg-[#00E5A0]/5 border-[#00E5A0]/30' : 'bg-[#060B14] border-[#1A2A3A] hover:border-[#2A3A4A]'}`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-sm font-black ${ver.current ? 'text-[#00E5A0]' : 'text-slate-300'}`}>{ver.v}</span>
                                                    {ver.current && <span className="text-[10px] bg-[#00E5A0] text-[#060B14] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Latest</span>}
                                                </div>
                                                <div className="text-xs text-[#8899AA] flex items-center gap-2">
                                                    <span>{ver.date}</span>
                                                    <span>•</span>
                                                    <span>By: <span className="text-white font-medium">{ver.author}</span></span>
                                                    <span>•</span>
                                                    <span>{ver.size}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="p-2 bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] hover:text-white hover:bg-[#2A3A4A] rounded-lg transition-colors tooltip-trigger" title="Preview">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2 bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] hover:text-[#0066FF] hover:bg-[#0066FF]/10 hover:border-[#0066FF]/30 rounded-lg transition-colors tooltip-trigger" title="Download">
                                                    <Download size={16} />
                                                </button>
                                                {!ver.current && (
                                                    <button className="pl-3 pr-4 py-2 border border-rose-500/50 bg-rose-500/10 text-rose-500 text-xs font-bold rounded-lg hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-2">
                                                        <Undo size={14} /> Restore Version
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-sm text-slate-300 bg-[#0A1420] border border-[#1A2A3A] p-3 rounded-lg flex items-start gap-2">
                                            <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${ver.current ? 'text-[#00E5A0]' : 'text-[#556677]'}`} />
                                            <p className="leading-relaxed">{ver.change}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
