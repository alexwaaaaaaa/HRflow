"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    BarChart3, FileSpreadsheet, PieChart, Clock, Star, Plus, Download, ChevronRight, Search, FileText
} from "lucide-react";

export default function ReportsDashboardScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-indigo-400" />
                        Reports & Analytics
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Central hub for all your HR, Payroll, and Compliance analytics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/reports/builder" className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Plus className="w-4 h-4" /> Build Custom Report
                    </Link>
                </div>
            </div>

            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8899AA] w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search for any report (e.g., 'Headcount', 'Attrition', 'Payroll Cost')..."
                    className="w-full bg-[#0D1928] border border-[#1A2A3A] text-white text-md rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-indigo-500 transition-colors shadow-lg"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 hover:border-indigo-500/50 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-indigo-400">
                        <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Standard Reports</h3>
                    <p className="text-xs text-[#8899AA] mb-4">40+ pre-built templates for Headcount, Leave, and Attendance.</p>
                    <Link href="#standard" className="text-indigo-400 text-sm font-medium flex items-center gap-1">Browse Library <ChevronRight className="w-4 h-4" /></Link>
                </div>

                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 hover:border-emerald-500/50 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-emerald-400">
                        <PieChart className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Advanced Analytics</h3>
                    <p className="text-xs text-[#8899AA] mb-4">Deep dive into Payroll Costs, Attrition Risk, and Cohort behaviors.</p>
                    <Link href="/reports/hr-analytics" className="text-emerald-400 text-sm font-medium flex items-center gap-1">View Dashboards <ChevronRight className="w-4 h-4" /></Link>
                </div>

                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 hover:border-amber-500/50 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-amber-500">
                        <Star className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Saved Reports</h3>
                    <p className="text-xs text-[#8899AA] mb-4">Access your customized and frequently used report configurations.</p>
                    <Link href="/reports/saved" className="text-amber-500 text-sm font-medium flex items-center gap-1">View Saved <ChevronRight className="w-4 h-4" /></Link>
                </div>

                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 hover:border-pink-500/50 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-pink-400">
                        <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Scheduled Deliveries</h3>
                    <p className="text-xs text-[#8899AA] mb-4">Manage automated report emails to stakeholders and yourself.</p>
                    <Link href="/reports/scheduler" className="text-pink-400 text-sm font-medium flex items-center gap-1">Manage Schedules <ChevronRight className="w-4 h-4" /></Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Reports */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Recently Generated</h2>
                    <div className="space-y-3">
                        {[
                            { name: "Monthly Payroll Cost Center", desc: "Generated today at 10:45 AM", type: "Financial", id: "/reports/payroll-cost" },
                            { name: "Q3 Attrition Predictor", desc: "Generated yesterday", type: "Analytics", id: "/reports/attrition" },
                            { name: "Q2 Compliance Audit", desc: "Generated 3 days ago", type: "Compliance", id: "/reports/audit" },
                        ].map((report, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-[#1A2A3A]/40 hover:bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-[#0B1221] rounded border border-[#2A3A4A] text-[#8899AA]">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <Link href={report.id} className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{report.name}</Link>
                                        <p className="text-xs text-[#8899AA]">{report.desc} • <span className="text-indigo-400">{report.type}</span></p>
                                    </div>
                                </div>
                                <button className="p-2 text-[#8899AA] hover:text-white transition-colors" title="Download Last Run">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Templates */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" id="standard">
                    <h2 className="text-lg font-bold text-white mb-6">Popular Templates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: "Headcount Report", category: "HR Core", href: "/reports/headcount" },
                            { name: "Leave Utilization", category: "Time & Attendance", href: "/reports/leave" },
                            { name: "Payroll MIS Screen", category: "Finance", href: "/reports/payroll-mis" },
                            { name: "Statutory Reports", category: "Compliance", href: "/reports/statutory" },
                            { name: "Training Completion", category: "L&D", href: "/reports/training" },
                            { name: "Recruitment Funnel", category: "ATS", href: "/reports/recruitment" },
                        ].map((tmpl, idx) => (
                            <Link href={tmpl.href} key={idx} className="p-4 bg-[#1A2A3A]/40 hover:bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl transition-colors">
                                <h3 className="text-sm font-bold text-white mb-1">{tmpl.name}</h3>
                                <p className="text-xs text-[#8899AA]">{tmpl.category}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
