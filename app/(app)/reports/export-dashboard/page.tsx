"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Presentation, ChevronRight, Download, FileJson, FileText, Image as ImageIcon, Send
} from "lucide-react";

export default function DashboardExportScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Export Tool</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <Presentation className="w-6 h-6 text-indigo-400" />
                        </div>
                        Presentations & Export
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Export complete dashboards to presentations or print-ready formats.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Configuration Panel */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 lg:col-span-1 border-t-4 border-t-indigo-500">
                    <h2 className="text-lg font-bold text-white mb-6">Export Settings</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Select Dashboard to Export</label>
                            <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors">
                                <option>Executive MIS Dashboard</option>
                                <option>HR Analytics (Strategic View)</option>
                                <option>Recruitment Funnel & Pipeline</option>
                                <option>Attrition & Retention Insights</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Data Period</label>
                            <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors">
                                <option>Q4 2025 (Jan - Mar 2026)</option>
                                <option>Q3 2025 (Oct - Dec 2025)</option>
                                <option>MOM (Last 12 Months)</option>
                                <option>Custom Range</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Export Format</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex flex-col items-center justify-center gap-2 p-3 bg-indigo-500/20 border border-indigo-500 text-indigo-400 rounded-xl hover:bg-indigo-500/30 transition-colors">
                                    <Presentation className="w-6 h-6" />
                                    <span className="text-xs font-bold">PPTX</span>
                                </button>
                                <button className="flex flex-col items-center justify-center gap-2 p-3 bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] hover:text-white rounded-xl hover:bg-[#2A3A4A] transition-colors">
                                    <FileText className="w-6 h-6" />
                                    <span className="text-xs font-bold">PDF (Print)</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Options</label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-indigo-500 bg-indigo-500 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <span className="text-sm text-white group-hover:text-indigo-400 transition-colors">Include Data Summary Tables</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-[#2A3A4A] bg-[#1A2A3A] group-hover:border-indigo-500 transition-colors"></div>
                                    <span className="text-sm text-[#8899AA] group-hover:text-white transition-colors">Apply Company Brand Colors</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg transition-colors shadow-[0_4px_15px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" /> Generate Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 lg:col-span-2 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group">
                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="relative text-center max-w-sm">
                        <div className="w-20 h-20 bg-[#1A2A3A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-[#2A3A4A] group-hover:scale-110 transition-transform duration-500">
                            <Presentation className="w-10 h-10 text-indigo-400 opacity-50" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Export Preview Generating</h3>
                        <p className="text-sm text-[#8899AA] leading-relaxed">
                            Select a dashboard and format to see a preview of how your export will look before downloading.
                        </p>

                        <div className="mt-8 flex gap-3 text-left">
                            <div className="flex-1 p-3 bg-[#1A2A3A]/50 border border-[#2A3A4A] rounded-lg">
                                <FileJson className="w-5 h-5 text-emerald-400 mb-2" />
                                <h4 className="text-xs font-bold text-white mb-1">Raw Data</h4>
                                <p className="text-[10px] text-[#8899AA]">Include raw JSON/CSV data underlying the charts.</p>
                            </div>
                            <div className="flex-1 p-3 bg-[#1A2A3A]/50 border border-[#2A3A4A] rounded-lg">
                                <Send className="w-5 h-5 text-blue-400 mb-2" />
                                <h4 className="text-xs font-bold text-white mb-1">Direct Share</h4>
                                <p className="text-[10px] text-[#8899AA]">Email the generated report directly continuously.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
