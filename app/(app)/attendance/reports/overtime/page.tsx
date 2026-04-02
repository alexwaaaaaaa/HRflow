"use client";

import React, { useState } from 'react';
import {
    Clock, Search, Calendar, Download, Filter, TrendingUp, AlertCircle
} from 'lucide-react';

export default function OvertimeReport() {
    const records = [
        { id: '1', empName: 'Vikas Kumar', empId: 'EMP442', dept: 'Engineering', date: '04 Nov 2024', shiftEnd: '18:00', actOut: '21:30', otHours: '3h 30m', config: '1.5x Hourly', amount: '₹1,575', status: 'Approved' },
        { id: '2', empName: 'Sara Khan', empId: 'EMP112', dept: 'Support', date: '04 Nov 2024', shiftEnd: '18:00', actOut: '19:45', otHours: '1h 45m', config: '1.0x Hourly', amount: '₹525', status: 'Pending Review' },
        { id: '3', empName: 'Rohan Shah', empId: 'EMP084', dept: 'Sales', date: '02 Nov 2024', shiftEnd: '18:00', actOut: '18:45', otHours: '45m', config: '1.0x Hourly', amount: '--', status: 'Rejected (< 1hr)' },
        { id: '4', empName: 'Dev Patel', empId: 'EMP259', dept: 'Warehouse', date: '01 Nov 2024', shiftEnd: '15:00', actOut: '19:00', otHours: '4h 00m', config: '2.0x Weekend', amount: '₹2,400', status: 'Processed' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Overtime & Extra Hours Report</h1>
                        <p className="text-sm text-[#8899AA]">Track, validate, and compute overtime hours logged outside shift timings.</p>
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
                            <Clock size={18} className="mr-2" />
                            <h3 className="text-sm font-medium">Total OT Logged</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-black text-white">284<span className="text-xl text-[#556677] ml-1">hrs</span></div>
                            <div className="text-xs font-bold text-[#FF4444] bg-[#FF4444]/10 px-2 py-1 rounded inline-flex items-center">
                                +12% v/s last week
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center text-[#8899AA] mb-4">
                            <TrendingUp size={18} className="mr-2" />
                            <h3 className="text-sm font-medium">Approved OT Cost</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-black text-[#00E5A0]">₹84.5K</div>
                            <div className="text-xs text-[#556677] font-bold">Proj: ₹350K/mo</div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center text-[#8899AA] mb-4">
                            <AlertCircle size={18} className="mr-2" />
                            <h3 className="text-sm font-medium">Pending Approvals</h3>
                        </div>
                        <div className="text-3xl font-black text-[#FFB800]">42 <span className="text-sm font-bold text-[#8899AA] font-normal tracking-wide">requests</span></div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm flex flex-col justify-center">
                        <div className="text-sm font-bold text-[#8899AA] mb-3">Highest OT Dept</div>
                        <div className="flex items-center space-x-3">
                            <div className="w-1.5 h-10 bg-[#0066FF] rounded-full"></div>
                            <div>
                                <div className="text-lg font-bold text-white">Engineering</div>
                                <div className="text-sm text-[#0066FF] font-bold">115 hrs (40%)</div>
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
                                <option>Status: All</option>
                                <option>Pending</option>
                                <option>Approved</option>
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
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Shift Ext.</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">OT Logged</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Payout Est.</th>
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
                                            <span>{rec.shiftEnd}</span>
                                            <span className="text-white">→</span>
                                            <span className="text-[#FFB800] font-bold bg-[#FFB800]/10 px-1.5 py-0.5 rounded border border-[#FFB800]/20">{rec.actOut}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-black text-white">{rec.otHours}</div>
                                        <div className="text-[10px] text-[#556677]">{rec.config}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-[#00E5A0]">{rec.amount}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded border ${rec.status === 'Approved' ? 'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30' :
                                                rec.status === 'Pending Review' ? 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30' :
                                                    rec.status === 'Processed' ? 'bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/30' :
                                                        'bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/30'
                                            }`}>
                                            {rec.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {rec.status === 'Pending Review' && (
                                            <div className="flex space-x-2 justify-end">
                                                <button className="text-[10px] font-bold bg-[#00E5A0]/10 text-[#00E5A0] hover:bg-[#00E5A0] hover:text-white px-2 py-1 rounded border border-[#00E5A0]/20 transition-colors">Approve</button>
                                                <button className="text-[10px] font-bold bg-[#FF4444]/10 text-[#FF4444] hover:bg-[#FF4444] hover:text-white px-2 py-1 rounded border border-[#FF4444]/20 transition-colors">Reject</button>
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
