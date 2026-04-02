"use client";

import React, { useState } from 'react';
import {
    Calendar, CheckCircle, Info
} from 'lucide-react';

export default function RestrictedHolidayScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Restricted Holidays</h1>
                        <p className="text-sm text-[#8899AA]">Select optional regional or religious holidays (Max: 2 per year).</p>
                    </div>
                </div>

                <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/20 p-4 rounded-xl flex items-center justify-between text-sm text-[#00E5A0] font-bold mb-6 shadow-[0_0_15px_rgba(0,229,160,0.1)]">
                    <div className="flex items-center">
                        <Info size={18} className="mr-3" />
                        You have selected 1 out of 2 restricted holidays for 2024.
                    </div>
                    <div className="px-3 py-1 bg-[#060B14] rounded border border-[#00E5A0]/30 font-black">
                        1 Remaining
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] text-sm font-bold text-[#8899AA] uppercase tracking-wider">
                        Available Restricted Holidays
                    </div>
                    <div className="divide-y divide-[#1A2A3A]">

                        {/* Item 1 - Selected */}
                        <div className="p-5 flex items-center justify-between bg-[#060B14] hover:bg-[#1A2A3A]/20 transition-colors">
                            <div className="flex items-center space-x-6 w-2/3">
                                <div className="text-center w-16">
                                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-widest">Oct</div>
                                    <div className="text-2xl font-black text-white">12</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Dussehra</h3>
                                    <p className="text-xs text-[#556677]">Saturday • Optional Holiday</p>
                                </div>
                            </div>
                            <div>
                                <button className="px-6 py-2 bg-[#1A2A3A] text-[#00E5A0] border border-[#00E5A0]/30 font-bold rounded-lg flex items-center shadow-inner cursor-not-allowed text-sm">
                                    <CheckCircle size={16} className="mr-2" /> Selected
                                </button>
                            </div>
                        </div>

                        {/* Item 2 - Unselected */}
                        <div className="p-5 flex items-center justify-between hover:bg-[#1A2A3A]/20 transition-colors">
                            <div className="flex items-center space-x-6 w-2/3">
                                <div className="text-center w-16">
                                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-widest">Nov</div>
                                    <div className="text-2xl font-black text-white">01</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Kannada Rajyotsava</h3>
                                    <p className="text-xs text-[#556677]">Friday • Optional Holiday</p>
                                </div>
                            </div>
                            <div>
                                <button className="px-6 py-2 bg-[#0066FF] text-white hover:bg-[#0052cc] font-bold rounded-lg shadow-[0_0_15px_rgba(0,102,255,0.3)] transition-colors text-sm">
                                    Opt-in
                                </button>
                            </div>
                        </div>

                        {/* Item 3 - Expired */}
                        <div className="p-5 flex items-center justify-between opacity-50 bg-[#060B14]">
                            <div className="flex items-center space-x-6 w-2/3">
                                <div className="text-center w-16">
                                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-widest">Jan</div>
                                    <div className="text-2xl font-black text-[#556677]">15</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#8899AA]">Makar Sankranti</h3>
                                    <p className="text-xs text-[#556677]">Monday • Past Holiday</p>
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-[#556677] uppercase tracking-wider px-4">Expired</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
