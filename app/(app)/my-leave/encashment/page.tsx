"use client";

import React, { useState } from 'react';
import {
    DollarSign, ArrowRight, History, CheckCircle, Clock
} from 'lucide-react';

export default function LeaveEncashmentRequest() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Leave Encashment</h1>
                        <p className="text-sm text-[#8899AA]">Convert your unused Privilege Leave (EL) balance to cash payout.</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg p-6">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                                <DollarSign size={18} className="mr-2 text-[#00E5A0]" /> New Encashment Request
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-[#8899AA]">Leave Type</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] font-bold">
                                        <option value="EL">Privilege Leave (Balance: 24)</option>
                                    </select>
                                    <p className="text-xs text-[#556677]">Only Privilege Leave is eligible for encashment as per policy.</p>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-[#8899AA]">Number of Days to Encash</label>
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="number"
                                            defaultValue={10}
                                            max={15}
                                            className="w-32 bg-[#060B14] border border-[#0066FF] text-white rounded-lg p-3 outline-none text-center font-black text-xl shadow-[0_0_10px_rgba(0,102,255,0.2)]"
                                        />
                                        <span className="text-sm text-[#8899AA] font-bold">days</span>
                                    </div>
                                    <p className="text-xs text-[#FFB800]">Max limit: 15 days per year. Min balance after encashment must be 5 days.</p>
                                </div>

                                <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg flex items-center justify-between">
                                    <div>
                                        <span className="text-xs text-[#8899AA] font-bold block mb-1">Estimated Payout (Gross)</span>
                                        <div className="text-2xl font-black text-[#00E5A0]">₹18,500</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-[#8899AA] font-bold block mb-1">Formula Applied</span>
                                        <div className="text-sm font-bold text-white">Basic Salary / 26 × Days (<span className="text-[#0066FF] underline cursor-pointer">View config</span>)</div>
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.4)] flex justify-center items-center">
                                    Submit Request <ArrowRight size={18} className="ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Guidelines & History */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg p-6">
                            <h2 className="text-sm font-bold text-white mb-4">Policy Guidelines</h2>
                            <ul className="space-y-3 text-xs text-[#8899AA] list-disc pl-4">
                                <li>Encashment requests are processed in the next payroll cycle.</li>
                                <li>TDS will be deducted on encashment amount as per tax slab.</li>
                                <li>Maximum 1 encashment request allowed per financial year.</li>
                            </ul>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg p-5">
                            <h2 className="text-sm font-bold text-white mb-4 flex items-center">
                                <History size={16} className="mr-2 text-[#0066FF]" /> Past Requests
                            </h2>
                            <div className="p-3 border border-[#1A2A3A] bg-[#0A1420] rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-white">10 Days EL</span>
                                    <span className="text-[10px] bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center">
                                        <CheckCircle size={10} className="mr-1" /> Paid
                                    </span>
                                </div>
                                <div className="text-xs text-[#8899AA] flex justify-between">
                                    <span>₹16,500</span>
                                    <span>Dec 2023 Payroll</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
