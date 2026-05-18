"use client";

import Page from "@/components/ui/Page";

import React from "react";
import { Zap, CheckCircle2, Split, GitMerge, Download, Search, Banknote } from "lucide-react";

export default function IncentivePaymentPage() {
    const employees = [
        { id: 'EMP108', name: 'Naveen Kumar', role: 'Sr. Backend Dev', gross: '₹25,000', tds: '₹5,000', net: '₹20,000' },
        { id: 'EMP112', name: 'Alisha Rai', role: 'Frontend Lead', gross: '₹25,000', tds: '₹5,000', net: '₹20,000' },
        { id: 'EMP145', name: 'Karan Singh', role: 'DevOps Engineer', gross: '₹25,000', tds: '₹2,500', net: '₹22,500' },
        { id: 'EMP201', name: 'Pooja Hegde', role: 'QA Analyst', gross: '₹25,000', tds: '₹2,500', net: '₹22,500' },
        { id: 'EMP220', name: 'Vikram Seth', role: 'Engineering Manager', gross: '₹25,000', tds: '₹7,500', net: '₹17,500' },
    ];

    return (
        <Page
            title="Process Incentive: Q3 Delivery Bonus"
            subtitle="Review the approved list and finalize payout processing."
            breadcrumbs={[{ label: "Incentive Payment" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center gap-2">
                            <Banknote className="w-6 h-6 text-[#00E5A0]" /> Process Incentive: Q3 Delivery Bonus
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Review the approved list and finalize payout processing.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black font-bold rounded-lg text-sm transition-colors shadow-lg shadow-[#00E5A0]/20 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Confirm & Process
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Main List (8 cols) */}
                    <div className="lg:col-span-8 bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden flex flex-col">

                        <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060B14]">
                            <h3 className="font-semibold text-white">Recipient List (45)</h3>
                            <div className="flex gap-3">
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                    <input type="text" placeholder="Search employee..." className="w-full bg-[#0A1420] border border-[#1A2A3A] text-white rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-[#00E5A0]" />
                                </div>
                                <button className="flex items-center gap-2 px-3 py-2 border border-[#1A2A3A] rounded-lg text-sm hover:bg-[#1A2A3A] transition-colors">
                                    <Download className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-[#0A1420] text-gray-400 border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-5 py-4 font-medium">EMP ID</th>
                                        <th className="px-5 py-4 font-medium">Name & Role</th>
                                        <th className="px-5 py-4 font-medium text-right">Incentive Gross</th>
                                        <th className="px-5 py-4 font-medium text-right">TDS <span className="text-[10px] text-gray-500">(Auto)</span></th>
                                        <th className="px-5 py-4 font-medium text-right text-[#00E5A0]">Net Payable</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {employees.map((emp, idx) => (
                                        <tr key={idx} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                            <td className="px-5 py-5 text-gray-400 font-medium">{emp.id}</td>
                                            <td className="px-5 py-5">
                                                <p className="font-bold text-white">{emp.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{emp.role}</p>
                                            </td>
                                            <td className="px-5 py-5 text-right font-mono text-gray-300">{emp.gross}</td>
                                            <td className="px-5 py-5 text-right font-mono text-[#FF4444]">{emp.tds}</td>
                                            <td className="px-5 py-5 text-right font-mono font-black text-[#00E5A0] text-base">{emp.net}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={5} className="px-5 py-4 text-center text-sm text-[#00E5A0] hover:underline cursor-pointer bg-[#00E5A0]/5 font-medium">+ View 40 more recipients</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Panel - Summary & Processing Options */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Summary Card */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5A0]/10 rounded-bl-full blur-2xl pointer-events-none"></div>

                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">Payout Summary</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Total Eligible</span>
                                    <span className="font-bold text-white">45 Employees</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Gross Incentive</span>
                                    <span className="font-mono font-medium text-white">₹11,25,000</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-[#1A2A3A]">
                                    <span className="text-gray-400">Total TDS Withheld</span>
                                    <span className="font-mono font-medium text-[#FF4444]">₹2,10,000</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-white font-bold text-lg">Net Bank Transfer</span>
                                    <span className="font-mono font-black text-2xl text-[#00E5A0]">₹9,15,000</span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-sm text-[#00E5A0] bg-[#00E5A0]/10 border border-[#00E5A0]/20 p-3 rounded-lg font-medium">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                Workflow Approvals Completed (Line Mgr & HR Head)
                            </div>
                        </div>

                        {/* Processing Method */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                                <Split className="w-5 h-5 text-[#0066FF]" /> Payout Method
                            </h3>

                            <div className="space-y-3 relative">
                                {/* Option 1 */}
                                <label className="flex items-start gap-4 p-4 rounded-lg border border-[#00E5A0] bg-[#00E5A0]/5 cursor-pointer transition-colors relative z-10">
                                    <input type="radio" name="method" defaultChecked className="mt-1 text-[#00E5A0] bg-[#060B14] border-[#1A2A3A] focus:ring-[#00E5A0]" />
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <GitMerge className="w-4 h-4 text-[#00E5A0]" />
                                            <span className="font-bold text-white text-sm">Merge with March Payroll</span>
                                        </div>
                                        <p className="text-xs text-gray-400 leading-relaxed">Adds the incentive amount to the regular monthly payslip. TDS is adjusted along with regular salary tax logic. Payout happens on Mar 31st.</p>
                                    </div>
                                </label>

                                {/* Option 2 */}
                                <label className="flex items-start gap-4 p-4 rounded-lg border border-[#1A2A3A] bg-[#060B14] hover:border-gray-600 cursor-pointer transition-colors relative z-10">
                                    <input type="radio" name="method" className="mt-1 text-[#00E5A0] bg-[#060B14] border-[#1A2A3A] focus:ring-[#00E5A0]" />
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Zap className="w-4 h-4 text-gray-300" />
                                            <span className="font-bold text-white text-sm">Process as Off-Cycle</span>
                                        </div>
                                        <p className="text-xs text-gray-400 leading-relaxed">Generates a separate payslip immediately. Deducts flat 20% TDS (or custom) based on setup. Direct bank file is generated instantly.</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
    );
}
