"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    BookOpen, ChevronRight, Download, Filter, Target, Award
} from "lucide-react";

const TRAINING_DATA = [
    { module: "POSH Awareness 2026", status: "Completed", date: "12 Feb 2026", score: "92%" },
    { module: "Information Security Basics", status: "Completed", date: "05 Mar 2026", score: "100%" },
    { module: "Leadership Dynamics", status: "In Progress", date: "-", score: "-" },
    { module: "Code of Conduct", status: "Pending", date: "-", score: "-" },
];

export default function TrainingReportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Training Completion</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-indigo-400" />
                        Training & Compliance
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Monitor mandatory training completions across all departments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <Filter className="w-4 h-4" /> Q1 2026
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Overall Compliance</h3>
                    <div className="text-3xl font-bold mb-1 text-emerald-400">88%</div>
                    <div className="w-full bg-[#1A2A3A] rounded-full h-1.5 mt-4">
                        <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Pending Certifications</h3>
                    <div className="text-3xl font-bold mb-1 text-amber-500">142</div>
                    <p className="text-xs text-[#8899AA] mt-1">Due within 15 days</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-2">Average Score</h3>
                    <div className="text-3xl font-bold mb-1 text-indigo-400">94/100</div>
                    <p className="text-xs text-[#8899AA] mt-1">Across mandatory assessments</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                        <Award className="w-4 h-4 text-indigo-400" /> POSH & Code of Conduct Tracker
                    </h2>
                    <select className="bg-[#0B1221] border border-[#2A3A4A] text-[#8899AA] text-xs rounded px-2 py-1">
                        <option>Status: All</option>
                        <option>Status: Pending</option>
                    </select>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs">
                            <tr>
                                <th className="p-4 font-medium">Employee</th>
                                <th className="p-4 font-medium">Department</th>
                                <th className="p-4 font-medium">Module Name</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A] text-sm">
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4 text-white">Rahul Verma</td>
                                <td className="p-4 text-[#8899AA]">Engineering</td>
                                <td className="p-4 font-medium">POSH 2026</td>
                                <td className="p-4"><span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase rounded border border-emerald-500/20">Completed</span></td>
                                <td className="p-4 text-white">100%</td>
                            </tr>
                            <tr className="hover:bg-[#1A2A3A]/30">
                                <td className="p-4 text-white">Aditi Iyer</td>
                                <td className="p-4 text-[#8899AA]">Sales</td>
                                <td className="p-4 font-medium">Code of Conduct</td>
                                <td className="p-4"><span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[10px] uppercase rounded border border-amber-500/20">Pending</span></td>
                                <td className="p-4 text-white">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
