"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    Calendar, Download, Filter, Search, UserX, AlertTriangle, TrendingUp, ChevronRight
} from 'lucide-react';

export default function AbsenteeismReport() {
    const records = [
        { id: '1', empName: 'Rohan Sharma', empId: 'EMP124', dept: 'Engineering', totalDays: '3', type: 'Uninformed', dates: '04 Nov, 05 Nov, 06 Nov', impact: '3.0 LOP', status: 'Absconding Warning' },
        { id: '2', empName: 'Sara Khan', empId: 'EMP112', dept: 'Support', totalDays: '1', type: 'Sick Leave (Auto)', dates: '02 Nov', impact: '0.0 LOP (Leave Deducted)', status: 'Regularized' },
        { id: '3', empName: 'Manoj Kumar', empId: 'EMP189', dept: 'Operations', totalDays: '1.5', type: 'Missed Punches', dates: '01 Nov, 03 Nov (Half)', impact: '1.5 LOP', status: 'Pending Review' },
        { id: '4', empName: 'Priya Desai', empId: 'EMP082', dept: 'Sales', totalDays: '2', type: 'Weekly Off Overlay', dates: '28 Oct, 29 Oct', impact: '0.0 LOP', status: 'Approved Leave' },
    ];

    return (
        <Page
            title="Absenteeism Analytics"
            subtitle="Track unexplained absences, zero punches, and continuous leaves."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Reports", href: "/attendance/reports" }, { label: "Absenteeism" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Absenteeism Analytics</h1>
                        <p className="text-sm text-[#8899AA]">Track unexplained absences, zero punches, and continuous leaves.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] px-3 py-2 rounded-lg flex items-center space-x-2 text-sm text-[#8899AA]">
                            <Calendar size={16} />
                            <span>Current Month (Nov 2024)</span>
                        </div>
                        <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2 text-[#00E5A0]" /> Export CSV
                        </button>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4444]/10 rounded-bl-full -mr-4 -mt-4"></div>
                        <div className="flex items-center text-[#8899AA] mb-4 relative z-10">
                            <UserX size={18} className="mr-2 text-[#FF4444]" />
                            <h3 className="text-sm font-medium">Monthly Absences</h3>
                        </div>
                        <div className="flex items-end justify-between relative z-10">
                            <div className="text-3xl font-black text-white">45<span className="text-xl text-[#556677] ml-1">days</span></div>
                            <div className="text-xs font-bold text-[#FF4444] bg-[#FF4444]/10 px-2 py-1 rounded inline-flex items-center">
                                4.2% Rate
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center text-[#8899AA] mb-4">
                            <AlertTriangle size={18} className="mr-2 text-[#FFB800]" />
                            <h3 className="text-sm font-medium">Uninformed LOPs</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-black text-[#FFB800]">18</div>
                            <div className="text-xs text-[#556677] font-bold">Unpaid Leaves</div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center text-[#8899AA] mb-4">
                            <TrendingUp size={18} className="mr-2 text-[#00E5A0]" />
                            <h3 className="text-sm font-medium">Regularized Absences</h3>
                        </div>
                        <div className="text-3xl font-black text-[#00E5A0]">27</div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm flex flex-col justify-center">
                        <div className="text-sm font-bold text-[#8899AA] mb-3">Absconding Alert (&gt;3 days)</div>
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl font-black text-[#FF4444]">3</div>
                            <div className="text-xs text-[#8899AA] leading-tight">Employees flagged for<br />HR intervention</div>
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
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none w-48">
                                <option>Type: Uninformed</option>
                                <option>Type: All</option>
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
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Total Absent</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Absence Type</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Dates Missed</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Payroll Impact</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Alert Status</th>
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
                                    <td className="px-6 py-4">
                                        <div className="text-xl font-black text-white">{rec.totalDays}<span className="text-sm text-[#556677] font-medium ml-1">days</span></div>
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA] font-medium">
                                        {rec.type}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-[#8899AA]">
                                        {rec.dates}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-[#FF4444]">{rec.impact}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded border ${rec.status === 'Absconding Warning' ? 'bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/30' :
                                                rec.status === 'Regularized' ? 'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30' :
                                                    rec.status === 'Pending Review' ? 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30' :
                                                        'bg-[#556677]/10 text-[#8899AA] border-[#2A3A4A]'
                                            }`}>
                                            {rec.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs font-bold text-[#8899AA] hover:text-white transition-colors">Details <ChevronRight size={14} className="inline -mt-0.5" /></button>
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
