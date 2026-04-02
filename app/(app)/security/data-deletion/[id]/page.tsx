"use client";
import React from 'react';
import { Trash2, ShieldAlert, CheckCircle2, CircleDashed, FileText, UserX } from 'lucide-react';
import Link from 'next/link';

export default function DataDeletionStatusScreen({ params }: { params: { id: string } }) {
    const defaultUser = "Vikram Singh (EMP-2041)";

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <Link href="/security/data-deletion" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Data Deletion Requests</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Erasure Execution Protocol</h1>
                    <p className="text-[#8899AA] text-sm">Live tracking of automated dataset purging for {defaultUser}.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-3xl rounded-full pointer-events-none" />

                <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="w-16 h-16 bg-rose-500/10 border-2 border-rose-500/30 rounded-full flex items-center justify-center text-rose-400">
                        <Trash2 size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">Purge Sequence in Progress</h2>
                        <p className="text-sm text-[#8899AA]">Initiated by Meera Venkatesh (DPO) on Oct 24, 2026 - 16:30 IST.</p>
                    </div>
                </div>

                <div className="space-y-8 relative z-10">

                    {/* Step 1: Legal Hold */}
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border-2 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
                                <CheckCircle2 size={16} />
                            </div>
                            <div className="w-0.5 h-full bg-[#1A2A3A] mt-2 mb-2" />
                        </div>
                        <div className="pb-8">
                            <h3 className="text-white font-bold text-lg mb-1">Pre-flight: Statutory Check</h3>
                            <p className="text-sm text-[#8899AA] mb-3">Verified no active litigation or POSH grievances exist. Basic payroll info locked in WORM archive for 7 years.</p>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg text-xs font-mono text-emerald-400">
                                status = CLEARED; lock_applied_to_payroll = TRUE;
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Biometrics */}
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border-2 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
                                <CheckCircle2 size={16} />
                            </div>
                            <div className="w-0.5 h-full bg-[#1A2A3A] mt-2 mb-2" />
                        </div>
                        <div className="pb-8">
                            <h3 className="text-white font-bold text-lg mb-1">Phase 1: Secure Wipe Biometrics</h3>
                            <p className="text-sm text-[#8899AA] mb-3">API call to access control hardware to delete facial/fingerprint templates.</p>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg text-xs font-mono text-emerald-400 space-y-1">
                                <div>[200 OK] Hardware Gateway HQ_BLR_01 deletion confirmed.</div>
                                <div>[200 OK] Local cache purged.</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Unstructured PII (Active Step) */}
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center border-2 border-indigo-500/50 shrink-0">
                                <CircleDashed size={16} className="animate-spin" />
                            </div>
                            <div className="w-0.5 h-full bg-[#1A2A3A] mt-2 mb-2" />
                        </div>
                        <div className="pb-8">
                            <h3 className="text-white font-bold text-lg mb-1">Phase 2: Purge Unstructured PII</h3>
                            <p className="text-sm text-[#8899AA] mb-3">Locating and scrubbing profile photos, chat logs, loose documents, and survey metadata.</p>
                            <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-white font-medium flex items-center gap-2"><FileText size={14} className="text-[#556677]" /> S3 Bucket Scan (Resumes, Docs)</span>
                                    <span className="text-indigo-400 font-bold">Scanning... 64%</span>
                                </div>
                                <div className="w-full h-1 bg-[#0A1420] rounded-full overflow-hidden">
                                    <div className="w-[64%] h-full bg-indigo-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Analytics Obfuscation (Pending) */}
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-[#131B2B] text-[#556677] flex items-center justify-center border-2 border-[#1A2A3A] shrink-0">
                                <UserX size={16} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[#8899AA] font-bold text-lg mb-1">Phase 3: Deep Obfuscation</h3>
                            <p className="text-sm text-[#556677]">Irreversibly hash application IDs in BI data warehouses to preserve statistical integrity while removing personal association.</p>
                        </div>
                    </div>

                </div>

                {/* System Disclaimer */}
                <div className="mt-10 pt-6 border-t border-[#1A2A3A] text-center">
                    <p className="text-[10px] text-[#556677] uppercase font-bold tracking-widest flex items-center justify-center gap-2">
                        <ShieldAlert size={14} /> This action cannot be paused or stopped once initiated.
                    </p>
                </div>
            </div>
        </div>
    );
}
