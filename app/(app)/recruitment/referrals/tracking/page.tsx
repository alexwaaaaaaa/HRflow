"use client";
import React, { useState } from "react";
import { Search, Download, Filter, Gift, CheckCircle2, Clock, XCircle, Settings } from "lucide-react";

export default function ReferralTrackingHR() {
    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Referral Management (HR)</h1>
                    <p className="text-sm text-[#8899AA]">Track company-wide referrals, manage bonuses, and configure incentives</p>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-white text-sm font-medium rounded-xl hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                        <Download size={14} /> Export Report
                    </button>
                    <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-white text-sm font-medium rounded-xl hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                        <Settings size={14} /> Program Rules
                    </button>
                </div>
            </div>

            {/* Program KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-[#8899AA] text-xs font-semibold uppercase mb-1">Total Referrals</p>
                    <p className="text-2xl font-bold text-white mb-2">342</p>
                    <p className="text-[10px] text-[#00E5A0]">+12% vs last quarter</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-[#8899AA] text-xs font-semibold uppercase mb-1">Hired from Referrals</p>
                    <p className="text-2xl font-bold text-white mb-2">45</p>
                    <p className="text-[10px] text-[#445566]">13.1% Conversion Rate</p>
                </div>
                <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/20 rounded-2xl p-5">
                    <p className="text-[#00E5A0] text-xs font-semibold uppercase mb-1 flex items-center gap-1"><Clock size={12} /> Pending Payouts</p>
                    <p className="text-2xl font-bold text-white mb-2">₹ 2,40,000</p>
                    <p className="text-[10px] text-[#00E5A0]/80">Awaiting 90-day retention mark</p>
                </div>
                <div className="bg-[#0066FF]/10 border border-[#0066FF]/20 rounded-2xl p-5">
                    <p className="text-[#0066FF] text-xs font-semibold uppercase mb-1">Paid Out (YTD)</p>
                    <p className="text-2xl font-bold text-white mb-2">₹ 14,50,000</p>
                    <p className="text-[10px] text-[#0066FF]/80">Across 22 employees</p>
                </div>
            </div>

            {/* List & Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input placeholder="Search referrer or candidate name..." className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                </div>
                <select className="h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none min-w-[150px]">
                    <option>Bonus: All</option><option>Bonus: Pending Action</option><option>Bonus: Paid</option>
                </select>
                <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-[#8899AA] text-sm rounded-xl hover:bg-[#1A2A3A] flex items-center gap-2 transition-colors ml-auto">
                    <Filter size={14} /> Filters
                </button>
            </div>

            {/* Employee Referral Details Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium">Candidate</th>
                            <th className="px-6 py-4 font-medium">Referred By</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium text-center">Stage</th>
                            <th className="px-6 py-4 font-medium text-center">Bonus Amount</th>
                            <th className="px-6 py-4 font-medium text-right">Bonus Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {/* Row 1 - Pending Payout */}
                        <tr className="hover:bg-[#1A2A3A]/30 transition-colors group">
                            <td className="px-6 py-4">
                                <p className="font-bold text-white">Ravi Kumar</p>
                                <p className="text-[10px] text-[#445566]">Applied: 10 Jan 2025</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium flex items-center gap-1.5"><Gift size={12} className="text-[#9B59B6]" /> Neha Gupta</span>
                                    <span className="text-[#8899AA] text-[10px]">HR Team</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-[#8899AA] text-xs">Fullstack Engineer</td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-[#00E5A0]/10 text-[#00E5A0] px-2 py-1 rounded text-[10px] font-bold uppercase">Hired</span>
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-white">₹ 50,000</td>
                            <td className="px-6 py-4 text-right">
                                <button className="h-8 px-3 bg-[#00E5A0] text-[#060B14] text-[11px] font-bold rounded-lg hover:bg-[#00c98d] transition-colors ml-auto flex items-center gap-1.5">
                                    Approve Payout
                                </button>
                                <p className="text-[9px] text-[#FFB800] mt-1">90 days completed today</p>
                            </td>
                        </tr>

                        {/* Row 2 - In progress */}
                        <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                            <td className="px-6 py-4">
                                <p className="font-bold text-white">Sana Khan</p>
                                <p className="text-[10px] text-[#445566]">Applied: 12 Mar 2025</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium flex items-center gap-1.5"><Gift size={12} className="text-[#9B59B6]" /> Rahul S.</span>
                                    <span className="text-[#8899AA] text-[10px]">Engineering</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-[#8899AA] text-xs">Product Manager</td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-[#0066FF]/10 text-[#0066FF] px-2 py-1 rounded text-[10px] font-bold uppercase">Interview</span>
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-white">₹ 75,000</td>
                            <td className="px-6 py-4 text-right">
                                <span className="text-xs text-[#8899AA] font-medium flex items-center justify-end gap-1"><Clock size={12} /> Pending Hire</span>
                            </td>
                        </tr>

                        {/* Row 3 - Paid */}
                        <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                            <td className="px-6 py-4">
                                <p className="font-bold text-white">Amit Singh</p>
                                <p className="text-[10px] text-[#445566]">Applied: 01 Nov 2024</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium flex items-center gap-1.5"><Gift size={12} className="text-[#9B59B6]" /> Priya N.</span>
                                    <span className="text-[#8899AA] text-[10px]">HR Team</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-[#8899AA] text-xs">DevOps Engineer</td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-[#00E5A0]/10 text-[#00E5A0] px-2 py-1 rounded text-[10px] font-bold uppercase">Hired</span>
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-white">₹ 60,000</td>
                            <td className="px-6 py-4 text-right">
                                <span className="text-xs text-[#00E5A0] font-bold flex items-center justify-end gap-1"><CheckCircle2 size={12} /> Paid (Feb)</span>
                            </td>
                        </tr>

                        {/* Row 4 - Rejected Candidate */}
                        <tr className="hover:bg-[#1A2A3A]/30 transition-colors">
                            <td className="px-6 py-4">
                                <p className="font-bold text-white">Kavita R.</p>
                                <p className="text-[10px] text-[#445566]">Applied: 10 Jan 2025</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium flex items-center gap-1.5"><Gift size={12} className="text-[#9B59B6]" /> Manoj K.</span>
                                    <span className="text-[#8899AA] text-[10px]">Sales</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-[#8899AA] text-xs">Account Exec</td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-[#FF4444]/10 text-[#FF4444] px-2 py-1 rounded text-[10px] font-bold uppercase">Rejected</span>
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-[#445566] line-through">₹ 40,000</td>
                            <td className="px-6 py-4 text-right">
                                <span className="text-xs text-[#FF4444] font-medium flex items-center justify-end gap-1"><XCircle size={12} /> Not Eligible</span>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    );
}
