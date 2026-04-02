"use client";

import React, { useState } from 'react';
import {
    Plus, Edit2, Trash2, Settings, List, FileType, Check
} from 'lucide-react';

export default function LeaveTypeConfiguration() {
    const leaveTypes = [
        { id: 'EL', name: 'Privilege / Earned Leave', code: 'EL', days: 15, paid: true, gender: 'All', active: true },
        { id: 'SL', name: 'Sick Leave', code: 'SL', days: 12, paid: true, gender: 'All', active: true },
        { id: 'CL', name: 'Casual Leave', code: 'CL', days: 7, paid: true, gender: 'All', active: true },
        { id: 'ML', name: 'Maternity Leave', code: 'ML', days: 180, paid: true, gender: 'Female', active: true },
        { id: 'PL', name: 'Paternity Leave', code: 'PL', days: 5, paid: true, gender: 'Male', active: true },
        { id: 'LWP', name: 'Leave Without Pay', code: 'LWP', days: 0, paid: false, gender: 'All', active: true },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Leave Types</h1>
                        <p className="text-sm text-[#8899AA]">Manage different categories of leaves available to employees in your organization.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Plus size={16} className="mr-2" /> Add Leave Type
                    </button>
                </div>

                {/* Data Table */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center">
                        <List size={16} className="text-[#8899AA] mr-2" />
                        <span className="text-sm font-bold text-[#8899AA] uppercase tracking-wider">Configured Leave Types ({leaveTypes.length})</span>
                    </div>
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Leave Info</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Code</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center">Yearly Quota</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Paid Status</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Applicable For</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {leaveTypes.map((leave) => (
                                <tr key={leave.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white text-base">{leave.name}</div>
                                        {leave.active && <div className="text-[10px] text-[#00E5A0] mt-1 flex items-center"><Check size={10} className="mr-1" /> Active</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-bold font-mono bg-[#1A2A3A] text-white rounded border border-[#2A3A4A]">{leave.code}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {leave.days > 0 ? (
                                            <span className="text-lg font-black text-white">{leave.days} <span className="text-xs text-[#8899AA] font-bold">days</span></span>
                                        ) : (
                                            <span className="text-lg font-black text-[#556677] capitalize">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {leave.paid ? (
                                            <span className="px-2 py-0.5 text-xs font-black uppercase bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20 rounded">Paid</span>
                                        ) : (
                                            <span className="px-2 py-0.5 text-xs font-black uppercase bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/20 rounded">Unpaid</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-semibold ${leave.gender === 'All' ? 'text-slate-300' : 'text-[#0066FF]'}`}>
                                            {leave.gender}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button className="p-2 bg-[#060B14] border border-[#1A2A3A] rounded hover:border-[#2A3A4A] text-[#8899AA] hover:text-white transition-colors" title="Settings">
                                                <Settings size={16} />
                                            </button>
                                            <button className="p-2 bg-[#060B14] border border-[#1A2A3A] rounded hover:border-[#2A3A4A] text-[#8899AA] hover:text-white transition-colors" title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-2 bg-[#060B14] border border-[#1A2A3A] rounded hover:border-[#FF4444]/50 hover:bg-[#FF4444]/10 text-[#8899AA] hover:text-[#FF4444] transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
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
