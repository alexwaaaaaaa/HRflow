"use client";
import React from 'react';
import { ShieldAlert, MapPin, Laptop, FileDigit, Calendar, Clock, UserX, AlertTriangle, Play, CheckCircle2, Siren } from 'lucide-react';
import Link from 'next/link';

export default function IncidentDetailScreen({ params }: { params: { id: string } }) {
    const defaultId = "INC-2026-089";

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/security/incidents" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Incidents</Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-white mb-1">Lost Corporate Laptop <span className="text-[#556677] font-mono font-normal">({defaultId})</span></h1>
                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                            <Siren size={12} /> Investigating
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#1A2A3A] transition-colors">
                        Assign Owner
                    </button>
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                        Mark Resolved
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">

                {/* Left Column - Details */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-4 border-b border-[#1A2A3A] pb-2">Incident Metadata</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] text-[#556677] font-bold uppercase block mb-1">Reported By</label>
                                <div className="text-sm text-white font-medium flex items-center gap-2">
                                    Aditi Krishnan (VP Eng)
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-[#556677] font-bold uppercase block mb-1">Time of Report</label>
                                <div className="text-sm text-white font-medium flex items-center gap-2">
                                    <Clock size={14} className="text-[#8899AA]" /> Oct 24, 2026 - 14:30 IST
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-[#556677] font-bold uppercase block mb-1">Severity</label>
                                <div className="text-sm text-rose-400 font-bold flex items-center gap-2">
                                    <AlertTriangle size={14} /> High Risk (Hardware)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-4 border-b border-[#1A2A3A] pb-2 flex items-center gap-2">
                            <Laptop size={16} /> Compromised Asset
                        </h3>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4">
                            <div className="text-white font-bold mb-1">MacBook Pro 16" (M2)</div>
                            <div className="text-xs text-[#8899AA] font-mono mb-4">SN: F02F3A99XLK</div>

                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between items-center pb-2 border-b border-[#1A2A3A]">
                                    <span className="text-[#556677]">MDM Status</span>
                                    <span className="text-white font-bold">Unreachable (Offline)</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-[#1A2A3A]">
                                    <span className="text-[#556677]">FileVault Encryption</span>
                                    <span className="text-emerald-400 font-bold">Verified ON</span>
                                </div>
                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-[#556677]">Assigned User</span>
                                    <span className="text-white font-bold text-right">Ravi K. (EMP-1022)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Playbook & Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Automated Response Playbook */}
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2 relative z-10"><Play size={18} className="text-indigo-400" /> Security Response Playbook</h3>
                        <p className="text-sm text-[#8899AA] mb-6 relative z-10">Automated steps initiated based on the "Hardware Loss" SOAR playbook.</p>

                        <div className="space-y-3 relative z-10">
                            <div className="bg-[#0A1420] border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                    <span className="text-emerald-400 font-medium text-sm">Force logout user EMP-1022 from all active web sessions</span>
                                </div>
                                <span className="text-[10px] text-[#556677] uppercase font-bold">Auto-executed</span>
                            </div>
                            <div className="bg-[#0A1420] border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                    <span className="text-emerald-400 font-medium text-sm">Invoke MDM remote wipe command (Pending device check-in)</span>
                                </div>
                                <span className="text-[10px] text-[#556677] uppercase font-bold">Queued by MDM</span>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border-2 border-[#556677] shrink-0" />
                                    <span className="text-white font-medium text-sm">Revoke VPN and internal CA certificates</span>
                                </div>
                                <button className="text-indigo-400 text-xs font-bold hover:text-indigo-300">Run Action</button>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border-2 border-[#556677] shrink-0" />
                                    <span className="text-white font-medium text-sm">File First Information Report (FIR) / Police report</span>
                                </div>
                                <button className="text-indigo-400 text-xs font-bold hover:text-indigo-300">Mark Done</button>
                            </div>
                        </div>
                    </div>

                    {/* Work Notes / Timeline */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A]">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">Investigation Notes</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Note Input */}
                            <div className="relative">
                                <textarea
                                    className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-xl p-4 text-sm resize-none outline-none focus:border-indigo-500 h-[100px]"
                                    placeholder="Add notes, updates, or attach incident proofs..."
                                />
                                <button className="absolute bottom-3 right-3 bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-500 transition-colors">Post Note</button>
                            </div>

                            {/* Timeline stream */}
                            <div className="border-l-2 border-[#1A2A3A] pl-6 space-y-6 ml-2 mt-8">
                                <div className="relative">
                                    <div className="absolute -left-[31px] bg-[#0A1420] p-1">
                                        <div className="w-3 h-3 bg-[#2A3A4A] rounded-full" />
                                    </div>
                                    <div className="text-xs text-[#556677] font-bold uppercase mb-1">Oct 24, 2026 - 15:10 IST</div>
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl">
                                        <p className="text-sm text-white mb-2">User reported leaving laptop in an Uber. Attempted to track via Find My Mac, but device is completely offline. Encryption is confirmed active.</p>
                                        <div className="text-xs text-[#8899AA]">- Sanjay (Security Ops)</div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[31px] bg-[#0A1420] p-1">
                                        <div className="w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.5)]" />
                                    </div>
                                    <div className="text-xs text-[#556677] font-bold uppercase mb-1">Oct 24, 2026 - 14:30 IST</div>
                                    <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl">
                                        <p className="text-sm text-rose-400 font-bold">Incident Declared</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
