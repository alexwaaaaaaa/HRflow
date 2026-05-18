"use client";

import Page from "@/components/ui/Page";

import React from "react";
import { Building2, ArrowRightLeft, CreditCard, Layers, CheckCircle2 } from "lucide-react";

export default function MultiBankDisbursementPage() {
    return (
        <Page
            title="Multi-Bank Disbursement Setup"
            subtitle="Allocate payroll funds across multiple company bank accounts."
            breadcrumbs={[{ label: "Multi Bank Disbursement" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Multi-Bank Disbursement Setup</h2>
                        <p className="text-gray-400 text-sm mt-1">Allocate payroll funds across multiple company bank accounts.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Panel - Setup (7/12 columns) */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Source Accounts */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-[#00E5A0]" /> Company Bank Accounts
                            </h3>

                            <div className="space-y-4">
                                {/* Account 1 */}
                                <div className="p-4 border border-[#1A2A3A] rounded-lg bg-[#060B14] hover:border-[#00E5A0]/50 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-semibold text-white">HDFC Current A/C</h4>
                                            <p className="text-sm text-gray-400 font-mono mt-0.5">XXXX-XXXX-1234</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">Available Balance</p>
                                            <p className="font-medium text-[#00E5A0]">₹1,50,00,000</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300">Allocated to Fund</span>
                                            <span className="font-bold">₹60,00,000</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                            <div className="h-full bg-[#0066FF] w-[40%] rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-[#1A2A3A] flex items-center justify-between text-sm">
                                        <span className="text-gray-400">Rule Match:</span>
                                        <span className="bg-[#1A2A3A] px-2.5 py-1 rounded text-gray-300">Engineering + Sales</span>
                                    </div>
                                </div>

                                {/* Account 2 */}
                                <div className="p-4 border border-[#1A2A3A] rounded-lg bg-[#060B14] hover:border-[#00E5A0]/50 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-semibold text-white">ICICI Current A/C</h4>
                                            <p className="text-sm text-gray-400 font-mono mt-0.5">XXXX-XXXX-5678</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">Available Balance</p>
                                            <p className="font-medium text-[#00E5A0]">₹80,00,000</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300">Allocated to Fund</span>
                                            <span className="font-bold">₹42,16,800</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                            <div className="h-full bg-[#FFB800] w-[52%] rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-[#1A2A3A] flex items-center justify-between text-sm">
                                        <span className="text-gray-400">Rule Match:</span>
                                        <span className="bg-[#1A2A3A] px-2.5 py-1 rounded text-gray-300">HR + Finance + Ops + Others</span>
                                    </div>
                                </div>

                                <button className="w-full py-3 border border-dashed border-[#1A2A3A] hover:border-[#00E5A0] hover:text-[#00E5A0] text-gray-400 rounded-lg text-sm font-medium transition-colors">
                                    + Add Bank Account
                                </button>
                            </div>
                        </div>

                        {/* Allocation Rules */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-[#FFB800]" /> Allocation Rules
                                </h3>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Split by Criterion</label>
                                <div className="flex gap-2 p-1 bg-[#060B14] rounded-lg border border-[#1A2A3A] w-full md:w-3/4">
                                    <button className="flex-1 py-1.5 text-sm rounded-md transition-colors bg-[#1A2A3A] text-white font-medium shadow-sm">Department</button>
                                    <button className="flex-1 py-1.5 text-sm rounded-md transition-colors text-gray-400 hover:text-gray-300">Location</button>
                                    <button className="flex-1 py-1.5 text-sm rounded-md transition-colors text-gray-400 hover:text-gray-300">Grade</button>
                                    <button className="flex-1 py-1.5 text-sm rounded-md transition-colors text-gray-400 hover:text-gray-300">Manual</button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Rule 1 */}
                                <div className="flex items-center gap-4">
                                    <div className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg flex-1">
                                        <span className="text-sm font-medium text-white">Engineering, Sales</span>
                                    </div>
                                    <ArrowRightLeft className="w-4 h-4 text-gray-500 shrink-0" />
                                    <select className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg flex-1 outline-none">
                                        <option>HDFC XXXX1234</option>
                                        <option>ICICI XXXX5678</option>
                                    </select>
                                </div>

                                {/* Rule 2 */}
                                <div className="flex items-center gap-4">
                                    <div className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg flex-1">
                                        <span className="text-sm font-medium text-white">HR, Finance, Ops, Others</span>
                                    </div>
                                    <ArrowRightLeft className="w-4 h-4 text-gray-500 shrink-0" />
                                    <select className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg flex-1 outline-none" defaultValue="ICICI XXXX5678">
                                        <option>HDFC XXXX1234</option>
                                        <option>ICICI XXXX5678</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-[#1A2A3A]">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="rounded border-[#1A2A3A] bg-[#060B14] text-[#00E5A0] focus:ring-[#00E5A0]" />
                                    <span className="text-sm text-gray-300">Distribute shortfall automatically to next available account</span>
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* Right Panel - Visualization & Total (5/12 columns) */}
                    <div className="lg:col-span-5 space-y-6 flex flex-col">

                        {/* Visual Flow (Sankey-style abstraction) */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold text-white mb-6">Disbursement Flow</h3>

                            <div className="flex-1 relative flex items-center justify-between pt-10 pb-8 min-h-[300px]">
                                {/* Visual lines for connections */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                                    {/* HDFC to Employee Banks */}
                                    <path d="M 120 100 C 200 100, 200 60, 280 60" fill="none" stroke="#0066FF" strokeWidth="8" strokeOpacity="0.4" />
                                    <path d="M 120 100 C 200 100, 200 150, 280 150" fill="none" stroke="#0066FF" strokeWidth="4" strokeOpacity="0.3" />
                                    <path d="M 120 100 C 200 100, 200 240, 280 240" fill="none" stroke="#0066FF" strokeWidth="2" strokeOpacity="0.2" />

                                    {/* ICICI to Employee Banks */}
                                    <path d="M 120 250 C 200 250, 200 60, 280 60" fill="none" stroke="#FFB800" strokeWidth="3" strokeOpacity="0.3" />
                                    <path d="M 120 250 C 200 250, 200 150, 280 150" fill="none" stroke="#FFB800" strokeWidth="6" strokeOpacity="0.4" />
                                    <path d="M 120 250 C 200 250, 200 240, 280 240" fill="none" stroke="#FFB800" strokeWidth="3" strokeOpacity="0.3" />
                                </svg>

                                {/* Source Nodes (Left) */}
                                <div className="flex flex-col justify-between h-full gap-16 z-10 w-[120px]">
                                    <div className="bg-[#0066FF]/10 border border-[#0066FF]/40 rounded-lg p-3 text-center shadow-[0_0_15px_rgba(0,102,255,0.1)]">
                                        <p className="font-bold text-white text-sm">HDFC</p>
                                        <p className="text-xs text-[#0066FF] mt-1 font-medium">₹60.00L</p>
                                    </div>
                                    <div className="bg-[#FFB800]/10 border border-[#FFB800]/40 rounded-lg p-3 text-center shadow-[0_0_15px_rgba(255,184,0,0.1)] mt-auto">
                                        <p className="font-bold text-white text-sm">ICICI</p>
                                        <p className="text-xs text-[#FFB800] mt-1 font-medium">₹42.16L</p>
                                    </div>
                                </div>

                                {/* Destination Nodes (Right) */}
                                <div className="flex flex-col justify-between h-full gap-8 z-10 w-[140px] items-end">
                                    <div className="bg-[#1A2A3A]/80 border border-[#00E5A0]/30 rounded-lg p-3 w-full text-center">
                                        <div className="flex items-center justify-center gap-1.5 mb-1">
                                            <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                                            <p className="font-medium text-white text-sm">Emp HDFC</p>
                                        </div>
                                        <p className="text-xs text-[#00E5A0]">₹42.34L</p>
                                    </div>
                                    <div className="bg-[#1A2A3A]/80 border border-gray-600 rounded-lg p-3 w-full text-center my-auto">
                                        <div className="flex items-center justify-center gap-1.5 mb-1">
                                            <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                                            <p className="font-medium text-white text-sm">Emp SBI</p>
                                        </div>
                                        <p className="text-xs text-gray-300">₹26.18L</p>
                                    </div>
                                    <div className="bg-[#1A2A3A]/80 border border-gray-600 rounded-lg p-3 w-full text-center">
                                        <div className="flex items-center justify-center gap-1.5 mb-1">
                                            <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                                            <p className="font-medium text-white text-sm">Emp ICICI</p>
                                        </div>
                                        <p className="text-xs text-gray-300">₹19.54L</p>
                                    </div>
                                    <div className="bg-[#1A2A3A]/80 border border-gray-600 rounded-lg p-3 w-full text-center mt-auto">
                                        <p className="font-medium text-white text-xs">Others</p>
                                        <p className="text-xs text-gray-400">₹14.10L</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Verification */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between pb-3 border-b border-[#1A2A3A]">
                                    <span className="text-gray-400 text-sm">Total Payroll Amount</span>
                                    <span className="text-white font-medium text-lg">₹1,02,16,800</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 text-gray-300">HDFC Target Fund <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5A0]" /></span>
                                        <span className="font-mono text-gray-300">₹60,00,000</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 text-gray-300">ICICI Target Fund <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5A0]" /></span>
                                        <span className="font-mono text-gray-300">₹42,16,800</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-[#1A2A3A] text-[#00E5A0] font-semibold">
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> All Funds Matched</span>
                                    <span className="text-lg">₹1,02,16,800</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <button className="bg-[#1A2A3A] hover:bg-[#1A2A3A]/80 text-white py-3.5 rounded-lg text-sm font-medium transition-colors border border-transparent">
                                    Save Setup
                                </button>
                                <button className="bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black py-3.5 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-[#00E5A0]/20 flex items-center justify-center gap-2">
                                    Generate Bank Files <ArrowRightLeft className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
