"use client";
import React, { useState } from 'react';
import { Film, ArrowLeft, Play, Clock, Search, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const PLAYLISTS = [
    { title: 'Payroll Mastery — Full Course', videos: 12, totalTime: '2h 45m', level: 'Beginner → Advanced', color: 'from-indigo-600 to-indigo-400', bg: '#1A2A4A' },
    { title: 'Compliance & Statutory Setup', videos: 8, totalTime: '1h 30m', level: 'Intermediate', color: 'from-red-600 to-red-400', bg: '#3A1A1A' },
    { title: 'Recruitment & ATS Deep Dive', videos: 10, totalTime: '1h 55m', level: 'Beginner', color: 'from-emerald-600 to-emerald-400', bg: '#1A3A2A' },
    { title: 'Performance & OKRs', videos: 7, totalTime: '1h 20m', level: 'Intermediate', color: 'from-purple-600 to-purple-400', bg: '#2A1A3A' },
    { title: 'HR Analytics & Reporting', videos: 9, totalTime: '1h 48m', level: 'Advanced', color: 'from-amber-600 to-amber-400', bg: '#3A2A1A' },
    { title: 'API & Integrations for Devs', videos: 6, totalTime: '2h 10m', level: 'Advanced', color: 'from-teal-600 to-teal-400', bg: '#1A3A3A' },
];

const FEATURED = [
    { title: 'Running Payroll End-to-End in HRFlow', playlist: 'Payroll Mastery', duration: '18:42', views: '24k' },
    { title: 'PF, ESI & PT: 3 Core Compliances Setup', playlist: 'Compliance & Statutory', duration: '14:05', views: '18k' },
    { title: 'Building Your First OKR Cycle', playlist: 'Performance & OKRs', duration: '22:30', views: '12k' },
];

export default function VideoLibraryScreen() {
    const [search, setSearch] = useState('');
    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Help Center</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Film size={22} className="text-rose-400" /> Video Library</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Full courses, playlists, and on-demand tutorials</p>
                </div>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                    <input type="text" placeholder="Search videos..." value={search} onChange={e => setSearch(e.target.value)}
                        className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-rose-500 outline-none w-64 transition-colors" />
                </div>
            </div>

            {/* Featured */}
            <div>
                <h2 className="text-sm font-bold text-[#8899AA] uppercase tracking-wider mb-4">Featured Videos</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {FEATURED.map((vid, i) => (
                        <div key={i} className="group relative rounded-2xl overflow-hidden bg-[#0A1420] border border-[#1A2A3A] hover:border-rose-500/30 cursor-pointer transition-all">
                            <div className="h-36 bg-gradient-to-br from-[#1A2A3A] to-[#060B14] flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-500/20 transition-all">
                                    <Play size={20} className="text-white ml-1" fill="currentColor" />
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="text-rose-400 text-[10px] font-bold mb-1">{vid.playlist}</div>
                                <div className="text-white font-semibold text-sm leading-tight">{vid.title}</div>
                                <div className="flex items-center gap-3 mt-2 text-[10px] text-[#556677]">
                                    <span className="flex items-center gap-1"><Clock size={9} /> {vid.duration}</span>
                                    <span>{vid.views} views</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Playlists */}
            <div>
                <h2 className="text-sm font-bold text-[#8899AA] uppercase tracking-wider mb-4">Learning Paths</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PLAYLISTS.map((pl, i) => (
                        <div key={i} className="group bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden hover:border-[#2A3A4A] transition-all cursor-pointer">
                            <div className={`h-20 bg-gradient-to-br ${pl.color} relative flex items-end p-4`} style={{ background: `linear-gradient(135deg, ${pl.bg}, #060B14)` }}>
                                <BookOpen size={28} className="text-white/20 absolute top-4 right-4" />
                                <span className="bg-black/40 text-white text-[10px] font-bold px-2 py-1 rounded-full">{pl.level}</span>
                            </div>
                            <div className="p-4 flex items-center gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="text-white font-bold text-sm">{pl.title}</div>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-[#556677]">
                                        <span>{pl.videos} videos</span>
                                        <span className="flex items-center gap-1"><Clock size={10} /> {pl.totalTime}</span>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-[#445566] group-hover:text-white transition-colors shrink-0" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
