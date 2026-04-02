"use client";

import React from "react";
import Link from "next/link";
import {
    Settings, ShieldCheck, DollarSign, ChevronRight, Save, Link as LinkIcon
} from "lucide-react";

export default function EWAAdminSettingsScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">EWA Admin Settings</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Settings className="w-8 h-8 text-pink-400" />
                        EWA Global Rules
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Configure company-wide policies for Earned Wage Access withdrawals and fees.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#00E5FF] hover:bg-[#00C5DD] text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    <Save className="w-4 h-4" />
                    Publish Policy
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Global Limits */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            <h2 className="text-lg font-bold text-white">Withdrawal Caps & Limits</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Max. Withdrawal % of Earned Wages</label>
                                <div className="flex items-center gap-3">
                                    <input type="number" defaultValue="50" className="w-24 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none" />
                                    <span className="text-[#8899AA]">%</span>
                                </div>
                                <p className="text-xs text-[#8899AA] mt-2 leading-relaxed">Limits how much of their accrued salary an employee can take out. Recommended: 50% to ensure enough net pay remains for standard deductions.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Max. Transactions per cycle</label>
                                <div className="flex items-center gap-3">
                                    <input type="number" defaultValue="3" className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none" />
                                </div>
                                <p className="text-xs text-[#8899AA] mt-2 leading-relaxed">Cap the number of times an employee can use EWA per month.</p>
                            </div>
                        </div>
                    </div>

                    {/* Fees configuration */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <DollarSign className="w-5 h-5 text-amber-400" />
                            <h2 className="text-lg font-bold text-white">Fee Structure</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="feetype" className="text-[#00E5FF] focus:ring-[#00E5FF]" defaultChecked />
                                    <span className="text-sm text-white">Percentage Based</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="feetype" className="text-[#00E5FF] focus:ring-[#00E5FF]" />
                                    <span className="text-sm text-white">Flat Fee per TXN</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="feetype" className="text-[#00E5FF] focus:ring-[#00E5FF]" />
                                    <span className="text-sm text-white">Company Sponsored (Free for Emp)</span>
                                </label>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#8899AA] mb-2">Transaction Fee (%)</label>
                                    <div className="flex items-center gap-3">
                                        <input type="text" defaultValue="1.0" className="w-24 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none" />
                                        <span className="text-[#8899AA]">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#8899AA] mb-2">Covered by</label>
                                    <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none appearance-none">
                                        <option>Deduct from withdrawal (Net Payload)</option>
                                        <option>Add to recovery payload in Payroll</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 border-l border-[#1A2A3A] pl-0 lg:pl-8">
                    <div className="bg-[#1A2A3A]/20 border border-[#2A3A4A] rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                            <LinkIcon className="w-5 h-5 text-purple-400" />
                            Provider Integration
                        </h3>
                        <p className="text-sm text-[#8899AA] mb-6">
                            HRFlow is integrated with NBFC partner for capital. Capital is sourced directly via Escrow.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-[#8899AA] mb-1">Escrow Partner</div>
                                <div className="text-white font-medium bg-[#0B1221] border border-[#2A3A4A] px-3 py-2 rounded">ICICI API Banking</div>
                            </div>
                            <div>
                                <div className="text-xs text-[#8899AA] mb-1">Virtual Account Balance</div>
                                <div className="text-emerald-400 font-bold bg-[#0B1221] border border-[#2A3A4A] px-3 py-2 rounded">₹25,00,000.00</div>
                            </div>
                            <button className="w-full mt-4 py-2 border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF]/10 text-sm font-medium rounded-lg transition-colors">
                                Manage Escrow Funding
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
