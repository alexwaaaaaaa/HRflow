"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard, ChevronRight, FileSpreadsheet, Eye, Download, Filter
} from "lucide-react";

export default function MISReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Executive MIS</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <LayoutDashboard className="w-8 h-8 text-indigo-400" />
                        Management Information System
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Curated operational and strategic reports for board and management reviews.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* MIS Report Card Template */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 group hover:border-[#2A3A4A] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center mb-4">
                            <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Monthly HR Ops Dashboard</h3>
                        <p className="text-sm text-[#8899AA] mb-6 line-clamp-2">Consolidated view of attrition, hiring velocity, and HR issues mapped month-on-month.</p>

                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2 bg-indigo-500 text-white text-xs font-semibold rounded transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:bg-indigo-600 flex justify-center items-center gap-2">
                                <Download className="w-4 h-4" /> Export XLSX
                            </button>
                            <button className="px-4 py-2 bg-[#1A2A3A] text-white hover:bg-[#2A3A4A] text-xs font-semibold rounded transition-colors border border-[#2A3A4A]">
                                <Eye className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 group hover:border-[#2A3A4A] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center mb-4">
                            <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Cost vs Budget Variance</h3>
                        <p className="text-sm text-[#8899AA] mb-6 line-clamp-2">Detailed P&L impact analysis comparing actual manpower cost to AOP.</p>

                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2 bg-emerald-500 text-[#0B1221] text-xs font-semibold rounded transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-600 flex justify-center items-center gap-2">
                                <Download className="w-4 h-4" /> Export XLSX
                            </button>
                            <button className="px-4 py-2 bg-[#1A2A3A] text-white hover:bg-[#2A3A4A] text-xs font-semibold rounded transition-colors border border-[#2A3A4A]">
                                <Eye className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 group hover:border-[#2A3A4A] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-amber-500/20 text-amber-500 rounded-lg flex items-center justify-center mb-4">
                            <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Pulse & Engagement Index</h3>
                        <p className="text-sm text-[#8899AA] mb-6 line-clamp-2">eNPS scores, survey completions, and risk of flight across org levels.</p>

                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2 bg-amber-500 text-[#0B1221] text-xs font-semibold rounded transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:bg-amber-600 flex justify-center items-center gap-2">
                                <Download className="w-4 h-4" /> Export XLSX
                            </button>
                            <button className="px-4 py-2 bg-[#1A2A3A] text-white hover:bg-[#2A3A4A] text-xs font-semibold rounded transition-colors border border-[#2A3A4A]">
                                <Eye className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 group hover:border-[#2A3A4A] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-pink-500/20 text-pink-400 rounded-lg flex items-center justify-center mb-4">
                            <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Diversity & Inclusion Board</h3>
                        <p className="text-sm text-[#8899AA] mb-6 line-clamp-2">Executive summary of gender, age, and regional diversity metrics for ESG compliance.</p>

                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2 bg-pink-500 text-white text-xs font-semibold rounded transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:bg-pink-600 flex justify-center items-center gap-2">
                                <Download className="w-4 h-4" /> Export XLSX
                            </button>
                            <button className="px-4 py-2 bg-[#1A2A3A] text-white hover:bg-[#2A3A4A] text-xs font-semibold rounded transition-colors border border-[#2A3A4A]">
                                <Eye className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
