"use client";

import React, { useState } from 'react';
import {
    Calendar, Users, AlertCircle, TrendingUp, CheckCircle,
    XCircle, Clock, Search, ChevronRight, FileText
} from 'lucide-react';

export default function LeaveDashboardHRView() {
    const metrics = [
        { title: "On Leave Today", value: "42", trend: "+12% vs avg", color: "text-[#00E5A0]", bg: "bg-[#0A1420]", icon: Users },
        { title: "Pending Approvals", value: "156", trend: "High Priority", color: "text-[#FFB800]", bg: "bg-[#FFB800]/10 border-[#FFB800]/20 border", icon: Clock },
        { title: "LWP Instances", value: "14", trend: "This Month", color: "text-[#FF4444]", bg: "bg-[#0A1420]", icon: AlertCircle },
        { title: "Avg. Leave Balance", value: "12.5", trend: "Days / Emp", color: "text-[#0066FF]", bg: "bg-[#0A1420]", icon: Calendar },
    ];

    const upcomingLeaves = [
        { id: 1, name: "Sneha Patel", avatar: "SP", dept: "Engineering", type: "Planned Leave", dates: "12 Nov - 15 Nov", status: "Approved" },
        { id: 2, name: "Arjun Mehta", avatar: "AM", dept: "Product", type: "Sick Leave", dates: "Today", status: "Pending Approval" },
        { id: 3, name: "David Chen", avatar: "DC", dept: "Sales", type: "Comp-off", dates: "14 Nov", status: "Pending Approval" },
        { id: 4, name: "Priya Nair", avatar: "PN", dept: "HR", type: "Planned Leave", dates: "20 Nov - 25 Nov", status: "Approved" },
    ];

    return (
        <main className="min-h-screen bg-[#060B14] px-6 py-6 font-sans text-slate-200">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <header className="flex justify-between items-center mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Leave Management</h1>
                        <p className="text-sm text-[#8899AA]">Monitor workforce availability, approve requests, and track balances.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white">
                            <FileText size={16} className="mr-2 text-[#00E5A0]" aria-hidden="true" /> Export Reports
                        </button>
                    </div>
                </header>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-6">
                    {metrics.map((metric, i) => (
                        <div key={i} className={`p-5 rounded-xl ${metric.bg} shadow-sm border ${metric.bg.includes('border') ? '' : 'border-[#1A2A3A]'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-sm font-medium text-[#8899AA] m-0">{metric.title}</h2>
                                <metric.icon size={18} className={metric.color} aria-hidden="true" />
                            </div>
                            <div className="flex items-end justify-between">
                                <span className={`text-3xl font-black ${metric.color === 'text-[#FFB800]' ? 'text-white' : 'text-white'}`}>{metric.value}</span>
                                <span className="text-xs font-bold text-[#8899AA]">{metric.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Active Requests */}
                    <div className="col-span-2 space-y-6 flex flex-col">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg flex-1 flex flex-col">
                            <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center">
                                <h2 className="text-lg font-bold text-white flex items-center m-0">
                                    <Clock size={18} className="mr-2 text-[#FFB800]" aria-hidden="true" /> Needs Attention (Pending)
                                </h2>
                                <button className="text-xs text-[#0066FF] hover:text-white font-bold transition-colors">View All &rsaquo;</button>
                            </div>
                            <div className="p-0 flex-1 overflow-auto">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                        <tr>
                                            <th scope="col" className="px-5 py-3 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Employee</th>
                                            <th scope="col" className="px-5 py-3 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Leave Type</th>
                                            <th scope="col" className="px-5 py-3 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Duration</th>
                                            <th scope="col" className="px-5 py-3 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A]">
                                        {[1, 2, 3, 4].map((item) => (
                                            <tr key={item} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white">E{item}</div>
                                                        <div>
                                                            <div className="font-bold text-white">Alex Morgan</div>
                                                            <div className="text-[10px] text-[#8899AA]">Engineering • L2 Manager</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="px-2 py-1 text-xs font-bold bg-[#1A2A3A] text-white rounded border border-[#2A3A4A]">Privilege Leave</span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="text-sm font-bold text-white">3 Days</div>
                                                    <div className="text-xs text-[#8899AA]">24 Nov - 26 Nov</div>
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <button className="w-8 h-8 rounded-lg bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 flex items-center justify-center hover:bg-[#00E5A0]/20 transition-colors" aria-label="Approve leave request">
                                                            <CheckCircle size={16} aria-hidden="true" />
                                                        </button>
                                                        <button className="w-8 h-8 rounded-lg bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30 flex items-center justify-center hover:bg-[#FF4444]/20 transition-colors" aria-label="Reject leave request">
                                                            <XCircle size={16} aria-hidden="true" />
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

                    {/* Quick Calendar & Upcoming */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                            <h2 className="text-sm font-bold text-white mb-4 flex items-center">
                                <Calendar size={16} className="mr-2 text-[#0066FF]" /> Upcoming Absences
                            </h2>
                            <div className="space-y-4">
                                {upcomingLeaves.map((leave) => (
                                    <div key={leave.id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white border border-[#2A3A4A]">
                                                {leave.avatar}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white">{leave.name}</div>
                                                <div className="text-xs text-[#8899AA]">{leave.type}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs font-bold text-white bg-[#1A2A3A] px-2 py-0.5 rounded">{leave.dates}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-5 py-2 border border-[#1A2A3A] bg-[#0A1420] text-xs font-bold text-white rounded-lg hover:bg-[#1A2A3A] transition-colors">
                                View Full Calendar
                            </button>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                            <h2 className="text-sm font-bold text-white mb-4">Quick Links</h2>
                            <div className="space-y-2">
                                <button className="w-full flex justify-between items-center p-3 rounded-lg hover:bg-[#1A2A3A] border border-transparent hover:border-[#2A3A4A] transition-all text-sm text-[#8899AA] hover:text-white">
                                    <div className="flex items-center"><TrendingUp size={16} className="mr-3 text-[#556677]" /> Year-end Balances</div>
                                    <ChevronRight size={14} />
                                </button>
                                <button className="w-full flex justify-between items-center p-3 rounded-lg hover:bg-[#1A2A3A] border border-transparent hover:border-[#2A3A4A] transition-all text-sm text-[#8899AA] hover:text-white">
                                    <div className="flex items-center"><AlertCircle size={16} className="mr-3 text-[#556677]" /> Sandwich Leave Cases</div>
                                    <ChevronRight size={14} />
                                </button>
                                <button className="w-full flex justify-between items-center p-3 rounded-lg hover:bg-[#1A2A3A] border border-transparent hover:border-[#2A3A4A] transition-all text-sm text-[#8899AA] hover:text-white">
                                    <div className="flex items-center"><Users size={16} className="mr-3 text-[#556677]" /> Setup Leave Types</div>
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
