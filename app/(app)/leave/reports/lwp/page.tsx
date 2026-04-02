"use client";

import React, { useState } from 'react';
import {
    AlertTriangle, Download, Filter, Search, Calendar, ChevronRight
} from 'lucide-react';

export default function LeaveWithoutPayDetail() {
    const lwpData = [
        { id: 'EMP044', name: 'Aditi Jain', dept: 'Design', dates: '12 Nov - 14 Nov', days: 3, reason: 'Sick leave exhausted.', status: 'Deducted in Nov Payroll' },
        { id: 'EMP108', name: 'Suresh Kumar', dept: 'Engineering', dates: '24 Oct', days: 1, reason: 'Unapproved absence.', status: 'Pending Deduction' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1200px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center">
                            Leave Without Pay (LWP) Details <AlertTriangle size={20} className="ml-3 text-[#FF4444]" />
                        </h1>
                        <p className="text-sm text-[#8899AA]">Track absences that result in pay deduction and ensure they are synced with payroll.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2 text-[#00E5A0]" /> Export LWP Data
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-xl p-5 shadow-[0_0_15px_rgba(255,68,68,0.05)]">
                        <div className="text-sm font-bold text-[#FF4444] mb-2 uppercase tracking-wider">Total LWP Days (MTD)</div>
                        <div className="text-4xl font-black text-white">18 <span className="text-sm font-bold text-[#8899AA] uppercase">Days</span></div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                        <div className="text-sm font-bold text-[#8899AA] mb-2 uppercase tracking-wider">Affected Employees</div>
                        <div className="text-4xl font-black text-white">7 <span className="text-sm font-bold text-[#556677] uppercase">People</span></div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                        <div className="text-sm font-bold text-[#8899AA] mb-2 uppercase tracking-wider">Pending Deductions</div>
                        <div className="text-4xl font-black text-[#FFB800]">4 <span className="text-sm font-bold text-[#556677] uppercase">Cases</span></div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <div className="relative w-80">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search employee..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-3 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors">
                                <Filter size={16} />
                            </button>
                        </div>
                    </div>

                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">LWP Dates</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center">Days</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Reason / Origin</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Payroll Status</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {lwpData.map((row, i) => (
                                <tr key={i} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white text-base">{row.name}</div>
                                        <div className="text-xs text-[#8899AA]">{row.id} • {row.dept}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white flex items-center"><Calendar size={14} className="mr-2 text-[#0066FF]" /> {row.dates}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-lg font-black text-[#FF4444]">{row.days}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-[#8899AA] truncate max-w-[200px]" title={row.reason}>{row.reason}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.status.includes('Pending') ? (
                                            <span className="px-2 py-1 text-xs font-bold uppercase bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20 rounded tracking-wider">
                                                Pending Deduction
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-bold uppercase bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20 rounded tracking-wider">
                                                Processed
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#0066FF] hover:text-[#00E5A0] font-bold text-sm transition-colors flex items-center justify-end w-full">
                                            View Details <ChevronRight size={16} className="ml-1" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
