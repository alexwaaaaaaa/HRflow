"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Settings, ShieldCheck, CreditCard, Building, ChevronRight, Save
} from "lucide-react";

export default function FinanceSettingsScreen() {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Settings</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Settings className="w-8 h-8 text-[#00E5FF]" />
                        Finance Module Settings
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Configure integrations, permissions, and core behavior for financial products</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="w-full lg:w-64 flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab("general")}
                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-[#1A2A3A] text-[#00E5FF] border border-[#2A3A4A]' : 'text-[#8899AA] hover:bg-[#1A2A3A]/50'}`}
                    >
                        <Building className="w-4 h-4 inline mr-2" />
                        General Config
                    </button>
                    <button
                        onClick={() => setActiveTab("integrations")}
                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'integrations' ? 'bg-[#1A2A3A] text-[#00E5FF] border border-[#2A3A4A]' : 'text-[#8899AA] hover:bg-[#1A2A3A]/50'}`}
                    >
                        <CreditCard className="w-4 h-4 inline mr-2" />
                        Fintech Partners
                    </button>
                    <button
                        onClick={() => setActiveTab("compliance")}
                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'compliance' ? 'bg-[#1A2A3A] text-[#00E5FF] border border-[#2A3A4A]' : 'text-[#8899AA] hover:bg-[#1A2A3A]/50'}`}
                    >
                        <ShieldCheck className="w-4 h-4 inline mr-2" />
                        Compliance & Audit
                    </button>
                </div>

                <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 w-full">
                    {activeTab === 'general' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-white border-b border-[#1A2A3A] pb-3 mb-6">Accounting Sync</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#8899AA] mb-2">Primary Ledger Software</label>
                                        <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00E5FF] transition-colors appearance-none">
                                            <option>Tally Prime ERP</option>
                                            <option>Zoho Books</option>
                                            <option>QuickBooks India</option>
                                            <option>Xero</option>
                                        </select>
                                    </div>
                                    <label className="flex items-center gap-3 cursor-pointer mt-4">
                                        <div className="relative">
                                            <input type="checkbox" className="sr-only" defaultChecked />
                                            <div className="w-10 h-6 bg-[#00E5FF] rounded-full"></div>
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform translate-x-4"></div>
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium text-white">Auto-sync daily entries at midnight</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'integrations' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-white border-b border-[#1A2A3A] pb-3 mb-6">Partner Credentials</h3>
                                <div className="space-y-6">
                                    <div className="p-5 border border-[#1A2A3A] rounded-xl bg-[#1A2A3A]/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">R</div>
                                                <h4 className="font-semibold text-white">RazorpayX (Disbursements)</h4>
                                            </div>
                                            <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded font-medium">Connected</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-[#8899AA] mb-1">API Key ID</label>
                                                <input type="password" value="rzp_live_xxxxxxxxxxx" readOnly className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-3 py-2 text-sm opacity-70" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-[#8899AA] mb-1">Webhook Secret</label>
                                                <input type="password" value="****************" readOnly className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-3 py-2 text-sm opacity-70" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 border border-[#1A2A3A] rounded-xl bg-[#1A2A3A]/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold">P</div>
                                                <h4 className="font-semibold text-white">Plum Insurance (Underwriter API)</h4>
                                            </div>
                                            <button className="text-sm text-[#00E5FF] hover:underline">Connect Account</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'compliance' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-white border-b border-[#1A2A3A] pb-3 mb-6">Audit Settings</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <div className="relative">
                                            <input type="checkbox" className="sr-only" defaultChecked />
                                            <div className="w-10 h-6 bg-purple-500 rounded-full"></div>
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform translate-x-4"></div>
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium text-white">Strict Double-Entry Enforcement</p>
                                            <p className="text-xs text-[#8899AA]">Transactions will fail if debits do not match credits instantly.</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer mt-4">
                                        <div className="relative">
                                            <input type="checkbox" className="sr-only" defaultChecked />
                                            <div className="w-10 h-6 bg-[#00E5FF] rounded-full"></div>
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform translate-x-4"></div>
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium text-white">Log PI Usage Info</p>
                                            <p className="text-xs text-[#8899AA]">Keep an audit log whenever an internal admin views employee financial data.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
