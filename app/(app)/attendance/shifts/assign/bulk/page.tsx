"use client";

import React, { useState } from 'react';
import {
    Users, Calendar, ChevronRight, Save, Clock, HelpCircle, UserCheck
} from 'lucide-react';

export default function BulkShiftAssign() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col space-y-2 mb-2">
                    <div className="flex items-center space-x-2 text-xs text-[#8899AA] mb-4">
                        <span className="hover:text-white cursor-pointer">Attendance</span>
                        <ChevronRight size={14} />
                        <span className="hover:text-white cursor-pointer">Shift Roster</span>
                        <ChevronRight size={14} />
                        <span className="text-[#0066FF]">Bulk Assign</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white mb-1">Bulk Shift Assignment</h1>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden">

                    {/* Stepper Header */}
                    <div className="flex items-center border-b border-[#1A2A3A] bg-[#0A1420]">
                        <div className="flex-1 py-4 text-center border-r border-[#1A2A3A] relative">
                            <div className="text-sm font-bold text-[#0066FF] flex justify-center items-center"><span className="w-5 h-5 rounded-full bg-[#0066FF] text-[#060B14] flex items-center justify-center mr-2 text-xs">1</span> Filter Employees</div>
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066FF]"></div>
                        </div>
                        <div className="flex-1 py-4 text-center border-r border-[#1A2A3A]">
                            <div className="text-sm font-bold text-[#8899AA] flex justify-center items-center"><span className="w-5 h-5 rounded-full border border-[#556677] flex items-center justify-center mr-2 text-xs">2</span> Select Shift</div>
                        </div>
                        <div className="flex-1 py-4 text-center">
                            <div className="text-sm font-bold text-[#8899AA] flex justify-center items-center"><span className="w-5 h-5 rounded-full border border-[#556677] flex items-center justify-center mr-2 text-xs">3</span> Duration</div>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-2 gap-10">

                        {/* Left: Filters */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white mb-4">Whom to assign?</h3>

                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Select by Department</label>
                                <select className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors">
                                    <option>Select Department (e.g., Engineering)</option>
                                    <option>Engineering</option>
                                    <option>Support</option>
                                    <option>Sales</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-center text-xs font-bold text-[#556677] uppercase py-2">OR</div>

                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Select by Location</label>
                                <select className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors">
                                    <option>Select Location Branches</option>
                                    <option>Mumbai HO</option>
                                    <option>Bengaluru Delivery Center</option>
                                </select>
                            </div>

                            <div className="mt-6 p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl flex items-start space-x-3">
                                <UserCheck className="text-[#00E5A0] mt-0.5" size={20} />
                                <div>
                                    <h4 className="text-sm font-bold text-[#00E5A0] mb-1">145 Employees matched</h4>
                                    <p className="text-xs text-[#8899AA]">Updating shift for these employees will overwrite any existing rosters in the selected timeframe.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Target Config config (simulated steps) */}
                        <div className="space-y-6 opacity-30 pointer-events-none filter grayscale">
                            <h3 className="text-lg font-bold text-white mb-4">Target Schedule</h3>

                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Select Shift</label>
                                <div className="border border-[#2A3A4A] rounded-lg p-3 flex justify-between items-center bg-[#060B14]">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] font-black flex items-center justify-center mr-3">M</div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Morning Shift</div>
                                            <div className="text-xs text-[#8899AA]">06:00 AM - 03:00 PM</div>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-[#556677]" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Date Range</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input type="date" className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none" />
                                    </div>
                                    <div className="relative">
                                        <input type="date" className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none" />
                                    </div>
                                </div>
                            </div>

                            <label className="flex items-start space-x-3 cursor-pointer group mt-4">
                                <div className="relative flex items-center justify-center mt-0.5">
                                    <input type="checkbox" className="peer sr-only" defaultChecked />
                                    <div className="w-4 h-4 rounded bg-[#060B14] border border-[#2A3A4A] peer-checked:bg-[#0066FF] peer-checked:border-[#0066FF] transition-colors"></div>
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-white">Default to Weekly Off on Weekends</span>
                                </div>
                            </label>

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="px-8 py-4 border-t border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <button className="text-sm text-[#8899AA] font-bold hover:text-white transition-colors">Cancel</button>
                        <button className="px-6 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg shadow-lg shadow-[#0066FF]/20 flex items-center">
                            Continue <ChevronRight size={16} className="ml-1" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
