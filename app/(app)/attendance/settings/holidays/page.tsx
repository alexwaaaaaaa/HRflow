"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import { Plus, ChevronLeft, ChevronRight, Edit3, Trash2
} from 'lucide-react';

export default function HolidayCalendar() {
    const holidays = [
        { id: 1, name: 'Republic Day', date: '26 Jan 2024', type: 'Fixed', location: 'All Locations' },
        { id: 2, name: 'Holi', date: '25 Mar 2024', type: 'Fixed', location: 'India Only' },
        { id: 3, name: 'Independence Day', date: '15 Aug 2024', type: 'Fixed', location: 'All Locations' },
        { id: 4, name: 'Diwali', date: '31 Oct 2024', type: 'Fixed', location: 'India Only' },
        { id: 5, name: 'Karnataka Rajyotsava', date: '01 Nov 2024', type: 'Restricted', location: 'Bengaluru Branch' },
        { id: 6, name: 'Christmas', date: '25 Dec 2024', type: 'Fixed', location: 'All Locations' },
    ];

    return (
        <Page
            title="Holiday Calendar 2024"
            subtitle="Define public and restricted holidays. These days are automatically marked as paid off-days."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Settings", href: "/attendance/settings" }, { label: "Holidays" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Holiday Calendar 2024</h1>
                        <p className="text-sm text-[#8899AA]">Define public and restricted holidays. These days are automatically marked as paid off-days.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Plus size={16} className="mr-2" /> Add Holiday
                    </button>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="bg-[#060B14] border border-[#1A2A3A] px-2 py-1.5 rounded-lg flex items-center space-x-3">
                            <button className="p-1 hover:bg-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors"><ChevronLeft size={18} /></button>
                            <div className="text-sm font-bold text-white flex items-center w-24 justify-center">
                                Year: 2024
                            </div>
                            <button className="p-1 hover:bg-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors"><ChevronRight size={18} /></button>
                        </div>
                        <div className="text-sm font-bold text-[#8899AA]">Total Holidays: <span className="text-white">12 Fixed, 4 Restricted</span></div>
                    </div>

                    {/* Table */}
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Holiday Name</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Location Scope</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {holidays.map((hol) => (
                                <tr key={hol.id} className="hover:bg-[#1A2A3A]/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white text-base">{hol.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-[#8899AA] font-mono">{hol.date}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded border ${hol.type === 'Fixed' ? 'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30' :
                                                'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30'
                                            }`}>
                                            {hol.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-300 bg-[#1A2A3A] px-2 py-1 rounded">
                                            {hol.location}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-[#8899AA] hover:text-[#0066FF] hover:bg-[#0066FF]/10 rounded transition-colors" title="Edit">
                                                <Edit3 size={16} />
                                            </button>
                                            <button className="p-2 text-[#8899AA] hover:text-[#FF4444] hover:bg-[#FF4444]/10 rounded transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    
        </Page>
        );
}
