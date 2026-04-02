"use client";

import React, { useState } from 'react';
import {
    AlertTriangle, Search, Filter, MessageSquare, CheckCircle2, XCircle,
    ArrowRight, UserCheck, Eye, UploadCloud, Clock
} from 'lucide-react';
import Link from 'next/link';

const DISCREPANCIES = [
    {
        id: 'DIS-092', candidate: 'Amit Singh', role: 'Sales Exec',
        type: 'Education', vendor: 'Checkr', reportedOn: '2 days ago',
        severity: 'High', status: 'Pending Review',
        desc: 'Graduation year mismatch. Candidate stated 2019, university records show 2021.'
    },
    {
        id: 'DIS-091', candidate: 'Suman Rao', role: 'Marketing Mgr',
        type: 'Employment', vendor: 'HireRight', reportedOn: '3 days ago',
        severity: 'Medium', status: 'Clarification Requested',
        desc: 'Dates of employment at previous company differ by 3 months. Candidate claims to have joining letter.'
    },
    {
        id: 'DIS-088', candidate: 'Vikram Batra', role: 'Security Analyst',
        type: 'Criminal', vendor: 'FirstAdvantage', reportedOn: '5 days ago',
        severity: 'Critical', status: 'HR Escalated',
        desc: 'Match found in local court database for civil dispute. Requires Legal team review.'
    },
];

export default function DiscrepancyManagementScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col h-screen">
            <div className="max-w-[1200px] mx-auto w-full flex flex-col flex-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <AlertTriangle className="text-amber-500" size={28} />
                            Discrepancy Resolution Center
                        </h1>
                        <p className="text-sm text-[#8899AA]">Manage and resolve flags raised during background verifications.</p>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-3 mb-6 shrink-0 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search candidate, ID..."
                                className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-amber-500 w-64 transition-colors"
                            />
                        </div>
                        <button className="px-3 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-sm text-[#8899AA] hover:text-white transition-colors flex items-center">
                            <Filter size={16} className="mr-2" /> Severity
                        </button>
                    </div>

                    <div className="flex font-semibold text-sm">
                        <div className="px-4 py-2 border-r border-[#1A2A3A] text-white">Pending Review <span className="ml-2 bg-amber-500 text-[#060B14] px-1.5 py-0.5 rounded text-xs">12</span></div>
                        <div className="px-4 py-2 text-[#8899AA] hover:text-white cursor-pointer transition-colors">Resolved</div>
                    </div>
                </div>

                {/* List Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                    {DISCREPANCIES.map((item) => (
                        <DiscrepancyCard key={item.id} item={item} />
                    ))}
                </div>

            </div>
        </div>
    );
}

function DiscrepancyCard({ item }: any) {
    const isCritical = item.severity === 'Critical';
    const isHigh = item.severity === 'High';

    const severityColor = isCritical ? 'bg-rose-500/10 text-rose-500 border-rose-500/30' :
        isHigh ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' :
            'bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/30';

    return (
        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg hover:border-[#2A3A4A] transition-colors relative overflow-hidden group">
            {isCritical && <div className="absolute top-0 left-0 bottom-0 w-1 bg-rose-500"></div>}

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold text-white">{item.candidate}</h3>
                            <span className="text-xs bg-[#1A2A3A] px-2 py-0.5 rounded font-mono text-[#8899AA]">{item.id}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide flex items-center gap-1 ${severityColor}`}>
                                {isCritical && <AlertTriangle size={10} />}
                                {item.severity}
                            </span>
                        </div>
                        <p className="text-sm text-[#8899AA]">Role: <span className="text-white">{item.role}</span> • Vendor: <span className="text-white">{item.vendor}</span></p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-amber-500 flex items-center justify-end gap-1.5 mb-1">
                            <Clock size={14} /> {item.status}
                        </div>
                        <div className="text-xs text-[#556677]">Reported {item.reportedOn}</div>
                    </div>
                </div>

                <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-4 mb-5">
                    <div className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Discrepancy Details ({item.type})</div>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#1A2A3A]">
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-[#1A2A3A] text-xs font-semibold text-white rounded hover:bg-[#2A3A4A] transition-colors flex items-center gap-1.5">
                            <MessageSquare size={14} /> Send Query to Candidate
                        </button>
                        <button className="px-3 py-1.5 bg-[#1A2A3A] text-xs font-semibold text-[#8899AA] rounded hover:bg-[#2A3A4A] hover:text-white transition-colors flex items-center gap-1.5">
                            <UploadCloud size={14} /> Request Re-upload
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-1.5 border border-rose-500/50 bg-rose-500/10 text-rose-500 text-xs font-bold rounded hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-1.5">
                            <XCircle size={14} /> Reject Candidate
                        </button>
                        <button className="px-4 py-1.5 border border-[#00E5A0]/50 bg-[#00E5A0]/10 text-[#00E5A0] text-xs font-bold rounded hover:bg-[#00E5A0] hover:text-[#060B14] transition-colors flex items-center gap-1.5">
                            <UserCheck size={14} /> Override & Accept
                        </button>
                        <Link href={`/bgv/status/${item.id}`} className="px-4 py-1.5 bg-[#0066FF] text-white text-xs font-bold rounded hover:bg-[#0052cc] transition-colors flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,102,255,0.3)]">
                            View Full Case <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
