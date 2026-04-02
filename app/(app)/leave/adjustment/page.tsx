"use client";

import React, { useState } from 'react';
import {
    Search, Edit2, History, AlertTriangle, Plus, Minus, ArrowRight
} from 'lucide-react';

export default function LeaveAdjustmentScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Manual Leave Adjustment</h1>
                        <p className="text-sm text-[#8899AA]">Directly credit or deduct leave balances for an employee outside the normal accrual cycle.</p>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg p-8">
                    <form className="space-y-8">

                        {/* Employee Select */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-[#8899AA]">Select Employee</label>
                            <div className="relative">
                                <Search size={18} className="absolute left-3 top-3 text-[#556677]" />
                                <input
                                    type="text"
                                    placeholder="Search by name or emp ID..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF] text-sm"
                                    defaultValue="Arjun Mehta (EMP042)"
                                />
                            </div>
                        </div>

                        {/* Leave Type & Current Bal */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-[#8899AA]">Leave Type</label>
                                <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white font-bold rounded-lg p-3 outline-none focus:border-[#0066FF]">
                                    <option>Privilege Leave (EL)</option>
                                    <option>Sick Leave (SL)</option>
                                    <option>Casual Leave (CL)</option>
                                </select>
                            </div>
                            <div className="bg-[#0A1420] border border-[#1A2A3A] p-3 rounded-lg flex items-center justify-between">
                                <span className="text-sm font-bold text-[#8899AA]">Current Balance:</span>
                                <span className="text-xl font-black text-white px-4">14.5 <span className="text-sm text-[#556677] font-bold block -mt-1 text-right">days</span></span>
                            </div>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        {/* Adjustment Action */}
                        <div>
                            <label className="text-sm font-bold text-[#8899AA] block mb-4">Adjustment Action</label>
                            <div className="flex space-x-6">
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <div className="w-10 h-10 rounded-lg border-2 border-[#00E5A0] bg-[#00E5A0]/10 flex items-center justify-center text-[#00E5A0]">
                                        <Plus size={20} className="stroke-[3]" />
                                    </div>
                                    <span className="font-bold text-white">Credit (+)</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity">
                                    <div className="w-10 h-10 rounded-lg border-2 border-[#1A2A3A] bg-[#060B14] flex items-center justify-center text-[#8899AA]">
                                        <Minus size={20} className="stroke-[3]" />
                                    </div>
                                    <span className="font-bold text-[#8899AA]">Deduct (-)</span>
                                </label>
                            </div>
                        </div>

                        {/* Days & Reason */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-[#8899AA]">Days</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    defaultValue={2}
                                    className="w-full bg-[#060B14] border border-[#00E5A0]/50 text-[#00E5A0] font-black text-xl rounded-lg p-3 outline-none focus:border-[#00E5A0] text-center"
                                />
                            </div>
                            <div className="space-y-3 col-span-2">
                                <label className="text-sm font-bold text-[#8899AA]">Reason / Remarks</label>
                                <input
                                    type="text"
                                    placeholder="E.g., Joining bonus leave credit"
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg p-3 outline-none focus:border-[#0066FF]"
                                    defaultValue="Correcting missing joining credit"
                                />
                            </div>
                        </div>

                        <div className="bg-[#FFB800]/10 border border-[#FFB800]/20 p-4 rounded-lg flex items-start text-sm">
                            <AlertTriangle size={18} className="text-[#FFB800] mr-3 flex-shrink-0" />
                            <div className="text-[#FFB800]">
                                This action will update the balance immediately and will be recorded in the audit logs. The new balance will be <strong className="text-white">16.5 days</strong>.
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button type="button" className="px-8 py-3 bg-[#00E5A0] text-[#060B14] font-bold rounded-xl hover:bg-[#00cca0] transition-colors shadow-[0_0_15px_rgba(0,229,160,0.4)] flex justify-center items-center">
                                Confirm Adjustment <ArrowRight size={18} className="ml-2" />
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}
