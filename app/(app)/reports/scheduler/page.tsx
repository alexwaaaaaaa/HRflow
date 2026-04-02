"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Clock, ChevronRight, Search, Play, Calendar, Mail, Edit3, Trash2, Power
} from "lucide-react";

const SCHEDULERS = [
    { id: "SCH-991", name: "Monthly Payroll Cost Center", frequency: "Monthly (1st Day)", format: "Excel (.xlsx)", recipients: "finance-leadership@acmecorp.com; ceo@acmecorp.com", status: "Active" },
    { id: "SCH-992", name: "Daily Attendance & Late Comers", frequency: "Daily (09:30 AM)", format: "CSV", recipients: "all-managers@acmecorp.com", status: "Active" },
    { id: "SCH-993", name: "Q3 Headcount Snapshot", frequency: "Quarterly", format: "PDF Dashboard", recipients: "hr-board@acmecorp.com", status: "Paused" },
];

export default function ReportSchedulerScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Scheduler</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Clock className="w-8 h-8 text-pink-400" />
                        Report Scheduler
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Automate email delivery of critical reports and dashboards.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                        + New Schedule
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 ring-1 ring-emerald-500/20">
                            <Play className="w-6 h-6" />
                        </div>
                        <span className="text-[#8899AA] text-xs">Active</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">12</h3>
                    <p className="text-xs text-[#8899AA]">Running schedules</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400 ring-1 ring-pink-500/20">
                            <Mail className="w-6 h-6" />
                        </div>
                        <span className="text-[#8899AA] text-xs">Past 30 Days</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">1,402</h3>
                    <p className="text-xs text-[#8899AA]">Emails delivered</p>
                </div>
                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white mb-3">Next Scheduled Run</h3>
                    <div className="p-3 bg-[#0B1221] border border-[#2A3A4A] rounded-xl">
                        <p className="text-emerald-400 font-bold text-sm">Daily Attendance & Late Comers</p>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-[#8899AA]">in 45 mins</span>
                            <span className="text-xs text-white">09:30 AM</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search schedules..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-pink-500 transition-colors"
                        />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <button className="px-4 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] rounded-lg">All</button>
                        <button className="px-4 py-2 bg-transparent text-[#8899AA] hover:text-white rounded-lg">Active</button>
                        <button className="px-4 py-2 bg-transparent text-[#8899AA] hover:text-white rounded-lg">Paused</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Schedule Detail</th>
                                <th className="p-4 font-medium">Delivery Setup</th>
                                <th className="p-4 font-medium text-center">Status</th>
                                <th className="p-4 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {SCHEDULERS.map((sch) => (
                                <tr key={sch.id} className={`hover:bg-[#1A2A3A]/30 transition-colors group ${sch.status === 'Paused' ? 'opacity-60' : ''}`}>
                                    <td className="p-4">
                                        <div className="text-white font-bold">{sch.name}</div>
                                        <div className="text-xs mt-1.5 flex items-center gap-2">
                                            <span className="text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {sch.frequency}
                                            </span>
                                            <span className="text-[#8899AA] border border-[#2A3A4A] px-2 py-0.5 rounded">{sch.format}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-[#8899AA] text-xs flex items-start gap-2 max-w-xs">
                                            <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 text-indigo-400" />
                                            <span className="truncate" title={sch.recipients}>{sch.recipients}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center items-center">
                                            {/* Toggle switch mockup */}
                                            <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${sch.status === 'Active' ? 'bg-pink-500' : 'bg-[#2A3A4A]'}`}>
                                                <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all ${sch.status === 'Active' ? 'left-[22px]' : 'left-1'}`}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button className="text-[#8899AA] hover:text-white transition-colors" title="Edit Schedule">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button className="text-[#8899AA] hover:text-pink-400 transition-colors" title="Delete Schedule">
                                                <Trash2 className="w-4 h-4" />
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
    );
}
