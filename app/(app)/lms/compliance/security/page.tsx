"use client";
import React from "react";
import {
    ShieldCheck, AlertTriangle, MonitorPlay, CheckSquare, Clock, FileText, Lock
} from "lucide-react";
import Link from "next/link";

export default function SecurityTrainingScreen() {
    return (
        <div className="p-6 max-w-[1000px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border-2 border-[#2A3A4A] flex flex-col items-center justify-center shrink-0 shadow-lg relative z-10">
                    <ShieldCheck size={32} className="text-purple-400 mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8899AA]">Annual</span>
                </div>

                <div className="flex-1 text-center md:text-left relative z-10">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFB020] bg-[#FFB020]/10 border border-[#FFB020]/20 px-2.5 py-1 rounded mb-3">
                        <AlertTriangle size={14} /> Required Training
                    </div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Information Security & Data Privacy</h1>
                    <p className="text-[#8899AA] text-sm flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <span className="flex items-center gap-1.5"><Clock size={14} /> Est. Time: 1h 0m</span>
                        <span className="flex items-center gap-1.5"><FileText size={14} /> 5 Modules</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#00E5A0]" /> Completed on Sep 05, 2025</span>
                    </p>
                </div>

                <div className="shrink-0 relative z-10 w-full md:w-auto">
                    <button className="w-full md:w-max px-6 py-3 border border-[#2A3A4A] bg-[#1A2A3A] text-white font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors shadow-lg flex items-center justify-center gap-2">
                        Review Course
                    </button>
                    <button className="w-full md:w-max mt-3 px-6 py-3 bg-[#33E6FF]/10 border border-[#33E6FF]/20 text-[#33E6FF] font-bold rounded-xl hover:bg-[#33E6FF]/20 transition-colors shadow-lg flex items-center justify-center gap-2">
                        Download Certificate
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl text-sm text-[#8899AA] leading-relaxed relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-[#00E5A0]"></div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#00E5A0]/10 flex items-center justify-center shrink-0 border border-[#00E5A0]/20">
                                <CheckSquare size={20} className="text-[#00E5A0]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Training Completed</h2>
                                <p>You have successfully fulfilled your annual Information Security awareness requirement. You scored 100% on the final assessment.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-white mb-6">Course Modules</h2>
                        <div className="space-y-3">
                            {[
                                { m: 1, title: "Phishing & Social Engineering", dur: "15m" },
                                { m: 2, title: "Password Hygiene & MFA", dur: "10m" },
                                { m: 3, title: "Data Classification & Handling", dur: "15m" },
                                { m: 4, title: "Physical Security & Clear Desk", dur: "10m" },
                                { m: 5, title: "Incident Reporting", dur: "10m" },
                            ].map((mod, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-[#152336] border border-[#00E5A0]/30 rounded-xl relative overflow-hidden group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00E5A0]"></div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#0A1420] rounded-lg flex items-center justify-center border border-[#1A2A3A]">
                                            <CheckSquare size={14} className="text-[#00E5A0]" />
                                        </div>
                                        <span className="text-white font-medium text-sm line-through decoration-[#445566]">Module {mod.m}: {mod.title}</span>
                                    </div>
                                    <button className="text-xs text-[#33E6FF] hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MonitorPlay size={14} /> Review
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl sticky top-0">
                        <h3 className="font-bold text-white mb-4">Quick Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <button className="w-full flex items-center gap-3 p-3 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-xl text-sm font-medium text-white transition-colors text-left">
                                    <FileText size={18} className="text-[#33E6FF] shrink-0" /> TechCorp InfoSec Policy
                                </button>
                            </li>
                            <li>
                                <button className="w-full flex items-center gap-3 p-3 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-xl text-sm font-medium text-white transition-colors text-left">
                                    <Lock size={18} className="text-purple-400 shrink-0" /> Request 1Password Access
                                </button>
                            </li>
                            <li>
                                <button className="w-full flex items-center gap-3 p-3 bg-[#FF4444]/10 hover:bg-[#FF4444]/20 border border-[#FF4444]/20 rounded-xl text-sm font-medium text-[#FF4444] transition-colors text-left">
                                    <AlertTriangle size={18} className="shrink-0" /> Report Security Incident
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
