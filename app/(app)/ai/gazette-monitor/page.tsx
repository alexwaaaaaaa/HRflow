"use client";

import React, { useState } from 'react';
import { BookMarked, Search, Filter, AlertCircle, Calendar, ArrowRight, Download, CheckCircle, Scale } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function GazetteMonitorPage() {
    const [activeTab, setActiveTab] = useState('All Updates');
    const tabs = ['All Updates', 'Action Required', 'Resolved', 'Archived'];

    const updates = [
        { id: 'GAZ-2023-10-A', title: 'Amendment to Minimum Wages Act (Karnataka)', date: 'Oct 15, 2023', category: 'Minimum Wage', impact: 'High', status: 'Pending Review', aiSummary: 'Basic DA updated by ₹450/month across all skill categories. Affects 24 employees in the generic staff pool.', deadline: 'Nov 1, 2023' },
        { id: 'GAZ-2023-09-C', title: 'EPFO Form 11 Digital Integration Mandate', date: 'Sep 28, 2023', category: 'PF & Compliance', impact: 'Medium', status: 'Actioned', aiSummary: 'New API mandate for Form 11 submissions natively. Kaarya Engineering has scheduled the patch.', deadline: 'Dec 31, 2023' },
        { id: 'GAZ-2023-09-B', title: 'Revision of Professional Tax Slabs (Maharashtra)', date: 'Sep 12, 2023', category: 'Taxation', impact: 'High', status: 'Resolved', aiSummary: 'PT deduction exemption limit raised for women employees up to ₹25,000 CTC.', deadline: 'Oct 1, 2023' },
        { id: 'GAZ-2023-08-A', title: 'Changes to Maternity Benefit Act Notifications', date: 'Aug 04, 2023', category: 'Labor Law', impact: 'Low', status: 'Resolved', aiSummary: 'Clarification on work-from-home provisions post-maternity leave.', deadline: 'Self-regulatory' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <BookMarked size={28} className="text-indigo-400" /> Gazette & Law Monitor
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        AI scans state and central government gazettes daily to detect labor law amendments, PF/ESI changes, and tax updates affecting your workforce.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Download size={16} className="mr-2" /> Export Audit Log
                    </Button>
                </div>
            </div>

            {/* Smart Summary */}
            <div className="bg-[#0A1420] border-l-4 border-indigo-500 p-6 mb-8 rounded-r-2xl shadow-md border-y border-r border-y-[#1A2A3A] border-r-[#1A2A3A]">
                <div className="flex items-start gap-4">
                    <div className="bg-indigo-500/10 p-2 rounded-lg shrink-0 mt-1">
                        <Scale size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-medium mb-1">Pending Compliance Updates</h3>
                        <p className="text-[#8899AA] text-sm leading-relaxed mb-3">
                            You have <strong className="text-amber-500">1 High Impact</strong> gazette notification pending review. This change to the Karnataka Minimum Wages Act requires payroll validation before the end of the month to avoid statutory non-compliance.
                        </p>
                        <Link href="/ai/gazette-monitor/GAZ-2023-10-A">
                            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-1.5 px-4 h-auto text-sm">
                                Review Recommendation <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex space-x-1 bg-[#1A2A3A] p-1 rounded-xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab
                                    ? 'bg-[#0D1928] text-white shadow shadow-black/20'
                                    : 'text-[#8899AA] hover:text-white hover:bg-[#2A3A4A]'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="bg-[#0D1928] border border-[#2A3A4A] rounded-xl flex items-center px-3 py-2 flex-1 md:w-64 focus-within:border-indigo-500 transition-colors">
                        <Search size={16} className="text-[#8899AA]" />
                        <input
                            type="text"
                            placeholder="Search gazettes..."
                            className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full placeholder:text-[#445566]"
                        />
                    </div>
                    <Button variant="secondary" className="border-[#2A3A4A] px-3">
                        <Filter size={16} />
                    </Button>
                </div>
            </div>

            {/* Updates List */}
            <div className="space-y-4">
                {updates.map((update, i) => (
                    <Link href={`/ai/gazette-monitor/${update.id}`} key={i} className="block">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] hover:border-indigo-500/40 rounded-2xl p-6 transition-all group flex flex-col md:flex-row justify-between gap-6 relative">
                            {update.status === 'Pending Review' && (
                                <div className="absolute top-0 right-0 w-2 h-full bg-amber-500/80 rounded-r-2xl" />
                            )}

                            <div className="flex-1">
                                <div className="flex items-start gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">{update.title}</h3>
                                    {update.impact === 'High' && (
                                        <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase rounded border border-red-500/20 mt-1 shrink-0">
                                            High Impact
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-[#8899AA] mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {update.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#445566]" />
                                    <span>{update.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#445566]" />
                                    <span className="font-mono">{update.id}</span>
                                </div>
                                <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl">
                                    <h4 className="text-xs font-semibold text-indigo-400 mb-1 uppercase tracking-wider">AI Summary</h4>
                                    <p className="text-sm text-[#8899AA] leading-relaxed">{update.aiSummary}</p>
                                </div>
                            </div>

                            <div className="md:w-64 flex flex-col items-end justify-between shrink-0">
                                <div className="text-right">
                                    <div className="text-xs text-[#8899AA] mb-1">Effective Deadline</div>
                                    <div className="text-sm font-medium text-white">{update.deadline}</div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    {update.status === 'Pending Review' && (
                                        <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium px-3 py-1.5 rounded-lg border border-amber-500/20">
                                            <AlertCircle size={16} /> Pending Review
                                        </span>
                                    )}
                                    {update.status === 'Resolved' && (
                                        <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-sm font-medium px-3 py-1.5 rounded-lg border border-emerald-500/20">
                                            <CheckCircle size={16} /> Resolved
                                        </span>
                                    )}
                                    {update.status === 'Actioned' && (
                                        <span className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 text-sm font-medium px-3 py-1.5 rounded-lg border border-blue-500/20">
                                            <ArrowRight size={16} /> Auto-Actioned
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
