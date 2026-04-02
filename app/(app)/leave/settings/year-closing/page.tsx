"use client";

import React, { useState } from 'react';
import {
    Calendar, AlertTriangle, ShieldCheck, PlayCircle, Loader, CheckCircle
} from 'lucide-react';

export default function LeaveYearClosingScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Year-end Leave Closing</h1>
                        <p className="text-sm text-[#8899AA]">Execute year-end carry forward, encashment, and lapsing processes.</p>
                    </div>
                </div>

                <div className="bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl p-6 mb-6">
                    <div className="flex items-start">
                        <AlertTriangle size={24} className="text-[#FF4444] mr-4 flex-shrink-0" />
                        <div>
                            <h2 className="text-lg font-bold text-white mb-2">Critical Operation</h2>
                            <p className="text-sm text-[#8899AA] leading-relaxed">
                                Running the year-end closing process is irreversible. It will calculate unused balances as of Dec 31st (or configured year end), lapse ineligible leaves, carry forward eligible leaves based on limits, and mark surplus leaves for encashment.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Process Config */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg p-6 space-y-6">
                        <h3 className="font-bold text-white border-b border-[#1A2A3A] pb-3 text-lg flex items-center">
                            <Calendar size={18} className="mr-2 text-[#0066FF]" /> Closing Parameters
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block mb-2">Financial Year Ending</label>
                                <div className="bg-[#060B14] border border-[#1A2A3A] p-3 rounded-lg text-white font-bold flex justify-between items-center">
                                    <span>31 December 2024</span>
                                    <span className="text-xs bg-[#1A2A3A] px-2 py-1 rounded text-[#8899AA] font-mono">Calendar Year</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block mb-2">Effective Date for New Balances</label>
                                <input type="date" defaultValue="2025-01-01" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white font-bold p-3 rounded-lg outline-none focus:border-[#0066FF]" />
                            </div>
                        </div>
                    </div>

                    {/* Pre-flight Checks */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg p-6 space-y-4">
                        <h3 className="font-bold text-white border-b border-[#1A2A3A] pb-3 text-lg flex items-center">
                            <ShieldCheck size={18} className="mr-2 text-[#00E5A0]" /> Readiness Checks
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex items-center text-sm">
                                <CheckCircle size={18} className="text-[#00E5A0] mr-3" />
                                <span className="text-[#8899AA]">All leave requests till Dec 31 resolved</span>
                            </li>
                            <li className="flex items-center text-sm">
                                <CheckCircle size={18} className="text-[#00E5A0] mr-3" />
                                <span className="text-[#8899AA]">Carry forward limits configured</span>
                            </li>
                            <li className="flex items-center text-sm">
                                <AlertTriangle size={18} className="text-[#FFB800] mr-3" />
                                <span className="text-[#FFB800] font-bold">3 Pending Leave Cancellations</span>
                                <button className="ml-auto text-xs text-[#0066FF] hover:underline">Resolve</button>
                            </li>
                        </ul>

                        <div className="pt-6 mt-4 border-t border-[#1A2A3A]">
                            <button className="w-full py-4 bg-[#0066FF] text-white font-bold text-lg rounded-xl hover:bg-[#0052cc] transition-colors shadow-[0_0_20px_rgba(0,102,255,0.4)] flex justify-center items-center opacity-50 cursor-not-allowed">
                                <PlayCircle size={20} className="mr-2" /> Run Closing Process
                            </button>
                            <p className="text-center text-[10px] text-[#556677] mt-3 uppercase tracking-wider">Fix warnings to enable</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
