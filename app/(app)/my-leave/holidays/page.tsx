"use client";

import React, { useState } from 'react';
import {
    Calendar, MapPin, Eye, Search
} from 'lucide-react';

export default function HolidayListEmployeeView() {
    const holidays = [
        { id: 1, date: '01 Jan 2024', day: 'Monday', name: 'New Year\'s Day', type: 'Mandatory', locations: 'All Locations' },
        { id: 2, date: '26 Jan 2024', day: 'Friday', name: 'Republic Day', type: 'Mandatory', locations: 'All Locations' },
        { id: 3, date: '25 Mar 2024', day: 'Monday', name: 'Holi', type: 'Mandatory', locations: 'All Locations' },
        { id: 4, date: '11 Apr 2024', day: 'Thursday', name: 'Eid al-Fitr', type: 'Mandatory', locations: 'All Locations' },
        { id: 5, date: '15 Aug 2024', day: 'Thursday', name: 'Independence Day', type: 'Mandatory', locations: 'All Locations' },
        { id: 6, date: '31 Oct 2024', day: 'Thursday', name: 'Diwali', type: 'Mandatory', locations: 'All Locations' },
        { id: 7, date: '25 Dec 2024', day: 'Wednesday', name: 'Christmas Day', type: 'Mandatory', locations: 'All Locations' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] p-8 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-black text-white mb-2 flex items-center">
                                <Calendar size={28} className="mr-3 text-[#FFB800]" /> 2024 Holiday Calendar
                            </h1>
                            <p className="text-[#8899AA]">Official public holidays and company off days for the complete year.</p>
                        </div>
                        <div className="bg-[#0A1420] border border-[#1A2A3A] p-3 rounded-xl flex items-center space-x-3">
                            <MapPin size={18} className="text-[#0066FF]" />
                            <div>
                                <div className="text-[10px] text-[#8899AA] font-bold uppercase tracking-wider">Your Location</div>
                                <div className="text-sm font-bold text-white">Bangalore, India</div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute right-0 top-0 w-64 h-64 bg-[#FFB800]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                </div>

                {/* List View */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <div className="relative w-80">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search holiday..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                        <div className="text-sm font-bold text-[#8899AA]">
                            {holidays.length} Holidays Listed
                        </div>
                    </div>

                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider w-40">Date</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Holiday Name</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Locations Scope</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {holidays.map((h, i) => (
                                <tr key={h.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white text-base">{h.date}</div>
                                        <div className="text-xs text-[#8899AA]">{h.day}</div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[#0066FF] text-base">
                                        {h.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20 rounded tracking-wider">
                                            {h.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#8899AA] flex items-center">
                                        <MapPin size={14} className="mr-1 mt-1 opacity-50" /> {h.locations}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
