"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Wrench, ChevronRight, Layers, Filter, CheckSquare, Save, Play, Columns, LayoutGrid, Plus
} from "lucide-react";

export default function CustomReportBuilderScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-6 font-sans flex flex-col h-screen overflow-hidden">

            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div className="flex items-center gap-2 text-sm text-[#8899AA]">
                    <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white font-medium flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-indigo-400" />
                        Custom Builder
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white text-sm font-medium border border-[#2A3A4A] rounded-lg transition-colors flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Configuration
                    </button>
                    <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Play className="w-4 h-4" /> Run Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">

                {/* Left Panel: Datasets & Fields */}
                <div className="col-span-3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A]">
                        <h2 className="text-sm font-bold text-white mb-3">1. Select Dataset</h2>
                        <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none">
                            <option>Employee Master Data</option>
                            <option>Payroll Register (Monthly)</option>
                            <option>Time & Attendance Logs</option>
                            <option>Leave Transactions</option>
                        </select>
                    </div>

                    <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                        <h2 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                            2. Data Fields <span className="text-xs font-normal text-indigo-400 cursor-pointer">Select All</span>
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xs font-medium text-[#8899AA] uppercase tracking-wider mb-2">Personal Info</h3>
                                <div className="space-y-2">
                                    {['Employee ID', 'Full Name', 'Gender', 'Date of Birth'].map(field => (
                                        <label key={field} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" defaultChecked={field === 'Employee ID' || field === 'Full Name'} className="bg-[#1A2A3A] border-[#2A3A4A] rounded text-indigo-500 focus:ring-0 focus:ring-offset-0" />
                                            <span className="text-sm text-white group-hover:text-indigo-400 transition-colors">{field}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-medium text-[#8899AA] uppercase tracking-wider mb-2">Work Info</h3>
                                <div className="space-y-2">
                                    {['Department', 'Designation', 'Location', 'Reporting Manager', 'Date of Join'].map(field => (
                                        <label key={field} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" defaultChecked={field === 'Department' || field === 'Designation'} className="bg-[#1A2A3A] border-[#2A3A4A] rounded text-indigo-500 focus:ring-0 focus:ring-offset-0" />
                                            <span className="text-sm text-white group-hover:text-indigo-400 transition-colors">{field}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-medium text-[#8899AA] uppercase tracking-wider mb-2">Compensation</h3>
                                <div className="space-y-2">
                                    {['Annual CTC', 'Basic Salary', 'Gross Salary', 'Bank Account'].map(field => (
                                        <label key={field} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="bg-[#1A2A3A] border-[#2A3A4A] rounded text-indigo-500 focus:ring-0 focus:ring-offset-0" />
                                            <span className="text-sm text-[#8899AA] group-hover:text-indigo-400 transition-colors">{field}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Panel: Filters & Grouping */}
                <div className="col-span-3 flex flex-col gap-6 min-h-0">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 flex-1 flex flex-col">
                        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-emerald-400" /> Filters
                        </h2>

                        <div className="space-y-3 flex-1">
                            <div className="p-3 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-medium text-emerald-400">Status</span>
                                    <button className="text-[10px] text-[#8899AA] hover:text-white">Remove</button>
                                </div>
                                <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded text-xs px-2 py-1.5 focus:border-emerald-500 focus:outline-none">
                                    <option>Equals: Active</option>
                                    <option>Equals: Resigned</option>
                                    <option>In: Notice Period</option>
                                </select>
                            </div>

                            <div className="p-3 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-medium text-emerald-400">Department</span>
                                    <button className="text-[10px] text-[#8899AA] hover:text-white">Remove</button>
                                </div>
                                <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded text-xs px-2 py-1.5 focus:border-emerald-500 focus:outline-none">
                                    <option>Is Not: Contract Staff</option>
                                    <option>In: Engineering, Sales</option>
                                </select>
                            </div>

                            <button className="w-full py-2 border border-dashed border-[#2A3A4A] text-[#8899AA] text-xs font-medium rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center justify-center gap-2">
                                <Plus className="w-3 h-3" /> Add Filter Condition
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4">
                        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-amber-500" /> Grouping & Sorting
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1">Group By (Rows)</label>
                                <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded px-2 py-1.5 text-xs focus:border-amber-500 focus:outline-none">
                                    <option>Department</option>
                                    <option>Location</option>
                                    <option>None</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1">Sort By</label>
                                <div className="flex gap-2">
                                    <select className="flex-1 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded px-2 py-1.5 text-xs focus:border-amber-500 focus:outline-none">
                                        <option>Employee ID</option>
                                        <option>Date of Join</option>
                                        <option>Full Name</option>
                                    </select>
                                    <select className="w-20 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded px-2 py-1.5 text-xs focus:border-amber-500 focus:outline-none">
                                        <option>ASC</option>
                                        <option>DESC</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Preview */}
                <div className="col-span-6 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4 border-b border-[#1A2A3A] pb-4">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            <Columns className="w-4 h-4 text-pink-400" /> Live Data Preview
                        </h2>
                        <span className="text-xs font-mono text-[#8899AA] bg-[#1A2A3A] px-2 py-1 rounded">Showing top 5 rows</span>
                    </div>

                    <div className="flex-1 bg-[#0B1221] border border-[#1A2A3A] rounded-xl overflow-x-auto text-sm">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-[#1A2A3A] text-indigo-300 text-xs">
                                    <th className="p-3 font-medium border-b border-r border-[#2A3A4A]">Employee ID</th>
                                    <th className="p-3 font-medium border-b border-r border-[#2A3A4A]">Full Name</th>
                                    <th className="p-3 font-medium border-b border-r border-[#2A3A4A]">Department</th>
                                    <th className="p-3 font-medium border-b border-[#2A3A4A]">Designation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A] text-[#8899AA]">
                                <tr>
                                    <td className="p-3 border-r border-[#1A2A3A]">EMP-1001</td>
                                    <td className="p-3 border-r border-[#1A2A3A]">Amit Kumar</td>
                                    <td className="p-3 border-r border-[#1A2A3A]">Engineering</td>
                                    <td className="p-3">Frontend Developer</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-r border-[#1A2A3A]">EMP-1002</td>
                                    <td className="p-3 border-r border-[#1A2A3A]">Priya Singh</td>
                                    <td className="p-3 border-r border-[#1A2A3A]">Engineering</td>
                                    <td className="p-3">Backend Developer</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-r border-[#1A2A3A]">EMP-1003</td>
                                    <td className="p-3 border-r border-[#1A2A3A]">Neha Sharma</td>
                                    <td className="p-3 border-r border-[#1A2A3A]">Sales</td>
                                    <td className="p-3">Account Executive</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-r border-[#1A2A3A]">EMP-1004</td>
                                    <td className="p-3 border-r border-[#1A2A3A]">Rohan Gupta</td>
                                    <td className="p-3 border-r border-[#1A2A3A]">Engineering</td>
                                    <td className="p-3">DevOps Engineer</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-r border-[#1A2A3A]">EMP-1005</td>
                                    <td className="p-3 border-r border-[#1A2A3A]">Karan Patel</td>
                                    <td className="p-3 border-r border-[#1A2A3A]">Marketing</td>
                                    <td className="p-3">Growth Lead</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
