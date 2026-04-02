"use client";

import React, { useState } from "react";
import { AlertCircle, Ban, FileWarning, Search, BellRing, Edit, XCircle } from "lucide-react";

export default function PayrollExceptionPage() {
    const exceptions = [
        { id: 'E-101', empId: 'EMP412', name: 'Manish Tiwari', type: 'Invalid Bank Details', detail: 'IFSC Code "HDFC000A123" is invalid (length error).', severity: 'Critical' },
        { id: 'E-102', empId: 'EMP450', name: 'Sonia Das', type: 'PAN Mismatch', detail: 'Name on PAN does not match HR records.', severity: 'High' },
        { id: 'E-103', empId: 'EMP488', name: 'Rohan Mehta', type: 'Missing Attendance', detail: 'Timesheet locked but 0 hours reported for regular FTE.', severity: 'Critical' },
        { id: 'E-104', empId: 'EMP501', name: 'Kiran Patel', type: 'Negative Net Pay', detail: 'Deductions exceed gross by ₹2,400.', severity: 'High' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Header */}
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FF4444] to-[#FF8888] bg-clip-text text-transparent flex items-center gap-2">
                        <Ban className="w-6 h-6 text-[#FF4444]" /> Payroll Run Blocked
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Resolve the following critical exceptions to unlock process run.</p>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-[0_0_15px_rgba(255,68,68,0.1)]">
                        <div className="text-3xl font-black text-[#FF4444] mb-1">3</div>
                        <p className="text-xs font-bold text-[#FF4444] uppercase tracking-wider">Critical Errors</p>
                        <p className="text-[10px] text-gray-400 mt-1">(Blocks Payroll)</p>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-gray-400 text-xs font-medium">Bank/Tax Data Error</span>
                            <AlertCircle className="w-4 h-4 text-[#FFB800]" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">2</div>
                        <p className="text-xs text-gray-500">IFSC, PAN, UAN missing/invalid</p>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-gray-400 text-xs font-medium">Attendance & Leave</span>
                            <FileWarning className="w-4 h-4 text-[#FFB800]" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">1</div>
                        <p className="text-xs text-gray-500">Missing LOP approval, zero hours</p>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-gray-400 text-xs font-medium">Compliance/Values</span>
                            <Ban className="w-4 h-4 text-[#FFB800]" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">1</div>
                        <p className="text-xs text-gray-500">Negative Net Pay, Max PF limit</p>
                    </div>
                </div>

                {/* Exceptions List */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden flex flex-col h-[600px]">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060B14] shrink-0">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                            <input type="text" placeholder="Search exceptions..." className="w-full bg-[#0A1420] border border-[#1A2A3A] text-white rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-[#FF4444]/50" />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">Filter:</span>
                            <select className="bg-[#0A1420] border border-[#1A2A3A] text-white rounded-lg px-3 py-1.5 text-sm outline-none">
                                <option>All Exceptions</option>
                                <option>Critical Only</option>
                                <option>Bank/Tax Data</option>
                            </select>
                        </div>
                    </div>

                    {/* List items */}
                    <div className="overflow-y-auto flex-1 p-4 space-y-4">
                        {exceptions.map((exc) => (
                            <div key={exc.id} className="bg-[#060B14] border border-[#1A2A3A] p-4 rounded-lg flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center hover:border-gray-600 transition-colors">

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${exc.severity === 'Critical' ? 'bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/20' : 'bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20'}`}>
                                            {exc.severity}
                                        </span>
                                        <span className="text-white font-medium text-sm">{exc.type}</span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-mono text-gray-400 bg-[#1A2A3A] px-1.5 py-0.5 rounded">{exc.empId}</span>
                                        <span className="text-sm text-gray-300 font-medium">{exc.name}</span>
                                    </div>

                                    <p className="text-sm text-gray-500">{exc.detail}</p>
                                </div>

                                <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 justify-end flex-wrap">
                                    <button className="flex items-center gap-1.5 px-3 py-2 bg-[#1A2A3A] hover:bg-[#2A3B4C] text-gray-300 rounded text-xs font-medium transition-colors cursor-pointer">
                                        <BellRing className="w-3.5 h-3.5" /> Remind Emp
                                    </button>
                                    <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0066FF]/10 border border-[#0066FF]/30 hover:bg-[#0066FF]/20 text-[#0066FF] rounded text-xs font-medium transition-colors cursor-pointer">
                                        <Edit className="w-3.5 h-3.5" /> Edit Data
                                    </button>
                                    <button className="flex items-center gap-1.5 px-3 py-2 bg-[#FF4444]/10 border border-[#FF4444]/30 hover:bg-[#FF4444]/20 text-[#FF4444] rounded text-xs font-medium transition-colors cursor-pointer" title="Process payroll without this employee">
                                        <XCircle className="w-3.5 h-3.5" /> Exclude from Run
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
