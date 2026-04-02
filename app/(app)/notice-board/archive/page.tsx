"use client";
import React, { useState } from 'react';
import { Archive, Search, FolderClosed, Calendar, FileText } from 'lucide-react';

export default function ArchiveScreen() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Cold Storage</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Archive size={24} className="text-[#556677]" /> Notice Archive</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Search through past announcements, expired policies, and historical communications.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">

                <div className="flex gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input
                            type="text"
                            placeholder="Search by keywords, author, or dates..."
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:border-indigo-500 outline-none transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
                        <Calendar size={16} /> Filter by Year
                    </button>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-3 px-2 border-b border-[#1A2A3A] pb-2">
                        <FolderClosed size={14} className="text-[#556677]" /> 2024 Records
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[#556677] text-xs font-bold uppercase border-b border-[#1A2A3A]">
                                    <th className="pb-3 px-4 w-1/2">Title</th>
                                    <th className="pb-3 px-4">Author / Sender</th>
                                    <th className="pb-3 px-4">Date Sent</th>
                                    <th className="pb-3 px-4 text-right">Format</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { title: 'End of Year Townhall Transcript', author: 'CEO Office', date: 'Dec 15, 2024', format: 'Text' },
                                    { title: 'New Leave Policy Adjustments (Archived)', author: 'HR Dept', date: 'Oct 02, 2024', format: 'PDF' },
                                    { title: 'Office Relocation Details (Mumbai)', author: 'Facilities', date: 'Aug 14, 2024', format: 'Text' },
                                    { title: 'Q2 All-Hands Kickoff', author: 'Comms', date: 'Jul 01, 2024', format: 'Video + Deck' },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors cursor-pointer group">
                                        <td className="py-3 px-4 text-white font-bold group-hover:text-indigo-400">{row.title}</td>
                                        <td className="py-3 px-4 text-[#8899AA]">{row.author}</td>
                                        <td className="py-3 px-4 text-[#556677] font-mono text-xs">{row.date}</td>
                                        <td className="py-3 px-4 text-right">
                                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#AABBCC] bg-[#1A2A3A] px-2 py-1 rounded">
                                                <FileText size={10} /> {row.format}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 pt-4 flex justify-center">
                        <button className="text-[#556677] hover:text-white text-xs font-bold transition-colors">Load Older Records (2023)</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
