"use client";

import React, { useState } from 'react';
import {
    Users, Calendar, Save, List, Check
} from 'lucide-react';

export default function LeaveAllocationScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Bulk Leave Allocation</h1>
                        <p className="text-sm text-[#8899AA]">Allocate or reset leave quotas for multiple employees simultaneously.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Save size={16} className="mr-2" /> Commit Allocations
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-6">
                    {/* Setup Panel */}
                    <div className="col-span-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg h-max space-y-6">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Target Group</label>
                            <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg p-2.5 outline-none focus:border-[#0066FF] font-bold">
                                <option>New Joiners (Nov)</option>
                                <option>Engineering Dept</option>
                                <option>All Active Employees</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Leave Type</label>
                            <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg p-2.5 outline-none focus:border-[#0066FF] font-bold">
                                <option>Privilege Leave (EL)</option>
                                <option>Casual Leave (CL)</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Action Default</label>
                            <div className="bg-[#060B14] border border-[#1A2A3A] p-1 rounded-lg flex text-center text-xs font-bold">
                                <button className="flex-1 py-1.5 bg-[#1A2A3A] text-white rounded">Prorate</button>
                                <button className="flex-1 py-1.5 text-[#556677] hover:text-white transition-colors">Full Quota</button>
                            </div>
                        </div>
                    </div>

                    {/* Data Grid */}
                    <div className="col-span-3 bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between text-sm">
                            <div className="flex items-center text-white font-bold">
                                <List size={16} className="text-[#8899AA] mr-2" /> 5 Employees Selected
                            </div>
                        </div>

                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider w-10">
                                        <input type="checkbox" defaultChecked className="accent-[#0066FF]" />
                                    </th>
                                    <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Employee</th>
                                    <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider w-32">DOJ</th>
                                    <th className="px-6 py-4 font-bold text-[#0066FF] uppercase tracking-wider w-40 text-center">New Credit (EL)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { id: 'E101', name: 'Kabir Das', doj: '01 Nov 2024', base: 1.25 },
                                    { id: 'E103', name: 'Neha Sharma', doj: '15 Nov 2024', base: 0.5 },
                                    { id: 'E104', name: 'John Doe', doj: '15 Nov 2024', base: 0.5 },
                                ].map((row, i) => (
                                    <tr key={i} className="bg-[#060B14] hover:bg-[#1A2A3A]/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <input type="checkbox" defaultChecked className="accent-[#0066FF]" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white text-base">{row.name}</div>
                                            <div className="text-xs text-[#8899AA]">{row.id}</div>
                                        </td>
                                        <td className="px-6 py-4 text-[#8899AA] font-mono text-xs">
                                            {row.doj}
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                step="0.5"
                                                defaultValue={row.base}
                                                className="w-full bg-[#0D1928] border border-[#2A3A4A] text-center text-[#00E5A0] font-black rounded p-2 outline-none focus:border-[#00E5A0]"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
