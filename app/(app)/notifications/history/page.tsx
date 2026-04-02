"use client";
import React from 'react';
import { Search, Calendar, Filter, Archive } from 'lucide-react';

export default function NotificationHistoryPage() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Archive className="text-indigo-500" />
                        Notification Log & History
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Audit trail of all communication sent to your account.</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-[#0A1420] p-4 rounded-xl border border-[#1A2A3A]">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" size={18} />
                    <input
                        type="text"
                        placeholder="Search logs by keyword..."
                        className="w-full pl-10 pr-4 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-sm text-[#CCDDEE] hover:bg-[#131B2B]">
                        <Calendar size={16} /> Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-sm text-[#CCDDEE] hover:bg-[#131B2B]">
                        <Filter size={16} /> Event Type
                    </button>
                </div>
            </div>

            {/* Table layout for history logs */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm text-[#8899AA]">
                    <thead className="bg-[#060D1A] border-b border-[#1A2A3A] text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-medium">Timestamp</th>
                            <th className="px-6 py-4 font-medium">Channel</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Subject / Title</th>
                            <th className="px-6 py-4 font-medium text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">Oct 24, 2024 • 14:32:00</td>
                                <td className="px-6 py-4">
                                    <span className="bg-[#1A2A3A] text-white px-2 py-1 rounded text-xs">Email</span>
                                </td>
                                <td className="px-6 py-4 text-[#CCDDEE]">System Update</td>
                                <td className="px-6 py-4 text-white">Maintenance window scheduled for...</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-emerald-400 font-medium">Delivered</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center text-sm text-[#556677]">
                <span>Showing 1 to 6 of 1,204 logs</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 bg-[#1A2A3A] rounded hover:text-white">Prev</button>
                    <button className="px-3 py-1 bg-[#1A2A3A] rounded hover:text-white">Next</button>
                </div>
            </div>
        </div>
    );
}
