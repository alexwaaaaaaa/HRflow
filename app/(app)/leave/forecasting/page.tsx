"use client";

import React, { useState } from 'react';
import {
    TrendingUp, Calendar, Users, AlertTriangle, ArrowUpRight
} from 'lucide-react';

export default function LeaveForecastingScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Leave Forecasting & Liability</h1>
                        <p className="text-sm text-[#8899AA]">Predictive analytics for upcoming team absences and financial liability of unused leaves.</p>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-1 rounded-lg flex font-bold text-sm">
                        <button className="px-4 py-1.5 bg-[#1A2A3A] text-white rounded">Headcount Impact</button>
                        <button className="px-4 py-1.5 text-[#556677] hover:text-white transition-colors">Financial Liability</button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-sm font-bold text-[#8899AA] uppercase tracking-wider">Leave Liability (EL)</div>
                            <TrendingUp size={18} className="text-[#FF4444]" />
                        </div>
                        <div className="text-3xl font-black text-white">₹48.5L</div>
                        <div className="text-xs text-[#FF4444] font-bold mt-2 flex items-center">
                            <ArrowUpRight size={14} className="mr-1" /> +12% projected by Dec 31
                        </div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-sm font-bold text-[#8899AA] uppercase tracking-wider">Highest Risk Dept</div>
                            <AlertTriangle size={18} className="text-[#FFB800]" />
                        </div>
                        <div className="text-2xl font-black text-[#FFB800] mb-1">Engineering</div>
                        <div className="text-xs text-[#8899AA] mt-2">
                            Averages 14 unused EL per person
                        </div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-sm font-bold text-[#8899AA] uppercase tracking-wider">Upcoming Month Impact</div>
                            <Users size={18} className="text-[#00E5A0]" />
                        </div>
                        <div className="text-3xl font-black text-white">18%</div>
                        <div className="text-xs text-[#556677] font-bold mt-2 truncate">
                            Of workforce planned leave in Dec
                        </div>
                    </div>
                </div>

                {/* Main Prediction Graph Area */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg h-[400px] flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <h3 className="font-bold text-white">Projected Resource Availability (Next 90 Days)</h3>
                        <select className="bg-[#060B14] border border-[#1A2A3A] text-xs text-white rounded p-1.5 outline-none">
                            <option>All Departments</option>
                            <option>Engineering</option>
                        </select>
                    </div>
                    <div className="flex-1 p-6 relative flex items-end space-x-2">
                        {/* Dummy Bar Chart */}
                        <div className="absolute inset-0 flex flex-col justify-between p-6 pb-8 pointer-events-none opacity-20">
                            {[100, 75, 50, 25, 0].map(val => (
                                <div key={val} className="border-b border-dashed border-white w-full h-0 relative">
                                    <span className="absolute -left-5 -top-3 text-[10px] text-white font-mono">{val}%</span>
                                </div>
                            ))}
                        </div>

                        {/* Bars */}
                        {Array.from({ length: 12 }).map((_, i) => {
                            const h = 80 + Math.random() * 15 - (i > 8 ? 20 : 0); // dip near the end (holidays)
                            return (
                                <div key={i} className="flex-1 flex flex-col justify-end group cursor-crosshair h-full relative z-10">
                                    <div
                                        className={`w-full rounded-t-sm transition-all duration-500 ease-out group-hover:opacity-100 ${h < 75 ? 'bg-[#FFB800]' : 'bg-[#0066FF]'} opacity-80`}
                                        style={{ height: `${h}%` }}
                                    ></div>
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-[#060B14] border border-[#1A2A3A] text-white text-xs font-bold py-1 px-2 rounded shadow-xl whitespace-nowrap z-20">
                                        Week {i + 1}: {Math.round(h)}% Available
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="px-6 pb-4 flex justify-between text-xs font-bold text-[#556677] uppercase tracking-wider">
                        <span>Current Week</span>
                        <span>+45 Days</span>
                        <span>+90 Days</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
