"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FileSpreadsheet, ChevronRight, Download, Eye, Calculator, TableProperties, AlertCircle
} from "lucide-react";

export default function PayrollMISScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Payroll MIS</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <TableProperties className="w-8 h-8 text-amber-500" />
                        Management Info System (MIS)
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Bank-format ready payroll register and comprehensive MIS summaries.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500">
                        <option>March 2026</option>
                        <option>February 2026</option>
                        <option>January 2026</option>
                    </select>
                    <button className="flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-[#0B1221] text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        <Download className="w-4 h-4" /> Download Full MIS
                    </button>
                </div>
            </div>

            {/* Quick Links / Deep Dives */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Link href="/reports/payroll-mis/deep-dive" className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 hover:border-amber-500/50 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 text-amber-500">
                        <Calculator className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">MIS Deep Dive</h3>
                    <p className="text-xs text-[#8899AA]">Component level variance analysis</p>
                </Link>
                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 hover:border-indigo-500/50 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 text-indigo-400">
                        <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Bank Upload Format</h3>
                    <p className="text-xs text-[#8899AA]">Generate HDFC/ICICI CSV format</p>
                </div>
                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 hover:border-emerald-500/50 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-400">
                        <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">JV Export</h3>
                    <p className="text-xs text-[#8899AA]">Journal Vouchers for Accounting</p>
                </div>
                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 hover:border-pink-500/50 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4 text-pink-400">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Exceptions Report</h3>
                    <p className="text-xs text-[#8899AA]">Negative salaries, hold payouts</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center">
                    <h2 className="text-sm font-bold text-white">Consolidated Salary Register (March 2026)</h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-[#1A2A3A] text-[#8899AA] hover:text-white rounded text-xs transition-colors border border-[#2A3A4A]">Columns</button>
                        <button className="px-3 py-1.5 bg-[#1A2A3A] text-[#8899AA] hover:text-white rounded text-xs transition-colors border border-[#2A3A4A]">Density</button>
                    </div>
                </div>

                {/* Scrollable massive table */}
                <div className="overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left whitespace-nowrap text-[13px] font-mono border-collapse">
                        <thead className="bg-[#1A2A3A]/80 text-[#8899AA] tracking-wider uppercase">
                            <tr>
                                {/* Sticky columns for ID/Name */}
                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] sticky left-0 bg-[#1A2A3A] z-20">Emp ID</th>
                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] sticky left-[85px] bg-[#1A2A3A] z-20">Name</th>
                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] sticky left-[200px] bg-[#1A2A3A] z-20">Bank A/c</th>

                                {/* Dynamic columns */}
                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right">Basic Pay</th>
                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right">HRA</th>
                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right">Special All.</th>
                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-emerald-400 bg-emerald-500/5">Gross Earnings</th>

                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-pink-400">EPF Ded.</th>
                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-pink-400">TDS Ded.</th>
                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-pink-400">PT Deduct</th>
                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-amber-500 bg-amber-500/5">Total Deduct</th>

                                <th className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-indigo-400 font-bold bg-indigo-500/10">Net Payable</th>

                                <th className="px-4 py-3 font-medium border-b border-[#2A3A4A] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { id: "EMP-001", name: "Amit Kumar", acc: "XXXX-1234", basic: "80,000", hra: "40,000", spl: "25,000", gross: "1,45,000", epf: "1,800", tds: "12,500", pt: "200", tot_ded: "14,500", net: "1,30,500" },
                                { id: "EMP-002", name: "Priya Singh", acc: "XXXX-8821", basic: "60,000", hra: "30,000", spl: "15,000", gross: "1,05,000", epf: "1,800", tds: "8,500", pt: "200", tot_ded: "10,500", net: "94,500" },
                                { id: "EMP-003", name: "Neha Sharma", acc: "XXXX-9912", basic: "50,000", hra: "25,000", spl: "10,000", gross: "85,000", epf: "1,800", tds: "5,500", pt: "200", tot_ded: "7,500", net: "77,500" },
                                { id: "EMP-004", name: "Rohan Gupta", acc: "XXXX-4432", basic: "45,000", hra: "22,500", spl: "8,000", gross: "75,500", epf: "1,800", tds: "3,500", pt: "200", tot_ded: "5,500", net: "70,000" },
                                { id: "EMP-005", name: "Rahul Verma", acc: "XXXX-1122", basic: "75,000", hra: "37,500", spl: "20,000", gross: "1,32,500", epf: "1,800", tds: "11,500", pt: "200", tot_ded: "13,500", net: "1,19,000" },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#1A2A3A]/30">
                                    <td className="px-4 py-3 border-r border-[#1A2A3A] sticky left-0 bg-[#0D1928] group-hover:bg-[#121E2F] z-10 text-[#8899AA]">{row.id}</td>
                                    <td className="px-4 py-3 border-r border-[#1A2A3A] sticky left-[85px] bg-[#0D1928] group-hover:bg-[#121E2F] z-10 font-sans font-medium text-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)]">{row.name}</td>
                                    <td className="px-4 py-3 border-r border-[#1A2A3A] sticky left-[200px] bg-[#0D1928] group-hover:bg-[#121E2F] z-10 text-[#8899AA]">{row.acc}</td>

                                    <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-gray-300">₹{row.basic}</td>
                                    <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-gray-300">₹{row.hra}</td>
                                    <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-gray-300">₹{row.spl}</td>
                                    <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-emerald-400 font-medium bg-emerald-500/5">₹{row.gross}</td>

                                    <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-pink-400">₹{row.epf}</td>
                                    <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-pink-400">₹{row.tds}</td>
                                    <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-pink-400">₹{row.pt}</td>
                                    <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-amber-500 font-medium bg-amber-500/5">₹{row.tot_ded}</td>

                                    <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-indigo-400 font-black bg-indigo-500/10 text-base">₹{row.net}</td>

                                    <td className="px-4 py-3 text-center">
                                        <button className="text-amber-500 hover:text-amber-400 transition-colors p-1" title="View Payslip">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-[#1A2A3A] font-bold text-white border-t-2 border-[#2A3A4A]">
                            <tr>
                                <td colSpan={3} className="px-4 py-4 text-right sticky left-0 z-10 bg-[#1A2A3A]">Grand Totals</td>
                                <td className="px-4 py-4 text-right">₹3,10,000</td>
                                <td className="px-4 py-4 text-right">₹1,55,000</td>
                                <td className="px-4 py-4 text-right">₹78,000</td>
                                <td className="px-4 py-4 text-right text-emerald-400 bg-emerald-500/5">₹5,43,000</td>
                                <td className="px-4 py-4 text-right text-pink-400">₹9,000</td>
                                <td className="px-4 py-4 text-right text-pink-400">₹41,500</td>
                                <td className="px-4 py-4 text-right text-pink-400">₹1,000</td>
                                <td className="px-4 py-4 text-right text-amber-500 bg-amber-500/5">₹51,500</td>
                                <td className="px-4 py-4 text-right text-indigo-400 text-lg bg-indigo-500/10">₹4,91,500</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

        </div>
    );
}
