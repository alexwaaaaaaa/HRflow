"use client";

import React, { useState } from 'react';
import {
    CalendarOff, Save, CheckCircle2
} from 'lucide-react';

export default function WeekendPolicy() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-[#1A2A3A] pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Weekend & Off-Day Policy</h1>
                        <p className="text-sm text-[#8899AA]">Set default rest days for the organization. (Shift Roster overrides these settings).</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Save size={16} className="mr-2" /> Save Pattern
                    </button>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-8">

                    <h2 className="text-lg font-bold text-white mb-6">Select Weekly Off Days</h2>

                    <div className="grid grid-cols-7 gap-4 mb-8">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, ix) => {
                            const isWeekend = day === 'Saturday' || day === 'Sunday';
                            return (
                                <button
                                    key={day}
                                    className={`relative flex flex-col items-center justify-center p-4 border rounded-xl hover:bg-[#1A2A3A]/50 transition-colors ${isWeekend
                                            ? 'bg-[#00E5A0]/10 border-[#00E5A0]/50' // Selected Mock
                                            : 'bg-[#060B14] border-[#1A2A3A]' // Unselected Mock
                                        }`}
                                >
                                    {isWeekend && (
                                        <div className="absolute top-2 right-2 text-[#00E5A0]">
                                            <CheckCircle2 size={14} />
                                        </div>
                                    )}
                                    <span className={`text-sm font-bold mt-2 ${isWeekend ? 'text-[#00E5A0]' : 'text-[#8899AA]'}`}>{day.substring(0, 3)}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="bg-[#060B14] border border-[#2A3A4A] rounded-lg p-5">
                        <h3 className="text-sm font-bold text-white mb-4">Advanced Exceptions (Odd/Even Saturdays)</h3>

                        <label className="flex items-start space-x-3 cursor-pointer group mb-4">
                            <div className="relative flex items-center justify-center mt-0.5">
                                <input type="checkbox" className="peer sr-only" defaultChecked />
                                <div className="w-4 h-4 rounded bg-[#060B14] border border-[#2A3A4A] peer-checked:bg-[#0066FF] peer-checked:border-[#0066FF] transition-colors flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                            <div>
                                <span className="text-sm font-bold text-white group-hover:text-[#0066FF] transition-colors">Enable Alternate Saturday Working</span>
                                <p className="text-xs text-[#8899AA]">Certain weeks will override the Saturday Rest-Day.</p>
                            </div>
                        </label>

                        <div className="pl-7 flex space-x-3">
                            {['1st', '2nd', '3rd', '4th', '5th'].map((week, ix) => (
                                <label key={ix} className="flex items-center space-x-2 bg-[#1A2A3A] px-3 py-1.5 rounded border border-[#2A3A4A] cursor-pointer">
                                    <input type="checkbox" defaultChecked={ix % 2 !== 0} className="w-3 h-3 accent-[#0066FF]" />
                                    <span className="text-xs font-bold text-white bg-transparent outline-none ring-0 w-3">{week}</span>
                                </label>
                            ))}
                        </div>
                        <p className="pl-7 text-[10px] text-[#556677] mt-2">Checking the box makes it an **OFF-DAY**. Unchecked means it's a Working Day.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
