"use client";

import React, { useState } from 'react';
import {
    ArrowRightCircle, AlertTriangle, Save, DollarSign, Calendar
} from 'lucide-react';

export default function CarryForwardLapseRules() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-[#1A2A3A] pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Carry Forward & Lapse Rules</h1>
                        <p className="text-sm text-[#8899AA]">Configure what happens to unused leave balances at year-end.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Save size={16} className="mr-2" /> Save Rules
                    </button>
                </div>

                {/* Per Leave Type Configuration */}
                <div className="space-y-6">

                    {/* Privilege Leave (EL) */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between">
                            <h2 className="font-bold text-white text-base">Privilege / Earned Leave (EL)</h2>
                            <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 rounded">Yearly Reset</span>
                        </div>
                        <div className="p-6 space-y-6">

                            {/* Carry Forward Limit */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1">Maximum Carry Forward Limit</h3>
                                    <p className="text-xs text-[#8899AA]">Maximum unused EL days that can be carried to the next calendar year.</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue={45} className="w-20 bg-[#060B14] border border-[#2A3A4A] text-center text-white font-bold rounded p-2.5 outline-none focus:border-[#0066FF]" />
                                    <span className="font-bold text-[#556677] text-sm">days total</span>
                                </div>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            {/* Encashment rules */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1 flex items-center">
                                        Year-end Auto Encashment <DollarSign size={14} className="ml-1 text-[#00E5A0]" />
                                    </h3>
                                    <p className="text-xs text-[#8899AA] max-w-lg mb-3">If balance exceeds the carry forward limit, unutilized leaves will be automatically encashed instead of lapsing.</p>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-[#1A2A3A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E5A0]"></div>
                                        <span className="ml-3 text-sm font-bold text-white">Enable Auto Encashment</span>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-[#060B14] p-4 rounded-lg border border-[#1A2A3A] flex items-center justify-between">
                                <span className="text-sm text-[#8899AA] font-bold">Encashment Formula Base:</span>
                                <select className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg p-2 outline-none w-48 font-bold text-center">
                                    <option>Basic Salary</option>
                                    <option>Gross Salary</option>
                                    <option>Fixed Amount (/day)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sick Leave (SL) */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between">
                            <h2 className="font-bold text-white text-base text-[#8899AA]">Sick Leave (SL)</h2>
                        </div>
                        <div className="p-6 space-y-6">

                            <div className="flex items-center bg-[#FF4444]/10 p-4 rounded-lg border border-[#FF4444]/20">
                                <AlertTriangle size={24} className="text-[#FF4444] mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1">Leaves Lapse at Year-end</h3>
                                    <p className="text-xs text-[#8899AA]">Unused Sick Leaves cannot be carried forward or encashed. They will reset to 0 on Dec 31st.</p>
                                </div>
                                <button className="ml-auto px-4 py-2 border border-[#FF4444] text-[#FF4444] text-xs font-bold rounded-lg hover:bg-[#FF4444] hover:text-white transition-colors">
                                    Change Rule
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Casual Leave (CL) */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between">
                            <h2 className="font-bold text-white text-base text-[#8899AA]">Casual Leave (CL)</h2>
                        </div>
                        <div className="p-6">

                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1">Maximum Carry Forward Limit</h3>
                                    <p className="text-xs text-[#8899AA]">Unused CL limits.</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue={5} className="w-20 bg-[#060B14] border border-[#2A3A4A] text-center text-white font-bold rounded p-2.5 outline-none focus:border-[#0066FF]" />
                                    <span className="font-bold text-[#556677] text-sm">days max</span>
                                </div>
                            </div>

                            <div className="bg-[#060B14] p-4 rounded-lg border border-[#1A2A3A] text-xs text-[#8899AA]">
                                <ArrowRightCircle size={14} className="inline mr-2 text-[#FFB800]" />
                                Any unused balance above the limit of 5 days will be lapsed. <strong>No Encashment</strong>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
