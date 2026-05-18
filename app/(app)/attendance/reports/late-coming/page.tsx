"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    Clock, Search, Filter, Download, ArrowUpRight, AlertCircle
} from 'lucide-react';

export default function LateComingReport() {
    const data = [
        { id: 1, empName: 'Rohan Sharma', empId: 'EMP124', dept: 'Engineering', incidents: 4, totalDelay: '2h 15m', penaltyAmt: '₹500', status: 'Penalty Deducted' },
        { id: 2, empName: 'Aditi Jain', empId: 'EMP044', dept: 'Sales', incidents: 2, totalDelay: '45m', penaltyAmt: '-', status: 'Warning Auto-Sent' },
        { id: 3, empName: 'Manoj Kumar', empId: 'EMP189', dept: 'Operations', incidents: 6, totalDelay: '4h 30m', penaltyAmt: '₹1200', status: 'HR Review Required' },
    ];

    return (
        <Page
            title="Late Coming Analysis"
            subtitle="Track recurring tardiness, total delay duration, and associated payroll penalties."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Reports", href: "/attendance/reports" }, { label: "Late Coming" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Late Coming Analysis</h1>
                        <p className="text-sm text-[#8899AA]">Track recurring tardiness, total delay duration, and associated payroll penalties.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] px-3 py-2 rounded-lg flex items-center space-x-2 text-sm text-[#8899AA]">
                            <Clock size={16} />
                            <span>Current Month (Nov 2024)</span>
                        </div>
                        <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white shadow-sm">
                            <Download size={16} className="mr-2 text-[#00E5A0]" /> Export Data
                        </button>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <h3 className="text-sm font-medium text-[#8899AA] mb-4">Total Late Incidents</h3>
                        <div className="text-3xl font-black text-white flex items-end">
                            142 <span className="text-sm font-bold text-[#FF4444] ml-3 mb-1 flex items-center"><ArrowUpRight size={14} className="mr-0.5" /> 12% vs Last Mo</span>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <h3 className="text-sm font-medium text-[#8899AA] mb-4">Total Delay Duration</h3>
                        <div className="text-3xl font-black text-[#FFB800]">86h 45m</div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <h3 className="text-sm font-medium text-[#8899AA] mb-4">Est. Value Lost</h3>
                        <div className="text-3xl font-black text-[#FF4444]">₹42,500</div>
                    </div>

                    <div className="bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl p-5 shadow-sm flex flex-col justify-center">
                        <div className="flex items-center text-[#FF4444] mb-2">
                            <AlertCircle size={18} className="mr-2" />
                            <h3 className="text-sm font-bold">Repeat Offenders</h3>
                        </div>
                        <div className="text-2xl font-black text-white">14 <span className="text-xs font-medium text-[#8899AA] font-normal tracking-wide">employees ({'>'}3 lates)</span></div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="relative w-72">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none w-48">
                                <option>Sort: Most Incidents</option>
                                <option>Sort: Highest Penalty</option>
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
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center">Incidents</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Total Delay</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Est. Penalty</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Action / Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {data.map((row) => (
                                <tr key={row.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white mb-0.5">{row.empName}</div>
                                        <div className="text-xs text-[#8899AA]">{row.empId}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-300">{row.dept}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-sm ${row.incidents > 3 ? 'bg-[#FF4444]/20 text-[#FF4444]' : 'bg-[#FFB800]/20 text-[#FFB800]'
                                            }`}>
                                            {row.incidents}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white font-mono">{row.totalDelay}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`font-bold ${row.penaltyAmt === '-' ? 'text-[#8899AA]' : 'text-[#FF4444]'}`}>
                                            {row.penaltyAmt}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded border ${row.status.includes('Penalty') ? 'bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/30' :
                                                row.status.includes('Warning') ? 'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30' :
                                                    'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    
        </Page>
        );
}
