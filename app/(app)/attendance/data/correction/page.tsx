"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    Search, Save, Calendar
} from 'lucide-react';

export default function BulkCorrection() {
    const data = [
        { id: 1, empName: 'Rohan Sharma', empId: 'EMP124', date: '04 Nov 2024', shift: 'General (09:00 - 18:00)', inPunch: '10:15', outPunch: '18:05', status: 'Late In' },
        { id: 2, empName: 'Aditi Jain', empId: 'EMP044', date: '04 Nov 2024', shift: 'General (09:00 - 18:00)', inPunch: '--:--', outPunch: '--:--', status: 'Absent' },
        { id: 3, empName: 'Manoj Kumar', empId: 'EMP189', date: '04 Nov 2024', shift: 'Night (22:00 - 06:00)', inPunch: '21:55', outPunch: '04:10', status: 'Early Out' },
    ];

    return (
        <Page
            title="Attendance Bulk Correction"
            subtitle="HR Override tool to manually fix missing punches or alter status in bulk (e.g. marking all present during server downtime)."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Data", href: "/attendance/data" }, { label: "Correction" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Attendance Bulk Correction</h1>
                        <p className="text-sm text-[#8899AA]">HR Override tool to manually fix missing punches or alter status in bulk (e.g. marking all present during server downtime).</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                            <Save size={16} className="mr-2" /> Save Corrections
                        </button>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="flex items-center space-x-4 w-1/2">
                            <div className="relative flex-1">
                                <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                                <input
                                    type="text"
                                    placeholder="Search employees..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                                />
                            </div>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                                <input
                                    type="date"
                                    defaultValue="2024-11-04"
                                    className="w-40 bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="text-xs font-bold text-[#8899AA]">Bulk Action:</span>
                            <button className="px-3 py-1.5 text-xs font-bold bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 rounded hover:bg-[#00E5A0] hover:text-[#060B14] transition-colors">Mark Present</button>
                            <button className="px-3 py-1.5 text-xs font-bold bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 rounded hover:bg-[#FFB800] hover:text-[#060B14] transition-colors">Mark Half Day</button>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-4 w-12"><input type="checkbox" className="w-4 h-4 accent-[#0066FF] bg-[#060B14] border-[#1A2A3A] rounded" /></th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Assigned Shift</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">In Punch</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Out Punch</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Auto Status</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Override Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {data.map((row) => (
                                <tr key={row.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="px-6 py-4"><input type="checkbox" className="w-4 h-4 accent-[#0066FF] bg-[#060B14] border-[#1A2A3A] rounded" /></td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white mb-0.5">{row.empName}</div>
                                        <div className="text-xs text-[#8899AA]">{row.empId}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        {row.shift}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative w-24">
                                            <input type="time" defaultValue={row.inPunch !== '--:--' ? row.inPunch : ''} className={`w-full bg-[#060B14] border ${row.inPunch === '--:--' ? 'border-[#FF4444]' : 'border-[#2A3A4A]'} text-white rounded px-2 py-1 outline-none text-sm font-mono`} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative w-24">
                                            <input type="time" defaultValue={row.outPunch !== '--:--' ? row.outPunch : ''} className={`w-full bg-[#060B14] border ${row.outPunch === '--:--' ? 'border-[#FF4444]' : 'border-[#2A3A4A]'} text-white rounded px-2 py-1 outline-none text-sm font-mono`} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase tracking-wider rounded ${row.status === 'Absent' ? 'text-[#FF4444]' :
                                                row.status === 'Late In' || row.status === 'Early Out' ? 'text-[#FFB800]' : 'text-[#8899AA]'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select className="bg-[#060B14] border border-[#0066FF] text-[#0066FF] font-bold text-xs rounded-lg px-2 py-1 outline-none max-w-[140px]">
                                            <option>No Override</option>
                                            <option>Present (Full Day)</option>
                                            <option>Present (Half Day)</option>
                                            <option>Absent</option>
                                            <option>Paid Leave</option>
                                        </select>
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
