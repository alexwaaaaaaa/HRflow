"use client";

import React, { useState } from 'react';
import {
    AlertTriangle, Download, Filter, Search, Calendar, CreditCard
} from 'lucide-react';

export default function LOPDetailScreen() {
    const lopData = [
        { id: 'EMP044', name: 'Aditi Jain', dept: 'Design', dates: '12 Nov - 14 Nov', days: 3, reason: 'Leave balance exhausted', amount: '₹4,500', status: 'Pending Deduction' },
        { id: 'EMP108', name: 'Suresh Kumar', dept: 'Engineering', dates: '24 Oct', days: 1, reason: 'Unapproved absence leading to LOP', amount: '₹1,500', status: 'Processed (Oct)' },
        { id: 'EMP212', name: 'Vikram Singh', dept: 'Sales', dates: '05 Nov - 08 Nov', days: 4, reason: 'Extended unapproved leave', amount: '₹6,000', status: 'Pending Deduction' }
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center">
                            Loss of Pay (LOP) Details
                        </h1>
                        <p className="text-sm text-[#8899AA]">Track and manage salary deductions due to unapproved absences or exhausted leave balances.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2 text-[#00E5A0]" /> Export Data
                        </button>
                        <button className="px-4 py-2 bg-[#0066FF] text-sm font-semibold text-white rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                            <CreditCard size={16} className="mr-2" /> Sync with Payroll
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-6 mb-6">
                    <div className="bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-xl p-5 shadow-[0_0_15px_rgba(255,68,68,0.05)]">
                        <div className="text-xs font-bold text-[#FF4444] mb-2 uppercase tracking-wider flex items-center">
                            <AlertTriangle size={14} className="mr-2" /> Total LOP Days (YTD)
                        </div>
                        <div className="text-3xl font-black text-white">42 <span className="text-sm font-bold text-[#8899AA] uppercase">Days</span></div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                        <div className="text-xs font-bold text-[#8899AA] mb-2 uppercase tracking-wider">Pending Deductions</div>
                        <div className="text-3xl font-black text-[#FFB800]">12 <span className="text-sm font-bold text-[#556677] uppercase">Cases</span></div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                        <div className="text-xs font-bold text-[#8899AA] mb-2 uppercase tracking-wider">Estimated Recovery</div>
                        <div className="text-3xl font-black text-white">₹1.2L</div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                        <div className="text-xs font-bold text-[#8899AA] mb-2 uppercase tracking-wider">Processed (Last Month)</div>
                        <div className="text-3xl font-black text-[#00E5A0]">₹85K</div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <div className="relative w-80">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search by name, ID, or reason..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-[#0066FF]">
                                <option>Status: All</option>
                                <option>Pending Deduction</option>
                                <option>Processed</option>
                            </select>
                            <button className="px-3 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors">
                                <Filter size={16} />
                            </button>
                        </div>
                    </div>

                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">LOP Dates</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center">Days</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Reason</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-right">Deduction Amount</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {lopData.map((row, i) => (
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
                                    <td className="px-6 py-4 text-right">
                                        <div className="font-black text-white">{row.amount}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.status.includes('Pending') ? (
                                            <span className="px-2 py-1 text-xs font-bold uppercase bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20 rounded tracking-wider">
                                                {row.status}
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-bold uppercase bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20 rounded tracking-wider">
                                                {row.status}
                                            </span>
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
