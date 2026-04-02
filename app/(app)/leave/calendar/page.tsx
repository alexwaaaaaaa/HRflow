"use client";

import React, { useState } from 'react';
import {
    Calendar as CalendarIcon, Filter, Search, ChevronLeft, ChevronRight, User
} from 'lucide-react';

export default function LeaveCalendarTeamView() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Team Leave Calendar</h1>
                        <p className="text-sm text-[#8899AA]">View upcoming planned absences across your department to avoid overlaps.</p>
                    </div>
                    <div className="flex space-x-3 bg-[#0D1928] p-1 border border-[#1A2A3A] rounded-lg">
                        <button className="px-4 py-2 bg-[#0066FF] text-white text-sm font-bold rounded-md shadow-sm">Month</button>
                        <button className="px-4 py-2 text-[#8899AA] hover:text-white text-sm font-bold rounded-md transition-colors hover:bg-[#1A2A3A]">Week</button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg flex flex-col h-[700px]">

                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-3">
                                <button className="p-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg hover:border-[#2A3A4A] transition-colors"><ChevronLeft size={16} /></button>
                                <span className="text-lg font-bold text-white w-40 text-center">November 2024</span>
                                <button className="p-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg hover:border-[#2A3A4A] transition-colors"><ChevronRight size={16} /></button>
                            </div>
                            <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] text-xs font-bold text-[#8899AA] hover:text-white rounded-lg transition-colors">Today</button>
                        </div>
                        <div className="flex space-x-3">
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none w-48 focus:border-[#0066FF]">
                                <option>Engineering Dept</option>
                                <option>Product Dept</option>
                            </select>
                            <div className="relative w-64">
                                <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                                <input
                                    type="text"
                                    placeholder="Search employee..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Calendar Grid (Mock) */}
                    <div className="flex-1 overflow-auto bg-[#060B14] p-6 relative">
                        <div className="grid grid-cols-7 gap-4 h-full">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day} className="text-center font-bold text-xs uppercase tracking-widest text-[#556677] mb-2">{day}</div>
                            ))}

                            {/* Dummy Grid Items */}
                            {Array.from({ length: 35 }).map((_, i) => (
                                <div key={i} className={`border border-[#1A2A3A] rounded-xl p-2 min-h-[120px] ${(i % 7 === 5 || i % 7 === 6) ? 'bg-[#060B14]' : 'bg-[#0D1928]'}`}>
                                    <div className={`text-xs font-bold mb-2 ${(i === 13) ? 'text-white w-6 h-6 bg-[#0066FF] rounded-full flex items-center justify-center' : 'text-[#556677]'}`}>
                                        {(i + 28) % 31 + 1}
                                    </div>

                                    {/* Mock Events */}
                                    {i === 13 && (
                                        <div className="bg-[#00E5A0]/10 border-l-2 border-[#00E5A0] p-1.5 rounded mb-1 cursor-pointer hover:bg-[#00E5A0]/20 transition-colors">
                                            <div className="text-[10px] font-bold text-[#00E5A0] truncate">Rohan (Sick)</div>
                                        </div>
                                    )}
                                    {i === 14 && (
                                        <>
                                            <div className="bg-[#FFB800]/10 border-l-2 border-[#FFB800] p-1.5 rounded mb-1 cursor-pointer hover:bg-[#FFB800]/20 transition-colors">
                                                <div className="text-[10px] font-bold text-[#FFB800] truncate">Priya (EL)</div>
                                            </div>
                                        </>
                                    )}
                                    {i > 22 && i < 26 && (
                                        <div className="bg-[#0066FF]/10 border-l-2 border-[#0066FF] p-1.5 rounded mb-1 cursor-pointer hover:bg-[#0066FF]/20 transition-colors">
                                            <div className="text-[10px] font-bold text-[#0066FF] truncate">Arjun (Conf)</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="p-4 border-t border-[#1A2A3A] bg-[#0A1420] flex items-center space-x-6 text-xs font-bold text-[#8899AA]">
                        <span className="flex items-center"><div className="w-3 h-3 bg-[#00E5A0] rounded-sm mr-2 opacity-50"></div> Sick Leave</span>
                        <span className="flex items-center"><div className="w-3 h-3 bg-[#FFB800] rounded-sm mr-2 opacity-50"></div> Privilege Leave</span>
                        <span className="flex items-center"><div className="w-3 h-3 bg-[#0066FF] rounded-sm mr-2 opacity-50"></div> Official Duty</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
