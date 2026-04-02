"use client";

import React, { useState } from 'react';
import { FileText, Search, UploadCloud, BrainCircuit, ShieldCheck, CheckCircle2, AlertTriangle, FileSignature, Filter, Cpu } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function DocumentIntelligencePage() {
    const [activeTab, setActiveTab] = useState('All Scans');
    const tabs = ['All Scans', 'Failed Validation', 'Pending Signatures', 'Completed'];

    const documents = [
        { id: 'DOC-1004', type: 'Offer Letter', emp: 'Sneha Rao', score: 100, status: 'Validated', time: '10 mins ago', issues: [] },
        { id: 'DOC-1003', type: 'NDA', emp: 'Vikram Singh', score: 98, status: 'Validated', time: '1 hr ago', issues: [] },
        { id: 'DOC-1002', type: 'Form 16', emp: 'Arif Khan', score: 65, status: 'Flagged', time: '3 hrs ago', issues: ['Mismatched PAN formatting', 'Missing Employer Seal'] },
        { id: 'DOC-1001', type: 'Relieving Letter', emp: 'Neha Gupta', score: 40, status: 'Failed', time: '5 hrs ago', issues: ['Suspected Digital Tampering', 'Invalid Company Registry'] },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <BrainCircuit size={28} className="text-fuchsia-400" /> Document Intelligence
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        AI-powered OCR and verification engine for onboarding docs, tax forms, and compliance records. Auto-detects fraud and missing signatures.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <ShieldCheck size={16} className="mr-2" /> Train V2 Model
                    </Button>
                    <Button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-none py-2 px-6">
                        <UploadCloud size={16} className="mr-2" /> Batch Upload Scans
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">

                {/* Metric Cards */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-[#1A2A3A] p-2 rounded-lg text-emerald-400">
                            <CheckCircle2 size={18} />
                        </div>
                        <h3 className="text-[#8899AA] text-sm font-medium">Auto-Validated (MTD)</h3>
                    </div>
                    <div className="text-3xl font-bold text-white">2,845</div>
                    <div className="text-xs text-emerald-400 mt-2 font-medium">94% Automation Rate</div>
                </div>

                <div className="bg-[#0D1928] border border-red-500/20 shadow-[0_0_15px_rgba(255,68,68,0.05)] p-5 rounded-2xl flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-[100px] pointer-events-none" />
                    <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg text-red-400">
                            <AlertTriangle size={18} />
                        </div>
                        <h3 className="text-[#8899AA] text-sm font-medium">Fraud Detected</h3>
                    </div>
                    <div className="text-3xl font-bold text-red-400 relative z-10">14</div>
                    <div className="text-xs text-red-500/80 mt-2 font-medium relative z-10 uppercase tracking-widest">+3 since yesterday</div>
                </div>

                <div className="lg:col-span-2 bg-gradient-to-r from-[#131B2B] to-[#0D1928] border border-fuchsia-500/30 p-6 rounded-2xl relative overflow-hidden flex items-center justify-between">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10">
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            <Cpu size={20} className="text-fuchsia-400" /> Parsing Engine Live
                        </h3>
                        <p className="text-[#8899AA] text-sm leading-relaxed max-w-md">
                            Processing queue: <strong>42 documents remaining</strong>. Current extraction confidence across identity parsing models is averaging 99.1%.
                        </p>
                    </div>

                    <div className="relative z-10 w-24 h-24 rounded-full border-[6px] border-[#1A2A3A] border-t-fuchsia-500 border-r-fuchsia-500 flex items-center justify-center animate-spin-slow">
                        <div className="w-20 h-20 rounded-full border-[2px] border-[#2A3A4A] flex items-center justify-center bg-[#0D1928]">
                            <span className="text-fuchsia-400 font-bold text-xl animate-none absolute transform -rotate-0">99%</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Document Queue */}
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
                    <div className="bg-[#0D1928] border border-[#2A3A4A] rounded-xl flex items-center px-3 py-2 flex-1 md:w-64 focus-within:border-fuchsia-500 transition-colors">
                        <Search size={16} className="text-[#8899AA]" />
                        <input
                            type="text"
                            placeholder="Search employee or ID..."
                            className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full placeholder:text-[#445566]"
                        />
                    </div>
                    <Button variant="secondary" className="border-[#2A3A4A] px-3">
                        <Filter size={16} />
                    </Button>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Document (ID)</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Confidence Score</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status / Issues</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {documents.map((doc, i) => (
                            <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                <td className="px-6 py-4 text-sm font-medium text-white group-hover:text-fuchsia-400 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <FileText size={16} className="text-[#445566]" />
                                        {doc.type}
                                    </div>
                                    <div className="text-xs text-[#8899AA] font-mono mt-1 ml-6">{doc.id}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{doc.emp}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 bg-[#1A2A3A] h-1.5 rounded-full overflow-hidden">
                                            <div className={`h-full ${doc.score > 90 ? 'bg-emerald-500' : doc.score > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${doc.score}%` }} />
                                        </div>
                                        <span className={`text-sm font-bold ${doc.score > 90 ? 'text-emerald-400' : doc.score > 60 ? 'text-amber-500' : 'text-red-400'}`}>{doc.score}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {doc.status === 'Validated' ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                                            Processed
                                        </span>
                                    ) : (
                                        <div className="flex flex-col gap-1.5">
                                            <span className={`inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider border ${doc.status === 'Failed' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                                {doc.status}
                                            </span>
                                            <div className="text-xs text-[#8899AA] flex flex-col gap-0.5">
                                                {doc.issues.map((iss, j) => <span key={j}>• {iss}</span>)}
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {doc.status === 'Validated' ? (
                                        <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-[#8899AA] border-none text-xs py-1.5 px-3 h-auto">
                                            View Data
                                        </Button>
                                    ) : (
                                        <Link href={`/ai/document-ai`}>
                                            <Button className="bg-[#2A3A4A] hover:bg-[#3A4A5A] text-white border-none text-xs py-1.5 px-3 h-auto outline outline-1 outline-offset-[-1px] outline-red-500/30">
                                                Manual Review
                                            </Button>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
