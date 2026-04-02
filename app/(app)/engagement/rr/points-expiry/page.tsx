"use client";
import React, { useState } from 'react';
import {
    Hourglass, AlertTriangle, ArrowRight, Settings, Banknote, UserX, Download, RefreshCw
} from 'lucide-react';

const EXPIRING_POINTS = [
    { id: 1, name: "Jessica Kim", dept: "Engineering", points: 15000, expiryDate: "Nov 30, 2023", daysLeft: 35 },
    { id: 2, name: "David Rodriguez", dept: "Sales", points: 8500, expiryDate: "Dec 15, 2023", daysLeft: 50 },
    { id: 3, name: "Maria Garcia", dept: "Design", points: 4200, expiryDate: "Oct 31, 2023", daysLeft: 5 },
];

export default function PointsExpiryScreen() {
    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Hourglass size={32} className="text-[#FF4444]" /> Expiry Management
                    </h1>
                    <p className="text-[#8899AA]">Monitor point balances nearing expiration and manage retrieval rules.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Settings size={18} /> Expiry Rules
                    </button>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertTriangle size={64} className="text-[#FF4444]" />
                    </div>
                    <p className="text-[#8899AA] text-sm font-bold uppercase tracking-wider mb-2">Expiring (Next 30 Days)</p>
                    <h2 className="text-4xl font-black text-white">45,200</h2>
                    <p className="text-[#8899AA] text-sm mt-1">Across 124 employees</p>
                </div>
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Banknote size={64} className="text-[#00E5A0]" />
                    </div>
                    <p className="text-[#8899AA] text-sm font-bold uppercase tracking-wider mb-2">Company Liability</p>
                    <h2 className="text-4xl font-black text-[#00E5A0]">$4,520 USD</h2>
                    <p className="text-[#8899AA] text-sm mt-1">Total value of expiring points</p>
                </div>
                <div className="bg-[#1A2A3A] border border-[#FF4444]/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(255,68,68,0.1)] flex flex-col justify-center">
                    <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-[#FF4444]" /> Immediate Action Recommended
                    </h3>
                    <p className="text-sm text-[#8899AA] mb-4">You have 12 employees whose points expire in less than 7 days.</p>
                    <button className="w-full py-2 bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/20 font-bold rounded-xl hover:bg-[#FF4444] hover:text-white transition-colors text-sm">
                        Send Final Reminder
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content: Table */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                            <h2 className="text-lg font-bold text-white">At-Risk Balances</h2>
                            <button className="text-[#8899AA] hover:text-white transition-colors">
                                <Download size={18} />
                            </button>
                        </div>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0D1826] border-b border-[#1A2A3A]">
                                    <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Employee</th>
                                    <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Expiring Points</th>
                                    <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Expiry Date</th>
                                    <th className="p-4 w-12 text-center text-[#8899AA]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {EXPIRING_POINTS.map(row => (
                                    <tr key={row.id} className="hover:bg-[#152336] transition-colors group">
                                        <td className="p-4">
                                            <p className="font-bold text-white text-sm">{row.name}</p>
                                            <p className="text-xs text-[#8899AA]">{row.dept}</p>
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className="font-mono font-bold text-[#FFB020]">{row.points.toLocaleString()}</span>
                                        </td>
                                        <td className="p-4 text-sm">
                                            <p className="text-[#CCDDEE]">{row.expiryDate}</p>
                                            <p className={`text-xs font-bold ${row.daysLeft <= 7 ? 'text-[#FF4444]' : 'text-[#8899AA]'}`}>
                                                {row.daysLeft} days left
                                            </p>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button className="text-[#33E6FF] hover:text-[#29b8cc] text-xs font-bold transition-colors">
                                                Extend
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar stats */}
                <div className="col-span-1 space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                            <Settings size={18} className="text-[#8899AA]" /> Policy Summary
                        </h3>

                        <div className="space-y-4">
                            <div className="p-3 rounded-lg bg-[#152336] border border-[#2A3A4A]">
                                <p className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Standard Expiry</p>
                                <p className="text-sm text-white font-bold">12 Months</p>
                                <p className="text-xs text-[#445566] mt-1">Points expire 12 months after they are earned.</p>
                            </div>

                            <div className="p-3 rounded-lg bg-[#152336] border border-[#2A3A4A]">
                                <p className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Termination Rule</p>
                                <p className="text-sm text-[#FF4444] font-bold">Immediate</p>
                                <p className="text-xs text-[#445566] mt-1">Unredeemed points are forfeited upon employee termination.</p>
                            </div>

                            <div className="p-3 rounded-lg bg-[#152336] border border-[#2A3A4A]">
                                <p className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Warning Emails</p>
                                <div className="flex gap-2 mt-1">
                                    <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-xs text-[#8899AA] font-bold border border-[#2A3A4A]">30 Days</span>
                                    <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-xs text-[#8899AA] font-bold border border-[#2A3A4A]">7 Days</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="bg-[#152336] p-4 rounded-2xl flex items-center gap-4 border border-[#2A3A4A]">
                        <div className="w-10 h-10 bg-[#FFB020]/10 rounded-xl flex items-center justify-center text-[#FFB020]">
                            <RefreshCw size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">Re-sync Ledgers</h4>
                            <p className="text-[#8899AA] text-xs">Last updated 2 hours ago</p>
                        </div>
                        <button className="ml-auto p-2 bg-[#1A2A3A] rounded-lg text-white hover:bg-[#2A3A4A] transition-colors">
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
