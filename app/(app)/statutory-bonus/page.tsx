"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Calculator, Users, CheckCircle2, Download, AlertCircle, IndianRupee } from "lucide-react";

export default function StatutoryBonusPage() {
    const [bonusPercentage, setBonusPercentage] = useState("8.33");

    const employees = [
        { id: 'EMP101', name: 'Ravi Verma', basic: '₹18,000', eligible: true, workingDays: 310, bonusPercent: '8.33%', amount: '₹17,992' },
        { id: 'EMP102', name: 'Sneha Patil', basic: '₹22,000', eligible: false, workingDays: 305, bonusPercent: '-', amount: '-' },
        { id: 'EMP105', name: 'Amit Singh', basic: '₹15,000', eligible: true, workingDays: 280, bonusPercent: '8.33%', amount: '₹15,000' },
        { id: 'EMP108', name: 'Kavita Das', basic: '₹20,000', eligible: true, workingDays: 140, bonusPercent: '8.33%', amount: '₹7,666' }, // prorated
        { id: 'EMP114', name: 'Rahul Sharma', basic: '₹12,000', eligible: true, workingDays: 312, bonusPercent: '8.33%', amount: '₹11,995' },
    ];

    return (
        <Page
            title="Statutory Bonus Calculation"
            subtitle="Compute and distribute Payment of Bonus Act (1965) liabilities."
            breadcrumbs={[{ label: "Statutory Bonus" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-[1500px] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Statutory Bonus Calculation</h2>
                        <p className="text-gray-400 text-sm mt-1">Compute and distribute Payment of Bonus Act (1965) liabilities.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 bg-[#060B14] border border-[#1A2A3A] px-4 py-2 rounded-lg text-sm">
                            <span className="text-gray-400">Financial Year:</span>
                            <select className="bg-transparent text-white outline-none font-medium cursor-pointer">
                                <option>FY 2023-24</option>
                                <option>FY 2022-23</option>
                            </select>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black font-bold rounded-lg text-sm transition-colors">
                            Approve & Push to Payroll
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 flex items-center gap-4">
                        <div className="p-3 bg-[#0066FF]/10 rounded-lg">
                            <Users className="w-6 h-6 text-[#0066FF]" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Eligible Employees</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <p className="text-2xl font-bold text-white">142</p>
                                <span className="text-xs text-gray-500">out of 180 (Basic ≤ ₹21k)</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 flex items-center gap-4">
                        <div className="p-3 bg-[#FFB800]/10 rounded-lg">
                            <IndianRupee className="w-6 h-6 text-[#FFB800]" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Total Bonus Liability</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <p className="text-2xl font-bold text-white">₹18,45,200</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 flex items-center gap-4">
                        <div className="p-3 bg-[#00E5A0]/10 rounded-lg">
                            <Calculator className="w-6 h-6 text-[#00E5A0]" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Declared Bonus %</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <p className="text-2xl font-bold text-[#00E5A0]">{bonusPercentage}%</p>
                                <span className="text-xs text-gray-500">Min 8.33%, Max 20%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Rules Config Panel */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white border-b border-[#1A2A3A] pb-3 mb-5">Configuration & Rules</h3>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Allocable Surplus (₹)</label>
                                    <input type="text" defaultValue="25,00,000" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]" />
                                    <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Determines max bonus % possible</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Declared Bonus %</label>
                                    <div className="flex gap-3">
                                        <input
                                            type="number"
                                            value={bonusPercentage}
                                            onChange={(e) => setBonusPercentage(e.target.value)}
                                            className="flex-1 bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]"
                                            step="0.01" min="8.33" max="20"
                                        />
                                        <button className="bg-[#1A2A3A] hover:bg-[#2A3B4C] text-white px-4 rounded-lg text-sm font-medium transition-colors border border-transparent">
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#1A2A3A] space-y-3">
                                    <h4 className="text-sm font-medium text-white mb-2">Statutory Limits Applied:</h4>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Eligibility Salary Limit:</span>
                                        <span className="font-mono">₹21,000/month</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Calculation Ceiling Limit:</span>
                                        <span className="font-mono">₹7,000/month</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Min Working Days:</span>
                                        <span className="font-mono">30 Days</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl p-5">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-[#00E5A0] font-medium text-sm">Calculation Validated</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">The applied 8.33% bonus complies with statutory minimums. All prorated calculations for employees with &lt;365 days are verified.</p>
                                    <button className="mt-3 text-xs font-semibold text-[#00E5A0] hover:underline">Download Detailed Rules PDF</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="lg:col-span-8 bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060B14]">
                            <h3 className="font-semibold text-white">Employee Breakdown</h3>
                            <button className="flex items-center gap-2 text-sm text-[#00E5A0] hover:text-[#00E5A0]/80 transition-colors">
                                <Download className="w-4 h-4" /> Export CSV
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-[#0A1420] text-gray-400 border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">EMP ID</th>
                                        <th className="px-4 py-3 font-medium">Name</th>
                                        <th className="px-4 py-3 font-medium text-right">Avg Basic (PM)</th>
                                        <th className="px-4 py-3 font-medium text-center">Working Days</th>
                                        <th className="px-4 py-3 font-medium text-center">Eligible?</th>
                                        <th className="px-4 py-3 font-medium text-right">Bonus %</th>
                                        <th className="px-4 py-3 font-medium text-right text-[#00E5A0]">Calculated Bonus</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {employees.map((emp, idx) => (
                                        <tr key={idx} className={`hover:bg-[#1A2A3A]/30 transition-colors ${!emp.eligible ? 'opacity-50' : ''}`}>
                                            <td className="px-4 py-3 font-medium text-gray-400">{emp.id}</td>
                                            <td className="px-4 py-3 text-white">{emp.name}</td>
                                            <td className="px-4 py-3 text-right font-mono">{emp.basic}</td>
                                            <td className="px-4 py-3 text-center">{emp.workingDays} <span className="text-[10px] text-gray-500">/ 365</span></td>
                                            <td className="px-4 py-3 text-center">
                                                {emp.eligible ? (
                                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00E5A0]/10 text-[#00E5A0] text-xs font-bold">Y</span>
                                                ) : (
                                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FF4444]/10 text-[#FF4444] text-xs font-bold">N</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right">{emp.bonusPercent}</td>
                                            <td className="px-4 py-3 text-right font-bold text-[#00E5A0]">{emp.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-[#1A2A3A] bg-[#060B14] flex justify-between items-center text-sm">
                            <span className="text-gray-400">Showing 1-5 of 142 eligible employees</span>
                            <div className="flex gap-1">
                                <button className="px-3 py-1 border border-[#1A2A3A] rounded hover:bg-[#1A2A3A] disabled:opacity-50">Prev</button>
                                <button className="px-3 py-1 bg-[#1A2A3A] text-white rounded">1</button>
                                <button className="px-3 py-1 border border-[#1A2A3A] rounded hover:bg-[#1A2A3A]">2</button>
                                <button className="px-3 py-1 border border-[#1A2A3A] rounded hover:bg-[#1A2A3A]">Next</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
    );
}
