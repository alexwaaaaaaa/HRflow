"use client";

import React, { useState } from 'react';
import {
    Calendar, Plane, AlertCircle, Plus, ChevronRight, Clock
} from 'lucide-react';
import Link from 'next/link';

export default function MyLeaveScreenEmployee() {
    const balances = [
        { type: 'Privilege Leave', code: 'EL', granted: 15, used: 2, balance: 13, color: 'border-[#0066FF]' },
        { type: 'Sick Leave', code: 'SL', granted: 12, used: 4, balance: 8, color: 'border-[#FFB800]' },
        { type: 'Casual Leave', code: 'CL', granted: 7, used: 6, balance: 1, color: 'border-[#00E5A0]' },
    ];

    const history = [
        { id: 1, dates: '12 Nov - 14 Nov', duration: '3 Days', type: 'Privilege Leave', status: 'Approved', color: 'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30' },
        { id: 2, dates: '24 Oct', duration: '1 Day', type: 'Sick Leave', status: 'Approved', color: 'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30' },
        { id: 3, dates: '25 Dec', duration: '1 Day', type: 'Casual Leave', status: 'Pending', color: 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex justify-between items-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    <div>
                        <h1 className="text-3xl font-black text-white mb-2 flex items-center">
                            Hello, Arjun 👋
                        </h1>
                        <p className="text-sm text-[#8899AA]">Here's your personal time-off summary for 2024.</p>
                    </div>
                    <Link href="/my-leave/apply">
                        <button className="px-6 py-3 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                            <Plane size={18} className="mr-2" /> Apply Leave
                        </button>
                    </Link>
                </div>

                {/* Balances Grid */}
                <div>
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Calendar size={18} className="mr-2 text-[#00E5A0]" /> Current Balances
                    </h2>
                    <div className="grid grid-cols-3 gap-6">
                        {balances.map((item, i) => (
                            <div key={i} className={`bg-[#0D1928] border-t-4 border-x border-b border-x-[#1A2A3A] border-b-[#1A2A3A] ${item.color} rounded-xl p-5 shadow-lg`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="font-bold text-white text-base">{item.type}</h3>
                                        <span className="text-xs font-bold text-[#8899AA] bg-[#060B14] px-2 py-0.5 rounded border border-[#1A2A3A] mt-1 inline-block">{item.code}</span>
                                    </div>
                                    <div className="text-4xl font-black text-white">{item.balance} <span className="text-xs font-bold text-[#556677] uppercase tracking-widest block text-right mt-1">Available</span></div>
                                </div>
                                <div className="flex justify-between text-xs font-bold border-t border-[#1A2A3A] pt-4">
                                    <div className="text-[#8899AA]">Granted: <span className="text-white">{item.granted}</span></div>
                                    <div className="text-[#8899AA]">Used: <span className="text-white">{item.used}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent History */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg">
                    <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center">
                        <h2 className="text-base font-bold text-white flex items-center">
                            <Clock size={18} className="mr-2 text-[#0066FF]" /> Recent Applications
                        </h2>
                        <button className="text-xs text-[#0066FF] hover:text-white font-bold transition-colors">View All History</button>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {history.map((req) => (
                                <div key={req.id} className="flex items-center justify-between p-4 rounded-lg border border-[#1A2A3A] bg-[#0A1420] hover:border-[#2A3A4A] transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-[#1A2A3A] w-12 h-12 rounded-lg flex flex-col items-center justify-center border border-[#2A3A4A]">
                                            <span className="text-[10px] text-[#8899AA] font-bold uppercase">{req.dates.split(' ')[1]}</span>
                                            <span className="text-sm font-black text-white">{req.dates.split(' ')[0]}</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-base">{req.type}</div>
                                            <div className="text-xs text-[#8899AA] mt-1">{req.dates} • <span className="text-white font-bold">{req.duration}</span></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded border ${req.color}`}>
                                            {req.status}
                                        </span>
                                        <ChevronRight size={18} className="text-[#556677] cursor-pointer hover:text-white transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
