"use client";

import React, { useState } from 'react';
import {
    Users, Calendar, Activity, CheckCircle, Clock
} from 'lucide-react';

export default function LeaveDelegationScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Approval Delegation</h1>
                        <p className="text-sm text-[#8899AA]">Assign a proxy manager to handle leave approvals while you are away.</p>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-6">
                    {/* Form */}
                    <div className="col-span-3 bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                            <Users size={18} className="mr-2 text-[#0066FF]" /> New Delegation Rule
                        </h2>

                        <form className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider">Delegate Approvals To</label>
                                <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg p-3 outline-none focus:border-[#0066FF]">
                                    <option>Select a peer or manager...</option>
                                    <option>Priya Sharma (Sr. Engineering Manager)</option>
                                    <option>Amit Patel (Director of Engineering)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider">Start Date</label>
                                    <div className="relative">
                                        <Calendar size={16} className="absolute left-3 top-3 text-[#0066FF]" />
                                        <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider">End Date</label>
                                    <div className="relative">
                                        <Calendar size={16} className="absolute left-3 top-3 text-[#0066FF]" />
                                        <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF]" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button type="button" className="px-6 py-2.5 bg-[#0066FF] text-white font-bold rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                                    Set Delegation
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Active Status & History */}
                    <div className="col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#00E5A0]/30 rounded-xl p-5 shadow-[0_0_15px_rgba(0,229,160,0.05)] relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center text-[#00E5A0] font-bold text-sm mb-2 uppercase tracking-wider">
                                    <Activity size={16} className="mr-2" /> Active Proxy
                                </div>
                                <div className="text-white font-black text-xl mb-1">Priya Sharma</div>
                                <div className="text-xs text-[#8899AA] mb-4">Until 15 Nov 2024</div>
                                <button className="w-full py-2 border border-[#FF4444]/50 text-[#FF4444] text-xs font-bold rounded hover:bg-[#FF4444]/10 transition-colors">
                                    Revoke Now
                                </button>
                            </div>
                            <div className="absolute right-0 top-0 w-32 h-32 bg-[#00E5A0]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                                <Clock size={16} className="mr-2" /> Past Delegations
                            </h3>
                            <div className="space-y-3">
                                <div className="border border-[#1A2A3A] bg-[#0A1420] p-3 rounded flex justify-between items-center">
                                    <div className="text-xs">
                                        <div className="font-bold text-white">Amit Patel</div>
                                        <div className="text-[#556677]">Oct 10 - Oct 18</div>
                                    </div>
                                    <CheckCircle size={14} className="text-[#00E5A0] opacity-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
