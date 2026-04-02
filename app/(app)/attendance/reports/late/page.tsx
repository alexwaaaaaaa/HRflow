"use client";

import React from 'react';
import {
    Clock, Search, Calendar, Download, Filter, TrendingDown, AlertTriangle, UserMinus
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LateArrivalsReport() {
    const records = [
        { id: '1', empName: 'Rohan Sharma', empId: 'EMP124', dept: 'Engineering', date: '04 Nov 2024', shiftStart: '09:00 AM', actIn: '09:45 AM', lateBy: '45m', penalty: 'Half Day LOP', status: 'Deducted' },
        { id: '2', empName: 'Aditi Jain', empId: 'EMP044', dept: 'Sales', date: '04 Nov 2024', shiftStart: '09:30 AM', actIn: '09:40 AM', lateBy: '10m', penalty: 'Warning (Grace: 15m)', status: 'Ignored' },
        { id: '3', empName: 'Manoj Kumar', empId: 'EMP189', dept: 'Operations', date: '03 Nov 2024', shiftStart: '08:00 AM', actIn: '10:30 AM', lateBy: '2h 30m', penalty: 'Full Day LOP', status: 'Pending Review' },
        { id: '4', empName: 'Priya Desai', empId: 'EMP082', dept: 'Support', date: '02 Nov 2024', shiftStart: '09:00 AM', actIn: '09:25 AM', lateBy: '25m', penalty: 'Late Mark (1/3)', status: 'Recorded' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Late Arrivals Tracking</h1>
                        <p className="text-sm text-[#8899AA]">Monitor tardiness, grace period violations, and automatic LOP deductions.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] px-3 py-2 rounded-lg flex items-center space-x-2 text-sm text-[#8899AA]">
                            <Calendar size={16} />
                            <span>Nov 01 - Nov 07, 2024</span>
                        </div>
                        <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2 text-[#00E5A0]" /> Export CSV
                        </button>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center text-[#8899AA] mb-4">
                            <UserMinus size={18} className="mr-2" />
                            <h3 className="text-sm font-medium">Total Late Punches</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-black text-[#FFB800]">124</div>
                            <div className="text-xs font-bold text-[#FF4444] bg-[#FF4444]/10 px-2 py-1 rounded inline-flex items-center">
                                +5% v/s last week
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center text-[#8899AA] mb-4">
                            <Clock size={18} className="mr-2" />
                            <h3 className="text-sm font-medium">Avg. Late Duration</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-black text-white">28<span className="text-xl text-[#556677] ml-1">mins</span></div>
                            <div className="text-xs text-[#556677] font-bold">Prev: 24 mins</div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center text-[#8899AA] mb-4">
                            <AlertTriangle size={18} className="mr-2 text-[#FF4444]" />
                            <h3 className="text-sm font-medium">Auto LOP Deductions</h3>
                        </div>
                        <div className="text-3xl font-black text-[#FF4444]">12 <span className="text-sm font-bold text-[#8899AA] font-normal tracking-wide">half-days</span></div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm flex flex-col justify-center">
                        <div className="text-sm font-bold text-[#8899AA] mb-3">Worst Offender</div>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center font-bold text-[#FFB800] text-sm">
                                MK
                            </div>
                            <div>
                                <div className="text-base font-bold text-white">Manoj Kumar</div>
                                <div className="text-xs text-[#FF4444] font-bold">Late 4 times this week</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="relative w-72">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none">
                                <option>Penalty: All</option>
                                <option>LOP</option>
                                <option>Warning</option>
                            </select>
                            <button className="px-3 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors">
                                <Filter size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Punch In Offset</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Late By</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Penalty Rule Hit</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {records.map((rec) => (
                                <tr key={rec.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white mb-0.5">{rec.empName}</div>
                                        <div className="text-xs text-[#8899AA]">{rec.empId} • {rec.dept}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300 font-medium">{rec.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2 text-xs font-mono text-[#8899AA]">
                                            <span>{rec.shiftStart}</span>
                                            <span className="text-white">→</span>
                                            <span className="text-[#FF4444] font-bold bg-[#FF4444]/10 px-1.5 py-0.5 rounded border border-[#FF4444]/20">{rec.actIn}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-black text-white">{rec.lateBy}</div>
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA]">
                                        {rec.penalty}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded border ${rec.status === 'Ignored' ? 'bg-[#556677]/10 text-[#8899AA] border-[#2A3A4A]' :
                                                rec.status === 'Deducted' ? 'bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/30' :
                                                    rec.status === 'Pending Review' ? 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30' :
                                                        'bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/30'
                                            }`}>
                                            {rec.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors">Waive Off</button>
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
