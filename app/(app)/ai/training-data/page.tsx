"use client";

import React, { useState } from 'react';
import { Database, Filter, Search, FileText, CheckCircle2, AlertTriangle, ShieldCheck, DownloadCloud, RotateCw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AITrainingDataPage() {
    const [activeTab, setActiveTab] = useState('Anonymized Logs');
    const tabs = ['Anonymized Logs', 'Excluded PII', 'Model Feedback Corpus', 'Synthetic Data Gen'];

    const dataLogs = [
        { id: 'LOG-4092', source: 'Recruiting (ATS)', records: '14,020', piiRedacted: true, date: 'Oct 24, 2023', status: 'Indexed' },
        { id: 'LOG-4091', source: 'Helpdesk Tickets', records: '2,805', piiRedacted: true, date: 'Oct 23, 2023', status: 'Indexed' },
        { id: 'LOG-4090', source: 'Performance Reviews', records: '850', piiRedacted: false, date: 'Oct 22, 2023', status: 'Quarantined' },
        { id: 'LOG-4089', source: 'Exit Interviews', records: '112', piiRedacted: true, date: 'Oct 21, 2023', status: 'Indexed' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Database size={28} className="text-cyan-400" /> Training Data Vault
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Manage the specific proprietary datasets used to fine-tune Kaarya's embedded LLMs and prediction models. Includes automated PII stripping.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <ShieldCheck size={16} className="mr-2" /> Compliance Audit
                    </Button>
                    <Button className="bg-cyan-600 hover:bg-cyan-500 text-white border-none py-2 px-6">
                        <RotateCw size={16} className="mr-2" /> Sync Datalake
                    </Button>
                </div>
            </div>

            {/* Smart Summary Board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 shrink-0">
                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex items-center gap-4">
                    <div className="bg-[#1A2A3A] p-3 rounded-xl border border-[#2A3A4A] text-[#8899AA]">
                        <Database size={24} />
                    </div>
                    <div>
                        <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-1">Total Clean Records</div>
                        <div className="text-2xl font-bold text-white">1.8M</div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-cyan-500/20 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 text-cyan-400 relative z-10">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="relative z-10">
                        <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-1">Automatically Redacted</div>
                        <div className="text-2xl font-bold text-cyan-400">45.2k</div>
                        <div className="text-[10px] text-cyan-500 mt-1 font-medium">Names, SSNs, Salaries</div>
                    </div>
                </div>

                <div className="md:col-span-2 bg-[#0D1928] border border-red-500/20 p-5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-start gap-4">
                        <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-red-500 flex-shrink-0 mt-1">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <div className="text-white text-sm font-semibold mb-1">Quarantine Alert: Performance Reviews</div>
                            <div className="text-[#8899AA] text-xs leading-relaxed max-w-sm">Batch LOG-4090 bypassed the PII redactor. It contains un-anonymized manager feedback. Data is isolated from model training.</div>
                        </div>
                    </div>
                    <Button variant="secondary" className="border-red-500/30 text-red-400 text-xs px-3 shadow-none">Review</Button>
                </div>
            </div>

            {/* Data Queue */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
                <div className="flex space-x-1 bg-[#1A2A3A] p-1 rounded-xl overflow-x-auto w-full md:w-auto hide-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${activeTab === tab
                                    ? 'bg-[#0D1928] text-white shadow shadow-black/20'
                                    : 'text-[#8899AA] hover:text-white hover:bg-[#2A3A4A]'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="bg-[#0D1928] border border-[#2A3A4A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-cyan-500/50 transition-colors w-full md:w-64">
                        <Search size={16} className="text-[#8899AA]" />
                        <input type="text" placeholder="Search batch ID or source..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" />
                    </div>
                </div>
            </div>

            {/* Main Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#0A1420] border-b border-[#1A2A3A] sticky top-0 z-10 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">
                                <th className="px-6 py-4">Batch ID</th>
                                <th className="px-6 py-4">Data Source</th>
                                <th className="px-6 py-4">Record Count</th>
                                <th className="px-6 py-4">Ingestion Date</th>
                                <th className="px-6 py-4">PII Redaction</th>
                                <th className="px-6 py-4 text-right">Status / Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {dataLogs.map((log, i) => (
                                <tr key={i} className={`hover:bg-[#131B2B] transition-colors group ${log.status === 'Quarantined' ? 'bg-red-500/5 hover:bg-red-500/10' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-white font-mono">{log.id}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#8899AA]">{log.source}</td>
                                    <td className="px-6 py-4 text-sm text-white font-medium">{log.records}</td>
                                    <td className="px-6 py-4 text-sm text-[#8899AA]">{log.date}</td>
                                    <td className="px-6 py-4">
                                        {log.piiRedacted ? (
                                            <span className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium bg-cyan-500/10 px-2.5 py-1 rounded w-fit border border-cyan-500/20">
                                                <ShieldCheck size={14} /> Passed
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-xs text-red-500 font-medium bg-red-500/10 px-2.5 py-1 rounded w-fit border border-red-500/20">
                                                <AlertTriangle size={14} /> Failed Check
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {log.status === 'Indexed' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                                <CheckCircle2 size={14} /> Indexed
                                            </span>
                                        ) : (
                                            <div className="flex justify-end gap-2">
                                                <Button variant="secondary" className="border-red-500/30 text-red-400 text-[10px] h-auto py-1.5 px-3">Purge</Button>
                                                <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-[#2A3A4A] text-[10px] h-auto py-1.5 px-3">Run Masking script</Button>
                                            </div>
                                        )}
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
