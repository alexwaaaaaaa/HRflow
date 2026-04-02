"use client";
import React from 'react';
import { Key, Shield, AlertTriangle, User, History, Check, X } from 'lucide-react';
import Link from 'next/link';

export default function PermissionAuditDetailScreen({ params }: { params: { id: string } }) {
    const defaultUser = "Meera Venkatesh (EMP-0012)";

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/security/permissions" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Permission Audit</Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-white mb-1">{defaultUser}</h1>
                        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Shield size={12} /> Super Admin
                        </span>
                    </div>
                    <p className="text-[#8899AA] text-sm mt-1">Detailed effective permissions matrix inherited from Base Roles and Custom Overrides.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4">

                {/* User Context & Overrides Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-[#131B2B] flex items-center justify-center text-[#556677] font-bold text-2xl border-4 border-[#1A2A3A] mb-3">
                                MV
                            </div>
                            <h3 className="text-white font-bold">Meera Venkatesh</h3>
                            <p className="text-xs text-[#8899AA]">meera.v@company.com</p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-[#1A2A3A]">
                            <div>
                                <label className="text-[10px] text-[#556677] font-bold uppercase block mb-1">Base Role Profiles</label>
                                <div className="space-y-2">
                                    <div className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 p-2 rounded">HR Admin (Default)</div>
                                    <div className="text-xs bg-[#131B2B] text-white border border-[#2A3A4A] p-2 rounded">IC Committee Member</div>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-[#556677] font-bold uppercase block mb-1">Custom Overrides Active</label>
                                <div className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 p-2 rounded flex items-start gap-2">
                                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                                    <span>Granted temporary 'Super Admin' for Q3 Audit. Expires Oct 30, 2026.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Granular Permission Matrix */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A]">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Key size={18} className="text-[#556677]" /> Granular Access Control</h2>
                        </div>

                        <div className="divide-y divide-[#1A2A3A]">

                            {/* Payroll Section */}
                            <div className="p-6">
                                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-[#1A2A3A] pb-2">Module: Payroll Engine</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { name: 'View Salary CTC (All Employees)', val: true },
                                        { name: 'Run Payroll Computations', val: true },
                                        { name: 'Disburse Funds / Bank Integration', val: false },
                                        { name: 'Modify Tax Declarations', val: true },
                                    ].map((perm, i) => (
                                        <div key={i} className="flex items-center justify-between bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-xl">
                                            <span className="text-sm text-[#8899AA]">{perm.name}</span>
                                            {perm.val ? <Check size={16} className="text-emerald-400" /> : <X size={16} className="text-rose-400" />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Grievance Section */}
                            <div className="p-6">
                                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-[#1A2A3A] pb-2">Module: Grievance (POSH)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { name: 'View All Pending Cases', val: true },
                                        { name: 'View Unmasked PII in Cases', val: true },
                                        { name: 'Draft Final Resolutions', val: true },
                                        { name: 'Assign IC Members', val: true },
                                    ].map((perm, i) => (
                                        <div key={i} className="flex items-center justify-between bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-xl">
                                            <span className="text-sm text-[#8899AA]">{perm.name}</span>
                                            {perm.val ? <Check size={16} className="text-emerald-400" /> : <X size={16} className="text-rose-400" />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Security Config Section */}
                            <div className="p-6">
                                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-[#1A2A3A] pb-2">Module: Security & Configuration</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { name: 'Modify IP Whitelist', val: true },
                                        { name: 'Execute Data Erasure (DPDP)', val: false },
                                        { name: 'View Full Audit Logs', val: true },
                                        { name: 'Change Data Masking Rules', val: false },
                                    ].map((perm, i) => (
                                        <div key={i} className="flex items-center justify-between bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-xl">
                                            <span className="text-sm text-[#8899AA]">{perm.name}</span>
                                            {perm.val ? <Check size={16} className="text-emerald-400" /> : <X size={16} className="text-rose-400" />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
