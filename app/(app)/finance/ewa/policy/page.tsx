"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FileSignature, Save, AlertCircle, ChevronRight, PlusCircle, Trash2
} from "lucide-react";

export default function EWAPolicySetupScreen() {
    const [policies, setPolicies] = useState([
        { id: 1, name: "Probationers / Interns", minTenure: 0, maxTenure: 6, maxPct: 0, fee: 0, isActive: true },
        { id: 2, name: "Standard FTE", minTenure: 6, maxTenure: 36, maxPct: 30, fee: 1.5, isActive: true },
        { id: 3, name: "Tenured Leaders", minTenure: 36, maxTenure: 999, maxPct: 50, fee: 1.0, isActive: true },
    ]);

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/ewa" className="hover:text-white transition-colors">EWA</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Policy Tiers</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <FileSignature className="w-8 h-8 text-indigo-400" />
                        EWA Policy Tiers
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Configure eligibility rules and fees based on employee tenure or grade.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    <Save className="w-4 h-4" />
                    Save Policies
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    {/* Tier Editor */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-white">Tenure-Based Rulesets</h2>
                            <button className="flex items-center gap-1 text-[#00E5FF] text-sm hover:underline font-medium">
                                <PlusCircle className="w-4 h-4" /> Add Tier
                            </button>
                        </div>

                        <div className="space-y-4">
                            {policies.map((policy) => (
                                <div key={policy.id} className="p-5 border border-[#2A3A4A] rounded-xl bg-[#1A2A3A]/40 flex flex-col md:flex-row gap-6 md:items-center relative group">
                                    <div className="md:w-1/4">
                                        <label className="block text-xs text-[#8899AA] mb-1">Policy Name</label>
                                        <input type="text" defaultValue={policy.name} className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-3 py-2 text-sm focus:border-[#00E5FF] focus:outline-none" />
                                    </div>
                                    <div className="md:w-1/4">
                                        <label className="block text-xs text-[#8899AA] mb-1">Tenure Range (Months)</label>
                                        <div className="flex items-center gap-2">
                                            <input type="number" defaultValue={policy.minTenure} className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-2 py-2 text-sm text-center focus:border-[#00E5FF] focus:outline-none" />
                                            <span className="text-[#8899AA] text-xs">to</span>
                                            <input type="number" defaultValue={policy.maxTenure} className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-2 py-2 text-sm text-center focus:border-[#00E5FF] focus:outline-none" />
                                        </div>
                                    </div>
                                    <div className="md:w-1/4">
                                        <label className="block text-xs text-[#8899AA] mb-1">Max Withdrawal (%)</label>
                                        <div className="relative">
                                            <input type="number" defaultValue={policy.maxPct} className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded pl-3 pr-8 py-2 text-sm focus:border-[#00E5FF] focus:outline-none" />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] text-sm">%</span>
                                        </div>
                                    </div>
                                    <div className="md:w-1/4">
                                        <label className="block text-xs text-[#8899AA] mb-1">Transaction Fee (%)</label>
                                        <div className="relative">
                                            <input type="number" defaultValue={policy.fee} step="0.1" className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded pl-3 pr-8 py-2 text-sm focus:border-[#00E5FF] focus:outline-none" />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] text-sm">%</span>
                                        </div>
                                    </div>

                                    <button className="absolute top-2 right-2 p-1.5 text-[#8899AA] hover:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A2A3A] rounded">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6">Exceptions & Blocklist</h2>
                        <div className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <div className="relative mt-0.5">
                                    <input type="checkbox" className="sr-only" defaultChecked />
                                    <div className="w-10 h-6 bg-pink-500 rounded-full"></div>
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform translate-x-4"></div>
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-white">Block employees on PIP (Performance Improvement Plan)</p>
                                    <p className="text-xs text-[#8899AA]">Automatically updates from the Performance Module</p>
                                </div>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer">
                                <div className="relative mt-0.5">
                                    <input type="checkbox" className="sr-only" defaultChecked />
                                    <div className="w-10 h-6 bg-pink-500 rounded-full"></div>
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform translate-x-4"></div>
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-white">Block employees serving Notice Period</p>
                                    <p className="text-xs text-[#8899AA]">Auto-disable EWA as soon as resignation is submitted to ensure smooth Full & Final settlement.</p>
                                </div>
                            </label>
                        </div>

                        <div className="mt-6 border border-[#2A3A4A] rounded-lg p-4 bg-[#1A2A3A]/20">
                            <label className="block text-sm font-medium text-white mb-2">Manual Blocklist (Employee IDs)</label>
                            <textarea
                                rows={3}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] rounded-lg px-3 py-2 text-sm focus:border-pink-500 focus:outline-none"
                                placeholder="Comma separated, e.g. EMP-101, EMP-205"
                                defaultValue="EMP-442, EMP-991"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/5 border border-indigo-500/20 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-lg font-bold text-white">How Policies Work</h2>
                        </div>
                        <p className="text-sm text-[#8899AA] leading-relaxed mb-4">
                            Policies are evaluated top-to-bottom. If an employee matches multiple tiers (e.g., based on grade vs tenure), the <strong>most restrictive</strong> policy will be applied automatically.
                        </p>
                        <p className="text-sm text-[#8899AA] leading-relaxed">
                            Changes saved here affect the accrued balances calculated for employees immediately.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
