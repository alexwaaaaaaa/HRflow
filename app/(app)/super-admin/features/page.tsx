"use client";
import React from 'react';
import { ToggleRight, AlertTriangle, Zap, Search, Activity, Users } from 'lucide-react';
import Link from 'next/link';

export default function FeatureToggleScreen() {
    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Feature Flags / Toggles</h1>
                    <p className="text-[#8899AA] text-sm">Globally enable, disable, or gradually rollout beta features across the platform.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-6">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search feature flag keys..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none w-80 transition-colors" />
                    </div>
                </div>

                <div className="divide-y divide-[#1A2A3A]">

                    {/* General Availability Flag */}
                    <div className="p-6 hover:bg-[#131B2B] transition-colors group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-white font-bold text-lg">AI Performance Reviews</h3>
                                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">GA</span>
                                </div>
                                <div className="text-[#556677] font-mono text-xs mb-2">KEY: ENABLE_AI_PERF_REVIEWS_V2</div>
                                <p className="text-sm text-[#8899AA]">Enables the generative AI assistant for summarizing continuous feedback into annual review drafts.</p>
                            </div>

                            <div className="flex items-center gap-6 md:min-w-[300px] justify-between">
                                <div>
                                    <div className="text-[10px] text-[#556677] uppercase font-bold mb-1 tracking-wider">Rollout Target</div>
                                    <div className="text-sm font-bold text-white flex items-center gap-2">
                                        <Users size={14} className="text-[#8899AA]" /> All Active Workspaces
                                    </div>
                                </div>

                                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Beta Flag (Percentage Rollout) */}
                    <div className="p-6 hover:bg-[#131B2B] transition-colors group bg-indigo-500/5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-white font-bold text-lg">Instant Payouts (EWA)</h3>
                                    <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">BETA</span>
                                </div>
                                <div className="text-[#556677] font-mono text-xs mb-2">KEY: ENABLE_EWA_INSTANT_TRANSFER</div>
                                <p className="text-sm text-[#8899AA]">Allows employees to withdraw earned wages instantly via UPI instead of waiting for standard payroll.</p>

                                <div className="mt-3 flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-max">
                                    <AlertTriangle size={14} className="text-amber-400" />
                                    <span className="text-xs text-amber-400 font-bold">Banking API limits apply during beta.</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 md:min-w-[300px] justify-between">
                                <div className="flex-1">
                                    <div className="text-[10px] text-[#556677] uppercase font-bold mb-1 tracking-wider">Rollout Target</div>
                                    <div className="text-sm font-bold text-white mb-1 flex items-center justify-between">
                                        <span>Percentage</span>
                                        <span className="text-indigo-400">20%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-[#0A1420] border border-[#2A3A4A] rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full w-[20%]" />
                                    </div>
                                </div>

                                <div className="w-12 h-6 bg-indigo-500 rounded-full relative cursor-pointer shrink-0">
                                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disabled Flag */}
                    <div className="p-6 hover:bg-[#131B2B] transition-colors group opacity-70">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-white font-bold text-lg">Legacy Time-Tracking Sync</h3>
                                    <span className="bg-[#2A3A4A] text-[#8899AA] border border-[#3A4A5A] px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">DISABLED</span>
                                </div>
                                <div className="text-[#556677] font-mono text-xs mb-2">KEY: DISABLE_LEGACY_BIOMETRIC_SYNC</div>
                                <p className="text-sm text-[#8899AA]">V1 API for fetching physical biometric machine logs. Replaced by V2.</p>
                            </div>

                            <div className="flex items-center gap-6 md:min-w-[300px] justify-between">
                                <div>
                                    <div className="text-[10px] text-[#556677] uppercase font-bold mb-1 tracking-wider">Rollout Target</div>
                                    <div className="text-sm font-bold text-[#8899AA] flex items-center gap-2">
                                        None (Hard kill)
                                    </div>
                                </div>

                                <div className="w-12 h-6 bg-[#2A3A4A] rounded-full relative cursor-pointer">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full absolute top-1 left-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
