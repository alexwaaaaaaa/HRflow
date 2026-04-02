"use client";

import React from "react";
import { AlertTriangle, TrendingDown, RefreshCw, HandCoins, Info } from "lucide-react";

export default function NegativeNetPayPage() {
    const cases = [
        { id: 'EMP402', name: 'Suresh Menon', gross: '₹15,000', deduction: '₹22,000', shortfall: '₹7,000', details: 'Base: 15k, Advance EMI: 20k, PF: 1.8k, PT: 0.2k' },
        { id: 'EMP418', name: 'Leena Thomas', gross: '₹4,000', deduction: '₹5,200', shortfall: '₹1,200', details: 'Base: 4k (High LOP), PF/ESI/TDS arrears: 5.2k' }
    ];

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Negative Net Pay (Recovery Cases)</h2>
                        <p className="text-gray-400 text-sm mt-1">Manage cases where employee deductions exceed their gross earnings.</p>
                    </div>
                </div>

                {/* Global Alert */}
                <div className="bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl p-5 flex items-start gap-4">
                    <div className="p-2 bg-[#FF4444]/20 rounded-lg shrink-0">
                        <AlertTriangle className="w-6 h-6 text-[#FF4444]" />
                    </div>
                    <div>
                        <h3 className="text-[#FF4444] font-bold text-lg">Critical Alert: 2 Employees have Negative Net Pay</h3>
                        <p className="text-sm text-gray-300 mt-1">The system has automatically capped their net pay at ₹0. You need to resolve the remaining shortfall amounts below before locking payroll.</p>
                    </div>
                </div>

                {/* Dynamic List */}
                <div className="space-y-6">
                    {cases.map((emp) => (
                        <div key={emp.id} className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                            <div className="p-5 border-b border-[#1A2A3A] bg-[#060B14] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                        {emp.name} <span className="text-xs font-medium bg-[#1A2A3A] text-gray-300 px-2 py-0.5 rounded-full">{emp.id}</span>
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                        <Info className="w-3.5 h-3.5" /> Details: {emp.details}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6 bg-[#1A2A3A]/50 p-3 rounded-lg border border-[#1A2A3A]">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Gross</p>
                                        <p className="font-mono text-white mt-1">{emp.gross}</p>
                                    </div>
                                    <div className="text-center font-bold text-gray-600">-</div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Deduction</p>
                                        <p className="font-mono text-[#FF4444] mt-1">{emp.deduction}</p>
                                    </div>
                                    <div className="text-center font-bold text-gray-600">=</div>
                                    <div className="text-right bg-[#FF4444]/10 px-3 py-1 rounded border border-[#FF4444]/20">
                                        <p className="text-xs text-[#FF4444] font-bold uppercase tracking-wider">Shortfall</p>
                                        <p className="font-mono text-[#FF4444] font-bold text-lg leading-tight mt-0.5">-{emp.shortfall}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <h5 className="text-sm font-semibold text-white mb-4">Required Resolution Strategy:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    <button className="text-left bg-[#060B14] border border-[#1A2A3A] hover:border-[#0066FF]/50 hover:bg-[#0066FF]/5 p-4 rounded-xl transition-all group">
                                        <div className="p-2 bg-[#0066FF]/10 text-[#0066FF] w-fit rounded-lg mb-3 group-hover:scale-110 transition-transform">
                                            <TrendingDown className="w-5 h-5" />
                                        </div>
                                        <h6 className="font-medium text-white text-sm mb-1">Carry Forward ₹{emp.shortfall.replace('₹', '')}</h6>
                                        <p className="text-xs text-gray-400">Add logic to automatically deduct this arrear in the next active payroll cycle.</p>
                                    </button>

                                    <button className="text-left bg-[#060B14] border border-[#1A2A3A] hover:border-[#FFB800]/50 hover:bg-[#FFB800]/5 p-4 rounded-xl transition-all group">
                                        <div className="p-2 bg-[#FFB800]/10 text-[#FFB800] w-fit rounded-lg mb-3 group-hover:scale-110 transition-transform">
                                            <HandCoins className="w-5 h-5" />
                                        </div>
                                        <h6 className="font-medium text-white text-sm mb-1">Mark Employer Receivable</h6>
                                        <p className="text-xs text-gray-400">Book it as a debt owed by employee (Finance team to follow up manually).</p>
                                    </button>

                                    <button className="text-left bg-[#060B14] border border-[#1A2A3A] hover:border-[#00E5A0]/50 hover:bg-[#00E5A0]/5 p-4 rounded-xl transition-all group">
                                        <div className="p-2 bg-[#00E5A0]/10 text-[#00E5A0] w-fit rounded-lg mb-3 group-hover:scale-110 transition-transform">
                                            <RefreshCw className="w-5 h-5" />
                                        </div>
                                        <h6 className="font-medium text-white text-sm mb-1">Adjust from Unpaid Bonus</h6>
                                        <p className="text-xs text-gray-400">Offset negative balance against pending incentives (requires admin check).</p>
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
