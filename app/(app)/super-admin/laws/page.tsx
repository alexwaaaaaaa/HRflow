"use client";
import React from 'react';
import { Scale, Calendar, AlertTriangle, Plus, FileText, Globe } from 'lucide-react';
import Link from 'next/link';

export default function LawChangeManagementScreen() {
    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Tax & Statutory Updates Master</h1>
                    <p className="text-[#8899AA] text-sm">Deploy changes to tax slabs, minimum wage laws, or PF rules globally to all tenants.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Plus size={16} /> Draft New Rule Override
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

                {/* Active Global Rules */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2"><Scale size={16} className="text-[#556677]" /> Upcoming/Active Legislative Rollouts</h2>

                    {/* Item 1 */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] hover:border-indigo-500/50 transition-colors rounded-2xl p-6 relative overflow-hidden group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider mb-1">Active</span>
                                <h3 className="text-white font-bold text-lg">Union Budget 2026: Tax Slabs (New Regime)</h3>
                            </div>
                        </div>
                        <p className="text-sm text-[#8899AA] leading-relaxed mb-4">
                            Global update to the core payroll engine modifying the New Regime income tax brackets. Applied to all India-region tenants.
                        </p>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg text-xs font-mono text-emerald-400 mb-4 whitespace-nowrap overflow-x-auto">
                            PATCH /engine/tax_rules/gov_india_new_regime_2026
                        </div>
                        <div className="flex justify-between items-center text-xs text-[#556677] border-t border-[#1A2A3A] pt-4">
                            <span className="flex items-center gap-1"><Globe size={14} /> Region: India</span>
                            <span className="flex items-center gap-1"><Calendar size={14} /> Effective: April 1, 2026</span>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><AlertTriangle size={10} /> Scheduled</span>
                                <h3 className="text-white font-bold text-lg">Revised Minimum Wage (Karnataka)</h3>
                            </div>
                        </div>
                        <p className="text-sm text-[#8899AA] leading-relaxed mb-4">
                            Updates the validation thresholds for compliance reports for all organizations registered with Karnataka state as their primary operating location.
                        </p>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg text-xs font-mono text-amber-400/80 mb-4 whitespace-nowrap overflow-x-auto">
                            PENDING DEPLOY (Awaiting QA Signoff)
                        </div>
                        <div className="flex justify-between items-center text-xs text-[#556677] border-t border-[#1A2A3A] pt-4">
                            <span className="flex items-center gap-1"><Globe size={14} /> Region: Karnataka (State)</span>
                            <span className="flex items-center gap-1"><Calendar size={14} /> Effective: Jan 1, 2027</span>
                        </div>
                    </div>

                </div>

                {/* Audit & Verification Checks */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2"><FileText size={16} className="text-[#556677]" /> Validation Sandboxes</h2>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden h-full">
                        <div className="p-6">
                            <p className="text-sm text-[#8899AA] leading-relaxed mb-6">
                                Before deploying statutory logic changes to production, they must be run through the Shadow Simulation engine against anonymized payloads to detect adverse payroll anomalies.
                            </p>

                            <div className="space-y-4">
                                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-white text-sm">EPF Contribution Cap Lift (Draft)</div>
                                        <div className="text-xs text-[#556677] mt-1">Simulating across 500k employee profiles...</div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin shrink-0"></div>
                                </div>
                                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-white text-sm">Professional Tax Slabs (Maharashtra - 2026)</div>
                                        <div className="text-xs text-emerald-400 mt-1">Simulation Pass: 100% Match</div>
                                    </div>
                                    <button className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded transition-colors shrink-0">
                                        Push to Prod
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
