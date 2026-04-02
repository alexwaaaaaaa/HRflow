"use client";
import React from 'react';
import { ShieldCheck, Download, AlertTriangle, FileText, Calendar, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function EntityComplianceScreen() {
    const REGISTERS = [
        { title: 'Form T (Maternity Benefit)', entity: 'Acme Tech (Parent)', due: 'Overdue (Oct 15)', status: 'danger' },
        { title: 'Form 24Q (TDS Q2)', entity: 'Acme Logistics', due: 'Due in 2 days (Oct 31)', status: 'warning' },
        { title: 'Form A-1 (PF Return)', entity: 'Acme Retail', due: 'Nov 15, 2025', status: 'upcoming' },
        { title: 'Form III (LWF Return)', entity: 'Acme Tech (Parent)', due: 'Completed (Oct 10)', status: 'success' },
    ];

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><ShieldCheck size={24} className="text-emerald-400" /> Group Compliance Calendar</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track statutory deadlines and generated registers across all legal entities.</p>
                </div>
                <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                    <Download size={16} /> Download Group Audit Log
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                            <h3 className="text-white font-bold flex items-center gap-2">Upcoming Deadlines</h3>
                            <select className="bg-[#131B2B] border border-[#2A3A4A] text-xs px-2 py-1 rounded text-[#AABBCC] outline-none">
                                <option>All Entities</option>
                                <option>Acme Tech (Parent)</option>
                                <option>Acme Retail</option>
                            </select>
                        </div>

                        <div className="divide-y divide-[#1A2A3A]">
                            {REGISTERS.map((reg, i) => (
                                <div key={i} className={`p-5 flex items-center justify-between hover:bg-[#131B2B]/50 transition-colors ${reg.status === 'danger' ? 'bg-rose-500/5' : ''}`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl border ${reg.status === 'danger' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : reg.status === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : reg.status === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-[#131B2B] border-[#2A3A4A] text-[#8899AA]'}`}>
                                            {reg.status === 'danger' || reg.status === 'warning' ? <AlertTriangle size={20} /> : reg.status === 'success' ? <CheckCircle2 size={20} /> : <Calendar size={20} />}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">{reg.title}</h4>
                                            <div className="text-[#556677] text-xs font-medium flex items-center gap-3">
                                                <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-white">{reg.entity}</span>
                                                • {reg.due}
                                            </div>
                                        </div>
                                    </div>

                                    {reg.status !== 'success' && (
                                        <button className="text-indigo-400 hover:text-indigo-300 font-bold text-sm bg-indigo-500/10 px-4 py-2 rounded-lg transition-colors">
                                            Generate File
                                        </button>
                                    )}
                                    {reg.status === 'success' && (
                                        <button className="text-[#556677] hover:text-white font-bold text-sm bg-[#1A2A3A] px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                                            <Download size={14} /> Download
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Group Risk Score</h3>

                        <div className="flex flex-col items-center justify-center py-4">
                            <div className="w-32 h-32 relative flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" className="stroke-[#1A2A3A] fill-none" strokeWidth="12" />
                                    <circle cx="64" cy="64" r="56" className="stroke-amber-500 fill-none" strokeWidth="12" strokeDasharray="351" strokeDashoffset={351 * 0.25} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-white">75%</span>
                                    <span className="text-[#8899AA] text-[10px] uppercase font-bold">Compliant</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mt-4">
                            <p className="text-amber-400 text-xs font-bold leading-relaxed mb-2 flex items-center gap-2"><AlertTriangle size={14} /> Action Required</p>
                            <p className="text-[#AABBCC] text-xs">You have 1 overdue filing (Form T) for Acme Tech which risks a penalty. Generating files will automatically update compliance score.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
