"use client";

import React, { useState } from 'react';
import {
    Search, Filter, Download, Plus, Edit2, History
} from 'lucide-react';

export default function LeaveBalanceScreenHR() {
    const data = [
        { id: 'EMP042', name: 'Arjun Mehta', dept: 'Product', el: 14.5, sl: 8, cl: 5, total: 27.5 },
        { id: 'EMP124', name: 'Rohan Sharma', dept: 'Engineering', el: 6, sl: 12, cl: 2, total: 20 },
        { id: 'EMP089', name: 'Priya Nair', dept: 'HR', el: 22, sl: 4, cl: 7, total: 33 },
        { id: 'EMP201', name: 'David Chen', dept: 'Sales', el: 1.5, sl: 0, cl: 1, total: 2.5 },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Employee Leave Balances</h1>
                        <p className="text-sm text-[#8899AA]">View and manage available leave balances across the organization.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2 text-[#00E5A0]" /> Export Data
                        </button>
                        <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                            <Plus size={16} className="mr-2" /> Bulk Adjust
                        </button>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="relative w-80">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search by name or employee ID..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none w-48">
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>Product</option>
                                <option>Sales</option>
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
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Employee Details</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center border-l border-[#1A2A3A]">EL <span className="text-[10px] font-normal block lowercase text-[#556677]">Earned</span></th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center border-l border-[#1A2A3A]">SL <span className="text-[10px] font-normal block lowercase text-[#556677]">Sick</span></th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center border-l border-[#1A2A3A]">CL <span className="text-[10px] font-normal block lowercase text-[#556677]">Casual</span></th>
                                <th className="px-6 py-4 font-bold text-xs text-[#00E5A0] uppercase tracking-wider text-center border-l border-[#1A2A3A] bg-[#00E5A0]/5">Total Available</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-right border-l border-[#1A2A3A]">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {data.map((row) => (
                                <tr key={row.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white mb-0.5">{row.name}</div>
                                        <div className="text-xs text-[#8899AA]">{row.id} • {row.dept}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center border-l border-[#1A2A3A]/50">
                                        <div className="font-bold text-[#0066FF] font-mono text-base">{row.el}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center border-l border-[#1A2A3A]/50">
                                        <div className="font-bold text-white font-mono text-base">{row.sl}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center border-l border-[#1A2A3A]/50">
                                        <div className={`font-bold font-mono text-base ${row.cl <= 1 ? 'text-[#FF4444]' : 'text-white'}`}>{row.cl}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center border-l border-[#1A2A3A]/50 bg-[#00E5A0]/5">
                                        <div className="font-black text-[#00E5A0] font-mono text-lg">{row.total}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right border-l border-[#1A2A3A]/50">
                                        <div className="flex justify-end space-x-2">
                                            <button className="p-2 bg-[#060B14] border border-[#1A2A3A] rounded hover:border-[#2A3A4A] text-[#8899AA] hover:text-white transition-colors" title="Adjust Balance">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-2 bg-[#060B14] border border-[#1A2A3A] rounded hover:border-[#2A3A4A] text-[#8899AA] hover:text-[#0066FF] transition-colors" title="History">
                                                <History size={16} />
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
