"use client";
import React from "react";
import {
    ShieldAlert, Calendar as CalendarIcon, AlertCircle, Clock, CheckCircle2, ChevronRight, Filter
} from "lucide-react";
import Link from "next/link";

const COMPLIANCE_ITEMS = [
    { id: 1, title: "Data Privacy & GDPR Fundamentals", due: "Oct 15, 2025", status: "pending", priority: "high", duration: "1h 30m" },
    { id: 2, title: "Anti-Money Laundering (AML) 2025 Refresher", due: "Oct 20, 2025", status: "pending", priority: "critical", duration: "45m" },
    { id: 3, title: "Workplace Harassment Prevention", due: "Oct 31, 2025", status: "pending", priority: "medium", duration: "2h 0m" },
    { id: 4, title: "Information Security Awareness", due: "Sep 10, 2025", status: "completed", priority: "high", duration: "1h 0m", completedOn: "Sep 05, 2025" },
];

export default function ComplianceCalendarScreen() {
    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#FFB020]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#FFB020]/10 rounded-xl flex items-center justify-center border border-[#FFB020]/20">
                            <ShieldAlert size={20} className="text-[#FFB020]" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Compliance Center</h1>
                    </div>
                    <p className="text-[#8899AA] max-w-2xl mt-2">Track and complete mandatory regulatory training required for your role and department.</p>
                </div>

                <div className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-4 flex items-center gap-6 relative z-10 shrink-0">
                    <div>
                        <p className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-1">Compliance Score</p>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-extrabold text-white leading-none">75<span className="text-xl text-[#FFB020]">%</span></span>
                        </div>
                    </div>
                    <div className="w-16 h-16 relative">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#2A3A4A" strokeWidth="10" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#FFB020" strokeWidth="10" strokeDasharray="283" strokeDashoffset={283 - (283 * 75) / 100} />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Required Training</h2>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Filter size={16} /> Filter Status
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {COMPLIANCE_ITEMS.map(item => (
                    <div key={item.id} className={`bg-[#0F1C2E] border rounded-2xl p-6 transition-all flex flex-col md:flex-row gap-6 md:items-center justify-between ${item.status === 'completed' ? 'border-[#1A2A3A] opacity-70' :
                            item.priority === 'critical' ? 'border-[#FF4444]/50 shadow-[0_0_15px_rgba(255,68,68,0.1)]' :
                                'border-[#1A2A3A] hover:border-[#2A3A4A]'
                        }`}>

                        <div className="flex-1 flex gap-5">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0A1420] shadow-md ${item.status === 'completed' ? 'bg-[#00E5A0] text-black' :
                                    item.priority === 'critical' ? 'bg-[#FF4444] text-white' : 'bg-[#1A2A3A] text-[#8899AA]'
                                }`}>
                                {item.status === 'completed' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                    {item.status !== 'completed' && item.priority === 'critical' && (
                                        <span className="bg-[#FF4444] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded animate-pulse">URGENT</span>
                                    )}
                                </div>
                                <p className="text-sm text-[#8899AA] flex items-center gap-4">
                                    <span className="flex items-center gap-1.5"><Clock size={14} /> Est. Time: {item.duration}</span>
                                    {item.status === 'completed' ? (
                                        <span className="flex items-center gap-1.5 text-[#00E5A0] font-medium"><CheckCircle2 size={14} /> Completed on {item.completedOn}</span>
                                    ) : (
                                        <span className={`flex items-center gap-1.5 font-medium ${item.priority === 'critical' ? 'text-[#FF4444]' : 'text-[#FFB020]'}`}>
                                            <CalendarIcon size={14} /> Due: {item.due}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="shrink-0 flex items-center">
                            {item.status === 'completed' ? (
                                <button className="px-6 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white rounded-xl font-semibold hover:bg-[#2A3A4A] transition-colors text-sm">
                                    View Certificate
                                </button>
                            ) : (
                                <button className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${item.priority === 'critical' ? 'bg-[#FF4444] text-white hover:bg-red-600 shadow-lg shadow-[#FF4444]/20' : 'bg-[#33E6FF] text-[#0A1420] hover:bg-[#29b8cc]'
                                    }`}>
                                    Start Training <ChevronRight size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
