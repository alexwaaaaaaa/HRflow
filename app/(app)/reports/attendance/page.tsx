"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Clock, ChevronRight, Download, Filter, Target, Calendar
} from "lucide-react";

export default function AttendanceReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Attendance</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Clock className="w-8 h-8 text-[#00E5FF]" />
                        Muster Roll & Attendance
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Detailed timesheets, shortfalls, and overtime reports for payroll prep.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg">
                        <Calendar className="w-4 h-4" /> Mar 2026
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#00E5FF] hover:bg-[#00B3CC] text-[#0B1221] text-sm font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                        <Download className="w-4 h-4" /> Export for Payroll
                    </button>
                </div>
            </div>

            {/* Shift Adherence Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Avg. Office Presence</h3>
                    <div className="text-3xl font-bold mb-1 text-white">8h 15m</div>
                    <div className="w-full bg-[#1A2A3A] rounded-full h-1.5 mt-4">
                        <div className="bg-[#00E5FF] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Total Shortfall Hours</h3>
                    <div className="text-3xl font-bold mb-1 text-pink-400">142h</div>
                    <p className="text-xs text-[#8899AA] mt-1">Across 32 employees</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Approved Overtime</h3>
                    <div className="text-3xl font-bold mb-1 text-emerald-400">85h</div>
                    <p className="text-xs text-[#8899AA] mt-1">Pending payout calculation</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-base font-bold text-white">Monthly Consolidated Grid</h2>
                    <div className="flex gap-2 text-xs">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Present</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-500"></div> Absent/Leave</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Shortfall/Late</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs">
                                <th className="p-3 font-medium border-b border-r border-[#2A3A4A] sticky left-0 bg-[#0D1928] z-10 w-48">Employee</th>
                                <th className="p-3 font-medium border-b border-r border-[#2A3A4A] text-center w-20">Pay Days</th>
                                {/* Sample days */}
                                {[1, 2, 3, 4, 5, 6, 7].map(d => (
                                    <th key={d} className="p-2 font-medium border-b border-r border-[#2A3A4A] text-center w-12 text-[#8899AA]">
                                        <div>0{d}</div>
                                        <div className="text-[10px] mt-1 font-normal opacity-70">
                                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][d - 1]}
                                        </div>
                                    </th>
                                ))}
                                <th className="p-3 font-medium border-b border-[#2A3A4A]">...</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A] text-sm font-mono">
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-3 border-r border-[#1A2A3A] sticky left-0 bg-[#0D1928] z-10 font-sans font-medium text-white">Sneha Rao</td>
                                <td className="p-3 border-r border-[#1A2A3A] text-center font-bold text-emerald-400">31/31</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-emerald-400">P</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-emerald-400">P</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-emerald-400">P</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-amber-500" title="Shortfall: 2h">SH</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-emerald-400">P</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-[#8899AA] bg-[#1A2A3A]/20">WO</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-[#8899AA] bg-[#1A2A3A]/20">WO</td>
                                <td className="p-3">...</td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-3 border-r border-[#1A2A3A] sticky left-0 bg-[#0D1928] z-10 font-sans font-medium text-white">Rajiv Mehta</td>
                                <td className="p-3 border-r border-[#1A2A3A] text-center font-bold text-pink-400">29.5/31</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-pink-500 bg-pink-500/10">LWP</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-emerald-400">P</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-emerald-400">P</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-emerald-400">P</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-amber-500">HD</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-[#8899AA] bg-[#1A2A3A]/20">WO</td>
                                <td className="p-2 border-r border-[#1A2A3A] text-center text-[#8899AA] bg-[#1A2A3A]/20">WO</td>
                                <td className="p-3">...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-[#1A2A3A]/20 text-xs text-[#8899AA] border-t border-[#1A2A3A]">
                    Legend: P = Present, SH = Shortfall, LWP = Leave Without Pay, HD = Half Day, WO = Weekly Off.
                </div>
            </div>

        </div>
    );
}
