"use client";

import React, { useState } from "react";
import { Play, FileText, Download, Info, CalendarClock } from "lucide-react";

export default function LeaveEncashmentPage() {
    const employees = [
        { id: 'EMP201', name: 'Alia Bhatt', type: 'Annual Leave', totalBalance: 28, toRetain: 15, encashable: 13, reqAmount: 10, basic: '₹40,000', payout: '₹15,384' },
        { id: 'EMP204', name: 'Ranbir Kapoor', type: 'Annual Leave', totalBalance: 45, toRetain: 15, encashable: 30, reqAmount: 30, basic: '₹65,000', payout: '₹75,000' },
        { id: 'EMP210', name: 'Deepika P', type: 'Privilege Leave', totalBalance: 18, toRetain: 15, encashable: 3, reqAmount: 3, basic: '₹35,000', payout: '₹4,038' },
        { id: 'EMP215', name: 'Ranveer S', type: 'Earned Leave', totalBalance: 30, toRetain: 15, encashable: 15, reqAmount: 10, basic: '₹50,000', payout: '₹19,230' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00E5A0]/10 rounded-lg">
                                <CalendarClock className="w-6 h-6 text-[#00E5A0]" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Leave Encashment Payroll</h2>
                        </div>
                        <p className="text-gray-400 text-sm mt-1 ml-12">Process leave encashment requests and calculate payouts seamlessly.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#1A2A3A] hover:bg-[#1A2A3A] transition-colors rounded-lg text-sm font-medium">
                            <FileText className="w-4 h-4" /> View Policy Rules
                        </button>
                    </div>
                </div>

                {/* Policy & Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 flex flex-col justify-center">
                        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4 text-[#0066FF]" /> Active Policy Breakdown
                        </h3>
                        <div className="grid grid-cols-2 gap-8 text-sm">
                            <div>
                                <span className="text-gray-400 block mb-1">Encashment Formula</span>
                                <span className="font-mono bg-[#060B14] border border-[#1A2A3A] px-2 py-1 rounded inline-block">
                                    (Basic Salary ÷ 26) × Encashment Days
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-400 block mb-1">Minimum Balance to Retain</span>
                                <span className="font-medium text-white px-2 py-1 rounded inline-block bg-[#060B14] border border-[#1A2A3A]">
                                    15 Days
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-400 block mb-1">Max Encashment per Year</span>
                                <span className="font-medium text-white">30 Days</span>
                            </div>
                            <div>
                                <span className="text-gray-400 block mb-1">Applicable Leave Types</span>
                                <span className="font-medium text-white">Annual Leave, Privilege Leave, Earned Leave</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5A0]/10 rounded-bl-full blur-2xl"></div>
                        <p className="text-sm text-gray-400 font-medium mb-1">Total Payout Pending</p>
                        <h3 className="text-3xl font-bold text-white mb-4">₹1,13,652</h3>

                        <div className="space-y-3">
                            <button className="w-full flex justify-center items-center gap-2 border border-[#00E5A0] text-[#00E5A0] hover:bg-[#00E5A0]/10 py-2.5 rounded-lg text-sm font-bold transition-colors">
                                <Play className="w-4 h-4" /> Simulate Payout
                            </button>
                            <button className="w-full flex justify-center items-center gap-2 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black py-2.5 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-[#00E5A0]/20">
                                Process Encashment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pending Requests Table */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060B14]">
                        <h3 className="font-semibold text-white">Pending Requests ({employees.length})</h3>
                        <div className="flex gap-2">
                            <button className="text-sm border border-[#1A2A3A] px-3 py-1.5 rounded hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                                <Download className="w-4 h-4" /> Export List
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#0A1420] text-gray-400 border-b border-[#1A2A3A]">
                                <tr>
                                    <th className="px-4 py-3 text-center w-12"><input type="checkbox" defaultChecked className="rounded border-[#1A2A3A] bg-[#060B14] text-[#00E5A0]" /></th>
                                    <th className="px-4 py-3 font-medium">Employee Name</th>
                                    <th className="px-4 py-3 font-medium">Leave Type</th>
                                    <th className="px-4 py-3 font-medium text-center">Total Balance</th>
                                    <th className="px-4 py-3 font-medium text-center">To Retain</th>
                                    <th className="px-4 py-3 font-medium text-center text-[#00E5A0]">Encashing</th>
                                    <th className="px-4 py-3 font-medium text-right">Basic (PM)</th>
                                    <th className="px-4 py-3 font-medium text-right">Calculated Payout</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {employees.map((emp, idx) => (
                                    <tr key={idx} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                        <td className="px-4 py-3 text-center"><input type="checkbox" defaultChecked className="rounded border-[#1A2A3A] bg-[#060B14] text-[#00E5A0]" /></td>
                                        <td className="px-4 py-3 font-medium">
                                            <div className="flex flex-col">
                                                <span className="text-white">{emp.name}</span>
                                                <span className="text-xs text-gray-500">{emp.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-300">
                                            <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-xs">{emp.type}</span>
                                        </td>
                                        <td className="px-4 py-3 text-center font-medium">{emp.totalBalance}</td>
                                        <td className="px-4 py-3 text-center text-gray-400">{emp.toRetain}</td>
                                        <td className="px-4 py-3 text-center font-bold text-[#00E5A0]">
                                            <span className="bg-[#00E5A0]/10 border border-[#00E5A0]/20 px-2 py-1 rounded">
                                                {emp.reqAmount} days
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right font-mono text-gray-400">{emp.basic}</td>
                                        <td className="px-4 py-3 text-right font-bold text-white">{emp.payout}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
