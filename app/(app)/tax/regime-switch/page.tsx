"use client";

import React, { useState } from 'react';
import {
    Scale, CheckCircle2, XCircle, Search, Filter,
    ArrowRightLeft, AlertTriangle, MessageSquare
} from 'lucide-react';

export default function RegimeSwitchApprovals() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
                            <ArrowRightLeft size={24} className="mr-3 text-[#FFB800]" />
                            Tax Regime Switch Requests
                        </h1>
                        <p className="text-sm text-[#8899AA]">Manage employee requests to change tax regimes mid-year before payroll cutoff.</p>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-start space-x-3">
                    <AlertTriangle size={20} className="text-[#FFB800] mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                        <h4 className="font-bold text-white mb-1">Important Rule</h4>
                        <p className="text-[#8899AA]">The CBDT allows an employee to change their chosen tax regime (Old to New or New to Old) during the financial year. However, the employer may restrict this to once a year to prevent payroll computation complications. Ensure you review the TDS recalculation before approving.</p>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 border-b-2 border-[#1A2A3A] bg-[#0D1928] rounded-t-xl text-center">
                        <div className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-1">Total Requests</div>
                        <div className="text-2xl font-black text-white">42</div>
                    </div>
                    <div className="p-4 border-b-2 border-[#FFB800] bg-[#FFB800]/5 rounded-t-xl text-center">
                        <div className="text-xs text-[#FFB800] font-semibold uppercase tracking-wider mb-1">Pending Approval</div>
                        <div className="text-2xl font-black text-[#FFB800]">12</div>
                    </div>
                    <div className="p-4 border-b-2 border-[#00E5A0] bg-[#00E5A0]/5 rounded-t-xl text-center">
                        <div className="text-xs text-[#00E5A0] font-semibold uppercase tracking-wider mb-1">Approved</div>
                        <div className="text-2xl font-black text-[#00E5A0]">28</div>
                    </div>
                    <div className="p-4 border-b-2 border-[#FF4444] bg-[#FF4444]/5 rounded-t-xl text-center">
                        <div className="text-xs text-[#FF4444] font-semibold uppercase tracking-wider mb-1">Rejected</div>
                        <div className="text-2xl font-black text-[#FF4444]">2</div>
                    </div>
                </div>

                {/* Table Block */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">

                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="flex space-x-2">
                            <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1A2A3A] border border-[#2A3A4A] text-white">Pending (12)</button>
                            <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-transparent border-transparent text-[#8899AA] hover:text-slate-300">Processed (30)</button>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Name..."
                                className="bg-[#060B14] border border-[#1A2A3A] px-4 py-1.5 pl-9 rounded-lg text-sm text-white focus:outline-none focus:border-[#FFB800] w-64"
                            />
                            <Search size={16} className="absolute left-3 top-2.5 text-[#8899AA]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1A2A3A] text-xs font-bold text-[#8899AA] uppercase tracking-wider bg-[#060B14]">
                        <div className="col-span-3">Employee Details</div>
                        <div className="col-span-2">Regime Change</div>
                        <div className="col-span-3">TDS Impact (Per Month)</div>
                        <div className="col-span-2">Reason</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {/* Pending Request 1: New -> Old */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors bg-[#060B14]/40">
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white mb-0.5">Rahul Verma</div>
                                <div className="text-xs text-[#8899AA]">EMP103 • Requested: 12 Jan</div>
                            </div>

                            <div className="col-span-2 flex items-center space-x-2">
                                <span className="text-xs font-bold text-slate-400">New</span>
                                <ArrowRightLeft size={14} className="text-[#556677]" />
                                <span className="text-xs font-bold text-[#00E5A0] bg-[#00E5A0]/10 border border-[#00E5A0]/20 px-2 py-0.5 rounded">Old</span>
                            </div>

                            <div className="col-span-3">
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-slate-400 line-through">₹12,500</span>
                                    <ArrowRightLeft size={12} className="text-[#556677]" />
                                    <span className="font-bold text-[#FFB800]">₹10,200</span>
                                </div>
                                <div className="text-[10px] text-[#00E5A0] mt-0.5">-₹2,300 (Take-home increases)</div>
                            </div>

                            <div className="col-span-2">
                                <div className="text-xs text-[#8899AA] line-clamp-2" title="Bought a new house, want to claim home loan interest deduction.">
                                    Bought a new house, want to claim home loan interest deduction under...
                                </div>
                            </div>

                            <div className="col-span-2 flex justify-end space-x-2">
                                <button className="w-8 h-8 rounded-full bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 flex items-center justify-center hover:bg-[#00E5A0]/20 transition-colors group relative" title="Approve">
                                    <CheckCircle2 size={16} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30 flex items-center justify-center hover:bg-[#FF4444]/20 transition-colors group relative" title="Reject">
                                    <XCircle size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Pending Request 2: Old -> New */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors bg-[#060B14]/40">
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white mb-0.5">Sneha Gupta</div>
                                <div className="text-xs text-[#8899AA]">EMP415 • Requested: 14 Jan</div>
                            </div>

                            <div className="col-span-2 flex items-center space-x-2">
                                <span className="text-xs font-bold text-slate-400">Old</span>
                                <ArrowRightLeft size={14} className="text-[#556677]" />
                                <span className="text-xs font-bold text-[#0066FF] bg-[#0066FF]/10 border border-[#0066FF]/20 px-2 py-0.5 rounded">New</span>
                            </div>

                            <div className="col-span-3">
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-slate-400 line-through">₹8,400</span>
                                    <ArrowRightLeft size={12} className="text-[#556677]" />
                                    <span className="font-bold text-[#FF4444]">₹14,500</span>
                                </div>
                                <div className="text-[10px] text-[#FF4444] mt-0.5">Arrears to be deducted: ₹12,200</div>
                            </div>

                            <div className="col-span-2">
                                <div className="text-xs text-[#8899AA] line-clamp-2" title="Could not invest the planned 80C amount. Better to switch to new regime.">
                                    Could not invest the planned 80C amount. Better to switch to new regime.
                                </div>
                            </div>

                            <div className="col-span-2 flex justify-end space-x-2">
                                <button className="px-3 py-1.5 bg-[#00E5A0] text-[#060B14] font-bold text-xs rounded-lg hover:bg-[#00c98d] transition-colors">
                                    Approve
                                </button>
                                <button className="px-3 py-1.5 bg-transparent border border-[#FF4444]/30 text-[#FF4444] font-bold text-xs rounded-lg hover:bg-[#FF4444]/10 transition-colors">
                                    Reject
                                </button>
                            </div>

                            {/* Warning Sub-row */}
                            <div className="col-span-12 mt-2">
                                <div className="flex items-center text-xs text-[#FFB800] bg-[#FFB800]/10 px-3 py-2 rounded-lg border border-[#FFB800]/20 w-fit">
                                    <AlertTriangle size={14} className="mr-1.5" /> Note: This switch will significantly increase her TDS for this month to recover shortfall.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
