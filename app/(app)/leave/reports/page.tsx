"use client";

import React, { useState } from 'react';
import {
    Download, Filter, Search, Calendar, FileText, PieChart
} from 'lucide-react';

export default function LeaveReportsScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Leave Reports & Analytics</h1>
                        <p className="text-sm text-[#8899AA]">Generate and export detailed data on leave consumption, trends, and balances.</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                    {/* Report Types List */}
                    <div className="col-span-1 space-y-2">
                        <button className="w-full text-left px-4 py-3 bg-[#060B14] border-l-2 border-[#0066FF] text-white font-bold rounded-r flex items-center shadow-[inset_0_0_10px_rgba(0,102,255,0.1)] hover:bg-[#1A2A3A]">
                            <PieChart size={16} className="mr-3 text-[#0066FF]" /> Consumption Summary
                        </button>
                        <button className="w-full text-left px-4 py-3 text-[#8899AA] hover:bg-[#1A2A3A] font-bold rounded flex items-center transition-colors">
                            <FileText size={16} className="mr-3" /> Detailed Ledgers
                        </button>
                        <button className="w-full text-left px-4 py-3 text-[#8899AA] hover:bg-[#1A2A3A] font-bold rounded flex items-center transition-colors">
                            <Filter size={16} className="mr-3" /> LWP & Deductions
                        </button>
                        <button className="w-full text-left px-4 py-3 text-[#8899AA] hover:bg-[#1A2A3A] font-bold rounded flex items-center transition-colors">
                            <Calendar size={16} className="mr-3" /> Encashment History
                        </button>
                    </div>

                    {/* Report Configuration & Preview */}
                    <div className="col-span-3 space-y-6">

                        {/* Config Panel */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-xl shadow-lg flex flex-wrap gap-4 items-end">
                            <div className="flex-1 min-w-[200px]">
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block mb-2">Date Range</label>
                                <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg p-2.5 outline-none focus:border-[#0066FF]">
                                    <option>This Quarter (Oct - Dec 2024)</option>
                                    <option>Last Quarter</option>
                                    <option>Year to Date (YTD)</option>
                                    <option>Custom Range...</option>
                                </select>
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block mb-2">Department</label>
                                <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg p-2.5 outline-none focus:border-[#0066FF]">
                                    <option>All Departments</option>
                                    <option>Engineering</option>
                                    <option>Sales</option>
                                </select>
                            </div>
                            <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                                <Download size={16} className="mr-2" /> Export CSV
                            </button>
                        </div>

                        {/* Chart/Table Preview Area */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg min-h-[400px]">
                            <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                                <h3 className="font-bold text-white text-lg">Leave Consumption Summary</h3>
                                <div className="text-xs text-[#8899AA]">Showing data for Q4 2024</div>
                            </div>
                            <div className="p-6">
                                {/* Dummy Chart Area */}
                                <div className="h-64 border-2 border-dashed border-[#1A2A3A] rounded flex flex-col items-center justify-center text-[#556677]">
                                    <PieChart size={48} className="mb-4 opacity-50" />
                                    <p className="font-bold">Chart visualization renders here</p>
                                    <p className="text-xs mt-2 w-1/2 text-center text-[#8899AA]">Includes breakdowns of SL, CL, and EL usage across selected departments vs total quotas.</p>
                                </div>

                                {/* Mini Table Prev */}
                                <table className="w-full text-left text-xs mt-6">
                                    <thead className="text-[#8899AA] border-b border-[#1A2A3A]">
                                        <tr>
                                            <th className="pb-2 font-bold uppercase tracking-wider">Leave Type</th>
                                            <th className="pb-2 font-bold uppercase tracking-wider text-right">Total Allocated</th>
                                            <th className="pb-2 font-bold uppercase tracking-wider text-right">Consumed (Q4)</th>
                                            <th className="pb-2 font-bold uppercase tracking-wider text-right">Utilization %</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-white divide-y divide-[#1A2A3A]">
                                        <tr>
                                            <td className="py-3 font-bold">Privilege Leave (EL)</td>
                                            <td className="py-3 text-right">1200 Days</td>
                                            <td className="py-3 text-right font-black text-[#FFB800]">340 Days</td>
                                            <td className="py-3 text-right text-[#8899AA]">28%</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-bold">Sick Leave (SL)</td>
                                            <td className="py-3 text-right">600 Days</td>
                                            <td className="py-3 text-right font-black text-[#00E5A0]">415 Days</td>
                                            <td className="py-3 text-right text-[#8899AA]">69%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
