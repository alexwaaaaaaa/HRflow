"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    BookCheck, ChevronRight, FileText, Download, Calendar
} from "lucide-react";

export default function StatutoryReportsScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Statutory Registers</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <BookCheck className="w-8 h-8 text-emerald-400" />
                        Statutory Registers & Reports
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Generate state-specific labour law registers in prescribed formats.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">

                {/* Side Navigation for Acts */}
                <div className="lg:col-span-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-200px)]">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#1A2A3A]/20">
                        <h2 className="text-sm font-bold text-white">Acts & Categories</h2>
                    </div>
                    <div className="overflow-y-auto flex-1">
                        <button className="w-full text-left p-4 border-l-2 border-emerald-400 bg-[#1A2A3A]/30 text-emerald-400 font-medium text-sm">
                            Factories Act, 1948
                        </button>
                        <button className="w-full text-left p-4 border-l-2 border-transparent text-[#8899AA] hover:bg-[#1A2A3A]/20 hover:text-white transition-colors text-sm">
                            Shops & Establishments
                        </button>
                        <button className="w-full text-left p-4 border-l-2 border-transparent text-[#8899AA] hover:bg-[#1A2A3A]/20 hover:text-white transition-colors text-sm">
                            Payment of Wages Act
                        </button>
                        <button className="w-full text-left p-4 border-l-2 border-transparent text-[#8899AA] hover:bg-[#1A2A3A]/20 hover:text-white transition-colors text-sm">
                            Minimum Wages Act
                        </button>
                        <button className="w-full text-left p-4 border-l-2 border-transparent text-[#8899AA] hover:bg-[#1A2A3A]/20 hover:text-white transition-colors text-sm">
                            Contract Labour (R&A)
                        </button>
                        <button className="w-full text-left p-4 border-l-2 border-transparent text-[#8899AA] hover:bg-[#1A2A3A]/20 hover:text-white transition-colors text-sm">
                            Maternity Benefit Act
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 md:col-span-3 lg:col-span-4 flex flex-col gap-6">

                    {/* Filters Bar */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 flex gap-4 items-center">
                        <div className="flex-1">
                            <label className="block text-xs text-[#8899AA] mb-1">State / Region</label>
                            <select className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-2 w-full focus:outline-none focus:border-emerald-500">
                                <option>Karnataka</option>
                                <option>Maharashtra</option>
                                <option>Tamil Nadu</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-[#8899AA] mb-1">Period (Month/Year)</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8899AA]" />
                                <input type="month" className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-9 pr-3 py-2 w-full focus:outline-none focus:border-emerald-500" defaultValue="2026-03" />
                            </div>
                        </div>
                        <div className="flex-none pt-5">
                            <button className="px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                                Apply
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex-1">
                        <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                            <h2 className="text-sm font-bold text-white">Registers: Factories Act, 1948 (Karnataka)</h2>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {[
                                { name: "Form 12 - Register of Adult Workers", desc: "Rule 104 - Complete list of active workers" },
                                { name: "Form 14 - Register of Leave with Wages", desc: "Rule 110 - Annual leave tracking ledger" },
                                { name: "Form 15 - Leave Book", desc: "Employee-wise leave booklet format" },
                                { name: "Form 20 - Muster Roll", desc: "Rule 120 - Daily attendance records" },
                                { name: "Form 21 - Register of Overtime", desc: "Rule 121 - OT hours and payment details" },
                                { name: "Half Yearly Return (Form 22)", desc: "Rule 122 - Submissions concluding Jun 30" }
                            ].map((reg, idx) => (
                                <div key={idx} className="p-4 flex items-center justify-between hover:bg-[#1A2A3A]/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#1A2A3A] rounded-lg flex items-center justify-center border border-[#2A3A4A]">
                                            <FileText className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium text-sm">{reg.name}</h3>
                                            <p className="text-xs text-[#8899AA]">{reg.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-1.5 bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white text-xs font-semibold rounded border border-[#2A3A4A] transition-colors">
                                            Preview
                                        </button>
                                        <button className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-[#0B1221] text-xs font-semibold rounded shadow-[0_2px_10px_rgba(16,185,129,0.2)] flex items-center gap-1 transition-colors">
                                            <Download className="w-3 h-3" /> PDF
                                        </button>
                                        <button className="px-4 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20 rounded flex items-center gap-1 transition-colors">
                                            <Download className="w-3 h-3" /> Excel
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
