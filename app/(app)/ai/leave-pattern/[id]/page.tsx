"use client";

import React from 'react';
import { Calendar, ArrowLeft, AlertCircle, Clock, CheckCircle2, XCircle, ChevronDown, User, Activity } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function LeavePatternDetailScreen() {
    const employee = {
        name: 'Priya Desai',
        id: 'EMP-055',
        role: 'Senior Product Designer',
        dept: 'Design',
        manager: 'Ankit Patel',
        leaveBalance: 24,
        daysSinceLastLeave: 312
    };

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Navigation */}
            <div className="mb-8">
                <Link href="/ai/leave-pattern" className="flex items-center gap-2 text-[#8899AA] hover:text-white transition-colors w-fit">
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back to Leave Analytics</span>
                </Link>
            </div>

            {/* Profile & Alert Banner */}
            <div className="bg-[#0D1928] border border-amber-500/30 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.05)]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-3xl text-[#8899AA]">
                            <User size={36} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">{employee.name}</h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-[#8899AA]">
                                <span>{employee.id}</span>
                                <span className="w-1 h-1 rounded-full bg-[#445566]" />
                                <span>{employee.role}</span>
                                <span className="w-1 h-1 rounded-full bg-[#445566]" />
                                <span>Manager: <span className="text-white">{employee.manager}</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#131B2B] border border-amber-500/20 px-6 py-4 rounded-xl flex items-center gap-4 text-left">
                        <AlertCircle size={28} className="text-amber-500 shrink-0" />
                        <div>
                            <div className="text-amber-500 font-bold mb-1">Critical Burnout Risk</div>
                            <div className="text-sm text-[#8899AA]">0 PTO days taken in 10 months</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Leave Balances Matrix */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Leave Balances</h3>

                    <div className="space-y-5">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[#8899AA]">Privilege Leave (PL)</span>
                                <span className="text-white font-medium">18 / 20</span>
                            </div>
                            <div className="w-full bg-[#1A2A3A] rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                            <p className="text-xs text-amber-500 mt-2">Max accrual limit approaching</p>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[#8899AA]">Sick Leave (SL)</span>
                                <span className="text-white font-medium">6 / 8</span>
                            </div>
                            <div className="w-full bg-[#1A2A3A] rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[#8899AA]">Comp Offs</span>
                                <span className="text-white font-medium">4</span>
                            </div>
                            <p className="text-xs text-[#8899AA] mt-1">2 expiring in 14 days</p>
                        </div>
                    </div>
                </div>

                {/* AI Analysis & Timeline */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-amber-400" /> Work Pattern Analysis
                    </h3>

                    <p className="text-[#8899AA] text-sm leading-relaxed mb-6">
                        Kaarya AI has cross-referenced system logins, OKR updates, and leave records. Priya has maintained an average daily active time of <strong className="text-white">10.2 hours</strong> over the last quarter, significantly above the department average of 8.4 hours. Coupled with the lack of PTO, this creates an extremely high probability of imminent burnout leading to diminished productivity or attrition.
                    </p>

                    <div className="flex-1 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 relative">
                        <div className="absolute top-5 right-5 text-[#445566]">10 Month Timeline</div>
                        <div className="flex justify-between items-end h-[120px] pb-6 px-4 mt-8 border-b border-[#2A3A4A] relative">
                            {/* Mock Timeline bars */}
                            {[2, 3, 4, 4, 5, 6, 6, 7, 8, 9].map((val, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 group">
                                    <div className={`w-8 rounded-t-sm transition-all duration-300 ${i > 6 ? 'bg-amber-500/80 group-hover:bg-amber-400' : 'bg-[#2A3A4A] group-hover:bg-[#445566]'}`} style={{ height: `${val * 10}px` }}></div>
                                    <span className="text-[10px] text-[#8899AA] font-mono">M{i + 1}</span>
                                </div>
                            ))}
                            {/* Threshold line */}
                            <div className="absolute top-[40px] left-0 right-0 border-t border-dashed border-red-500/30"></div>
                            <div className="absolute top-[25px] right-2 text-[10px] text-red-500/50 uppercase tracking-widest">Burnout Threshold</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prescriptive Interventions */}
            <h3 className="text-lg font-semibold text-white mb-4">Recommended Interventions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0D1928] border border-emerald-500/30 p-5 rounded-2xl hover:bg-[#131B2B] transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                        <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 shrink-0">
                            <Calendar size={18} />
                        </div>
                        <div>
                            <h4 className="text-white font-medium text-sm mb-1">Mandatory Cool-down Block</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                                Mandate a minimum 3-day continuous PTO block by the end of next month. Automate calendar blocking and out-of-office setup.
                            </p>
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border-none text-xs py-1.5 px-3 h-auto">
                                Propose to Manager
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl hover:bg-[#131B2B] transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                        <div className="bg-[#1A2A3A] p-2 rounded-lg text-[#8899AA] shrink-0">
                            <Clock size={18} />
                        </div>
                        <div>
                            <h4 className="text-white font-medium text-sm mb-1">Enforce Comp Off Usage</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                                2 comp off days are expiring on Nov 15th. Auto-apply these to upcoming Fridays to create long weekends.
                            </p>
                            <Button variant="secondary" className="border-[#2A3A4A] text-white text-xs py-1.5 px-3 h-auto">
                                Schedule Auto-Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
