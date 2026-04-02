"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Settings2, Save, ToggleLeft, ToggleRight, Info, AlertCircle, ChevronRight
} from "lucide-react";

export default function FlexiPayConfigScreen() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [maxPercentage, setMaxPercentage] = useState("30");

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Flexi Pay Configuration</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Settings2 className="w-8 h-8 text-[#00E5FF]" />
                        Flexi Pay Settings
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Configure parameters for how employees can allocate their flexible pay components</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    <Save className="w-4 h-4" />
                    Save Configuration
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Master Toggle Component */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-2">Enable Flexi Pay System</h2>
                                <p className="text-sm text-[#8899AA]">Allow employees to declare and manage their flexible salary components (like Food Coupons, Gadget Allowance, etc) via the portal.</p>
                            </div>
                            <button onClick={() => setIsEnabled(!isEnabled)}>
                                {isEnabled ? (
                                    <ToggleRight className="w-10 h-10 text-emerald-400" />
                                ) : (
                                    <ToggleLeft className="w-10 h-10 text-[#8899AA]" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* FBP Allocation Rules */}
                    <div className={`bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 transition-opacity ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                        <h2 className="text-lg font-bold text-white mb-6">Component Limits & Rules</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Global Maximum FBP (% of Basic)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        className="w-32 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-[#00E5FF] transition-colors"
                                        value={maxPercentage}
                                        onChange={(e) => setMaxPercentage(e.target.value)}
                                    />
                                    <span className="text-[#8899AA] text-sm">%</span>
                                </div>
                                <p className="text-xs text-[#8899AA] mt-2 flex items-center gap-1">
                                    <Info className="w-3 h-3" /> Total sum of all Flexi Pay components cannot exceed this limit.
                                </p>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            <div>
                                <h3 className="text-sm font-semibold text-white mb-4">Specific Allowances</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-[#1A2A3A]/40 rounded-xl border border-[#2A3A4A]">
                                        <div>
                                            <h4 className="text-sm font-medium text-white">Food / Meal Coupons</h4>
                                            <p className="text-xs text-[#8899AA] mt-1">Tax-free component under IT Act rules</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-[#8899AA]">Max Limit</span>
                                            <input type="text" defaultValue="₹2,200" className="w-24 bg-[#0D1928] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00E5FF]" />
                                            <span className="text-sm text-[#8899AA]">/ mo</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-[#1A2A3A]/40 rounded-xl border border-[#2A3A4A]">
                                        <div>
                                            <h4 className="text-sm font-medium text-white">Gadget / Equipment Allowance</h4>
                                            <p className="text-xs text-[#8899AA] mt-1">LTA & Assets depreciation related bounds</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-[#8899AA]">Max Limit</span>
                                            <input type="text" defaultValue="₹60,000" className="w-24 bg-[#0D1928] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00E5FF]" />
                                            <span className="text-sm text-[#8899AA]">/ yr</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-[#1A2A3A]/40 rounded-xl border border-[#2A3A4A]">
                                        <div>
                                            <h4 className="text-sm font-medium text-white">Broadband / Work from Home</h4>
                                            <p className="text-xs text-[#8899AA] mt-1">Reimbursable against valid utility bills</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-[#8899AA]">Max Limit</span>
                                            <input type="text" defaultValue="₹3,000" className="w-24 bg-[#0D1928] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00E5FF]" />
                                            <span className="text-sm text-[#8899AA]">/ mo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-purple-400" />
                            <h2 className="text-lg font-bold text-white">Declaration Window</h2>
                        </div>
                        <p className="text-sm text-[#8899AA] mb-4">
                            Define when employees are allowed to modify their Flexi Pay structures. Typically done at the beginning of the financial year.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#8899AA] mb-1">Window Opens</label>
                                <input type="date" defaultValue="2025-04-01" className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#8899AA] mb-1">Window Closes</label>
                                <input type="date" defaultValue="2025-04-15" className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors" />
                            </div>
                            <button className="w-full mt-2 py-2 bg-purple-500/20 border border-purple-500/50 hover:bg-purple-500/30 text-purple-400 font-medium rounded-lg transition-colors text-sm">
                                Open Window Manually Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
