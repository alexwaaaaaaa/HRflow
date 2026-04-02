"use client";
import React, { useState } from "react";
import { Download, FileText, Calendar, Filter, Search, BarChart3, Database } from "lucide-react";

const REPORTSList = [
    { title: "Time-to-Hire Analysis", desc: "Average days taken from requisition approval to offer acceptance per department.", icon: ClockIcon, color: "#0066FF" },
    { title: "Sourcing Channel ROI", desc: "Conversion rates and cost-per-hire breakdown by sourcing platforms (LinkedIn, Indeed, Referrals).", icon: Database, color: "#00E5A0" },
    { title: "Diversity & Inclusion Report", desc: "Demographic breakdown of applicants vs hires to track D&I initiatives.", icon: BarChart3, color: "#FFB800" },
    { title: "Interviewer Workload", desc: "Total hours spent on interviews per employee/team over the selected period.", icon: Calendar, color: "#9B59B6" },
    { title: "Offer Decline Reasons", desc: "Aggregate analysis of reasons cited by candidates for rejecting offers.", icon: FileText, color: "#FF4444" },
    { title: "Pipeline Bottlenecks", desc: "Stage-by-stage analysis identifying where candidates spend the most time.", icon: Filter, color: "#0066FF" },
];

export default function ATSReports() {
    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">ATS Reports Library</h1>
                    <p className="text-sm text-[#8899AA]">Pre-configured reports covering all recruitment lifecycle metrics</p>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-white text-sm font-medium rounded-xl hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                        <Calendar size={14} /> Schedule Report
                    </button>
                    <button className="h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-colors">
                        <PlusIcon size={14} /> Custom Builder
                    </button>
                </div>
            </div>

            {/* Quick Filters */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-2xl flex gap-4 mb-8">
                <div className="relative w-[300px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input placeholder="Search reports..." className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-9 px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                </div>
                <select className="h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none">
                    <option>Date Range: Last 30 Days</option>
                    <option>This Quarter</option>
                    <option>This Year (YTD)</option>
                </select>
                <select className="h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Sales</option>
                </select>
                <select className="h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none">
                    <option>Format: CSV</option>
                    <option>Format: PDF</option>
                    <option>Format: Excel</option>
                </select>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {REPORTSList.map((r, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 hover:border-[#2A3A4A] transition-colors group flex flex-col justify-between h-[200px]">
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] flex items-center justify-center mb-4" style={{ color: r.color }}>
                                <r.icon size={20} />
                            </div>
                            <h3 className="font-bold text-white mb-2">{r.title}</h3>
                            <p className="text-xs text-[#8899AA] leading-relaxed line-clamp-2">{r.desc}</p>
                        </div>
                        <div className="pt-4 flex items-center justify-between border-t border-[#1A2A3A]">
                            <span className="text-[10px] text-[#445566] font-medium">Updated 2h ago</span>
                            <div className="flex gap-2">
                                <button className="text-xs text-[#0066FF] hover:underline font-bold transition-all opacity-0 group-hover:opacity-100">Preview</button>
                                <button className="w-8 h-8 bg-[#1A2A3A] rounded-lg flex items-center justify-center text-[#8899AA] hover:text-white hover:bg-[#2A3A4A] transition-all opacity-0 group-hover:opacity-100">
                                    <Download size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-[#8899AA]">Need a different cut of data? <a href="/reports/builder" className="text-[#00E5A0] hover:underline">Request a custom report</a></p>
            </div>
        </div>
    );
}

function ClockIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}
function PlusIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg>;
}
