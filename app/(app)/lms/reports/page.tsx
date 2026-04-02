"use client";
import React, { useState } from "react";
import {
    FileText, Download, Filter, Search, ChevronDown, PieChart, TrendingUp, Users, ShieldAlert, Clock
} from "lucide-react";

const REPORTS = [
    { id: 1, name: "Course Completion Rates", category: "General", desc: "Detailed breakdown of completion rates by department, role, and specific course." },
    { id: 2, name: "Compliance Status", category: "Compliance", desc: "Track mandatory training completions, expiring certificates, and non-compliant employees." },
    { id: 3, name: "Learner Engagement", category: "Engagement", desc: "Active users, average time spent learning, and most popular courses." },
    { id: 4, name: "Skill Gap Matrix", category: "Skills", desc: "Current vs required skill levels across the organization to inform hiring/training." },
    { id: 5, name: "External Training Logs", category: "General", desc: "List of all user-submitted external certifications and courses pending/approved." },
    { id: 6, name: "Webinar Attendance", category: "Live Training", desc: "Attendance records, drop-off rates, and QA participation for live sessions." },
    { id: 7, name: "Assessment Scores", category: "Performance", desc: "Average test scores per course, highlighting modules with high failure rates." },
];

export default function LMSReportsScreen() {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "General", "Compliance", "Engagement", "Skills", "Performance", "Live Training"];
    const filteredReports = activeCategory === "All" ? REPORTS : REPORTS.filter(r => r.category === activeCategory);

    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <FileText size={28} className="text-[#33E6FF]" /> Reporting Center
                    </h1>
                    <p className="text-[#8899AA]">Generate, schedule, and export detailed reports on learning activity and compliance.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#0F1C2E] text-white rounded-xl font-medium hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                        Schedule Reports <Clock size={16} />
                    </button>
                    <button className="px-5 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Download size={18} className="text-[#00E5A0]" /> Export All
                    </button>
                </div>
            </div>

            {/* Recommended Reports KPI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 shadow-xl cursor-pointer hover:border-[#FF4444]/50 transition-colors group">
                    <ShieldAlert size={24} className="text-[#FF4444] mb-3" />
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#FF4444] transition-colors">Compliance Alerts</h3>
                    <p className="text-sm text-[#8899AA] mb-4">42 employees non-compliant</p>
                    <span className="text-xs font-bold text-[#FF4444] uppercase tracking-wider flex items-center gap-1">Run Report <ChevronDown size={14} className="-rotate-90" /></span>
                </div>
                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 shadow-xl cursor-pointer hover:border-[#33E6FF]/50 transition-colors group">
                    <Users size={24} className="text-[#33E6FF] mb-3" />
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#33E6FF] transition-colors">Onboarding Status</h3>
                    <p className="text-sm text-[#8899AA] mb-4">15 new hires in progress</p>
                    <span className="text-xs font-bold text-[#33E6FF] uppercase tracking-wider flex items-center gap-1">Run Report <ChevronDown size={14} className="-rotate-90" /></span>
                </div>
                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 shadow-xl cursor-pointer hover:border-[#00E5A0]/50 transition-colors group">
                    <TrendingUp size={24} className="text-[#00E5A0] mb-3" />
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#00E5A0] transition-colors">Course Completions</h3>
                    <p className="text-sm text-[#8899AA] mb-4">+12% vs last month</p>
                    <span className="text-xs font-bold text-[#00E5A0] uppercase tracking-wider flex items-center gap-1">Run Report <ChevronDown size={14} className="-rotate-90" /></span>
                </div>
                <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 shadow-xl cursor-pointer hover:border-[#FFB020]/50 transition-colors group">
                    <PieChart size={24} className="text-[#FFB020] mb-3" />
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#FFB020] transition-colors">Skill Distribution</h3>
                    <p className="text-sm text-[#8899AA] mb-4">Latest matrix updates</p>
                    <span className="text-xs font-bold text-[#FFB020] uppercase tracking-wider flex items-center gap-1">Run Report <ChevronDown size={14} className="-rotate-90" /></span>
                </div>
            </div>

            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">

                <div className="p-6 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between md:items-center gap-4 bg-[#0A1420]">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors border ${activeCategory === cat ? 'bg-[#33E6FF]/10 text-[#33E6FF] border-[#33E6FF]/30' : 'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A] hover:bg-[#2A3A4A] hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <input type="text" placeholder="Search reports..." className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-white text-sm focus:outline-none focus:border-[#33E6FF]" />
                        </div>
                        <button className="p-1.5 bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] rounded-lg hover:text-white transition-colors"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 align-top">
                    {filteredReports.map(report => (
                        <div key={report.id} className="bg-[#152336] border border-[#2A3A4A] rounded-xl p-5 hover:border-[#33E6FF] transition-colors group flex flex-col h-full">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-white text-lg group-hover:text-[#33E6FF] transition-colors">{report.name}</h3>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8899AA] bg-[#0A1420] border border-[#2A3A4A] px-2 py-0.5 rounded">{report.category}</span>
                            </div>
                            <p className="text-sm text-[#8899AA] mb-6 flex-1">{report.desc}</p>
                            <div className="flex items-center gap-2 mt-auto">
                                <button className="flex-1 py-2 bg-[#00E5A0]/10 text-[#00E5A0] font-bold rounded-lg hover:bg-[#00E5A0]/20 transition-colors text-sm border border-[#00E5A0]/20">
                                    View Report
                                </button>
                                <button className="w-10 h-10 border border-[#2A3A4A] bg-[#1A2A3A] text-white rounded-lg flex items-center justify-center hover:bg-[#2A3A4A] transition-colors">
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
