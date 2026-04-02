"use client";

import React, { useState } from 'react';
import {
    AlertTriangle, Search, Filter, Play, RefreshCw, XCircle, CheckCircle2
} from 'lucide-react';

export default function AnomalyAlerts() {
    const alerts = [
        { id: '1', empName: 'Rohan Sharma', empId: 'EMP124', date: '05 Nov 2024', type: 'Early Out', severity: 'High', issue: 'Out Punch 4 hours early without applied half-day.', status: 'Unresolved' },
        { id: '2', empName: 'Aditi Jain', empId: 'EMP044', date: '04 Nov 2024', type: 'Geofence Breach', severity: 'Critical', issue: 'Punch In registered 4.2kms away from Home Office.', status: 'Unresolved' },
        { id: '3', empName: 'Manoj Kumar', empId: 'EMP189', date: '02 Nov 2024', type: '14+ Hours Push', severity: 'Medium', issue: 'Logged 15.5 hrs straight. Overtime flag generated.', status: 'Resolved' },
        { id: '4', empName: 'Priya Desai', empId: 'EMP082', date: '01 Nov 2024', type: 'Proxy Suspicion', severity: 'Critical', issue: 'Two different MAC addresses mapped to consecutive punches.', status: 'Under Investigation' },
    ]

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Attendance Anomalies & Alerts</h1>
                        <p className="text-sm text-[#8899AA]">AI-flagged suspicious patterns, missing punches, and policy violations.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Play size={16} className="mr-2" fill="white" /> Run Rules Engine
                    </button>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-[#8899AA]">Total Unresolved Flags</h3>
                            <AlertTriangle size={18} className="text-[#FFB800]" />
                        </div>
                        <div className="text-3xl font-black text-[#FFB800]">34 <span className="text-sm font-normal text-[#556677]">alerts</span></div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-[#8899AA]">Critical Severity</h3>
                            <ShieldWarningIcon size={18} className="text-[#FF4444]" />
                        </div>
                        <div className="text-3xl font-black text-[#FF4444]">8 <span className="text-sm font-normal text-[#556677]">requires HR</span></div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-[#8899AA]">Auto-resolved</h3>
                            <RefreshCw size={18} className="text-[#00E5A0]" />
                        </div>
                        <div className="text-3xl font-black text-[#00E5A0]">112 <span className="text-sm font-normal text-[#556677]">via workflow</span></div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="relative w-72">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search anomalies..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none w-40">
                                <option>Severity: All</option>
                                <option>Critical</option>
                                <option>High</option>
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
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Alert Type</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Issue Description</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {alerts.map((row) => (
                                <tr key={row.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white mb-0.5">{row.empName}</div>
                                        <div className="text-xs text-[#8899AA]">{row.empId}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300 font-medium">
                                        {row.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white mb-1">{row.type}</div>
                                        <div className={`text-[10px] font-black uppercase tracking-wider inline-flex ${row.severity === 'Critical' ? 'text-[#FF4444]' :
                                                row.severity === 'High' ? 'text-[#FFB800]' : 'text-[#8899AA]'
                                            }`}>
                                            {row.severity}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs text-slate-300 whitespace-normal max-w-sm">
                                            {row.issue}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded border ${row.status === 'Resolved' ? 'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30' :
                                                row.status === 'Under Investigation' ? 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30' :
                                                    'bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/30'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {row.status === 'Unresolved' && (
                                            <div className="flex space-x-2 justify-end">
                                                <button className="text-[10px] font-bold bg-[#0066FF]/10 text-[#0066FF] hover:bg-[#0066FF] hover:text-white px-2 py-1 rounded border border-[#0066FF]/20 transition-colors">Investigate</button>
                                                <button className="text-[10px] font-bold bg-[#1A2A3A] text-[#8899AA] hover:text-white px-2 py-1 rounded border border-[#2A3A4A] transition-colors">Dismiss</button>
                                            </div>
                                        )}
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

function ShieldWarningIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
        </svg>
    )
}
