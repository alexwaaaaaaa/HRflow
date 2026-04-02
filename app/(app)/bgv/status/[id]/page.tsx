"use client";

import React, { useState } from 'react';
import {
    ChevronLeft, Download, ShieldCheck, FileText, CheckCircle2,
    XCircle, Clock, AlertTriangle, ExternalLink, MapPin, Building2,
    GraduationCap, Mail, Phone, Calendar
} from 'lucide-react';
import Link from 'next/link';

const CHECKS = [
    { title: 'Identity Verification (PAN)', status: 'Clear', date: '08 Nov 2024', file: 'PAN_Verification.pdf' },
    { title: 'Identity Verification (Aadhaar)', status: 'Clear', date: '08 Nov 2024', file: 'UIDAI_Check.pdf' },
    { title: 'Address Check (Current)', status: 'Clear', date: '10 Nov 2024', file: 'Address_Physical_Visit.pdf' },
    { title: 'Address Check (Permanent)', status: 'Clear', date: '11 Nov 2024', file: 'Address_Postal.pdf' },
    { title: 'Highest Education (B.Tech)', status: 'Discrepancy', date: '12 Nov 2024', file: 'Edu_Check_Report.pdf', note: 'University name mismatch on provisional certificate.' },
    { title: 'Previous Employment 1', status: 'In Progress', date: '-', file: null },
    { title: 'Criminal/Court Record', status: 'In Progress', date: '-', file: null },
];

export default function BGVDetailScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto pb-12">

                {/* Header */}
                <div className="mb-6">
                    <Link href="/bgv/status" className="inline-flex items-center text-sm text-[#8899AA] hover:text-white mb-4 transition-colors">
                        <ChevronLeft size={16} className="mr-1" /> Back to Tracker
                    </Link>
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-[#1A2A3A] border border-[#2A3A4A] overflow-hidden">
                                <img src="https://i.pravatar.cc/150?u=bgc" alt="Candidate" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                                    Rahul Sharma
                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-wide">
                                        Discrepancy Found
                                    </span>
                                </h1>
                                <p className="text-sm text-[#8899AA] mt-1 font-medium">BGV ID: <span className="text-white">BGC-2024-089</span> • Role: SDE II</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white shadow-sm">
                                <Download size={16} className="mr-2" /> Download Full Report
                            </button>
                            <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                                Request Clarification
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column: Summary & Info */}
                    <div className="md:col-span-1 space-y-6">

                        {/* Overall Progress */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                            <h3 className="text-sm font-semibold text-[#8899AA] uppercase tracking-wider mb-4">Overall Progress</h3>

                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-black text-white leading-none">65<span className="text-xl">%</span></span>
                                <span className="text-sm text-[#8899AA] font-medium pb-1">Completed</span>
                            </div>
                            <div className="h-2 w-full bg-[#1A2A3A] rounded-full overflow-hidden mb-6">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-[#556677] mb-1">Vendor</div>
                                    <div className="flex items-center gap-2 text-sm text-white font-medium">
                                        <div className="w-5 h-5 rounded bg-[#1A2A3A] flex items-center justify-center"><ShieldCheck size={12} className="text-[#0066FF]" /></div>
                                        FirstAdvantage
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-[#556677] mb-1">Initiated On</div>
                                    <div className="text-sm text-white font-medium flex items-center gap-2">
                                        <Calendar size={14} className="text-[#8899AA]" /> 05 Nov 2024
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-[#556677] mb-1">Target ETA</div>
                                    <div className="text-sm text-white font-medium flex items-center gap-2">
                                        <Clock size={14} className="text-[#8899AA]" /> 15 Nov 2024 (3 days remaining)
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Candidate Details */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl shadow-lg overflow-hidden">
                            <div className="p-4 border-b border-[#1A2A3A] bg-[#0D1928]">
                                <h3 className="text-sm font-semibold text-[#8899AA] uppercase tracking-wider">Submitted Details</h3>
                            </div>
                            <div className="p-5 space-y-4">
                                <InfoItem icon={<Mail size={16} />} label="Email" value="rahul.s@example.com" />
                                <InfoItem icon={<Phone size={16} />} label="Phone" value="+91 98765 43210" />
                                <InfoItem icon={<MapPin size={16} />} label="Current Address" value="A-102, Skyline Apts, HSR Layout, Bangalore - 560102" />
                                <InfoItem icon={<GraduationCap size={16} />} label="Highest Edu" value="B.Tech (CS), NIT Trichy (2020)" />
                                <InfoItem icon={<Building2 size={16} />} label="Last Employer" value="TechNova Solutions (2 yrs)" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Check Items */}
                    <div className="md:col-span-2">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                            <div className="p-5 border-b border-[#1A2A3A] bg-[#0D1928] flex justify-between items-center">
                                <h3 className="text-sm font-semibold text-[#8899AA] uppercase tracking-wider">Verification Breakdown</h3>
                                <div className="text-xs font-bold px-2 py-1 rounded bg-[#1A2A3A] text-white">7 Components</div>
                            </div>

                            <div className="divide-y divide-[#1A2A3A]">
                                {CHECKS.map((chk, i) => (
                                    <div key={i} className={`p-5 hover:bg-[#1A2A3A]/30 transition-colors ${chk.status === 'Discrepancy' ? 'bg-amber-500/5' : ''}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-4">
                                                <StatusIcon status={chk.status} />
                                                <div>
                                                    <h4 className="font-bold text-white text-base mb-1">{chk.title}</h4>

                                                    {chk.status === 'Discrepancy' && chk.note && (
                                                        <div className="mt-2 mb-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm text-amber-500 flex gap-2">
                                                            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                                                            <p>{chk.note}</p>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-xs text-[#556677]">Updated: {chk.date}</span>
                                                        {chk.file && (
                                                            <button className="flex items-center gap-1.5 text-xs font-semibold text-[#0066FF] hover:underline">
                                                                <FileText size={14} /> View Report
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {chk.status === 'Discrepancy' && (
                                                <div className="flex flex-col gap-2 shrink-0">
                                                    <button className="px-3 py-1.5 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-xs font-bold rounded hover:bg-[#2A3A4A] transition-colors">
                                                        Override (Accept)
                                                    </button>
                                                    <button className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold rounded hover:bg-rose-500/20 transition-colors">
                                                        Mark Failed
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon, label, value }: any) {
    return (
        <div className="flex gap-3 text-sm">
            <div className="text-[#556677] shrink-0 mt-0.5">{icon}</div>
            <div>
                <div className="text-xs text-[#556677] mb-0.5">{label}</div>
                <div className="text-white font-medium">{value}</div>
            </div>
        </div>
    );
}

function StatusIcon({ status }: { status: string }) {
    if (status === 'Clear') {
        return <div className="w-8 h-8 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0] flex items-center justify-center shrink-0"><CheckCircle2 size={16} /></div>;
    }
    if (status === 'Discrepancy') {
        return <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0"><AlertTriangle size={16} /></div>;
    }
    if (status === 'Failed') {
        return <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center shrink-0"><XCircle size={16} /></div>;
    }
    return <div className="w-8 h-8 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] flex items-center justify-center shrink-0"><Clock size={16} /></div>;
}
