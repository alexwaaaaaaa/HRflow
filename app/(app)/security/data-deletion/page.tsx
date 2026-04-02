"use client";
import React from 'react';
import { Trash2, AlertTriangle, UserX, Clock, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function DataDeletionRequestScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/security/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Security</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Right to be Forgotten (Data Erasure)</h1>
                    <p className="text-[#8899AA] text-sm">Review applications from separated employees to permanently purge their PII.</p>
                </div>
            </div>

            {/* Compliance Warning */}
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 flex items-start gap-4">
                <AlertTriangle size={24} className="text-rose-400 shrink-0 mt-1" />
                <div>
                    <h3 className="text-rose-400 font-bold mb-2">Legal Hold Restrictions Apply</h3>
                    <p className="text-sm text-[#8899AA] leading-relaxed max-w-4xl">
                        Before approving personal data erasure under the DPDP Act, ensure no legal holds exist. Basic employement records (Tax, PF, Compliance) MUST be retained for statutory periods (usually 7-8 years) regardless of erasure requests. Only non-essential PII (photos, biometric data, personal emergency contacts) will be permanently deleted or irreversibly anonymized.
                    </p>
                </div>
            </div>

            {/* Pending Requests */}
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mt-8 mb-4 border-b border-[#1A2A3A] pb-2">Pending Approvals</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Request Card 1 */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#131B2B] rounded-full flex items-center justify-center text-[#556677] border border-[#2A3A4A]">
                                <UserX size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg">Vikram Singh</h4>
                                <div className="text-sm text-[#8899AA]">EMP-2041 • Separated: Aug 2025</div>
                            </div>
                        </div>
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Clock size={12} /> Due in 4 Days
                        </span>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg flex items-center justify-between text-sm">
                            <span className="text-[#8899AA]">Statutory Hold Check</span>
                            <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 size={14} /> Clear to Purge</span>
                        </div>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg flex items-center justify-between text-sm">
                            <span className="text-[#8899AA]">Active Grievances</span>
                            <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 size={14} /> None Found</span>
                        </div>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg text-sm text-[#8899AA]">
                            <span className="font-bold text-white block mb-1">Data to be deleted:</span>
                            Biometric templates, Profile photos, Unstructured personal files, Non-statutory emergency contacts, App usage telemetry.
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                            <Trash2 size={16} /> Execute Purge
                        </button>
                        <button className="flex-1 bg-[#131B2B] border border-[#2A3A4A] hover:bg-[#1A2A3A] text-white py-2.5 rounded-lg text-sm font-bold transition-colors">
                            Reject Request
                        </button>
                    </div>
                </div>

                {/* Request Card 2 (Blocked) */}
                <div className="bg-[#0A1420] border border-rose-500/30 rounded-2xl p-6 relative group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#131B2B] rounded-full flex items-center justify-center text-[#556677] border border-[#2A3A4A]">
                                <UserX size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg">Anita Desai</h4>
                                <div className="text-sm text-[#8899AA]">EMP-1092 • Separated: Jan 2026</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg flex items-center justify-between text-sm">
                            <span className="text-[#8899AA]">Statutory Hold Check</span>
                            <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle size={14} /> Blocked</span>
                        </div>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg flex items-center justify-between text-sm">
                            <span className="text-[#8899AA]">Active Grievances</span>
                            <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle size={14} /> GRV-2026-112 (Open)</span>
                        </div>
                        <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg text-sm text-rose-300">
                            Deletion cannot proceed. A legal hold is currently placed until the grievance case is closed.
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="w-full bg-[#131B2B] border border-[#2A3A4A] hover:bg-[#1A2A3A] text-white py-2.5 rounded-lg text-sm font-bold transition-colors">
                            Reject (Inform due to hold)
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
