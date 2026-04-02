"use client";

import React, { useState } from 'react';
import {
    Home, AlertCircle, FileText, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';

export default function WfhRequestScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Request Work From Home</h1>
                    <p className="text-sm text-[#8899AA]">Submit your remote work requests as per company policy.</p>
                </div>

                <div className="grid grid-cols-3 gap-8">

                    {/* Form Component (Left 2 cols) */}
                    <div className="col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4">New Request Form</h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Reason Category</label>
                                    <select className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors">
                                        <option>Select Reason...</option>
                                        <option>Feeling unwell</option>
                                        <option>Personal errands</option>
                                        <option>Quiet work requirement</option>
                                        <option>Bad weather/Traffic</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Detailed Explanation</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Please provide details..."
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors resize-none"
                                    ></textarea>
                                </div>

                                {/* Approver info */}
                                <div className="bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg p-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs">SV</div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Sonia Varma</div>
                                            <div className="text-xs text-[#8899AA]">Reporting Manager</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-[#8899AA] bg-[#060B14] px-2 py-1 rounded border border-[#1A2A3A]">L1 Route</span>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="px-6 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right side panels */}
                    <div className="col-span-1 space-y-6">

                        {/* WFH Balance */}
                        <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-xl p-5 relative overflow-hidden">
                            <h3 className="text-sm font-bold text-[#0066FF] mb-2 flex items-center">
                                <Home size={16} className="mr-2" /> November Balance
                            </h3>
                            <div className="text-3xl font-black text-white">6 <span className="text-sm font-normal text-[#8899AA]">of 8 days</span></div>
                            <div className="w-full h-1.5 bg-[#1A2A3A] mt-4 rounded-full overflow-hidden">
                                <div className="h-full bg-[#0066FF]" style={{ width: '25%' }}></div>
                            </div>
                        </div>

                        {/* Recent History */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5">
                            <h3 className="text-sm font-bold text-white mb-4">Past WFH Setup</h3>

                            <div className="space-y-4">
                                <div className="border border-[#1A2A3A] bg-[#0A1420] rounded-lg p-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-white">01 Nov 2024</span>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/20">Approved</span>
                                    </div>
                                    <div className="text-[10px] text-[#8899AA]">Feeling unwell</div>
                                </div>
                            </div>

                            <button className="w-full mt-4 py-2 border border-[#1A2A3A] text-[#8899AA] hover:text-white transition-colors text-xs font-bold rounded-lg flex justify-center items-center">
                                View Full History <ChevronRight size={14} className="ml-1" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
