"use client";

import React, { useState } from "react";
import { AlertOctagon, UserX, Edit3, PauseCircle, CheckCircle } from "lucide-react";

export default function ZeroPayrollPage() {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const employees = [
        { id: 'EMP301', name: 'Kabir Singh', gross: '₹0', deduction: '₹0', lop: 31, reason: '100% LOP (On Long Leave)' },
        { id: 'EMP305', name: 'Neha Gupta', gross: '₹12,000', deduction: '₹12,000', lop: 14, reason: 'High Deductions + Partial LOP' },
        { id: 'EMP342', name: 'Aakash Verma', gross: '₹8,500', deduction: '₹8,500', lop: 20, reason: 'Advance Recovery = Salary' },
        { id: 'EMP350', name: 'Tania Roy', gross: '₹0', deduction: '₹0', lop: 31, reason: 'Sabbatical (Approved)' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-48px)]">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 shrink-0 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Zero Payroll Management</h2>
                        <p className="text-gray-400 text-sm mt-1">Review employees with ₹0 net payout before finalizing the payroll run.</p>
                    </div>
                </div>

                {/* Hero Alert */}
                <div className="bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl p-5 mb-6 shrink-0 flex items-start gap-4">
                    <div className="p-2 bg-[#FFB800]/20 rounded-lg shrink-0">
                        <AlertOctagon className="w-6 h-6 text-[#FFB800]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[#FFB800] font-bold text-lg">Attention Required: 4 Employees have Zero Net Pay this month.</h3>
                        <p className="text-sm text-gray-300 mt-1">These records will generate ₹0 payslips and block direct deposit processing for these individuals.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#FFB800] hover:bg-[#FFB800]/90 text-black font-bold rounded-lg text-sm transition-colors shrink-0">
                        Acknowledge & View
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">

                    {/* Main List */}
                    <div className={`${selectedUser ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300 bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden`}>
                        <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060B14] shrink-0">
                            <h3 className="font-semibold text-white">Zero Pay List</h3>
                            <span className="text-xs text-gray-400 font-medium px-2 py-1 bg-[#1A2A3A] rounded">March 2025 Cycle</span>
                        </div>
                        <div className="overflow-y-auto flex-1 custom-scrollbar">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-[#0A1420] text-gray-400 border-b border-[#1A2A3A] sticky top-0 z-10 shadow-sm shadow-black/20">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">EMP ID</th>
                                        <th className="px-5 py-3 font-medium">Name</th>
                                        <th className="px-5 py-3 font-medium">Gross Earnings</th>
                                        <th className="px-5 py-3 font-medium">Total Deductions</th>
                                        <th className="px-5 py-3 font-medium text-center">LOP Days</th>
                                        <th className="px-5 py-3 font-medium">Reason</th>
                                        <th className="px-5 py-3 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {employees.map((emp) => (
                                        <tr key={emp.id} className={`hover:bg-[#1A2A3A]/40 transition-colors cursor-pointer ${selectedUser === emp.id ? 'bg-[#1A2A3A]/30 border-l-2 border-l-[#FFB800]' : 'border-l-2 border-l-transparent'}`} onClick={() => setSelectedUser(emp.id)}>
                                            <td className="px-5 py-4 font-medium text-gray-400">{emp.id}</td>
                                            <td className="px-5 py-4 text-white font-medium flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] text-gray-300">
                                                    <UserX className="w-3.5 h-3.5" />
                                                </div>
                                                {emp.name}
                                            </td>
                                            <td className="px-5 py-4 text-gray-300 font-mono">{emp.gross}</td>
                                            <td className="px-5 py-4 text-[#FF4444] font-mono">{emp.deduction}</td>
                                            <td className="px-5 py-4 text-center font-bold text-[#FFB800]">{emp.lop}</td>
                                            <td className="px-5 py-4 text-gray-400 text-xs">
                                                <span className="bg-[#1A2A3A] px-2 py-1 rounded">{emp.reason}</span>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <button className="text-xs font-semibold text-[#00E5A0] hover:underline" onClick={(e) => { e.stopPropagation(); setSelectedUser(emp.id); }}>Review</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Action Drawer (Right side peek) */}
                    {selectedUser && (
                        <div className="lg:col-span-4 bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden animate-in slide-in-from-right-4 fade-in duration-200">
                            <div className="p-4 border-b border-[#1A2A3A] bg-[#060B14] shrink-0 flex justify-between items-center">
                                <h3 className="font-semibold text-white">Action Center</h3>
                                <button onClick={() => setSelectedUser(null)} className="text-gray-500 hover:text-white">&times;</button>
                            </div>

                            <div className="p-5 flex-1 overflow-y-auto">
                                {employees.filter(e => e.id === selectedUser).map(emp => (
                                    <div key={emp.id} className="space-y-6">
                                        <div className="text-center pb-5 border-b border-[#1A2A3A]">
                                            <div className="w-16 h-16 rounded-full bg-[#1A2A3A] mx-auto mb-3 flex items-center justify-center text-gray-400">
                                                <UserX className="w-8 h-8" />
                                            </div>
                                            <h4 className="text-lg font-bold text-white">{emp.name}</h4>
                                            <p className="text-sm text-gray-500 uppercase tracking-wide">{emp.id}</p>
                                            <div className="mt-3 inline-block bg-[#FFB800]/10 text-[#FFB800] px-3 py-1 rounded-full text-xs font-medium border border-[#FFB800]/20">
                                                {emp.reason}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h5 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Resolution Options</h5>

                                            <button className="w-full text-left p-3 rounded-lg border border-[#1A2A3A] bg-[#060B14] hover:border-[#00E5A0]/50 hover:bg-[#00E5A0]/5 transition-all group flex items-start gap-3">
                                                <div className="mt-0.5 group-hover:text-[#00E5A0] text-gray-500 transition-colors"><Edit3 className="w-4 h-4" /></div>
                                                <div>
                                                    <p className="text-sm font-medium text-white group-hover:text-[#00E5A0] transition-colors">Override Deduction</p>
                                                    <p className="text-xs text-gray-400 mt-1">Reduce recovery deduction & carry forward balance to next month</p>
                                                </div>
                                            </button>

                                            <button className="w-full text-left p-3 rounded-lg border border-[#1A2A3A] bg-[#060B14] hover:border-[#FFB800]/50 hover:bg-[#FFB800]/5 transition-all group flex items-start gap-3">
                                                <div className="mt-0.5 group-hover:text-[#FFB800] text-gray-500 transition-colors"><PauseCircle className="w-4 h-4" /></div>
                                                <div>
                                                    <p className="text-sm font-medium text-white group-hover:text-[#FFB800] transition-colors">Hold Payroll</p>
                                                    <p className="text-xs text-gray-400 mt-1">Pause this employee&apos;s payroll calculation entirely for manual review</p>
                                                </div>
                                            </button>

                                            <button className="w-full text-left p-3 rounded-lg border border-[#1A2A3A] bg-[#060B14] hover:border-gray-400 transition-all group flex items-start gap-3">
                                                <div className="mt-0.5 text-gray-500 group-hover:text-white transition-colors"><CheckCircle className="w-4 h-4" /></div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">Process as Zero</p>
                                                    <p className="text-xs text-gray-400 mt-1">Acknowledge reason and approve zero payout for this cycle</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
