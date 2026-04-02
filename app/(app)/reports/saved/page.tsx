"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Star, ChevronRight, Search, FileSpreadsheet, Clock, MoreVertical, Play, Trash2, Copy, Filter
} from "lucide-react";

const SAVED_REPORTS = [
    { id: "SR-01", name: "Monthly Payroll Cost Center Breakup", desc: "Detailed breakdown of payroll components cross-tabulated by department and location.", category: "Payroll", lastRun: "10 Oct 2025", author: "Sneha Rao" },
    { id: "SR-02", name: "Q3 Attrition Predictor Data", desc: "List of employees identified as high-flight risk based on performance and tenure.", category: "Analytics", lastRun: "05 Oct 2025", author: "Rajiv M" },
    { id: "SR-03", name: "Diversity & Inclusion (D&I) Tracker", desc: "Gender and regional diversity metrics across senior leadership roles.", category: "HR Core", lastRun: "01 Oct 2025", author: "Sneha Rao" },
    { id: "SR-04", name: "Overtime Variance - Factory Staff", desc: "Comparing budgeted overtime vs actuals for Blue-collar staff in manufacturing unit.", category: "Time & Attendance", lastRun: "15 Sep 2025", author: "Amit S" },
];

export default function SavedReportsScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Saved Reports</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Star className="w-8 h-8 text-amber-500" />
                        Saved Reports
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Manage, run, and duplicate your favorite custom report configurations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <Filter className="w-4 h-4" /> Filter by Category
                    </button>
                    <Link href="/reports/builder" className="flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        Build New
                    </Link>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search saved reports by name or author..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium w-1/3">Report Name / Description</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Author</th>
                                <th className="p-4 font-medium">Last Run</th>
                                <th className="p-4 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {SAVED_REPORTS.map((report) => (
                                <tr key={report.id} className="hover:bg-[#1A2A3A]/30 transition-colors group">
                                    <td className="p-4">
                                        <div className="text-white font-bold text-base flex items-center gap-2">
                                            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                                            {report.name}
                                        </div>
                                        <div className="text-xs text-[#8899AA] mt-1.5 leading-relaxed">{report.desc}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2.5 py-1 bg-[#1A2A3A] text-[#8899AA] rounded-md text-xs">{report.category}</span>
                                    </td>
                                    <td className="p-4 text-white">
                                        {report.author}
                                        {report.author === 'Sneha Rao' && <span className="text-[10px] ml-2 bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded">You</span>}
                                    </td>
                                    <td className="p-4 text-white flex items-center gap-2 mt-2">
                                        <Clock className="w-3 h-3 text-[#8899AA]" /> {report.lastRun}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-medium rounded-md transition-colors flex items-center gap-1 border border-amber-500/20" title="Run Now">
                                                <Play className="w-3 h-3 fill-current" /> Run
                                            </button>

                                            <div className="relative opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-[#8899AA] hover:text-white rounded hover:bg-[#1A2A3A] transition-colors">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                                {/* Hidden Dropdown - for UI completeness concept */}
                                            </div>
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
