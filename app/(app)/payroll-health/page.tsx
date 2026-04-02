"use client";

import React from "react";
import { Heart, Target, Clock, ShieldCheck, Lock, Eye, Users, ArrowUp, ArrowRight, ArrowDown, ChevronRight, CheckCircle2 } from "lucide-react";

export default function PayrollHealthScorePage() {
    const categories = [
        { id: 1, title: "Accuracy Score", icon: Target, score: "94/100", msg: "0 payroll errors in last 3 months", trend: "up", val: "+2", color: "#00E5A0" },
        { id: 2, title: "Timeliness Score", icon: Clock, score: "91/100", msg: "Salary credited by 30th for 11/12 months", trend: "neutral", val: "Same", color: "#FFB800" },
        { id: 3, title: "Compliance Score", icon: ShieldCheck, score: "89/100", msg: "2 minor PF filing delays in 12 months", trend: "up", val: "+5", color: "#00E5A0" },
        { id: 4, title: "Fraud Prevention", icon: Lock, score: "95/100", msg: "AI detected 12 anomalies, all resolved", trend: "up", val: "+1", color: "#00E5A0" },
        { id: 5, title: "Transparency", icon: Eye, score: "82/100", msg: "Employee payslip open rate: 64%", trend: "up", val: "+8", color: "#00E5A0" },
        { id: 6, title: "Employee Satisfaction", icon: Users, score: "76/100", msg: "Salary queries: 23 last month", trend: "down", val: "-3", color: "#FF4444" },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#00E5A0]/10 rounded-lg">
                        <Heart className="w-6 h-6 text-[#00E5A0]" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Payroll Health Score</h2>
                </div>

                {/* Overall Score Card */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">

                        {/* Animated Donut Ring */}
                        <div className="relative w-40 h-40 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#1A2A3A" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#00E5A0" strokeWidth="8" strokeDasharray="283" strokeDashoffset="36.79" className="drop-shadow-[0_0_8px_rgba(0,229,160,0.5)] transition-all duration-1000" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-[#00E5A0]">87</span>
                                <span className="text-xs text-gray-400 font-medium tracking-widest mt-0.5">/ 100</span>
                            </div>
                        </div>

                        {/* Score Text */}
                        <div className="flex-1 text-center md:text-left border-b md:border-b-0 md:border-r border-[#1A2A3A] pb-6 md:pb-0 md:pr-10">
                            <h3 className="text-4xl font-bold text-white tracking-tight">A — Excellent</h3>
                            <p className="text-gray-400 mt-2 text-lg">Your payroll operations are highly efficient and compliant.</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex-shrink-0 grid grid-cols-2 gap-x-12 gap-y-4">
                            <div>
                                <p className="flex items-center gap-2 text-sm text-gray-400 mb-1">Industry Avg</p>
                                <p className="text-2xl font-semibold text-white">72</p>
                            </div>
                            <div>
                                <p className="flex items-center gap-2 text-sm text-gray-400 mb-1">Your Score</p>
                                <p className="text-2xl font-semibold text-[#00E5A0]">87</p>
                            </div>
                            <div className="col-span-2">
                                <p className="flex items-center gap-2 text-sm text-gray-400 mb-1">Trend vs Last Month</p>
                                <p className="text-lg font-medium text-[#00E5A0] flex items-center gap-1">
                                    <ArrowUp className="w-4 h-4" /> +4 points
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <h3 className="text-lg font-semibold text-white pt-4">Category Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#334155] transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-[${cat.color}]/10`}>
                                        <cat.icon className={`w-5 h-5`} style={{ color: cat.color }} />
                                    </div>
                                    <h4 className="font-semibold text-white">{cat.title}</h4>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold" style={{ color: cat.color }}>{cat.score}</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-400 mb-4 h-10">{cat.msg}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-[#1A2A3A]">
                                <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: cat.trend === 'up' ? '#00E5A0' : cat.trend === 'down' ? '#FF4444' : '#FFB800' }}>
                                    {cat.trend === 'up' && <ArrowUp className="w-4 h-4" />}
                                    {cat.trend === 'neutral' && <ArrowRight className="w-4 h-4" />}
                                    {cat.trend === 'down' && <ArrowDown className="w-4 h-4" />}
                                    {cat.val}
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Improvement Actions */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 mt-4">
                    <h3 className="text-lg font-semibold text-white mb-5">Recommended Actions</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-4 p-4 bg-[#060B14] rounded-lg border border-[#1A2A3A] hover:border-[#FFB800]/50 transition-colors">
                            <div className="p-1.5 bg-[#FFB800]/10 rounded-md shrink-0 mt-0.5">
                                <ArrowUp className="w-4 h-4 text-[#FFB800]" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white">Improve: Increase payslip open rate</p>
                                <p className="text-sm text-gray-400 mt-1">Currently at 64% — target 80% to improve Transparency score.</p>
                            </div>
                            <button className="px-3 py-1.5 bg-[#1A2A3A] hover:bg-[#2A3B4C] text-xs font-medium rounded-md transition-colors">Configure Alert</button>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-[#060B14] rounded-lg border border-[#1A2A3A] hover:border-[#FFB800]/50 transition-colors">
                            <div className="p-1.5 bg-[#FFB800]/10 rounded-md shrink-0 mt-0.5">
                                <ArrowUp className="w-4 h-4 text-[#FFB800]" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white">Improve: Enable WhatsApp delivery</p>
                                <p className="text-sm text-gray-400 mt-1">35 employees are still receiving payslips only via portal. Enabling WhatsApp will boost Satisfaction score.</p>
                            </div>
                            <button className="px-3 py-1.5 bg-[#1A2A3A] hover:bg-[#2A3B4C] text-xs font-medium rounded-md transition-colors">Enable Integration</button>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-[#060B14] rounded-lg border border-[#1A2A3A] hover:border-[#00E5A0]/50 transition-colors">
                            <div className="p-1.5 bg-[#00E5A0]/10 rounded-md shrink-0 mt-0.5">
                                <CheckCircle2 className="w-4 h-4 text-[#00E5A0]" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white">Maintain: PF filing on time</p>
                                <p className="text-sm text-gray-400 mt-1">Scheduled to be filed by 15th April to maintain your 100% timeliness streak.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
